// ==UserScript==	

// @name           BUX PTC Multiple Account Manager
// @namespace      Bux 
// @description    Automatically Manages Login Details Of Multiple Accounts On Major Bux Sites

// @include        http:*//*/login.php
// @exclude        http*://*/register.php

// ==/UserScript==
try
{  
	var table = document.getElementsByTagName('table')[4];
	var colum = table.rows[0].insertCell(1);
		colum.style.width= '50%'; 

	var ibiz_table = document.createElement('table');

	/* Replace the 'Username' with your usernames and replace 'Password' with your pasword, Only 10 Nos. shown below If you need add more user names and passwords */

	var logArr = new Array('Username1', 'Username2', 'Username3', 'Username4', 'Username5', 'Username6', 'Username7', 'Username8', 'Username9', 'Username10'); 
	var pwArr = new Array('Password1', 'Password2', 'Password3', 'Password4', 'Password5', 'Password6', 'Password7', 'Password8', 'Password9', 'Password10');
	
	for(i=(logArr.length-1);i>=0; i--)
	{
	if(document.URL.indexOf('bux.to')!=-1)
	{
		var ibiz_login =	ibiz_table.insertRow(0);
			ibiz_login.setAttribute('onclick','document.getElementsByName(\'COOKIEusername\')[0].value=\'' + logArr[i] + '\'; document.getElementsByName(\'COOKIEpass\')[0].value=\'' + pwArr[i] + '\'; document.getElementsByName(\'verify\')[0].focus();');
			ibiz_login.innerHTML = logArr[i];
	}
	else
	{
		var ibiz_login =	ibiz_table.insertRow(0);
			ibiz_login.setAttribute('onclick','document.getElementsByName(\'username\')[0].value=\'' + logArr[i] + '\'; document.getElementsByName(\'password\')[0].value=\'' + pwArr[i] + '\'; document.getElementsByName(\'code\')[0].focus();');
			ibiz_login.innerHTML = logArr[i];
	}
	}

	colum.appendChild(ibiz_table);
	
	var cookieArr = new Array('bux_password','bux_luser','bux_user','__utma','__utmb','__utmc','__utmz');
	
	for(y=0; y<cookieArr.length;y++)
	{
		document.cookie =cookieArr[y] +'=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
	}
	
}catch(e)
{
	alert(e);
}
