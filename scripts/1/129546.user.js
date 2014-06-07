// ==UserScript==
// @name           SideReel Torrent Search Links
// @namespace      l33t.me
// @description    Adds a link to Torrentz search for episodes
// @auther         Pedro Solá <p3dro.sola@gmail.com>
// @include        http://www.sidereel.com/*/search
// @icon           http://www.sidereel.com/images/apple-touch-icon.png
// @version        1.1
// ==/UserScript==

(function(){
	
	// adds a 0 before the number if it is < 10
	// pre: number is a string that contains one or two digits
	// post: number is a string that contains two digits
	function padd( number ){
		if ( parseInt(number, 10) < 10 )
			return '0' + number;
		return number;
	}

	var info;
	// find page url
	var head_links = document.head.getElementsByTagName('link');
	for (var i=0; i<head_links.length; i++){
		if ( head_links[i].rel === 'canonical')
			info = head_links[i].href;
	}

	if (info){
		info = info.replace('http://www.sidereel.com/', '').replace('episode-', '').replace('season-', '').replace('/search', '').replace(/_/g, ' ').split('/');
		var search = 'http://torrentz.eu/search?q=' + info[0] +' S'+ padd(info[1]) +'E'+ padd(info[2]);
		
		// insert image link
		var link = document.createElement('a');
		link.setAttribute('href', search );

		var img = document.createElement('img');
		img.setAttribute('src', 'http://torrentz.eu/favicon.ico');
		link.appendChild( img );

		// $('.link-results h1:first').append( link );
		document.getElementsByClassName('link-results')[0].getElementsByTagName('h1')[0].appendChild( link );
	}
})();
