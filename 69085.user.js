// ==UserScript==
// @name           Translator
// @namespace      DSXC
// @description    Translate pages so anyone can read a site in their native language
// @include        http://*/*
// ==/UserScript==

var GoogleTranslate = 'http://ajax.googleapis.com/ajax/services/language/translate?v=1.0';
var AllText;
var CurrentText;
var Ready;
var Retry = false;

var Translating = false;

var SETTINGS = {
	all:  false,
	from: 'auto',
	to:   'en',
	auto: false,
	show: true
}

SETTINGS.all = DSXC_getValue('SETTINGS.all', false);
SETTINGS.from = DSXC_getValue('SETTINGS.from', 'auto');
SETTINGS.to = DSXC_getValue('SETTINGS.to', 'en');
SETTINGS.auto = DSXC_getValue('SETTINGS.auto', false);
SETTINGS.show = DSXC_getValue('SETTINGS.show', true);

function DSXC_setValue(name, value)
{
	if (SETTINGS.all || name == 'SETTINGS.all')
	{
		GM_setValue(name, value);
	}
	else
	{
		// use a cookie to store language (allows choice per site)
		var ExpiresInAYear = new Date();
		ExpiresInAYear.setDate(ExpiresInAYear.getDate() + 365);
		
		var CookieName = 'Trans_' + name;
		
		document.cookie = CookieName + "=" + escape(value) + ";expires=" + ExpiresInAYear.toUTCString();
	}
}

function DSXC_getValue(name, value)
{
	var DSXC_getValueReturn = value;
		
	if (SETTINGS.all || name == 'SETTINGS.all')
	{
		DSXC_getValueReturn = GM_getValue(name, value);
	}
	else
	{
		var CookieName = 'Trans_' + name;
		
		if (document.cookie.length > 0)
		{
			var StartPos = document.cookie.indexOf(CookieName);
			
			if (StartPos != -1)
			{
				var EndPos = document.cookie.indexOf(";", (StartPos + CookieName.length));
				
				if (EndPos == -1)
				{
					EndPos = document.cookie.length;
				}
				
				DSXC_getValueReturn = ValueDetail(typeof(value), unescape(document.cookie.substring((StartPos + CookieName.length + 1), EndPos)));
			}
		}
	}
	
	return DSXC_getValueReturn;
}

function ValueDetail(type, value)
{
	var ValueDetailReturn = '';
	
	switch (type)
	{
		case 'string':
		{
			ValueDetailReturn = value;
		} break;
		
		case 'boolean':
		{
			switch (value)
			{
				case 'true':
				{
					ValueDetailReturn = true;
				} break;
				
				case 'false':
				{
					ValueDetailReturn = false;
				} break;
			}
		} break;
		
		case 'number':
		{
			ValueDetailReturn = Number(value);
		}
	}
	
	return ValueDetailReturn;
}

var XMLHttpFactories = [
	function () { return new XMLHttpRequest() },
	function () { return new ActiveXObject("Msxml2.XMLHTTP") },
	function () { return new ActiveXObject("Msxml3.XMLHTTP") },
	function () { return new ActiveXObject("Microsoft.XMLHTTP") }
];

function DSXC_xmlHttpRequest(options)
{
	if (typeof(GM_xmlhttpRequest) == 'function')
	{
		GM_xmlhttpRequest(options);
	}
	// opera event
	else
	{
		var request = null;
		
		if (typeof(opera) == 'object' || options.url.indexOf(document.domain) == -1)
		{
	  	request = new opera.XMLHttpRequest();
		}
		else
		{
			for (var iCount = 0; iCount < XMLHttpFactories.length; iCount++)
			{
				try
				{
		  		request = XMLHttpFactories[iCount]();
		  	}
		  	catch(e)
		  	{
		  		continue;
		  	}
		  	// valid one found
		  	break;
		  }
		}
	  
	  if (request != null)
	  {
			request.onload = function() {
	     var response = {
	        responseText: request.responseText,
	        readyState: request.readyState,
	        responseHeaders: (request.readyState == 4 ? request.getAllResponseHeaders() : ''),
	        status: request.readyState == 4 ? request.status : 0,
	        statusText: request.readyState == 4 ? request.statusText : ''
	      };
	      
				options.onload(response);
			}
			
		  request.open(options.method, options.url, true);
		
		  // set the headers
		  for (var header in options.headers) {
		    request.setRequestHeader(header, options.headers[header]);
		  }
		  
		  // send the data
		  request.send(options.data);
		  return request;
		}
	}
}

function DSXC_log(text)
{
	if (typeof(GM_log) == 'function')
	{
		GM_log(text);
	}
	// opera event
	else if (typeof(opera) == 'object')
	{
		opera.postError(text);
	}
}

if (typeof(GM_registerMenuCommand) == 'function')
{
	GM_registerMenuCommand('Translator - Translate Page', DoTranslation);
	GM_registerMenuCommand('Translator - Select Language', SelectLanguage);
}

/************************ Drag n drop*******************************/
var IMAGE = {
	close:  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAAd0SU1FB9kFBAYMCW+DdHoAAAN1SURBVDjLXZNNTNt1AIaf37+ltEUGBVaKmEyGCIrMTGogUYgzBi4wFzDFxMTFQHZSonFk6UXNTAzJjAvRA+GAB8UEiJjwMTEjIEbctBOTNkBBvrYCK1DStbT/fv9/HhYP23t+nyfv5YXH0tvbm+fz+a6GwuE/ImrsfjQe3w9HIn+vrKz09ff3lwNMTU09CjmdTgAmJiY+CQQC8mhrU/puLciNX6bk2sRPcv3nSelz/SkP/H65uLj4A8DMzAwA4n/J6OjocEN9nSO65EHGokhNoiUTaMkkmWSCtKqSSCQoePUc8RP5qzUvVFeNjY2hPIRHuurtdkfw93nSoQc89XoTUtNIHOyTDBwgFIXT7W8TXfPi7f2M5NZ6pcvl+ratre3hgrX19UTsr4Usbd8vKi69T47JBEJw59PLRDbWeO37cVKpJGoqzUiZhXg8RfPiv7hu3y7Wzc3NNZQUFXUdTo8LYlFWJ8fIq28gx2Si5FwTJa1vEQ6FCKkxZi9eoMC/jRGJvupFTp2tDehLS0vPxu7vkj7c58h9h/TdVeZ/u0HDjBsFSKfTiCwDy53NnNle5viEgXBSI73llZY3musUKaVZAIFbv5L0bZCrl1R/cAVN00ilUiiKgk5qPH/5Cyy5eqy5OgrNOgzZ2SLLYNArXq83Yn2umuD2DgY9lF7/Dsv5d9AJQTwaYdP9D6FQiIitjNg3s5iLT2LSaeTX1nEcDoeUgYGBDV22keLW84hsI/6sJ1DQ2PPdg4+aqPrqXXZXl7BYLIhCG8EsM8G8k1Q2teB2u+8JgKGhIflmS4ucfPlpUahL8uBiD5U3B6gwpBACohlwv/clRSPXMO5uol2fxlh6ir6+PrsOwGw2Z1XX1DTWdl/BO32DovkfMekUYhlBLANpqWBZGGcvmib44dfkP1Mll5eWXN3d3Vd1AG63e9ZkMrVmm3OebP38GsflZ/BHkgTUFIc6M/7iCu7WXyDd0Y05v0Cqqhrt6el5yeFwxAVATU0NHo+H9vb2Ybvd7mhsbJRlp8uFMScHVVUJHh2x5l2RUkqhquqK0+l8ZWdnJyiEQA/g8XgAsNlsXfPz83t7e3uXrFar2WazYTQaiUQiuFyuTDgcnj4+Pv54d3c3KIR49EwdHR0MDw8D0NnZaQkGg89Go1FbJpPBaDQeWq3W9cHBwYPHu/8B/IeoYeNzxNQAAAAASUVORK5CYII='
}

function CreatePopupWindow(name, w, h, display)
{
	if (display == null) display = true;
	
	if (document.getElementById(name + '_Message') == null)
	{
		if (display)
		{
			var CloseButton = "<A HREF='#' ID='" + name + "_Close'><IMG SRC='" + IMAGE.close + "' border='0' TITLE='Close' ALT='X' /></A>";
			var PopupWindow = document.createElement("div");
			
			var WindowPosition = DSXC_getValue("Position" + name, "90px_300px");
			WindowPosition = WindowPosition.split("_");
			
			PopupWindow.style.position = 'absolute';
			PopupWindow.style.top = WindowPosition[0];
			PopupWindow.style.left = WindowPosition[1];	
			
			PopupWindow.id = name + "_Message";
			PopupWindow.innerHTML = "<DIV STYLE='position:absolute; z-index:100; background: white; padding: 0px 0px; color: black; border: 1px solid; font:10pt Verdana; width: " + w + "px; height: " + h + "px;'><DIV ID='" + name + "_Titlebar' STYLE='background: navy; color: white; cursor:move; font-weight: bold'>&nbsp;" + name + " <DIV STYLE='position:absolute; right:0px; top: 0px'>" + CloseButton + "</DIV></DIV><DIV ID='" + name + "' STYLE='padding: 5px 5px; text-align: left; overflow: auto; height: " + (h - 26) + "px;'></DIV></DIV>";
			
			document.body.appendChild(PopupWindow);
			
			makeDraggable(document.getElementById(name + '_Titlebar'));
			document.getElementById(name + '_Close').addEventListener("mousedown", function() { document.getElementById(name + '_Message').parentNode.removeChild(document.getElementById(name + '_Message')) }, false);
			
			return document.getElementById(name);
		}
	}
	else
	{
		document.getElementById(name + '_Message').parentNode.removeChild(document.getElementById(name + '_Message'));
	}
		
	return null;
}

var mouseOffset = null;
var iMouseDown  = false;
var lMouseState = false;
var dragObject  = null;
var curTarget   = null;

function mouseCoords(ev)
{
	return { x: ev.pageX, y: ev.pageY };
}

function makeClickable(object)
{
	object.onmousedown = function()
	{
		dragObject = this;
	}
}

function getMouseOffset(target, ev)
{
	var docPos = getPosition(target.parentNode);
	var mousePos = mouseCoords(ev);
	
	return { x:mousePos.x - docPos.x, y:mousePos.y - docPos.y };
}

function getPosition(e)
{
	var left = 0;
	var top  = 0;
	
	while (e.offsetParent)
	{
		left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		e     = e.offsetParent;
	}
	
	left += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
	top  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
	
	return { x:left, y:top };
}

function mouseMove(ev)
{
	var target   = ev.target;
	var mousePos = mouseCoords(ev);

	if (dragObject)
	{
		dragObject.parentNode.style.position = 'absolute';
		dragObject.parentNode.style.top      = Math.max(0, (mousePos.y - mouseOffset.y)) +"px";
		dragObject.parentNode.style.left     = Math.max(0, (mousePos.x - mouseOffset.x)) +"px";
	}
	
	lMouseState = iMouseDown;
	return false;
}

function mouseUp(ev)
{
	if (dragObject != null)
	{
		if (dragObject.parentNode.id.indexOf('_Message') != -1)
		{
			var item_name = dragObject.parentNode.id.substring(0, dragObject.parentNode.id.indexOf('_Message'));
			DSXC_setValue("Position" + item_name, dragObject.parentNode.style.top + "_" + dragObject.parentNode.style.left);
		}
		
		dragObject = null;
	}
	
	iMouseDown = false;
}

function mouseDown(ev)
{
	var mousePos = mouseCoords(ev);
	var target = ev.target;
	
	iMouseDown = true;	
	
	if (target.getAttribute('DragObj'))
	{
		return false;
	}	
}

function makeDraggable(item)
{
	if (!item) return;
	
	item.addEventListener("mousedown",
		function(ev)
		{
			dragObject = this.parentNode;
			mouseOffset = getMouseOffset(this.parentNode, ev);
			return false;
		},
		false);
}

document.addEventListener("mousemove", mouseMove, false);
document.addEventListener("mousedown", mouseDown, false);
document.addEventListener("mouseup", mouseUp, false);

document.addEventListener("keydown", HotKey, false);

function Get(url, callback)
{
	try
	{
		DSXC_xmlHttpRequest({
			method: 'GET',
			url: url, 
			onload: function(result) { callback(result); }
		});
	}
	catch (ex)
	{
		DSXC_log(ex);
	} 
}

function SelectLanguage()
{
	var ConfigWindow = CreatePopupWindow('Configuration', 210, 250);
	
	if (ConfigWindow != null)
	{
		var LanguagesAvailable = '<option value="auto">Automatic</option><option value="af">Afrikaans</option><option value="sq">Albanian</option><option value="ar">Arabic</option><option value="be">Belarusian</option><option value="bg">Bulgarian</option><option value="ca">Catalan</option><option value="zh-CN">Chinese</option><option value="hr">Croatian</option><option value="cs">Czech</option><option value="da">Danish</option><option value="nl">Dutch</option><option value="en">English</option><option value="et">Estonian</option><option value="tl">Filipino</option><option value="fi">Finnish</option><option value="fr">French</option><option value="gl">Galician</option><option value="de">German</option><option value="el">Greek</option><option value="ht">Haitian Creole ALPHA</option><option value="iw">Hebrew</option><option value="hi">Hindi</option><option value="hu">Hungarian</option><option value="is">Icelandic</option><option value="id">Indonesian</option><option value="ga">Irish</option><option value="it">Italian</option><option value="ja">Japanese</option><option value="ko">Korean</option><option value="lv">Latvian</option><option value="lt">Lithuanian</option><option value="mk">Macedonian</option><option value="ms">Malay</option><option value="mt">Maltese</option><option value="no">Norwegian</option><option value="fa">Persian</option><option value="pl">Polish</option><option value="pt">Portuguese</option><option value="ro">Romanian</option><option value="ru">Russian</option><option value="sr">Serbian</option><option value="sk">Slovak</option><option value="sl">Slovenian</option><option selected="selected" value="es">Spanish</option><option value="sw">Swahili</option><option value="sv">Swedish</option><option value="th">Thai</option><option value="tr">Turkish</option><option value="uk">Ukrainian</option><option value="vi">Vietnamese</option><option value="cy">Welsh</option><option value="yi">Yiddish</option>';
		
	  ConfigWindow.innerHTML = "<TABLE HEIGHT='100%'><TR><TD WIDTH='200'>Translate From:</TD></TR><TR><TD WIDTH='200'><SELECT ID='FromLanguage'>" + LanguagesAvailable + "</SELECT></TD></TR><TR><TD WIDTH='200'>Translate To:</TD></TR><TR><TD WIDTH='200'><SELECT ID='ToLanguage'>" + LanguagesAvailable + "</SELECT></TD></TR><TR><TR><TD WIDTH='200'>All Sites:</TD><TD WIDTH='200'><INPUT TYPE='Checkbox' ID='All_Sites'></TD></TR><TR><TD WIDTH='200'>Automatic:</TD><TD WIDTH='200'><INPUT TYPE='Checkbox' ID='Automatic_Translate'></TD></TR><TR><TD WIDTH='200'>Show Progress:</TD><TD WIDTH='200'><INPUT TYPE='Checkbox' ID='Show_Progress'></TD></TR></TABLE>";

		document.getElementById('FromLanguage').value = SETTINGS.from;
		document.getElementById('ToLanguage').value = SETTINGS.to;
		document.getElementById('All_Sites').checked = SETTINGS.all;
		document.getElementById('Automatic_Translate').checked = SETTINGS.auto;
		document.getElementById('Show_Progress').checked = SETTINGS.show;

		document.getElementById('FromLanguage').addEventListener('change', function () { SETTINGS.from = document.getElementById('FromLanguage').value; DSXC_setValue('SETTINGS.from', SETTINGS.from); }, true);
		document.getElementById('ToLanguage').addEventListener('change', function () { SETTINGS.to = document.getElementById('ToLanguage').value; DSXC_setValue('SETTINGS.to', SETTINGS.to); }, true);
		document.getElementById('All_Sites').addEventListener('click', function () { SETTINGS.all = !SETTINGS.all; DSXC_setValue('SETTINGS.all', SETTINGS.all); }, true);
		document.getElementById('Automatic_Translate').addEventListener('click', function () { SETTINGS.auto = !SETTINGS.auto; DSXC_setValue('SETTINGS.auto', SETTINGS.auto); }, true);
		document.getElementById('Show_Progress').addEventListener('click', function () { SETTINGS.show = !SETTINGS.show; DSXC_setValue('SETTINGS.show', SETTINGS.show); }, true);
	}
}

function DoTranslation()
{
	Translating = !Translating;
	
	if (Translating)
	{
		Initialise();
	}
	else
	{
		Finished();
	}
}

function Initialise()
{
	AllText = document.evaluate('.//text()[normalize-space(.) != ""]', document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	CurrentText = 0;
	Ready = true;
	Retry = false;
	
	if (SETTINGS.show && document.getElementById('DSXC-Translation') == null)
	{
		var CloseButton = "<A HREF='#' ID='DSXC-Translation-Close'><IMG SRC='" + IMAGE.close + "' border='0' TITLE='Cancel Translation' ALT='X' /></A>";
		var TranslationStatus = document.createElement('div');
		
		TranslationStatus.id = 'DSXC-Translation';
		TranslationStatus.style.padding = '5px';
		TranslationStatus.style.height = '15px';
		TranslationStatus.style.borderBottom = '2px solid black';
		TranslationStatus.style.backgroundColor = 'LightBlue';
		TranslationStatus.style.color = 'MidnightBlue';
		TranslationStatus.style.verticalAlign = 'middle';
		TranslationStatus.innerHTML = '<div id="DSXC-Translation-Status" style="float: left; width: 33%; text-align: left">Translating</div><div id="DSXC-Translation-Item" style="float: left; width: 34%; text-align: center"></div><div style="float: right; width: 33%; text-align: right">' + CloseButton + '</div>';
		
		document.body.insertBefore(TranslationStatus, document.getElementsByTagName('body')[0].firstChild);
		
		document.getElementById('DSXC-Translation-Close').addEventListener("mousedown", DoTranslation, false);
		
		setTimeout(StatusUpdate, 500);
	}
	
	Translate();
}

var PageTimeout;

function TranslationTimeout()
{
	DSXC_log('Timeout... retrying');
	Ready = true; 
}

function Translate()
{
	var URL;
	var Node = AllText.snapshotItem(CurrentText);
	
	if (Node != null && Node.data.length > 0 && Node.nodeType == 3)
	{
		if (Ready)
		{
			var TranslationItem = document.getElementById('DSXC-Translation-Item');
			
			if (TranslationItem != null)
			{
				if (Node.data.length > 30)
				{
					TranslationItem.innerHTML = Node.data.substring(0, 30) + '...';
				}
				else
				{
					TranslationItem.innerHTML = Node.data;
				}
			}
			
			PageTimeout = setTimeout(TranslationTimeout, 2000);
			
			Ready = false;
			URL = GoogleTranslate + '&langpair=' + SETTINGS.from + '|' + SETTINGS.to + '&q=' + Node.data;
				
			Get(URL, function(result) {
				clearTimeout(PageTimeout);
				
				if (result.status == 200)
				{ 
					eval("var TranslationData = " + result.responseText);

					if (TranslationData.responseData != null)
					{
						var Detail = TranslationData.responseData.translatedText;
	
						if (Detail != null && Node.data != Detail)
						{
							Node.data = ' ' + Detail;
						}
					}
				}
				
				CurrentText++;
				Ready = true;
			});
		}
	}
	else
	{
		CurrentText++;
	}
	
	if (Translating && CurrentText < AllText.snapshotLength)
	{
		setTimeout(Translate, 20);
	}
}

function Finished()
{
	var TranslationStatus = document.getElementById('DSXC-Translation');
	
	if (TranslationStatus != null)
	{
		TranslationStatus.parentNode.removeChild(TranslationStatus);
	}
}

function StatusUpdate()
{
	var TranslationStatus = document.getElementById('DSXC-Translation-Status');
	
	if (TranslationStatus != null)
	{
		if (CurrentText < AllText.snapshotLength)
		{
			if (TranslationStatus.innerHTML.indexOf('.....') != -1)
			{
				TranslationStatus.innerHTML = 'Translating';
			}
			else
			{
				TranslationStatus.innerHTML = TranslationStatus.innerHTML + '.';
			}
		
			setTimeout(StatusUpdate, 500);
		}
		else
		{
			Finished();
		}
	}
}

function HotKey(e)
{
	if (e.altKey && e.ctrlKey)
	{
		switch (e.keyCode)
		{
			// 'T'
			case 84:
			{
				DoTranslation();
			} break;

			// 'L'
			case 76:
			{
				SelectLanguage();
			} break;
		}		
	}
}

if (SETTINGS.auto)
{
	DoTranslation();
}
