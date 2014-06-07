// ==UserScript==
// @name        TMD dark style
// @namespace   XXN
// @description dark style theme for TMD
// @include     *torrentsmd.com*
// @include     *torrentsmd.eu*
// @version     1.0
// ==/UserScript==

document.getElementsByTagName("body")[0].style.background = '#222222';
document.getElementsByTagName("body")[0].style.color = 'rgb(153, 153, 153)';
document.getElementById("menutable").style.background = '#3a6a95';
document.getElementById("forumPosts_first").style.background = '#222222';
document.getElementById("forumPosts").style.background = '#222222';

//document.getElementsByClassName("forumPostName").style.background = '#222222';

//$('table.forumPostName').css('background-color', '#222222');
//$('.forumPostName').css('background-color', '#222222 !important');
//document.evaluate("//table[@class='forumPostName']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).style.background = '#222222 !important';
//document.evaluate("//div[@class='c-body']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).style.background = '#222222 !important';
/*
var myObj = document.getElementsByClassName('forumPostName');
for(var i=0; i<myObj.length; i++){
  myObj[i].style['background-color'] = '#222222';
}*/

//document.getElementsByTagName("body")[0].childNodes.style.background = '#222222';
 //document.getElementsByTagName('*').style.background-color = '#222222';
//document.evaluate("//*[@background-color='rgb(236, 233, 216)']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null).style.background = '#222222';

