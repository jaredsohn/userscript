/* ============================================
KingsAge Toolbox is available at
http://userscripts.org/scripts/show/804026
Development and scripting: Sebastian Neef
Design and stylesheets: Steffen Lilie
Copyright (c) 2010-2011. All rights reserved.
Original graphics used and modified with kind permission of the owner: http://www.kingsage.de
=============================================== */

// ==UserScript==
// @name           KingsAge Toolbox
// @namespace      All
// @include        http://*.kingsage.*/game.php*
// @exclude        http://board.kingsage.*/*
// @exclude        http://board.kingsage.*/*
// @exclude        http://s*.kingsage.*/forum.php*
// @exclude        http://s*.kingsage.*/popup.php*
// @exclude        http://s*.kingsage.*/map.php*
// @exclude	   http://support.kingsage.*/
// @version	   3.54
// ==/UserScript==

/************Variablenprüfung und Initialisierung ************************/
checkgm_vars()
var scriptVersion=3.54
var scriptUpdateText='Some bugfixes - no new functions (21.04.12 - dd/mm/yy)';
var autoremail="toolbox@gehaxelt.in"
var uorglink="http://userscripts.org/scripts/show/80402"
var string,info, urls
initurls()
initlang()
var lastindex=1000;
var market=/s=build_market/
var pnmes=/&s=messages&m=in&/
var tools=/&s=tools/
var bbcode=/&amp;s=build_barracks&amp;m=sim_battle&amp;/
var citinfo=/&s=info_village/
var recruit=/s=build_barracks&m=recruit/
var map=/&s=map/
mode=true
var body=document.getElementsByTagName("body")[0]
dragObj = new Object(), x, y;
dragObj.zIndex = 1000;

createtoolboxdiv()
setcss()
createicondiv()
checkupdate()
deliframe()

firstrun()

window.addEventListener('load',function() {notepad();chat();createsettingsico();settings();calcresources();count();multimarket();quotetag();getLastID();},true)
window.addEventListener('keydown', function(a){hotkeysdown(a);},true);
/************Variablenprüfung und Initialisierung ************************/

/************Settingsbox**************************************************/
function createsettingsico() {
	var settingspic=document.createElement("img")
	settingspic.setAttribute("id","settingspic")
	settingspic.setAttribute("src",urls["img"]["settico"])
	settingspic.setAttribute("title","ToolBox")
	ID("settingsico").appendChild(settingspic)
	ID("settingspic").addEventListener('click',function() {showobj("settings")},true)
}
//Settingsbox erstellen
function settings() {
	if(!ID("settingsdiv")) {
		var settingsdiv=document.createElement("div")
		settingsdiv.setAttribute("id","settingsdiv")
		settingsdiv.setAttribute("class","topbox")
		x=GM_getValue("settxkor")
		y=GM_getValue("settykor")
		if (y < 0 || y > window.innerHeight) {
			y=1
		}
		if (x < 0 || x > (window.innerWidth-25)) {
			x=1
		}
		settingsdiv.setAttribute("style","top:"+y+"px;left:"+x+"px;")
		optionhtml="<option value='none' >"+string["op_none"]+"</option><option value='&s=build_main'>"+string["op_burg"]+"</option><option value='&s=build_market'>"+string["op_markt"]+"</option><option value='&s=build_market&m=accept'>"+string["op_markta"]+"</option><option value='&s=build_barracks'>"+string["op_bar"]+"</option><option value='&s=build_barracks&m=recruit'>"+string["op_baraus"]+"</option><option value='&s=build_barracks&m=research'>"+string["op_barfor"]+"</option><option value='&s=build_snob'>"+string["op_snob"]+"</option><option value='&s=build_smith'>"+string["op_gold"]+"</option><option value='&s=map'>"+string["op_map"]+"</option>"
		var html=' \
		<div class="move" id="settingsmove"><span class="windowtitel">'+string['tit_settings']+'</span><span class="infotext_onoff cursorpointer"><span><span class="infotext">'+string["tit_move"]+'</span>&otimes;</span></span></div>\
		<div role="tablist" class="ui-accordion ui-widget ui-helper-reset ui-accordion-icons" id="accordion">\
		<h3  id="menu1" tabindex="0" aria-selected="true" aria-expanded="true" role="tab" class="ui-accordion-header ui-helper-reset ui-state-default ui-state-active ui-corner-all"><span class="ui-icon ui-icon-triangle-1-e"></span><a tabindex="-1" href="#">'+string["tit_presettings"]+'</a></h3>\
		<table style="display: block; overflow: visible; padding-top: 0px; padding-bottom: 0px;" role="tabpanel" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content-active" id="controlpanel" role="tabpanel">\
			<tbody>\
			<tr>\
				<td class="td_settingshead td_first">'+info["lang"]["tit"]+'<select id="langselect"></select></td>\
				<td class="td_settingsopt"><input name="langchecked" checked="checked" disabled="disabled" type="checkbox"></td>	\
				<td class="td_settingsinfo"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["lang"]["info"]+'</h4><h5>'+info["lang"]["dest"]+'</h5><p>'+info["lang"]["info"]+'</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td class="td_settingshead noborder">'+info["premium"]["tit"]+'?</td>\
				<td class="td_settingsopt noborder"><input id="premium" type="checkbox"></td>	\
				<td class="td_settingsinfo noborder"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["premium"]["tit"]+'?</h4><h5>'+info["premium"]["dest"]+'</h5><p>'+info["premium"]["info"]+'</p></span></span></span></td>\
			</tr>\
			</tbody>\
		</table>\
		<h3 id="menu2" tabindex="-1" aria-selected="false" aria-expanded="false" role="tab" class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"><span class="ui-icon ui-icon-triangle-1-e"></span><a tabindex="-1" href="#">'+string["tit_moveable_windows"]+'</a></h3>\
		<table style="display: none; overflow: visible; padding-top: 0px; padding-bottom: 0px;" role="tabpanel" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="toolbox_windows">\
			<tbody>\
			<tr>\
				<td class="td_settingshead td_first"><img src="'+urls["img"]["notepadico"]+'"><span class="down">'+info["notepad"]["tit"]+'</span></td>\
				<td class="td_settingsopt"><input id="notepad" type="checkbox"></td>	\
				<td class="td_settingsinfo"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["notepad"]["tit"]+'</h4><h5>'+info["notepad"]["dest"]+'</h5><p>'+info["notepad"]["info"]+'</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td class="td_settingshead"><img src="'+urls["img"]["chat"]+'"><span class="down">'+info["chat"]["tit"]+'</span></td>\
				<td class="td_settingsopt"><input id="chat" type="checkbox"></td>	\
				<td class="td_settingsinfo"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["chat"]["tit"]+'</h4><h5>'+info["chat"]["dest"]+'</h5><p>'+info["chat"]["info"]+'</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td class="td_settingshead"><img src="'+urls["img"]["countdownico"]+'"><span class="down">'+info["countdown"]["tit"]+'</span></td>\
				<td class="td_settingsopt"><input id="countdownbox" type="checkbox"></td>	\
				<td class="td_settingsinfo"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["countdown"]["tit"]+'</h4><h5>'+info["countdown"]["dest"]+'</h5><p>'+info["countdown"]["info"]+'</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td class="td_settingshead noborder"><img src="'+urls["img"]["multimarketico"]+'"><span class="down">'+info["multimarket"]["tit"]+'</span></td>\
				<td class="td_settingsopt noborder"><input id="multimarketbox" type="checkbox"></td>	\
				<td class="td_settingsinfo noborder"><span class="noborder infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["multimarket"]["tit"]+'</h4><h5>'+info["multimarket"]["dest"]+'</h5><p>'+info["multimarket"]["info"]+'</p></span></span></span></td>\
			</tr>\
			</tbody>\
		</table>\
		<h3  id="menu3" tabindex="-1" aria-selected="false" aria-expanded="false" role="tab" class="ui-accordion-header ui-helper-reset ui-corner-top"><span class="ui-icon ui-icon-triangle-1-s"></span><a tabindex="-1" href="#">'+string["tit_extra_buttons"]+'</a></h3>\
		<table style="display: none; overflow: visible; padding-top: 0px; padding-bottom: 0px;" role="tab" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom " id="toolbox_buttons">\
			<tbody>\
			<tr>\
				<td class="td_first">'+info["extrabuttons"]["tit"]+' <span class="italic grey">(Premium)</span></td>\
				<td class="td_settingsopt noborder"><input id="extrabuttons" type="checkbox"></td>	\
				<td class="td_settingsinfo noborder"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["extrabuttons"]["tit"]+'</h4><h5>'+info["extrabuttons"]["dest"]+'</h5><p>'+info["extrabuttons"]["info"]+'</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td class="td_first">'+string["use_kes"]+'</td>\
				<td class="td_settingsopt noborder"><input id="extrabuttonskes" type="checkbox"></td>	\
				<td class="td_settingsinfo noborder"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+string["use_kes_tit"]+'</h4><h5>'+string["use_kes_viewcombined"]+'</h5><p>'+string["use_kes_info"]+'</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td class="td_settingshead">'+info["extrabuttonstab"]["tit"]+ '</td>\
				<td class="td_settingsopt"><input id="extrabuttonstab" type="checkbox"></td>	\
				<td class="td_settingsinfo"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["extrabuttonstab"]["tit"]+ '</h4><h5>'+info["extrabuttonstab"]["dest"]+ '</h5><p>'+info["extrabuttonstab"]["info"]+ '</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td class="tablerow1">1. '+string["tit_button"]+ '</td>\
				<td class="tablerow2"><select id="selbutton1">'+optionhtml+'</select></td>\
				<td class="td_settingsinfo noborder"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["extrabuttonsorder"]["tit"]+ '</h4><h5>'+info["extrabuttonsorder"]["dest"]+ '</h5><p>'+info["extrabuttonsorder"]["info"]+ '</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td>2. '+string["tit_button"]+'</td>\
				<td class="tablerow2"><select id="selbutton2">'+optionhtml+'</select></td>\
				<td>&nbsp;</td>\
			</tr>\
			<tr>\
				<td>3. '+string["tit_button"]+'</td>\
				<td class="tablerow2"><select id="selbutton3">'+optionhtml+'</select></td>\
				<td>&nbsp;</td>\
			</tr>\
			<tr>\
				<td>4. '+string["tit_button"]+'</td>\
				<td class="tablerow2"><select id="selbutton4">'+optionhtml+'</select></td>\
				<td>&nbsp;</td>\
			</tr>\
			<tr>\
				<td>5. '+string["tit_button"]+'</td>\
				<td class="tablerow2"><select id="selbutton5">'+optionhtml+'</select></td>\
				<td>&nbsp;</td>\
			</tr>\
			<tr>\
				<td>6. '+string["tit_button"]+'</td>\
				<td class="tablerow2"><select id="selbutton6">'+optionhtml+'</select></td>\
				<td>&nbsp;</td>\
			</tr>\
			<tr>\
				<td>7. '+string["tit_button"]+'</td>\
				<td class="tablerow2"><select id="selbutton7">'+optionhtml+'</select></td>\
				<td>&nbsp;</td>\
			</tr>\
			<tr>\
				<td>8. '+string["tit_button"]+'</td>\
				<td class="tablerow2"><select id="selbutton8">'+optionhtml+'</select></td>\
				<td>&nbsp;</td>\
			</tr>\
			<tr>\
				<td>9. '+string["tit_button"]+'</td>\
				<td class="tablerow2"><select id="selbutton9">'+optionhtml+'</select></td>\
				<td>&nbsp;</td>\
			</tr>\
			</tbody>\
		</table>\
		<h3 id="menu4" tabindex="-1" aria-selected="false" aria-expanded="false" role="tab" class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"><span class="ui-icon ui-icon-triangle-1-e"></span><a tabindex="-1" href="#">'+string["tit_functions"]+'</a></h3>\
		<table style="display: none; overflow: visible; padding-top: 0px; padding-bottom: 0px;" role="tabpanel" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="toolbox_functions">\
			<tbody>\
			<tr>\
				<td class="td_settingshead first">'+info["highlighter"]["tit"]+'</td>\
				<td class="td_settingsopt"><input id="highlighter" type="checkbox"></td>	\
				<td class="td_settingsinfo"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["highlighter"]["tit"]+'</h4><h5>'+info["highlighter"]["dest"]+'</h5><p>'+info["highlighter"]["info"]+'</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td class="td_settingshead">'+info["messagesaver"]["tit"]+'</td>\
				<td class="td_settingsopt"><input id="messagesaver" type="checkbox"></td>	\
				<td class="td_settingsinfo"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["messagesaver"]["tit"]+'</h4><h5>'+info["messagesaver"]["dest"]+'</h5><p>'+info["messagesaver"]["info"]+'</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td class="td_settingshead">'+info["villageinfo"]["tit"]+'</td>\
				<td class="td_settingsopt"><input id="smallmap" type="checkbox"></td>	\
				<td class="td_settingsinfo"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["villageinfo"]["tit"]+'</h4><h5>'+info["villageinfo"]["dest"]+'</h5><p>'+info["villageinfo"]["info"]+'</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td class="td_settingshead">'+info["notizbalken"]["tit"]+'</td>\
				<td class="td_settingsopt"><input id="notizbalkenbox" type="checkbox"></td>	\
				<td class="td_settingsinfo"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["notizbalken"]["tit"]+'</h4><h5>'+info["notizbalken"]["dest"]+'</h5><p>'+info["notizbalken"]["info"]+'</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td class="td_settingshead">'+info["calc"]["tit"]+'</td>\
				<td class="td_settingsopt"><input id="calculator" type="checkbox"></td>	\
				<td class="td_settingsinfo"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["calc"]["tit"]+'</h4><h5>'+info["calc"]["dest"]+'</h5><p>'+info["calc"]["info"]+'</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td class="td_settingshead">'+info["fillin"]["tit"]+'<input id="insend" type="text"></td>\
				<td class="td_settingsopt"><input id="market" type="checkbox"></td>	\
				<td class="td_settingsinfo"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["fillin"]["tit"]+'</h4><h5>'+info["fillin"]["dest"]+'</h5><p>'+info["fillin"]["info"]+'</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td class="td_settingshead noborder">'+info["header"]["tit"]+' <select id="headerselect"><option value="always">'+string["tit_headeralways"]+'</option><option value="onlybutton">'+string["tit_headerbutton"]+'</option></select></td>\
				<td class="td_settingsopt noborder"><input id="header" type="checkbox"></td>\
				<td class="td_settingsinfo noborder"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["header"]["tit"]+'</h4><h5>'+info["header"]["dest"]+'</h5><p>'+info["header"]["info"]+'</p></span></span></span></td>\
			</tr>\
			</tbody>\
		</table>\
		<h3 id="menu5" tabindex="-1" aria-selected="false" aria-expanded="false" role="tab" class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"><span class="ui-icon ui-icon-triangle-1-e"></span><a tabindex="-1" href="#">'+string["tit_special"]+'</a></h3>\
		<table style="display: none; overflow: visible; padding-top: 0px; padding-bottom: 0px;" role="tabpanel" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="toolbox_specials">\
			<tbody>\
			<tr>\
				<td class="td_settingshead noborder">'+info["worldmap"]["tit"]+' <button id="genwmap" alt="'+string["tit_genworldmap"]+'"title="'+string["tit_genworldmap"]+'">'+string["tit_genworldmap"]+'</button></td>\
				<td class="td_settingsopt noborder">&nbsp;</td>\
				<td class="td_settingsinfo noborder"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+info["worldmap"]["tit"]+'</h4><h5>'+info["worldmap"]["dest"]+'</h5><p>'+info["worldmap"]["info"]+'</p></span></span></span></td>\
			</tr>\
			<tr>\
				<td class="td_settingshead noborder">'+string["bt_reset"]+' <button id="resettbutton" class="configbutton" alt="'+string["bt_reset"]+'" title="'+string["bt_reset"]+'">'+string["bt_reset"]+'</button></td>\
				<td class="td_settingsopt noborder">&nbsp;</td>\
				<td class="td_settingsinfo noborder"><span class="infotext_onoff"><span><img src="'+urls["img"]["info"]+'"><span class="infotext infotext1"><h4>'+string["bt_reset"]+'</h4><h5></h5><p>'+string["bt_reset_info"]+'</p></span></span></span></td>\
			</tr>\
			</tbody>\
		</table>\
		<h3 id="menu6" tabindex="-1" aria-selected="false" aria-expanded="false" role="tab" class="ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"><span class="ui-icon ui-icon-triangle-1-e"></span><a tabindex="-1" href="#">'+string["tit_info_kontakt"]+'</a></h3>\
		<table style="display: none; overflow: visible; padding-top: 0px; padding-bottom: 0px;" role="tabpanel" class="ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom" id="toolbox_info">\
			<tbody>\
			<tr>\
				<td class="center td_first" colspan="2"><img src="'+urls["img"]["logo"]+'"></td>\
			</tr>\
			<tr>\
				<td class="imprint1">Toolbox '+string["tit_contact"]+'</td>\
				<td class="imprint2"><a href="mailto:'+autoremail+'">'+autoremail+'</a></td>\
			</tr>\
			<tr>\
				<td class="imprint1">Toolbox Version</td>\
				<td class="imprint2">'+scriptVersion.toString()+'</td>\
			</tr>\
			<tr>\
				<td class="imprint1">Toolbox News</td>\
				<td class="imprint2"><button id="newsshow" alt="'+string["tit_anzeigen"]+'" title="'+string["tit_anzeigen"]+'">'+string["tit_anzeigen"]+'</button></td>\
			</tr>\
			</tbody>\
		</table>\
	</div>\
		<div class="footer">\
			<button id="savebutton2" class="configbutton" alt="'+string["bt_save"]+'" title="'+string["bt_save"]+'">'+string["bt_save"]+'</button><button id="savebutton" class="configbutton" alt="'+string["bt_apply"]+'" title="'+string["bt_apply"]+'">'+string["bt_apply"]+'</button><button id="cancel" class="cancel" alt="'+string["bt_hide"]+'" title="'+string["bt_hide"]+'">'+string["bt_hide"]+'</button>\
		</div>\
'
		settingsdiv.innerHTML=html;
		script=document.createElement("script")
		script.setAttribute("type","text/javascript")
		script.innerHTML='jQuery("#accordion").accordion({ autoHeight: false }); ';
		ID('toolboxdiv').appendChild(settingsdiv)
		ID('toolboxdiv').appendChild(script)
		ID("cancel").addEventListener('click',function() {hideobj("settings")},true)
		ID("savebutton").addEventListener('click',function() {savesettings(true)},false)
		ID("savebutton2").addEventListener('click',function() {savesettings(false)},false)
		ID("resettbutton").addEventListener('click',function() {resettsettings();document.location.reload();},false)
		ID("genwmap").addEventListener('click',function() {worldmap()},false)
		ID("langselect").addEventListener('change',function() {installLang()},false)
		ID("newsshow").addEventListener('click',function() {createnews();showobj("news")},false)
		
		
		ID("menu1").addEventListener('click',function() {GM_setValue('lastmenutab',1);},false)
		ID("menu2").addEventListener('click',function() {GM_setValue('lastmenutab',2);},false)
		ID("menu3").addEventListener('click',function() {GM_setValue('lastmenutab',3);},false)
		ID("menu4").addEventListener('click',function() {GM_setValue('lastmenutab',4);},false)
		ID("menu5").addEventListener('click',function() {GM_setValue('lastmenutab',5);},false)
		ID("menu6").addEventListener('click',function() {GM_setValue('lastmenutab',6);},false)
		
		
		getLangOptions();
		
		ID("headerselect").selectedIndex=GM_getValue("header")
		
		for(var i=1;i<9;i++) { /**** *Für Extrabuttons*/
			ID("selbutton"+(i)).selectedIndex=0
		}
		link=eval(GM_getValue("link", "[]"))
		for(var i=0; i < link.length;i++) {
			if(link[i]=="&s=build_main") {
				ID("selbutton"+(i+1)).selectedIndex=1
			}
			else if(link[i]=="&s=build_market") {
				ID("selbutton"+(i+1)).selectedIndex=2
			}
			else if(link[i]=="&s=build_market&m=accept") {
				ID("selbutton"+(i+1)).selectedIndex=3
			}
			else if(link[i]=="&s=build_barracks") {
				ID("selbutton"+(i+1)).selectedIndex=4
			}
			else if(link[i]=="&s=build_barracks&m=recruit") {
				ID("selbutton"+(i+1)).selectedIndex=5
			}
			else if(link[i]=="&s=build_barracks&m=research") {
				ID("selbutton"+(i+1)).selectedIndex=6
			}
			else if(link[i]=="&s=build_snob") {
				ID("selbutton"+(i+1)).selectedIndex=7
			}
			else if(link[i]=="&s=build_smith") {
				ID("selbutton"+(i+1)).selectedIndex=8
			}
			else if(link[i]=="&s=map") {
				ID("selbutton"+(i+1)).selectedIndex=9
			}
		}
		/***** ENDE Für Extrabuttons*/
	
		ID('settingsmove').style.backgroundImage='url("'+urls["img"]["windowsbg"]+'")'

		if(GM_getValue('showsettings')) {
			showobj('settings')
		}else {
			hideobj('settings')
		}
		ID("settingsdiv").addEventListener('mousedown', function(){setfront("settingsdiv")}, false);
		ID("settingsmove").addEventListener('mousedown', function(e){dragStart(e,ID("settingsdiv"),"sett");}, false);
	}
	else {
		ID("settingsdiv").style.visibility="visible"
	}
	if(GM_getValue("market")) {
		ID("market").checked=true
	} else {
		ID("market").checked=false
	}
	if(GM_getValue("highlighter")) {
		ID("highlighter").checked=true
	} else {
		ID("highlighter").checked=false
	}
	if(GM_getValue("extrabuttons")) {
		ID("extrabuttons").checked=true
	} else {
		ID("extrabuttons").checked=false
	}
	if(GM_getValue("extrabuttonstab")) {
		ID("extrabuttonstab").checked=true
	} else {
		ID("extrabuttonstab").checked=false
	}
	if(GM_getValue("extrabuttonskes")) {
		ID("extrabuttonskes").checked=true
	} else {
		ID("extrabuttonskes").checked=false
	}
	if(GM_getValue("messagesaver")) {
		ID("messagesaver").checked=true
	} else {
		ID("messagesaver").checked=false
	}
	if(GM_getValue("smallmap")) {
		ID("smallmap").checked=true
	} else {
		ID("smallmap").checked=false
	}
	if(GM_getValue("calculator")) {
		ID("calculator").checked=true
	} else {
		ID("calculator").checked=false
	}
	if(GM_getValue("notepad")) {
		ID("notepad").checked=true
	} else {
		ID("notepad").checked=false
	}
	if(GM_getValue("chat")) {
		ID("chat").checked=true
	} else {
		ID("chat").checked=false
	}
	if(GM_getValue("premium")) {
		ID("premium").checked=true
	} else {
		ID("premium").checked=false
	}
	if(!hasPremium()) {
		ID("premium").disabled=true;
	}
	if(GM_getValue("headeractive")) {
		ID("header").checked=true
	} else {
		ID("header").checked=false
	}
	if(GM_getValue("countdownactive")) {
		ID("countdownbox").checked=true
	} else {
		ID("countdownbox").checked=false
	}
	if(GM_getValue("notizbalkenactive")) {
		ID("notizbalkenbox").checked=true
	} else {
		ID("notizbalkenbox").checked=false
	}
	if(GM_getValue("multimarketactive")) {
		ID("multimarketbox").checked=true
	} else {
		ID("multimarketbox").checked=false
	}
	
	ID('insend').value=GM_getValue('fillsend')
	ID("menu"+GM_getValue('lastmenutab')).click();

}


//Optionen speichern
function savesettings(mode) {
	if(ID("market").checked==true) {
		GM_setValue("market",true)
	} else {
		GM_setValue("market",false)
	}
	if(ID("highlighter").checked==true) {
		GM_setValue("highlighter",true)
	} else {
		GM_setValue("highlighter",false)
	}
	if(ID("extrabuttons").checked==true) {
		GM_setValue("extrabuttons",true)
	} else {
		GM_setValue("extrabuttons",false)
	}
	if(ID("extrabuttonstab").checked==true) {
		GM_setValue("extrabuttonstab",true)
	} else {
		GM_setValue("extrabuttonstab",false)
	}
	if(ID("extrabuttonskes").checked==true) {
		GM_setValue("extrabuttonskes",true)
	} else {
		GM_setValue("extrabuttonskes",false)
	}
	if(ID("messagesaver").checked==true) {
		GM_setValue("messagesaver",true)
	} else {
		GM_setValue("messagesaver",false)
	}
	if(ID("smallmap").checked==true) {
		GM_setValue("smallmap",true)
	} else {
		GM_setValue("smallmap",false)
	}
	if(ID("calculator").checked==true) {
		GM_setValue("calculator",true)
	} else {
		GM_setValue("calculator",false)
	}
	if(ID("notepad").checked==true) {
		GM_setValue("notepad",true)
	} else {
		GM_setValue("notepad",false)
	}
	if(ID("chat").checked==true) {
		GM_setValue("chat",true)
	} else {
		GM_setValue("chat",false)
	}
	if(ID("premium").checked==true && hasPremium()) {
		GM_setValue("premium",true)
	} else {
		GM_setValue("premium",false)
	}
	if(ID("header").checked==true) {
		GM_setValue("header",ID("headerselect").selectedIndex)
		GM_setValue("headeractive",true)
	} else {
		GM_setValue("headeractive",false)
	}
	
	if(ID("countdownbox").checked==true) {
		GM_setValue("countdownactive",true)
	} else {
		GM_setValue("countdownactive",false)
	}
	if(ID("notizbalkenbox").checked==true) {
		GM_setValue("notizbalkenactive",true)
	} else {
		GM_setValue("notizbalkenactive",false)
	}
	if(ID("multimarketbox").checked==true) {
		GM_setValue("multimarketactive",true)
	} else {
		GM_setValue("multimarketactive",false)
	}
	if(ID('insend').value!="" && !isNaN(ID('insend').value)) {
		GM_setValue('fillsend',ID('insend').value)
	} else {
		GM_setValue('fillsend',200000)
	}
		var link=new Array()
	if(ID("selbutton1").value!="none") {
		link.push(ID("selbutton1").value)
	}
	if(ID("selbutton2").value!="none") {
		link.push(ID("selbutton2").value)
	}
	if(ID("selbutton3").value!="none") {
		link.push(ID("selbutton3").value)
	}
	if(ID("selbutton4").value!="none") {
		link.push(ID("selbutton4").value)
	}
	if(ID("selbutton5").value!="none") {
		link.push(ID("selbutton5").value)
	}
	if(ID("selbutton6").value!="none") {
		link.push(ID("selbutton6").value)
	}
	if(ID("selbutton7").value!="none") {
		link.push(ID("selbutton7").value)
	}
	if(ID("selbutton8").value!="none") {
		link.push(ID("selbutton8").value)
	}
	if(ID("selbutton9").value!="none") {
		link.push(ID("selbutton9").value)
	}
	GM_setValue("link",uneval(link))
	
	if(mode) { //Übernehmen
		showobj('settings')
	}else { //Speichern
		hideobj('settings')
		ID("settingsdiv").style.visibility="hidden"
	}
	document.location.reload()
}

function getLangOptions() {
	GM_xmlhttpRequest({
		method: 'GET',
		//url: urls["links"]["translationsdir"]+"translations.txt",
		url: "http://www.bitzones.net/code/Original/translations/echo.php",
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'test/plain',
		},
		onload: function(responseDetails) {
			ID("langselect").innerHTML="<option value='nix' style='display:none;'>"+string["tit_lang_short"]+"</option>"+responseDetails.responseText;
		}
	});
}

function installLang() {
		GM_xmlhttpRequest({
			method: 'GET',
			url: urls["links"]["translationsdir"]+ID("langselect").value+".txt",
			headers: {
				'User-agent': 'Mozilla/5.0 (compatible) Greasemonkey',
				'Accept': 'text/plain',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'Accept-Charset': 'ISO-8859-1,utf-8;q=0.7,*;q=0.7',
			},
			onload: function(responseDetails) {
				GM_setValue("translation",responseDetails.responseText)
				//alert("Installed your selected language.")
				document.location.reload()
			}
		});
}
/************Ende Settingsbox*********************************************/

/************Extrabuttons*************************************************/
//setzen der Links
if((GM_getValue('extrabuttons')) || (GM_getValue('highlighter'))) {
	var overview= /s=overview/
	var overview_kombi=/s=overview_villages&m=1/
	var overview_pro=/s=overview_villages&m=2/
	var overview_geb=/s=overview_villages&m=7/
	var overview_forschung=/s=overview_villages&m=8/
	var overview_trup_eig=/s=overview_villages&m=4/
	var overview_trup_all=/s=overview_villages&m=4&type=all/
	var overview_trup_home=/s=overview_villages&m=4&type=here/
	var overview_trup_out=/s=overview_villages&m=4&type=outwards/
	var overview_trup_move=/s=overview_villages&m=4&type=moving/
	var overview_trans_rec=/s=overview_villages&m=3&type=rec/
	var overview_befehle=/s=overview_villages&m=5/
}
//Prüfen der Seite und aufrufen der Extrabuttons-Funktion
if (GM_getValue('extrabuttons')) {
	if (GM_getValue("extrabuttonstab")) {
		tab=true
	} else {
		tab=false
	}
	if (GM_getValue('premium')) {
		try {
			document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/table/tbody/tr/td[2]/table/tbody/tr/td/table/tbody/tr/td[2]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href+="&m=2"
		} catch(e) {}
	}
	if(GM_getValue('premium')) {
		if(overview_kombi.test(lref()) && GM_getValue('premium')) {
			extrabuttons("kombi",tab)
		}
		else if(overview_pro.test(lref()) && GM_getValue('premium')) {
			extrabuttons("produktion",tab)
		}
		else if(overview_geb.test(lref()) && GM_getValue('premium')) {
			extrabuttons("gebaude",tab)
		}
		else if(overview_forschung.test(lref()) && GM_getValue('premium')) {
			extrabuttons("forschung",tab)}
		else if(overview_trup_eig.test(lref()) && GM_getValue('premium') && !overview_trup_all.test(lref())) {
			extrabuttons("trup_eigene",tab)}
		else if(overview_trans_rec.test(lref()) && GM_getValue('premium')) {
			extrabuttons("trans_rec",tab)}
		else if(/&s=overview_villages&m=3/.test(lref()) || /&s=overview_villages&m=3&type=own/.test(lref()) || /&s=overview_villages&m=3&type=all/.test(lref()) || /&s=overview_villages&m=3&type=inc/.test(lref()) || /&s=overview_villages&m=3&type=out/.test(lref()) && GM_getValue('premium')) {
			extrabuttons("transport",tab)
		}
		else if(overview_befehle.test(lref()) && GM_getValue('premium')) {
			extrabuttons("befehle",tab)
		}
	}else if (overview.test(lref())) {
		extrabuttons("normal",tab)
	}
}
	function extrabuttons(type,tab) {
	link=eval(GM_getValue("link", "[]"))
	tdhtml=""
	thhtml=""
	tdleer=""
	tdmarked=""
	if(tab) {
		for(var i=0; i < link.length;i++) {
			thhtml+="<th style='width:16px;'></th>"
			tdleer+="<td></td>"
			tdmarked+='<td class="marked_sum"></td>'
				if(link[i]=="&s=build_main") {
					tdhtml+="<td><a href='' target='_blank'><img src='"+urls["img"]["main"]+"' class='cursorpointer' /></a></td>"
				}
				if(link[i]=="&s=build_market&m=accept") {
					tdhtml+="<td><a href=''  target='_blank'><img src='"+urls["img"]["market_in"]+"' class='cursorpointer' /></a></td>"
				}
				if(link[i]=="&s=build_market") {
					tdhtml+="<td><a href=''  target='_blank'><img src='"+urls["img"]["market_out"]+"' class='cursorpointer' /></a></td>"
				}
				if(link[i]=="&s=build_barracks") {
					tdhtml+="<td><a href='' target='_blank'><img src='"+urls["img"]["barracks"]+"' class='cursorpointer' /></a></td>"
				}
				if(link[i]=="&s=build_barracks&m=recruit") {
					tdhtml+="<td><a href=''  target='_blank'><img src='"+urls["img"]["barracks_recruit"]+"' class='cursorpointer' /></a></td>"
				}
				if(link[i]=="&s=build_barracks&m=research") {
					tdhtml+="<td><a href=''  target='_blank'><img src='"+urls["img"]["barracks_research"]+"' class='cursorpointer' /></a></td>"
				}
				if(link[i]=="&s=build_snob") {
					tdhtml+="<td><a href=''  target='_blank'><img src='"+urls["img"]["snob"]+"' class='cursorpointer' /></a></td>"
				}
				if(link[i]=="&s=build_smith") {
					tdhtml+="<td><a href=''target='_blank' ><img src='"+urls["img"]["smith"]+"' class='cursorpointer' /></a></td>"
				}
				if(link[i]=="&s=map") {
					tdhtml+="<td><a href='' target='_blank'><img src='"+urls["img"]["map"]+"' class='cursorpointer' /></a></td>"
				}
		}
	} else {
		for(var i=0; i < link.length;i++) {
			thhtml+="<th></th>"
			tdleer+="<td></td>"
			tdmarked+='<td class="marked_sum"></td>'
				if(link[i]=="&s=build_main") {
					tdhtml+="<td><a href=''><img src='"+urls["img"]["main"]+"' class='cursorpointer' /></a></td>"
					}
				if(link[i]=="&s=build_market&m=accept") {
					tdhtml+="<td><a href=''><img src='"+urls["img"]["market_in"]+"' class='cursorpointer' /></a></td>"
					}
				if(link[i]=="&s=build_market") {
					tdhtml+="<td><a href=''><img src='"+urls["img"]["market_out"]+"' class='cursorpointer' /></a></td>"
					}
				if(link[i]=="&s=build_barracks") {
					tdhtml+="<td><a href=''><img src='"+urls["img"]["barracks"]+"' class='cursorpointer' /></a></td>"
					}
				if(link[i]=="&s=build_barracks&m=recruit") {
					tdhtml+="<td><a href=''><img src='"+urls["img"]["barracks_recruit"]+"' class='cursorpointer' /></a></td>"
					}
				if(link[i]=="&s=build_barracks&m=research") {
					tdhtml+="<td><a href=''><img src='"+urls["img"]["barracks_research"]+"' class='cursorpointer' /></a></td>"
					}
				if(link[i]=="&s=build_snob") {
					tdhtml+="<td><a href=''><img src='"+urls["img"]["snob"]+"' class='cursorpointer' /></a></td>"
					}
				if(link[i]=="&s=build_smith") {
					tdhtml+="<td><a href=''><img src='"+urls["img"]["smith"]+"' class='cursorpointer' /></a></td>"
					}
				if(link[i]=="&s=map") {
					tdhtml+="<td><a href=''><img src='"+urls["img"]["map"]+"' class='cursorpointer' /></a></td>"
					}
		}
	}
	//mit premium
	if(type=="produktion") {
		try {
			headtable=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
			span=headtable.colSpan
			if(span > 5) {
				document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().colSpan=(span+i)
				document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
				var i=2
			} else {
				document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
				var i=1
			}
				document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/th[9]", document, null,XPathResult.ANY_TYPE, null).iterateNext().setAttribute("style","width: 100px; text-align:center;")
			do {
				i++
				var result= document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td/span/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
				if (result) {
					url=result.href.replace("&s=overview","")
					url=url.replace("&s=build_main","")
					if (tab) {
						document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
					} else {
						document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
					}
					try{
						if (type=="produktion") {
							var a=9
						}
						var l=a
							do {
								a++
								result2=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
							} while(result2!=null);
						}catch(e){}
				} else
				{
					document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked;
					break;
				}
			} while(result!=null); 
		} catch(e) {}
	}
		if(type=="forschung" || type=="kombi" || type=="gebaude" || type=="trup_eigene" || type=="trup_home" || type=="trup_out" || type=="trupmove") {
		try {
			if(GM_getValue("extrabuttonskes") && type=="kombi") {
				return false;
			}
			headtable=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
			span=headtable.colSpan
			if(span > 5) {
				document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().colSpan=(span+i)
				document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
				var i=2
			} else {
				document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
				var i=1
			}
			document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/th[9]", document, null,XPathResult.ANY_TYPE, null).iterateNext().setAttribute("style","width: 100px; text-align:center;")
			do {
				i++
				var result= document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td/span/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
				if (result) {
					if(type=="forschung") {
						url=result.href.replace("&s=build_barracks&m=research","")
					//	url=url.replace("&s=build_main","")
					} else {
						url=result.href.replace("&s=overview","")
						url=url.replace("&s=build_main","")
					}
					if (tab) {
						document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
					} else {
						document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
					}
					try{
						if (type=="forschung") {
							var a=12
						}
						if (type=="kombi") {
							var a=16
						}
						if (type=="gebaude") {
							var a =18
						}
						if (type=="trup_eigene") {
							var a = 14
						}
						var l=a
							do {
								a++
								result2=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
							} while(result2!=null);
						}catch(e){}
				} else
				{
					document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked;
					break;
				}
			} while(result!=null);
		} catch(e) {}
	}
	if(type=="transport" && !/&s=overview_villages&m=3&type=own_offer/.test(lref())) { //heir sind Alle ; Ausgehende; Ankommende ; Eigene
		try{
			headtable=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
			span=headtable.colSpan
				if(span==9 || span==8) {
					document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().colSpan=(span+i)
					document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
					var i=2
				} else {
					document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
					var i=1
				}
			if(span==9 || /&s=overview_villages&m=3&type=all/.test(lref())) {
				td=5;span=9
			} else if(span==8 || /&s=overview_villages&m=3&type=inc/.test(lref()) || /&s=overview_villages&m=3&type=out/.test(lref())) {
				td=4;span=8
			}
			else if (/&s=overview_villages&m=3&type=own/.test(lref())) {
				span=7;td=3;
			}
			else if (/&s=overview_villages&m=3/.test(lref())) {
				span=9;td=5
			}
			do {
				i++
				var result= document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td["+td+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
				if (result) {
					url=result.href.replace("&s=overview","")
					url=url.replace(/\d+&s=info_village&id=/,"")
					if (tab) {
						document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
					} else {
						document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
					}
					try{
						var a = span
						var l=a
							do {
								a++
								result2=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
							} while(result2!=null);
					}catch(e){GM_log("First:"+e.message)}
				} else
				{
					document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked;
					break;
				}
			} while(result!=null);
		}catch(e) {GM_log("Secound:"+e.message)}
	}
	//Transporte Angenommene
	if(type=="trans_rec") {
		try {
			headtable=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
			span=headtable.colSpan
			if(span==10) {
				document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().colSpan=(span+i)
				document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
				var i=2
			} else {
				document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
				var i=1
			}
			do {
				i++
				var result= document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]/td[4]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
					if (result) {
						url=result.href.replace(/\d+&s=info_village&id=/,"")

						if (tab) {
							document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
						} else {
							document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
						}
						try{
							var a=span
							var l=a
								do {
									a++
									result2=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
								} while(result2!=null);
						}catch(e){}
					} else {
						document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked;
						document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+(i+1)+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml //
						break;
					}
			} while(result!=null);
		} catch(e) {}
	}
	//Befehle
	if(type=="befehle") {
		try{
			headtable=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
			span=headtable.colSpan
				if(span==14) {
					document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
					var i=2
				} else {
					document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
					var i=1;span=14
				}
			td=3
			do {
				i++
				var result= document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[3]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
					if (result) {
						url=result.href.replace("&s=build_barracks&m=command","")
						if (tab) {
							document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
						} else {
							document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
							}
						try{
							var a = span
							var l=a
							do {
								a++
								result2=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
							} while(result2!=null);
						}catch(e){GM_log("First:"+e.message)}
					} else {
						document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked;
						break;
					}
			} while(result!=null);
		}
		catch(e) {GM_log("Secound:"+e.message)}
	}
	//Ohne Premium
	if (type=="normal") {
		try{
			headtable=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
			span=headtable.colSpan
				if(span==8) {
					document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
					document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().colSpan=span+link.length-1
					var i=2
					span=7;
				} else {
					document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
					var i=1;
					span=7
			}
		do {
			i++
			var result= document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]/td/a", document, null,XPathResult.ANY_TYPE, null);
			var rst=result.iterateNext();
			if (rst) {
					url=rst.href.replace("&s=overview","")
				if (tab) {
					document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml
				} else {
					document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml
				}
				try{
					var a = span
					var l=a
					do {
						a++
						result2=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
					} while(result2!=null);
				}catch(e){GM_log("First:"+e.message)}
			} else {
				document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked
				document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+(i+1)+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdleer
				break;
			}
		} while(rst!=null);
	}catch(e){
	}
}
}
/************Ende Extrabuttons********************************************/

/************Highlighter**************************************************/
if ((GM_getValue('highlighter')) && overview.test(lref()) && !GM_getValue('premium')) {
	regex2=/img\/command\/support.png/
	regex3=/img\/command\/attack.png/
	var i=1
		do {
		i++
		var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]/td", document, null,XPathResult.ANY_TYPE, null).iterateNext();
		var result2= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]/td/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
			if (result==null) {
				break;
			}
			if (regex2.test(result.innerHTML) && regex3.test(result.innerHTML)) {
				result2.style.color="#0000FF"; result2.style.fontWeight="normal"
			}
			else if (regex2.test(result.innerHTML)) {
				result2.style.color="#008000"; result2.style.fontWeight="normal"
			}
			else if (regex3.test(result.innerHTML)) {
				result2.style.color="#FF0000"; result2.style.fontWeight="normal"
			}
	} while(result!=null);
}
if (((GM_getValue('highlighter')) && GM_getValue('premium')) && (overview_pro.test(lref()) || overview_trup_eig.test(lref()))) {
	regex2=/img\/command\/support.png/
	regex3=/img\/command\/attack.png/
	page=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext();
	if(page && page.style.backgroundImage=='url("img/layout/bg_table_cell.jpg")') {
		var i=2
	} else {
		var i=1
	}
	do {
		i++
		var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td", document, null,XPathResult.ANY_TYPE, null).iterateNext();
		var result2= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]/td/span/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
		if (result==null) {
			break;
		}
		if (regex2.test(result.innerHTML) && regex3.test(result.innerHTML)) {
			result2.style.color="#0000FF"; result2.style.fontWeight="normal"
		}
		else if (regex2.test(result.innerHTML)) {
			result2.style.color="#008000"; result2.style.fontWeight="normal"
		}
		else if (regex3.test(result.innerHTML)) {
			result2.style.color="#FF0000"; result2.style.fontWeight="normal"
		}
	} while(result!=null);
}
/************Ende Highlighter*********************************************/

/************Notepad******************************************************/
//notepad erstellen
function notepad() {
	//GM_setValue("notepad",true)
	if(GM_getValue("notepad")) {
	if(!ID("notesid")) {
		if (!GM_getValue("page")) {
			GM_setValue("page",1)
		}
	notes=document.createElement("div")
	notes.setAttribute("id","notesid")
	x=GM_getValue("notepadxkor")
	y=GM_getValue("notepadykor")
		if (y < 0 || y > window.innerHeight) {
			y=1
		}
		if (x < 0 || x > (window.innerWidth-25)) {
			x=1
		}
	notes.setAttribute("style","top:"+y+"px;left:"+x+"px;")
	buttons="<button id='notesbutton1' >1</button><button id='notesbutton2' >2</button><button id='notesbutton3' >3</button><button id='notesbutton4' >4</button><button id='notesbutton5' >5</button><button id='notesbutton6' >6</button><button id='notesbutton7' >7</button><button id='notesbutton8' >8</button><button id='notesbutton9' >9</button><button id='notesbutton10' >10</button>"
	notes.innerHTML="<div id='notemove' class='move'><span class='windowtitel'>"+info["notepad"]["tit"]+"</span><span class='infotext_onoff cursorpointer'><span><span class='infotext'>"+string["tit_move"]+"</span>&otimes;</span></span></div> <div id='bbcodediv'><span id='notepadchangemode'><img src='' id='img_mode'/></span><span id='bbb'><img src='"+urls["img"]["bb_b"]+"' /></span><span id='bbi'><img src='"+urls["img"]["bb_i"]+"' /></span><span id='bbu'><img src='"+urls["img"]["bb_u"]+"' /></span><select class='bbselect' style='background: url("+urls["img"]["colorpick_bg"]+")' id='colorpick'><option style='display:none;'></option><option style='background-image: url("+urls["img"]["black"]+");' value='#000000'></option><option style='background-image: url("+urls["img"]["blau"]+");' value='#333399'></option><option style='background-image: url("+urls["img"]["gruen"]+");' value='#f336633'></option><option style='background-image: url("+urls["img"]["lila"]+");' value='#663366'></option><option style='background-image: url("+urls["img"]["grau"]+");' value='#666666'></option><option style='background-image: url("+urls["img"]["rot"]+");' value='#990000'></option></select><select style='background: url("+urls["img"]["imagepick_troop"]+");' id='trooppick' class='bbselect'><option style='display:none;'></option><option value='[img_sword]' style='background-image: url("+urls["img"]["img_sword"]+");'></option><option value='[img_spear]' style='background-image: url("+urls["img"]["img_spear"]+");'></option><option value='[img_axe]' style='background-image: url("+urls["img"]["img_axe"]+");'></option><option value='[img_bow]' style='background-image: url("+urls["img"]["img_bow"]+");'></option><option value='[img_spy]' style='background-image: url("+urls["img"]["img_spy"]+");'></option><option value='[img_light]' style='background-image: url("+urls["img"]["img_light"]+");'></option><option value='[img_heavy]' style='background-image: url("+urls["img"]["img_heavy"]+");'></option><option value='[img_ram]' style='background-image: url("+urls["img"]["img_ram"]+");'></option><option value='[img_kata]' style='background-image: url("+urls["img"]["img_kata"]+");'></option><option value='[img_snob]' style='background-image: url("+urls["img"]["img_snob"]+");'></option></select><select style='background: url("+urls["img"]["imagepick_ress"]+");' id='respick' class='bbselect' ><option style='display:none;'></option><option value='[img_worker]' style='background-image: url("+urls["img"]["img_worker"]+");'></option><option value='[img_stone]' style='background-image: url("+urls["img"]["img_res2"]+");'></option><option value='[img_wood]' style='background-image: url("+urls["img"]["img_res1"]+");'></option><option value='[img_iron]' style='background-image: url("+urls["img"]["img_res3"]+");'></option></select><select style='background: url("+urls["img"]["imagepick_building"]+");' id='buildpick'class='bbselect' ><option style='display:none;'></option><option value='[img_build_main]' style='background-image: url("+urls["img"]["img_b_main"]+");'></option><option value='[img_build_stone]' style='background-image: url("+urls["img"]["img_b_stone"]+");'></option><option value='[img_build_wood]' style='background-image: url("+urls["img"]["img_b_wood"]+");'></option><option value='[img_build_iron]' style='background-image: url("+urls["img"]["img_b_iron"]+");'></option><option value='[img_build_storage]' style='background-image: url("+urls["img"]["img_b_storage"]+");'></option><option value='[img_build_hide]' style='background-image: url("+urls["img"]["img_b_hide"]+");'></option><option value='[img_build_farm]' style='background-image: url("+urls["img"]["img_b_farm"]+");'></option><option value='[img_build_barracks]' style='background-image: url("+urls["img"]["img_b_barracks"]+");'></option><option value='[img_build_stable]' style='background-image: url("+urls["img"]["img_b_stable"]+");'></option><option value='[img_build_market]' style='background-image: url("+urls["img"]["img_b_market"]+");'></option><option value='[img_build_garage]' style='background-image: url("+urls["img"]["img_b_garage"]+");'></option><option value='[img_build_snob]' style='background-image: url("+urls["img"]["img_b_snob"]+");'></option><option value='[img_build_smith]' style='background-image: url("+urls["img"]["img_b_smith"]+");'></option></select></div><div id='notepadarea'></div><div class='footer'><button id='notesbutton' class='cancel' alt='"+string["bt_hide"]+"' title='"+string["bt_hide"]+"'>"+string["bt_hide"]+"</button><span class='notepadbuttons'>"+buttons+'	</span></div>'; //<textarea id='nottext' ></textarea>
	ID('toolboxdiv').appendChild(notes)
	ID("notesbutton").addEventListener('click',function() {hideobj("notepad");bb_hide("hidden");},false)
	ID("notesbutton1").addEventListener('click',function() {changepage(1)},false)
	ID("notesbutton2").addEventListener('click',function() {changepage(2)},false)
	ID("notesbutton3").addEventListener('click',function() {changepage(3)},false)
	ID("notesbutton4").addEventListener('click',function() {changepage(4)},false)
	ID("notesbutton5").addEventListener('click',function() {changepage(5)},false)
	ID("notesbutton6").addEventListener('click',function() {changepage(6)},false)
	ID("notesbutton7").addEventListener('click',function() {changepage(7)},false)
	ID("notesbutton8").addEventListener('click',function() {changepage(8)},false)
	ID("notesbutton9").addEventListener('click',function() {changepage(9)},false)
	ID("notesbutton10").addEventListener('click',function() {changepage(10)},false)
	ID("notemove").addEventListener('mousedown', function(e){dragStart(e,ID("notesid"),"notepad");}, false);
	ID('notesid').addEventListener('click',function() {setfront("notesid")},false)
	ID('notepadchangemode').addEventListener('click',function() {showmode(mode,true)},false) //anzeigen 
	//hier alle BBcodes-listeners
	ID('bbb').addEventListener('click',function() {addbbcode('[b]','[/b]')},false)
	ID('bbi').addEventListener('click',function() {addbbcode('[i]','[/i]')},false)
	ID('bbu').addEventListener('click',function() {addbbcode('[u]','[/u]')},false)
	ID('colorpick').addEventListener('change',function() {addbbcode('[color='+ID('colorpick').value+']','[/color]')},false)
	ID('trooppick').addEventListener('change',function() {addbbcode(ID('trooppick').value,'')},false)
	ID('respick').addEventListener('change',function() {addbbcode(ID('respick').value,'')},false)
	ID('buildpick').addEventListener('change',function() {addbbcode(ID('buildpick').value,'')},false)
	img=document.createElement("img")
	img.setAttribute("id","writerid")
	img.setAttribute("src",urls["img"]["notepadico"])
	img.setAttribute("title",info["notepad"]["tit"])
	ID("notepadico").appendChild(img)
	img.addEventListener('click',function() {showobj("notepad");showmode(1,true);},false)
	ID('notemove').style.backgroundImage='url("'+urls["img"]["windowsbg"]+'")'
	if (!GM_getValue("hiddennotes")) {
		showobj("notepad")
	} else {
		hideobj("notepad")
	}
	markpage()
	showmode(1,true)
	}
	else {
		markpage()
		showmode(1,true) // gleich in die Anzeige wechseln.
	}
	}
}
//bbcode_verstecken
function bb_hide(boo) {
	ID('bbb').style.visibility=boo
	ID('bbi').style.visibility=boo
	ID('bbu').style.visibility=boo
	ID('colorpick').style.visibility=boo
	ID('trooppick').style.visibility=boo
	ID('respick').style.visibility=boo
	ID('buildpick').style.visibility=boo
}

//modus wechseln
function showmode(m,t) {
	if(m) {
			if (ID('nottext') && t) {
					savetext()
			}
		ID('img_mode').src=urls["img"]["notepad_write_en"]
		ID('notepadarea').innerHTML="<span id='notshow' wrap='hard' ></span>"
		ID("notshow").innerHTML=BBCodetoHTML(GM_getValue("text"+GM_getValue("page")))
		//Hier noch das Problem mit dem CRLF....
		mode=false
		bb_hide("hidden")
		}
	else if (!m) {
		ID('img_mode').src=urls["img"]["notepad_view_en"]
		ID('notepadarea').innerHTML="<textarea id='nottext' type='text/plain' wrap='hard' ></textarea>"
		ID("nottext").value=GM_getValue("text"+GM_getValue("page"))
		mode=true
		bb_hide("visible")
	}
}
function addbbcode(aTag,eTag) {
	var input=ID('nottext')
	if(typeof input.selectionStart != 'undefined')
	  {
		/* Einfügen des Formatierungscodes */
		var start = input.selectionStart;
		var end = input.selectionEnd;
		if (start==end) {
			input.value = input.value.substr(0, start) + aTag + eTag + input.value.substr(end);

		}else {
			var insText = input.value.substring(start, end);
			input.value = input.value.substr(0, start) + aTag + insText + eTag + input.value.substr(end);
		}
		/* Anpassen der Cursorposition */
		var pos;
			if (insText.length == 0) {
			  pos = start + aTag.length;
			} else {
			  pos = start + aTag.length + insText.length + eTag.length;
			}
		input.selectionStart = pos;
		input.selectionEnd = pos;
	  }
}
function BBCodetoHTML(t) {
	t=t.replace(/\r\n/img,"<br>") // zeilen umbrüche
	t=t.replace(/\n\r/img,"<br>")// zeilen umbrüche
	t=t.replace(/\n/img,"<br>")// zeilen umbrüche
	t=t.replace(/\r/img,"<br>")// zeilen umbrüche
	t=t.replace(/\[b\](.*?)\[\/b\]/img,"<b>$1</b>")// fett[b][/b]
	t=t.replace(/\[i\](.*?)\[\/i\]/img,"<i>$1</i>")//krusiv [i][/i]
	t=t.replace(/\[u\](.*?)\[\/u\]/img,"<u>$1</u>")//unterstrichen [u][/u]
	t=t.replace(/\[url=([^\[]+)\]([^\[]+)\[\/url\]/img,"<a href= '$1' target='_blank'>$2</a>")// url [url=http]...[/url]
	t=t.replace(/\[color=([^\[]+)(?=\])\]([^\[]+)(?=\[\/color\])\[\/color\]/img,"<font color= '$1' >$2</font>") // farben [color=green][/color]
	t=t.replace(/\[img_stone\]/img,"<img src='"+urls["img"]["img_ka_res2"]+"'>")
	t=t.replace(/\[img_wood\]/img,"<img src='"+urls["img"]["img_ka_res1"]+"'>")
	t=t.replace(/\[img_iron\]/img,"<img src='"+urls["img"]["img_ka_res3"]+"'")
	t=t.replace(/\[img_worker\]/img,"<img src='"+urls["img"]["img_ka_worker"]+"'")
	t=t.replace(/\[img_sword\]/img,"<img src='"+urls["img"]["img_ka_sword"]+"'>")
	t=t.replace(/\[img_spear\]/img,"<img src='"+urls["img"]["img_ka_spear"]+"'>")
	t=t.replace(/\[img_axe\]/img,"<img src='"+urls["img"]["img_ka_axe"]+"'>")
	t=t.replace(/\[img_bow\]/img,"<img src='"+urls["img"]["img_ka_bow"]+"'>")
	t=t.replace(/\[img_spy\]/img,"<img src='"+urls["img"]["img_ka_spy"]+"'>")
	t=t.replace(/\[img_light\]/img,"<img src='"+urls["img"]["img_ka_light"]+"'>")
	t=t.replace(/\[img_heavy\]/img,"<img src='"+urls["img"]["img_ka_heavy"]+"'>")
	t=t.replace(/\[img_ram\]/img,"<img src='"+urls["img"]["img_ka_ram"]+"'>")
	t=t.replace(/\[img_kata\]/img,"<img src='"+urls["img"]["img_ka_kata"]+"'>")
	t=t.replace(/\[img_snob\]/img,"<img src='"+urls["img"]["img_ka_snob"]+"'>")
	t=t.replace(/\[img_build_main\]/img,"<img src='"+urls["img"]["img_ka_main"]+"'>")
	t=t.replace(/\[img_build_stone\]/img,"<img src='"+urls["img"]["img_ka_stone"]+"'>")
	t=t.replace(/\[img_build_wood\]/img,"<img src='"+urls["img"]["img_ka_wood"]+"'>")
	t=t.replace(/\[img_build_iron\]/img,"<img src='"+urls["img"]["img_ka_iron"]+"'>")
	t=t.replace(/\[img_build_storage\]/img,"<img src='"+urls["img"]["img_ka_storage"]+"'>")
	t=t.replace(/\[img_build_hide\]/img,"<img src='"+urls["img"]["img_ka_hide"]+"'>")
	t=t.replace(/\[img_build_farm\]/img,"<img src='"+urls["img"]["img_ka_farm"]+"'>")
	t=t.replace(/\[img_build_barracks\]/img,"<img src='"+urls["img"]["img_ka_barracks"]+"'>")
	t=t.replace(/\[img_build_wall\]/img,"<img src='"+urls["img"]["img_ka_wall"]+"'>")
	t=t.replace(/\[img_build_stable\]/img,"<img src='"+urls["img"]["img_ka_stable"]+"'>")
	t=t.replace(/\[img_build_market\]/img,"<img src='"+urls["img"]["img_ka_market"]+"'>")
	t=t.replace(/\[img_build_garage\]/img,"<img src='"+urls["img"]["img_ka_garage"]+"'>")
	t=t.replace(/\[img_build_snob\]/img,"<img src='"+urls["img"]["img_ka_snob"]+"'>")
	t=t.replace(/\[img_build_smith\]/img,"<img src='"+urls["img"]["img_ka_smith"]+"'>")
	t=t.replace(/\[img_build_statue\]/img,"<img src='"+urls["img"]["img_ka_bstatue"]+"'>")
	return t
}

function savetext() {
	GM_setValue("text"+GM_getValue("page"),ID("nottext").value)
}
//aktiven Seite makieren
function markpage() {
page=GM_getValue("page")
	if (page==1) {
		ID("notesbutton1").setAttribute("style","background-color:rgb(214, 179, 113);")
	} else {
		ID("notesbutton1").setAttribute("style","background: transparent;")
	}
	if (page==2) {
		ID("notesbutton2").setAttribute("style","background-color:rgb(214, 179, 113);")
	} else {
		ID("notesbutton2").setAttribute("style","background: transparent;")
	}
	if (page==3) {
		ID("notesbutton3").setAttribute("style","background-color:rgb(214, 179, 113);")
	} else {
		ID("notesbutton3").setAttribute("style","background: transparent;")
	}
	if (page==4) {
		ID("notesbutton4").setAttribute("style","background-color:rgb(214, 179, 113);")
	} else {
		ID("notesbutton4").setAttribute("style","background: transparent;")
	}
	if (page==5) {
		ID("notesbutton5").setAttribute("style","background-color:rgb(214, 179, 113);")
	} else {
		ID("notesbutton5").setAttribute("style","background: transparent;")
	}
	if (page==6) {
		ID("notesbutton6").setAttribute("style","background-color:rgb(214, 179, 113);")
	} else {
		ID("notesbutton6").setAttribute("style","background: transparent;")
	}
	if (page==7) {
		ID("notesbutton7").setAttribute("style","background-color:rgb(214, 179, 113);")
	} else {
		ID("notesbutton7").setAttribute("style","background: transparent;")
	}
	if (page==8) {
		ID("notesbutton8").setAttribute("style","background-color:rgb(214, 179, 113);")
	} else {
		ID("notesbutton8").setAttribute("style","background: transparent;")
	}
	if (page==9) {
		ID("notesbutton9").setAttribute("style","background-color:rgb(214, 179, 113);")
	} else {
		ID("notesbutton9").setAttribute("style","background: transparent;")
	}
	if (page==10) {
		ID("notesbutton10").setAttribute("style","background-color:rgb(214, 179, 113);")
	} else {
		ID("notesbutton10").setAttribute("style","background: transparent;")
	}
}

//Seite wechseln
function changepage(page) {
		if (ID('nottext')) {
			savetext()
		}
	ID('bbcodediv').style.visibility=false
	GM_setValue("page",page)
	showmode(true,false)
	markpage()
}
/************Ende Notepad*************************************************/

/************Chat*********************************************************/
//Chat erstellen
function chat() {
	if (GM_getValue("chat")) {
		var width=document.body.clientWidth
		var chatdiv=document.createElement("div")
		chatdiv.setAttribute("id","chatdiv")
		x=GM_getValue("chatxkor")
		y=GM_getValue("chatykor")
			if (y < 0 || y > window.innerHeight) {
				y=1
			}
			if (x < 0 || x > (window.innerWidth-25)) {
				x=1
			}
		chatdiv.setAttribute("style","top:"+y+"px;left:"+x+"px;")
		var smiliehtml="<select id='smilie' class='bbselect' style='background: url("+urls["img"]["img_s_smile"]+")' ><option style='display:none;'></option><option value=':)' style='background-image: url("+urls["img"]["img_s_smile"]+");'></option><option value=':(' style='background-image: url("+urls["img"]["img_s_sad"]+");'></option><option value=';)' style='background-image: url("+urls["img"]["img_s_wink"]+");'></option><option value=':P' style='background-image: url("+urls["img"]["img_s_tongue"]+");'></option><option value='B)' style='background-image: url("+urls["img"]["img_s_cool"]+");'></option><option value=':D' style='background-image: url("+urls["img"]["img_s_briggin"]+");'></option><option value=\":'(\" style='background-image: url("+urls["img"]["img_s_crying"]+");'></option><option value='*rolleyes*' style='background-image: url("+urls["img"]["img_s_rolleyes"]+");'></option><option value='*huh*' style='background-image: url("+urls["img"]["img_s_huh"]+");'></option><option value='*unsure*' style='background-image: url("+urls["img"]["img_s_unsure"]+");'></option></select>"
		var selecthtml="<select id='room' ><option value='1'>Global</option><option value='2'>EN</option><option value='3'>DE</option><option value='4'>Beta</option></select>"
		var chatsettings="<input type='text' id='chatinput' maxlength='65' >"+smiliehtml+"<button id='chatsend' alt='"+string["bt_send"]+"'title='"+string["bt_send"]+"'>"+string["bt_send"]+"</button>"+selecthtml+"<button id='hidechat' class='cancel' alt='"+string["bt_hide"]+"'title='"+string["bt_hide"]+"'>"+string["bt_hide"]+"</button>"
		chatdiv.innerHTML="<div id='chatmove' class='move'><span class='windowtitel'>"+info["chat"]["tit"]+"</span><span class='movetitle'><span><span class='infotext_onoff cursorpointer'><span><span class='infotext'>"+string["tit_move"]+"</span>&otimes;</span></span></div><div id='chattext'></div><div class='footer'><div id='settings' >"+chatsettings+"</div></div>"
		ID('toolboxdiv').appendChild(chatdiv)
		chatimg=document.createElement("img")
		chatimg.setAttribute("id","chatimg")
		chatimg.setAttribute("src",urls["img"]["chat"])
		chatimg.setAttribute("title",info["chat"]["tit"])
		ID("chatico").appendChild(chatimg)
		chatimg.addEventListener('click',function() {showobj("chat")},false)
		ID("chatsend").addEventListener('click',function() {send()},false)
		ID("room").addEventListener('change',function() {GM_setValue("room",ID("room").value);},true)
		ID("hidechat").addEventListener('click',function() {hideobj("chat")},false)
		ID('chatmove').style.backgroundImage='url("'+urls["img"]["windowsbg"]+'")'
			if(GM_getValue("showchat")) {
				showobj("chat")
			} else {
				hideobj("chat")
			}
		ID('smilie').addEventListener('change',function() {addsmilie(this.value)},false)
		ID("chatmove").addEventListener('mousedown', function(e){dragStart(e,ID("chatdiv"),"chat");}, false);
		ID('chatdiv').addEventListener('click',function() {setfront("chatdiv")},false)
	}
}
function addsmilie(sm) {
	ID('chatinput').value+=sm
}
//Nachricht schicken
function send() {
	ID("chatsend").disabled=true
	var str= document.title.split(" - ")
	var user=str[1];
	var text = ID("chatinput").value;
	ID("chatinput").value=""
		if((text.length > 65) || (text=="")) {alert(string["al_stringerror"]);ID("chatsend").disabled=false} else {
			var room = GM_getValue("room")
			GM_xmlhttpRequest({
				method: 'GET',
				url: ''+urls["links"]["chat_send"]+'?user='+user+'&text='+text+'&room='+room,
				headers: {
					'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
					'Accept': 'application/atom+xml,application/xml,text/xml',
				},
				onload: function(responseDetails) {
				 ID("chatsend").disabled=false
				}
			});
	}
}
//text erneuern (jede 1.5 Sekunden)
function reloadit() {
	var room = GM_getValue("room")
	ID("room").selectedIndex =(GM_getValue("room")-1)
	var request=GM_xmlhttpRequest({
		method: 'GET',
		url: ''+urls["links"]["chat_get"]+'?room='+room,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			ID("chattext").innerHTML=responseDetails.responseText;//}
		}
	});
	window.setTimeout(function() {reloadit()},1500)
}
//abschicken mit Enter
function hotkeysdown(a) {
	var key=a.keyCode
		if((key==13) && (ID("chatinput").value!="")) {
			send()
		}
}
/************Ende Chat****************************************************/


/************Nachrichten/BerichteSpeicher*********************************/
//Buttons zum Speichern
if(pnmes.test(lref())) {
	if(GM_getValue('messagesaver')&& document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[3]/div[4]/a/span", document, null,XPathResult.ANY_TYPE, null).iterateNext()!=null) {
		document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr/td[11]/img", document, null,XPathResult.ANY_TYPE, null).iterateNext().src=urls["img"]["menu_nn_center"]
		document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td background=\""+urls["img"]["menu_n_back"]+"\" /><span id=\"pnmessaver\" >"+string["bt_savemessage"]+"</span></td><td><img src=\""+urls["img"]["menu_n_right"]+"\" /></td>"
		ID("pnmessaver").addEventListener('click',function() {messaver('pnmes')},true)
	} else if (GM_getValue('messagesaver')&&  document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[3]/div[4]/a/span", document, null,XPathResult.ANY_TYPE, null).iterateNext()==null &&document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table", document, null,XPathResult.ANY_TYPE, null).iterateNext()==null) {
		document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr/td[11]/img", document, null,XPathResult.ANY_TYPE, null).iterateNext().src=urls["img"]["menu_nn_center"]
		document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td background=\""+urls["img"]["menu_n_back"]+"\" /><span id=\"repsaver\" >"+string["bt_savereport"]+"</span></td><td><img src=\""+urls["img"]["menu_n_right"]+"\" /></td>"
		ID("repsaver").addEventListener('click',function() {messaver('rep')},true)
	}
}
//Buttons zum anzeigen in den Notizen
if(tools.test(lref())) {
	if(GM_getValue('messagesaver')) {
		document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr/td[7]/img", document, null,XPathResult.ANY_TYPE, null).iterateNext().src=urls["img"]["menu_nn_center"]
		document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td background=\""+urls["img"]["menu_n_back"]+"\" /><span id=\"pnshow\" >"+string["bt_showmessages"]+"</span></td><td><img src=\""+urls["img"]["menu_nn_center"]+"\" /></td>"
		document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td background=\""+urls["img"]["menu_n_back"]+"\" /><span id=\"repshow\">"+string["bt_showreports"]+"</span></td><td><img src=\""+urls["img"]["menu_n_right"]+"\" /></td>"
		ID("pnshow").addEventListener('click',function() {messhower('pnmes')},false)
		ID("repshow").addEventListener('click',function() {messhower('rep')},false)
	}
}
//Speichern der Nachrichten/Berichte
function messaver(type) {
	if (type=="pnmes") {
		var messages=eval(GM_getValue('messages', "[]"))
		document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[4]/table", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML="";
		var divtext=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[4]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML;
		var headertext=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML;
		messages.push(headertext+"<br />"+divtext)
		GM_setValue('messages',uneval(messages))
		alert(string["al_savedmessage"])
	}  else {
		ob=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/table", document, null, XPathResult.ANY_TYPE, null)
		i=0
			do {
				i++
				table=ob.iterateNext()
					if(bbcode.test(table.innerHTML)) {
						document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/div[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<div class=\"smallButton\"><span onclick=\"javascript:$('bb_code').style.display = ($('bb_code').style.display == 'block') ? 'none' : 'block'\" style=\"cursor:pointer\" >BB-Code</span>"
						document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/table["+i+"]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML=""
						document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/table["+(i+1)+"]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML=""
						break;
					}
			} while (table!=null)
		var reports=eval(GM_getValue('reports', "[]"))
		var divtext=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML;
		reports.push(divtext)
		GM_setValue('reports',uneval(reports))
		alert(string["al_savedreport"])
	}
}
//Anzeigen der Nachrichten/Berichte
function messhower(type) {
	if(!ID("showdiv")) {
		var head="<div style=\"background-image: url(\""+urls["img"]["menu_back"]+"\";); background-position: left center; background-repeat: repeat-x; width: 100%;\">"+document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+"</div>"
		document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML="<h1>Tools</h1>"+head+"<div id=\"showdiv\"></div>"
	}
		if (type=="pnmes") {
		var messages=eval(GM_getValue('messages', "[]"))
		str=""
			for(var i =0; i < messages.length;i++) {
				str+="<div class='message_number'>"+string["tit_message"]+"&nbsp;"+(i+1)+"</div>" //hier noch ändern
				str+=messages[i]
			}
		var sel="<select id='selmessage'>"
			for(var i =0; i < messages.length;i++) {
				sel+="<option value='"+i+"'>"+string["tit_message"]+"&nbsp;"+(i+1)+"</option>"
			}
		sel+="</select>"
		ID("showdiv").innerHTML=str+sel+" <button id=\"delpn\" alt='"+string["bt_deletemessages"]+"' title='"+string["bt_deletemessages"]+"'>"+string["bt_deletemessages"]+"</button>"
		ID("delpn").addEventListener('click',function() {mesdel('pnmes',ID('selmessage').value)},false)
		}else {
		var reports=eval(GM_getValue('reports', "[]"))
		str=""
			for(var i =0; i < reports.length;i++) {
				str+="<div class='message_number'>"+string["tit_report"]+"&nbsp;"+(i+1)+"</div>" //hier noch ändern
				str+=reports[i]
			}
		var sel="<select id='selreport'>"
			for(var i =0; i < reports.length;i++) {
				sel+="<option value='"+i+"'>"+string["tit_report"]+"&nbsp;"+(i+1)+"</option>"
			}
		sel+="</select>"
		ID("showdiv").innerHTML=str+sel+" <button id=\"delrep\" alt='"+string["bt_deletereports"]+"' title='"+string["bt_deletereports"]+"'>"+string["bt_deletereports"]+"</button>"
		ID("delrep").addEventListener('click',function() {mesdel('rep',ID('selreport').value)},false)
		}
	ID("pnshow").addEventListener('click',function() {messhower('pnmes')},false)
	ID("repshow").addEventListener('click',function() {messhower('rep')},false)
}
//Löschen der Nachrichten/Berichte
function mesdel(type,n) {
	if (type=="pnmes") {
		var message=eval(GM_getValue('messages', "[]"))
		var message_new= new Array()
			for(var i =0; i < message.length;i++) {
				if(i != n) {
					message_new.push(message[i])
				}
			}
		GM_setValue('messages',uneval(message_new))
		alert(string["al_deletedmessages"])
		messhower("pnmes")
		}else {
			var reports=eval(GM_getValue('reports', "[]"))
			var reports_new= new Array()
				for(var i =0; i < reports.length;i++) {
					if(i != n) {
						reports_new.push(reports[i])
					}
				}
		GM_setValue('reports',uneval(reports_new))
		alert(string["al_deletedreport"])
		messhower("repmes")
	}
}
/************Ende Nachrichten/BerichteSpeicher****************************/

/************Ressourcenrechner********************************************/
function calcresources() {
	if(recruit.test(lref()) && GM_getValue("calculator")) {
		res1=0
		res2=0
		res3=0
		res4=0
		farmer=0
		templer=0
		knappe=0
		berser=0
		langbo=0
		spaeh=0
		kreuz=0
		schw=0
		sturm=0
		tri=0
			try{
				if(document.getElementsByName("farmer")[0].name=="farmer") {
					var farmer=document.getElementsByName("farmer")[0].value
				}
			}catch(e) {}
			try{
				if(document.getElementsByName("sword")[0].name=="sword") {
					var templer=document.getElementsByName("sword")[0].value
				}
			}catch(e) {}
			try{
				if(document.getElementsByName("spear")[0].name=="spear") {
					var knappe=document.getElementsByName("spear")[0].value
				}
			}catch(e) {}
			try{
				if(document.getElementsByName("axe")[0].name=="axe") {
					var berser=document.getElementsByName("axe")[0].value
				}
			}catch(e) {}
			try{
				if(document.getElementsByName("bow")[0].name=="bow") {
					var langbo=document.getElementsByName("bow")[0].value
				}
			}catch(e) {}
			try{
				if(document.getElementsByName("spy")[0].name=="spy") {
					var spaeh=document.getElementsByName("spy")[0].value
				}
			}catch(e) {}
			try{
				if(document.getElementsByName("light")[0].name=="light") {
					var kreuz=document.getElementsByName("light")[0].value
				}
			}catch(e) {}
			try{
				if(document.getElementsByName("heavy")[0].name=="heavy") {
					var schw=document.getElementsByName("heavy")[0].value
				}
			}catch(e) {}
			try{
				if(document.getElementsByName("ram")[0].name=="ram") {
					var sturm=document.getElementsByName("ram")[0].value
				}
			}catch(e) {}
			try{
				if(document.getElementsByName("kata")[0].name=="kata") {
					var tri=document.getElementsByName("kata")[0].value
				}
			}catch(e) {}
		res1= farmer*3+templer*30+knappe*10+berser*40+langbo*80+spaeh*40+kreuz*100+schw*100+sturm*100+tri*200
		res2= farmer*10+templer*10+knappe*20+berser*50+langbo*160+spaeh*60+kreuz*100+schw*300+sturm*500+tri*600
		res3= farmer*7+templer*80+knappe*30+berser*50+langbo*80+spaeh*60+kreuz*300+schw*500+sturm*200+tri*200
		res4=farmer*1+templer*1+knappe*1+berser*1+langbo*1+spaeh*2+kreuz*4+schw*6+sturm*5+tri*8
		img1="<img src='/img/res2.png' />"
		img2="<img src='/img/res1.png' />"
		img3="<img src='/img/res3.png' />"
		img4="<img src='/img/worker.png' />"
			if(ID("resou1")) {
				ID("resou1").innerHTML=res1; ID("resou2").innerHTML=res2 ; ID("resou3").innerHTML=res3; ID("resou4").innerHTML=res4;
			} else {
				calchtml="<table id='calctable'><tbody><tr><td class='needres'>"+string["tit_calctitel"]+"</td><td class='ressis'>"+img1+"<span id='resou1'>"+res1+"</span>"+img2+"<span id='resou2'>"+res2+"</span>"+img3+"<span id='resou3'>"+res3+"</span></td><td class='siedler'>"+img4+"<span id='resou4'>"+res4+"</span></td></tr></tbody></table>"
				document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[3]/td/div/table/tbody", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML="<tr>"+calchtml+"</tr>"
			}
		window.setTimeout(function() {calcresources()},1000)
	}
}
/************Ende Ressourcenrechner***************************************/

/************Hideheader***************************************************/
//Prüfung welche Version
if(GM_getValue("header")==0 && GM_getValue("headeractive") && !map.test(document.location.href) ) {hideheader()} else if (GM_getValue("header")==1 && GM_getValue("headeractive")) {
	hidetop=document.createElement("img")
	hidetop.setAttribute("id","hidetop")
	hidetop.setAttribute("title",info["header"]["tit"])
	hidetop.setAttribute("src",urls["img"]["header"])
	hidetop.setAttribute("style","visibility: visible;")
	hidetop.innerHTML=string["bt_hidetop"]
	ID('headerico').appendChild(hidetop)
	ID("hidetop").addEventListener('click',function() {hideheader()},false)
}
//Verstecken des Headers
function hideheader() {
	document.getElementsByTagName("head")[0].innerHTML+="<style type='text/css'>html{ position:relative; top:-150px; }n.forum_contentpane { position:relative; top:150px; } n#map{ position:relative; top:0px; }</style>"
}
/************Ende HideHeader**********************************************/

/************countdown****************************************************/
//countdown erstellen
function count() {
	if(GM_getValue('countdownactive')) {
		if(!ID("countdown")) {
			var countdiv=document.createElement("div")
			countdiv.setAttribute("id","countdown")
			x=GM_getValue("countdownposxkor")
			y=GM_getValue("countdownposykor")
				if (y < 0 || y > window.innerHeight) {
					y=1
				}
				if (x < 0 || x > (window.innerWidth-25)) {
					x=1
				}
			countdiv.setAttribute("style","top:"+y+"px;left:"+x+"px;visibility:hidden;")
			countdiv.innerHTML="<div class='move' id='countdownmoveit'><span class='windowtitel'>"+info["countdown"]["tit"]+"</span><span class='infotext_onoff cursorpointer'><span><span class='infotext'>"+string["tit_move"]+"</span>&otimes;</span></span></div><div id='countdownops'><input id='text' type='text'><button id='addbutton' alt='"+string["bt_add"]+"' title='"+string["bt_add"]+"'>"+string["bt_add"]+"</button><input id='month' type='text' maxlength='2' title='"+string['tit_month']+"'>:<input id='day' type='text' maxlength='2' title='"+string['tit_day']+"'>:<input id='hour' type='text' maxlength='2'title='"+string['tit_hour']+"'>:<input id='minute' maxlength='2' type='text' title='"+string['tit_min']+"'>:<input id='secound' maxlength='2' type='text' title='"+string['tit_sec']+"'></div><div id='events'></div><div class='footer'><button class='cancel' id='addhide' alt='"+string["bt_hide"]+"' title='"+string["bt_hide"]+"'>"+string["bt_hide"]+"</button></div>"
			ID('toolboxdiv').appendChild(countdiv)
			var countclock=document.createElement("img")
			countclock.setAttribute("id","countclock")
			countclock.setAttribute("src","http://www.bitzones.net/images/icons/countdown.png")
			countclock.setAttribute("title",info["countdown"]["tit"])
			ID("countdownico").appendChild(countclock)
		}
		countdown_table_refresh()
		now= new Date()
		ID('month').value=leading_zero(now.getMonth()+1)
		ID('day').value=leading_zero(now.getDate())
		ID("hour").value=leading_zero(now.getHours())
		ID("minute").value=leading_zero(now.getMinutes())
		ID("secound").value=leading_zero(now.getSeconds())
		ID("addbutton").addEventListener('click',function() {savecountdown()},true)
		countdown_time_refresh()
		ID("countclock").addEventListener('click',function() {showobj("countdown")},false)
		ID("addhide").addEventListener('click',function() {hideobj("countdown")},false)
		ID("countdownmoveit").addEventListener('mousedown', function(e){dragStart(e,ID("countdown"),"countdownpos");}, false);
		ID('countdown').addEventListener('click',function() {setfront("countdown")},false)
		ID('countdownmoveit').style.backgroundImage='url("'+urls["img"]["windowsbg"]+'")'
		if(GM_getValue('showcountdown')) {
			showobj("countdown")
		} else {
			hideobj("countdown")	
		}
	}
}
//Eintrag abspeichern
function savecountdown() {
	now= new Date()
	var text=ID("text").value
	var regex=/\[d=\d+:\d+:\d+\]/
	var a=now.getFullYear()
	var mon=ID('month').value-1
	var d=  ID('day').value
	var h = ID("hour").value;
	var m = ID("minute").value;
	var s = ID("secound").value;
		if(text!="" && !isNaN(a) && !isNaN(mon) && !isNaN(d) && !isNaN(h) && !isNaN(m) && !isNaN(s)) {
			countdown=eval(GM_getValue("countdown", "[]"))
			if(regex.test(text)) {
			yearmon=new Date(a,mon,d).getTime()
			str1=text.replace(/.*\[d=(.*)\]/,"$1")
			str2=str1.split(":")
			ms=(s*1000+m*60000+h*3600000+yearmon)-((parseInt(str2[0])*3600000)+(parseInt(str2[1])*60000)+(parseInt(str2[2])*1000))
			text=text.replace(/(.*)\[d=(.*)\]/,"$1 (+$2)")
			} else {
			yearmon=new Date(a,mon,d).getTime()
			ms=s*1000+m*60000+h*3600000+yearmon
			}
			later=new Date(ms)
			countdown.push(later.getTime()+"{time}"+text)
			countdown.sort()
			GM_setValue("countdown",uneval(countdown))
			ID("text").value=""
			countdown_table_refresh()
		}
		else {
			alert(string["tit_wrong_countdown"])
		}
}
//Restzeit berechnen
function getcountdown(time) {
	now=new Date().getTime()
	dif=time-now
		if(dif < 0) {return "<span style='color:#FF0000;'>"+string["tit_end"]+"</span>"
		}
	insec=Math.round(dif/1000)
	h=leading_zero(parseInt(insec/3600))
	m=leading_zero(parseInt(rest(insec/3600)*60))
	sec=leading_zero(parseInt(rest(insec/60)*60))
		if(insec <= 120) {
			text="<span style='color:#ff0000;'><span class='numbers'>"+h+"</span><span class='bullets'>:</span><span class='numbers'>"+m+"</span><span class='bullets'>:</span><span class='numbers'>"+sec+"</span></span>";
		}
		else {
			text="<span class='numbers'>"+h+"</span><span class='bullets'>:</span><span class='numbers'>"+m+"</span><span class='bullets'>:</span><span class='numbers'>"+sec+"</span>";
		}
	return text
}
//null davor setzen
function leading_zero(n) {
	if(n.toString().length==1) {
		n="0"+n.toString();
	}
	return n;
}
//Zeit erneuern
function countdown_time_refresh() {
	try {countdown=eval(GM_getValue("countdown", "[]"))
		for(var i=0;i<countdown.length;i++) {
			str=countdown[i].split("{time}")
			ID("endtime"+i).innerHTML=getcountdown(str[0])
		}
	} catch(e) {}
	window.setTimeout(function() {countdown_time_refresh();},500)
}
//tabelle neu laden
function countdown_table_refresh() {
	var tr=""
	countdown=eval(GM_getValue("countdown", "[]"))
		for(var i=0;i<countdown.length;i++) {
		tr+="<tr>"
		str=countdown[i].split("{time}")
		tr+="<td class='eventname'>"+str[1]+"</td><td class='td_endtime' id='endtime"+i+"'>"+getcountdown(str[0])+"</td><td class='td_del'><img src='"+urls["img"]["del"]+"' id='delimg"+i+"' /></td>"
		tr+="</tr>"
		}
	table="<table><tr><th></th><th></th><th></th></tr>"+tr+"</table>"
	ID("events").innerHTML=table
		for(var i=0;i<countdown.length;i++) {
		str=countdown[i]
		event(i,str)
		}
}
//Eventlistener hinzufügen
function event(i,str) {
	ID("delimg"+i).addEventListener('click',function() {removefromlist(str)},false)
}
//Eintrag löschen
function removefromlist(str) {
	countdown=eval(GM_getValue("countdown", "[]"))
	countdown2=new Array()
		for(var i=0;i<countdown.length;i++) {
			if( countdown[i] != str) {countdown2.push(countdown[i])
			}
		}
	GM_setValue("countdown",uneval(countdown2))
	countdown_table_refresh()
}
//Rest berechnen
function rest(zahl) {
	zahl=zahl.toString()
	str=zahl.split(".")
	z=str[1]/(Math.pow(10,(str[1].length)))
	return z
}
/************Ende countdown***********************************************/

/************200.000******************************************************/
//200.000 einsetzen
if(market.test(lref())) {
	m_send=/menue_s_back.png/
	if(GM_getValue('market') && m_send.test(document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/table/tbody/tr/td[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext().getAttribute("background"))) {
	var fill=GM_getValue('fillsend')
	var result=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table[2]/tbody/tr[2]/td[5]", document, null, XPathResult.ANY_TYPE, null).iterateNext()
		if(result) {
			result.innerHTML+="<p class=\"click\" onclick=\"insertNum('kingsage', 'send_res2', '"+fill+"'); insertNum('kingsage', 'send_res1', '"+fill+"'); insertNum('kingsage', 'send_res3', '"+fill+"');\" ><img src=\""+urls["img"]["arrow"]+"\" /> "+fill+"</p><p class='click' id='lastvil'><img src=\""+urls["img"]["arrow"]+"\" /> "+string["tit_lastvil"]+" ("+GM_getValue('lastx')+"|"+GM_getValue('lasty')+")"+"</p>";
		}
		if(!result) {
			var result= document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table[2]/tbody/tr[2]/td[4]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<p class=\"click\" onclick=\"insertNum('kingsage', 'send_res2', '"+fill+"'); insertNum('kingsage', 'send_res1', '"+fill+"'); insertNum('kingsage', 'send_res3', '"+fill+"');\" ><img src=\""+urls["img"]["arrow"]+"\" /> "+fill+"</p><p class='click' id='lastvil'><img src=\""+urls["img"]["arrow"]+"\" /> "+string["tit_lastvil"]+" ("+GM_getValue('lastx')+"|"+GM_getValue('lasty')+")"+"</p>";
		}
	ID('lastvil').addEventListener('click',function() {insertlastvil();},true)				
	var result=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/input", document, null, XPathResult.ANY_TYPE, null).iterateNext()
	result.addEventListener('click',function() {setlastvil();},true)
	
		i=1
		stein=0;
		holz=0;
		eisen=0;
		esel=0;
		if(document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext()!=null) {
			try {
				do {
						i++
						steintr=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML.replace(/\./,"")
						if(!isNaN(parseInt(steintr))) {stein=stein+parseInt(steintr)}
						holztr=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[3]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML.replace(/\./,"")
						if(!isNaN(parseInt(holztr))) {holz=holz+parseInt(holztr)}
						eisentr=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[4]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML.replace(/\./,"")
						if(!isNaN(parseInt(eisentr))) {eisen=eisen+parseInt(eisentr)}
						eseltr=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[5]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML.replace(/\./,"")
						if(!isNaN(parseInt(eseltr))) {esel=esel+parseInt(eseltr)}
						
					} while (steintr!=null)
			}catch(e) {}
			i-=2
				elem=document.createElement("tr")
				if(esel==0) {
					elem.innerHTML="<tr><th>"+i+"</th><th>"+stein+"</th><th>"+holz+"</th><th>"+eisen+"</th><th></th><th></th></tr>"
					// document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=
				} else {
					elem.innerHTML="<tr><th>"+i+"</th><th>"+stein+"</th><th>"+holz+"</th><th>"+eisen+"</th><th>"+esel+"</th><th></th><th></th><th></th><th></th></tr>"
					// document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=
				}
				document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody", document, null, XPathResult.ANY_TYPE, null).iterateNext().appendChild(elem)
				
		}
		i=1
		stein=0;
		holz=0;
		eisen=0;
		esel=0;
		if(document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[3]", document, null, XPathResult.ANY_TYPE, null).iterateNext()!=null) {
			try {
				do {
						i++
						steintr=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[3]/tbody/tr["+i+"]/td[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML.replace(/\./,"")
						if(!isNaN(parseInt(steintr))) {stein=stein+parseInt(steintr)}
						holztr=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[3]/tbody/tr["+i+"]/td[3]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML.replace(/\./,"")
						if(!isNaN(parseInt(holztr))) {holz=holz+parseInt(holztr)}
						eisentr=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[3]/tbody/tr["+i+"]/td[4]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML.replace(/\./,"")
						if(!isNaN(parseInt(eisentr))) {eisen=eisen+parseInt(eisentr)}
						eseltr=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[3]/tbody/tr["+i+"]/td[5]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML.replace(/\./,"")
						if(!isNaN(parseInt(eseltr))) {esel=esel+parseInt(eseltr)}
						
					} while (steintr!=null)
			}catch(e) {}
			i-=2
				elem=document.createElement("tr")
				if(esel==0) {
					elem.innerHTML+="<tr><th>"+i+"</th><th>"+stein+"</th><th>"+holz+"</th><th>"+eisen+"</th><th></th><th></th></tr>"
				} else {
					elem.innerHTML+="<tr><th>"+i+"</th><th>"+stein+"</th><th>"+holz+"</th><th>"+eisen+"</th><th>"+esel+"</th><th></th><th></th><th></th><th></th></tr>"
				}
			document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[3]/tbody", document, null, XPathResult.ANY_TYPE, null).iterateNext().appendChild(elem)
		}
	}
}
function setlastvil() {
	GM_setValue('lastx',ID('send_x').value)
	GM_setValue('lasty',ID('send_y').value)
}
function insertlastvil() {
	ID("send_x").value=GM_getValue('lastx')
	ID("send_y").value=GM_getValue('lasty')
}
/************Ende 200.000*************************************************/

/************Minimap & Brief-Button auf Siedlungsansicht******************/
//Minimap und Briegbutton auf Siedlungsansicht
if(citinfo.test(lref())) {
	if(GM_getValue('smallmap')) {
		document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<th>"+string["tit_mapofregion"]+"</th>";
		document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td rowspan=\"7\"><img src=\"\" id=\"map\" style=\"width: 226px; height: 226px;\" />"
		var x=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[2]/td[2]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML.slice(0,3)
		var y=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[2]/td[2]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML.slice(4,7)
		ID("map").src="minimap.php?x="+x+"&y="+y+""
		var userid=document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[4]/td[2]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href
		var trenn=userid.indexOf("id=")
		var id=userid.substr(trenn+3,userid.length)
		ind1=lref().indexOf("info") //adden zur Übersicht...
		ind2=lref().indexOf("=")
		var city=lref().substr(ind2+1)
		var city2=city.substr(0,city.indexOf("&s"))
		document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[4]/td[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="&nbsp;<img src=\""+urls["img"]["mail"]+"\" onclick=\"document.location.href='/game.php?village="+city2+"&s=messages&m=new&pid="+id+"'\" style=\"cursor:pointer\"\" />"
	}
}
/************Ende Minimap & Brief-Button auf Siedlungsansicht*************/

/************Notizbalken*************/
if(GM_getValue('notizbalkenactive')) {
	var tab=document.getElementsByClassName("ressilist")
	tab[0].innerHTML+="<tr><td colspan='2' ><span id='notiz'>"+shownotiz()+"</span></td><td><button style='background-color:#D6B371; border:1px solid #666;-moz-border-radius:20px;padding: 0 1px;'  id='newentry' alt='"+string['tit_entry']+"' title='"+string['tit_entry']+"'>"+string['tit_entry']+"</button><button style='background-color:#D6B371; float:right;padding: 0 1px;border:1px solid #666;-moz-border-radius:20px;'  id='newentrykill' alt='"+string['bt_hide']+"' title='"+string['bt_hide']+"'>"+string['bt_hide']+"</button></td></tr>"
	ID('newentry').addEventListener('click', function(){newentry();},true);
	ID('newentrykill').addEventListener('click', function(){killentry();},true);
	}

function shownotiz() {
	var notiz=eval(GM_getValue('notizen'))
	var regex= /village=(\d+)*/
	regex.exec(document.location.href)
	var vilnum=RegExp.$1
	for(var i = 0;i<notiz.length; i++) {
		split= notiz[i].split("{note}")
		if(split[0]==vilnum) {
			return split[1]
		}
	}
	return ""
}
function newentry() {
	var notiz=eval(GM_getValue('notizen'))
	var regex= /village=(\d+)*/
	regex.exec(document.location.href)
	var vilnum=RegExp.$1
	text=shownotiz()
	if(text!="") {
		ein=prompt(string["tit_insert"],text)
	} else {
		ein=prompt(string["tit_insert"],text)
	}
	if(ein) {
		var changed=false;
		for(var i = 0; i<notiz.length; i++) {
			split= notiz[i].split("{note}")
			if(split[0]==vilnum) {
				notiz[i]=vilnum+"{note}"+ein
				changed=true;
				break;
			}
		}
		if(!changed) {
			notiz.push(vilnum+"{note}"+ein)
		}
		GM_setValue('notizen',uneval(notiz))
	}
	ID("notiz").innerHTML=shownotiz()
}
function killentry() {
	var notiz=eval(GM_getValue('notizen'))
	var regex= /village=(\d+)*/
	regex.exec(document.location.href)
	var vilnum=RegExp.$1
	var changed=false;
	for(var i = 0; i<notiz.length; i++) {
		split= notiz[i].split("{note}")
		if(split[0]==vilnum) {
			notiz[i]=vilnum+"{note}"+""
			changed=true;
			break;
		}
	}
	if(!changed) {
		notiz.push(vilnum+"{note}"+"")
	}
	GM_setValue('notizen',uneval(notiz))
	ID("notiz").innerHTML=shownotiz()
}
/************Ende notizbalken*************/

/***********Weltkarte*******************/
function worldmap() {
	var ismap = confirm(string["al_worldmap"])
	if(ismap) {
		text="<table border='0' cellSpacing=\"0\" cellPadding=\"0\">"
		url=document.location.href
		wurl=url.substr(0,url.indexOf("game.php"))
		for(var y=22;y <= 1000;y+=45) {
			text+="<tr>"
			for(var x=22;x <= 1000;x+=45) {
				text+="<td>"
				text+="<img src='"+wurl+"minimap.php?x="+x+"&y="+y+"'>"
				text+="</td>"
			}
			text+="</tr>"
		}
		text+="</table>"
		win = window.open("")
		win.document.title=info["worldmap"]["tit"]
		win.document.write(text)
		win.document.close();
	}
} 
/**********ENDE Weltkarte **************/

/**********MultiMarket******************/
function multimarket() {
	if(GM_getValue("multimarketactive")) {
		var ico=document.createElement("img")
		ico.setAttribute("id","multimarket_ico")
		ico.setAttribute("src",urls["img"]["multimarketico"])
		ico.setAttribute("title",info["multimarket"]["tit"])
		ID("multimarketico").appendChild(ico)
		ID("multimarket_ico").addEventListener('click',function() {showobj("multimarket")},true)
		if(!ID("multimarketdiv")) {
			var multimarketdiv=document.createElement("div")
			multimarketdiv.setAttribute("id","multimarketdiv")
			x=GM_getValue("multimarketposxkor")
			y=GM_getValue("multimarketposykor")
				if (y < 0 || y > window.innerHeight) {
					y=1
				}
				if (x < 0 || x > (window.innerWidth-25)) {
					x=1
				}
			tx=GM_getValue("mmx")
			ty=GM_getValue("mmy")
			res1=GM_getValue("mmres1")
			res2=GM_getValue("mmres2")
			res3=GM_getValue("mmres3")
			
			multimarketdiv.setAttribute("style","top:"+y+"px;left:"+x+"px;visibility:hidden;")
			multimarket_html="<div id='mmtarget'><input type='text' id='mmtargetx'  value='"+tx+"'><input type='text' id='mmtargety' value='"+ty+"'></div><div id='mmres'><input type='text' id='mmres1'  value='"+res1+"'><input type='text' id='mmres2'  value='"+res2+"'><input type='text' id='mmres3'  value='"+res3+"'></div><br><button id='mmall' alt='"+string["bt_mm_all"]+"' title='"+string["bt_mm_all"]+"'>"+string["bt_mm_all"]+"</button><button id='mmnone' alt='"+string["bt_mm_none"]+"' title='"+string["bt_mm_none"]+"'>"+string["bt_mm_none"]+"</button><button id='mmstart' alt='"+string["bt_send"]+"' title='"+string["bt_send"]+"'>"+string["bt_send"]+"</button><div id='mmmain'><table><tr><th></th><th>"+string["tit_dorf"]+"</th><th>Status</th></tr>"
			var marketfrom=eval(GM_getValue('multimarketvillages'))
			
			for(var i = 0;i<marketfrom.length; i++) {
				split= marketfrom[i].split("{!}")
				multimarket_html+="<tr><td><input type='checkbox' id='mmc"+i+"'></td><td><span>"+split[0]+"</span><input type='hidden' id='mmnum"+i+"' value='"+split[1]+"'><td><img id='mms"+i+"' src='"+urls["img"]["multimarket_wait"]+"' /></td></tr>"
			}
			
			multimarketdiv.innerHTML="<div class='move' id='multimarketmove'><span class='windowtitel'>"+info["multimarket"]["tit"]+"</span><span class='infotext_onoff cursorpointer'><span><span class='infotext'>"+string["tit_move"]+"</span>&otimes;</span></span></div>"+multimarket_html+"</table></div><div class='footer'><button class='cancel' id='multimarketaddhide' alt='"+string["bt_hide"]+"' title='"+string["bt_hide"]+"'>"+string["bt_hide"]+"</button></div>"
			ID('toolboxdiv').appendChild(multimarketdiv)
			ID('mmstart').addEventListener('click',function() {startmultimarket()},false)
			ID('mmall').addEventListener('click',function() {mmselectall(true)},false)
			ID('mmnone').addEventListener('click',function() {mmselectall(false)},false)
			ID('mmtargetx').addEventListener('change',function() {mmsave("mmx",ID("mmtargetx").value);},false)
			ID('mmtargety').addEventListener('change',function() {mmsave("mmy",ID("mmtargety").value);},false)
			ID('mmres1').addEventListener('change',function() {mmsave("mmres1",ID("mmres1").value);},false)
			ID('mmres2').addEventListener('change',function() {mmsave("mmres2",ID("mmres2").value);},false)
			ID('mmres3').addEventListener('change',function() {mmsave("mmres3",ID("mmres3").value);},false)
		}
		ID("multimarketaddhide").addEventListener('click',function() {hideobj("multimarket")},false)
		ID("multimarketmove").addEventListener('mousedown', function(e){dragStart(e,ID("multimarketdiv"),"multimarketpos");}, false);
		ID('multimarketdiv').addEventListener('click',function() {setfront("multimarketdiv")},false)
		

		ID('multimarketmove').style.backgroundImage='url("'+urls["img"]["windowsbg"]+'")'

		if(GM_getValue('showmultimarket')) {
			showobj("multimarket")
		} else {
			hideobj("multimarket")	
		}	
		regex=/&s=info_player&m=profile/
		name=document.title
		name=name.split(" - ")[1]
		if((regex.test(document.location.href) && document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr/td/table/tbody/tr/th", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML.split(":")[1].replace(/^\s+|\s+$/g, '')==name)) {
			document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<span id='mmupdate' >"+string["bt_update"]+"</span>"
			ID("mmupdate").addEventListener('click',function() {updatemm()},false)

		}
		
	}
}

function mmsave(type,val) {
	GM_setValue(type,val)
}
function mmselectall(mode) {
	i=0
	cbox=0;	
	while (cbox!=null) {
		cbox=ID("mmc"+i+"")
			if(cbox!=null) {
				cbox.checked=mode
			}
		i++
	} 
}


function updatemm() {
	multimarketvillages=new Array()
	i=1
	do {
		i++
		var result= document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td/table/tbody/tr["+i+"]/td/a", document, null,XPathResult.ANY_TYPE, null);
		var rst=result.iterateNext();
		if (rst) {		
			vil_num=rst.href.split("info_village&id=")[1]
			name=rst.innerHTML;
			if(vil_num!=null && name!= null) {
				multimarketvillages.push(name+"{!}"+vil_num)
			}
		} else {
			break;
		}
	} while(rst!=null);
	GM_setValue("multimarketvillages",uneval(multimarketvillages))
	document.location.reload()
}

function startmultimarket() {
	res1=parseInt(ID("mmres1").value)
	res2=parseInt(ID("mmres2").value)
	res3=parseInt(ID("mmres3").value)
	sx=parseInt(ID("mmtargetx").value)
	sy=parseInt(ID("mmtargety").value)
	if(!isNaN(res1) && !isNaN(res2) && !isNaN(res3) && !isNaN(sx) && !isNaN(sy)) {
		i=0
		img=0;	
		while (img!=null) {
			img=ID("mms"+i+"")
			if(img!=null) {
				img.src=urls["img"]["multimarket_wait"]
			}
			i++
		} 
		i=0;
		cbox=0;	
		while (cbox!=null) {
			cbox=ID("mmc"+i+"")
			if(cbox!=null && cbox.checked==true) {
				vnum=ID("mmnum"+i).value
				send_step1(res1,res2,res3,sx,sy,vnum,i)
			}
			i++
		}
	} else {
		alert(string["al_empty"])
	}
}

function send_step1(res2,res1,res3,send_x,send_y,from_vil,num) {
	uri=document.location.href
	url1=uri.split("?")[0]
	GM_xmlhttpRequest(
		{
			method: "POST",
			url: url1+"?village="+from_vil+"&s=build_market&m=send&inta=send",
			headers: { "Content-type" : "application/x-www-form-urlencoded" },
			data: encodeURI("send_res2="+res2+"&send_res1="+res1+"&send_res3="+res3+"&send_x="+send_x+"&send_y="+send_y+"&village_name="+send_x+"%7"+send_y+""),
			onload: function (responseDetails) {
			  var dt = document.implementation.createDocumentType("html",
				  "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
				doc = document.implementation.createDocument('', '', dt),
				html = doc.createElement('html');

			  html.innerHTML = responseDetails.responseText;
			  doc.appendChild(html);
			  pcode=doc.forms[0].action.split("&p=")[1]
			  send_step2(res2,res1,res3,send_x,send_y,from_vil,pcode,num)
			}
		}
	);
}

function send_step2(res2,res1,res3,send_x,send_y,from_vil,pcode,num) {
	uri=document.location.href
	url1=uri.split("?")[0]
	GM_xmlhttpRequest(
		{
			method: "POST",
			url: url1+"?village="+from_vil+"&s=build_market&m=send&a=marketSend&p="+pcode,
			headers: { "Content-type" : "application/x-www-form-urlencoded" },
			data: encodeURI("send_res2="+res2+"&send_res1="+res1+"&send_res3="+res3+"&send_x="+send_x+"&send_y="+send_y+""),
			onload: function (responseDetails) {
			 ID("mms"+num).src=urls["img"]["multimarket_ready"]
			}
		}
	);
}

/**********ENDE MultiMarket*************/

/******QOUTETAG******************************/
function quotetag() {
	regex=/&s=messages&m=in&id=/
	regex2=/&s=messages&m=in&p=(.*)&id=(.*)/
	regex3=/&s=messages&m=in&a=messageReply&p=(.*)&id=(.*)/
	if(regex3.test(document.location.href)) {
		try {
			document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[4]/table[2]/tbody/tr[2]/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML="<a class='menuline' href=\"javascript:insertTags('[quote]','[/quote]','Quote');\"><span>Quote</span></a>"
		} catch(e) {}
	}
	if(regex.test(document.location.href) || regex2.test(document.location.href)) {
		try {
			document.evaluate("/html/body/div[3]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[4]/table/tbody/tr[2]/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML="<a class='menuline' href=\"javascript:insertTags('[quote]','[/quote]','Quote');\"><span>Quote</span></a>"
		} catch(e) {}
	}
}
/******ENDE QOUTETAG**************************/

/**********News******************/
function createnews() {
	if(ID("newsdiv")==null) {
		if(!ID("newsdiv")) {
			var newsdiv=document.createElement("div")
			newsdiv.setAttribute("id","newsdiv")
			x=GM_getValue("newsposxkor")
			y=GM_getValue("newsposykor")
				if (y < 0 || y > window.innerHeight) {
					y=1
				}
				if (x < 0 || x > (window.innerWidth-25)) {
					x=1
				}
			v1x=GM_getValue("vil1x")	
			v1y=GM_getValue("vil1y")	
			v2x=GM_getValue("vil2x")	
			v2y=GM_getValue("vil2y")	
			
			newsdiv.setAttribute("style","top:"+y+"px;left:"+x+"px;visibility:hidden;")
			news_html="<div id='newscontentdiv'></div>"
			newsdiv.innerHTML="<div class='move' id='newsmove'><span class='windowtitel'>News</span><span class='infotext_onoff cursorpointer'><span><span class='infotext'>"+string["tit_move"]+"</span>&otimes;</span></span></div>"+news_html+"<div class='footer'><button class='cancel' id='newsaddhide' alt='"+string["bt_hide"]+"' title='"+string["bt_hide"]+"'>"+string["bt_hide"]+"</button><button class='cancel' id='newsoverview' alt='"+string["bt_overview"]+"' title='"+string["bt_overview"]+"'>"+string["bt_overview"]+"</button></div>"
			ID('toolboxdiv').appendChild(newsdiv)
		}
		ID("newsaddhide").addEventListener('click',function() {hideobj("news")},false)
		ID("newsoverview").addEventListener('click',function() {getNewsOverview()},false)
		ID("newsmove").addEventListener('mousedown', function(e){dragStart(e,ID("newsdiv"),"newspos");}, false);
		ID('newsdiv').addEventListener('click',function() {setfront("newsdiv")},false)
		ID('newsmove').style.backgroundImage='url("'+urls["img"]["windowsbg"]+'")'
		showobj("news")	
		getNewsOverview();
	}
}

function getNewsOverview() {
	ID("newsoverview").disabled=true;
	GM_xmlhttpRequest({
		method: 'GET',
		url: urls["links"]["news"]+'?action=overview',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			ID("newscontentdiv").innerHTML=responseDetails.responseText;
			hrefs= document.getElementsByClassName("readmore")
			for(i=0;i<=hrefs.length-1;i++)
			{
				hrefs[i].addEventListener('click',function() {readNews(this.getAttribute("id"))},false)
			}
		}
	});
}

function readNews(id) {
	GM_xmlhttpRequest({
		method: 'GET',
		url: urls["links"]["news"]+'?action=shownews&newsid='+id,
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			ID("newscontentdiv").innerHTML=responseDetails.responseText;
			ID("newsoverview").disabled=false;
			
		}
	});
}
function getLastID() {
		GM_xmlhttpRequest({
		method: 'GET',
		url: urls["links"]["news"]+'?action=lastid',
		headers: {
			'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
			'Accept': 'application/atom+xml,application/xml,text/xml',
		},
		onload: function(responseDetails) {
			if(responseDetails.status==200) {
				if(GM_getValue("lastnews")<responseDetails.responseText) {
					GM_setValue("lastnews",responseDetails.responseText)
					NewsInfo()
				}
			}
		}
	});
}

function NewsInfo() 
{
	div=document.createElement("div")
	div.setAttribute("id","newsinfodiv")
	div.innerHTML="<span id='title'>News</span><span id='info'>New information about the toolbox avaible.</span><button id='readnow'>Read now</button><button id='readlater'>Read later</button>"
	ID("toolboxdiv").appendChild(div)
	ID("readnow").addEventListener('click',function() {ID("newsinfodiv").style.display='none';createnews();},false)
	ID("readlater").addEventListener('click',function() {ID("newsinfodiv").style.display='none';},false)
}
/**********ENDE News*************/

/**Allgemeine Functionen**************************************************/
//toolboxdiv erstellen

function hasPremium()
{
	var buffs=document.getElementsByClassName("buff")
	try {
		for(i=0;i<=buffs.length;i++)
		{
			if(buffs[i].getAttribute("data-buff-type")=="0") 
			{
				return true;
			}
		}
		return false;
	} catch (e) {
		return false;
	}
}
function createtoolboxdiv() {
	toolboxdiv=document.createElement("div")
	toolboxdiv.setAttribute("id","toolboxdiv")
	body.appendChild(toolboxdiv)
}
//Icondiv erstellern
function createicondiv() {
	icondiv=document.createElement("div")
	icondiv.setAttribute("id","toolbox")
	ID('toolboxdiv').appendChild(icondiv)
	icondiv.innerHTML+="<div id='headerico'></div><div id='multimarketico'></div><div id='chatico'></div><div id='notepadico'></div><div id='countdownico'></div><div id='settingsico'></div>"
}
//Css datei laden
function setcss() {
	var style=document.createElement("link")
	style.setAttribute("type","text/css")
	style.setAttribute("rel","stylesheet")
	style.setAttribute("href",urls["resource"]["css_file"]) //hier die url zum stylesheet
	ID('toolboxdiv').appendChild(style)
}
//deleting iframe
function deliframe() {
	var iframe=document.evaluate("//*[@id=\"banner_container\"]", document, null,XPathResult.ANY_TYPE, null).iterateNext() //deletes the right Iframe
	if(iframe) {iframe.style.visibility="hidden"}
}
//Bewegt ein Obj
function showobj(type) {
//Notepad anzeigen
	if(type=="notepad") {
		ID("writerid").style.visibility="hidden"
		ID("notesid").style.visibility="visible"
		if(ID("nottext")) {ID("nottext").value=GM_getValue("text"+GM_getValue("page")) }//hier text.
		GM_setValue("hiddennotes",false)
	}
//Chat anzeigen
	else if(type=="chat") {
		ID("chatdiv").style.visibility="visible"
		ID("chatimg").style.visibility="hidden"
		GM_setValue("showchat",true)
		reloadit()
	}
	else if(type=="countdown") {
		ID("countdown").style.visibility='visible';ID("countclock").style.visibility='hidden';
		GM_setValue('showcountdown',true)
	}
	else if(type=="settings") {
		ID("settingsdiv").style.visibility="visible"
		ID("settingspic").style.visibility='hidden'
		GM_setValue('showsettings',true)
	}
	else if(type=="multimarket") {
		ID('multimarket_ico').style.visibility="hidden"
		ID('multimarketdiv').style.visibility="visible"
		GM_setValue('showmultimarket',true)
	} else if(type=="news") {
		ID('newsdiv').style.visibility="visible"
	}
}

//Versteckt ein Obj
function hideobj(type) {
	if(type=="notepad") {
		ID("writerid").style.visibility="visible"
		ID("notesid").style.visibility="hidden"
		ID('bbcodediv').style.visibility=false
		ID("writerid").addEventListener('click',function() {showobj("notepad")},false)
		if(ID('nottext')) {GM_setValue("text"+GM_getValue("page"),ID("nottext").value)} //hier text.
		GM_setValue("hiddennotes",true)
	}
//Chat verstecken
	else if(type=="chat") {
		ID("chatdiv").style.visibility="hidden"
		ID("chatimg").style.visibility="visible"
		ID("chatimg").addEventListener('click',function() {showobj("chat")},false)
		GM_setValue("showchat",false)
	}
	else if(type=="countdown") {
		ID("countdown").style.visibility='hidden';ID("countclock").style.visibility='visible';
		GM_setValue('showcountdown',false)
	}
	else if(type=="settings") {
		ID("settingsdiv").style.visibility="hidden"
		ID("settingspic").style.visibility='visible'
		GM_setValue('showsettings',false)
	}
	else if(type=="multimarket") {
		ID('multimarket_ico').style.visibility="visible"
		ID('multimarketdiv').style.visibility="hidden"
		GM_setValue('showmultimarket',false)
	} else if(type=="news") {
		ID('newsdiv').style.visibility="hidden"
	}
}
//holt ein Fenster nach vorne
function setfront(obj) {
	var ele =document.getElementById(obj)
	ele.style.zIndex = ++dragObj.zIndex
}
//gibt ID(elem) zurück
function ID(obj) {
	id=document.getElementById(obj);
	return id;
}
//gibt location.href zurück
function lref() {
	return document.location.href
}
//http request zu DOM parsen
function getDOC(url, callback) {
    GM_xmlhttpRequest({
        method: 'GET',
        url: url,
        onload: function (responseDetails) {
          var dt = document.implementation.createDocumentType("html",
              "-//W3C//DTD HTML 4.01 Transitional//EN", "http://www.w3.org/TR/html4/loose.dtd"),
            doc = document.implementation.createDocument('', '', dt),
            html = doc.createElement('html');

          html.innerHTML = responseDetails.responseText;
          doc.appendChild(html);
          callback(doc);
        }
    });
}
//variablenprüfung
function checkgm_vars() {
	if(!GM_getValue('text1')) {
		GM_setValue('text1',"")
	}
	if(!GM_getValue('extrabuttonskes')) {
		GM_setValue('extrabuttonskes',false)
	}
	if(!GM_getValue('text2')) {
		GM_setValue('text2',"")
	}
	if(!GM_getValue('text3')) {
		GM_setValue('text3',"")
	}
	if(!GM_getValue('text4')) {
		GM_setValue('text4',"")
	}
	if(!GM_getValue('text5')) {
		GM_setValue('text5',"")
	}
	if(!GM_getValue('text6')) {
		GM_setValue('text6',"")
	}
	if(!GM_getValue('text7')) {
		GM_setValue('text7',"")
	}
	if(!GM_getValue('text8')) {
		GM_setValue('text8',"")
	}
	if(!GM_getValue('text9')) {
		GM_setValue('text9',"")
	}
	if(!GM_getValue('text10')) {
		GM_setValue('text10',"")
	}
	if(!GM_getValue("notepadxkor")) {
		GM_setValue("notepadxkor",1)
	}
	if(!GM_getValue("notepadykor")) {
		GM_setValue("notepadykor",1)
	}
	if(!GM_getValue("chatxkor")) {
		GM_setValue("chatxkor",1)
	}
	if(!GM_getValue("chatykor")) {
		GM_setValue("chatykor",1)
	}
	if(!GM_getValue("settxkor")) {
		GM_setValue("settxkor",1)
	}
	if(!GM_getValue("settykor")) {
		GM_setValue("settykor",1)
	}
	if(!GM_getValue("countdownposxkor")) {
		GM_setValue("countdownposxkor",1)
	}
	if(!GM_getValue("countdownposykor")) {
		GM_setValue("countdownposykor",1)
	}
	if(!GM_getValue("multimarketposykor")) {
		GM_setValue("multimarketposykor",1)
	}
	if(!GM_getValue("multimarketposxkor")) {
		GM_setValue("multimarketposxkor",1)
	}
	if(!GM_getValue("newsposykor")) {
		GM_setValue("newsposykor",1)
	}
	if(!GM_getValue("newsposxkor")) {
		GM_setValue("newsposxkor",1)
	}
	if(!GM_getValue('pnmessave')) {
		GM_setValue('pnmessave',"")
	}
	if(!GM_getValue('repsave')) {
		GM_setValue('repsave',"")
	}
	if(!GM_getValue('room')) {
		GM_setValue('room',1)
	}
	if(!GM_getValue('fillsend')) {
		GM_setValue('fillsend',200000)
	}	
	if(!GM_getValue('lastx')) {
		GM_setValue('lastx',000)
	}	
	if(!GM_getValue('lasty')) {
		GM_setValue('lasty',0)
	}
	if(!GM_getValue('vil1x')) {
		GM_setValue('vil1x',0)
	}	
	if(!GM_getValue('vil1y')) {
		GM_setValue('vil1y',0)
	}
	if(!GM_getValue('vil2x')) {
		GM_setValue('vil2x',0)
	}	
	if(!GM_getValue('vil2y')) {
		GM_setValue('vil2y',0)
	}
	if(!GM_getValue('mmy')) {
		GM_setValue('mmy',0)
	}
	if(!GM_getValue('mmx')) {
		GM_setValue('mmx',0)
	}
	if(!GM_getValue('mmres1')) {
		GM_setValue('mmres1',0)
	}
	if(!GM_getValue('mmres2')) {
		GM_setValue('mmres2',0)
	}
	if(!GM_getValue('mmres3')) {
		GM_setValue('mmres3',0)
	}	
	if(!GM_getValue('lastmenutab')) {
		GM_setValue('lastmenutab',1)
	}
	if(!GM_getValue('lastnews')) {
		GM_setValue('lastnews',0)
	}
	if(eval(GM_getValue("link", "[]"))=="") {
		var link = new Array('&s=build_main','&s=build_barracks','&s=build_market')
		GM_setValue("link",uneval(link));
	}
	if(eval(GM_getValue("countdown", "[]"))=="") {
		var countdown = new Array()
		GM_setValue("countdown",uneval(countdown));
	}
	if(eval(GM_getValue("reports", "[]"))=="") {
		var reports = new Array()
		GM_setValue("reports",uneval(reports));
	}
	if(eval(GM_getValue("messages", "[]"))=="") {
		var messages = new Array()
		GM_setValue("messages",uneval(messages));
	}	
	if(eval(GM_getValue("notizen", "[]"))=="") {
		var notizen = new Array("{note}")
		GM_setValue("notizen",uneval(notizen));
	}
	if(eval(GM_getValue("multimarketvillages", "[]"))=="") {
		var multimarketvillages = new Array()
		GM_setValue("multimarketvillages",uneval(multimarketvillages));
	}

}

function resettsettings() {
	GM_setValue('text1',"")
	GM_setValue('extrabuttonskes',false)
	GM_setValue('text2',"")
	GM_setValue('text3',"")
	GM_setValue('text4',"")
	GM_setValue('text5',"")
	GM_setValue('text6',"")
	GM_setValue('text7',"")
	GM_setValue('text8',"")
	GM_setValue('text9',"")
	GM_setValue('text10',"")	
	GM_setValue("notepadxkor",1)
	GM_setValue("notepadykor",1)
	GM_setValue("chatxkor",1)
	GM_setValue("chatykor",1)
	GM_setValue("settxkor",1)
	GM_setValue("settykor",1)
	GM_setValue("countdownposxkor",1)
	GM_setValue("countdownposykor",1)
	GM_setValue("multimarketposykor",1)
	GM_setValue("multimarketposxkor",1)
	GM_setValue("newsposykor",1)
	GM_setValue("newsposxkor",1)
	GM_setValue('pnmessave',"")
	GM_setValue('repsave',"")
	GM_setValue('room',1)
	GM_setValue('fillsend',200000)
	GM_setValue('lastx',000)
	GM_setValue('lasty',0)
	GM_setValue('vil1x',0)
	GM_setValue('vil1y',0)
	GM_setValue('vil2x',0)
	GM_setValue('vil2y',0)
	GM_setValue('mmy',0)
	GM_setValue('mmx',0)
	GM_setValue('mmres1',0)
	GM_setValue('mmres2',0)
	GM_setValue('mmres3',0)
	GM_setValue('lastmenutab',1)
	GM_setValue('lastnews',0)
	var link = new Array('&s=build_main','&s=build_barracks','&s=build_market')
	GM_setValue("link",uneval(link));
	var countdown = new Array()
	GM_setValue("countdown",uneval(countdown));
	var reports = new Array()
	GM_setValue("reports",uneval(reports));
	var messages = new Array()
	GM_setValue("messages",uneval(messages));
	var notizen = new Array("{note}")
	GM_setValue("notizen",uneval(notizen));
	var multimarketvillages = new Array()
	GM_setValue("multimarketvillages",uneval(multimarketvillages));
	GM_setValue("market",false)
	GM_setValue("highlighter",false)
	GM_setValue("extrabuttons",false)
	GM_setValue("extrabuttonstab",false)
	GM_setValue("extrabuttonskes",false)
	GM_setValue("messagesaver",false)
	GM_setValue("smallmap",false)
	GM_setValue("calculator",false)
	GM_setValue("notepad",false)
	GM_setValue("chat",false)
	GM_setValue("premium",false)
	GM_setValue("headeractive",false)
	GM_setValue("countdownactive",false)
	GM_setValue("notizbalkenactive",false)
	GM_setValue("multimarketactive",false)
	GM_setValue('fillsend',200000)
	var link=new Array()
	GM_setValue("link",uneval(link))
}
function firstrun() {
	if(!GM_getValue("firstrun")) {
	
		GM_xmlhttpRequest({ //Installcounter
			method: 'GET',
			url: urls["links"]["install_counter"],
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {}
		});
		GM_setValue("ID",uniqueID())
		userstats()
		GM_setValue("firstrun",true);
	}
}

function uniqueID() {
	var str=""
	for(i=0;i<=50;i++)
	{
		str+=String.fromCharCode(Math.round(Math.random()*1000))
	}
	return str
}


function userstats() {
	try {
		var reg1=/:\/\/(.*)\.kingsage/
		reg1.exec(document.location.href)
		server=RegExp.$1
		reg1=/kingsage\.(.*)\//
		reg1.exec(document.location.href)
		lang=RegExp.$1
		reg1=/ - (.*) - /
		reg1.exec(document.title)
		user=RegExp.$1
		GM_xmlhttpRequest({ //Installcounter
			method: 'GET',
			url: urls["links"]["userstats"]+'?action=update&user='+user+'&lang='+lang+'&server='+server+'&id='+GM_getValue("ID"),
			headers: {
				'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
				'Accept': 'application/atom+xml,application/xml,text/xml',
			},
			onload: function(responseDetails) {}
		});
	} catch(r) {}
}
/**Ende Allgemeine********************************************************/



/************Drag'n'Drop**************************************************/
function dragStart(e,id,type) {
	dragObj.type=type
	dragObj.elNode = id
	if (dragObj.elNode.nodeType == 3) dragObj.elNode = dragObj.elNode.parentNode;
	dragObj.cursorStartX = e.clientX + window.scrollX;
	dragObj.cursorStartY = e.clientY + window.scrollY;
	dragObj.elStartLeft  = parseInt(dragObj.elNode.style.left, 10);
	dragObj.elStartTop   = parseInt(dragObj.elNode.style.top,  10);
	dragObj.elNode.style.zIndex = ++dragObj.zIndex;
	document.addEventListener("mousemove",dragGo,   true);
	document.addEventListener("mouseup", dragStop, true);
	e.preventDefault();

}
function dragGo(e) {
	e.preventDefault();
	var x = e.clientX
		y = e.clientY
	dragObj.elNode.style.left = (dragObj.elStartLeft + x - dragObj.cursorStartX) + "px";
	dragObj.elNode.style.top = (dragObj.elStartTop  + y - dragObj.cursorStartY) + "px";
	type=dragObj.type
	GM_setValue(type+"xkor",parseInt(dragObj.elNode.style.left))
	GM_setValue(type+"ykor",parseInt(dragObj.elNode.style.top))
}
function dragStop(e) {
	document.removeEventListener("mousemove", dragGo,   true);
	document.removeEventListener("mouseup",   dragStop, true);
}
/************Ende Drag'n'Drop*********************************************/



/************Sprachinitialisierung****************************************/

function parse(big,pattern,alt)
{
	var regex = new RegExp("<"+pattern+">(.*)</"+pattern+">");
	if(regex.exec(big)) { return RegExp.$1;} else {return alt;}
}

function initlang() {
	str=GM_getValue("translation")
	string ={
		bt_save:parse(str,"bt_save","Save"),
		bt_hide:parse(str,"bt_hide","X"),
		bt_send:parse(str,"bt_send","Send"),
		bt_savereport:parse(str,"bt_savereport","Save Report"),
		bt_savemessage:parse(str,"bt_savemessage","Save Message"),
		bt_showreports:parse(str,"bt_showreports","Show reports"),
		bt_showmessages:parse(str,"bt_showmessages","Show messages"),
		bt_deletemessages:parse(str,"bt_deletemessages","Delete message"),
		bt_deletereports:parse(str,"bt_deletereports","Delete report"),
		bt_hidetop:parse(str,"bt_hidetop","Hide header"),
		bt_add:parse(str,"bt_add","Ok"),
		bt_calc:parse(str,"bt_calc","Calculate"),
		bt_update:parse(str,"bt_update","Update Multimarket"),
		bt_mm_all:parse(str,"bt_mm_all","All"),
		bt_mm_none:parse(str,"bt_mm_none","None"),
		bt_apply:parse(str,"bt_apply","Apply"),
		tit_liable:parse(str,"tit_liable","The author of the chat is not responsible for the written text."),
		tit_calctitel:parse(str,"tit_calctitel","Needed resources"),
		tit_headeralways:parse(str,"tit_headeralways","Always"),
		tit_headerbutton:parse(str,"tit_headerbutton","Button"),
		tit_move:parse(str,"tit_move","Move"),
		tit_end:parse(str,"tit_end","passed"),
		tit_message:parse(str,"tit_message","Message"),
		tit_report:parse(str,"tit_report","Report"),
		tit_mapofregion:parse(str,"tit_mapofregion","Region of the village"),
		tit_wrong_countdown:parse(str,"tit_wrong_countdown","No text entered or bad time."),
		tit_month:parse(str,"tit_month","Month"),
		tit_day:parse(str,"tit_day","Day"),
		tit_hour:parse(str,"tit_hour","Hour"),
		tit_min:parse(str,"tit_min","Minute"),
		tit_sec:parse(str,"tit_sec","Secounde"),
		tit_lastvil:parse(str,"tit_lastvil","Last village"),
		tit_insert:parse(str,"tit_insert","Write your comment here"),
		tit_genworldmap:parse(str,"tit_genworldmap","Generate"),
		tit_sound:parse(str,"tit_sound","Sound ON"),
		tit_stop_sound:parse(str,"tit_stop_sound","I noticed the attack. Stop the sound!"),
		tit_dorf:parse(str,"tit_dorf","Villagename"),
		tit_presettings:parse(str,"tit_presettings","Presettings"),
		tit_moveable_windows:parse(str,"tit_moveable_windows","Moveable Windows"),
		tit_extra_buttons:parse(str,"tit_extra_buttons","Extra Buttons"),
		tit_functions:parse(str,"tit_functions","Functions"),
		tit_special:parse(str,"tit_special","Specials"),
		tit_info_kontakt:parse(str,"tit_info_kontakt","Information & Contact"),
		tit_anzeigen:parse(str,"tit_anzeigen","Show"),
		tit_contact:parse(str,"tit_contact","Contact"),
		bt_overview:parse(str,"bt_overview","Overview"),
		tit_button:parse(str,"tit_button","Button"),
		tit_lang_short:parse(str,"lang","EN"),
		tit_translated:parse(str,"translatedby",""),
		tit_entry:parse(str,"tit_entry","Entry"),
		tit_settings:parse(str,"tit_settings","Settings"),
		al_stringerror:parse(str,"al_stringerror","Text is too long or empty. Only 65 chars."),
		al_savedmessage:parse(str,"al_savedmessage","Saved Message"),
		al_savedreport:parse(str,"al_savedreport","Saved Report"),
		al_deletedmessages:parse(str,"al_deletedmessages","Message deleted"),
		al_deletedreport:parse(str,"al_deletedreport","Report deleted"),
		al_worldmap:parse(str,"al_worldmap","Have you set the minimap to 9x9 sectors with 5px?"),
		al_empty:parse(str,"al_empty","Some inputs are empty"),
		op_burg:parse(str,"op_burg","Castle"),
		op_markt:parse(str,"op_markt","Market"),
		op_markta:parse(str,"op_markta","Market-accept"),
		op_bar:parse(str,"op_bar","Barracks orders"),
		op_baraus:parse(str,"op_baraus","Barracks train"),
		op_barfor:parse(str,"op_barfor","Barracks research"),
		op_snob:parse(str,"op_snob","Residence"),
		op_gold:parse(str,"op_gold","Goldsmith"),
		op_map:parse(str,"op_map","Map"),
		op_none:parse(str,"op_none","None"),
		use_kes:parse(str,"use_kes","Using KES userscript?"),
		use_kes_tit:parse(str,"use_kes_tit","KES userscript"),
		use_kes_viewcombined:parse(str,"use_kes_viewcombined","Combined view in the village overview"),
		use_kes_info:parse(str,"use_kes_info","The newest version of KES userscript causes a collision with the toolbox in the combined view villge overview. To prevent this, disable KES or check the following box, so the ToolBox will not generate any buttons in the combined overview"),
		bt_reset:parse(str,"bt_reset","Reset all"),
		bt_reset_info:parse(str,"bt_reset_info","Reset all settings to default values.")
		
	} 
	info = {
		lang: {
			tit: parse(str,"lang_tit","Language"),
			dest: parse(str,"lang_dest","<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Everywhere"),
			info: parse(str,"lang_info","Select your language here")
				},
		premium: {
			tit: parse(str,"premium_tit","Premium account"),
			dest: parse(str,"premium_dest","<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Everywhere"),
			info: parse(str,"premium_info","Only for user with Premiumaccount.")
				},
		fillin: {
			tit: parse(str,"fillin_tit","Resources"),
			dest: parse(str,"fillin_dest","<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Market <img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Sending Resources"),
			info: parse(str,"fillin_info","Fill in a desired quantity of resources to be recalled to the market page with one click as well as the coordinations used last.")
				},
		highlighter: {
			tit: parse(str,"highlighter_tit","Highlight villages"),
			dest: parse(str,"highlighter_dest","<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Overviews <img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Production, Troops"),
			info: parse(str,"highlighter_info","Attacked and/or supported villages will be highlighted in different colours (Attack: Red, Defense arriving: Green, Both: Blue).")
					},
		extrabuttons: {
			tit: parse(str,"extrabuttons_tit","Additional buttons"),
			dest: parse(str,"extrabuttons_dest","<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Overviews"),
			info: parse(str,"extrabuttons_info","Choose up to nine buttons to reach the desination with one click. Order, type and quantity are freely selectable. Functional with premium account only.")
					},
		extrabuttonsorder: {
			tit: parse(str,"extrabuttonsorder_tit","Order"),
			dest: parse(str,"extrabuttonsorder_dest","<img src='http://www.kingsage.de/img/arrow_right_raquo.png'><img src='http://www.kingsage.de/img/arrow_right_raquo.png'> Overviews <img src='http://www.kingsage.de/img/arrow_right_raquo.png'> Additional Buttons"),
			info: parse(str,"extrabuttonsorder_info","Choose the buttons and their order of appearence.")
		},
		extrabuttonstab: {
			tit: parse(str,"extrabuttonstab_tit","Open additional Buttons in a new Tab"),
			dest: parse(str,"extrabuttonstab_dest","<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Overviews <img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Additional Buttons"),
			info: parse(str,"extrabuttonstab_info","Activate this function to open the destinations in a new browser-tab.")
						},
		messagesaver: {
			tit: parse(str,"messagesaver_tit","Save messages & reports"),
			dest: parse(str,"messagesaver_dest","<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Messages & Reports / Tools"),
			info: parse(str,"messagesaver_info","Save messages & reports with one click. Read and delete them in the Kingsage „Tools“.")
					},
		villageinfo: {
			tit: parse(str,"villageinfo_tit","Minimap on villageinfo page"),
			dest: parse(str,"villageinfo_dest","<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Map <img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Villageinfo "),
			info: parse(str,"villageinfo_info","Supplies a minimap into the village info page (works best with a preset of 9 x 9 sectors, 5 Pixel). This feature produces an additional letter symbol to contact the player directly.")
					},
		calc: {
			tit: parse(str,"calc_tit","Recruitment calculator"),
			dest: parse(str,"calc_dest","<img src='http://www.kingsage.de/img/arrow_right_raquo.png'><img src='http://www.kingsage.de/img/arrow_right_raquo.png'> überblick <img src='http://www.kingsage.de/img/arrow_right_raquo.png'> Production, Troops"),
			info:parse(str,"calc_info", "This function shows the necesary resources and settlers for recruitment at the bottom of the page.")
			},
		notepad: {
			tit: parse(str,"notepad_tit","Notepad"),
			dest: parse(str,"notepad_dest","Additional moveable window"),
			info: parse(str,"notepad_info","A Notepad up to ten pages including BB-Code. The pencil symbol activates the edit mode, a click on the eye symbol switches back to the read mode.")
				},
		chat: {
			tit: parse(str,"chat_tit","Chat"),
			dest: parse(str,"chat_dest","Additional moveable window"),
			info: parse(str,"chat_info","A worldwide chat with other users of Kingsage. Different Chatrooms are available.")
			},
		header: {
			tit: parse(str,"header_tit","Hide header"),
			dest: parse(str,"header_dest","<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Everywhere"),
			info: parse(str,"header_info","Hide the unnecesary header of Kingsage pages permanently ('Always') or as the case may be ('Button').")
				},
		countdown: {
			tit: parse(str,"countdown_tit","Countdown"),
			dest: parse(str,"countdown_dest","Additional moveable window"),
			info: parse(str,"countdown_info","Apply a free list of decreasing countdowns.<br />Entries have to be formatted as Month/Day/Hour/Minute/Second.")
				},
		notizbalken: {
			tit:parse(str,"notizbalken_tit","Notebar"),
			dest:parse(str,"notizbalken_dest","Everywhere"),
			info:parse(str,"notizbalken_info","Adds a possibility to note s.th. for each village.")
				},
		worldmap: {
			tit:parse(str,"worldmap_tit","World map"),
			dest:parse(str,"worldmap_dest","Settings"),
			info:parse(str,"worldmap_info","The „Generate“-Button creates a worldmap from mini-maps. Important: Map settings - 9 x 9 sections, 5 pixel.")
				},
		multimarket: {
			tit:parse(str,"multimarket_tit","Multimarket"),
			dest:parse(str,"multimarket_dest","Additional moveable window"),
			info:parse(str,"multimarket_info","Send resources immediately from freely selectable villages to a destination you want. Import and update proceeds in your player info page. Clicking the 'Profile' link opens up an additional link labeled 'Update multimarket'. A click on it updates the list of your villages.")
				}
		}
}
function initurls() {
urls = {
		img: {
			mail:"/img/messages/mail_unread.png",
			arrow:"/img/arrow_right_raquo.png",
			del:"/img/ico_delete.png",
			header:"http://www.bitzones.net/images/icons/hideheader.png",
			menu_back:"/img/tabs/menue_back.png",
			menu_n_back:"/img/tabs/menue_n_back.png",
			menu_nn_center:"/img/tabs/menue_nn_center.png",
			menu_n_right:"/img/tabs/menue_n_right.png",
			countdown_back:"http://www.bitzones.net/images/bg/countdownmove_bg.png",
			chat:"http://www.bitzones.net/images/icons/chat.png",
			chat_back:"http://www.bitzones.net/images/bg/chatmove_bg.png",
			notepadico:"http://www.bitzones.net/images/icons/notepad.png",
			main:"/img/overview/main.png",
			market_in:"http://www.bitzones.net/images/icons/market_in.png",
			market_out:"http://www.bitzones.net/images/icons/market_out.png",
			barracks:"/img/buildings/barracks.png",
			barracks_recruit:"http://www.bitzones.net/images/icons/barracks_recruit.png",
			barracks_research:"http://www.bitzones.net/images/icons/barracks_research.png",
			snob:"/img/buildings/snob.png",
			smith:"/img/buildings/smith.png",
			map:"/img/shortcut/map.png",
			sett_back_eng:"http://www.bitzones.net/images/bg/settingsmove_bg_EN.png",
			info:"http://www.bitzones.net/images/bg/info.png",
			settico:"http://www.bitzones.net/images/icons/settings.png",
			notepad_view_en:"http://www.bitzones.net/images/icons/notepad_view_enabled.png",
			notepad_view_dis:"http://www.bitzones.net/images/icons/notepad_view_disabled.png",
			notepad_write_en:"http://www.bitzones.net/images/icons/notepad_write_enabled.png",
			notepad_write_dis:"http://www.bitzones.net/images/icons/notepad_write_disabled.png",
			notepad_back:"http://www.bitzones.net/images/bg/notepadmove_bg.png",
			bb_b:"http://www.bitzones.net/images/icons/notepad_bold.png",
			bb_i:"http://www.bitzones.net/images/icons/notepad_italic.png",
			bb_u:"http://www.bitzones.net/images/icons/notepad_underline.png",
			colorpick_bg:"http://www.bitzones.net/images/bg/notepad_colorpick_select_bg.png",
			imagepick_troop:"http://www.bitzones.net/images/bg/notepad_trooppick_select_bg.png",
			imagepick_ress:"http://www.bitzones.net/images/bg/notepad_market_select_bg.png",
			imagepick_building:"http://www.bitzones.net/images/bg/notepad_building_select_bg.png",
			img_farmer:"http://www.bitzones.net/images/icons/notepad_unit_farmer.gif",
			img_sword:"http://www.bitzones.net/images/icons/notepad_unit_sword.gif",
			img_spear:"http://www.bitzones.net/images/icons/notepad_unit_spear.gif",
			img_axe:"http://www.bitzones.net/images/icons/notepad_unit_axe.gif",
			img_bow:"http://www.bitzones.net/images/icons/notepad_unit_bow.gif",
			img_spy:"http://www.bitzones.net/images/icons/notepad_unit_spy.gif",
			img_light:"http://www.bitzones.net/images/icons/notepad_unit_light.gif",
			img_heavy:"http://www.bitzones.net/images/icons/notepad_unit_heavy.gif",
			img_ram:"http://www.bitzones.net/images/icons/notepad_unit_ram.gif",
			img_kata:"http://www.bitzones.net/images/icons/notepad_unit_kata.gif",
			img_snob:"http://www.bitzones.net/images/icons/notepad_unit_snob.gif",
			img_res1:"http://www.bitzones.net/images/icons/notepad_stone.gif",
			img_res2:"http://www.bitzones.net/images/icons/notepad_wood.gif",
			img_res3:"http://www.bitzones.net/images/icons/notepad_iron.gif",
			img_b_main:"http://www.bitzones.net/images/icons/notepad_main.gif",
			img_b_stone:"http://www.bitzones.net/images/icons/notepad_build_stone.png",
			img_b_wood:"http://www.bitzones.net/images/icons/notepad_wood.gif",
			img_b_iron:"http://www.bitzones.net/images/icons/notepad_build_iron.png",
			img_b_storage:"http://www.bitzones.net/images/icons/notepad_build_strorage.png",
			img_b_hide:"http://www.bitzones.net/images/icons/notepad_build_hide.png",
			img_b_farm:"http://www.bitzones.net/images/icons/notepad_build_farm.png",
			img_b_barracks:"http://www.bitzones.net/images/bg/notepad_trooppick_select_bg.png",
			img_b_wall:"http://www.bitzones.net/images/icons/notepad_build_wall.png",
			img_b_stable:"http://www.bitzones.net/images/icons/notepad_build_stable.png",
			img_b_market:"http://www.bitzones.net/images/bg/notepad_market_select_bg.png",
			img_b_garage:"http://www.bitzones.net/images/icons/notepad_build_garage.png",
			img_b_snob:"http://www.bitzones.net/images/icons/notepad_build_snob.png",
			img_b_smith:"http://www.bitzones.net/images/icons/notepad_build_smith.png",
			img_b_statue:"http://www.bitzones.net/images/icons/notepad_build_statue.png",
			img_worker:"http://www.bitzones.net/images/icons/notepad_worker.gif",
			black:"http://www.bitzones.net/images/icons/000000.gif",
			blau:"http://www.bitzones.net/images/icons/333399.gif",
			gruen:"http://www.bitzones.net/images/icons/336633.gif",
			lila:"http://www.bitzones.net/images/icons/663366.gif",
			grau:"http://www.bitzones.net/images/icons/666666.gif",
			rot:"http://www.bitzones.net/images/icons/990000.gif",
			img_s_briggin:"http://www.bitzones.net/images/smilies/biggrin.png",
			img_s_cool:"http://www.bitzones.net/images/smilies/cool.png",
			img_s_crying:"http://www.bitzones.net/images/smilies/crying.png",
			img_s_huh:"http://www.bitzones.net/images/smilies/huh.png",
			img_s_rolleyes:"http://www.bitzones.net/images/smilies/rolleyes.png",
			img_s_sad:"http://www.bitzones.net/images/smilies/sad.png",
			img_s_smile:"http://www.bitzones.net/images/smilies/smile.png",
			img_s_tongue:"http://www.bitzones.net/images/smilies/tongue.png",
			img_s_unsure:"http://www.bitzones.net/images/smilies/unsure.png",
			img_s_wink:"http://www.bitzones.net/images/smilies/wink.png",
			img_ka_sword:"/img/units/unit_sword.png",
			img_ka_spear:"/img/units/unit_spear.png",
			img_ka_axe:"/img/units/unit_axe.png",
			img_ka_bow:"/img/units/unit_bow.png",
			img_ka_spy:"/img/units/unit_spy.png",
			img_ka_light:"/img/units/unit_light.png",
			img_ka_heavy:"/img/units/unit_heavy.png",
			img_ka_ram:"/img/units/unit_ram.png",
			img_ka_kata:"/img/units/unit_kata.png",
			img_ka_snob:"/img/units/unit_snob.png",
			img_ka_res1:"/img/res1.png",
			img_ka_res2:"/img/res2.png",
			img_ka_res3:"/img/res3.png",
			img_ka_main:"/img/buildings/main.png",
			img_ka_stone:"/img/buildings/stone.png",
			img_ka_wood:"/img/buildings/wood.png",
			img_ka_iron:"/img/buildings/iron.png",
			img_ka_storage:"/img/buildings/storage.png",
			img_ka_hide:"/img/buildings/hide.png",
			img_ka_farm:"/img/buildings/farm.png",
			img_ka_barracks:"/img/buildings/barracks.png",
			img_ka_wall:"/img/buildings/wall.png",
			img_ka_stable:"/img/buildings/stable.png",
			img_ka_market:"/img/buildings/market.png",
			img_ka_garage:"/img/buildings/garage.png",
			img_ka_bsnob:"/img/buildings/snob.png",
			img_ka_smith:"/img/buildings/smith.png",
			img_ka_statue:"/img/buildings/statue.png",
			img_ka_worker:"/img/worker.png",
			multimarketico:"http://www.bitzones.net/images/icons/multimarket.png",
			news_bg_eng:"http://www.bitzones.net/images/bg/newsmove_bg.png",
			multimarket_bg_eng:"http://www.bitzones.net/images/bg/multimarketmove_bg_EN.png",
			multimarket_wait:"http://www.bitzones.net/images/icons/delete.png",
			multimarket_ready:"http://www.bitzones.net/images/icons/yes.png",
			countdownico:"http://www.bitzones.net/images/icons/countdown.png",
			logo:"http://www.bitzones.net/images/logo.jpg",
			windowsbg:"http://www.bitzones.net/images/bg/windows_bg.png",
		},
		links: {
			chat_get:"http://www.bitzones.net/code/Original/chat.php",
			chat_send:"http://www.bitzones.net/code/Original/chat2.php",
			install_counter:"http://www.bitzones.net/code/Original/installcounter.php",
			userstats:"http://www.bitzones.net/code/Original/userstats.php",
			news:"http://www.bitzones.net/code/Original/news.php",
			translationsdir:"http://www.bitzones.net/code/Original/translations/"
		},
		resource: {
			css_file:"http://www.bitzones.net/css/toolbox_v3.5.css",
			flash_sound:"http://www.bitzones.net/flash/alarm.swf"
		}
	}
}
/************Ende Sprachinitialisierung***********************************/

/************Updateprüfung************************************************/
function checkupdate() {

	//autoupdate
	scriptName='KingsAge Toolbox';
	scriptId='80402';
	// === Stop editing here. ===

	var lastCheck = GM_getValue('lastCheck', 0);
	var lastVersion = GM_getValue('lastVersion', 0);
	var d = new Date();
	var currentTime = Math.round(d.getTime() / 1000); // Unix time in seconds
	if (parseInt(navigator.appVersion)>3) {
		if (navigator.appName=="Netscape") {
			winW = window.innerWidth;
			winH = window.innerHeight;
		}
		if (navigator.appName.indexOf("Microsoft")!=-1) {
			winW = document.body.offsetWidth;
			winH = document.body.offsetHeight;
		}
	}
	if (currentTime > (lastCheck + (2*86400))) { //24 hours after last check
		userstats()
		GM_xmlhttpRequest({
			method: 'GET',
			url: 'http://userscripts.org/scripts/review/'+scriptId+'?format=txt',
			headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey','Accept': 'text/plain',},
			onload: function(responseDetails) {
				var text = responseDetails.responseText;
	   	 		var onSiteVersion = text.substring(text.indexOf("scriptVersion=")+14,text.indexOf("\n",text.indexOf("scriptVersion="))-2);
		    		var onSiteUpdateText = text.substring(text.indexOf("scriptUpdateText=")+18,text.indexOf("\n",text.indexOf("scriptUpdateText="))-3);
		    		if(onSiteVersion > scriptVersion && onSiteVersion > lastVersion) {
			    		GM_addStyle('#gm_update_alert {'
					+'	position: fixed;'
					+'	z-index:100000;'
					+'	top: '+((winH/2)-60)+'px;'
					+'	left: '+((winW/2)-275)+'px;'
					+'	width: 550px;'
					+'	padding: 10px;'
					+'	background: url(http://s5.kingsage.de/img/layout/lay_content.png);'
					+'	text-align: center;'
					+'	font-size: 11px;'
					+'	line-height: 16px;'
					+'	font-family: Verdana;'
					+'	color: #840000;'
					+'	border:1px solid #666;'
					+'	-moz-border-radius:10px;'
					+'	-khtml-border-radius:30px;'
					+'}'
					+'#gm_update_alert_buttons {'
					+'	position: relative;'
					+'	top: -5px;'
					+'	margin: 7px;'
					+'}'
					+'#gm_update_alert_button_close {'
					+'	position: absolute;'
					+'	right: 10px;'
					+'	top: 10px;'
					+'	padding: 0 2px 0 2px;'
					+'	border:1px solid #666;'
					+'	-moz-border-radius:15px;'
					+'	-khtml-border-radius:45px;'
					+'	z-index: inherit;'
					+'	background-color: #d6b371;'
					+'	color: #000;'
					+'	cursor:pointer;'
					+'}'
					+'#gm_update_alert_buttons span, #gm_update_alert_buttons span a  {'
					+'	text-decoration:underline;'
					+'	color: #003399;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}'
					+'#gm_update_alert_buttons span a:hover  {'
					+'	text-decoration:underline;'
					+'	color: #990033;'
					+'	font-weight: bold;'
					+'	cursor:pointer'
					+'}');
			    		newversion = document.createElement("div");
			    		newversion.setAttribute('id', 'gm_update_alert');
			    		newversion.innerHTML = ''
					+'	<b>GreaseMonkey UserScript Update Notification</b><br>'
					+'	There is an update available for &quot;'+scriptName+'&quot; <br>'
					+'	You are currently running version '+scriptVersion+'. The newest version is '+onSiteVersion+'.<br>'
					+'	<br>'
					+'	<div id="gm_update_alert_button_close">'
					+'		Close</div>'
					+'	<b>What do you want to do?</b><br>'
					+'	<div id="gm_update_alert_buttons">'
					+'		<span id="gm_update_alert_button_showinfo"><a href="#">Show&nbsp;Update&nbsp;Info</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_scripthome"><a target="_blank" href="http://userscripts.org/scripts/show/'+scriptId+'">Go&nbsp;To&nbsp;Script&nbsp;Homepage</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_upgrade"><a href="http://userscripts.org/scripts/source/'+scriptId+'.user.js">Upgrade&nbsp;to&nbsp;version&nbsp;'+onSiteVersion+'</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_wait"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;tomorrow</a></span>&nbsp;&nbsp;'
					+'		<span id="gm_update_alert_button_waitnextversion"><a href="#">Don&#39;t&nbsp;remind&nbsp;me&nbsp;again&nbsp;until&nbsp;the&nbsp;next&nbsp;new&nbsp;version</a></span> </div>';
					document.body.insertBefore(newversion, document.body.firstChild);
					ID('gm_update_alert_button_showinfo').addEventListener('click', function(event) {alert(onSiteUpdateText);}, true);
					ID('gm_update_alert_button_wait').addEventListener('click', function(event) {GM_setValue('lastCheck', currentTime);alert("You will not be reminded again until tomorrow.");document.body.removeChild(ID('gm_update_alert'));}, true);
			          		ID('gm_update_alert_button_waitnextversion').addEventListener('click', function(event) {GM_setValue('lastVersion', onSiteVersion);alert("You will not be reminded again until the next new version is released.");document.body.removeChild(ID('gm_update_alert'));}, true);
					ID('gm_update_alert_button_close').addEventListener('click', function(event) {document.body.removeChild(ID('gm_update_alert'));}, true);
			    	}
	    		}
		});
}
}
/************Ende Updateprüfung*******************************************/