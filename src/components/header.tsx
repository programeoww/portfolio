import { BriefcaseIcon, HomeIcon, MailIcon, PresentationIcon } from '@/components/icons'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const navLinks = [
    {
        name: "Home",
        anchor: "home",
        Icon: HomeIcon,
    },
    {
        name: "Projects",
        anchor: "projects",
        Icon: PresentationIcon,
    },
    {
        name: "Work",
        anchor: "work",
        Icon: BriefcaseIcon,
    },
    {
        name: "Contact",
        anchor: "contact",
        Icon: MailIcon,
    },
];

function Header() {
    const router = useRouter();
    const hash = router.asPath.split('#')[1];

    useEffect(() => {
        if (window.location.hash === '' || window.location.hash === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
        else {
          setTimeout(() => {
            const id = window.location.hash.replace('#', '');
            const element = document.querySelector(`[data-hash="${id}"]`) as HTMLElement | null;
            if (element) {
                const topPos = element.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({
                    top: topPos,
                    behavior: 'smooth'
                });
            }
          }, 0);
        }
    }, [hash]);

    return (
        <div className='md:pt-3 top-0 sticky z-50 bg-[rgb(3,7,17)]'>
            <div className="border-t-0 border-l-0 border-r-0 border-b md:border border-dark-blue p-3 shadow-sm md:rounded-lg flex justify-between items-center">
                <div className="cursor-pointer border-dark-blue bg-secondary-blue border max-w-fit px-2 py-1 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:bg-secondary-blue/80">
                    @programeoww
                </div>
                <div className="space-x-1.5 md:space-x-3 items-center">
                    {navLinks.map(({ name, anchor, Icon }, index) => (
                        <button
                            onClick={() => router.push(`/#${anchor}`)}
                            key={index}
                            className="inline-flex border-dark-blue items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-secondary-blue rounded-md px-2 md:px-3 text-xs ml-auto h-8"
                        >
                            <Icon className="h-4 w-4" />
                            <span className="hidden md:inline-block ml-2">{name}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Header;
