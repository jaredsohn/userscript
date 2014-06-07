// ==UserScript==
// @name           #NewTwitter Lite
// @namespace      _caizzz
// @description    Makes the new Twitter.com more friendly lookin' with a supa-dupa' easy singlecolumn view and rewamped topbar! 
// @version        1.5.1
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// // ==/UserScript==



(function() {
var css = ".typeahead-row {display:none;}\n.nav-me {display:none;}\n.js-search-form {display:none;}\n.form-search {display:none;}\n.larry-topbar {display:none;}\n.alert-messages {display:none;}\n.dropdown-menu {display:block;position:absolute;top:-500px;}\n.current-user {width:200px;position:absolute;margin-left: -20px;top:489px;}\n.js-dm-dialog {display:block;margin-left:-190px; width: 150px; top:445px;position:absolute;z-index:200000;}\n.content-header {height:7px;background:#fff;}\n.header-inner {display:none;}\n.username {display:inline;font-size:14px;color:#333;font-weight:bold;}\n.dashboard {display:none;}\n.content-main {width:840px;z-index:20000;}\n#search-query:focus {background-color: #555; box-shadow: inset 0px 1px 1px #111; color: #ccc;}\n\n@media(max-width: 1700px){.dashboard{position: absolute;}}";
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
