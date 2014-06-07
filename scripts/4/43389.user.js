// ==UserScript==
// @name           Metrolyrics Lyrics Only
// @namespace      Metrolyrics Lyrics Only
// @description    Disable Metrolyrics anti-copy and show only the lyrics. Disabling anticopy is copied from http://userscripts.org/scripts/show/41852
// @include        http://www.metrolyrics.com/*
// ==/UserScript==
setTimeout("document.oncontextmenu = document.onmousedown = document.onclick = document.onselectstart = document.onselect = null;", 1000);

// This function is from the php.js library, which can be found here: http://phpjs.org/functions/trim:566
// comments have been removed and the function has been compressed manually
// The function's copyright is shown on the php.js website (shown above)
function trim(str,charlist) {
	var whitespace,l=0,i=0;str += '';
	if(!charlist){whitespace = " \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";}else{charlist+='';whitespace=charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g,'\$1');}
	l=str.length;for(i=0;i<l;i++){if(whitespace.indexOf(str.charAt(i))===-1){str=str.substring(i);break;}}
	l=str.length;for(i=l-1;i>=0;i--){if(whitespace.indexOf(str.charAt(i))===-1){str=str.substring(0,i+1);break;}}
	return whitespace.indexOf(str.charAt(0))===-1?str:'';
}



var els = (typeof document.all != 'undefined') ? document.all : document.getElementsByTagName('*');
for(var i = 0; i<els.length;i++) {
	var el = els[i];
	el.style.overflow = 'auto';
}

document.body.style.overflow = 'hidden';
var il = document.getElementById('iframe_lyrics');
if(il) {
	var lyrics = il.contentWindow.document.body.innerHTML;
} else {
	il = document.getElementById('SongText');
	il.removeChild(document.getElementById('LinkAdvert'))
	var lyrics = il.innerHTML;
}
var stuff = document.getElementById("bgBoxLyrics").childNodes[1].innerHTML;
var song_info = stuff.replace(/Lyrics/g, '');
var song_info_array = song_info.split(':');
var artist = trim(song_info_array[0]);
var song = trim(song_info_array[1]);
document.getElementsByTagName("head")[0].innerHTML = '';
document.title = artist+' - '+song;
var Body = document.getElementsByTagName("body")[0];
Body.innerHTML = '<h1>'+artist+' - '+song+'</h1><hr />'+lyrics;
