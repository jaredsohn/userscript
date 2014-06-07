// ==UserScript==
// @name           FB Auto login
// @namespace      AngusH_CA
// @description    Auto Login from cookie and goto CA page
// @include        http://facebook.com/*
// @include        http://*.facebook.com/*
// @include        https://facebook.com/*
// @include        https://*.facebook.com/*
// @version        0.9
// ==/UserScript==


///////////////////////////////////////////////////////////////////////////////////////////////////
// 
// Global Value/Function
//
///////////////////////////////////////////////////////////////////////////////////////////////////
if(!GM_log) 
{
	GM_log = console.debug;
}

function GetElement(id) {
	return document.getElementById(id);
}

var debug = false;
var username = "email";
var password = "pass";
var persistant = "persistent";
var form = "login_form";
var elemEmail = GetElement(username);
var elemPassword = GetElement(password);
var elemPersistent = GetElement(persistant);


//***************************************************************************************
//Cookie Function
//***************************************************************************************
function createCookie(name,value,days) {
	var date = new Date();
	date.setTime(date.getTime()+(days*24*60*60*1000));
	var expires = "; expires="+date.toGMTString();
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}

	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function saveCreds(){
	var userName = document.getElementById(username).value;
	createCookie(username, userName, 365);
	createCookie(password, document.getElementById(password).value, 365);
	GM_log("Save UserName [" + userName + "] and Password");
}


//***************************************************************************************

//At login page

//***************************************************************************************
function GotoLoginURL() {
	document.location.href = "http://www.facebook.com";
}

function GotoCAURL() {
	document.location.href = "http://apps.facebook.com/castle_age";
}

var pageBody = document.getElementsByTagName('body');
if ( pageBody[0] && pageBody[0].innerHTML.indexOf("errorTitle") >= 0 && 
	                  pageBody[0].innerHTML.indexOf("errorLongDesc") >= 0 ) 
{
	GM_log("Disconnect!!, Try again after 5 mins");
	window.setTimeout(GotoCAURL, 5*60*1000);
	return true;
}

if ( elemEmail && elemPassword && elemPersistent ) 
{
	document.getElementById(form).addEventListener("submit", saveCreds, false);

	GM_log("In FB login page");

	if( GetElement('error') || location.href.indexOf('https://login.facebook.com/login.php?login_attempt=') >= 0 ) {
		GM_log("Too busy to change account, wait more time");
		setTimeout( GotoLoginURL, 120000);
		return true;
	}

	if( location.href.indexOf('/login.php?login_attempt=')>=0) {
		GM_log("Found E-mail/Password error");
		return false;
	}

	if( location.href.indexOf('/login.php') >= 0 )
	{
		GM_log("No Login, try again :" + location.href);
		setTimeout( GotoLoginURL, 60000);
		return true;
	}	

	elemEmail.value = readCookie(username);
	elemPassword.value = readCookie(password);

	if ( elemEmail.value && elemPassword.value ) {
		elemPersistent.checked = true;
		setTimeout( function() {elemPassword.form.submit();}, 2000);
	} else {
		GM_log("No Login informaton");		
		return false;
	}

	return true;
}


//***************************************************************************************
//Maintain ?
//***************************************************************************************
/*
var maintain = document.getElementsByTagName('standard_explanation');
if ( maintain ) {
	GM_log("In maintain page");
	GM_log(pageBody[0].innerHTML);
}
*/
if( location.href.indexOf('https://login.facebook.com/login.php?login_attempt=') >= 0 )
{
		gm.log("In Attempt error ");
		setTimeout( GotoLoginURL, 5*60*1000);
		return true;	
}

//***************************************************************************************
//At Home page
//***************************************************************************************
if( location.href.indexOf("http://www.facebook.com/home.php") >= 0 )
{	
	GM_log("In FB home page");
	setTimeout( GotoCAURL, 5000 );
	return true;
}
