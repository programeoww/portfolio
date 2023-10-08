import projectList from "@/data/projects";
import { ExternalLinkIcon } from "./icons";

function Projects() {
    return (
        <div className='space-y-5 mt-5'>
            {
                projectList.map((project, index) => (
                    <div key={index} className="rounded-xl border border-dark-blue hover:bg-secondary-blue shadow cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                        <div className="space-y-2 p-6">
                            <div className="flex space-x-1">
                                <h3 className="font-semibold leading-none tracking-tight">{project.title}</h3>
                                <ExternalLinkIcon/>
                            </div>
                            <p className="text-sm text-gray-400">{project.description}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Projects;