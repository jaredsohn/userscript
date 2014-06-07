// ==UserScript==
// @name           ACAD Form Filler
// @namespace      https://www.acad.cefetmg.br/qacademico/index.asp?t=1022
// @description    Preencha automaticamente os questionarios do acad
// @version        0.7
// @include        https://www.acad.cefetmg.br/qacademico/*
// ==/UserScript==

function fillInput(){
	var i = 0, rating = 0, init = 487, init2 = 1179;
	while(i < 12){
		verificaPerguntaDesabilita(init + i, init2 + i*4 + rating);
		i++;
	}
	validateAndSubmit(getElementsByName("frmquestionario"));
}
styleMaroto = 
"#popupMaroto" + 
"{" +
	"background-color=rgba(0,0,0,0.75);" + 
	"border-radius=5px;" + 
	"width=200px;" + 
	"box-shadow:2px 2px 2px rgba(0,0,0,0.35); " +
	"height=200px;" + 
	"position:fixed; " + 
	"right:20px;" + 
	"top:20px;" + 
"}" +
"#popupMaroto input[type=\"button\"] {" + 
"margin:auto auto auto auto;" + 
"}";
popupHTML = 
'<div id="popupMaroto">' + 
	'<form>'+
		'<input type="button" onClick="fillInput()"/>' + 
	'</form>' + 
'</div>';
document.getElementsByTagName("body").innerHTML += styleMaroto + popupHTML;