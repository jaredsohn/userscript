// ==UserScript==
// @name           show balance ITZ
// @namespace      
// @description    show balance itz in irctc
// @include        http://www.irctc.co.in/*
// ==/UserScript==

var login = GM_getValue('login') || prompt('Enter ITZ Account No', 000000000000), pass = GM_getValue('pass') || prompt('Enter ITZ password', 0000);
GM_setValue('login', login); GM_setValue('pass', pass);

GM_xmlhttpRequest({
	method:	'POST',
	url:	'https://www.itzcash.com/myaccount/servlet/LoginServlet',
	data:	'account=' + login + '&password=' + pass + '&cardtype=NONKYC&Submit=Submit&category=user&reportkey=CVSTATUS',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
	},
	onload: function(r) {
		var data = r.responseText.match(/<td class=key width=60%>Remaining Amount \(Rs\.\)<\/td><td class="text">(.+?)<\/td>/),
			infobox = document.createElement('div');
		infobox.textContent = 'ITZ Bal (Rs.): ' + data[1];
		infobox.setAttribute('style', 'position: fixed; bottom: 10px; right: 10px; border: 1px solid #555; background: #fff');
		document.body.appendChild(infobox);
	}
});