// ==UserScript==
// @name           Happy New Year Logo
// @namespace      qdscripter
// @description    Happy New Year Logo for board.ogame.ru
// @include        http://board.ogame.ru/*
// ==/UserScript==


function SameText(s1, s2)
{
	return (s1 == null) ? (s2 == null) : ((s2 == null) ? false : (s1.toUpperCase() == s2.toUpperCase()));
}

function SelectChildNode(parent, nodeTag, attrName, attrValue, nodeNum)
{
	if (parent == null) return null;
	var child = parent.firstChild;
	while (child != null)
	{
		var node = child;
		child = child.nextSibling;
		if (nodeTag != null && !SameText(node.tagName, nodeTag)) continue;
		if (attrName != null && !SameText(node.getAttribute(attrName), attrValue)) continue;
		if (nodeNum != null && --nodeNum > 0) continue;
		return node;
	}
	return null;
}

function SkinIsDark()
{
	var node = document;
	node = SelectChildNode(node, "html", null, null, null);
	node = SelectChildNode(node, "head", null, null, null);
	node = SelectChildNode(node, "link", "rel", "stylesheet", 2);
	if (node == null) return false;
	return node.getAttribute("href") == "http://board.ogame.ru/wcf/style/style-14.css";
}

function ValidateLogo(logo)
{
	if (logo == null || logo.match(/^snow[0-8]$/) == null)
	{
		return "snow4";
	}
	return logo;
}

function GetLogoSource(logo)
{
	var sources;
	if (SkinIsDark())
	{
		sources =
		{
			"snow1": "http://www.abload.de/img/newlast27fw3.png",
			"snow2": "http://www.abload.de/img/logo61rj9.png",
			"snow3": "http://www.abload.de/img/logo1gpti.png",
			"snow4": "http://www.abload.de/img/logo2xr40.png",
			"snow5": "http://s15.radikal.ru/i188/0909/75/1f42f6b9361a.png",
			"snow6": "http://www.abload.de/img/logo5yqur.png",
			"snow7": "http://s56.radikal.ru/i154/0909/b8/7c74824ca6d1.png",
			"snow8": "http://www.abload.de/img/logo33p2d.png",
			"snow0": "http://board.ogame.ru/wcf/images/ogameOldDesign/logo.png",
		};
	}
	else
	{
		sources =
		{
			"snow1": "http://www.abload.de/img/logo1seop.png",
			"snow2": "http://www.abload.de/img/logo2gcqc.png",
			"snow3": "http://www.abload.de/img/logo33hwf.png",
			"snow4": "http://www.abload.de/img/logo4pew5.png",
			"snow5": "http://i004.radikal.ru/0909/d5/98b80972a78e.png",
			"snow6": "http://www.abload.de/img/logo5aeus.png",
			"snow7": "http://s46.radikal.ru/i113/0909/b1/d93d24adf586.png",
			"snow8": "http://www.abload.de/img/logo68cnd.png",
			"snow0": "http://www.abload.de/img/logo_smallug62.png",
		};
	}
	return sources[ValidateLogo(logo)];
}

function SelectLogo(logo)
{
	var src = GetLogoSource(logo);
	if (src == null) return;
	var node = document;
	node = SelectChildNode(node, "html", null, null, null);
	node = SelectChildNode(node, "body", null, null, null);
	node = SelectChildNode(node, "div", "id", "headerContainer", null);
	node = SelectChildNode(node, "div", "id", "header", null);
	node = SelectChildNode(node, "div", "id", "logo", null);
	node = SelectChildNode(node, "div", "class", "logoInner", null);
	node = SelectChildNode(node, "a", "class", "pageLogo", null);
	node = SelectChildNode(node, "img", "title", "OGame Russia", null);
	if (node == null) return;
	node.setAttribute("src", src);
}

function SavedLogo()
{
	var cookieJar = document.cookie.split("; ");
	for (var x = 0; x < cookieJar.length; x++)
	{
		var oneCookie = cookieJar[x].split("=");
		if (oneCookie[0] == "savedlogo")
		{
			return oneCookie[1];
		}
	}
	return null;
}

SelectLogo(SavedLogo());