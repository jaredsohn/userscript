// ==UserScript==
// @name          What.cd - Hide Similar Artist Map
// @author        SuperSnout
// @version       1.0
// @namespace     http://what.cd
// @description   Hides the Similar Artist Map on artist pages
// @include       http://what.cd/artist.php?id=*
// @include       https://ssl.what.cd/artist.php?id=*
// ==/UserScript==

var strongs = document.getElementsByTagName('strong');

for (i in strongs) {
	var strong = strongs[i];
	if (strong.innerHTML == 'Similar artist map') {
		strong.parentNode.parentNode.style.display = 'none';
		return;
	}
}