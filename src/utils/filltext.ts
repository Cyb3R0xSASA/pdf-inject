import { PDFDocument, PDFString, PDFName, PDFNull, PDFPage, rgb, PDFFont, PDFArray } from "pdf-lib";
import type { IDrawText, IFillText, IRemoveBG } from "../types/index.js";
import wrapText from "./wraptext.js";
import getMajorityDirection from "./identifyChars.js";

const removeBG = ({ field, pdf }: IRemoveBG): void => {
    try {
        for (const widget of field.acroField.getWidgets()) {
            widget.dict.set(PDFName.of('MK'), pdf.context.obj({ BG: PDFNull, BC: PDFNull }))
        }
    } catch (e) {
        return;
    }
}

const drawText = (lines: string[], width: number, y: number, x: number, { text, page, color, fontSize, font, maxWidth, fontHeight = 22, coords, center, dir }: IDrawText) => {
    let height = y;
    let counter = 0;
    for (const line of lines) {
        const textWidth = font.widthOfTextAtSize(line, fontSize);
        const coordX = center ? (width - textWidth) / 2 : dir === 'ltr' ? x : coords.x ? x + maxWidth - textWidth + coords.x : x + maxWidth - textWidth;
        const coordY = counter === 0 ? (coords.y ? coords.y + y : y) : (coords.y ? coords.y + height : height);

        page.drawText(line, {
            x: coordX,
            y: coordY,
            font,
            size: fontSize,
            color,
        });
        height -= fontHeight;
        counter++;
    }
    return height;
}

export const drawLinkedText = (
    page: PDFPage,
    pdfDoc: PDFDocument,
    text: string,
    x: number,
    y: number,
    font: PDFFont,
    size: number,
    url: string,
) => {
    page.drawText(text, {
        x,
        y,
        font,
        size,
        color: rgb(1, 1, 1),
    });

    const textWidth = font.widthOfTextAtSize(text, size);
    const textHeight = size;

    const linkAnnotation = pdfDoc.context.obj({
        Type: PDFName.of('Annot'),
        Subtype: PDFName.of('Link'),
        Rect: [x, y, x + textWidth, y + textHeight],
        Border: [0, 0, 0],
        A: {
            Type: PDFName.of('Action'),
            S: PDFName.of('URI'),
            URI: PDFString.of(url),
        },
    });

    const annots = page.node.lookup(PDFName.of('Annots'));

    if (annots) {
        (annots as PDFArray).push(linkAnnotation);
    } else {
        page.node.set(
            PDFName.of('Annots'),
            pdfDoc.context.obj([linkAnnotation]),
        );
    }
};

const fillText = ({ pdf, field, text, page, color, fontSize, font, maxWidth, fontHeight = 22, coords, center }: IFillText) => {
    removeBG({ field, pdf });

    for (const widget of field.acroField.getWidgets()) {
        let { x, y } = widget.getRectangle();
        const { width } = page.getSize()

        if (typeof text === 'string') {
            const lines = wrapText({ fontSize, text: text.replaceAll('(', '').replaceAll(')', ''), font, maxWidth });
            drawText(lines, width, y, x, { text, page, color, fontSize, font, maxWidth, fontHeight, coords, center })
        } else if (Array.isArray(text)) {
            let currentHeight = y;
            for (const tx of text) {

                const lines = wrapText({ fontSize, text: tx.replaceAll('(', '').replaceAll(')', ''), font, maxWidth });
                const dir = getMajorityDirection(tx);
                currentHeight = drawText(lines, width, currentHeight, x, { text: tx, page, color, fontSize, font, maxWidth, fontHeight: 8, coords, center, dir })
                currentHeight -= 2;
            }
        }
    }
}

export default fillText;