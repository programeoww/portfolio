import techStack from "@/data/techStack";

function TechStack() {
    return (
        <div className="space-y-2">
            {
                techStack.map((tech, index) => (
                    <div key={index} className="inline-flex hover:bg-secondary-blue cursor-pointer items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring border border-dark-blue bg-transparent shadow-sm h-9 px-4 py-2 mr-2">
                        <tech.icon />
                        <span className="text-sm ml-2">{tech.name}</span>
                    </div>
                ))
            }
        </div>
    );
}

export default TechStack;