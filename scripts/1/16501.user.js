// ==UserScript==
// @name          Reddit: Eliminate Report and Save Links
// @description   Remove the report, save, share, and watch links at reddit.com.
// @include       *reddit.com*
// ==/UserScript==


var anchors = document.getElementsByTagName( "a" ); 


for( var loop = 0; loop < anchors.length; loop++ ) {
    var anchor = anchors[ loop ];
    if ((anchor.innerHTML=="save" ||
	 anchor.innerHTML=="report" ||
	 anchor.innerHTML=="share" ||
	 anchor.innerHTML=="watch")){
        anchor.parentNode.removeChild(anchor)
    }
}
