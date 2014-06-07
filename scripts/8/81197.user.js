// ==UserScript==
// @name           OGame Redesign: Additional Resource Loading Buttons
// @description    Buttons for "None" and "Reverse order" resource loading on the 3rd fleet dispatch page
// @namespace      Vesselin
// @version        1.04
// @date           2012-10-21
// @include        http://*.ogame.*/game/index.php?page=fleet3*
// ==/UserScript==

(function ()
{
	// The following "if" is not really necessary but with it this script will work for Opera too
	if (document.location.href.indexOf ("/game/index.php?page=fleet3") == -1)
		return;
	iconReverse = "data:image/gif;base64," +
		"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"
	document.getElementsByClassName = function (cl)
	{
		var retnode = [];
		var myclass = new RegExp ('\\b' + cl + '\\b');
		var elem = this.getElementsByTagName ('*');
		for (var i = 0; i < elem.length; i++)
		{
			var classes = elem [i].className;
			if (myclass.test (classes))
				retnode.push (elem [i]);
		}
		return retnode;
	}
	function addEvent (el, evt, fxn)
	{
		if (el.addEventListener)
			el.addEventListener (evt, fxn, false); // for standards
		else if (el.attachEvent)
			el.attachEvent ("on" + evt, fxn); // for IE
		else el ['on' + evt] = fxn; // old style, but defeats purpose of using this function
	}
	var myDiv, mySpan, originalButton;
	var theDiv = document.getElementById ("loadAllResources");
	var theMins = document.getElementsByClassName ("min");
	var myEvent = document.createEvent ("MouseEvents");
	myEvent.initMouseEvent ("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	var version5 = false;
	var meta = document.getElementsByName ("ogame-version");
	if (meta && meta.length)
	{
		var theVersion = meta [0].getAttribute ("content");
		if (theVersion !== undefined)
		{
			var versionMajor = theVersion.split (".");
			if (versionMajor.length >= 1)
				version5 = parseInt (versionMajor [0], 10) >= 5;
		}
	}
	/* Add a "load resources in reverse order" button */
	var myA = document.createElement ("a");
	if (version5)
	{
		myA.style.cssFloat = "left";
		myA.style.styleFloat = "left";
	}
	else
	{
		myDiv = document.createElement ("div");
		myDiv.style.position = "relative";
		myDiv.style.top = "-128px";
		myDiv.style.left = "140px";
	}
	myA.setAttribute ("href", "javascript:void(0);");
	addEvent (myA, "click", function (e)
	{
		for (var i = 0; i < theMins.length; i++)
			theMins [i].dispatchEvent (myEvent);
		var theMaxes = document.getElementsByClassName ("max");
		for (var i = theMaxes.length; i >= 1 ; i--)
			theMaxes [i - 1].dispatchEvent (myEvent);
	});
	var myImg = document.createElement ("img");
	myImg.setAttribute ("src", iconReverse);
	myA.appendChild (myImg);
	if (version5)
	{
		originalButton = document.getElementById ("allresources");
		originalButton.parentNode.insertBefore (myA, originalButton);
	}
	else
	{
		myDiv.appendChild (myA);
		theDiv.parentNode.insertBefore (myDiv, theDiv);
	}
	/* Add a "unload all loaded resources" button */
	if (version5)
	{
		mySpan = document.createElement ("span");
		mySpan.className = "send_none";
		mySpan.style.position = "absolute";
		mySpan.style.left = "35px";
	}
	else
	{
		myDiv = document.createElement ("div");
		myDiv.className = "send_none";
		myDiv.style.position = "relative";
		myDiv.style.top = "-160px";
		myDiv.style.left = "-95px";
	}
	myA = document.createElement ("a");
	myA.setAttribute ("href", "javascript:void(0);");
	addEvent (myA, "click", function (e)
	{
		for (var i = 0; i < theMins.length; i++)
			theMins [i].dispatchEvent (myEvent);
	});
	if (version5)
	{
		mySpan.appendChild (myA);
		originalButton.style.marginTop = "0";
		originalButton.parentNode.insertBefore (mySpan, originalButton);
	}
	else
	{
		myA.className = "tipsStandard";
		myDiv.appendChild (myA);
		theDiv.parentNode.insertBefore (myDiv, theDiv);
	}
}) ();
