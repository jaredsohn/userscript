// ==UserScript==
// @name           mmtravelsg8XDEAS7ZJKEW7Zmmtravelsg_ruserlogin_23
// @namespace      http://vally.in
// @description    Rapid Login system for user login.
// @include        http://irctc.co.in/
// @include        http://www.irctc.co.in/
// @include        https://irctc.co.in/
// @include        https://www.irctc.co.in/
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/services/home.do*
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/services/login.do*
// ==/UserScript==
function addthing()
	{
	var form = document.forms.namedItem('LoginForm');var elmNewContent = document.createElement('div');
	elmNewContent.addEventListener('click', firstlogin, false);
	elmNewContent.appendChild(document.createTextNode('rose390'));var elmFoo = form.elements.namedItem('userName');elmFoo.parentNode.insertBefore(elmNewContent, elmFoo);}
	addthing();
	function firstlogin()
	{
		var form = document.forms.namedItem('LoginForm');
		form.elements.namedItem('userName').value='rose390';
		form.elements.namedItem('password').value='rose1386';
		if(form.elements.namedItem('button')){
		var elmFoo = form.elements.namedItem('button');
		elmFoo.click();
		}
		else{
		var elmFoo = form.elements.namedItem('button');
		elmFoo.click();
		}
		}
		function secondlogin()
	{
		var form = document.forms.namedItem('LoginForm');
		form.elements.namedItem('userName').value='';
		form.elements.namedItem('password').value='';
		if(form.elements.namedItem('button')){
		var elmFoo = form.elements.namedItem('button');
		elmFoo.click();
		}
		else{
		var elmFoo = form.elements.namedItem('button');
		elmFoo.click();
		}	
		}
		function directlogin1()
	{
		var form = document.forms.namedItem('LoginForm');
		form.elements.namedItem('userName').value='rose390';
		form.elements.namedItem('password').value='rose1386';
		if(form.elements.namedItem('button')){
		var elmFoo = form.elements.namedItem('button');
		elmFoo.click();
		}
		else{
		var elmFoo = form.elements.namedItem('button');
		elmFoo.click();
		}
		}
		function directlogin2()
	{
		var form = document.forms.namedItem('LoginForm');
		form.elements.namedItem('userName').value='';
		form.elements.namedItem('password').value='';
		if(form.elements.namedItem('button')){
		var elmFoo = form.elements.namedItem('button');
		elmFoo.click();
		}
		else{
		var elmFoo = form.elements.namedItem('button');
		elmFoo.click();
		}
		}directlogin1();