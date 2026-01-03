import type { IWrapText } from "../types/index.js";

const wrapText = ({ font, fontSize, maxWidth, text }: IWrapText): string[] => {
    if (!text) return [''];
    const words = String(text).split(' ');
    const lines = [];
    let current = '';

    for (const word of words) {
        const candidate = current ? `${current} ${word}` : word;
        const width = font.widthOfTextAtSize(candidate, fontSize);
        if (width <= maxWidth) {
            current = candidate;
        } else {
            if (current) lines.push(current);
            if (font.widthOfTextAtSize(word, fontSize) > maxWidth) {
                let part = '';
                for (const ch of word) {
                    const cand = part + ch;
                    if (font.widthOfTextAtSize(cand, fontSize) <= maxWidth) {
                        part = cand;
                    } else {
                        if (part) lines.push(part);
                        part = ch;
                    }
                }
                current = part;
            } else {
                current = word;
            }
        }
    }
    if (current) lines.push(current);
    return lines;
};

export default wrapText;