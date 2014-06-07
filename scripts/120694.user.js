// ==UserScript==
// @name           Pinboard Shortcut (Ctrl+Q)
// @namespace      http://leplay.net/
// ==/UserScript==



function KeyDownEvent(event) {
    if (String.fromCharCode(event.which) == "Q"&& event.ctrlKey && !event.altKey && !event.metaKey) {

    var q=location.href;
    if(document.getSelection){
	    var d=document.getSelection();
    }
    else{
	    var d='';
    };
    var p=document.title; void(open('https://pinboard.in/add?showtags=yes&url='+encodeURIComponent(q)+'&description='+encodeURIComponent(d)+'&title='+encodeURIComponent(p),'Pinboard','toolbar=no,width=700,height=600'));

     try {
        event.preventDefault();
     } catch (e) {
     }
     return false;
    }
   return true;
 }

 document.addEventListener("keydown", KeyDownEvent, false);
