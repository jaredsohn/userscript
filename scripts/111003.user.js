// ==UserScript==
// @name           POF Plus
// @namespace      POF Plus
// @include        http://www.pof.com/viewprofile.aspx?*
// @include        http://www.pof.com/member*.htm
// @include        http://www.plentyoffish.com/viewprofile.aspx?*
// @include        http://www.plentyoffish.com/member*.htm
// @include        http://www.pof.com/
// @include        http://www.plentyoffish.com/
// @include        http://www.pof.com/start.aspx*
// @include        http://www.plentyoffish.com/start.aspx*
// @include        http://www.plentyoffish.com/inbox.aspx*
// @include        http://www.pof.com/inbox.aspx*
// @require http://www.aussieelectronics.com/gm_config.js
// ==/UserScript==

GM_config.init('POF Plus Options',
{
	'homeaddress':
	{
		'label': 'Address to use on Google Maps to find user',
		'type': 'text',
		'default': ''
	},
	'username':
	{
		'label': 'Username for auto-login',
		'type': 'text',
		'default': ''
	},
	'password':
	{
		'label': 'Password for auto-login',
		'type': 'text',
		'default': ''
	}
});

GM_registerMenuCommand('POF Plus Options', opengmcf);

var ishomepage = false;
if(location.href.indexOf("/viewprofile.aspx") == -1 && location.href.indexOf("/member") == -1 && location.href.indexOf("/inbox.aspx") == -1){
	ishomepage = true;
}
var isinbox = false;
if(location.href.indexOf("/inbox.aspx") != -1){
	isinbox = true;
}
var id = '';
var sid = '';
var username = '';
var sender_id = '';
var messaged = [];
var meetme = [];
getmessaged();
getmeetme();

function opengmcf(){
	GM_config.open();
}

function savemessaged(uname){
	if(messaged.indexOf(uname) == -1){
		messaged.push(uname);
		GM_setValue("messaged", JSON.stringify(messaged));
	}
}

function getmessaged(){
	if(GM_getValue("messaged") != undefined){
		messaged = JSON.parse(GM_getValue("messaged"));
	}
}

function savemeetme(id){
	if(meetme.indexOf(id) == -1){
		meetme.push(id);
		GM_setValue("meetme", JSON.stringify(meetme));
	}
}

function getmeetme(){
	if(GM_getValue("meetme") != undefined){
		meetme = JSON.parse(GM_getValue("meetme"));
	}
}

function updatemessaged(){
	var inboxrow = document.getElementsByClassName('inbox-row');
	for(var i = 0; i<inboxrow.length; i++) {
		if(inboxrow[i].getElementsByTagName("a")[1].outerHTML.indexOf('profileview_textlink') != -1){
			if(inboxrow[i].getElementsByTagName("a")[1].innerHTML != ""){
				savemessaged(inboxrow[i].getElementsByTagName("a")[1].innerHTML);
			}
		}
	}
}

if(isinbox){
	updatemessaged();
}

function gettitledata(els){
	for (var i = 0; i < els.length; i++) {
		if(els[i].innerHTML){
			return els[i].innerHTML.replace(/\t/g,'').replace(/\n/g,'');
		}
	}
}

function setid(newid, els){
	for (var i = 0; i < els.length; i++) {
		if(els[i].innerHTML){
			els[i].id = newid;
		}
	}
}

function gettitles(){
	var tlist = {};
	var titles = document.getElementsByClassName('profileheadtitle');
	for (var i = 0; i < titles.length; i++) {
		if(titles[i].childNodes && titles[i].nextSibling.nextSibling.childNodes){
			var titlename = gettitledata(titles[i].childNodes);
			var titledata = gettitledata(titles[i].nextSibling.nextSibling.childNodes);
			if(titlename != undefined && titledata == undefined){
				titles[i].nextSibling.nextSibling.id = titlename;
			}
			else if(titlename && titledata){
				setid(titlename, titles[i].nextSibling.nextSibling.childNodes);
			}
		}
	}
}

function ajaxsubmit(url)
{
GM_xmlhttpRequest({
  method: "GET",
  url: url,
  onload: function(response) {
	if (response.readyState==4){
		if (response.status==200){
			goparse(response.responseText, url);
		}
		else{
			alert("An error has occured making the request");
		}
	}
  }
});
}

function goparse(text, url){
	var divspan = document.createElement('div');
	divspan.id = 'divspan';
	divspan.className = 'user-details-wide';
	var headspan = document.createElement('div');
	headspan.className = 'profileheadtitle headline txtBlue size15';
	headspan.innerHTML = 'Messaging Status';
	var newspan = document.createElement('div');
	newspan.className = 'profileheadcontent';
	var spacespan = document.createElement('div');
	spacespan.className = 'txtGrey size15';
	if(text.indexOf('Sorry, there are no messages') != -1){
		if(messaged.indexOf(username) == -1){
			spacespan.innerHTML = 'You have not messaged this user.';
		}
		else{
			spacespan.innerHTML = 'You have messaged this user long ago. Click <a href=' + url + '>here</a> to view the messages.';
		}
	}
	else{
		spacespan.innerHTML = 'You have messaged this user. Click <a href=' + url + '>here</a> to view the messages.';
	}
	divspan.appendChild(headspan);
	newspan.appendChild(spacespan);
	divspan.appendChild(newspan);
	document.getElementById('user-details-wrapper').appendChild(divspan);
}

function fbajax(fburl)
{
GM_xmlhttpRequest({
  method: "GET",
  url: fburl,
  onload: function(response) {
	if (response.readyState==4){
		var divspan2 = document.createElement('div');
		divspan2.id = 'divspan2';
		divspan2.className = 'user-details-narrow';
		var headspan2 = document.createElement('div');
		headspan2.className = 'profileheadtitle headline txtBlue size15';
		headspan2.innerHTML = 'Facebook';
		var newspan2 = document.createElement('div');
		newspan2.className = 'profileheadcontent-narrow';
		var spacespan2 = document.createElement('div');
		spacespan2.className = 'txtGrey size15';
		if (response.status==404){
			spacespan2.innerHTML = 'Not associated with their POF username.';
		}
		else{
			spacespan2.innerHTML = 'This user may have Facebook. Click <a href=' + fburl + '>here</a> to check.';
		}
		divspan2.appendChild(headspan2);
		newspan2.appendChild(spacespan2);
		divspan2.appendChild(newspan2);
		document.getElementById('user-details-wrapper').appendChild(divspan2);
	}
  }
});
}

function autologin(){
	var userlogin = GM_config.get('username');
	var userpass = GM_config.get('password');
	if(ishomepage || isinbox){
		document.getElementById('username').value = userlogin;
		document.getElementById('password').value = userpass;
	}
	else{
		var logindiv = document.createElement('div');
		logindiv.id = 'logindiv';
		logindiv.innerHTML = "<form action='http://www.pof.com/processLogin.aspx' method='post' id='frmLogin' name='frmLogin'><input name='username' value='" + userlogin + "' type='text'><input name='password' value='" + userpass + "' type='password'><input name='tfset' value='-660' type='hidden'><input name='login' value='Check+Mail%21' type='hidden'><input name='callback' value='" + escape(location.href) + "' type='hidden'><input name='errorcallback' value='" + escape(location.href) + "' type='hidden'><input name='login' id='login' class='button norm-blue submit' value='Login' type='submit'></form>";
		document.getElementById('image-bar').appendChild(logindiv);
	}
	document.getElementById('login').click();
}

function checklogin(){
	if(GM_config.get('username') != '' && GM_config.get('password') != ''){
		if(ishomepage || isinbox){
			if(document.getElementById('frmLogin').innerHTML){
				autologin();
			}
		}
		else{
			if(document.getElementsByClassName('topbar')[0].childNodes[5].innerHTML.toString().indexOf('Sign In') != -1){
				autologin();
			}
		}
	}
}

function insertmeetme(override = false){
	if(meetme.indexOf(id) == -1){
		var newtd = document.createElement('div');
		newtd.className = 'username-bar headline txtBlue size28';
		newtd.id = 'newtd';

		var meetdiv = document.createElement('div');
		meetdiv.id = 'meetdiv';
		meetdiv.innerHTML = "<div id='title-headline'><center><span class='username-bar headline txtBlue size28'>Meet " + username + "?</span></center></div><div class='row2'><center><form action='meetme.aspx' method='post' id='form1' name='form1' target='meetres'><input name='add_id' value='" + id + "' type='hidden'><input name='p_Id' value='" + id + "' type='hidden'><input src='image/yes.png' name='votea' value='1' type='image'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input src='image/maybe.png' name='voteb' value='2' type='image' onclick=\"document.getElementById('meetdiv').parentNode.removeChild(document.getElementById('meetdiv'));\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input src='image/no.png' name='votec' value='3' type='image' onclick=\"document.getElementById('meetdiv').parentNode.removeChild(document.getElementById('meetdiv'));\"></form><iframe name='meetres' width='0' height='0'></iframe></center></div></center>";

		newtd.appendChild(meetdiv);
		document.getElementById('user-details-wrapper').previousSibling.previousSibling.appendChild(newtd);
		document.getElementsByName('votea')[0].addEventListener("click", removeit, true);
	}
	else if(override){
		document.getElementById('meetdiv').innerHTML = "<div id='title-headline'><center><span class='username-bar headline txtBlue size28'>Meet " + username + "?</span></center></div><div class='row2'><center><form action='meetme.aspx' method='post' id='form1' name='form1' target='meetres'><input name='add_id' value='" + id + "' type='hidden'><input name='p_Id' value='" + id + "' type='hidden'><input src='image/yes.png' name='votea' value='1' type='image'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input src='image/maybe.png' name='voteb' value='2' type='image' onclick=\"document.getElementById('meetdiv').parentNode.removeChild(document.getElementById('meetdiv'));\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input src='image/no.png' name='votec' value='3' type='image' onclick=\"document.getElementById('meetdiv').parentNode.removeChild(document.getElementById('meetdiv'));\"></form><iframe name='meetres' width='0' height='0'></iframe></center></div></center>";
		document.getElementsByName('votea')[0].addEventListener("click", removeit, true);
	}
	else{
		var newtd = document.createElement('div');
		newtd.className = 'username-bar headline txtBlue size28';
		newtd.id = 'newtd';

		var meetdiv = document.createElement('div');
		meetdiv.id = 'meetdiv';
		meetdiv.innerHTML = "<div id='title-headline'><center><span class='username-bar headline txtBlue size28'>You have already sent this person a Meet Me request.</span></center></div><div id='title-headline'><center><span class='username-bar headline txtBlue size28'>Send another?<input src='image/yes.png' name='votea' value='1' type='image'></span></center></div>";

		newtd.appendChild(meetdiv);
		document.getElementById('user-details-wrapper').previousSibling.previousSibling.appendChild(newtd);
		document.getElementsByName('votea')[0].addEventListener("click", meetmeoverride, true);
	}
}

function meetmeoverride(){
	insertmeetme(true);
}

function getaddress(){
	var togoogle = document.getElementById('City').innerHTML;
	togoogle = togoogle.replace(/\t/g, ' ').replace(/      /g, ' ').replace(/     /g, '').substring(2);
	var newdiv = document.createElement('div');
	newdiv.id = 'newdiv';
	newdiv.style.visibility = 'hidden';
	newdiv.style.position = 'absolute';
	newdiv.align = 'center';
	newdiv.innerHTML = "<iframe width='640' height='480' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='http://maps.google.com.au/maps?q=from%20" + GM_config.get('homeaddress') + "%20to%20" + togoogle + "&hl=en&z=9&vpsrc=0&output=embed'></iframe>";
	document.getElementById('main-menu-wrapper').appendChild(newdiv);
	document.getElementById('City').innerHTML = togoogle + " - <a href=\"javascript:if(document.getElementById('newdiv').style.visibility=='visible'){void(document.getElementById('newdiv').style.visibility='hidden');} else {void(document.getElementById('newdiv').style.visibility='visible');}\">Show Google Maps</a><div id='map_canvas' style='width:100%; height:100%'></div>";
	document.body.addEventListener("click", function(){document.getElementById('newdiv').style.visibility='hidden'}, true);
}

function removeit(){
	savemeetme(id);
	setTimeout('document.getElementById(\'meetdiv\').parentNode.removeChild(document.getElementById(\'meetdiv\'))', 1000);
}

checklogin();

if(!ishomepage && !isinbox){
var els = document.getElementsByTagName('input');
for (var i = els.length - 1; i>=0; --i){
	if(els[i].name == 'p_id'){
		id = els[i].value;
	}
	else if(els[i].name == 'profile_idb'){
		id = els[i].value;
	}
	else if(els[i].name == 'autologinid'){
		sid = els[i].value;
	}
	else if(els[i].name == 'usersendto'){
		sender_id = els[i].value;
	}
	else if(els[i].name == 'usersendtob'){
		sender_id = els[i].value;
	}
	else if(els[i].name == 'puser_id'){
		sender_id = els[i].value;
	}
	else if(els[i].name == 'sendto'){
		username = els[i].value;
	}
}
var url = 'http://www.pof.com/viewallmessages.aspx?SID=' + sid + '&sender_id=' + sender_id;
var fburl = 'http://www.facebook.com/' + username;

var script = document.createElement('script');
script.appendChild(document.createTextNode(removeit));
(document.body || document.head || document.documentElement).appendChild(script);

gettitles();

if(GM_config.get('homeaddress') == ''){
	opengmcf();
	GM_config.onClose = getaddress;
}
else{
	getaddress();
}

ajaxsubmit(url);
fbajax(fburl);
insertmeetme();
}