// ==UserScript==
// @author         Yiru
// @name           famousboard mods
// @namespace      http://famousboard.com/gm/1
// @include        http://www.famousboard.com/*
// @include        http://*.famousboard.com/*
// @description	   changes all topic pages/links to descending order; skips the error prone 'newest' landing page; thumb replacement on pages with '#big' manually added to them
// ==/UserScript==

// skirt the 'newest' landing page
if(  window.location.href.match( /viewtopic.php\?t=\d+&view=newest$/i ) ) {
	window.location.href = window.location.href.replace( /viewtopic\.php\?t=(\d+)&view=newest/i, "viewtopic,t,$1,postorder,desc.html" );

} else {
	var topicPage = window.location.href.match( /-t\d+(\.|,)/i );
	var forumPage = window.location.href.match( /-f\d+(\.|,)/i );
	var largeImages = window.location.href.match( /#big$/i );

	var allLinks = document.evaluate( '//*[self::a or self::img or self::span]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null );
	var thisElement;

	for ( var i = 0; i < allLinks.snapshotLength; thisElement = allLinks.snapshotItem( ++i ) ) {

		if( null == thisElement )
			continue;

		if( null != thisElement.href && thisElement.href.match( /http:\/\/(www\.)?famousboard\.com/i ) ) {

			// nudge the last post links into a normalized form without trashing per post links inside the topic page
			if( ! topicPage )
				thisElement.href = thisElement.href.replace( /,start,\d+(\.html)#\d+$/, "$1" );

			thisElement.href = thisElement.href.replace( /postorder(=|,)asc/, "" );

			if( ! thisElement.href.match( /postorder,desc/i ) )
				thisElement.href = thisElement.href.replace( /(-t\d+)(\.|,)/i, "$1,postorder,desc$2" );

		// replace thumb for original
		} else if( largeImages && null != thisElement.src && thisElement.src.match( /http:\/\/dl\.famousboard\.com/i ) )
			thisElement.src = thisElement.src.replace( /thumbs\/t_/i, "" );

		// hide 'Goto Page:' under each topic in a Forum listing
		else if( forumPage && 'gotopage' == thisElement.getAttribute('class') )
			thisElement.style.display = 'none';

	}
}