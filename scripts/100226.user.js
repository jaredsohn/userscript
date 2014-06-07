// ==UserScript==
// @include http://listen.grooveshark.com/#/*
// @include http://grooveshark.com/#/*
// @name Scrooby
// @namespace scrooby
// @author xadoc
// @version 0.32
// @description  Scrooby Scrobbles Grooveshark tracks to Last.fm
// ==/UserScript==

GM_log("scrooby started");
var BFather,TO1,TO2,TO3;
var creload=0;

function getAttributeLocation(attribute,element) //gets the array location of the name attribute of an element, returns -1 if not found
{ 
	if(element.attributes!==null){
		for(attribCounter=0;attribCounter<element.attributes.length;attribCounter++)
		{
			if(element.attributes[attribCounter].name==attribute)
				return attribCounter;
		}
	}

	return 0;// -1
}

document.addEventListener('click', function(event) {

	var et=event.target;

	/*
	GM_log("et.attributes.length:"+et.attributes.length);
	GM_log("valor na carruagem:"+et.attributes[getAttributeLocation("onclick",et)].value);
	GM_log("comboio:"+et.attributes[getAttributeLocation("onclick",et)].value.indexOf("scrobble"));
	GM_log('et.nodeName:'+et.nodeName);
	 */

	while(et.attributes!==null&&et.nodeName.toLowerCase()!="body"){
		//GM_log('passei o while');
		//if(et.attributes.length>0&&et.attributes[getAttributeLocation('onclick',et)].value.indexOf('playnav.playVideo')!=-1){
		if(et.attributes.length>0&&et.attributes[getAttributeLocation('onclick',et)].value.indexOf('btn_style1')!=-1){
			GM_log('entrei no if do comboio');
			//if(et.attributes.length>0&&et.attributes[getAttributeLocation('onclick',et)].value.indexOf('playnav.playVideo')!=-1){
			var olddiv = document.getElementById("us_scrobblebutton");
			GM_log('oldiv:'+olddiv);
			try{BFather.removeChild(olddiv);}catch(err){/*window.location.reload();*/}
			creload=0;
			window.clearTimeout(TO1);
			window.clearTimeout(TO2);//to change with xhr Abort method as soon as greasemonkey 0.8.5 will be delivered and widely adopted
			window.clearTimeout(TO3);
			TO3=window.setTimeout(us_addButton, 1000);
			GM_log('T03='+TO3+" window.setTimeout(us_addButton,1000)")
			break;
		}else{
			//GM_log('else do et=et.parentNode;');
			et=et.parentNode;
		}
	}
	// if you want to prevent the default click action
	// (such as following a link), use these two commands:
	//event.stopPropagation();
	//event.preventDefault();
}, true);
//end block postxanadus

document.onLoad = window.setTimeout(us_addButton, 1000);//us_addButton();


var loadgif = '<div class="us_loadgif"><img alt="loading" src="http://crosbow.peterpedia.org/lastfm/web_img/progress_active_opt.gif" /></div>';
if (!GM_getValue('us_boxpos')) {
	GM_setValue('us_boxpos',screen.availWidth/2-150+"-"+100);
}
if (!GM_getValue('us_color')) {
	GM_setValue('us_color','r');
}

if (GM_getValue('us_color') == 'r') {
	var icon = "data:image/gif;base64,R0lGODlhEAAQAKIAAPNHLdYzINJbTN2rp%2FHSztCBerIRC%2Ff39yH5BAAAAAAALAAAAAAQABAAAANQSAXczoW8Sau9LwShA9AC52nFYR6ccKLgMWxmMBxwoc2dWsy2YQSGmc93IAQIppdPOMT9SgOfKioLFIHWqK9kIhhUK%2BDwN%2F5pyui0eq1dNxMAOw%3D%3D";
}
else {
	var icon = "data:image/gif;base64,R0lGODlhEAAQAKIAACUlJVVVVT4%2BPvLy8pubm1RUVHFxccnJySH5BAAAAAAALAAAAAAQABAAAANQeBbczua8Sau9T4iiRdAF52nGYA5ccaLgQGymQAywoc2dasw2AAiAmc83OAgOppdPOMT9SgSfKioTFIHWqK9kOgBUK%2BDwN%2F5pyui0eq1dNxMAOw%3D%3D";
}

//Add the Scrooble Button to Grooveshark
function us_addButton() {
	GM_log("us_addButton");
	GM_setValue('us_drag',false);
	var secs = GM_getValue('secs');

	if (secs!=0) {
		GM_log("player_duration secs:"+secs);
		//secs = player_duration;
		GM_log('clearTimout T03='+TO3);
		window.clearTimeout(TO3);
	}
	else{if(creload<30){creload++;TO3=window.setTimeout(us_addButton, 1000);return;}}//postxanadus

	/*
	try{
		GM_setValue('secs',secs);
	}catch(err){return;}
	 */

	//save time page was loaded aka playstart time in ctime and gay format
	var time = new Date();
	var t = Math.round(time.getTime()/1000);
	var m = time.getUTCMonth()+1;
	var d = time.getUTCDate();
	if (m.toString().length == 1) {
		m='0'+m;
	}
	if (d.toString().length == 1) {
		d='0'+d;
	}
	GM_setValue('playstart_s',t);
	GM_setValue('playstart',time.getUTCFullYear()+'%2d'+m+'%2d'+d+'%20'+time.getUTCHours()+'%3a'+time.getUTCMinutes()+'%3a'+time.getUTCSeconds());
	GM_log('playstart='+GM_getValue('playstart'));
	
	if (document.getElementById('us_scrobblebutton') == null){
		
	var el = document.createElement("style");
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(el);
	el.innerHTML = '.us_box { -moz-border-radius: 5px; -webkit-border-radius: 5px; border: 5px solid #333; background: #fff;'+
	// by AshKyd
	'z-index:1000000; position: absolute; left: 50%; top: 100px; width: 300px; margin-left: -150px; }'+
	'.us_box h3 { cursor: move; padding: 4px 8px 4px 10px; margin: 0px; border-bottom: 1px solid #AAA }'+
	'#us_box_close { background-image: url(data:image/gif;base64,R0lGODlhDQANALMPAKurq7S0tOzs7MrKytfX14qKir6%2BvqWlpf7%2B%2Fnt7e5OTk56enpmZmYWFhYCAgP%2F%2F%2FyH5BAEAAA8ALAAAAAANAA0AAARd8EkxTDBDSIlI%2BGBAIBIBAMeJnsQjnEugMEqwnNRxGF0xGroBYEEcCTrEG2OpKBwFhdlyoWgae9VYoRDojQDbgKBBDhTIAHJDE3C43%2B8Ax5Co2xO8jevQSDQOGhIRADs%3D); width: 13px; height: 13px; float: right; margin-top: 1px; }'+
	'#us_box_help { background-image: url(data:image/gif;base64,R0lGODlhDQANAKIAALKysomJisfHx%2F%2F%2F%2F5WWlujo6H5%2BfqOjoyH5BAAAAAAALAAAAAANAA0AAANCOFoi0EXJAqoFUbnDexUD1UWFx3QNkXJCRxBBkBLc%2B8ZMYNN37Os0wA8wEPowvySuaGg6nUQF4AmVLA4BQ%2BCQGSQAADs%3D); width: 13px; height: 13px; float: right; margin: 1px 3px 0 0; }'+
	'#us_loginbox_form { text-align: right; padding: 10px; }'+
	'.us_box input[type=text], input[type=password] { height: 15px; border: 1px solid #bbb; margin: 2px; padding: 3px 0 4px 0; width: 180px; }'+
	'.us_box input[type=submit] { margin: 0 0 0 5px; padding: 0 4px 3px 4px; -moz-border-radius: 2px; -webkit-border-radius: 2px; font-size: 11px; font-weight: bold; color: white; height: 17px; border: 1px solid #3e3e3e; background-image: url(data:image/gif;base64,R0lGODlhAQAQAKIAAH5%2BflRUVFxcXGNjY2tra3Nzc3p6eoKCgiH5BAAAAAAALAAAAAABABAAAAMKeAdmVYSMIUS4CQA7); }'+
	'.hidden { visibility: hidden; overflow: hidden; height: 0px; }'+
	'#us_hiddenform { margin: 0; }'+
	'.us_loadgif { text-align: center; padding: 10px 0; }'+
	'.us_loadgif img { -moz-border-radius: 5px; -webkit-border-radius: 5px; border:3px solid #91998E; }'+
	'#us_more { font: normal normal bold 12pt/12pt Arial; color: #999; text-decoration: none; margin-right: 3px; }'+
	'.us_submitbuttons { background-color: #EEE; border-top: 1px solid #AAA; padding: 5px; width: 290px; margin-left: -10px; margin-bottom: -10px; margin-top: 5px; }'+
	'.us_error { background-color: #F6D8D8; border: 1px solid #f28494; padding: 5px 3px 5px 3px; width: 90%; margin: 5px auto; }'+
	'.us_done { background-color: #CCFF99; border: 1px solid #99CC00; padding: 5px 3px 5px 3px; width: 90%; margin: 5px auto; }'+
	'.us_infobox { z-index:1000000; background-color: #EEE; -moz-border-radius: 5px; -webkit-border-radius: 5px; top: 5px; padding: 10px; position: fixed; left: 500px; border: 1px solid #666; font-size: 8pt; }'+
	'.us_infobox div { margin: 1px 5px 0 0; float: left; }'+
	'.us_box .us_center { padding: 10px; text-align: center; }'+
	'#us_submit { float: right; }'+
	'#us_scrobblebutton { cursor: pointer; }';

	BFather = document.getElementById('userOptions');
	GM_log("BFather:"+BFather);
	GM_log("tentar adicionar li");
	var button = createIdElement("li","us_scrobblebutton");//prexanadus
	var classatr = document.createAttribute("class");
	
	button.innerHTML = '<button class="btn btn_style1" name="scrobble"><span class="label">Scrobble</span></a>';//postxanadus
	BFather.appendChild(button);//postxanadus
	//document.getElementById('us_icon_small').addEventListener('click',function(e) { if (e.ctrlKey) { if (GM_getValue('us_color') == 'r') { GM_setValue('us_color','b'); } else { GM_setValue('us_color','r'); } this.src = us_icon(); }  },false);
	}
	
	GM_log("if secs:"+secs);
	if (secs > 30) {
		document.getElementById('us_scrobblebutton').addEventListener('click', us_showBox, false);
		us_handshake_old();
	}
	else {
		us_changeOpac(50,'us_scrobblebutton');
	}
}


function resetTime() {
	GM_log("resetTime");
	GM_setValue('us_drag',false);

	var secs = 0;
	var xpath = '//div[@id="player_times"]/span[@id="player_duration"]/text()';
	var us_videotitle = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var secs = timeToSeconds(us_videotitle.nodeValue);
	GM_log("player_duration secs:"+secs);

	if (secs!=0) {
		//secs = player_duration;
		GM_log('clearTimout T03:'+TO3);
		window.clearTimeout(TO3);
	}
	else{
		if(creload<30){
			creload++;
			TO3=window.setTimeout(us_addButton, 1000);
			GM_log('creload<30 T03='+T03);
			return;
		}
	}//postxanadus

	try{
		GM_setValue('secs',secs);
	}catch(err){return;}

	//save time page was loaded aka playstart time in ctime and gay format
	var time = new Date();
	var t = Math.round(time.getTime()/1000);
	var m = time.getUTCMonth()+1;
	var d = time.getUTCDate();
	if (m.toString().length == 1) {
		m='0'+m;
	}
	if (d.toString().length == 1) {
		d='0'+d;
	}
	GM_setValue('playstart_s',t);
	GM_setValue('playstart',time.getUTCFullYear()+'%2d'+m+'%2d'+d+'%20'+time.getUTCHours()+'%3a'+time.getUTCMinutes()+'%3a'+time.getUTCSeconds());

	/*
	var el = document.createElement("style");
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(el);
	el.innerHTML = '.us_box { -moz-border-radius: 5px; -webkit-border-radius: 5px; border: 5px solid #333; background: #fff;'+
	// by AshKyd
	'z-index:1000000; position: absolute; left: 50%; top: 100px; width: 300px; margin-left: -150px; }'+
	'.us_box h3 { cursor: move; padding: 4px 8px 4px 10px; margin: 0px; border-bottom: 1px solid #AAA }'+
	'#us_box_close { background-image: url(data:image/gif;base64,R0lGODlhDQANALMPAKurq7S0tOzs7MrKytfX14qKir6%2BvqWlpf7%2B%2Fnt7e5OTk56enpmZmYWFhYCAgP%2F%2F%2FyH5BAEAAA8ALAAAAAANAA0AAARd8EkxTDBDSIlI%2BGBAIBIBAMeJnsQjnEugMEqwnNRxGF0xGroBYEEcCTrEG2OpKBwFhdlyoWgae9VYoRDojQDbgKBBDhTIAHJDE3C43%2B8Ax5Co2xO8jevQSDQOGhIRADs%3D); width: 13px; height: 13px; float: right; margin-top: 1px; }'+
	'#us_box_help { background-image: url(data:image/gif;base64,R0lGODlhDQANAKIAALKysomJisfHx%2F%2F%2F%2F5WWlujo6H5%2BfqOjoyH5BAAAAAAALAAAAAANAA0AAANCOFoi0EXJAqoFUbnDexUD1UWFx3QNkXJCRxBBkBLc%2B8ZMYNN37Os0wA8wEPowvySuaGg6nUQF4AmVLA4BQ%2BCQGSQAADs%3D); width: 13px; height: 13px; float: right; margin: 1px 3px 0 0; }'+
	'#us_loginbox_form { text-align: right; padding: 10px; }'+
	'.us_box input[type=text], input[type=password] { height: 15px; border: 1px solid #bbb; margin: 2px; padding: 3px 0 4px 0; width: 180px; }'+
	'.us_box input[type=submit] { margin: 0 0 0 5px; padding: 0 4px 3px 4px; -moz-border-radius: 2px; -webkit-border-radius: 2px; font-size: 11px; font-weight: bold; color: white; height: 17px; border: 1px solid #3e3e3e; background-image: url(data:image/gif;base64,R0lGODlhAQAQAKIAAH5%2BflRUVFxcXGNjY2tra3Nzc3p6eoKCgiH5BAAAAAAALAAAAAABABAAAAMKeAdmVYSMIUS4CQA7); }'+
	'.hidden { visibility: hidden; overflow: hidden; height: 0px; }'+
	'#us_hiddenform { margin: 0; }'+
	'.us_loadgif { text-align: center; padding: 10px 0; }'+
	'.us_loadgif img { -moz-border-radius: 5px; -webkit-border-radius: 5px; border:3px solid #91998E; }'+
	'#us_more { font: normal normal bold 12pt/12pt Arial; color: #999; text-decoration: none; margin-right: 3px; }'+
	'.us_submitbuttons { background-color: #EEE; border-top: 1px solid #AAA; padding: 5px; width: 290px; margin-left: -10px; margin-bottom: -10px; margin-top: 5px; }'+
	'.us_error { background-color: #F6D8D8; border: 1px solid #f28494; padding: 5px 3px 5px 3px; width: 90%; margin: 5px auto; }'+
	'.us_done { background-color: #CCFF99; border: 1px solid #99CC00; padding: 5px 3px 5px 3px; width: 90%; margin: 5px auto; }'+
	'.us_infobox { z-index:1000000; background-color: #EEE; -moz-border-radius: 5px; -webkit-border-radius: 5px; top: 5px; padding: 10px; position: fixed; left: 5px; border: 1px solid #666; font-size: 8pt; }'+
	'.us_infobox div { margin: 1px 5px 0 0; float: left; }'+
	'.us_box .us_center { padding: 10px; text-align: center; }'+
	'#us_submit { float: right; }'+
	'#us_scrobblebutton { cursor: pointer; }';

	//var i = document.getElementById('masthead-nav-user');//prexanadus
	//BFather = (document.getElementById('masthead-nav-user'))?document.getElementById('masthead-nav-user'):document.getElementById('masthead-utility');//postxanadus
	BFather = document.getElementById('userOptions');
	GM_log("BFather:"+BFather);
	GM_log("tentar adicionar li");
	var button = createIdElement("li","us_scrobblebutton");//prexanadus
	//var button = createIdElement("div","us_scrobblebutton");//postxanadus
	var classatr = document.createAttribute("class");
	//classatr.nodeValue = 'malaquias';

	//button.innerHTML = '<img id="us_icon_small" style="margin: 0px -10px -3px 0px;" src="'+us_icon()+'" alt="audioscrobbler.com" /><a>Scrobble</a>';//prexanadus

	button.innerHTML = '<button class="btn btn_style1" name="scrobble"><img id="us_icon_small" src="'+us_icon()+'" alt="audioscrobbler.com" /><span class="label">Scrobble</span></a>';//postxanadus

	//i.insertBefore(button, document.getElementById("masthead-nav-user").firstChild);//prexanadus
	BFather.appendChild(button);//postxanadus
	document.getElementById('us_icon_small').addEventListener('click',function(e) { if (e.ctrlKey) { if (GM_getValue('us_color') == 'r') { GM_setValue('us_color','b'); } else { GM_setValue('us_color','r'); } this.src = us_icon(); }  },false);
	 */
	GM_log("if secs:"+secs);
	if (secs > 30) {
		GM_log("secs >30, secs valor:"+secs);
		document.getElementById('us_scrobblebutton').addEventListener('click', us_showBox, false);
		us_handshake_old();
	}
	else {
		GM_log("us_changeOpac us_scrobblebutton");
		us_changeOpac(50,'us_scrobblebutton');
	}
}

//Show dialog window
//Contains either login form, or scrobble form
function us_showBox() {
	GM_log("us_showBox called");
	if (!document.getElementById('us_loginbox')) {
		var loginbox = createIdElement("div","us_loginbox");
		var classatr = document.createAttribute("class");
		classatr.nodeValue = 'us_box';
		loginbox.setAttributeNode(classatr);
		loginbox.style.opacity = 0;
		loginbox.style.MozOpacity = 0;
		loginbox.style.KhtmlOpacity = 0;
		loginbox.style.filter = "alpha(opacity=0)";
		loginbox.style.left = GM_getValue('us_boxpos').split('-')[0];
		loginbox.style.top = GM_getValue('us_boxpos').split('-')[1];
		document.body.insertBefore(loginbox, document.body.firstChild);
		opacity(loginbox.id, 0, 100, 500);

	}
	else if (document.getElementById('us_loginbox').style.display == 'none') {
		var loginbox = document.getElementById('us_loginbox');
		GM_log("else if us_showBox");
		loginbox.style.display = "block";
		opacity(loginbox.id, 0, 100, 500);
	}
	if (!GM_getValue('user') || !GM_getValue('pass')) {

		var cont = '<div id="us_loginbox_form"><form name="us_loginform" onSubmit="return'+
		' false"><span class="label">Username: <input type="text" name="user" /></span><br />'+
		'<span class="label">Password: <input type="password" name="pass" /></span><br /><div class="us_submitbuttons"><input id="us_submit" value="Login" type="submit" /></div></form></div>';
		us_boxcontent('Login to last.fm',cont);
		document.getElementById('us_submit').addEventListener('click', us_setlogin, false);
	}
	else {
		GM_log("else us_showBox");
		us_scrobbleform();
	}
}

//little box to notify scrobble status
function us_infoBox(cont) {
	if (!document.getElementById('us_infobox')) {
		var inbox = createIdElement("div","us_infobox");
		var classatr = document.createAttribute("class");
		classatr.nodeValue = 'us_infobox';
		inbox.setAttributeNode(classatr);
		inbox.style.opacity = 0;
		inbox.style.MozOpacity = 0;
		inbox.style.KhtmlOpacity = 0;
		inbox.style.filter = "alpha(opacity=0)";
		document.body.insertBefore(inbox, document.body.firstChild);
		opacity(inbox.id, 0, 100, 500);
	}
	else if (document.getElementById('us_infobox').style.display == 'none') {
		var inbox = document.getElementById('us_infobox');
		inbox.style.display = "block";
		opacity(inbox.id, 0, 100, 500);
	}
	inbox.innerHTML = cont;
}


//Creates a <type id="id">
function createIdElement(type, id) {
	var el = document.createElement(type);
	var idatr = document.createAttribute("id");
	idatr.nodeValue = id;
	el.setAttributeNode(idatr);
	return el;
}

//Save the login info (password only hashed ofcourse :)
function us_setlogin() {
	var i = document.getElementsByName("us_loginform")[0].elements;
	i[0].style.background = "";
	i[1].style.background = "";
	var user = i[0].value;
	var pass = i[1].value;
	if (user && pass) {
		GM_setValue('user',user);
		GM_setValue('pass',MD5(pass));
		us_handshake_old(0);
	}
	else {
		if (!user) {i[0].style.background = "#F6D8D8";}
		if (!pass) {i[1].style.background = "#F6D8D8";}
	}
}

//closes the box with fadeout effect
function us_closebox() {
	opacity('us_loginbox', 100, 0, 500);
	window.setTimeout(function() { document.getElementById('us_loginbox').style.display = "none" }, 500);
}

//handshake with audioscrobbler servers protocol version 1.1
function us_handshake_old(qeued) {
	GM_log("handshake start user:"+GM_getValue('user'));
	var time = new Date();
	var t = Math.round(time.getTime()/1000);

	if (qeued == 0) { us_boxcontent('Logging in...',loadgif); }
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://post.audioscrobbler.com/?hs=true&p=1.1&c=xrm&v=1.0&u='+GM_getValue('user'), 
		headers: {
		'Host': 'post.audioscrobbler.com',
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
	},
	onload: function(responseDetails) {
		var loginbox = document.getElementById('us_loginbox');
		if (responseDetails.statusText == 'OK') {
			var res = responseDetails.responseText.split('\n');
			if (res[0] == 'UPTODATE') {
				GM_setValue('sid',res[1]);
				GM_setValue('suburl',res[2]);
				GM_setValue('interval',res[3].split(" ")[1]);
				if (qeued == 0) { us_scrobbleform(); }
			}
			else if (res[0] == 'BADUSER') {
				us_resetlogin('Username was not found.');
			}
			else {
				us_boxcontent('Error','<div class="us_error">'+responseDetails.responseText+'</div>');
			}
		}
		else {
			us_boxcontent('Error','<div class="us_error">'+responseDetails.responseText+'</div>');
		}
	}
	});
}

//scrobbles the track
function us_scrobble_old(artist,track,album,mbid,retry,queued) {
	GM_log('chamada us_scrobble_old(artist='+artist+',track='+track+',album='+album+',mbid='+mbid+',retry='+retry+',queued='+queued+')');
	var xpath = '//div[@id="player_times"]/span[@id="player_duration"]/text()';
	var us_videotitle = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var secs = timeToSeconds(us_videotitle.nodeValue);
	GM_setValue('secs',secs);

	var time = new Date();
	var t = Math.round(time.getTime()/1000); //now in ctime
	GM_log('now in ctime:'+t);
	var s = parseInt(secs);   //length of song
	GM_log('length of song:'+s);
	var songend = parseInt(GM_getValue('playstart_s'))+s; //end of the song in ctime
	var left = songend-t;                    //seconds left to play
	var n = t-parseInt(GM_getValue('playstart_s')); // seconds played
	GM_log('seconds played:'+n);
	GM_log('GM_getValue(secs))='+GM_getValue('secs'));

	GM_log("if "+(parseInt(GM_getValue('secs'))-left)+" < "+(s/2));

	if (parseInt(GM_getValue('secs'))-left < s/2) {
	//if (true){
	GM_log('antes do timeout');
	TO1=window.setTimeout(function() { us_scrobble_old(artist,track,album,mbid,0,1) }, (s/2-n+1)*1000);
	GM_log('depois do timeout');
	GM_log("TO1="+TO1);
	us_boxcontent('Queued...','<div class="us_done">This will be scrobbled in '+(s/2-n+1)+' seconds.</div>');
	GM_log('This will be scrobbled in '+(s/2-n+1)+' seconds.');
	window.setTimeout(function() { us_closebox() }, 2000);
	}
	else {
		if (queued != 1) {
			us_boxcontent('Scrobbling...',loadgif);
		}

	var md5resp = MD5(GM_getValue('pass')+GM_getValue('sid'));

	var poststring = 'u='+GM_getValue('user')+'&s='+md5resp+'&a[0]='+encodeURI(artist).replace(/&/,'%26')+'&t[0]='+encodeURI(track).replace(/&/,'%26')+'&b[0]='+encodeURI(album).replace(/&/,'%26')+'&m[0]='+mbid+'&l[0]='+GM_getValue('secs')+'&i[0]='+GM_getValue('playstart');
	GM_log('poststring:'+poststring);
	GM_xmlhttpRequest({
		method: 'POST',
		url: GM_getValue('suburl'),
		headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		'Accept': 'application/atom+xml,application/xml,text/xml',
		'Content-Length': poststring.length,
		'Content-Type': 'application/x-www-form-urlencoded'
	},
	data: poststring,
	onload: function(responseDetails) {
		var loginbox = document.getElementById('us_loginbox');
		if (responseDetails.statusText == 'OK' && responseDetails.responseText.split('\n')[0] == 'OK') {
			GM_setValue('interval',responseDetails.responseText.split('\n')[1].split(" ")[1]);
			
			window.clearTimeout(TO1);
			window.clearTimeout(TO2);//to change with xhr Abort method as soon as greasemonkey 0.8.5 will be delivered and widely adopted
			window.clearTimeout(TO3);
			
			if (queued != 1) {
				us_boxcontent('OK!','<div class="us_done">'+track+' by '+artist+' scrobbled.</div>');
				window.setTimeout(function() { us_closebox() }, 2000);
			}
			else {
				us_infoBox('<div>'+track+' by '+artist+' scrobbled. <img src="data:image/gif;base64,R0lGODlhEAAQAKIAAO7w7qrZnHXGZnC6WJLJhE%2BpODGCLbrfsyH5BAAAAAAALAAAAAAQABAAAANhCLrcHmKUEZw6g4YtT8PEERBEcBCFtwyh4L5nsQTD8cLCURCKducKkgxQgACBAIIgYFAUXQ3CYNkkjgS8YIZUpdlYyQxlt9jRxBla9WLIKVlq1eJgMI8KBnnUwDdkLYAMCQA7" alt="done" /></div>');
				window.setTimeout(function() { opacity('us_infobox', 100, 0, 500); }, 3000);
			}
		}
		else if (responseDetails.responseText.split('\n')[0] == 'BADAUTH') {
			if (retry != 1) {
				var bla_blubb_queue = 0;
				if (queued == 1) { bla_blubb_queue = 1; }
				us_handshake_old(bla_blubb_queue);
				TO2=window.setTimeout(function() { us_scrobble_old(artist,track,album,mbid,1,queued); }, 1000);
				GM_log('TO2='+TO2);
			}
			else {
				if (queued != 1) {
					us_resetlogin('wrong password.');
				}
				else {
					us_infoBox('<div class="us_error">Error: Authentification failed.<br />check password or try again later.</div>');
					window.setTimeout(function() { opacity('us_infobox', 100, 0, 500); }, 3000);
				}
			}
		}
		else {
			if (queued != 1) {
				us_boxcontent('Error','<div class="us_error">'+responseDetails.responseText+'</div>');
			}
			else {
				us_infoBox('<div class="us_error">Error: '+responseDetails.responseText+'</div>');
				window.setTimeout(function() { opacity('us_infobox', 100, 0, 500); }, 2000);
			}
		}
	}
	});
}
}

//get form data
//function us_scrobblenp(retry) {
function us_scrobblenp() {
	resetTime();
	GM_log("us_scrobblenp called");
	
	GM_log('xpath init');
	//var xpath = '//div[@id="playerDetails_nowPlaying"]/a[@class="song"]/@title';
	var xpath = './/*[@id="playerDetails_nowPlaying"]/a[1]/@title';
	var us_videotitle = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	GM_log('xpath evaluated');
	GM_log(us_videotitle);
	var track = us_videotitle.nodeValue;
	GM_log('track:'+track);
//	var musicdata = us_videotitle.nodeValue.substring(us_videotitle.nodeValue.indexOf('-')+1).split('-');
//	alert(musicdata);

	//var xpath = '//div[@id="playerDetails_nowPlaying"]/a[@class="artist"]/@title';
	var xpath = './/*[@id="playerDetails_nowPlaying"]/a[2]/@title';
	var us_videotitle = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var artist = us_videotitle.nodeValue;
	GM_log('artist:'+artist);

	//var xpath = '//div[@id="playerDetails_nowPlaying"]/a[@class="album"]/@title';
	var xpath = './/*[@id="playerDetails_nowPlaying"]/a[3]/@title';
	var us_videotitle = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var album = us_videotitle.nodeValue;
	GM_log("album:"+album);

	/*
    var artist = document.forms[0].elements[0].value;
    var track = document.forms[0].elements[1].value;
    var album = document.forms[0].elements[2].value;
    if (!album) { var album = ''; }
	 */
	//var mbid = document.forms[0].elements[3].value;
	if (!mbid) { var mbid = ''; }
	GM_log("us_scrobble_old("+artist+","+track+","+album+","+mbid+")");
	GM_log('GM_getValue(secs))='+GM_getValue('secs'));
	us_scrobble_old(artist,track,album,mbid);
}

//Unset the saved login info + show login form, and maybe show errors
function us_resetlogin(error) {
	GM_log("us_resetlogin");
	GM_setValue('user','');
	GM_setValue('pass','');
	var cont = '';
	if (error != '[object XPCNativeWrapper [object MouseEvent]]') { cont = '<p class="us_error">Error: '+error+'</p>'; }
	cont = cont+'<div id="us_loginbox_form"><form name="us_loginform" onSubmit="return'+
	' false"><span>Username: <input type="text" name="user" /></span><br />'+
	'<span>Password: <input type="password" name="pass" /></span><br /><div class="us_submitbuttons"><input id="us_submit" value="Login" type="submit" /></div></form></div>';
	us_boxcontent('Login to last.fm',cont);
	var i = document.getElementsByName("us_loginform")[0].elements;
	i[0].style.background = "#F6D8D8";
	i[1].style.background = "#F6D8D8";
	document.getElementById('us_submit').addEventListener('click', us_setlogin, false);
}
/*
//inserts the scrobbleform into the window
function us_scrobbleform() {
	GM_log("us_scrobbleform");

	//alert("window.yt.VIDEO_TITLE");//postxanadus
	//var loginbox = document.getElementById('us_loginbox');

	var xpath = '//div[@id="playerDetails_nowPlaying"]/a[@class="song"]/@title';
	var us_videotitle = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var track = us_videotitle.nodeValue;
	GM_log('track:'+track);
//	var musicdata = us_videotitle.nodeValue.substring(us_videotitle.nodeValue.indexOf('-')+1).split('-');
//	alert(musicdata);

	var xpath = '//div[@id="playerDetails_nowPlaying"]/a[@class="artist"]/@title';
	var us_videotitle = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var artist = us_videotitle.nodeValue;
	GM_log('artist:'+artist);
//	alert(us_videotitle)
//	var musicdata = us_videotitle.nodeValue.substring(us_videotitle.nodeValue.indexOf('-')+1).split('-');
//	alert(musicdata);

	var xpath = '//div[@id="playerDetails_nowPlaying"]/a[@class="album"]/@title';
	var us_videotitle = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var album = us_videotitle.nodeValue;
	GM_log("album:"+album);

	var cont = '<div id="us_loginbox_form"><form name="us_scrobbleform" onSubmit="return'+
	' false">Artist: <input type="text" name="artist" value="'+artist+'" /><br />' +
	'Track: <input type="text" name="track" value="'+track+'" /><br /><a href="#" id="us_more" title="more options">+</a>'+
	'<p id="us_hiddenform" class="hidden">Album: <input type="text" name="album" value="'+album+'" /><br /></p>'+
	'<div class="us_submitbuttons"><input id="us_submit" value="Scrobble" type="submit" />'+
	'<input type="submit" id="us_resetlogin" value="reset login" /></div></form></div>';
	us_boxcontent('Scrobble to last.fm - '+GM_getValue('user'),cont);

	document.getElementById('us_resetlogin').addEventListener('click', us_resetlogin, false);
	document.getElementById('us_submit').addEventListener('click', us_scrobblenp, false);
	document.getElementById('us_more').addEventListener('click', us_showmoreform, false);
}
 */

//shows the optional datafiels
function us_showmoreform() {
	var i1 = document.getElementById('us_hiddenform');
	var a = document.getElementById('us_more');

	if (i1.getAttribute('class')) {
		i1.setAttribute('class','');
		a.innerHTML = '&#8722;';
	}
	else {
		i1.setAttribute('class','hidden');
		a.innerHTML = '+';
	}
}

//fills the window with content and title
function us_boxcontent(title,content) {
	GM_log("us_boxcontent - fills the window with content and title");
	var loginbox = document.getElementById('us_loginbox');
	if (loginbox.style.display == 'none') {
		loginbox.style.display = "block";
		opacity(loginbox.id, 0, 100, 500);
	}
	var loginbox = document.getElementById('us_loginbox');
	if (!loginbox) { return false; }
	loginbox.innerHTML = '<h3 id="us_box_head">'+title+'<a href="#" id="us_box_close"></a><a href="#" id="us_box_help"></a></h3>'+
	'<div>'+content+'</div>';
	document.getElementById('us_box_close').addEventListener('click', us_closebox, false);
	document.getElementById('us_box_help').addEventListener('click', us_help, false);
	document.addEventListener('mousemove', us_movebox, false);
	document.getElementById('us_box_head').addEventListener('mousedown', us_moveboxd, false);
	document.getElementById('us_box_head').addEventListener('mouseup', us_moveboxu, false);
}

//show the help
function us_help() {
	var cont = '<p class="us_center">powered by:<br /><a href="http://www.audioscrobbler.net"><img src="http://crosbow.peterpedia.org/lastfm/web_img/badge_black_rev.gif" '+
	'alt="audioscrobbler.net" /></a><br /><br /><a href="http://www.last.fm"><img src="http://crosbow.peterpedia.org/lastfm/web_img/badge_red_rev.gif" '+
	'alt="last.fm" /></a><br /><br />CTRL+Click the little icon to switch its colour!<br />Visit <a href="http://userscripts.org/scripts/show/34012" title="userscripts page">this page</a> for the original script.</p><br />Visit <a href="http://userscripts.org/scripts/show/71606" title="userscripts page">this page</a> for some more information about this script.</p>';
	us_boxcontent('Help',cont);
}

function us_movebox(e) {
	e = (e) ? e : ((window.event) ? window.event : "");
	if (GM_getValue('us_drag')) {
		var el = document.getElementById('us_loginbox');
		el.style.left = (150+e.clientX-GM_getValue('us_drag').split('-')[0])+"px";
		el.style.top = e.clientY-GM_getValue('us_drag').split('-')[1]+"px";
	}
} 
function us_moveboxd(e) {
	var el = document.getElementById('us_loginbox');
	GM_setValue('us_drag',(e.clientX-el.offsetLeft)+"-"+(e.clientY-el.offsetTop));
} 
function us_moveboxu(e) {
	var el = document.getElementById('us_loginbox');
	GM_setValue('us_boxpos',el.style.left+"-"+el.style.top);
	GM_setValue('us_drag',false);
} 


function timeToSeconds(str){
	var arr = str.split(":");
	var i;
	if (arr.length == 1)
	{
		i= parseInt(arr[0]);
	}
	else if (arr.length == 2){
		//alert("arr1"+parseInt(arr[0]));
		i = parseInt(arr[0]) * 60 + parseInt(arr[1]);
	}
	else if (arr.length == 3){
		//alert("arr2"+parseInt(arr[1]));
		i = (parseInt(arr[0]) * 60 * 60) + (parseInt(arr[1]) * 60) + parseInt(arr[2]);
	}
	return i;
}

function getSong(){
	GM_log("getSong called");

	//var xpath = '//div[@id="playerDetails_nowPlaying"]/a[@class="song"]/@title';
	var us_videotitle = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var song = us_videotitle.nodeValue;
	GM_log('song:'+song);
//	var musicdata = us_videotitle.nodeValue.substring(us_videotitle.nodeValue.indexOf('-')+1).split('-');
//	alert(musicdata);

	var xpath = '//div[@id="playerDetails_nowPlaying"]/a[@class="artist"]/@title';
	var us_videotitle = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var artist = us_videotitle.nodeValue;
	GM_log('artist:'+artist);
//	alert(us_videotitle)
//	var musicdata = us_videotitle.nodeValue.substring(us_videotitle.nodeValue.indexOf('-')+1).split('-');
//	alert(musicdata);

	var xpath = '//div[@id="playerDetails_nowPlaying"]/a[@class="album"]/@title';
	var us_videotitle = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var album = us_videotitle.nodeValue;
	GM_log("album:"+album);

//	/html/body/div[@id='mainContainer']/div[@id='application']/div[@id='main']/div[@id='footer']/div[@id='player']/div[@id='player_times']/span[@id='player_duration']/text()
	var xpath = '//div[@id="player_times"]/span[@id="player_elapsed"]/text()';
	var us_videotitle = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var player_elapsed = us_videotitle.nodeValue;
	GM_log("player_elapsed:"+player_elapsed);
	var conv = timeToSeconds(player_elapsed);
	GM_log("player_elapsed convertido:"+conv);

	var xpath = '//div[@id="player_times"]/span[@id="player_duration"]/text()';
	var us_videotitle = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	var player_duration = us_videotitle.nodeValue;
	GM_log("player_duration:"+player_duration);
	var conv = timeToSeconds(player_duration);
	GM_log("player_duration convertido:"+conv);

}

//document.getElementById("playerDetails_nowPlaying"); 
//document.addEventListener("click", getSong, false);
//document.getElementById('playerDetails_nowPlaying').addEventListener('DOMNodeInserted', getSong, false); //FUNCIONA! Mas muitas vezes

try{
//	document.getElementById('playerDetails_nowPlaying').addEventListener('DOMAttrModified', us_scrobblenp, false);  //FUNCIONA! Mas 2 vezes
	document.getElementById('playerDetails_nowPlaying').addEventListener('DOMAttrModified', function() {
		GM_log('mudou o playerDetails_nowPlaying!!!');
		var value = "bar";
		setTimeout(function() {
			us_scrobblenp();
			GM_setValue("foo", value);
			//}, 0);
		}, 0);
	}, false);
}catch(err){
	GM_log("err:"+err);
	return;}


//window.addEventListener("load", start, false);

//document.getElementById('playerDetails_nowPlaying').addEventListener('DOMSubtreeModified', getSong, false); 

/*
var fireOnThis = document.getElementById('playerDetails_nowPlaying');
var evObj = document.createEvent('MutationEvents');
//initMutationEvent( 'type', bubbles, cancelable, relatedNode, prevValue, newValue, attrName, attrChange )
evObj.initMutationEvent('DOMAttrModified',true, true, document, null, null, 'qsid', 1);
fireOnThis.dispatchEvent(evObj);
 */

//document.getElementById('playerDetails').addEventListener('DOMCharacterDataModified', getSong, false);
//document.getElementById('playerDetails').addEventListener('DOMCharacterDataModified', function(){GM_log("four")}, false);
//document.getElementById('playerDetails').addEventListener('click', getSong, false);


/*
 *  Third party functions
 */

/**
 *
 *  MD5 (Message-Digest Algorithm)
 *  http://www.webtoolkit.info/
 *
 **/

var MD5 = function (string) {

	function RotateLeft(lValue, iShiftBits) {
		return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
	}

	function AddUnsigned(lX,lY) {
		var lX4,lY4,lX8,lY8,lResult;
		lX8 = (lX & 0x80000000);
		lY8 = (lY & 0x80000000);
		lX4 = (lX & 0x40000000);
		lY4 = (lY & 0x40000000);
		lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);
		if (lX4 & lY4) {
			return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
		}
		if (lX4 | lY4) {
			if (lResult & 0x40000000) {
				return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
			} else {
				return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
			}
		} else {
			return (lResult ^ lX8 ^ lY8);
		}
	}

	function F(x,y,z) { return (x & y) | ((~x) & z); }
	function G(x,y,z) { return (x & z) | (y & (~z)); }
	function H(x,y,z) { return (x ^ y ^ z); }
	function I(x,y,z) { return (y ^ (x | (~z))); }

	function FF(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function GG(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function HH(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function II(a,b,c,d,x,s,ac) {
		a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
		return AddUnsigned(RotateLeft(a, s), b);
	};

	function ConvertToWordArray(string) {
		var lWordCount;
		var lMessageLength = string.length;
		var lNumberOfWords_temp1=lMessageLength + 8;
		var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
		var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
		var lWordArray=Array(lNumberOfWords-1);
		var lBytePosition = 0;
		var lByteCount = 0;
		while ( lByteCount < lMessageLength ) {
			lWordCount = (lByteCount-(lByteCount % 4))/4;
			lBytePosition = (lByteCount % 4)*8;
			lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
			lByteCount++;
		}
		lWordCount = (lByteCount-(lByteCount % 4))/4;
		lBytePosition = (lByteCount % 4)*8;
		lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
		lWordArray[lNumberOfWords-2] = lMessageLength<<3;
		lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
		return lWordArray;
	};

	function WordToHex(lValue) {
		var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;
		for (lCount = 0;lCount<=3;lCount++) {
			lByte = (lValue>>>(lCount*8)) & 255;
			WordToHexValue_temp = "0" + lByte.toString(16);
			WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
		}
		return WordToHexValue;
	};

	function Utf8Encode(string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";

		for (var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);

			}

		}

		return utftext;
	};

	var x=Array();
	var k,AA,BB,CC,DD,a,b,c,d;
	var S11=7, S12=12, S13=17, S14=22;
	var S21=5, S22=9 , S23=14, S24=20;
	var S31=4, S32=11, S33=16, S34=23;
	var S41=6, S42=10, S43=15, S44=21;

	string = Utf8Encode(string);

	x = ConvertToWordArray(string);

	a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

	for (k=0;k<x.length;k+=16) {
		AA=a; BB=b; CC=c; DD=d;
		a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
		d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
		c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
		b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
		a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
		d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
		c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
		b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
		a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
		d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
		c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
		b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
		a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
		d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
		c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
		b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
		a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
		d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
		c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
		b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
		a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
		d=GG(d,a,b,c,x[k+10],S22,0x2441453);
		c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
		b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
		a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
		d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
		c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
		b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
		a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
		d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
		c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
		b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
		a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
		d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
		c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
		b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
		a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
		d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
		c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
		b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
		a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
		d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
		c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
		b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
		a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
		d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
		c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
		b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
		a=II(a,b,c,d,x[k+0], S41,0xF4292244);
		d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
		c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
		b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
		a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
		d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
		c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
		b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
		a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
		d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
		c=II(c,d,a,b,x[k+6], S43,0xA3014314);
		b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
		a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
		d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
		c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
		b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
		a=AddUnsigned(a,AA);
		b=AddUnsigned(b,BB);
		c=AddUnsigned(c,CC);
		d=AddUnsigned(d,DD);
	}

	var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);

	return temp.toLowerCase();
}

//change the opacity for different browsers
function us_changeOpac(opacity, id) {
	var object = document.getElementById(id).style;
	object.opacity = (opacity / 100);
	object.MozOpacity = (opacity / 100);
	object.KhtmlOpacity = (opacity / 100);
	object.filter = "alpha(opacity=" + opacity + ")";
}

function opacity(id, opacStart, opacEnd, millisec) {
	//speed for each frame
	var speed = Math.round(millisec / 100);
	var timer = 1;
	//determine the direction for the blending, if start and end are the same nothing happens
	if(opacStart > opacEnd) {
		for(var i = opacStart; i >= opacEnd; i--) {
			window.setTimeout(function(b) { return function() { us_changeOpac(b, id); } }(i),(timer * speed));
			timer++;
		}
	}
	else if(opacStart < opacEnd) {
		for(var i = opacStart; i <= opacEnd; i++) {
			window.setTimeout(function(b) { return function() { us_changeOpac(b, id); } }(i),speed*timer);
			timer++;
		}
	}
}


//http://www.somacon.com/p355.php


String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g,"");
}
String.prototype.ltrim = function() {
	return this.replace(/^\s+/,"");
}
String.prototype.rtrim = function() {
	return this.replace(/\s+$/,"");
}

//Thanx to Crosbow for original Code
