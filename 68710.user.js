// ==UserScript==
// @name           Auto Collect On Load
// @namespace      TraceHacker
// @description    A auto collect script
// @include        http://tracehacker.info/Spammers.aspx
// ==/UserScript==




function collectspam(){
	
		document.getElementById('ctl00_ContentPlaceHolder1_TextBox1').value="COLLECT earnings FROM *";
		document.getElementById("ctl00_ContentPlaceHolder1_Button1").click();
	
}

GM_registerMenuCommand("Collect Your Spammers Earnings", collectspam, "c", "shift alt","C");
