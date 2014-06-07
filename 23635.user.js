// ==UserScript==
// @name           Custoogle
// @namespace      http://www.google.tld
// @include        http://www.google.tld/*
// ==/UserScript==

/* User Commands */

GM_registerMenuCommand("Show Reader Button", function() { GM_setValue('readerBtn', true); doItAll(); });
GM_registerMenuCommand("Hide Reader Button", function() { GM_setValue('readerBtn', false); reloadPage() });

GM_registerMenuCommand("Show iGoogle Button", function() { GM_setValue('igoogleBtn', false); reloadPage() });
GM_registerMenuCommand("Hide iGoogle Button", function() { GM_setValue('igoogleBtn', true); doItAll(); });

GM_registerMenuCommand("Show Google Spam", function() { GM_setValue('googleSpam', false); reloadPage() });
GM_registerMenuCommand("Hide Google Spam", function() { GM_setValue('googleSpam', true); doItAll(); });

function reloadPage()
{
	window.location = window.location;
}

function doItAll()
{
	var readerBtn = GM_getValue('readerBtn', true);
	var igoogleBtn = GM_getValue('igoogleBtn', true);
	var googleSpam = GM_getValue('googleSpam', true);

	/* Add Reader button */
	
	if(readerBtn)
	{
		setTimeout(function() {
			var gbar = document.getElementById("gbar");
			var gbi = document.getElementById("gbi");
			
			var g3item;
			
			for(var i = 0; i < gbar.firstChild.childNodes.length; i++)
			{
				var gitem = gbar.firstChild.childNodes[i];
				
				if(gitem.className == "gb3")
				{
					for(var j = 0; j < gbi.childNodes.length; j++)
					{
						var bitem = gbi.childNodes[j];
						
						if(bitem.text == "Reader")
						{
							bitem.className = "gb1";
							
							gbi.removeChild(bitem);
							gbar.firstChild.insertBefore(bitem, gitem);
							break;
						}
					}
					break;
				}		
			}}, 500);
	}

	/* Remove iGoogle Button */
	
	if(igoogleBtn)
	{	
		setTimeout(function() {
			var guser = document.getElementById("guser");
		
			for(var i = 0; i < guser.firstChild.childNodes.length; i++)
			{
				var gitem = guser.firstChild.childNodes[i];
			
				if(gitem.text == "iGoogle")
				{
					var txtAfter = guser.firstChild.childNodes[i + 1];
						
					guser.firstChild.removeChild(txtAfter);		
					guser.firstChild.removeChild(gitem);
				}	
			}}, 500);
	}
		
	/* Remove Google Spam */
	
	if(googleSpam)
	{	
		setTimeout(function() {
			var gspam = document.getElementsByTagName("font");
			
			for(var i = 0; i < gspam.length; i++)
			{
				if(gspam[i].size == "-1" && gspam[i].parentNode.nodeName == "CENTER")
				{
					gspam[i].style.display = "none";
				}
				else if(gspam[i].size == "-2" && gspam[i].innerHTML == "©2008 Google")
				{
					gspam[i].style.display = "none";
				}
			}}, 500);
	}
}

doItAll();