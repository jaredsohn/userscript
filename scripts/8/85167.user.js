// ==UserScript==
// @name           Ikariam Ambrosia Adblock
// @namespace      IkaAA@ambrosia blocker Thogamer
// @description    Blocks all Ambrosia advertisment
// @include        http://s*.ikariam.*/index.php*
// @require        http://home.arcor.de/tvbwsrtt/577user.js
// @author         El Nino
// @version        1.14
//
// @history        1.14 Added: Blocking of the new 0.4.2 Ambrosia Advertisements
// @history        1.13 Changed the link to include the external script to a secure local copy of it to prevent further malicious mass infections from other users scripts
// @history        1.12 Added: removal of the "+"-elements on the advisors
// @history        1.11 Bugfix: facebook and ambrosia buttons were still visible in the baracks and shipyard view
// @history        1.10 proper Bugfix of the Army & Fleet Garrison Edit - Button (now visible again)
// @history        1.10 fully getting rid of the ambrosia advertisment in the museum
// @history        1.10 inviting-friends-button visible again
// @history        1.01 Bugfix of the Army Garrison Edit - Button (now visible again)
// @history        1.00 Initial release
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