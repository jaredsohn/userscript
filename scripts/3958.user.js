// ==UserScript==
// @namespace     http://booker.yculblog.com
// @name          Yculblog Smiley Replyer
// @description   Add smileys to the reply form in admin area.
// @include       http://www.yculblog.com/editfollowup.php?*
// ==/UserScript==


var urlBase = "http://booker.yculblog.com/images/smiley/1/";
var picName = new Array("1", "2", "3", "4", "5", "6", "7", "8", "10", "11", "19", "20");
var smileyCode = new Array("[:-)]", "[:-(]", "[XD]", "[;-)]", "[*^_^*]", "[:-O]", "[o_O]", "[T_T]", "[-_-b]", "[:-D]", "[#_#]", "[^.^]");

var s2="";
var i;
for(i=0; i < picName.length; i++){
    s2 = s2 + "<img src='" + urlBase+picName[i] + ".gif' alt='' style='cursor:pointer;'  onclick='document.getElementsByTagName(\"textarea\")[1].value = document.getElementsByTagName(\"textarea\")[1].value + \"" + smileyCode[i] + "\";' />";
}

var tbs = document.getElementsByTagName("table");

var trs = tbs[1].insertRow(7);
if(trs){
	var tds = trs.insertCell(-1);
	if(tds){
	tds.innerHTML="<b>表情</b>";
	tds.setAttribute("align","right");
	}

	var td = trs.insertCell(-1);
	if(td){
	    td.innerHTML=s2;
	}
}
