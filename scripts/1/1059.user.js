// ==UserScript==
// @name          Launch Fox
// @namespace     http://www.statway.com/firefox
// @description	  Open all Yahoo Launch videos in WMP, commercial free
// @include       http://*launch.yahoo.com/*
// @include		  http://*music.yahoo.com/*
// ==/UserScript==

(

function() {
  var as = window._content.document.getElementsByTagName('a');
  for (var i = as.length - 1; i >= 0; i--) {
    var hr = as[i].getAttribute('href');
	if (hr) {
	  var ms = hr.match(/[V|v]ideos?[\/|\(]\D?(\d{8}|\d{7})/);
	  if (ms) {
	  	as[i].href = 'http://launchtoday.launch.yahoo.com/player/medialog.asp?pid=4&csid=396500550&p3=2&bw=300&mf=1&origin=35&pguid=804C6F669A5141879CDFB2BCE79BEE25&uid=1258498845&z=ms.asx&vid=' + ms[1];
	  } else {
	   	var oc = as[i].getAttribute('onclick');
	   	if (oc) ms = oc.match(/ideos?\((\d{8}|\d{7})\)/);
	   	if (ms){
	   		as[i].href = 'http://launchtoday.launch.yahoo.com/player/medialog.asp?pid=4&csid=396500550&p3=2&bw=300&mf=1&origin=35&pguid=804C6F669A5141879CDFB2BCE79BEE25&uid=1258498845&z=ms.asx&vid=' + ms[1];
	   		as[i].setAttribute('onclick', null);
		}
	  }
    }
  }
})();
