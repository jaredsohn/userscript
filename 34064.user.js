// ==UserScript==
// @name           radyoodtu lyrics
// @description    displays the lyrics of the songs played on the online radio station radyoodtu 
// @include        http://www.radyoodtu.com.tr/iplayer/index.asp
// @author         Guybrush
// @version        0.0.3
// ==/UserScript==
//
var infos=new Object();

init();

function init()
{
	var dynamic=document.createElement("div"); 
	dynamic.innerHTML="<p>Artist: <span id=\"sanatci\"></span><br>Song  :<span id=\"parca\"></span><br>Lyrics:<br><span id=\"sozler\"></span></p>";
	document.body.insertBefore(dynamic,document.body.nextSibling);
	
	grapData();
	infos.intervalId=setInterval(grapData,20*1000);
	document.addEventListener("unload",function(){clearInterval(infos.intervalId);},false);
}

function grapData(){GM_xmlhttpRequest({method:'GET',url:'http://www.radyoodtu.com.tr/lastplayed/index-iframe01.asp', onload:setVariable});}

function setVariable(response){
  var artist=response.responseText.match(/<td class="td01" id="td_art1">(.*)<\/td>/)[1];
  var song=response.responseText.match(/<td class="td03" id="td_song1">(.*)<\/a><\/td>/)[1];
  if (artist!=infos.artist || song!=infos.song) updateDynamicDiv(artist,song);
 }
  
function updateDynamicDiv(artist,song){
  document.getElementById("sanatci").textContent=infos.artist=artist;
  document.getElementById("parca").textContent=infos.song=song;
  document.getElementById("sozler").textContent="Loading lyrics ...";
  var urlsearch="http://lyricwiki.org/"+encodeURIComponent(artist)+":"+encodeURIComponent(song);
  GM_xmlhttpRequest({method: 'GET', url: urlsearch,onload:function(response){document.getElementById("sozler").innerHTML=response.responseText.match(/<div.class='lyricbox'.>((?:.|\n)*?)<\/div>/gmi)?RegExp.$1:"No Lyrics";}});
}