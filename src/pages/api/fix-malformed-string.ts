import alphaIndex from "@/data/alphaIndex";
import { NextApiRequest, NextApiResponse } from "next";
import utf8 from "utf8";

/**
 * Decodes a string that contains HTML entities and returns the decoded string.
 *
 * @param {string} r - The string to decode.
 * @return {string} The decoded string. If an error occurs during decoding, the string "Something went wrong" is returned.
 */
export function heDecode(r: string): string {
    try {
        const string = !r || !r.length ? "" : r.replace(/&(#?[\w\d]+);?/g, function (l, a: keyof typeof alphaIndex) {
            var e;
            if (a.charAt(0) === "#") {
                var t = a.charAt(1) === "x" ? parseInt(a.slice(2).toLowerCase(), 16) : parseInt(a.slice(1));
                isNaN(t) || t < -32768 || t > 65535 || (e = String.fromCharCode(t))
            } else
                e = alphaIndex[a];
            return e || l
        })

        return utf8.decode(string);
    } catch (error) {
        return "Something went wrong"
    }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { input } = req.body

        if (!input) return res.status(400).json({ 
            success: false,
            message: "No input provided"
        })

        res.json({
            success: true,
            data: heDecode(input)
        })
    }
}