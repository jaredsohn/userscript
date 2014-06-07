// ==UserScript==
// @name           OGame Redesign: Fleet Contents
// @description    Shows the contents of the selected fleet on the second and third fleet dispatch pages
// @namespace      Vesselin
// @version        1.04
// @date           2012-11-24
// @author         Vesselin Bontchev
// @include        http://*.ogame.*/game/index.php?page=fleet1*
// @include        http://*.ogame.*/game/index.php?page=fleet2*
// @include        http://*.ogame.*/game/index.php?page=fleet3*
// ==/UserScript==

(function ()
{
	const atBottom = false;
	var url = document.location.href;
	var indices = new Array ();
	var index, name;
	if (url.indexOf ("page=fleet1") >= 0)
	{
		var mySpans = document.querySelectorAll ("div#buttonz li span.textlabel");
		for (var i = 0; i < mySpans.length; i++)
		{
			index = mySpans [i].parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute ("id").replace ("button", "am");
			name = mySpans [i].textContent.replace (/(^\s+|\s+$)/g, "");
			indices.push (index);
			localStorage.setItem (index, name);
		}
		localStorage.setItem ("shipIndexes", JSON.stringify (indices));
	}
	else if (((url.indexOf ("page=fleet2") >= 0) || (url.indexOf ("page=fleet3") >= 0)) && ! document.getElementById ("fleet1"))
	{
		function addDots (n)
		{
			n += '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test (n))
				n = n.replace (rgx, '$1' + '.' + '$2');
			return n;
		}
		indices = JSON.parse (localStorage.getItem ("shipIndexes"));
		var fleetContents = "";
		var first = true;
		for (var i = 0; i < indices.length; i++)
		{
			index = indices [i];
			name = localStorage.getItem (index);
			var nums = document.getElementsByName (index);
			if (nums.length > 0)
			{
				var numShips = nums [0].value;
				if (first)
					first = false;
				else
					fleetContents += ", ";
				fleetContents += name + ": " + addDots (numShips);
			}
		}
		fleetContents += ".";
		var myDiv  = document.createElement ("div");
		myDiv.className = "fleetDetails";
		myDiv.style.paddingLeft = "5px";
		myDiv.style.lineHeight = "14px";
		if (url.indexOf ("page=fleet3") >= 0)
			myDiv.style.marginTop = "0";
		myDiv.appendChild (document.createTextNode (fleetContents));
		if (atBottom || (url.indexOf ("page=fleet2") >= 0))
			document.getElementById ("inhalt").appendChild (myDiv);
		else
		{
			var buttonz = document.getElementById ("buttonz");
			buttonz.parentNode.insertBefore (myDiv, buttonz.nextSibling);
		}
	}
}) ();
