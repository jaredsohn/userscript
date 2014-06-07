// ==UserScript==
// @name           SlaveHack's Best Help 
// @description    Auto login and log editing + password crack fast 
// @author        	usersXcript
// @version             v8.00
// @include        http://*.slavehack.com/*
// @include        *slavehack*index2.php?page=internet&var2=*&var3=login&var4=
// @include        *slavehack*index2.php?page=internet&var2=*&var3=crack&var4=
// @include        *slavehack*index2.php?page=internet&var3=crack&aktie=&var2=*
// @exclude        *slavehack*index2.php?page=internet&var2=*&var3=logout*
// @note           yeey
// ==/UserScript==

/* ===Log editing=== */
var changes = 0;
var str = document.getElementById("content").getElementsByTagName("h2")[0].innerHTML.split("'")[1];
var pat = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/;
var ip = str;

if(document.getElementById('editlog')){
	str = document.getElementById('editlog').innerHTML;
	pat = new RegExp(ip);
	while(str.search(pat) >= 0){
		str = str.replace(pat, "");
		changes++;
	}
	if(changes > 0){
		document.getElementById("editlog").innerHTML = str;
		var inputTag = document.evaluate("/html/body/div[3]/div/div/div[2]/form/input[2]",
										 document,
										 null,
										 XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
										 null);
		inputTag.snapshotItem(0).click();
	}
}
/* ================ */

/* ===pw crack fast=== */
var dn = true;
function fireEvent(obj,evt){
	var fireOnThis = obj;
	if( document.createEvent ) {
	  var evObj = document.createEvent('MouseEvents');
	  evObj.initEvent( evt, true, false );
	  fireOnThis.dispatchEvent(evObj);
	} else if( document.createEventObject ) {
	  fireOnThis.fireEvent('on'+evt);
	}
}
String.prototype.endsWith = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};
String.prototype.startsWith = function(str){
    return (this.indexOf(str) === 0);
}
var allA = document.getElementsByTagName('tr');
for (var i = 0; i < allA.length; i++) {
if (allA[i].innerHTML.replace(new RegExp('<td>', 'g'),'').replace(new RegExp('</td>', 'g'),'').indexOf('Password: ')>=0 && allA[i].innerHTML.replace(new RegExp('<td>', 'g'),'').replace(new RegExp('</td>', 'g'),'').startsWith('Password: ') && !allA[i].innerHTML.replace(new RegExp('<td>', 'g'),'').replace(new RegExp('</td>', 'g'),'').endsWith('???')) {
fireEvent(allA[i+1].childNodes[0].childNodes[0],'click');
dn = false;
}
}
if ( dn == true) {
var str = window.location.href;
var pos=str.indexOf('crack');
if (pos>=0)
{
var allA = document.getElementsByTagName('a');
for (var i = 0; i < allA.length; i++) {
	if ( allA[i].innerHTML.match('Try again') ) {
		window.location.href = allA[i].href;
	}
	if ( allA[i].innerHTML.match('Continue') ) {
		window.location.href = allA[i].href;
	}
}
} else {
var cont = true;
var allA2 = document.getElementsByTagName('a');
for (var i = 0; i < allA2.length; i++) {
	if (allA2[i].innerHTML == 'Access logfile') {
		cont = false;
	}
}
	if (cont == true) {
		var nurl = window.location.href.replace('&var3=login&var4=','&var3=crack&var4=');
		window.location.href = nurl.replace('&var3=logout&var4=','&var3=crack&var4=');
	}
}
}