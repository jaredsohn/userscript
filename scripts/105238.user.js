// ==UserScript==
// @name			Google Music Lyrics
// @version			0.9.7 Beta
// @namespace		http://www.radicalpi.net/
// @author			Chris Hendry
// @include			http*://music.google.com/music/listen*
// @require			https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @match			http://music.google.com/music/listen*
// @match			https://music.google.com/music/listen*
// @match			http://play.google.com/music/listen*
// @match			https://play.google.com/music/listen*
// @icon			http://radicalpi.net/upload/gMusic/gMusic.png
// @description		Adds a lyrics panel that automatically fetches lyrics in Google Music.
// ==/UserScript==

var version = "0.9.7 Beta";
var lyricsURL = " ";
var songTitle = "";
var songArtist = "";
var reload = false;
var winWidth = 0;
var winHeight = 0;

i = 0;
data = "";
while(i<0) {
data+="<song>\n";
data+="<id>"+localStorage.key(i)+"</id>\n";
data+="<lyrics>"+localStorage.getItem(localStorage.key(i))+"</lyrics>\n";
data+="</song>\n";
i++;
}
//window.location = "data:ocet-stream;charset=utf-8,"+data;
download = "data:x-application/external;charset=utf-8,"+data;

function scrollLyrics(e) {
e = e ? e : window.event;
var wheelData = e.detail ? e.detail : e.wheelDelta;

//alert(wheelData);
document.getElementById('lyrics').scrollTop += (wheelData*18);

};


function fetchNowPlaying() {
playerDiv = document.getElementById('playerSongInfo').innerHTML;

var newSongTitle = "";
var newSongArtist = "";

if(playerDiv != null && playerDiv.length > 0)
{

if(document.getElementById('lyrics').style.visibility == "visible") {
document.getElementById('editLyrics').style.visibility = "visible";
document.getElementById('reloadLyrics').style.visibility = "visible";
}


newSongTitle = playerDiv.split('<div class="fade-out-content" title="')[1].split('">')[0];
newSongArtist = playerDiv.split('<div class="fade-out-content" title="')[2].split('">')[0];
var artists = newSongArtist.split("/");
if(artists[0].indexOf("Various Artists") != -1) {artists[0] = artists[1];}
newSongArtist = artists[0];

}

if((songTitle != newSongTitle || songArtist != newSongArtist) || reload)
{
songTitle = newSongTitle;
songArtist = newSongArtist;
document.getElementById('lyrics').scrollTop = 0;
localLyrics = localStorage.getItem(escape(songArtist+'|'+songTitle));


if(localLyrics == null || localLyrics.length < 1 || reload) {
reload = false;
$('#lyrics').html("<div id='lyricsLoader' style='text-align:center;'><img src='http://music.google.com/music/Spinner_48.gif' style='vertical-align:middle;'></div>");
$('#lyricsLoader').css('height',(window.innerHeight-237)+'px');
$('#lyricsLoader').css('lineHeight', (window.innerHeight-237)+'px');

var url1 = 'https://www.google.com/search?q='+encodeURI(songTitle+' '+songArtist+' site:lyricsg.com OR site:songlyrics.com OR site:jetlyrics.com');

GM_xmlhttpRequest({
    method: 'GET',
   	url: url1,
	onload: function(responseDetails) {
	response = responseDetails.responseText;

	try {
	lyricsURL = $("#search a", $(response)).attr("href");
	} catch(Exception) { lyricsURL = ""; alert(Exception); }
		
	GM_xmlhttpRequest({
		method: 'GET',
		url: lyricsURL,
		onload: function(responseDetails) {
		var response = responseDetails.responseText;
		try {
		
		lyrics = $("#lyricsText", $(response)).html();
		if(lyrics == null) lyrics = $("#songLyricsDiv", $(response)).html();
		if(lyrics == null) lyrics = $("#main_lyrics", $(response)).html();
		if(lyrics == null) lyrics = "";
		
		lyrics = lyrics.replace(/<\/?([a-z]+)[^>]*>/gi, function(match, tag) {
			return (tag.toLowerCase() === "br") ? match : "";
		});
		
		$('#lyrics').html(lyrics);
		localStorage.setItem(encodeURI(songArtist+'|'+songTitle),lyrics);
		} catch(Exception) {
		document.getElementById('lyrics').innerHTML = "";
		}	
		window.setTimeout(fetchNowPlaying,50);
		}
	});
    }
});
} else { document.getElementById('lyrics').innerHTML = localLyrics; window.setTimeout(fetchNowPlaying,50); }
} else { window.setTimeout(fetchNowPlaying,50); }

}

function resizeWindow() {
winWidth = window.innerWidth;
winHeight = window.innerHeight; 

less = 523;
less2 = 265;
if(document.defaultView.getComputedStyle(document.getElementById("promo_pack_bar"),null).getPropertyValue("display") != "none") {
	document.getElementById('lyricsToolbar').style.top = '230px';
	document.getElementById('lyrics').style.top = '230px';
	less2+=55;
	} else {
	document.getElementById('lyricsToolbar').style.top = '175px';
	document.getElementById('lyrics').style.top = '176px';
	}
if(document.getElementById('lyrics').style.visibility == "hidden") less -= 299;

document.getElementById('main').style.width = (winWidth-less)+'px';
document.getElementById('lyrics').style.height = (winHeight-less2)+'px';
document.getElementById('breadcrumbs').style.width = (winWidth-less)+'px';
if(document.getElementById('songs_songHeaders')) document.getElementById('songs_songHeaders').style.width = (winWidth-less)+'px';

BG = document.getElementById('modalBG').style;
BG.width = winWidth+'px';
BG.height = winHeight+'px';

settingsWin = document.getElementById('settings').style;
settingsWin.top = ((winHeight-parseInt(settingsWin.height))/2)+'px';
settingsWin.left = ((winWidth-parseInt(settingsWin.width))/2)+'px';

lyricsWin = document.getElementById('lyricsEditor').style;
lyricsWinContent = document.getElementById('lyricsEditorContent').style;

lyricsWinContent.height = '400px';
lyricsWinContent.width = '275px';
lyricsWin.top = ((winHeight-parseInt(lyricsWinContent.height)-122)/2)+'px';
lyricsWin.left = ((winWidth-parseInt(lyricsWinContent.width)-52)/2)+'px';

}

function toggleLyrics() {
	
	var status = document.getElementById('lyrics').style.visibility;

	if(status != "hidden") {
		document.getElementById('lyrics').style.visibility = "hidden";
		document.getElementById('lyricsToolbar').style.visibility = "hidden";
		document.getElementById('editLyrics').style.visibility = "hidden";
		document.getElementById('reloadLyrics').style.visibility = "hidden";
		document.getElementById('lyricsTab').style.width = '55px';
		document.getElementById('main').style.width = (window.innerWidth-225)+'px';
		document.getElementById('songs_songHeaders').style.width = (window.innerWidth-225)+'px';
		document.getElementById('breadcrumbs').style.width = (window.innerWidth-221)+'px';
	} else {
		document.getElementById('lyrics').style.visibility = "visible";
		document.getElementById('lyricsToolbar').style.visibility = "visible";
		document.getElementById('editLyrics').style.visibility = "visible";
		document.getElementById('reloadLyrics').style.visibility = "visible";
		document.getElementById('lyricsTab').style.width = '295px';
		document.getElementById('main').style.width = (window.innerWidth-523)+'px';
		document.getElementById('songs_songHeaders').style.width = (window.innerWidth-523)+'px';
		document.getElementById('breadcrumbs').style.width = (window.innerWidth-523)+'px';
	}
}

function reloadLyrics() {

	localStorage.setItem(escape(songArtist+'|'+songTitle),null);
	reload = true;
	fetchNowPlaying();
}

function editLyrics() {

loadedLyrics = document.getElementById('lyrics').innerHTML;
textLyrics = loadedLyrics.replace(/(\r\n|\n|\r)/gm,"");
textLyrics = textLyrics.replace(/<br>/gi,'\n');


document.getElementById('textLyrics').value = textLyrics;
document.getElementById('lyricsEditor').style.visibility = "visible";
document.getElementById('modalBG').style.visibility = "visible";
}


function saveLyrics() {

textLyrics = document.getElementById('textLyrics').value;
loadedLyrics = textLyrics.replace(/\n/g,'<br>');
localStorage.setItem(escape(songArtist+'|'+songTitle),loadedLyrics);
document.getElementById('lyricsEditor').style.visibility = "hidden";
document.getElementById('modalBG').style.visibility = "hidden";
document.getElementById('lyrics').innerHTML = loadedLyrics;

document.getElementById('editLyrics').src = "http://radicalpi.net/upload/gMusic/edit.png";
document.getElementById('editLyrics').removeEventListener ("click", saveLyrics, true);
document.getElementById('editLyrics').addEventListener ("click", editLyrics, true);

}

function closeLyrics() {
document.getElementById('lyricsEditor').style.visibility = "hidden";
document.getElementById('modalBG').style.visibility = "hidden";
}

function editSettings() {
document.getElementById('settings').style.visibility = "visible";
document.getElementById('modalBG').style.visibility = "visible";
}

function closeSettings() {
document.getElementById('settings').style.visibility = "hidden";
document.getElementById('modalBG').style.visibility = "hidden";
}



window.addEventListener("load", function(e) {
document.getElementById('headerBar').innerHTML += "<div id='lyricsToolbar' style=\"z-index:2; position:absolute; top:175px; right:2px; width:293px; height:18px; padding:0px; background-color:#EDEDED; border:1px solid #D8D8D8;\"></div>";
document.getElementById('lyricsToolbar').innerHTML += "<img id='reloadLyrics' style='position:relative; top:1px; left:2px; width:16px; height:16px; visibility:hidden;' src='http://radicalpi.net/upload/gMusic/refresh.png'>";
document.getElementById('lyricsToolbar').innerHTML += "<img id='editLyrics' style='position:relative; top:1px; left:8px; width:16px; height:16px; visibility:hidden;' src='http://radicalpi.net/upload/gMusic/edit.png'>";
document.getElementById('lyricsToolbar').innerHTML += "<img id='editSettings' style='position:relative; top:1px; left:228px; width:16px; height:16px;' src='http://radicalpi.net/upload/gMusic/gear.png'>";


document.getElementById('headerBar').innerHTML += "<div id='lyrics' style=\"z-index:1; visibility:visible; position:absolute; top:176px; right:0px; padding:10px; padding-top:23px; width:277px; overflow:hidden; background-color:#ffffff; font:14px sans; line-height:18px; text-align:center;\"></div>";

document.getElementById('headerBar').innerHTML += "<div id='modalBG' class='modal-dialog-bg' style='opacity:0.5; visibility:hidden;'></div>";

document.getElementById('headerBar').innerHTML += "\
<div id='lyricsEditor' class='modal-dialog' style='visibility:hidden; height:600px;'>\
	<div class='modal-dialog-title'><span id='lyricsEditorTitle' class='modal-dialog-title-text'>Lyrics Editor</span></div>\
	<div id='lyricsEditorContent' class='modal-dialog-content'>\
		<textarea id='textLyrics' style='resize:none; height:100%; width:100%; text-align:center; font:14px sans;'></textarea>\
	</div>\
	<div class='modal-dialog-buttons'><button id='cancelLyrics'>Cancel</button><button id='saveLyrics'>Save</button></div>\
</div>";

document.getElementById('headerBar').innerHTML += "\
<div id='settings' class='modal-dialog' style='visibility:hidden; height:300px; width:600px;'>\
	<div class='modal-dialog-title'>\
		<span class='modal-dialog-title-text'>Lyrics Settings</span>\
	</div>\
	<div class='modal-dialog-content'>\
		Google Music Lyrics v"+version+"\
		<br><a href='"+download+"'></a>\
		</div>\
	<div class='modal-dialog-buttons'>\
		<button id='cancel'>Cancel</button>\
		<button id='ok'>Save</button>\
	</div>\
</div>";

		//Settings:\
		//<div class='settings-dialog-subtext'><input type='checkbox'>Cache Lyrics</div>\
		//<br>Lyric Sources:\
		//<div class='settings-dialog-subtext'><input type='checkbox'>Lyrics.com <input type='checkbox'>Other</div>\
	


document.getElementById('headerBar').innerHTML += "<div id='lyricsTab' class='nav-tab' style='position:absolute; top:143px; right:0px; width:295px;'><span id='lyricsTabText' class='tab-text'>LYRICS</span></div><div>";
document.getElementById('lyricsTabText').addEventListener ("click", toggleLyrics, true);
document.getElementById('reloadLyrics').addEventListener ("click", reloadLyrics, true);
document.getElementById('editLyrics').addEventListener ("click", editLyrics, true);
document.getElementById('editSettings').addEventListener ("click", editSettings, true);

document.getElementById('saveLyrics').addEventListener ("click", saveLyrics, true);
document.getElementById('cancelLyrics').addEventListener ("click", closeLyrics, true);


document.getElementById('cancel').addEventListener ("click", closeSettings, true);
document.getElementById('lyrics').addEventListener("DOMMouseScroll", scrollLyrics, true); 

fetchNowPlaying();
resizeWindow();
window.addEventListener('resize',resizeWindow, true);

}, false);