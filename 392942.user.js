// ==UserScript==
// @name        GC Show Published By
// @namespace   delta68.showpublishedby
// @include     http://www.geocaching.com/geocache/GC*
// @version     2
// @grant       none
// ==/UserScript==

// Grab the publisher
pos= str.indexOf('Published By: ')
	strP = str.substring(pos)
	strP=strP.substring(strP.indexOf('>'))
	strP=strP.substring(1,strP.indexOf('<'))
}

div=document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode')

// Cache name

div=document.getElementById('ctl00_ContentBody_mcd2')
// remove suprious text from hidden date
hidden = hidden.replace(":",""); 

//Tack it all onto the end of the cacheDetails layer
html =  div.innerHTML + '<br><b>' + hidden + '&nbsp;&nbsp;&nbsp;' + gccode + '&nbsp;&nbsp;&nbsp;' + cachename + '&nbsp;&nbsp;&nbsp;' + strP + '</b>'   