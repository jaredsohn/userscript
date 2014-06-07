// ==UserScript==
// @name           Fansub TV - Enhanced v2!
// @namespace      tag:theoddsagainstsomeoneelseusingthisetagarerediculous,blahblah,foo
// @description    Provides direct download links for the anime shows
// @include        http://anime.fansub.tv/series.php/*
// ==/UserScript==

function siNumber(number) {
	var prefixes = [ 'B', 'KiB', 'MiB', 'GiB', 'TiB' ];
	var i;
	for ( i = 1; prefixes.length > i; i++ ) {
		if ( Math.pow( 1024, i ) > number )
			break;
	};
	var divisor = Math.pow( 1024, --i );	
	var newSize = ( Math.round( number / divisor * 100 ) / 100 );
	return( newSize.toString() + " " + prefixes[i] );
}

function getRemoteText(url, callback) {
	if (url[0] == '/') {
		url = "http://anime.fansub.tv" + url;
	}
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.onreadystatechange = function(event) {
	  if (xhr.readyState == 4) {
	     if(xhr.status == 200) {
				callback(xhr.responseText);
	     } else {
				alert("Error loading page");
			}
	  }
	};
	xhr.send(null);
};

var DirectDownloadLinkFinder = function() {	this.initialize(); }
DirectDownloadLinkFinder.episodeSpecifierRegexp = /^http:\/\/anime.fansub.tv\/episode.php\/\d+\/[^\/]+\/([^\/]+)\/$/;
DirectDownloadLinkFinder.seriesSpecifierRegexp = /^http:\/\/anime.fansub.tv\/series.php\/(\d+)\/([^\/]+)\/(#.*)?$/;
DirectDownloadLinkFinder.downloadMethodGatewayTextualAnchorsXpath = '//a[starts-with(@href,"http://anime.fansub.tv/episode.php")]/b/parent::a';
DirectDownloadLinkFinder.episodeFullServiceUrlRegexp = /\/chuukurai.php\/[^\/]+\/[^\/]+\/download.html/;

DirectDownloadLinkFinder.isPossible = function() {
	return(window.location.href.match(this.seriesSpecifierRegexp));	
}

DirectDownloadLinkFinder.prototype = {
	initialize: function() {
		this.xhrCount = 0;
		var matchData = window.location.href.match(DirectDownloadLinkFinder.seriesSpecifierRegexp);
		var showId = matchData[1];
		var showName = matchData[2];
		this.pleaseWaitBs = {};		
		this.showDataKey = "showData[" + showId + "]";
		var showData = GM_getValue(this.showDataKey);
		if (showData) {
			this.showData = eval(showData);
			if (this.showData.name != showName) {
				delete this.showData;
				GM_setValue(this.showDataKey, null);
			}
		}
		if (!this.showData) {
			this.showData = {
				id: showId,
				name: showName,
				episodes: {}
			};
		}			
		this.getOrLoadUrls();
	},
	getOrLoadUrls: function() {
		var anchors = document.evaluate(DirectDownloadLinkFinder.downloadMethodGatewayTextualAnchorsXpath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );
		for ( var i=0 ; i < anchors.snapshotLength; i++ ) {
			var anchor = anchors.snapshotItem(i);			
			var episodeSpecifier = "e" + anchor.href.match(DirectDownloadLinkFinder.episodeSpecifierRegexp)[1];		
			if (this.showData.episodes[episodeSpecifier]) {
				this.displayDownloadLink(episodeSpecifier, anchor.parentNode);
			} else {
				this.showDataChanged = true;				
				var pleaseWaitB = document.createElement('b');
				pleaseWaitB.innerHTML = '[Please Wait...]';
				anchor.parentNode.appendChild(pleaseWaitB);				
				this.pleaseWaitBs[episodeSpecifier] = pleaseWaitB;
				this.getDirectDownloadUrlFromEpisodePage(episodeSpecifier, anchor.href);
			}
		}
	},
	getDirectDownloadUrlFromEpisodePage: function(episodeSpecifier, episodeHomeUrl) {
		this.xhrCount++;
		var self = this;
		getRemoteText(episodeHomeUrl, function(text) {
			var episodeDownloadUrlMatchData = text.match(DirectDownloadLinkFinder.episodeFullServiceUrlRegexp);
			if (episodeDownloadUrlMatchData) {
				getRemoteText(episodeDownloadUrlMatchData[0], function(text) {					
					var fileData = {};
					var paramElements = text.match(/<\s*param(\s+[^\s=]+=['"][^'"]+['"]).*>/g);
					for (var i=0; i < paramElements.length; i++) {
						var paramElement = paramElements[i];
						var name = paramElement.match(/name=["']([^'"]+)['"]/)[1];
						var value = paramElement.match(/value=["']([^'"]+)['"]/)[1];
						fileData[name] = value;					
					};
					self.showData.episodes[episodeSpecifier] = {
						url: "http://" + fileData.host + ".fansub.tv/chuukurai/" + encodeURIComponent(fileData.filename),
						size: fileData.filesize
					};
					self.xhrCount--;
					if (self.xhrCount == 0) {
						self.saveShowData();
					}
					self.displayDownloadLink(episodeSpecifier);
				});
			}	else {
				self.xhrCount--;
				if (self.xhrCount == 0) {
					self.saveShowData();
				}
				self.displayDownloadLink(episodeSpecifier);
			}		
		});
	},
	saveShowData: function() {
		GM_setValue(this.showDataKey, this.showData.toSource());
	},
	displayDownloadLink: function(episodeSpecifier, parentNode) {
		// parentNode only supplied when there is no pleaseWaitB (i.e. download URL is cached)
		var pleaseWaitB = this.pleaseWaitBs[episodeSpecifier];
		if(pleaseWaitB) {
			parentNode = pleaseWaitB.parentNode;
			parentNode.removeChild(pleaseWaitB);
		}
		var directDownloadAnchor = document.createElement('a');			
		var episodeData = this.showData.episodes[episodeSpecifier];
		if (episodeData) {
			directDownloadAnchor.innerHTML = "[" + siNumber(episodeData.size) + "]";
			directDownloadAnchor.href = episodeData.url;
			parentNode.appendChild(directDownloadAnchor);
		} else {
			var missingB = document.createElement('b');
			missingB.innerHTML = '[N/A]';
			parentNode.appendChild(missingB);
		}		
	}
}

if (DirectDownloadLinkFinder.isPossible()) {
	new DirectDownloadLinkFinder();
}

