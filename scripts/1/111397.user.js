// ==UserScript==
// @author      blablubbb
// @email		userscripts@yahoo.com
// @namespace	http://userscripts.org/
// @name		Travian Hero-Wisdom
// @description	script fills skill points of hero
// @include 	http://ts*.travian.*/hero_inventory.php*
// @version     1.0
// ==/UserScript==

const XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
/***************** Functions adopted from "Travian: Antifarm\Troop saver" script  and  "autotask gotgs" script"...Sorry for the messy code...**************************/
/**
 * XPath wrapper - simplifies searching for items in the document.
 */
function find(xpath, xpres, startnode)
{
	if (!startnode) {startnode = document;}
	var ret = document.evaluate(xpath, startnode, null, xpres, null);
	if (ret == null) return null;
	return  xpres == XPFirst ? ret.singleNodeValue : ret;
}

function getLoginButton(doc) {
	var loginButton = find(".//input[ @value='login' and @id='btn_login' ]", XPFirst, doc); // login button // travian version 3.6
	if ( loginButton == null ) { // travian version 4.0
		var xpathLoginButtonT4 = ".//button[ @id='s1' and @name='s1' and @type='submit' and contains(@onclick,'screen.width') and contains(@onclick,'screen.height') ]";
		loginButton = find(xpathLoginButtonT4, XPFirst, doc); // login button
	}
	if ( loginButton != null )
		return loginButton;
	else
		return null;
}

var aTravianVersion = "";
var var_get_uid = null;
function getuid() {
	var loginButton = getLoginButton(document);
	if ( loginButton != null ) // when login page return null
		return null;
	if ( var_get_uid == "" || var_get_uid == null || var_get_uid == undefined ) {
		var tag = document.evaluate('.//div[@id="side_navi"]//a[contains(@href,"spieler.php")]', document, null, XPFirst, null).singleNodeValue;
		if ( tag != null ) {
			aTravianVersion = "3.6";
			var_get_uid = tag.href.match(/\buid=\d{1,}\b/)[0].split("=")[1];
		}
		else {
			tag = document.evaluate('.//div[@id="side_info"]//a[contains(@href,"spieler.php")]', document, null, XPFirst, null).singleNodeValue;
			if ( tag != null ) {
				var_get_uid = tag.href.match(/\buid=\d{1,}\b/)[0].split("=")[1];
				aTravianVersion = "4.0";
			}
			else {
				var_get_uid = null;
			}
		}
	}
	return var_get_uid;
}

function currentServer() {
	var serverr = window.location.hostname.replace(/\.travian\./, "");
	return serverr;
}

function myacc() {
	return currentServer() + "_" + getuid();
}
// from here on: my code... more or less...
function promptDistribution() {
	var curentSetup = GM_getValue ( myacc() + "_hero_skills", "0,0,0,0" );
	var newSetup = prompt("Set up the Points as you like seperated by comma Power,Off,Deff,Res (e.g.: '0,5,10,100' ):\n\n",curentSetup);
	if ( newSetup != null ){
		GM_setValue ( myacc() + "_hero_skills", newSetup.replace(/\s/g,"") );}
}
GM_registerMenuCommand("T4:Hero_Wisdom", promptDistribution );

var talent = [];
talent = GM_getValue ( myacc() + "_hero_skills", "0,0,0,0" ).split(',');
for (var i = 0; i<4;i++){
try{
if (parseInt(document.getElementsByClassName("element points")[i].textContent)<parseInt(talent[i])){
var j =i;
i=4;
var warten = Math.ceil ( Math.random() * 5000 + 3000 ); // random ( 5 sec ) + 3 sec
var address = "http://"+window.location.hostname+"/hero_inventory.php"+document.getElementsByClassName("setPoint ")[j].getAttribute('href');
	window.setTimeout ( function() { 
			window.location.href = address;		
		},
			warten );
}
}
catch(err){GM_log(err);}
}
