// ==UserScript==

// @name           4 Bio Quick Change
// @namespace      Naquadah
// @include        http://www.fallensword.com/*
// @include        http://fallensword.com/*

//------------------------------------------------------------------------------------------------------------------------------------------------
//Adds Bio 1/2/3/4 buttons at the top left of the screen. 
//Needs some config before using-open the file, copy & paste the rest of your bio in the line indicated, save.
//
//There are a few things you need to edit in order to get this script to work.
//
//You have to change the ################################ for your unique string value for your account.
//
//There are 3 ways of doing this:
//
//Method 1: Download This Firefox 3 addon, then drag and drop into firefox.
//Then Navigate to Profile > Change Bio(On the fallensword website)
//Right-Click background with the mouse and navigate to > Page Info > Forms Tab.
//Click the top link.
//There should be a Field name Xc. You need to Copy the Current Value of xc to replace the ################################.
//
//Method 2: Install This Firefox addon.
//Then Navigate to Profile > Change Bio(On the fallensword website)
//Click Tools > Tamper Data
//A New window will open.
//Hit Clear Then Start Tamper.
//Press the Update Bio button on the fallensword website and you will get a popup. Hit Tamper
//Another window will open and you will see your Xc value in the left hand column.
//You can then close the window after copying xc value and hit stop tamper.
//You can then choose to uninstall the Tamper Data addon
//Here are the Instructions:
//
//Method 3:
//The Third way is to find it with FireFox 2 (Download here). If you have the latest version (FF3) they have changed it and you cannot get this information. You need to install FireFox 2 even if its temporary to get this Current Value.
//To find this you need to goto your profile page > Change Bio > Right-Click background with the mouse > Page Info > Forms Tab. There should be a Field name Xc. You need to Copy the Current Value of xc to replace the ################################.
//You will know if its the right string as its a long string of random numbers and letters ie:9675j54g3a0679h31khvs8tr5
//
//If you get the message 'Failed on server validation - please try again' You have more than likely typed the xc Current Value in wrong.
//
//To add a line break enter: %0D%0A%0D%0A
//To go onto a new line enter:%0D%0A
//To add an '=' enter: %3D
//
//------------------------------------------------------------------------------------------------------------------------------------------------


//GM_log('start');
var allImages, bgImage, imageDiv, bioText, bioOne, bioTwo, bioThree, bioFour, xcText
bioText = "&bio=";
    
    //----------------------------------------------------------------------

	xcText = "################################";

    //----------------------------------------------------------------------

	bioOne = "Enter Your First Bio Message Here";
   
    //----------------------------------------------------------------------

	bioTwo = "Enter Your Second Bio Message Here";

    //----------------------------------------------------------------------

	bioThree = "Enter Your Thrird Bio Message Here";

    //----------------------------------------------------------------------

	bioFour = "Enter Your Fourth Bio Message Here";

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
	+ xcValue + bioText + onlineText + bioOne + '">'	
	+ '<img src="http://i538.photobucket.com/albums/ff349/Naquadah2008/FallenSword/1.gif"></a>'	
	+ '<a href="http://fallensword.com/index.php?cmd=profile&subcmd=dochangebio&xc=' 
	+ xcValue + bioText + onlineText + bioTwo + '">'	
	+ '<img src="http://i538.photobucket.com/albums/ff349/Naquadah2008/FallenSword/2.jpg"></a>'
	+ '<a href="http://fallensword.com/index.php?cmd=profile&subcmd=dochangebio&xc=' 
	+ xcValue + bioText + onlineText + bioThree + '">'	
	+ '<img src="http://i538.photobucket.com/albums/ff349/Naquadah2008/FallenSword/3.gif"></a>'
	+ '<a href="http://fallensword.com/index.php?cmd=profile&subcmd=dochangebio&xc=' 
	+ xcValue + bioText + onlineText + bioFour + '">'	
	+ '<img src="http://i538.photobucket.com/albums/ff349/Naquadah2008/FallenSword/4.jpg"></a>';
	

// ==/UserScript==