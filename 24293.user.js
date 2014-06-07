// ==UserScript==
// @name           ebayUiUpdate
// @namespace      ebay
// @include        http://*.ebay.*/*
//
// 2008-03-23 Adds button My Messages to the right top-most menu
// 2008-11-16 updated link to My Messages,added autoclick on button in advert page after login
//
// ==/UserScript==

var obj = document.getElementById('dynamicmenu-hdrCtr');
if (obj) {

var siteUrl = document.URL;
siteUrl = siteUrl.split('/', 4);

var url = "http://"+siteUrl[2]+"/ws/eBayISAPI.dll?MyMessagesFolderView&FClassic=true&ssPageName=STRK:ME:MMX&CurrentPage=MyeBayMyMessages";

div = obj.childNodes[4];
table = div.childNodes[0];
cell = table.rows[0].cells[0].childNodes[0];
var rows = cell.rows[0];
var text = rows.innerHTML;

ind = text.indexOf("<td id=\"myebayitem\">");
var cnt = document.getElementById("leftNavInboxCount");
if (cnt) {
	cnt = cnt.innerHTML;
}else
	cnt = '';
cell = "<td id=\"mymessagesitem\"><a id=\"mymessages\" rel=\"nofollow\" href=\""+url+"\">My Messages"+cnt+"</a></td>";

text = text.substr(0, ind)+cell + text.substr(ind);
rows.innerHTML = text;

}


// prevent showing adverts after login
var myform = document.forms["RTMForm"];
if (myform) {
 if (myform.getElementsByTagName('button').length>0)
  if (myform.getElementsByTagName('button')[0])
   myform.getElementsByTagName('button')[0].click();
}
