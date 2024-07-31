import workExperiences from "@/data/workExperiences";
import Image from "next/image";

function Work() {
    return (
        <div className="mt-5 rounded-xl border border-dark-blue shadow">
            <div className="p-6 space-y-6">
                {
                    workExperiences.map((work, index) => (
                        <div key={index} className="space-y-2">
                            <div className="flex justify-between flex-wrap md:flex-nowrap">
                                <div className="flex items-center space-x-4">
                                    <span className="relative flex h-8 w-8 shrink-0 overflow-hidden rounded-md">
                                        <Image alt="img" fill className="aspect-square h-full w-full" src={work.logo} />
                                    </span>
                                    <h3 className="font-semibold leading-tight tracking-tight">{work.company}</h3>
                                </div>
                                <div className="inline-flex md:ml-2 mt-4 md:mt-0 items-center shrink-0 justify-center rounded-md text-xs font-medium border border-dark-blue bg-transparent shadow-sm h-9 px-4 py-2 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-[12px] w-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                        <rect width={18} height={18} x={3} y={4} rx={2} ry={2} />
                                        <line x1={16} x2={16} y1={2} y2={6} />
                                        <line x1={8} x2={8} y1={2} y2={6} />
                                        <line x1={3} x2={21} y1={10} y2={10} />
                                    </svg>
                                    {work.years}
                                </div>
                            </div>
                            <p className="text-sm pb-2 text-gray-400">{work.description}</p>
                            { index < workExperiences.length - 1 && <div data-orientation="horizontal" role="none" className="shrink-0 bg-dark-blue h-[1px] w-full"></div>}
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Work;