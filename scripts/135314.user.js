// ==UserScript==
// @name			PH! relative links
// @author			archelf, cyla
// @version			0.2.1
// @namespace			archelf.ph
// @description			Create relative links from absolute links
// @include			http://prohardver.hu/*
// @include			http://itcafe.hu/*
// @include			http://mobilarena.hu/*
// @include			http://gamepod.hu/*
// @include			http://logout.hu/*
// ==/UserScript==

/*
Versions:
0.1a				Initial release
0.2				Initial opera release
				Added includes instead of URLCheck
				Replace forum links only
				Replace links with www subdomains
				Replace rios4 forum links
				Replace rios3 forum links with rios4 ones
0.2.1				Replace user links
*/

(function(){
	var center = document.getElementById( "center" );
	var anchors = center.getElementsByTagName( "a" );

	for ( var x = 0; x < anchors.length; x++ ) {
		var url = anchors[x].href;
		anchors[x].href = URLTrim( url );
	}
})();

function URLTrim( url ) {
	var sites = Array(
		"http://prohardver.hu/",
		"http://www.prohardver.hu/",
		"http://itcafe.hu/",
		"http://www.itcafe.hu/",
		"http://logout.hu/",
		"http://www.logout.hu/",
		"http://mobilarena.hu/",
		"http://www.mobilarena.hu/",
		"http://gamepod.hu/", 
		"http://www.gamepod.hu/"
	);

	for ( var x = 0; x < sites.length; x++ ) {
		if ( ( url.indexOf( sites[x] ) == 0 ) && ( url.length > sites[x].length ) && ( ( url.search( ".hu/tema/" ) != -1 ) || ( url.search( ".hu/tag/" ) != -1 ) || ( url.search( ".hu/f.php" ) != -1 ) || ( url.search( ".hu/rios3_forum.php" ) != -1 ) ) ) {
			url = url.substring( sites[x].length - 1 );

			if ( url.search( "rios3" ) != -1 ) {
				var re = /(.*\/)rios3_forum\.php\?mod=(\d+)\&id=(\d+).*/;
				url = url.replace( re, "$1f.php?mod=$2&id=$3" );
			}
		}
	}

	return url;
}