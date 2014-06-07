// ==UserScript==
// @name           DoneCard transaction
// @description    hyperlink transaction
// @include        *
// ==/UserScript==
var span = document.getElementById('ctl00_NewLoginUserContentPlaceHolder_lblRemaining'),
	a = document.createElement('a');
	a.setAttribute('href', 'https://www.donecard.com/ListAllCustomerCardTransaction-1.aspx');
	a.textContent = span.textContent;
	span.textContent = '';
span.appendChild(a);