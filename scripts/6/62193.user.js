// ==UserScript==
// @name           Reddit Horizontal Comment Sort
// @namespace      http://bobsworthindustries.com
// @include        http://www.reddit.com/*/comments/*
// @include        http://www.reddit.com/comments/*
// @include        http://www.reddit.com/*/search*
// ==/UserScript==
(function() {
css = ".commentarea .menuarea{     padding: 2px; }  .commentarea .menuarea:before{     content: 'Sort by:';     padding-right: 10px; }  .commentarea .menuarea .dropdown-title{     display: none; }  .dropdown.lightdrop .selected{     color: #369;     text-decoration: none;     border: solid 1px gray;     border-right: none;     background-image: none;     padding: 0 5px;     background: #C7DEF7; }  .drop-choices.lightdrop {     display:inline;     visibility:visible;     border-left:none;     position:static; } .drop-choices.lightdrop a.choice {     display:inline;     padding: 0 5px; } ";
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