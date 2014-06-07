// ==UserScript==
// @name             KeezMovies video downloader
// @version          1.0
// @date             27-10-2009
// @author           Anton Fedorov <datacompboy@a-koss.ru>
// @description      adds download url to page
// @include          http://*.keezmovies.com/*
// ==/UserScript==
(function(){
	var handleDownload = function(client) {
		if(client.readyState == 4) {
			downloadUrl = client.responseXML.getElementsByTagName('flv_url')[0].childNodes[0].nodeValue;
			document.location.href = downloadUrl;
		}
	};
	var download = function(num) {
		var client = new XMLHttpRequest();
		client.onreadystatechange = (function(client){ return function(){ handleDownload(client) }})(client);
		client.open("GET", /*"http://"+document.location.host+*/"/watch_player.php?id="+num, true);
		client.send();
	};
	var downloadLink = function(num) {
		var link = document.createElement("A");
		link.innerHTML="[down]";
		link.href="#";
		link.onclick = (function(num){ return function(){ download(num); return false; }})(num);
		return link;
	};

	var links = document.body.getElementsByTagName("A");
	for(var i=0; i<links.length; i++) {
		var link = links[i];
		if (link.getAttribute("class")!="img" && link.getAttribute("className")!="img") {
			var n = link.href.match(/[\/-]([0-9]+)$/);
			if (n && n.length>1 && n[1]!="0") {
				var newlink = downloadLink( n[1] );
				link.insertBefore(newlink, link.firstChild);
			}
		}
	}

	var divs = document.body.getElementsByTagName("div");
	for(var i=0; i<divs.length; i++) {
		if(divs[i].getAttribute("class")=="show"||divs[i].getAttribute("className")=="show") {
			var playerBox = divs[i];
			var title = playerBox.getElementsByTagName("h1")[0];
			var num = playerBox.getElementsByTagName("script")[0].innerHTML.match(/id=([0-9]+)/)[1];
			title.insertBefore(downloadLink(num), title.firstChild);
		}
	}
})();
