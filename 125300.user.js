// ==UserScript==
// @name           LRT Aukso Fondas linux'am
// @namespace      http://userscripts.org/users/202868
// @include        *fondas.lrt.lt/*
// ==/UserScript==

var params = document.getElementsByName('Filename');

for ( var i = 0; i < params.length; i++ )
{
    var url = (params[i].getAttribute('value'));
}

var source = url.replace( "mms://", "rtsp://" );
var newHTML = '<embed src="' + source + '" Pluginspage="http://microsoft.com/windows/mediaplayer/en/download/" width="610" height="480" showstatusbar="1" CONTROLLER="false" AUTOPLAY="true" name=" "></embed>'
document.getElementById('MediaPlayer').innerHTML = newHTML;
