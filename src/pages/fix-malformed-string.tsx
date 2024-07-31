import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { heDecode } from "./api/fix-malformed-string";
const inter = Inter({ subsets: ["latin"] });

function PageFixMalformedString() {
    const [output, setOutput] = useState<string>("");
    const [input, setInput] = useState<string>("");
    const [isCopied, setIsCopied] = useState<boolean>(false);

    useEffect(() => {
        setOutput(heDecode(input));
    }, [input]);

    const copyToClipboard = () => {
        setIsCopied(true);

        setTimeout(() => {
            setIsCopied(false);
        }, 1000);

        navigator.clipboard.writeText(output);
    };

    return (
        <main className={`md:max-w-4xl mx-auto md:pt-5 ${inter.className}`}>
        <div className="flex flex-col md:flex-row my-5 md:my-10 mx-5 md:mx-0 space-x-0 md:space-x-10 space-y-10 md:space-y-0">
            <div className="w-full space-y-5">
                <h1 className="text-3xl font-semibold text-center mb-16">Fix malformed string</h1>
                <div className="relative w-full">
                    <label htmlFor="input" className="block mb-2 text-sm font-medium">Input</label>
                    <textarea onChange={(e) => setInput(e.target.value)} id="input" rows={10} className="block p-2.5 w-full text-sm bg-secondary-blue rounded-lg border border-dark-blue outline-none duration-75 focus:border-gray-600" placeholder="Input your malformed string here..."></textarea>
                </div>

                <div className="relative w-full">
                    <label htmlFor="output" className="block mb-2 text-sm font-medium">Output</label>
                    <textarea value={output} id="output" rows={10} className="block p-2.5 w-full text-sm bg-secondary-blue rounded-lg border border-dark-blue outline-none duration-75 focus:border-gray-600" disabled></textarea>
                </div>

                <button onClick={copyToClipboard} className="w-full bg-dark-blue hover:bg-secondary-blue text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    {isCopied ? "Copied!" : "Copy to clipboard"}
                </button>
            </div>
        </div>
        </main>
    );
}

export default PageFixMalformedString;
