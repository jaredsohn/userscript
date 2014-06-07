// ==UserScript==
// @name        Better Meebo 
// @author      Kirill Minkovich
// @description	Lots of enhancements for meebo (autologin, ad remover, welcome window remover, & window close remover).
// @include 	http://www*.meebo.com/*
// @include 	https://www*.meebo.com/*
// @namespace   http://cadlab.cs.ucla.edu/~kirill
// ==/UserScript==

// --This script was then modified by --
// @author      Richard Bronosky
// @namespace   http://bronosky.com/pub/greasemonkey_scripts/autologinmeebo.user.js
// --This script originally written by--
// @author        Tyler Charlesworth
// @namespace     http://www.tyworks.net
// --

try {
unsafeWindow.adsRemover = function()
{
	//wait until the buddy list is loaded
	if(  !document.getElementById('buddylistwin') )
	{
			window.setTimeout("adsRemover()", 2000); //check for buddy list again in 2 seconds
			return;
	}
	
	//make sure gConsoleMgr is loaded 
	if(typeof unsafeWindow.gConsoleMgr != "undefined"){
		unsafeWindow.gConsoleMgr.getMainPage().oldReposition = unsafeWindow.gConsoleMgr.getMainPage().positionContainers;                
		unsafeWindow.gConsoleMgr.getMainPage().positionContainers = function()
		{
			unsafeWindow.gConsoleMgr.getMainPage().oldReposition();
			var divCollection = document.getElementsByTagName("div");
			for (var i=0; i<divCollection.length; i++)
			{
				var pObj = divCollection[i];
				if(pObj.getAttribute("id"))
				{
					if(pObj.getAttribute("id").match("accounts") ||
                       pObj.getAttribute("id") == "2")
						pObj.setAttribute("style","left: 10px; top: 10px;");  //move accounts to where meebo logo used to be
                    if(pObj.getAttribute("id").match("MediaBar") || //remove ad bar on the bottom
				       pObj.getAttribute("id") == "4" )
					    pObj.parentNode.removeChild(pObj);  
				}
                if(pObj.getAttribute("class"))
                {
                    if(pObj.getAttribute("class").match("ConsoleExtensionContainer"))
                        pObj.parentNode.removeChild(pObj);  
                }
			}
		};
	}
	/*
    This seems to cause a lot of problems so it's commented out for now
	//make sure gWindowMgr is loaded 
	if(typeof unsafeWindow.gWindowMgr != "undefined"){
		var oldRedraw = unsafeWindow.gWindowMgr.getConvWindow;
		unsafeWindow.gWindowMgr.getConvWindow = function() {
			oldRedraw();
			var divCollection = document.getElementsByTagName("div");
			for (var i=0; i<divCollection.length; i++)
			{
				var pObj = divCollection[i];
				if(pObj.getAttribute("id") && pObj.getAttribute("id").match("iceBreakers") )
					pObj.parentNode.removeChild(pObj);
			}
		};
	}
	*/
	
	//get a list of all the divs 
	var divCollection = document.getElementsByTagName("div");
	for (var i=0; i<divCollection.length; i++)
	{
		var pObj = divCollection[i];
		if(pObj.getAttribute("id"))
		{
			if((pObj.getAttribute("id").match("MediaBar") || //remove ad bar on the bottom
				pObj.getAttribute("id").match("toast") ||
                
				pObj.getAttribute("id").match("consoleSparkAd") || //remove ad window below accounts
				pObj.getAttribute("id").match("meebotopcontainer") || //remove logo
				pObj.getAttribute("id").match("iceBreakers") || //remove iceBreakers                    
				pObj.getAttribute("id").match("poll"))) //remove any polls
					pObj.parentNode.removeChild(pObj);                
		}
	}
	
	//get a list of all the imgs
	var imgCollection = document.getElementsByTagName("img");
	for (var i=0; i<imgCollection.length; i++)
	{
		var pObj = imgCollection[i];
		if(pObj.getAttribute("id") && (pObj.getAttribute("id").match("BackgroundImage"))) //remove background image
			pObj.setAttribute("src","");
	}
	
}


function MeeboHelper()
 {
	//Put your information in below
	var autoSubmit = true;
	var removeAds = true;
	var noAlertOnClose = true;
	var closeWelcomeWindow = true;
	var removeIceBreakers = true;	
    var forceHTTPS = false;    
     
	//Don't edit below here
	if(forceHTTPS)
		location.href = location.href.replace(/^http:/, 'https:');
	if(document.getElementById('autologin2'))
		document.getElementById('autologin2').checked = 1;
	if(removeIceBreakers)
		unsafeWindow.gIceBreakers = [""];        
	if(autoSubmit)
		window.setTimeout("if(typeof gFrontPage != 'undefined') gFrontPage.loginUser();", 1000);
	if(removeAds)
        window.setTimeout("adsRemover()", 4000);		
	if(closeWelcomeWindow)
		window.setTimeout("var pObj = document.getElementById('welcomeWin'); if(typeof pObj != 'undefined') pObj.parentNode.removeChild(pObj);", 5000);
	if(noAlertOnClose)
		window.setTimeout("document.defaultView.gLang.navigateAway = undefined", 7000);
}
MeeboHelper();

} catch(e) { alert(e);}
