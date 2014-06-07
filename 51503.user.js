// ==UserScript==
// @name           AsA Quickbar
// @version        1.0
// @namespace      http://amazonsalliance.forum-actif.net
// @description    Ajoute un menu Quickbar, pour ajouter des liens a volonte, specialement pour notre alliance AsA
// @include        http://*.ikariam.fr/*
// ==/UserScript==
// ===========================================================================
// This script was made from code taken from the Ikariam quickbar by EnigmaBrand.

unsafeWindow.places = GM_getValue("places","0");
var version="1.1";
var opened=0;

// Create my div and append it to the body tag
vquickbar = document.createElement("div");
vquickbar.setAttribute("id", "quickbar");
var body = document.getElementsByTagName("body");
body[0].appendChild(vquickbar);

// ouverture de la barre avec le passage de la souris
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

// fermeture de la barre
unsafeWindow.hidequick = function() {
	document.getElementById("quickbar").style.left = "-412px;"
}

//  supprimer un lien
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

// renommer un lien
unsafeWindow.qbrenameentry = function(renameme) {
	var renameto = prompt("Renomme ton lien : ","");
	if((renameto == '') || (renameto == '^') || (renameto == ';'))
	{
		alert("Nom invalide !");
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

// Ajouter un lien
unsafeWindow.qbaddentry = function() {
	
	var addname = prompt("Quel nom pour ce lien ?","");
	if((addname.search(/\|/) != -1) || (addname.search(/;/) != -1))
	{
		alert('Lien invalide !');
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

// Supprimer tous les liens
unsafeWindow.qbdeleteall = function() {
	if(confirm("Es tu sure de vouloir supprimer TOUS ces liens ?"))
	{
		unsafeWindow.places = "0";
		window.setTimeout(GM_setValue, 0, "places", "0");		
	}
	unsafeWindow.qbbuildinterior();
}


// Placer un lien en derniere place
unsafeWindow.qbmovedown = function(moveitdown) {
	moveitdown = moveitdown.slice(0,-1);
	var splitplaces = unsafeWindow.places.split(/;/);
	for(i = 0; i < splitplaces.length-1; i++){
		if(splitplaces[i] == moveitdown){
			if(i<splitplaces.length-1)
			{
				splitplaces[i] = splitplaces[i+1];
				splitplaces[i+1] = moveitdown;
				break;
			}
			else
			{
				alert("Ce lien est deja le dernier.");
				break;
			}
		}
	}
	unsafeWindow.places = splitplaces.join(';');
	window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
	unsafeWindow.qbbuildinterior();
}


// Placer un lien en premiere place
unsafeWindow.qbmoveup = function(moveitup) {
	moveitup = moveitup.slice(0,-1);
	var splitplaces = unsafeWindow.places.split(/;/);
	var moveitdown = '';
	for(i = 0; i < splitplaces.length-1; i++){
		if(splitplaces[i] == moveitup){
			if(i<splitplaces.length-1)
			{
				splitplaces[i] = splitplaces[i-1];
				splitplaces[i-1] = moveitup;
				break;
			}
			else
			{
				alert("Ce lien est deja le premier.");
				break;
			}
		}
	}
	unsafeWindow.places = splitplaces.join(';');
	window.setTimeout(GM_setValue, 0, "places", unsafeWindow.places);
	unsafeWindow.qbbuildinterior();
}

// Reactualiser la quickbar
unsafeWindow.qbbuildinterior = function()
{
	var qbHTML = '<div id="quicktab" onmouseover="javascript:showquick()" onclick="javascript:hidequick()"></div>';
	qbHTML += '<div id="qhead"><center><a style="color: #EB1204;" >AsA Quickbar v'+version+'</a></center></div>';
	qbHTML += '<div id="qplaces">';

	// Build the places list
	if(unsafeWindow.places != "0")
	{
		qbHTML += '<div style="border-bottom:1px #98AFC7 solid; width:376px; margin-top:3px; height:315px; overflow-y:auto; overflow-x:hidden;"><table style="width:375px; border: none;">';
		var placepiece = '';
		var splitplaces = unsafeWindow.places.split(";");
		for(i = 0; i < splitplaces.length-1; i++){
			placepiece = splitplaces[i].split("|");
			qbHTML += '<tr>';
			qbHTML += '<td width="20%" align="right" valign="bottom">';
			if(i>0){
			qbHTML += '<a title="Deplacer vers le haut" href="javascript:qbmoveup(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="http://illiweb.com//fa/subsilver/up_arrow.gif" height="10" width="10" border="0"></a>';
			}
			else {
			qbHTML += '<img src="http://s2.largeimagehost.com/HL/esrtcch/41px-Transparent_square.svg.png" width="10" height="10" border="0">';
			}
			if(i<splitplaces.length-2){
			qbHTML += '<a title="Deplacer vers le bas" href="javascript:qbmovedown(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="http://illiweb.com//fa/subsilver/down_arrow.gif" height="10" width="10" border="0"></a>';
			}
			else {
			qbHTML += '<img src="http://s2.largeimagehost.com/HL/esrtcch/41px-Transparent_square.svg.png" height="10" width="10" border="0">';
			}
			qbHTML += '<a title="Supprimer lien" href="javascript:qbdeleteentry(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="http://s1.ikariam.fr/skin/img/action_back.gif" height="20" width="20" border="0"></a>';
			qbHTML += ' <a title="Renommer Quickbar" href="javascript:qbrenameentry(\'' + placepiece[0] + '|' + placepiece[1] + ';\');"><img src="http://s1.ikariam.fr/skin/interface/icon_message_write.gif" height="10" width="10" border="0"></a><font color="EB1204"> - </font></td>';
			qbHTML += '<td align="left" width="80%" valign="bottom">&nbsp;<a href="' + placepiece[1] + '"><font color="EB1204">' + placepiece[0] + '</font></a></td>';
			qbHTML += '</tr>';
		}
		qbHTML += '</table></div>';
	}
	else
	{
	qbHTML += '<div style="border-bottom:1px #98AFC7 solid; width:376px; height:315px; overflow-y:auto; overflow-x:hidden;"><table style="width:375px; border: none;"><tr><td align="center">Aucun  lien pour le moment</td></tr></table></div>';
	}

	qbHTML += '<a href="javascript:qbaddentry();">Inserer la page actuelle</a><br><br>';
	qbHTML += '<a href="javascript:qbdeleteall();" title="Tout supprimer"><img src="http://s1.ikariam.fr/skin/img/action_back.gif" height="20" width="20" border="0"></a>';
        qbHTML += '</div>';
	qbHTML += '<div id="qfoot"></div>';
	document.getElementById("quickbar").innerHTML = qbHTML;
}



GM_addStyle("#quickbar { width:410px; position:fixed; left:-412px; height:420px; top:145px; z-index: 500; background:url(http://i61.servimg.com/u/f61/11/81/20/03/hrdhrt10.jpg); background-repeat:repeat; border:1px gray solid;}");
GM_addStyle("#qhead { height:30px; width:410px; position:absolute; left:0px; top:0px; line-height:38px; font-weight:bold; font-size:11px;} ");
GM_addStyle("#quickbar:hover { left:0px; }");
GM_addStyle("#qfoot { width:410px; height:3px; position:absolute; bottom:0px; left:0px;}");
GM_addStyle("#quicktab { z-index:496; background:url(http://www.concept13.com/flq/Diablo2/items/images/boucliers/peltalunata.gif); width:50px; height:100px; position:absolute; right:-26px; top:0px; } ");
GM_addStyle("#quicktab:hover { cursor: pointer; } ");
GM_addStyle("#qplaces { position:absolute; top:30px; bottom:3px; left:20px; overflow:auto; } ");

document.getElementById("quickbar").innerHTML = '<div id="quicktab" onmouseover="showquick()" onclick="hidequick()"></div>';

///// End of script /////