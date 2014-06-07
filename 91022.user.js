// ==UserScript==
// @name           OGame Redesign: Distinção dos relatórios de espionagem
// @description    Distingue a amarelo os relatórios de espionagem
// @author         j0TTa bE
// @version        2.00
// @date           2012-01-25
// @include        http://*.ogame.*/game/index.php?page=messages*
// ==/UserScript==
(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=messages") == -1)
		return;
	var espAction = [
		"Espionage action",		// org, us
		"Acção de espionagem",		// pt
	];
	const espionageColor = "yellow";
	var myInterval;
	var isIE = (navigator.appName == "Microsoft Internet Explorer");
	function colorSubjects ()
	{
		/*
			Developed by Robert Nyman, http://www.robertnyman.com
			Code/licensing: http://code.google.com/p/getelementsbyclassname/
		*/	
		var getElementsByClassName = function (className, tag, elm)
		{
			if (document.getElementsByClassName)
			{
				getElementsByClassName = function (className, tag, elm)
				{
					elm = elm || document;
					var elements = elm.getElementsByClassName (className),
						nodeName = (tag)? new RegExp ("\\b" + tag + "\\b", "i") : null,
						returnElements = [],
						current;
					for (var i = 0, il = elements.length; i < il; i++)
					{
						current = elements [i];
						if (! nodeName || nodeName.test (current.nodeName))
							returnElements.push (current);
					}
					return returnElements;
				};
			}
			else if (document.evaluate)
			{
				getElementsByClassName = function (className, tag, elm)
				{
					tag = tag || "*";
					elm = elm || document;
					var classes = className.split (" "),
						classesToCheck = "",
						xhtmlNamespace = "http://www.w3.org/1999/xhtml",
						namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
						returnElements = [],
						elements,
						node;
					for (var j = 0, jl = classes.length; j < jl; j++)
						classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes [j] + " ')]";
					try
					{
						elements = document.evaluate (".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
					}
					catch (e)
					{
						elements = document.evaluate (".//" + tag + classesToCheck, elm, null, 0, null);
					}
					while ((node = elements.iterateNext ()))
						returnElements.push (node);
					return returnElements;
				};
			}
			else
			{
				getElementsByClassName = function (className, tag, elm)
				{
					tag = tag || "*";
					elm = elm || document;
					var classes = className.split (" "),
						classesToCheck = [],
						elements = (tag === "*" && elm.all) ? elm.all : elm.getElementsByTagName (tag),
						current,
						returnElements = [],
						match;
					for (var k = 0, kl = classes.length; k < kl; k++)
						classesToCheck.push (new RegExp ("(^|\\s)" + classes [k] + "(\\s|$)"));
					for (var l = 0, ll = elements.length; l < ll; l++)
					{
						current = elements [l];
						match = false;
						for (var m = 0, ml = classesToCheck.length; m<ml; m++)
						{
							match = classesToCheck [m].test (current.className);
							if (! match)
								break;
						}
						if (match)
							returnElements.push (current);
					}
					return returnElements;
				};
			}
			return getElementsByClassName (className, tag, elm);
		}
		var mailz = document.getElementById ("mailz");
		if (mailz == null)
			return;
		var subjects = getElementsByClassName ("subject", "td", mailz);
		for (var i = 0; i < subjects.length; i++)
		{
			var links = subjects [i].getElementsByTagName ("a");
			if (links.length < 1)
				continue;
			var theLink = links [0];
			var theHref = links [0].href;
			if (theHref.indexOf ("cat=4") >= 0)
			{
				for (j in espAction)
					if (theLink.textContent.indexOf (espAction [j]) >= 0)
					{
						theLink.style.color = espionageColor;
						break;
					}
			}
			else if (theHref.indexOf ("cat=8") >= 0)
				theLink.style.color = expeditionColor;
			else if (theHref.indexOf ("cat=6") >= 0)
				theLink.style.color = privateMessageColor;
		}
		if (isIE)
			clearInterval (myInterval);
	}
	if (isIE)
		myInterval = setInterval (colorSubjects, 10);
	else
		document.addEventListener ("DOMNodeInserted", colorSubjects, false);
}
) ();

