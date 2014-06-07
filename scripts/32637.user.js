// ==UserScript==
// @name           gtfoHoboBannerScript
// @namespace      http://localhost
// @description    This script remove the annoying colored banners on the Facebook Hobowars living area.
// @author         Xyan Flux
// @version        1.0.0
// @include        http://www.hobowars.com/fb/game.php*cmd=
// @include        http://apps.new.facebook.com/hobowars/game.php*cmd=
// @exclude
// ==/UserScript==

var contents = document.getElementById('contents');

if(contents){
	var table =contents.firstChild.nextSibling.rows[0].cells[0];
	var friends =table.firstChild.nextSibling;
	var points =friends.nextSibling.nextSibling;
	table.removeChild(friends);
	table.removeChild(points);
}



