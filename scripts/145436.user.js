// ==UserScript==
// @name        WaniKani Jisho link placer.
// @namespace   mugimugi.org
// @description Create links for WaniKani to Jisho http://jisho.org/ for faster lockup.
// @include     http://www.wanikani.com/kanji/*
// @include 	http://www.wanikani.com/vocabulary/*
// @version     1.0.2
// @grant       none
// ==/UserScript==

window.unsafeWindow || (
	unsafeWindow = (function() {
		var el = document.createElement('p');
		el.setAttribute('onclick', 'return window;');
		return el.onclick();
	}())
);

var $ = window.unsafeWindow.jQuery;

var character = $("#doc-header .bordered").text();
    
if(window.location.href.indexOf("kanji") > -1)
{
    var url = 'http://jisho.org/kanji/details/' + character;
        
    AddLink(url, 'Jisho');
    
    $.get(url, function(data) {
        var image = $(data).find(".stroke_diagram img");
        if (image)
        {
            var url = 'http://jisho.org' + image.attr('src');
            var e = $("<div class='subsection'><h2>Stroke Order</h2><p><img src='" + url + "'></p></div>");
            $($(".span12")[0]).append(e);
        }
    });
}
	
if(window.location.href.indexOf("vocabulary") > -1)
{
    AddLink('http://jisho.org/words?dict=edict&common=on&jap=' + character, 'Jisho');
}
    
AddLink('http://jisho.org/sentences?jap=' + character, 'Sentences');
    
function AddLink(url, title)
{
    var btnGroup = $("#doc-header .btn-group")[0];
        
    var link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('target', '_blank');
    link.setAttribute('class', 'btn');
    link.appendChild(document.createTextNode(title)); 
        
    $(btnGroup).append(link);
}
