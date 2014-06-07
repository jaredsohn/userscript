// ==UserScript==
// @name           iGoogle Header Remover Plus
// @namespace      -
// @include        http*://www.google.*/ig*
// ==/UserScript==

var link;

var snapResults = document.evaluate("//*[@class='gbh']", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
for (var i = snapResults.snapshotLength - 1; i >= 0; i--) {
	var elm = snapResults.snapshotItem(i);
	elm.style.display='none';
}

elm=document.getElementById("footerwrap");
elm.style.display='none';
document.getElementsByTagName('div')[5].style.display='none';document.getElementById('gbar').style.display='none';

link=document.createElement("div");


link.innerHTML="<script>function showHeader() {	timeoutID = window.setTimeout(function () {navdiv.style.display='';},500);} function hideHeader() { navdiv.style.display='none'; if(typeof(timeoutID)!= 'undefined')window.clearTimeout(timeoutID);} var navdiv; navdiv=document.getElementById('nhdrwrapsizer') ; navdiv.style.display='none';document.getElementById('tabs').onmouseover = function () {showHeader();};document.getElementById('tabs').onclick = function () {navdiv.style.display='';};document.getElementById('modules').onmouseover = function () { hideHeader() };</script><div style=\"position:absolute;left:0px;top:1px;height:23px;width:9px;text-align:center;background:#000\"><a style=\"font-family:arial;color:#D2D911; font-size: 12px;text-decoration:none;\" href='#' onClick=\"if (document.getElementsByTagName('div')[5].style.display == 'none'){ document.getElementsByTagName('div')[5].style.display='';document.getElementById('gbar').style.display=''; this.innerHTML='-';} else {document.getElementsByTagName('div')[5].style.display='none';document.getElementById('gbar').style.display='none'; this.innerHTML='+';}\">+</a></div>";
document.body.insertBefore(link, document.body.firstChild);