// ==UserScript==
// @name           GameFAQs Youtube Pictures
// @namespace      http://TakatoCSS.co.cc
// @include        http://gamefaqs.com/boards/*
// @include        http://www.gamefaqs.com/boards/*
// ==/UserScript==

fred = document.getElementsByClassName("message")[0];
remainingText = fred.innerHTML;
replacementText = "";

if (remainingText.indexOf("http://www.youtube.com/watch?v=") > -1) {

	while (remainingText.indexOf("http://www.youtube.com/watch?v=") > -1) {
		replacementText = replacementText + remainingText.substring(0,remainingText.indexOf("http://www.youtube.com/watch?v="));
		ytID = remainingText.substring(remainingText.indexOf("http://www.youtube.com/watch?v=")+31, remainingText.indexOf("http://www.youtube.com/watch?v=")+42);
		remainingText = remainingText.substring(remainingText.indexOf("http://www.youtube.com/watch?v=")+42); 
		replacementText = replacementText + "<p class=\"youtube-link\"><a href=\"http://www.youtube.com/watch?v=" + ytID + "\" target=\"_blank\"><b>YouTube: " + ytID + "</b><br/><img src=\"http://i4.ytimg.com/vi/" + ytID + "/default.jpg\"/><img src=\"http://i4.ytimg.com/vi/" + ytID + "/1.jpg\"/><img src=\"http://i4.ytimg.com/vi/" + ytID + "/2.jpg\"/><img src=\"http://i4.ytimg.com/vi/" + ytID + "/3.jpg\"/></a></p>"
	}

	replacementText = replacementText + remainingText;
	remainingText = "";

	fred.innerHTML = replacementText;

} else {
}


//END OF SCRIPT