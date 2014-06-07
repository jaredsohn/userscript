// ==UserScript==
// @name          PTRGenius - Donkeymails
// @author        Miku
// @include	     http://www.donkeymails.com/pages/inbox.php*
// @include	     http://www.donkeymails.com/pages/ptc.php*
// @include	     http://www.donkeymails.com/pages/pointptc.php*
// @include	     http://www.donkeymails.com/scripts/runner.php?IM=*
// @description	  Auto-click bot for Donkeymails
// ==/UserScript==


var INTERVAL = 12000;
var ty = document.links;
var popup, popup2;
var sString = "runner.php?EA=";

for(var i=0; i < ty.length; i++)
{
	if(ty[i].getAttribute('href') == 'http://www.donkeymails.com/pages/cblackjack.php')
	{
		var j = i + 3;	
	}
}

if(document.title == "Message")	
{
	for(k=2; k < ty.length; k++)
	{
		hsplt = ty[k].href.split(sString);
		if(hsplt[0] == 'http://www.donkeymails.com/scripts/')		
		break;
	}
	popup2 = window.open(ty[k].href);						
	window.setTimeout(
		function()
		{
			popup2.close();
			self.close();
		},
		INTERVAL
	)
	
}
else if(document.location.href == "http://www.donkeymails.com/pages/inbox.php")
{
	if(ty[j].getAttribute('target') != '_inbox')
	{
		document.location.href = "http://www.donkeymails.com/pages/ptc.php";
	}
	else if(ty[j].getAttribute('target') == '_inbox')
	{
		popup = window.open(ty[j]);
		
		window.setTimeout(
			function()
			{	
				allchecks = document.evaluate('//input[@type="checkbox"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);	
				thisLink = allchecks.snapshotItem(0);
				thisLink.checked = true;
				delbuttons = document.evaluate("//input[@value='Delete']", document, null,7, null); 	
				delbutton = delbuttons.snapshotItem(0);
				delbutton.click();
			},
		INTERVAL
		);	
	}
}
else if(document.location.href == "http://www.donkeymails.com/pages/ptc.php")
{
	if(ty[j].getAttribute('href') == 'http://www.jillsclickcorner.com' || ty[j].getAttribute('target') != '_ptc')
	{
		document.location.href = "http://www.donkeymails.com/pages/pointptc.php";
	}
	else
	{
		if(ty[j].getAttribute('target') == '_ptc')
		{
			if(ty[j].getAttribute('href') == 'http://www.clickXchange.com/fr.phtml?act=1675058.52')
			{
				
				popup = window.open('http://www.donkeymails.com/scripts/runner.php?PA=4186');
				window.setTimeout(
					function()
					{
						popup.close();
						window.location.reload();
					},
					INTERVAL
				);			
			}else
			{			
				popup = window.open(ty[j]);
				window.setTimeout(
					function()
					{
						popup.close();
						window.location.reload();
					},
					INTERVAL
				);
			}
		}
	}
}
else if(document.location.href == "http://www.donkeymails.com/pages/pointptc.php")
{
	if(ty[j].getAttribute('target') == '_ptc')
	{
		popup = window.open(ty[j]);

		window.setTimeout(
			function()
			{
				popup.close();
				window.location.reload();
			},
			INTERVAL
		);		
	}
	else
	{
		document.location.href = "http://www.donkeymails.com/pages/earnings.php";
	}
}