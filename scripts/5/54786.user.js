// ==UserScript==
// @name           Allow selection ( and copying ) of lyrics from lyrics.com
// @include        http://www.lyrics.com/lyrics/*
// ==/UserScript==
var lyricsDiv;

lyricsDiv  = document.getElementById('lyrics');
if(!lyricsDiv ) lyricsDiv = document.getElementById('lyric_space');

lyrics = lyricsDiv.innerHTML.replace(/\n/g,"\r").replace(/<br>/g,"\n").replace(/\n+/g,"\n");
lyrics = lyrics.replace(/^\s+/,"").replace(/\r/g,"");
lyrics = lyrics.substring(0,lyrics.indexOf("---"));

// Creating a textArea, containing the lyrics (that one can be used for selection and copy)
ta = document.createElement('textarea');


ta.style.border='white';		
ta.style.overflow='auto';
ta.readOnly = true;			
ta.innerHTML = lyrics;

// Set textArea dimentions
nLines = lyrics.match(/\n/g).length+4;
ta.rows = nLines;
ta.cols=90;

// replace inselectable div with the new selectable textarea!
lyricsDiv.parentNode.replaceChild(ta, lyricsDiv);

// Allow right click (for copy..)
// This code was written by petit noir (http://userscripts.org/scripts/show/21614)
var w = (typeof unsafeWindow == 'undefined') ? window : unsafeWindow;
function unprotect(){
	var contextmenus = document.evaluate('//*[@oncontextmenu]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for (i=0; i < contextmenus.snapshotLength; i++) {
		handler = contextmenus.snapshotItem(i).getAttribute("oncontextmenu", false);
		if(handler.match("return false")){
			if(handler.match(/alert\(\S+\)/)){
				handler = handler.replace(/alert\(\S+\);/, "");
			}
			handler = handler.replace("return false", "return true");
			contextmenus.snapshotItem(i).setAttribute("oncontextmenu", handler,false);
		}
	}
}

var onload = w.onload;
if (onload) {
		w.onload = (function(){
			onload();
			unprotect();
		})();
}else{
	unprotect();
}