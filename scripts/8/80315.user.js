// ==UserScript==
// @name           Auto fill
// @namespace      Auto fill
// @description    Preenche dados
// @include        http://ptzplace.lockerz.com/*
// @include        http://www.italialockerz.altervista.org/simulazione/*
// @include        http://sebastian88.xtreemhost.com/ColombianLockerz/Simulador/*
// @include        http://www.nixlove.com/lockerz/notify/titanium/treino_redeem/fixed/*
// ==/UserScript==

/*
---Funções
*/
/*PARA O LOGIN*/
login='login';
passw='senha';

/*PARA O ENDEREÇO DE ENTREGA*/
kkkkkkkkk
nome=         "";
sobrenome=    "";
endereco1=    "";
endereco2=    "";
cidade=       "";
estado=       "";
cep=          "";
tel=          "";

/*PARA O REDEEM*/
categoria='electronic';   //COLOQUE TUDO COM minusculas!
produto='macbook pro 13'; //COLOQUE TUDO COM minusculas!

function getElementByClass(theClass,tipe,text) {
		var allHTMLTags = new Array();
		var allHTMLTags=document.getElementsByTagName("*");
		n=0;
		for (i=0; i<allHTMLTags.length; i++) {
				if (allHTMLTags[i].className==theClass) {
					if(tipe=='exist')
					{
						ret=allHTMLTags[i];
						return true;
					}
					
					else if(tipe=='categoria')
					{
						if(allHTMLTags[i].innerHTML.toLowerCase().indexOf(text)>-1){
							ret=allHTMLTags[i];
							return true;
						}
					}
					
				}
		}
		
}
/*
CASOS
*/
if(document.getElementById('e_11121') || document.getElementById('email-email')){
	//sleep(1000);
	if(document.getElementById('e_11121')){
		document.getElementById('e_11121').value=login;
		document.getElementById('p_11121').value=passw;
	}else{
		document.getElementById('email-email').value=login;
		document.getElementById('password-password').value=passw;
	}
	if(document.getElementById('loginForm')){
		document.forms[0].submit();
	}else if(document.getElementById('login-form')){
		document.getElementById('login-form').submit();
	}else{
		document.getElementById('loginBox').submit();
	}
}else{
	if(document.getElementById('shippingForm')){
		javascript: var c= "Brasil"
		var deee= "BR";
		var pais = "Brasil";
		document.forms[0].elements[0].value = nome;
		document.forms[0].elements[1].value = sobrenome;
		document.forms[0].elements[2].value = endereco1;
		document.forms[0].elements[3].value = endereco2;
		document.forms[0].elements[4].value = cidade;
		document.forms[0].elements[5].value = estado;
		document.forms[0].elements[6].value = cep;
		document.forms[0].elements[10].value = tel;
		
		document.getElementById("c_11121").value = pais;
		document.getElementById("countryClicker").getElementsByTagName("SPAN")[0].innerHTML = pais;
		document.getElementById("_countryDetails").value = pais;
		window.location= "javascript: manipulateForm('"+deee+"');";void(0)
		document.getElementById('recaptcha_response_field').focus();
		
	}else if(document.getElementById('boutiques')){
		//document.ge//getElementById("btnRedeem")
		getElementByClass('boutiqueFrame bfs','categoria',categoria);
		window.location=ret.href;
	}else if(document.getElementById('products')){
		getElementByClass('productFrame pfs instock','categoria',produto);
		if(ret.href){
			//window.alert(ret);
			window.location=ret.href;
		}
	}else if (getElementByClass('btnRedeem','exist',null)){
			window.location=ret.href;
	}
}