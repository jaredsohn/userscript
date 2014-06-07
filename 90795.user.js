// ==UserScript==
// @name           ITZ METRO TRAVELS BAL
// @namespace      Ramesh Rajpurohit
// @description    show balance itz
// @include        http://www.irctc.co.in/*
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/planner.do
// @include        http://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/planner.do
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/quickBook.do*
// @include        http://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/quickBook.do*
// @include        https://irctc.co.in/cgi-bin/bv60.dll/irctc/booking/quickBook.do*
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
		infobox.textContent = 'Metro Travels Bal (Rs.): ' + data[1];
		infobox.setAttribute('style', 'position: fixed; bottom: 40px; right: 10px; border: 2px solid ##6C2DC7; background: #FBB917; font:16px serif');
		document.body.appendChild(infobox);
	}
});