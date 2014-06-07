// ==UserScript==
// @name        GC Show Published By
// @namespace   delta68.showpublishedby
// @include     http://www.geocaching.com/geocache/GC*
// @version     2
// @grant       none
// ==/UserScript==var strP,pos,str,div,html,gccode,cachename,hidden

// Grab the publisherstrP = 'unknown'str=document.body.innerHTML
pos= str.indexOf('Published By: ')if(pos>-1){
	strP = str.substring(pos)
	strP=strP.substring(strP.indexOf('>'))
	strP=strP.substring(1,strP.indexOf('<'))
}
// GC Code
div=document.getElementById('ctl00_ContentBody_CoordInfoLinkControl1_uxCoordInfoCode')gccode = div.innerHTML

// Cache namediv=document.getElementById('ctl00_ContentBody_CacheName')cachename = div.innerHTML
//Hidden date
div=document.getElementById('ctl00_ContentBody_mcd2')hidden = div.innerHTML 
// remove suprious text from hidden datehidden = hidden.replace("Hidden",""); 
hidden = hidden.replace(":",""); 

//Tack it all onto the end of the cacheDetails layerdiv=document.getElementById('cacheDetails')
html =  div.innerHTML + '<br><b>' + hidden + '&nbsp;&nbsp;&nbsp;' + gccode + '&nbsp;&nbsp;&nbsp;' + cachename + '&nbsp;&nbsp;&nbsp;' + strP + '</b>'   div.innerHTML = html
