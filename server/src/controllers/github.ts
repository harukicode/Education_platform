import { Request, Response } from 'express';
import githubApiService, { SearchOptions } from '../services/githubApi';
import Resource from '../models/Resource';

export const searchRepositories = async (req: Request, res: Response): Promise<void> => {
  try {
    const { q, language, sort, order, page, per_page } = req.query;
    
    if (!q) {
      res.status(400).json({ message: 'Search query is required' });
      return;
    }
    
    const searchOptions: SearchOptions = {
      q: q as string,
      language: language as string,
      sort: sort as 'stars' | 'forks' | 'updated',
      order: order as 'desc' | 'asc',
      page: page ? parseInt(page as string) : 1,
      per_page: per_page ? parseInt(per_page as string) : 10
    };
    
    const results = await githubApiService.searchRepositories(searchOptions);
    
    if (req.user && req.user.id) {
      const userId = req.user.id;
      const savedRepos = await Resource.find({
        userId,
        type: 'github',
        originalId: { $in: results.items.map(item => item.id.toString()) }
      });
      
      const savedRepoIds = savedRepos.map(repo => repo.originalId);
      results.items = results.items.map(item => ({
        ...item,
        isSaved: savedRepoIds.includes(item.id.toString())
      }));
    }
    
    res.status(200).json(results);
  } catch (error) {
    console.error('Error in searchRepositories:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getRepository = async (req: Request, res: Response): Promise<void> => {
  try {
    const { owner, repo } = req.params;
    
    if (!owner || !repo) {
      res.status(400).json({ message: 'Owner and repo names are required' });
      return;
    }
    
    const repository = await githubApiService.getRepositoryDetails(owner, repo);
    
    if (req.user && req.user.id) {
      const savedRepo = await Resource.findOne({
        userId: req.user.id,
        type: 'github',
        originalId: repository.id.toString()
      });
			
    }
    
    res.status(200).json(repository);
  } catch (error) {
    console.error('Error in getRepository:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};