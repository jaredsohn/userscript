// ==UserScript==
// @name        3gokushi-E280
// @namespace   3gokushi-E280
// @description おちゃめな同盟員のリンクをつける
// @include     http://*.3gokushi.jp/*
// @grant       none
// @version     1
// ==/UserScript==

//同盟員にリンク貼れない文字コードの人がいたので作りました。
// @include     http://*.3gokushi.jp/alliance/info.php*
//全体もできなくはないけど、一旦同盟からだけに変更

( function() {

	//var tables = document.getElementsByClassName( "tables" )[0];
	//var links = tables.getElementsByTagName("a");
	var links = document.getElementsByTagName("a");
	
	for ( var cnt = 0; cnt < links.length; cnt++ ) {
		var linkTag = links[cnt];
		var href = linkTag.getAttribute("href");
		if ( href === null ) continue;
		if ( href.indexOf("?user_id=24111") != -1 ) {
			linkTag.innerHTML = "(空白さん)";
		}
	}
	
})();