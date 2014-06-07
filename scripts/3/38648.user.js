// ==UserScript==
// @name           NWO Tools
// @namespace      NWO Tools
// @description    Ferramentas para membros da aliança NWO - Mundo Gamma (última atualização: 15.12.2008 - by Sabbath)
// @include        http://s3.ikariam.*/index.php*
// @exclude        http://board.ikariam.*/index.php*
// @source 		   http://userscripts.org/scripts/show/38648
// @require		   http://faxinal.com/void/core.js
// @author         Sabbath
// @version        1.2 
// ==/UserScript==

/* ----------------------ChangeLog---------------------------
v1.2
- Incluído pacote gráfico da versão 3.0
- Corrigido timeout para controle de erro ao enviar multiplos ataques
- Novo botão para piscar cidades inativas na ilha
- Novo botão para identificar cidades que tiverem nossos espiões
- Novo botão para mostrar/ocultar nome dos jogadores na ilha
- Novo botão ao lado do nome da aliança(centro da cidade) para visualização dos membros
- Melhoramento visual no menu do script
- Adicionado mensagens nos conselheiros
- Adicionado média de pontos por membro na página da embaixada
- Otimização de código do script
- Incluído opção de menu para atualização do script

v1.1
- Corrigido bug ao enviar mensagem circular
- Adicionado visualização dos níveis de construção/recursos na cidade/ilha
- Adicionado opção de enviar vários ataques no momento de saquear uma cidade
- Adicionado busca de jogadores/alianças em diversos lugares pelo ícone " ? "
- Adicionado opção de transporte imediado(tropas, barcos e materiais) 

v1.0
- Versão inicial do script
- Criado menu com links para sites externos
- Adicionado links para contato com aliança e líderes
  ------------------------------------------------------------*/

var tagsAModificar = new Array("A","SPAN");
var diaLimite     = 2;
var cookieNWO    = 'admin';
var cookie_SEPARA    = '|';
var css_MenuNWO_String = '#menu {'+
'align:right;'+
'margin-left:665px;'+
'margin-top: -14.5px;'+
'color: #FFCC33;'+
'width: 50px;'+
'cursor: hand;'+
'}'+
'#menu ul {'+
'list-style: none;'+
'margin: 0;'+
'padding: 0;'+
'width: 13em;'+
'}'+
'#menu a, #menu h2 {'+
'font: 10px/16px arial, helvetica, sans-serif;'+
'display: block;'+
'margin: 0;'+
'cursor: hand;'+
'}'+
'#menu a {'+
'color: RGB(84,44,15);'+

'background: RGB(246,235,188);'+
'border: double 1px RGB(84,44,15);'+
'text-decoration: none;'+
'}'+
'#menu a:hover {'+
'color: RGB(84,44,15);'+

'background: #ffd65b;'+
'}'+
'#menu li {position: relative; }'+
'#menu ul ul {'+
'position: relative;'+
'z-index: 500;'+
'}'+
'#menu ul ul ul {'+
'position: absolute;'+
'top: 0;'+
'left: 150%;'+
'}'+
'div#menu ul ul,'+
'div#menu ul li:hover ul ul,'+
'div#menu ul ul li:hover ul ul'+
'{display: none;}'+
'div#menu ul li:hover ul,'+
'div#menu ul ul li:hover ul,'+
'div#menu ul ul ul li:hover ul'+
'{display: block;}';

var version=80;
var scriptlocation="http://userscripts.org/scripts/show/38648";
switch (location.host) {
	default:
		alliancefullnm='Corsairs';
		alliancenm='CoR';		
		alliance=[	['Νo alliance'	, NoAlliance],
					[ alliancenm	, Alliance	],
					['COR 2'		, Alliance	],
					['ΒΑΝΚ'			, Allies	],
					['-=+'			, Enemies 	]  ];
		chaturl='.';
		forumurl='.';
		forumurlnew='.';
		break;
}

if(!window.add_Global_Style){
       function add_Global_Style(css) {
               var head, style;
               head = document.getElementsByTagName('head')[0];
               if (!head) { return; }
               style = document.createElement('style');
               style.type = 'text/css';
               style.innerHTML = css;
               head.appendChild(style);
       }
}

function getAlltagsAModificar(){

var arrResult = new Array();
var lastI     = 0;
var xTags     = null;

for (tagX = 0; tagX<tagsAModificar.length; tagX++) {
xTags = document.getElementsByTagName(tagsAModificar[tagX]);
for(i=0;i<xTags.length;i++){arrResult[lastI] = xTags[i];lastI++;}
}
return arrResult;
}

unsafeWindow.setFontIka = function () {
 var FamilyIndex = document.getElementById("Family").selectedIndex;
 var FI = document.getElementById("Family").options[FamilyIndex].text;
 changeAllFamily(FI);
 var SizeIndex = document.getElementById("Size").selectedIndex;
 var SI = document.getElementById("Size").options[SizeIndex].text;
 changeAllSize(SI);
 var ColorIndex = document.getElementById("Color").selectedIndex;
 var CI = document.getElementById("Color").options[ColorIndex].text;
 changeAllColor(CI);
 createCookie(cookieNWO,FI+cookie_SEPARA+SI+cookie_SEPARA+CI,diaLimite);
}
function createCookie(name,value,days) {
       if (days) {
               var date = new Date();
               date.setTime(date.getTime()+(days*24*60*60*1000));
               var expires = "; expires="+date.toGMTString();
       }
       else var expires = "";
       document.cookie = name+"="+value+expires+"; path=/";
}
function readCookie(c_name) {
       if (document.cookie.length>0)
 {
 c_start=document.cookie.indexOf(c_name + "=");
 if (c_start!=-1)
   {
   c_start=c_start + c_name.length+1;
   c_end=document.cookie.indexOf(";",c_start);
   if (c_end==-1) c_end=document.cookie.length;
   return unescape(document.cookie.substring(c_start,c_end));
   }
 }
       return "";
}
function initFont(){
var rC     = readCookie(cookieNWO);
if (rC){
var myFont = rC.split(cookie_SEPARA);
changeAllFamily(myFont[0]);
changeAllSize(myFont[1]);
changeAllColor(myFont[2]);
}
}
function eraseCookie(name) {
       createCookie(name,"",-1);
}
function changeAllFamily(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontFamily = valueOfSelect;
}

}
function changeAllSize(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.fontSize = valueOfSelect;
}
}
function changeAllColor(valueOfSelect){
var dataToChange = getAlltagsAModificar();
for (i=0;i<dataToChange.length;i++){
 dataToChange[i].style.color = valueOfSelect;
}
}
unsafeWindow.clearFont = function(){
eraseCookie(cookieNWO);
window.location.reload();
}



function addNWOS_ToolsMenu(){

var xTags = document.getElementsByTagName('LI');
var xLi   = null;
var NWOSTools_Link       = document.createElement('LI');
NWOSTools_Link.setAttribute('id', 'NWOSTools');

for(i=0;i<xTags.length;i++){
xLi = xTags[i];
if (xLi.className == 'help') {
xLi.parentNode.appendChild(NWOSTools_Link,xLi);
add_Global_Style(css_MenuNWO_String);
document.getElementById('NWOSTools').innerHTML =
'<div id="menu">'
+ '<ul>'
+ ' <li><h2><img src="http://faxinal.com/void/nw.gif"></h2>'
+ '   <ul>'
+ '     <li><img src="http://faxinal.com/void/logo.jpg" width="155" height="50" style ="border: double 1px RGB(84,44,15)"></li>'
+ '     <li><a target="" href="http://s3.ikariam.com.br/index.php?view=sendAllyMessage&type=50" title="Enviar mensagem a todos os membros">&nbsp;&nbsp;Mensagem Circular</a></li>'
+ '     <li><a target="_blank" href="http://aliancatitas.forumeiro.com/login.forum?connexion" title="Ir ao fórum da NWO">&nbsp;&nbsp;Fórum da NWO</a></li>'
+ '     <li><a target="_blank" href="http://s3.ikariam.com.br/index.php?view=sendMessage&oldView=embassy&id=29040&position=7&with=5508&receiverName=Orfeu" title=" Enviar Mensagem a Orfeu ">&nbsp;&nbsp;Falar com o Líder</a></li>'
+ '     <li><a target="_blank" href="http://s3.ikariam.com.br/index.php?view=sendMessage&oldView=embassy&id=29040&position=7&with=19795&receiverName=b4rtb0y" title=" Enviar Mensagem a b4rtb0y">&nbsp;&nbsp;Falar com o Diplomata</a></li>'
+ '     <li><a target="_blank" href="http://ikcomp.260mb.com/index.php" target="_blank" onClick="window.open(this.href, this.target, \'width=670,height=635\'); return false;" title=" Compactador de batalhas para publicação no fórum ">&nbsp;&nbsp;Compactador de batalhas</a></li>'
+ '	<li><a href="http://ikariamlibrary.com/?content=IkaFight" target="_blank" onClick="window.open(this.href, this.target, \'width=770,height=635\'); return false;" title="">&nbsp;&nbsp;Simulador de batalhas</a></li>'
+ '     <li><a target="_blank" href="http://ikariam.ogame-world.com/pt/suche.php?view=suche_spieler" title=" Procurar cidades e coordenadas em que se encontra um jogador ">&nbsp;&nbsp;Buscar Jogador (IkaWorld)</a></li>'
+ '     <li><a target="_blank" href="http://ikariam.ogame-world.com/pt/suche.php?view=suche_insel" title=" Procurar coordenadas de uma ilha">&nbsp;&nbsp;Buscar Ilha (IkaWorld)</a></li>'
+ '     <li><a href="http://userscripts.org/scripts/source/38648.user.js">&nbsp;&nbsp;Instalar última versão</a></li>'
+ '     <li><a target="_blank" href="http://faxinal.com/void/changelog.txt" title=" Ver dados do versionamento">&nbsp;&nbsp;ChangeLog</a></li>'
+'</ul>'
+'</ul>'
+'</DIV>';

break;
}}}

//Mapas versao 3.0
addStyle('#city #container .phase1 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level1.jpg);}');
addStyle('#city #container .phase2 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level2.jpg);}');
addStyle('#city #container .phase3 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level3.jpg);}');
addStyle('#city #container .phase4 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level4.jpg);}');
addStyle('#city #container .phase5 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level5.jpg);}');
addStyle('#city #container .phase6 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level6.jpg);}');
addStyle('#city #container .phase7 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level7.jpg);}');
addStyle('#city #container .phase8 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level8.jpg);}');
addStyle('#city #container .phase9 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level9.jpg);}');
addStyle('#city #container .phase10 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level10.jpg);}');
addStyle('#city #container .phase11 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level11.jpg);}');
addStyle('#city #container .phase12 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level12.jpg);}');
addStyle('#city #container .phase13 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level13.jpg);}');
addStyle('#city #container .phase14 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level14.jpg);}');
addStyle('#city #container .phase15 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level15.jpg);}');
addStyle('#city #container .phase16 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level16.jpg);}');
addStyle('#city #container .phase17 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level17.jpg);}');
addStyle('#city #container .phase18 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level18.jpg);}');
addStyle('#city #container .phase19 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level19.jpg);}');
addStyle('#city #container .phase20 {    background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/city_level20.jpg);}');

addStyle('#city #container #mainview #locations li .constructionSite { left:-20px; top:-30px; width:114px; height:81px; background-image:url(http://offptz.ucoz.ru/test/ikariam_pic/constructionSite.gif);	}');

addNWOS_ToolsMenu();
main();