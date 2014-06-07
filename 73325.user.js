// ==UserScript==
// @name         Lib Aux functions
// @version	     1
// @namespace    HaShiShi
// @description  Biblioteca de funções auxiliares
// ==/UserScript==

// ***************************************************************************
// ********** Funções Auxiliáres *********************************************
// ***************************************************************************

// Retorna o objeto pelo id
function getId(sId){return document.getElementById(sId)}
// Retorna os objetos pela Tag
function getTags(oObj, sTag){
	if(!oObj){alert("getTags erro: oObj não definido.\nTag a ser procurada:" + sTag); return null;}
	return oObj.getElementsByTagName(sTag)
}

// Exibe uma janela com a mensagem
function alertNewWindow(sMsg){
	unsafeWindow.sNewWindowText = '<textarea style="width: 100%; height: 100%; overflow: scroll;" wrap="off">' + sMsg + '</textarea>';
	window.open("javascript: document.write(opener.sNewWindowText)", "alertNewWindow", "toolbar=0, menubar=0, status=0, width=850, height=650");
}

function alertXml(oDoc, bNewWindow){
	var sXml = oXmlDb.getXml(oDoc);
	sXml = repl(sXml, '</lista><lista>', '</lista>\n<lista>');
	sXml = repl(sXml, '></lista>', '>\n</lista>');
	sXml = repl(sXml, '><', '>\n\t<');
	if(!bNewWindow)
		alert(sXml);
	else
		alertNewWindow(sXml);
}

function alertObj(oObj, bNewWindow){
	var s = "";
	for(var x in oObj){
		s += x + " = " + oObj[x] + "\n";
	}
	if(!bNewWindow)
		alert(s);
	else
		alertNewWindow(s);
}

// Insere um tratamento de evento ao objeto
function addEvent(oObj, sEvent, fn, capture, e) { oObj.addEventListener((e||"") + sEvent, fn, !!capture); return oObj; }
// Remove um tratamento de evento ao objeto
function remEvent(oObj, sEvent, fn, capture, e) { oObj.removeEventListener((e||"") + sEvent, fn, !!capture); return oObj; }
// Cancela o menu de contexto
function noContextMenu(event){ event.preventDefault(); event.stopPropagation(); }

// Retorna um número inteiro
function ExtractNumber(value){
	var n = parseInt(value);
	return n == null || isNaN(n) ? 0 : n;
}

//Auxilia a chegagem dos valores padrão
function _vP(sVarName, sDefaultValue){
	//alert(sVarName + " = " + _gV(sVarName))
	if(!_gV(sVarName)){
		_sV(sVarName, sDefaultValue);
	}
}

// Adciona valores a um array
function addArray(oArray, sVals){oArray[oArray.length] = sVals.split(",");}

// Remove o foco dos botões, eliminando assim a marca de seleção
function removeFocoBotoes(sIdBotao){
	addEvent(getId(sIdBotao), "mousedown", function(){ this.blur(); });
	addEvent(getId(sIdBotao), "mouseup", function(){ this.blur(); });
	addEvent(getId(sIdBotao), "mousemove", function(){ this.blur(); });
	addEvent(getId(sIdBotao), "mouseout", function(){ this.blur(); });
}

// Insere o node depois dos node especificado
function insertAfter(node, referenceNode) {
  referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}

// Retorna o node, do tipo element, anterior
function getPreviousSibling(n)
{
	var x=n.previousSibling;
	while (x.nodeType!=1)
	{
		x=x.previousSibling;
	}
	return x;
}

// Retorna o primeiro node filho do tipo element
function getFirstChild(n)
{
	var x=n.firstChild;
	while (x.nodeType!=1)
	{
		x=x.nextSibling;
	}
	return x;
}

// Concactena á uma string uma outra, um determinada quantidade de vezes
function concatS(str, qtd, s){ret = str; for(var i=0; i < qtd - str.length; i++){ret+=s;} return ret;}

function getStrRes()
{
	nMaxArg = 0;
	for(var i=0; i < arguments.length; i++){if(arguments[i].toString().length > nMaxArg){nMaxArg=arguments[i].toString().length;}}
	var oDate = new Date();
	var sDB = 'oResDB = {\n    ' + concatS('updateIn', nMaxArg, " ") + ' : "' + oDate.toString() + '"\n';
	for(var i=0; i < arguments.length; i++){
		var sRes = GM_getResourceURL(arguments[i]);
		var s = quebraRes(sRes, 900, nMaxArg);
		sDB += '   ,' + concatS(arguments[i], nMaxArg, " ") + ' : "' + s + '"\n';
	}
	sDB += '}'
	return sDB
}

// Quebra o recurso e identa auxiliando a visualização do código (Auxilia "getStrRes()")
function quebraRes(sRes, nLenBloco, nLenIdent){
	nLenIdent += 7;
	var n = 0, s = '';
	var ret = '';
	for(var i=0; i < sRes.length; i++){
		n++;
		s += sRes.substring(i, i+1);
		if(n >= nLenBloco){
			ret += s + '" +\n' + concatS('', nLenIdent, ' ') +'"';
			
			s = '';
			n = 0;
		}
	}
	ret += s + ''
	return ret;
}

// Remove espaços antes e depois da string
function trim(str)
{
	s = str.replace(/^(\s)*/, '');
	s = s.replace(/(\s)*$/, '');
	return s;
}

function repl( aonde, oque, por )
{
	prok=0
	aonde = aonde.toString()
	oque = oque.toString()
	por = por.toString()
	
	while( prok != -1 )
	{
		aonde = aonde.replace(oque,por)
		prok = aonde.indexOf(oque)
	}
	return aonde
}

// Cria um elemento com seus atributos e eventos
function cE(sTag, oAtributos, oEventos){
	var oEle = document.createElement(sTag);
	if(oAtributos){
		for(var sAtr in oAtributos){
			oEle.setAttribute(sAtr, oAtributos[sAtr]);
		}
	}
	if(oEventos){
		for(var sEve in oEventos){
			addEvent(oEle, sEve, oEventos[sEve])
		}
	}
	return oEle;
}
