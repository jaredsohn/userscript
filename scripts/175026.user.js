// ==UserScript==
// @name        Greasemonkey Script Localization Helper
// @description Provide support to localize your scripts in several languages
// @match       http://*/*
// @version     0.1.4
// @copyright	2013+, Aldebaran Arthemys
// @downloadURL	https://userscripts.org/scripts/source/175026.user.js
// @updateURL	http://userscripts.org/scripts/source/175026.user.js
// ==/UserScript==

var GSLH_m_dicTranslations = new Array();


/*
	Entry Point
*/
(function()
{
	// Avoid entering iframes
	if(window.top != window.self)
		return true;

	/*var bResult = GSLH_AddString("en", "hello", "hello");
	bResult = GSLH_AddString("en", "bye", "bye");
	bResult = GSLH_AddString("fr", "hello", "bonjour");
	bResult = GSLH_AddString("fr", "bye", "au revoir");

	for(var strLocale in GSLH_m_dicTranslations)
	{
		var arrLocale = GSLH_GetLocale(strLocale);
		for(var strKey in arrLocale)
		{
			//alert(strKey + " -> " + arrLocale[strKey]);
		}
	}

	return bResult;*/

})();



function GSLH_AddString(strLocale, strKey, strValue)
{
	var arrLocale = GSLH_GetLocale(strLocale);
	var bAlreadyExists = arrLocale.indexOf(strKey) != -1;
	if (!bAlreadyExists)
		arrLocale[strKey] = strValue;

	return bAlreadyExists;
}

function GSLH_GetString(strKey, strLocale)
{
	var arrLocale = GSLH_GetLocale(strLocale);
        //return arrLocale[strKey]; // seems to crash during the return! don't ask why :(
        var strValue = arrLocale[strKey];
        return strValue;
}

function GSLH_GetLocale(strLocale)
{
	if (strLocale == undefined)
		strLocale = navigator.language || navigator.userLanguage;
	var arrLocale = GSLH_m_dicTranslations[strLocale];
	if (arrLocale == undefined)
	{
		GSLH_m_dicTranslations[strLocale] = new Array();
		arrLocale = GSLH_m_dicTranslations[strLocale];
	}

	return arrLocale;
}
