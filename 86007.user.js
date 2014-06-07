// ==UserScript==
// @name           KoC RecruitID Logger
// @namespace      http://*kingsofchaos.com/*
// @description    Inserts RecruitID  Into A Database...
// @include        http://*kingsofchaos.com/*
// @exclude		   http://www.kingsofchaos.com/confirm.login.php*
// ==/UserScript==

(function(){

var CurrentURL = document.URL
TehURL = CurrentURL.split(".com/");
TehURL = TehURL[1].split(".php");

if (TehURL[0] == "recruit") {
recruit()
}

if (TehURL[0] == "click") {
recruit()
}

function recruit(){
var rid = document.URL.split("uniqid=")
GM_xmlhttpRequest({
    method: "GET",
     url: "http://shane.skaro.ws/recruiters/admin/gm_Addlink.php?id=" + rid[1],
     onload: function(xhr) { 
		//
	//	alert("x");
	 }
	 })
}

function FindText(str,first,second)
{
var x = str.indexOf(first) + first.length
var z = str.substring(x);
var y = z.indexOf(second);
return z.substring(z,y)
}


})();