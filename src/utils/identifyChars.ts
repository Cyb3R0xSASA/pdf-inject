const getMajorityDirection = (text: string): 'rtl' | 'ltr' => {
    const arabicRegex = /\p{Script_Extensions=Arabic}/gu;
    const englishRegex = /\p{Script=Latin}/gu;

    const arabicCount = (text.match(arabicRegex) || []).length;
    const englishCount = (text.match(englishRegex) || []).length;

    return arabicCount < englishCount ? 'ltr' : 'rtl';
}

export default getMajorityDirection;