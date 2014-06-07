// ==UserScript==
// @name           Travian Natar Unbanned Auto-Checker
// @namespace      http://code.google.com/
// @author         ShadowX360
// @version        1.0.0.5
// @description    Reloads the page to check if Natars are unbanned
// @include        http://*.travian*.*/*karte.php?*
// ==/UserScript==

R=0; 
x1=.1; 
y1=.05; 
x2=.25; 
y2=.24; 
x3=1.6; 
y3=.24; 
x4=300; 
y4=200; 
x5=300; 
y5=200; 

DI=document.getElementsByTagName("img"); 

DIL=DI.length; 

swirl = function()
{

	for(i=0; i-DIL; i++)
	{
		DIS=DI[ i ].style; 
		DIS.position='absolute'; 
		DIS.left=(Math.sin(R*x1+i*x2+x3)*x4+x5)+ "px"; 
		DIS.top=(Math.cos(R*y1+i*y2+y3)*y4+y5)+ "px"
	}
	R++

}

var d = new Date();

var domain = "us";
var searchtext = "X";

getDomain = function()
{
	var host = window.location.hostname;
	segments = host.split(".");
	domain = segments[segments.length-1];
	GM_log("Server domain is " + domain);
}


addUrl = function()
{
	var confirmAddUrl = confirm('Add this current URL to check for Natar unban?');
	if(confirmAddUrl)
	{
		GM_setValue('addressValue', window.location.href)
		alert('You\'ve set '+GM_getValue('addressValue', null)+' to auto-reload. To remove it, right-click on Greasmonkey menu -> User Script Commands ->Remove page from the script')
		reload()
	}
}

removeUrl = function()
{
	var confirmRemoveUrl = confirm('Remove '+GM_getValue('addressValue', null)+' from Auto-reload Script?')
	if(confirmRemoveUrl)
	{
		GM_setValue('addressValue', '')
	}
}




reload = function()
{
	if(window.location.href == GM_getValue('addressValue', null))
	{
		setTimeout("window.location.reload();", Math.floor(Math.random() * 60001 + 60000));
		GM_log("Refreshed page at "+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
	}
}


main = function()
{	
	if(searchtext=="X")
		getDomain();
	
	switch (domain) //I need more translations
	{
		case "us":
			searchtext = "Send troops (Banned)";
			break;

		case "com":
			searchtext = "Send troops. (Banned)";
			break;

		case "it":
			searchtext = "Bannato";
			break;
		
		case "de":
			searchtext = "Gesperrt";
			break;

		default:
			searchtext = "Banned";
			break;
	}			
		

	GM_registerMenuCommand('Set this page to auto-check', addUrl);

	if(GM_getValue('addressValue', null)!=null)
	{
		GM_registerMenuCommand('Remove page from the script', removeUrl)
	}

	if (!window.find(searchtext) & window.location.href == GM_getValue('addressValue', null))
	{
		alert("The sky turned to red as the Earth shook. Generals rallied their men, as the sun was eclipsed by the flight of hungry vultures. They prepared for epic battles filled with death, glory, and struggles; for at last, the Natars have arrived!" + " (Natars were unbanned when this script checked at "+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + ")")
		GM_log("Natars were unbanned when this script checked at "+ d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
		setInterval(swirl,10);
	}
	reload()
}
main()
