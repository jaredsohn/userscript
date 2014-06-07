// ==UserScript==
// @name           Post warner basti1012 fuer pennergame 4.0 hamburg berlin muenchen
// @namespace      by basti1012 (visit pennerhack.foren-city.de)
// @description    Zeigt an ob man neue post gekriegt hat mit Sound 
// @include        *pennergame.de*
// @exclude 	   http://newboard.pennergame.de/*
// @exclude 	   http://board.pennergame.de/
// ==/UserScript==
	
var url = document.location.href;
if (url.indexOf("http://berlin.pennergame")>=0) {var link = "http://berlin.pennergame.de"}
if (url.indexOf("http://www.pennergame")>=0) {var link = "http://www.pennergame.de"}
if (url.indexOf("http://muenchen.pennergame")>=0) {var link = "http://muenchen.pennergame.de"}
	
GM_xmlhttpRequest({
  	method: 'GET',
   	url: ''+link+'/overview/',
        onload: function(responseDetails) {
        	var content = responseDetails.responseText;
			var text1 = content.split('Dein Penner')[1];
			var userid = text1.split('Sauberkeit:')[0];
try{
			var userp = userid.split('[')[1];
			var post = userp.split(']')[0];

var table = document.getElementById("my-profile");
var tr = table.getElementsByClassName("zleft")[0];

var	soundSrc, playerSrc;
	soundSrc = "http://chargraph.com/josh/timer/notify.mp3";
	playerSrc = "http://www.infowars.com/mediaplayer.swf";

   var player = document.createElement('embed');
   player.src = playerSrc;
   player.setAttribute("style", "visibility:hidden;");
   player.setAttribute('id', 'timer_sound');
   player.setAttribute('flashvars', 'type=mp3&autostart=true&repeat=false&file=' + escape(soundSrc));
   document.body.appendChild(player);


tr.innerHTML ='<a href="'+link+'/messages/"><img src="http://media.pennergame.de/img/overview/new_msg.gif" width="46" height="46"</a><font style=\"color:black; font-size:250%;\"><b>'+post+'</b></font>';
}catch(e){}
}});