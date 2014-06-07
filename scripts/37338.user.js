// ==UserScript==
// @name           Cyrillicizer
// @description    Changes text on page to fake cyrillic by replacing Latin letters with similar looking cyrillic letters.
// @namespace      http://www.elovirta.com/greasemonkey
// @include        *
// ==/UserScript==

var map = {
    Th: "\u040B", //Ћ
    th: "\u045B", //ћ
    //BI: "\u042B", //Ы
    bi: "\u044B", //ы
    IE: "\u0464", //Ѥ
    ie: "\u0465", //ѥ
    IA: "\u0468", //Ѩ
    ia: "\u0469", //ѩ
    Hb: "\u040A", //Њ
    hb: "\u045A", //њ
    
    A: "\u0466", //Ѧ
    a: "\u0467", //ѧ
    B: "\u0182", //Ƃ
    b: "\u0184", //ƃƄ
    C: "\u0421", //С
    c: "\u0441", //с
    // D
    // d
    E: "\u0404", //ЄЭ
    e: "\u0454", //єэ
    // F
    // f
    G: "\u0480", //Ҁ
    g: "\u0481", //ҁ
    // H
    h: "\u043D", //н
    I: "\u0406", //І
    I: "\u0456", //і
    J: "\u0408", //Ј
    j: "\u0458", //ј
    K: "\u041A", //К
    k: "\u043A", //к
    // L
    l: "\u029F", //ʟ
    // M
    m: "\u043C", //м
    N: "\u0418", //И
    n: "\u0438", //пи
    O: "\u00D8", //Ø
    o: "\u00F8", //ø
    //P
    p: "\u0440", //р
    Q: "\u047A", //Ѻ
    q: "\u047B", //ѻ
    R: "\u042F", //Я
    r: "\u044F", //яг
    S: "\u0405", //Ѕ
    s: "\u0455", //ѕ
    T: "\u0422", //Т
    t: "\u0442", //т
    // U
    // u
    v: "\u0475", //ѵ
    V: "\u0474", //Ѵ
    W: "\u0428", //ШѠ
    w: "\u0448", //шѡ
    Y: "\u0427", //Ч
    y: "\u0447", //ч
    X: "\u0425", //Х
    x: "\u0445" //х
}

function convert(str) {
    var res = "";
    var len = str.length;
    var cur = undefined;
    var start = 0;
    var m = undefined;
    for (var i = 0; i < len; i++) {
        m = map[str.substring(i, i + 2)];   
        if (m !== undefined) {
            if (m !== undefined) {
                if (start !== i) {
                    res += str.slice(start, i);
                }
                res += m;
                i++;
                start = i + 1;
            }
        } else {
            m = map[str.charAt(i)];
            if (m !== undefined) {
                if (start !== i) {
                    res += str.slice(start, i);
                }
                res += m;
                start = i + 1;
            }
        }
    }
    if (start !== len) {
      res += str.slice(start, len);
    }
    return res;
}

function walk(n) {
    switch(n.nodeType) {
    case 1:
        var cur = n.firstChild;
        while (cur !== null) {
            walk(cur);
            cur = cur.nextSibling;
        }
        break;
    case 3:
    case 4:
        n.data = convert(n.data);
    }
}

walk(document.documentElement);