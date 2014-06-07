// ==UserScript==
// @name           Toggle Status
// @namespace      http://www.myspace.com/tokataro
// @description    One-click bio status change
// @include        http://www.fallensword.com/*

//GM_log('start');
var allImages, bgImage, imageDiv, onlineText, offlineText, bioText
    onlineText = "***[b]ONLINE[/b]*** ";
    offlineText = "---[b]OFFLINE[/b]--- ";
    
    //----------------------------------------------------------------------



    bioText = "Cut and paste the text of your bio here (without online/offline stuff)";
    

    
    //----------------------------------------------------------------------
	allImages = document.getElementsByTagName("IMG");
	for (var i = 0; i < allImages.length; i++){
	    if (allImages[i].src == 'http://66.7.192.165/skin/topbar_1_x4.jpg') {
		//GM_log('found');
		bgImage = allImages[i];
	    }
	}
	//GM_log(bgImage.parentNode.nodeName);
	imageDiv = bgImage.parentNode


	imageDiv.innerHTML = '<a href="http://www.fallensword.com/index.php?cmd=profile&subcmd=dochangebio&bio=' 
	+ onlineText + bioText + '">'	
	+ '<img src="http://i111.photobucket.com/albums/n139/tokataro/Online.png"></a>'	
	+ '<a href="http://www.fallensword.com/index.php?cmd=profile&subcmd=dochangebio&bio=' 
	+ offlineText + bioText + '">'	
	+ '<img src="http://i111.photobucket.com/albums/n139/tokataro/Offline.png"></a>';

// ==/UserScript==

