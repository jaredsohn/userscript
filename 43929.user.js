// ==UserScript==
// @name 	Blipfoto css hack
// @namespace 	blipdiff
// @description 	Changes the css file for blip
// @version 	
// @date 	
// @creator 	
// @include 	
// ==/UserScript==
 	
        var bodyc = document.getElementByTagName("head")[0].innerHTML;
        bodyc = bodyC.replace("http://blipfoto.com/css/bbcode_v01.css","foobar");
