export function makeLinkSafe(word: string) : string {
    word = word.toLowerCase();
    word = word.replaceAll('ä', 'ae');
    word = word.replaceAll('ö', 'oe');
    word = word.replaceAll('ü', 'ue');
    word = word.replaceAll('ß', 'ss');

    return encodeURIComponent(word!.replaceAll(' ', '-'))
}
