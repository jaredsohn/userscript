// ==UserScript==
// @name           KeyWord
// @namespace      C:\
// @description    Quick search enhanced; select some text and press a key to open a new tab in the background related to it
// @include        *
// ==/UserScript==

document.addEventListener("keypress", quickSearch, true)

function quickSearch(e) {
    if (isAQuickSearchToLaunch(e))
        GM_openInTab(internalMerge(window.getSelection().toString(), String.fromCharCode(e.which)))
    return true
}

function isAQuickSearchToLaunch(e) {
    return (isAQuickSearchKey(String.fromCharCode(e.which)) && window.getSelection().toString().length > 0 && !e.ctrlKey)
}

function isAQuickSearchKey(k) {
    return (k=="g" || k=="w" || k=="y" || k=="i" || k=="a" || k=="u" || k=="m" || k=="f" || k=='h'|| k=="s" || k=="d" || k=="b" || k=="n" || k=="1" || k=="t")
}

function internalMerge(s, k) {
    switch (k) {
        case "g": return "http://google.com/search?q=\""+s+"\""
        case "w": return "http://en.wikipedia.org/wiki/Special:Search?search=\""+s+"\""
        case "y": return "http://youtube.com/results?search_query=\""+s+"\""
        case "i": return "http://google.com/search?q=imdb \""+s+"\"&btnI=I'm%20feeling%20lucky"
        case "a": return "http://amazon.com/s/ref=nb_ss_w/402-6220924-0524100?field-keywords=\""+s+"\"&__mk_fr_FR=%C5M%C5Z%D5%D1&url=search-alias%3Daps"
        case "u": return "http://userscripts.org/scripts/search?q="+s+"\""
        case "m": return "http://google.com/search?q=myspace \""+s+"\"&btnI=I'm%20feeling%20lucky"
        case "f": return "http://images.google.com/images?hl=en&safe=off&q=\""+s+"\"&imgtype=face"
        case "h": return "http://www.manpagez.com/man/1/"+s
        case "s": return "http://www.wordreference.com/es/translation.asp?tranword="+s
        case "d": return "http://onelook.com/?w=" +s
        case "b": return "http://www.biblegateway.com/quicksearch/?quicksearch="+s
        case "n": return "http://www.urbandictionary.com/define.php?term="+s
        case "1": return "http://scholar.google.com/scholar?q="+s
        case "t": return "http://www.wordsmyth.net/live/home.php?script=search&matchent="+s+"&matchtype=exact"
    }
}