// ==UserScript==
// @name           Ika-Bloquear de Ambrosia
// @description    Bloquea las opciones de las Ambrosias.
// @homepage       http://userscripts.org/scripts/show/113161
// @include        http://m*.ikariam.*/index.php*
// @require        http://home.arcor.de/tvbwsrtt/577user.js
// @icon	   http://img64.imageshack.us/img64/4486/ikabda.jpg
// @author         2-D (Ex-Reaper)
// @version        v4.5
//
// ==/UserScript==


ScriptUpdater.check(85167, "1.14");

var URL= "http://a.imageshack.us/";
if (document.getElementsByClassName('ambrosiaNoSpin').length) {
	GM_addStyle("#globalResources .ambrosiaNoSpin a {background-image:url("+URL+"img412/535/61009737.png)}");
	GM_addStyle("#globalResources .ambrosiaNoSpin a:hover {background-image:url("+URL+"img840/6773/96049693.png)}");
	GM_addStyle("#globalResources .ambrosiaNoSpin a.down {background-image:url("+URL+"img186/3195/48522111.png)}");
} else {	
	GM_addStyle("#globalResources .ambrosia a {background-image:url("+URL+"img412/535/61009737.png)}");
	GM_addStyle("#globalResources .ambrosia a:hover {background-image:url("+URL+"img840/6773/96049693.png)}"); 
	GM_addStyle("#globalResources .ambrosia a.down {background-image:url("+URL+"img186/3195/48522111.png)}"); 
}

GM_addStyle('#container #facebook_button { display: none }'); // no facebook button
GM_addStyle('#advisors .plusteaser { display: none }');

GM_addStyle('#container #container2 #viewCityImperium { display: none }');
GM_addStyle('#container #container2 #viewMilitaryImperium { display: none }');
GM_addStyle('#container #container2 #viewResearchImperium { display: none }');
GM_addStyle('#container #container2 #viewDiplomacyImperium { display: none }');

GM_addStyle('#container #container2 #mainview .premiumOffer { display: none }'); // dump & warehouse view
GM_addStyle('#container #mainview span.right a { display: none }');

GM_addStyle('#container #container2 #setWorkersBox .premiumOffer { display: none }'); // island view
GM_addStyle('#container #container2 #setWorkersBox .content { min-height: 190px }');

GM_addStyle('#container #container2 #CityOverview #cizitensOrderButton { display: none }'); // town hall view
GM_addStyle('#townHall #CityOverview .stats { height: 145px }');

GM_addStyle('#container #container2 #transportGoods #setPremiumJetPropulsion { display: none }');  // port view

GM_addStyle('#container #container2 #buildForm #premium_btn { display: none }');  // barracks view


var dyn = document.getElementsByClassName('dynamic');

for ( var i in dyn ) {
	try {
		if (dyn[i].innerHTML.search(/area_economy.jpg/) != -1) {  // city view 
			dyn[i].style.display = "none";
		}
	} catch(err) {
		//alert(err);
	}	
	try {
		if (dyn[i].innerHTML.search(/culturalPossessions_search/) != -1) {  // museum
			dyn[i].style.display = "none";
		}
	} catch(err) {
		//alert(err);
	}
	
}