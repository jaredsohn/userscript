// ==UserScript==
// @author      blablubbb
// @email		userscripts@yahoo.com
// @namespace	http://userscripts.org/
// @name		Travian-time-zone
// @description	Adds second time zone
// @include 	http://*.travian.*
// @version     1.0.0
// @license 	GNU General Public License
// @include 	http://*.travian.*/*
// @include 	http://travian.*/*
// @exclude 	http://*.travian*.*/hilfe.php*
// @exclude 	http://*.travian*.*/index.php*
// @exclude 	http://*.travian*.*/anleitung.php*
// @exclude 	http://*.travian*.*/impressum.php*
// @exclude 	http://*.travian*.*/anmelden.php*
// @exclude 	http://*.travian*.*/gutscheine.php*
// @exclude 	http://*.travian*.*/spielregeln.php*
// @exclude 	http://*.travian*.*/links.php*
// @exclude 	http://*.travian*.*/geschichte.php*
// @exclude 	http://*.travian*.*/tutorial.php*
// @exclude 	http://*.travian*.*/manual.php*
// @exclude 	http://*.travian*.*/ajax.php*
// @exclude 	http://*.travian*.*/ad/*
// @exclude 	http://*.travian*.*/chat/*
// @exclude 	http://*.travian*.*/activate.php*
// @exclude 	http://*.travian*.*/support.php*
// @exclude 	http://*forum.travian*.*
// @exclude 	http://*board.travian*.*
// @exclude 	http://*shop.travian*.*
// @exclude		http://*answers.travian*.*
// @exclude  	http://*help.travian*.*/*
// @exclude		http://www.gettertools.com/*
// @exclude 	http://*.getter-tools.*
// @exclude		http://www.travian.ws/*
// @exclude		http://travian-utils.com/*
// @exclude		http://travianbox.com/*
// @exclude 	*.css*
// @exclude 	*.js*
// ==/UserScript==


/***************** Functions adopted from "Travian: Antifarm\Troop saver" script  and  "autotask gotgs" script"...**************************/
const XPFirst = XPathResult.FIRST_ORDERED_NODE_TYPE;
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

function setTimeDifference() {
	var curentSetup = GM_getValue ( myacc() + "_mytimediff", "0:00:00" );
	var newSetup = prompt("Choose Time-Difference (e.g.:-1:00:00 or 13:00:00 ...):\n\n",curentSetup);
	if ( newSetup != null ){
			GM_setValue ( myacc() + "_mytimediff", newSetup.replace(/\s/g,"") );
			}
}
GM_registerMenuCommand("setTimeDifference", setTimeDifference );

/***************** END Functions adopted from "Travian: Antifarm\Troop saver" script  and  "autotask gotgs" script"...**************************/

function timeToSeconds(time){
var timePos1 = time.search(/\:/);
var t1 = parseInt(time.substr(0, timePos1 ));
var t2 = parseInt(time.substr(timePos1+1 , 2 ));
var t3 = parseInt(time.substr(timePos1+4 , 2 ));
var t = 3600*t1+60*t2+t3;
return t;
}
function mk2dig(t1){
if (t1<10){return "0"+t1;} else {return t1;}
}
function SecondsToTime(sec){
var tag = 24*3600;
while (sec <0) {sec += tag;}
if (sec >tag) {sec = sec % tag;}
var t1 = sec % 60;
var t2 = (sec- t1)/60 % 60;
var t3 = ((sec- t1)/60 - t2 )/60 % 24;
t1 = mk2dig(t1);
t2 = mk2dig(t2);
t3 = mk2dig(t3);
var t = t3+":"+t2+":"+t1;
return t;
}

var timediff = GM_getValue ( myacc() + "_mytimediff", "0:00:00" );
var tpnew = 0;
var pb = new  Array();
var utcTime = new  Array();
var newtime = new  Array();
for(i=1;;i++){
pb=document.getElementById("tp"+i);
if(pb!=null){
utcTime[i] = document.createElement("span");
}
else{break;}
}
var alength = utcTime.length - 1;
for(i=1;i<=alength;i++){
tpnew = alength+i;
utcTime[i].id = "tp"+tpnew;
utcTime[i].setAttribute('class', "u");
utcTime[i].textContent = SecondsToTime(timeToSeconds(document.getElementById('tp'+i).textContent) + timeToSeconds(timediff));
document.getElementById('tp'+i).parentNode.appendChild(utcTime[i]);
}
GM_addStyle(".u { color:red; font-weight: bold; }");