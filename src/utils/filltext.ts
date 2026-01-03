import { PDFName, PDFNull } from "pdf-lib";
import type { IFillText, IRemoveBG } from "../types/index.js";
import wrapText from "./wraptext.js";

const removeBG = ({ field, pdf }: IRemoveBG): void => {
    try {
        for (const widget of field.acroField.getWidgets()) {
            widget.dict.set(PDFName.of('MK'), pdf.context.obj({ BG: PDFNull, BC: PDFNull }))
        }
    } catch (e) {
        return;
    }
}

const fillText = ({ pdf, field, text, page, color, fontSize, font, maxWidth, fontHeight = 22, coords }: IFillText) => {
    removeBG({ field, pdf });

    for (const widget of field.acroField.getWidgets()) {
        const { x, y } = widget.getRectangle();
        const lines = wrapText({ fontSize, text, font, maxWidth });

        let height = y;
        let counter = 0;
        for (const line of lines) {
            const textWidth = font.widthOfTextAtSize(line, fontSize);

            page.drawText(line, {
                x: coords.x ? x + maxWidth - textWidth + coords.x : x + maxWidth - textWidth,
                y: counter === 0 ? (coords.y ? coords.y + y : y) : (coords.y ? coords.y + height : height),
                font,
                size: fontSize,
                color,
            });
            height -= fontHeight;
            counter++;
        }
    }
}

export default fillText;