// ==UserScript==
// @name           One.lt free
// @author         NoTriX
// @namespace      http://www.one.lt
// @description    Free your one.lt from adds
// @include        http://w*.one.lt/*
// @exclude        http://*.one.lt/checkThemeAvailability.do*
// @email          notrix@gmail.com
// @version        1.2 BETA
// ==/UserScript==

Utilss = new Object();

Utilss.getElementsByXPath = function(expression, node){
  if (!node) { node = document; }
  var result = new Array();
  var xpathResult;
  var nsResolver = node.createNSResolver( node.ownerDocument == null ? node.documentElement : node.ownerDocument.documentElement);
  xpathResult = node.evaluate(expression, node, nsResolver, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);

  var node;
  while (node = xpathResult.iterateNext()){
    result.push(node);
  }
  return result;
}

var EventManager =
{
    _registry: null,

    Initialise: function()
    {
        if (this._registry == null)
        {
            this._registry = [];
            EventManager.Add(window, "unload", this.CleanUp);
        }
    },

    Add: function(obj, type, fn, useCapture)
    {
        this.Initialise();

        // If a string was passed in, it's an id.
        if (typeof obj == "string")
            obj = document.getElementById(obj);
        if (obj == null || fn == null)
            return false;

        // Mozilla/W3C listeners?
        if (obj.addEventListener)
        {
            obj.addEventListener(type, fn, useCapture);
            this._registry.push({obj: obj, type: type, fn: fn, useCapture: useCapture});
            return true;
        }

        // IE-style listeners?
        if (obj.attachEvent && obj.attachEvent("on" + type, fn))
        {
            this._registry.push({obj: obj, type: type, fn: fn, useCapture: false});
            return true;
        }
        return false;
    },
};

function kill(array)
{
	if (array.length > 0)
	{
		for (var i = 0; i < array.length; i++)
		{
			if (array[i].nodeName == "IFRAME") { array[i].src = ""; }
			else if (array[i].nodeName == "IMG") { array[i].parentNode.innerHTML = ""; }
			else if (array[i].nodeName == "H2") { array[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML = ""; }
			else array[i].innerHTML = "";
		}
	}
}

function killVideoGagaPopUp()
{
    var element = document.getElementById("page-body");
    //element.onclick = new Function(); // TODO: remove onclick event from element
}

function deleteCookie() {
	var date = new Date();
	date.setTime(date.getTime()-9999);
	var expires = "; expires="+date.toGMTString();
	document.cookie = "onefreeskin="+expires+"; path=/";
}

function finish()
{
	var logo = Utilss.getElementsByXPath('//div[contains(@class, "labelOne")]');
	logo[0].style.backgroundImage = "url(http://kambariai.puslapiai.lt/one_139x65.png)";
	var footer = Utilss.getElementsByXPath('//a[contains(@href, "reklama.one.lt")]');
	for(var i = 0; i < footer.length-1; i++)
	{
		footer[i].innerHTML = "";
		footer[i].href = "";
	}
	footer[footer.length-1].innerHTML = "<b style=\"color: red\">one.lt Lite by NoTriX</b>";
	footer[footer.length-1].href = "mailto:wampires@hotmail.com";
	if (readCookie())
	{
		var skinremove = document.getElementById("headerLangSwitch");
		var atag = document.createElement("A");
		atag.href = "javascript:void(0);";
		EventManager.Add(atag,'click',function(e) {
			deleteCookie();
			window.location.reload();
		});
		ptag = document.createElement("em");
		ptag.appendChild(document.createTextNode("Isjungti skina!"));
		atag.appendChild(ptag);
		skinremove.appendChild(atag);
	}
}

function killAds()
{
	kill(Utilss.getElementsByXPath('//iframe[contains(@src, "http")]'));
	kill(Utilss.getElementsByXPath('//div[contains(@id, "banner")]'));
	kill(Utilss.getElementsByXPath('//div[contains(@id, "Banner")]'));
	kill(Utilss.getElementsByXPath('//td[contains(@id, "banner")]'));
	kill(Utilss.getElementsByXPath('//td[contains(@id, "Banner")]'));
	kill(Utilss.getElementsByXPath('//div[contains(@class, "videoFrameContainer")]'));
	kill(Utilss.getElementsByXPath('//img[contains(@src, "banners")]'));
        kill(Utilss.getElementsByXPath('//img[contains(@alt, "Nestoviu")]'));
	kill(Utilss.getElementsByXPath('//h2[contains(@class, "phAdbox")]'));
}

function readCookie() {
	var nameEQ = "onefreeskin=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function setSkin()
{
	var urlas = document.location + ' ';
	if ((urlas.indexOf('createMyThemes') < 0) && (urlas.indexOf('community.ownmythemecreate.page') < 0))
	{
		for( var i = 0; i < document.getElementsByTagName('link').length; i++ )
		{
			if ((document.getElementsByTagName('link')[i].rel == "stylesheet") && (readCookie()))
			{
				document.getElementsByTagName('link')[i].href = readCookie();
			}
		}
	}
}

function skinHack()
{
	var urlas = document.location + ' ';
	if (urlas.indexOf('ownmycustomthemecreate') > 0)
	{
		for( var i = 0; i < document.getElementsByTagName('link').length; i++ )
		{
			if (document.getElementsByTagName('link')[i].rel == "stylesheet")
			{
				if (confirm("Ar nustatyti si skina kaip numatytaji?"))
				{
					document.cookie = "onefreeskin="+document.getElementsByTagName('link')[i].href+"; path=/";
				}
			}
		}
	}
	var ptag, atag, parent, tkn, themeid, res;
	var xhttp = new XMLHttpRequest();
	var temos = Utilss.getElementsByXPath('//a[contains(@onclick, "checkThemeAvailability.do")]');
	if (temos.length > 0)
	{
		for (var i = 0; i < temos.length; i++)
		{
			parent = temos[i].parentNode;
			tkn = Math.floor((9999-1110)*Math.random()) + 1111;
			themeid = temos[i].childNodes[0].id.replace(/labelTheme-/, "");
			urlas = "/checkThemeAvailability.do?tkn=" + tkn + "&st.id=community.ownbriefthemes.page&themeId=" + themeid;
			atag = document.createElement("A");
			atag.href = "javascript:void(0);";
			atag.rel = urlas;
			EventManager.Add(atag,'click',function(e) {
				xhttp.open("GET", this.rel, false);
				xhttp.send(null);
				if (xhttp.readyState == 4) { 
					res = xhttp.responseText;
					tkn = res.indexOf("text/css") + 16;
					urlas = res.indexOf("CSS");
					urlas = res.substr(tkn,urlas-tkn+3);
					document.cookie = "onefreeskin="+urlas+"; path=/";
					setSkin();
				}
			});
			ptag = document.createElement("P");
			ptag.style.cssText = "margin: 0px; padding-top: 5px;";
			ptag.appendChild(document.createTextNode("Ijungti skina!"));
			atag.appendChild(ptag);
			parent.appendChild(atag);
		}
	}
}

function enlargePhoto()
{
	var urlas = document.location + ' ';
	if (urlas.indexOf('viewPhoto.do') > 0)
	{
		var img = Utilss.getElementsByXPath('//img[contains(@src, "photoId")]')[0];
		img.src = img.src.replace('photoType=1','photoType=0');
		if (parseInt(navigator.appVersion)>3) top.resizeTo(1050,820);
	}
}

function main()
{
	killAds();
	killVideoGagaPopUp();
	skinHack();
	setSkin();
	enlargePhoto();
	finish();
}

main();