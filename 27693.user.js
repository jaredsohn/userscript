// ==UserScript==
// @name                UrbanDead Accurate AP Info
// @namespace           http://chillidonut.com/
// @description         Displays precise time to next AP, and time to 50AP.
// @version             1.0
// @include             http://*urbandead.com/map.cgi*
// ==/UserScript==

/* Some code borrowed from Ben2's script "UD Event Saver" (for the server time function) 
 *
 * v1.0: updated to use localStorage, works with firefox and chrome
 * v0.6: first release
 *
 * KNOWN BUGS:
 *  - If you're on 49AP, wait 30+ minutes without reloading the page, then do an 
 *		action, the script won't know of the new recharge time. There's no way 
 *		around this except to parse the action log for action-y sounding events,
 *		and it's not worth including EVERY action text in the script just for this.
 */

// cut-down version of:
if (typeof GM_setValue == 'undefined') {
	GM_getValue = function(name, defaultValue) {
		var value = localStorage.getItem(name);
		return (value? value: defaultValue);
	}

	GM_setValue = function(name, value) {
		localStorage.setItem(name, value);
	}
}

function serverTime() 
{
	var gDate = new Date();
	var gMaltonTime = window.document.lastModified;

	gDate.setDate(parseInt(gMaltonTime.substring(0,2)));
	gDate.setMonth(parseInt(gMaltonTime.substring(3,5)));
	gDate.setFullYear(parseInt(gMaltonTime.substring(6,10)));
	gDate.setHours(parseInt(gMaltonTime.substring(11,13)));
	gDate.setMinutes(parseInt(gMaltonTime.substring(14,16)));
	gDate.setSeconds(parseInt(gMaltonTime.substring(17)));

	//var gMilliSecs = Math.floor( gDate.getTime() / 1000) * 1000;
	gDate.setTime(Math.floor( gDate.getTime() / 1000) * 1000);
	return gDate;
}

function getInfoBox()
{
	var paras = document.getElementsByTagName('P');
	
	for (var i = 0; i < paras.length; ++i)
		if (paras[i].className == 'gt' && paras[i].firstChild.nodeType == 3 && paras[i].firstChild.nodeValue == 'You are ')
			return paras[i];
	
	return null;
}

function parseForValue(re)
{
	var matches;
	
	if (re.test(document.body.innerHTML))
	{
		matches = re.exec(document.body.innerHTML);
		
		return parseInt(matches[1]);
	}
	
	return null;
}

function APInfo() 
{
	var ap = parseForValue(/You have <b>([0-9]+)<\/b> Action Points? remaining/);
	var uid = parseForValue(/a href=\"profile\.cgi\?mode\=edit\&amp;id=([0-9]+)\" class\=\"y\"\>Settings/);
	if (ap == null || uid == null)	return;
	
	var recharge = GM_getValue(uid + '_rechargetime', null);
	var infobox = getInfoBox();
	var cTime = serverTime();
//	infobox.innerHTML += '<div style="font-size: 8pt;">serverTime: '+ cTime.toGMTString() +'</div>';
	
	if (ap == 50)
	{
		if (!recharge)
		{
			infobox.innerHTML += '<div style="font-size: 8pt;">Use 1AP to activate script</div>';
			GM_setValue(uid + '_rechargetime', 'fullap');
			return;
		}
		else {
			infobox.innerHTML += '<div style="font-size: 10pt;">You are at full AP.</div>';
			GM_setValue(uid + '_rechargetime', 'fullap');
			return;
		}
	} 
	else {
		if (!recharge) 
		{
			infobox.innerHTML += '<div style="font-size: 8pt;">Need to hit 50AP to activate.</div>';
			return;
		} 
		else if (recharge == 'fullap') { // we just used it!
			recharge = cTime.getMinutes() +'.'+ cTime.getSeconds();
			GM_setValue(uid + '_rechargetime', recharge);
		}
	}
	var rTime = new Date(cTime.getTime());
	
	recharge = recharge.split('.',2);
	rTime.setMinutes(recharge[0]);
	rTime.setSeconds(recharge[1]);
	while (rTime.getTime() <= cTime.getTime() - (cTime.getTime() % 6000))
	{
		rTime.setMinutes(rTime.getMinutes() + 30);
	}
	while (rTime.getTime() <= cTime.getTime())
	{
		rTime.setMinutes(rTime.getMinutes() + 1);
	}
	
//	infobox.innerHTML += '<div style="font-size: 8pt;">nextAP: '+ rTime.toGMTString() +'</div>';
	
	var dTime = new Date(rTime.getTime() - cTime.getTime());
	var timeLeft;
	if (dTime.getTime() < 7000)
	{
		timeLeft = 'any second now';
	}
	else {
		timeLeft = /*dTime.getUTCHours() +'h '+*/ dTime.getUTCMinutes()  +'m '+ dTime.getUTCSeconds() +'s';
	}
	infobox.innerHTML += '<div style="font-size: 10pt;">Next AP in '+ timeLeft +'.</div>';
	
	dTime.setMinutes(dTime.getMinutes() + (49 - ap)*30);
	timeLeft = ((dTime.getUTCDate()-1) * 24 + dTime.getUTCHours()) +'h '+
		dTime.getUTCMinutes()  +'m '+ dTime.getUTCSeconds() +'s';
	infobox.innerHTML += '<div style="font-size: 10pt;">50AP: '+ timeLeft +'.</div>';
	
}

APInfo();