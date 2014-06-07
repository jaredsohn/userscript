// ==UserScript==
// @name        NEXT Soundcloud: Dark Theme
// @description Night mode for the Beta (NEXT) Soundcloud Site
// @include     http://soundcloud.com/*
// @include     https://soundcloud.com/*
// @exclude     http://soundcloud.com/settings
// @exclude     http://soundcloud.com/you/stats
// @exclude     http://soundcloud.com/you/sets
// @exclude     http://soundcloud.com/groups
// @exclude     http://soundcloud.com/explore
// @exclude     http://soundcloud.com/groups/joined
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version     1
// ==/UserScript==

(function() {
unsafeWindow.jQuery (document).ajaxComplete (function(){
var css =  "html, body {background-color:#212121!important;} .sound__soundActions {background:none;} .listenContent__inner{background:none;} .dashbox {display:none;} .userNetworkTop__inner{background:none} .trackList__listItem {background:none;} .sc-border-dark {border:0px;}.sc-border-dark-top {border:0px;} .sc-border-dark-right {border:0px;} .sc-border-dark-bottom {border:0px;} .sc-border-dark-left {border:0px;} .sc-border-light {border:0px;} .sc-border-light-top {border:0px;} .sc-border-light-right {border:0px;} .sc-border-light-bottom {border:0px;} .sc-border-light-left {border:0px;} a.sc-link-dark {color:#FFFFFF;} .search__headerInner {background:none;}"

	if (typeof GM_addStyle != "undefined" )  
	{
		GM_addStyle(css);
		
	}
	
	else if (typeof PRO_addStyle != "undefined") {
		PRO_addStyle(css);
	} else if (typeof addStyle != "undefined") {
		addStyle(css);
	} else 
		{	
			var heads = document.getElementsByTagName("head");
			if (heads.length > 0) {
				var node = document.createElement("style");
				node.type = "text/css";
				node.appendChild(document.createTextNode(css));
				heads[0].appendChild(node); 
			}
		}	
})		
})();

