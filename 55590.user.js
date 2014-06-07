// JavaScript Document
// ==UserScript==
// @name           BaygonPlus
// @namespace      BaygonPlus
// @description    Ferramentas de melhorias para o uso do Baygon
// @version        1.3
// @include        http://baygonnet.*/
// @include        http://baygonnet.*/default.aspx
// ==/UserScript==

/**************************************************************************************************
VERSÕES
**************************************************************************************************/
// Version 1.4 - Filtro de pesquisa para originador
// Version 1.3 - Adicionado sub-menu do Baygon Plus
//             - Permite ocultar/exibir quadro Eventos
//             - Permite ocultar/exibir quadro Pesquisa
// Version 1.2 - Destacar com ícones os status "Em Solução", "Parado" e "Resolvido"
// Version 1.1 - Destacar nas cores Vermelho e Laranja as prioridades "Crítica" e "Alta"
// Version 1.0 - Ocultar/Exibir quadro de eventos

/**************************************************************************************************
CONSTANTES
**************************************************************************************************/
//-------------------------------------------------------------------------------------------------
//OBJETOS BAYGON PLUS
//-------------------------------------------------------------------------------------------------
var BAYGON_FAVORITO;
var BAYGON_CONFIG;
var BAYGON_ORIGINADOR;

//-------------------------------------------------------------------------------------------------
//GLOBAIS BAYGON PLUS
//-------------------------------------------------------------------------------------------------
var serverDomain               = window.location.host;
var imageDomain                = serverDomain+'/multimidia/imagens';
var cacheKeyBaygonFavorito     = serverDomain + '.favorito';
var cacheKeyBaygonConfig       = serverDomain + '.config';

//-------------------------------------------------------------------------------------------------
//IMAGEM
//-------------------------------------------------------------------------------------------------
var IMG_STATUS_SOLUCAO         = 'http://'+imageDomain+'/bola_verde.gif';
var IMG_STATUS_PARADO          = 'http://'+imageDomain+'/bola_vermelha.gif';
var IMG_STATUS_RESOLVIDO       = 'http://'+imageDomain+'/bola_amarela.gif';

//-------------------------------------------------------------------------------------------------
//CORES
//-------------------------------------------------------------------------------------------------
var COR_MENU_ATIVADO           = 'black';
var COR_MENU_DESATIVADO        = 'gray';

var COR_PRIORIDADE_CRITICA     = 'red';
var COR_PRIORIDADE_ALTA        = 'orange';
var COR_PRIORIDADE_IRRELEVANTE = 'green';

//-------------------------------------------------------------------------------------------------
//OBJETOS HTML
//-------------------------------------------------------------------------------------------------
var OBJ_QUADRO_EVENTO          = 'ctl00_cphMasterPrincipal_tbEventos';
var OBJ_QUADRO_PESQUISA        = 'ctl00_cphMasterPrincipal_tbPesquisa';
var OBJ_QUADRO_INCIDENTE       = 'ctl00_cphMasterPrincipal_gdvIncidente';


/**************************************************************************************************
ADICIONAR ESTILOS
**************************************************************************************************/
/* GM_addStyle(
		'a.preview { position:relative; } ' +
		'a.preview span { display: none; z-index:100; } ' +
		'a.preview:hover span { display:block; position:absolute; top:1em; left:0.2em; width:90px; } ' +
		'.tooltip3 { background-color:#fdf7dd; border:1px solid #BE8D53; border-width:4px 1px 1px; line-height:1em; color:#542C0F; padding:0; }' +
		'.addlink { text-decoration:none; font-size:11px; } '
	); */

/**************************************************************************************************
MAIN
**************************************************************************************************/
//GM_setValue(cacheKeyBaygonConfig, '');
LoadBaygonConfig();
createMenuBaygonPlus();
colorPrioridade();

/**************************************************************************************************
FUNÇÕES
**************************************************************************************************/

//-------------------------------------------------------------------------------------------------
//Descrição: Menu para funcionalidades da versão Plus
//-------------------------------------------------------------------------------------------------
function createMenuBaygonPlus()
{
	var menuPrincipal = getNode('//html/body/form/table/tbody/tr[2]/td[2]/script');
	
	var submenuPrincipal = document.createElement('div');
	submenuPrincipal.id='menu';
	submenuPrincipal.innerHTML = "<div style='margin: auto; width: 230px;'>"+
									"<table width='220' cellspacing='2' cellpadding='4'>"+
										"<tbody><tr style='text-align: center;'>"+
											"<td style='width: 110px;'><span style='font-weight: bold;' id='Eventos'>EVENTOS</span></td>"+
											"<td style='width: 110px;'><span style='font-weight: bold;' id='Pesquisa'>PESQUISA</span></td>"+
										"</tr>"+
									"</tbody></table>"+
								"</div>";
	insertAfter(submenuPrincipal,menuPrincipal);
	
	//Funcionalidade Exibir/Ocultar Quadro Eventos
	var idEventos = document.getElementById('Eventos');
	idEventos.setAttribute('onmouseout',"this.className='subMenuOut'");
	idEventos.setAttribute('onmouseover',"this.className='subMenuOver'");
	idEventos.setAttribute('onclick',visibleMenu(OBJ_QUADRO_EVENTO,'Eventos',(BAYGON_CONFIG[0].value==1)));
	idEventos.addEventListener('click', function(){SaveConfig('Eventos');}, false);
	

	//Funcionalidade Exibir/Ocultar Quadro Pesquisa
	var idEventos = document.getElementById('Pesquisa');
	idEventos.setAttribute('onmouseout',"this.className='subMenuOut'");
	idEventos.setAttribute('onmouseover',"this.className='subMenuOver'");
	idEventos.setAttribute('onclick',visibleMenu(OBJ_QUADRO_PESQUISA,'Pesquisa',(BAYGON_CONFIG[1].value==1)));
	idEventos.addEventListener('click', function(){SaveConfig('Pesquisa');}, false);

}

function colorPrioridade()
{
    var baygonList = document.getElementById(OBJ_QUADRO_INCIDENTE).childNodes[1];
	var baygonFiltro = document.getElementById('ctl00_cphMasterPrincipal_cboOrdem');
	////html/body/form/table/tbody/tr[2]/td[2]/div[4]/center/table/tbody/tr/td[3]/div/div/div/div/center/table/tbody/tr[2]/td
	BAYGON_ORIGINADOR = new Array();
	////html/body/form/table/tbody/tr[2]/td[2]/div[4]/center/table/tbody/tr/td[3]/div/div/div/div/center/table/tbody/tr[2]/td
	
    for (var i = 1; i < baygonList.rows.length; i += 1)
    {
        var baygonPrioridade = baygonList.rows[i].cells[4];
        var baygonStatus     = baygonList.rows[i];

		//Centralizar as colunas de Status e Prioridade
		baygonList.rows[i].cells[3].setAttribute('align','center');
		baygonList.rows[i].cells[4].setAttribute('align','center');
		
/* 		//Atualiza o filtro dos originadores
		var optionOriginador = document.createElement('option');
		
		optionOriginador.setAttribute('value', i.toString());
		optionOriginador.innerHTML = baygonStatus.cells[8].innerHTML;
		baygonOriginador.appendChild(optionOriginador); */
  
        switch (baygonPrioridade.innerHTML){
            case 'Crítica':
	            baygonPrioridade.style.color = COR_PRIORIDADE_CRITICA;
				break;
            case 'Alta':
	            baygonPrioridade.style.color = COR_PRIORIDADE_ALTA;
				break;
            case 'Irrelevante':
	            baygonPrioridade.style.color = COR_PRIORIDADE_IRRELEVANTE;
				break;            
        }
        
		switch (baygonStatus.cells[3].innerHTML){
            case 'Em solução':
				baygonStatus.style.fontWeight = 'bold';
				baygonStatus.cells[3].innerHTML = '<image src="'+IMG_STATUS_SOLUCAO+'" width="20" height="20" title="'+baygonStatus.cells[3].innerHTML+'">';
				break;
            case 'Parado':
				baygonStatus.cells[3].innerHTML = '<image src="'+IMG_STATUS_PARADO+'" width="20" height="20" title="'+baygonStatus.cells[3].innerHTML+'">';
				break;        
            case 'Resolvido':
				baygonStatus.cells[3].innerHTML = '<image src="'+IMG_STATUS_RESOLVIDO+'" width="20" height="20" title="'+baygonStatus.cells[3].innerHTML+'">';
				break;        
        }
		
		addOriginador(baygonList.rows[i].cells[8].innerHTML);
		
/* 		var baygonPreview = document.createElement('span');
		
		baygonPreview.setAttribute('style', 'margin: auto; left: 1em;');
		baygonPreview.setAttribute('class', 'tooltip3');
		
		var baygonPreviewLink = document.createElement('a');
		baygonPreviewLink.setAttribute('class', 'addlink');		
		baygonPreviewLink.setAttribute('onclick', 'this.parentNode.style.display=\'none\'; return false;');
		baygonPreviewLink.innerHTML = requestScore(function(){getNode('//html/body')});
		
		baygonPreview.appendChild(baygonPreviewLink);
		
		baygonStatus.cells[2].childNodes[0].setAttribute('class', 'preview');		
		baygonStatus.cells[2].childNodes[0].appendChild(baygonPreview); */

    }
	
	// var baygonOriginador = document.createElement('span');
	// baygonOriginador.setAttribute('class', 'txtVerdeEscuro');
	// baygonOriginador.innerHTML = 'Originador:';
	
	// insertAfter(baygonOriginador, baygonFiltro);
	//baygonFiltro.appendChild(baygonOriginador); 
	

	
	//baygonFiltro.appendChild(baygonOriginador);
    
}

function AddBaygonFavorito(id, titulo, status, prioridade, modulo, tipo, responsavel, originador, data, link )
{
  if (!BaygonFavoritoSaved(id))
  {  
    LoadBaygonFavorito();

    BAYGON_FAVORITO.push(new baygonFavorito(id, titulo, status, prioridade, modulo, tipo, responsavel, originador, data, link));
    
    SaveBaygonFavorito();

    // Update the scratchpad
    //updateTargetsScratchpad();
  }
}

function removeBaygonFavoritoHandler()
{
  RemoveBaygonFavorito(this.id);
}

function moveBaygonFavoritoHandler()
{
  LoadBaygonFavorito();

  for (var i = 0; i < BAYGON_FAVORITO.length; i++)
  {
    if (BAYGON_FAVORITO[i].id == this.name)
    {
      if (this.title == 'Move Up' && i != 0)
      {
        var temp = BAYGON_FAVORITO[i];
        BAYGON_FAVORITO[i] = BAYGON_FAVORITO[i-1];
        BAYGON_FAVORITO[i-1] = temp;
      }
      else
      if (this.title == 'Move Down' && i != BAYGON_FAVORITO.length - 1)
      {
        var temp = BAYGON_FAVORITO[i];
        BAYGON_FAVORITO[i] = BAYGON_FAVORITO[i+1];
        BAYGON_FAVORITO[i+1] = temp;
      }

      SaveBaygonFavorito();

      // Update the scratchpad
      //updateTargetsScratchpad();

      break;
    }
  } 
}

function baygonFavorito(id, titulo, status, prioridade, modulo, tipo, responsavel, originador, data, link )
{
	this.id = id;
	this.titulo = titulo;
	this.status = status;
	this.prioridade = prioridade;
	this.modulo = modulo;
	this.tipo = tipo;
	this.responsavel = responsavel;
	this.originador = originador;
	this.data = data;
	this.link = link;
}

function LoadBaygonFavorito()
{
	BAYGON_FAVORITO = new Array();

	var rawData;
	var data = GM_getValue(cacheKeyBaygonFavorito);
	if (data == '' || data == null || data == undefined)
	{
	data = GM_getValue('favorito');
	}

	if (data != null || data != undefined)
	{
    rawData = data.split('::');
  
    if (rawData.length > 0)
    {
		for (var i = 1; i < rawData.length; i++)
		{
			try
			{
				var baygonFavoritoData = rawData[i].split(';');

				var baygonFavoritoDetails = baygonFavoritoData[0].split(',');

				var favorito = new baygonFavorito(baygonFavoritoDetails[0], baygonFavoritoDetails[1], baygonFavoritoDetails[2], baygonFavoritoDetails[3], baygonFavoritoDetails[4], baygonFavoritoDetails[5], baygonFavoritoDetails[6], baygonFavoritoDetails[7], baygonFavoritoDetails[8], baygonFavoritoDetails[9]);

				BAYGON_FAVORITO.push(favorito);
			}
			catch(err)
			{
				window.alert(err);
			}
		}
    }
  }
}

function SaveBaygonFavorito()
{
	var rawData = "";

	if (BAYGON_FAVORITO != null && BAYGON_FAVORITO.length > 0)
	{

		// Next, iterate through each target, and save all data
		for (var i = 0; i < BAYGON_FAVORITO.length; i++)
		{
		// Save the id and name, separated by comma
		rawData += BAYGON_FAVORITO[i].id+';';
		rawData += BAYGON_FAVORITO[i].titulo+';';
		rawData += BAYGON_FAVORITO[i].status+';';
		rawData += BAYGON_FAVORITO[i].prioridade+';';
		rawData += BAYGON_FAVORITO[i].modulo+';';
		rawData += BAYGON_FAVORITO[i].tipo+';';
		rawData += BAYGON_FAVORITO[i].responsavel+';';
		rawData += BAYGON_FAVORITO[i].originador+';';
		rawData += BAYGON_FAVORITO[i].data+';';
		rawData += BAYGON_FAVORITO[i].link+';';
		
		// Separate target data with double-colon
		rawData += i < BAYGON_FAVORITO.length - 1 ? '::': '';
		}    
	}

	// Save the data
	GM_setValue(cacheKeyBaygonFavorito, rawData);
}

function BaygonFavoritoSaved(id)
{
  for (var i = 0; i < BAYGON_FAVORITO.length; i++)
  {
    if (BAYGON_FAVORITO[i].id == id)
      return true;
  }

  return false;
}

function RemoveBaygonFavorito(id)
{
  var j = 0;
  var tempBaygonFavorito = new Array();

  for (var i = 0; i < BAYGON_FAVORITO.length; i++) 
  {
    if (BAYGON_FAVORITO[i].id != id) {
      tempBaygonFavorito[j++] = BAYGON_FAVORITO[i];
    }
  }

  // Clear old data
  GM_setValue(cacheKeyBaygonFavorito, ''); 
  BAYGON_FAVORITO = tempBaygonFavorito;

  // Save it for later
  SaveBaygonFavorito();

  // Update the scratchpad
  //updateTargetsScratchpad();
}

function baygonConfig(id, value)
{
	this.id = id;
	this.value = value;
}

function LoadBaygonConfig()
{
	BAYGON_CONFIG = new Array();

	var rawData;
	var data = GM_getValue(cacheKeyBaygonConfig);
	if (data == '' || data == null || data == undefined)
	{   
	    data = 'Eventos;0::Pesquisa;1';
	    GM_setValue(cacheKeyBaygonConfig, data);
	}

	if (data != null || data != undefined)
	{
    rawData = data.split('::');
    if (rawData.length > 0)
    {
		for (var i = 0; i < rawData.length; i++)
		{
			try
			{
				var baygonConfigData = rawData[i].split(';');

				BAYGON_CONFIG.push(new baygonConfig(baygonConfigData[0], baygonConfigData[1]));
			}
			catch(err)
			{
				window.alert(err);
			}
		}
    }
  }
}

function SaveBaygonConfig()
{
	var rawData = "";

	if (BAYGON_CONFIG != null && BAYGON_CONFIG.length > 0)
	{

		// Next, iterate through each target, and save all data
		for (var i = 0; i < BAYGON_CONFIG.length; i++)
		{
		// Save the id and name, separated by comma
		rawData += BAYGON_CONFIG[i].id+';';
		rawData += BAYGON_CONFIG[i].value+';';
		
		// Separate target data with double-colon
		rawData += i < BAYGON_CONFIG.length - 1 ? '::': '';
		}    
	}

	// Save the data
	GM_setValue(cacheKeyBaygonConfig, rawData);
}

function SaveConfig(id)
{
	for (var i = 0; i < BAYGON_CONFIG.length; i++)
	{
		if (BAYGON_CONFIG[i].id == id)
		{
			if (BAYGON_CONFIG[i].value == 0)
				BAYGON_CONFIG[i].value = 1;
			else
				BAYGON_CONFIG[i].value = 0;
				
			SaveBaygonConfig();
		}
	}
}


function baygonOriginador(name)
{
	this.name = name;
}

function existOriginador(name)
{
	for (var i = 0; i < BAYGON_ORIGINADOR.length; i++)
	{
		if (BAYGON_ORIGINADOR[i].name == name)
		{
			return true;
		}
	}
	
	return false;
}

function addOriginador(name)
{
	if (!existOriginador(name))
	{  
		BAYGON_ORIGINADOR.push(new baygonOriginador(name));
	}
}


/**************************************************************************************************
FUNÇÕES ÚTEIS
**************************************************************************************************/
//-------------------------------------------------------------------------------------------------
//Descrição: Obtem nó do caminho
//-------------------------------------------------------------------------------------------------
function getNode(path) {
  var value = executeQuery(path);
  if (value.snapshotLength == 1) {
    return value.snapshotItem(0);
  }
  return null;
}

//-------------------------------------------------------------------------------------------------
//Descrição: Executa pesquisa de nó
//-------------------------------------------------------------------------------------------------
function executeQuery(query) {
  return document.evaluate(query, document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

//-------------------------------------------------------------------------------------------------
//Descrição: Insere nó depois do nó de referencia
//-------------------------------------------------------------------------------------------------
function insertAfter(node, referenceNode) {
  referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
}

//-------------------------------------------------------------------------------------------------
//Descrição: Insere nó antes do nó de referencia
//-------------------------------------------------------------------------------------------------
function insertBefore(node, referenceNode) {
  referenceNode.parentNode.insertBefore(node, referenceNode);
}

//-------------------------------------------------------------------------------------------------
//Descrição: Função para exibir/ocultar Menu
//-------------------------------------------------------------------------------------------------
function visibleMenu(idDisplay, idColor, visible)
{
	if (visible)
	{
		//Exibe Menu
		document.getElementById(idDisplay).style.display = '';
		document.getElementById(idColor).style.color = COR_MENU_ATIVADO;	
	}
	else
	{
		//Oculta Menu
		document.getElementById(idDisplay).style.display = 'none';
		document.getElementById(idColor).style.color = COR_MENU_DESATIVADO;	
	}
	
	//Retorna JavaScript para evento OnClick
	return "if(document.getElementById('"+idDisplay+"').style.display == 'none'){document.getElementById('"+idDisplay+"').style.display = '';this.style.color = '"+COR_MENU_ATIVADO+"';}else{document.getElementById('"+idDisplay+"').style.display = 'none';this.style.color = '"+COR_MENU_DESATIVADO+"';}";
}

/**************************************************************************************************
ATUALIZAÇÃO DO SCRIPT
**************************************************************************************************/
