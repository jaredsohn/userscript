// ==UserScript==
// @name           King Electronic_ruserlogin
// @namespace      salmantravels@ymail.com
// @description    Rapid Login system for user login.
// @include        http://irctc.co.in/
// @include        http://www.irctc.co.in/
// @include        https://irctc.co.in/
// @include        https://www.irctc.co.in/
// @include        https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/services/login.do*
// ==/UserScript==
function addthing()
	{
	var form = document.forms.namedItem('LoginForm');var elmNewContent = document.createElement('div');
	elmNewContent.addEventListener('click', firstlogin, false);
	elmNewContent.appendChild(document.createTextNode('King Electronic'));var elmFoo = form.elements.namedItem('userName');elmFoo.parentNode.insertBefore(elmNewContent, elmFoo);}
	addthing();
	function firstlogin()
	{
		var form = document.forms.namedItem('LoginForm');
		form.elements.namedItem('userName').value='SALMANTRAVELS';
		form.elements.namedItem('password').value='SALMANTRAVELS';
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
		form.elements.namedItem('userName').value='SALMANTRAVELS';
		form.elements.namedItem('password').value='SALMANTRAVELS';
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