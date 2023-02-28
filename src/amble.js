// Based on https://gist.github.com/jonathantneal/3086586

const CSS_STATEMENT_RE = /([^{};]*)([;{}])/g;
const LINE_BREAK_RE = /(\r\n|\r|\n)+/g;
const TAB_RE = /\t/g;
const EXTRA_SPACES_RE = /\s{2,}/g;
const COMMENTS_RE = /\/\*[\W\w]*?\*\//g;
const TRAILING_SEPARATOR_SPACES_RE = /\s*([:;{}])\s*/g;
const UNNECESSARY_SEPARATOR_RE = /\};+/g;
const TRAILING_SEPARATORS_RE = /([^:;{}])}/g;

function normalize(css) {
    return css
        .replace(LINE_BREAK_RE, ' ')
        .replace(TAB_RE, ' ')
        .replace(EXTRA_SPACES_RE, ' ')
        .replace(COMMENTS_RE, '')
        .trim()
        .replace(TRAILING_SEPARATOR_SPACES_RE, '$1')
        .replace(UNNECESSARY_SEPARATOR_RE, '}')
        .replace(TRAILING_SEPARATORS_RE, '$1;}');
}

export function walk(css, callback) {
    css = normalize(css);
    CSS_STATEMENT_RE.lastIndex = 0;
    for (let m; (m = CSS_STATEMENT_RE.exec(css)) != null;) {
        callback(m[1], m[2]);
    }
}
