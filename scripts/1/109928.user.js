// ==UserScript==
// @name           XBW Troll Hider
// @namespace      http://forum.xboxworld.nl/
// @include        http://forum.xboxworld.nl/showthread.php?t=*
// @include        http://forum.xbw.nl/showthread.php?t=*
// ==/UserScript==

GM_registerMenuCommand("Prevent flicker", function() { GM_setValue("preventFlicker", true); });
GM_registerMenuCommand("Do not prevent flicker",  function() { GM_setValue("preventFlicker", false); });

if(GM_getValue("preventFlicker", true))
{
	document.body.style.visibility = "hidden";
}

var trolls = new Array("Daantjuhh14");

function initTrollHider()
{

	hideTrolls();

	var toggleButtonContainer = document.getElementById("threadtools_menu").childNodes[1].childNodes[1].childNodes[1];
	var toggleButtonTr = document.createElement("tr");

	var toggleButtonTd = document.createElement("td");
	    toggleButtonTd.className = "vbmenu_option vbmenu_option_alink";
	    toggleButtonTd.addEventListener("mouseover", function () { this.className = "vbmenu_hilite vbmenu_hilite_alink"; });
	    toggleButtonTd.addEventListener("mouseout", function () { this.className = "vbmenu_option vbmenu_option_alink"; });

	var toggleButtonImg = document.createElement("img");
	    toggleButtonImg.className = "inlineimg";
	    toggleButtonImg.alt = "Toggle trolls";
	    toggleButtonImg.src = "http://forum.xboxworld.nl/images/groen/subscribe.gif";
	    toggleButtonImg.title = "Toggle trolls";

	var toggleButtonA = document.createElement("a");
	    toggleButtonA.rel = "nofollow";
	    toggleButtonA.href = "javascript:void(0);";
	    toggleButtonA.addEventListener("click", toggleTrolls, "false");
	    toggleButtonA.innerHTML = "Toggle trolls";
	
	toggleButtonTd.appendChild(toggleButtonImg);
	toggleButtonTd.innerHTML += "\
		\
			";
	toggleButtonTd.appendChild(toggleButtonA);
	toggleButtonTr.appendChild(toggleButtonTd);
	toggleButtonContainer.appendChild(toggleButtonTr);

	if(GM_getValue("preventFlicker", true))
	{
		document.body.style.visibility = "visible";
	}
}

function hideTrolls()
{
	var postNames = getElementsByClassName("bigusername", "a");
	for(i = 0; i < postNames.length; i++)
	{
		if(array_contains(trolls, postNames[i].innerHTML))
		{
			if(GM_getValue("hideTrolls", true))
			{
				postNames[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
			}
			else
			{
				postNames[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "block";
			}
		}
	}
	var allPosts = getElementsByClassName("page", "div");
	for(i = 0; i < allPosts.length; i++)
	{
		if(allPosts[i].childNodes[1].childNodes[1].tagName != "DIV")
			continue;

		if(allPosts[i].childNodes[1].childNodes[1].childNodes[3].tagName != "TABLE")
			continue;

		if(allPosts[i].childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[0].title != "")
		{
			if(array_contains(trolls, allPosts[i].childNodes[1].childNodes[1].childNodes[3].childNodes[1].childNodes[4].childNodes[1].childNodes[1].childNodes[1].innerHTML))
			{
				if(GM_getValue("hideTrolls", true))
				{
					allPosts[i].parentNode.style.display = "none";
				}
				else
				{
					allPosts[i].parentNode.style.display = "block";
				}
			}		
		}
	}
}

function toggleTrolls()
{
	GM_setValue("hideTrolls", !GM_getValue("hideTrolls", true));
	hideTrolls();
}

function array_contains(a, b)
{
	for(var i = 0; i < a.length; i++) 
	{
		if(a[i] === b)
		      	return true;
	}
	return false;
}

function getElementsByClassName(query, tag)
{
	if(tag == null) tag = "*";
	var allElements = document.getElementsByTagName(tag);
	var foundElements = new Array();
	var regexp = new RegExp("\\b" + query + "\\b");
	for(i = 0; i < allElements.length; i++)
	{
		if(regexp.test(allElements[i].className))
		{
			foundElements.push(allElements[i]);
		}
	}	
	return foundElements;		
}

window.addEventListener("load", initTrollHider, false);