// ==UserScript==
// @name            Funnyjunk Thumb Orgy Button
// @description     Hi all my fellow bronies
// @include         *funnyjunk.com*
// @version         2.0
// @require       http://code.jquery.com/jquery-1.7.js
// ==/UserScript==



	/*(function() {
	var css = "#contentRight .inner{\nbackground-image: url(\"http://fc08.deviantart.net/fs71/f/2011/294/e/a/princess_luna_wallpaper_by_ecmc1093-d4diufn.png\") !important;\nbackground-repeat:no-repeat !important;\nbackground-position:center !important;\nbackground-attachment:fixed !important;\n}";
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
})();*/
var dontDisplayLogo = false; // Change this to true to hide the logo

var btun = document.createElement( 'input' );
with( btun ) {
setAttribute( 'onclick', "$('a.thUp').click()" );
setAttribute( 'value', 'ThUp' );
setAttribute( 'type', 'button' );
setAttribute( 'style', 'border-radius:5px;border:none;background-color:rgb(58,197,255);position: fixed; top: 41px; right: 20px;');
setAttribute( 'ondblclick', "$('a.thUp_i').click(); $('a.thDn_i').click()" );
setAttribute( 'abbr', 'Thumb everyone up' );
}

var inner = document.createElement( 'input' );
with( inner ) {
setAttribute( 'onclick', "$('#siteContent').remove()" );
setAttribute( 'ondblclick', "$('a.thDn').click()" );
setAttribute( 'value', 'Remove content' );
setAttribute( 'type', 'button' );
setAttribute( 'style', 'position: fixed; top: 41px; right: 365px;');
setAttribute( 'class', 'showCommentsButton selected' );
}

var rem = document.createElement( 'input' );
with( rem ) {
setAttribute( 'onclick', "$('#boards_bar').remove()" );
setAttribute( 'value', 'Remove boardsbar' );
setAttribute( 'type', 'button' );
setAttribute( 'style', 'position: fixed; top: 41px; right: 100px;');
setAttribute( 'class', 'showCommentsButton selected' );
}

var remc = document.createElement( 'input' );
with( remc ) {
setAttribute( 'onclick', "$('#channels_bar').remove()" );
setAttribute( 'value', 'Remove channelbar' );
setAttribute( 'type', 'button' );
setAttribute( 'style', 'position: fixed; top: 41px; right: 230px;');
setAttribute( 'class', 'showCommentsButton selected' );
}

if (!dontDisplayLogo)
	{
		$("<img>",
		{
			 src: "http://i.imgur.com/lvWXWSY.png",
            style: "position: fixed; top: 40px; left:16px;z-index:50;"
		}).appendTo("body");
	}

//$(document).keyup(function (e) {
//if (e.keyCode == 20) {
//$('a.thUp').click()
//}
//});
// append at end
document.getElementsByTagName( 'body' )[ 0 ].appendChild( btun );
//document.getElementsByTagName( 'body' )[ 0 ].appendChild( rem );
//document.getElementsByTagName( 'body' )[ 0 ].appendChild( remc );
//document.getElementsByTagName( 'body' )[ 0 ].appendChild( inner );