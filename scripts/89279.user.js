// ==UserScript==	
// @name           makma Account Manager
// @namespace      bux
// @description    bux.to makma account manager
// @copyright      makma 
// @include        http://www.bux.to/login.php
// ==/UserScript==

try
{  
	/*GM_registerMenuCommand('Clear Cookies', function(){ alert('cleared!') }, 'c','','c');*/
	
	var tabela = document.getElementsByTagName('table')[4];
	var novaColuna = tabela.rows[0].insertCell(1);
		novaColuna.style.width= '50%'; 
	
	var novaTabela = document.createElement('table');

	var logArr = new Array('makma');
	var pwArr = new Array('makma');
	var background:url('http://i38.tinypic.com/2dlvvc6.jpg')
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
		document.cookie =cookieArr[y] +'=; expires=Thu, 30-Jan-90 00:00:01 GMT;';
	}
	
}catch(e)
{
	alert(e);
}