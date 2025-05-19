import axios from 'axios';

interface GitHubSearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepo[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  topics: string[];
  updated_at: string;
}

export interface SearchOptions {
  q: string;
  language?: string;
  sort?: 'stars' | 'forks' | 'updated';
  order?: 'desc' | 'asc';
  page?: number;
  per_page?: number;
}

class githubApiService {
  private baseUrl = 'https://api.github.com';
  
  /**
   * Search for repositories on GitHub
   */
  async searchRepositories(options: SearchOptions): Promise<{
    items: GitHubRepo[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  }> {
    try {
      const params = {
        q: options.q,
        language: options.language,
        sort: options.sort || 'stars',
        order: options.order || 'desc',
        page: options.page || 1,
        per_page: options.per_page || 10
      };
      
      const response = await axios.get<GitHubSearchResult>(
        `${this.baseUrl}/search/repositories`,
        { params }
      );
      
      const totalPages = Math.ceil(response.data.total_count / (options.per_page || 10));
      
      return {
        items: response.data.items,
        totalCount: response.data.total_count,
        currentPage: options.page || 1,
        totalPages
      };
    } catch (error) {
      console.error('Error searching GitHub repositories:', error);
      throw new Error('Failed to search GitHub repositories');
    }
  }
  
  /**
   * Get details of a specific repository
   */
  async getRepositoryDetails(owner: string, repo: string): Promise<GitHubRepo> {
    try {
      const response = await axios.get<GitHubRepo>(
        `${this.baseUrl}/repos/${owner}/${repo}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching repository details:', error);
      throw new Error('Failed to fetch repository details');
    }
  }
}

export default new githubApiService();