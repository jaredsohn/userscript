// ==UserScript==
// @name          Topic at Top
// @namespace     http://cyberneticz.blogspot.com
// @description	  Always keep your topic at top in a community
// @include       http://www.orkut.com/*
// ==/UserScript==
window.addEventListener("load", function(e) {
if(document.location.href.indexOf('CommMsgs.aspx')>=0)
{
var j=0;
var tdTags=document.getElementsByTagName('td');
var anchorTags=document.getElementsByTagName('a');
for(var i=0;i<anchorTags.length;i++)
{
	if(anchorTags[i].innerHTML.indexOf("last")>=0)
	{
		document.location.href=anchorTags[i].href;
	}
}
for(var i=0;i<tdTags.length;i++)
{
	if(tdTags[i].innerHTML.indexOf('delete')>=0&&tdTags[i].innerHTML.indexOf('delete topic')==-1&&tdTags[i].innerHTML.indexOf('<input')==-1)
	{
		j++;
		if(j!=1)
		{
			document.location.href="javascript:submitForm(document.getElementsByTagName('td').item("+(i+1)+").parentNode,'delete','')";
			return;
		}
	}
}
document.location.href='http://www.orkut.com/CommMsgPost.aspx?'+document.location.href.split('?')[1];
}
if(document.location.href.indexOf('CommMsgPost.aspx')>=0)
{
document.getElementById('messageBody').value='Push it Up!! '+Math.floor(Math.random()*32765);
var date = new Date();
var curDate = null;
do { var curDate = new Date(); }
while(curDate-date < 2000);
document.location.href="javascript:submitForm(document.getElementsByTagName('tr').item(25),'submit','');"
}
}, false);


