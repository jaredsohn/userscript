// ==UserScript==
// @name           Reddit Syntax highlight
// @description    Highlights code on reddit.
// @include        /https?://(\w+\.)?reddit\.com/r/.+/
// @resource style http://cdnjs.cloudflare.com/ajax/libs/highlight.js/7.4/styles/github.min.css
// @resource hljs  http://cdnjs.cloudflare.com/ajax/libs/highlight.js/7.4/highlight.min.js
// @icon           https://pbs.twimg.com/profile_images/378800000672381819/c17e7d9688d86bd9f9506ec1fbd6d200.png
// @grant          GM_addStyle
// @grant          GM_getResourceText
// @grant          GM_getResourceURL
// ==/UserScript==

var URL_RE = /https?:\/\/(?:\w+\.)reddit\.com\/r\/([^\/]+).*/
var BASE_URL = 'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/7.4/lang/'

var ALIAS_LISTS = [
    ['python', 'learnpython'],
    ['haskell'],
    ['java'],
    ['scala'],
    ['cpp'],
    ['rust'],
]

var LANGS = {}
for (var l=0; l<ALIAS_LISTS.length; l++) {
    var aliasList = ALIAS_LISTS[l]
    for (var a=0; a<ALIAS_LISTS[l].length; a++)
        LANGS[aliasList[a]] = aliasList[0]
}

function loadScript(url, callback) {
	var script = document.createElement("script")
	script.onload = callback
	script.src = url
	document.getElementsByTagName("head")[0].appendChild(script)
}

//main part

GM_addStyle(GM_getResourceText('style'))

var lang = URL_RE.exec(location.href)[1]
lang = LANGS[lang.toLowerCase()]

if (lang) {
    var codes = document.querySelectorAll('pre > code')
    for(var c=0; c<codes.length; c++) {
        codes[c].classList.add(lang)
    }
    
    loadScript(GM_getResourceURL('hljs'), function() {
    	loadScript(BASE_URL + lang + '.min.js', function() {
    		unsafeWindow.hljs.initHighlightingOnLoad()
    	})
	})
}