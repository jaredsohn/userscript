// ==UserScript==
// @name           Pinboard - Shortcut (Ctrl+D)
// @author         leplay / jekyll
// @namespace      http://userscripts.org/scripts/show/156067
// @description    Press Ctrl + D to add the opened webpage to pinboard.in using the same-page tag-cloud bookmarklet
// @grant          none
// ==/UserScript==

// original script by leplay - http://userscripts.org/scripts/show/120694
// modified by jekyll@0x4a.net 

function KeyDownEvent(event) {
    // changed key to D
    if (String.fromCharCode(event.which) == "D"&& event.ctrlKey && !event.altKey && !event.metaKey) {

    var q=location.href;
    if(document.getSelection){
	    var d=document.getSelection();
    }
    else{
	    var d='';
    };
    var p=document.title;
    // changed to same-page tag-cloud bookmarklet
    document.location='https://pinboard.in/add?showtags=yes&next=same&url='+encodeURIComponent(q)+'&description='+encodeURIComponent(d)+'&title='+encodeURIComponent(p);
    try {
        event.preventDefault();
     } catch (e) {
     }
     return false;
    }
   return true;
 }
 document.addEventListener("keydown", KeyDownEvent, false);

                              