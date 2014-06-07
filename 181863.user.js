// ==UserScript==
// @name           YouTube_Better_Loopy
// @namespace      PI
// @description    Loop songs within time duration play all videos on a page(by //                 extra script)
// @include        http*://*.youtube.com/watch*v=*
// @include        http*://*.youtube.com/user/*
// @version        4.5.2.1
// @credit         CDM, and the supporter(s) of the original script 'Loopy for YouTube'; PhasmaExMachina for his Updater and Options Dialog
// @require		   http://userscripts.org/scripts/source/91400.user.js
// @notify         true
// ==/UserScript==


var version = '4.5.2.1';


var isChrome = (navigator.userAgent.toLowerCase().indexOf('chrome') >= 0);
var isFirefox = (navigator.userAgent.toLowerCase().indexOf('firefox') >= 0);
var debug = GM_GlobalGetValue('configDebug', false);
log = debug ? (isChrome ? function(message){console.log(message);} : (isFirefox ? GM_log : function(){}) ) : function() {}
var Config = null; //Script's config object. 


//Enums
var STATE_ENDED = 0;
var STATE_PLAY = 1;
var STATE_PAUSE = 2;
var STATE_SUSPEND = 3;
var STATE_EMPTIED = 4;

//Constants
var GM_SAVE_LOOP_STATE = "SavedLoopStateForSongs";
var RECHECK_PERIOD = 900;


//************************************************************************************************
//******** Utility methods. Don't change if you don't understand what you are doing***************
var GM_KEY_PREFIX = "GM_KEY_";
var MAX_DAYS = 5000;
function GM_GlobalSetValue(key, val)
{
	var gmFound = false;
	try
	{
		if(GM_setValue && isFirefox) // to increase the problems, Chrome defines the method and says "not supported".
		{
			GM_setValue(key, val);
			gmFound = true;
		}
	}
	catch(ex)
	{
		if(debug)
			alert(ex.toString());
	}
   
	if(!gmFound)
	{
		//work around using cookies.
		createCookie(GM_KEY_PREFIX + key, val, MAX_DAYS);
	}
}

function GM_GlobalGetValue(key, defaultValue)
{
	var returnValue = defaultValue;
	var gmFound = false;
	try
	{
		if(GM_getValue && isFirefox)
		{
			returnValue = GM_getValue(key, defaultValue);
			gmFound = true;
		}
	}
	catch(ex)
	{
		if(debug)
			alert(ex.toString());
	}
	if(!gmFound)
	{
		var cookieTry = readCookie(GM_KEY_PREFIX + key);
		if(cookieTry)
		{
			returnValue = cookieTry;
			if(returnValue == "false") //most probably, we wanted this. 
				returnValue = false;
			else if(returnValue == "true")
				returnValue = true;
		}
	}

	return returnValue;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
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

var APPEND_MODE_NONE = 0;
var APPEND_MODE_END = 1;
var APPEND_MODE_BEGINNING = 2;
function create(elementType, attributes, appendMode, parent)
{
	var newEl = document.createElement(elementType);
	for(i in attributes)
	{
		if(attributes[i][0] == 'innerHTML')
			newEl.innerHTML = attributes[i][1];
		else if(attributes[i][0] == 'click')
			newEl.addEventListener('click', attributes[i][1], false);
		else
			newEl.setAttribute(attributes[i][0], attributes[i][1]);
	}
	if(!appendMode || appendMode == APPEND_MODE_NONE)
		return newEl;
	if(appendMode == APPEND_MODE_END)
		parent.appendChild(newEl);
	else if(appendMode == APPEND_MODE_BEGINNING)
		parent.insertBefore(newEl, parent.firstChild);
	
	return newEl;
}

function $(identifier, altParent, returnAll)
{
	var obj = null, objs = null;
	doc = altParent ? altParent : document;
	if(identifier.indexOf(".") == 0)
	{
		identifier = identifier.replace(".","");
		objs = doc.getElementsByClassName(identifier);
	}
	else if(identifier.indexOf("<") == 0)
	{
		identifier = identifier.replace("<","").replace(">","");
		objs = doc.getElementsByTagName(identifier);
	}
	else
	{
		obj = doc.getElementById(identifier);
		if(!obj)
			objs = doc.getElementsByName(identifier);
	}
	if(objs && objs.length > 0)
	{
		if(returnAll)
			return objs;
		else
			return objs[0];
	}   
	else
		return obj;
}	

function getChildrenByXPath(currentNode, xpath, CallBack)
{
	var returnArray = new Array();	
	var nodesSnapshot = document.evaluate(xpath, currentNode, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null );

	for ( var i=0 ; i < nodesSnapshot.snapshotLength; i++ )
		returnArray.push(CallBack ? CallBack(nodesSnapshot.snapshotItem(i)) : nodesSnapshot.snapshotItem(i));

	return returnArray;
}

function findPosX(obj)
{
	var curleft = 0;
	if(obj.offsetParent)
		while(1) 
		{
			
		  curleft += obj.offsetLeft;
		  if(!obj.offsetParent)
			break;
		  obj = obj.offsetParent;
		}
	else if(obj.x)
		curleft += obj.x;
	return curleft;
}

function findPosY(obj)
{
	var curtop = 0;
	if(obj.offsetParent)
		while(1)
		{
		  curtop += obj.offsetTop;
		  if(!obj.offsetParent)
			break;
		  obj = obj.offsetParent;
		}
	else if(obj.y)
		curtop += obj.y;
	return curtop;
}

function clickObject(obj)
{
	if(!obj)
		return;
	var clickEvent = window.document.createEvent("MouseEvent");
	clickEvent.initEvent("click", true, false);
	obj.dispatchEvent(clickEvent);
}

function getMinuteSecondsTime(seconds)
{
	totalSeconds = Math.round(seconds);
	seconds = totalSeconds % 60;
	if(seconds < 10) seconds = "0" + seconds; 
	minutes = (totalSeconds - seconds)/60;
	return new String(minutes + ":" + seconds);
}

function setCookie(name, value) 
{
	document.cookie = name + "=" + escape(value);
}

function trim(str, chars) 
{
	return ltrim(rtrim(str, chars), chars);
}
 
function ltrim(str, chars) 
{
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}
 
function rtrim(str, chars) 
{
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}	

function getQuerystring(key, default_)
{
  if (default_==null) default_="";
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
	return default_;
  else
	return qs[1];
}
//************************************** End Utility Methods *************************************
//************************************************************************************************






//***************** Configuration Settings - Many thanks to PhasmaExMachina *********************************** // 
//***************** http://userscripts.org/scripts/show/62718 ************************************************* //
//***************** (There are some changes on top of his original script to suit my needs )******************* //
function CreateConfig()
{
	Config = {
		data:null,
		callback:null,
		tempOptions:{},
		footerHtml:'<span style="font-size:.9em;">Note: You may need to refresh the page to see changes.</span>',
		reloadOnSave:false,
		init:function(settings) {
			Config.settings = settings;
		},
		preloadData:function() {
			Config.data = {};
			Config.settings = typeof(Config.tabs) != 'undefined' ? Config.tabs : Config.settings; 
			for(var tabName in Config.settings) {
				if(typeof(Config.settings[tabName].fields) == "object") {
					var fields = Config.settings[tabName].fields
					for(var fieldName in fields) {
						Config.data[fieldName] = Config.get(fieldName);
						
					}
				}
			}
		},
		close:function(saved) {
			document.body.removeChild(Config.$('ConfigBodyWrapper'));
			document.body.removeChild(Config.$('ConfigMask'));
			window.removeEventListener('keyup', Config.keyUpHandler, true);
			if(typeof(Config.callback) == 'function')
				Config.callback(saved);
		},
		show:function(callback) {
			Config.tempOptions = {};
			Config.settings = typeof(Config.settings) != 'undefined' ? Config.settings : Config.tabs;
			Config.callback = typeof(callback) == 'function' ? callback : null;
			if(typeof(Config.styleDrawn) == 'undefined') {				// apply styling
				GM_addStyle("\
						#ConfigMask { position:absolute; width:100%; top:0; left:0; height:100%; background-color:#000; opacity:.7; z-index:9000; } \
						#ConfigBody * { border:none; font-size:12px; color:#333; font-weight:normal !important; margin:0 !important; padding:0 !important; background:none; text-decoration:none; font-family:Helvetica Neue,Arial,Helvetica,sans-serif; line-height:1.2em; } \
						#ConfigBody { width:400px; margin:auto !important; top:0px; right: 0px; position:fixed; text-align:left; background:#f9f9f9; border:1px outset #333; padding:0 !important; font-family:Arial; font-size:14px; border-radius:5px; -moz-border-radius:5px; cursor:default; z-index:9010; color:#333; padding-bottom:1em !important; } \
						#ConfigBody a { text-decoration:underline; color:#000099 !important; } \
						#ConfigBody strong, #ConfigContentBox strong { font-weight:bold !important; } \
						#ConfigBody h1 { font-size:13px; font-weight:bold !important; padding:.5em !important; border-bottom:1px solid #333; background-color:#999; margin-bottom:.75em !important; } \
						#ConfigBody h2 { font-weight:bold; margin:.5em 1em !important; } \
						#ConfigBody h1 { font-size:13px; font-weight:bold; color:#fff; text-decoration:none; } \
						#ConfigBody h1 a:hover { text-decoration:underline; } \
						#ConfigBody li { list-style-type:circle; } \
						#ConfigBody p { font-size:12px; font-weight:normal; margin-bottom:1em !important; } \
						#ConfigContentPadding { margin:0 1em !important; }\
						#ConfigTabs { margin-top:20px !important; }\
						#ConfigTabs span { border:1px solid #666; border-radius:5px 5px 0 0; -moz-border-radius:5px 5px 0 0; padding: 2px 10px !important; position:relative; top:-2px; background-color:#ddd; cursor:pointer; }\
						#ConfigTabs span:hover { background-color:#eee; }\
						#ConfigTabs span.active { background-color:#F9F9F9; top:-1px; border-bottom:none; padding-top:3px !important; font-weight:bold; cursor:inherit; }\
						#ConfigTabs span.active:hover { background-color:#F9F9F9; }\
						#ConfigContentBox { border:1px inset #666; padding:1.5em 1em 1em !important; max-height:300px; overflow:auto; }\
						#ConfigContentBox table { width:auto !important; }\
						#ConfigContentBox td { font-weight:normal; }\
						#ConfigContentBox input { border:1px inset #666 !important; }\
						#ConfigContentBox td.fieldLabel { text-align:left !important; padding-right:.5em !important;font-weight:bold !important; }\
						#ConfigContentBox td.subFieldLabel { text-align:left !important; padding-right:.5em !important; }\
						#ConfigContentBox td select { border:1px inset #666; }\
						#ConfigHistory { margin:0 1em 1em 1em !important; max-height:150px; overflow-y:auto; border:1px inset #999; padding:0 1em 1em !important; width:448px; } \
						#ConfigHistory ul { margin-left:2em !important; } \
						#ConfigClose { float:right; cursor:pointer; height:14px; opacity:.5; } \
						#ConfigClose:hover { opacity:.9; } \
						#ConfigFooter { padding:1.5em 1em 0 !important; } \
						#ConfigFooter input { border:1px outset #666; padding:3px 5px 5px 20px !important; background:no-repeat 4px center #eee; border-radius:3px; -moz-border-radius:3px; cursor:pointer; width:80px; float:right; margin-left:.5em !important; } \
						#ConfigFooter input:hover { background-color:#f9f9f9; } \
						#ConfigFooter select { border:1px inset #666; }\
						#ConfigContentBox #ConfigFieldTable { width:auto !important; margin-left:2em !important; }\
						#ConfigContentBox #ConfigFieldTable td { padding-bottom:.5em !important; }"
					);
				if(typeof(Config.css) != 'undefined')					// apply user specified styles if set
					GM_addStyle(Config.css);
				Config.styleDrawn = true;
			}
			// declare and apply config background mask
			var noticeBg = document.createElement('div');							
			noticeBg.id = "ConfigMask";
			noticeBg.style.height = (unsafeWindow.scrollMaxY + unsafeWindow.innerHeight) + 'px';
			document.body.appendChild(noticeBg);
			// declare and apply config window
			var noticeWrapper = document.createElement('div');
				noticeWrapper.setAttribute('style', 'position:absolute; width:100%; top:0; left:0; z-index:9010; max-width:auto; min-width:auto; max-height:auto; min-height:auto;');
				noticeWrapper.id = "ConfigBodyWrapper";
					var notice = document.createElement('div');
					notice.id = "ConfigBody";
					var html = '<h1>\
									<img src="' + Config.icons.config + '" align="absmiddle" style="margin-top:-2px;"/>\
									' + (typeof(Config.scriptName) == 'string' ? Config.scriptName + ' - ' : '') + ' Settings\
								</h1>\
								<div id="ConfigContentPadding">\
									<div id="ConfigTabs">';
					// draw tabls
					var i = 0;
					var firstTabId = "";
					for(var label in Config.settings) {
						var id = 'configTab' + label.replace(/\s/g, '_');
						html += '<span id="' + id + '">' + label + '</span>';
						firstTabId = i == 0 ? id : firstTabId;
						i++;
					}
					html += '</div><div id="ConfigContentBox">';			
					html += '</div>';			
					html += '</div>';			
					html += '<div id="ConfigFooter">\
								<input type="button" id="ConfigCancelButton" value="Cancel" style="background-image:url(' + Config.icons.close + ')"/>\
								<input type="button" id="ConfigCloseButton" value="Save" style="background-image:url(' + Config.icons.save + ')"/>\
								' + Config.footerHtml + '\
							</div>';
					notice.innerHTML = html;;
				noticeWrapper.appendChild(notice);
			document.body.appendChild(noticeWrapper);
			// add tab change listeners
			for(var label in Config.settings) {
				var id = 'configTab' + label.replace(/\s/g, '_');
				Config.$(id).addEventListener('click', function() { Config.activateTab(this.id); }, false);
			}
			// add escape key press and other listener
			Config.activateTab(firstTabId);
			window.addEventListener('keyup', Config.keyUpHandler, true);
			Config.$('ConfigCloseButton').addEventListener('click', function() {
				Config.save();
				Config.close(true);
				if(Config.reloadOnSave)
					document.location = '';
			}, true);
			Config.$('ConfigCancelButton').addEventListener('click', function() { Config.close(false) }, true);
			if(Config.onclick)
				Config.$('ConfigBody').addEventListener('click',Config.onclick, false);
		},
		//-------------------------------- "private" methods -----------------------------------------
		activateTab:function(id) {
			// deactivate current tab
			var elems = Config.$('ConfigTabs').getElementsByTagName('span');
			for(var i = 0; i < elems.length; i++) {
				elems[i].className = '';	
			}
			// set current tab
			Config.$(id).className = 'active';
			var key = id.replace(/^configTab/, '').replace(/_/g, ' ');
			var fields = Config.settings[key].fields;
			var html = typeof(Config.settings[key].html) == 'string' ? Config.settings[key].html : '';
			html += '<table cellpadding="0" cellspacing="0" border="0" id="ConfigFieldTable">';
			for(var fieldName in fields) {
				var field = fields[fieldName];
				var type = typeof(field.type) != 'string' ? 'html' : field.type;
				var tip = typeof(field.tip) == 'string' ? field.tip : '';
				var classUsed = (field.subfield == true) ? 'subFieldLabel' : 'fieldLabel';
				var disabledString = (field.disabled == true) ? ' disabled="disabled" ' : '';
				if(type != 'html')
					html += '<tr title="' + tip + '"><td colspan="' + (type == 'html' ? '2' : '1') + '" class="'+classUsed+'">' +
						(typeof(field.label) == 'string' ? field.label : '') + '</td><td>';
				else
					html += '<tr>';
				switch(type) {
					case 'select':
						html += '<select id="configInput_' + fieldName + '" '+ disabledString +'>';
						if(typeof(field.options) == 'undefined')
							alert('Options Error: ' + fieldName + ' of type "select" is missing the "options" property');
						else {
							for(var text in field.options) {
								var val = field.options[text];
								html += '<option value="' + val + '"' + (Config.get(fieldName) == val ? ' selected' : '') + '>' + text + ' &nbsp;</option>';
							}
						}
						html += '</select>';
						break;
					case 'password':
					case 'text':
						var width = typeof(fields[fieldName].width) != 'undefined' ? (fields[fieldName].width.toString().match(/px/) ? fields[fieldName].width : fields[fieldName].width + 'px') : false;
						var maxLengthString = typeof(field.maxLength) != 'string'? "" : ' maxLength = "' + field.maxLength + '" ';
						html += '<input '+ maxLengthString + 'id="configInput_' + fieldName + '" value="' + Config.get(fieldName) + '" style="' + (width ? 'width:' + width + ';' : '') + '" type="' + type + '"'+ disabledString +'/>';
						break;
					case 'checkbox':
						html += '<input id="configInput_' + fieldName + '" type="checkbox" style="position:relative; top:2px;"' + (Config.get(fieldName) ? 'checked' : '' ) + ''+ disabledString +'/>';
						break;
					case 'html':
						html += '<td colspan="2">' + field.value + '</td>';
						break;
				}
				if(type != 'html') {
					html += '<i>';
					html += typeof(fields[fieldName].text) == 'string' ? ' &nbsp; - ' + fields[fieldName].text : '';
					html += '</i></td></tr>';
				} else
					html += '</tr>';
			}
			html += '</table>';
			// add check for updates
			if(id == "configTabAbout" && typeof(ScriptUpdater) == 'object' && typeof(ScriptUpdater.scriptId) != 'undefined') {
				html += '<p><br/><a href="javascript:void(0)" id="ConfigCheckUpdatesLink">Check for updates</a></p>';
			}
			Config.$('ConfigContentBox').innerHTML = html;
			// add event listeners
			for(var fieldName in fields) {
				switch(fields[fieldName].type) {
					case 'checkbox': 
						Config.$('configInput_' + fieldName).addEventListener('change', function() {
							Config.tempOptions[this.id.toString().match(/configInput_(.+)$/)[1]] = this.checked;// ? '1' : '0';
						}, false);
						break;
					case 'select': 
						Config.$('configInput_' + fieldName).addEventListener('change', function() {
							Config.tempOptions[this.id.toString().match(/configInput_(.+)$/)[1]] = this.value;															   
						}, false);
						break;
					case 'password':
					case 'text':
						Config.$('configInput_' + fieldName).addEventListener('keyup', function() {
							Config.tempOptions[this.id.toString().match(/configInput_(.+)$/)[1]] = this.value;															   
						}, false);
						break;
				}
			}
			if(id == "configTabAbout" && typeof(ScriptUpdater) == 'object' && typeof(ScriptUpdater.scriptId) != 'undefined') {
				$('#ConfigCheckUpdatesLink')[0].addEventListener('click', function() { ScriptUpdater.forceNotice(ScriptUpdater.scriptId, ScriptUpdater.scriptCurrentVersion); }, false);
			}
		},
		keyUpHandler:function (e) {
			if(e.keyCode == 27) { Config.close(false); }
		},
		icons:{
			install:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALZSURBVBgZBcFLiFVlAADg7zzuPLzjzDjOMINMitIie5gF+UAkIZSgRQuXLZIWrY021dYIggJdJURElJsoqlWRYA9GshGFCNQeOjoTk6bjeOd5zzn/f07flzRNA459ObcHJ3cM9+1fq2prVa2qa+uh7mAZ9xCxiAV8iu9zgDqEvU9ODOx//dkxALBa1kNrZT202I2TZcVyEd28t+Lb66uHcTwHqEMYH+xJwNyDqJUk8oQsp7eV2tqbytJUK+OpyX5bhtojH07Pv58CxKoabOeEmuUy0al4UNDp0umysM5/KxG8eWbW/u1tj4+2xnKAWFUjG3tSqwWr3ShNEzmyjDQjk8gSaiRxyYUbiy7PduZzgFiW40P9mc56sFY00rSRpaQxkaVkGlmGJnNnqXDq7N9LOJYDhLLcNj7Y0uk2AjRkMZE2iGQaeZOqG2IrCmXY/s1rB+6nALEstk0M9VotG0lKliRSpEjw+YUjPjq3RxkKoSjEsoiQwvMnvusXQ09vK1VGUg1qjVrUqDWKUJoc3emVj3dbWeuEUJZLkEMoyrF2u0+aUEPD19OHNXVQ1kEZgy2bHrZzYq/l7qr766/m3VC0ub+SQyyLDXm7R56SpYlYJ0JdOvzYy2JTi3VUa8x35jwxecBKue7S7E+dXW+nI/nB42dGcWLPI1vdXmrcvBO1++iGUmxqtxb+UtVBqCtVrCwVy3Y/dNBKtZb+OjO1kMeyfA4vXLo6Y3E9t1I0qtjo6goxGB/cKtRRbGr/dmaNDEy4PHfe+etTd8vgSB6r6ukXD+3qf+ulfQDg6OnCJ7+8p6xL3VDaMfqofTuOuHhryrk/fl4tokPz7zRX8lhVM7fvdXx29qrhgX7Dg32G271OHv3dxg09entSvXnqmXcHJGm/6Ru/ad89dmrm9AdXIK9D+GLq4rXJqYvXtmEzNmMTNmGor6fV6utr6YxWfvjzR0P/vDGTh7GvAP4H2uh1wse2x/0AAAAASUVORK5CYII%3D",
			config:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAALvSURBVBgZBcFNaNUFAADw3//jbe/t6d6cc2/kUpeXsEgUsSSiKIzAQxDdvCgdulgagmBXLx4K7BgRWamnOgSDIj3EusRangwlbVvOyba25tvH23v/z36/oCxLcOr7uaO48sxA9Vg7LbTTQloUtrKihXUsI8cqVvAtfo4Biix78eDItmPnX90FADaTotFOisZqJx9NUta7udnlDT/+vXkc52KAIsua/T0BmHuSqwSBOCCK6a2E9vSGojBUiTg0WvNUoz74xeTjT0OAPE376zFZwXoSaKU86dLq0OqwssXSRg4uXn/o2Fjd80OVXTFAnqaD23tCm102O7kwDMSIIsKISCAKKBDka36bXnX7YetxDJAnSbNRi7S2Mu1uKQxLUUiYB6KQSCmKUEYW17o+u/lgDadigCxJ9jb7K1qdUgYlUR4IS+RsPfhFliaeGzkhr+SyJBv74aOX/wsB8qS7d6TRazMpBSFREAjWH0lmflV21lR7e/T19fl3acmbAw+9MzT7CQRlWXrr0k+1OArb3104bvKfVKEE6fSEffv2mZ+f12w2hWFodnbW6Oio8fFxRVHUY8i6ya56vSoMKKAkCAi279bpdCwvL5uYmFCr1Rw4cEC73Vav1786c+ZMO4Q86fbFCnFIFAYEoY17tzSiTcPDw+7fv+/1kxe9e/q8R/PzRkZG7N+///Tly5fL+JVz14dw6eizeyyslWYXc/UqnVZLFEWazabh4WG1Kv19lGVgfX3d3Nyc6elpcZ4kb+DEH3dnrG7FNrqlNC8V2UEjG/MGBxeMjY2ZHP/aVFDa8/RuKysr7ty58yUuxHmaHn77tRdqH598CQDkJde+mcKAhYUFRw4f1Ol0zMzMaDQa8F6tVns/ztN0ZmG55drNuwa21Qz0Vw3UezXqvQYGh1y9etUHH5419fukxcVFy2XTrVufl1mW3bxx40YeHDp5ZQjnsBc7sRM7sAONak+lUq1WHKrds7S05M/yyF84efva2Sn4HxcNUm7wsX3qAAAAAElFTkSuQmCC",
			close:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIhSURBVDjLlZPrThNRFIWJicmJz6BWiYbIkYDEG0JbBiitDQgm0PuFXqSAtKXtpE2hNuoPTXwSnwtExd6w0pl2OtPlrphKLSXhx07OZM769qy19wwAGLhM1ddC184+d18QMzoq3lfsD3LZ7Y3XbE5DL6Atzuyilc5Ciyd7IHVfgNcDYTQ2tvDr5crn6uLSvX+Av2Lk36FFpSVENDe3OxDZu8apO5rROJDLo30+Nlvj5RnTlVNAKs1aCVFr7b4BPn6Cls21AWgEQlz2+Dl1h7IdA+i97A/geP65WhbmrnZZ0GIJpr6OqZqYAd5/gJpKox4Mg7pD2YoC2b0/54rJQuJZdm6Izcgma4TW1WZ0h+y8BfbyJMwBmSxkjw+VObNanp5h/adwGhaTXF4NWbLj9gEONyCmUZmd10pGgf1/vwcgOT3tUQE0DdicwIod2EmSbwsKE1P8QoDkcHPJ5YESjgBJkYQpIEZ2KEB51Y6y3ojvY+P8XEDN7uKS0w0ltA7QGCWHCxSWWpwyaCeLy0BkA7UXyyg8fIzDoWHeBaDN4tQdSvAVdU1Aok+nsNTipIEVnkywo/FHatVkBoIhnFisOBoZxcGtQd4B0GYJNZsDSiAEadUBCkstPtN3Avs2Msa+Dt9XfxoFSNYF/Bh9gP0bOqHLAm2WUF1YQskwrVFYPWkf3h1iXwbvqGfFPSGW9Eah8HSS9fuZDnS32f71m8KFY7xs/QZyu6TH2+2+FAAAAABJRU5ErkJggg%3D%3D",
			uso:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAQCAYAAAAiYZ4HAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAh9JREFUeNp0krmLWnEQxyf7zLoajyIWXojIxkK0EiIGCRamCKQwEdIIgYQoQSR/wLY2goVVJGCa1BaL2liKBESFiOJFiMRb1xMVRbx+mfdA0RwDA4/3m+Mz3xmAf9hDNJ/P9zWXy935/f7A5eXlFfzPRCKROBgMfqvX62S5XBLabDbbh8M76zRYKpUqvF5vyGw2P+bz+cBisWCz2cB2u33wV2WFQvEoFArlW60WmUwmZLVakdFoRNxu9xd8Fp51UKlUWmS91ev11zweD5AZMAFmsxkgWhpDpsfKarVaE4lEqpVKhUynU4a73++TcrlMarUa6Xa7G7vd/u4QT93c3HzmcrlPSqUSiMVihrvX68F6vYZsNkvPcOFyuV5Uq9VuoVD4ztrv91wOhwMCgQAGgwEsFguYz+eMSyQSkMvlwGazqUAg8KnRaHSo4XA4Q9leYRdmHrpyJpMBehaDwQBCoRB2ux2gapRSqbymsP2PTqezsFqtz+6hpVIpprLRaGTw8BcgBVOo2WyOj8NbLJaP+Xx+k0gkCL00xGNEoJ2WOZlMznQ6nfVsFyaT6X273d4eAmkfj8ckHo+PNRrNSzrm4jRBq9XysDWF18Cg0OzpdPrO6XS+QRVvz6oj0nOch25NYrEYgxEOhxsymezpadyxA8p5HxUDXBTgSUA0Gv3pcDheI2LiNIE6fOAN/cKkK9RdUSwWkx6P5y0mZv+8ud8CDABidDMA4Sb2JAAAAABJRU5ErkJggg%3D%3D",
			save:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAH+SURBVBgZBcE9i11VGAbQtc/sO0OCkqhghEREAwpWAWUg8aMVf4KFaJEqQtAipTZWViKiCGOh2Ap2gmJhlSIWFsFOxUK0EsUM3pl79n4f12qHb3z3Fh7D83gC95GOJsDe0ixLk5Qq/+xv/Lw9Xd+78/HLX3Y8fXTr2nWapy4eCFKxG7Fby97SnDlYtMbxthyfzHO//nl85fNvfvnk8MbX5xa8IHx1518Vkrj54Q+qQms2vVmWZjdiu5ZR2rT01166/NCZg/2PFjwSVMU6yjoC1oq+x6Y3VbHdlXWExPd379nf7Nmejv2Os6OC2O4KLK0RNn3RNCdr2Z5GJSpU4o+/TkhaJ30mEk5HwNuvX7Hpi76wzvjvtIwqVUSkyjqmpHS0mki8+9mPWmuWxqYvGkbFGCUAOH/+QevYI9GFSqmaHr5wkUYTAlGhqiRRiaqiNes6SOkwJwnQEqBRRRJEgkRLJGVdm6R0GLMQENE0EkmkSkQSVVMqopyuIaUTs0J455VLAAAAAODW0U/GiKT0pTWziEj44PZ1AAAAcPPqkTmH3QiJrlEVDXDt0qsAAAAAapa5BqUnyaw0Am7//gUAAAB49tEXzTmtM5KkV/y2G/X4M5fPao03n/sUAAAAwIX7y5yBv9vhjW/fT/IkuSp5gJKElKRISYoUiSRIyD1tufs/IXxui20QsKIAAAAASUVORK5CYII%3D",
		},
		getField:function(key) {
			Config.settings = typeof(Config.tabs) != 'undefined' ? Config.tabs : Config.settings;
			for(var tabName in Config.settings) {
				if(typeof(Config.settings[tabName].fields) == "object") {
					var fields = Config.settings[tabName].fields
					for(var fieldName in fields)
						if(fieldName == key)
							return fields[fieldName];
				}
			}
			return false;
		},
		get:function(key) {
			if(Config.data != null && typeof(Config.data[key]) != 'undefined')
				return Config.data[key];
			else {
				var field = Config.getField(key);
				key = typeof(Config.prefix) == 'string' ? Config.prefix + key : key;
				switch(field.type) {
					case 'checkbox':
						if(typeof(field.value) == 'undefined' || !field.value)
							return GM_GlobalGetValue(key, false);
						else 
							return GM_GlobalGetValue(key, field.value);
						break;
					case 'select':
					case 'password':
					case 'text':
						return GM_GlobalGetValue(key, (typeof(field.value) != 'undefined' ?  field.value : ''));
						break;
					default: 
						return 'not found';
				}	
			}
		},
		save:function() { 
			for(var x in Config.tempOptions)
				Config.set(x, Config.tempOptions[x]);
			Config.tempOptions = {};
		},
		set:function(key, value) {
			key = typeof(Config.prefix) == 'string' ? Config.prefix + key : key;	
			GM_GlobalSetValue(key, value);
		},
		$:function(id) {
			return document.getElementById(id);
		},
	};

	onClickButtonLess = function(e)
	{
		var prefix = 'configInput_';
		if(!e)
			return;
		var node = e.target;
		
		if(node.tagName.toLowerCase() != 'input' || node.getAttribute('type').toLowerCase() != 'checkbox')
			return;
			
		function $x(id){ return document.getElementById(prefix + id);}
		
		function click(obj, toCheck)
		{
			var evt = document.createEvent("MouseEvents");
			evt.initEvent("click", true, true);
			if(obj.checked != toCheck)
				obj.dispatchEvent(evt);
		}
		
		if(node.checked)
		{
			if(node.id == prefix + 'buttonLess')
			{
				click($x('timedLoopEnabled'), false);
				// $x('nextVideosEnabled').checked = false;
				// $x('loopByDefault').checked = true;
				click($x('nextVideosEnabled'), false);
				click($x('loopByDefault'), true);
				
			}
			else if(node.id == prefix + 'timedLoopEnabled' || node.id == prefix + 'nextVideosEnabled')
				click($x('buttonLess'), false);
		}
	}

	Config.scriptName = "Better Loopy for YouTube";
	Config.onclick = onClickButtonLess;
	Config.playAllBookmarklet = "<a href=\"javascript:var links = document.getElementsByTagName('a'); var youtubeVideosFound = false; var res = new String(); var nextVideos = new String(); var videoID = new String(); for (i = 0; i < links.length; i++) { var url = new String(links[i].href); if (url.indexOf('youtube') > 0) { res = res + url + '\n'; index = url.indexOf('?v='); if (index > 0) { var indexEnd = url.indexOf('&', index + 3); if (indexEnd > 0) indexEnd = Math.min(indexEnd, url.length - 1); else indexEnd = url.length; if (videoID == '') { videoID = url.substring(index + 3, indexEnd).replace('#',''); youtubeVideosFound = true; } else { newVideoID = url.substring(index + 3, indexEnd).replace('#',''); if (videoID != newVideoID && nextVideos.indexOf(newVideoID) < 0) nextVideos = nextVideos + newVideoID + ';'; } } } } links = document.getElementsByTagName('param'); for (i = 0; i < links.length; i++) { if (links[i].getAttribute('name') != 'movie') continue; var url = new String(links[i].getAttribute('value')); if (url.indexOf('youtube') > 0) { res = res + url + '\n'; index = url.indexOf('/v/'); if (index < 0) index = url.indexOf('?v='); if (index > 0) { var indexEnd = url.indexOf('&', index + 3); if (indexEnd > 0) indexEnd = Math.min(indexEnd, url.length - 1); else indexEnd = url.length; if (videoID == '') { videoID = url.substring(index + 3, indexEnd).replace('#',''); youtubeVideosFound = true; } else { newVideoID = url.substring(index + 3, indexEnd).replace('#',''); if (videoID != newVideoID && nextVideos.indexOf(newVideoID) < 0) nextVideos = nextVideos + newVideoID + ';'; } } } } if (youtubeVideosFound) { nextLocation = 'http://www.youtube.com/watch?v=' + videoID; if (nextVideos.length > 0) nextLocation += '&nextVideos=' + nextVideos; window.location = nextLocation; } else alert('No youtube videos found on the page');\">Play All</a>";

	Config.tabs = {
		"Features":{
			html:'<p>Set your feature preferences here.</p>',
			fields:{
				timedLoopEnabled:{
					type:'checkbox',
					label:'Enable Timed Loop',
					tip:'Check if you want to loop videos within a time duration.',
					value:true,
				},
				nextVideosEnabled:{
					type:'checkbox',
					label:'Enable playing all YouTube videos on any page',
					tip:'Check if you want to press the Play All bookmark button on any page to play all videos one by one. ',
					value:true,
				},
				bookmartlet:{
					type:'html',
					value:'(Drag the ' + Config.playAllBookmarklet + ' bookmarklet to your bookmarks toolbar for that.)',
				},			
				buttonLess:{
					type:'checkbox',
					label:'No UI, just plain loop',
					tip:'If checked, none of the buttons/links/text boxes etc. will be shown. You can still loop through keyboard shortcuts',
					value:false,
				},
				loopByDefault:{
					type:'checkbox',
					label:'Loop all videos by default',
					value:false,
					tip:'Check if you automatically want to loop all videos you watch.',
				},
			}
		},
		"Keyboard Shortcuts":{
			html:'<p>Set your keyboard shortcut preferences here.</p>',
			fields:{
				enableKeyboardShortcuts:{
					type:'checkbox',
					label:'Enable Keyboard shortcuts',
					tip:'Check if keyboard shortcuts should be enabled.',
					value:true,
				},
				EnterToFocus:{
					type:'checkbox',
					label:'Pressing enter focuses on Start Time',
					tip:'Check if pressing enter on the page\'s body sets the focuses on start time text box.',
					value:true,
				},
				LoopKeys:{
					type:'html',
					value:'<strong>Toogle Loop shortcut keys:</strong>',
				},
				loopKeysCtrl:{
					type:'checkbox',
					label:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ctrl',
					value:false,
					subfield:true,
				},
				loopKeysAlt:{
					type:'checkbox',
					label:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Alt',
					value:true,
					subfield:true,				
				},
				loopKeysShift:{
					type:'checkbox',
					label:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Shift',
					value:false,
					subfield:true,
				},			
				loopKeysKey:{
					type:'text',
					label:'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Key (A-Z only)',
					value:'L',
					subfield:true,
					disabled:false,
					width:'50',
					maxLength:'1',
				},
			}
		},	
		"About":{
			html:'<p><a href="http://userscripts.org/scripts/show/57971"><span style="font:15px !important;font-weight:bold;color:gray">Better Loopy for YouTube</span></a> by <a href="http://userscripts.org/users/piyushsoni">Piyush Soni</a><br/> version '+ version +' <br/><br/>Like the Script? <br/><a href="http://userscripts.org/scripts/reviews/57971">Leave a review</a> for us! <br/><br/><a href="http://userscripts.org/scripts/source/57971.user.js" >Install latest version</a><iframe src="http://piyushsoni.com/feed/betterloopy.html" scrolling="no" height="70px" width="100%"/>',
		}
	};
}





//Class HTML5PlayerAdapter
function HTML5PlayerAdapter(iVideo)
{
	this.video = iVideo;
	
	//methods
	this.addEventListener = function(event, callBack, useCapture)
	{
		if(!this.video || !callBack)
			return;
		if(event == 'onStateChange')
		{
			if(typeof callBack == 'string')
				callBack = unsafeWindow[callBack];
			if(typeof callBack == "undefined" || !callBack)
				return;
			this.video.addEventListener('ended', function(){callBack(STATE_ENDED);}, useCapture);
			this.video.addEventListener('play', function(){callBack(STATE_PLAY);}, useCapture);
			this.video.addEventListener('pause', function(){callBack(STATE_PAUSE);}, useCapture);
			this.video.addEventListener('emptied', function(){callBack(STATE_EMPTIED);}, useCapture);
			this.video.addEventListener('suspend', function(){callBack(STATE_SUSPEND);}, useCapture);
		}
		else
			video.addEventListener(event, callBack, useCapture);
	};
	
	this.playVideo = function() {this.video.play();};
	this.pauseVideo = function() {this.video.pause();};
	this.getCurrentTime = function() {return this.video.currentTime;};
	this.getDuration = function() {return this.video.duration;};
	this.seekTo = function(seconds) {this.video.currentTime = seconds;};
	//Firefox doesn't support 'played' attribute yet! Awesome. 
	this.getPlayerState = function() { return this.video.ended ? STATE_ENDED : (this.video.paused ? STATE_PAUSE : (this.video.seeking ? -1 : STATE_PLAY));};
}



function AddCSSStyles()
{
	if (typeof GM_addStyle == "undefined") 
	{
		GM_addStyle = function(text) {
			var head = document.getElementsByTagName("head")[0];
			style = create('style',[['type','text/css']]);
			style.textContent = text;
			head.appendChild(style);
		}
	}

	GM_addStyle("						\
		#eLoopy {					\
			width: 28px;				\
			margin-left: auto;			\
			text-align: center;			\
			background: #EFEFEF;			\
			border-left: #B1B1B1 1px solid;		\
			border-right: #B1B1B1 1px solid;	\
			border-bottom: #B1B1B1 1px solid;	\
			padding: 1px 4px 1px 4px;		\
			margin-bottom: 5px; }			\
		#newLoopyDiv {					\
			margin-left: auto;			\
			color:grey;			\
			text-align: center;			\
			font-size: 11px;			\
			vertical-align:middle;			\
			background:-moz-linear-gradient(center top , #FFFFFF, #dfdfdf) repeat scroll 0 0 #F6F6F6;		\
			background: #F6F6F6 -webkit-gradient(linear, 0% 0%, 0% 100%, from(white), to(#dfdfdf));			\
			border-left: #B1B1B1 1px solid;		\
			border-right: #B1B1B1 1px solid;	\
			border-bottom: #B1B1B1 1px solid;	\
			border-top: #B1B1B1 1px solid;		\
			padding: 2px 4px 2px 4px;		\
			border-radius: 3px; 			\
			-moz-border-radius: 3px;	\
			height:20px								\
			}			\
		#eOnOff {					\
			font-weight: bold;			\
			font-size: 11px;			\
			text-decoration: none;			\
			-moz-user-select: none;			\
			-khtml-user-select: none;		\
			user-select: none; }			\
		.LoopyOff {					\
			color: grey !important; }		\
		.LoopyOff:hover {				\
			color: black !important; }		\
		.LoopyOn {					\
			color: crimson !important; }	\
		.NewLoopyOff{						\
			color:gray;						\
			font-weight:bold;				\
		}									\
		.NewLoopyOn{						\
			color:rgb(191,0,65) !important;	\
			font-weight:bold !important;				\
		}									\
		.Thin{						\
			height:1.82em !important;			\
			vertical-align: top !important;		\
		}									\
		.ButtonActions{						\
			padding: 0 4px !important;		\
		}									\
		.LeftAligned{						\
			margin-left: 0;						\
		}									\
		.TextBox{						\
			height:16px;						\
			background-color:white;				\
			border:1px solid lightgray;					\
			color:black;				\
			vertical-align:center;			\
			border-radius: 3px; 			\
			-moz-border-radius: 3px;	\
		}									\
		.ExtensionButton{					\
			font-weight:normal !important; 		\
			color: #686868; 						\
			background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #f9f9f9), color-stop(1, #e9e9e9));\
			background:-moz-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%);\
			background:-webkit-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%);\
			background:-o-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%);\
			background:-ms-linear-gradient(top, #f9f9f9 5%, #e9e9e9 100%);\
			background:linear-gradient(to bottom, #f9f9f9 5%, #e9e9e9 100%);\
			text-shadow:0px 1px 0px #ffffff;		\
			background-color:#f9f9f9;		\
			border:1px solid #c6c6c6;		\
		}									\
		input[name='buttonExtension']:hover{		\
			background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #e9e9e9), color-stop(1, #f9f9f9));	\
			background:-moz-linear-gradient(top, #e9e9e9 5%, #f9f9f9 100%);	\
			background:-webkit-linear-gradient(top, #e9e9e9 5%, #f9f9f9 100%);	\
			background:-o-linear-gradient(top, #e9e9e9 5%, #f9f9f9 100%);	\
			background:-ms-linear-gradient(top, #e9e9e9 5%, #f9f9f9 100%);	\
			background:linear-gradient(to bottom, #e9e9e9 5%, #f9f9f9 100%);	\
			background-color:#e9e9e9;		\
		}									\
		.NoTopPadding{								\
			padding-top: 0px !important;		\
		}										\
		input {				\
			margin: 0;	\
		}				\
		"
	);
}


	
function main()	
{
	//Dont run in/from frames. 
	if(window.top != window.self)
		return;


	//******** Default Settings - can be changed. ******//
	var extensionEnabled = true;
	var nextVideosEnabled = true;
	var timedLoopEnabled = true;
	var newButtonStyle = true;
	var buttonLess = false;
	var enableKeyboardShortcuts = true;
	var loopKeysCtrl = true;
	var loopKeysAlt = true;
	var loopKeysShift = false;
	var loopKeysKey = 'L';
	var EnterToFocus = true;
	var loopByDefault = true;
	//******** Default Settings section over. ******//
	
	
	//Other Script Variables
	var ytLoop = false;
	var ytPlayList;
	var ytPLIndex;
	var loopCounter = 0;
	var maxLoopLimit = -1;
	var eventRegistered = false;
	var elementsAdded = false;
	var eventRegistrationRetries = 0;
	var ytPlayer = null, ytObj = null;
	var divBetterLoopyActions, buttonActions;
	var actionsPanelOn = false;
	var divSendLoopLink; 
	var isCosmicPanda = false;
	var isHTML5 = false;
	var watchPanelDiv = null;
	var videoID = getQuerystring('v');
	var customTime = false;
	var wasPlaying = false;
	
	var url = new String(window.location.href).toLowerCase();
	var isPopup = url.indexOf('watch_popup') >= 0;
	var isChannel = url.indexOf('/user/') >= 0;
	if(isChannel)
		log("User channel detected");
		
	

	
	//*********** Check for Updates - Only for Firefox. ************** //
	function onVersionCheck(remoteVersion)
	{
		log("*********Version returned: " + remoteVersion + "*************");
	}
	


	//Read config settings
	function readConfigIntoBetterLoopy()
	{
		if(!Config)
			return;
			
		log('came inside readConfig.');
		timedLoopEnabled = Config.get('timedLoopEnabled');
		nextVideosEnabled = Config.get('nextVideosEnabled');
		buttonLess = Config.get('buttonLess');
		enableKeyboardShortcuts = Config.get('enableKeyboardShortcuts');
		loopKeysCtrl = Config.get('loopKeysCtrl');
		loopKeysAlt = Config.get('loopKeysAlt');
		loopKeysShift = Config.get('loopKeysShift');
		loopKeysKey = Config.get('loopKeysKey').toUpperCase();
		EnterToFocus = Config.get('EnterToFocus');
		loopByDefault = Config.get('loopByDefault');
		extensionEnabled = !buttonLess && (timedLoopEnabled || nextVideosEnabled);
		
		if(!extensionEnabled)
			nextVideosEnabled = false;
		
		log('timedloop: ' + timedLoopEnabled);
		log('nextvid: ' + nextVideosEnabled);
		log('buttonLess: ' + buttonLess);
		log('loopKeysCtrl: ' + loopKeysCtrl);
		log('loopKeysShift: ' + loopKeysShift);
		log('loopKeysAlt: ' + loopKeysAlt);
		log('loopKeysKey: ' + loopKeysKey);
		log('EnterToFocus: ' + EnterToFocus);
		log('loopByDefault: ' + loopByDefault);
		log('extensionEnabled: ' + extensionEnabled);
		log('enableKeyboardShortcuts: ' + enableKeyboardShortcuts);
	}


	function showSettings()
	{
		if($('ConfigBody'))
			Config.close(false);
		else
		{
			if(ytObj && ytObj.getPlayerState() == STATE_PLAY)
			{
				ytObj.pauseVideo();
				wasPlaying = true;
			}
			Config.show(onSettingsDone);
		}
	}
	
	function onSettingsDone(saved)
	{
		if(wasPlaying)
		{
			ytObj.playVideo();
			wasPlaying = false;
		}
		if(saved)
		{
			//readConfigIntoBetterLoopy();
			//location.reload();
		}
	}

	
	//************Keyboard shortcuts section ******************************
	function handleKeyPress(e)
	{
		var shiftPressed = e.shiftKey;
		var altPressed = e.altKey;
		var ctrlPressed = e.ctrlKey;
		var node = e.target;
		
		//Ok. Once again, test adding this comment. 
		//log("Key: " + e.keyCode + ", Key Modifiers: " + (ctrlPressed ? " ctrl " : " ") + (altPressed ? "alt " : " ") + (shiftPressed ? "shift" : ""));
		
		switch(e.keyCode)
		{
			case 13://Enter
				if(ytObj && (node.id == 'txtStartTime' || node.id == 'txtEndTime'))
				{
					SetCurrentTimeForBox(node.id);
				}
				else 
				{
					if(node.id == 'idTextBoxDivSendLoopLink')
					{
						clickObject($('buttonSendLinkOK'));
					}
					else if(EnterToFocus && extensionEnabled && (node.tagName.toUpperCase() == 'HTML' || node.tagName.toUpperCase() == 'BODY') && $('txtStartTime'))
					{
						//Focus on the start time when pressing enter anywhere on page. 
						$('txtStartTime').focus();
					}
				}
			break;
			
			default:
				var incorrectKeys = (loopKeysShift != shiftPressed) || (loopKeysAlt != altPressed) || (loopKeysCtrl != ctrlPressed);
				if(e.keyCode == loopKeysKey.charCodeAt(0) && !incorrectKeys)
				{
					LoopyOnOff();
					goToStart();
					e.stopPropagation();
					e.preventDefault();
				}
				else if(e.keyCode == 'M'.charCodeAt(0) && !incorrectKeys)
				{
					showSettings();
					e.stopPropagation();
					e.preventDefault();
				}
				else if(e.keyCode == 'N'.charCodeAt(0) && !incorrectKeys)
				{
					playNext();
					e.stopPropagation();
					e.preventDefault();
				}
				else if(e.keyCode == 'P'.charCodeAt(0) && !incorrectKeys)
				{
					togglePlay();
					e.stopPropagation();
					e.preventDefault();
				}
		}
	}

	function handleKeyDown(e)
	{
		var node = e.target;
		switch(e.keyCode)
		{
			case 37: //Left Arrow
			case 39: //Right Arrow
				if(ytObj && (node.id == 'txtStartTime' || node.id == 'txtEndTime'))
				{
					var change = (e.keyCode - 38); // :) 
					var currentBoxTime = getProperTime(node.value);
					var newTime = getProperTime(node.value) + change;
					if(newTime >= ytObj.getDuration() || newTime < 0)
						break;
					node.value = getMinuteSecondsTime(newTime);
					e.stopPropagation();
					e.preventDefault();
				}
			break;
			default:
		}
	}
	//************Keyboard shortcuts section over******************************
	
	
	
	

	function SetCurrentTimeForBox(boxId)
	{
		if(!ytObj)
			return;
		var time = getMinuteSecondsTime(ytObj.getCurrentTime());
		var box = $(boxId);
		if(box)
			box.value = time;
	}



	function initLoopy()
	{
		if (!elementsAdded && !buttonLess)
		{
			videoID = getQuerystring('v');
			
			if(isChannel && !$('.channels-featured-video'))
			{
				log('No video found to loop on Channel');
				return;
			}
				
			var piExtension = create('div',[['id','newLoopyDiv']]);
			
			var blankSpan = create('span',[['width','100px']]);
			blankSpan.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			//Don't ask.
			// if(isFirefox)
				// blankSpan.innerHTML  += "&nbsp;&nbsp;&nbsp;";
			
			var spanButtonGroup	= null;
			if(isFirefox)
				spanButtonGroup = create('span', [['id','spanButtonGroup'], ['class', 'yt-uix-button-group'], ['style', 'display:inline !important;']]);
			else //Doesn't work in Chrome quite well. 
				spanButtonGroup = create('span', [['id','spanButtonGroup']]);
			
			var startClass = 'start ';
			
			var buttonSet = create('input', [['type','button'],['value','Loop'],['class', startClass + 'NewLoopyOff yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip'], ['id','loopSet'], ['title','Enable auto replay'],['tabindex','4'],['click', function() {LoopyOnOff(); goToStart();}]]);
			
			spanButtonGroup.appendChild(buttonSet);
			
			if(nextVideosEnabled && !$('txtVideos'))
			{
				var textel = document.createTextNode("Next videos: ");
				var spaceEl = document.createTextNode("  ");
				var inputbox = create('input', [['id', 'txtVideos'],['value', getQuerystring('nextVideos')],['class','TextBox'],['size','16']]);
				var linkNext = create('a', [['style','cursor:pointer']]);
				linkNext.addEventListener('click', playNext, false);
				linkNext.innerHTML = "Next >";		
				piExtension.appendChild(textel);
				piExtension.appendChild(inputbox);
				piExtension.appendChild(spaceEl);
				piExtension.appendChild(linkNext);
				piExtension.appendChild(blankSpan);
			}
			
			//See if the URL contains custom time interval to loop. 
			var customStartTime = getQuerystring("loopStart");
			var customEndTime = getQuerystring("loopEnd");
			var rememberedLoopOut = null;
			var rememberedLoopParamArray = null;
			if(customStartTime.length > 0 || customEndTime.length > 0)
			{
				customTime = true;
				//Enable timed loop, at least for this session. 
				timedLoopEnabled = true;
			}
			else
			{
				//See if this is one of the videos for which Loop is remembered. 
				rememberedLoopOut = FindRememberedLoopForVideo(videoID);
				if(rememberedLoopOut.videoLoopString.length > 0)
				{
					rememberedLoopParamArray = rememberedLoopOut.videoLoopString.replace(";","").split(",");
					if(rememberedLoopParamArray[3] == '1')
						loopByDefault = true;
					customTime = (rememberedLoopParamArray[1].length > 0 || rememberedLoopParamArray[2].length > 0);
					if(customTime)
					{
						customStartTime = rememberedLoopParamArray[1];
						customEndTime = rememberedLoopParamArray[2];
						timedLoopEnabled = true;
					}
				}
			}
			
			//For looping between a start and end time:
			var extraDiv = null; 
			if(timedLoopEnabled && !$('txtStartTime'))
			{
				if(nextVideosEnabled)
					piExtension.appendChild(blankSpan);
				var loopStart = document.createTextNode("   Loop : ");
				var btnLoopStart = create('input', [['type','button'], ['id', 'btnLoopStart'], ['name', 'buttonExtension'], ['value', 'Start Time'], ['class', 'yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip Thin ExtensionButton'], ['style', 'width:56px;'], ['click', function() {SetCurrentTimeForBox('txtStartTime');}], ['data-tooltip-title','Click to set current time as Loop start time'],['title','Click to set current time as Loop start time']]);
				inputStartTime = create('input', [['id','txtStartTime'],['size','5'],['tabindex','2'],['class','TextBox'],['title','Enter time in mm:ss format or press Enter key to set current video time']]);
				
				// var loopEnd = document.createTextNode(" End Time: ");
				var btnLoopEnd = create('input', [['type','button'], ['id', 'btnLoopEnd'], ['name', 'buttonExtension'], ['value', 'End Time'], ['class', 'yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip Thin ExtensionButton'], ['style', 'width:52px;'], ['click', function() {SetCurrentTimeForBox('txtEndTime'); window.setTimeout(goToStart, 950); }], , ['data-tooltip-title','Click to set current time as Loop end time'],['title','Click to set current time as Loop end time']]);
				
				inputEndTime = create('input', [['id','txtEndTime'],['size','5'],['tabindex','3'],['class','TextBox'],['title','Enter time in mm:ss format or press Enter key to set current video time']]);
				inputEndTime.addEventListener('blur', goToStart, false);

				piExtension.appendChild(loopStart);
				piExtension.appendChild(btnLoopStart);
				piExtension.appendChild(inputStartTime);
				piExtension.appendChild(btnLoopEnd);
				piExtension.appendChild(inputEndTime);
				piExtension.appendChild(document.createTextNode(' '));
			}
			
			if(customStartTime.length > 0 && inputStartTime && getProperTime(customStartTime) > 0)
			{
				inputStartTime.value = customStartTime;
			}
			
			if(customEndTime.length > 0 && inputEndTime && getProperTime(customEndTime) > 0)
			{
				inputEndTime.value = customEndTime;			
			}
			
			watchPanelDiv = $("watch-panel") || $(".watch-panel-section watch-panel-divided-top", document) || $("watch7-content") || $(".watch-content") || $("playnav-video-details");
			log(watchPanelDiv ? ("Found watchPanelDiv: " + watchPanelDiv.id) : ("watchPanelDiv not found to add Loopy bar!"));
			if(!watchPanelDiv && isChannel)
			{
				watchPanelDiv = $(".module-view");
			}
			
			if(watchPanelDiv)
			{
				var insertBeforeElement = isChannel ? $(".channels-featured-video-details") : watchPanelDiv.firstChild;
				
				if(nextVideosEnabled != timedLoopEnabled) //one of them is false, and not both.
				{
					piExtension.setAttribute('style','float:right');
					extraDiv = create('div',[['id','idExtraDiv'],['style','overflow:hidden']]);
					extraDiv.appendChild(piExtension);
				}
				
				//Remove the top padding from the watch-panel div, which makes the 'Loopy' button detached from the YouTube player. 
				//watchPanelDiv.setAttribute("style","padding-top:0px");
				watchPanelDiv.className = watchPanelDiv.className + " NoTopPadding";
				
				
				if(extensionEnabled)
				{
					piExtension.appendChild(spanButtonGroup);
					SetupActionsUI(spanButtonGroup);
					
					//Add extension to watch panel. 
					watchPanelDiv.insertBefore((extraDiv ? extraDiv : piExtension), insertBeforeElement);
					log('Inserted Loopy bar');
					elementsAdded = true;
					buttonSet.setAttribute('class','Thin ' + buttonSet.getAttribute('class'));
				}
				else
				{
					if(singleButtonFloatLeft)
						buttonSet.setAttribute('style','float:left'); 
					var watchActionsRight = $("watch7-sentiment-actions") || $("watch-actions-right") || $("watch-actions") || $(".view-count-and-actions") || $(".channels-featured-video-details")/*for user channels*/;
					if(watchActionsRight)
					{
						buttonSet.className = buttonSet.className.replace("yt-uix-button-default", "yt-uix-button-text").replace("yt-uix-tooltip-reverse","");
						watchActionsRight.appendChild(buttonSet);
						elementsAdded = true;
					}
					else
					{
						log("Didn't find anything to add the Button to.");
					}
				}
			}
			else
			{
				//last resort. Don't care about location, except if it is 
				//User channel. 
				log('Trying last resort');
				var watchPlayerDiv = $("watch-player") || $("playnav-player");
				if(isPopup)
				{
					if(!watchPlayerDiv)
						watchPlayerDiv = $("watch-player-div");
					if(watchPlayerDiv)
						watchPlayerDiv = watchPlayerDiv.parentNode;
				}
				if(watchPlayerDiv)
				{
					if(!extensionEnabled)
						watchPlayerDiv.appendChild(buttonSet);
					else
						watchPlayerDiv.appendChild(piExtension);
						
					elementsAdded = true;
				}
				else
					log('Nope! Nothing found to add!');
			}
			
			log('elementsAdded? : ' + elementsAdded);
		}
		
		
		ytPlayer = $("movie_player") || $("movie_player-flash");//<-mostly for user channels. 
		if(!ytPlayer && isPopup)
			ytPlayer = $("video-player");// in case of pop up. 
		
		try
		{
			if(!eventRegistered)
			{
				if(!ytPlayer)
				{
					//Test if it is HTML5 Video. 
					var html5Video = $('<video>');
					if(html5Video && html5Video.parentNode.className.toLowerCase().indexOf("html5") >= 0)
					{
						isHTML5 = true;
						log('HTML5 Player detected');
						//Assign ytObj to our adapter class. 
						ytObj = new HTML5PlayerAdapter(html5Video); //And we're all set! 
					}
				}
				
				if(!isHTML5)
					ytObj = ytPlayer.wrappedJSObject || ytPlayer;
					
				if(ytObj)
				{
					ytObj.addEventListener("onStateChange", 'onPlayerStateChange');
					eventRegistered = true;
				}
				log('registered on retry number ' + eventRegistrationRetries);
			}
			
			//Play All Videos/Loop by default. 
			if(ytObj && !ytLoop && ((extensionEnabled && nextVideosEnabled && inputbox && inputbox.value != "") || loopByDefault || customTime))
			{
				//Make it automatically on since there are next videos to be played or the user wants it that way. 
				LoopyOnOff();
				log('Loop is on by default');
			}
			
			//Run according to the custom time. 
			if(ytObj && customTime && eventRegistered)
			{
				// var starttime = getProperTime(inputStartTime.value);
				// ytObj.seekTo(starttime, true);
				// alert(starttime);
				var callBack = unsafeWindow.onPlayerStateChange || onPlayerStateChange;
				loopCounter--;
				callBack(STATE_ENDED);
			}
		
		}
		catch(ex)
		{
			if(ex.toString().indexOf('Not enough arguments') < 0)
				log('exception! ' +  ex.toString());
		}
		
		if(!eventRegistered)
		{
			if(eventRegistrationRetries < 5)
				window.setTimeout(function() { initLoopy(); }, 500 + (eventRegistrationRetries++)*500);
			else
			{
				var errorDisplayMsg = "Unknown error, Better Loopy won't work on this video.";
				//Give an indication to the user that Loopy won't work. 
				var loopSet = $("loopSet");
				if(loopSet)
				{
					loopSet.value = "!!" + loopSet.value;
					loopSet.title = errorDisplayMsg;
					loopSet.style.color = "rgb(255, 83, 0)";
				}
			}
		}
	}

	function SetupActionsUI(addToElement)
	{
		//Create settings dropdown button:
		//buttonActions class when active : yt-uix-button-active
		var endClass = 'end ';
		buttonActions = create('button', [['class', endClass + 'yt-uix-button-empty yt-uix-tooltip-reverse yt-uix-button yt-uix-button-default yt-uix-tooltip Thin'],['aria-activedescendant',''],['aria-haspopup','true'],['aria-expanded','false'],['aria-pressed','false'],['role','button'],['onclick',';return false;'],['type','button'], ['data-tooltip-title','Better Loopy Actions'],['title','Better Loopy Actions'],['click', OnActionsClick],['id','idButtonActions']], APPEND_MODE_END, addToElement);
		
		var imgActions = create('img', [['class','yt-uix-button-arrow'],['alt','Actions'],['src','//s.ytimg.com/yt/img/pixel-vfl3z5WfW.gif']], APPEND_MODE_END, buttonActions);
		
		//Create Settings dropdown. 
		divBetterLoopyActions = create('div', [['id','idDivBetterLoopyActions'],['class','yt-uix-button-menu watch'], ['style','display:none;font-size:12px']], APPEND_MODE_END, addToElement);
		
		var divInsideActions = create('div',[['id','idInnerActions']], APPEND_MODE_END, divBetterLoopyActions);
		
		//Add , 'Remember Loop For Video'
		var listActions = CreateMenuList('listInnerActions', ['Settings', 'Remember This Loop', 'Set Repeat Limit', 'Send Looped Link', 'Hide Loopy Bar'], divInsideActions);
		
		divSendLoopLink = create('div', [['id','idDivSendLoopLink'],['innerHTML','<br/>Copy and send the following link for the looped part: <br/>'],['style','display:none; position:absolute; z-index:9000;top:300;left:500;width:500px; height: 80px; background-color:grey;color:#FFFFFF;text-align:center;vertical-align:center;']], APPEND_MODE_END, addToElement);
		var sendLinkTextBox = create('input', [['id','idTextBoxDivSendLoopLink'],['type','text'],['style','vertical-align:center'],['size','80']], APPEND_MODE_END, divSendLoopLink);
		divSendLoopLink.innerHTML = divSendLoopLink.innerHTML + "<br/>";
		var okButton = create('input',[['id','buttonSendLinkOK'],['type','button'],['value','OK'],['style','vertical-align:bottom'],['click',function () {divSendLoopLink.style.display='none';}]], APPEND_MODE_END, divSendLoopLink);
		
		
		//Set event on body click. 
		document.body.addEventListener('click', bodyClick, true);
	}

	function CreateMenuList(idList, arrListItemTexts, containerElement)
	{
		var listActions = create('ul', [['id','listInnerActions'], ['class','addto-menu'],['style','text-align: left;']], APPEND_MODE_END, containerElement);
		var i;
		for(i = 0; i < arrListItemTexts.length; ++i)
		{
			var listItem = create('li', null, APPEND_MODE_END, listActions);
			var spanId = 'ActionItem' + arrListItemTexts[i].replace(/ /g,"");
			var spanItem = create('span',[['class','yt-uix-button-menu-item addto-item LeftAligned'],['innerHTML',arrListItemTexts[i]],['click', function() {OnActionItemClick(this);}],['id',spanId]], APPEND_MODE_END, listItem);
		}
	}
	
	function CleanUpPlayer()
	{
		if(ytObj) 
			delete ytObj;
		if(ytPlayer) 
			delete ytPlayer;
		
		log('Cleaning up player');
		ytLoop = false;
		loopCounter = 0;
		maxLoopLimit = -1;
		eventRegistered = false;
		elementsAdded = false;
		eventRegistrationRetries = 0;
		ytPlayer = null, ytObj = null;
		actionsPanelOn = false;
		isCosmicPanda = false;
		isHTML5 = false;
		watchPanelDiv = null;
		videoID = getQuerystring('v');
		customTime = false;
		wasPlaying = false;
	}

	unsafeWindow.onPlayerStateChange = function(newState)
	{
		log('Player state changed to ' + newState + ', ytLoop is ' + ytLoop);
		if(newState == '5' || newState == '-1' || newState == '1')
		{
			if(!$('newLoopyDiv'))
			{
				//Huh. They removed it, possibly to load another video in youtube player. No problem. 
				log('Loopy div not found');
				CleanUpPlayer();
				window.setTimeout(function() {if(!$('newLoopyDiv')) initLoopy();}, 300);
				window.setTimeout(function() {if(!$('newLoopyDiv')) initLoopy();}, 500);
				window.setTimeout(function() {if(!$('newLoopyDiv')) initLoopy();}, 1000);
				//window.setTimeout(initLoopy, 1500);
			}
			else
				log('Loopy bar still found');

		}
		
		if (ytLoop && newState == STATE_ENDED)
		{
			//If any video IDs are there in the next Videos list, try to play them first. 
			if(!playNext())
			{
				if(maxLoopLimit > 0 && loopCounter >= maxLoopLimit)
				{
					//Max loop limit set. We don't want to loop anymore. 
					LoopyOnOff();
					return;
				}
				
				if(!timedLoopEnabled || isChrome)
				{
					ytObj.pauseVideo(); //seems to help in some weird rare cases. 
					ytObj.playVideo();
				}
				
				//Just to be safe. 
				window.setTimeout(function() { if(ytObj.getPlayerState() != STATE_PLAY) {ytObj.pauseVideo(); ytObj.playVideo(); }}, 100);
				window.setTimeout(function() { if(ytObj.getPlayerState() != STATE_PLAY) {ytObj.pauseVideo(); ytObj.playVideo(); }}, 200);
				
				if(isChrome) //Why Chrome, why? 
					setTimeout(function() { goToStart(); }, RECHECK_PERIOD);
					
				++loopCounter;
				buttonSet = $('loopSet');
				if(buttonSet)
				{
					buttonSet.setAttribute('title', "Video looped " + loopCounter + " time(s). " + "Disable auto replay");
					buttonSet.setAttribute('data-tooltip-text', "Video looped " + loopCounter + " time(s). " + "Disable auto replay");
				}
				log('timed loop: ' + timedLoopEnabled);
				if(timedLoopEnabled)
				{
					
					var videoDuration = ytObj.getDuration();
					log("videoDuration : " + videoDuration);
					var startTime = getProperTime($("txtStartTime").value);
					log("startTime: " + startTime);
					//If startTime box is empty, move to start of video.
					if(startTime < 0)
						startTime = 0;
					ytObj.seekTo(startTime, true);
					// if(ytObj.getPlayerState() == STATE_PAUSE)
						// ytObj.pauseVideo();
						// ytObj.playVideo();
					var endTime = getProperTime($("txtEndTime").value);
					
					if(endTime > startTime && endTime < videoDuration)
					{
						log("endTime: " + endTime);
						goToStart();
					}
				}
			}
		}
	}

	function goToStart()
	{
		if(!ytObj || !ytLoop)
		{
			log('Object not initialized yet');
			//May be it's the start time, when the object hasn't been initialized. Don't give up so soon. 
			//window.setTimeout(goToStart, RECHECK_PERIOD);
			return;
		}
		
		log('in goToStart');
		
		endTimeBox = $("txtEndTime");
		startTimeBox = $("txtStartTime");
		
		var currentTime = ytObj.getCurrentTime();
		
		var startTime = getProperTime(startTimeBox ? startTimeBox.value : "");
		if(startTime < 0)
			startTime = 0;
		if(currentTime < startTime)
		{
			log('forwarding to startTime. Current time: ' + currentTime + ', start time: ' + startTime);
			ytObj.seekTo(startTime);
		}
			
		if(isFirefox && ((!endTimeBox || endTimeBox.value == "")))
		{
			log('goToStart: End time not found, returning');
			return;
		}
		var endTime = getProperTime(endTimeBox ? endTimeBox.value : "");
		if(endTime < 0)
			endTime = ytObj.getDuration();
			
		log('goToStart checking- currentTime: ' + currentTime + ', endTime: ' + endTime);
			
		var diff = endTime - currentTime;
		if(diff <= 0.0)
		{
			var callBack = unsafeWindow.onPlayerStateChange || onPlayerStateChange;
			callBack(STATE_ENDED);
		}
		else
		{
			var recheckPeriod = (diff > 3.0) ? RECHECK_PERIOD : RECHECK_PERIOD/2.0;
			window.setTimeout(goToStart, recheckPeriod);
		}
	}

	LoopyOnOff = function() 
	{
		log(ytLoop ? 'disabling loop' : 'enabling loop');
		var newClass, oldClass, newTitle;
		if (ytLoop) 
		{
			ytLoop = false;		
			if (typeof ytPlayList != "undefined") setCookie("LoopyPL", null);
			newTitle = "Enable auto replay";
			oldClass = "LoopyOn";
			newClass = "LoopyOff";
		}
		else 
		{
			ytLoop = true;	
			if (typeof ytPlayList != "undefined") setCookie("LoopyPL", ytPlayList);
			newTitle = "Disable auto replay";
			oldClass = "LoopyOff";
			newClass = "LoopyOn";
		}
		
		buttonSet = $("loopSet");
		if(buttonSet)
		{
			buttonSet.setAttribute('title', newTitle);
			buttonSet.setAttribute('data-tooltip-text', newTitle);
			currentStyle = buttonSet.getAttribute('class');
			buttonSet.setAttribute('class', currentStyle.replace("New" + oldClass,"New" + newClass));
			//buttonSet.focus();
		}
		if(!newButtonStyle)
		{
			oldOnOff = $("eOnOff");
			if(oldOnOff)
			{
				oldOnOff.title = newTitle;
				oldOnOff.setAttribute("class", newClass);
			}
		}
		if(ytLoop && isChrome) // How many times I have to say that I hate you Google Chrome. 
			goToStart();
	}

	bodyClick = function(e)
	{
		if(e.target.id != 'idButtonActions')
			HideActions();
	}

	OnActionsClick = function()
	{
		if(actionsPanelOn)
			HideActions();
		else
			ShowActions();
	}

	function ShowActions()
	{
		if(!actionsPanelOn)
		{		
			actionsPanelOn = true;
			var x = findPosX(buttonActions);
			var y = findPosY(buttonActions);
			var oneOffsetX = buttonActions.offsetLeft;
			var oneOffsetY = buttonActions.offsetTop;
			
			isCosmicPanda = ($('masthead-nav') != null);
			
			divBetterLoopyActions.style.display = 'block';
			var width = divBetterLoopyActions.offsetWidth;
			//log(x + ", " + y + ", " + oneOffsetX + ", " + oneOffsetY);
			if(true)//There's no cosmic panda now. 
			{
				divBetterLoopyActions.style.left = (oneOffsetX + buttonActions.offsetWidth - width) + "px";
				divBetterLoopyActions.style.top = (oneOffsetY + buttonActions.offsetHeight - 4) + "px";
			}
			else
			{
				divBetterLoopyActions.style.left = (x + buttonActions.offsetWidth - width) + "px";
				divBetterLoopyActions.style.top = (y + buttonActions.offsetHeight) + "px";
			}
			
			var currentClass = buttonActions.getAttribute('class');
			buttonActions.setAttribute('class', currentClass + ' yt-uix-button-active');
		}
	}

	function HideActions()
	{
		if(actionsPanelOn)
		{
			actionsPanelOn = false;
			divBetterLoopyActions.style.display = 'none';
			
			var currentClass = buttonActions.getAttribute('class');
			buttonActions.setAttribute('class', currentClass.replace(' yt-uix-button-active',''));
		}
	}

	//Returns Loop String for the video if any, or an empty string. 
	function FindRememberedLoopForVideo(iVideoID)
	{
		var lastRememberedString = GM_GlobalGetValue(GM_SAVE_LOOP_STATE,"");
		var index = lastRememberedString.indexOf(iVideoID);
		var outVideoLoopString = "";
		if(index >= 0)
		{
			var indexEnd = lastRememberedString.indexOf(";", index + 1);
			if(indexEnd < 0)
				indexEnd = lastRememberedString.length;
			outVideoLoopString = lastRememberedString.substring(index, indexEnd);
		}
		
		return {videoLoopString:outVideoLoopString, lastRememberedLoopString: lastRememberedString};
	}

	function getProperTime(stringTime)
	{
		if(trim(stringTime, " ") == "")
			return -1;
		var timeInSeconds = 0;
		var index = stringTime.indexOf(':');
		if(index < 0)
			timeInSeconds = parseInt(stringTime, 10);
		else
		{
			var time = stringTime.split(":");
			if(time.length == 2)
				timeInSeconds = parseInt(time[0]*60, 10) + parseInt(time[1], 10);
			else if(time.length == 3)
				timeInSeconds = parseInt(time[0]*3600, 10) + parseInt(time[1]*60, 10) + parseInt(time[2], 10);
		}
		if(isNaN(timeInSeconds))
			return 0;
		else 
			return timeInSeconds;
	}

	function playNext()
	{
		if(!extensionEnabled || !nextVideosEnabled)
			return false;
		
		if(timedLoopEnabled && $("txtEndTime") && trim($("txtEndTime").value) != "")
			return false;
			
		var retVal = false;
		var el = $('txtVideos');
		if(el && el.value != "")
		{
			log('Playing next video');
			
			var nextVideoId = el.value;
			var index = nextVideoId.indexOf(";");
			if(index>0)
			{
				nextVideoId = nextVideoId.substring(0,index);
				el.value = el.value.substring(index+1);
			}
			else
				el.value = "";
			watchString = isPopup ? "watch_popup" : "watch";
			var nextLocation = "http://www.youtube.com/"+ watchString +"?v="+nextVideoId;
			if(el.value.length > 1)
				nextLocation += "&nextVideos="+el.value;
			window.location = nextLocation;
			retVal = true;
		}
		return retVal;
	}

	function togglePlay()
	{
		if(ytObj)
		{
			state = ytObj.getPlayerState();
			if(state == STATE_PLAY)
				ytObj.pauseVideo();
			else if(state == STATE_PAUSE)
				ytObj.playVideo();
		}
	}
	
	function OnActionItemClick(obj)
	{
		HideActions();
		var id = obj.id;
		if(id == 'ActionItemSettings')
		{
			showSettings();
		}
		else if(id == 'ActionItemSendLoopedLink')
		{
			var textBox = $('idTextBoxDivSendLoopLink');
			if(textBox)
			{
				var loopString = "";
				//textBox.value = window.location.replace("#","");
				var txtStartTime = $('txtStartTime');
				var txtEndTime = $('txtEndTime');
				
				if(txtStartTime && txtStartTime.value != "")
					loopString += "&loopStart="+txtStartTime.value;
				if(txtEndTime && txtEndTime.value != "")
					loopString += "&loopEnd="+txtEndTime.value;
				if(loopString.length == 0)
				{
					alert('You are not looping a part of the video and can therefore send the whole link. :)');
					return;
				}
				
				textBox.value = window.location.href.replace("#","").replace("!","") + loopString;
				// textBox.focus();
				// textBox.select(); //why doesn't it work? 
				window.setTimeout(function() {textBox.focus();},0);
				window.setTimeout(function() {textBox.select();},0); //Why does it work? 
			}
			
			divSendLoopLink.style.display = 'block';
			
		}
		else if(id == 'ActionItemSetRepeatLimit')
		{
			limit = prompt("Enter the number of times the video should be looped");
			maxLoopLimit = parseInt(limit, 10);
			if(isNaN(maxLoopLimit))
			{
				maxLoopLimit = -1;
				return;
			}
		}
		else if(id == 'ActionItemRememberThisLoop')
		{
			var txtStartTime = $('txtStartTime');
			var txtEndTime = $('txtEndTime');
			var rememberString = videoID + ",";
			rememberString += txtStartTime.value + ",";
			rememberString += txtEndTime.value + ",";
			rememberString += ytLoop ? "1" : "0";
			if(rememberString.length > 0)
			{
				//Find the video first here. What if already stored? 
				//{videoLoopString:outVideoLoopString, lastRememberedLoopString: lastRememberedString}
				var out = FindRememberedLoopForVideo(videoID);
				if(out.videoLoopString.length > 0)
				{
					GM_GlobalSetValue(GM_SAVE_LOOP_STATE, out.lastRememberedLoopString.replace(out.videoLoopString, rememberString));
				}
				else
					GM_GlobalSetValue(GM_SAVE_LOOP_STATE, out.lastRememberedLoopString + rememberString + ";");
			}		
		}
		else if(id == 'ActionItemHideLoopyBar')
		{
			$('newLoopyDiv').style.display = 'none';
			if(watchPanelDiv)
			{
				var newPanelClass = trim(watchPanelDiv.className.replace("NoTopPadding"));
				if(newPanelClass.length > 0)
					watchPanelDiv.className = newPanelClass;
				else
					watchPanelDiv.removeAttribute("class");
			}
		}
	}
	
	
	
	//****************************************************All the main code ******************************************************************************
	//****************************************************************************************************************************************************
	//****************************************************************************************************************************************************
	//****************************************************************************************************************************************************
	
	//Create Config (settings) dialog and events. 
	CreateConfig();	
	
	//Read Config settings. 
	readConfigIntoBetterLoopy();

	//Get other prefs. 
	GM_GlobalSetValue('configDebug', debug);

	var singleButtonFloatLeft = GM_GlobalGetValue('singleButtonFloatLeft', false);
	GM_GlobalSetValue('singleButtonFloatLeft', singleButtonFloatLeft); //this will just write the value if not found. 

	//Make settings accessible. 
	if(isFirefox)
		GM_registerMenuCommand('Better Loopy for YouTube Settings', showSettings);

	isCosmicPanda = ($('masthead-nav') != null);
	var linksSection = $('masthead-sections') || $('masthead-nav');
	if(linksSection)
	{
		var settingsLink = create('a',[['href','#'],['click', function() {showSettings();}],['innerHTML','Better Loopy'],['class', 'split end ']]);
		var separator = create('span', [['class','masthead-link-separator'],['innerHTML', '|']]);

		splitLink = $('.split end', linksSection);
		// log("split link : " + splitLink);
		if(splitLink)
		{
			// splitLink.setAttribute('style','margin-right:0px !important');
			splitLink.removeAttribute('class');
			linksSection.insertBefore(settingsLink, splitLink.nextSibling);
		}
		else
		{
			linksSection.appendChild(separator);
			linksSection.appendChild(settingsLink);
		}
	}
	else if($('.guide-user-links'))
	{
		var ul = $('.guide-user-links');
		var settingsLink = create('a',[['href','#'],['click', function() {showSettings();}],['innerHTML','Better Loopy'],['class', 'guide-item']]);
		var li = create('li');
		li.appendChild(settingsLink);
		ul.appendChild(li);
	}
	
	
	//Install Keyboard hooks. 
	if(enableKeyboardShortcuts)
	{
		window.addEventListener('keyup', handleKeyPress, false);
		window.addEventListener('keydown', handleKeyDown, false);
	}


	//This does all the magic. 
	window.setTimeout(function() { initLoopy(); }, 500);
	
	//Add the CSS Styles. 
	AddCSSStyles();
	
	
	//Finally, check for updates. 
	if(typeof ScriptUpdater != 'undefined' && isFirefox)
	{
		ScriptUpdater.check(57971, version, onVersionCheck);
	}	
	

}//main



try
{
	main();
}
catch(ex)
{
	log("Uncaught Exception! " + ex.toString());
}