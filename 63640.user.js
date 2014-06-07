// ==UserScript==
// @name           Facebook Mafia Wars AttackX
// @namespace      http://www.spockholm.com/mafia/bookmarklets.php
// @description    attack someone
// @include        http://apps.facebook.com/inthemafia/*
// @include        http://apps.new.facebook.com/inthemafia/*
// @include        http://mwfb.zynga.com/mwfb/*
// ==/UserScript==
/*
	Credits to:
	- Vern Hart, http://vern.com/mwtools/
	- Yevgen Silant'yev, http://joyka.pp.ua/
	- Pete Lundrigan, http://www.exellerate.com
	- Everyone helping with bugs and suggestions
	
	Changelog:
	2009-10-22 v2.12 	with a patch for people running on apps.new.facebook.com
	2009-10-24 			New acting to reload tmp-key
	2009-10-25 v2.12.rc2 Pause countdown from Vern's toolkit.js	
	2009-10-28 v2.12 	final, fixed healing countdown.
	2009-10-28 v2.13 	beta, added timetamps and log truncating.
	2009-10-29 v2.13.1 	beta Zynga decided to remove the base64 coding, fixed?
	v2.16 beta			add the big error reporting again (done)
	2009-11-18 v2.16.1 	beta Added code from Francisco Moraes to count loot drops.
	2009-11-26 v2.17	Added second delay field
	2009-12-02 v2.18	iframe Quickly patched version to work with the new iframe.
	2009-12-04			Removed cookie usage
	2009-12-06			Rewritten code for profile, working with Chrome again
	2010-01-25 v2.21	Updating sf_xw_local variable with each run from the global variable
	2010-02-02 v2.21a	Showing attacker defense instead of opponent. Removed confirm from unframing.
	2010-02-05 v2.23	New way to enter amount of attacks. Default to current stamina.
	2010-02-06 v2.24	Added fighting in Bangkok
*/

javascript:(function (){
try {
if (navigator.appName == 'Microsoft Internet Explorer') {
	alert('You are using Internet Explorer, this bookmarklet will not work.\nUse Firefox or Chrome instead.');
}
else if (document.getElementsByName('mafiawars')[0]) {
	window.location.href=document.getElementsByName('mafiawars')[0].src;
	return;
}
else if (document.getElementsByClassName('canvas_iframe_util')[0]) {
	window.location.href=document.getElementsByClassName('canvas_iframe_util')[0].src;
	return;
}
else {
	document.body.parentNode.style.overflowY="scroll";
	document.body.style.overflowX="auto";
	document.body.style.overflowY="auto";
	try {
		document.evaluate('//div[@id="mw_city_wrapper"]/div',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null).snapshotItem(0).style.margin="auto";
		if(typeof FB != 'undefined') {
			FB.CanvasClient.stopTimerToSizeToContent; 
			window.clearInterval(FB.CanvasClient._timer);
			FB.CanvasClient._timer=-1;
		}
		document.getElementById('mw_zbar').parentNode.removeChild(document.getElementById('mw_zbar'));
	}
	catch (fberr) {}
}
var theurl = new String(document.location);
var hplow=20;
var version='AttackX v2.24 beta (iframe)';
var run=1;
var xmlHTTP;
var content=document.getElementById('content_row');
var combinedloot=' ';
var attacknow=0;
var defnow=0;
var attackprev=99999;
var defprev=99999;
var zyngaimg='<img src="http://mwfb.static.zynga.com/mwfb/graphics/';
var levelup=zyngaimg+'icon_promote_up_15x15_01.gif" width="16" height="16" align="middle" title="Level up">';
var healed=zyngaimg+'icon_health_16x16_01.gif" width="16" height="16" align="middle" title="Healed">';
var bodyguard=zyngaimg+'icon-defense.gif" width="16" height="16" align="middle" title="Bodyguard">';
var safecracker=zyngaimg+'icon_cash_16x16_01.gif" width="16" height="16" align="middle" title="Safecracker">';
var buttonman=zyngaimg+'icon-attack.gif" width="16" height="16" align="middle" title="Button Man">';
var kill=zyngaimg+'property_protect_shield_white_off_01.gif" width="16" height="16" align="middle" title="Killed opponent">';
var mafia_attack=zyngaimg+'icon_mafia_attack_22x16_01.gif" width="22" height="16" align="middle" title="Attack">';
var mafia_defense=zyngaimg+'icon_mafia_defense_22x16_01.gif" width="22" height="16" align="middle" title="Defense">';
var pauseevent=' ';
var last_url=null;
var stamina=document.getElementById('user_stamina').innerHTML;
var attack=stamina;
var cur_stam=stamina;
var attacks=0;
var lost=0;
var exp_gained=0;
var ny_gained=0;
var cuba_gained=0;
var moscow_gained=0;
var bangkok_gained=0;
var retries=0;
var dtaken=0;
var ddealt=0;
var tmpkey="";
var once=false;
var targetname='Name not found';
var timestamping=true;
var log_keep=/(Iced|Killed|level|completed|Starting)/;
var log_size=20;
var base64=false;
var lootcount=0;
var wait1=1;
var wait2=1;
var healcity = 'New York';
var onevent = 'Continue';
var travelkey='';
var setcomp = false;
var theaurl;
var tempattempts=0;
var yakuza = 0;
var triad = 0;
var rank='';
var ranks = [];
ranks['Yakuza'] = 0;
ranks['Triad'] = 0;
ranks['YakuzaRank'] = 0;
ranks['TriadRank'] = 0;
// from Yevgen Silant'yev, http://joyka.pp.ua/
function getMWURL() {
	str = document.location;
	str = str.toString();
	beg = str.substring(0,str.indexOf('?')+1);
	str = str.substring(str.indexOf('?')+1);
	str = str.split('&');
	mid = '';
	for(var i=0;i<str.length;i++){
		if(str[i].indexOf('sf_xw_')==0){ mid=mid+str[i]+'&'; }
	}
	return beg+mid;
}
var MWURL = getMWURL();
var sf_xw_sig = /sf_xw_sig=([a-fA-F0-9]+)/.exec(MWURL);
var heal_url = MWURL+'xw_controller=hospital&xw_action=heal&xw_city=1&ajax=1&skip_req_frame=1';
// createCookie from Vern's Toolkit http://vern.com/mwtools/
function createCookie(name,value) {
	// expire one month from now
	var expires = new Date();
	expires.setDate(expires.getDate()+30);
	document.cookie = name+"="+value+";expires="+expires.toGMTString()+"; path=/";
}

// readCookie from Vern's Toolkit http://vern.com/mwtools/
function readCookie(name) {
	var i,
		cookie,
		nameEQ = name+"=",
		cookieArray = document.cookie.split(";");
	for (i=0; i< cookieArray.length; i++) {
		cookie = cookieArray[i];
		while (cookie.charAt(0)==' ')
			cookie = cookie.substring(1,cookie.length);
		if (cookie.indexOf(nameEQ) == 0)
			return cookie.substring(nameEQ.length,cookie.length);
	}
	return null;
}
// begin opera base64 patch from Yevgen Silant'yev
if (typeof window.atob === "undefined") {
  window.atob= function(input, output, chr1, chr2, chr3, enc1, enc2,enc3, enc4, i) {
    b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    output = "";
    i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = b64.indexOf(input.charAt(i++));
      enc2 = b64.indexOf(input.charAt(i++));
      enc3 = b64.indexOf(input.charAt(i++));
      enc4 = b64.indexOf(input.charAt(i++));
      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;
      output = output + String.fromCharCode(chr1);
      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    return output;
  }
  ;
}
if (typeof window.btoa === "undefined") {
  window.btoa= function (input, b64, output, chr1, chr2, chr3, enc1, enc2, enc3, enc4, i) {
    b64="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    output = "";
    i = 0;
    do {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      }
      else
        if (isNaN(chr3)) {
          enc4 = 64;
        }
      output = output + b64.charAt(enc1) + b64.charAt(enc2) +b64.charAt(enc3) + b64.charAt(enc4);
    }
    while (i < input.length);
    return output;
  }
  ;
}
// end opera base64 patch
function create_div() {
	if(document.getElementById('spockdiv')) {
		document.getElementById('spockdiv').innerHTML = html;
	}
	else {
		var spock_div=document.createElement("div");
		spock_div.id = 'spockdiv';
		spock_div.innerHTML = html;
		content.insertBefore(spock_div, content.firstChild);
	}
}
try {
	//get urls from fight result screen
	var target=document.getElementsByClassName('fightres_name')[1].firstChild.href;
	if (profileurl=/xw_city=(\d).*?tmp=([a-f0-9]+).*?user=(\d+)/.exec(target)) {
		targetprofile = MWURL+'xw_controller=stats&xw_action=view&xw_city='+profileurl[1]+'&tmp='+profileurl[2]+'&user='+profileurl[3];
	}
	if (profileurl=/xw_city=(\d).*?tmp=([a-f0-9]+).*?user=([A-Za-z0-9+\/=]+)/.exec(target)) {
		targetprofile = MWURL+'xw_controller=stats&xw_action=view&xw_city='+profileurl[1]+'&tmp='+profileurl[2]+'&user='+profileurl[3];
	}
	var targetname=document.getElementsByClassName('fightres_name')[1].firstChild.innerHTML;
}
catch (err) {
	//get urls from profile page
	if(name = document.getElementById('inner_page').getElementsByClassName('title')[0].innerHTML) {
		if(thename = /"(.+)",/.exec(name)) {
			targetname=thename[1];
		}
		else {
			targetname='Name not found';
		}
	}
	var as = document.getElementsByTagName('a');
	for(var i=0; i<as.length; i++){
		if(as[i].innerHTML=='Attack') {
			if (/html_server\.php\?query_params=/.test(as[i].href)) { 
				attackhref = new String(as[i].href);
				attacksub = attackhref.substring(attackhref.indexOf("=")+1);
				attackstring=atob(attacksub);
				base64=true;
			}
			else {
				//attackhref = new String(as[i].href);
				if(st=/xw_city=(\d).*?tmp=([a-f0-9]+).*?opponent_id=(\d+)/.exec(as[i].href)) {
					attackstring=MWURL+'xw_controller=fight&xw_action=attack&xw_city='+st[1]+'&tmp='+st[2]+'&opponent_id='+st[3];
					tmpkey=st[2];
				}
				if(st=/xw_city=(\d).*?tmp=([a-f0-9]+).*?opponent_id=(\d+)/.exec(as[i].onclick)) {
					attackstring=MWURL+'xw_controller=fight&xw_action=attack&xw_city='+st[1]+'&tmp='+st[2]+'&opponent_id='+st[3];
					tmpkey=st[2];
				}
			}
		}
		if(as[i].innerHTML=='Profile') {
			var target=as[i].href;
			if (profileurl=/xw_city=(\d).*?tmp=([a-f0-9]+).*?user=(\d+)/.exec(target)) {
				targetprofile = MWURL+'xw_controller=stats&xw_action=view&xw_city='+profileurl[1]+'&tmp='+profileurl[2]+'&user='+profileurl[3];
			}
		}
	}
	if(m=/opponent_id=([0-9]*)/.exec(attackstring)) { a=m[1]; }
	if(m=/tmp=([0-9a-f]*)/.exec(attackstring)) { tmpkey=m[1]; }
	if(m=/xw_exp_sig=([0-9a-f]*)/.exec(attackstring)) { xw_exp_sig=m[1]; }
	if(m=/xw_time=([0-9]*)/.exec(attackstring)) { xw_time=m[1]; }
	//if(m=/sf_xw_user_id=(\d+).*?sf_xw_sig=([a-f0-9]+)/.exec(attackstring)) { special='&sf_xw_user_id='+m[1]+'&sf_xw_sig='+m[2]; }
}
try {
	travelbase=atob(document.getElementById('travel_menu').childNodes[1].href.substring(72));
	if (m=/tmp=([0-9a-f]*)/.exec(travelbase)) { travelkey='&tmp='+m[1]; }
}
catch (err) {
	//if (m=/travel.*?tmp=([0-9a-f]*)/.exec(document.getElementById("mw_masthead").innerHTML)) { travelkey='&tmp='m[1]; } 
	//if (m=/travel.*?sf_xw_user_id=(\d+).*?sf_xw_sig=([a-f0-9]+)/.exec(document.getElementById("mw_masthead").innerHTML)) { travelkey='&sf_xw_user_id='+m[1]+'&sf_xw_sig='+m[2]; } 
}
//new city check inspired by attackX ajax
if (m=/mw_city(\d+)/.exec(document.getElementById('mw_city_wrapper').className)) {
	if (m[1] == 1) {
		city = 'New York';
		healcity = 'New York';
		fightcity = 'New York';
		xw_city=1;
	}
	if (m[1] == 2) {
		city = 'Cuba';
		healcity = 'Cuba';
		fightcity = 'Cuba';
		xw_city=2;
	}
	if (m[1] == 3) {
		city = 'Moscow';
		healcity = 'Moscow';
		fightcity = 'Moscow';
		xw_city=3;
	}
	if (m[1] == 4) {
		city = 'Bangkok';
		healcity = 'Bangkok';
		fightcity = 'Bangkok';
		xw_city=4;
	}
}
//var wait1 = readCookie('spockaX_wait1');
//if (wait1) { wait1=wait1.replace(/[^0-9]/g,''); }
if ((wait1 == null) || (wait1.length == 0)) { wait1 = 1; }
//var wait2 = readCookie('spockaX_wait2');
//if (wait2) { wait2=wait2.replace(/[^0-9]/g,''); }
if ((wait2 == null) || (wait2.length == 0)) { wait2 = 1; }
healcity = readCookie('_healcity');
if ((healcity == 'New York') || (healcity == 'Cuba') || (healcity == 'Moscow') || (healcity == 'Bangkok') || (healcity == 'Disabled')) { healcity = readCookie('_healcity'); }
else { healcity = 'New York'; }
//onevent = readCookie('spockaX_onevent');
if ((onevent == 'Continue') || (onevent=='Pause')) { }
else { onevent = 'Continue'; }
//log_size = readCookie('spockaX_logsize');
//if (log_size) { log_size=log_size.replace(/[^0-9]/g,''); }
if ((log_size == null) || (log_size.length == 0)) { log_size = 20; }
if (healcity == 'New York') {
	heal_url = MWURL+'xw_controller=hospital&xw_action=heal&xw_city=1&ajax=1&skip_req_frame=1';
}
if (healcity == 'Cuba') {
	heal_url = MWURL+'xw_controller=hospital&xw_action=heal&xw_city=2&ajax=1&skip_req_frame=1';
}
if (healcity == 'Moscow') {
	heal_url = MWURL+'xw_controller=hospital&xw_action=heal&xw_city=3&ajax=1&skip_req_frame=1';
}
if (healcity == 'Bangkok') {
	heal_url = MWURL+'xw_controller=hospital&xw_action=heal&xw_city=4&ajax=1&skip_req_frame=1';
}
if (healcity == 'Disabled') { heal_url = ' '; }
html = 
'<style type="text/css">'+
	'.messages img{margin:0 3px;vertical-align:middle}'+
	'.messages iframe{border:0;margin:0 3px}'+
	'.messages input {border: 1px solid #FFF;margin 0;padding 0;background: #000; color: #FFF; width: 30px;}'+
	'#play{display:none}'+
	'#pause{display:inline}'+
	'#close{display:inline}'+
'</style>'+
'<table class="messages">'+
'<tr>'+
	'<td width="15%">Attacks:</td>'+
	'<td><span id="attacks">0</span> of <input id="attack" name="attack" type="text" value="'+attack+'" maxlength="5" style="width:40px"/><span id="lost"></span></td>'+
	'<td align="right" style="text-align:right;font-size:0.8em">'+version+' - <a href="http://www.spockholm.com/mafia/bookmarklets.php?attackX" target="_top">Spockholm Mafia Tools</a> - <a href="http://www.spockholm.com/mafia/donate.php?attackX" alt="Buy me a beer" target="_blank">PintWare</a> - <a href="#" id="play"><img src="http://www.spockholm.com/mafia/play.gif" title="Play" width="16" height="16" /></a> <a href="#" id="pause"><img src="http://www.spockholm.com/mafia/pause.gif" title="Pause" width="16" height="16" /></a> <a href="#" id="close"><img src="http://www.spockholm.com/mafia/stop.gif" title="Close" width="16" height="16" /></a></td>'+
'</tr>'+
'<tr>'+
	'<td>Exp Gained:</td>'+
	'<td id="exp_gained"></td>'+
	'<td align="right" style="text-align:right;"><a href="#" id="onevent">'+onevent+'</a> on event and <a href="#" id="lootshow">Hiding</a> items</td>'+
'</tr>'+
'<tr>'+
	'<td>Money:</td>'+
	'<td id="money_gained"></td>'+
	'<td align="right" style="text-align:right;"><span id="zecity"></span> Delay: <input id="delay1" name="delay1" type="text" value="'+wait1+'" maxlength="4" /> to <input id="delay2" name="delay2" type="text" value="'+wait2+'" maxlength="4" /> sec</td>'+
'</tr>'+
'<tr>'+
	'<td id="damagetitle">Damage:</td>'+
	'<td id="damage"></td>'+
	'<td align="right" style="text-align:right;">Healing in <a href="#" id="heal">'+healcity+'</a></td>'+
'</tr>'+
'<tr>'+
	'<td>Status:</td>'+
	'<td colspan="2" id="status"></td>'+
'</tr>'+
'<tr id="lootrow">'+
	'<td valign="top">Loot:</td>'+
	'<td colspan="2" id="loot"></td>'+
'</tr>'+
'<tr>'+
	'<td valign="top"><a href="#" id="logshow">Showing</a> Log:<br/>Limit: <input id="logsize" name="logsize" type="text" value="'+log_size+'" maxlength="4" /></td>'+
	'<td colspan="2" id="log" valign="top"></td>'+
'</tr>'+
'</table>';
//if (!content) { alert('You must attack someone first, then use the bookmarklet.'); return; }
//else {
	//attack=prompt('Enter number of attacks to do.',stamina);
	//if(attack)
	create_div();
//}
document.getElementById('close').onclick=function(e) {
	run = 0;
	document.getElementById("content_row").removeChild(document.getElementById("spockdiv"));
	return false;
}
document.getElementById('pause').onclick=function(e) {
	run = 0;
	pauseevent='Manually paused. Target is <a href="'+targetprofile+'&skip_req_frame=1">'+targetname+'</a>.';
	document.getElementById('pause').style.display = 'none';
	document.getElementById('play').style.display = 'inline';
	return false;
}
document.getElementById('play').onclick=function(e) {
	run = 1;
	document.getElementById('play').style.display = 'none';
	document.getElementById('pause').style.display = 'inline';
	if (cur_health < hplow) { 
		healing(); 
	} 
	else {
		msg('Resuming attacks on target <a href="'+targetprofile+'&skip_req_frame=1">'+targetname+'</a> (<a href="'+last_url+'">url</a>)');
		request(last_url);
	}
	return false;
}
document.getElementById('delay1').onkeyup=function(e) {
	time = parseInt(document.getElementById('delay1').value);
	if((time < 0) || (!time)) { wait1 = 0; }
	else { wait1 = time; }
	//createCookie('spockaX_wait1',wait1);
	document.getElementById('delay1').value=wait1;
}
document.getElementById('delay2').onkeyup=function(e) {
	time = parseInt(document.getElementById('delay2').value);
	if((time < 0) || (!time)) { wait2 = 0; }
	else { wait2 = time; }
	//createCookie('spockaX_wait2',wait2);
	document.getElementById('delay2').value=wait2;
}
document.getElementById('logsize').onkeyup=function(e) {
	log_size = parseInt(document.getElementById('logsize').value);
	if((log_size < 0) || (!log_size)) { log_size = 20; }
	else { log_size = log_size; }
	//createCookie('spockaX_logsize',log_size);
	document.getElementById('logsize').value=log_size;
}
document.getElementById('attack').onkeyup=function(e) {
	attack = parseInt(document.getElementById('attack').value);
	if((attack < 0) || (!attack)) {
		attack = cur_stam; 
	}
	document.getElementById('attack').value=attack;
	if ((attack > attacks) && (run == 0)) {
		run = 1;
		document.getElementById('play').style.display = 'none';
		document.getElementById('pause').style.display = 'inline';
		if (cur_health < hplow) { 
			healing(); 
		} 
		else {
			//msg('Resuming attacks on target <a href="'+targetprofile+'&skip_req_frame=1">'+targetname+'</a> (<a href="'+last_url+'">url</a>)');
			attack_again();
		}
		return false;
	}
}
document.getElementById('heal').onclick=function(e) {
	if(healcity == 'New York') {
		healcity = 'Cuba';
		document.getElementById('heal').innerHTML = healcity;
		heal_url = MWURL+'xw_controller=hospital&xw_action=heal&xw_city=2&ajax=1&skip_req_frame=1';
	}
	else if (healcity == 'Cuba') {
		healcity = 'Moscow';
		document.getElementById('heal').innerHTML = healcity;
		heal_url = MWURL+'xw_controller=hospital&xw_action=heal&xw_city=3&ajax=1&skip_req_frame=1';
	}	
	else if (healcity == 'Moscow') {
		healcity = 'Bangkok';
		document.getElementById('heal').innerHTML = healcity;
		heal_url = MWURL+'xw_controller=hospital&xw_action=heal&xw_city=4&ajax=1&skip_req_frame=1';
	}
	else if (healcity == 'Bangkok') {
		healcity = 'Disabled';
		document.getElementById('heal').innerHTML = healcity;
		heal_url = ' ';
	}
	else if (healcity == 'Disabled') {
		healcity = 'New York';
		document.getElementById('heal').innerHTML = healcity;
		heal_url = MWURL+'xw_controller=hospital&xw_action=heal&xw_city=1&ajax=1&skip_req_frame=1';
	}
	createCookie('_healcity',healcity);
	return false;
}
document.getElementById('onevent').onclick=function(e) {
	if (onevent == 'Continue') {
		onevent = 'Pause';
		document.getElementById('onevent').innerHTML = onevent;
	}
	else {
		onevent = 'Continue';
		document.getElementById('onevent').innerHTML = onevent;
	}
	//createCookie('spockaX_onevent',onevent);
	return false;
}
function pausecheck(s) {
	if (onevent == 'Pause') {
		run = 0;
		pauseevent=s;
	}
}
document.getElementById('lootshow').onclick=function(e) {
	var row = document.getElementById('lootrow');
	if (row.style.display == '') { 
		row.style.display = 'none'; 
		document.getElementById('lootshow').innerHTML = 'Hiding';
	}
	else { 
		row.style.display = '';
		document.getElementById('lootshow').innerHTML = 'Showing';
	}
	return false;
}
document.getElementById('logshow').onclick=function(e) {
	var row = document.getElementById('log');
	if (row.style.display == '') { 
		row.style.display = 'none'; 
		document.getElementById('logshow').innerHTML = 'Hiding';
	}
	else { 
		row.style.display = '';
		document.getElementById('logshow').innerHTML = 'Showing';
	}
	return false;
}
document.getElementById('play').style.display = 'none';
document.getElementById('pause').style.display = 'inline';
document.getElementById('close').style.display = 'inline';
document.getElementById('lootrow').style.display = 'none';
function get_xmlHTTP () {
  if (window.XMLHttpRequest)
    return new XMLHttpRequest();
  if (window.ActiveXObject)
    return new ActiveXObject('Microsoft.XMLHTTP');
  return null;
}
function traveling(to,from) {
	if (to == 'New York') { 
		travelurl=MWURL+'xw_controller=travel&xw_action=travel&destination=1&from=fight'+travelkey+'&ajax=1&skip_reqskip_req_frame=1';
	}
	if (to == 'Cuba') { 
		travelurl=MWURL+'xw_controller=travel&xw_action=travel&destination=2&from=fight'+travelkey+'&ajax=1&skip_req_frame=1';
	}
	if (to == 'Moscow') { 
		travelurl=MWURL+'xw_controller=travel&xw_action=travel&destination=3&from=fight'+travelkey+'&ajax=1&skip_req_frame=1';
	}
	if (to == 'Bangkok') { 
		travelurl=MWURL+'xw_controller=travel&xw_action=travel&destination=4&from=fight'+travelkey+'&ajax=1&skip_req_frame=1';
	}
	return(travelurl);
}
function healing() {
	if (healcity == 'Disabled') {
		msg('Healing disabled, pausing attacks on <a href="'+targetprofile+'&skip_req_frame=1">'+targetname+'</a>.');
		document.getElementById('play').style.display = 'inline';
		document.getElementById('pause').style.display = 'none';		
	}
	else if (city != healcity) {
		msg('Traveling to '+healcity+', hospital is there.');
		if(city == 'New York') { request(traveling(healcity,1)); }
		if(city == 'Cuba') { request(traveling(healcity,2)); }
		if(city == 'Moscow') { request(traveling(healcity,3)); }
		if(city == 'Bangkok') { request(traveling(healcity,4)); }
	}
	else { 
		msg('Going to '+healcity+' hospital...');
		request(heal_url); 
	}
	return false;
}
function request(url) {
	url = url.replace(/sf_xw_sig=([^&]+)/.exec(url)[1],local_xw_sig);
	last_url=url;
	if (attacks >= attack) { 
		msg('Done attacking. Target was <a href="'+targetprofile+'&skip_req_frame=1">'+targetname+'</a>.'); 
		run = 0;
		//log(timestamp()+'Done attacking '+targetname);
		document.getElementById('play').style.display = 'inline';
		document.getElementById('pause').style.display = 'none';
	}
	else if (run == 1) {
		xmlHTTP.onreadystatechange=state_change;
		xmlHTTP.open('GET',url,true);
		xmlHTTP.send(null);
	} else {
		msg(pauseevent);
		document.getElementById('play').style.display = 'inline';
		document.getElementById('pause').style.display = 'none';
	}
}
function msg(s) {
    document.getElementById('status').innerHTML=s;
}
function log(s) {
	ratio = exp_gained/attacks;
	document.getElementById('attacks').innerHTML=attacks;
	//document.getElementById('attack').value=attack;
	if (lost > 0) { document.getElementById('lost').innerHTML='<span class="more_in">Lost: '+lost+' &nbsp; ('+(lost/attacks*100).toFixed(1)+'%)</span>'; }
	document.getElementById('exp_gained').innerHTML=exp_gained+' &nbsp; <span class="more_in">('+(ratio).toFixed(2)+' xp/sta)</span>';
	document.getElementById('damage').innerHTML = commas(ddealt)+' dealt / '+commas(dtaken)+' taken';
	if ((ranks['Yakuza'] != 0) || (ranks['Triad'] != 0)) {
		document.getElementById('damagetitle').innerHTML='Rank:';
		document.getElementById('damage').innerHTML = 'Yakuza: '+ranks['YakuzaRank']+' ('+(ranks['Yakuza'] > 0 ? '<span class="good">+' : '<span class="bad">')+ranks['Yakuza']+'</span>) &nbsp; Triad: '+ranks['TriadRank']+' ('+(ranks['Triad'] > 0 ? '<span class="good">+' : '<span class="bad">')+ranks['Triad']+'</span>)';
	}
	money_gained='';
	if (ny_gained < 0) { money_gained += '<span class="bad">-$'+commas(Math.abs(ny_gained))+'</span>  '; }
	if (ny_gained > 0) { money_gained += '<span class="good">$'+commas(ny_gained)+'</span>  '; }
	if (cuba_gained < 0) { money_gained += ' &nbsp; <span class="bad">-C$'+commas(Math.abs(cuba_gained))+'</span>  '; }
	if (cuba_gained > 0) { money_gained += ' &nbsp; <span class="good">C$'+commas(cuba_gained)+'</span>  '; }
	if (moscow_gained < 0) { money_gained += ' &nbsp; <span class="bad">-R$'+commas(Math.abs(moscow_gained))+'</span>  '; }
	if (moscow_gained > 0) { money_gained += ' &nbsp; <span class="good">R$'+commas(moscow_gained)+'</span>  '; }
	if (bangkok_gained < 0) { money_gained += ' &nbsp; <span class="bad">-B$'+commas(Math.abs(bangkok_gained))+'</span>  '; }
	if (bangkok_gained > 0) { money_gained += ' &nbsp; <span class="good">B$'+commas(bangkok_gained)+'</span>  '; }
	document.getElementById('money_gained').innerHTML = money_gained;
	var l=document.getElementById('log');
	logtrunc(s,log_size,log_keep);
	document.getElementById('loot').innerHTML='' + lootcount + '/' + attacks + ' &nbsp; (' + (lootcount/attacks*100).toFixed(1) + '%) <br/>' + combinedloot;
}
var Loots=new Array();
function add_loot(s){
	var f=-1;
	for(var i=0;i<Loots.length&&f==-1;++i) {
		if(Loots[i][0]==s) { f=i; }
	}
	if(f!=-1) { Loots[f][1]++; }
	else {
		Loots[Loots.length]=new Array(s,1);
	}
	var t='';
	Loots.sort();
	for(var i=0;i<Loots.length;++i) {
		t+='<span class="good">'+Loots[i][1]+'x</span> '+Loots[i][0]+'<br />';
	}
	combinedloot=t;
	lootcount++;
}
function commas(s) {
	while (d=/(\d+)(\d{3}.*)/.exec(s)) {
		s = d[1] + ',' + d[2];
	}
	return s;
}
function p(s) {
	return parseInt(s.replace(/,/g, ''));
}
function retry(s) {
  if (retries > 9) {
    msg(s + ', not retrying any more.');
  }
  else {
		setTimeout(function(){
			retries++;
			msg(s+'; retry #'+retries+'...');
			request(last_url);
		},3000);
	}
}
function myRandom(min,max) {
	return min + Math.floor(Math.round((Math.random() * (max - min))));
}
function attack_again() {
    function f() {
		if(tmpkey == "") { 
			msg('Loading target profile page... (<a href="'+targetprofile+'&skip_req_frame=1">url</a>)');
			request(targetprofile+'&ajax=1&skip_req_frame=1');
		}
		else {
			if (base64) { 
				attackurl='xw_controller=fight&xw_exp_sig='+xw_exp_sig+'&xw_time='+xw_time+'&xw_action=attack&xw_city='+xw_city+'&tmp='+tmpkey+'&opponent_id='+a;
				msg('Attacking '+targetname+' in '+city+'... (<a href="http://apps.facebook.com/inthemafia/remote/html_server.php?query_params='+btoa(attackurl)+'">url base64</a>)');
				request('http://apps.facebook.com/inthemafia/remote/html_server.php?query_params='+btoa(attackurl)+'&ajax=1&skip_req_frame=1'); 
			}
			else {
				theaurl=MWURL+'xw_controller=fight&xw_action=attack&xw_city='+xw_city+'&tmp='+tmpkey+'&opponent_id='+a;
				msg('Attacking '+targetname+' in '+city+'... (<a href="'+theaurl+'skip_req_frame=1">url</a>)');
				request(theaurl+'&ajax=1&skip_req_frame=1');
			}
		}
    }
    //msg('Waiting for '+wait+' second'+(wait==1?"":"s")+'...');
	wait = myRandom(parseInt(wait1),parseInt(wait2));
	pausing(wait,'Attacking again in ',f);
    //setTimeout(f, wait*100);
}
// deliberate pause from Vern's toolkit.js, http://vern.com/mwtools/
// given a number of seconds, an optional message and a resume
// function, will pause a few seconds and then execute the function
function pausing(seconds,message,resume_func) {
	// if the message was left out, shuffle things a bit
	if (typeof(message) == 'function') {
		resume_func = message;
		message = null;
	}
	if (message)
		message=message;
	else
	message='Pausing';
	msg(message+' <span id="seconds">'+seconds+' second'+(seconds==1?'':'s')+'</span>...');
	//var me = this;
	var timer = setInterval(function(){//)
		seconds--;
		if (document.getElementById('seconds'))
			document.getElementById('seconds').innerHTML=seconds+' second'+(seconds==1?'':'s');
		else
			clearInterval(timer);
		if (seconds<=0) {
			clearInterval(timer);
			if (typeof(resume_func) == 'function')
				resume_func();
		}
	},1000);
}
// From Vern's toolkit.js, http://vern.com/mwtools/
// log puts a message in the log array and outputs it
// limit is how many log lines we keep (0 == infinite)
// keep is a regex of lines that we never delete
logs = [];
extralog = [];
function logtrunc(message,limit,keep) {
	logs.unshift(message);
	if (limit > 0) {
		if (logs.length>limit) {
			message=logs.pop();
			if ((keep.test) && (keep.test(message)))
					extralog.unshift(message);
		}
	}
	if ((document.getElementById('log')) && (document.getElementById('log').nodeName == 'TD')) {
		document.getElementById('log').innerHTML=logs.concat(extralog,'').join('<br/>');
	}
}
function timestamp() {
	now = new Date();
	var CurH = now.getHours();
	CurH = (CurH<10?'0'+CurH:CurH);
	var CurM = now.getMinutes();
	CurM = (CurM<10?'0'+CurM:CurM);
	if (timestamping) { return '<span class="more_in">['+CurH+':'+CurM+']</span> '; }
	else { return ''; }
}
function state_change() {
	if (xmlHTTP.readyState == 4) {
		if (xmlHTTP.status == 200) {
			s='';
			uc='';
			exp='';
			stats='';
			m=[];
			s = xmlHTTP.responseText;
			//log(sf_xw_sig[1]);
			if (local_xw_sig != sf_xw_sig[1]) {
				MWURL.replace(/([a-fA-F0-9]+)/,local_xw_sig);
				sf_xw_sig[1] = local_xw_sig;
				log(timestamp()+'Updated sig key. This should help avoid the temp-key loop.');
			}
			// if(m=/local_xw_sig = '([a-fA-F0-9]+)'/.exec(s)) {
				// if (m[1] != sf_xw_sig[1]) {
					// MWURL.replace(/([a-fA-F0-9]+)/,m[1]);
					// sf_xw_sig[1] = m[1];
					// log(timestamp()+'Updated sig key. This should help avoid the temp-key loop.');				
				// }			
			// }
			// chop off the Facebook stuff from the beginning, from Vern's DoJobs http://vern.com/mwtools/
			//if (/mainDiv/.test(s)) { s=s.substr(s.indexOf("mainDiv")); }
			
			//add code for parsing of targetname and tmp variables from the loaded text
			if (/{"user_fields"/.test(s)) {
				if (m=/user_health":(\d+)/.exec(s)) {
					cur_health = m[1];
					document.getElementById('user_health').innerHTML=cur_health;
				}
				if (m=/user_energy":(\d+)/.exec(s)) {
					cur_en = m[1];
					document.getElementById('user_energy').innerHTML=cur_en;
				}
				if (m=/user_stamina":(\d+)/.exec(s)) { 
					cur_stam = m[1];
					document.getElementById('user_stamina').innerHTML=cur_stam;
				}
				if (m=/user_experience":(\d+)/.exec(s)) {
					expnow=m[1];
					document.getElementById('user_experience').innerHTML=expnow;
				}
				if (m=/exp_for_next_level":(\d+)/.exec(s)) {
					expnext=m[1];
					document.getElementById('exp_for_next_level').innerHTML=expnext;
					expneed=parseInt(expnext) - parseInt(expnow);
					ratiolvl=eval(expneed/cur_en);
					ratiolvl2=eval(expneed/cur_stam);
					(Math.abs(ratiolvl)<10)?(d=2):(d=0);
					(Math.abs(ratiolvl2)<10)?(d2=2):(d2=0);
					if(ratiolvl=='Infinity') { ratiolvl=0; d=0; }
					if(ratiolvl2=='Infinity') { ratiolvl2=0; d2=0; }
					document.getElementById('user_stats').getElementsByClassName('stat_title')[0].innerHTML='Exp Need: <span class="energy_highlight">'+expneed+'</span><br> (<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">) &nbsp; (<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">)';
				}				
			}
			else {
				if (m=/user_cash[^>]*>([^<]*)</m.exec(s)) {
					uc=document.getElementById('user_cash_nyc');
					if(uc) uc.innerHTML=m[1];
					uc=document.getElementById('user_cash_cuba');
					if(uc) uc.innerHTML=m[1];
					uc=document.getElementById('user_cash_moscow');
					if(uc) uc.innerHTML=m[1];
					uc=document.getElementById('user_cash_bangkok');
					if(uc) uc.innerHTML=m[1];
				}
				if (m=/user_health[^>]*>([^<]*)</.exec(s)) {
					cur_health = m[1];
					document.getElementById('user_health').innerHTML=cur_health;
				}
				if (m=/user_max_health[^>]*>([^<]*)</.exec(s)) {
					max_health = m[1];
					document.getElementById('user_max_health').innerHTML=max_health;
				}
				if (m=/user_energy[^>]*>([^<]*)</m.exec(s)) {
					cur_en = m[1];
					document.getElementById('user_energy').innerHTML=cur_en;
				}
				if (m=/user_stamina[^>]*>([^<]*)</m.exec(s)) { 
					cur_stam = m[1];
					document.getElementById('user_stamina').innerHTML=cur_stam;
				}
				if (m=/user_experience[^>]*>([^<]*)</m.exec(s)) {
					expnow=m[1];
					document.getElementById('user_experience').innerHTML=expnow;
				}
				if (m=/exp_for_next_level[^>]*>([^<]*)</m.exec(s)) {
					expnext=m[1];
					document.getElementById('exp_for_next_level').innerHTML=expnext;
					expneed=parseInt(expnext) - parseInt(expnow);
					ratiolvl=eval(expneed/cur_en);
					ratiolvl2=eval(expneed/cur_stam);
					(Math.abs(ratiolvl)<10)?(d=2):(d=0);
					(Math.abs(ratiolvl2)<10)?(d2=2):(d2=0);
					if(ratiolvl=='Infinity') { ratiolvl=0; d=0; }
					if(ratiolvl2=='Infinity') { ratiolvl2=0; d2=0; }
					document.getElementById('user_stats').getElementsByClassName('stat_title')[0].innerHTML='Exp Need: <span class="energy_highlight">'+expneed+'</span><br> (<span class="energy_highlight">'+(ratiolvl).toFixed(d)+'</span> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_energy_16x16_01.gif" width="12" height="12" title="Exp needed per Energy">) &nbsp; (<span class="energy_highlight">'+(ratiolvl2).toFixed(d2)+'</span> / <img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="12" height="12" title="Exp needed per Stamina">)';
				}
				if (m=/<div[^>]*level_bar[^>]* width:\s*([0-9%]*)/.exec(s)) { document.getElementById('level_bar').style.width=m[1]; }
			}
			if (m=/mw_city(\d+)/.exec(s)) { 
				if (m[1] == 1) {
					city = 'New York';
					xw_city=1;
				}
				if (m[1] == 2) {
					city = 'Cuba';
					xw_city=2;
				}
				if (m[1] == 3) {
					city = 'Moscow';
					xw_city=3;
				}
				if (m[1] == 4) {
					city = 'Bangkok';
					xw_city=4;
				}
			}
			
			if (/<div class="fight_results">/.test(s)) {
				attacks++;
				loot='';
				money='';
				pre='';
				crit=0;
				doublecash=0;
				jobmoney=0;
				stats='';
				rank='';
				//if (spe=/hospital.*?sf_xw_user_id=(\d+).*?sf_xw_sig=([a-f0-9]+)/.exec(s)) { healspecial = '&sf_xw_user_id='+spe[1]+'&sf_xw_sig='+spe[2]; }
				if (/Attack Again/.test(s)) { 
					pre += '<img src="http://mwfb.static.zynga.com/mwfb/graphics/icon_stamina_16x16_01.gif" width="16" height="16" title="Target alive"> '; 
					if (!alive) { pausecheck('Target is no longer iced, pausing...'); }
				}
				else { 
					if (alive) { pausecheck('Target below 20 health, pausing...'); }
				}
				if (d=/<div class="fightres_health">took (\d+) damage<\/div>/.exec(s)) { dtaken+=p(d[1]); }
				if (d=/<div class="fightres_damage">dealt (\d+) damage<\/div>/.exec(s)) { ddealt+=p(d[1]); }
				if (e=/<div class="fightres_experience (good|bad)">\s+\+(\d+)\s+(Experience|Exp)(<br>\+(\d+) Fan Bonus)?\s+<\/div>/.exec(s)) {
				//if (e=/<div class="fightres_experience (good|bad)">\s+\+(\d+)\s+(Experience|Exp)\s+<\/div>/.exec(s)) {
					var exp_attack = p(e[2]);
					var moneyclass = 'money';
					var boostimg = '<img style="width: 12px; height: 12px; display: inline;" src="http://mwfb.static.zynga.com/mwfb/graphics/icon_boost_14x14_01.gif">';
					if (e[5]) {
						var moneyclass = 'money';
						exp_attack += p(e[5]);
					}
					if(/rallied the troops.*?2x experience/.test(s)) { 
						exp_attack += exp_attack;
						moneyclass = 'good';
					}
					exp = 'Gained <span class="'+moneyclass+'">'+(e[5] ? boostimg : '')+exp_attack+' xp</span>';
					exp_gained += exp_attack;
				} 
				//if (c=/<div class="fightres_cash sexy_cash good">\+(\$([\d,]+))<\/div>/.exec(s)) {
				if (c=/<div class="fightres_cash sexy_cash good">\s+\+(\s+)?(\$([\d,]+))/.exec(s)) {
					jobmoney += p(c[3]);
					if (doublecash) { jobmoney += jobmoney; }
					ny_gained += jobmoney;
					money = ' and <span class="good">$'+commas(jobmoney)+'</span>'; 
				}
				//if (c=/<div class="fightres_cash sexy_cash good">\+C(\$([\d,]+))<\/div>/.exec(s)) {
				if (c=/<div class="fightres_cash sexy_cash good">\s+\+(\s+)?C(\$([\d,]+))/.exec(s)) {
					jobmoney += p(c[3]);
					if (doublecash) { jobmoney += jobmoney; }
					cuba_gained += jobmoney;
					money = ' and <span class="good">C$'+commas(jobmoney)+'</span>'; 
				}
				//if (c=/<div class="fightres_cash sexy_cash good">\+R(\$([\d,]+))<\/div>/.exec(s)) {
				if (c=/<div class="fightres_cash sexy_cash good">\s+\+(\s+)?R(\$([\d,]+))/.exec(s)) {
					jobmoney += p(c[3]);
					if (doublecash) { jobmoney += jobmoney; }
					moscow_gained += jobmoney;
					money = ' and <span class="good">R$'+commas(jobmoney)+'</span>'; 
				}
				//if (c=/<div class="fightres_cash sexy_cash good">\+B(\$([\d,]+))<\/div>/.exec(s)) {
				if (c=/<div class="fightres_cash sexy_cash good">\s+\+(\s+)?B(\$([\d,]+))/.exec(s)) {
					jobmoney += p(c[3]);
					if (doublecash) { jobmoney += jobmoney; }
					bangkok_gained += jobmoney;
					money = ' and <span class="good">B$'+commas(jobmoney)+'</span>'; 
				}
				if (c=/<div class="fightres_cash sexy_cash bad">\s+-(\s+)?(\$([\d,]+))/.exec(s)) {
					jobmoney += p(c[3]);
					ny_gained -= jobmoney;
					money = ' and <span class="bad">$'+commas(jobmoney)+'</span>'; 
				}
				if (c=/<div class="fightres_cash sexy_cash bad">\s+-(\s+)?C(\$([\d,]+))/.exec(s)) {
					jobmoney += p(c[3]);
					cuba_gained -= jobmoney;
					money = ' and <span class="bad">C$'+commas(jobmoney)+'</span>'; 
				}
				if (c=/<div class="fightres_cash sexy_cash bad">\s+-(\s+)?R(\$([\d,]+))/.exec(s)) {
					jobmoney += p(c[3]);
					moscow_gained -= jobmoney;
					money = ' and <span class="bad">R$'+commas(jobmoney)+'</span>'; 
				}
				if (c=/<div class="fightres_cash sexy_cash bad">\s+-(\s+)?B(\$([\d,]+))/.exec(s)) {
					jobmoney += p(c[3]);
					bangkok_gained -= jobmoney;
					money = ' and <span class="bad">B$'+commas(jobmoney)+'</span>'; 
				}
				if (gained=/found (some|an|a) (.+?) while fighting/.exec(s)) {
				    if (!loot) {
						loot = '. Loot: ';
					}
					//s.match(/found (some|an|a) (.+?) while fighting/g).each(function(i) {
						//loot += i.match(/found (some|an|a) (.+?) while/)[2].replace('{ITEM}','')+', ';
						//add_loot(i.match(/found (some|an|a) (.+?) while/)[2].replace('{ITEM}',''));
					//});
					loot += gained[2]+', ';
					add_loot(gained[2]);
					loot=loot.slice(0,loot.length-2);
				}
				if (gained=/You earned (some|an|a) (.+?)\./.exec(s)) {
				    if (!loot) {
						loot = '. Loot: ';
					}
					loot += gained[2]+', ';
					add_loot(gained[2]);
					loot=loot.slice(0,loot.length-2);
				}
				// if (m=/found the location of a secret stash.*?<script.*?>(.*?)<\/script>/.exec(s)) {
					// run=0;
					// log('<script type="text/javascript">'+m[1]+'</script><a href="#" onclick="popFightLootFeed(); return false;" id="fight_loot_feed_btn">Secret Stash</a>');
					// pauseevent='Found secret stash...pausing.';
				// }
				if (labor=/You have found (\d+) of (\d+) items/.exec(s)) {
					loot += ' ('+labor[1]+' of '+labor[2]+')';
				}
				if(set=/You have found all 8 items in the/.exec(s)) {
					if (!setcomp) {
						//loot += ' '+set[1].replace('Mafia Wars: ','')+' completed!';
						loot += '. Set completed!';
					}
					setcomp = true;
				}
				if (rankup=/\+(\d+) (Triad|Yakuza)/.exec(s)) {
					ranks[rankup[2]]+=parseInt(rankup[1]);
				}
				if (rankdn=/\-(\d+) (Triad|Yakuza)/.exec(s)) {
					ranks[rankdn[2]]-=parseInt(rankdn[1]);
				}
				if(yza=/Yakuza\s.*?\s.*?\s.*?faction_text">(\d+)/.exec(s)) {
					ranks['YakuzaRank']=parseInt(yza[1]);
				}
				if(tri=/Triad\s.*?\s.*?\s.*?faction_text">(\d+)/.exec(s)) {
					ranks['TriadRank']=parseInt(tri[1]);
				}
				//if (rankup || rankdn) { rank = ' Y: '+ranks['Yakuza']+' T:'+ranks['Triad']; }
				if (jobmoney == 0) { money=''; }
				if (sa=/<div class="fightres_group_attack (good|bad)">.+> ?([\d,]+)<\/div>/.exec(s));
				// opponent defense   if (sd=/<div class="fightres_group_defense">.+> ?([\d,]+)<\/div>/.exec(s));
				if (sd=/Mafia Defense Strength.+> ?([\d,]+)<\/div>/.exec(s));
				attacknow = p(sa[2]);
				defnow = p(sd[1]);
				if (attacks <= 1) { log(timestamp()+'Starting with: '+mafia_attack+commas(attacknow)+' '+mafia_defense+commas(defnow)); }
				if ((sa) && (sd)) { stats = '. '+mafia_attack+(attacknow>attackprev?'<span class="good">'+sa[2]+'</span>':sa[2])+' '+mafia_defense+' '+(defnow>defprev?'<span class="good">'+sd[1]+'</span>':sd[1]); }
				if (/fightres_title good/.test(s)) { log(timestamp()+pre+exp+money+stats+rank+loot); }
				if (/fightres_title bad/.test(s)) { lost++;	log(timestamp()+pre+'<span class="bad">Lost</span> fight '+money+stats); }
				attackprev = p(sa[2]);
				defprev = p(sd[1]);
				if (k=/You killed your opponent, bringing your total body count to (\d+)/.exec(s)) { log(timestamp()+kill+' You killed the opponent. Bodycount killed: '+k[1]); pausecheck('Killed the opponent <a href="http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=stats&xw_action=view&xw_city=1&user='+a+'">'+targetname+'</a>, pausing...'); }
				if (k=/just iced.*?bringing their total body count to (\d+) in Mafia Wars/.exec(s)) { log(timestamp()+kill+' You iced the opponent. Bodycount iced: '+k[1]); pausecheck('Iced the opponent <a href="http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=stats&xw_action=view&xw_city=1&user='+a+'">'+targetname+'</a>, pausing...'); }
				//if (k=/You iced your opponent, bringing your total body count to (\d+)/.exec(s)) { log(timestamp()+kill+' You iced the opponent. Bodycount iced: '+k[1]); pausecheck('Iced the opponent <a href="http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=stats&xw_action=view&xw_city=1&user='+a+'">'+targetname+'</a>, pausing...'); }
				if (/You took out/.test(s)) { log(timestamp()+kill+' You took out the opponent'); pausecheck('Killed the opponent <a href="http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=stats&xw_action=view&xw_city=1&user='+a+'">'+targetname+'</a>, pausing...'); }
				//if(m=/In recognition of your criminal contribution/.exec(s)){ 
				if(m=/In recognition of your criminal contribution.*been promoted to Level (\d+)!/.exec(s)){
					log(timestamp()+levelup+' Promoted to level '+m[1]); 
					pausecheck('Promoted to level '+m[1]+', pausing...');
				}
				if(expneed < 7) { pausecheck('Could gain level on next attack, pausing...'); }
				if (cur_health < hplow) { healing(); }
				else { attack_again(); }
			}
            else if ((tmpkey == "") && (m=/attack.*?tmp=([0-9a-f]*)/.exec(s))) {
				tmpkey=m[1];
				if(m=/opponent_id=([0-9]*)/.exec(s)) { a=m[1]; }
				// if(m=/sf_xw_user_id=(\d+).*?sf_xw_sig=([a-f0-9]+)/.exec(s)) {
					// special = '&sf_xw_user_id='+m[1]+'&sf_xw_sig='+m[2];
					// theaurl=getMWURL()+'xw_controller=fight&xw_action=attack&xw_city='+xw_city+'&tmp='+tmpkey+'&sf_xw_user_id='+m[1]+'&sf_xw_sig='+m[2]+'&opponent_id='+a;
					// msg('Retrieved new special-temp key, continuing attack... (<a href="'+theaurl+'">url</a>)');
				// }
				// else {
					theaurl=MWURL+'xw_controller=fight&xw_action=attack&xw_city='+xw_city+'&tmp='+tmpkey+'&opponent_id='+a;
					msg('Retrieved new temp key, continuing attack... (<a href="'+theaurl+'">url</a>)');
				//}
				once=false;
				tempattempts=0;
				//setTimeout(function(){ request('http://apps.facebook.com/inthemafia/remote/html_server.php?xw_controller=fight&xw_action=attack&xw_city='+xw_city+'&tmp='+tmpkey+'&opponent_id='+a+'&ajax=1'); },1000);
				setTimeout(function(){ request(theaurl+'&ajax=1&skip_req_frame=1'); },1000);
				return;
			}
            else if ((tmpkey == "") && (m=/query_params=([a-zA-Z0-9=]+).*?>Attack</.exec(s)) && (base64)) {
				// old regexp /query_params=([a-zA-Z0-9]+)(=+)?".*>Attack</
				// new regexp /query_params=([a-zA-Z0-9=]+).*?>Attack</
				attackstring=atob(m[1]);
				if(m=/opponent_id=([0-9]*)/.exec(attackstring)) { a=m[1]; }
				if(m=/tmp=([0-9a-f]*)/.exec(attackstring)) { tmpkey=m[1]; }
				if(m=/xw_exp_sig=([0-9a-f]*)/.exec(attackstring)) { xw_exp_sig=m[1]; }
				if(m=/xw_time=([0-9]*)/.exec(attackstring)) { xw_time=m[1]; }
				attackurl='xw_controller=fight&xw_exp_sig='+xw_exp_sig+'&xw_time='+xw_time+'&xw_action=attack&xw_city='+xw_city+'&tmp='+tmpkey+'&opponent_id='+a;
				msg('Retrieved new tmp key, continuing attack on '+targetname+'</a> in '+city+'... (<a href="http://apps.facebook.com/inthemafia/remote/html_server.php?query_params='+btoa(attackurl)+'">url base64</a>)');
				once=false;
				tempattempts=0;
				setTimeout(function(){ request('http://apps.facebook.com/inthemafia/remote/html_server.php?query_params='+btoa(attackurl)); },1000);
				return;
			}
			else if (/You will be able to fight again when your health reaches/.test(s)) { healing(); }
			else if (/Heal yourself at the/.test(s)) { healing(); }
			//else if (c=/The doctor healed <strong>(\d+) health<.strong> for ((B?C?R?)\$([\d,]+))/.exec(s)) {
			else if (c=/The doctor healed <strong>(\d+) health .*? for ((B?C?R?)\$([\d,]+))/.exec(s)) {
				if (c[3] == 'C') { cuba_gained -= parseInt(c[4].replace(/,/g, '')); }
				else if (c[3] == 'R') { moscow_gained -= parseInt(c[4].replace(/,/g, '')); }
				else if (c[3] == 'B') { bangkok_gained -= parseInt(c[4].replace(/,/g, '')); }
				else { ny_gained -= parseInt(c[4].replace(/,/g, '')); }
				log(timestamp()+healed+' Healed '+c[1]+' health at the '+city+' hospital for <span class="bad">'+c[2]+'</span>');
				if (city != fightcity) { 
					msg('Traveling back to '+fightcity);
					setTimeout(function(){ request(traveling(fightcity,xw_city)); },1000);
					//return;
				}
				else { 
					msg('The doctor did good, resuming attacks.');
					setTimeout(function(){ attack_again(); },500);
				}
			}
			else if (/You cannot heal so fast/.test(s)) { 
				pausing(10,'Cannot heal so fast, waiting ',healing);
				return;
				//msg('Cannot heal so fast, pausing for 10 seconds.');
				//setTimeout(function() { msg('Need healing, going to hospital.'); request(heal_url); },10000);
			}
			else if (/enough money to heal/.test(s)) { pauseevent='Not enough money to heal in '+city; run=0; }
			else if (cur_health < hplow) { healing(); }
			else if ((city == healcity) && (cur_health < hplow)) { healing(); }
			else if ((city == fightcity) && (cur_stam > 0)) { 
				if (once) {
					if (tempattempts > 2) {
						msg('Stuck in a temp-key loop, stopping. You should reload Mafia Wars and try again.');
						return;						
					}
					else {
						tmpkey="";
						log(timestamp()+'Temp-key needs to be updated, loading target profile page... (<a href="'+targetprofile+'&skip_req_frame=1">url</a>)');
						tempattempts++;
						setTimeout(function(){ request(targetprofile+'&ajax=1&skip_req_frame=1'); },500);
						return;
					}
				}
				msg('Back in '+fightcity+' and ready to attack again.');
				once=true;
				setTimeout(function(){ attack_again(); },500);
				return;
			}
			else if (cur_stam == 0) {
				pauseevent='Wait for more stamina, then rerun the bookmarklet.';
				run=0;
				msg('Wait for more stamina, then rerun the bookmarklet.');
				document.getElementById("pause").style.display = 'none';
				document.getElementById("play").style.display = 'inline';
				//pause(); 			
			}
			else if (/You need more stamina to fight/.test(s)) {
				pauseevent='Wait for more stamina, then rerun the bookmarklet.';
				run=0;
				msg('Wait for more stamina, then rerun the bookmarklet.');
				document.getElementById("pause").style.display = 'none';
				document.getElementById("play").style.display = 'inline';
				//pause(); 
			}
			else if (/You do not have enough stamina to keep fighting/.test(s)) {
				pauseevent='Wait for more stamina, then rerun the bookmarklet.';
				run=0;
				msg('Wait for more stamina, then rerun the bookmarklet.');
				document.getElementById("pause").style.display = 'none';
				document.getElementById("play").style.display = 'inline';
				//pause();
			}
			else if (/The request you submitted did not validate/.test(s)) {
				pauseevent='The request you submitted did not validate. Temp-key was invalid. Stopping.';
				run=0;
				msg('The request you submitted did not validate. Temp-key was invalid. Stopping.');
				document.getElementById("pause").style.display = 'none';
				document.getElementById("play").style.display = 'inline';
				//pause();
			}			
			else if (/but there has been a minor issue while processing/.test(s)) {
				//pausing(30,'Minor issue with loading the page (<a href="'+last_url+'">url</a>), waiting ',request(last_url));
				msg('Minor issue with loading the page, waiting 30 seconds... (<a href="'+last_url+'">url</a>)');
				setTimeout(function(){ request(last_url); },30000);
				return;
			}
			else if (/Your request was not processed because/.test(s)) {
				//pausing(30,'Reloading too fast (<a href="'+last_url+'">url</a>), waiting ',request(last_url));
				msg('Reloading too fast, waiting 30 seconds... (<a href="'+last_url+'">url</a>)');
				setTimeout(function(){ request(last_url); },30000);
				return;
			}
			else if (/Error while loading page from/.test(s)) {
				//pausing(30,'Kinks error: Mafia Wars overloaded (<a href="'+last_url+'">url</a>), waiting ',request(last_url));
				msg('Kinks error: Mafia Wars overloaded, waiting 30 seconds... (<a href="'+last_url+'">url</a>)');
				setTimeout(function(){ request(last_url); },30000);
				return;
			}
			else if (/<h2 class="main_message">500<\/h2>/.test(s)) {
				//pausing(30,'Error 500: Mafia Wars overloaded (<a href="'+last_url+'">url</a>), waiting ',request(last_url));
				msg('Error 500: Mafia Wars overloaded, waiting 30 seconds... (<a href="'+last_url+'">url</a>)');
				setTimeout(function(){ request(last_url); },30000);
				return;
			}
			else if (/Your session has timed out/.test(s)) {
				msg('Session has expired, you need to reload the game and start over.');
				log(timestamp()+'<span class="bad">Session has expired.</span>');
				document.getElementById("pause").style.display = 'none';
				document.getElementById("play").style.display = 'none';				
				return;
			}
			else if (/top.location.*?=.*?"http:\/\/apps.facebook.com\/inthemafia\/(.*?)"/.test(s)) {
				msg('Session has expired, you need to reload the game and start over.');
				log(timestamp()+'<span class="bad">Session has expired.</span>');
				document.getElementById("pause").style.display = 'none';
				document.getElementById("play").style.display = 'none';	
				return;
			}
			else if (/top.location.*?=.*?"http.*?facebook.com\/login.php.*?api_key=([a-zA-z0-9]+)/.test(s)) {
				msg('Session has expired, you need to reload the game and start over.');
				log(timestamp()+'<span class="bad">Session has expired.</span>');
				document.getElementById("pause").style.display = 'none';
				document.getElementById("play").style.display = 'none';				
				return;
			}
			else {
				retry('Unknown response while trying to load page. (<a href="'+last_url+'">url</a>)');
				return;
			}
			retries = 0;
		}
		else {
			retry('Problem while trying to load page. (<a href="'+last_url+'">url</a>)');
			return;
		}
	}
}
xmlHTTP = get_xmlHTTP();
if (!xmlHTTP) {
  alert('Your browser does not support XMLHTTP.');
  return;
}
if(/Attack Again/.test(document.getElementById('inner_page').innerHTML)) { alive=true; }
else { alive=false; }
if (document.getElementById('user_health').innerHTML < hplow) { msg('Need healing, going to hospital.'); healing(); }
else { attack_again(); }

//testing to add analytics
function loadContent(file){
	var head = document.getElementsByTagName('head').item(0)
	var scriptTag = document.getElementById('loadScript');
	if(scriptTag) head.removeChild(scriptTag);
		script = document.createElement('script');
		script.src = file;
		script.type = 'text/javascript';
		script.id = 'loadScript';
		head.appendChild(script);
}
loadContent('http://www.google-analytics.com/ga.js');
try {
var pageTracker = _gat._getTracker("UA-8435065-3");
pageTracker._trackPageview();
pageTracker._trackPageview("/script/attackXbeta"); 
} catch(err) {}
//end analytics

} //end try
catch(mainerr) {
	var spock_div=document.getElementById('spockdiv');
	if(spock_div) {
		spock_div.innerHTML='';
	}
	alert('Some error occurred, bookmarklet not loaded.\nDid you run it on a fight result page or profile page?\n\nIf you did, report message BELOW THE LINE to Spockholm:\n-----------------------------------------------------------\nBrowser: '+navigator.userAgent+'\nBookmarklet: '+version+'\nError: '+mainerr);
}

}())