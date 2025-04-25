import { Button } from '@/components/ui/button.tsx'
import { Link } from 'react-router-dom'


export const StarterPage = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-100">
			<h1 className="text-4xl font-bold mb-4">Welcome to the Education Platform</h1>
			<p className="text-lg mb-8">Your journey to knowledge starts here.</p>
			<Link to="/register">
			<Button className="bg-blue-500 text-white hover:bg-blue-600">
				Get Started
			</Button>
			</Link>
		</div>
	)
}