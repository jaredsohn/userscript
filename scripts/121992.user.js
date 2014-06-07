// ==UserScript==
// @name           Hide "Reklama" on Stooq.pl
// @namespace      http://userscripts.org/users/408873
// @description    Hides "Reklama" div
// @include        http://stooq.com/q/?s=*
// @include        http://stooq.pl/q/?s=*
// @include        http://stooq.com/notowania/?kat=mn
// @include        http://stooq.pl/notowania/?kat=mn
// ==/UserScript==
(function () {
	function hide() {
		var ads = document.getElementById("ads_goog_1");
		if (ads) ads.style.display="none";
		else setTimeout(hide, 500);
	}
	setTimeout(hide, 500);
})();
