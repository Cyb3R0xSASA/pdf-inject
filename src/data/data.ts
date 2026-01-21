import type { IBaseData, IStage, ITemplateItem } from "../types/index.js";

export const baseData = ({ grade, school, subject, principle, teacher, lessons }: IBaseData): ITemplateItem[] => [
    {
        "id": 1,
        "fontSize": 7,
        "maxWidth": 250,
        "text": school ? `مدرسة : ${school}` : '',
        "fontHeight": 22,
        "color": [
            1,
            1,
            1
        ],
        "coords": {
            "x": -103,
            "y": 16
        },
        "center": false
    },
    {
        "id": 2,
        "fontSize": 8,
        "maxWidth": 250,
        "text": subject ?? "",
        "fontHeight": 22,
        "color": [
            0,
            0,
            0
        ],
        "coords": {
            "x": -130,
            "y": 8
        },
        "center": false
    },
    {
        "id": 3,
        "fontSize": 8,
        "maxWidth": 250,
        "text": grade ?? "",
        "fontHeight": 22,
        "color": [
            0,
            0,
            0
        ],
        "coords": {
            "x": -140,
            "y": 8
        },
        "center": false
    },
    {
        "id": 4,
        "fontSize": 8,
        "maxWidth": 250,
        "text": "الفصل الدراسي الثاني",
        "fontHeight": 22,
        "color": [
            0,
            0,
            0
        ],
        "coords": {
            "x": -140,
            "y": 8
        },
        "center": false
    },
    {
        "id": 5,
        "fontSize": 8,
        "maxWidth": 250,
        "text": "7441 هـ",
        "fontHeight": 22,
        "color": [
            0,
            0,
            0
        ],
        "coords": {
            "x": -140,
            "y": 8
        },
        "center": false
    },
    {
        "id": 6,
        "fontSize": 10,
        "maxWidth": 250,
        "text": teacher ?? "",
        "fontHeight": 22,
        "color": [
            1,
            1,
            1
        ],
        "coords": {
            "x": -100,
            "y": 8
        },
        "center": false
    },
    {
        "id": 7,
        "fontSize": 10,
        "maxWidth": 430,
        "text": principle ?? "جميع الحقوق محفوظة لتحضير بلس © 3202  للحصول على نسخة باسم المعلم والمدير اضغط هنا",
        "fontHeight": 22,
        "color": [
            1,
            1,
            1
        ],
        "coords": {
            "x": 80, // -120
            "y": 8
        },
        "center": true
    },
    {
        id: 8,
        text: lessons[0] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 9,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": -1,
            "y": 76
        },
        center: false,
    },
    {
        id: 9,
        text: lessons[1] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 9,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": -1,
            "y": 76
        },
        center: false,

    },
    {
        id: 10,
        text: lessons[2] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": -1,
            "y": 76
        },
        center: false,

    },
    {
        id: 11,
        text: lessons[3] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": -1,
            "y": 76
        },
        center: false,

    },
    {
        id: 12,
        text: lessons[4] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": -1,
            "y": 76
        },
        center: false,

    },
    {
        id: 13,
        text: lessons[5] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": -1,
            "y": 76
        },
        center: false,

    },
    {
        id: 14,
        text: lessons[6] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": 1,
            "y": 90
        },
        center: false,

    },
    {
        id: 15,
        text: lessons[7] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": 1,
            "y": 90
        },
        center: false,

    },
    {
        id: 16,
        text: lessons[8] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": 1,
            "y": 90
        },
        center: false,

    },
    {
        id: 17,
        text: lessons[9] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": 1,
            "y": 90
        },
        center: false,

    },
    {
        id: 18,
        text: lessons[10] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": 1,
            "y": 90
        },
        center: false,

    },
    {
        id: 19,
        text: lessons[11] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": 1,
            "y": 90
        },
        center: false,

    },
    {
        id: 20,
        text: lessons[12] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": 1,
            "y": 85
        },
        center: false,

    },
    {
        id: 21,
        text: lessons[13] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": 1,
            "y": 85
        },
        center: false,

    },
    {
        id: 22,
        text: lessons[14] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": 1,
            "y": 85
        },
        center: false,

    },
    {
        id: 23,
        text: lessons[15] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": 1,
            "y": 85
        },
        center: false,

    },
    {
        id: 24,
        text: lessons[16] ?? [''],
        "fontSize": 6,
        "maxWidth": 114,
        "fontHeight": 10,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": (lessons[16] as string[])?.length === 1 ? -1 : 1,
            "y": (lessons[16] as string[])?.length === 1 ? 50 : 85
        },
        center: false,

    },
    {
        id: 25,
        text: lessons[17] ?? [''],
        "fontSize": 10,
        "maxWidth": 110,
        "fontHeight": 15,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": 0,
            "y": 20
        },
        center: false,

    },
    {
        id: 26,
        text: lessons[18] ?? [''],
        "fontSize": 12,
        "maxWidth": 114,
        "fontHeight": 8,
        "color": [
            0, 0, 0
        ],
        "coords": {
            "x": -17,
            "y": 20
        },
        center: false,

    },
];

export const stages: IStage[] = [
    {
        "name": "المرحلة المتوسطة",
        "id": 1,
    },
    {
        "name": "المرحلة الابتدائية",
        "id": 2,
    },
    {
        "name": "الثانوية العامة",
        "id": 3,
    }
]