// ==UserScript==
// @name           w3erp2
// @namespace      http://linkcom.w3erp.com.br/*
// @include        http*w3erp.com.br/*
// ==/UserScript==

// largura 100%
var corpo = document.getElementById("corpo");
corpo.style.width = "100%";
var divs = corpo.childNodes;
for (var  i = 0; i < divs.length; i++)
	if (divs[i].nodeType == 1)
		divs[i].style.width = "100%";

// login ativo
var frame = document.createElement("iframe");
//frame.setAttribute("src", "http://linkcom.w3erp.com.br/w3mpsbr/login/Index");
frame.setAttribute("frameborder", 0);
frame.setAttribute("height", 1);
frame.setAttribute("width", 1);
document.body.appendChild(frame);

function reloadPage(){
	frame.setAttribute("src", "http://linkcom.w3erp.com.br/w3mpsbr/login/Index");
}
setInterval(reloadPage, 600000);

var date = new Date();

if (date.getHours() == 14 && date.getMinutes() % 10 == 0){
	var styles = document.createElement("style");
	styles.setAttribute("type", "text/css");
	styles.innerHTML = ".contextbt a { visibility: visible; } tr.listagemBody1:hover .contextbt a, tr.listagemBody2:hover .contextbt a {visibility: hidden !important;} input:hover, select:hover, textarea:hover, input:focus, select:focus, textarea:focus { visibility: hidden !important; }";
	
	document.body.appendChild(styles);
}

if (date.getHours() >= 15){

	// autorização de trabalho
	var tabelaResultadosCrudDefault = document.getElementById("tabelaResultadosCrudDefault");
	if (tabelaResultadosCrudDefault){
		var tbody = tabelaResultadosCrudDefault.getElementsByTagName("TBODY");
		var linhas = tbody[0].getElementsByTagName("TR");
		for (var tr in linhas){
			var col = linhas[tr].getElementsByTagName("TD");
		
			// Cliente/Contrato
			/*var contratoSpan = col[0].getElementsByTagName("SPAN");
			contratoSpan[0].style.color = "#3875D7";
			contratoSpan[1].style.color = "#888";
			contratoSpan[0].style.display = "block";
			contratoSpan[1].style.display = "block";
			col[0].style.textShadow = "0 1px 0px #FFF";
		
			// Data
			col[1].style.color = "#BBBBBB";
			var dataSpan = col[1].getElementsByTagName("SPAN");
			dataSpan[0].style.color = "#444444";
			dataSpan[1].style.color = "#3875D7";
		
			// Responsável
			col[2].style.fontSize = 8;
			col[2].style.color = "#888888";
		
			// Responsável
			col[3].style.fontSize = 8;
			col[3].style.color = "#888888";
			*/
			// Andamento
			var andamentoIMG = col[4].getElementsByTagName("IMG");
			chAndamentoColor(andamentoIMG[0], col[4]);
			col[4].style.textShadow = "0 1px 0px #FFF";
		
			// Prioridade
			var prioridadeIMG = col[5].getElementsByTagName("IMG");
			chPrioridadeColor(prioridadeIMG[0], col[5]);
			col[5].style.textShadow = "0 1px 0px #FFF";
		
			// Etapa
			var etapaSPAN = col[6].getElementsByTagName("SPAN");
			chEtapaColor(etapaSPAN[0], col[6]);
			col[6].style.textShadow = "0 1px 0px #FFF";
		
			/*
			// Iteração
			col[7].style.fontSize = 8;
			*/
			// Descrição
			////col[8].style.fontSize = 8;
		
			// Botões
			col[9].className = "contextbt";
		
		}
	}
}

var smileTimer = setInterval(function(){
	var now = new Date();
	if (now.getHours() == 16 && now.getMinutes() == 0){
		clearInterval(smileTimer);
		var smile = document.createElement("img");
		smile.src = "http://www.penn-olson.com/wp-content/uploads/2009/12/smile.png";
		smile.setAttribute("style","width:498;height:497;margin:-249px 0 0 -249px;position:absolute;top:50%;left:50%;");
		document.body.appendChild(smile);
	}
}, 500);

var alertTimer = setInterval(function(){
	var now = new Date();
	if (now.getHours() == 16 && now.getMinutes() == 30){
		clearInterval(alertTimer);
		alert("Você já abraçou seus amigos hoje?");
	}
}, 500);

var pongTimer = setInterval(function(){
	var now = new Date();
	if (now.getHours() == 17 && now.getMinutes() == 0){
		clearInterval(pongTimer);
		window.open("http://stewd.io/pong/");
	}
}, 500);

var listaPendenciaEmaberto = document.getElementById("listaPendenciaEmaberto");
if (listaPendenciaEmaberto){
	function reloadColors(){
		var selects = listaPendenciaEmaberto.getElementsByTagName("SELECT");
		for(var s in selects){
			chComboColor(selects[s]);
			/*(function(combo){
				combo.onChange = function(){ chComboColor(combo); };
			})(selects[s]);*/
		}
	}
	setInterval(reloadColors, 1000);
}

function chComboColor(combo){
	var val = combo.options[combo.selectedIndex].value;
	if (val == "br.com.linkcom.w3mpsbr.beans.PendenciaStatus[cdpendenciastatus=0]"){ // Em aberto
		combo.style.backgroundColor = "#FFFF88";
	}else if (val == "br.com.linkcom.w3mpsbr.beans.PendenciaStatus[cdpendenciastatus=1]"){ // Concluído
		combo.style.backgroundColor = "#EEFFEE";
	}else if (val == "br.com.linkcom.w3mpsbr.beans.PendenciaStatus[cdpendenciastatus=2]"){ // Inválido
		combo.style.backgroundColor = "#FFEEEE";
	}else if (val == "br.com.linkcom.w3mpsbr.beans.PendenciaStatus[cdpendenciastatus=3]"){ // Não corrigido
		combo.style.backgroundColor = "#FFEEEE";
	}else if (val == "br.com.linkcom.w3mpsbr.beans.PendenciaStatus[cdpendenciastatus=4]"){ // Duplicado
		combo.style.backgroundColor = "#FFEEEE";
	}else if (val == "br.com.linkcom.w3mpsbr.beans.PendenciaStatus[cdpendenciastatus=5]"){ // Resolvido
		combo.style.backgroundColor = "#AAFFAA";
	}else{
		combo.style.backgroundColor = "#FFF9D0";
	}
}

function chPrioridadeColor(img, td){
	var val = img.getAttribute("alt");
	if (val == "Sem prioridade"){
		td.style.color = "#888888";
		td.style.fontStyle = "italic";
		td.innerHTML = "Deixa pra depois";
	}else if (val == "Baixa"){
		td.style.color = "#8080FF";
		td.innerHTML = "Finje que esqueceu";
	}else if (val == "Alta"){
		td.style.color = "#FF8030";
		td.style.fontWeight = "bold";
		td.innerHTML = "Manda pro estagi&aacute;rio";
	}else if (val == "Urgente"){
		td.style.color = "#FF0000";
		td.style.fontWeight = "bold";
		td.innerHTML = "Corre que a Liliam est&aacute; chegando";
	}else if (val == "Média" || val == "M&eacute;dia"){
		td.style.color = "#BB9000";
		td.innerHTML = "Espera algu&eacute;m reclamar";
	}else{
		td.style.color = "#BB9000";
		td.innerHTML = "Espera algu&eacute;m reclamar";
	}
}

function chAndamentoColor(img, td){
	var val = img.getAttribute("alt");
	if (val == "Cancelada"){
		td.style.color = "#888888";
		td.innerHTML = "Deixa pra l&aacute;";
	}else if (val == "Concluída"){
		td.style.color = "#00AA00";
		td.innerHTML = "Prontinha";
	}else if (val == "Em andamento"){
		td.style.color = "#EBA139";
		td.innerHTML = "Tamo indo";
	}else if (val == "Em espera"){
		td.style.color = "#000000";
		td.innerHTML = "Mofando";
	}else if (val == "Faturado"){
		td.style.color = "#00AA00";
		td.innerHTML = "J&aacute; est&aacute; pagando";
	}
}

function chEtapaColor(span, td){
	var val = span.innerHTML;
	if (val == "Coleta"){
//		td.style.color = "#888888";
		span.innerHTML = "Pegando as coisinhas";
	}else if (val == "Em aguardo"){
//		td.style.color = "#00AA00";
		span.innerHTML = "Cliente enrolado";
	}else if (val == "Verificar"){
//		td.style.color = "#EBA139";
		span.innerHTML = "V&ecirc; se fez direitinho";
	}else if (val == "Teste"){
//		td.style.color = "#000000";
		span.innerHTML = "Mais um teste chato";
	}else if (val == "Executar"){
//		td.style.color = "#00AA00";
		span.innerHTML = "Botando pra quebrar";
	}
}

