// ==UserScript==
// @name           GC Field Note Log Count
// @namespace      delta68.fieldnote_logcount
// @description    Counts number of logs on Field Notes page
// @include        http://www.geocaching.com/my/fieldnotes.aspx
// ==/UserScript==

var b = document.body.innerHTML
//var s= b.split('>Compose Log<').length -1
var findCount = b.split('"Found it"').length -1
var dnfCount = b.split('"Didn\'t find it"').length -1
var msg =''

if (findCount> 0){
msg += '&nbsp;&nbsp;&nbsp;<img src="/images/icons/icon_smile.gif">' +  findCount
}

if(dnfCount >0){
msg += '&nbsp;&nbsp;&nbsp;<img src="/images/icons/icon_sad.gif">' + dnfCount 
}


setTitle( msg)


function setTitle(txt)
{
	var descendants = document.getElementsByTagName("h3");
	for(var i=0;i<descendants.length;i++)
	{
		if(descendants.item(i).innerHTML.indexOf("Your Field Notes")>-1)
		{   
	        descendants.item(i).innerHTML = descendants.item(i).innerHTML + txt
	        
		}
	}
}
