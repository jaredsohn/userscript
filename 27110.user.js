// ==UserScript==
// @name           Travian: Personal NAP Links v0.2 (pre release)
// @namespace      http://userscripts.org/scripts/show/27110
// @author         Zilogix
// @description    UNDER DEVELOPMENT: Provides links to your Personal NAP friends in your Player Description page.
// @include        http://*.travian.*/spieler.php*
// @exclude        http://forum.travian.*
// @email          zilogix@hotmail.com
// @version        0.2
// ==/UserScript==

//set global variables
var SCRIPT = {
	url: 'http://userscripts.org/scripts/source/27110.user.js',
	version: '0.2'
};
var loc = document.location.href;
var suffix;
var XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
var XPOList = XPathResult.ORDERED_NODE_SNAPSHOT_TYPE;

//launch main function after doc is loaded
window.addEventListener('DOMContentLoaded', onLoad, false);
if (document.body) onLoad();

//main function
function onLoad()
{
	var html = document.body.innerHTML;
	if (html.indexOf(' <!-- ERROR ITEM CONTAINER') != -1) window.location.reload();
	
	//create unique suffix
	suffix = getServerName()+'_'+getOwnerId();

	if (isThisPageProfile())
	{
		if (isThisPageMyProfile()) 
		{
			transformPageProfile();
		}
	}
}

function transformPageProfile()
{

}

//retrieve server name
function getServerName()
{
	return location.href.match(/([\w]+[.]travian([\d]?).[\w]+([.][\w]+)?)/i)[1];
}


//retrieve owner id
function getOwnerId()
{
	var user = xpathEvaluate('//table[@id="navi_table"]//a[starts-with(@href, "spieler.php?uid=")]', XPFirst);
	var id = (user) ? getParamFromUrl(user.href, 'uid') : '';
	return id;
}

//xpath helper
function xpathEvaluate(xpath, xpres)
{
  var ret = document.evaluate(xpath, document, null, xpres, null);
  return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

/************************ From QP Targets*****************************/
// from QP of http://userscripts.org/
/**
* getParamFromUrl
* @param {String} url The string of the URL
* @param {String} urlParam The param being searched in the URL
*/
function getParamFromUrl(url, urlParam) {
	var res = "&" + url.substring(url.indexOf("?") + 1); //exclude "?" and before that
	var searchStr = "&" + urlParam + "=";
	var pos = res.indexOf(searchStr);
	if (pos != -1) {
		res = res.substring(res.indexOf(searchStr) + searchStr.length);
		var endPos = (res.indexOf("&") > res.indexOf("#")) ? res.indexOf("&") : res.indexOf("#");
		if (endPos != -1) {
			res = res.substring(0, endPos);
		}
		return res;
	} else {
		return;
	}
}

// ========================================================
// =====   Travian URL functions - Profile Pages      =====
// ========================================================

/** Is the page a profile page */
function isThisPageProfile() { return (isPageProfile(document.location.href)); }
function isPageProfile(url) { return (url.search(/spieler\.php\?uid=/) != -1); }

/** Is this page my profile page */
function isThisPageMyProfile() {
	if (isThisPageProfile()) {
		var linksMyProfilePage = xpathEvaluate('//a[contains(@href, "spieler.php?s=")]');
		return (linksMyProfilePage.snapshotLength > 0);
	}
	return false;
}
/************************ End QP Targets *****************************/