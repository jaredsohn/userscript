// ==UserScript==
// @name           	Simple Tube8 Downloader
// @description    Just click tube8 download link
// @include        	http://www.tube8.com/*
// @creator	ardy , modified from 2008 version
// ==/UserScript==

function iLoveTube8(){
	var x =document.getElementById("flvplayer").innerHTML;	
	var y;
    y = x.split("=");
	var z = y[12].split("&");
	
	var chk = y[12].match(".flv");
	if (chk != null){
		replaceRealLink(z[0]);
	}
}

function replaceRealLink(link)
{
    var v = document.getElementsByTagName('a');
    for(var w = 0; w < v.length; w++)
    {
      if(v[w].getAttribute('href') && (v[w].getAttribute('href').substr(0,26) == "javascript:downloadVideo()"))
      {
        v[w].setAttribute('href', link);
      }
    }
}

iLoveTube8();


