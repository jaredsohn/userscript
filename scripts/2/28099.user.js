// ==UserScript==
// @name           websgAutoLogin
// @namespace      zarg/websgAutoLogin/
// @include        http://webgame.pchome.net/*
// @include        http://websg.pchome.net/*
// @include        http://passport.pchome.net/*
// @description    v1.1 by zarg
// ==/UserScript==


var a=document.getElementsByTagName('input')

if(location.href=='http://webgame.pchome.net/'){
	
	a[a.length-1].click()
		
}

if(location.href=='http://passport.pchome.net/login.php?goto=http://webgame.pchome.net'){
	
	a[0].value='pchome用户名'
	a[1].value='密码'
	a[2].click()
		
}

if(location.href=='http://webgame.pchome.net/active/login-4.html'){
	
	
	a[0].value='悠游三国名'
	a[1].value='密码'
	a[3].click()
		
}

if(location.href=='http://websg.pchome.net/Account/NewGameAccount.aspx'){
	
	
	setTimeout("document.getElementsByTagName('input')[2].click()",1000)
		
}
	
if(location.href=='http://webgame.pchome.net/active/home-4.html'){
	
	location.href='http://webgame.pchome.net/'	
	
}
