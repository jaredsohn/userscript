// ==UserScript==
// @name        PA Pic Related
// @namespace   http://userscripts.org/users/anonymous
// @include     http://kodu.ut.ee/~roman_l/global*
// @version     1
// ==/UserScript==


var rand = function(arr){
return arr[0 | Math.random() * (arr.length)]
}

var h = document.querySelector('h2')
console.dir(h)
var txt = h.textContent.trim()
var words = txt
.match(/\W([А-Я][а-я]{3,})\W/g);
if (!words.length) {
    var words = txt
    .split(/[^а-я]+/i);
}

    words = words.map(function(v){
      return v.match(/[а-я]+/i)[0].trim()
    })

    var w = rand(words)
    var i = new Image();
    i.src = 'http://' + w + '.jpg.to?small+r';
    i.setAttribute('style', 'max-height:200px; max-width:200px; float:left; padding-right: 10px;');

    h.setAttribute('style', 'display: block;');
    h.parentNode.insertBefore(i,h)
