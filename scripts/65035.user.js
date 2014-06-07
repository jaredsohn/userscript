var meta = <><![CDATA[
// ==UserScript==
// @name 		Monitor de Lances do ONL
// @author		Slovsky
// @version 	1.1.0
// @description	Monitora o leilão, gerado o histórico completo dos lances a partir do momento que entrar na tela de leilão de um produto específico. Com este histórico, gera lista do número de lances por jogador.
// @copyright	© Slovsky, 2009-2010
// @license 	Public Domain
// @include 	http://www.olhonolance.com.br/LeilaoDetalhes.aspx*
// ==/UserScript==
]]></>.toString();

function principal(){

	var GERAL = new Object();	
	GERAL.temLimite = false;
	GERAL.numLimiteAtualizacao = 0;
	GERAL.numAtualizacao = 0;
	GERAL.link = window.location.href;
	GERAL.codLeilao = GERAL.link.split("=")[1];
	GERAL.tela = '';

	var arrayLista = new Array();
	var arraySumario = new Array();
	
	acss = "#monitor {position:absolute; display:block; padding:1px; z-index:50;clear:both; border:1px solid #000000; background-color:#C0C0C0; z-index:1000;width:400px; height:397px; top:10px; left:10px; text-align:center; font-weight:bold;}"+
	"#conteudo {display:block; padding:1px; z-index:50;clear:both; border:1px solid #000000; background-color:#E0E0E0;}"+
	"#cab {display:block; padding:3px; z-index:50;clear:both; border:1px solid #000000; background-color:#E0E0E0;}"+
	"#sumario {display:block; padding:3px; clear:both; border:1px solid #000000; background-color:#E0E0E0;overflow:auto;}"+
	"#lances {display:block; padding:3px; clear:both; border:1px solid #000000; background-color:#E0E0E0;overflow:auto;}";
	GM_addStyle(acss);

	var oDiv = $d("", [['id', 'monitor'], ['name', 'monitor']]);
	var dDiv = $d("Monitor de Lances", [['id', 'conteudo'], ['name', 'conteudo']]);
	makeDraggable(oDiv,dDiv);
	oDiv.appendChild(dDiv);
	document.body.appendChild(oDiv);
	
	conteudo = $g("conteudo");
	
	var cab = $d("&nbsp;", [['id', 'cab'], ['name', 'cab'], ['style', 'text-align:left;visibility:display;position:absolute;width:392px;height:36px;top:19px;left:1px;']]);
	conteudo.appendChild(cab);

	var sumario = $d("Carregando...", [['id', 'sumario'], ['name', 'sumario'], ['style', 'text-align:left;visibility:display;position:absolute;width:191px;height:326px;top:64px;left:1px;']]);
	conteudo.appendChild(sumario);

	var lances = $d("Carregando...", [['id', 'lances'], ['name', 'lances'], ['style', 'text-align:left;visibility:display;position:absolute;width:192px;height:326px;top:64px;left:201px;']]);
	conteudo.appendChild(lances);
	
	setTimeout(function () {getLista();}, 10000);

	function getLista(){
		var p1 = $xf(".//span[@id='ctl00_ContentPlaceHolder1_Control_DetalhesProduto1_lblPrecoMercado1']");
		var f1 = $xf(".//span[@id='ctl00_ContentPlaceHolder1_Control_DetalhesProduto1_lblValorFrete']");

		preco = p1.snapshotItem(0).innerHTML.toString();
		frete = f1.snapshotItem(0).innerHTML.toString();		
		if(cab)cab.innerHTML = "Preço suposto: " + preco + " - Frete: " + frete + "<br/>\n";

		var d1 = $xf(".//span[@class='DIV_DetalhesHistoricoLance']");
		var d2 = $xf(".//span[@class='DIV_DetalhesHistoricoUsuario']");
		
		for (var i = 0; i < d1.snapshotLength; i++) {
			var chave = d1.snapshotItem(i).innerHTML.toString();
		    addElemento(arrayLista, chave, d2.snapshotItem(i).innerHTML.toString());
		}
		arrayLista.sort();
		montaSumario();
		if(sumario)sumario.innerHTML = mostraArray(arraySumario);
		if(lances)lances.innerHTML = mostraArray(arrayLista);

		total = parseFloat(arrayLista[arrayLista.length-1][0].toString().replace("R$ ","").replace(",","."));
		total += parseFloat(frete.toString().replace("R$ ","").replace(",","."));
		total += parseFloat(getNumLances(arrayLista[arrayLista.length-1][1].toString().replace("R$ ","").replace(",",".")));		
		total = "R$ " + total.toString().split(".")[0] + "," + total.toString().split(".")[1].substring(0,2);

		if(cab)cab.innerHTML += "Custo comprador: " + arrayLista[arrayLista.length-1][0].toString() + " + Frete: " + frete + " + Lances: " + getNumLances(arrayLista[arrayLista.length-1][1].toString()) + " = " + total;
		
		updateLista();
	};

	function updateLista(){
		GERAL.numAtualizacao += 1;
		
		var d1 = $xf(".//span[@class='DIV_DetalhesHistoricoLance']");
		var d2 = $xf(".//span[@class='DIV_DetalhesHistoricoUsuario']");
		
		for (var i = 0; i < d1.snapshotLength; i++) {
			var chave = d1.snapshotItem(i).innerHTML.toString();
		    addElemento(arrayLista, chave, d2.snapshotItem(i).innerHTML.toString());
		}
		
		montaSumario();
		if(sumario)sumario.innerHTML = mostraArray(arraySumario);
		if(lances)lances.innerHTML = mostraArray(arrayLista);
		
		if(GERAL.temLimite) {
			if(GERAL.numAtualizacao <= GERAL.numLimiteAtualizacao) {setTimeout(function () {updateLista();}, 5000);}
		} else {		
			setTimeout(function () {updateLista();}, 5000);
		}
	};

	function existeElemento(arrObj, chave) {
		var retorno = -1;
		for(var i=0;i < arrObj.length; i++) {
			if(arrObj[i][0] == chave) {retorno = i; break;}
		}
		return retorno;
	};
	
	function addElemento(arrObj, chave, valor) {	
		if(existeElemento(arrObj,chave) < 0) {
			arrObj.push(new Array(chave, valor));
		}	
	};
	
	function montaSumario() {
		arraySumario = [];
		for(var i=0;i < arrayLista.length; i++) {
			var x = existeElemento(arraySumario,arrayLista[i][1]);
			if(x < 0) {
				addElemento(arraySumario,arrayLista[i][1],1);
			} else {
				arraySumario[x][1] += 1;
			}
		}
		arraySumario.sort(sortMulti);
	};

	function getNumLances(sUsuario) {
		var a = "";
		for(var i=0;i < arraySumario.length; i++) {
			if(sUsuario==arraySumario[i][0]) {			
				a = arraySumario[i][1];
				break;
			}
		}
		return a;
	};

	function sortMulti(a,b) {
	    return ((a[1] > b[1]) ? -1 : ((a[1] < b[1]) ? 1 : 0));
	}

	function mostraArray(arrObj) {
		var a = "";
		for(var i=0;i < arrObj.length; i++) {			
			a += arrObj[i][0] + "(" + arrObj[i][1] + ")<br/>\n";
		}
		return a;
	};
	
	//***********************************************
	//FUNÇÕES GERAIS
	//***********************************************
	function $d(iHTML, att) {var aDiv = document.createElement("DIV"); aDiv.innerHTML = iHTML; $at(aDiv, att); return aDiv;};
	function $at(aElem, att) {if (att !== undefined) {for (var xi = 0; xi < att.length; xi++) {aElem.setAttribute(att[xi][0], att[xi][1]); if (att[xi][0].toUpperCase() == "TITLE") aElem.setAttribute("alt", att[xi][1]);};};};
	function $e(aType, iHTML){var ret = document.createElement(aType); if (iHTML) ret.innerHTML = iHTML; return ret;};
	function $g(aID) {return (aID != "" ? document.getElementById(aID) : null);};
	function $xf(query) {return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);}

	//© Copyright 2007 Richard Laffers (http://userscripts.org/scripts/show/35277)
	//Start of Drag-n-drop
	var mouseOffset = null;
	var iMouseDown = false;
	var lMouseState = false;
	var dragObject = null;
	var curTarget = null;

	function mouseCoords(ev) {return {x:ev.pageX, y:ev.pageY};};
	function getMouseOffset(target, ev){var docPos = getPosition(target); var mousePos = mouseCoords(ev); return {x:mousePos.x - docPos.x, y:mousePos.y - docPos.y};};
	function mouseDown(ev){var target = ev.target; iMouseDown = true; if (target.getAttribute('DragObj')) return false;};

	function getPosition(e) {
		var dx = 0;
		var dy = 0;
		while (e.offsetParent){
			dx += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
			dy += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
			e = e.offsetParent;
		};
		dx += e.offsetLeft + (e.currentStyle?(parseInt(e.currentStyle.borderLeftWidth)).NaN0():0);
		dy  += e.offsetTop  + (e.currentStyle?(parseInt(e.currentStyle.borderTopWidth)).NaN0():0);
		return {x:dx, y:dy};
	};

	function mouseMove(ev) {
		var target = ev.target;
		var mousePos = mouseCoords(ev);
		if (dragObject) {
			oSpos = dragObject.style.position;
			dragObject.style.position = 'absolute';
			dragObject.style.top = (mousePos.y - mouseOffset.y) + 'px';
			dragObject.style.left = (mousePos.x - mouseOffset.x) + 'px';
			dragObject.style.position = oSpos;
		};
		lMouseState = iMouseDown;
		return false;
	};

	function mouseUp(ev){
		if (dragObject) {
			var dOx = dragObject.style.left;
			var dOy = dragObject.style.top;
			var strXY = (dOx + "|" + dOy).replace("px", '').replace("px", '');
		};
		dragObject = null;
		iMouseDown = false;
	};

	function makeDraggable(parent, item){
		document.addEventListener('mousemove', mouseMove, false);
		document.addEventListener('mousedown', mouseDown, false);
		document.addEventListener('mouseup', mouseUp, false);
		if (!parent || !item) return;
		item.addEventListener('mousedown',function(ev){
			dragObject = parent;
			mouseOffset = getMouseOffset(parent, ev);
			document.body.appendChild(parent);
			return false;
		}, false);
	};
	//End of Drag-n-drop

};

if (window.addEventListener) {
	window.addEventListener("load", setTimeout(principal(),5000), false);
} else {
	window.attachEvent("onload", setTimeout(principal(),5000));
};
