// ==UserScript==
// @name       CV UMA - AutoLogin
// @version    1.2
// @description  Entra automáticamente al campus virtual de la Universidad de Málaga
// @match      https://informatica.cv.uma.es/login/index.php
// @match      https://idp.cv.uma.es/*
// @copyright  2013+, Ángel García ~ Agedjus
// ==/UserScript==

var url=window.location.href;

if(url=="https://informatica.cv.uma.es/login/index.php"){
	window.location.href="https://informatica.cv.uma.es/auth/saml/index.php?identificacion=cv";
}
else{
    document.forms["f"].submit();
}