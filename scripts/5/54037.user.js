// ==UserScript==
// @name           Tattoo Johnny - Reveal Tattoo's
// @namespace      #aVg
// @include        http://www.tattoojohnny.com/product/*
// @version        0.1.4
// @license        CC by Attribution-Noncommercial-No Derivative Works 3.0 Unported (http://creativecommons.org/licenses/by-nc-nd/3.0/)
// @description    Replaces the watermarked SWF with just the bare image that it loads into view.
// ==/UserScript==
var swf = document.embeds[0], img = new Image(), p = swf.src.match(/p=([^&\?]+)/)[1];
img.src = "http://ll.tattoojohnny.com/prod/images/data/" + p.substring(0, 1) + "/" + p.substring(0, 2) + "/" + p.substring(0, 3) + "/"+ p +".jpg";
swf = swf.parentNode.parentNode;
swf.parentNode.replaceChild(img, swf);