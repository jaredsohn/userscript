// ==UserScript==
// @name        tumblr Multi Column
// @namespace   tmc
// @description tumblrでマルチカラム表示に。
// @include     http://www.tumblr.com/dashboard*
// @version     3
// ==/UserScript==
(function () {
	var styles = new String();

	styles += "#right_column,#logo,.post_avatar:after";
	styles += "{display: none;}";
	styles += "#content,#container,#left_column";
	styles += "{width: 100%;}";
	styles += "#content,#container";
	styles += "{padding: 0;}";
	styles += "#posts.posts";
	styles += "{margin:0;}";
	styles += "#posts.posts > .post_container";
	styles += "{margin:0 0 10px;width:33.33%;height:auto;overflow:hidden;}";
	styles += ".post_avatar";
	styles += "{top:0;left:0;width:20px;height:20px;}";
	styles += ".post_container";
	styles += "{float:left;}";
	styles += ".post_full";
	styles += "{width:100%;padding:0;border:15px solid #2C4762;box-shadow:none;margin:0 auto;}";
	styles += ".flipcard,.flipcard .flipcard_front";
	styles += "{width:100%;}";
	styles += ".post_full .post_content,.post_full .post_media";
	styles += "{text-align:center;margin:0 auto;}";
	styles += ".post .post_content img";
	styles += "{margin:0 auto;}";
	styles += ".photoset";
	styles += "{position:rerative;}";
	styles += ".photoset:before";
	styles += "{position:rerative;top:-10px;left:10%;content:'・Photo Set・';color:#2C4762;font-weight:700;}";
	styles += ".post_full.is_photoset .photoset .photoset_row";
	styles += "{margin:0 auto;}";

	var heads  = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(styles));
		heads[0].appendChild(node); 
	}
}) ();