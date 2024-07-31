import Header from '@/components/header'
import { CheckIcon, GithubIcon } from '@/components/icons'
import Projects from '@/components/projects'
import TechStack from '@/components/techStack'
import Work from '@/components/workExperiences'
import projectList from '@/data/projects'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const faviconTag = document.getElementById("faviconTag") as HTMLLinkElement;
    const isDark = window.matchMedia("(prefers-color-scheme: dark)");
    const changeFavicon = () => {
        if (isDark.matches) faviconTag.href = "./favicon-dark.ico";
        else faviconTag.href = "./favicon.ico";
      };
    changeFavicon();
  }, []);

  return (
    <>
      <Script async src="https://www.googletagmanager.com/gtag/js?id=G-R7M5WNE6BT"></Script>
      <Head>
        <title>Portfolio | @programeoww</title>
        <meta name="description" content="Portfolio of Hieu Ngo Minh" />
        <meta name="keywords" content="Portfolio, Hieu Ngo Minh, programeoww" />
        <meta name="author" content="@programeoww" />
        <link rel="icon" href="./favicon.ico" id="faviconTag" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <meta name="og:title" content="Portfolio | @programeoww" />
        <meta name="og:description" content="Portfolio of Hieu Ngo Minh" />
        <meta name="og:type" content="website" />
        <meta name="og:url" content="https://programeoww.github.io/" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', 'G-R7M5WNE6BT');
          `,
        }}
        />
      </Head>
      <main
        className={`md:max-w-4xl mx-auto md:pt-5 ${inter.className}`}
      >
        <Header />
        <div className='flex flex-col md:flex-row my-5 md:my-10 mx-5 md:mx-0 space-x-0 md:space-x-10 space-y-10 md:space-y-0'>
          <div className='rounded-xl border border-dark-blue shadow flex flex-col space-y-2 p-4 h-fit static md:sticky top-24 md:w-1/3 w-full'>
            <p className="font-semibold leading-none tracking-tight">Hieu Ngo Minh</p>
            <p className="text-sm text-gray-400">
              👋 Hi, I&lsquo;m Hieu, a Front-end developer. I always keep myself updated and learn new technologies to apply them to my projects. I have the ability to work independently and effectively in a team, and I can solve problems and provide optimal solutions for challenges during the development process. 
            </p>
            <a href={"https://github.com/programeoww/"} className="inline-flex border-dark-blue items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-secondary-blue rounded-md px-2 md:px-3 text-xs mr-auto h-8">
              <GithubIcon className='h-4 w-4' />
              <span className="hidden md:inline-block ml-2">My Github</span>
            </a>
          </div>
          <div className="md:w-2/3 w-full space-y-5">
            <section data-hash="home" className='space-y-5'>
              <h1 className="text-2xl font-bold tracking-tight">I can transform YOUR concepts into interactive and user-friendly front-end experiences.</h1>
              <h2 className="text-gray-400">Simple. Consistent. Lasting.</h2>
              <div data-orientation="horizontal" role="none" className="shrink-0 bg-dark-blue h-[1px] w-full"></div>
              <div className="flex justify-between flex-col-reverse md:flex-row space-y-4 space-y-reverse md:space-y-0">
                <button onClick={() => router.push(`/#contact`)} className='inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 text-black bg-white shadow hover:bg-white/90 h-9 px-4 py-2'
                >
                  <CheckIcon className='h-4 w-4' />
                  <span className="inline-block ml-2">Contact Me</span>
                </button>
                <div className="space-y-1"><h3 className="font-medium leading-none">2 years</h3><p className="text-xs text-gray-400">Experience</p></div>
                <div className="space-y-1"><h3 className="font-medium leading-none">Ha Noi, Viet Nam 🇻🇳</h3><p className="text-xs text-gray-400">Location</p></div>
              </div>
              <div data-orientation="horizontal" role="none" className="shrink-0 bg-dark-blue h-[1px] w-full"></div>
              <div className='space-y-1'>
                <h3 className="text-2xl font-semibold tracking-tight">Tech Stack</h3>
                <TechStack />
              </div>
            </section>
            <div data-orientation="horizontal" role="none" className="shrink-0 bg-dark-blue h-[1px] w-full"></div>
            <section data-hash="projects" className='space-y-5'>
              <h3 className="text-2xl font-semibold tracking-tight">Projects <span className="text-gray-400 text-sm">({projectList.length})</span></h3>
              <Projects />
            </section>
            <section data-hash="work" className='space-y-5'>
              <h3 className="text-2xl font-semibold tracking-tight">Work</h3>
              <Work />
            </section>
            <section data-hash="contact" className='space-y-5'>
              <h3 className="text-2xl font-semibold tracking-tight">Contact</h3>
              <div className="mt-5 rounded-xl border border-dark-blue shadow">
                <p className="p-6 text-sm">Best way to reach me is through: {` `}
                  <a className='underline underline-offset-4' href="mailto:hieunm156@gmail.com">hieunm156@gmail.com</a>
                </p>
              </div>
            </section>
            <p className="mb-8 text-sm text-gray-400 text-center">©2023 @programeoww. All rights reserved.</p>
          </div>
        </div>
      </main>
    </>
  )
}
