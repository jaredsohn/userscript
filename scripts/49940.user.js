// ==UserScript==
// @name           yazztter Words link
// @namespace      http://web.zgo.jp/
// @include        http://twitter.com/yazztter*
// @description    yazztterのホットなキーワードにリンクをつけます。
// ==/UserScript==
(function() {
var repalceSite = "http://buzztter.com/ja/k/";
// var repalceSite = "http://pcod.no-ip.org/yats/search?query="; でもいいかも

// http://d.hatena.ne.jp/javascripter/20080805/1217912008
var getElementsByClassNameS = function(className, doc) {
    var names = className.split(/\s+/),
    all = doc.getElementsByTagName("*"),
    memo = {},
    ret = [];
    for (var i = 0, l = all.length, elem, iname, flag; i < l; i++) {
        elem = all[i];
        iname = elem.className;
        if (! (iname in memo)) memo[iname] = " " + iname.toLowerCase() + " ";
        for (var j = 0, jname; j < names.length; j++) {
            jname = names[j];
            if (! (jname in memo)) memo[jname] = " " + jname.toLowerCase() + " ";
            if (flag = memo[iname].indexOf(memo[jname]) != -1) continue;
            else break;
        }
        if (flag) ret[ret.length] = elem;
    }
    return ret;
}
var resTwit = getElementsByClassNameS("entry-content", document);
for (var i = 0; i < resTwit.length; i++) {
    var wordYaz = resTwit[i].textContent.split(', ')
    var tmpYaz = [];
    for (var j = 0; j < wordYaz.length; j++) {
        tmpYaz.push(wordYaz[j].link(repalceSite + wordYaz[j]))
    }
    resTwit[i].innerHTML = tmpYaz;
}
})();