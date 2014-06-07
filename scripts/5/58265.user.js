// ==UserScript==
// @name           Torrent2Text
// @namespace      
// @include        *
// ==/UserScript==
// Currently Supports 
// thepiratebay.org - torrenthound.com - seedpeer.com - and any site that links directly to 
// .torrent files.
	for (var i = 0; i < document.links.length; i++){
	if (document.links[i].href.match(/\.torrent$/) || 
	document.links[i].href.match(/^http\:\/\/www\.mininova\.org\/get\//) || 
	document.links[i].href.match(/^http\:\/\/www\.torrenthound\.com\/torrent\//) ||
	document.links[i].href.match(/^http\:\/\/www\.seedpeer\.com\/download\//)
	
	) {
		document.links[i].href = 'http://txtor.dwerg.net/download?url=' + document.links[i].href;
	} 
}
