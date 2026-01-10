import { PDFName, PDFNull } from "pdf-lib";
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

const drawText = (width: number, y: number, x: number, height: number, { text, page, color, fontSize, font, maxWidth, fontHeight = 22, coords, center, dir }: IDrawText) => {
    const lines = wrapText({ fontSize, text: text, font, maxWidth });

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
}

const fillText = ({ pdf, field, text, page, color, fontSize, font, maxWidth, fontHeight = 22, coords, center }: IFillText) => {
    removeBG({ field, pdf });

    for (const widget of field.acroField.getWidgets()) {
        let { x, y } = widget.getRectangle();
        const { width } = page.getSize()
        let height = y;

        if (typeof text === 'string') {
            drawText(width, y, x, height, { text, page, color, fontSize, font, maxWidth, fontHeight, coords, center })
        } else {
            for (const tx of text) {
                const dir = getMajorityDirection(tx);
                drawText(width, y, x, height, { text: tx, page, color, fontSize, font, maxWidth, fontHeight: 8, coords, center, dir })
                height -= dir === 'ltr' ? 20 : 10;
                y = height + 2
            }
        }
    }
}

export default fillText;