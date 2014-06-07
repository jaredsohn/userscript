// ==UserScript==
// @name          Funkenschlag online fixes
// @namespace     http://andreycpp/FS
// @description   Firefox/Chrome javascript fix for Funkenschlag online (http://www.boardgames.famdepaus.nl/FS/).
// @include       http://*boardgames.famdepaus.nl/FS/MoveGoods.php*
// @version       0.2
// ==/UserScript==


// The Move Goods page in the game uses images (<img> tags) to display resources that player has (Coal, Oil, Garbage, Uranium), and a javascript to move these resources between the plants.
// Under non-IE browsers, this javascript works only for one resource of each type, i.e. for one Coal, one Oil, one garbage and one Uranium, even though you  might have more than one of these.
// Technically, the problem is that javascript finds images using getElementById(), while all images of each resource type have same ID on the page. E.g. all coals have ID "Coal". This does not work, because 1) getElementById() always returns a single element, 2) elements must have unique IDs

function fix() {
	var html = document.documentElement.innerHTML;
	goods = ["C", "O", "G", "U"];
	for(i in goods) {
		html = html.replace(RegExp('img id="' + goods[i], 'g'), 'img name="' + goods[i]);
		html = html.replace(RegExp('getElementById\\("' + goods[i]), 'getElementsByName("' + goods[i]);
	}
	html = html.replace(/window.onload/, "myload");
	html += "<script>myload();</script>";
	document.write(html);
}

if(navigator.userAgent.indexOf("Firefox") != -1) {
	window.addEventListener("load", fix, false);
} else {
	fix();
}
