// ==UserScript==
// @name           Images keyboard nav
// @namespace      NekoKitty
// @description    KITTY
// @include        

http://www.linuxkungfu.org/images/fun/geek/*
// ==/UserScript==








// Maps key ordinals to the key of the URL in the `urls` mapping.
var ord_to_key = {
    '110,f': "next", // n
    '98,f': "prev", // b
    '112,f': "prev", // p
    '44,f': "prev", // <
    '46,f': "next", // >
    '37,t': "prev", // CTRL + Left Arrow
    '39,t': "next", // CTRL + Right Arrow
};

var urls = "http://www.linuxkungfu.org/images/fun/geek/?image="; // "prev" and "next" keys -> URLs
var comic = null;
function getUrlVars()
{
var vars = [], hash;
var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
 
for(var i = 0; i < hashes.length; i++)
{
hash = hashes[i].split('=');
vars.push(hash[0]);
vars[hash[0]] = hash[1];
}
return vars;
}

var hashes=getUrlVars();


window.addEventListener("keypress", function(evt) {
    var ord = (evt.charCode || evt.keyCode);
	//alert(ord);
    if(ord==110)
    {
	var urltogo=urls+(parseInt(hashes['image'])+1);
	document.location.href=urltogo;
    }
    if(ord==98)
    {
	var urltogo=urls+(parseInt(hashes['image'])-1);
	document.location.href=urltogo;
    }
}, false);