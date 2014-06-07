// ==UserScript==
// @name           51zxw download
// @namespace      zero
// @include        http://www.51zxw.net/show.aspx?id=*&cid=*
// ==/UserScript==


var frmObj = document.getElementById("frm_v");
if(frmObj!=null){
	document.getElementById("printBody").innerHTML = frmObj.src.replace(/\.html$/g , ".swf");
}else{
	alert("找不到frm_v");
}