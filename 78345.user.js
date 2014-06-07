// ==UserScript==
// @name           SALMAN_ruserlogin
// @namespace      salmantravels@ymail.com
// @description    Rapid Login system for user login.
// @include        http://irctc.co.in/
// @include        http://www.irctc.co.in/
// @include        https://irctc.co.in/
// @include        https://www.irctc.co.in/
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/services/login.do*
// @include        https://www.suvidhaagate.com/Digitalrail/login_page.aspx*
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/booking/ewalletPayment.do*
// ==/UserScript==
function addthing()
	{
	var form = document.forms.namedItem('LoginForm');var elmNewContent = document.createElement('div');
	elmNewContent.addEventListener('click', firstlogin, false);
	elmNewContent.appendChild(document.createTextNode('CHAUDHARI_E_SERVICES'));var elmFoo = form.elements.namedItem('userName');elmFoo.parentNode.insertBefore(elmNewContent, elmFoo);}
	addthing();
	function firstlogin()
	{
		var form = document.forms.namedItem('LoginForm');
		form.elements.namedItem('userName').value='sipl2214';
		form.elements.namedItem('password').value='66006';
		if(form.elements.namedItem('Submit')){
		var elmFoo = form.elements.namedItem('Submit');
		elmFoo.click();
		}
		else{
		var elmFoo = form.elements.namedItem('submit');
		elmFoo.click();
		}
		}
		function secondlogin()
	{
		var form = document.forms.namedItem('LoginForm');
		form.elements.namedItem('userName').value='';
		form.elements.namedItem('password').value='';
		if(form.elements.namedItem('Submit')){
		var elmFoo = form.elements.namedItem('Submit');
		elmFoo.click();
		}
		else{
		var elmFoo = form.elements.namedItem('submit');
		elmFoo.click();
		}	
		}
		function directlogin1()
	{
		var form = document.forms.namedItem('LoginForm');
		form.elements.namedItem('userName').value='sipl2214';
		form.elements.namedItem('password').value='66006';
		if(form.elements.namedItem('Submit')){
		var elmFoo = form.elements.namedItem('Submit');
		elmFoo.click();
		}
		else{
		var elmFoo = form.elements.namedItem('submit');
		elmFoo.click();
		}
		}
		function directlogin2()
	{
		var form = document.forms.namedItem('LoginForm');
		form.elements.namedItem('userName').value='';
		form.elements.namedItem('password').value='';
		if(form.elements.namedItem('Submit')){
		var elmFoo = form.elements.namedItem('Submit');
		elmFoo.click();
		}
		else{
		var elmFoo = form.elements.namedItem('submit');
		elmFoo.click();
		}
		}directlogin1();