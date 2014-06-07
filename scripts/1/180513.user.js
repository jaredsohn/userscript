// ==UserScript==
// @name       cztorrent.net next/prev keys
// @namespace  http://userscripts.org/scripts/show/180513
// @version    0.1
// @description  adds possibility to browse torrents by using "n" (next) and "p" (previous) keys
// @match      http://tracker.cztorrent.net/torrents*
// @copyright  2013, Slavius
// @run-at document-end
// ==/UserScript==
(function() {
  var url = document.URL.split(/(.*&p=)([0-9]{0,})(.*)/)
  var next = ""
  var prev = ""
  if (url.length == 1) {
	if (document.URL.match(/torrents$/)) {
	  	next = url + "/?a=&p=2"
	} else {
		next = url + "&p=2"
	}
  }
  else
  {
	var p = parseInt(url[2])
	next = url[1] + (p + 1) + url[3]
	if (p > 1) {
	  prev = url[1] + (p - 1) + url[3]
	}
  }
  
  if (next != "") {
	$(document).keypress(function(e){
	  if(e.charCode == 78 || e.charCode == 110){
		window.location.href = next
	  }
	})
  }
  
  if (prev != "") {
	$(document).keypress(function(e){
	  if(e.charCode == 80 || e.charCode == 112){
		window.location.href = prev
	  }
	})
  }
})();