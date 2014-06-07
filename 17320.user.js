// ==UserScript==
// @name           SuicideGirls background image
// @namespace      SuicideGirls
// @description    Changes the background image of www.suicidegirls.com
// @include        http://*.suicidegirls.com/*
// ==/UserScript==


var imagepath = GM_getValue("SGBGimage", "");
GM_addStyle("body { background-image:url(" + imagepath + "); background-repeat:no-repeat;background-position:center center;background-attachment:fixed }");
GM_registerMenuCommand('Change background image', changebg)


function changebg()
{

var newimage = (prompt("Please enter the path to your background image...", GM_getValue("SGBGimage", "")));

if (newimage != "")
{

	GM_setValue("SGBGimage",newimage);
	window.location.reload();
}

}

// ==== END ====