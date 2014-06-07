// ==UserScript==
// @name    GGN Download All
// @author  arch5
// @description Adds a button to download all torrents on a page.
// @version 1.1
// @include http://gazellegames.net/*
// @include https://gazellegames.net/*
// @match   http://gazellegames.net/*
// @match   https://gazellegames.net/*
// @updateURL http://userscripts.org/scripts/source/164910.meta.js
// @downloadURL http://userscripts.org/scripts/source/164910.user.js
// @run-at  document-end
// @grant 	none
// @namespace
// ==/UserScript==
(function(){

	var WAIT_INTERVAL = 1000; // The interval we wait between downloading the next torrent. This number should never be lower than 1000!

	var linkbox = document.getElementsByClassName('linkbox')[0],
		torrent_table = document.getElementsByClassName('torrent_table')[0],
		dl_all = null,
		tnums = null;

	download=function(){
		if(tnums.length!=0){
		dl_all.textContent = ('[Downloading All... '+'('+(tnums.length-1)+') '+']');
		window.location.href = (torrent_table.rows[(tnums[0])].cells[0].getElementsByTagName('span')[0].getElementsByTagName('a')[0].href);
		tnums.shift();
		} else {
		dl_all.textContent = ('[Downloaded All Torrents on Page]');
		return;
		}
	}
	if((/\Wid=\d/gi).test(window.location.href)){
		dl_all = document.createElement('a');
		tnums = [];
		dl_all.textContent = '[Download All]';
		dl_all.onclick = function(){
			setInterval(function(){
						download();
						dl_all.onclick = null;
								},
							WAIT_INTERVAL);
		}
		for(var i=0;i<torrent_table.rows.length;i++){
			if((torrent_table.rows[i].getAttribute('style'))===('font-weight: normal;')){
				tnums.push(i);
			}
		}
		linkbox.appendChild(dl_all);
	}
})();