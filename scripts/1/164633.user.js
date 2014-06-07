// ==UserScript==
// @name    GGN Totals
// @description Displays total number of torrents and total size of all torrents
// @author  arch5
// @version 1.1
// @include http://gazellegames.net/*
// @include https://gazellegames.net/*
// @match   http://gazellegames.net/*
// @match   https://gazellegames.net/*
// @updateURL http://userscripts.org/scripts/source/164633.meta.js
// @downloadURL http://userscripts.org/scripts/source/164633.user.js
// @run-at  document-end
// @grant 	none
// @namespace
// ==/UserScript==
(function(){

		/* ======= USER OPTIONS ======= */
	var bConsoleLogging = false, // Allow console logging
		bShowTotalSize = true,   // Display total size
		bShowNumTorrents = true, // Display total number of torrents
		bSizeInGigabytes = true; // Display total size in gigabytes rather than megabytes
		/* ======= END USER OPTIONS ======= */

	var torrent_table = document.getElementsByClassName('torrent_table')[0];

	if((document.getElementsByClassName('thin')[0]) && torrent_table){
		if(bShowTotalSize){
			var nobr = document.getElementsByClassName('nobr'),
			mbsize = null,
			gbsize = null,
			sizec = torrent_table.rows[0].cells[1].firstChild.textContent;
			for(var i=0;i<nobr.length;i++){
				if((nobr[i].textContent.search(/MB/gi))!=(-1)){
			    gbsize = (gbsize+(parseFloat(nobr[i].textContent.replace(/MB/gi,"")))/1000);
			    mbsize = (mbsize+(parseFloat(nobr[i].textContent.replace(/MB/gi,""))));
				} else if((nobr[i].textContent.search(/GB/gi))!=(-1)) {
				gbsize = (gbsize+(parseFloat(nobr[i].textContent.replace(/GB/gi,"")))); 
				mbsize = (mbsize+(parseFloat(nobr[i].textContent.replace(/GB/gi,"")))*1000);
				} else if((nobr[i].textContent.search(/KB/gi))!=(-1)){
				gbsize = (gbsize+(parseFloat(nobr[i].textContent.replace(/KB/gi,"")))/1000000);
				mbsize = (mbsize+(parseFloat(nobr[i].textContent.replace(/KB/gi,"")))/1000);
				} else if(bConsoleLogging) console.log('unable to properly parse size #'+i);
			}
			gbsize = gbsize.toPrecision(2);
			mbsize = Math.round(mbsize);
			torrent_table.rows[0].cells[1].firstChild.textContent = (sizec+' ('+(bSizeInGigabytes ? (gbsize+' GB') : ((mbsize)+' MB'))+')');
			if(bConsoleLogging) console.log('total size: '+(mbsize+' MB')+', '+(gbsize+' GB'));
		}
		torrent_table.rows[0].cells[1].firstChild.onclick=function(){
			bSizeInGigabytes = !bSizeInGigabytes;
			torrent_table.rows[0].cells[1].firstChild.textContent = (sizec+' ('+(bSizeInGigabytes ? (gbsize+' GB') : ((mbsize)+' MB'))+')');
		}
		if(bShowNumTorrents){
			var tcount = 0,
				torrentc = torrent_table.rows[0].cells[0].firstChild.textContent;
			for(var i=0;i<torrent_table.rows.length;i++){
				if((torrent_table.rows[i].getAttribute('style'))===('font-weight: normal;')){
					tcount++;
				}
			}
			torrent_table.rows[0].cells[0].firstChild.textContent = (torrentc+' ('+(tcount)+')');
			if(bConsoleLogging) console.log(tcount+' torrents on page');
		}
	}
})();