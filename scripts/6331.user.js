	// ==UserScript==

	// @name           Rewrite links of images and such in tgp forum of Indonesia beauties..

	// @namespace   http://kaskus.us/

	// @description rewrite links using several methods.

    // @include       http://kaskus.us/http://kaskus.us/showthread.php?t=*

	// ==/UserScript==
    

	const re_imageshack = /imageshack\.us.*?\.th\.jpg*/i;
	const re_imagevenue = /http:\/\/(.*?)\.imagevenue\.com.*?th_([^\/]+)\.jpg/i;
	const re_imagefap = /http:\/\/images.imagefap.com\/images\/thumb\/([^\/]+)\.jpg/i;
	const re_picsaway = /www\.picsaway\.com\/thumbs\/([^\/]+)\.jpg/i;
	const re_echocx = /echo\.cx\/.*?\.th\.jpg/i;

	var arLinks = document.links;
	var tgp = new Array;

    for ( var i=0; i < arLinks.length; i++ ) {
		
		var elem = arLinks[i];
		
		// http://img244.imageshack.us/img244/6033/ayaxy5.th.jpg
		if ( elem.href.match( re_imageshack ) ) {
			elem.href = elem.href.replace( /\.th/, '' );
			//tgp.push( new String( elem.href ) );
			//GM_log( 'match ' + elem.href );
		}
		// http://img134.imagevenue.com/loc595/th_56865_3_122_595lo.jpg
		else if ( match = elem.href.match( re_imagevenue ) ) {
			// http://img134.imagevenue.com/img.php?image=56865_3_122_595lo.jpg
			elem.href = 'http://' + match[1] + '.imagevenue.com/img.php?image=' + match[2] + '.jpg';
			//TODO: seek the image only via xhr.
			//for ( var j = 0; j < match.length; j++ ) GM_log( match[j] );
			//tgp.push( new String( elem.href ) );
		}
		//http://images.imagefap.com/images/thumb/677910942.jpg
		else if ( match = elem.href.match( re_imagefap ) ) {
			elem.href = elem.href.replace( /thumb/, 'full' );
			//tgp.push( new String( elem.href ) );
		}
		//http://www.picsaway.com/thumbs/_17_reny_3_-28a6415235.jpg
		else if ( match = elem.href.match( re_picsaway ) ) {
			elem.href = elem.href.replace( /thumbs/, 'uploads' );
		}
		if ( elem.href.match( re_echocx ) ) {
			elem.href = elem.href.replace( /\.th/, '' );
			//tgp.push( new String( elem.href ) );
			//GM_log( 'match ' + elem.href );
		}
		//GM_log( tgp.length );
		//for (var j = 0; j < tgp.length; j++) GM_log( tgp[i] );
    }
