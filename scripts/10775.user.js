// ==UserScript==
// @name           oGame Calculador
// @namespace      http://www.kirkham-br.org
// @description    Calcula o tempo de retorno das naves no jogo oGame
// @include        http://*/game/overview.php*
// ==/UserScript==

/*
 *
 * Autor: Henrique Pedroni Neto
 * Sugestao de criacao: eGo loLO
 *
 *
 * Data de Criacao: 16/07/2007 23:25h 
 * Data de Atualizacao: nunca feita
 *
 *
 * Versao 1.0
 *
 *
 * IMPORTANTE:
 * Desenvolvido unica e exclusivamente para uso da alianca eGo.Ves e seus membros.        
 *
 *
 * FÓRMULAS USADAS:
 *
 * Tempo de Voo:
 * - Ate o proprio CD:
 * (10 + (35.000 / porcentagem) * Raiz((1.000.005) / velocidade))
 *
 * - Ate o mesmo Sistema Solar:
 * (10 + (35.000 / porcentagem) * Raiz((1.000.000 + (Planetas * 5000)) / velocidade))
 * 
 * - Na mesma galaxia:
 * (10 + (35.000 / porcentagem) * Raiz((2.700.000 + (Sistemas * 95000)) / velocidade))
 * 
 * - Entre galaxias:
 * (10 + (35.000 / porcentagem) * Raiz((Galaxias * 20.000.000) / velocidade))
 *
 *
 * COMO USAR:
 * Assim que instalado, aparecera na Visao Geral da galaxia, uma botao (cujo nome voce pode definir nas 
 * configuracoes) que ao ser clicado abrira uma janela permitindo que se faca os calculos baseado em 
 * dados fornecidos pelo usuario
 *
 */



/* --------- CONFIGURACOES PESSOAIS --------- */ 

// Texto que aparecera no botao 
var calcTextoBotao  = 'Mostrar Calculador';

// Cor de fundo do calculador
var calcCorFundo = '#081424';

// Cor da borda do calculador;
var calcCorBorda = '#344566';

// Posicao do Calculador (em pixels)
var calcPosTop  = 100;
var calcPosLeft = 0;

// Tamanho do Calculador
var calcTamanho = '260 px';

// Iniciar visivel
var calcVisivel = false;


/* --------- FIM DAS CONFIGURACOES  --------- */




/* ------------- FUNCOES ------------- */

function CriarBotaoCalculador ()
{
	var botao = '';

	botao += '<p><input type="button" value="'+ calcTextoBotao +'" onClick="';
        botao += 'var obj = document.getElementById(\'calculador_transferir\');';
	botao += 'if (obj.style.display == \'none\')';
        botao += '  obj.style.display = \'block\';';
	botao += 'else';
	botao += '  obj.style.display = \'none\';"';
	botao += '></p>';

	return botao;
}

function CriarCalculador ()
{
	
	var dc = '';
	
	// Verifica se inicia visivel ou escondido
	var visivel = 'none';
	if (calcVisivel)
		visivel = 'block';

	// Inicia o DIV 
	dc += '<div id="calculador_transferir" style="background-color: '+ calcCorFundo +'; display: '+ visivel +';';
	dc += 'position: absolute; z-index:2; left:'+ calcPosLeft +'px; top:'+ calcPosTop +'px;">';
	dc += '<table width="'+ calcTamanho +'" style="border: 1px solid '+ calcCorBorda +'" border="1">';

	// Opcao 1
	dc += '<tr><td class="c">Calculador de Transferir</td></tr>';
	dc += '<tr><th style="text-align: left;"> <a href="#" onClick="var obj = document.getElementById(\'PCD\'); if (obj.style.display == \'none\') obj.style.display = \'block\'; else obj.style.display = \'none\';"> 1. At&eacute; o pr&oacute;prio CD </a></th></tr>';

	// CD
	dc += '<tr><th>';
	dc += '<table id="PCD" style="display: none" width="100%" border="0">';
	dc += '<tr><td width="80%">Qual a porcentagem da Velocidade?: </td><td><input type="text" id="pcd_porc" size="4"></td></tr>';
	dc += '<tr><td width="80%">Qual a velocidade da nave mais lenta?: </td><td><input type="text" id="pcd_velo" size="4"></td></tr>';
	dc += '<tr><td width="80%">Tempo de V&ocirc;o: <span id="pcd_hor"></span>:<span id="pcd_min"></span>:<span id="pcd_seg"></span></td><td>';
	dc += '<input type="button" value="Ver" onClick="';
	dc += 'var porcentagem = document.getElementById(\'pcd_porc\').value;';
	dc += 'var velocidade = document.getElementById(\'pcd_velo\').value;';
	
	// Formula
	dc += 'var res = Math.round((10 + ((35000/porcentagem) * Math.sqrt(1000005/velocidade))));';

	// Calculo das horas
	dc += 'var hor = parseInt(res / 3600);';
	dc += 'var min = parseInt((res / 60) - (hor * 60));';
	dc += 'var seg = res - ((hor * 3600) + (min * 60));';

	dc += 'document.getElementById(\'pcd_hor\').innerHTML = hor;';
	dc += 'document.getElementById(\'pcd_min\').innerHTML = min;';
	dc += 'document.getElementById(\'pcd_seg\').innerHTML = seg;';
	dc += '"></td></tr></table>';
	dc += '</th></tr>';


 	// Opcao 2
	dc += '<tr><th style="text-align: left;"><a href="#" onClick="var obj = document.getElementById(\'MSS\'); if (obj.style.display == \'none\') obj.style.display = \'block\'; else obj.style.display = \'none\';"> 2. At&eacute; o mesmo Sistema Solar </a></th></tr>';
	
	// Mesmo Sistema Solar
	dc += '<tr><th>';
	dc += '<table id="MSS" style="display: none" width="100%" border="0">';
	dc += '<tr><td width="80%">Qual a porcentagem da Velocidade?: </td><td><input type="text" id="mss_porc" size="4"></td></tr>';
	dc += '<tr><td width="80%">Qual a velocidade da nave mais lenta?: </td><td><input type="text" id="mss_velo" size="4"></td></tr>';
	dc += '<tr><td width="80%">Quantos planetas de dist&acirc;ncia?: </td><td><input type="text" id="mss_plan" size="4"></td></tr>';
	dc += '<tr><td width="80%">Tempo de V&ocirc;o: <span id="mss_hor"></span>:<span id="mss_min"></span>:<span id="mss_seg"></span></td><td>';
	dc += '<input type="button" value="Ver" onClick="';
	dc += 'var porcentagem = document.getElementById(\'mss_porc\').value;';
	dc += 'var velocidade = document.getElementById(\'mss_velo\').value;';
	dc += 'var planetas = document.getElementById(\'mss_plan\').value;';
	
	// Formula
	dc += 'var res = Math.round((10 + ((35000/porcentagem) * Math.sqrt(((1000000+(planetas*5000))/velocidade)))));';
	

	// Calculo das horas
	dc += 'var hor = parseInt(res / 3600);';
	dc += 'var min = parseInt((res / 60) - (hor * 60));';
	dc += 'var seg = res - ((hor * 3600) + (min * 60));';

	dc += 'document.getElementById(\'mss_hor\').innerHTML = hor;';
	dc += 'document.getElementById(\'mss_min\').innerHTML = min;';
	dc += 'document.getElementById(\'mss_seg\').innerHTML = seg;';
	dc += '"></td></tr></table>';
	dc += '</th></tr>';


	// Opcao 3
	dc += '<tr><th style="text-align: left;"><a href="#" onClick="var obj = document.getElementById(\'MG\'); if (obj.style.display == \'none\') obj.style.display = \'block\'; else obj.style.display = \'none\';"> 3. Na mesma gal&aacute;xia </a></th></tr>';

	// Mesma Galaxia
	dc += '<tr><th>';
	dc += '<table id="MG" style="display: none" width="100%" border="0">';
	dc += '<tr><td width="80%">Qual a porcentagem da Velocidade?: </td><td><input type="text" id="mg_porc" size="4"></td></tr>';
	dc += '<tr><td width="80%">Qual a velocidade da nave mais lenta?: </td><td><input type="text" id="mg_velo" size="4"></td></tr>';
	dc += '<tr><td width="80%">Quantos sistemas de dist&acirc;ncia?: </td><td><input type="text" id="mg_sist" size="4"></td></tr>';
	dc += '<tr><td width="80%">Tempo de V&ocirc;o: <span id="mg_hor"></span>:<span id="mg_min"></span>:<span id="mg_seg"></span></td><td>';
	dc += '<input type="button" value="Ver" onClick="';
	dc += 'var porcentagem = document.getElementById(\'mg_porc\').value;';
	dc += 'var velocidade = document.getElementById(\'mg_velo\').value;';
	dc += 'var sistemas = document.getElementById(\'mg_sist\').value;';

	// Formula
	dc += 'var res = Math.round((10 + ((35000/porcentagem) * Math.sqrt(((2700000+(sistemas*95000))/velocidade)))));';
	
	// Calculo das horas
	dc += 'var hor = parseInt(res / 3600);';
	dc += 'var min = parseInt((res / 60) - (hor * 60));';
	dc += 'var seg = res - ((hor * 3600) + (min * 60));';

	dc += 'document.getElementById(\'mg_hor\').innerHTML = hor;';
	dc += 'document.getElementById(\'mg_min\').innerHTML = min;';
	dc += 'document.getElementById(\'mg_seg\').innerHTML = seg;';
	dc += '"></td></tr></table>';
	dc += '</th></tr>';


	// Opcao 4
	dc += '<tr><th style="text-align: left;"><a href="#" onClick="var obj = document.getElementById(\'EG\'); if (obj.style.display == \'none\') obj.style.display = \'block\'; else obj.style.display = \'none\';"> 4. Entre gal&aacute;xias </a></th></tr>';

	// Entre Galaxias
	dc += '<tr><th>';
	dc += '<table id="EG" style="display: none" width="100%" border="0">';
	dc += '<tr><td width="80%">Qual a porcentagem da Velocidade?: </td><td><input type="text" id="eg_porc" size="4"></td></tr>';
	dc += '<tr><td width="80%">Qual a velocidade da nave mais lenta?: </td><td><input type="text" id="eg_velo" size="4"></td></tr>';
	dc += '<tr><td width="80%">Quantas gal&aacute;xias de dist&acirc;ncia?: </td><td><input type="text" id="eg_gala" size="4"></td></tr>';
	dc += '<tr><td width="80%">Tempo de V&ocirc;o: <span id="eg_hor"></span>:<span id="eg_min"></span>:<span id="eg_seg"></span></td><td>';
	dc += '<input type="button" value="Ver" onClick="';
	dc += 'var porcentagem = document.getElementById(\'eg_porc\').value;';
	dc += 'var velocidade = document.getElementById(\'eg_velo\').value;';
	dc += 'var galaxias = document.getElementById(\'eg_gala\').value;';

	// Formula
	dc += 'var res = Math.round((10 + ((35000/porcentagem) * Math.sqrt(((galaxias*20000000))/velocidade))));';

	// Calculo das horas
	dc += 'var hor = parseInt(res / 3600);';
	dc += 'var min = parseInt((res / 60) - (hor * 60));';
	dc += 'var seg = res - ((hor * 3600) + (min * 60));';
	
	dc += 'document.getElementById(\'eg_hor\').innerHTML = hor;';
	dc += 'document.getElementById(\'eg_min\').innerHTML = min;';
	dc += 'document.getElementById(\'eg_seg\').innerHTML = seg;';
	dc += '"></td></tr></table>';
	dc += '</th></tr>';

	// Fecha o DIV 
	dc += '</table></div>';
	
	return dc;
}

function InserirBotaoCalculador ()
{
	// Pega todos os links da pagina
	var a_links = document.getElementsByTagName('a');

	// Para cada link
	for (i in a_links)
	{
		var link = a_links[i];
	
		// Verifica se possui o attributo href	
		if (link.href)
		{
			// Se possuir, verifica se eh o link para renomear o planeta
			// Com isso identificamos um elemento para que posicionemos
			// o botao que ira mostrar o calculador e o proprio calculador
			if (link.href.indexOf('renameplanet') != -1)
			{
				// Pega o conteudo HTML do noh mais acima do link (no caso eh um table cell)
				var html = link.parentNode.innerHTML;
	
				// Adiciona o Botao que mostrarah o Calculador
				html += CriarBotaoCalculador();
				// Adiciona o Calculador
				html += CriarCalculador();
				
				// Insere no HTML
				link.parentNode.innerHTML = html;
			}
		}
	}		
}

// Executa o script 
InserirBotaoCalculador();
