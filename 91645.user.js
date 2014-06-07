// Torrentz Companion
// Redirect torrent sites linked from torrentz.eu to their .torrent files
// Version 0.5 (9.4.2011)
// For some sites cookies should be enabled
// Best used with Do This Automatically: https://addons.mozilla.org/en-US/firefox/addon/do-this-automatically/
// Visit my website at http://Snark.co.il

// ==UserScript==
// @name           Torrentz Companion
// @namespace      http://snark.co.il
// @description    Redirect torrent sites linked from torrentz.eu to their .torrent files
// @include        http://torrentz.eu/*
// @include        http://www.torrentz.eu/*
// @include        http://thepiratebay.org/torrent/*
// @include        http://btjunkie.org/torrent/*
// @include        http://www.seedpeer.com/details/*
// @include        http://www.btmon.com/*
// @include        http://fenopy.com/torrent/*
// @include        http://www.monova.org/torrent/*
// @include        http://adult.monova.org/*
// @include        http://extratorrent.com/torrent/*
// @include        http://extratorrent.com/torrent_download/*
// @include        http://www.torrentdownloads.net/torrent/*
// @include        http://www.alivetorrents.com/torrent/*
// @include        http://www.kickasstorrents.com/*
// @include        http://www.torrentbit.net/torrent/*
// @include        http://www.torrents.net/torrent/*
// @include        http://www.h33t.com/*
// @include        http://www.torrenthound.com/hash/*
// @include        http://www.fulldls.com/*
// @include        http://www.torrentfunk.com/torrent/*
// @include        http://www.limetorrents.com/*
// @include        http://1337x.org/torrent/*
// @include        http://www.torrentzap.com/torrent/*
// @include        http://www.torrentreactor.net/torrents/*
// @include        http://www.yourbittorrent.com/torrent/*
// @include        http://rarbg.com/torrents/*
// @include        http://www.vertor.com/torrents/*
// @include        http://www.torrentbar.com/torrent/*
// @include        http://isohunt.com/torrent_details/*
// @include        http://www.btloft.com/torrent/*
// @include        http://www.torrentportal.com/details/*
// @include        http://www.torlock.com/torrent/*
// @include        http://bitsnoop.com/*
// @include        magnet*
// @include        http://torrage.com/torrent/*
// @include        http://zoink.it/torrent/*
// @include        http://torrage.ws/torrent/*
// @include        http://torcache.com/torrent/*
// ==/UserScript==


(function(){
	// open all Torrentz links in new tabs
	// if (document.location.href.match(/^http\:\/\/(www\.)?torrentz\.eu\/.+/i)){openAll();}
	// else{
	
	// disable action for Torrentz itself
	// it is included only to enable and disable the script when there by right clicking Greasmonkey's icon
	if (!(document.location.href.match(/^http\:\/\/(www\.)?torrentz\.eu\//i))){
		checkLinks();
		checkURL();
	}


//function openAll(){
//	var pglinks = document.links;
//	for (var i=0; i<pglinks.length; i++){
//		if (!(pglinks[i].href.match(/^http\:\/\/(www\.)?(torrentz\.eu|btguard\.com|utorrent\.com).*/i))){
//			window.open(pglinks[i],'_blank');
//		}
//	}
//}


function checkLinks(){
	// get all links on page
	var pglinks = document.links;
	// step throught the links one by one
	for (var i=0; i<pglinks.length; i++){
		// check to make sure it is a link, and not an anchor
		if (pglinks[i].href){
			// redirect page to .torrent link
			
			//bitsnoop.com/* including Magnet Link, torrage.com, zoink.it, torrage.ws, torcache.com
			if (document.location.href.match(/http\:\/\/bitsnoop\.com\/.+\.html$/i)){
				if (pglinks[i].href.match(/^magnet\:\?.*$/i))
					{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"MAGNET LINK");}
				else if (pglinks[i].href.match(/^http\:\/\/torrage\.com\/torrent\/.*\.torrent$/i))
					{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"TORRAGE.COM");}
				else if (pglinks[i].href.match(/^http\:\/\/zoink\.it\/torrent\/.*\.torrent$/i))
					{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"ZOINK.IT");}
				else if (pglinks[i].href.match(/^http\:\/\/torrage\.ws\/torrent\/.*\.torrent$/i))
					{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"TORRAGE.WS");}
				else if (pglinks[i].href.match(/^http\:\/\/torcache\.com\/torrent\/.*\.torrent$/i))
					{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"TORCACHE.COM");}
			}
				
			//thepiratebay.org/torrent/*
			else if (pglinks[i].href.match(/^http\:\/\/torrents\.thepiratebay\.org\/\d+\/.+\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"THEPIRATEBAY.ORG");}
			
			//btjunkie.org/torrent/*
			else if (pglinks[i].href.match(/^http\:\/\/dl\.btjunkie\.org\/torrent\/.+\/.+\/download\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"BTJUNKIE.ORG");}
			
			//www.seedpeer.com/details/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.seedpeer\.com\/download\/.*\/.*$/i))
			{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"SEEDPEER.COM");}
			
			//www.btmon.com/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.btmon\.com\/.+\/.+\/.+\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"BTMON.COM");}
			
			//fenopy.com/torrent/*
			else if (pglinks[i].href.match(/^http\:\/\/fenopy\.com\/torrent\/.+\/.+\/download\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"FENOPY.COM");}
			
			//www.monova.org/torrent/* BROKEN
			//adult.monova.org/*
			//else if (pglinks[i].href.match(/^http\:\/\/(www|adult)\.monova\.org\/download\/torrent\/(\d{7})\/.+\/.+\/.+\.torrent$/i))
			//	{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"MONOVA.ORG");}
			
			//extratorrent.com/torrent/*
			else if (pglinks[i].href.match(/^http\:\/\/extratorrent\.com\/torrent_download\/\d+\/.+\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"EXTRATORRENT.COM");}
			
			//extratorrent.com/torrent_download/*
			else if (pglinks[i].href.match(/^http\:\/\/extratorrent\.com\/download\/\d+\/.+\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"EXTRATORRENT.COM");}
			
			//www.torrentdownloads.net/torrent/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.torrentdownloads\.net\/download\/\d+\/.+$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"TORRENTDOWNLOADS.NE");}
			
			//www.alivetorrents.com/torrent/* BROKEN
			//else if (pglinks[i].href.match(/^http\:\/\/www\.alivetorrents\.com\/dl\/\d+$/i))
			//	{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"ALIVETORRENTS.COM");}
			
			//www.kickasstorrents.com/*
			else if (pglinks[i].href.match(/^http\:\/\/torcache\.com\/torrent\/.+\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"TORCACHE.COM");}
			
			//www.torrentbit.net/torrent/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.torrentbit\.net\/get\/\d+$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"TORRENTBIT.NET");}
			
			//www.torrents.net/torrent/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.torrents\.net\/down\/\d+\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"TORRENTS.NET");}
			
			//www.h33t.com/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.h33t\.com\/download\.php\?id=.+&f=.+\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"H33T.COM");}
			
			//www.torrenthound.com/hash/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.torrenthound\.com\/torrent\/.+$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"TORRENTHOUND.COM");}
			
			//www.fulldls.com/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.fulldls\.com\/.+\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"FULLDLS.COM");}
			
			//www.torrentfunk.com/torrent/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.torrentfunk\.com\/tor\/\d+.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"TORRENTFUNK.COM");}
			
			//www.limetorrents.com/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.limetorrents\.com\/download-torrent\/.+\/.+\/$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"LIMETORRENTS.COM");}
			
			//1337x.org/torrent/*
			else if (pglinks[i].href.match(/^http\:\/\/1337x\.org\/download\/\d+\/$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"1337X.ORG");}
			
			//www.torrentzap.com/torrent/*
			else if (pglinks[i].href.match(/^http:\/\/www\.torrentzap\.com\/download\/\d+\/\d+$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"TORRENTZAP.COM");}
			
			//www.torrentreactor.net/torrents/*
			else if (pglinks[i].href.match(/^http\:\/\/dl7\.torrentreactor\.net\/download\.php\?id=.+&name=.+$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"TORRENTREACTOR.NET");}
			
			//www.yourbittorrent.com/torrent/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.yourbittorrent\.com\/down\/\d+\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"YOURBITTORRENT.COM");}
			
			//rarbg.com/torrents/*
			else if (pglinks[i].href.match(/^http\:\/\/rarbg\.com\/download\.php\?id=.+&f=.+\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"RARBG.COM");}
			
			//www.vertor.com/torrents/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.vertor\.com\/index\.php\?mod=download&id=\d+$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"VERTOR.COM");}
			
			//www.torrentbar.com/torrent/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.torrentbar\.com\/torrent\/(\d{6})\/\d\/(.+torrent)#$/i)){
				var link = "http://dl.torrentbar.com/download.aspx?tid="+RegExp.$1+"&name="+RegExp.$2;
				var torrent = encodeURIComponent(link);
				redirect(torrent,"TORRENTBAR.COM");
			}
			
			//isohunt.com/torrent_details/*
			else if (pglinks[i].href.match(/^http\:\/\/ca\.isohunt\.com\/download\/\d+\/.*\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"ISOHUNT.COM");}
			
			//www.btloft.com/torrent/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.btloft\.com\/download\/.*\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"BTLOFT.COM");}
			
			//www.torrentportal.com/details/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.torrentportal\.com\/download\/\d+\/.*\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"TORRENTPORTAL.COM");}
			
			//www.torlock.com/torrent/*
			else if (pglinks[i].href.match(/^http\:\/\/www\.torlock\.com\/tor\/\d+\.torrent$/i))
				{var torrent = encodeURIComponent(pglinks[i].href); redirect(torrent,"TORLOCK.COM");}
		}
	}
}


function checkURL(){
	// Adult Disclaimer
	// www.monova.org/torrent/*
	if (document.location.href.match(/http\:\/\/www\.monova\.org\/torrent\/(\d{7})\/.+\.html$/i)){
		var link = "http://adult.monova.org/details.php?id="+RegExp.$1;
		var torrent = encodeURIComponent(link);
		redirect(torrent,"ADULT DISCLAIMER");
	}
}


function redirect(torrent, text){
	if (text != "") {document.title = text}
	if (torrent != "") {window.location = decodeURIComponent(torrent)}
	// window.close();
	// return;
}


})();
