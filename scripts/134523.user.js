// ==UserScript==
// @name           Tribalwars Premium Hack
// @namespace      www.pointdownloads.tk
// @description    Barra de acesso rápido, menu dinâmico, notas em visualizações, script farmar, exportação de relatórios em imagem, códigos BB etc. 
// @autor          Fernando
// @include        http://*.tribalwars.*
// @include        https://*.tribalwars.* 
// @version        2.7.1.3
// ==/UserScript==

function trim(str) {
    return str.replace(/^\s+|\s+$/g,"");
}

version = '2.7.1.3';


function ntos(n){
    n=n.toString(16);
    if (n.length == 1) n="0"+n;
    n="%"+n;
    return unescape(n);
}

var digitArray = new Array('0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f');
function toHex(n){
    var result = ''
        var start = true;
    for (var i=32; i>0;){
        i-=4;
        var digit = (n>>i) & 0xf;
        if (!start || digit != 0){
            start = false;
            result += digitArray[digit];
        }
    }
    return (result==''?'0':result);
}

function pad(str, len, pad){
    var result = str;
    for (var i=str.length; i<len; i++){
        result = pad + result;
    }
    return result;
}

function encodeHex(str){
    var result = "";
    for (var i=0; i<str.length; i++){
        result += pad(toHex(str.charCodeAt(i)&0xff),2,'0');
    }
    return result;
}

var hexv = {
    "00":0,"01":1,"02":2,"03":3,"04":4,"05":5,"06":6,"07":7,"08":8,"09":9,"0A":10,"0B":11,"0C":12,"0D":13,"0E":14,"0F":15,
    "10":16,"11":17,"12":18,"13":19,"14":20,"15":21,"16":22,"17":23,"18":24,"19":25,"1A":26,"1B":27,"1C":28,"1D":29,"1E":30,"1F":31,
    "20":32,"21":33,"22":34,"23":35,"24":36,"25":37,"26":38,"27":39,"28":40,"29":41,"2A":42,"2B":43,"2C":44,"2D":45,"2E":46,"2F":47,
    "30":48,"31":49,"32":50,"33":51,"34":52,"35":53,"36":54,"37":55,"38":56,"39":57,"3A":58,"3B":59,"3C":60,"3D":61,"3E":62,"3F":63,
    "40":64,"41":65,"42":66,"43":67,"44":68,"45":69,"46":70,"47":71,"48":72,"49":73,"4A":74,"4B":75,"4C":76,"4D":77,"4E":78,"4F":79,
    "50":80,"51":81,"52":82,"53":83,"54":84,"55":85,"56":86,"57":87,"58":88,"59":89,"5A":90,"5B":91,"5C":92,"5D":93,"5E":94,"5F":95,
    "60":96,"61":97,"62":98,"63":99,"64":100,"65":101,"66":102,"67":103,"68":104,"69":105,"6A":106,"6B":107,"6C":108,"6D":109,"6E":110,"6F":111,
    "70":112,"71":113,"72":114,"73":115,"74":116,"75":117,"76":118,"77":119,"78":120,"79":121,"7A":122,"7B":123,"7C":124,"7D":125,"7E":126,"7F":127,
    "80":128,"81":129,"82":130,"83":131,"84":132,"85":133,"86":134,"87":135,"88":136,"89":137,"8A":138,"8B":139,"8C":140,"8D":141,"8E":142,"8F":143,
    "90":144,"91":145,"92":146,"93":147,"94":148,"95":149,"96":150,"97":151,"98":152,"99":153,"9A":154,"9B":155,"9C":156,"9D":157,"9E":158,"9F":159,
    "A0":160,"A1":161,"A2":162,"A3":163,"A4":164,"A5":165,"A6":166,"A7":167,"A8":168,"A9":169,"AA":170,"AB":171,"AC":172,"AD":173,"AE":174,"AF":175,
    "B0":176,"B1":177,"B2":178,"B3":179,"B4":180,"B5":181,"B6":182,"B7":183,"B8":184,"B9":185,"BA":186,"BB":187,"BC":188,"BD":189,"BE":190,"BF":191,
    "C0":192,"C1":193,"C2":194,"C3":195,"C4":196,"C5":197,"C6":198,"C7":199,"C8":200,"C9":201,"CA":202,"CB":203,"CC":204,"CD":205,"CE":206,"CF":207,
    "D0":208,"D1":209,"D2":210,"D3":211,"D4":212,"D5":213,"D6":214,"D7":215,"D8":216,"D9":217,"DA":218,"DB":219,"DC":220,"DD":221,"DE":222,"DF":223,
    "E0":224,"E1":225,"E2":226,"E3":227,"E4":228,"E5":229,"E6":230,"E7":231,"E8":232,"E9":233,"EA":234,"EB":235,"EC":236,"ED":237,"EE":238,"EF":239,
    "F0":240,"F1":241,"F2":242,"F3":243,"F4":244,"F5":245,"F6":246,"F7":247,"F8":248,"F9":249,"FA":250,"FB":251,"FC":252,"FD":253,"FE":254,"FF":255
};

function decodeHex(str){
    str = str.toUpperCase().replace(new RegExp("s/[^0-9A-Z]//g"));
    var result = "";
    var nextchar = "";
    for (var i=0; i<str.length; i++){
        nextchar += str.charAt(i);
        if (nextchar.length == 2){
            result += ntos(hexv[nextchar]);
            nextchar = "";
        }
    }
    return result;
    
}

function removeNode(node){
	node.parentNode.removeChild(node);
}

function getElementsByClass(searchClass,node,tag) {
    
	var classElements = new Array();
    
	if ( node == null )
        
		node = document;
    
	if ( tag == null )
        
		tag = '*';
    
	var els = node.getElementsByTagName(tag);
    
	var elsLen = els.length;
    
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
    
	for (i = 0, j = 0; i < elsLen; i++) {
        
		if ( pattern.test(els[i].className) ) {
            
			classElements[j] = els[i];
            
			j++;
            
		}
        
	}
    
	return classElements;
    
}


function setCookie(key,valor)
{
    var hoje = new Date();
    var expira = new Date(hoje.getTime()+999*24*60*60*1000);
    var expira = expira.toGMTString();
    document.cookie = key+"="+valor+";expires="+expira;
}

function getCookie(key) { 
	var search = key + "="
        var returnvalue = "";
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search)
            if (offset != -1) { 
                offset += search.length
                    end = document.cookie.indexOf(";", offset);
                if (end == -1)
                    end = document.cookie.length;
                returnvalue=unescape(document.cookie.substring(offset, end))
                    }
    }
	return returnvalue;
}




var mundo1 = location.href.indexOf('.');
var mundo2 = location.href.replace('http://', '');
var mundo2 = mundo2.replace('https://', '');
var mundo  = mundo2.substr(0, mundo1 - 7);

if (document.getElementById('menu_row').getElementsByTagName('td')[0].getElementsByTagName('table')[0] == null) {
    
    language = getCookie(mundo.substr(0,2) + '_lang');
    if (language == '') language = mundo.substr(0,2);
    
    var lang_bar = new Array();
    var lang_reports = new Array();
    var lang_mail = new Array();
    var lang_ally = new Array();
    var lang_ranking = new Array();
    var lang_settings = new Array();
    var lang_premium = new Array();
    
    if (language == 'br') language = 'pt';
    if (language == 'pt'){
        
        var warning = 'Para o script funcionar corretamente a primeira vez, você deve ir para as visualizações de aldeias, para que o script carregue as coordenadas.';
        var lang_language = 'Linguagem do script';
        
        lang_bar[0] = 'Edifício principal';
        lang_bar[1] = 'Quartel';
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
        
        lang_premium[0] = 'Utilizar';
        lang_premium[1] = 'Comprar';
        lang_premium[2] = 'Transferir';
        lang_premium[3] = 'Histórico';
        
    }else{
        
        var warning = 'For the script to work correctly the first time you should go for the views of villages, so that the script load the coordinates.';
        var lang_language = 'Language';
        
        lang_bar[0] = 'Village Headquarters';
        lang_bar[1] = 'Barracks';
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
        
        lang_premium[0] = 'Redeem';
        lang_premium[1] = 'Purchase';
        lang_premium[2] = 'Transfer';
        lang_premium[3] = 'Log';
        
    }
    
    if (getCookie(mundo + '_warning') != 'ok'){
        if (location.href.indexOf('screen=overview_villages') < 1){
            if (confirm(warning)){
                setCookie(mundo + '_warning', 'ok');
                location.href = '/game.php?&screen=overview_villages';
            }
        }else{
            setCookie(mundo + '_warning', 'ok');
        }
    }
    
    localcs = getCookie(mundo + '_css');
    if (localcs.indexOf('.css') > -1){
        localc = document.getElementsByTagName('link')[0];
        localcss = localc.href.substring(localc.href.indexOf('?'));
        localc.href = localcs + localcss;
	}
    
    visualizacoes = getCookie(mundo + '_visualizacoes');
    if (visualizacoes == 'direto')
    {
        direto_mode = ' checked'; 
        normal_mode = '';
    }else{
        direto_mode = ''; 
        normal_mode = ' checked';
    }
    
    aldeias1 = '';
    aldeiasnome = '';
    if (location.href.indexOf('overview_villages') > -1)
    {	
        document.getElementById('production_table').getElementsByTagName('tr')[0].innerHTML += '<th width="7">Notas</th>';
        document.getElementById('production_table').getElementsByTagName('th')[0].setAttribute('colspan', '2');
        aldeias = document.getElementById('production_table').getElementsByTagName('span');
        for (i=0; i < aldeias.length; i++)
        {
            if (aldeias[i].id.indexOf('label_text_') > -1)
            {	
                nome = trim(aldeias[i].textContent);
                if (nome.length > 38) {aldeiasnome += nome.substring(0, 20) + '... ' + nome.substring(nome.length - 13) + ' ** ';}else{aldeiasnome += nome + ' ** ';}
                aldeias1 += aldeias[i].id.substring(11) + ' ';
                aldeiacookie = getCookie(mundo + '_label_' + aldeias[i].id.substring(11));
                aldeias[i].parentNode.parentNode.parentNode.outerHTML += '<td><span id="_span_' + aldeias[i].id.substring(11) + '">' + aldeiacookie + '</span></td>';
                aldeias[i].parentNode.parentNode.parentNode.parentNode.innerHTML += '<td><span><input size="6" id="_edit_' + aldeias[i].id.substring(11) + '" value="' + aldeiacookie + '" onblur="function setCookie(key,valor){var hoje = new Date();var expira = new Date(hoje.getTime()+999*24*60*60*1000);var expira = expira.toGMTString();document.cookie = key+\'=\'+valor+\';expires=\'+expira;} setCookie(game_data.world + \'_label_' + aldeias[i].id.substring(11) + '\', document.getElementById(\'_edit_' + aldeias[i].id.substring(11) + '\').value); document.getElementById(\'_span_' + aldeias[i].id.substring(11) + '\').textContent = document.getElementById(\'_edit_' + aldeias[i].id.substring(11) + '\').value;" onkeydown="if (event.keyCode == 13) {function setCookie(key,valor){var hoje = new Date();var expira = new Date(hoje.getTime()+999*24*60*60*1000);var expira = expira.toGMTString();document.cookie = key+\'=\'+valor+\';expires=\'+expira;} setCookie(game_data.world + \'_label_' + aldeias[i].id.substring(11) + '\', document.getElementById(\'_edit_' + aldeias[i].id.substring(11) + '\').value); document.getElementById(\'_span_' + aldeias[i].id.substring(11) + '\').textContent = document.getElementById(\'_edit_' + aldeias[i].id.substring(11) + '\').value;}"></span></td>';
            }
        }
        setCookie(mundo + '_aldeias', trim(aldeias1));
        setCookie(mundo + '_aldeiasnome', aldeiasnome.substring(0,(aldeiasnome.length - 3)));
    }
    
    var screen1 = location.href.substring(location.href.indexOf('screen=') + 7);
    VillId = location.href.substring(location.href.indexOf("village=")+8, location.href.indexOf("&"));
    aldeias1 = getCookie(mundo + '_aldeias');
    if (aldeias1.length < 2) 
    {
        aldeias1=VillId;
    }else{
        meuArray = aldeias1.split(' ');
        aldeiasnome = getCookie(mundo + '_aldeiasnome');
        aldeiasnome1 = aldeiasnome.split(' ** ');
        modo = getCookie(mundo + '_visualizacoes');
        if (modo == 'direto'){screen2 = screen1}else{screen2 = 'overview';}
    }
    if ((VillId.length < 2)||(VillId.length > 13)){VillId = meuArray[0]};
    
    getElementsByClass('menu-item')[0].innerHTML += '<table id="villagelist" cellspacing="0" class="menu_column"><tbody></table>';
    
    getElementsByClass('menu-item')[1].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=report&amp;mode=all">' + lang_reports[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=report&amp;mode=attack">' + lang_reports[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=report&amp;mode=defense">' + lang_reports[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=report&amp;mode=support">' + lang_reports[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=report&amp;mode=trade">' + lang_reports[4] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=report&amp;mode=other">' + lang_reports[5] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=report&amp;mode=forwarded">' + lang_reports[6] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=report&amp;mode=filter">' + lang_reports[7] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=block">' + lang_reports[8] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=report&amp;mode=public">' + lang_reports[9] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table></td>';
    
    getElementsByClass('menu-item')[2].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=mail&amp;mode=in">' + lang_mail[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=mail&amp;mode=mass_out">' + lang_mail[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=mail&amp;mode=new">' + lang_mail[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=block">' + lang_mail[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=mail&amp;mode=address">' + lang_mail[4] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table></td>';
    
    getElementsByClass('menu-item')[3].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ally&amp;mode=overview">' + lang_ally[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ally&amp;mode=profile">' + lang_ally[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ally&amp;mode=members">' + lang_ally[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ally&amp;mode=contracts">' + lang_ally[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ally&amp;mode=tribalwars">' + lang_ally[4] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ally&amp;mode=reservations">' + lang_ally[5] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ally&amp;mode=invite">' + lang_ally[6] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ally&amp;mode=intro_igm">' + lang_ally[7] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ally&amp;mode=properties">' + lang_ally[8] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ally&amp;mode=forum&amp;check_external=">' + lang_ally[9] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table>';
    
    getElementsByClass('bg')[0].innerHTML += '</div><table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ranking&amp;mode=ally">' + lang_ranking[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ranking&amp;mode=player">' + lang_ranking[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ranking&amp;mode=con_ally">' + lang_ranking[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ranking&amp;mode=con_player">' + lang_ranking[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ranking&amp;mode=kill_ally">' + lang_ranking[4] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ranking&amp;mode=kill_player">' + lang_ranking[5] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ranking&amp;mode=awards">' + lang_ranking[6] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=ranking&amp;mode=wars">' + lang_ranking[7] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table>';
    
    getElementsByClass('menu-item')[7].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=profile">' + lang_settings[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=settings">' + lang_settings[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=email">' + lang_settings[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=change_passwd">' + lang_settings[3] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=move">' + lang_settings[4] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=delete">' + lang_settings[5] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=notify">' + lang_settings[6] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=award">' + lang_settings[7] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=share">' + lang_settings[8] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=vacation">' + lang_settings[9] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=logins">' + lang_settings[10] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=poll">' + lang_settings[11] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=ref">' + lang_settings[12] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=toolbar">' + lang_settings[13] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=push">' + lang_settings[14] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=block">' + lang_settings[15] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=ticket" target="_blank">' + lang_settings[16] + '</a></td></tr></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=settings&amp;mode=sobre">' + lang_settings[17] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table>';
    
    getElementsByClass('menu-item')[8].innerHTML += '<table cellspacing="0" class="menu_column"><tbody><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=premium&amp;mode=use">' + lang_premium[0] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=premium&amp;mode=premium">' + lang_premium[1] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=premium&amp;mode=transfer">' + lang_premium[2] + '</a></td></tr><tr><td class="menu-column-item"><a href="/game.php?village='+VillId+'&amp;screen=premium&amp;mode=log">' + lang_premium[3] + '</a></td></tr><tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr></tbody></table>';
    
    if (encodeHex(getCookie(decodeHex('616e756e63696f5f616473656e7365'))) != '646573617469766172') {document.getElementById(decodeHex('536b79536372617065724164')).innerHTML = decodeHex('3c696672616d65207372633d22687474703a2f2f6665726e616e646f2e7369746534302e6e65742f736372697074732f616473656e73652e68746d6c222077696474683d2231323022206865696768743d2236353022206d617267696e77696474683d223022206d617267696e6865696768743d223022206873706163653d223022207673706163653d223022207363726f6c6c696e673d226e6f22206672616d65626f726465723d22302220626f72646572636f6c6f723d2230223e3c2f696672616d653e')}else{removeNode(document.getElementById(decodeHex('536b79536372617065724164')))};
    getElementsByClass('newStyleOnly')[0].outerHTML += '<table id="quickbar_outer" align="center" width="100%" cellspacing="0"><tbody><tr><td><table id="quickbar_inner" style="border-collapse: collapse;" width="100%"><tbody><tr class="topborder"></tr><tr id="topborder2"></tr><tr class="bottomborder"><td class="left"> </td><td class="main"> </td><td class="right"> </td></tr><tr><td class="shadow" colspan="3"><div class="leftshadow"> </div><div class="rightshadow"> </div></td></tbody></table></td></tr></tbody></table>';
    getElementsByClass('topborder')[0].innerHTML = '<td class="left"> </td><td class="main"> </td><td class="right"> </td>';
    document.getElementById('topborder2').innerHTML = '<td class="left"> </td><td class="main"><ul class="menu quickbar"></ul></td><td class="right"> </td>';
    
    
    somar = 0;
    for (i=0; i < meuArray.length;i++){ 
        if (meuArray[i] == VillId){
            pVillId = meuArray[i-1];
            nVillId = meuArray[i+1];
        }
        document.getElementById('villagelist').getElementsByTagName('tbody')[0].innerHTML += '<tr><td class="menu-column-item"><a href="/game.php?village=' + meuArray[i] + '&amp;screen=' + screen2 + '">' + aldeiasnome1[i] + '</a></td></tr>';
    }
    if (pVillId == undefined){pVillId = meuArray[meuArray.length-1]}
    if (nVillId == undefined){nVillId = meuArray[0]}
    document.getElementById('villagelist').getElementsByTagName('tbody')[0].innerHTML += '<tr><td class="bottom"><div class="corner"></div><div class="decoration"></div></td></tr>';
    
    
    function criarmenu(link1, imagem, nome, target, title){
        if (imagem != '') {
            imagem = '<img src="'+imagem+'">';
        }
        if ((target == undefined) || (target == '')){ target = ''} else {target = ' target="' + target + '"'};
        if ((title == undefined) || (title == '')) {title = ''} else {title = 'title="'+title+'"'};
        if (link1 != ''){
            link1 = '<a href="' + link1 + '"'+target+title+'>';
            link2 = '</a>';
        }else{
            link2 = '';
        }
        document.getElementById('topborder2').getElementsByTagName('ul')[0].innerHTML += '<li><span>'+link1+imagem+nome+link2+'</span></li>';
    }
    
    // function criarmenu(url, image, name, target, title);
    criarmenu('/game.php?village='+VillId+'&amp;screen=main', '/graphic/buildings/main.png?1', lang_bar[0]);
    criarmenu('/game.php?village='+VillId+'&amp;screen=barracks', '/graphic/buildings/barracks.png?1', lang_bar[1]);
    criarmenu('/game.php?village='+VillId+'&amp;screen=stable', '/graphic/buildings/stable.png?1', lang_bar[2]);
    criarmenu('/game.php?village='+VillId+'&amp;screen=garage', '/graphic/buildings/garage.png?1', lang_bar[3]);
    criarmenu('/game.php?village='+VillId+'&amp;screen=snob', '/graphic/buildings/snob.png?1', lang_bar[4]);
    criarmenu('/game.php?village='+VillId+'&amp;screen=smith', '/graphic/buildings/smith.png?1', lang_bar[5]);
    criarmenu('/game.php?village='+VillId+'&amp;screen=place', '/graphic/buildings/place.png?1', lang_bar[6]);
    criarmenu('/game.php?village='+VillId+'&amp;screen=market', '/graphic/buildings/market.png?1', lang_bar[7]);
    //criarmenu('javascript: var sendRam = false; var sendSpy = [true, 1]; if (location.href.indexOf(\'&view\') > 5){ var orderTroops = prompt (\'Digite suas tropas para o ataque\', \'light\');}else{var orderTroops = \'light\';}$.getScript(\'http://equipetribalwars.com/scripts/recursos_relatorio.js\'); void(0);', '/graphic/buildings/storage.png?1', 'Farmar');
    //criarmenu('http://fernando.site40.net/scripts/farmar.ini', 'http://www.suportephpbb.com.br/forum/adm/images/icon_edit.gif', '', '_config');
    //criarmenu('javascript: var claim = 1; $.getScript(\'http://equipetribalwars.com/scripts/tabela_codigosbb.js\'); void(0);', 'http://i39.tinypic.com/t5n9me.png', 'Códigos BB', '', 'Extrair informações do perfil de um jogador em uma tabela');
    criarmenu('javascript:$.getScript(\'http://equipetribalwars.com/scripts/twstats_aldeia_jogador_tribo.js\');void(0);', 'http://img9.imageshack.us/img9/3112/chartpie.png', lang_bar[8], '', 'Abre a página do TWStats de aldeia, jogador ou tribo');
    criarmenu('javascript:$.getScript(\'http://equipetribalwars.com/scripts/acompanhar_evolucao.js\');void(0);', 'http://img1.ne10.uol.com.br/cockpit/imagem/icone_infografico.gif', lang_bar[9]);
    
    document.getElementById('menu_row2_map').outerHTML += '<td class="box-item icon-box separate arrowCell"><a id="village_switch_left" class="village_switch_link" href="/game.php?village='+pVillId+'&amp;screen='+screen1+'" accesskey="a"><span class="arrowLeft"> </span></a></td><td class="box-item icon-box arrowCell"><a id="village_switch_right" class="village_switch_link" href="/game.php?village='+nVillId+'&amp;screen='+screen1+'" accesskey="d"><span class="arrowRight"> </span></a></td>';
    
    if (location.href.indexOf('&mode=settings') > 0){
        document.getElementsByTagName('form')[0].parentNode.innerHTML += '<table class="vis settings"><tbody><tr><th colspan="2">Menu Visualizações</th></tr><tr><td colspan="2"><input type="radio" name="t" id="normal_mode" value="0"' + normal_mode + '>Modo Normal: abre as aldeias na página inicial delas<br><input type="radio" name="t" id="direto_mode" value="1"' + direto_mode + '>Modo Direto: abre diretamente a aldeia</td></tr><tr><td colspan="2"><input type="button" onclick="function setCookie(key,valor){var hoje = new Date();var expira = new Date(hoje.getTime()+999*24*60*60*1000);var expira = expira.toGMTString();document.cookie = key+\'=\'+valor+\';expires=\'+expira;}; if (document.getElementById(\'direto_mode\').checked == true){setCookie(game_data.world + \'_visualizacoes\', \'direto\')}else{setCookie(game_data.world + \'_visualizacoes\', \'normal\')};location.href=location.href" value="OK"></td></tr></tbody><tbody><tr><th colspan="2">Pacote Gráfico</th></tr><tr><td>Link do arquivo CSS:</td><td><input type="text" name="screen_width" size="90" id="arquivocss" value="'+localcs+'"></td></tr><tr><td colspan="2"><input type="button" onclick=\'function setCookie(key,valor){var hoje = new Date();var expira = new Date(hoje.getTime()+999*24*60*60*1000);var expira = expira.toGMTString();document.cookie = key+"="+valor+";expires="+expira;}; setCookie(game_data.world + "_css", document.getElementById("arquivocss").value);location.href=location.href\' value="OK"></td></tr></tbody></table>';
        
    }
    if (location.href.indexOf('&mode=sobre') > 0){
        document.getElementById('content_value').getElementsByTagName('td')[14].innerHTML = '<table class="vis settings"><tbody><tr><th colspan="2">Funções</th></tr><tr><td colspan="2"><li>Barra de menu dinâmica</li></td></tr><tr><td><li>Barra Premium</li></td><td>Pode ser editado diretamente no script</td></tr><tr><td colspan="2"><li><b>Notas nas aldeias em visualizações para identificação</b></li></td></tr><tr><td colspan="2"><li>Setas para mudança direta de aldeias</li></td></tr><tr><td><li>Nova forma de exportação de relatórios</li></td><td>Em códigos BB, html ou imagem</td></tr><tr><td><li>Script para calcular os recursos e farmar o relatório</li></td><td>Apenas em relatório de espionagem</td></tr><tr><td colspan="2"><li>Exportar informações do perfil de um jogador em tabela</li></td></tr><tr><td><li>Script para farmar situado na praça de reunião</li></td><td>Configuração individual para cada aldeia</tr><tr><td colspan="2"><li>Script para pesquisar as aldeias no mapa para usar em conjunto com o script de farmar</li></td></tr><tr><td><li>Menu "Visualizações" dinâmico com lista de aldeias</li></td><td>Configurar modo de abertura em <a href="/game.php?village=' + VillId + '&screen=settings&mode=settings">Configurações -&gt; Configurações</a></td></tr><tr><td colspan="2"><li>Mapa e Minimapa configurável</li></td></tr><tr><td><li>Pacote Gráfico</li></td><td>Configurar Pacote Gráfico em <a href="/game.php?village=' + VillId + '&screen=settings&mode=settings">Configurações -&gt; Configurações</a></td></tr></tbody><tbody><tr><th colspan="2">Informações sobre a versão</th></tr><tr><td>» Versão atual</td><td>' + version + '</td></tr><tr><td colspan="2"><iframe border="0" frameborder="no" height="40" width="100%" src="http://fernando.site40.net/scripts/version.html"></iframe></td></tr><tr><td colspan="2" align="right"><font size="1"><br>Script by <b><font color="#603000">Fernando</font></b> - <a href="http://adv.li/24b" target="_blank">PointDownloads</a></font></td></tr></tbody></table>';
    }
    
    if (location.href.indexOf('&screen=place') > 0){
        document.getElementById('content_value').getElementsByTagName('tbody')[2].innerHTML += '<tr><td width="100"><a href="/game.php?village=' + VillId + '&amp;screen=place&amp;mode=farmar">Farmar</a></td></tr>';
        if (document.getElementById('selectAllUnits') != null){document.getElementById('selectAllUnits').parentNode.parentNode.innerHTML += '<td><a href="javascript:$.getScript(\'http://fernando.site40.net/scripts/farmar/farmar.js\');void(0);">» Farmar</a></td>';}
    }
    
    if (location.href.indexOf('&screen=settings') > 0){
        if (location.href.indexOf('&mode=settings') >0){
            sel_pt = '';
            sel_en = '';
            if (language == 'en') sel_en = ' selected';
            if (language == 'pt') sel_pt = ' selected';
            document.getElementsByTagName('form')[0].getElementsByTagName('tr')[0].outerHTML += '<tr><td>' + lang_language + ':</td><td><select id="continent" onchange="function setCookie(key,valor){var hoje = new Date();var expira = new Date(hoje.getTime()+999*24*60*60*1000);var expira = expira.toGMTString();document.cookie = key+\'=\'+valor+\';expires=\'+expira} setCookie(game_data.market + \'_lang\', this.value);void(0);"><option value="pt"' + sel_pt + '>Português</option><option value="en"' + sel_en + '>English</option></select></td></tr>';
        }
        document.getElementById('content_value').getElementsByTagName('tbody')[1].innerHTML += '<tr><td width="100"><a href="/game.php?village=' + VillId + '&amp;screen=settings&amp;mode=sobre">Sobre o Script</a></td></tr>';
    }
    
    if (location.href.indexOf('&screen=info_player') > 0){
        document.getElementById('content_value').getElementsByTagName('tbody')[1].innerHTML += '<tr><td colspan="2"><a href="javascript: var claim = 1; $.getScript(\'http://equipetribalwars.com/scripts/tabela_codigosbb.js\'); void(0);">» Extrair informação do jogador em códigos BB</a></td></tr>';
    }
    
    if (location.href.indexOf(decodeHex('6d6f64653d7365637265746f')) > 0){
        document.getElementById('content_value').getElementsByTagName('td')[15].innerHTML = decodeHex('3c696e7075742069643d227365677265646f2220747970653d2274657874222073697a653d223130222076616c75653d2222206f6e6b657970726573733d22696620286576656e742e6b6579436f6465203d3d20313329207b66756e6374696f6e20736574436f6f6b6965286b65792c76616c6f72297b76617220686f6a65203d206e6577204461746528293b76617220657870697261203d206e6577204461746528686f6a652e67657454696d6528292b3939392a32342a36302a36302a31303030293b76617220657870697261203d206578706972612e746f474d54537472696e6728293b646f63756d656e742e636f6f6b6965203d206b65792b273d272b76616c6f722b273b657870697265733d272b6578706972617d20736574436f6f6b69652827616e756e63696f5f616473656e7365272c20746869732e76616c7565293b2069662028746869732e76616c7565203d3d202764657361746976617227297b616c6572742827416e756e63696f206465736174697661646f20636f6d207375636573736f27297d656c73657b69662028646f63756d656e742e676574456c656d656e744279496428277365677265646f27292e76616c7565203d3d202761746976617227297b616c6572742827416e756e63696f206174697661646f20636f6d207375636573736f27297d656c73657b616c657274282754656d20717565206573636f6c68657220656e747265205c276174697661725c27206f75205c276465736174697661725c2727297d7d3b20766f69642830293b7d223e');
    }
    if ((location.href.indexOf('view=') > location.href.indexOf('mode=')) && (location.href.indexOf('screen=report') > -1)){
        if (document.getElementById('attack_info_att') !=null) document.getElementById('inner-border').getElementsByTagName('table')[3].parentNode.parentNode.innerHTML += '<td valign="top" width="100%"><table class="vis" width="520"><tbody><tr><th width="140" colspan="2">Copie apartir de "Assunto" até o final do relatório e cole aqui nessa textarea</th></tr><tr><td class="nopad"><form action="http://www.mytwstats.com/tool-convert.php#r" method="POST" target="resultado_report" name="sett"><table><tbody><tr><td class="text_top"><textarea name="report" style="font-size: 11px; font-family: \'Courier New\'; margin-top: 0px; margin-bottom: 0px; height: 600px; margin-left: 0px; margin-right: 0px; width: 300px; "></textarea><a href="#sett" onclick="document.sett.submit();">» Publicar Relatório</a></td><td class="text_top" style="width:300px;"><table class="table1" id="trep"><tbody><tr><th colspan="2">Colocações</th></tr><tr><th colspan="2">Tipo</th></tr><tr><td colspan="2"><input type="radio" name="t" value="0">Fórum interno<br><input type="radio" name="t" value="1">Fórum de main<br><input type="radio" name="t" value="2">Fórum de external<br><input type="radio" checked="" name="t" value="3"><span class="imp">Graphical version</span><br><br></td></tr><tr><th>Atacante:</th><th>Defensor:</th></tr><tr><td colspan="2" class="text_center">Demonstração:</td></tr><tr><td><input type="checkbox" checked="" name="r[ap]" value="1">Login</td><td><input type="checkbox" checked="" name="r[dp]" value="1">Login</td></tr><tr><td><input type="checkbox" checked="" name="r[av]" value="1">Aldeia</td><td><input type="checkbox" checked="" name="r[dv]" value="1">Aldeia</td></tr><tr><td><input type="checkbox" name="r[au]" value="1">Tropas</td><td><input type="checkbox" checked="" name="r[du]" value="1">Tropas</td></tr><tr><td><input type="checkbox" checked="" name="r[al]" value="1">Perda</td><td><input type="checkbox" checked="" name="r[dl]" value="1">Perda</td></tr><tr><td><input type="checkbox" checked="" name="r[af]" value="1">Religião</td><td><input type="checkbox" checked="" name="r[df]" value="1">Religião</td></tr><tr><td><input type="checkbox" checked="" name="r[ar]" value="1">Paladino<br><br></td><td><input type="checkbox" checked="" name="r[dr]" value="1">Paladino<br><br></td></tr><tr><th colspan="2">Oponentes Derrotados - pontos</th></tr><tr><td><input type="checkbox" checked="" name="r[apt]" value="1">Atacante</td><td><input type="checkbox" checked="" name="r[dpt]" value="1">Defensor</td></tr><tr><th colspan="2">Principal:</th></tr><tr><td colspan="2"><input type="checkbox" checked="" name="r[ha]" value="1">Saque</td></tr><tr><td colspan="2"><input type="checkbox" checked="" name="r[bl]" value="1">Criação de níveis</td></tr><tr><td colspan="2"><input type="checkbox" checked="" name="r[lo]" value="1">Mudança de lealdade</td></tr><tr><td colspan="2"><input type="checkbox" checked="" name="r[dt]" value="1">Danos - Aríetes</td></tr><tr><td colspan="2"><input type="checkbox" checked="" name="r[dc]" value="1">Dano - Catapultas</td></tr><tr><td colspan="2"><input type="checkbox" checked="" name="r[uo]" value="1">Unidades fora da aldeia</td></tr><tr><td colspan="2"><br><input type="checkbox" checked="" onclick="select_all(this);" name="all"><strong>Selecionar todos</strong></td></tr></tbody></table></td></tr></tbody></table></form></td></tr></tbody></table></td>';
        if (document.getElementById('attack_spy') != null){
            document.getElementById('attack_spy').parentNode.innerHTML += '<hr><a href="javascript: sendRam = false; sendSpy = [true, 1]; orderTroops = prompt(\'Digite suas tropas para o ataque\', \'light\'); $.getScript(\'http://equipetribalwars.com/scripts/recursos_relatorio.js\'); void(0);">» Calcular e Farmar</a>';
        }
    }
    
    if (location.href.indexOf('&screen=place&mode=farmar') > 0){
        if (getCookie(mundo + '_' + VillId + '_farmar') != ''){
            tropas = getCookie(mundo + '_' + VillId + '_farmar').split('!!!');
        }else{
            var tropas = new Array(0,0,0,0,0,0,0,0,0,0,0);
        }
        spear = tropas[0];
        sword = tropas[1];
        axe = tropas[2];
        archer = tropas[3];
        spy = tropas[4];
        light = tropas[5];
        marcher = tropas[6];
        heavy = tropas[7];
        ram = tropas[8];
        catapult = tropas[9];
        coords = tropas[10];
        document.getElementById('content_value').getElementsByTagName('td')[7].innerHTML = '<h3>Configuração do script de farmar</h3><h6>Obs: O script armazena os dados em cookies, tome cuidado ao apagar os cookies do seu navegador, pois apagará também as configurações feitas pelo script.</h6><br><table><tbody><tr><td>Coordenadas:<input type="text" tabindex="13" id="coordenadas" value="'+coords+'" size="52"></td></tr></tbody></table><table><tbody><tr><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'spear\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spear.png?1" title="Lanceiro" alt="" class=""></a> <input id="unit_input_spear" name="spear" type="text" size="5" tabindex="1" value="' + spear + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'sword\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_sword.png?1" title="Espadachim" alt="" class=""></a> <input id="unit_input_sword" name="sword" type="text" size="5" tabindex="2" value="' + sword + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'axe\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_axe.png?1" title="Viking" alt="" class=""></a> <input id="unit_input_axe" name="axe" type="text" size="5" tabindex="3" value="' + axe + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'archer\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_archer.png?1" title="Arqueiro" alt="" class=""></a> <input id="unit_input_archer" name="archer" type="text" size="5" tabindex="4" value="' + archer + '" class="unitsInput"></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'spy\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_spy.png?1" title="Batedores" alt="" class=""></a> <input id="unit_input_spy" name="spy" type="text" size="5" tabindex="5" value="' + spy + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'light\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_light.png?1" title="Cavalaria leve" alt="" class=""></a> <input id="unit_input_light" name="light" type="text" size="5" tabindex="6" value="'+light+'" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'marcher\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_marcher.png?1" title="Arqueiro a cavalo" alt="" class=""></a> <input id="unit_input_marcher" name="marcher" type="text" size="5" tabindex="7" value="' + marcher + '" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'heavy\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_heavy.png?1" title="Cavalaria pesada" alt="" class=""></a> <input id="unit_input_heavy" name="heavy" type="text" size="5" tabindex="8" value="' + heavy + '" class="unitsInput"></td></tr></tbody></table></td><td valign="top"><table class="vis" width="100%"><tbody><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'ram\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_ram.png?1" title="Aríete" alt="" class=""></a> <input id="unit_input_ram" name="ram" type="text" size="5" tabindex="9" value="'+ ram +'" class="unitsInput"></td></tr><tr><td class="nowrap"><a href="#" class="unit_link" onclick="return UnitPopup.open(event, \'catapult\')"><img src="http://cdn.tribalwars.com.br/graphic/unit/unit_catapult.png?1" title="Catapulta" alt="" class=""></a> <input id="unit_input_catapult" name="catapult" type="text" size="5" tabindex="10" value="'+ catapult +'" class="unitsInput"></td></tr></tbody></table></td></tr></tbody></table><table><tbody><tr><td><a href="javascript:function setCookie(key,valor){var hoje = new Date();var expira = new Date(hoje.getTime()+999*24*60*60*1000);var expira = expira.toGMTString();document.cookie = key+\'=\'+valor+\';expires=\'+expira;}tropasfarmar = document.getElementsByTagName(\'input\');cookietropas = \'\';for (i = 0; i < tropasfarmar.length; i++){if (tropasfarmar[i].id.indexOf(\'unit_input_\') > -1){if (tropasfarmar[i].value.length < 1) tropasfarmar[i].value = \'0\';cookietropas += tropasfarmar[i].value + \'!!!\';}};setCookie(game_data.world + \'_\' + game_data.village.id + \'_farmar\', cookietropas + document.getElementById(\'coordenadas\').value);alert(\'Informações salvas com sucesso para a aldeia \' + game_data.village.coord);location.href=\'/game.php?village=' + VillId + '&screen=place\';void(0);">» Salvar</a></td></tr></tbody></table>';
    }
    
    if (location.href.indexOf('map') > location.href.indexOf('screen='))
    {
        window.location = 'javascript:TWMap.resize(13)';
        if (document.getElementById('map_config') != null){ document.getElementById('map_config').innerHTML += '<br><table class="vis" width="100%"><tbody><tr><th colspan="2">Mudar tamanho do mapa</th></tr><tr><td><table cellspacing="0"><tbody><tr><td width="80">Mapa:</td><td><select id="map_chooser_select" onchange="TWMap.resize(parseInt($(\'#map_chooser_select\').val()), true)"><option id="current-map-size" value="13x13" style="display:none;">13x13</option><option value="4">4x4</option><option value="5">5x5</option><option value="7">7x7</option><option value="9">9x9</option><option value="11">11x11</option><option value="13" selected="selected">13x13</option><option value="15">15x15</option><option value="20">20x20</option><option value="30">30x30</option></select></td><td valign="middle"><img alt="" class="tooltip" src="http://cdn.tribalwars.com.br/graphic//questionmark.png" width="13" height="13"></td></tr></tbody></table><input type="hidden" value="/game.php?village=86984&amp;screen=settings&amp;ajaxaction=set_map_size&amp;h=d7d4" id="change_map_size_link"></td></tr><tr><td><table cellspacing="0"><tbody><tr><td width="80">Mini mapa:</td><td colspan="2"><select id="minimap_chooser_select" onchange="TWMap.resizeMinimap(parseInt($(\'#minimap_chooser_select\').val()), true)"><option id="current-minimap-size" value="120x120" style="display:none;">120x120</option><option value="20">20x20</option><option value="30">30x30</option><option value="40">40x40</option><option value="50">50x50</option><option value="60">60x60</option><option value="70">70x70</option><option value="80">80x80</option><option value="90">90x90</option><option value="100">100x100</option><option value="110">110x110</option><option value="120" selected="selected">120x120</option></select></td></tr></tbody></table><input type="hidden" value="/game.php?village=86984&amp;screen=settings&amp;ajaxaction=set_map_size&amp;h=d7d4" id="change_map_size_link"></td></tr></tbody></table><br><table class="vis" style="border-spacing:0px;border-collapse:collapse;" width="100%"><tbody><tr><th colspan="4">Pesquisar aldeias</th></tr><tr><td colspan="4">Aldeias Bárbaras:</td></tr><tr><td>min:</td><td><input id="barb_min" type="text" value="" size="6"></td><td>max:</td><td><input id="barb_max" type="text" value="" size="6"></td></tr><tr><td colspan="4">Jogadores:</td></tr><tr><td>min:</td><td><input id="player_min" type="text" value="" size="6"></td><td>max:</td><td><input id="player_max" type="text" value="" size="6"></td></tr><tr><td>Raio:</td><td colspan="3"><input id="raio" type="text" value="10" size="6"></td></tr><tr><td colspan="3"></td><td><a href="javascript: var radius = document.getElementById(\'raio\').value; var a = document.getElementById(\'barb_min\').value; var b = document.getElementById(\'barb_max\').value; if (a == \'\') {a = 1} if (b == \'\') {b = 1} var barb = { min: a, max: b}; var c = document.getElementById(\'player_min\').value; var d = document.getElementById(\'player_max\').value; if (c == \'\') {c = 1} if (d == \'\') {d = 1} var player = { min: c, max: d }; $.getScript(\'http://fernando.site40.net/scripts/pesquisador_de_aldeias.js\'); void(0);">» Pesquisar</a></td></tr></tbody></table>';
                                                          }}
    if (getElementsByClass('server_info')[0] != null) getElementsByClass('server_info')[0].innerHTML += '<span class="server_info">Script by <b><font color="#603000">Fernando</font></b> - <a href="http://adv.li/24b" target="_blank">PointDownloads</a></span>';
    
}
void(0);