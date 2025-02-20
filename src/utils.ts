export function makeLinkSafe(word: string) : string {
    word = word.toLowerCase();
    word = word.replaceAll('ä', 'ae');
    word = word.replaceAll('ö', 'oe');
    word = word.replaceAll('ü', 'ue');
    word = word.replaceAll('ß', 'ss');

    return encodeURIComponent(word!.replaceAll(' ', '-'))
}

export function compare(a : any, b : any, reverse: boolean = false) : -1|0|1 {
    if (a > b) return reverse ? -1 : +1;
    if (a < b) return reverse ? +1 : -1;
    return 0;
}