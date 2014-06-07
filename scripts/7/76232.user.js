// ==UserScript==
// @name           Ikariam Rolling DBlocks
// @namespace      userscripts.org
// @author         Release
// @version        1.5b
// @history        1.5b Added function block roll down when mouse over it.
// @history        1.5b DO NOT INSTALL THIS VERSION IF YOU DO NOT NEED THIS FEATURE!!!
// @history        1.5b WAIT FOR THE NEXT VERSION, WHERE THIS FEATURE WILL BE OPTIONAL.
// @history        1.4b Added function to check updates.
// @history        1.3b Changed method identification dynamic blocks.
// @history        1.3b Added function of identification the last time used version of the script
// @history        1.3b (to apply the changes related with script data storage).
// @history        1.2 Fixed small visual bug.
// @history        1.1b Changed script name for better identify the functions of this scrpit.
// @history        1.1b Added separating store states for various servers (domains).
// @history        1.1b Fixed include adress for more compatibility.
// @history        1.0b Initial version.
// @description    Minimize or restore dynamic blocks in leftsided panel as BuildingUpgrade, UnitConstructionList,
// @description    CityInformation and other.
// @include        http://s*.ikariam.*/*
// @require        http://userscripts.org/scripts/source/57756.user.js
// ==/UserScript==

//------------------------------------Fixed ScriptUpdater.getLatestVersion function--------------------------------
//--------------------------------------(original contains bug and does not work)----------------------------------
ScriptUpdater.getLatestVersion = function(scriptId, callback)
{
	if(typeof(callback) != 'function')
		alert("ScriptUpdater error:\n\n scriptUpdater.getLatestVersion() requires a callback function as the second argument"); // already the second argument
	ScriptUpdater.initVars(scriptId,'', callback, false, false, false); // where version parameter is original?
	ScriptUpdater.checkRemoteScript();
}
//------------------------------------Fixed ScriptUpdater.getLatestVersion function--------------------------------

var ScriptName = 'Ikariam Rolling DBlocks';
var ScriptID = 76232;
var version = '1.5b';
var date = new Date();
var expires = '';
var StateIRDBlocks;
var dynamics;
// var MouseOver = false; // for next version

function getCookie(name)
{
        var prefix = name + '='
        var cookieStartIndex = document.cookie.indexOf(prefix)
        if (cookieStartIndex == -1)
                return null
        var cookieEndIndex = document.cookie.indexOf(';', cookieStartIndex + prefix.length)
        if (cookieEndIndex == -1)
                cookieEndIndex = document.cookie.length
        return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex))
}

function setCookie(name, value, expires)
{
		var path = '';
		var domain = document.domain;
		var secure = '';
        var curCookie = name + '=' + escape(value) +
                ((expires) ? '; expires=' + expires : '') +
                ((path) ? '; path=' + path : '') +
                ((domain) ? '; domain=' + domain : '') +
                ((secure) ? '; secure' : '');
                document.cookie = curCookie;
}

function ParseVersion(ver)
{
	switch(ver)
	{
		case version:
			break;
		default:
			for(var i = 0; i < dynamics.length; i++)
			{
				if(dynamics[i].id != 'ictContainer')
				{
					var lamp = document.createElement('img');
					lamp.src = 'skin/layout/bulb-on.gif';
					lamp.style.position = 'absolute';
					lamp.style.top = '6px';
					lamp.style.left = '6px';
					lamp.style.height = '16px';
					lamp.title = 'New version "' + ScriptName + '" avalable! Click here for update.';
					lamp.className = 'lamp';
					lamp.addEventListener('click',function(){ScriptUpdater.forceNotice(ScriptID,version)},false);
					dynamics[i].getElementsByClassName('header')[0].appendChild(lamp);
					return;
				}
			}
			break;
	}
}

function MouseOverHeader(DBlock)
{
	var bodyBlock = DBlock.getElementsByClassName('content')[0];
	if(bodyBlock.style.display == 'none')
	{
		bodyBlock.style.display = '';
	}
}

function MouseOutHeader(DBlock)
{
	var IdDBlock = DBlock.id;
	if(StateIRDBlocks.indexOf(IdDBlock) != -1)
	{
		var bodyBlock = DBlock.getElementsByClassName('content')[0];
		bodyBlock.style.display = 'none';
	}
}

function Init()
{
	date.setTime(date.getTime()+(365*24*60*60*1000)); // set date approximately for a year forwards
	expires = date.toUTCString();
	switch(getCookie('VerIRDBlocks'))
	{
		case null: // no previous version of the script or the version before 1.3b
			setCookie('VerIRDBlocks',version,expires);
			var oldCookie  = getCookie('HSDinamics');
			if(oldCookie != null)
			{
				setCookie('StateIRDBlocks',oldCookie,expires);
				setCookie('HSDinamics','','');
			}
			else
			{
				setCookie('StateIRDBlocks','',expires);
			}
			break;
		case '1.3b':
		case '1.4b':
			setCookie('VerIRDBlocks',version,expires);
			break;
		case version:
			break;
		default: // unknown version, may be crashed at least data version cookie
			alert('Unknown last used script version!\r\n\r\n' +
					'There may remain some earlier saved data of script which aren\'t processed any more.\r\n'+
					'Used script data will be cleared.');
			setCookie('VerIRDBlocks',version,expires);
			setCookie('StateIRDBlocks','',expires);
			break;
	}

	StateIRDBlocks = getCookie('StateIRDBlocks');
	if(StateIRDBlocks == null)
	{
		setCookie('StateIRDBlocks','',expires);
		StateIRDBlocks = '';
	}
	GM_addStyle('.sheader:hover {cursor:pointer;}');
	GM_addStyle('.lamp:hover {cursor:pointer;}');
	ScriptUpdater.getLatestVersion(ScriptID, ParseVersion);
}

function Processing()
{
	dynamics = document.getElementsByClassName('dynamic');
	for(var i = 0; i < dynamics.length; i++)
	{
		if(dynamics[i].id != 'ictContainer')
		{
			var headers = dynamics[i].getElementsByClassName('header');
			for(var j = 0; j < headers.length; j++)
			{
				dynamics[i].addEventListener('mouseover',function(){MouseOverHeader(this)},false);
				dynamics[i].addEventListener('mouseout',function(){MouseOutHeader(this)},false);
				var span = document.createElement('span');
				span.className = 'sheader';
				span.addEventListener('click',
					function(){
						var contentNode = this.parentNode.parentNode.getElementsByClassName('content')[0];
						var idNode = this.parentNode.parentNode.id;
						if(StateIRDBlocks.indexOf(idNode) != -1)
						{
							contentNode.style.display = '';
							this.getElementsByTagName('p')[0].textContent = '\u25b2 ';
							StateIRDBlocks = StateIRDBlocks.replace(idNode,'');
							setCookie('StateIRDBlocks',StateIRDBlocks,expires);
						}
						else
						{
							// contentNode.style.display = 'none';
							this.getElementsByTagName('p')[0].textContent = '\u25bc ';
							StateIRDBlocks = StateIRDBlocks + idNode;
							setCookie('StateIRDBlocks',StateIRDBlocks,expires);
						}},
					false);
				headers[j].appendChild(span);
				var sign = document.createElement('p');
				sign.style.display = 'inline';
				sign.textContent = '\u25b2 ';
				headers[j].lastChild.appendChild(sign);
				for(var c = 0; c < headers[j].childNodes.lenght; c++);
				{
					if(headers[j].childNodes[c].nodeName == '#text')
					{
						if(headers[j].parentNode.id == '')
						{
							headers[j].parentNode.id = headers[j].childNodes[c].nodeValue;
						}
						var idNode = headers[j].parentNode.id;
						if(StateIRDBlocks.indexOf(idNode) + 1)
						{
							headers[j].parentNode.getElementsByClassName('content')[0].style.display = 'none';
							headers[j].getElementsByClassName('sheader')[0].lastChild.textContent = '\u25bc ';
						}
						headers[j].getElementsByClassName('sheader')[0].appendChild(headers[j].childNodes[c]);
					}
				}
			}
		}
	}
}

Init();
Processing();