// ==UserScript==
// @name           CDID Logon
// @namespace      https://my.screenname.aol.com/*
// @description    AOL My screen Logon 
// @include        https://my.screenname.aol.com/*
// ==/UserScript==
(function(){
	document.getElementById('lgnId1').value  ='<YOUR_CDID>';
	document.getElementById('pwdId1').value  ='<YOUR_CDID_PASSWORD>';
	var submit = document.getElementById('submitAol');
	if(submit==null){
		submit = document.getElementById('ssbmtAol');
	}
	submit.click();
})();