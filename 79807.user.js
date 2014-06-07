// ==UserScript==
// @name           Auto-Redeem Lockerz Chrome
// @namespace      ss
// @description    sss
// @include        http://ptzplace.lockerz.com/*
// @include        http://www.italialockerz.altervista.org/simulazione/*
// ==/UserScript==

javascript: var c= "Italy"
var deee= "IT";
var pais = "Italia";

document.forms[0].elements[0].value = "Mauro";
document.forms[0].elements[1].value = "Romanella";
document.forms[0].elements[2].value = "Via cisterna 2";
document.forms[0].elements[3].value = "";
document.forms[0].elements[4].value = "limatola";
document.forms[0].elements[5].value = "BN";
document.forms[0].elements[6].value = "82030";
document.forms[0].elements[10].value = "00393487411111";

document.getElementById("c_11121").value = pais;
document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML = pais;
document.getElementById("_countryDetails").value = pais;
window.location= "javascript: manipulateForm('"+deee+"');";void(0)

if(document.getElementById('recaptcha_response_field').style.display!='none')
		{
			var answer = prompt ("Captcha?","");
			document.getElementById('recaptcha_response_field').value=answer;
		}



