// ==UserScript==
// @name         Lib XML functions
// @version	     1
// @namespace    HaShiShi
// @description  Biblioteca de funções de manipulação de XML
// ==/UserScript==

// ***************************************************************************
// ********** XML DataBase ***************************************************
// ***************************************************************************
var xml_special_to_escaped_one_map = {
	'&': '&amp;',
	'"': '&quot;',
	'<': '&lt;',
	'>': '&gt;'
};

var escaped_one_to_xml_special_map = {
	'&amp;': '&',
	'&quot;': '"',
	'&lt;': '<',
	'&gt;': '>'
};

function encodeXml_Disabled(string) { return string; }
function encodeXml(string) {
	return string.replace(/([\&"<>])/g, function(str, item) {
		return xml_special_to_escaped_one_map[item];
	});
};

function decodeXml(string) {
	return string.replace(/(&quot;|&lt;|&gt;|&amp;)/g, function(str, item) {
		return escaped_one_to_xml_special_map[item];
	});
}

function clsXmlDataBase(){
	
// Cria um docunento XML
this.createDoc = function(sXmlData, sTipo){
	var sXml = '', sDocType = '';
	var parser = new DOMParser();
	sDocType = 'text/xml';
	
	if(!sXmlData){sXmlData="";}
	
	switch(sTipo){
		case "xsl":
			sXml =	'<?xml version="1.0" encoding="ISO-8859-1"?>' +
					'<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">' +
					'<xsl:template match="/">' +
					'' + sXmlData + '' +
					'</xsl:template>' +
					'</xsl:stylesheet> ' +
					'' +
					'';
			break;
		default:
			sXml =	'<?xml version="1.0" encoding="ISO-8859-1"?>' +
					'<root>' +
					'' + sXmlData + '' +
					'</root>';
			break;
	}
	//alert(sXml);
	return parser.parseFromString(sXml, sDocType);
}

// Retorna a string XML
this.getXml = function(oDocXml){
	var sXml = (new XMLSerializer()).serializeToString(oDocXml);
	sXml = repl(sXml, '<?xml version="1.0" encoding="UTF-8"?>', '');
	sXml = repl(sXml, '<root>', '');
	sXml = repl(sXml, '</root>', '');
	sXml = repl(sXml, '<root/>', '');
	//sXml = decodeXml(sXml);
	return trim(sXml);
}

// Retorna uma objeto arry contendo os itens na lista;
this.getArray = function(oXmlDoc){
	
	var lista = getTags(oXmlDoc, "lista");
	
	if(!lista){
		alert("getArray erro: A tag lista não foi encontrada no objeto oXmlDoc: " + oXmlDoc)
		return null;
	}
	
	if(lista.length <= 0){return oXmlDoc} // vazio
	var atributos = lista[0].childNodes;
	
	var sCols = "";
	for(var i=0; i < atributos.length; i++){
		var oNode = atributos[i];
		var sep = "";
		if(i!=0){sep = ",";}
		sCols += sep + oNode.nodeName + ': "<xsl:value-of select="translate(' + oNode.nodeName + ',\'&quot;\',\'¨\')"/>"';
		//sCols += sep + oNode.nodeName + ': "<xsl:value-of select="' + oNode.nodeName + '"/>"';
	}
	
	var sXsl =	'new Array(' +
				'<xsl:for-each select="root/lista">' +
				'<xsl:if test="not(position()=1)">,</xsl:if>' +
				'{' + sCols + '}' +
				'</xsl:for-each>' + 
				');'
	var oXsl = this.createDoc(sXsl, 'xsl');
	var objProc = new XSLTProcessor();
	objProc.importStylesheet(oXsl);
	
	var oRet = objProc.transformToDocument(oXmlDoc);
	var sRet = this.getXml(oRet);
	sRet = repl(sRet, '<transformiix:result xmlns:transformiix="http://www.mozilla.org/TransforMiix">', '');
	sRet = repl(sRet, '</transformiix:result>', '');
	
	oRet = eval(sRet);
	
	for(var i=0; i < oRet.length; i++){
		for(a in oRet[i]){
			oRet[i][a] = repl(oRet[i][a], "¨", '"');
			//alert("Passo1: " + oRet[i][a])
			oRet[i][a] = decodeXml(oRet[i][a]);
			//alert("Passo2: " + oRet[i][a])
		}
	}
	
	return oRet;
}

// Adciona um elemento a lista
this.add = function (oDocXml, oAtr){
	//alert("addNode: " + oAtr + " = " + oAtr);
	var oNodeLista = oDocXml.createElement("lista");
	
	for(var sAtr in oAtr){
		//alert("addNode: " + sAtr + " = " + oAtr[sAtr]);
		var oNode = oDocXml.createElement(sAtr);
		//oNode.textContent = oAtr[sAtr];
		oNode.appendChild(oDocXml.createTextNode(oAtr[sAtr]));
		oNodeLista.appendChild(oNode);
	}
	getTags(oDocXml, "root")[0].appendChild(oNodeLista);
}

// Atualiza um elemento da lista
this.upd = function(oXmlDoc, oAtr, oAtrDados){
	var oRet = oXmlDoc;
	var oRoot = getTags(oRet, "root")[0];
	var lista = getTags(oRet, "lista");
	for(var i=0; i < lista.length; i++){
		var oNode = lista[i];
		var bFound = comparaAtributos(oAtr, oNode);
		if(bFound){
			for(var sAtr in oAtrDados){
				oNd = getTags(oNode, sAtr)[0];
				if(oNd.firstChild){
					oNd.firstChild.nodeValue = oAtrDados[sAtr];
				}
			}
			return oRet;
		}
	}
	return oRet;
}

this.max = function(oXmlDoc, sCampo){
	//eval('alert( { ' + sCampo + ': ""} )');
	var sN = "";
	if(sCampo.split("|").length>1){sN="|n"}
	var oTempDoc = this.createDoc(this.getXml(oXmlDoc));
	var oSort = eval('this.sort(oTempDoc, {' + sCampo.split("|")[0] + ': "desc' + sN + '"})');
	
	if(getTags(oSort, sCampo.split("|")[0]).length==0){
		return 0;
	}
	else{
	return getTags(oSort, sCampo.split("|")[0])[0].childNodes[0].nodeValue.toString();
	}
}

// Ordena o documento
// Ex: oAtr = {campo1: "desc", campo2: "asc|n"}
this.sort = function(oXmlDoc, oAtr){
	
	var lista = getTags(oXmlDoc, "lista");
	if(lista.length <= 0){return oXmlDoc} // vazio
	var atributos = lista[0].childNodes;
	
	var sCols = "";
	for(var i=0; i < atributos.length; i++){
		var oNode = atributos[i];
		sCols += '<' + oNode.nodeName + '><xsl:value-of select="' + oNode.nodeName + '"/></' + oNode.nodeName + '>';
	}
	
	var sSort = "";
	for(sAtr in oAtr){
		
		var sOrd = "";
		if(oAtr[sAtr].split("|")[0]=="desc"){
			sOrd=' order="descending"'
		}
		var sDt = "";
		if(oAtr[sAtr].split("|").length > 1){
			sDt='  data-type="number"'
		}
		sSort += '<xsl:sort select="' + sAtr + '" ' + sDt + ' ' + sOrd + '/>';
	}
	
	var sXsl =	'<xsl:for-each select="root/lista">' + sSort + '<lista>' + sCols + '</lista></xsl:for-each>'
	var oXsl = this.createDoc(sXsl, 'xsl');
	var objProc = new XSLTProcessor();
	objProc.importStylesheet(oXsl);
	
	var oRet = objProc.transformToDocument(oXmlDoc);
	var sRet = this.getXml(oRet);
	sRet = repl(sRet, '<transformiix:result xmlns:transformiix="http://www.mozilla.org/TransforMiix">', '')
	sRet = repl(sRet, '</transformiix:result>', '')
	oRet = this.createDoc(sRet, 'xml')
	return oRet;
}


// Exclui os elementos que os atributos combinem
// Ex: oAtr = {campo1: "'valor1'||'valor2'", campo2: "'valor'"}
// Excluirá: campo1 = 'valor1' ou 'valor2' e campo2 = 'valor'
this.del = function(oXmlDoc, oAtr){
	var oRet = this.createDoc(this.getXml(oXmlDoc));
	var oRoot = getTags(oRet, "root")[0];
	var lista = getTags(oRet, "lista");
	for(var i=0; i < lista.length; i++){
		var oNode = lista[i];
		var bFound = comparaAtributos(oAtr, oNode);
		if(bFound){
			oRoot.removeChild(oNode);
			lista = getTags(oRet, "lista");
			i--;
		}
	}
	return oRet;
}
// Retorna os elementos que os atributos combinem
// Ex: oAtr = {campo1: "'valor1'||'valor2'", campo2: "'valor'"}
// Retornará: campo1 = 'valor1' ou 'valor2' e campo2 = 'valor'
// Caso nada seja encontrado retornará NULL
this.query = function(oXmlDoc, oAtr){
	var oRet = this.createDoc(this.getXml(oXmlDoc));
	var oRoot = getTags(oRet, "root")[0];
	var lista = getTags(oRet, "lista");
	for(var i=0; i < lista.length; i++){
		var oNode = lista[i];
		
		var bFound = comparaAtributos(oAtr, oNode);
		if(!bFound){
			oRoot.removeChild(oNode);
			lista = getTags(oRet, "lista");
			i--;
		}
	}
	if(getTags(oRet, "lista").length == 0){oRet = null}
	return oRet;
}
// Compara os atributos em um node (aux: query, del)
function comparaAtributos(oAtr, oNode){
	for(sAtr in oAtr){
		oNd = getTags(oNode, sAtr)[0];
		mOr = ("'||" + oAtr[sAtr] + "||'").split("'||'");
		mOr.shift();mOr.pop();
		
		var b = false;
		for(var i=0; i < mOr.length; i++){
			//alert(oNd.nodeName + " => " + oNd.childNodes[0].nodeValue.toString() + " = " + mOr[i].toString())
			if( oNd.childNodes[0].nodeValue.toString() == mOr[i].toString() ){
				b = true;
			}
		}
		if(!b){return false}
		
	}
	return true;
}
}
// ***************************************************************************
// ***************************************************************************