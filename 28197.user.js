// ==UserScript==
// @name           Ikariam Quickbar - Versão Louro - PT
// @version        1.0
// @namespace      http://ikariamwikibar.googlepages.com/home
// @description    Cria um separador do lado esquerdo da janela do jogo que permite guardar locais de ilhas e cidades que pretendes. Quando encontrares um local que desejas gravar, expande o separador e clica "Grava a marca desta localização, dando um nome à tua escolha. Quando pretendes visitar o local clica na tua marca! Para fechares o separador clica novamente no inicio do sepador onde diz Quickbar.
// @include        http://s*.ikariam.*/index.php*
// ==/UserScript==
// ===========================================================================
// This script was made by EnigmaBrand - Traduzido por Louro.

unsafeWindow.places = GM_getValue("places","0");
var version="1.3";
var opened=0;

// Create my div and append it to the body tag
vquickbar = document.createElement("div");
vquickbar.setAttribute("id", "quickbar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vquickbar);

unsafeWindow.showquick = function() {
	if(document.getElementById("quickbar").style.left == "-412px")
	{
		document.getElementById("quickbar").style.left = "0px;"
		unsafeWindow.qbbuildinterior();
	}
	if(opened==0)
	{
	unsafeWindow.qbbuildinterior();
	opened=1;
	}
}

unsafeWindow.hidequick = function() {
	document.getElementById("quickbar").style.left = "-412px;"
}

unsafeWindow.qbdeleteentry = function(deleteme) {
	deleteme = deleteme.slice(0,-1);
	var splitplaces = unsafeWindow.places.split(/;/);
	for(i = 0; i < splitplaces.length-1; i++){
		if(splitplaces[i] == deleteme){
			splitplaces.splice(i,1);
			break;
		}
	}
	if(splitplaces.length-1 > 0){
		unsafeWindow.places = splitplaces.join(';');
	}
	else{
		unsafeWindow.places = "0";
	}
	window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
	unsafeWindow.qbbuildinterior();
}

unsafeWindow.qbrenameentry = function(renameme) {
	var renameto = prompt("Rename your Quickmark:","");
	if((renameto == '') || (renameto == '^') || (renameto == ';'))
	{
		alert("Nome inválido! Não pode conter ^ ou ;!");
		return;
	}
	renameme = renameme.slice(0,-1);
	var splitplaces = unsafeWindow.places.split(/;/);
	var splitpiece = '';
	for(i = 0; i < splitplaces.length-1; i++){
		if(splitplaces[i] == renameme){
			splitpiece = splitplaces[i].split('|');
			splitplaces[i] = renameto + '|' + splitpiece[1];
			break;
		}
	}
	if(splitplaces.length-1 > 0){
		unsafeWindow.places = splitplaces.join(';');
	}
	window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
	unsafeWindow.qbbuildinterior();
}

unsafeWindow.qbaddentry = function() {
	
	var addname = prompt("Qual o nome que deseja dar a esta localização?","");
	if((addname.search(/\|/) != -1) || (addname.search(/;/) != -1))
	{
		alert('Nome inválido para a localização! Não usar | ou ;!');
		exit;
	}
	var addlocation = window.location;
	
	if(unsafeWindow.places != "0")
	{
	unsafeWindow.places += addname + '|' + addlocation + ';';
	}
	else
	{
	unsafeWindow.places = addname + '|' + addlocation + ';';
	}
	window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
	unsafeWindow.qbbuildinterior();
}

unsafeWindow.qbexport = function() {
	if(unsafeWindow.places != "0"){
		prompt("Copia isto! Podes importa-lo mais tarde!", unsafeWindow.places);
	}
	else {
		alert("Não tens nenhumas marcas para exportar!");
	}
	unsafeWindow.qbbuildinterior();
}

unsafeWindow.qbimport = function() {
	var imported = prompt("Cola a tua marca(s) aqui. Confirma se está no formato correcto! (nameofquickmark|http://pagelocationgoeshere.com;)","");
	if(unsafeWindow.places == "0"){
	unsafeWindow.places = imported;
	}
	else {
	unsafeWindow.places += imported;
	}
	unsafeWindow.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);	
	unsafeWindow.qbbuildinterior();
}

unsafeWindow.qbdeleteall = function() {
	if(confirm("Tens a certeza que queres apagar todas as tuas marcas?"))
	{
		unsafeWindow.places = "0";
		window.setTimeout(GM_setValue, 0, "places", "0");		
	}
	unsafeWindow.qbbuildinterior();
}

// this function builds the innerHTML of the tab without a page reload
unsafeWindow.qbbuildinterior = function()
{
	var qbHTML = '<div id="quicktab" onmouseover="javascript:showquick()" onclick="javascript:hidequick()"></div>';
	qbHTML += '<div id="qhead"><a style="border-bottom:1px #542C0F dotted; color: #542C0F;" href="http://userscripts.org/users/55339/scripts">Ikiariam Quickbar v'+version+' - Louro - PT</a></div>';
	qbHTML += '<div id="qplaces">';

	// Build the places list
	if(unsafeWindow.places != "0")
	{
		qbHTML += '<div style="border-bottom:1px #F3DDB5 solid; width:376px; margin-top:3px; height:315px; overflow-y:auto; overflow-x:hidden;"><table style="width:375px; border: none;">';
		var placepiece = '';
		var splitplaces = unsafeWindow.places.split(";");
		for(i = 0; i < splitplaces.length-1; i++){
			placepiece = splitplaces[i].split("|");
			qbHTML += '<tr>';
			qbHTML += '<td width="20%" align="right" valign="bottom"><a title="Delete Quickmark" href="javascript:qbdeleteentry(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="http://ikariamwikibar.googlepages.com/redx.png" border="0"></a>';
			qbHTML += ' <a title="Rename Quickmark" href="javascript:qbrenameentry(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="http://ikariamwikibar.googlepages.com/rename.png" border="0"></a> - </td>';
			qbHTML += '<td align="left" width="80%" valign="bottom">&nbsp;<a href="' + placepiece[1] + '">' + placepiece[0] + '</a></td>';
			qbHTML += '</tr>';
		}
		qbHTML += '</table></div>';
	}
	else
	{
	qbHTML += '<div style="border-bottom:1px #F3DDB5 solid; width:376px; height:315px; overflow-y:auto; overflow-x:hidden;"><table style="width:375px; border: none;"><tr><td align="center">Nenhum lugar ainda gravado</td></tr></table></div>';
	}

	qbHTML += '<a href="javascript:qbaddentry();">Grava a marca desta localização</a><br>';
	qbHTML += '<a href="javascript:qbexport();" title="Export list"><img src="http://ikariamwikibar.googlepages.com/export.gif" border="0"></a>';
	qbHTML += ' <a href="javascript:qbimport();" title="Import list (Append)"><img src="http://ikariamwikibar.googlepages.com/import.gif" border="0"></a>';
	qbHTML += ' <a href="javascript:qbdeleteall();" title="Delete all Quickmarks"><img src="http://ikariamwikibar.googlepages.com/redx2.png" border="0"></a>';
	qbHTML += '</div>';
	qbHTML += '<div id="qfoot"></div>';
	document.getElementById("quickbar").innerHTML = qbHTML;
}

// Add the style
GM_addStyle("#quickbar { width:410px; position:fixed; left:-412px; height:400px; top:215px; z-index: 50; background:url(http://ikariamwikibar.googlepages.com/bg_notebarmid.gif); background-repeat:repeat-y; border:1px black solid;}");
GM_addStyle("#qhead { height:30px; width:410px; position:absolute; left:0px; top:0px; background:url(http://ikariamwikibar.googlepages.com/bg_notebartop.gif); line-height:38px; font-weight:bold; font-size:11px;} ");
GM_addStyle("#quickbar:hover { left:0px; }");
GM_addStyle("#qfoot { width:410px; height:3px; background:url(http://ikariamwikibar.googlepages.com/bg_notebarbot.gif); position:absolute; bottom:0px; left:0px;}");
GM_addStyle("#quicktab { z-index:496; background:url(http://ikariamwikibar.googlepages.com/tab_quickbar.png); width:26px; height:100px; position:absolute; right:-26px; top:0px; } ");
GM_addStyle("#quicktab:hover { cursor: pointer; } ");
GM_addStyle("#qplaces { position:absolute; top:30px; bottom:3px; left:29px; overflow:auto; } ");

document.getElementById("quickbar").innerHTML = '<div id="quicktab" onmouseover="showquick()" onclick="hidequick()"></div>';

///// End of script /////