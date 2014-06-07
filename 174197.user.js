// ==UserScript==
// @name        Oulook Web Anzahl Mails in Title
// @namespace   outlook
// @include     https://webmail.trustedcloud.it*
// @version     1
// @grant 
// ==/UserScript==


var titleTag = document.getElementsByTagName("title")[0];

window.setTitleName = function(){
	
	var spnCV = document.getElementById("spnCV");

	if (spnCV != null){
		var val = spnCV.innerHTML
		titleTag.innerHTML = val + " ungel. Mail(s)";
	}else{
		titleTag.innerHTML = "keine ungel. Mails";
	}
	setTimeout(window.setTitleName,10000);
}

window.setTitleName();
