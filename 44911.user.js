// ==UserScript==
// @name prince
// @description prince
// @include http://www.orkut.co.in/*
// ==/UserScript==
var url=document.location.href;
var userId=url.split('?uid=')[1];
if(url.indexOf('Profile.aspx')>=0)
{
var prfls = new Array();
var ancrs = document.getElementsByTagName("a");
if(url.indexOf('alreadyadded')>=0)
{
var j=0;
for (var xi = 0; xi < ancrs.length ; xi++)
{
if(ancrs[xi].href.indexOf("Profile.aspx")>=0&&ancrs[xi].innerHTML.indexOf("<img")==-1)
{
prfls[j]=ancrs[xi].href.split('?uid=')[1];
j++;
}
}
document.location.href='http://www.orkut.co.in/Profile.aspx?uid='+prfls[Math.floor(Math.random()*j)];
}
else
{
document.location.href='http://www.orkut.co.in/FriendAdd.aspx?uid='+userId;
}
}
if(url.indexOf('FriendAdd.aspx')>=0)
{
var currstat = document.getElementsByTagName('b').item(1).innerHTML;
if(currstat.indexOf('We are awaiting a response')>=0||currstat.indexOf('is already your friend')>=0||currstat.indexOf('add yourself')>=0)
{
document.location.href='http://www.orkut.co.in/Profile.aspx?uid='+userId+'&alreadyadded';
}
else
{
document.location.href="javascript:submitForm(document.getElementsByTagName('tr').item(22),'yes','')";
}
}