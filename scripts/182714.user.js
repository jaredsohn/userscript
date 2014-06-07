// ==UserScript==
// @name        News fun infuser
// @namespace   http://felixnemis.mooo.com/
// @description XKCD 1288 automated
// @include     http*
// @version     1.3
// @grant       none
// ==/UserScript==

//All code by Moshe Kolodny via http://kolodny.github.io/secrets/blog/2013/11/10/make-news-more-fun/
//User script by FelixNemis

var dict = {
    "Witnesses": "these dudes I know",
    "Allegedly": "kinda probably",
    "New study": "tumblr post",
    "Rebuild": "avenge",
    "Space": "spaaace",
    "Google Glass": "virtual Boy",
    "Smartphone": "pokedex",
    "Electric": "atomic",
    "Senator": "elf-lord",
    "Car": "cat",
    "Election": "eating contest",
    "Congressional leaders": "river spirits",
    "Homeland security": "Homestar Runner",
    "Could not be reached for comment": "is guilty and everyone knows it"
}
var dictRegex = new RegExp('(.)(\\s*)\\b(' + Object.keys(dict).join('|').replace(/\s\s*/g, '\\s*') + ')', 'gi');
var dictReplacers = [];
for (var i in dict) {
    dictReplacers.push([new RegExp(i.replace(/\s\s*/g, '\\s'), 'i'), dict[i]])
}
var textNodes = [];
var all = document.getElementsByTagName('*');
for (var i = 0; i < all.length; i++) {
    for (var j = 0; j < all[i].childNodes.length; j++) {
        if (all[i].childNodes[j].nodeType === 3) {            
            textNodes.push(all[i].childNodes[j]);
        }
    }
}
for (i = 0; i < textNodes.length; i++) {
    if (textNodes[i] && textNodes[i].nodeValue) {
        textNodes[i].nodeValue = textNodes[i].nodeValue.replace(dictRegex, function(all, preChar, spaces) {
            console.log(preChar)
            for (var j = 0; j < dictReplacers.length; j++) {
                if (dictReplacers[j][0].test(all)) {
                    return preChar + spaces + (!/[a-z\x27]/i.test(preChar) ?
                        dictReplacers[j][1].charAt(0).toUpperCase() + dictReplacers[j][1].slice(1) :
                        dictReplacers[j][1])
                }
            }
        });
    }
}