// ==UserScript==
// @name           Outlook WebMail NoLogout
// @namespace      http://userscripts.org/scripts/show/34314
// @description    Keep logged in Outlook Exchange Webmail
// @include        http*://webmail.*/Exchange/*/Inbox/?Cmd=contents*
// @version        0.3
// @author         Burn
// ==/UserScript==

unsafeWindow.Update= function() {
	self.location.href = self.location;
}
self.setInterval('Update()',120000); // 2 minutes

unsafeWindow.CountDown = function() {
	var obj = document.getElementById('cd');
	var num = parseInt(obj.innerHTML);
	obj.innerHTML = num-1;
}
var t = document.evaluate("//table",document,null,6,null);

for (var i=0;i<t.snapshotLength;i++) {	
	var l = t.snapshotItem(i);
	if (l.className == "tblFolderBar") {
		var newTD = document.createElement('td');
		newTD.setAttribute('id','cd');
		newTD.setAttribute('style','font-size:12px;font-family:Tahoma,Helvetica,Sans-Serif;padding-left:10px;color:white;font-weight:bold');
		var seconds = 120;
		newTD.innerHTML = seconds;
		l.appendChild(newTD);
		window.setInterval('CountDown()',999);
		break;
	}
}
