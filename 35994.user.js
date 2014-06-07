// ==UserScript==
// @name           Exploits
// @namespace      Hyp
// @include        http://www.hyperiums.com/servlet/Maps*
// @include        http://www.hyperiums.com/servlet/Trading*
// ==/UserScript==

if(document.location.pathname.search("buyexploit")) {
	var explos = new String();
	var explos=document.getElementsByTagName("form")[0].textContent.split(" ")[3];
	var input=document.getElementsByTagName("input");

	input[0].value = explos;
	input[1].value = "437231";

}


/*if(document.location.pathname.search("sellexploit")) {
	var explos = new String();
	var explos=document.getElementsByTagName("form")[0].textContent.split(" ")[7].split("Sell")[0];
	GM_log(explos);
	var input=document.getElementsByTagName("input");

	input[0].value = explos;
	input[1].value = "1";
	input[2].value = "437231";

}
*/