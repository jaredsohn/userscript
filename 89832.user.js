// ==UserScript==
// @name           King Electronic_Agent login
// @namespace      salmantravels@ymail.com
// @description    Rapid Login system for agent login.
// @include        https://www.irctc.co.in/Rtsa_home.asp
// @include        https://irctc.co.in/Rtsa_home.asp
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
		document.forms.namedItem('LoginForm').submit();
		}
		function secondlogin()
	{
		var form = document.forms.namedItem('LoginForm');
		form.elements.namedItem('userName').value='';
		form.elements.namedItem('password').value='';
		document.forms.namedItem('LoginForm').submit();
		}
		function directlogin1()
	{
		var form = document.forms.namedItem('LoginForm');
		form.elements.namedItem('userName').value='SALMANTRAVELS';
		form.elements.namedItem('password').value='SALMANTRAVELS';
		document.forms.namedItem('LoginForm').submit();
		}
		function directlogin2()
	{
		var form = document.forms.namedItem('LoginForm');
		form.elements.namedItem('userName').value='';
		form.elements.namedItem('password').value='';
		document.forms.namedItem('LoginForm').submit();
		}
		directlogin1();