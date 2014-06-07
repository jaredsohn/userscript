// ==UserScript==
// @name			UTF-8 Word-spacing For Google Reader
// @description   	Insert A Word-spacing between English(Number) and Non-English For Google Reader Version
// @author          sfufoet
// @version         0.2.2
// @date            2008-09-30
// @namespace       http://blog.loland.net/2008/09/30/59.et
// @include       	http://www.google.com/reader/*
// @include		  	https://www.google.com/reader/*
// ==/UserScript==

var currentEntry, temp;
var entries = document.getElementById('entries');
//entries.addEventListener('DOMNodeInserted', function(){init();},true);

function ReplaceEntryMain(){
	if(document.getElementById('current-entry')!=null)
		currentEntry = getFirstElementMatchingClassName(document.getElementById('current-entry'),'div','entry-main');
	if(currentEntry && currentEntry.innerHTML.search(/<!\-\-Ready\-\->/i)==-1){
		temp=currentEntry.innerHTML;
		temp=temp.replace(/<wbr>/ig,"");
		temp=temp.replace(/<i>/ig,"");
		temp=temp.replace(/<\/i>/ig,"");
		temp=temp.replace(/<em>/ig,"");
		temp=temp.replace(/<\/em>/ig,"");
		temp=temp.replace(/([a-z0-9~!@#\$\%\^&;\*\-_\+=\,<\.>\/(\\)\?\:\'\"\[\]\(\)]+)/ig," $1 ");
		temp=temp.replace(/ <\/a>/g,"</a>");
		temp=temp.replace(/(<br>)+/g,"<br /><br />");
		temp=temp.replace(/(<br \/>)+/g,"<br /><br />");
		temp=temp.replace(/(<br\/>)+/g,"<br /><br />");
		temp=temp.replace(/( +)/g," ");
		currentEntry.innerHTML="<!--Ready-->"+temp;
	}
	if(document.getElementById('current-entry')!=null)
		currentEntry = getFirstElementMatchingClassName(document.getElementById('current-entry'),'div','entry-container');
	if(currentEntry && currentEntry.innerHTML.search(/<!\-\-Ready\-\->/i)==-1){
		temp=currentEntry.innerHTML;
		temp=temp.replace(/<wbr>/ig,"");
		temp=temp.replace(/<i>/ig,"");
		temp=temp.replace(/<\/i>/ig,"");
		temp=temp.replace(/<em>/ig,"");
		temp=temp.replace(/<\/em>/ig,"");
		temp=temp.replace(/([a-z0-9~!@#\$\%\^&;\*\-_\+=\,<\.>\/(\\)\?\:\'\"\[\]\(\)]+)/ig," $1 ");
		temp=temp.replace(/ <\/a>/g,"</a>");
		temp=temp.replace(/(<br>)+/g,"<br /><br />");
		temp=temp.replace(/(<br \/>)+/g,"<br /><br />");
		temp=temp.replace(/(<br\/>)+/g,"<br /><br />");
		temp=temp.replace(/( +)/g," ");
		currentEntry.innerHTML="<!--Ready-->"+temp;
	}
}

function init(){
	entries.addEventListener('click', function(event) {
			ReplaceEntryMain();
	    }, false);
	entries.addEventListener('scroll', function(event) {
			ReplaceEntryMain();
	    }, false);
};

function getFirstElementMatchingClassName(root,tag,class)
{
  var elements=root.getElementsByTagName(tag); var i=0;
  while (elements[i] && !elements[i].className.match(class)) { i++; }
  return ((!elements[i]) ? null : (elements[i]));
}

function keyHandler(event){
    // I don't know why this comes out as upper 'B' rather than lower 'b'.
    var key = String.fromCharCode(event.which || event.keyCode);
    switch (key) {
        case 'J':
			ReplaceEntryMain();
            break;
        case 'K':
			ReplaceEntryMain();
            break;
    }
    return false;
}

window.addEventListener('keydown', keyHandler, false);

unsafeWindow.addEventListener('load', init, false);

unsafeWindow.document.watch('title',
	function(prop, oldval, newval) {
	// Google Reader title unread count
	// Moves unread count in title in front of "Google Reader" (more useful in tabs)
	// Written by
	// Mathias Bertelsen
	// http://userscripts.org/scripts/show/6220

     if (matches = newval.match(/Google Reader \((\d+\+?)\)/)) {
        newval = "(" + matches[1] + ') Google Reader';
     }
     return (newval);
	});