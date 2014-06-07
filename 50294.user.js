// ==UserScript==
// @name           AQ-Farbleiste
// @namespace      AQ-Farbleiste
// @description    AQ-Farbleiste
// @include        http://world1.aquahaze.de/*
// @include        http://world2.aquahaze.de/*
// ==/UserScript==

var i;
var R;
var G;
var B;

var step = 2;

var frame, chat;
frame = document.getElementsByName('sendmsg')[0];
if (frame) {    
	chat = document.createElement('div');
	chat.innerHTML = '<div style="text-align:center;"><br>';

	R = 255; B = 0;
	for (i = 0; i < 60; i = i+step)
	{
	    G = (Math.round(Math.abs(255/60*i)));
	    chat.innerHTML += '<div onmousedown="document.getElementsByName(\'msg\')[0].value=\'/color #' + ( (R.toString(16)).length == 2 ? R.toString(16) : '0' + R.toString(16) ) + ( (G.toString(16)).length == 2 ? G.toString(16) : '0' + G.toString(16) ) + ( (B.toString(16)).length == 2 ? B.toString(16) : '0' + B.toString(16) ) + '\';" style="cursor:pointer; display:inline; font-size:0.7em; background-color:rgb(' + R + ',' + G + ',' + B + ') !important;">&thinsp;</div>'; //&thinsp;
	}

	G = 255; B = 0;
	for (i = 0; i < 60; i = i+step)
	{
	    R = (Math.round(Math.abs(255 - 255/60*i)));
	    chat.innerHTML += '<div onmousedown="document.getElementsByName(\'msg\')[0].value=\'/color #' + ( (R.toString(16)).length == 2 ? R.toString(16) : '0' + R.toString(16) ) + ( (G.toString(16)).length == 2 ? G.toString(16) : '0' + G.toString(16) ) + ( (B.toString(16)).length == 2 ? B.toString(16) : '0' + B.toString(16) ) + '\';" style="cursor:pointer; display:inline; font-size:0.7em; background-color:rgb(' + R + ',' + G + ',' + B + ') !important;">&thinsp;</div>'; //&thinsp;
	}

	R = 0; G = 255;
	for (i = 0; i < 60; i = i+step)
	{
	    B = (Math.round(Math.abs(255/60*i)));
	    chat.innerHTML += '<div onmousedown="document.getElementsByName(\'msg\')[0].value=\'/color #' + ( (R.toString(16)).length == 2 ? R.toString(16) : '0' + R.toString(16) ) + ( (G.toString(16)).length == 2 ? G.toString(16) : '0' + G.toString(16) ) + ( (B.toString(16)).length == 2 ? B.toString(16) : '0' + B.toString(16) ) + '\';" style="cursor:pointer; display:inline; font-size:0.7em; background-color:rgb(' + R + ',' + G + ',' + B + ') !important;">&thinsp;</div>'; //&thinsp;
	}

	R = 0; B = 255;
	for (i = 0; i < 60; i = i+step)
	{
	    G = (Math.round(Math.abs(255 - 255/60*i)));
	    chat.innerHTML += '<div onmousedown="document.getElementsByName(\'msg\')[0].value=\'/color #' + ( (R.toString(16)).length == 2 ? R.toString(16) : '0' + R.toString(16) ) + ( (G.toString(16)).length == 2 ? G.toString(16) : '0' + G.toString(16) ) + ( (B.toString(16)).length == 2 ? B.toString(16) : '0' + B.toString(16) ) + '\';" style="cursor:pointer; display:inline; font-size:0.7em; background-color:rgb(' + R + ',' + G + ',' + B + ') !important;">&thinsp;</div>'; //&thinsp;
	}

	G = 0; B = 255;
	for (i = 0; i < 60; i = i+step)
	{
	    R = (Math.round(Math.abs(255/60*i)));
	    chat.innerHTML += '<div onmousedown="document.getElementsByName(\'msg\')[0].value=\'/color #' + ( (R.toString(16)).length == 2 ? R.toString(16) : '0' + R.toString(16) ) + ( (G.toString(16)).length == 2 ? G.toString(16) : '0' + G.toString(16) ) + ( (B.toString(16)).length == 2 ? B.toString(16) : '0' + B.toString(16) ) + '\';" style="cursor:pointer; display:inline; font-size:0.7em; background-color:rgb(' + R + ',' + G + ',' + B + ') !important;">&thinsp;</div>'; //&thinsp;
	}

	R = 255; G = 0;
	for (i = 0; i < 60; i = i+step)
	{
	    B = (Math.round(Math.abs(255 - 255/60*i)));
	    chat.innerHTML += '<div onmousedown="document.getElementsByName(\'msg\')[0].value=\'/color #' + ( (R.toString(16)).length == 2 ? R.toString(16) : '0' + R.toString(16) ) + ( (G.toString(16)).length == 2 ? G.toString(16) : '0' + G.toString(16) ) + ( (B.toString(16)).length == 2 ? B.toString(16) : '0' + B.toString(16) ) + '\';" style="cursor:pointer; display:inline; font-size:0.7em; background-color:rgb(' + R + ',' + G + ',' + B + ') !important;">&thinsp;</div>'; //&thinsp;
	}
	chat.innerHTML += '<div onclick="document.getElementsByName(\'msg\')[0].value=\'\'" style="cursor:pointer; display:inline; font-size:0.7em; background:transparent;"> X</div>';
        chat.innerHTML += "</div>";
        frame.parentNode.insertBefore(chat, frame);
}

function checkUpdate() {

  GM_xmlhttpRequest({
    method: "GET",
    url: "http://userscripts.org/scripts/show/50294",
  
    onreadystatechange: function(response) { 
      if (response.readyState == 4) {
	version = String(response.responseText.match(/v[0-9]+.[0-9]+.[0-9]+/i)); 
	version = version.replace(/[v.]+/g, "");
	version = parseInt(version, 10);
	if( version > 1000 ) {
	  alert("Es ist eine neure Version der Farbleiste verfügbar.\n\nDu findest die aktuelle Version unter:\nhttp://userscripts.org/scripts/show/50294");
	} else {
	  alert("Du hast bereits die neuste Version installiert.");
	}
      }
    }
  
  });

}

GM_registerMenuCommand("Überprüfe auf Updates für Farbleiste", checkUpdate);