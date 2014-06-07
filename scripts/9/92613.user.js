// ==UserScript==
// @name           Up login 1.0
// @namespace      interblogando.blogspot.com
// @description    Login no up.tl; Works only in Portuguese site version
// @include        http://up.tl/*
// @include        http://www.up.tl/*
// @license        MIT License lol
// ==/UserScript==
v_user = ''
v_pass = ''

submenu = document.getElementById('submenu');
if (document.location == 'http://www.up.tl/')
{document.location='http://up.tl/'}
else
if (submenu.innerHTML.indexOf('Você não está conectado')>1 && document.location != 'http://up.tl/login')
	{document.location='http://up.tl/login'}
else
	{Login()}
	
function Login()
	{
	   if (document.location == 'http://up.tl/login')
	   {
		   document.getElementById('login').value = v_user
		   document.getElementById('senha').value = v_pass
		   document.getElementById('entrar').click()
	   }
	}