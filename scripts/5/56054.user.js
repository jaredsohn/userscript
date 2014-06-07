/* Este é um script do Greasemonkey, para instalar você precisa do Greasemonkey: "https://addons.mozilla.org/pt-BR/firefox/addon/748". Em seguida reinicie o Firefox e abra novamente esse script e aceite clicando em "Instalar". Para desinstalar vá até o ícone na barra inferior, escolha "Gerenciar scripts de Usuários...", selecione "TribalWars Script Brasil" e clique em "Desinstalar". */

// ==UserScript==
// @name           Sirius
// @version        0.22 Beta
// @namespace      codeblackmail@gmail.com
// @description    Remove publicidade, mapa até 30x30, barra de atalhos, alertas sonoro e muito mais!
// @include        http://br*.tribalwars.com.br/*
// @include        http://www.tribalwars.com.br/logout.php
// @copyright      Copyright (c) 2009, Code Black
// ==/UserScript==

// ======== Language Dictionary ========

var lng = {

"pt-br" : { // Português Brasileiro
        "villages" : "Vilas",
	"overview" : "Vilas visão geral",
	"map"      : "Mapa",
	"main"     : "Edifício principal",
	"place"    : "Praça de reunião",
	"train"    : "Treino",
	"barracks" : "Quartel",
	"stable"   : "Estabábulo",
	"garage"   : "Oficina",
	"smith"    : "Ferreiro",
	"statue"   : "Estátua",
	"market"   : "Mercado",
	"snob"     : "Academia",
	"player"   : "Jogador",
	"tribe"    : "Tribo",
	"i_player" : "Exibir informação sobre jogador ou tribo",
	"i_tribe"  : "Exibir informação da tribo",
	"loading"  : "Carregando...",
	"c_close"  : "Clique para fechar",
	"track"    : "rastrear vila",
	"tracked"  : "Vila rastreada",
	"untrked"  : "Vila não reastreada",
	"untrack"  : "não rastrear vila",
	"cltrack"  : "limpar todas",
	"notrack"  : "Nenhuma vila rastreada",
	"oktrack"  : "vilas rastreadas",
	"at_none"  : "Atacar novamente",
	"at_same"  : "Atacar novamente com as mesmas tropas",
	"at_all"   : "Atacar novamente com todas as tropas",
	"mapsize"  : "Tamanho do mapa",
	"pop_close": "Fechar",
	"pop_auto" : "Exibir automaticamente:",

},
};

// ======== Global Vars ========

var TW_Use_Cache  = true;
var TW_Image_Base = "/graphic/";
var TW_World      = null;
var TWT_World     = null;
var TW_Domain     = null;
var TW_DotWhat    = null;
var TW_Hash       = null;
var TW_Screen     = null;
var TW_Mode       = null;
var TW_Is_Premium = false;
var TW_Quickbar   = null;
var TW_Village_Id = null;
var TW_Player_Id  = null;
var TW_Villages   = null;
var TW_Lang       = null;
var TW_Mpt        = null;
var TW_Is_Opera   = window.opera ? true : false;


// ======== Entry Point ========

(function(){

	// Enhance Forum Screen
	if (location.href.match( /forum\.php/ )) {
		enhance_forum_screen();
		return;
	}

	// Enhance Mail screen
	if (location.href.match( /screen=mail/ )) {
		enhance_mail_screen();
		//return;
	}
	

	// Enhance Staemme Screen
	if(location.href.match( /staemme\.php/ )){
		enhance_staemme_screen();
		return;
	}

	// Enhance View-Thread Screen
	if(location.href.match( /screen=view_thread/ )){
		enhance_view_thread_screen();
		return;
	}

	// Init Server Info
	if(init_server_info() == false) return;

	// Init Logger
	if(init_logger() == false) return;

	// Init Game Info
	if(init_game_info() == false) return;

	// Add CSS style
	if(true) add_css_style();

	// Build Shortcuts Menu
	if(build_shortcuts_menu() == false) return;

	// Enhance Intro Screen
	if(location.href.match( /intro/ )){
		enhance_intro_screen();
		return;
	}

	// Enhance Main Screen
	if(TW_Screen == "main"){
		enhance_main_screen();
		return;
	}

	// Enhance Map Screen
	if(TW_Screen == "map"){
		enhance_map_screen();
		return;
	}

	// Enhance Info-Village Screen
	if(TW_Screen == "info_village"){
		enhance_info_village_screen();
		return;
	}

	// Enhance Report Screen
	if(TW_Screen == "report" && TW_Mode == "all"){
		enhance_report_screen();
		return;
	}

	// Enhance Market Screen
	if(TW_Screen == "market" && (!TW_Mode || TW_Mode == "send")){
		enhance_market_screen();
		return;
	}

})();


// ======== Enhance Staemme Screen ========

function enhance_staemme_screen(){

	// Remove frame de propaganda
	var frmsets = $$("frameset");
	if(frmsets.length > 0){
		var frmset = frmsets[0];
		for(kk=0; kk<frmset.childNodes.length; kk++){
			var frm = frmset.childNodes[kk];
			if(frm.tagName=="FRAME" && frm.getAttribute("name") != "main"){
				frm.src = "about:blank";
			}}
		if(frmset.getAttribute("rows")) frmset.setAttribute("rows", "0, *");
		else frmset.setAttribute("cols", "*, 0");
	}}

// ======== Init Server Info ========

function init_server_info(){

	// Get TW_World
	var tmp = location.href.replace(/http:\/\//, "").split(".");
	TW_World = tmp[0];

	// Get TWT World
	TWT_World = TW_World;
	if(TW_World.substring(0, 2) == "en") TWT_World = "net" + TW_World.substring(2);

	// Get TW_Domain
	tmp = location.href.replace(/http:\/\//, "").split("/");
	TW_Domain = "http://" + tmp[0];

	// Get TW_DotWhat
	tmp = tmp[0].split(".");
	TW_DotWhat = tmp[tmp.length - 1];

	// Build unique string to identify a specific world on a specific server
	TW_Hash = TW_World + "_" + TW_DotWhat;

	// Get language; default to "pt-br"
	TW_Lang = lng[TW_DotWhat];
	if(!TW_Lang) TW_Lang = lng["pt-br"];

	// Get screen
	var tmp = location.href.match( /screen=([^&]+)/ );
	TW_Screen = (tmp && tmp[1]) ? tmp[1] : null;

	// Get mode
	var tmp = location.href.match( /mode=([^&]+)/ );
	TW_Mode = (tmp && tmp[1]) ? tmp[1] : null;
}


// ======== Init Logger ========
//Modifica o aviso de atualização do cache
function init_logger(){
	var ldiv = document.createElement("DIV");
	ldiv.setAttribute("id"   , "ldiv");
	ldiv.setAttribute("title", " " + TW_Lang["c_close"] + " ");
	ldiv.setAttribute("style", "position:absolute; width:300px; left:10px; top:10px; border:2px #804000 solid; background-color:#F8F4E8; color:black; padding:10px; visibility:hidden; cursor:pointer; z-index:1000");
	ldiv.innerHTML = "&nbsp;";
	if ($$("body")[0]) {
		$$("body")[0].appendChild(ldiv);
		ldiv.addEventListener("click", hideLdiv, true);
	}}

function hideLdiv(){
	$("ldiv").style.visibility = "hidden";
}

function tw_alert(title, text){
	$("ldiv").innerHTML = '<b style="display:block; margin-bottom:10px">' + title + '</b>' + text;
	$("ldiv").style.visibility = "visible";
}

// ======== Init Game Info ========

function init_game_info(){

	TW_Set_Function("clear_mpt", function(){
		window.setTimeout(function(){
			TW_setValue("MPTrk", "");
		}, 0);
	});

	// If coming from login; update cache
	if(location.href.match( /&intro&/ )){
		TW_Use_Cache = false;
	}

	// Get village ID
	TW_Village_Id = get_village_id();
	if(TW_Village_Id == null){
		//tw_alert("TW-Enhancer Error", "Cannot get Village ID; bailing out...");
		return false;
	}

	// Get player ID
	TW_Player_Id = get_player_id(TW_Village_Id);
	if(TW_Player_Id == null){
		//tw_alert("TW-Enhancer Error", "Cannot get Player ID; bailing out...");
		return false;
	}

	// Get villages list
	TW_Villages = get_villages(TW_Player_Id);

	// Is this a premium account?
	TW_Is_Premium = $("quickbar") ? true : false;
	if(TW_Is_Premium) TW_Quickbar = $("quickbar");

	// Thursday, January 24, 2008 - New version changed the quickbar
	var uls = $$("ul");
	for(kk=0; kk<uls.length; kk++){
		if(uls[kk].getAttribute("class") == "menu nowrap quickbar"){
			TW_Quickbar = uls[kk];
			TW_Is_Premium = true;
			break;
		}}

	// Debug
	if(TW_Use_Cache === false){
		var info = '';
		info += 'ID do Jogador: ' + TW_Player_Id + '<br />Aldeias:<br /><ul style="margin-top:3px">';

		for(kk=0; kk<TW_Villages.length; kk++){
			info += '<li>' + TW_Villages[kk][1] + ' [' + TW_Villages[kk][2] + ']' + ' - ' + TW_Villages[kk][3] + '</li>';
		}
		info += '</ul>';

	// Get mpt points
	TW_Mpt = get_mpt();

		var mpt = get_mpt();
		var mpt_len = 0;
		for(i in mpt) mpt_len++;
		
		var pointtrackinfo = "";
		if (mpt_len > 0) {

			for (i in mpt) {
			
					if ((/^([0-9]+)$/).test(i)) {
						if (pointtrackinfo == '') pointtrackinfo = "<ul>";
						var url = TW_Domain + "/game.php?village="+TW_Villages[0][0]+"&screen=info_village&id="+i;
						var xhReqi = new XMLHttpRequest();						
						xhReqi.open("GET", url, false);
						xhReqi.send(null);
						
						pointtrackinfo += "<li><a href=\""+url+"\">"+i_village+' ['+i_coords+'] - '+i_points+"</a></li>";
						
					}}}
		if (pointtrackinfo != '') pointtrackinfo += "</ul>";
		
		info += mpt_len == 0 ? TW_Lang["notrack"] : mpt_len + ' ' + TW_Lang["oktrack"] + ' &raquo; <a href="javascript:;" onclick="clear_mpt()">' + TW_Lang["cltrack"] + '</a>' ;

		tw_alert("Cache Atualizado!" , info+pointtrackinfo);
	}}

// ======== Build Shortcuts Menu ========

function build_shortcuts_menu(){

	if (location.href.match(/building_popup.php/gi)) return;

	var menu_xhtml = '<table class="novo" cellspacing="0" cellpadding="444"><tr>';

	// Add villages dropdown
	if(TW_Villages.length > 1){
		menu_xhtml += '<td style="padding:0px 0px"><select style="width:150px" onchange="switch_village(this)">';
		for(kk=0; kk<TW_Villages.length; kk++) menu_xhtml += '<option value="' + TW_Villages[kk][0] + '"' + (TW_Village_Id == TW_Villages[kk][0] ? ' selected="selected"' : '') + '>' + TW_Villages[kk][1] + ' [' + TW_Villages[kk][2] + '] ' + TW_Villages[kk][3] + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>';
		menu_xhtml += '</select></td>';
	}else{
		menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=overview_villages"><img src="' + TW_Image_Base + 'unit/unit_snob.png" style="margin:0px 0px" title=" ' + TW_Lang["villages"] + ' " /></a></td>';
	}

	// Add links

	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=main"><img src="' + TW_Image_Base + 'buildings/main.png" style="margin:0px 0px" title=" ' + TW_Lang["main"] + ' " /></a></td>';
	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=barracks"><img src="' + TW_Image_Base + 'buildings/barracks.png" style="margin:0px 0px" title=" ' + TW_Lang["barracks"] + ' " /></a></td>';
	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=stable"><img src="' + TW_Image_Base + 'buildings/stable.png" style="margin:0px 0px" title=" ' + TW_Lang["stable"] + ' " /></a></td>';
	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=garage"><img src="' + TW_Image_Base + 'buildings/garage.png" style="margin:0px 0px" title=" ' + TW_Lang["garage"] + ' " /></a></td>';
	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=snob"><img src="' + TW_Image_Base + 'buildings/snob.png" style="margin:0px 0px" title=" ' + TW_Lang["snob"] + ' " /></a></td>';
	if(TW_Is_Premium){
		menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=smith"><img src="' + TW_Image_Base + 'buildings/smith.png" style="margin:0px 0px" title=" ' + TW_Lang["smith"] + ' " /></a></td>';
		menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=train"><img src="' + TW_Image_Base + 'unit/unit_sword.png" style="margin:0px 0px" title=" ' + TW_Lang["train"] + ' " /></a></td>';
	}else{
		menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=smith"><img src="' + TW_Image_Base + 'buildings/smith.png" style="margin:0px 0px" title=" ' + TW_Lang["smith"] + ' " /></a></td>';
	}
	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=place"><img src="' + TW_Image_Base + 'buildings/place.png" style="margin:0px 0px" title=" ' + TW_Lang["place"] + ' " /></a></td>';
	menu_xhtml += '<td><a href="/game.php?village=' + TW_Village_Id + '&screen=market"><img src="' + TW_Image_Base + 'buildings/market.png" style="margin:0px 0px" title=" ' + TW_Lang["market"] + ' " /></a></td>';
	menu_xhtml += '</tr></table>';

	TW_Set_Function("switch_village", function(selectObj){
		var target_village_id = selectObj.options[selectObj.selectedIndex].value;
		var redirect_to;
		if(target_village_id == ""){
			redirect_to = "/game.php?village=" + TW_Village_Id + "&screen=overview_villages";
		}else{
			redirect_to = location.href.replace(/village=([^&]+)/, "village=" + target_village_id);
		}
		location.href = redirect_to;
	});

	
TW_Set_Function("i_focus", function(i_obj){
		if(i_obj.value == TW_Lang["player"] || i_obj.value == TW_Lang["tribe"]) i_obj.value = "";
	});

	// Remove premium quickbar
	if(TW_Is_Premium){

		var rplc = null;

		// Premium account
		var quickbar = $("quickbar");
		if(quickbar){

			// Hide quickbar
			quickbar.style.display = "none";
			var brElm = quickbar.previousSibling;
			while(brElm && brElm.tagName != "BR") brElm = brElm.previousSibling;
			if(brElm && brElm.tagName == "BR") brElm.style.display = "none";

			// Get target container
			rplc = quickbar.nextSibling;
			while(rplc.tagName != "TABLE") rplc = rplc.nextSibling;
			if(TW_Is_Opera){
				rplc = rplc.childNodes[0].childNodes[0].childNodes[0];
			}else{
				rplc = rplc.childNodes[1].childNodes[0].childNodes[1];
			}
			rplc.innerHTML = menu_xhtml + '<div id="twplus_div" style="display:none">' + '</div>';
		}

		// Thursday, January 24, 2008 - New quickbar
		var menu_row2 = $("menu_row2");
		if(menu_row2){

			// Hide quickbar
			TW_Quickbar.style.display = "none";

			// Remove <br/>
			var brElm = TW_Quickbar.parentNode;
			while(brElm && brElm.tagName != "TABLE") brElm = brElm.parentNode;
			if(brElm){
				brElm = brElm.previousSibling;
				while(brElm && brElm.tagName != "BR") brElm = brElm.previousSibling;
				if(brElm && brElm.tagName == "BR") brElm.style.display = "none";
			}

			// Get target container
			rplc = menu_row2.parentNode;
			while(rplc.tagName != "TABLE") rplc = rplc.parentNode;
			if(rplc) rplc = rplc.parentNode;
		}

		// If target container found, replace content
		if(rplc){
			rplc.innerHTML = menu_xhtml + '<div id="twplus_div" style="display:none">' + '</div>';
		}

	}else{

		// Non-premium account
		var rplc = null;
		if(TW_Is_Opera){
			if ($$('table')[1]) {
					rplc = $$('table')[1].childNodes[0].childNodes[0].childNodes[0];
				}
		}else{
			if ($$('table')[1]) {
					rplc = $$('table')[1].childNodes[1].childNodes[0].childNodes[1];
				}
		}
		if (rplc != null) {
		rplc.innerHTML = menu_xhtml + '<div id="twplus_div" style="display:none">' + '</div>';
		}
		if(TW_Is_Opera && $$('table')[1]){
			$$('table')[1].childNodes[0].childNodes[0].childNodes[1].setAttribute("valign", "top");
		}else if ($$('table')[1]){
			$$('table')[1].childNodes[1].childNodes[0].childNodes[3].setAttribute("valign", "top");
		}}}

// ======== Add CSS Style ========

function add_css_style(){
	var new_css = "";

	// Global

	new_css += " { border-collapse: collapse; }\n";


	// Cosmetic fixes
	new_css += "table.novo {height: 20px; border: none !important;}\n";
	new_css += "table.novo select {width: 170px; !important; }\n";


	// Add style
	var style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = new_css;
	document.getElementsByTagName('head')[0].appendChild(style);
}

// ======== Enhance View-Thread Screen ========

function enhance_view_thread_screen(){
	var iframes = $$("iframe");
	if(iframes.length == 1) iframes[0].parentNode.style.display = "none";
}

// ======== Enhance Intro Screen ========

function enhance_intro_screen(){

	// Invalidate cache when coming form login
	TW_Use_Cache = false;

	// Remove premium reminder
	var tbls = $$("table");
	var main_found = 0;
	for(kk=0; kk<tbls.length; kk++){
		if(tbls[kk].getAttribute("class") == "main"){
			tbls[kk].setAttribute("id", "main_" + main_found);
			main_found++;
		}}

	if(main_found == 2){
		$("main_0").style.display = "none";
		var brElm = $("main_0").previousSibling;
		while(brElm.tagName != "BR") brElm = brElm.previousSibling;
		if(brElm.tagName == "BR") brElm.style.display = "none";

		var brElm = $("main_0").nextSibling;
		while(brElm.tagName != "BR") brElm = brElm.nextSibling;
		if(brElm.tagName == "BR") brElm.style.display = "none";
	}}

// ======== Enhance Main Screen ========

function enhance_main_screen(){

	// Remove aviso pedindo atualização para uma conta premium
	var tbls = $$('table');
	for(kk=0; kk<tbls.length; kk++){
		var table = tbls[kk];
		if(table.getAttribute("class") != "vis") continue;
		var tableChilds = table.childNodes[0].childNodes;
		if(tableChilds.length == 1){
			var nextBr = table.nextSibling;
			if(nextBr && nextBr.tagName == "BR"){
				nextBr.style.display = "none";
				table.style.display  = "none";
				break;
			}}}}

// ======== Enhance Map Screen ========

function enhance_map_screen(){

	// Get map size
	var new_size = TW_getValue("MSize");
	if(!new_size) new_size = 15;
	window.setTimeout(function() {
	TW_setValue("MSize", new_size);
	},0);

	TW_Set_Function("resize_map", function(){
		var mss = $("map_size_select");
		var nsz = parseInt(mss.options[mss.selectedIndex].value);

        	window.setTimeout(function(){TW_setValue("MSize", nsz);}, 0);
		window.setTimeout("window.location.reload(true)", 100);
	});
	TW_Set_Function("search_map", function(){

		var plr = $("mark_player");
		var trb = $("mark_tribe");
		var map = document.getElementById("mapCoords");

		var villages = map.getElementsByTagName("img");

		for (i = 0; i < villages.length; i++) {
			
				var tmp = villages[i].getAttribute("onmouseover");

				if (tmp != null) {
						tmp = tmp.replace(/map_popup\('(.+)', '(.*)', '(.*)', (\d+), '(.+)\s\((.+)\)', '(.+)\s\((.+) Points\)', (\w+), (\w+), (\w+), (\w+)\)/gi, "$5 $7");

						if (villages[i].getAttribute("rel") != null) {

								villages[i].style.border = 'none';
								villages[i].style.width = '53px';
								villages[i].style.height = '38px';
								villages[i].setAttribute("rel", null);
							}

						if (plr.value != '') {
								if (tmp.match(new RegExp(plr.value, "i"))) {
										villages[i].style.border = '1px solid red';
										villages[i].style.width = '51px';
										villages[i].style.height = '36px';
										villages[i].setAttribute("rel","searched");
									}}
						if (trb.value != '') {
								if (tmp.match(new RegExp(trb.value+"$", "i")) && villages[i].getAttribute("rel") == null) {
										villages[i].style.border = '1px solid blue';
										villages[i].style.width = '51px';
										villages[i].style.height = '36px';
										villages[i].setAttribute("rel","searched");
									}}}}});

	var form = $$("form")[1];
	var sizes = [7, 10, 12, 15, 18, 20, 22, 24, 26, 28, 30];
	var iHtml = '<table><tr><td colspan="2">&nbsp;</td></tr><tr><td align="right">Tamanho do mapa: </td><td><select id="map_size_select" onchange="resize_map()">';
	for(kk=0; kk<sizes.length; kk++) iHtml += '<option ' + (sizes[kk]==new_size ? 'selected="selected" ' : '') + 'value="' + sizes[kk] +'">' + sizes[kk] + 'x' + sizes[kk] + (sizes[kk]==7?' (desligado)':'') + '</option>';

	iHtml += '</table>';
	form.innerHTML += iHtml;

	var map_requests_needed = null;
	var map_requests_size   = null;

	if(new_size < 16){
		map_requests_needed = 1;
	}else{
		map_requests_needed = 4;
		map_requests_size   = parseInt(new_size / 2);
		new_size = map_requests_size * 2;
	}

	// Get mpt points
	TW_Mpt = get_mpt();

	// Get current position
	var map_x = TW_Get_Variable("mapX");
	var map_y = TW_Get_Variable("mapY");
	var map_s = TW_Get_Variable("mapSize");

	// Calculate new X and Y
	var delta = parseInt((map_s - new_size) / 2);

	// Overwrite values
	map_x += delta;
	map_y += delta;

	// InnerHTML
	var ihtml = "";
	ihtml += '<tr>';
	ihtml += '<td height="38">' + map_y + '</td>';
	ihtml += '<td colspan="' + new_size + '" rowspan="' + new_size + '">';
	ihtml += '<div style="background-image:url(graphic/map/gras1.png); position:relative; width:' + (53 * new_size) + 'px; height:' + (38 * new_size) +'px; overflow:hidden" id="map">';
	ihtml += '<div id="mapOld" style="position:absolute">';
	if(map_requests_needed == 4){
		var w = 53 * map_requests_size + 1;
		var h = 38 * map_requests_size + 2;
		ihtml += '<table cellspacing="0" cellpadding="0"><tr><td><div id="old_1" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div></div></td><td><div id="old_2" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr><tr><td><div id="old_3" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td><td><div id="old_4" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr></table>';
	}
	ihtml += '<div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div>';
	ihtml += '</div>';
	ihtml += '<div id="mapNew" style="position:absolute; left:0px; top:0px">&nbsp;</div>';
	ihtml += '</div>';
	ihtml += '</td>';
	ihtml += '</tr>';
	for(jj=1; jj<new_size; jj++){
		ihtml += '<tr><td width="20" height="38">' + (map_y + jj) + '</td></tr>';
	}
	ihtml += '<tr id="map_x_axis">';
	ihtml += '<td height="20"></td>';
	for(jj=0; jj<new_size; jj++){
		ihtml += '<td align="center" width="49">' + (map_x + jj) + '</td>';
	}
	ihtml += '</tr>';
	$("mapCoords").innerHTML = ihtml;

	// Update data (asynchronously)
	if(map_requests_needed == 1){
		var url = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + new_size + '&size_y=' + new_size;
		var xhReq = new XMLHttpRequest();
		xhReq.open("GET", url, true);
		xhReq.onreadystatechange = function(){
			if(xhReq.readyState != 4 || xhReq.status != 200) return;
			$("mapOld").innerHTML = xhReq.responseText;
		}
		xhReq.send(null);
	}else{
		var url_1 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		var url_2 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + (map_x + map_requests_size) + '&start_y=' + map_y + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		var url_3 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + (map_y + map_requests_size) + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;
		var url_4 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + (map_x + map_requests_size) + '&start_y=' + (map_y + map_requests_size) + '&size_x=' + map_requests_size + '&size_y=' + map_requests_size;

		var xhReq_1 = new XMLHttpRequest();
		xhReq_1.open("GET", url_1, true);
		xhReq_1.onreadystatechange = function(){
			if(xhReq_1.readyState != 4 || xhReq_1.status != 200) return;
			$("old_1").innerHTML = xhReq_1.responseText;
		}
		xhReq_1.send(null);

		var xhReq_2 = new XMLHttpRequest();
		xhReq_2.open("GET", url_2, true);
		xhReq_2.onreadystatechange = function(){
			if(xhReq_2.readyState != 4 || xhReq_2.status != 200) return;
			$("old_2").innerHTML = xhReq_2.responseText;
		}
		xhReq_2.send(null);

		var xhReq_3 = new XMLHttpRequest();
		xhReq_3.open("GET", url_3, true);
		xhReq_3.onreadystatechange = function(){
			if(xhReq_3.readyState != 4 || xhReq_3.status != 200) return;
			$("old_3").innerHTML = xhReq_3.responseText;
		}
		xhReq_3.send(null);

		var xhReq_4 = new XMLHttpRequest();
		xhReq_4.open("GET", url_4, true);
		xhReq_4.onreadystatechange = function(){
			if(xhReq_4.readyState != 4 || xhReq_4.status != 200) return;
			$("old_4").innerHTML = xhReq_4.responseText;
		}
		xhReq_4.send(null);

		TW_Set_Function("downloadMapData", function(x_mod, y_mod){

			var map_x  = TW_Get_Variable("mapX");
			var map_y  = TW_Get_Variable("mapY");
			var map_s  = TW_Get_Variable("mapSize");
			var map_ss = map_s / 2;

			map_x += x_mod * map_s;
			map_y += y_mod * map_s;


			window.setTimeout(function() {
			TW_Set_Variable("mapX", map_x);
			TW_Set_Variable("mapY", map_y);}, 0);

			// Prepare new blocks
			var w = 53 * map_ss + 1;
			var h = 38 * map_ss + 1;
			var map_new = TW_Get_Variable("mapNew");
			map_new.innerHTML = '<table cellspacing="0" cellpadding="0"><tr><td><div id="new_1" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">' + TW_Lang["loading"] + '</div></div></td><td><div id="new_2" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr><tr><td><div id="new_3" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td><td><div id="new_4" style="width:' + w + 'px; height:' + h + 'px"><div style="margin:10px; color:white">&nbsp;</div></div></td></tr></table>';

			var url_1 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + map_y + '&size_x=' + map_ss + '&size_y=' + map_ss;
			var url_2 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + (map_x + map_ss) + '&start_y=' + map_y + '&size_x=' + map_ss + '&size_y=' + map_ss;
			var url_3 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + map_x + '&start_y=' + (map_y + map_ss) + '&size_x=' + map_ss + '&size_y=' + map_ss;
			var url_4 = TW_Domain + "/" + TW_Get_Variable("mapURL") + '&start_x=' + (map_x + map_ss) + '&start_y=' + (map_y + map_ss) + '&size_x=' + map_ss + '&size_y=' + map_ss;

			var xhReq_1 = new XMLHttpRequest();
			xhReq_1.open("GET", url_1, true);
			xhReq_1.onreadystatechange = function(){
				if(xhReq_1.readyState != 4 || xhReq_1.status != 200) return;
				$("new_1").innerHTML = xhReq_1.responseText;
			}
			xhReq_1.send(null);

			var xhReq_2 = new XMLHttpRequest();
			xhReq_2.open("GET", url_2, true);
			xhReq_2.onreadystatechange = function(){
				if(xhReq_2.readyState != 4 || xhReq_2.status != 200) return;
				$("new_2").innerHTML = xhReq_2.responseText;
			}
			xhReq_2.send(null);

			var xhReq_3 = new XMLHttpRequest();
			xhReq_3.open("GET", url_3, true);
			xhReq_3.onreadystatechange = function(){
				if(xhReq_3.readyState != 4 || xhReq_3.status != 200) return;
				$("new_3").innerHTML = xhReq_3.responseText;
			}
			xhReq_3.send(null);

			var xhReq_4 = new XMLHttpRequest();
			xhReq_4.open("GET", url_4, true);
			xhReq_4.onreadystatechange = function(){
				if(xhReq_4.readyState != 4 || xhReq_4.status != 200) return;
				$("new_4").innerHTML = xhReq_4.responseText;
			}
			xhReq_4.send(null);
		});

		// ScrollX fix
		function watchMouse(e){
			var info = document.getElementById("info");
			if(!info || info.style.visibility != "visible") return false;

			var scrollX, scrollY, mouseX, mouseY;
			if(e){
				scrollX = window.pageXOffset;
				scrollY = window.pageYOffset;
				mouseX  = e.clientX;
				mouseY  = e.clientY;
			}else{
				scrollX = document.body.scrollLeft;
				scrollY = document.body.scrollTop;
				mouseX  = window.event.clientX;
				mouseY  = window.event.clientY;
			}

			info.style.left = mouseX + 5 + scrollX + "px";
			info.style.top =  mouseY - 100 + scrollY + "px";
			return true;
		};

		if(document.addEventListener) document.addEventListener("mousemove", watchMouse, true);
		else document.onmousemove = watchMouse;
	}

	// ajaxMapInit()
	window.setTimeout(function() {
	TW_Set_Variable("mapOld",  $('mapOld'));
	TW_Set_Variable("mapNew",  $('mapNew'));
	TW_Set_Variable("mapX",    map_x);
	TW_Set_Variable("mapY",    map_y);
	TW_Set_Variable("mapSize", new_size);
	}, 0);

	// mapMoveTopo()
	var scrollX = map_x;
	var scrollY = map_y;
	window.setTimeout(function() {
	TW_Set_Variable("scrollX", scrollX);
	TW_Set_Variable("scrollY", scrollY);
	}, 0);
	var topoX = parseInt(document.getElementsByName('min_x')[0].value);
	var topoY = parseInt(document.getElementsByName('min_y')[0].value);

	var relX = scrollX - topoX;
	if(TW_Get_Variable("globalYDir") == 1){
		var relY = scrollY - topoY;
	}else{
		var relY = (45-mapSize) - (scrollY-topoY);
	}
	
	// Rechteck verschieben (whatever this mean :)
	$('topoRect').style.left   = (5*(relX)) + 'px';
	$('topoRect').style.top    = (5*(relY)) + 'px';
	$('topoRect').style.width  = (5*(new_size)) + 'px';
	$('topoRect').style.height = (5*(new_size)) + 'px';

	// Tracking
	TW_Set_Function("old_map_popup", TW_Get_Function("map_popup"));
	TW_Set_Function("map_popup", function(title, bonus_image, bonus_text, points, owner, ally, village_groups, moral, village_id, source_id){
		var x_title  = arguments[0];
		var x_points = null;
		if(arguments.length == 8){
			x_points = arguments[1];
			(TW_Get_Function("old_map_popup"))(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7]);
		}else{
			x_points = arguments[3];
			(TW_Get_Function("old_map_popup"))(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6], arguments[7], arguments[8], arguments[9]);			
		}

		var tmp = x_title.match( /\(([^\)]+)/ );
		var vlg_coords = tmp && tmp[1] ? tmp[1] : null;

		if(vlg_coords != null){

			vlg_coords = vlg_coords.replace(/\|/, "x");
	
			var villagelinks = $("mapCoords").getElementsByTagName("a");
			for (i =0; i < villagelinks.length; i++) { 
			
				var curvil = new String(villagelinks[i].innerHTML);
				var curcord = curvil.replace(/(.+)\((\d+)\|(\d+)\)(.+)/gi, "$2x$3");
				if (curcord == vlg_coords) {
						curid = villagelinks[i].href.replace(/^(.+)id=(\d+)$/i, "$2");
					}
				}
			var pointrackinfo = (get_mpt_xhtml(vlg_coords, x_points) != '') ? get_mpt_xhtml(vlg_coords, x_points) : get_mpt_xhtml(curid, x_points);
			$("info_points").innerHTML = x_points + pointrackinfo;
		}});}


// ======== Generic Helper Functions ========

// DOM Shortcuts
function $(elm_id){
	return document.getElementById(elm_id);
}

function $$(tag_name){
	return document.getElementsByTagName(tag_name);
}

// Map Points Tracking
function get_mpt_xhtml(village_coords, points){
	if(TW_Mpt[village_coords] == null) return "";

	put_mpt(village_coords, points);
	var delta = points - TW_Mpt[village_coords];
	if(delta > 0) return ' <span style="color:green">(+' + delta + ')</span>';
	if(delta == 0) return ' <span style="color:black">(0)</span>';
	return ' <span style="color:red">(-' + Math.abs(delta) + ')</span>';
}

function get_mpt(){
	var cacheMpt = TW_getValue("MPTrk");
	if(!cacheMpt || cacheMpt == ""){
		cacheMpt = [];
	}else{
		cacheMpt = unserialize(cacheMpt);
	}
	return cacheMpt;
}

function put_mpt(village_coords, points){
	window.setTimeout(function() {
	var cacheMpt = get_mpt();
	cacheMpt[village_coords] = points;
	var to_save = serialize_x(cacheMpt);
	TW_setValue("MPTrk", to_save);
	},0);
}

// Persistent Storage
function TW_setValue(key, new_val){
	if(!TW_Is_Opera){
		GM_setValue(TW_Hash + "" + key, new_val);
		return;
	}

	// Opera patch
	document.cookie = escape(key) + "=" + escape(new_val) + ";expires=" + (new Date((new Date()).getTime() + 31536000000)).toGMTString() + ";path=/";
}

function TW_getValue(xkey){
	if(!TW_Is_Opera) return GM_getValue(TW_Hash + "" + xkey);

	// Opera patch
	var all_cookies = document.cookie.split("; ");
	for(kk=0; kk<all_cookies.length; kk++){
		var this_cookie = all_cookies[kk];
		var tmp = this_cookie.split("=");
		if(tmp[0] == xkey){
			return unescape(tmp[1]);
		}
	}
	return null;
}

function TW_delValue(key){
	if(!TW_getValue(key)) return;
	if(!TW_Is_Opera) GM_setValue(TW_Hash + "", "");

	// Opera patch
	document.cookie = key + '=;expires=Thu, 01-Jan-1970 00:00:01 GMT';
}

// Unsafe window handling
function TW_Set_Variable(name, new_val){
	if(typeof unsafeWindow == "object"){
		unsafeWindow[name] = new_val;
	}else if(TW_Is_Opera){
		window[name] = new_val;
		/*
		window.opera.defineMagicVariable(
			name,
			function(curVal) { new_val; },
			function(newVal) { null; }
		);
		*/
	}}

function TW_Get_Variable(name){
	if(typeof unsafeWindow == "object"){
		return unsafeWindow[name];
	//}else if(TW_Is_Opera){
	} else {
		return window[name];
	}}
	
function TW_Set_Function(func, new_func){

	if(typeof unsafeWindow == "object"){
		unsafeWindow[func] = new_func;
	}else if(TW_Is_Opera){
		window[func] = new_func;
		/*
		window.opera.defineMagicFunction(
			func,
			function(oRealFunc, oThis, oParam1, oParam2){
				return oParam1.getElementById('oParam2').style;
			}
		);
		*/
		}}

function TW_Get_Function(func){
	if(typeof unsafeWindow == "object"){
		return unsafeWindow[func];
	//}else if(TW_Is_Opera){
	} else {
		return window[func];
	}}

// Serialize / Unserialize
function serialize(obj){
	var a=[], i, l = obj.length, v;

	for(i=0; i<l; i++){
		v = obj[i];
		switch(typeof v){
			case 'object':
				if(v){
					a.push(serialize(v));
				}else{
					a.push('null');
				}
				break;

			case 'string':
				a.push('"' + v.replace(/\\/g, /\\\\/).replace(/"/g, "\\\"") + '"');
				break;

			case 'number':
			case 'boolean':
				a.push(v + '');
				break;

			default:
				a.push('null');
		}}
	return '[' + a.join(',') + ']';
}

function serialize_x(obj){
	var ret_val = '{';
	for(i in obj){
		if(obj[i] == null) continue;
		ret_val += '"' + i + '":' + obj[i] + ',';
	}
	if(ret_val != '{') ret_val = ret_val.substring(0, ret_val.length - 1);
	ret_val += '}';
	return ret_val;
}

function unserialize(str){
	return eval("(" + str + ")");
}

// ======== Game Helper Functions ========

function get_village_id(){
	var logoutLink = $$('a')[0];
	if(!logoutLink) return 0;

	var logoutLinkHref = logoutLink.getAttribute("href");
	var tmp = logoutLinkHref.match( /village=([^&]+)/ );
	return (tmp && tmp[1]) ? tmp[1] : null;
}

function get_player_id(vlg_id){

	// Cache hit ?
	var player_id = TW_getValue("PlayerID");
	if(player_id && TW_Use_Cache) return player_id;

	// Make synchronous request
	var url = TW_Domain + "/guest.php?screen=info_village&id=" + vlg_id;
	var xhReq = new XMLHttpRequest();
	xhReq.open("GET", url, false);
	xhReq.send(null);

	// Parse response
	var tmp = xhReq.responseText.match( /info_player&amp;id=([^"]+)/ );
	player_id = tmp && tmp[1] ? tmp[1] : 0;
	if(player_id == 0) return null;

	// Save to cache
	TW_setValue("PlayerID", player_id);

	// Return Player ID
	return player_id;
}

function get_villages(player_id){

	// Cache hit ?
	var vlgs = TW_getValue("TW_Villages");
	if(vlgs && TW_Use_Cache) return unserialize(vlgs);

	// Init villages array
	vlgs = new Array();

	// Make synchronous request
	var url = TW_Domain + "/guest.php?screen=info_player&id=" + player_id;
	var xhReq = new XMLHttpRequest();
	xhReq.open("GET", url, false);
	xhReq.send(null);

	// Parse response
	var tmp = xhReq.responseText.match( /info_village&amp;id=([^"]+)">([^<]+)<\/a><\/td><td>([^<]+)<\/td><td>([^<]+)(<span class="grey">\.<\/span>([^<]+))?/gi );
	if(tmp.length == 0) return null;
	for(jj=0; jj<tmp.length; jj++){
		var tmpx = tmp[jj].match( /info_village&amp;id=([^"]+)">([^<]+)<\/a><\/td><td>([^<]+)<\/td><td>([^<]+)(<span class="grey">\.<\/span>([^<]+))?/i );
		var vlg_id     = tmpx[1];
		var vlg_name   = tmpx[2];
		var vlg_coords = tmpx[3];
		var vlg_points = tmpx[4];
		if(tmpx[6]) vlg_points += "." + tmpx[6];
		vlgs[jj] = [vlg_id, vlg_name, vlg_coords, vlg_points];
	}

	// Save to cache
	TW_setValue("TW_Villages", serialize(vlgs));

	// Return villages array
	return vlgs;
}
TW_Set_Function("inpagePopup", function (url,pwidth,pheight) {
		
	window.setTimeout(function() {
		var popdiv = $("innerpopdiv");

		//if (popdiv.style.display == 'block') { popdiv.style.display = 'none'; return;}

		if (popdiv.innerHTML.length < 20) {

		var xhReq = new XMLHttpRequest();
		xhReq.open("GET", url, false);
		xhReq.send(null);
		var tmp = xhReq.responseText;
		} else { 
		var tmp = popdiv.innerHTML; 
		}
		var ischecked = (TW_getValue("showpoponhover") == 1) ? "checked=\"checked\"" : "";


		popdiv.setAttribute("style", "position: absolute; height: "+pheight+"px; width: 500px; display:block;");
		
		popdiv.innerHTML = tmp.replace(/<\?xml([a-zA-Z0-9<>"._\-=\n\t\s]+)<\/h3>([a-zA-Z0-9<>"._\-=\n\t\s]+)/gi, "$2");
		popdiv.innerHTML = popdiv.innerHTML.replace(/<h3>(\w+)<\/h3>/gi, "<table class=\"menu\"><tr><td><b>$1</b></td><td><a href=\"#\" onclick=\"javascript:document.getElementById('innerpopdiv').style.display = 'none';\">"+TW_Lang["pop_close"]+"</a></td><td>"+TW_Lang["pop_auto"]+" <input type=\"checkbox\" id=\"showpoponhover\" "+ischecked+" onclick=\"setShowOnHover(this.checked);\"></td></tr></table>");
		popdiv.innerHTML = popdiv.innerHTML.replace(/javascript:selectTarget\((\d+), (\d+)\)/gi, "javascript:selectTargetInPage($1, $2)");
	},0);

});
var ischecked = (TW_getValue("showpoponhover") == 1)
TW_Set_Function("setShowOnHover", function(bool) {

	if (bool == true) { window.setTimeout(function() {TW_setValue("showpoponhover",1)},0); } else { window.setTimeout(function() {TW_setValue("showpoponhover",0)},0); }
	//window.setTimeout(function() {if (TW_getValue("showpoponhover") == 1) { $("inpagepoplink").setAttribute("onmouseover", $("inpagepoplink").getAttribute("href")); }},0);
	//alert(TW_GetValue("showpoponhover"));
});

TW_Set_Function("selectTargetInPage", function(x, y) {
$("input_x").value = x;
$("input_y").value = y;
$("innerpopdiv").style.display = 'none';
});

// ------------------------------------------------------------------------
// Sons para Tribal Wars
//-------------------------------------------------------------------------

(function(){

var lang = "pt-br";
	// Textbausteine, neue Übersetzung unten eintragen ab Zeile 119 / insert your new translation at line 119
if (lang  == "pt-br") {
	var Text1 = " Configurações do Som "; 					
	var Text2 = " Som geral: Ligar/Desligar ";
	var Text3 = " Repetir som durante ";
	var Text4 = " Volume: ";
	var Text5 = " - Som principal: ";
	var Text6 = " - Quando estiver sendo atacado ";
	var Text7 = " Ficar repetindo alerta quando estiver sendo atacado?";
	var Text8 = " - Quando começar a batalha: ";
	var Text9 = " - Quando receber uma mensagem: ";
	var Text10 = " - Quando receber um relatório: ";
	var Text11 = " - Quando o fórum da tribo receber mensagens: ";
	var Text12 = " forum url: ";
	var Text13 = " - Quando a sessão expirar: ";
	var Text14 = " minutos ";
	var Text15 = " Observação: É necessário QuickTime para que os alertas possam funcionar."}

// +++ Não altere nada além deste ponto +++

if (window.frames[1]) {
	var Loc = window.frames[1].location;
	var Doc = window.frames[1].document;
	if (Doc.location.href.search(/game\.php/) <= 0)
	{
		Loc = window.frames[0].location;
		Doc = window.frames[0].document;
	}}
else {
	var Loc = window.location;
	var Doc = window.document;
}
if (Doc.body) {
	var Body = Doc.body.innerHTML;
}
else {
	return;
}

var welt = Doc.location.host.split('.')[0];				// Welt ermitteln
var uv = (Loc.href.match(/[&,?]t=(\d+)/)) ? RegExp.$1 : "";	// testen ob UV
var cn = "ds_sound_"+welt+"_"+uv+"0"; 						// Accountnamen
var cwert;
var awert;
var interval;
var sound_on = GM_getValue("sound_on", true);
var zeit = GM_getValue("zeit", 10);
var sound1 = GM_test("sound1", "0");
var sound1_on = GM_getValue("sound1_on", true);
var sound1_vol = GM_getValue("sound1_vol", 100);
var sound2 = GM_test("sound2", "0");
var sound2_on = GM_getValue("sound2_on", true);
var sound2_vol = GM_getValue("sound2_vol", 100);
var loop = false;
var sound3 = GM_test("sound3", "0");
var sound3_on = GM_getValue("sound3_on", true);
var sound3_vol = GM_getValue("sound3_vol", 70);
var sound4 = GM_test("sound4", "0");
var sound4_on = GM_getValue("sound4_on", true);
var sound4_vol = GM_getValue("sound4_vol", 70);
var sound_nm = GM_test("sound_nm", "0");
var sound_nm_on = GM_getValue("sound_nm_on", true);
var sound_nm_vol = GM_getValue("sound_nm_vol", 50);
var sound_nr = GM_test("sound_nr", "0");
var sound_nr_on = GM_getValue("sound_nr_on", true);
var sound_nr_vol = GM_getValue("sound_nr_vol", 100);
var sound_nf = GM_test("sound_nf", "0");
var sound_nf_on = GM_getValue("sound_nf_on", true);
var sound_nf_vol = GM_getValue("sound_nf_vol", 30);

var dsphpbb = false;
try {
	var wert = Body.match(/action=is_newer_post/)[0];
	if (wert) {
		dsphpbb = true;
	}
} catch(e) {dsphpbb = false;}

if (dsphpbb) {
	var forum = GM_getValue("dsphpbb_adr"+welt+uv, "0");
	var pic1f = forum  + "images/ds/ds_newpost.gif";
}

	// graphic bell
var picsndon = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
	'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAq5JREFUOMuFlL2LXGUUxn/vx/2cndyZnUmc' +
	'3dm4JhiJH1gYAoIWil0QrEQMNitEFwuxUBIbBasE/wK1UFnEFDYJKSzEQrSQoIhIdCUfEiSbdXZ2' +
	'yO7O3Hvfe9/3tRBCINnxdM95zvlxeIoD/1Pe+6m+nGZ++fGZv89+8uFn3rtdZ8S9mt9+fSG4+MN3' +
	'Rw88sO9751x1YzA+cnzptT96c/16KuDkqXei9etX36eqXm+m6ezhhw9wc22DtbU1dJjc8N6f+uiL' +
	'r1bu3NF3iu2N9QdjKd7VacL9+/ezuHCQXrdPEsasD4bzk3x8DFjZNYNbw8GVJI4ItKLbnUUrTZqm' +
	'xHFCoCTpTLM7NcROd6+vrSWKIrx3zPf7hGGIUoqiLFFKzU0FFKbq3RwM2djcJJ9ss7fTIAr9f7oo' +
	'yCc72ekP3tsdoJROhBAIIdESwmKILLfRWiGlROugf/2va4tTANEx4QWBVigvoHAoIVFCY5FIgaiq' +
	'4ol7AlY+/1Qg/KtCCJRUhKHGhZDEAWmSEIQRwoK39fLLLz5/N2D10q/PCuyjQoAQkryoMSolbXTQ' +
	'QYAUgp0yBx0+18k6j92+GuCt5aXMVua8Vqoz02jQ2pPRmMlQUZPR2JBPcqSSREmKQsginzzz9JNH' +
	'v/nxp1+GwnvPG0vHV733DxljyJpN2nsyOu1ZsnYLW1u2t7YYbd1iOBphjME5R2Gqjd5c/6Cu61rV' +
	'3i/WxqCFxAFOSoyzFHmBcxbjHQ6IkhiHJ01iiqLcuXrlcqmVxEr4szBlO4nifiCVaMQx8737WFiY' +
	'RynF6uVrjMdj6qrCWrtpTPV7UZZPnT13wWipAoDHl0+8IkKlDyVRXCZx+lLazF6YlFXQzhplq9W6' +
	'9M9g8JsbjS4eOvzIz2++fdIASKnA2UpM+wnOVjhb7er/C3AAFHJlPpo3AAAAAElFTkSuQmCC';

var picsndoff = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAASCAYAAABSO15qAAAAAXNSR0IArs4c6QAAAAZiS0dEAP8A' +
	'/wD/oL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAylJREFUOMt91F9oW1UcwPHvubm3TW7+3GRp' +
	'XbO0ab1tsy5mdplkaNGBij7ofFNQUFAmspdpn2QIE5WB2x5U8EWGMMbAP+CDg734UFBEwSnE6VZX' +
	'SW7TNG10XZomXdIkN/deH5Zgx5zn6ZzD7/c5v3N+cARARteTwA7ABn5MGYZNdziOgxCitySj62NA' +
	'DGimDOOS1N0fB74Fvgde6gV/+tE7J898cGKP49i9ZD8wB3wHzAD0gAvA+e789C8HD0ZOHX9zJuD3' +
	'Hb6xtvrqh++/m/yrtCIDpwG9i3wMILaVFgJ+B6JXQwHzp+SUMj4xQvnGBqVSiclG++8n57ODQA2Y' +
	'ThlGYXsFpAyjsuZxH3OARKWmpDxeJu6Ns2/vNJORKA9ll3Z241/vJd8GAJyLj5aykUEEMPVzBtkB' +
	'VVXZ+0cWf9tk3av+uu2qdwLhgUHlkh6j4XHjqWwwfHWBYHGVSG6RRp/CXCqppAyDuwLNtulbqmzw' +
	'za5BAMyvL+L+/CtwYG4kQsU2tZPvvX13wOWSh4QQlAZCLI0NQ7sN1Rq54QjLIQ1ZVqKF/OLo/wD9' +
	'MeEIFFn+tz2A2mpjISEJhGk29/8ncP7cWYFwnhJCEFuvEssXkQdCuDQ/kbUyyXIFYYFjdY688Nyh' +
	'O4GF+d8eFVj3qZ0OD2cLIASho4fxvfgsADOFIlKtCnLf42EtnLwNmD3yira1WfvErcg8s17Fa5qU' +
	'E1PkAgMsjo5Tj43Qb9k8sXIdzaO6zObWl2+89nIcQHIcB8e2T9Xr9cl7/swxtlZmy6uSe2Afyyur' +
	'FFdLXEvvx3K5GCpX0I0lhBCJarX2w7HZo36p0+m4Gqb5vLy5ySP5Io4QXE6naLgkmltNWq0mtYCP' +
	'XGI3AAfyy4x63OwIaVUjl21JLglLsp3ZxxaMdr9lYYxEuTkcZdfQTvYk4tw/nSQcDpONj7Ph8yJb' +
	'FjOZK5tT0eihLy5cbMuSSyGj60GgDzAWJ/S3PG71QdWvHWi0TCWkeVvBYHD+us93ZV3z14M362cC' +
	'5Yo/ffazp6XjJ64J2zLF5cndacANFFKGkd/eZ9syb732rYMA0oCn96H8A/0ENrlijrmBAAAAAElF' +
	'TkSuQmCC';

	//graphic test sound
var stest = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA' +
	'IGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAANuSURBVHjaXNO9bxtl' +
	'AMfx3z3P2Wf77MTUzvklidOXNAMgRUqcCqQGMbEwgIqqspS5XVgQ4l9gQJUYKgESExKIDgy8DEBU' +
	'oENTSOIEpbYDJE5qR+f4bN+de8nd47t77mEoE9/t+wd8pM8+/QQAEAYh/DB4aczYbd/3rzDG0pZp' +
	'Gn/vNdca9cd3K3Pn28+/8CLCMIQQAmEYgHMOGQAkSYIA3g2D4KNCoRDLZDIYj8c46XZnCsXi0kxl' +
	'7p3Dg/33hRBPADgR53UhRAAAMqUUYcivy5R8vLq6CsYYnKcO8vkpLC4uolFvgHNeVBTli5gsY2Jy' +
	'MgJQOzps3eKcb8myLGeDILizvLSM2nYNRq+HicksEgkFqVQK1eoKEkkFD357AMs0cWl+nnDOq6qq' +
	'frO1ufEyYYy9deH8hZnd3V0YhoGZ2VmUyyWUyiWcy+Ww8cfvmL+8gIsXLyESApZlIa4oKBaLlVwu' +
	'f5tQQl6HBHSOOygWS8hMZJBOp5HNPgdZlqHrXTx6uI6VKytQVRW9kxPk83mEnKM8XX6NJJPJBdse' +
	'IRaLI5lKQokrSKkqkskUurqO6koVrueCUgpN0+A4DszhEJ12G5Zll2RCaYaxMSRCceYyREKCRGXE' +
	'4wp2ajV0dR17zSYWLi9A0zTsbNewubkBSihc1x2RwPd9QinGAcfY9xGPx5BOq8jlctA0DV9/9SX+' +
	'3N7CaGRDSSTAeQTbsjAa2TB6J2uy4zi6VijOJ2IUU+eySCoKLMtGRk3j+o0bgCThr2YDE5OT0HUd' +
	'nIfwXBeMeX3P9e7IpmU9LE9Pv0IpgWU/xcAaQZvKw/fHcBwJb167BqN3Fel0GsedDjzXg9E7MSMh' +
	'3qaEdIjv+/e6uh6VymV0e32ISECJybBtG8PhEO0nbXiei8Ggj+PjYwz6xg5j7FVCyH1JkkA459sH' +
	'rdY9SQhMl4oYe2cwLQu2baPfN2CaQ2haAb/+ch+Dfj80zeHNKIp2wyBAEAQgnuuCc/7eo/X1QyVG' +
	'UKnMIgo5GGNIqSrm5ubww/ffoVFvoNM5+lAI8TgIApydnsJxHNDq8hKiKHI45z/v7/+z6p6dFVRV' +
	'hUwp+oaBtZ9+RKNeR/vo8O7IHn1AKRV4JhCSJD3T+N83JIlcbR20bu01m2+EYVjxXM8/PXXqg77x' +
	'OWPet5RS/L9/BwDYGsraJJa3swAAAABJRU5ErkJggg==';

if (Body.match(/input name=\"sid_refresh_password/) || Doc.location.href.match(/sid_wrong\.php/)) {
	refresh_p();
} 
else {
	check_angriff();			// Angriff?
	check_other();				// anderes Ereignis?
	grafik();					// Soundsymbol anzeigen
}

// ---------------- Functions --------------------- //

	// testet auf Angriffe und merkt sich, welche bekannt sind
function check_angriff() {
	cwert = parseInt(GM_getValue(cn, 0),10);
	try {	// auf Angriffssymbol pruefen
		awert = Body.match(/graphic\/unit\/att\.png[?*][0-9*]" alt=""> \((\d+)\)/)[1];
	} catch(e) {awert = '';}

	if (awert) {
		var jetzt = zeit_holen();
		var barracks; var train;
		try {	// auf Kaserne pruefen
			barracks = Doc.location.href.match(/screen=barracks/)[0];
		} catch(e) {barracks = '';}

		try {	// Rekrutierenansicht pruefen
			train = Doc.location.href.match(/screen=train/)[0];
		} catch(e) {train = '';}

		if (cwert != awert) {
			var a1wert = awert;
			var c1wert = cwert;
			if (awert == '') a1wert="0"; 
			if (cwert == '') c1wert="0";
			if (parseInt(a1wert, 10) > parseInt(c1wert, 10)) {
				attacksound();
				GM_setValue("adelay"+welt+uv, jetzt);
				GM_setValue("known_"+welt+uv, 0);
			}
			else {
				if (sound3_on) {
					play_sound(sound3, sound3_vol);
				}}
			GM_setValue(cn, awert);
		}
		else if (train || barracks) {
			if (GM_getValue("known"+welt+uv, 0) == 0) {
				var adelay = GM_getValue("adelay"+welt+uv, 220255);
				if ((jetzt - adelay) > (60 * zeit)) {
					attacksound();
					GM_setValue("adelay"+welt+uv, jetzt);
				}}}
		else {
			GM_setValue("known"+welt+uv, 1);
		}}
	else if (cwert) {
		GM_deleteValue(cn);
		if (sound3_on) {
			play_sound(sound3, sound3_vol);
		}
		GM_setValue("known"+welt+uv, 1);
	}}

	// testet auf andere Ereignisse
function check_other() {
	check_new("igm", sound_nm, sound_nm_vol);		// IGM?
	check_new("report", sound_nr, sound_nr_vol);		// Bericht?
	check_new("forum", sound_nf, sound_nf_vol);		// Forum?
}

	// gibt's was neues ?
function check_new(name, soundfile, volume) {
	if (soundfile == "") {
		return;
	}
	var wert;
	var zeit1 = GM_getValue("alarm_"+name, 220255);
	var delay = GM_getValue("delay", 220255);
	var jetzt = zeit_holen();

	if ((jetzt - zeit1) > (60 * zeit)) {
		if ((name == "igm") && sound_nm_on) {
			try {
				wert = Body.match(/screen=mail"><img src="\/graphic\/new_mail\.png/)[0];
			} catch(e) {wert = '';}
			if (wert == '') {
				try {
					wert = Body.match(/screen=mail"><img src="graphic\/new_mail\.png/)[0];
				} catch(e) {wert = '';}
			}}
		else if ((name == "report") && sound_nr_on) {
			try {
				wert = Body.match(/graphic\/new_report\.png/)[0];
			} catch(e) {wert = '';}
		}
		else if ((name == "forum") && sound_nf_on && (dsphpbb == false)) {
			try {
				wert = Body.match(/graphic\/ally_forum\.png/)[0];
			} catch(e) {wert = '';}
		}
		else if ((name == "forum") && sound_nf_on && (dsphpbb == true)) {
			extforum(name, zeit, jetzt, soundfile, volume);
			wert = '';
		}

		if (wert) {
			if ((jetzt - delay) < 3) {	// falls innerhalb von 3 Sek schon ein Sound gespielt wurde
				if (zeit > 2) {
					interval = window.setInterval("check_other()",1500)
					//interval = window.setTimeout("Loc.reload()", (delay + 3 - jetzt) * 1000);
				}}
			else {
				if (zeit > 2) {
					//window.clearTimeout(interval);
					window.clearInterval(interval);
				}
				GM_setValue("alarm_"+name, jetzt);
				GM_setValue("delay", jetzt);
				play_sound(soundfile, volume);
			}}}}

	// neuer Eintrag im DSphpBB-Forum?
function extforum(name, zeit, jetzt, soundfile, volume){
	var a = Doc.getElementsByTagName("a");
	for(var i = 0; i < a.length-1; i++) {
		if (a[i].href == forum) {
			var img = a[i].firstChild;
			var pic2f = img.src;
			GM_xmlhttpRequest ({
				method:'GET',
				url: pic2f,
				onload: function(responseDetails) {
					if(responseDetails.status == 200) {
						var pic2 = responseDetails.responseText;
						var len2 = pic2.length;

						GM_xmlhttpRequest ({
							method:'GET',
							url: pic1f,
							onload: function(responseDetails) {
								if(responseDetails.status == 200) {
									var pic1 = responseDetails.responseText;
									var len1 = pic1.length;
									if (len1 == len2) {
										if (zeit > 2) {
											//window.clearTimeout(interval);
											window.clearInterval(interval);
										}
										GM_setValue("alarm_"+name, jetzt);
										GM_setValue("delay", jetzt);
										play_sound(soundfile, volume);
									}}}});}}});}}}
			
	// holt Zeitstempel
function zeit_holen() {
	var jetzt = new Date();
	return parseInt(jetzt.getTime() / 1000);
}

	// zeigt Optionen
function optionen() {
	var pos = Doc.getElementById("Glocke");
	var Optionen = Doc.createElement("table");
	Optionen.setAttribute("id","options");
	Optionen.setAttribute("class", "main");
	Optionen.setAttribute("style", "padding: 5px;");
	var tbody = Doc.createElement('tbody');
	var tr = Doc.createElement('tr');
	var td = Doc.createElement('td');
	var th = Doc.createElement('th');
	th.setAttribute("style", "text-align: center");
	th.appendChild(Doc.createTextNode(Text1)); 		// Title: Sound Options
	var table = Doc.createElement("table");
	table.setAttribute("class","vis");
	table.appendChild(th);
// Sound on
	var row0 = Doc.createElement("tr");
	var td0 = Doc.createElement("td");
	var check0 = Doc.createElement("input");
	check0.setAttribute("type","checkbox");
	check0.setAttribute("name","sound_on");
	check0.checked = sound_on;
	check0.addEventListener("change",function() {
		GM_setValue("sound_on", this.checked);
		sound_on = GM_getValue("sound_on");
	},false);
	td0.appendChild(check0);
	var img0 = Doc.createElement("img");
	img0.setAttribute("width", "17");
	img0.setAttribute("style", "vertical-align: bottom");
	img0.src = picsndon;
	td0.appendChild(img0);
	td0.appendChild(Doc.createTextNode(Text2));		// Sound an/aus
	row0.appendChild(td0);
	table.appendChild(row0);
// repeat time
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row1 = Doc.createElement("tr");
	var td1 = Doc.createElement("td");
	var check1 = Doc.createElement("input");
	check1.setAttribute("type","text");
	check1.setAttribute("style", "text-align: center");
	check1.setAttribute("name", "zeitspanne");
 	check1.value = zeit;
	check1.setAttribute("size","1");
	check1.setAttribute("maxlength", "2");
	check1.setAttribute("method", "post");
	check1.setAttribute("enctype", "multipart/form-data");
	check1.addEventListener("change",function() {
		if (this.value < 1) {
			this.value = 10;
		} 
		GM_setValue("zeit", parseInt(this.value, 10));
		zeit = GM_getValue("zeit");
	},false);
	td1.appendChild(Doc.createTextNode(Text3));
	td1.appendChild(check1);
	td1.appendChild(Doc.createTextNode(Text14));
	row1.appendChild(td1);
	table.appendChild(row1);
// inc main account
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row5 = Doc.createElement("tr");
	var td5 = Doc.createElement("td");
	check5 = Doc.createElement("input");
	check5.setAttribute("type", "checkbox");
	check5.setAttribute("name", "sound1_on");
	check5.checked = sound1_on;
	check5.addEventListener("change",function() {
		GM_setValue("sound1_on", this.checked);
		sound1_on = GM_getValue("sound1_on");
	},false);
	td5.appendChild(check5);
	var img5 = Doc.createElement("img");
	img5.setAttribute("width", "17");
	img5.src = "./graphic/unit/att.png";
	td5.appendChild(img5);
	var check51 = Doc.createElement("input");
	check51.setAttribute("type","text");
	check51.setAttribute("style", "text-align: center");
	check51.setAttribute("name", "sound1_vol");
	check51.value = sound1_vol;
	check51.setAttribute("size", "2");
	check51.setAttribute("maxlength", "3");
	check51.setAttribute("method", "post");
	check51.setAttribute("enctype", "multipart/form-data");
	check51.addEventListener("change",function() {
		sound1_vol = check_vol("sound1_vol", this.value);
	},false);
	td5.appendChild(Doc.createTextNode(Text4)); 		// volume
	td5.appendChild(check51);
	td5.appendChild(Doc.createTextNode("% "));
	var test5 = Doc.createElement("input");
	test5.setAttribute("type","image");
	test5.setAttribute("style", "vertical-align: middle");
	test5.setAttribute("src", stest);
	test5.setAttribute("title", "Testar Som");
	test5.addEventListener("click",function() {
		play_sound(sound1, sound1_vol);
	},true);
	td5.appendChild(test5);
	td5.appendChild(Doc.createTextNode(Text5));		// attack main account sound url
	row5.appendChild(td5);
	table.appendChild(row5);
	var row50 = Doc.createElement("tr");
	var td50 = Doc.createElement("td");
	var check50 = Doc.createElement("input");
	check50.setAttribute("type","text");
	check50.setAttribute("style", "text-align: left");
	check50.setAttribute("name", "sound1");
	check50.value = sound1;
	check50.setAttribute("size","92");
	check50.setAttribute("maxlength", "200");
	check50.setAttribute("method", "post");
	check50.setAttribute("enctype", "multipart/form-data");
	check50.addEventListener("change",function() {
		sound1 = GM_test("sound1", this.value);
	},false);
	td50.appendChild(check50);
	row50.appendChild(td50);
	table.appendChild(row50);
// inc hr account
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row6 = Doc.createElement("tr");
	var td6 = Doc.createElement("td");
	check6 = Doc.createElement("input");
	check6.setAttribute("type", "checkbox");
	check6.setAttribute("name", "sound2_on");
	check6.checked = sound2_on;
	check6.addEventListener("change",function() {
		GM_setValue("sound2_on", this.checked);
		sound2_on = GM_getValue("sound2_on");
	},false);
	td6.appendChild(check6);
	var img6 = Doc.createElement("img");
	img6.setAttribute("width", "17");
	img6.src = "./graphic/unit/att.png";
	td6.appendChild(img6);
	var check61 = Doc.createElement("input");
	check61.setAttribute("type","text");
	check61.setAttribute("style", "text-align: center");
	check61.setAttribute("name", "sound2_vol");
	check61.value = sound2_vol;
	check61.setAttribute("size", "2");
	check61.setAttribute("maxlength", "3");
	check61.setAttribute("method", "post");
	check61.setAttribute("enctype", "multipart/form-data");
	check61.addEventListener("change",function() {
		sound2_vol = check_vol("sound2_vol", this.value);
	},false);
	td6.appendChild(Doc.createTextNode(Text4)); 		// volume
	td6.appendChild(check61);
	td6.appendChild(Doc.createTextNode("% "));
	var test6 = Doc.createElement("input");
	test6.setAttribute("type","image");
	test6.setAttribute("style", "vertical-align: middle");
	test6.setAttribute("src", stest);
	test6.setAttribute("title", "Testar Som");
	test6.addEventListener("click",function() {
		play_sound(sound2, sound2_vol);
	},true);
	td6.appendChild(test6);
	td6.appendChild(Doc.createTextNode(Text6));  	//attack HR-account sound url
	row6.appendChild(td6);
	table.appendChild(row6);
	row6.appendChild(td6);
	table.appendChild(row6);
	var row60 = Doc.createElement("tr");
	var td60 = Doc.createElement("td");
	var check60 = Doc.createElement("input");
	check60.setAttribute("type","text");
	check60.setAttribute("style", "text-align: left");
	check60.setAttribute("name", "sound2");
	check60.value = sound2;
	check60.setAttribute("size","92");
	check60.setAttribute("maxlength", "200");
	check60.setAttribute("method", "post");
	check60.setAttribute("enctype", "multipart/form-data");
	check60.addEventListener("change",function() {
		sound2 = GM_test("sound2", this.value);
	},false);
	td60.appendChild(check60);
	row60.appendChild(td60);
	table.appendChild(row60);
// loop incs sound
	var row8 = Doc.createElement("tr");
	var td8 = Doc.createElement("td");
	var check8 = Doc.createElement("input");
	check8.setAttribute("type","checkbox");
	check8.setAttribute("name","loop");
	check8.checked = GM_getValue("loop");
	check8.addEventListener("change",function() {
		GM_setValue("loop", this.checked); 
		loop = GM_getValue("loop");
	},false);
	td8.appendChild(check8);
	var img8 = Doc.createElement("img");
	img8.src = "./graphic/unit/att.png";
	td8.appendChild(img8);
	td8.appendChild(Doc.createTextNode(Text7));	// loop attack sound?
	row8.appendChild(td8);
	table.appendChild(row8);
// inc arrived
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row7 = Doc.createElement("tr");
	var td7 = Doc.createElement("td");
	check7 = Doc.createElement("input");
	check7.setAttribute("type", "checkbox");
	check7.setAttribute("name", "sound3_on");
	check7.checked = sound3_on;
	check7.addEventListener("change",function() {
		GM_setValue("sound3_on", this.checked);
		sound3_on = GM_getValue("sound3_on");
	},false);
	td7.appendChild(check7);
	var img7 = Doc.createElement("img");
	img7.setAttribute("width", "17");
	img7.src = "./graphic/command/cancel.png";
	td7.appendChild(img7);
	var check71 = Doc.createElement("input");
	check71.setAttribute("type","text");
	check71.setAttribute("style", "text-align: center");
	check71.setAttribute("name", "sound3_vol");
	check71.value = sound3_vol;
	check71.setAttribute("size", "2");
	check71.setAttribute("maxlength", "3");
	check71.setAttribute("method", "post");
	check71.setAttribute("enctype", "multipart/form-data");
	check71.addEventListener("change",function() {
		sound3_vol = check_vol("sound3_vol", this.value);
	},false);
	td7.appendChild(Doc.createTextNode(Text4)); 		// volume
	td7.appendChild(check71);
	td7.appendChild(Doc.createTextNode("% "));
	var test7 = Doc.createElement("input");
	test7.setAttribute("type","image");
	test7.setAttribute("style", "vertical-align: middle");
	test7.setAttribute("src", stest);
	test7.setAttribute("title", "Testar Som");
	test7.addEventListener("click",function() {
		play_sound(sound3, sound3_vol);
	},true);
	td7.appendChild(test7);
	td7.appendChild(Doc.createTextNode(Text8));		// attack end sound url
	row7.appendChild(td7);
	table.appendChild(row7);
	var row70 = Doc.createElement("tr");
	var td70 = Doc.createElement("td");
	var check70 = Doc.createElement("input");
	check70.setAttribute("type","text");
	check70.setAttribute("style", "text-align: left");
	check70.setAttribute("name", "sound3");
	check70.value = sound3;
	check70.setAttribute("size","92");
	check70.setAttribute("maxlength", "200");
	check70.setAttribute("method", "post");
	check70.setAttribute("enctype", "multipart/form-data");
	check70.addEventListener("change",function() {
		sound3 = GM_test("sound3", this.value);
	},false);
	td70.appendChild(check70);
	row70.appendChild(td70);
	table.appendChild(row70);
// igm
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row4 = Doc.createElement("tr");
	var td4 = Doc.createElement("td");
	check4 = Doc.createElement("input");
	check4.setAttribute("type", "checkbox");
	check4.setAttribute("name", "sound_nm_on");
	check4.checked = sound_nm_on;
	check4.addEventListener("change",function() {
		GM_setValue("sound_nm_on", this.checked);
		sound_nm_on = GM_getValue("sound_nm_on");
	},false);
	td4.appendChild(check4);
	var img4 = Doc.createElement("img");
	img4.setAttribute("width", "17");
	img4.src = "./graphic/new_mail.png";
	td4.appendChild(img4);
	var check41 = Doc.createElement("input");
	check41.setAttribute("type","text");
	check41.setAttribute("style", "text-align: center");
	check41.setAttribute("name", "sound_nm_vol");
	check41.value = sound_nm_vol;
	check41.setAttribute("size", "2");
	check41.setAttribute("maxlength", "3");
	check41.setAttribute("method", "post");
	check41.setAttribute("enctype", "multipart/form-data");
	check41.addEventListener("change",function() {
		sound_nm_vol = check_vol("sound_nm_vol", this.value);
	},false);
	td4.appendChild(Doc.createTextNode(Text4)); 		//volume
	td4.appendChild(check41);
	td4.appendChild(Doc.createTextNode("% "));
	var test4 = Doc.createElement("input");
	test4.setAttribute("type","image");
	test4.setAttribute("style", "vertical-align: middle");
	test4.setAttribute("src", stest);
	test4.setAttribute("title", "Testar Som");
	test4.addEventListener("click",function() {
		play_sound(sound_nm, sound_nm_vol);
	},true);
	td4.appendChild(test4);
	td4.appendChild(Doc.createTextNode(Text9));		// message sound url
	row4.appendChild(td4);
	table.appendChild(row4);
	var row40 = Doc.createElement("tr");
	var td40 = Doc.createElement("td");
	var check40 = Doc.createElement("input");
	check40.setAttribute("type","text");
	check40.setAttribute("style", "text-align: left");
	check40.setAttribute("name", "sound_nm");
	check40.value = sound_nm;
	check40.setAttribute("size","92");
	check40.setAttribute("maxlength", "200");
	check40.setAttribute("method", "post");
	check40.setAttribute("enctype", "multipart/form-data");
	check40.addEventListener("change",function() {
		sound_nm = GM_test("sound_nm", this.value);
	},false);
	td40.appendChild(check40);
	row40.appendChild(td40);
	table.appendChild(row40);
// report
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row3 = Doc.createElement("tr");
	var td3 = Doc.createElement("td");
	check3 = Doc.createElement("input");
	check3.setAttribute("type", "checkbox");
	check3.setAttribute("name", "sound_nr_on");
	check3.checked = sound_nr_on;
	check3.addEventListener("change",function() {
		GM_setValue("sound_nr_on", this.checked);
		sound_nr_on = GM_getValue("sound_nr_on");
	},false);
	td3.appendChild(check3);
	var img3 = Doc.createElement("img");
	img3.setAttribute("width", "17");
	img3.src = "./graphic/new_report.png";
	td3.appendChild(img3);
	var check31 = Doc.createElement("input");
	check31.setAttribute("type","text");
	check31.setAttribute("style", "text-align: center");
	check31.setAttribute("name", "sound_nr_vol");
	check31.value = sound_nr_vol;
	check31.setAttribute("size", "2");
	check31.setAttribute("maxlength", "3");
	check31.setAttribute("method", "post");
	check31.setAttribute("enctype", "multipart/form-data");
	check31.addEventListener("change",function() {
		sound_nr_vol = check_vol("sound_nr_vol", this.value);
	},false);
	td3.appendChild(Doc.createTextNode(Text4)); 		// volume
	td3.appendChild(check31);
	td3.appendChild(Doc.createTextNode("% "));
	var test3 = Doc.createElement("input");
	test3.setAttribute("type","image");
	test3.setAttribute("style", "vertical-align: middle");
	test3.setAttribute("src", stest);
	test3.setAttribute("title", "Testar Som");
	test3.addEventListener("click",function() {
		play_sound(sound_nr, sound_nr_vol);
	},true);
	td3.appendChild(test3);
	td3.appendChild(Doc.createTextNode(Text10));		// report sound url
	row3.appendChild(td3);
	table.appendChild(row3);
	var row30 = Doc.createElement("tr");
	var td30 = Doc.createElement("td");
	var check30 = Doc.createElement("input");
	check30.setAttribute("type","text");
	check30.setAttribute("style", "text-align: left");
	check30.setAttribute("name", "sound_nr");
	check30.value = sound_nr;
	check30.setAttribute("size","92");
	check30.setAttribute("maxlength", "200");
	check30.setAttribute("method", "post");
	check30.setAttribute("enctype", "multipart/form-data");
	check30.addEventListener("change",function() {
		sound_nr = GM_test("sound_nr", this.value);
	},false);
	td30.appendChild(check30);
	row30.appendChild(td30);
	table.appendChild(row30);
// forum
	var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row2 = Doc.createElement("tr");
	var td2 = Doc.createElement("td");
	var check2 = Doc.createElement("input");
	check2.setAttribute("type", "checkbox");
	check2.setAttribute("name", "sound_nf_on");
	check2.checked = sound_nf_on;
	check2.addEventListener("change",function() {
		GM_setValue("sound_nf_on", this.checked);
		sound_nf_on = GM_getValue("sound_nf_on");
	},false);
	td2.appendChild(check2);
	var img2 = Doc.createElement("img");
	img2.setAttribute("width", "16");
	img2.src = "./graphic/ally_forum.png";
	td2.appendChild(img2);
	var check21 = Doc.createElement("input");
	check21.setAttribute("type","text");
	check21.setAttribute("style", "text-align: center");
	check21.setAttribute("name", "sound_nf_vol");
	check21.value = sound_nf_vol;
	check21.setAttribute("size", "2");
	check21.setAttribute("maxlength", "3");
	check21.setAttribute("method", "post");
	check21.setAttribute("enctype", "multipart/form-data");
	check21.addEventListener("change",function() {
		sound_nf_vol = check_vol("sound_nf_vol", this.value);
	},false);
	td2.appendChild(Doc.createTextNode(Text4)); 		// volume
	td2.appendChild(check21);
	td2.appendChild(Doc.createTextNode("% "));
	var test2 = Doc.createElement("input");
	test2.setAttribute("type","image");
	test2.setAttribute("style", "vertical-align: middle");
	test2.setAttribute("src", stest);
	test2.setAttribute("title", "Testar Som");
	test2.addEventListener("click",function() {
		play_sound(sound_nf, sound_nf_vol);
	},true);
	td2.appendChild(test2);
	td2.appendChild(Doc.createTextNode(Text11));		// forum sound url
	row2.appendChild(td2);
	table.appendChild(row2);
	var row20 = Doc.createElement("tr");
	var td20 = Doc.createElement("td");
	var check20 = Doc.createElement("input");
	check20.setAttribute("type","text");
	check20.setAttribute("style", "text-align: left");
	check20.setAttribute("name", "sound_nf");
	check20.value = sound_nf;
	check20.setAttribute("size","92");
	check20.setAttribute("maxlength", "200");
	check20.setAttribute("method", "post");
	check20.setAttribute("enctype", "multipart/form-data");
	check20.addEventListener("change",function() {
		sound_nf = GM_test("sound_nf", this.value);
	},false);
	td20.appendChild(check20);
	row20.appendChild(td20);
	table.appendChild(row20);
//forum DSphpBB
	if (dsphpbb) {
		var row10 = Doc.createElement("tr");
		var td10 = Doc.createElement("td");
		var check10 = Doc.createElement("input");
		check10.setAttribute("type","text");
		check10.setAttribute("style", "text-align: left");
		check10.setAttribute("name", "forum");
 		check10.value = forum;
		check10.setAttribute("size","65");
		check10.setAttribute("maxlength", "200");
		check10.setAttribute("method", "post");
		check10.setAttribute("enctype", "multipart/form-data");
		check10.addEventListener("change",function() {
			forum = GM_test("dsphpbb_adr"+welt+uv, this.value);
		},false);
		td10.appendChild(Doc.createTextNode(Text12));	// forum url
		td10.appendChild(check10);
		var img10a = Doc.createElement("img");
		img10a.setAttribute("width", "17");
		img10a.src = forum + "images/ds/ds_nonewpost.gif";
		var img10b = Doc.createElement("img");
		img10b.setAttribute("width", "17");
		img10b.src = forum + "images/ds/ds_newpost.gif";
		td10.appendChild(Doc.createTextNode(" "));
		td10.appendChild(img10a);
		td10.appendChild(Doc.createTextNode(" "));
		td10.appendChild(img10b);
		row10.appendChild(td10);
		table.appendChild(row10);
	}
// password refresh sound
	rowx = Doc.createElement("tr");
	tdx = Doc.createElement("td");
	rowx.appendChild(tdx);
	table.appendChild(rowx);
	var row64 = Doc.createElement("tr");
	var td64 = Doc.createElement("td");
	var check66 = Doc.createElement("input");
	check66.setAttribute("type", "checkbox");
	check66.setAttribute("name", "sound4_on");
	check66.checked = sound4_on;
	check66.addEventListener("change", function () {
		GM_setValue("sound4_on", this.checked);
		sound4_on = GM_getValue("sound4_on");
	}, false);
	td64.appendChild(check66);
	var img64 = Doc.createElement("img");
	img64.setAttribute("width", "17");
	img64.src = "./graphic/rabe.png";
	td64.appendChild(img64);
	var check67 = Doc.createElement("input");
	check67.setAttribute("type", "text");
	check67.setAttribute("style", "text-align: center");
	check67.setAttribute("name", "sound4_vol");
	check67.value = sound4_vol;
	check67.setAttribute("size", "2");
	check67.setAttribute("maxlength", "3");
	check67.setAttribute("method", "post");
	check67.setAttribute("enctype", "multipart/form-data");
	check67.addEventListener("change", function () {
		sound4_vol = check_vol("sound4_vol", this.value);
	}, false);
	td64.appendChild(Doc.createTextNode(Text4)); 		// volume
	td64.appendChild(check67);
	td64.appendChild(Doc.createTextNode("% "));
	var test68 = Doc.createElement("input");
	test68.setAttribute("type", "image");
	test68.setAttribute("style", "vertical-align: middle");
	test68.setAttribute("src", stest);
	test68.setAttribute("title", "Testar Som");
	test68.addEventListener("click", function () {
		play_sound(sound4, sound4_vol);
	}, true);
	td64.appendChild(test68);
	td64.appendChild(Doc.createTextNode(Text13));  	//pw refresh sound url
	row64.appendChild(td64);
	table.appendChild(row64);
	row64.appendChild(td64);
	table.appendChild(row64);
	var row65 = Doc.createElement("tr");
	var td65 = Doc.createElement("td");
	var check65 = Doc.createElement("input");
	check65.setAttribute("type", "text");
	check65.setAttribute("style", "text-align: left");
	check65.setAttribute("name", "sound4");
	check65.value = sound4;
	check65.setAttribute("size", "92");
	check65.setAttribute("maxlength", "200");
	check65.setAttribute("method", "post");
	check65.setAttribute("enctype", "multipart/form-data");
	check65.addEventListener("change", function () {
		sound4 = GM_test("sound4", this.value);
	}, false);
	td65.appendChild(check65);
	row65.appendChild(td65);
	table.appendChild(row65);

var rowx = Doc.createElement("tr");
	var tdx = Doc.createElement("td");
rowx.appendChild(tdx);
	table.appendChild(rowx);
	tdx.appendChild(Doc.createTextNode(Text15));

// submit
	var row9 = Doc.createElement("p");
	row9.setAttribute("align", "right");
	var check9 = Doc.createElement("input");
	check9.setAttribute("type","submit");
	check9.addEventListener("click",function() {
		Loc.reload();
	},false);
	row9.appendChild(check9);
	table.appendChild(row9);
	td.appendChild(table);
	tr.appendChild(td);
	tbody.appendChild(tr);
	Optionen.appendChild(tbody);
	pos.replaceChild(Optionen, pos.firstChild);
}

function check_vol(name, wert) {
	wert = parseInt(wert, 10);
	if (isNaN(wert)) {
		wert = 70;
	}
	else if ((wert <= 0) || (wert >= 100)) {
		wert = 100;
	}
	else if (wert < 5) {
		wert = 10;
	}
	GM_setValue(name, wert);
	return wert;
}

function GM_test(name, url) {
	var test;
	var GM = GM_getValue(name);
	if (url == "0") {
		if (GM != "") {
			GM = http(name, GM);
			if (GM) {
				return GM;
			}}
		url = "";
	}
	else	{
		if (url != "") {
			test = http(name, url);
			if (test) {
				GM_setValue(name, test);
				return test;
			}}
		url = "";
	}

	if (url == "")	{
		switch (name)
		{
			case "dsphpbb_adr"+welt+uv:
				url = "";
				break;
			case "sound_nf":
				url = "http://www.wav-sounds.com/vehicle/train.wav";
				break;
			case "sound_nr":
				url = "http://www.pacdv.com/sounds/interface_sound_effects/sound107.wav";
				break;
			case "sound_nm":
				url = "http://www.wav-sounds.com/mail/mailbox.wav";
				break;
			case "sound1":
				url = "http://www.policeinterceptor.com/sounds/newgq.wav";
				break;
			case "sound2":
				url = "http://www.acoustica.com/sounds/user_requests/policesiren2.wav";
				break;
			case "sound3":
				url = "http://www.mediacollege.com/downloads/sound-effects/star-trek/tos/tos-intercom.wav";
				break;
			case "sound4":
				url = "http://www.mediacollege.com/downloads/sound-effects/star-trek/voy/voy-comp-01.wav";
				break;
			default:
				return "";
				break;
		}
		GM_setValue(name, url);
		return url;
	}
	else {
		test = http(name, url);
		if (test) {
			GM_setValue(name, test);
			return test;
		}}}

function http(name, url){
	var test
	try {
		test = url.match(/http\:\/\//)[0];
	} catch(e) {test = '';}

	if (test) {
		if (name == "dsphpbb_adr"+welt+uv) {
			url = test_slash(url);
		}
		return url;
	}
	else {
		if (url && url.length > 14) {
			if (name == "dsphpbb_adr"+welt+uv) {
				url = test_slash(url);
			}
			url = "http://"+url;
			return url;
		}}
	return false;
}

function test_slash(url){
	if  (url) {
		if (url.substr(1,url.length) != "/"){url = url + "/"; }
	}
	return url;
}

	// bindet Grafik Glocke ein
function grafik() {
	var test = Body.match(/navi-border/)[0]; 	// DS-Version >= 5.x?
	var glocke = Doc.createElement('td');
	glocke.setAttribute("id", "Glocke");
	glocke.setAttribute("align", "center");
	var table = Doc.createElement('table');
	table.setAttribute("class", "box");
	table.setAttribute("cellspacing", "0");
	if (Body.match(/itlogge/)) test=""; 
	var tbody = Doc.createElement('tbody');
	var tr = Doc.createElement('tr');
	var td = Doc.createElement('td');
	td.setAttribute("width", "16");
	td.setAttribute("height","20");
	var a = Doc.createElement('a');
	a.setAttribute("id", "Alarm");
	a.setAttribute("href", "javascript: ");
	a.addEventListener("click", function() {
		if (test) {
			rtable.setAttribute("class", "content-border");
		} optionen();
	}, false);

	var img = Doc.createElement('img');
	img.setAttribute("title", "Configurações do Som");
	if (sound_on) {
		img.setAttribute("alt", "on");
		img.src = picsndon;
	}
	else {
		img.setAttribute("alt", "off");
		img.src = picsndoff;
	}
	a.appendChild(img);
	td.appendChild(a);
	tr.appendChild(td);
	tbody.appendChild(tr);
	table.appendChild(tbody);
	glocke.appendChild(table);

	if (test) {		// is DS-Version >= 5.x?
		var glocke1 = Doc.createElement('td');
		glocke1.setAttribute("align", "center");
		var rtable = Doc.createElement('table');
		rtable.setAttribute("style", "border-collapse: collapse;");
		rtable.setAttribute("class", "navi-border");
		var rtbody = Doc.createElement('tbody');
		var rtr = Doc.createElement('tr');
		rtr.appendChild(glocke);
		rtbody.appendChild(rtr);
		rtable.appendChild(rtbody);
		glocke1.appendChild(rtable);
		var line = Doc.getElementsByTagName("hr");
		var pos1 = line[0].nextSibling.nextSibling.firstChild.nextSibling.firstChild;
		var pos2 = pos1.firstChild.nextSibling.nextSibling.nextSibling;
		pos1.insertBefore(glocke1, pos2);
	}
	else {
		var pos = Doc.getElementsByClassName("box");
		var pos1 = pos[0].parentNode.parentNode;
		var pos2 = pos1.firstChild;
		pos1.insertBefore(glocke, pos2);
	}}

function attacksound() {
	loop = GM_getValue("loop", false);
	if (uv) {
		if (sound2_on) { play_sound(sound2, sound2_vol);}
	}
	else {
		if (sound1_on) { play_sound(sound1, sound1_vol);}
	}
	loop = false;
}

	// spielt Sound
function play_sound(soundfile, volume) {
	if (soundfile == "") return;
	volume = parseInt(volume, 10);
	if (sound_on) {
		var arr = soundfile.split('.');
		var typ = arr[arr.length-1];
		var buffer = Doc.createElement('embed');
		buffer.setAttribute("title", "Sound");
		buffer.setAttribute("src", soundfile);
		buffer.setAttribute("autostart", "true");
		buffer.setAttribute("autoplay", "true");
		buffer.setAttribute("cache", "true");
		buffer.setAttribute("hidden", "true");
		buffer.setAttribute("width", "0");
		buffer.setAttribute("height", "0");
		buffer.setAttribute("loop", loop);
		buffer.setAttribute("volume", volume);
		if (typ == 'wav') buffer.setAttribute("type", 'audio/x-wav');
		else if (typ == 'midi') buffer.setAttribute("type", 'audio/mid');
		else if (typ == 'mp3') buffer.setAttribute("type", 'audio/mpeg');
		else if (typ == 'wma') buffer.setAttribute("type", 'audio/x-ms-wma');
		Doc.body.appendChild(buffer);
	}}

function refresh_p() {
	if (sound4_on) {
		loop = GM_getValue("loop", true);
		play_sound(sound4, sound4_vol);
	}
	loop = false;
}

	// sucht Classnames
function getElementsByClassName(classname) {
	var arr = [];
	var reg = new RegExp('\\b' + classname + '\\b');
	var knoten = Doc.getElementsByTagName("body")[0];
	var elemente = knoten.getElementsByTagName("*");
	for(var i=0; i<elemente.length; i++) {
		if (reg.test(elemente[i].className)) {
			arr.push(elemente[i]);
		}}
	return arr;
}}) ()

// ------------------------------------------------------------------------
// Movimentação do mapa "estilo CS"
//-------------------------------------------------------------------------
 if(location.href.match( /screen=map/)){

var world = location.href.split(".")[0].split("//")[1];

function showLegend(left,right,up,down,language){
	left = String.fromCharCode(left);
	right = String.fromCharCode(right);
	up = String.fromCharCode(up);
	down = String.fromCharCode(down);
	var ger = (language=="pt-br");
	
	var table = document.createElement("table");
	table.setAttribute("style","border: 1px solid; background-color: rgb(221, 204, 170); margin: 20px 0px 0px 4px; width:240px");
	var tr = document.createElement("tr");
	var th = document.createElement("th");
	th.setAttribute("style","font-size:12px;");
	th.innerHTML = "Mover mapa com o teclado";
	var td0 = document.createElement("td");
	td0.setAttribute("style","font-size:10px;");
	tr.appendChild(th);
	tr.appendChild(td0);
	table.appendChild(tr);
	
	var tr2 = document.createElement("tr");
	var tr3 = document.createElement("tr");
	var tr4= document.createElement("tr");
	for(var i=1;i<=5;i++){
		eval('var td'+i+' = document.createElement("td")');
		eval('td'+i+'.setAttribute("style","font-size:10px")');
	}
	td1.innerHTML = ("Norte")+": <strong>"+up+"</strong>";
	td2.innerHTML = ("Leste")+": <strong>"+right+"</strong>";
	td3.innerHTML = ("Sul")+": <strong>"+down+"</strong>";
	td4.innerHTML = ("Oeste")+": <strong>"+left+"</strong>";
	tr2.appendChild(td1);
	tr2.appendChild(td2);
	tr3.appendChild(td3);
	tr3.appendChild(td4);
	tr4.appendChild(td5);
	table.appendChild(tr2);
	table.appendChild(tr3);
	table.appendChild(tr4);
	
	var lgTable = document.getElementsByTagName("table");
	if(document.body.innerHTML.match(/graphic\/villages\.png/)){
		lgTable = lgTable[lgTable.length-2];
	}
	else{
		lgTable = lgTable[lgTable.length-1];
	}
	lgTable.parentNode.insertBefore(table,lgTable.nextSibling);
}

function clearSettings(){
	GM_deleteValue("DS_"+world+"_left_ASCII");
	GM_deleteValue("DS_"+world+"_right_ASCII");
	GM_deleteValue("DS_"+world+"_up_ASCII");
	GM_deleteValue("DS_"+world+"_down_ASCII");
	GM_deleteValue("DS_language");
	location.href = location.href.substr(0,location.href.indexOf("clearSettings"));
}

(function main(){

if(location.href.match(/clearSettings/)){
	clearSettings();
	return;
}

var cook_left = GM_getValue("DS_"+world+"_left_ASCII");
var cook_right = GM_getValue("DS_"+world+"_right_ASCII");
var cook_up = GM_getValue("DS_"+world+"_up_ASCII");
var cook_down = GM_getValue("DS_"+world+"_down_ASCII");
var language = GM_getValue("DS_language");

if(language == "pt-br"){	// Português Brasileiro

}

if(!(cook_left && cook_right && cook_up && cook_down)){
	if(confirm(CONF_KEYS)){
		var left_ASCII, right_ASCII, up_ASCII, down_ASCII, vals_ASCII="";
		alert(MSG_LEFT);
		left_ASCII = true;
		document.addEventListener("keypress",function(event){
			var key = event.which;
			if(key==0){ alert(KEY_ERROR); return; }
			if(vals_ASCII.indexOf(key) != -1){ alert(KEY_ERROR2); return; }
			
			if(left_ASCII===true){
				left_ASCII = key;
				vals_ASCII += left_ASCII.toString()+",";
				right_ASCII = true;
				alert(MSG_RIGHT);
			}
			else if(right_ASCII===true){
				right_ASCII = key;
				vals_ASCII += right_ASCII.toString()+",";
				up_ASCII = true;
				alert(MSG_UP);
			}
			else if(up_ASCII===true){
				up_ASCII = key;
				vals_ASCII += up_ASCII.toString()+",";
				down_ASCII = true;
				alert(MSG_DOWN);
			}
			else if(down_ASCII===true){
				down_ASCII = key;
				alert("مفاتيح قراءة وقد تم بنجاح.");
				GM_setValue("DS_"+world+"_left_ASCII",left_ASCII);
				GM_setValue("DS_"+world+"_right_ASCII",right_ASCII);
				GM_setValue("DS_"+world+"_up_ASCII",up_ASCII);
				GM_setValue("DS_"+world+"_down_ASCII",down_ASCII);
				location.href = location.href;
			}
			else;
		},false);
	}
	else{
		GM_setValue("DS_"+world+"_left_ASCII",97);
		GM_setValue("DS_"+world+"_right_ASCII",100);
		GM_setValue("DS_"+world+"_up_ASCII",119);
		GM_setValue("DS_"+world+"_down_ASCII",115);
		location.href = location.href;
	}
}
else{
	var left = cook_left;
	var right = cook_right;
	var up = cook_up;
	var down = cook_down;
	showLegend(left,right,up,down,language);
	document.addEventListener("keypress",function(event){
		var key = event.which;
		switch(key){
			case left: location.href = "javascript:startMapScroll('west')"; break;
			case right: location.href = "javascript:startMapScroll('east')"; break;
			case up: location.href = "javascript:startMapScroll('north')"; break;
			case down: location.href = "javascript:startMapScroll('south')"; break;
			default: break;
		}
	},true);
}
})()};