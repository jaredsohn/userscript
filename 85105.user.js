// ==UserScript==
// @name          DisConnect
// @description   Remove twitter and facebook connect options; updated
// @author        daluci
// @include       http://livejournal.com/*
// @include       http://*.livejournal.com/*
// ==/UserScript==

(function() {

var Replaced = '<strong>Repost to</strong>';
var ReplacedToo = 'Twitter\n                </label>\n            </p>';

var exists = document.getElementById('qrdiv');

if (exists != null)
{
var Original = document.getElementById('qrdiv').innerHTML;

var New = Original.replace(Replaced, '<!--');
New = New.replace(ReplacedToo, '-->');

document.getElementById('qrdiv').innerHTML = New;
}

var exists2 = document.getElementById('postform');

if (exists2 != null){
var Original = document.getElementById('postform').innerHTML;

var New = Original.replace(Replaced, '<!--');
New = New.replace(ReplacedToo, '-->');

document.getElementById('postform').innerHTML = New;
}


})();