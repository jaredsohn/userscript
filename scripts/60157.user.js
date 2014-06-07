// ==UserScript==
// @name           de-norris hudson
// @namespace      http://userscripts.org/users/jrr
// @description    Attempts to undo (client-side) the ChuckNorris plugin for Hudson continuous integration server (http://wiki.hudson-ci.org/display/HUDSON/ChuckNorris+Plugin)
// ==/UserScript==

//v2.4 2009.12.28 - aggravated by occasional unmatched quotes, I decompiled the hudson plugin to get the actual list of quotes, and updated the regex to match THEM ALL
//v2.3 2009.11.03 - now searches for bruce schneier as well
//v2.2 2009.10.28 - an even more aggressive regex because not all quotes begin with "Chuck Norris"
//v1.1 2009.10.27 - makes the quote replacement case insensitive, as there was a lowercase norris that snuck out and got me

//removes quotes
var texts = document.evaluate("//text()[normalize-space(.)!='']",document,null,6,null), text="";
for(var i=0,l=texts.snapshotLength; (this_text=texts.snapshotItem(i)); i++) {
	if(isOkTag(this_text.parentNode.tagName.toLowerCase()) && (text=this_text.textContent)) {
   text = text.replace(/([a-z \"#]*bruce[a-z \"#]*schneier[^\n]*)/i, "");
   text = text.replace(/([a-z \"#]*chuck[a-z \"#]*norris[^\n]*)/i, "");
	this_text.textContent = text;
	}
}

//removes regular (IMG tag) images
var di=document.images;
for(var i=0;i<di.length;i++){
   if(di[i].src.search("bruceschneier") != -1 || di[i].src.search("chucknorris") != -1)
      di[i].parentNode.removeChild(di[i]);
}

//removes background images
var mp = document.getElementById('main-panel');
if(mp.style.backgroundImage.search("bruceschneier") != -1 || mp.style.backgroundImage.search("chucknorris") != -1)
   mp.style.backgroundImage="";

//thanks to http://userscripts.org/scripts/show/41369
function isOkTag(tag) {
var ok = true;
var badTags = new Array('pre','blockquote','code','input','button','textarea');
for each(var badTag in badTags) if(tag==badTag) ok=false;
return ok;
}