// ==UserScript==
// @name           YouTube XBMC Control
// @namespace      http://frz.cc/userscripts
// @include        http://*.youtube.tld/*
// @include        http://youtube.tld/*
// ==/UserScript==

var xbmc_host = GM_getValue('xbmc_host', 'username:password@xbmc:8080');
var xbmc_url;

function setXbmcHost(init){
    if(!init)xbmc_host = prompt('Please set the XBMC Host in username:password@host:port format', xbmc_host);
    GM_setValue('xbmc_host', xbmc_host);
    xbmc_url = 'http://' + xbmc_host + '/jsonrpc';
}

setXbmcHost(true);

GM_registerMenuCommand('Configure XBMC host', setXbmcHost);

function callJSONRpc(method, params, id) {
	var mid = id | 1;
	var data = {
		jsonrpc : "2.0",
		method : method,
		id : mid
	}
	if (params) {
		data.params = params;
	}
	var strData = JSON.stringify(data);
	console.log("Calling " + strData);
	GM_xmlhttpRequest({
	  method: 'POST',
	  url: xbmc_url,
	  headers: 'Content-type: application/json',
	  data: strData,
	  //onload: function (r) {
	  //		console.log(r);
	  //}
	});
}


function extractVideoId(id) {
	var playid = getVideoId();
	if (id.id) {
		playid = id.id;
	}
	return playid;
}

function playMedia(id){
	callJSONRpc("XBMC.Play", { file:  "plugin://plugin.video.youtube/?action=play_video&videoid=" + extractVideoId(id) });
}

function enqueueMedia(id) {
	callJSONRpc("VideoPlaylist.Add", { file:  "plugin://plugin.video.youtube/?action=play_video&videoid=" + extractVideoId(id) });
}

function getVideoId() {
	querystring = window.location.search.substring(1);
	queryarray = querystring.split("&");
	for (i=0;i<queryarray.length;i++) {
	  query = queryarray[i].split("=");
	  if (query[0] == "v") {
		return query[1];
	  }
	}
	if (window.location.hash) {
		return window.location.hash.substr(window.location.hash.lastIndexOf('/') + 1);
	}
}

function getVideoTitle() {
	return /\s+(.*)/.exec(document.getElementById('eow-title').firstChild.textContent)[1];
}

function getContextMenuId() {
	var ret = document.querySelector(".yt-uix-button-group-active");
	if (!ret) { return false; }
	return ret.getAttribute("data-video-ids");
}

(function () {
		// create entries in the addTo menu!
		var addMyStuff = function (a) {
			if (!document.getElementById('xbmc-play-addto')) {
				var menu = document.querySelector(".addto-menu");
				
				if (!menu) {
					setTimeout(addMyStuff, 50);
				}
				
				var loldiv = document.createElement("div");
				loldiv.innerHTML = '<li><span onclick="return false;" class="yt-uix-button-menu-item addto-label">XBMC:</span></li><li><span id="xbmc-play-addto" class="yt-uix-button-menu-item addto-item addto-create-item">Play in XBMC</span></li><li><span id="xbmc-enqueue-addto" class="yt-uix-button-menu-item addto-item addto-create-item">Enque in XBMC</span></li>';
				while (loldiv.hasChildNodes()) {
					menu.appendChild(loldiv.firstChild);
				}
				document.getElementById("xbmc-play-addto").addEventListener("click", function(e) {
					playMedia({id: getContextMenuId()});
				}, false);
				document.getElementById("xbmc-enqueue-addto").addEventListener("click", function() {
					enqueueMedia({id: getContextMenuId()});
				}, false);
			}
		}
		addMyStuff();
		document.getElementById("shared-addto-menu").addEventListener('DOMNodeRemoved', addMyStuff, false);
		
		var top = document.getElementById('watch-info');
		if (!top) {
			top = document.getElementById('playnav-bottom-links-clip');
		}
		if (!top) {
			return;
		}
		

        GM_addStyle("#xbmc {border-top: 1px solid #CCCCCC; " +
            "margin: 0px 5px; padding: 5px; color: #666666; " +
            "font-weight: bold; text-align: center}");

		var xbmc = document.createElement('div');
		xbmc.setAttribute('id', 'xbmc');

        var xbmc_play_link = document.createElement('a');
        xbmc_play_link.addEventListener('click', playMedia, false);
        xbmc_play_link.innerHTML = '(Play in XBMC)';

		var xbmc_pl_link = document.createElement('a');
        xbmc_pl_link.addEventListener('click', enqueueMedia, false);
        xbmc_pl_link.innerHTML = ' (Add to XBMC Playlist)';
		xbmc.appendChild(xbmc_play_link);
		xbmc.appendChild(xbmc_pl_link);
		
		top.appendChild(xbmc);
})();