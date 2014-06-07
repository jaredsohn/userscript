// ==UserScript==	
// @name           Bux.to Multiple Account Manager
// @namespace      bux
// @description    bux.to multiple account manager
// @include        http://www.bux.to/login.php
// ==/UserScript==

try
{  
	/*GM_registerMenuCommand('Clear Cookies', function(){ alert('cleared!') }, 'c','','c');*/
	
	var tabela = document.getElementsByTagName('table')[4];
	var novaColuna = tabela.rows[0].insertCell(1);
		novaColuna.style.width= '50%'; 
	
	var novaTabela = document.createElement('table');
	
	var logArr = new Array('accountname1','accountname2','accountname3','accountname4','accountname5','accountname6','accountname7','accountname8','accountname9','accountname10','accountname11','accountname12');
	var pwArr = new Array('password1','password2','password3','password4','password5','password6','password7','password8','password9','password10','password11','password12');
	
	for(i=0; i<logArr.length;i++)
	{
		var linha =	novaTabela.insertRow(0);
			linha.setAttribute('onclick','document.getElementsByName(\'COOKIEusername\')[0].value=\'' + logArr[i] + '\'; document.getElementsByName(\'COOKIEpass\')[0].value=\'' + pwArr[i] + '\'; document.getElementsByName(\'verify\')[0].focus();');
			linha.innerHTML = logArr[i];
	}
	
	novaColuna.appendChild(novaTabela);
	
	var cookieArr = new Array('bux_password','bux_luser','bux_user','__utma','__utmb','__utmc','__utmz');
	
	for(y=0; y<cookieArr.length;y++)
	{
		document.cookie =cookieArr[y] +'=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
	}
	
}catch(e)
{
	alert(e);
}