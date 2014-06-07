// ==UserScript==
// @name        Neptun Auto-login
// @namespace   https://neptun.gdf.hu/
// @include     https://neptun.gdf.hu/*
// @version     1.0
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// ==/UserScript==

/*GM_deleteValue('fnev');
GM_deleteValue('jelszo');
GM_deleteValue('mp');*/

window.addEventListener('load', function(){
	if (document.Form1.user) {
	    var fnev = GM_getValue('fnev',0);
	    var jelszo = GM_getValue('jelszo',0);
	    var mp = GM_getValue('mp',3);
	    if (fnev == 0) {
	        alert('NEPTUN AUTOLOGIN SZKRIPT\n****************************\nNem rögzítettél még felhasználót!\nKérlek, írd be a felhasználóneved és jelszavad.\nFontos: a jelszó-felhasználónév páros a Firefox caché-ben tárolódik, tehát csak a te gépeden!\nEgy szakértő elő tud varázsolni ha nagyon akar, de azért nincs szemelőtt :-).');
	        var fnev=prompt("Kérlek írd be a NEPTUN kódod:","");
	        var jelszo=prompt("Kérlek írd be a jelszavad:","");
	        var mp=prompt("Hány másodperc után lépjen be automatikusan?","3");
	        GM_setValue('fnev',fnev);
	        GM_setValue('jelszo',jelszo);
	        GM_setValue('mp',mp);
			document.location.reload();
	    } else {
			document.Form1.user.value=fnev;
			document.Form1.pwd.value=jelszo;
			document.Form1.btnSubmit.value=("Auto-belépés fut!");
			setTimeout(function () {
			unsafeWindow.docheck();
			}, (mp*1000));
		}
	}
});