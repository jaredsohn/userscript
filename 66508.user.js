// ==UserScript==
// @name Eurosport Player for Linux
// @namespace eurosport_player_linux
// @description Script to add a link to the mms-url of the eurosport player live-stream
// @author Dominik Grafenhofer and others noted below
// @homepage http://www.grafenhofer.at
// @include http://*.eurosport.*/eurosport-player/*
// ==/UserScript==

// Version 0.2.2, License: GPL v2 or GPL v3 at your choice

// Credits go to henning.ms (http://www.m0sand.com/henningms/?p=58) and Jiri Barton (http://userscripts.org/users/127861) for pointing out how to support for eurosport.com
//        and to Juho Turunen (http://userscripts.org/users/156012) for a generalization for eurosport.*

var videoelement = document.getElementById("videoplayer");
var startindex = videoelement.firstChild.innerHTML.search("mms://");
var stopindex = videoelement.firstChild.innerHTML.search("\" />'");
var mms_url = videoelement.firstChild.innerHTML.substring(startindex,stopindex);

var objectPlayer2 = '<object width="720" height="451" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6"><param name="url" value="'+ mms_url +'" /><param name="autoStart" value="1" /><param name="showControls" value="1" /><param name="ShowStatusBar" value="1" /><embed type="application/x-mplayer2" src="'+ mms_url +'" width="720" height="451" autostart="1" showcontrols="1" showstatusbar="1" /></object>';


if (window.location.hostname == "video.eurosport.fr") {
  var clicktext = 'Cliquez pour regarder le live stream...';
}
else if (window.location.hostname == "tv.eurosport.fi") {
var clicktext = 'Klikkaa lähetykseen...';
}
else if (window.location.hostname == "video.eurosport.de") {
var clicktext = 'Klicken um den Livestream zu sehen...';
}
else {
var clicktext = 'Click to watch the live stream...';
}

videoelement.innerHTML = '<br>' + objectPlayer2 + '<br><a href="' + mms_url + '" style="font-weight: bold;">-&gt; '+ clicktext +'</a>' + videoelement.innerHTML;