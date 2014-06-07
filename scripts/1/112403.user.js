// ==UserScript==
// @name          AUT PORTAL JUMP TO CAPTCHA by PACH
// @namespace     http://pach.ir
// @description   basic login script
// @include       https://portal.aut.ac.ir/aportal/login.jsp
// ==/UserScript==


try{
	var mytext = document.getElementById("passline");
	mytext.setAttribute('onkeyup', 'if(this.value.length > 4) document.login.submit();');
	mytext.focus();
	
}
catch(e){};