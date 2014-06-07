// ==UserScript==
// @name            Funnyjunk Thumb Orgy Button
// @description     Hi all my fellow bronies
// @include         *funnyjunk.com*
// ==/UserScript==

(function() {
var css = "#contentRight .inner{\nbackground-image: url(\"http://static.fjcdn.com/large/pictures/4d/0c/4d0cdb_3092186.jpg\") !important;\nbackground-repeat:no-repeat !important;\nbackground-position:center !important;\nbackground-attachment:fixed !important;\n}";
if (typeof GM_addStyle != "undefined") {
	GM_addStyle(css);
} else if (typeof PRO_addStyle != "undefined") {
	PRO_addStyle(css);
} else if (typeof addStyle != "undefined") {
	addStyle(css);
} else {
	var heads = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(css));
		heads[0].appendChild(node); 
	}
}
})();


var btun = document.createElement( 'input' );
with( btun ) {
setAttribute( 'onclick', "$('a.thUp').click()" );
setAttribute( 'value', 'Thumb up' );
setAttribute( 'type', 'button' );
setAttribute( 'style', 'position: fixed; top: 40px; right: 20px;');
setAttribute( 'ondblclick', "$('a.thUp_i').click(); $('a.thDn_i').click()" );
setAttribute( 'class', 'showCommentsButton selected' );
}

var rem = document.createElement( 'input' );
with( rem ) {
setAttribute( 'onclick', "$('#boards_bar').remove()" );
setAttribute( 'value', 'Remove boardsbar' );
setAttribute( 'type', 'button' );
setAttribute( 'style', 'position: fixed; top: 40px; right: 100px;');
setAttribute( 'class', 'showCommentsButton selected' );
}

var remc = document.createElement( 'input' );
with( remc ) {
setAttribute( 'onclick', "$('#channels_bar').remove()" );
setAttribute( 'value', 'Remove channelbar' );
setAttribute( 'type', 'button' );
setAttribute( 'style', 'position: fixed; top: 40px; right: 230px;');
setAttribute( 'class', 'showCommentsButton selected' );
}

// append at end
document.getElementsByTagName( 'body' )[ 0 ].appendChild( btun );
document.getElementsByTagName( 'body' )[ 0 ].appendChild( rem );
document.getElementsByTagName( 'body' )[ 0 ].appendChild( remc );