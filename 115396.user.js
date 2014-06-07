// ==UserScript==
// @name           Youtube classic thumbs
// @namespace      Youtube classic Thumbs
// @description    Restores the color to thumbs in comments and shows the thumbs down
// @include        http://www.youtube.com/all_comments*
// @include        http://www.youtube.com/watch*
// @include        https://www.youtube.com/all_comments*
// @include        https://www.youtube.com/watch*
// ==/UserScript==

function init(){
	var css="img.comments-rating-thumbs-up{background:url(\"//s.ytimg.com/yt/imgbin/www-master-vfl6sP8c2.png\") no-repeat scroll -182px -90px transparent !important}"+
		"img.comments-rating-thumbs-down{background:url(\"//s.ytimg.com/yt/imgbin/www-master-vfl6sP8c2.png\") no-repeat scroll -26px -36px transparent}";
	if (typeof GM_addStyle != "undefined") {
		GM_addStyle(css);
	} else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else {
		var heads = AnotherYouTubeDownloader.$$("head");
		if (heads.length > 0) {
			var node = document.createElement("style");
			node.type = "text/css";
			try{
				node.appendChild(document.createTextNode(css));
			}catch(e){}
			heads[0].appendChild(node); 
		}
	}
}
init();