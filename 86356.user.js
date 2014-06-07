// ==UserScript==
// @name           Ikariam Normal Ambrosia
// @namespace      IkaAA@ambrosia blocker Thogamer
// @description    İkariam kupa ambrosia görüntüsünden kurtulun.V.0.3.5 ambrosia görünümde olsun..(www.ikariam.forumm.biz)
// @include        http://s*.ikariam.*/index.php*
// @require        http://userscripts.org/scripts/source/57756.user.js
// @author         El Nino
// @version        1.11
//
// @history        1.11 Bugfix: facebook and ambrosia buttons were still visible in the baracks and shipyard view
// @history        1.10 proper Bugfix of the Army & Fleet Garrison Edit - Button (now visible again)
// @history        1.10 fully getting rid of the ambrosia advertisment in the museum
// @history        1.10 inviting-friens-button visible again
// @history        1.01 Bugfix of the Army Garrison Edit - Button (now visible again)
// @history        1.00 Initial release
//
// ==/UserScript==


ScriptUpdater.check(85167, "1.11");

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

GM_addStyle('#container #container2 #viewCityImperium { display: none }');
GM_addStyle('#container #container2 #viewMilitaryImperium { display: none }');
GM_addStyle('#container #container2 #viewResearchImperium { display: none }');
GM_addStyle('#container #container2 #viewDiplomacyImperium { display: none }');

GM_addStyle('#container #container2 #mainview .premiumFeature { display: none }'); // dump & warehouse view
GM_addStyle('#container #mainview span.right a { display: none }');


var dyn = document.getElementsByClassName('dynamic');

for ( var i in dyn ) {
	if (dyn[i].innerHTML.search(/area_economy.jpg/) != -1) {  // city view 
		dyn[i].style.display = "none";
	} else if (dyn[i].innerHTML.search(/culturalPossessions_search/) != -1) {  // museum
		dyn[i].style.display = "none";
	}
}