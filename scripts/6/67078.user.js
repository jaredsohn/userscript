// ==UserScript==
// @name		www.kafic.net Admin script by Japanac
// @namespace		http://www.kafic.net
// @description		Helps and improves admin tasks
// @version		1.0
// @include		http://www.kafic.net/*
// @copyright		2009, Copyrighted parts may not be reproduced without written consent
// ==/UserScript==


var page = String(location.href);

function FindByXPath(obj,xpath)
{
	try 
	{ 
		var q=document.evaluate(xpath,obj,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null);
	}
	catch(e) {}
	if(q && q.singleNodeValue) return q.singleNodeValue;
	return null; //else
}

//auto-investigate button
if (page.match('system-admin/complaint/'))
{
	var button = FindByXPath(document,".//input[@value='Investigate']");
	if(button != null) button.click(); 
}

//auto activate nicks, i.e. if nick is passive, change it to active
if (page.match('system-admin/user/'))
{
	var status = FindByXPath(document,".//select[@name='account_status']");
	if(status.selectedIndex == 0 && confirm("Auto-activate user?")) 
	{
		status.selectedIndex = 1;
		var ok = FindByXPath(document,".//input[@name='submit']");	
		ok.click();
	}
}

//auto-click "Ok za Online"

if (page.match('system-admin/latest/userpics/'))
{
	try
	{
		var radios = document.evaluate("//input[@value='online']",document,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
		while(true)
		{
			var radio = radios.iterateNext();
			if(radio != null) radio.click();
			else break;
		}
		var images = document.evaluate("//a[@target='vote_pop']",document,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null);
		while(true)
		{
			var image = images.iterateNext();
			if(image != null) window.open(image.href,"_blank");
			else break;
		}
	}	
	catch(e) {}
}
