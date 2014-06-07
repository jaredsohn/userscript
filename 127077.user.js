// ==UserScript==
// @name          twilog 100hatebu Hiragino Font
// @description	  Use a Hiragino font in twilog hatebu.
// @include       http://twilog.org/100hatebu*
// @include       http://www.twilog.org/100hatebu*
// @include       https://twilog.org/100hatebu*
// @include       https://www.twilog.org/100hatebu*
// ==/UserScript==

(function () {
	var styles = "html,body,input{font-family:'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro' !important;}p.tl-text{font-family:'ヒラギノ角ゴ Pro W6','Hiragino Kaku Gothic Pro' !important;font-weight:600 !important;font-size:1.5em;line-height:1.5em;}p.tl-text a{font-family:'ヒラギノ角ゴ Pro W3','Hiragino Kaku Gothic Pro' !important;font-weight:300 !important;font-size:0.8em;line-height:0.8em;display:block;}";
	var heads  = document.getElementsByTagName("head");
	if (heads.length > 0) {
		var node = document.createElement("style");
		node.type = "text/css";
		node.appendChild(document.createTextNode(styles));
		heads[0].appendChild(node); 
	}
}) ();