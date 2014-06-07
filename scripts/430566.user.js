// ==UserScript==
// @name            Espanha
// @description     Vota automaticamente na Espanha
// @version         12.12
// @date            26/03/2014
// @author          Eu
// ==/UserScript==



var num, url, str1, str2, captcha;

url = document.images[23].src;
str1 = url.split('/');
str2 = str1[7].split('.');
num = str2[1];


switch (num){
	case: captcha = ''; break;
}


document.getElementsByName('OPCAO')[6].checked = true;
document.getElementsByName('endImg')[0].value = captcha;
document.form1.submit;

