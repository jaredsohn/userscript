// XKCD Printable - Jeff Simpson
//
// ==UserScript==
// @name           XKCD Printable
// @author         Jeff Simpson
// @version        1.3
// @namespace      http://www.mit.edu/~je18337/greasemonkey
// @description    Printable copy of the latest XKCD comic. Also includes the title text in a mouse-over paragraph below the comic
// @include        http://*xkcd.tld/*
// @include        http://*.livejournal.com/*
// ==/UserScript==

// To Configure this script, first run it and visit xkcd.com, then go to
// "about:config and search for "XKCD Printable". The values shown below
// are just the defaults and will only be used if there are no settings
// saved in about:config

if (!GM_setValue || !GM_getValue) {
	alert('Please upgrade to the latest version of greasemonkey.');
	return;
}

var URL = window.location.href;

// Enable title-text in normal view (mouse-over protected)
var enableTitleTextNormal = GM_getValue("enableTitleTextNormal", true);
GM_setValue("enableTitleTextNormal", enableTitleTextNormal);

// Enable title-text in print-friendly view
var enableTitleTextPrint = GM_getValue("enableTitleTextPrint", true);
GM_setValue("enableTitleTextPrint", enableTitleTextPrint);

// Style of the title text box (in normal view)
var titleTextStyle = GM_getValue("titleTextStyle", '<style type="text/css"><!-- div.title {color: white; border: 1px black solid; padding: 10px; margin: 5px;} div.title:hover {color:black; border: 1px solid black }</style>');
GM_setValue("titleTextStyle", titleTextStyle);

// Text for the print-friendly link
var printFriendlyText = GM_getValue("printFriendlyText", 'Printer-Friendly version');
GM_setValue("printFriendlyText", printFriendlyText);

// Tag for the comic in print view
var comicTag = GM_getValue("comicTag", "<i>xkcd.com (Randall Munroe)</i>");
GM_setValue("comicTag", comicTag);

// Tag for the comic in print view
var doLivejournal = GM_getValue("doLivejournal", true);
GM_setValue("doLivejournal", doLivejournal);

//// Script Starts Here

GM_log("xkcd printable starting");

if (URL.match(/livejournal/) && doLivejournal)
{
  GM_log("doing livejournal");
  allIMG = document.getElementsByTagName('img');
	for (var i=0; i<allIMG.length; i++)
	{
    if (allIMG[i].src.match(/xkcd/))
		{ titleText = allIMG[i].title; break;}
	}
	var titleTextP = document.createElement('p')
  titleTextP.innerHTML = '<i>' + titleText + '</i>';
	allIMG[i].parentNode.insertBefore(titleTextP, allIMG[i].nextSibling);
  return;
}

if (URL.match(/xkcd/))
{
  // Collect some useful vars
  var allHTML = document.getElementsByTagName('html');
  thePage = allHTML[0];
  AddTitleStyle();
  var allImg = document.getElementsByTagName('img');

  for (var i=0; i<allImg.length; i++)
  {
  	thisImg = allImg[i];
  	if (thisImg.src.match(/comics/))
  	{
  		comicURL = thisImg.src;
  		comicAlt = thisImg.alt;
  		comicTitle = thisImg.title;
  		if (enableTitleTextNormal)
  		{
    		var titleText = document.createElement('h3');
        titleText.innerHTML = '<div class="xkcdTitleTest">' + comicTitle + '</div>';
        thisImg.parentNode.insertBefore(titleText, thisImg.nextSibling);
  		}
  	}
  }
  
  var allH3 = document.getElementsByTagName('h3');
  for (var i=0; i<allH3.length; i++)
  {
    thisH3 = allH3[i];
  	if (thisH3.innerHTML.match(/Image URL/))
  	{
      var printButton = document.createElement('a');
      printButton.href= URL + '?print';
      printButton.innerHTML = printFriendlyText;
      thisH3.parentNode.insertBefore(printButton, thisH3.nextSibling);
  	}
  }
  
  if (URL.match(/print/))
  {	
  	printer_friendly();
  }
}

function printer_friendly()
{
	GM_log("Generating printer-friendly comic page");
	var printFriendlyPage = '<center><div style="width: 800px"><b>' + comicAlt + "</b>&nbsp;&nbsp;-&nbsp;&nbsp;" + comicTag + '<br><img src="' + comicURL + '">';
  if (enableTitleTextPrint)
	{  printFriendlyPage += '<br><i>' + comicTitle + '</i>';  }
	printFriendlyPage += '<br></div></center>';
	thePage.innerHTML = printFriendlyPage;
}

function AddTitleStyle()
{
  var allHEAD = document.getElementsByTagName('head');
  theHead = allHEAD[0];
  theHead.innerHTML = theHead.innerHTML + titleTextStyle;
}
