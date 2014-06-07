// ==UserScript==
// @name           sorehanai
// @namespace      http://iddy.jp/profile/rokudenashi/
// @include        http://twitter.com/*
// ==/UserScript==

var actionsA = document.evaluate('//*[@class="actions"]//a', document, null, 7, null)
for(var i=0;i<actionsA.snapshotLength;i++) {
	actionsA.snapshotItem(i).style.visibility='visible'
}

var replys = document.evaluate('//a[@class="reply"]', document, null, 7, null)
for(var i=0;i<replys.snapshotLength;i++) {
	var reply=replys.snapshotItem (i)
	var a=document.createElement ('A')
	a.href=String(reply.href).replace(/(&in_reply_to_status_id)/,'sorehanai$1')
	a.textContent='sorehanai'
	a.style.visibility='visible'
	replys.snapshotItem(i).parentNode.appendChild(a)
}
