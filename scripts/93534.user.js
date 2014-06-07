// ==UserScript==
// @name Rapidshare AutoLoader
// @description If you klick any rapidshare download link, this script will select free download, wait until the counter is finished and start the download - without any clicking required. It uses/manipulates rapidshares builtin javascript functions, thus looking exactly like rapidshare does by default (which may not be very pretty) but beeing comparatively reliable.
// @namespace http://userscripts.org/users/269252
// @author Snehonja
// @icon http://s3.amazonaws.com/uso_ss/icon/93534/large.png?1293322167
// @homepage http://userscripts.org/scripts/show/93534
// @include http://*rapidshare.com/*
// @include https://*rapidshare.com/*
// ==/UserScript==


//define script content
var scriptContent = function() {

	//Wait until rapidshare javascript has finished loading...
	document.addEventListener("load", function() {

		//define shortcut to rapidshares CDownloadPage
		var dl = RSPage.CDownloadPage;
	
	
		//safe old countdown function, so we can just use it instead of copying all the stuff
		var oldCountDown = dl.startFreeDlTimerRun;
		
		//override countdown method to automatically start the download
		dl.startFreeDlTimerRun = function () {
			if (dl.iCounter == 0) {
				location.href = dl.vars.freedlurl;
			} 
			oldCountDown();
		}
	
		//ask for downloadTicket and let rapidshares javascript do the rest
		dl.startFreeDl();
	}, true);
}


// add script to documet tree
var script = document.createElement('script');
var scriptContentNode = document.createTextNode('('+ scriptContent +')();')
script.appendChild(scriptContentNode);
document.body.appendChild(script);