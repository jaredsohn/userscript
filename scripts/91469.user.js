// ==UserScript==
// @name      	Mastering astronomy fullscreen
// @namespace	session.masteringastronomy.com
// @include     *session.masteringastronomy.com/myct/item*
// @author	Oldarney
// ==/UserScript==

//to adapt this for android just remove the "var " part. run twice.
javascript:if(window.location.href.search(/frame=banner&*/)!=-1){window.location=window.location.href.replace(/frame=banner&*/,"")}else{var pickies=document.getElementById('partpane').style;void(pickies.display='inline');void(pickies.height='auto');void(pickies.color='green');void(document.getElementsByTagName('body')[0].style.overflow="visible")};