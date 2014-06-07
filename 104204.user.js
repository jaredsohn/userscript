// ==UserScript==
// @name           NoLatin
// @description    Removes Latin characters or text from web pages. Useful for immersing oneself in a non-Western language.
// @namespace      http://www.yonsei.ac.kr
// @include        *
// ==/UserScript==

// Adapted quickly and naively from Cyrillicizer (Emacs macros!).  If I have time, I'll refactor it.
// I'm also planning on a version which passes over proper nouns and short phrases (as are commonly not transcribed into Korean.)

var map = {

    a: "*",
    b: "*",
    c: "*",
    d: "*",
    e: "*",
    f: "*",
    g: "*",
    h: "*",
    i: "*",
    j: "*",
    k: "*",
    l: "*",
    m: "*",
    n: "*",
    o: "*",
    p: "*",
    q: "*",
    r: "*",
    s: "*",
    t: "*",
    u: "*",
    v: "*",
    w: "*",
    x: "*",
    y: "*",
    z: "*",
    
    A: "*",
    B: "*",
    C: "*",
    D: "*",
    E: "*",
    F: "*",
    G: "*",
    H: "*",
    I: "*",
    J: "*",
    K: "*",
    L: "*",
    M: "*",
    N: "*",
    O: "*",
    P: "*",
    Q: "*",
    R: "*",
    S: "*",
    T: "*",
    U: "*",
    V: "*",
    W: "*",
    X: "*",
    Y: "*",
    //  ' ': " ",
    Z: "*"
    
}

function convert(str) {
    var res = "";
    var len = str.length;
    var cur = undefined;
    var start = 0;
    var m = undefined;
    var subs = "";
    var orig = "";
    var threshold = 0; // Change this value if you want to allow Latin strings up to a certain size.

    for (var i = 0; i < len; i++) {
	m = map[str.charAt(i)];
	if (m !== undefined) {   
	    if (start !== i) {
		res += str.slice(start, i);
	    }
	    subs += m;
	    orig += str.charAt(i);
	    start = i + 1;
	}
	else { //We finally hit a non-english character ... damn, what about spaces?
	    if (subs.length > threshold) {
		res += subs;
	    }
	    else {
		res += orig;
	    }
	    subs = "";
	    orig = "";
	}
    }
    if (start !== len) {
	res += str.slice(start, len);
    }
    if (subs.length > threshold) {
	res += subs;
    }
    else {
	res += orig;
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