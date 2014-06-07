// ==UserScript==
// @name           votacao bbb
// @namespace      bigbode
// @description    votar
// @include        http://*.globo.com/bbb/bbb1*/votacao/*
// @updateURL      http://userscripts.org/scripts/source/156580.user.js
// @version 	   1.7
// ==/UserScript==


var url = location.href;


if(url.match("sucesso")) {

	document.getElementsByClassName('continue')[0].click();
	
	if(!GM_getValue('somavoto')){
		var somavoto = 0;
		GM_setValue('somavoto', somavoto);
	} 
	var somavoto = GM_getValue('somavoto') + 1;
	GM_setValue('somavoto', parseInt(somavoto));	

} else {
	
	insereBotao();
	insereContador();

	var targImg = document.querySelector ("div.box-votacao img.foto-chamada[alt='" + GM_getValue('votarno') + "']");
	targLink = targImg.parentNode;
	targListItem = targImg.parentNode.parentNode.parentNode;

	clickNode (targListItem);

	var ps = unsafeWindow.ps;
	for (var j in ps) {
	   		if (ps[j].className) {
	       		ps[j].className = ps[j].className.replace ("on", "off");
	   		}
	}
	targListItem.className  = targListItem.className.replace ("off", "on");
	targListItem.getElementsByTagName ("input")[0].checked = "true";

	var captchaBox  = document.querySelector ("#desabilitado");
	if (captchaBox) {
	    	captchaBox.id = "habilitado";
	}

	document.getElementsByName('answer')[0].focus();
	


}

function clickNode (targNode) {
    var clickEvent  = document.createEvent ('MouseEvents');
    clickEvent.initEvent ('click', true, true);
    targNode.dispatchEvent (clickEvent);
}

function insereBotao() {
	
	var quantos = document.getElementsByClassName("foto-chamada").length;

	
	var sms = document.getElementsByClassName("msg-SMS msg-blateral")[0];
	
	sms.appendChild(document.createElement('br'));
	sms.appendChild(document.createElement('br'));

	if(quantos == 2) {	
		sms.innerHTML = '<div class="msg-SMS msg-blateral">Voto pelo telefone ou SMS possui o custo de uma ligação local + impostos.</div><br><br> <div align="center"><span class="campos" align="center">  Selecionar Participante: </span><br><input id="primeiro"        class="campos" name="radio" type="radio">' + document.getElementsByClassName("foto-chamada")[0].getAttribute("alt") + '		</input><input id="segundo"        class="campos" name="radio" type="radio">' + document.getElementsByClassName("foto-chamada")[1].getAttribute("alt") + '</input></div> <br> <div id="zerar" align="center"></div>';
		
		
		//--- Grava escolha ao clicar e atualiza a pagina para escolher a opcao marcada
		document.getElementById("primeiro").onclick = function() { 
			GM_setValue('votarno', document.getElementsByClassName("foto-chamada")[0].getAttribute("alt")); 
			location.href=location.href;	
		}	
		
		document.getElementById("segundo").onclick = function() { 
			GM_setValue('votarno', document.getElementsByClassName("foto-chamada")[1].getAttribute("alt")); 
			location.href=location.href;	
		}	
			
	}
	
	if(quantos == 3) {
		sms.innerHTML = '<div class="msg-SMS msg-blateral">Voto pelo telefone ou SMS possui o custo de uma ligação local + impostos.</div><br><br> <div align="center"><span class="campos" align="center">  Selecionar Participante: </span><br><input id="primeiro"        class="campos" name="radio" type="radio">' + document.getElementsByClassName("foto-chamada")[0].getAttribute("alt") + '		</input><input id="segundo"        class="campos" name="radio" type="radio">' + document.getElementsByClassName("foto-chamada")[1].getAttribute("alt") + '</input><input id="terceiro"        class="campos" name="radio" type="radio">' + document.getElementsByClassName("foto-chamada")[2].getAttribute("alt") + '</input></div> <br> <div id="zerar" align="center"></div>';
		
		//--- Grava escolha ao clicar e atualiza a pagina para escolher a opcao marcada
		document.getElementById("primeiro").onclick = function() { 
			GM_setValue('votarno', document.getElementsByClassName("foto-chamada")[0].getAttribute("alt")); 
			location.href=location.href;	
		}	
		
		document.getElementById("segundo").onclick = function() { 
			GM_setValue('votarno', document.getElementsByClassName("foto-chamada")[1].getAttribute("alt")); 
			location.href=location.href;	
		}	
		
		document.getElementById("terceiro").onclick = function() { 
			GM_setValue('votarno', document.getElementsByClassName("foto-chamada")[2].getAttribute("alt")); 
			location.href=location.href;	
		}	
			
	}
		
		
		//--- Checa escolha
		if( GM_getValue("votarno") == null ) {
			GM_setValue("votarno", false);
		} if( (GM_getValue("votarno") !== document.getElementsByClassName("foto-chamada")[0].getAttribute("alt")) && (GM_getValue("votarno") !== document.            getElementsByClassName("foto-chamada")[1].getAttribute("alt")) && (GM_getValue("votarno") !== document.getElementsByClassName("foto-chamada")[2].			            getAttribute("alt")) ) {
			GM_setValue("votarno", false);
		} else if (GM_getValue("votarno") == document.getElementsByClassName("foto-chamada")[0].getAttribute("alt")) {
			document.getElementById("primeiro").checked = true;
		} else if (GM_getValue("votarno") == document.getElementsByClassName("foto-chamada")[1].getAttribute("alt")) {
			document.getElementById("segundo").checked = true;
		} else {
			document.getElementById("terceiro").checked = true;
		}
				

}

function insereContador() {
		var ins = document.getElementById("zerar");
		vot = document.createElement('button');
		vot.appendChild(document.createTextNode(GM_getValue("somavoto")));
		vot.addEventListener("click", function(){ GM_setValue('somavoto', 0); location.href=location.href; }, false);
		ins.appendChild(document.createTextNode("Votos:"));
		ins.appendChild(vot);
}