// ==UserScript==
// @name       Motherless preview script
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  This script shows thumbnails for Motherless videos on 4chan
// @match      http://boards.4chan.org/*
// @copyright  2014+, Abonydous
// ==/UserScript==

var not_mless_matcher = new RegExp("(/[0-9A-F]{3})([0-9A-F]{4})\\b","gm");
var not_mless_replacer = "$1FUcK_NO-THis^IS-nO_MOTHerLESS$2"; // no fucking shitcunt writes like this
var mless_matcher = new RegExp("\\b[0-9A-F]{7}\\b","gm");
var mless_replacer = 
    "<div style='background:#444; color: #AAA; border:1px solid brown; font-size:10px; padding: 1px 3px; display:inline-block'>"+
    	"MLess: $&"+
    	"<div>"+
    		"<a href='http://motherless.com/$&'>"+
    			"<img src='http://thumbs.motherlessmedia.com/thumbs/$&.gif' alt='Motherless: $&' style='width:auto;height:100px'/>"+
    		"</a>"+
    	"</div>"+
    "</div>";
var not_mless_finalize_matcher = "FUcK_NO-THis^IS-nO_MOTHerLESS";

Array.prototype.forEach.call(document.getElementsByClassName("postMessage"),
                             function(el) {
                                 var html= el.innerHTML;
                                 html = html.replace(not_mless_matcher, not_mless_replacer);
                                 html = html.replace(mless_matcher, mless_replacer);
                                 html = html.replace(not_mless_finalize_matcher, "");
                                 el.innerHTML = html;
                             });