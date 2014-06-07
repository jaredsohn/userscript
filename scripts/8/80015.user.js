// ==UserScript==
// @name           GLTb teste001
// @description    Teste de script
// @include        https://www.hsbc.com.br/*
// @match        https://www.hsbc.com.br/*
// ==/UserScript==


{
	form = document.getElementByID("call-me-back");
	if(form == null){
		alert("formulário nulo");
	}
        else{
		alert("formulário ok");
	}


}