var scriptMetadata = parseMetadata(<><![CDATA[
// ==UserScript==
// @name         Ikariam Lista de Links
// @version	     0.01 (beta)
// @namespace    HaShiShi
// @description  Este script permite a criação e manutenção de uma lista de liks. Você poderá criar grupos e adcionar links para as cidades ou ilhas que desejar.
//
// @include      http://s*.ikariam.*/index.php*
// 
// @require      http://userscripts.org/scripts/source/73325.user.js
// @require      http://userscripts.org/scripts/source/73327.user.js
// @require      http://userscripts.org/scripts/source/73324.user.js
// @require      http://userscripts.org/scripts/source/73323.user.js
// @require      http://userscripts.org/scripts/source/73326.user.js
//
// @resource     CSS_FILE   http://userscripts.org/scripts/source/73321.user.js
// ==/UserScript==
]]></>.toString());
function parseMetadata(a){var b=a.split(/[\r\n]+/).filter(/\/\/ @/);var c={include:[],exclude:[]};for each(var d in b){[d,name,value]=d.match(/\/\/ @(\S+)\s*(.*)/);if(c[name]instanceof Array)c[name].push(value);else c[name]=value}return c}
// ====================================================================================
// This script has been made by HaShiShi based on (Ikariam City List) Elnaira's script 
// ====================================================================================

// ***************************************************************************
// ********** Funções GM *****************************************************
// ***************************************************************************
function _sV(sVarName, sValue){ GM_setValue(sVarName, sValue); }
function _gV(sVarName, sDefaultValue){ if(!sDefaultValue){sDefaultValue="";} return GM_getValue(sVarName, sDefaultValue); }
// ***************************************************************************
// ***************************************************************************

// Criando um elemento antes do body (Fugir da pré-formatação do css da página de opções)
var FakeBody = document.createElement("fakeBody")
FakeBody.setAttribute('id', 'FakeBody');
FakeBody.setAttribute('class', 'ccsFakeBody');	
document.body.parentNode.insertBefore(FakeBody, document.body);

// ***************************************************************************
// *********** Styles ********************************************************
// ***************************************************************************
// Adciona o CSS ao documento
if(!window.addGlobalStyle){ function addGlobalStyle(css){var head, style; head = document.getElementsByTagName('head')[0]; if (!head) {return;}; style = document.createElement('style'); style.type = 'text/css'; style.innerHTML = css; head.appendChild(style);}}
// Acessando o arquivo css de recurso externo;
var sCss = GM_getResourceURL("CSS_FILE");
sCss = sCss.replace("data:text/css;base64,", "");
sCss = decodeBase64(sCss)
sCss = sCss.split("///*end_header*/")[1]

addGlobalStyle( "" + <><![CDATA[
.shadow1 {float: left; background: url(]]></> + oResDB.BG_shadow + <><![CDATA[) no-repeat bottom right; margin: 10px 0 0 10px;}
.shadow2 {margin: -6px 6px 6px -6px}
]]></>.toString() + "\n" + sCss + "");

// ***************************************************************************
// ***************************************************************************

// ***************************************************************************
// ********** Inicializando as variáveis *************************************
// ***************************************************************************
var bAberto = false;
var sIdLinkSel = "";
var sIdGrupoSel = "";
var sIdIconSel = "";

// === Controles das variáveis GM ===
var sHost = window.document.location.host;
var oXmlDb = new clsXmlDataBase();

var llToggleWinOpen = "llToggleWinOpen" + sHost; _vP(llToggleWinOpen, "0");
var llJanPrincCoords = "llJanPrincCoords" + sHost; _vP(llJanPrincCoords, "50,50"); //_sV(llJanPrincCoords, "10, 10");

// === Controle as listas ===
var llXmlLinks = "llXmlLinks" + sHost; _vP(llXmlLinks, ""); //_sV(llXmlLinks, "");
var oLinksXmlDoc = oXmlDb.createDoc(_gV(llXmlLinks));

var llXmlGrupos = "llXmlGrupos" + sHost; _vP(llXmlGrupos, ""); //_sV(llXmlGrupos, "");
var oGruposXmlDoc = oXmlDb.createDoc(_gV(llXmlGrupos));

var llXmlIcones = "llXmlIcones" + sHost; _vP(llXmlIcones, ""); //_sV(llXmlIcones, "");
var oIconesXmlDoc = oXmlDb.createDoc(_gV(llXmlIcones));

//alertXml(oGruposXmlDoc);
// ***************************************************************************
// ***************************************************************************

// ***************************************************************************
// ********** Ícones Padrão **************************************************
// ***************************************************************************
var oIconesPadrao = {
	 ICON_Predio1	: oResDB.ICON_Predio1
	,ICON_Predio2	: oResDB.ICON_Predio2
	,ICON_Predio3	: oResDB.ICON_Predio3
	,ICON_Predio4	: oResDB.ICON_Predio4
	,ICON_Ilha		: oResDB.ICON_Ilha
	,ICON_Capacete	: oResDB.ICON_Capacete
	
	,ICON_Unidade1	: oResDB.ICON_Unidade1
	,ICON_Unidade2	: oResDB.ICON_Unidade2
	,ICON_Unidade3	: oResDB.ICON_Unidade3
	,ICON_Unidade4	: oResDB.ICON_Unidade4
	,ICON_Unidade5	: oResDB.ICON_Unidade5
	,ICON_Unidade6	: oResDB.ICON_Unidade6
	,ICON_Unidade7	: oResDB.ICON_Unidade7
	
	,ICON_Barco1	: oResDB.ICON_Barco1
	,ICON_Barco2	: oResDB.ICON_Barco2
}

//alert(oIconesPadrao.ICON_Predio1)
// ***************************************************************************
// ***************************************************************************

// ***************************************************************************
// ********** Funções de Interface *******************************************
// ***************************************************************************
// Cria uma janela
function criarJanela(sId, sTitulo, sConteudo, sRodape){
	var sDisplayRodape = "";
	if(!sRodape){sRodape="";}
	if(sRodape==""){sDisplayRodape='style="display: none;"';}
	
	var sDisplayTitulo = "";
	if(!sTitulo){sTitulo="";}
	if(sTitulo==""){sDisplayTitulo='style="display: none;"';}
	
	var sWinHtml =	'<font id="' + sId + '" class="dragTarget" style="display: none; z-index: 1000; position: fixed; top: 10px; left: 10px;">' + '\n' +
					'<div class="shadow1"><div class="shadow2">' + '\n' +
					'<table border=0>' + '\n' +
					'	<tr>' + '\n' +
					'		<td style="width: 5px; height: 5px; background-image: url(' + oResDB.BG_HeaderTopEsq + ');"></td>' + '\n' +
					'		<td style="height: 5px; background-image: url(' + oResDB.BG_HeaderTopMeio + ');"></td>' + '\n' +
					'		<td style="width: 5px; height: 5px ;background-image: url(' + oResDB.BG_HeaderTopDir + ');"></td>' + '\n' +
					'	</tr>' + '\n' +
					'	<tr ' + sDisplayTitulo + '>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_BordaEsq + '); width: 5px;"></td>' + '\n' +
					'		<td class="drag" style="background-image: url(' + oResDB.BG_BoxAzul + ');">' + '\n' +
					'			<table border=0 width="100%">' + '\n' +
					'				<tr>' + '\n' +
					'					<td style="padding: 0px; vertical-align: top;"><img class="noDrag" src="' + oResDB.ICON_LL + '" style="margin: 3px 2px 0px 3px;"></td>' + '\n' +
					'					<td width="100%" style="padding: 3px 7px 3px 7px; -moz-user-select: none; cursor: default; color: #FFFFFF; text-align: center;"><b id="' + sId + '_Titulo">' + sTitulo + '</b></td>' + '\n' +
					'					<td style="padding: 0px; vertical-align: top;">' + '\n' +
					'						<img class="noDrag" id="' + sId + '_Fechar" title="Fechar" src="' + oResDB.btnFechar + '" style="cursor: pointer; margin: 2px 2px 0px 2px;">' + '\n' +
					'					</td>' + '\n' +
					'				</tr>' + '\n' +
					'			</table>' + '\n' +
					'		</td>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_BordaDir + '); width: 5px;"></td>' + '\n' +
					'	</tr>' + '\n' +
					'	<tr ' + sDisplayTitulo + '>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_HeaderBottomEsq + '); width: 5px; height: 5px;"></td>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_HeaderBottom + '); height: 5px;"></td>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_HeaderBottomDir + '); width: 5px; height: 5px;"></td>' + '\n' +
					'	</tr>' + '\n' +
					'	<tr>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_BordaEsq+ '); width: 5px;"></td>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_Box+ '); padding: 0px;">' + '\n' +
					'			' + sConteudo + '' + '\n' +
					'		</td>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_BordaDir + '); width: 5px;"></td>' + '\n' +
					'	</tr>' + '\n' +
					'	<tr ' + sDisplayRodape + '>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_FooterTopEsq + '); width: 5px; height: 5px;"></td>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_HeaderTopMeio + '); height: 5px;"></td>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_FooterTopDir + '); width: 5px; height: 5px;"></td>' + '\n' +
					'	</tr>' + '\n' +
					'	<tr ' + sDisplayRodape + '>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_BordaEsq + '); width: 5px;"></td>' + '\n' +
					'		<td style="padding: 0px; background-image: url(' + oResDB.BG_Box + ');">' + '\n' +
					'			' + sRodape + '' + '\n' +
					'		</td>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_BordaDir + '); width: 5px;"></td>' + '\n' +
					'	</tr>' + '\n' +
					'	<tr>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_FooterBottomEsq + '); width: 5px; height: 5px;"></td>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_HeaderBottom + '); height: 5px;"></td>' + '\n' +
					'		<td style="background-image: url(' + oResDB.BG_FooterBottomDir + '); width: 5px; height: 5px;"></td>' + '\n' +
					'	</tr>' + '\n' +
					'</table>' + '\n' +
					'</div></div>' + '\n' +
					'</font>' + '\n' +
					'' + '\n' +
					'';
	//alertNewWindow(sWinHtml)
	//return sWinHtml;
	
	var newElement = document.createElement('font');
	newElement.innerHTML = sWinHtml;
	
	//document.body.parentNode.insertBefore(newElement, document.body);
	FakeBody.appendChild(newElement);
	
	addEvent(getId(sId + '_Fechar'), "click", function(){llCloseWin(sId)});
}

// Abre uma janela
function llOpenWin(sId, sTitulo, sIdParent, bCentralizar){
	var oWin = getId(sId);
	if(!oWin){alert("llOpenWin erro: Id de janela inválido: " + sId);}
	if(!getId(sIdParent)){alert("llOpenWin erro: Id de janela pai inválido: " + sIdParent);}
	
	oWin.style.display="block";
	
	if(sTitulo){if(sTitulo!=""){getId(sId + "_Titulo").innerHTML = sTitulo;}}
	
	if(!bCentralizar){
		oWin.style.position="absolute";
		var nTop = (document.body.scrollHeight/2) - (oWin.offsetHeight/2);
		var nLeft = (document.body.scrollWidth/2) - (oWin.offsetWidth/2);
		oWin.style.top = nTop + "px";
		oWin.style.left = nLeft + "px";
	}
	
	if(sIdParent){if(sIdParent!=""){
		var oWinParent = getId(sIdParent);
		oWinParent.setAttribute("sIdWinChild", sId);
		oWin.setAttribute("sIdWinParent", sIdParent);
	}}
	
	oWin.style.position="fixed";
	return oWin;
}

// Fecha a janela
function llCloseWin(sId){
	var oWin = getId(sId);
	if(!oWin){alert("llClose erro: Id de janela inválido: " + sId);}
	
	if(oWin.id=="llWinPrincipal"){
		_sV(llToggleWinOpen, "0");
		bAberto = false;
	}
	
	if(oWin.getAttribute("sIdWinChild")){
		llCloseWin(oWin.getAttribute("sIdWinChild"));
		oWin.setAttribute("sIdWinChild", null);
	}
	if(oWin.getAttribute("sIdWinParent")){
		var oWinParent = getId(oWin.getAttribute("sIdWinParent"));
		if(oWinParent){
			oWinParent.setAttribute("sIdWinChild", "");
		}
	}
	
	oWin.setAttribute("sIdWinParent", "");
	oWin.style.display="none";
};

// Alterna entre Janela aberta ou fechada
function toggleJanelaPrincipal(){
	var oWin = getId("llWinPrincipal");
	if(!bAberto){
		oWin.style.display = "block";
		oWin.style.position = "fixed";
		oWin.style.top = _gV(llJanPrincCoords).split(",")[0] + "px";
		oWin.style.left = _gV(llJanPrincCoords).split(",")[1] + "px";
		_sV(llToggleWinOpen, "1");
		bAberto = true;
	}
	else{
		llCloseWin("llWinPrincipal");
	}
}
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// ---------- LINKS -------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// Posiciona o menu de contexto
function posicionaContextMenu(oWin,x,y){
	var nLeft = (x + oWin.offsetWidth + nMarginDrag > document.body.scrollWidth) ? x - oWin.offsetWidth : x;
	var nTop = (y + oWin.offsetHeight + nMarginDrag > document.body.scrollHeight) ? y - oWin.offsetHeight : y;
	oWin.style.left = nLeft + "px";
	oWin.style.top = nTop + "px";
}
// Quando um link é clicado
function linksClick(){
	//alert(decodeXml(this.getAttribute("url")));
	window.location = unescape(this.title);
}
function linksContextMn(event){
	var oWin = llOpenWin("llContextMenu", "", "llWinPrincipal");
	
	sIdLinkSel = this.getAttribute("idLink");
	
	oDivConteudo = getId("llContextMenuDivConteudo");
	oDivConteudo.innerHTML = "";
	
	oUL = cE("UL");
		
		oLI = cE("LI", {
			 class: "liContextMenu"
			,idLink: this.getAttribute("idLink")
		}
		,{
			click: function (){sIdLinkSel = this.getAttribute("idLink"); llCloseWin("llContextMenu"); llAltLink();}
		});
		oLI.innerHTML = '<img src="' + oResDB.btnAlterar + '" class="imgIco"> Alterar Link'
		oUL.appendChild(oLI);
		
		oLI = cE("LI", {
			 class: "liContextMenu"
			,idLink: this.getAttribute("idLink")
		}
		,{
			click: function (){llCloseWin("llContextMenu"); llExcLink();}
		});
		oLI.innerHTML = '<img src="' + oResDB.btnExcluir + '" class="imgIco"> Excluir Link'
		oUL.appendChild(oLI);
		
	
	oDivConteudo.appendChild(oUL);
	posicionaContextMenu(oWin, event.clientX, event.clientY);
	event.preventDefault(); event.stopPropagation();
}


// Mostra ou esconde os filhos do grupo
function linksAbreFechaGrupo(idGrupo, nRowIndex){
	var oTabList = getId("listTab");
	var oImgTree = getId("linksImgTree_" + idGrupo)
	
	var sDisp="";
	if(oImgTree.getAttribute("bAberto")==1){
		oImgTree.src = oResDB.ICON_TREE_MAIS;
		oImgTree.setAttribute("bAberto", 0);
		sDisp="none";
	} else {
		oImgTree.src = oResDB.ICON_TREE_MENOS;
		oImgTree.setAttribute("bAberto", 1);
		sDisp="table-row";
	}
	
	for(var i=nRowIndex+1; i < oTabList.rows.length; i++){
		var oTr = oTabList.rows[i];
		if(oTr.getAttribute("idGrupo")!=idGrupo){break;}
		else{
			oTr.style.display = sDisp;
		}
	}
	updEstadoGrupo(oImgTree.getAttribute("idGrupo"), oImgTree.getAttribute("bAberto"));
}

// Lista os links
function listLinks(){
	var oList = getId("llWinPrincipalDivConteudo");
	oList.innerHTML = "";
	
	var oTabList = cE("TABLE",{id: "listTab", className: "linksTable"});
	oList.appendChild(oTabList);
	
	var mGrupos = oXmlDb.getArray(oXmlDb.sort(oGruposXmlDoc, {nome: "asc"}));
	nRow = 0;
	for(var iG=0; iG < mGrupos.length; iG++){
		
		var oTr = oTabList.insertRow(nRow++);
			oTr.setAttribute("id", "trListTreeGrupo_" + mGrupos[iG].id)
			oTr.setAttribute("idGrupo", mGrupos[iG].id)
		//addEvent(getId("trListTreeGrupo_" + mGrupos[iG].id), "click", function(){ linksAbreFechaGrupo(this.getAttribute("idGrupo"), this.rowIndex)});
		
		var nRowIndex = oTr.rowIndex;
		var nCol = 0;
		
		var oTd = oTr.insertCell(nCol++);
			oTd.setAttribute("id", "tdListTreeGrupo_" + mGrupos[iG].id)
			oTd.setAttribute("idGrupo", mGrupos[iG].id)
			oTd.className = "linksTdTree";
			oTd.appendChild(cE(
				"IMG"
				,{
					 id: "linksImgTree_" + mGrupos[iG].id
					,src: oResDB.ICON_TREE_MENOS
					,class: "linksImgTree"
					,idGrupo: mGrupos[iG].id
					,nRowIndex: nRowIndex
					,bAberto: 1
				}
				,{
					click: function(){
						linksAbreFechaGrupo( parseInt(this.getAttribute("idGrupo")), parseInt(this.getAttribute("nRowIndex")) )
					}
				}
			));
		
		var oTd = oTr.insertCell(nCol++);
			oTd.setAttribute("id", "tdListIconGrupo_" + mGrupos[iG].id)
			oTd.setAttribute("idGrupo", mGrupos[iG].id)
			oTd.className = "linksTdIcon";
			oTd.innerHTML = '<img src="' + getUrlIco(mGrupos[iG].idIcone) + '" class="linksImgIcon">';
		
		var oTd = oTr.insertCell(nCol++);
			oTd.setAttribute("id", "tdListDescrGrupo_" + mGrupos[iG].id)
			oTd.setAttribute("idGrupo", mGrupos[iG].id)
			oTd.className = "linksTdGrupoDescr";
			oTd.innerHTML = "" + mGrupos[iG].nome;
		
		sClass = "";
		var oQ = oXmlDb.query(oLinksXmlDoc, {idGrupo: "'" + mGrupos[iG].id + "'"});
		if(!oQ){
			sClass = sClass=="linksTr1" ? "linksTr2": "linksTr1";
				
			var oTr = oTabList.insertRow(nRow++);
				oTr.setAttribute("idGrupo", mGrupos[iG].id)
				oTr.className = sClass;
			var nCol = 0;
			
			var oTd = oTr.insertCell(nCol++);
				oTd.className = "linksTdTree";
				oTd.innerHTML = '';
			
			var oTd = oTr.insertCell(nCol++);
				oTd.setAttribute("idGrupo", mGrupos[iG].id)
				oTd.className = "linksTdIcon";
				oTd.innerHTML = '';
			
			var oTd = oTr.insertCell(nCol++);
				oTd.className = "linksTdGrupoVazio";
				oTd.innerHTML = "Grupo vazio";
			linksAbreFechaGrupo(mGrupos[iG].id, nRowIndex);
		} else {
			var mLinks = oXmlDb.getArray(oXmlDb.sort(oQ, {nome: "asc"}));
			
			for(var iL=0; iL < mLinks.length; iL++){
				sClass = sClass=="linksTr1" ? "linksTr2": "linksTr1";
				
				var oTr = oTabList.insertRow(nRow++);
					oTr.setAttribute("id", "trListTreeGrupo_" + mGrupos[iG].id)
					oTr.setAttribute("idGrupo", mGrupos[iG].id)
					oTr.setAttribute("idLink", mLinks[iL].id)
					oTr.className = sClass;
				var nCol = 0;
				
				var oTd = oTr.insertCell(nCol++);
					oTd.setAttribute("id", "tdListTreeLink_" + mLinks[iL].id)
					oTd.setAttribute("idGrupo", mGrupos[iG].id)
					oTd.setAttribute("idLink", mLinks[iL].id)
					oTd.className = "linksTdTree";
					oTd.innerHTML = '';
				
				var oTd = oTr.insertCell(nCol++);
					oTd.setAttribute("id", "tdListIconLink_" + mLinks[iL].id)
					oTd.setAttribute("idGrupo", mGrupos[iG].id)
					oTd.setAttribute("idLink", mLinks[iL].id)
					oTd.className = "linksTdIcon";
					oTd.innerHTML = '<img src="' + getUrlIco(mLinks[iL].idIcone) + '" class="linksImgIcon">';
				
				var oTd = oTr.insertCell(nCol++);
					oTd.setAttribute("id", "tdListDescrLink_" + mLinks[iL].id)
					oTd.setAttribute("idGrupo", mGrupos[iG].id)
					oTd.setAttribute("idLink", mLinks[iL].id)
					oTd.setAttribute("url", mLinks[iL].url)
					oTd.className = "linksTdLinkDescr";
					oTd.innerHTML = "" + mLinks[iL].nome;
					oTd.title = "" + mLinks[iL].url;
				
				addEvent(getId("tdListDescrLink_" + mLinks[iL].id), "click", linksClick);
				addEvent(getId("tdListDescrLink_" + mLinks[iL].id), "contextmenu", linksContextMn);
			}
			if(mGrupos[iG].aberto==0){
				linksAbreFechaGrupo(mGrupos[iG].id, nRowIndex);
			}
		}
	}
	//alert(oList.innerHTML)
}

// Novo Link
function llNovoLink()
{
	getId("txtNomeLink").value="";
	getId("imgIcoGrupoFrmLink").src="";
	getId("imgIcoGrupoFrmLink").setAttribute("sIdGrupoSel", "")
	getId("imgLinkSelIco").src="";
	getId("imgLinkSelIco").setAttribute("sIdIconSel", "")
	getId("fontDescrGrupoFrmLink").innerHTML="";
	getId("txtLink").value="";
	
	remEvent(getId("btnGravaLink"), "click", updLink);
	addEvent(getId("btnGravaLink"), "click", addLink);
	
	llOpenWin("llWinFrmLink", "Novo Link", "llWinPrincipal");
}

// Adciona um novo link
function addLink(){
	if(getId("imgIcoGrupoFrmLink").src == "" || getId("imgIcoGrupoFrmLink").getAttribute("sIdGrupoSel") == ""){alert("Selecione um grupo para o link!"); return}
	if(getId("imgLinkSelIco").src == "" || getId("imgLinkSelIco").getAttribute("sIdIconSel") == ""){alert("Selecione um ícone para o link!"); return}
	if(getId("txtNomeLink").value == ""){alert("Entre com a descrição do link!"); return}
	if(getId("txtLink").value == ""){alert("Entre com o endereço do link!"); return}
	
	if( oXmlDb.query(oLinksXmlDoc, {nome: "'" + encodeXml_Disabled(getId("txtNomeLink").value) + "'", idGrupo: "'" + getId("imgIcoGrupoFrmLink").getAttribute("sIdGrupoSel") + "'"}) == null ){
		
		newId = parseInt(oXmlDb.max(oLinksXmlDoc, "id|n"))+1;
		
		var oObjDados = {
			 id: newId
			,nome: encodeXml_Disabled(getId("txtNomeLink").value)
			,idGrupo: getId("imgIcoGrupoFrmLink").getAttribute("sIdGrupoSel")
			,idIcone: getId("imgLinkSelIco").getAttribute("sIdIconSel")
			,url: encodeXml_Disabled(getId("txtLink").value)
		}
		oXmlDb.add(oLinksXmlDoc, oObjDados);
		_sV(llXmlLinks, oXmlDb.getXml(oLinksXmlDoc));
		oLinksXmlDoc = oXmlDb.createDoc(_gV(llXmlLinks));
		//alert("Link inserido.");
		listLinks();
		getId("txtNomeGrupo").value = "";
		getId("imgGrupoSelIco").src = "";
		getId("imgGrupoSelIco").setAttribute("sIdIconSel", "");
		
		llCloseWin("llWinFrmLink");
	} else {
		alert("Já existe um link com essa descrição nesse grupo!");
	}
}

// Alterar Link
function llAltLink(){
	var oQ = oXmlDb.query(oLinksXmlDoc, {id: "'" + sIdLinkSel + "'"})
	var aQ = oXmlDb.getArray(oQ);
	
	var oQG = oXmlDb.query(oGruposXmlDoc, {id: "'" + aQ[0].idGrupo + "'"})
	var aQG = oXmlDb.getArray(oQG);
	
	getId("imgIcoGrupoFrmLink").src = getUrlIco(aQG[0].idIcone);
	getId("imgIcoGrupoFrmLink").setAttribute("sIdGrupoSel", aQG[0].id);
	getId("fontDescrGrupoFrmLink").innerHTML = aQG[0].nome;
	
	getId("imgLinkSelIco").src = getUrlIco(aQ[0].idIcone);
	getId("imgLinkSelIco").setAttribute("sIdIconSel", aQ[0].idIcone);
	getId("txtNomeLink").value = aQ[0].nome;
	getId("txtLink").value = aQ[0].url;
	
	remEvent(getId("btnGravaLink"), "click", addLink);
	addEvent(getId("btnGravaLink"), "click", updLink);
	llOpenWin("llWinFrmLink", "Alterar Link", "llWinPrincipal");
}
// Atualiza os dados do link
function updLink(){
	if(getId("imgIcoGrupoFrmLink").src == "" || getId("imgIcoGrupoFrmLink").getAttribute("sIdGrupoSel") == ""){alert("Selecione um grupo para o link!"); return}
	if(getId("imgLinkSelIco").src == "" || getId("imgLinkSelIco").getAttribute("sIdIconSel") == ""){alert("Selecione um ícone para o link!"); return}
	if(getId("txtNomeLink").value == ""){alert("Entre com a descrição do link!"); return}
	if(getId("txtLink").value == ""){alert("Entre com o endereço do link!"); return}
	
	var bOk = false;
	var oQ = oXmlDb.query(oLinksXmlDoc, {nome: "'" + encodeXml_Disabled(getId("txtNomeLink").value) + "'", idGrupo: "'" + getId("imgIcoGrupoFrmLink").getAttribute("sIdGrupoSel") + "'"});
	if( oQ == null ){
		bOk = true
	}
	else{
		if( getTags(oQ, "id")[0].firstChild.nodeValue == sIdLinkSel ){
			bOk = true;
		}
	}
	if(bOk){
		var oObjDados = {
			 nome: encodeXml_Disabled(getId("txtNomeLink").value)
			,idGrupo: getId("imgIcoGrupoFrmLink").getAttribute("sIdGrupoSel")
			,idIcone: getId("imgLinkSelIco").getAttribute("sIdIconSel")
			,url: encodeXml_Disabled(getId("txtLink").value)
		}
		oLinksXmlDoc = oXmlDb.upd(oLinksXmlDoc, {id: "'" + sIdLinkSel + "'"}, oObjDados);
		_sV(llXmlLinks, oXmlDb.getXml(oLinksXmlDoc));
		
		//alertXml(oLinksXmlDoc);
		//alert("Link alterado.");
		listLinks();
		
		llCloseWin("llWinFrmLink");
	} else {
		alert("Já existe um link com esse nome!");
	}
}


// Excluír Link
function llExcLink(){
	if(!confirm("Deseja excluír o link?")){return;}
	
	oLinksXmlDoc = oXmlDb.del(oLinksXmlDoc, {id: "'" + sIdLinkSel + "'"});
	_sV(llXmlLinks, oXmlDb.getXml(oLinksXmlDoc));
	//alert("Link excluído.");
	listLinks();
}
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// ---------- GRUPOS ------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// Selecionar Grupo
function llSelGrupo(){
	listGrupos();
	llOpenWin("llWinListGrupos", "Selecione um grupo", "llWinFrmLink");
}

// Retorno da seleção de grupo
function llGrupoSelecionado(){
	var oQ = oXmlDb.query(oGruposXmlDoc, {id: "'" + sIdGrupoSel + "'"})
	var aQ = oXmlDb.getArray(oQ);
	
	getId("fontDescrGrupoFrmLink").innerHTML = aQ[0].nome;
	getId("imgIcoGrupoFrmLink").src = getUrlIco(aQ[0].idIcone);
	getId("imgIcoGrupoFrmLink").setAttribute("sIdGrupoSel", sIdGrupoSel)
	
	llCloseWin("llWinListGrupos");
}

// Preenche a lista de Grupos
function listGrupos(){
	sIdGrupoSel = "";
	
	getId("btnLL_SelecionarGrupo").className = "buttonTxt_Disabled";
	getId("btnLL_AltGrupo").className = "buttonImg_Disabled";
	getId("btnLL_ExcGrupo").className = "buttonImg_Disabled";
	
	var oList = getId("ffListaGrupo");
	oList.innerHTML = "";
	
	var oTable = document.createElement("TABLE");
	oTable.className = "listTab"
	oTable = oList.appendChild(oTable);
	
	oSort = oXmlDb.sort(oGruposXmlDoc, {nome: "asc"});
	
	//alertXml(oXmlDb.query( oGruposXmlDoc, {} ));
	
	mGrupos = oXmlDb.getArray(oSort);
	
	var sClass = "";
	if(mGrupos.length > 0){
		for(var i=0; i < mGrupos.length; i++){
			if(sClass=="listTr1"){sClass="listTr2"}else{sClass="listTr1"}
			var oRow = oTable.insertRow(i);
			oRow.className = sClass;
			oRow.setAttribute("idGrupo", mGrupos[i].id)
			
			sUrl = getUrlIco(mGrupos[i].idIcone);
			//alert(sUrl)
			sImg = '<img src="' + getUrlIco(mGrupos[i].idIcone) + '" class="imgIco">';
			
			oTd = oRow.insertCell(0);
			oTd.className = "listTd";
			oTd.innerHTML = sImg;
			
			oTd = oRow.insertCell(1);
			oTd.style.width = "100%";
			oTd.className = "listTd";
			oTd.innerHTML = mGrupos[i].nome;
			
			addEvent(oRow, "click", function(){ marcaGrupo(this) });
			addEvent(oRow, "dblclick", function(){ marcaGrupo(this); llGrupoSelecionado(); });
		}
	}
}
function marcaGrupo(oTr){
	var oTable = oTr.parentNode;
	//alert(oTr.getAttribute("idGrupo"))
	for(var i=0; i < oTable.rows.length; i++){
		if(oTable.rows[i].className=="listTrSelected"){
			oTable.rows[i].className = oTable.rows[i].getAttribute("classAnt");
		}
	}
	
	sIdGrupoSel = oTr.getAttribute("idGrupo");
	oTr.setAttribute("classAnt", oTr.className);
	oTr.className = "listTrSelected";
	
	getId("btnLL_SelecionarGrupo").className = "buttonTxt";
	getId("btnLL_AltGrupo").className = "buttonImg";
	getId("btnLL_ExcGrupo").className = "buttonImg";
}

// Novo Grupo
function llNovoGrupo(){
	getId("txtNomeGrupo").value = "";
	getId("imgGrupoSelIco").src = "";
	getId("imgGrupoSelIco").setAttribute("sIdIconSel", "");
	
	remEvent(getId("btnGravaGrupo"), "click", updGrupo);
	addEvent(getId("btnGravaGrupo"), "click", addGrupo);
	llOpenWin("llWinFrmGrupo", "Novo Grupo", "llWinListGrupos");
}
//Adciona um novo grupo
function addGrupo(){
	if(getId("txtNomeGrupo").value == ""){alert("Entre com o nome do grupo!"); return}
	if(getId("imgGrupoSelIco").src == "" || getId("imgGrupoSelIco").getAttribute("sIdIconSel") == ""){alert("Selecione um ícone para o grupo!"); return}
	
	if( oXmlDb.query(oGruposXmlDoc, {nome: "'" + encodeXml_Disabled(getId("txtNomeGrupo").value) + "'"}) == null ){
		
		newId = parseInt(oXmlDb.max(oGruposXmlDoc, "id|n"))+1;
		oXmlDb.add(oGruposXmlDoc, {
			 id: newId
			,nome: encodeXml_Disabled(getId("txtNomeGrupo").value)
			,idIcone: getId("imgGrupoSelIco").getAttribute("sIdIconSel")
			,aberto: 0
		});
		
		_sV(llXmlGrupos, oXmlDb.getXml(oGruposXmlDoc));
		oGruposXmlDoc = oXmlDb.createDoc(_gV(llXmlGrupos));
		//alert("Grupo inserido.");
		listGrupos();
		getId("txtNomeGrupo").value = "";
		getId("imgGrupoSelIco").src = "";
		getId("imgGrupoSelIco").setAttribute("sIdIconSel", "");
		
		llCloseWin("llWinFrmGrupo");
	} else {
		alert("Já existe um grupo com esse nome!");
	}
}

// Alterar Grupo
function llAltGrupo(){
	var oQ = oXmlDb.query(oGruposXmlDoc, {id: "'" + sIdGrupoSel + "'"})
	var aQ = oXmlDb.getArray(oQ);
	
	getId("txtNomeGrupo").value = aQ[0].nome;
	getId("imgGrupoSelIco").src = getUrlIco(aQ[0].idIcone);
	getId("imgGrupoSelIco").setAttribute("sIdIconSel", aQ[0].idIcone);
	
	remEvent(getId("btnGravaGrupo"), "click", addGrupo);
	addEvent(getId("btnGravaGrupo"), "click", updGrupo);
	llOpenWin("llWinFrmGrupo", "Alterar Grupo", "llWinListGrupos");
}
// Atualiza os dados do grupo
function updGrupo(){
	if(getId("txtNomeGrupo").value == ""){alert("Entre com o nome do grupo!"); return}
	if(getId("imgGrupoSelIco").src == "" || getId("imgGrupoSelIco").getAttribute("sIdIconSel") == ""){alert("Selecione um ícone para o grupo!"); return}
	
	var bOk = false;
	var oQ = oXmlDb.query(oGruposXmlDoc, {nome: "'" + encodeXml_Disabled(getId("txtNomeGrupo").value) + "'"});
	if( oQ == null ){
		bOk = true
	}
	else{
		if( getTags(oQ, "id")[0].firstChild.nodeValue == sIdGrupoSel ){
			bOk = true;
		}
	}
	if(bOk){
		oGruposXmlDoc = oXmlDb.upd(oGruposXmlDoc, {id: "'" + sIdGrupoSel + "'"}, {
			 id: sIdGrupoSel
			,nome: encodeXml_Disabled(getId("txtNomeGrupo").value)
			,idIcone: getId("imgGrupoSelIco").getAttribute("sIdIconSel")
		});
		
		_sV(llXmlGrupos, oXmlDb.getXml(oGruposXmlDoc));
		oGruposXmlDoc = oXmlDb.createDoc(_gV(llXmlGrupos));
		//alert("Grupo alterado.");
		listGrupos();
		getId("txtNomeGrupo").value = "";
		getId("imgGrupoSelIco").src = "";
		getId("imgGrupoSelIco").setAttribute("sIdIconSel", "");
		
		llCloseWin("llWinFrmGrupo");
	} else {
		alert("Já existe um grupo com esse nome!");
	}
}
// Atualiza o estado do grupo na lista
function updEstadoGrupo(idGrupo, aberto){
	//alert(idGrupo+ " = " +aberto);
	oGruposXmlDoc = oXmlDb.upd(oGruposXmlDoc, {id: "'" + idGrupo + "'"}, {
		 aberto: aberto
	});
	
	_sV(llXmlGrupos, oXmlDb.getXml(oGruposXmlDoc));
	oGruposXmlDoc = oXmlDb.createDoc(_gV(llXmlGrupos));
}


// Excluír Grupo
function llExcGrupo(){
	if(!confirm("Deseja excluír o grupo?")){return;}
	
	oGruposXmlDoc = oXmlDb.del(oGruposXmlDoc, {id: "'" + sIdGrupoSel + "'"});
	_sV(llXmlGrupos, oXmlDb.getXml(oGruposXmlDoc));
	oGruposXmlDoc = oXmlDb.createDoc(_gV(llXmlGrupos));
	//alert("Grupo excluído.");
	listGrupos();
}
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------
// ---------- ICONES ------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// Retorna a url do ícone pelo id
function getUrlIco(sId){
	var sUrl = oResDB.ICON_ALERTA;
	//alert(sId)
	if(isNaN(sId)){
		if(eval("oIconesPadrao." + sId))
			sUrl = eval("oIconesPadrao." + sId);
	} else {
		var oQ = oXmlDb.query(oIconesXmlDoc, {id: "'" + sId + "'"});
		if(!oQ){
			sUrl = oResDB.ICON_ALERTA;
		} else {
			var aQ = oXmlDb.getArray(oQ);
			sUrl = aQ[0].url;
		}
	}
	
	return sUrl
}

// Selecionar Ícone
function llSelIcone(sIsPai){
	listIcones();
	llOpenWin("llWinListIcones", "Selecione um ícone", sIsPai);
}
// Retorno do ícone selecionado
function llIcoSelecionado(){
	var sSrc = getUrlIco(sIdIconSel);
	var oWin = getId("llWinListIcones");
	
	if(oWin.getAttribute("sIdWinParent") == "llWinFrmGrupo"){
		getId("imgGrupoSelIco").setAttribute("sIdIconSel", sIdIconSel);
		getId("imgGrupoSelIco").src = sSrc;
	} else if(oWin.getAttribute("sIdWinParent") == "llWinFrmLink"){
		getId("imgLinkSelIco").setAttribute("sIdIconSel", sIdIconSel);
		getId("imgLinkSelIco").src = sSrc;
	}
	llCloseWin("llWinListIcones");
}

// Preenche a lista de ícones
function listIcones(){
	sIdIconSel = "";
	
	getId("btnLL_SelecionarIcone").className = "buttonTxt_Disabled";
	getId("btnLL_ExcIcone").className = "buttonImg_Disabled";
	
	var oList = getId("ffListaIcone");
	oList.innerHTML = "";
	
	var sBr = "";
	
	mIcones = oXmlDb.getArray(oIconesXmlDoc);
	if(mIcones.length > 0){
		var oSep = document.createElement('P');
		oSep.innerHTML	 =	'&nbsp;Ícones customizados' +
							'<hr align="left">'
		oList.appendChild(oSep);
		
		for(var i=0; i < mIcones.length; i++){
			var oImg = document.createElement('IMG');
			oImg.setAttribute('id', 'icoList_' + 'customIco_' + i);
			oImg.setAttribute('class', 'imgIcoList');
			oImg.setAttribute('src', mIcones[i].url);
			oImg.setAttribute('id', mIcones[i].id);
			oList.appendChild(oImg);
			addEvent(oImg, "click", function(){ marcaIcone(this, this.getAttribute('id')); });
			addEvent(oImg, "dblclick", function(){ marcaIcone(this, this.getAttribute('id')); llIcoSelecionado();});
		}
		sBr = "<br>";
	}
	
	var oSep = document.createElement('P');
	oSep.innerHTML	 =	sBr + '&nbsp;Ícones padrão' +
						'<hr align="left">'
	oList.appendChild(oSep);
	
	for(var sProp in oIconesPadrao){
		var oImg = document.createElement('IMG');
		oImg.setAttribute('id', 'icoList_' + sProp);
		oImg.setAttribute('class', 'imgIcoList');
		oImg.setAttribute('src', oIconesPadrao[sProp]);
		oImg.setAttribute('id', sProp);
		oList.appendChild(oImg);
		addEvent(oImg, "click", function(){ marcaIcone(this, this.getAttribute('id')); });
		addEvent(oImg, "dblclick", function(){ marcaIcone(this, this.getAttribute('id')); llIcoSelecionado();});
	}
}
// Seleciona um ícone
function marcaIcone(oImg, id){
	var oParent = oImg.parentNode;
	for(var nNode in oParent.childNodes){
		var oNode = oParent.childNodes[nNode];
		if(oNode.nodeType == 1){
			if(oNode.className == "imgIcoListSelected"){oNode.className = "imgIcoList";}
		}
	}
	
	sIdIconSel = id;
	oImg.className = "imgIcoListSelected";
	
	getId("btnLL_SelecionarIcone").className = "buttonTxt";
	if(!isNaN(id)){getId("btnLL_ExcIcone").className = "buttonImg";}else{getId("btnLL_ExcIcone").className = "buttonImg_Disabled";}
}

// Adcionar novo ícone
function llNovoIcone(){
	getId("txtUrlIcone").value = "";
	getId("imgVisuIco").src = "";
	getId("btnLL_AdcionaIcone").className="buttonTxt_Disabled";
	llOpenWin("llWinFrmIcone", "Adcionar Ícone", "llWinListIcones");
}

// Adciona o ícone
function llAddIco(){
	if( oXmlDb.query(oIconesXmlDoc, {url: "'" + encodeXml_Disabled(getId("txtUrlIcone").value) + "'"}) == null ){
		
		newId = parseInt(oXmlDb.max(oIconesXmlDoc, "id|n"))+1;
		oXmlDb.add(oIconesXmlDoc, {id: newId, url: encodeXml_Disabled(getId("txtUrlIcone").value)} );
		_sV(llXmlIcones, oXmlDb.getXml(oIconesXmlDoc));
		oIconesXmlDoc = oXmlDb.createDoc(_gV(llXmlIcones));
		//alert("Ícone inserido.");
		listIcones();
		
		
		llCloseWin("llWinFrmIcone");
	} else {
		alert("Esse ícone já está na lista.");
	}
}

// Remover ícone
function llExcIcone(){
	if(!confirm("Deseja excluir o ícone selecionado?")){return}
	oIconesXmlDoc = oXmlDb.del(oIconesXmlDoc, {id: "'" + sIdIconSel + "'"});
	_sV(llXmlIcones, oXmlDb.getXml(oIconesXmlDoc));
	oIconesXmlDoc = oXmlDb.createDoc(_gV(llXmlIcones));
	//alert("Ícone excluído.");
	listIcones();
}
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

// ***************************************************************************
// ***************************************************************************
// ***************************************************************************
// ***************************************************************************

var sConteudo, sRodape
// ***************************************************************************
// Criando o botão de ação
// ***************************************************************************
var oMain = getId('mainview');
if (oMain) {
	var oBtnAction = document.createElement('div');
	oBtnAction.setAttribute('id', 'llButtonBox');
	var sHtml =	'<img id="btnLL_Action" title="Lista de Links" src="' + oResDB.ICON_LL + '"">'
	oBtnAction.innerHTML = sHtml;
	oMain.parentNode.insertBefore(oBtnAction, oMain);
	addEvent(getId("btnLL_Action"), "click", function(){ toggleJanelaPrincipal(); this.blur(); });
}
// ***************************************************************************

// ***************************************************************************
// Criando a janela principal
// ***************************************************************************
sConteudo =	'<div id="llWinPrincipalDivConteudo" class="linksDiv">' + '\n' +
			'</div>' + '\n' +
			'' + '\n' +
			''

sRodape =	'<div id="llWinPrincipalDivRodape" style="background: #6699cc;">' + '\n' +
			'<table width="100%">' + '\n' +
			'	<tr>' + '\n' +
			'		<td><img id="btnLL_NovoLink" title="Novo Link" class="buttonImg" src="' + oResDB.btnNovo + '"></td>' + '\n' +
			'		<td width="100%"></td>' + '\n' +
			'		<td nowrap="true">' + '\n' +
			'			<img id="btnLL_Export" title="Exportar Lista" class="buttonImg" src="' + oResDB.btnExport + '">' + '\n' +
			'			<img id="btnLL_Import" title="Importar Lista" class="buttonImg" src="' + oResDB.btnImport + '">' + '\n' +
			'			' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'</table>' + '\n' +
			'</div>' + '\n' +
			'' + '\n' +
			''
criarJanela("llWinPrincipal", "Lista de Links", sConteudo, sRodape);
getId("llWinPrincipal").setAttribute("principal", true);


addEvent(getId("llWinPrincipal"), "contextmenu", noContextMenu);
addEvent(getId("btnLL_NovoLink"), "click", llNovoLink);

addEvent(getId("btnLL_Export"), "click", llExport);
addEvent(getId("btnLL_Import"), "click", llImport);

listLinks();
// Abre se estava aberta
if(_gV(llToggleWinOpen)=="1"){toggleJanelaPrincipal();}
// ***************************************************************************

// ***************************************************************************
// Criando a janela de para o menu de contexto
// ***************************************************************************
sConteudo =	'<div id="llContextMenuDivConteudo" class="contextDiv">' + '\n' +
			'</div>'
criarJanela("llContextMenu", "", sConteudo, "");
// ***************************************************************************

function llExport(){
	getId("tdImpExpExplicacao").innerHTML = "Copie o texto do campo abaixo e salve em um<br> arquivo de texto para uma futura importação.";
	getId("trImpExpBotao").style.display="none";
	
	//getId("txtImpExp").value = "" + _gV(llXmlLinks) + "|SPLITER|" + _gV(llXmlGrupos) + "|SPLITER|" + _gV(llXmlIcones);
	getId("txtImpExp").value = "" + oXmlDb.getXml(oLinksXmlDoc) + "|SPLITER|" + oXmlDb.getXml(oGruposXmlDoc) + "|SPLITER|" + oXmlDb.getXml(oIconesXmlDoc);
	
	
	llOpenWin("llWinFrmImpExp", "Exportar Lista", "llWinPrincipal");
}

function llImport(){
	getId("tdImpExpExplicacao").innerHTML = "Insira o texto no campo abaixo para realizar a importação.";
	getId("trImpExpBotao").style.display="table-row";
	getId("txtImpExp").value = "";
	
	llOpenWin("llWinFrmImpExp", "Importar Lista", "llWinPrincipal");
}
function llImportData(){
	sData = getId("txtImpExp").value;
	
	mData = sData.split("|SPLITER|");
	if(mData.length!=3){
		alert("O texto inserido não é válido para a importação.\n\n" + "Erro na quantidade de separadores.");
		return;
	}
	
	try{
		var oDocL = oXmlDb.createDoc(mData[0]);
	} catch(err) {
		alert("O texto inserido não é válido para a importação.\n\nErro:" + err.description);
		return;
	}
	
	try{
		var oDocG = oXmlDb.createDoc(mData[1]);
	} catch(err) {
		alert("O texto inserido não é válido para a importação.\n\nErro:" + err.description);
		return;
	}
	
	try{
		var oDocI = oXmlDb.createDoc(mData[2]);
	} catch(err) {
		alert("O texto inserido não é válido para a importação.\n\nErro:" + err.description);
		return;
	}
	
	oLinksXmlDoc = oDocL;
	_sV(llXmlLinks, oXmlDb.getXml(oLinksXmlDoc));
	
	oGruposXmlDoc = oDocG;
	_sV(llXmlGrupos, oXmlDb.getXml(oGruposXmlDoc));
	
	oIconesXmlDoc = oDocI;
	_sV(llXmlIcones, oXmlDb.getXml(oIconesXmlDoc));
	
	alert("Dados importados com sucesso.");
	listLinks();
	llCloseWin("llWinFrmImpExp");
}

// ***************************************************************************
// Criando a Janela de Importação e Exportação
// ***************************************************************************
sConteudo =	'<div id="llWinFrmLinkDivConteudo">' + '\n' +
			'<table class="frmTab">' + '\n' +
			'	<tr>' + '\n' +
			'		<td id="tdImpExpExplicacao" class="frmTdExplicacao"></td>' + '\n' +
			'	</tr>' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdCampo">' + '\n' +
			'			<textarea id="txtImpExp" class="txtImpExp"></textarea>' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'	<tr id="trImpExpBotao">' + '\n' +
			'		<td class="frmTdTools">' + '\n' +
			'			<div id="btnImportar" title="Importar" class="buttonTxt">Importar</div>' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'</table>' + '\n' +
			'</div>' + '\n' +
			'' + '\n' +
			''
criarJanela("llWinFrmImpExp", "x", sConteudo, "");
addEvent(getId("btnImportar"), "click", llImportData);
//llExport();
// ***************************************************************************

// ***************************************************************************
// Criando a Janela de edição de links
// ***************************************************************************
sConteudo =	'<div id="llWinFrmLinkDivConteudo">' + '\n' +
			'<table class="frmTab">' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdLabel">Grupo:</td>' + '\n' +
			'		<td class="frmTdCampo">' + '\n' +
			'			<img id="btnLL_SelGrupo" title="Selecionar o grupo" class="buttonImg" src="' + oResDB.btnPopup + '">' + '\n' +
			'			<img id="imgIcoGrupoFrmLink" class="imgIco" src="">' + '\n' +
			'			<font id="fontDescrGrupoFrmLink">Selecione o grupo</font>' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdLabel">Ícone:</td>' + '\n' +
			'		<td class="frmTdCampo">' + '\n' +
			'			<img id="btnLL_SelIcoLink" title="Selecionar o ícone" class="buttonImg" src="' + oResDB.btnPopup + '">' + '\n' +
			'			<img id="imgLinkSelIco" class="imgIco" src="">' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdLabel">Descrição:</td>' + '\n' +
			'		<td class="frmTdCampo"><input type="text" id="txtNomeLink" class="frmCampo" size="60" maxlength="60"></td>' + '\n' +
			'	</tr>' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdLabel">Endereço:</td>' + '\n' +
			'		<td class="frmTdCampo">' + '\n' +
			'			<input type="text" id="txtLink" class="frmCampo" size="60"><br>' + '\n' +
			'			<div align="center"><a id="linkGetCurrentUrl" href="javascript: void(0);">Pegar o endereço atual</a></div>' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdTools" colspan=2>' + '\n' +
			'			<div id="btnGravaLink" title="Gravar" class="buttonTxt">Gravar</div>' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'</table>' + '\n' +
			'</div>' + '\n' +
			'' + '\n' +
			''
criarJanela("llWinFrmLink", "Editar Links", sConteudo, "");

addEvent(getId("btnLL_SelGrupo"), "click", llSelGrupo);
addEvent(getId("btnLL_SelIcoLink"), "click", function(){ llSelIcone("llWinFrmLink"); });
addEvent(getId("linkGetCurrentUrl"), "click", function(){ getId("txtLink").value = window.location; });

//llNovoLink();
// ***************************************************************************

// ***************************************************************************
// Criando a Janela de seleção de grupos
// ***************************************************************************
sConteudo =	'<div id="llWinListGruposDivConteudo">' + '\n' +
			'<table class="frmTab">' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdCampo">' + '\n' +
			'			<div id="ffListaGrupo" class="clsBoxLista"></div>' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdTools">' + '\n' +
			'			<table>' + '\n' +
			'				<tr>' + '\n' +
			'					<td>' + '\n' +
			'						<img id="btnLL_NovoGrupo" title="Novo Grupo" class="buttonImg" src="' + oResDB.btnNovo + '">' + '\n' +
			'					</td>' + '\n' +
			'					<td width="100%"></td>' + '\n' +
			'					<td nowrap>' + '\n' +
			'						<img id="btnLL_AltGrupo" title="Alterar Grupo" class="buttonImg_Disabled" src="' + oResDB.btnAlterar + '">' + '\n' +
			'						<img id="btnLL_ExcGrupo" title="Excluír Grupo" class="buttonImg_Disabled" src="' + oResDB.btnExcluir + '">' + '\n' +
			'					</td>' + '\n' +
			'				</tr>' + '\n' +
			'			</table>' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdTools">' + '\n' +
			'			<div id="btnLL_SelecionarGrupo" title="Selecionar Grupo" class="buttonTxt_Disabled">Selecionar Grupo</div>' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'</table>' + '\n' +
			'</div>' + '\n' +
			'' + '\n' +
			''
criarJanela("llWinListGrupos", "Grupos", sConteudo, "");
addEvent(getId("btnLL_NovoGrupo"), "click", llNovoGrupo);
addEvent(getId("btnLL_AltGrupo"), "click", llAltGrupo);
addEvent(getId("btnLL_ExcGrupo"), "click", llExcGrupo);

addEvent(getId("btnLL_SelecionarGrupo"), "click", llGrupoSelecionado);
//llSelGrupo();
// ***************************************************************************

// ***************************************************************************
// Criando a Janela de edição de grupos
// ***************************************************************************
sConteudo =	'<div id="llWinFrmGruposDivConteudo">' + '\n' +
			'<table class="frmTab">' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdLabel">Nome:</td>' + '\n' +
			'		<td class="frmTdCampo"><input type="text" id="txtNomeGrupo" class="frmCampo" size="30" maxlength="30"></td>' + '\n' +
			'	</tr>' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdLabel">Ícone:</td>' + '\n' +
			'		<td class="frmTdCampo">' + '\n' +
			'			<img id="btnLL_SelIcoGrupo" title="Selecionar o ícone" class="buttonImg" src="' + oResDB.btnPopup + '">' + '\n' +
			'			<img id="imgGrupoSelIco" class="imgIco" src="">' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdTools" colspan=2>' + '\n' +
			'			<div id="btnGravaGrupo" title="Gravar" class="buttonTxt">Gravar</div>' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'</table>' + '\n' +
			'</div>' + '\n' +
			'' + '\n' +
			''
criarJanela("llWinFrmGrupo", "Editar Grupo", sConteudo, "");
addEvent(getId("btnLL_SelIcoGrupo"), "click", function(){ llSelIcone("llWinFrmGrupo"); });

//llNovoGrupo();
// ***************************************************************************

// ***************************************************************************
// Criando a Janela de seleção de ícones
// ***************************************************************************
sConteudo =	'<div id="llWinListIconesDivConteudo">' + '\n' +
			'<table class="frmTab">' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdCampo">' + '\n' +
			'			<div id="ffListaIcone" class="clsBoxLista"></div>' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdTools">' + '\n' +
			'			<table>' + '\n' +
			'				<tr>' + '\n' +
			'					<td>' + '\n' +
			'						<img id="btnLL_NovoIcone" title="Novo Ícone" class="buttonImg" src="' + oResDB.btnNovo + '">' + '\n' +
			'					</td>' + '\n' +
			'					<td width="100%"></td>' + '\n' +
			'					<td nowrap>' + '\n' +
			'						<img id="btnLL_ExcIcone" title="Excluír Ícone" class="buttonImg_Disabled" src="' + oResDB.btnExcluir + '">' + '\n' +
			'					</td>' + '\n' +
			'				</tr>' + '\n' +
			'			</table>' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdTools">' + '\n' +
			'			<div id="btnLL_SelecionarIcone" title="Selecionar Ícone" class="buttonTxt_Disabled">Selecionar Ícone</div>' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'</table>' + '\n' +
			'</div>' + '\n' +
			'' + '\n' +
			''
criarJanela("llWinListIcones", "Grupos", sConteudo, "");
addEvent(getId("btnLL_NovoIcone"), "click", function(){ llNovoIcone(); });
addEvent(getId("btnLL_ExcIcone"), "click", function(){ if(this.className=="buttonImg_Disabled"){return}; llExcIcone(); });

addEvent(getId("btnLL_SelecionarIcone"), "click", function(){ if(this.className=="buttonTxt_Disabled"){return}; llIcoSelecionado(); });
//llSelIcone("llWinFrmGrupo");
// ***************************************************************************

// ***************************************************************************
// Criando a Janela de criação de ícones
// ***************************************************************************
sConteudo =	'<div id="llWinFrmIconeDivConteudo">' + '\n' +
			'<table class="frmTab">' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdLabel">Endereço:</td>' + '\n' +
			'		<td class="frmTdCampo">' + '\n' +
			'			<input type="text" id="txtUrlIcone" class="frmCampo" size="50" maxlength="500">' + '\n' +
			'			<img id="btnVisuIco" src="' + oResDB.btnValidar + '" class="buttonImg" title="Validar Ícone">' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdLabel">Visualização:</td>' + '\n' +
			'		<td id="tdVizualizaIcone" class="frmTdCampo">' + '\n' +
			'			<img id="imgVisuIco" title="Visualização" class="imgIco" src="" style="background: url(' + oResDB.ICON_ALERTA + ') no-repeat center center;">' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'	<tr>' + '\n' +
			'		<td class="frmTdTools" colspan=2>' + '\n' +
			'			<div id="btnLL_AdcionaIcone" title="Adcionar Ícone" class="buttonTxt_Disabled">Adcionar Ícone</div>' + '\n' +
			'		</td>' + '\n' +
			'	</tr>' + '\n' +
			'</table>' + '\n' +
			'</div>' + '\n' +
			'' + '\n' +
			''
criarJanela("llWinFrmIcone", "Editar Grupo", sConteudo, "");

addEvent(getId("btnVisuIco"), "click", function(){ getId("imgVisuIco").src = getId("txtUrlIcone").value });
addEvent(getId("imgVisuIco"), "abort", function(){ this.title = "Imagem Inválida"; getId("btnLL_AdcionaIcone").className="buttonTxt_Disabled"; });
addEvent(getId("imgVisuIco"), "error", function(){ this.title = "Imagem Inválida"; getId("btnLL_AdcionaIcone").className="buttonTxt_Disabled"; });
addEvent(getId("imgVisuIco"), "load", function(){ this.title = "Imagem Válida"; getId("btnLL_AdcionaIcone").className="buttonTxt"; });

addEvent(getId("btnLL_AdcionaIcone"), "click", function(){ if(getId("btnLL_AdcionaIcone").className=="buttonTxt"){llAddIco();} });

//llNovoIcone();
// ***************************************************************************

// Fecha o menu de contexto
addEvent(document.body, "click", function(){if(getId("llContextMenu").style.display=="block"){llCloseWin("llContextMenu");}})
addEvent(FakeBody, "click", function(){if(getId("llContextMenu").style.display=="block"){llCloseWin("llContextMenu");}})

//Drag
InitDragDrop();