// ==UserScript==
// @name           Quick Bio Status Change
// @namespace      Naquadah
// @description    One-click bio status change
// @include        http://fallensword.com/*
// @include        http://www.fallensword.com/*

//------------------------------------------------------------------------------------------------------------------------------------------------
//Adds On/Offline buttons at the top left of the screen. 
//Needs some config before using-open the file, copy & paste the rest of your bio in the line indicated, save.
//
//This bit is a bit more tricky:
//First thing is to open the installed script. Right-click the monkey face on the toolbar > Manage user scripts... > Click Quick Bio Change > Click Edit.
//
//You have to change the ################################ (In the 2 html links) for your unique string value for your account.
//The easiest way to find this is with FireFox 2 (Download here). If you have the latest version they have changed it and you cannot get this information. 
//You need to install FireFox 2 even if its temporary to get this Current Value.
//
//To find this you need to goto your profile page > Change Bio > Right-Click background with the mouse > Page Info > Forms Tab. There should be a Field 
//name Xc. You need to Copy the Current Value of xc to replace the ################################.
//
//You will know if its the right string as its a long string of random numbers and letters ie:9675j54g3a0679h31khvs8tr5
//
//If you get the message 'Failed on server validation - please try again' You have more than likely typed the xc Current Value in wrong.
//
//To add a line break enter: %0D%0A%0D%0A
//To go onto a new line enter:%0D%0A
//To add '=' enter: %3D
//------------------------------------------------------------------------------------------------------------------------------------------------

//GM_log('start');
var allImages, bgImage, imageDiv, onlineText, offlineText, bioText, textarea
    onlineText = "[b][BUFFS ONLINE]%0D%0A[/b]";
    offlineText = "[b][BUFFS OFFLINE]%0D%0A[/b]";
    bioText = "&bio=";
    
    //----------------------------------------------------------------------

    textarea = "Cut and paste the text of your bio here (without online/offline stuff)";
    
    //----------------------------------------------------------------------

    xcValue = "################################"; 

    //----------------------------------------------------------------------
	allImages = document.getElementsByTagName("IMG");
	for (var i = 0; i < allImages.length; i++){
	    if (allImages[i].src == 'http://66.7.192.165/skin/welcome/knight_corner.gif') {
		//GM_log('found');
		bgImage = allImages[i];
	    }
	}
	//GM_log(bgImage.parentNode.nodeName);
	imageDiv = bgImage.parentNode


	imageDiv.innerHTML = '<a href="http://fallensword.com/index.php?cmd=profile&subcmd=dochangebio&xc=' 
	+ xcValue + bioText + onlineText + textarea + '">'
	+ '<img src="http://i111.photobucket.com/albums/n139/tokataro/Online.png"></a>'	
	+ '<a href="http://fallensword.com/index.php?cmd=profile&subcmd=dochangebio&xc='
	+ xcValue + bioText + offlineText + textarea + '">'	
	+ '<img src="http://i111.photobucket.com/albums/n139/tokataro/Offline.png"></a>';

// ==/UserScript==