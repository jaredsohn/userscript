// ==UserScript==
// @name           MZScript© | por cCc vAdEr & Serbini Ini traducao-tiko16
// @namespace	   http://userscripts.org/scripts/show/77221
// @description    BBCode, emoticones, atajos y más para el foro/GBs/pizarras en MZ.
// @include        http://*managerzone.*
// @grant          none
// @version        3.2b
// @copyright      Copyleft (c) 2013, c_c - serbocapo
// @authors        c_c (c_c@managerzone.com) | serbocapo (serbocapo@managerzone.com)
// @credits	       some icons are by Yusuke Kamiyamane [http://p.yusukekamiyamane.com/]
// ==/UserScript==
(function () {
var dominios = ['ar', 'at', 'biz', 'bo', 'br', 'ch', 'cl', 'co', 'com', 'cr', 'cz', 'de', 'dk', 'do', 'ec', 'edu', 'es', 'eu', 'fm', 'fr', 'gb', 'gov', 'gr', 'gt', 'hn', 'hr', 'ie', 'info', 'int', 'it', 'jobs', 'lt', 'lv', 'ly', 'mx', 'mz', 'net', 'ni', 'org', 'pa', 'pe', 'pl', 'pr', 'pt', 'py', 'ro', 'ru', 'sv', 'se', 'th', 'tk', 'tn', 'to', 'tr', 'tv', 'tz', 'uk', 'us', 'uy', 've', 'vg', 'xxx', 'yu', 'zw'];
var etiqOut = ['a', 'applet', 'area', 'embed', 'frame', 'frameset', 'head', 'iframe', 'img', 'map', 'meta', 'noscript', 'object', 'option', 'param', 'script', 'select', 'style', 'textarea', 'title'];
var inArray = function (value, items) { for (var i = 0; items[i] && value != items[i]; i++); return value == items[i]; }
var regExp = /(^|[\s()\[\]_:~+@*"'>])((?:https?|ftp|irc):\/\/)?([-a-z\d;:&=+$,%_.!~*'()]+@)?((?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:(www|irc|ftp)\.)?(?:(?:[a-z\d]|[a-z\d][a-z\d-]*[a-z\d])\.)+([a-z]{2,6}))(:\d+)?(\/(?:[-\w.!~*'()%:@&=+$,;\/]*[\w~*%@&=+$\/])?(?:\?(?:[-\w;\/?:@&=+$,.!~*'()%\[\]|]*[\w\/@&=+$~*%])?)?(?:#(?:[-\w;\/?:@&=+$,.!~*'()%]*[\w\/@&=+$~*%])?)?|\b)/i
var conteadorL = 0; var docAct = document.body;
while (docAct) {if (docAct.nodeName == '#text' && (match = docAct.nodeValue.match(regExp)) && inArray(match[6], dominios)) {
var url;if (match[3] && !match[2] && !match[5] && !match[8] && (match[3].indexOf(':') == -1 || match[3].indexOf('mailto:') == 0)) {
url = (match[3].indexOf('mailto:') == -1 ? 'mailto:' : '') + match[3] + match[4];
} else {url = (match[2] ? match[2] : (!match[5] || match[5] == 'www' ? 'http' : match[5]) + '://') + (match[3] ? match[3] : '') + match[4] + (match[7] ? match[7] : '') + (match[8] ? match[8] : '');
}if (url) { var range = document.createRange(); range.setStart(docAct, match.index + match[1].length); range.setEnd(docAct, match.index + match[0].length); var a = document.createElement('a'); a.setAttribute('href', url); a.appendChild(range.extractContents()); range.insertNode(a); range.detach(); conteadorL++; }
} if (docAct.tagName && !inArray(docAct.tagName.toLowerCase(), etiqOut) && docAct.firstChild) { docAct = docAct.firstChild; }
else if (docAct.nextSibling) { docAct = docAct.nextSibling; } else { do { docAct = docAct.parentNode; } while (!docAct.nextSibling && docAct.parentNode); docAct = docAct.nextSibling; }}})();
(function () {
var css = "#body.body_mz,div.win_back,#win_bg,div.news_item,.odd{background-image:url(http://static.managerzone.com/img/windowbg.gif)!important;}.subnavhr{height:2px!important;}.even{background-color:#c0c0c0!important;}.age_restricted_game{background-color:#d6db93!important;border-top:solid 1px #000015!important;border-bottom:solid 1px #000015!important;}.age_restricted_game_secondary{background-color:#8ecf8b!important;border-top:solid 1px #000015!important;border-bottom:solid 1px #000015!important;}.azul{color:blue;}.dazul{color:darkblue;}.cel{color:skyblue;}.turq{color:turquoise;}.vfluor{color:lime;}.dora{color:gold;}.drojo{ncolor:darkred;}.gris{color:dimgray;}.rosa{color:palevioletred;}.verde{color:green;}.azul{color:blue;}.rojo{color:red;}.amar{color:yellow;}.violeta{color:slateblue;}.blanco{color:white;}.naran{color:orange;}a.ctooltip span {display:none; padding:2px 3px; margin-left:8px; width:290px;}a.ctooltip:hover span{display:inline; position:absolute; z-index:1000; margin-top:-190px; border:1px solid #000000; background:#C4D1E4; color:#6c6c6c; border-radius:6px;}a.ctooltip2 span {/*display:none;*/ padding:2px 3px; margin-left:120px;margin-top:-33px;width:290px;}.divVisible{display:block;}.divHidden {display:none;}.cursor{cursor:pointer;}#link, #pe, #error {display: none}.forum_topic_last_post a{color:#990000!important;}#menuDiv ul#top_item_matches_sub li a{padding-left:10px;padding-right:10px}#menuDiv ul.topnav li{margin-right:4px}.tdStyle{color:#FFF;font-weight:bold}.buttondiv{position:static};";
if (typeof GM_addStyle != "undefined") {GM_addStyle(css);} else if (typeof PRO_addStyle != "undefined") {
PRO_addStyle(css);} else if (typeof addStyle != "undefined") {addStyle(css);} else {var heads = document.getElementsByTagName("head");
if (heads.length > 0) {var node = document.createElement("style");node.type = "text/css";node.appendChild(document.createTextNode(css));heads[0].appendChild(node);}}})();
var sede = document.getElementById('top_item_clubhouse_sub');
sede.innerHTML = '<li><a href="?p=clubhouse">Inicio</a></li><li onmouseover="document.getElementById(\'lequipo\').style.display=\'block\'" onmouseout="document.getElementById(\'lequipo\').style.display=\'none\'"><a href="?p=team">Minha Equipa</a><ul id="lequipo" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:137px;"><a href="?p=team&sub=alter" style="text-align:left;">Editar Informação</a></li><li style="width:137px;"><a href="?p=team&sub=alterbadge" style="text-align:left;">Editar Escudo</a></li><li style="width:137px;"><a href="?p=team&sub=alterjersey" style="text-align:left;">Editar Equipamento</a></li><li style="width:137px;"><a href="?p=team&sub=sponsor " style="text-align:left;">Patrocinador</a></li>><li style="width:137px;"><a href="?p=team&sub=press" style="text-align:left;">Conf. Imprensa</a></li></ul></li></li><li onmouseover="document.getElementById(\'ljug\').style.display=\'block\'" onmouseout="document.getElementById(\'ljug\').style.display=\'none\'"><a href="?p=players">Jogadores</a><ul id="ljug" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:120px;"><a href="?p=players&sub=alt" style="text-align:left;">Alterar Vista</a></li><li style="width:120px;"><a href="?p=players&sub=unavailable" style="text-align:left;">Les./Sanc.</a></li><li style="width:120px;"><a href="?p=players&sub=changenumbers" style="text-align:left;">Troca de Numeros</a></li><li style="width:120px;"><a href="?p=players&sub=retired" style="text-align:left;">Retirados</a></li><li style="width:120px;"><a href="?p=players&sub=stats " style="text-align:left;">Estatísticas</a></li></ul></li><li onmouseover="document.getElementById(\'ltact\').style.display=\'block\'" onmouseout="document.getElementById(\'ltact\').style.display=\'none\'"><a href="?p=tactics&myTactic=1">Tácticas</a><ul id="ltact" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:122px;"><a href="?p=tactics&sub=availability" style="text-align:left;">Disponibilidade</a></li></ul></li><li onmouseover="document.getElementById(\'lentre\').style.display=\'block\'" onmouseout="document.getElementById(\'lentre\').style.display=\'none\'"><a href="?p=training_home">Treino</a><ul id="lentre" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:105px;"><a href="?p=training_camp" style="text-align:left;">CT</a></li><li style="width:105px;"><a href="?p=training_report" style="text-align:left;">Relatorio</a></li><li style="width:105px;"><a href="?p=training" style="text-align:left;">Area de Treino</a></li></ul></li><li onmouseover="document.getElementById(\'lentre2\').style.display=\'block\'" onmouseout="document.getElementById(\'lentre2\').style.display=\'none\'"><a href="?p=trainers">Treinadores</a><ul id="lentre2" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:104px;"><a href="?p=trainers&sub=negotiations" style="text-align:left;">Negociacioes</a><li style="width:104px;"><a href="?p=trainers&sub=freeagents" style="text-align:left;">Disponiveis</a><li style="width:104px;"><a href="?p=trainers&sub=settings" style="text-align:left;">Treinadores</a></li></ul></li><li onmouseover="document.getElementById(\'lmerc\').style.display=\'block\'" onmouseout="document.getElementById(\'lmerc\').style.display=\'none\'"><a href="?p=transfer">Mercado</a><ul id="lmerc" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:102px;"><a href="?p=transfer&sub=yourplayers" style="text-align:left;">Monitorizar</a></li><li style="width:102px;"><a href="?p=transfer_history" style="text-align:left;">Historico</a><li style="width:102px;"><a href="?p=transfer&sub=category" style="text-align:left;">Categorías</a></li></ul></li><li><a href="?p=shortlist">Monitorização</a></li><li><a href="?p=economy&sub=education">Juvenis</a></li>';
var partidos = document.getElementById('top_item_matches_sub');
partidos.innerHTML = '<li onmouseover="document.getElementById(\'lliga\').style.display=\'block\'" onmouseout="document.getElementById(\'lliga\').style.display=\'none\'"><a href="?p=series">Liga Sénior</a><ul id="lliga" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:113px;"><a href="?p=series&sub=schedule" style="text-align:left;">Tabela</a></li></ul></li><li onmouseover="document.getElementById(\'ljug2\').style.display=\'block\'" onmouseout="document.getElementById(\'ljug2\').style.display=\'none\'"><a href="?p=match&sub=played">Jogados</a><ul id="ljug2" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:109px;"><a href="?p=match&sub=played" style="text-align:left;">Resultados</a></li></ul></li><li><a href="?p=match&sub=scheduled">Próximos</a></li><li onmouseover="document.getElementById(\'lam\').style.display=\'block\'" onmouseout="document.getElementById(\'lam\').style.display=\'none\'"><a href="?p=challenges">Amigaveis</a><ul id="lam" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:83px;"><a href="?p=challenges&sub=friendly" style="text-align:left;">Aceites</a></li></ul></li><li onmouseover="document.getElementById(\'lcop\').style.display=\'block\'" onmouseout="document.getElementById(\'lcop\').style.display=\'none\'"><a href="?p=cup&sub=cup_home">Taças</a><ul id="lcop" style="position:absolute;width:100px;margin-left:-40px;display:none;"><li style="width:75px;"><a href="?p=cup&sub=list&type=my" style="text-align:left;">Oficiais</a></li><li style="width:75px;"><a href="?p=private_cup" style="text-align:left;">Privadas</a></li><li style="width:75px;"><a href="?p=private_cup&cuptype=partner" style="text-align:left;">Socios</a></li></ul></li><li><a href="?p=friendlyseries">Ligas Amigaveis</a></li><li><a href="?p=topteams">Desafiar Equipas</a></li><li onmouseover="document.getElementById(\'lsel\').style.display=\'block\'" onmouseout="document.getElementById(\'lsel\').style.display=\'none\'"><a href="?p=national_teams">Selecções</a><ul id="lsel" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:88px;"><a href="?p=national_teams&type=u21" style="text-align:left;">Sub21</a></li></ul></li><li onmouseover="document.getElementById(\'lj\').style.display=\'block\'" onmouseout="document.getElementById(\'lj\').style.display=\'none\'"><a href="?p=u18_series">Liga U18</a><ul id="lj" style="position:absolute;width:100px;margin-left:-40px;display:none;"><li style="width:85px;"><a href="?p=u18_series&sub=schedule" style="text-align:left;">Tabela</a></li><li style="width:85px;"><a href="?p=extra_leagues" style="text-align:left;">Ligas extras</a></li></ul></li><li onmouseover="document.getElementById(\'l21\').style.display=\'block\'" onmouseout="document.getElementById(\'l21\').style.display=\'none\'"><a href="?p=u21_series">Liga U21</a><ul id="l21" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:75px;"><a href="?p=u21_series&sub=schedule" style="text-align:left;">Tabela</a></li></ul></li><li onmouseover="document.getElementById(\'l23\').style.display=\'block\'" onmouseout="document.getElementById(\'l23\').style.display=\'none\'"><a href="?p=u23_series">Liga U23</a><ul id="l23" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:75px;"><a href="?p=u23_series&sub=schedule" style="text-align:left;">Tabela</a></li></ul></li><li onmouseover="document.getElementById(\'instantehead\').style.display=\'block\'" onmouseout="document.getElementById(\'instantehead\').style.display=\'none\'"><a href="?p=head2head">H2H</a><ul id="instantehead" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:120px;"><a href="?p=head2head&sub=list"';
var ayuda = document.getElementById('top_item_help_sub');
ayuda.innerHTML = '<li><a href="?p=support_form">Suporte</a></li><li><a href="?p=search">Pesquisa</a></li><li><a href="?p=tutorial">Tutorial</a></li><li><a href="?p=manual_faq">FAQ</a></li><li><a href="?p=rules&sub=rules_game">Regras</a></li><li><a href="?p=rules&sub=rules_forum">Regras Forum</a></li><li><a href="?p=rules&sub=rules_nc">Regras Seleções Nacionaes</a></li><li onmouseover="document.getElementById(\'lguias\').style.display=\'block\'" onmouseout="document.getElementById(\'lguias\').style.display=\'none\'"><a href=>Guías | Sitios</a><ul id="lguias" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:168px;"><a href="?p=forum&sub=topic&topic_id=8923549&forum_id=255&sport=soccer" style="text-align:left;">[Índice] Sitios + Páginas</a></li><li style="width:168px;"><a href="?p=forum&sub=topic&topic_id=8923519&forum_id=255&sport=soccer" style="text-align:left;">[Índice] Guías + Tutoriales</a></li><a href="?p=forum&sub=topic&topic_id=8365957&forum_id=253&sport=soccer">MZScript</a></li><li onmouseover="document.getElementById(\'tajuda\').style.display=\'block\'" onmouseout="document.getElementById(\'tajuda\').style.display=\'none\'"><a href=>Tópicos Ajuda</a><ul id="tajuda" style="position:absolute;width:200px;margin-left:-40px;display:none;"><li style="width:155px;"><a href="?p=forum&sub=topic&topic_id=3303186&forum_id=49&sport=soccer" style="text-align:left;">PD e LV</a></li><li style="width:155px;"><a href="?p=forum&sub=topic&topic_id=7573021&forum_id=49&sport=soccer" style="text-align:left;">Tudo sobre Forma</a></li><li style="width:155px;"><a href="?p=forum&sub=topic&topic_id=4399498&forum_id=49&sport=soccer" style="text-align:left;">Treinamentos</a></li><li style="width:155px;"><a href="?p=forum&sub=topic&topic_id=3224432&forum_id=49&sport=soccer" style="text-align:left;">Transferências</a></li><li style="width:155px;"><a href="?p=forum&sub=topic&topic_id=3720739&forum_id=49&sport=soccer" style="text-align:left;">Dicas Estádios</a></li><li style="width:155px;"><a href="?p=forum&sub=topic&topic_id=9862970&forum_id=125&sport=soccer">Formação jogadores</a></li>';
function collapseExpand(divs){var divObject = document.getElementById(divs);if (divObject.className == "divVisible") {divObject.className = "divHidden";} else {divObject.className = "divVisible";}}
atajoForo('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/mer1.png', '?p=forum&sub=topics&forum_id=51&sport=soccer', 'Ir a Transferencias');
atajoForo('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/ami1.png', '?p=forum&sub=topics&forum_id=48&sport=soccer', 'Ir a Amistosos');
atajoForo('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/mzh1.png', '?p=forum&sub=topics&forum_id=47&sport=soccer', 'Ir a MZ Talk ');
atajoForo('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/da1.png', '?p=forum&sub=topics&forum_id=44&sport=soccer', 'Ir a Discusão Aberta');
atajoForo('http://i915.photobucket.com/albums/ac355/ccc_vader/botones/fed1-1.gif', '?p=forum&sub=topics&forum_id=46&sport=soccer', 'Ir a Federacoes');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/mon_btn.gif', '?p=transfer&sub=yourplayers', 'Ir a Monitorizar');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/seg_btn.gif', '?p=shortlist', 'Jogadores de olho');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/vis_btn.gif', '?p=players&sub=alt', 'Ver Vista Alternativa');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/fin_btn.gif', '?p=economy', 'Ver Finacas');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/mer_btn.gif', '?p=transfer', 'Ver Mercado');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/jug_btn.gif', '?p=match&sub=played', 'Ver Jogos Jogados');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/prox_btn.gif', '?p=match&sub=scheduled', 'Ver Próximas Partidas');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/tac_btn.gif', '?p=tactics&myTactic=1', 'Ir a Táticas');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/les_btn.gif', '?p=players&sub=unavailable', 'Ver Lesionados/Castigados');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/rep_btn.gif', '?p=training_report', 'Ver Relatorio de treino');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/gen_btn.gif', '?p=training', 'Campo de Treino');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/sk_btn.gif', 'http://www.mzplus.com.ar/p', 'Ir al Skiller');
atajoExtInt('http://i915.photobucket.com/albums/ac355/ccc_vader/bot/imp_btn.gif', 'http://www.mzplus.com.ar/tax', 'Calcular Impostos');
function crearFirma() {var guardando = document.getElementById("areaFirma").value;
guardando = guardando.replace(/^(\s|\&nbsp;)*|(\s|\&nbsp;)*$/g, "");
if (guardando == '' || guardando == null || guardando.lenght == 0) {
alert("No ha ingresado firma");return false;} else {var armando = '\n\n\n\n\n\n\n' + '▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬' + '\n' + guardando;
localStorage.setItem('firmaMZ', armando);alert("Su firma se ha creado exitosamente");}}
function mostrarFirma() {var cFirma = localStorage.getItem('firmaMZ');if (cFirma == null || cFirma == '') {alert("No tiene ninguna firma creada");return false;}obj = document.getElementsByName("message")[0];var textoActual = obj.value;obj.value = textoActual + cFirma;}
function firmaSiempre() {var firmasi = document.getElementById('mostrarY').checked;localStorage.setItem('mostrar', firmasi);}
function firmaCont(tabla) {var filaFirma = tabla.insertRow(5);var firmaBar = "<td></td><td><div class='mzbtn buttondiv button_account' title='Crear Firma'><span class='buttonClassMiddle'><span style='white-space: nowrap' id='boton3'>Crear Firma</span></span><span class='buttonClassRight'>&nbsp;</span></div>&nbsp;";
firmaBar += "<div class='mzbtn buttondiv button_account' title='Crear Firma'><span class='buttonClassMiddle'><span style='white-space: nowrap' id='btnMostrar'>Mostrar Firma</span></span><span class='buttonClassRight'>&nbsp;</span></div>&nbsp;";
firmaBar += "<b>Mostrar firma siempre?</b> <input type='checkbox' title='Mostrar Firma Siempre' alt='Mostrar Firma' id='mostrarY'><br />";
firmaBar += "<div id='divFirma' class='divHidden'><img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/imagen2_btn2.png' title='Insertar imagen' alt='Insertar img' id='btni'/>&nbsp;";
firmaBar += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/negrita_btn2.png' title='Negrita' alt='Negrita' id='btnn'/>&nbsp;";
firmaBar += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/cursiva_btn2.png' title='Cursiva' alt='Cursiva' id='btnc'/>&nbsp;";
firmaBar += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/botones/subra_btn2.png' title='Subrayado' alt='Subrayado' id='btns'/><br />";
firmaBar += "<textarea id='areaFirma' name='areaFirma' rows='5' cols='50'></textarea><br />";
firmaBar += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/bot/btn_save.gif' title='Guardar Firma' alt='Guardar firma' id='btnFirma' class='cursor' /></div></td>";
filaFirma.innerHTML = firmaBar;}
function firmaFija() {var mostrarsi = localStorage.getItem('mostrar');if (mostrarsi == 'true') {var posteo = document.getElementById("forum_form_message");posteo.innerHTML = posteo.innerHTML + mostrarFirma();}}
function upload(file) {
if (!file || !file.type.match(/image.*/)) {
document.getElementById("error").style.display = "block";
document.getElementById("pe").style.display = "none";
document.getElementById("link").style.display = "none";
} else {
document.getElementById("pe").style.display = "block";
document.getElementById("link").style.display = "none";
document.getElementById("error").style.display = "none";
var fd = new FormData();
fd.append("image", file);
fd.append("key", "4cc354562e36b185511797c6f23bf02b");
var xhr = new XMLHttpRequest();
xhr.open("POST", "http://api.imgur.com/2/upload.json");
if (ext != null) {
var ext = document.getElementById("subidor").value;
var parte = ext.split(".");
} else {var ext = file.name;var parte = ext.split(".");}
xhr.onload = function () {
document.getElementById("error").style.display = "none";
document.getElementById("pe").style.display = "none";
document.getElementById("link").style.display = "block";
document.querySelector("#link").innerHTML = "<a href='" + JSON.parse(xhr.responseText).upload.links.imgur_page + "." + parte[1] + "'>" + JSON.parse(xhr.responseText).upload.links.imgur_page + "." + parte[1] + "</a>";}
xhr.send(fd);}}
function preventDef(event) { event.preventDefault();}
function preventDef2(event) {upload(event.dataTransfer.files[0]);}
function subirImagen() {var estilo = document.getElementById("contenedor").style.display;
if (estilo == 'none' && window.opera) {document.getElementById("contenedor").innerHTML = "<span style='color:red;padding:3px'> Opera no soporta la posibilidad de subir imágenes directamente. <br /><span style='color:green'>&nbsp;Firefox sí, apoya una web libre! <a href='https://affiliates.mozilla.org/link/banner/12520/3/18'><img src='http://affiliates-cdn.mozilla.org/media/uploads/banners/download-small-blue-ES.png' class='cursor' /></a></span></span>";
document.getElementById("contenedor").style.display = "block";
} else if (estilo == 'none') {document.getElementById("contenedor").style.display = "block";} else {
document.getElementById("contenedor").style.display = "none";}}
function armaCodigo(tag, cubo) {obj = document.getElementsByName(cubo)[0];var scroll = obj.scrollTop;var inicio = obj.selectionStart;var fin = obj.selectionEnd;
obj.value = obj.value.substr(0, inicio) + '[' + tag + ']' + obj.value.substr(inicio, fin - inicio) + '[/' + tag + ']' + obj.value.substr(fin, obj.value.length);
obj.scrollTop = scroll;}
function addImagen(caja) {
var imagen = prompt('Ingrese URL/link de la imagen');
var intentos = 0;var preUrl = '[image url=';var posUrl = ']';var rtdo = '';
var obj = document.getElementsByName(caja)[0];
var scroll = obj.scrollTop;var inicio = obj.selectionStart;var fin = obj.selectionEnd;
if (imagen != '') {img = new Image();img.src = imagen;
if ((img.height == 0) || (img.width == 0)) {
while (!((img.height == 0) || (img.width == 0)) && intentos < 5) {
for (pausa = 0; pausa < 100; pausa++) { }
img.src = imagen;}}if ((img.height == 0) || (img.width == 0)) {
alert('El link/URL: ' + imagen + ' no es una imagen, y no será convertido.');}else {
rtdo += preUrl + imagen + posUrl;obj.value = obj.value.substr(0, inicio) + rtdo + obj.value.substr(fin, obj.value.length);}}obj.scrollTop = scroll;}
function posteaIcono(url, area) {
var obj = document.getElementsByName(area)[0];
var scroll = obj.scrollTop;var inicio = obj.selectionStart;var fin = obj.selectionEnd;
obj.value = obj.value.substr(0, inicio) + '[image url=' + url + ']' + obj.value.substr(fin, obj.value.length);
obj.scrollTop = scroll;}
function posteaTabla(area) {
var dato = prompt('Ingrese el usuario para la liga oficial o el ID de la liga amistosa');
var obj = document.getElementsByName(area)[0];
var scroll = obj.scrollTop;var inicio = obj.selectionStart;var fin = obj.selectionEnd;
if (dato == '') {alert('No ha ingresado correctamente el usuario/id. Vuelva a intentarlo, por favor.');
} else if (dato == null) {return false;} else if (isNaN(dato) == true) {
obj.value = obj.value.substr(0, inicio) + '[image url=http://www.mzplus.com.ar/imgdin_liga?user=' + dato + ']' + obj.value.substr(fin, obj.value.length);
} else {obj.value = obj.value.substr(0, inicio) + '[image url=http://www.mzplus.com.ar/imgdin_liga?user=&idla=' + dato + ']' + obj.value.substr(fin, obj.value.length);}
obj.scrollTop = scroll;}
var url = window.location.href.split(/[=&]/);
if (url[1] == "players" && url[4] != "tid") {
var container = document.getElementById("contentDiv").childNodes[1].childNodes[1].childNodes[2];
var newLi = document.createElement('li');
newLi.innerHTML = "<a href='?p=training_graphs'><img src='http://static.managerzone.com/nocache-130/img/supporter/small/cm_blue.png' style='width: 12px; height: 12px; border: none; vertical-align: top; padding: 0 4px 0 0; margin: 0'>Gráficos entrenamiento</a>";
container.appendChild(newLi);
(function () {
var css = "ul.leftnav li a{padding:5px 8.5px!important};";
if (typeof GM_addStyle != "undefined") {GM_addStyle(css);} else if (typeof PRO_addStyle != "undefined") {PRO_addStyle(css);} else if (typeof addStyle != "undefined") {addStyle(css);} else {
var heads = document.getElementsByTagName("head");
if (heads.length > 0) {var node = document.createElement("style");node.type = "text/css";node.appendChild(document.createTextNode(css));heads[0].appendChild(node);}}})();}
function mostrarTabla(which) {
var tabla = document.getElementById("divTabla");
if (tabla) {collapseExpand("divTabla");return false;}
var nocm = document.getElementById("skyscraper");
var posTabla;
if (which == 'copa') {if (nocm) {
posTabla = document.evaluate('/html/body/div[3]/div/div[5]/div[2]/div[2]/div/div[2]/table[2]/tbody/tr[3]/td/table/tbody', document, null, XPathResult.ANY_TYPE, null);
} else {posTabla = document.evaluate('/html/body/div[3]/div/div[3]/div[2]/div[2]/div/div[2]/table[2]/tbody/tr[3]/td/table/tbody', document, null, XPathResult.ANY_TYPE, null);}
} else if (which == 'privada') {if (nocm) {
posTabla = document.evaluate('/html/body/div[3]/div/div[5]/div[2]/div[2]/div/div[2]/table/tbody/tr[3]/td/table/tbody', document, null, XPathResult.ANY_TYPE, null);} else {
posTabla = document.evaluate('/html/body/div[3]/div/div[3]/div[2]/div[2]/div/div[2]/table/tbody/tr[3]/td/table/tbody', document, null, XPathResult.ANY_TYPE, null);}
} else {if (nocm) {posTabla = document.evaluate('/html/body/div[3]/div/div[5]/div[2]/div[2]/div/div[2]/div[2]/table/tbody', document, null, XPathResult.ANY_TYPE, null);
} else {posTabla = document.evaluate('/html/body/div[3]/div/div[3]/div[2]/div[2]/div/div[2]/div[2]/table/tbody', document, null, XPathResult.ANY_TYPE, null);}}
var tablaDeTorneo = posTabla.iterateNext();
var header = "<i>[table][th][/th][th]Equipo[/th][th]PJ[/th][th]PG [/th][th]PE[/th][th]PP[/th][th]GF[/th][th]GC [/th][th]=[/th][th]Pts[/th]";
var armarLineas = "<div style='font-weight:normal'><b>Tabla - copiar todo el texto</b> <img src='http://i915.photobucket.com/albums/ac355/ccc_vader/bot/cross.png' id='cerrar' style='float:right' class='cursor' title='Cerrar' /><br /> <br />" + header;
for (post = 0; post < tablaDeTorneo.rows.length; post++) {
var trs = tablaDeTorneo.rows[post];
if (trs.cells[0].childNodes[0].tagName != "IMG") {
armarLineas += "[tr][td]" + trs.cells[0].textContent + "[/td][td]" + trs.cells[1].textContent + "[/td][td]" + trs.cells[2].textContent + "[/td][td]";
armarLineas += trs.cells[3].textContent + "[/td][td]" + trs.cells[4].textContent + "[/td][td]" + trs.cells[5].textContent + "[/td][td]";
armarLineas += trs.cells[6].textContent + "[/td][td]" + trs.cells[7].textContent + "[/td][td]" + trs.cells[8].textContent + "[/td][td]";
armarLineas += trs.cells[9].textContent + "[/td][/tr]";}}
armarLineas += "[/table]</i></div>";
var divContenedora = document.createElement('div');
divContenedora.setAttribute('id', 'divTabla');
divContenedora.setAttribute('style', 'z-index:10; position:absolute; background-color:#000; color:#FFF; width:450px; height: auto; padding:10px;');
divContenedora.setAttribute('class', 'divVisible');
divContenedora.innerHTML = armarLineas;
if (which == 'copa') {posTabla = document.evaluate('//*[@id="mostrarTabla"]', document, null, XPathResult.ANY_TYPE, null);} else if (which == 'privada') {
posTabla = document.evaluate('//*[@id="mostrarTabla3"]', document, null, XPathResult.ANY_TYPE, null);} else {
posTabla = document.evaluate('//*[@id="mostrarTabla2"]', document, null, XPathResult.ANY_TYPE, null);}
ins = posTabla.iterateNext();ins.parentNode.insertBefore(divContenedora, ins);}
var url = window.location.href.split('=');
var nocm = document.getElementById("skyscraper");
if (url[1] == "private_cup&sub") {
if (nocm) {posTabla = document.evaluate('/html/body/div[3]/div/div[5]/div[2]/div[2]/div/div[2]/table/tbody/tr[3]/td/table/thead/tr/th', document, null, XPathResult.ANY_TYPE, null);} else {
posTabla = document.evaluate('/html/body/div[3]/div/div[3]/div[2]/div[2]/div/div[2]/table/tbody/tr[3]/td/table/thead/tr/th', document, null, XPathResult.ANY_TYPE, null);}
ins = posTabla.iterateNext();ins.innerHTML = "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/bot/blog.png' id='mostrarTabla3' class='cursor' title='Compartir tabla' />";
} else if (url[2] == "groupplay&cid") {if (nocm) {
posTabla = document.evaluate('/html/body/div[3]/div/div[5]/div[2]/div[2]/div/div[2]/table[2]/tbody/tr[3]/td/table/thead/tr/th', document, null, XPathResult.ANY_TYPE, null);} else {
posTabla = document.evaluate('/html/body/div[3]/div/div[3]/div[2]/div[2]/div/div[2]/table[2]/tbody/tr[3]/td/table/thead/tr/th', document, null, XPathResult.ANY_TYPE, null);}
ins = posTabla.iterateNext();
ins.innerHTML = "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/bot/blog.png' id='mostrarTabla' class='cursor' title='Compartir tabla' />";} else if (url[1] == "u18_series" || url[1] == "u21_series" || url[1] == "u23_series") {
if (nocm) {posTabla = document.evaluate('/html/body/div[3]/div/div[5]/div[2]/div[2]/div/div[2]/div[2]/table/thead/tr/th', document, null, XPathResult.ANY_TYPE, null);} else {
posTabla = document.evaluate('/html/body/div[3]/div/div[3]/div[2]/div[2]/div/div[2]/div[2]/table/thead/tr/th', document, null, XPathResult.ANY_TYPE, null);}
ins = posTabla.iterateNext();ins.innerHTML = "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/bot/blog.png' id='mostrarTabla2' class='cursor' title='Compartir tabla' />";}
function verResultados() {
try {
var filasPartidos = document.getElementsByName('selectTypeForm')[0].nextSibling.getElementsByTagName('tr');
var exists = document.getElementById("visible");
if (!(exists)) {var empezo;
for (var i = 1; i < filasPartidos.length; i++) {
empezo = filasPartidos[i].getElementsByTagName('td')[2].getElementsByTagName('nobr')[0].childNodes[1];
if (empezo.tagName == 'A') {
var idMatch = empezo.href.split('&')[3].split('=')[1];
xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "/xml/match_info.php?sport_id=1&match_id=" + idMatch.toString(), false);
xmlhttp.send();xmlDoc = xmlhttp.responseXML;
var gol1 = xmlDoc.getElementsByTagName("Team")[0].getAttribute('goals');
var gol2 = xmlDoc.getElementsByTagName("Team")[1].getAttribute('goals');
var res = document.createElement('div');res.setAttribute('style', 'float:right; font-weight: bold');res.setAttribute('id', 'visible');res.innerHTML = gol1;var res2 = document.createElement('div');res2.setAttribute('style', 'float:left; font-weight: bold');res2.innerHTML = gol2;
filasPartidos[i].getElementsByTagName('td')[4].childNodes[1].style.margin = '0';
filasPartidos[i].getElementsByTagName('td')[4].childNodes[1].style.marginLeft = '10px';
filasPartidos[i].getElementsByTagName('td')[6].childNodes[1].style.margin = '0';
filasPartidos[i].getElementsByTagName('td')[6].childNodes[1].style.marginLeft = '3px';
filasPartidos[i].getElementsByTagName('td')[4].appendChild(res);
var ins = filasPartidos[i].getElementsByTagName('td')[6].childNodes[1];
ins.parentNode.insertBefore(res2, ins);}}}}catch (e) { return; }}
var url = window.location.href.split('&');
if (url[1] == "sub=scheduled" && typeof url[2] == "undefined") {
var container = document.getElementsByName('selectTypeForm')[0];
var btnRes = document.createElement('div');btnRes.setAttribute('style', 'float:right;cursor:pointer;border:2px solid #2A4CB0;width:20px;height:20px;padding:4px 0 0 4px');btnRes.setAttribute('id', 'btnRes');btnRes.innerHTML = "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/tmp_btn/fill-180_zps881d90f2.png' title='Ver resultados' />";container.appendChild(btnRes);document.getElementById("btnRes").addEventListener("click", verResultados, false);}
function saveCu() {
var radioButtons = document.getElementsByName("moneda");
for (var i = 0; i < radioButtons.length; i++) {
if (radioButtons[i].checked) {var moneda = radioButtons[i].value;
if (moneda != null) {
localStorage.setItem('moneda', moneda);
switch (moneda) {case "4":localStorage.setItem('sigla', 'UYU');break;case "13":localStorage.setItem('sigla', 'MXN');break;case "15":localStorage.setItem('sigla', 'BOB');break;}alert("Guardado");collapseExpand("divTabla");return false;}}}alert("No ha seleccionado ninguna opción");}
function resetCu() { localStorage.removeItem("moneda");localStorage.removeItem("sigla"); alert("Moneda reseteada a USD"); collapseExpand("divTabla"); return false; }
function setearMoneda() {var tabla = document.getElementById("divTabla");
if (tabla) {collapseExpand("divTabla");return false;}
var divContenedora = document.createElement('div');
divContenedora.setAttribute('id', 'divTabla');
divContenedora.setAttribute('style', 'z-index:10;position:absolute;background-color:#000;color:#FFF;width:165px;height:auto;padding:10px;border:2px solid red');
divContenedora.setAttribute('class', 'divVisible');
divContenedora.innerHTML = "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/bot/cross.png' id='cerrar' style='float:right' class='cursor' title='Cerrar' /><table align='center'><tr><td class='tdStyle'>Setea tu moneda local</td></tr><tr><td class='tdStyle'>MXN <input type='radio' value='13' name='moneda' /></td><tr><td class='tdStyle'>UYU <input type='radio' value='4' name='moneda' /></td></tr><tr><td class='tdStyle'>BOB <input type='radio' value='15' name='moneda' /></td></tr><tr><td><button id='saveCu'>Guardar</button>&nbsp;<button id='resetCu'>Reset</button></td></tr></table><span style='font-style:italic;font-size:11px;float:right'>MZScript ©</span>";
var ins = document.getElementById("contentDiv");
ins.parentNode.insertBefore(divContenedora, ins);
document.getElementById("saveCu").addEventListener("click", saveCu, false);document.getElementById("resetCu").addEventListener("click", resetCu, false);}
var url = window.location.href.split('&');
if (url[1] == "sub=played" && typeof url[2] == "undefined" || url[1] == "sub=played" && url[2] == "hidescore=1") {
var container = document.getElementsByName('selectTypeForm')[0];
var btnMon = document.createElement('div');
btnMon.setAttribute('style', 'float:right;cursor:pointer;border:2px solid #2A4CB0;width:20px;height:20px;padding:4px 0 0 4px');
btnMon.setAttribute('id', 'btnMon');
btnMon.innerHTML = "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/moneyPlus_zpsfa2577c5.png' title='Setear moneda' />";
container.appendChild(btnMon);
document.getElementById("btnMon").addEventListener("click", setearMoneda, false);}
function convertir(valorP, origen) {
var alsek = new Array(7.4234, 9.1775, 1, 1, 0.256963, 2.62589, 13.35247, 1.23522, 1.07245, 5.86737, 5.70899, 5.66999, 1.6953, 0.68576, 2.64445, 0.939, 0.001309, 0.26313, 1.95278, 0.10433, 4.70738, 1.23733, 7.4234, 0.17079, 0.03896, 0.24946, 0.06, 0.17, 1);
var valor_origen = valorP;var enseks = 1 / alsek[origen];
var cMoneda = localStorage.getItem('moneda');if (cMoneda) {v = Math.round(1 / alsek[cMoneda] * valor_origen / enseks);} else {v = Math.round(1 / alsek[0] * valor_origen / enseks);}return v;}
function getValues(idUno, idDos) {
var cont = 0, pos, teamId;
while (cont < 2) {var titular = 1;if (cont == 0) {pos = 3;teamId = idUno;} else {pos = 6;teamId = idDos;}
try {var xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "/xml/team_playerlist.php?sport_id=1&team_id=" + teamId.toString(), false);
xmlhttp.send();
var xmlDoc = xmlhttp.responseXML;
var nocm = document.getElementById("skyscraper");
if (nocm) {
htmlCountPlayers = document.evaluate('/html/body/div[3]/div/div[5]/div[2]/div[2]/div/div[2]/table[2]/tbody/tr[' + pos + ']/td/table/tbody', document, null, XPathResult.ANY_TYPE, null);
} else {
htmlCountPlayers = document.evaluate('/html/body/div[3]/div/div[3]/div[2]/div[2]/div/div[2]/table[2]/tbody/tr[' + pos + ']/td/table/tbody', document, null, XPathResult.ANY_TYPE, null);}
var tablaDeEquipo = htmlCountPlayers.iterateNext();
if (tablaDeEquipo == null) {
return false;}
var jugador,total=0,flag=1;
for (jugador = 2; jugador < tablaDeEquipo.rows.length; jugador++) {
try {var celdaControl = tablaDeEquipo.rows[jugador].cells[0].childNodes[0].tagName;
if (celdaControl == 'IMG') {
tablaDeEquipo.rows[jugador].cells[0].colSpan = "13";
} else if (celdaControl != 'IMG' || typeof celdaControl != "undefined") {
var celda = tablaDeEquipo.rows[jugador].cells[1];
var idPlayer = celda.childNodes[0].href.split('&')[1].split('=')[1];
for (var p = 0; p < xmlDoc.getElementsByTagName("Player").length; p++) {
var idP = xmlDoc.getElementsByTagName("Player")[p].getAttribute('id');
if(typeof idP != "undefined" && flag == 1){
var nombre = document.createElement('td');
nombre.setAttribute('style', 'font-weight: bold;');
nombre.innerHTML = "Valor";
var trName = tablaDeEquipo.rows[0].cells[0];
trName.parentNode.insertBefore(nombre, trName);
tablaDeEquipo.rows[1].cells[0].colSpan = "13";}flag=2;
if (idPlayer == idP) {
var valorP = xmlDoc.getElementsByTagName("Player")[p].getAttribute('value');
var currency = xmlDoc.getElementsByTagName("TeamPlayers")[0].getAttribute('teamCurrency');
var cMoneda = localStorage.getItem('moneda');
var cSigla = localStorage.getItem('sigla');
if ((cMoneda && currency != cSigla) || (!cMoneda && currency != "USD")) {
switch (currency) {
case "USD":valorP = convertir(valorP, 0);break;
case "EUR":valorP = convertir(valorP, 1);break;
case "SEK":valorP = convertir(valorP, 2);break;
case "MM":valorP = convertir(valorP, 3);break;
case "UYU":valorP = convertir(valorP, 4);break;
case "R$":valorP = convertir(valorP, 5);break;
case "GBP":valorP = convertir(valorP, 6);break;
case "DKK":valorP = convertir(valorP, 7);break;
case "NOK":valorP = convertir(valorP, 8);break;
case "CHF":valorP = convertir(valorP, 9);break;
case "CAD":valorP = convertir(valorP, 10);break;
case "AUD":valorP = convertir(valorP, 11);break;
case "ILS":valorP = convertir(valorP, 12);break;
case "MXN":valorP = convertir(valorP, 13);break;
case "ARS":valorP = convertir(valorP, 14);break;
case "BOB":valorP = convertir(valorP, 15);break;
case "PYG":valorP = convertir(valorP, 16);break;
case "RUB":valorP = convertir(valorP, 17);break;
case "PLN":valorP = convertir(valorP, 18);break;
case "ISK":valorP = convertir(valorP, 19);break;
case "BGL":valorP = convertir(valorP, 20);break;
case "ZAR":valorP = convertir(valorP, 21);break;
case "US$":valorP = convertir(valorP, 22);break;
case "THB":valorP = convertir(valorP, 23);break;
case "SIT":valorP = convertir(valorP, 24);break;
case "SKK":valorP = convertir(valorP, 25);break;
case "JPY":valorP = convertir(valorP, 26);break;
case "INR":valorP = convertir(valorP, 27);break;
case "MZ":valorP = convertir(valorP, 28);break;}}
var valorCont = document.createElement('td');
valorCont.innerHTML = valorP;
var ins = tablaDeEquipo.rows[jugador].cells[0];
ins.parentNode.insertBefore(valorCont, ins);
if (titular <= 11) {
total = total + parseInt(valorP);}titular++;
p = xmlDoc.getElementsByTagName("Player").length;}} } }
catch (e) { }} 
if(typeof idP != "undefined"){
var trFinal = tablaDeEquipo.rows.length - 2;
var fix = tablaDeEquipo.rows[trFinal].cells[0];
var empty = document.createElement('div');
empty.setAttribute('style', 'font-weight:bold');
empty.innerHTML = total;
fix.parentNode.insertBefore(empty, fix);}
cont++;} catch (e) { return; }} }
var url = window.location.href.split('&');
if (url[1] == "sub=stats") {
var container = document.getElementById("contentDiv").childNodes[3].childNodes[2].childNodes[0].childNodes[2].childNodes[1].rows[2].cells[0].childNodes[1].childNodes[1].rows[0];
var teamOid = container.cells[0].childNodes[0].href.split('&')[1].split('=')[1];
var teamTid = container.cells[2].childNodes[0].href.split('&')[1].split('=')[1];
getValues(teamOid, teamTid);}
function comparar_por_partido() {try {var filas = document.getElementsByName('selectTypeForm')[0].nextSibling.getElementsByTagName('tr');
jugados = (location.href.indexOf('played') != -1) ? 1 : 0;
miEquipoSched = Boolean(!(filas[0].getElementsByTagName('a')[0]));
var inicio = (!jugados && miEquipoSched) ? 1 : 0;
for (var i = inicio; i < filas.length; i++) {
var ad = document.createElement('a');ad.innerHTML = '<img src=\"http://www.mzcompare.com/static/img/mzc.png\" title=\"Comparar equipos con MZ Compare\" border=\"0\" width=\"22\" width=\"13\" />';
var mzc = filas[i].getElementsByTagName('td')[3].getElementsByTagName('a')[0].href;mzc = mzc.substring(mzc.indexOf('&tid'));ad.setAttribute('href', 'http://www.mzcompare.com/match?played=' + jugados.toString() + mzc);ad.setAttribute('target', '_blank');
filas[i].getElementsByTagName('td')[2].getElementsByTagName('nobr')[0].appendChild(ad);}}catch (e) { return; }}comparar_por_partido();
function mzs() {
try {var mzs = document.createElement('li');mzs.setAttribute('id', 'MZs_shortcut');mzs.setAttribute('class', 'icon');mzs.setAttribute('style', 'margin-right:0');
mzs.innerHTML = "<a href='http://userscripts.org/scripts/show/77221' class='bg' target='_blank' title='Página MZScript'><div><img src='http://i915.photobucket.com/albums/ac355/ccc_vader/bot/script-smiley.png' border='0' style='vertical-align:top'></div></a>";
var sector = document.getElementById("menuDiv").childNodes[1];sector.appendChild(mzs);}catch (e) { return; }}mzs(); 
function insertarSelect(elementID) {
var divImg = document.createElement('div')
divImg.setAttribute('id', 'contenedor');
divImg.setAttribute('style', 'border: 5px solid green;font-weight:bold;display:none;width:380px;padding:5px; margin: 0 auto');
divImg.innerHTML = 'Arrastre su imagen a este espacio <button id="btnUpImg">O clickee acá para elegirla</button> <input style="visibility: collapse; width: 0px;" id="subidor" type="file"><p id="error" style="font-weight:bold;color:red">Error. El archivo seleccionado no es una imagen.</p><p id="pe">Cargando imagen <img src="http://managerzone.se/img/loading.gif"> &nbsp;espere por favor.</p><a id="link"></a>';
var ins = document.getElementById(elementID);
ins.parentNode.insertBefore(divImg, ins);
document.getElementById("btnUpImg").addEventListener("click", function () { return document.getElementById('subidor').click() }, false);
document.getElementById("subidor").addEventListener("change", function () { return upload(this.files[0]) }, false);
document.getElementById("btnUpImg").addEventListener("click", preventDef, false);
document.getElementById("contenedor").addEventListener("dragover", preventDef, false);
document.getElementById("contenedor").addEventListener("drop", preventDef, false);
document.getElementById("contenedor").addEventListener("drop", preventDef2, false);}
function generarImagen(url, idImg, elementID, height) {var bimg;
if (idImg == 'btnTabla2') {
bimg = document.createElement('div');
bimg.setAttribute('class', 'mzbtn buttondiv button_account');
bimg.setAttribute('title', 'Insertar Tabla LA-liga');
bimg.setAttribute('style', 'margin-bottom:5px');
bimg.innerHTML = "<span class='buttonClassMiddle'><span style='white-space: nowrap' id='btnTabla'>Tabla LA/liga</span></span><span class='buttonClassRight'>&nbsp;</span>&nbsp;";} else if (idImg == 'upImg') {
bimg = document.createElement('div');
bimg.setAttribute('class', 'mzbtn buttondiv button_account');
bimg.setAttribute('title', 'Subir imágenes a ImgUr');
bimg.innerHTML = "<span class='buttonClassMiddle'><span style='white-space: nowrap' id='upImg'>ImgUr</span></span><span class='buttonClassRight'>&nbsp;</span>&nbsp;";
} else {bimg = document.createElement('img');bimg.setAttribute('src', url);bimg.setAttribute('id', idImg);}
if (height != '')
bimg.setAttribute('height', height + 'px');
var ins = document.getElementById(elementID);
ins.parentNode.insertBefore(bimg, ins);}
function insBR(elementID) {var brr = document.createElement('br');var ins = document.getElementById(elementID);ins.parentNode.insertBefore(brr, ins);}
function armaPanel(elementID) {var height = '';
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/tabla_btngb.gif', 'btnTabla2', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/upImggb.gif', 'upImg', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/iNYhB.gif', 'aIcono0', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ya.gif', 'aIcono1', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/03-icon_lol.gif', 'aIcono2', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/sad.gif', 'aIcono3', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_crying.gif', 'aIcono4', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/07-icon_confused.png', 'aIcono5', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/08-icon_rolleyes.gif', 'aIcono6', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/09-2h728f4.png', 'aIcono7', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/uhm.gif', 'aIcono8', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_eek.gif', 'aIcono9', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/13-icon_evil.png', 'aIcono10', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/15-icon_razz.png', 'aIcono11', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_cool.gif', 'aIcono12', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/17-icon_wink.png', 'aIcono13', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/19-uu.png', 'aIcono14', elementID, height);
insBR(elementID);generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/stare.gif', 'aIcono26', elementID, height);height = 15;
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/36-omm.gif', 'aIcono17', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/24-rock.gif', 'aIcono18', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/fool.gif', 'aIcono19', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/nu.gif', 'aIcono20', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/plz.gif', 'aIcono21', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/clap.gif', 'aIcono23', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/umm.gif', 'aIcono25', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/shh.gif', 'aIcono27', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/angel.gif', 'aIcono28', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/devil.gif', 'aIcono29', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ele.gif', 'aIcono30', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/baba.gif', 'aIcono31', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_xd.gif', 'aIcono22', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/bla.gif', 'aIcono32', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/22-good.gif', 'aIcono15', elementID, height);
generarImagen('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/23-bad.gif', 'aIcono16', elementID, height);insertarSelect(elementID);}
function atajoExtInt(urlImagen, urlPagina, titleImg) {var ad = document.createElement('a');
ad.setAttribute('href', urlPagina);
ad.setAttribute('style', 'text-decoration:none; margin-bottom:0');
ad.innerHTML = '<img src=\"' + urlImagen + '\" title=\"' + titleImg + '\" border=\"0\">\n';
var ins = document.getElementById('contentDiv');
ins.parentNode.insertBefore(ad, ins);}
function atajoForo(urlImagen, urlPagina, titleImg) {
var ad = document.createElement('a');
ad.setAttribute('href', '?' + urlPagina);
ad.innerHTML = '<img src=\"' + urlImagen + '\" title=\"' + titleImg + '\" border=\"0\">';
document.getElementById('logout_etc').appendChild(ad);}
var url = window.location.href.split('=');
if (url[1] == "guestbook&uid" || url[1] == "guestbook") {
armaPanel('writeform');}
function transformar(dato) {switch (dato) {case '0':pelota = "http://static.managerzone.com/nocache-76/img/soccer/wlevel_0.gif";break;case '1':pelota = "http://static.managerzone.com/nocache-76/img/soccer/wlevel_1.gif";break;case '2':pelota = "http://static.managerzone.com/nocache-76/img/soccer/wlevel_2.gif";break;case '3':pelota = "http://static.managerzone.com/nocache-76/img/soccer/wlevel_3.gif";break;case '4':pelota = "http://static.managerzone.com/nocache-76/img/soccer/wlevel_4.gif";break;case '5':pelota = "http://static.managerzone.com/nocache-76/img/soccer/wlevel_5.gif";break;case '6':pelota = "http://static.managerzone.com/nocache-76/img/soccer/wlevel_6.gif";break;case '7':pelota = "http://static.managerzone.com/nocache-76/img/soccer/wlevel_7.gif";break;case '8':pelota = "http://static.managerzone.com/nocache-76/img/soccer/wlevel_8.gif";break;case '9':pelota = "http://static.managerzone.com/nocache-76/img/soccer/wlevel_9.gif";break;case '10':pelota = "http://static.managerzone.com/nocache-76/img/soccer/wlevel_10.gif";break;}return pelota;}
var url = window.location.href.split('&');
var control = window.location.href.split('=');
if (url[1] == "sub=alt" && control[2] == "alt") {
var nocm = document.getElementById("skyscraper");
var htmlCountPost,tablaDeJugadores;
if (nocm) {htmlCountPost = document.evaluate('/html/body/div[3]/div/div[5]/div[2]/div[2]/div/div[2]/table/tbody', document, null, XPathResult.ANY_TYPE, null);
tablaDeJugadores = htmlCountPost.iterateNext();} else {
htmlCountPost = document.evaluate('/html/body/div[3]/div/div[3]/div[2]/div[2]/div/div[2]/table/tbody', document, null, XPathResult.ANY_TYPE, null);
tablaDeJugadores = htmlCountPost.iterateNext();}
for (jugador = 0; jugador < tablaDeJugadores.rows.length; jugador++) {
var celda = tablaDeJugadores.rows[jugador].cells[0].innerHTML;
var celdaF = tablaDeJugadores.rows[jugador].cells[1].innerHTML;
var numJug = tablaDeJugadores.rows[jugador].cells[0].innerHTML;
var nombreJug = tablaDeJugadores.rows[jugador].cells[1].childNodes[0].text;
var nombre = nombreJug.replace(/\s+/g, '%20');
var valorJug = tablaDeJugadores.rows[jugador].cells[2].innerHTML;
var sueldoJug = tablaDeJugadores.rows[jugador].cells[3].innerHTML;
var edadJug = tablaDeJugadores.rows[jugador].cells[4].innerHTML;
var season = tablaDeJugadores.rows[jugador].cells[5].innerHTML;
var altura = tablaDeJugadores.rows[jugador].cells[6].innerHTML;
var peso = tablaDeJugadores.rows[jugador].cells[7].innerHTML;
var vel = tablaDeJugadores.rows[jugador].cells[8].innerHTML;
var res = tablaDeJugadores.rows[jugador].cells[9].innerHTML;
var intel = tablaDeJugadores.rows[jugador].cells[10].innerHTML;
var pases = tablaDeJugadores.rows[jugador].cells[11].innerHTML;
var rem = tablaDeJugadores.rows[jugador].cells[12].innerHTML;
var cab = tablaDeJugadores.rows[jugador].cells[13].innerHTML;
var atajar = tablaDeJugadores.rows[jugador].cells[14].innerHTML;
var ctrl = tablaDeJugadores.rows[jugador].cells[15].innerHTML;
var ent = tablaDeJugadores.rows[jugador].cells[16].innerHTML;
var cruces = tablaDeJugadores.rows[jugador].cells[17].innerHTML;
var bp = tablaDeJugadores.rows[jugador].cells[18].innerHTML;
var expp = tablaDeJugadores.rows[jugador].cells[19].innerHTML;
var edof = tablaDeJugadores.rows[jugador].cells[20].innerHTML;
var nuevo = "&nbsp;<a class='ctooltip'><img src='http://i915.photobucket.com/albums/ac355/ccc_vader/bot/silhouette-male.png' style='cursor:pointer'><span><table width='290' cellpadding='0' cellspacing='0'><tr><td width='290' colspan='2' style='font-weight: bold;color:#000060'>(" + numJug + ") " + nombreJug + "</td></tr><tr><td width='120'><b>Valor: </b>" + valorJug + "</td><td width='170'><b>Sueldo: </b>" + sueldoJug + "</td></tr><tr><td><b>Edad: </b>" + edadJug + "</td><td><b>Nacido Temp.: </b>" + season + "</td></tr><tr><td><b>Altura: </b>" + altura + "</td><td><b>Peso: </b>" + peso + "</td></tr><tr><td align='right' colspan='2'><i>MZScript ©</i></td></tr><tr><td width='170'><b>Velocidad </b></td><td><img src='" + transformar(vel) + "'> (" + vel + ")</td></tr><tr><td><b>Resistencia </b></td><td><img src='" + transformar(res) + "'> (" + res + ")</td></tr><tr><td><b>Inteligencia </b></td><td><img src='" + transformar(intel) + "'> (" + intel + ")</td></tr><tr><td><b>Pases </b></td><td><img src='" + transformar(pases) + "'> (" + pases + ")</td></tr><tr><td><b>Remates </b></td><td><img src='" + transformar(rem) + "'> (" + rem + ")</td></tr><tr><td><b>Cabeza </b></td><td><img src='" + transformar(cab) + "'> (" + cab + ")</td></tr><tr><td><b>Atajar </b></td><td><img src='" + transformar(atajar) + "'> (" + atajar + ")</td></tr><tr><td><b>Control </b></td><td><img src='" + transformar(ctrl) + "'> (" + ctrl + ")</td></tr><tr><td><b>Entradas </b></td><td><img src='" + transformar(ent) + "'> (" + ent + ")</td></tr><tr><td><b>Pases largos </b></td><td><img src='" + transformar(cruces) + "'> (" + cruces + ")</td></tr><tr><td><b>Balon parado </b></td><td><img src='" + transformar(bp) + "'> (" + bp + ")</td></tr><tr><td><b>Experiencia </b></td><td><img src='" + transformar(expp) + "'> (" + expp + ")</td></tr><tr><td><b>Edo. fisico </b></td><td><img src='" + transformar(edof) + "'> (" + edof + ")</td></tr></table></span></a>";
var compartir = "&nbsp;<a class='ctooltip2' title='Compartir en el foro y GB' style='text-decoration:none;'><img src='http://i915.photobucket.com/albums/ac355/ccc_vader/bot/share-small.png' id='imagenRoja" + jugador + "'style='cursor:pointer'><span id='info" + jugador + "' style='background-color:#000;position:absolute;z-index:100;' class='divHidden'><table width='290' cellpadding='10' cellspacing='0'><tr><td style='color:#FFF!important'><b>Código para Foro/GB (CM)</b> <img src='http://i915.photobucket.com/albums/ac355/ccc_vader/bot/cross.png' id='imagenCierre" + jugador + "' style='cursor:pointer; float:right' title='Cerrar'></td></tr><tr><td style='color:#FFF!important'><i>[image url=http://www.mzplus.com.ar/pimg?nombre=%20" + nombre + "%20%20&edad=" + edadJug + "&num=" + numJug + "&skills=" + vel + "," + res + "," + intel + "," + pases + "," + rem + "," + cab + "," + atajar + "," + ctrl + "," + ent + "," + cruces + "," + bp + "," + expp + "," + edof + "&lang=es]</i></td></tr><tr><td style='color:#FFF!important'><br /><b>Código para Foro/GB (No CM)</b></td></tr><tr><td style='color:#FFF!important'><i>[table][tr][th]" + nombreJug + "[/th][th]Edad " + edadJug + "[/th][/tr][tr][th]Velocidad [/th][th](" + vel + ")[/th][/tr][tr][th]Resistencia [/th][th](" + res + ")[/th][/tr][tr][th]Inteligencia [/th][th](" + intel + ")[/th][/tr][tr][th]Pases [/th][th](" + pases + ")[/th][/tr][tr][th]Remates [/th][th](" + rem + ")[/th][/tr][tr][th]Cabezazos [/th][th](" + cab + ")[/th][/tr][tr][th]Atajar [/th][th](" + atajar + ")[/th][/tr][tr][th]Control [/th][th](" + ctrl + ")[/th][/tr][tr][th]Entradas [/th][th](" + ent + "[/th][/tr][tr][th]Pases largos [/th][th](" + cruces + ")[/th][/tr][tr][th]Balón parado [/th][th](" + bp + "[/th][/tr][tr][th]Experiencia [/th][th](" + expp + ")[/th][/tr][tr][th]Estado físico [/th][th](" + edof + ")[/th][/tr][/table]</i></td></tr></table></span></a>";
tablaDeJugadores.rows[jugador].cells[0].innerHTML = celda + nuevo;
tablaDeJugadores.rows[jugador].cells[1].innerHTML = celdaF + compartir;
var aniadoId1 = document.getElementById("imagenRoja" + jugador);
aniadoId1.addEventListener("click", function () { collapseExpand(this.parentNode.childNodes[1].id) }, false);
var aniadoId2 = document.getElementById("imagenCierre" + jugador);
aniadoId2.addEventListener("click", function () { collapseExpand(this.parentNode.parentNode.parentNode.parentNode.parentNode.id) }, false);}}
function calculando35(nrodecaso) {
if (nrodecaso == '1') {
document.getElementById('cuadro1').style.display = 'none';
document.getElementById('cuadro2').style.display = 'none';
document.getElementById('cuadro3').style.display = '';
document.getElementById('cuadro4').style.display = '';
document.getElementById('cuadro5').style.display = 'none';
document.getElementById('cuadro6').style.display = '';
document.getElementById('cuadro7').style.display = '';
document.getElementById('cuadro8').style.display = 'none';
document.getElementById('cuadro9').style.display = '';
document.getElementById('cuadro10').style.display = '';
} else if (nrodecaso == '2') {
document.getElementById('cuadro1').style.display = '';
document.getElementById('cuadro2').style.display = '';
document.getElementById('cuadro3').style.display = 'none';
document.getElementById('cuadro4').style.display = '';
document.getElementById('cuadro5').style.display = 'none';
document.getElementById('cuadro6').style.display = '';
document.getElementById('cuadro7').style.display = '';
document.getElementById('cuadro8').style.display = '';
document.getElementById('cuadro9').style.display = '';
document.getElementById('cuadro10').style.display = '';
} else if (nrodecaso == '3') {
document.getElementById('cuadro1').style.display = 'none';
document.getElementById('cuadro2').style.display = 'none';
document.getElementById('cuadro3').style.display = '';
document.getElementById('cuadro4').style.display = '';
document.getElementById('cuadro5').style.display = '';
document.getElementById('cuadro6').style.display = '';
document.getElementById('cuadro7').style.display = '';
document.getElementById('cuadro8').style.display = 'none';
document.getElementById('cuadro9').style.display = '';
document.getElementById('cuadro10').style.display = '';}}
function calculando3(obj) {
f = obj.form;
valorVenta = f.elements["vventa"].value;
valorMz = f.elements["vMz"].value;
edad = f.elements["jEdad"].value;
fechaCompra = f.elements["fcompra"].value;
valorCompra = f.elements["vcompra"].value;
fechaVenta = f.elements["fventa"].value;
var impuesto,porcentaje;
var ganancia = valorVenta - valorMz;
partida = fechaCompra.split('/');
diaCompra = partida[1];
mesCompra = partida[0];
anioCompra = partida[2];
partida2 = fechaVenta.split('/');
diaVenta = partida2[1];
mesVenta = partida2[0];
anioVenta = partida2[2];
chequeado1 = document.getElementById('cel1').checked;
chequeado2 = document.getElementById('cel2').checked;
chequeado3 = document.getElementById('cel3').checked;
function FechaADias(dia, mes, anno) {
dia = parseInt(dia, 10);
mes = parseInt(mes, 10);
anno = parseInt(anno, 10);
var cant_bic, cant_annos, cant_dias, no_es_bic;
cant_bic = parseInt((anno - 1904) / 4 + 1);
no_es_bic = parseInt((anno % 4));
cant_annos = parseInt(anno - 1904);
cant_dias = parseInt(cant_annos * 365 + cant_bic);
var i;for (i = 1; i <= mes; i++) {
if ((i == 1) || (i == 3) || (i == 5) || (i == 7) || (i == 8) || (i == 10) || (i == 12)) {cant_dias += 31;}
if ((i == 4) || (i == 6) || (i == 9) || (i == 11)) {cant_dias += 30;}
if (i == 2) {if (no_es_bic) {cant_dias += 28;}else {cant_dias += 29;}}}cant_dias += dia;return cant_dias;}
function FechaDif(dia1, mes1, anio1, dia2, mes2, anio2) {
var dias1, dias2, dif;
dia1 = parseInt(dia1, 10);
mes1 = parseInt(mes1, 10);
anio1 = parseInt(anio1, 10);
dia2 = parseInt(dia2, 10);
mes2 = parseInt(mes2, 10);
anio2 = parseInt(anio2, 10);
if ((mes1 > 12) || (mes2 > 12)) { return -1; }
if ((mes1 == 1) || (mes1 == 3) || (mes1 == 5) || (mes1 == 7) || (mes1 == 8) || (mes1 == 10) || (mes1 == 12)) {if (dia1 > 31) {
return -1;}}if ((mes2 == 1) || (mes2 == 3) || (mes2 == 5) || (mes2 == 7) || (mes2 == 8) || (mes2 == 10) || (mes2 == 12)) {if (dia2 > 31) {return -1;}}if ((mes1 == 4) || (mes1 == 6) || (mes1 == 9) || (mes1 == 11)) {if (dia1 > 30) {return -1;}}if ((mes2 == 4) || (mes2 == 6) || (mes2 == 9) || (mes2 == 11)) {if (dia2 > 30) {return -1;}}
if (mes1 == 2 && dia1 > 29) {return -1;}if (mes2 == 2 && dia2 > 29) {return -1;}
dias1 = FechaADias(dia1, mes1, anio1);
dias2 = FechaADias(dia2, mes2, anio2);
dif = dias2 - dias1;if (dif < 0) {return ((-1 * dif));}return dif;}
diferencia = FechaDif(diaVenta, mesVenta, anioVenta, diaCompra, mesCompra, anioCompra);
if (chequeado1) {
if (valorVenta == null || valorVenta == "" || valorMz == null || valorMz == "") {
alert("Error. Debe completar todos los campos.");
return false;}
if (ganancia > 0) {
porcentaje = "20%";
impuesto = (ganancia * 20) / 100;
rganancia = valorVenta - impuesto;
rganancia = "El ingreso al club descontando impuestos es de: " + rganancia + " USD";
} else {
porcentaje = "-";
impuesto = "No hay ganancia con esta venta, por lo que no aplica impuestos.";
rganancia = impuesto;}} else if (chequeado2) {
if (valorVenta == null || valorVenta == "" || valorCompra == null || valorCompra == "" || fechaCompra == null || fechaCompra == "" || fechaVenta == null || fechaVenta == "") {
alert("Error. Debe completar todos los campos.");
return false;}
ganancia = valorVenta - valorCompra;
if (ganancia > 0 && diferencia >= 92) {
porcentaje = "20%";
impuesto = (ganancia * 20) / 100;
rganancia = valorVenta - impuesto;
rganancia = "El ingreso al club descontando impuestos es de: " + rganancia + " USD";
} else if (ganancia > 0 && diferencia >= 36 && diferencia <= 91) {
porcentaje = "50%";
impuesto = (ganancia * 50) / 100;
rganancia = valorVenta - impuesto;
rganancia = "El ingreso al club descontando impuestos es de: " + rganancia + " USD";
} else if (ganancia > 0 && diferencia >= 0 && diferencia <= 35) {
porcentaje = "95%";
impuesto = (ganancia * 95) / 100;
rganancia = parseInt(valorVenta - impuesto);
rganancia = "El ingreso al club descontando impuestos es de: " + rganancia + " USD";
} else if (ganancia <= 0) {
porcentaje = "-";
impuesto = "No hay ganancia con esta venta, por lo que no aplica impuestos.";
rganancia = impuesto;}} else if (chequeado3) {
if (valorVenta == null || valorVenta == "" || valorMz == null || valorMz == "" || edad == null || edad == "") {
alert("Error. Debe completar todos los campos.");
return false;}
if (ganancia > 0 && edad == 18) {
porcentaje = "50%";
impuesto = (ganancia * 50) / 100;
rganancia = valorVenta - impuesto;
rganancia = "El ingreso al club descontando impuestos es de: " + rganancia + " USD";
} else if (ganancia > 0 && edad == 19) {
porcentaje = "40%";
impuesto = (ganancia * 40) / 100;
rganancia = valorVenta - impuesto;
rganancia = "El ingreso al club descontando impuestos es de: " + rganancia + " USD";
} else if (ganancia > 0 && edad == 20) {
porcentaje = "30%";
impuesto = (ganancia * 30) / 100;
rganancia = valorVenta - impuesto;
rganancia = "El ingreso al club descontando impuestos es de: " + rganancia + " USD";
} else if (ganancia > 0 && edad >= 21) {
porcentaje = "20%";
impuesto = (ganancia * 20) / 100;
rganancia = valorVenta - impuesto;
rganancia = "El ingreso al club descontando impuestos es de: " + rganancia + " USD";
} else if (edad < 18) {
porcentaje = "-";
impuesto = "-";
rganancia = "No se puede vender, es juvenil";} else {
porcentaje = "-";
impuesto = "No hay ganancia con esta venta, por lo que no aplica impuestos.";
rganancia = impuesto;}}
f.elements["cimpuestos"].value = impuesto + " USD";
f.elements["cimpuestosP"].value = porcentaje;
f.elements["cganancia"].value = rganancia;return true;}
function soloNumeros(valor) {
var numeric = /^[0-9]*$/;
valor.value = valor.value.replace(/[^0-9]/g, "");}
function mostrando() {
var exist = document.getElementById("contImpuestos");
if (exist) {collapseExpand("contImpuestos");return false;}
var div = document.createElement('div')
div.setAttribute("id", "contImpuestos");
div.setAttribute("class", "divVisible");
div.innerHTML = '<font color="white"><b>Calcular Impuestos</b></font> <img src="http://i915.photobucket.com/albums/ac355/ccc_vader/bot/cross.png" id="imagenCer" style="cursor:pointer" title="Cerrar"><br /><br /> \
<form name="fimpuestos"> \
<input type="radio" name="taxes" value="1" id="cel1"> <font color="white">Jugador del club</font> <br /> \
<input type="radio" name="taxes" value="2" id="cel2"> <font color="white">Jugador comprado</font> <br /> \
<input type="radio" name="taxes" value="3" id="cel3"> <font color="white">Ex-juvenil</font> <p></p>\
<div id="cuadro1" style="display:none;color:#FFFFFF">Valor Compra<br /> \
<input id="vcompra" size="12" type="text" value="" name="vcompra"></div>\
<div id="cuadro3" style="display:none;color:#FFFFFF">Valor MZ<br /> \
<input id="vMz" size="12" type="text" value="" name="vMz" ></div>\
<div id="cuadro4" style="display:none;color:#FFFFFF">Valor Venta<br /> \
<input id="vventa" size="12" type="text" value="" name="vventa"></div>\
<div id="cuadro2" style="display:none;color:#FFFFFF">Fecha Compra <i>(mm/dd/aaaa)</i><br /> \
<input size="12" type="text" value="" name="fcompra"></div>\
<div id="cuadro8" style="display:none;color:#FFFFFF">Fecha Venta <i>(mm/dd/aaaa)</i><br /> \
<input size="12" type="text" value="" name="fventa"></div>\
<div id="cuadro5" style="display:none;color:#FFFFFF">Edad<br /> \
<input id="jEdad" size="12" type="text" name="jEdad"></div>\
<div id="cuadro10" style="display:none;color:#FFFFFF">Impuestos <i>(%)</i><br /> \
<input size="12" name="cimpuestosP" disabled=""></div>\
<div id="cuadro6" style="display:none;color:#FFFFFF">Impuestos <i>($)</i><br /> \
<input size="12" name="cimpuestos" disabled=""></div><br />\
<div id="cuadro9" style="display:none;color:#FFFFFF">Ingreso<br /> \
<textarea cols="20" rows="5" name="cganancia"></textarea></div><br />\
<div id="cuadro7" style="display:none;"><input type="button" value="Calcular" id="cBoton"></div></form>';
var ins = document.getElementById("contentDiv").childNodes[1].childNodes[3];
ins.parentNode.insertBefore(div, ins);
var aniadoId1 = document.getElementById("cel1");
aniadoId1.addEventListener("click", function () { calculando35(1) }, false);
var aniadoId2 = document.getElementById("cel2");
aniadoId2.addEventListener("click", function () { calculando35(2) }, false);
var aniadoId4 = document.getElementById("cel3");
aniadoId4.addEventListener("click", function () { calculando35(3) }, false);
var aniadoId3 = document.getElementById("cBoton");
aniadoId3.addEventListener("click", function () { calculando3(this) }, false);
var aniadoId5 = document.getElementById("vcompra");
aniadoId5.addEventListener("keyup", function () { soloNumeros(this) }, false);
var aniadoId6 = document.getElementById("vventa");
aniadoId6.addEventListener("keyup", function () { soloNumeros(this) }, false);
var aniadoId7 = document.getElementById("vMz");
aniadoId7.addEventListener("keyup", function () { soloNumeros(this) }, false);}
var url = window.location.href.split('=');
if (url[1] == "players&pid") {
var contenedor = document.getElementById("thePlayers_0").childNodes[1].childNodes[1].childNodes[1].childNodes[5];
var btnImpuestos = document.createElement('a');
btnImpuestos.setAttribute("class", "mzbtn buttondiv button_blue");
btnImpuestos.innerHTML = '<span class="buttonClassMiddle"><span style="white-space: nowrap; cursor:pointer" id="imagenRed">Impuestos</span></span><span class="buttonClassRight">&nbsp;</span>';
contenedor.appendChild(btnImpuestos);}
function botones(filaNueva) {
var botones = '<td>CC-Bar</td><td>';
botones += "<div class='mzbtn buttondiv button_account' title='Insertar Tabla LA-liga'><span class='buttonClassMiddle'><span style='white-space: nowrap' id='btnTabla'>Tabla LA/liga</span></span><span class='buttonClassRight'>&nbsp;</span></div>&nbsp;";
botones += "<div class='mzbtn buttondiv button_account' title='Subir imágenes a ImgUr'><span class='buttonClassMiddle'><span style='white-space: nowrap' id='upImg'>ImgUr</span></span><span class='buttonClassRight'>&nbsp;</span></div>&nbsp;&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_arrow.gif' alt='>' id='icono25'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/22-good.gif' title='(y)' alt='(y)' id='icono31'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/23-bad.gif' title='(n)' alt='(n)' id='icono32'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/wtf.gif' height='20px' title='wtf' alt='wtf' id='icono51'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/fail2.gif' height='20px' title='fail' alt='fail' id='icono44'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/repost.gif' height='20px' title='repost' alt='repost' id='icono45'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/cricri.gif' title='cri' alt='cri' id='icono52'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/nelson.gif' title='ha-ha' alt='ha-ha' id='icono7'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_smile.gif' title=':)' alt=':)' id='icono1'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ya.gif' title=':D' alt=':D' id='icono2'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/jao.gif' title='D' alt='D' id='icono53'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_xd.gif' title='xD' alt='xD' id='icono4'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/bu.gif' title=':/' alt=':/' id='icono46'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/sad.gif' title=':(' alt=':(' id='icono5'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_crying.gif' title=':*(' alt=':*(' id='icono6'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/07-icon_confused.gif' title=':S' alt=':S' id='icono8'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/thshifty.gif' title='erm' alt='erm' id='icono9'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/08-icon_rolleyes.gif' title='8-)' alt='8-)' id='icono10'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/09-.png' title='¬¬' alt='¬¬' id='icono11'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/porfi.png' title='porfi' alt='porfi' id='icono14'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_eek.gif' title='O.O' alt='O.O' id='icono13'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/uhm.gif' title='_hm' alt='_hm' id='icono50'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/wooh.gif' title='evil' alt='evil' id='icono49'/><br />";
botones += "<img src='http://img690.imageshack.us/img690/7189/agh.gif' alt='>' id='a'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_evil.gif' title='>:(' alt='>:(' id='icono15'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_twisted.gif' title='>:)' alt='>:)' id='icono16'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/winky.gif' title='flirt' alt='flirt' id='icono17'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/tong.gif' title=':P' alt=':P' id='icono18'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/stare.gif' title='|-(' alt='|-(' id='icono19'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_wink.gif' title=';)' alt=';)' id='icono20'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_cool.gif' title='(h)' alt='(h)' id='icono21'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/19-uu.png' title='u.u' alt='u.u' id='icono22'/>&nbsp;";
botones += "<img src='http://img411.imageshack.us/img411/1734/flexiones.gif' alt='>' id='fle'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/shh.gif' title='shh' alt='shh' id='icono26'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/nu.gif' title='nana' alt='nana' id='icono28'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/24-rock.gif' height='23px' title='rock' alt='rock' id='icono33'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/protest.gif' title='grr' alt='grr' id='icono36'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/jaja.gif' height='23px' title='jaja' alt='jaja' id='icono37'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/eeh.gif' title='eah' alt='eah' id='icono29'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/clap.gif' title='clap' alt='clap' id='icono30'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/bla.gif' title='bla' alt='bla' id='icono38'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ele.gif' title='l' alt='l' id='icono39'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/mad.gif' title='grr' alt='grr' id='icono35'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/angel.gif' title='angel' alt='angel' id='icono40'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/devil.gif' title='diablo' alt='diablo' id='icono41'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/baba.gif' title='baba' alt='baba' id='icono42'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/fool.gif' height='23px' title='x)' alt='x)' id='icono43'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/plz.gif' title='plz' alt='plz' id='icono3'/>&nbsp;";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/umm.gif' title='umm' alt='umm' id='icono27'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/facepalm.gif' title='facepalm' alt='facepalm' id='icono54'/>&nbsp;";
botones += "<img src='http://img189.imageshack.us/img189/4989/brindar.gif' alt='>' id='b'/>&nbsp;";
botones += "<img src='http://img29.imageshack.us/img29/7709/eusaclap.gif' alt='>' id='c'/>&nbsp;";
botones += "<img src='http://img803.imageshack.us/img803/3986/boxeador.gif' alt='>' id='d'/>&nbsp;";
botones += "<img src='http://img37.imageshack.us/img37/6572/adorar.gif' alt='>' id='e'/>&nbsp;";
botones += "<img src='http://img543.imageshack.us/img543/8643/karateka.gif' alt='>' id='f'/>&nbsp;";
botones += "<img src='http://www.postsmile.net/img/19/1943.gif' alt='>' id='g'/>&nbsp;";
botones += "<img src='http://www.postsmile.net/img/19/1969.gif' alt='>' id='h'/>&nbsp;";
botones += "<img src='http://www.postsmile.net/img/19/1942.gif' alt='>' id='i'/>&nbsp;";
botones += "<img src='http://i269.photobucket.com/albums/jj48/Nehnard/Smileys/1131.gif' alt='>' id='n'/>&nbsp;";
botones += "<img src='http://th301.photobucket.com/albums/nn53/Koppernicus/smileys/th_soccer-smiley.gif' alt='>' id='m'/>&nbsp;";
botones += "<img src='http://www.smiley-emoticones.com/smiley/dormir/dormir%20(4).gif' alt='>' id='j'/>&nbsp;";
botones += "<img src='http://www.line-man.com/forums//public/style_emoticons/default/popcorn_smiley.gif' alt='>' id='l'/>&nbsp;"
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/sleep.gif' title='zzz' alt='zzz' id='icono48'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/36-omm.gif' title='om' alt='om' id='icono34'/>";
botones += "<img src='http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/uh.gif' title='uh' alt='uh' id='icono47'/><br />";
botones += '<div id="contenedor" style="border: 5px solid green;font-weight:bold;display:none;width:430px; padding:5px">Arrastre su imagen a este espacio <button id="btnUpImg">O clickee acá para elegirla</button> <input style="visibility: collapse; width: 0px;" id="subidor" type="file">';
botones += '<p id="error" style="font-weight:bold;color:red">Error. El archivo seleccionado no es una imagen.</p><p id="pe">Cargando imagen <img src="http://managerzone.se/img/loading.gif"> &nbsp;espere por favor.</p><p id="link"></p></div>';
filaNueva.innerHTML = botones;
document.getElementById("btnUpImg").addEventListener("click", preventDef, false);
document.getElementById("contenedor").addEventListener("dragover", preventDef, false);
document.getElementById("contenedor").addEventListener("drop", preventDef, false);
document.getElementById("contenedor").addEventListener("drop", preventDef2, false);
document.getElementById("btnUpImg").addEventListener("click", function () { return document.getElementById('subidor').click() }, false);
document.getElementById("subidor").addEventListener("change", function () { return upload(this.files[0]) }, false);}
var url = window.location.href.split('&');
if (url[1] == "sub=topics") {
var tabla = document.getElementsByName('forumform')[0].childNodes[7];
var filaNueva = tabla.insertRow(2);
botones(filaNueva);firmaCont(tabla);
var mostrarsi = localStorage.getItem('mostrar');
if (mostrarsi == 'true') {
document.getElementById('mostrarY').click();
var btnSend = document.getElementById("send_btn").childNodes[1];
btnSend.addEventListener("click", function () { firmaFija() }, false);}} else if (url[1] == "sub=board") {
armaPanel('writeform');
var ubidequipo; var idequipo; var celda; var idUsuario; var nombreUsuario; var ubicacion;
var TDs = document.getElementsByTagName('TD');
for (fila = 0; fila < TDs.length; fila++) {
if (TDs[fila].parentNode.cells[0].className == 'listsecondary') {
if (TDs[fila].firstChild.tagName == 'IMG') {
if (TDs[fila].childNodes[3].tagName == "A") {
ubidEquipo = TDs[fila].parentNode.parentNode.rows[1].cells[1].childNodes[1];
idEquipo = ubidEquipo.src.split("=")[1].replace("&sport", "");
celda = TDs[fila].childNodes[3];
idUsuario = celda.href.split("&")[1].replace("uid=", "");
nombreUsuario = celda.text;
ubicacion = celda.parentNode.parentNode.cells[1];
celda.parentNode.parentNode.cells[1].removeAttribute("width");
celda.parentNode.parentNode.cells[0].removeAttribute("width");
celda.parentNode.parentNode.parentNode.rows[1].cells[0].removeAttribute("width");
celda.parentNode.parentNode.parentNode.rows[1].cells[1].width = "70";
celda.parentNode.parentNode.parentNode.rows[1].cells[1].align = "right";
ubicacion.innerHTML = " <a title='GB de " + nombreUsuario + "' href='/?p=guestbook&uid=" + idUsuario + "'><img src='http://managerzone.se/img/soccer/reply_guestbook.gif'></a>&nbsp;<a title='Enviar amistosos a " + nombreUsuario + "' href='/?p=team&sub=challenge&tid=" + idEquipo + "'><img src='http://static.managerzone.com/nocache-82/img/soccer/challenge_yes.gif' width='14px' height='14px'></a>" + ubicacion.innerHTML;
} else if (TDs[fila].childNodes[2].tagName == "A") {
ubidEquipo = TDs[fila].parentNode.parentNode.rows[1].cells[1].childNodes[1];
idEquipo = ubidEquipo.src.split("=")[1].replace("&sport", "");
celda = TDs[fila].childNodes[2];
idUsuario = celda.href.split("&")[1].replace("uid=", "");
nombreUsuario = celda.text;
ubicacion = celda.parentNode.parentNode.cells[1];
celda.parentNode.parentNode.cells[1].removeAttribute("width");
celda.parentNode.parentNode.cells[0].removeAttribute("width");
celda.parentNode.parentNode.parentNode.rows[1].cells[0].removeAttribute("width");
celda.parentNode.parentNode.parentNode.rows[1].cells[1].width = "70";
celda.parentNode.parentNode.parentNode.rows[1].cells[1].align = "right";
ubicacion.innerHTML = " <a title='GB de " + nombreUsuario + "' href='/?p=guestbook&uid=" + idUsuario + "'><img src='http://managerzone.se/img/soccer/reply_guestbook.gif'></a>&nbsp;<a title='Enviar amistosos a " + nombreUsuario + "' href='/?p=team&sub=challenge&tid=" + idEquipo + "'><img src='http://static.managerzone.com/nocache-82/img/soccer/challenge_yes.gif' width='14px' height='14px'></a>" + ubicacion.innerHTML;
}} else if (TDs[fila].parentNode.cells[0].children[0].tagName == 'A') {
if (!(TDs[fila].parentNode.cells[1].childNodes[3])) {
ubidEquipo = TDs[fila].parentNode.parentNode.rows[1].cells[1].childNodes[1];
idEquipo = ubidEquipo.src.split("=")[1].replace("&sport", "");
celda = TDs[fila].parentNode.cells[0].childNodes[1];
idUsuario = celda.href.split("&")[1].replace("uid=", "");
nombreUsuario = celda.text;
ubicacion = celda.parentNode.parentNode.cells[1];
celda.parentNode.parentNode.cells[1].removeAttribute("width");
celda.parentNode.parentNode.cells[0].removeAttribute("width");
celda.parentNode.parentNode.parentNode.rows[1].cells[0].removeAttribute("width");
celda.parentNode.parentNode.parentNode.rows[1].cells[1].width = "70";
celda.parentNode.parentNode.parentNode.rows[1].cells[1].align = "right";
ubicacion.innerHTML = " <a title='GB de " + nombreUsuario + "' href='/?p=guestbook&uid=" + idUsuario + "'><img src='http://managerzone.se/img/soccer/reply_guestbook.gif'></a>&nbsp;<a title='Enviar amistosos a " + nombreUsuario + "' href='/?p=team&sub=challenge&tid=" + idEquipo + "'><img src='http://static.managerzone.com/nocache-82/img/soccer/challenge_yes.gif' width='14px' height='14px'></a>" + ubicacion.innerHTML;
}}}}} else if (url[1] == "sub=topic") {
var tabla = document.getElementById("forumform").childNodes[9];
var filaNueva = tabla.insertRow(2);
botones(filaNueva);firmaCont(tabla);
var mostrarsi = localStorage.getItem('mostrar');
if (mostrarsi == 'true') {
document.getElementById('mostrarY').click();
var btnSend = document.getElementById("send_btn").childNodes[1];
btnSend.addEventListener("click", function () { firmaFija() }, false);}}
var url = window.location.href.split('&');
if (url[1] == "sub=topics") {var nocm = document.getElementById("skyscraper");
var htmlCountPost, tablaDePost;
if (nocm) {htmlCountPost = document.evaluate('/html/body/div[3]/div/div[5]/div[2]/div[2]/div/div[2]/table/tbody', document, null, XPathResult.ANY_TYPE, null);
tablaDePost = htmlCountPost.iterateNext();} else {
htmlCountPost = document.evaluate('/html/body/div[3]/div/div[3]/div[2]/div[2]/div/div[2]/table/tbody', document, null, XPathResult.ANY_TYPE, null);
tablaDePost = htmlCountPost.iterateNext();}
for (post = 2; post < tablaDePost.rows.length; post++) {
link = tablaDePost.rows[post].cells[0].childNodes[0].href;
celda = tablaDePost.rows[post].cells[1].innerHTML;
datosPost = celda.split(" / ");
cantidadDePaginas = Math.floor(parseInt(datosPost[1]) / 50);
nuevo = "";
if (cantidadDePaginas > 0)
nuevo += "<a title='Ir a la página 2' href='" + link + "&offset=50'>2</a>&#160;"
if (cantidadDePaginas > 1)
nuevo += "<a title='Ir a la página 3' href='" + link + "&offset=100'>3</a>&#160;"
if (cantidadDePaginas > 2)
nuevo += "<a title='Ir a la página 4' href='" + link + "&offset=150'>4</a>&#160;"
if (cantidadDePaginas > 3)
nuevo += "<a title='Ir a la última página' href='" + link + "&offset=" + (cantidadDePaginas * 50) + "'>&#187;</a>"
if (cantidadDePaginas > 0)
nuevo = "&#160;[" + nuevo + "]";
tablaDePost.rows[post].cells[1].innerHTML = celda + nuevo;}
} else if (url[1] == "sub=topic") {
var id, nombre, foro, equipo, idc, nombrec;
var TDs = document.getElementsByTagName('TD');
for (fila = 0; fila < TDs.length; fila++) {
if (TDs[fila].className == 'listsecondary') {
if (TDs[fila].childNodes[1].tagName == 'TABLE') {
celdaSacarId = TDs[fila].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[0].cells[0];
equipoSacarId = TDs[fila].parentNode.parentNode.parentNode.rows[1].cells[0].childNodes[1].rows[1].cells[1];
foro = url[3].replace("forum_id=", "");
if (celdaSacarId.childNodes[3].tagName == "A") {
id = celdaSacarId.childNodes[3].href.split("&")[1].replace("uid=", "");
nombre = celdaSacarId.childNodes[3].text;
equipo = equipoSacarId.childNodes[1].src.split("=")[1].replace("&sport", "");}
else if (celdaSacarId.childNodes[5].tagName == "A") {
nombre = celdaSacarId.childNodes[5].text;
id = celdaSacarId.childNodes[5].href.split("&")[1].replace("uid=", "");
equipo = equipoSacarId.childNodes[1].src.split("=")[1].replace("&sport", "");}
celdaSacarId.innerHTML = celdaSacarId.innerHTML + " <a title='GB de " + nombre + "' href='/?p=guestbook&uid=" + id + "' style='color:black;text-decoration:none;border:1px solid;'><b>&nbsp;GB&nbsp;</b></a>&nbsp;" + "&nbsp;<a title='Ver posts últimos 7 días de " + nombre + "' href='/index.php?p=forum&sub=search&search_keywords=&search_keyword_type=any&search_author=" + nombre + "&search_forum=" + foro + "&search_range=7&search_sort_by=post_date&search_sort_order=desc' style='color:black;text-decoration:none;border:1px solid;'><b>&nbsp;POST&nbsp;</b></a>&nbsp;" + "&nbsp;<a title='Enviar amistosos a " + nombre + "' href='/?p=team&sub=challenge&tid=" + equipo + "' style='color:black;text-decoration:none;border:1px solid;'><b>&nbsp;AMI&nbsp;</b></a>";
} else if (TDs[fila].parentNode.parentNode.tagName == 'TBODY') {
var topId = TDs[fila].parentNode.parentNode.rows[1].cells[0];
var topTeam = TDs[fila].parentNode.parentNode.rows[2].cells[2];
var foroc = url[3].replace("forum_id=", "");
if (topId.childNodes[3].tagName == "A") {
idc = topId.childNodes[3].href.split("&")[1].replace("uid=", "");
nombrec = topId.childNodes[3].text;
equipoc = topTeam.childNodes[1].src.split("=")[1].replace("&sport", "");
} else if (topId.childNodes[5].tagName == "A") {
idc = topId.childNodes[5].href.split("&")[1].replace("uid=", "");
nombrec = topId.childNodes[5].text;
equipoc = topTeam.childNodes[1].src.split("=")[1].replace("&sport", "");}
topId.innerHTML = topId.innerHTML + "<a title='GB de " + nombrec + "' href='/?p=guestbook&uid=" + idc + "' style='color:black;text-decoration:none;border:1px solid;'><b>&nbsp;GB&nbsp;</b></a>&nbsp;" + "&nbsp;<a title='Ver posts últimos 7 días de " + nombrec + "' href='/index.php?p=forum&sub=search&search_keywords=&search_keyword_type=any&search_author=" + nombrec + "&search_forum=" + foroc + "&search_range=7&search_sort_by=post_date&search_sort_order=desc' style='color:black;text-decoration:none;border:1px solid;'><b>&nbsp;POST&nbsp;</b></a>&nbsp;" + "&nbsp;<a title='Enviar amistosos a " + nombrec + "' href='/?p=team&sub=challenge&tid=" + equipoc + "' style='color:black;text-decoration:none;border:1px solid;'><b>&nbsp;AMI&nbsp;</b></a>";}}}}
document.addEventListener("click", function (event) {switch (event.target.id) {case "mostrarTabla":mostrarTabla('copa');break;case "mostrarTabla2":mostrarTabla('nocopa');break;case "mostrarTabla3":mostrarTabla('privada');break;case "cerrar":collapseExpand("divTabla");break;case "btnTabla":posteaTabla('message');break;case "btnTabla2":posteaTabla('msg');break;case "icono1":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_smile.gif', 'message');break;case "icono2":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ya.gif', 'message');break;case "icono3":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/plz.gif', 'message');break;case "m":posteaIcono('http://th301.photobucket.com/albums/nn53/Koppernicus/smileys/th_soccer-smiley.gif', 'message');break;case "icono4":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_xd.gif', 'message');break;case "icono5":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/sad.gif', 'message');break;case "icono6":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_crying.gif', 'message');break;case "icono7":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/nelson.gif', 'message');break;case "icono8":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/07-icon_confused.gif', 'message');break;case "icono9":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/thshifty.gif', 'message');break;case "icono10":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/08-icon_rolleyes.gif', 'message');break;case "icono11":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/09-.png', 'message');break;case "icono12":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_surprised.gif', 'message');break;case "icono13":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_eek.gif', 'message');break;case "icono14":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/porfi.png', 'message');break;case "icono15":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_evil.gif', 'message');break;case "h":posteaIcono('http://www.postsmile.net/img/19/1969.gif', 'message');break;case "i":posteaIcono('http://www.postsmile.net/img/19/1942.gif', 'message');break;case "icono16":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_twisted.gif', 'message');break;case "g":posteaIcono('http://www.postsmile.net/img/19/1943.gif', 'message');break;case "icono17":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/winky.gif', 'message');break;case "a":posteaIcono('http://img690.imageshack.us/img690/7189/agh.gif ', 'message');break;case "c":posteaIcono('http://img29.imageshack.us/img29/7709/eusaclap.gif', 'message');break;case "b":posteaIcono('http://img189.imageshack.us/img189/4989/brindar.gif', 'message');break;case "icono18":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/tong.gif', 'message');break;case "icono19":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/stare.gif', 'message');break;case "fle":posteaIcono('http://img411.imageshack.us/img411/1734/flexiones.gif', 'message');break;case "icono20":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_wink.gif', 'message');break;case "icono21":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_cool.gif', 'message');break;case "icono21":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_cool.gif', 'message');break;case "e":posteaIcono('http://img37.imageshack.us/img37/6572/adorar.gif', 'message');break;case "icono25":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_arrow.gif', 'message');break;case "icono26":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/shh.gif', 'message');break;case "f":posteaIcono('http://img543.imageshack.us/img543/8643/karateka.gif', 'message');break;case "icono27":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/umm.gif', 'message');break;case "d":posteaIcono('http://img803.imageshack.us/img803/3986/boxeador.gif', 'message');break;case "icono28":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/nu.gif', 'message');break;case "icono29":
posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/eeh.gif', 'message');break;case "n":posteaIcono('http://i269.photobucket.com/albums/jj48/Nehnard/Smileys/1131.gif', 'message');break;case "icono30":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/clap.gif', 'message');break;case "icono31":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/22-good.gif', 'message');break;case "icono32":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/23-bad.gif', 'message');break;case "icono33":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/24-rock.gif', 'message');break;case "icono34":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/36-omm.gif', 'message');break;case "icono35":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/mad.gif', 'message');break;case "icono36":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/protest.gif', 'message');break;case "icono37":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/jaja.gif', 'message');break;case "icono38":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/bla.gif', 'message');break;case "icono39":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ele.gif', 'message');break;case "icono40":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/angel.gif', 'message');break;case "icono41":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/devil.gif', 'message');break;case "icono42":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/baba.gif', 'message');break;case "icono43":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/fool.gif', 'message');break;case "icono44":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/fail2.gif', 'message');break;case "icono45":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/repost.gif', 'message');break;case "icono46":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/bu.gif', 'message');break;case "icono47":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/uh.gif', 'message');break;case "icono48":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/sleep.gif', 'message');break;case "icono49":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/wooh.gif', 'message');break;case "icono50":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/uhm.gif', 'message');break;case "icono51":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/wtf.gif', 'message');break;case "icono52":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/cricri.gif', 'message');break;case "icono53":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/jao.gif', 'message');break;case "icono54":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/facepalm.gif', 'message');break;case "aIcono0":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_smile.gif', 'msg');break;case "aIcono1":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ya.gif', 'msg');break;case "aIcono2":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/03-icon_lol.gif', 'msg');break;case "aIcono3":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/sad.gif', 'msg');break;case "aIcono4":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_crying.gif', 'msg');break;case "aIcono5":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/07-icon_confused.gif', 'msg');break;
case "aIcono6":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/08-icon_rolleyes.gif', 'msg');break;case "aIcono7":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/09-.png', 'msg');break;case "aIcono8":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/uhm.gif', 'msg');break;case "aIcono9":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_eek.gif', 'msg');break;case "aIcono10":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/btngb/13-icon_evil.png', 'msg');break;case "aIcono11":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/15-icon_razz.gif', 'msg');break;case "aIcono12":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_cool.gif', 'msg');break;case "aIcono13":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_wink.gif', 'msg');break;case "aIcono14":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/19-uu.png', 'msg');break;case "j":posteaIcono('http://www.smiley-emoticones.com/smiley/dormir/dormir%20(4).gif', 'msg');break;case "l":posteaIcono('http://www.line-man.com/forums//public/style_emoticons/default/popcorn_smiley.gif', 'msg');break;case "aIcono15":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/22-good.gif', 'msg');break;case "aIcono16":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/23-bad.gif', 'msg');break;case "aIcono17":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/36-omm.gif', 'msg');break;case "aIcono18":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/24-rock.gif', 'msg');break;case "aIcono19":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/fool.gif', 'msg');break;case "aIcono20":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/nu.gif', 'msg');break;case "aIcono21":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/plz.gif', 'msg');break;case "aIcono22":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/icon_xd.gif', 'msg');break;
case "aIcono23":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/clap.gif', 'msg');break;case "aIcono24":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/mad2.gif', 'msg');break;case "aIcono25":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/umm.gif', 'msg');break;case "aIcono26":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/stare.gif', 'msg');break;case "aIcono27":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/shh.gif', 'msg');break;case "aIcono28":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/angel.gif', 'msg');break;case "aIcono29":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/devil.gif', 'msg');break;case "aIcono30":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/ele.gif', 'msg');break;case "aIcono31":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/baba.gif', 'msg');break;case "aIcono32":posteaIcono('http://i915.photobucket.com/albums/ac355/ccc_vader/iconos/bla.gif', 'msg');break;case 
"aicono33":posteaIcono('http://img841.imageshack.us/img841/4833/emoticonodurmiendo.gif', 'msg');break;case 
"imagenRoja":mostrarCodigo();break;case "imagenCierre":cerrarCodigo();break;case "imagenRed":mostrando();break;case "imagenCer":collapseExpand("contImpuestos");break;case "boton2":collapseExpand("divColor");break;case "btnFirma":
crearFirma();break; case "btnMostrar": mostrarFirma(); break; case "boton3": collapseExpand("divFirma"); break; case "btni": addImagen('areaFirma'); break; case "btnn": armaCodigo('b', 'areaFirma'); break; case "btnc": armaCodigo('i', 'areaFirma'); break; case "btns": armaCodigo('u', 'areaFirma'); break; case "mostrarY": firmaSiempre(); break; case "upImg": subirImagen(); break;} }, true);