// ==UserScript==
// @name           noPRO
// @namespace      noPRO
// @include        http://www.free-lance.ru/*
// ==/UserScript==
var code = "\
try{\
    window.addEvent('domready', function() {\
        $$('img[src=/images/icons/f-pro-s.png]').each(function(el){\
	        el.getParent('.project-preview').set('style','display:none')\
	})\
    });\
} catch(e){}";

var script = document.createElement("script");
script.type = "text/javascript";
script.innerHTML = code;
document.body.appendChild(script);
