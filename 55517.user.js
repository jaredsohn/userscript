// ==UserScript==
// @name           MetaCafe Fixer
// @namespace      #aVg
// @description    Blocks ads, etc. Coming soon: download video free + load video when page is cancelled.
// @include        http://www.metacafe.com/watch/*
// @version        0.1
// ==/UserScript==
function single(A, B) {return document.evaluate(A, B || document, null, 9, null).singleNodeValue;}
function remove(A) {if(A) A.parentNode.removeChild(A);}
function $(A) {return document.getElementById(A);}
var play = $("fpObj");
if(play) {
	play.setAttribute("flashvars", play.getAttribute("flashvars").replace(/(?:adVendor(?:ID|ModuleURL)|preRollAd(?:URL|VendorID))=[^&]+/g,""));
	play.src += "";
} else {

}
remove($("MedRect"));
remove($("HeaderTover"));
remove(single("//li[@class='Tab ImageTab']"));