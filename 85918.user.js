/* ============================================
KingsAge Toolbox is available at
http://userscripts.org/scripts/show/804026
Development and scripting: Sebastian Neef
Design and stylesheets: Steffen Lilie
Copyright (c) 2010. All rights reserved.
Original graphics used and modified with kind permission of the owner: http://www.kingsage.de
=============================================== */

// ==UserScript==
// @name           KingsAge Toolbox-Beta
// @namespace      All
// @include        http://*.kingsage.*/game.php*
// @exclude        http://board.kingsage.*/*
// @exclude        http://board.kingsage.*/*
// @exclude        http://s*.kingsage.*/forum.php*
// @exclude        http://s*.kingsage.*/popup.php*
// @exclude        http://s*.kingsage.*/map.php*
// @exclude		   http://support.kingsage.*/
// @version		   3.1
// ==/UserScript==

/************Variablenprüfung und Initialisierung ************************/
checkgm_vars()
var scriptVersion=3.1
var scriptUpdateText='New big update to version 3.0! 2 New functions! New Styling! Install now!(01.11.10 - dd/mm/yy)';
var autoremail="toolbox@bitzones.net"
var uorglink="http://userscripts.org/scripts/show/80402"
var lang, beschreibung, urls
initurls()
initlang()
initinfo()
var info = beschreibung[GM_getValue("lang")]
var string = lang[GM_getValue("lang")]
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

window.addEventListener('load',function() {notepad();chat();createsettingsico();settings();calcresources();count();calcvilpoints(),check_attackalarm();runtime();multimarket();quotetag();},true)
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
		part1="<div class='move' id='settingsmove'><span class='infotext_onoff cursorpointer'><span><span class='infotext'>"+string["tit_move"]+"</span>&otimes;</span></span></div><table id='controlpanel'><tbody><tr><th class='th_settingshead'></th><th class='th_settingsinfo' colspan='2'>"+string["tit_active"]+"</th></tr>" //tabellenkopf
		part11="<tr><td class='td_settingshead'>"+info["fillin"]["tit"]+"<input type='text' id='insend'></td><td class='td_settingsopt'><input type='checkbox' id=\"market\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["fillin"]["tit"]+"</h4><h5>"+info["fillin"]["dest"]+"</h5><p>"+info["fillin"]["info"]+"</p></span></span></span></td></tr>" //fill in
		part12="<tr><td class='td_settingshead'>"+info["highlighter"]["tit"]+"</td><td class='td_settingsopt'><input type='checkbox' id=\"highlighter\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["highlighter"]["tit"]+"</h4><h5>"+info["highlighter"]["dest"]+"</h5><p>"+info["highlighter"]["info"]+"</p></span></span></span></td></tr>" // Highlighter
		part8="<tr><td class='td_settingshead'>"+info["extrabuttons"]["tit"]+" <button id='config'>"+string["bt_config"]+"</button></td><td class='td_settingsopt'><input type='checkbox' id=\"extrabuttons\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["extrabuttons"]["tit"]+"</h4><h5>"+info["extrabuttons"]["dest"]+"</h5><p>"+info["extrabuttons"]["info"]+"</p></span></span></span></td></tr>" // extrabuttons
		part9="<tr><td class='td_settingshead'>"+info["extrabuttonstab"]["tit"]+"</td><td class='td_settingsopt'><input type='checkbox' id=\"extrabuttonstab\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["extrabuttonstab"]["tit"]+"</h4><h5>"+info["extrabuttonstab"]["dest"]+"</h5><p>"+info["extrabuttonstab"]["info"]+"</p></span></span></span></td></tr>" // extrabuttonstab
		part13="<tr><td class='td_settingshead'>"+info["messagesaver"]["tit"]+"</td><td class='td_settingsopt'><input type='checkbox' id=\"messagesaver\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["messagesaver"]["tit"]+"</h4><h5>"+info["messagesaver"]["dest"]+"</h5><p>"+info["messagesaver"]["info"]+"</p></span></span></span></td></tr>" // messagesaver
		part14="<tr><td class='td_settingshead'>"+info["villageinfo"]["tit"]+"</td><td class='td_settingsopt'><input type='checkbox' id=\"smallmap\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["villageinfo"]["tit"]+"</h4><h5>"+info["villageinfo"]["dest"]+"</h5><p>"+info["villageinfo"]["info"]+"</p></span></span></span></td></tr>" // Villageinfo
		part10="<tr><td class='td_settingshead'>"+info["calc"]["tit"]+"</td><td class='td_settingsopt'><input type='checkbox' id=\"calculator\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["calc"]["tit"]+"</h4><h5>"+info["calc"]["dest"]+"</h5><p>"+info["calc"]["info"]+"</p></span></span></span></td></tr>" // ressourcecalc
		part5="<tr><td class='td_settingshead'>"+info["notepad"]["tit"]+"</td><td class='td_settingsopt'><input type='checkbox' id=\"notepad\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["notepad"]["tit"]+"</h4><h5>"+info["notepad"]["dest"]+"</h5><p>"+info["notepad"]["info"]+"</p></span></span></span></td></tr>" // Notepad
		part6="<tr><td class='td_settingshead'>"+info["chat"]["tit"]+"</td><td class='td_settingsopt'><input type='checkbox' id=\"chat\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["chat"]["tit"]+"</h4><h5>"+info["chat"]["dest"]+"</h5><p>"+info["chat"]["info"]+"</p></span></span></span></td></tr>" // Chat
		part3="<tr><td class='td_settingshead'>"+info["premium"]["tit"]+"</td><td class='td_settingsopt'><input type='checkbox' id=\"premium\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["premium"]["tit"]+"</h4><h5>"+info["premium"]["dest"]+"</h5><p>"+info["premium"]["info"]+"</p></span></span></span></td></tr>" //premium
		part2="<tr><td class='td_settingshead'>"+string["tit_lang"]+" <select id=\"langselect\"><option value='Eng'>EN</option><option value='DE'>DE</option><option value='Nl'>NL</option></select></td><td  class='td_settingsopt'> <input type='checkbox' disabled='disabled' checked='checked'></td><td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+string["tit_lang"]+"</h4><h5></h5><p>Please select your language! <br>Bitte Sprache ausw&auml;hlen! <br>Selecteer een taal!</p></span></span></span></td></tr>" //Language
		part4="<tr><td class='td_settingshead'>"+info["header"]["tit"]+" <select id=\"headerselect\"><option value='always'>"+string["tit_headeralways"]+"</option><option value='onlybutton'>"+string["tit_headerbutton"]+"</option></select></td><td class='td_settingsopt'><input type='checkbox' id=\"header\" ></td><td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["header"]["tit"]+"</h4><h5>"+info["header"]["dest"]+"</h5><p>"+info["header"]["info"]+"</p></span></span></span></td></tr>" // header
		part7="<tr><td class='td_settingshead'>"+info["countdown"]["tit"]+"</td><td class='td_settingsopt'><input type='checkbox' id=\"countdownbox\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["countdown"]["tit"]+"</h4><h5>"+info["countdown"]["dest"]+"</h5><p>"+info["countdown"]["info"]+"</p></span></span></span></td></tr>" // Coutndown
		part71="<tr><td class='td_settingshead'>"+info["vilpoint"]["tit"]+"</td><td class='td_settingsopt'><input type='checkbox' id=\"vilpointbox\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["vilpoint"]["tit"]+"</h4><h5>"+info["vilpoint"]["dest"]+"</h5><p>"+info["vilpoint"]["info"]+"</p></span></span></span></td></tr> " //villagepointes
		part16="<tr><td class='td_settingshead'>"+info["notizbalken"]["tit"]+"</td><td class='td_settingsopt'><input type='checkbox' id=\"notizbalkenbox\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["notizbalken"]["tit"]+"</h4><h5>"+info["notizbalken"]["dest"]+"</h5><p>"+info["notizbalken"]["info"]+"</p></span></span></span></td></tr>"
		part17="<tr><td class='td_settingshead'>"+info["worldmap"]["tit"]+" <button id='genwmap'>"+string["tit_genworldmap"]+"</button></td><td class='td_settingsopt'>&nbsp;</td><td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["worldmap"]["tit"]+"</h4><h5>"+info["worldmap"]["dest"]+"</h5><p>"+info["worldmap"]["info"]+"</p></span></span></span></td></tr>"
		part18="<tr><td class='td_settingshead'>"+info["attackalarm"]["tit"]+" <span id='sound_opt_des'>"+string["tit_sound"]+"</span><input id='sound_opt'  type='checkbox'></td><td class='td_settingsopt'><input type='checkbox' id=\"attackalarmbox\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["attackalarm"]["tit"]+"</h4><h5>"+info["attackalarm"]["dest"]+"</h5><p>"+info["attackalarm"]["info"]+"</p></span></span></span></td></tr>"
		part19="<tr><td class='td_settingshead'>"+info["runtime"]["tit"]+"</td><td class='td_settingsopt'><input type='checkbox' id=\"runtimebox\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["runtime"]["tit"]+"</h4><h5>"+info["runtime"]["dest"]+"</h5><p>"+info["runtime"]["info"]+"</p></span></span></span></td></tr>"
		part20="<tr><td class='td_settingshead'>"+info["multimarket"]["tit"]+"</td><td class='td_settingsopt'><input type='checkbox' id=\"multimarketbox\" ></td>	<td class='td_settingsinfo'><span class='infotext_onoff'><span><img src='"+urls["img"]["info"]+"' /><span class='infotext infotext1'><h4>"+info["multimarket"]["tit"]+"</h4><h5>"+info["multimarket"]["dest"]+"</h5><p>"+info["multimarket"]["info"]+"</p></span></span></span></td></tr>"
		part21=""
		part22=""
		part23=""
		part24=""
		part25="</tr></tbody></table>"
		imprint="<div class='footer'><div id='madeby'><span class='infotext_onoff cursorpointer'><span><span class='infotext'><span class='innertext'>v."+scriptVersion.toString()+"</span></span>&otimes;</span></span><a href='mailto:"+autoremail+"' class='mailto'>Contact us</a></div>"
		savebutton="<button id='savebutton' class='configbutton'>"+string["bt_save"]+"</button><button id='cancel' class='cancel' >"+string["bt_hide"]+"</button></div>"
		settingsdiv.innerHTML=part1+part2+part3+part4+part5+part6+part7+part71+part8+part9+part10+part11+part12+part13+part14+part16+part17+part18+part19+part20+part21+part22+part23+part24+part25+imprint+savebutton
		ID('toolboxdiv').appendChild(settingsdiv)
		ID("cancel").addEventListener('click',function() {hideobj("settings")},true)
		ID("savebutton").addEventListener('click',function() {savesettings()},false)
		ID("config").addEventListener('click',function() {configbuttons()},false)
		ID("genwmap").addEventListener('click',function() {worldmap()},false)
		switch (GM_getValue('lang')) {
			case "Eng":
				ID('settingsmove').style.backgroundImage='url("'+urls["img"]["sett_back_eng"]+'")'
				break
			case "De":
				ID('settingsmove').style.backgroundImage='url("'+urls["img"]["sett_back_de"]+'")'
				break
			case "Nl":
				ID('settingsmove').style.backgroundImage='url("'+urls["img"]["sett_back_nl"]+'")'
				break
		}
		
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
	if(GM_getValue("lang")=="Eng") {
		ID("langselect").selectedIndex=0
	}
	if(GM_getValue("lang")=="De"){
		ID("langselect").selectedIndex=1
	}
	if(GM_getValue("lang")=="Nl") {
		ID("langselect").selectedIndex=2
	}
	if(GM_getValue("header")=="1") {
		ID("headerselect").selectedIndex=0
	}
	if(GM_getValue("header")=="2") {
		ID("headerselect").selectedIndex=1
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
	if(GM_getValue("vilpointactive")) {
		ID("vilpointbox").checked=true
	} else {
		ID("vilpointbox").checked=false
	}
	if(GM_getValue("notizbalkenactive")) {
		ID("notizbalkenbox").checked=true
	} else {
		ID("notizbalkenbox").checked=false
	}
	if(GM_getValue("attackalarmactive")) {
		ID("attackalarmbox").checked=true
	} else {
		ID("attackalarmbox").checked=false
	}
	if(GM_getValue("sound_opt")) {
		ID("sound_opt").checked=true
	} else {
		ID("sound_opt").checked=false
	}
	if(GM_getValue("runtimeactive")) {
		ID("runtimebox").checked=true
	} else {
		ID("runtimebox").checked=false
	}
	if(GM_getValue("multimarketactive")) {
		ID("multimarketbox").checked=true
	} else {
		ID("multimarketbox").checked=false
	}
	
	ID('insend').value=GM_getValue('fillsend')

}
//Optionen speichern
function savesettings() {
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
	if(ID("premium").checked==true) {
		GM_setValue("premium",true)
	} else {
		GM_setValue("premium",false)
	}
	if(ID("langselect").selectedIndex==0) {
		GM_setValue("lang","Eng")
	}
	if(ID("langselect").selectedIndex==1) {
		GM_setValue("lang","De")
	}
	if(ID("langselect").selectedIndex==2) {
		GM_setValue("lang","Nl")
	}
	if(ID("headerselect").selectedIndex==0) {
		GM_setValue("header","1")
	}
	if(ID("headerselect").selectedIndex==1) {
		GM_setValue("header","2")
	}
	if(ID("header").checked==true) {
		GM_setValue("headeractive",true)
	} else {
		GM_setValue("headeractive",false)
	}
	if(ID("countdownbox").checked==true) {
		GM_setValue("countdownactive",true)
	} else {
		GM_setValue("countdownactive",false)
	}
	if(ID("vilpointbox").checked==true) {
		GM_setValue("vilpointactive",true)
	} else {
		GM_setValue("vilpointactive",false)
	}	
	if(ID("notizbalkenbox").checked==true) {
		GM_setValue("notizbalkenactive",true)
	} else {
		GM_setValue("notizbalkenactive",false)
	}
	if(ID("attackalarmbox").checked==true) {
		GM_setValue("attackalarmactive",true)
	} else {
		GM_setValue("attackalarmactive",false)
	}
	if(ID("sound_opt").checked==true) {
		GM_setValue("sound_opt",true)
	} else {
		GM_setValue("sound_opt",false)
	}
	if(ID("runtimebox").checked==true) {
		GM_setValue("runtimeactive",true)
	} else {
		GM_setValue("runtimeactive",false)
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
	ID("settingsdiv").style.visibility="hidden"
	document.location.reload()
}
//Konfigbuttons erstellen
function configbuttons(){
	if(!ID("configdiv")) {
		var configdiv=document.createElement("div")
		configdiv.setAttribute("id","configdiv")
		configdiv.setAttribute("class","topbox")
		x=GM_getValue("configxkor")
		y=GM_getValue("configykor")
		if (y < 0 || y > window.innerHeight) {
			y=1
		}
		if (x < 0 || x > (window.innerWidth-25)) {
			x=1
		}
		configdiv.setAttribute("style","top:"+y+"px;left:"+x+"px;visibility:visible;")
		option="<option value='none' >"+string["op_none"]+"</option><option value='&s=build_main'>"+string["op_burg"]+"</option><option value='&s=build_market'>"+string["op_markt"]+"</option><option value='&s=build_market&m=accept'>"+string["op_markta"]+"</option><option value='&s=build_barracks'>"+string["op_bar"]+"</option><option value='&s=build_barracks&m=recruit'>"+string["op_baraus"]+"</option><option value='&s=build_barracks&m=research'>"+string["op_barfor"]+"</option><option value='&s=build_snob'>"+string["op_snob"]+"</option><option value='&s=build_smith'>"+string["op_gold"]+"</option><option value='&s=map'>"+string["op_map"]+"</option>"
		table="<table id='controlpanel'><tbody><tr><th class='tablerow1'>"+string["tit_config"]+"</th><th class='tablerow2'>"+string["tit_buttons"]+"</th>"
		tr1="<tr><td>1. Button</td><td><select id='selbutton1'>"+option+"</select></td></tr>"
		tr2="<tr><td>2. Button</td><td><select id='selbutton2'>"+option+"</select></td></tr>"
		tr3="<tr><td>3. Button</td><td><select id='selbutton3'>"+option+"</select></td></tr>"
		tr4="<tr><td>4. Button</td><td><select id='selbutton4'>"+option+"</select></td></tr>"
		tr5="<tr><td>5. Button</td><td><select id='selbutton5'>"+option+"</select></td></tr>"
		tr6="<tr><td>6. Button</td><td><select id='selbutton6'>"+option+"</select></td></tr>"
		tr7="<tr><td>7. Button</td><td><select id='selbutton7'>"+option+"</select></td></tr>"
		tr8="<tr><td>8. Button</td><td><select id='selbutton8'>"+option+"</select></td></tr>"
		tr9="<tr><td>9. Button</td><td><select id='selbutton9'>"+option+"</select></td></tr>"
		savebutton="<div class='footer'><button id='saveconfig' class='configbutton'>"+string["bt_save"]+"</button><button id='cancelconf' class='cancel' >"+string["bt_hide"]+"</button></div>"
		configdiv.innerHTML="<div class='move' id='configmove'><span class='infotext_onoff cursorpointer'><span><span class='infotext_onoff cursorpointer'><span><span class='infotext'>"+string["tit_move"]+"</span>&otimes;</span></span></div>"+table+tr1+tr2+tr3+tr4+tr5+tr6+tr7+tr8+tr9+"</table>"+savebutton
		ID('toolboxdiv').appendChild(configdiv)
		ID("configdiv").addEventListener('mousedown', function(){setfront("configdiv")}, false);
		ID("configmove").addEventListener('mousedown', function(e){dragStart(e,ID("configdiv"),"config");}, false);
		switch (GM_getValue('lang')) {
			case "Eng":
				ID('configmove').style.backgroundImage='url("'+urls["img"]["conf_back_eng"]+'")'
				break
			case "De":
				ID('configmove').style.backgroundImage='url("'+urls["img"]["conf_back_de"]+'")'
				break
			case "Nl":
				ID('configmove').style.backgroundImage='url("'+urls["img"]["conf_back_nl"]+'")'
				break
		}
		
	} else {
		ID("configdiv").style.visibility='visible'
	}
	for(var i=1;i<9;i++) {
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
	ID("cancelconf").addEventListener('click',function() {ID("configdiv").style.visibility='hidden'},true)
	ID("saveconfig").addEventListener('click',function() {saveconfig()},true)
	setfront("configdiv")
}
//Konfig. abspeichern
function saveconfig() {
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
	ID("configdiv").style.visibility='hidden'
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
			thhtml+="<th></th>"
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
	if(type=="forschung" || type=="kombi" || type=="produktion" || type=="gebaude" || type=="trup_eigene" || type=="trup_home" || type=="trup_out" || type=="trupmove") {
		try {
			headtable=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
			span=headtable.colSpan
			if(span > 5) {
				document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().colSpan=(span+i)
				document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
				var i=2
			} else {
				document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
				var i=1
			}
			do {
				i++
				var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td/span/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
				if (result) {
					if(type=="forschung") {
						url=result.href.replace("&s=build_barracks&m=research","")
					//	url=url.replace("&s=build_main","")
					} else {
						url=result.href.replace("&s=overview","")
						url=url.replace("&s=build_main","")
					}
					if (tab) {
						document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
					} else {
						document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
					}
					try{
						if (type=="forschung") {
							var a=11
						}
						if (type=="kombi") {
							var a=15
						}
						if (type=="produktion") {
							var a=9
						}
						if (type=="gebaude") {
							var a =18
						}
						if (type=="trup_eigene") {
							var a = 13
						}
						var l=a
							do {
								a++
								result2=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
							} while(result2!=null);
						}catch(e){}
				} else
				{
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked;
					break;
				}
			} while(result!=null);
		} catch(e) {}
	}
	if(type=="transport" && !/&s=overview_villages&m=3&type=own_offer/.test(lref())) { //heir sind Alle ; Ausgehende; Ankommende ; Eigene
		try{
			headtable=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
			span=headtable.colSpan
				if(span==9 || span==8) {
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().colSpan=(span+i)
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
					var i=2
				} else {
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
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
				var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td["+td+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
				if (result) {
					url=result.href.replace("&s=overview","")
					url=url.replace(/\d+&s=info_village&id=/,"")
					if (tab) {
						document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
					} else {
						document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
					}
					try{
						var a = span
						var l=a
							do {
								a++
								result2=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
							} while(result2!=null);
					}catch(e){GM_log("First:"+e.message)}
				} else
				{
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked;
					break;
				}
			} while(result!=null);
		}catch(e) {GM_log("Secound:"+e.message)}
	}
	//Transporte Angenommene
	if(type=="trans_rec") {
		try {
			headtable=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
			span=headtable.colSpan
			if(span==10) {
				document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().colSpan=(span+i)
				document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
				var i=2
			} else {
				document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
				var i=1
			}
			do {
				i++
				var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]/td[4]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
					if (result) {
						url=result.href.replace(/\d+&s=info_village&id=/,"")

						if (tab) {
							document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
						} else {
							document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
						}
						try{
							var a=span
							var l=a
								do {
									a++
									result2=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
								} while(result2!=null);
						}catch(e){}
					} else {
						document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked;
						document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table/tbody/tr["+(i+1)+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml //
						break;
					}
			} while(result!=null);
		} catch(e) {}
	}
	//Befehle
	if(type=="befehle") {
		try{
			headtable=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
			span=headtable.colSpan
				if(span==14) {
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
					var i=2
				} else {
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
					var i=1;span=14
				}
			td=3
			do {
				i++
				var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td[3]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
					if (result) {
						url=result.href.replace("&s=build_barracks&m=command","")
						if (tab) {
							document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
						} else {
							document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml;
							}
						try{
							var a = span
							var l=a
							do {
								a++
								result2=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
							} while(result2!=null);
						}catch(e){GM_log("First:"+e.message)}
					} else {
						document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked;
						break;
					}
			} while(result!=null);
		}
		catch(e) {GM_log("Secound:"+e.message)}
	}
	//Ohne Premium
	if (type=="normal") {
		try{
			headtable=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
			span=headtable.colSpan
				if(span==8) {
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().colSpan=span+link.length-1
					var i=2
					span=7;
				} else {
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=thhtml;
					var i=1;
					span=7
			}
		do {
			i++
			var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]/td/a", document, null,XPathResult.ANY_TYPE, null);
			var rst=result.iterateNext();
			if (rst) {
					url=rst.href.replace("&s=overview","")
				if (tab) {
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml
				} else {
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdhtml
				}
				try{
					var a = span
					var l=a
					do {
						a++
						result2=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]/td["+a+"]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href=url+link[(a-(l+1))]
					} while(result2!=null);
				}catch(e){GM_log("First:"+e.message)}
			} else {
				document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdmarked
				document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+(i+1)+"]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+=tdleer
				break;
			}
		} while(rst!=null);
	}catch(e){}
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
	notes.innerHTML="<div id='notemove' class='move'><span class='infotext_onoff cursorpointer'><span><span class='infotext'>"+string["tit_move"]+"</span>&otimes;</span></span></div> <div id='bbcodediv'><span id='notepadchangemode'><img src='' id='img_mode'/></span><span id='bbb'><img src='"+urls["img"]["bb_b"]+"' /></span><span id='bbi'><img src='"+urls["img"]["bb_i"]+"' /></span><span id='bbu'><img src='"+urls["img"]["bb_u"]+"' /></span><select class='bbselect' style='background: url("+urls["img"]["colorpick_bg"]+")' id='colorpick'><option style='display:none;'></option><option style='background-image: url("+urls["img"]["black"]+");' value='#000000'></option><option style='background-image: url("+urls["img"]["blau"]+");' value='#333399'></option><option style='background-image: url("+urls["img"]["gruen"]+");' value='#f336633'></option><option style='background-image: url("+urls["img"]["lila"]+");' value='#663366'></option><option style='background-image: url("+urls["img"]["grau"]+");' value='#666666'></option><option style='background-image: url("+urls["img"]["rot"]+");' value='#990000'></option></select><select style='background: url("+urls["img"]["imagepick_troop"]+");' id='trooppick' class='bbselect'><option style='display:none;'></option><option value='[img_sword]' style='background-image: url("+urls["img"]["img_sword"]+");'></option><option value='[img_spear]' style='background-image: url("+urls["img"]["img_spear"]+");'></option><option value='[img_axe]' style='background-image: url("+urls["img"]["img_axe"]+");'></option><option value='[img_bow]' style='background-image: url("+urls["img"]["img_bow"]+");'></option><option value='[img_spy]' style='background-image: url("+urls["img"]["img_spy"]+");'></option><option value='[img_light]' style='background-image: url("+urls["img"]["img_light"]+");'></option><option value='[img_heavy]' style='background-image: url("+urls["img"]["img_heavy"]+");'></option><option value='[img_ram]' style='background-image: url("+urls["img"]["img_ram"]+");'></option><option value='[img_kata]' style='background-image: url("+urls["img"]["img_kata"]+");'></option><option value='[img_snob]' style='background-image: url("+urls["img"]["img_snob"]+");'></option></select><select style='background: url("+urls["img"]["imagepick_ress"]+");' id='respick' class='bbselect' ><option style='display:none;'></option><option value='[img_worker]' style='background-image: url("+urls["img"]["img_worker"]+");'></option><option value='[img_stone]' style='background-image: url("+urls["img"]["img_res2"]+");'></option><option value='[img_wood]' style='background-image: url("+urls["img"]["img_res1"]+");'></option><option value='[img_iron]' style='background-image: url("+urls["img"]["img_res3"]+");'></option></select><select style='background: url("+urls["img"]["imagepick_building"]+");' id='buildpick'class='bbselect' ><option style='display:none;'></option><option value='[img_build_main]' style='background-image: url("+urls["img"]["img_b_main"]+");'></option><option value='[img_build_stone]' style='background-image: url("+urls["img"]["img_b_stone"]+");'></option><option value='[img_build_wood]' style='background-image: url("+urls["img"]["img_b_wood"]+");'></option><option value='[img_build_iron]' style='background-image: url("+urls["img"]["img_b_iron"]+");'></option><option value='[img_build_storage]' style='background-image: url("+urls["img"]["img_b_storage"]+");'></option><option value='[img_build_hide]' style='background-image: url("+urls["img"]["img_b_hide"]+");'></option><option value='[img_build_farm]' style='background-image: url("+urls["img"]["img_b_farm"]+");'></option><option value='[img_build_barracks]' style='background-image: url("+urls["img"]["img_b_barracks"]+");'></option><option value='[img_build_stable]' style='background-image: url("+urls["img"]["img_b_stable"]+");'></option><option value='[img_build_market]' style='background-image: url("+urls["img"]["img_b_market"]+");'></option><option value='[img_build_garage]' style='background-image: url("+urls["img"]["img_b_garage"]+");'></option><option value='[img_build_snob]' style='background-image: url("+urls["img"]["img_b_snob"]+");'></option><option value='[img_build_smith]' style='background-image: url("+urls["img"]["img_b_smith"]+");'></option></select></div><div id='notepadarea'></div><div class='footer'><button id='notesbutton' class='cancel'>"+string["bt_hide"]+"</button><span class='notepadbuttons'>"+buttons+'	</span></div>'; //<textarea id='nottext' ></textarea>
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
	img.setAttribute("title","Notepad")
	ID("notepadico").appendChild(img)
	img.addEventListener('click',function() {showobj("notepad");showmode(1,true);},false)
	ID('notemove').style.backgroundImage='url("'+urls["img"]["notepad_back"]+'")'
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
		var chatsettings="<input type='text' id='chatinput' maxlength='65' >"+smiliehtml+"<button id='chatsend'>"+string["bt_send"]+"</button>"+selecthtml+"<button id='hidechat' class='cancel'>"+string["bt_hide"]+"</button>"
		chatdiv.innerHTML="<div id='chatmove' class='move'><span class='movetitle'><span><span class='infotext_onoff cursorpointer'><span><span class='infotext'>"+string["tit_move"]+"</span>&otimes;</span></span></div><div id='chattext'></div><div class='footer'><div id='settings' >"+chatsettings+"</div></div>"
		ID('toolboxdiv').appendChild(chatdiv)
		chatimg=document.createElement("img")
		chatimg.setAttribute("id","chatimg")
		chatimg.setAttribute("src",urls["img"]["chat"])
		chatimg.setAttribute("title","Chat")
		ID("chatico").appendChild(chatimg)
		chatimg.addEventListener('click',function() {showobj("chat")},false)
		ID("chatsend").addEventListener('click',function() {send()},false)
		ID("room").addEventListener('change',function() {GM_setValue("room",ID("room").value);},true)
		ID("hidechat").addEventListener('click',function() {hideobj("chat")},false)
		ID('chatmove').style.backgroundImage='url("'+urls["img"]["chat_back"]+'")'
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
				//url: 'http://www.bitzones.net/code/Beta/chat2_beta.php?user='+user+'&text='+text+'&room='+room,
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
		//url: 'http://www.bitzones.net/code/Beta/chat_beta.php?room='+room,
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

/************Calcvilpoints************************************************/
function calcvilpoints() {
	if (GM_getValue("vilpointactive")) {
		var width=document.body.clientWidth
		var vilpointdiv=document.createElement("div")
		vilpointdiv.setAttribute("id","vilpointdiv")
		x=GM_getValue("vilpointxkor")
		y=GM_getValue("vilpointykor")
			if (y < 0 || y > window.innerHeight) {
				y=1
			}
			if (x < 0 || x > (window.innerWidth-25)) {
				x=1
			}
		vilpointdiv.setAttribute("style","top:"+y+"px;left:"+x+"px;")
		vilpointdiv.innerHTML="<div id='vilpointmove' class='move'><span class='infotext_onoff cursorpointer'><span><span class='infotext'>"+string["tit_move"]+"</span>&otimes;</span></span></div><span>"+string["tit_paste"]+"</span><textarea id='eingabecalcvilpoints'></textarea><button id='startcalcvilpoints' class='flatbutton'>"+string["bt_calc"]+"</button><input type='text' id='ausgabecalcvilpoint'><div class='footer'><button id='hidevilpoint' class='cancel'>X</button></div>"
		ID('toolboxdiv').appendChild(vilpointdiv)
		vilpointimg=document.createElement("img")
		vilpointimg.setAttribute("id","vilpointimg")
		vilpointimg.setAttribute("src",urls["img"]["vilpoint"])
		vilpointimg.setAttribute("title","Villagepoints")
		ID("vilpointico").appendChild(vilpointimg)
		vilpointimg.addEventListener('click',function() {showobj("vilpoint")},false)
		ID("hidevilpoint").addEventListener('click',function() {hideobj("vilpoint")},false)
		ID("startcalcvilpoints").addEventListener('click',function() {calcpoints()},false)
		switch (GM_getValue('lang')) {
			case "Eng":
				ID('vilpointmove').style.backgroundImage='url("'+urls["img"]["vilpointsmove_bg_eng"]+'")'
				break
			case "De":
				ID('vilpointmove').style.backgroundImage='url("'+urls["img"]["vilpointsmove_bg_de"]+'")'
				break
			case "Nl":
				ID('vilpointmove').style.backgroundImage='url("'+urls["img"]["vilpointsmove_bg_nl"]+'")'
				break
		}
		
			if(GM_getValue("showvilpoint")) {
				showobj("vilpoint")
			} else {
				hideobj("vilpoint")
			}
		ID("vilpointmove").addEventListener('mousedown', function(e){dragStart(e,ID("vilpointdiv"),"vilpoint");}, false);
		ID('vilpointdiv').addEventListener('click',function() {setfront("vilpointdiv")},false)
	}
}
function calcpoints() {
	if(GM_getValue('lang')=="De") {
		var burg=/Burg \(Stufe (\d+)\)/
		var stein=/Steinbruch \(Stufe (\d+)\)/
		var holz=/Sägewerk \(Stufe (\d+)\)/
		var eisen=/Erzbergwerk \(Stufe (\d+)\)/
		var lager=/Lagerhaus \(Stufe (\d+)\)/
		var mueller=/Müller \(Stufe (\d+)\)/
		var kaserne=/Kaserne \(Stufe (\d+)\)/
		var mauer=/Stadtmauer \(Stufe (\d+)\)/
		var zucht=/Eselzucht \(Stufe (\d+)\)/
		var markt=/Markt \(Stufe (\d+)\)/
		var alche=/Alchemist \(Stufe (\d+)\)/
		var resi=/Residenz \(Stufe (\d+)\)/
		var gold=/Goldschmiede \(Stufe (\d+)\)/
		var denk=/Denkmal \(Stufe (\d+)\)/
		var versteck=/Versteck \(Stufe (\d+)\)/
	}
	else if(GM_getValue('lang')=="Eng") {
		var burg=/Catsle \(Stufe (\d+)\)/
		var stein=/Quarry \(Stufe (\d+)\)/
		var holz=/Sawmill \(Stufe (\d+)\)/
		var eisen=/Ore Mine \(Stufe (\d+)\)/
		var lager=/Warehouse \(Stufe (\d+)\)/
		var versteck=/Hideout \(Stufe (\d+)\)/
		var mueller=/Miller \(Stufe (\d+)\)/
		var kaserne=/Barracks \(Stufe (\d+)\)/
		var mauer=/Town Wall \(Stufe (\d+)\)/
		var zucht=/Donkey Stable \(Stufe (\d+)\)/
		var markt=/Market \(Stufe (\d+)\)/
		var alche=/Alchemist \(Stufe (\d+)\)/
		var resi=/Residence \(Stufe (\d+)\)/
		var gold=/Goldsmith \(Stufe (\d+)\)/
		var denk=/Memorial \(Stufe (\d+)\)/
	}
	else if(GM_getValue('lang')=="Nl") { //neu
		var burg=/Catsle \(Stufe (\d+)\)/
		var stein=/Quarry \(Stufe (\d+)\)/
		var holz=/Sawmill \(Stufe (\d+)\)/
		var eisen=/Ore Mine \(Stufe (\d+)\)/
		var lager=/Warehouse \(Stufe (\d+)\)/
		var versteck=/Hideout \(Stufe (\d+)\)/
		var mueller=/Miller \(Stufe (\d+)\)/
		var kaserne=/Barracks \(Stufe (\d+)\)/
		var mauer=/Town Wall \(Stufe (\d+)\)/
		var zucht=/Donkey Stable \(Stufe (\d+)\)/
		var markt=/Market \(Stufe (\d+)\)/
		var alche=/Alchemist \(Stufe (\d+)\)/
		var resi=/Residence \(Stufe (\d+)\)/
		var gold=/Goldsmith \(Stufe (\d+)\)/
		var denk=/Memorial \(Stufe (\d+)\)/
	}
	punkte = 0;
	var intext=document.getElementById("eingabecalcvilpoints").value
	if(burg.exec(intext)) {punkte+=RegExp.$1*20 }
	if(stein.exec(intext)) {punkte+=RegExp.$1*20 }
	if(holz.exec(intext)) {punkte+=RegExp.$1*20 }
	if(eisen.exec(intext)) {punkte+=RegExp.$1*20 }
	if(lager.exec(intext)) {punkte+=RegExp.$1*20 }
	if(mueller.exec(intext)) {punkte+=RegExp.$1*10 }
	if(kaserne.exec(intext)) {punkte+=RegExp.$1*20 }
	if(mauer.exec(intext)) {punkte+=RegExp.$1*20 }
	if(zucht.exec(intext)) {punkte+=RegExp.$1*10 }
	if(markt.exec(intext)) {punkte+=RegExp.$1*20 }
	if(alche.exec(intext)) {punkte+=RegExp.$1*20 }
	if(resi.exec(intext)) {punkte+=RegExp.$1*100 }
	if(gold.exec(intext)) {punkte+=RegExp.$1*40 }
	if(denk.exec(intext)) {punkte+=RegExp.$1*1000 }
	if(versteck.exec(intext)) {punkte+=RegExp.$1*10 }
	document.getElementById("ausgabecalcvilpoint").value=punkte
}
/************Ende Calcvilpoints*******************************************/


/************Nachrichten/BerichteSpeicher*********************************/
//Buttons zum Speichern
if(pnmes.test(lref())) {
	if(GM_getValue('messagesaver')&& document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[3]/div[4]/a/span", document, null,XPathResult.ANY_TYPE, null).iterateNext()!=null) {
		document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr/td[11]/img", document, null,XPathResult.ANY_TYPE, null).iterateNext().src=urls["img"]["menu_nn_center"]
		document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td background=\""+urls["img"]["menu_n_back"]+"\" /><span id=\"pnmessaver\" >"+string["bt_savemessage"]+"</span></td><td><img src=\""+urls["img"]["menu_n_right"]+"\" /></td>"
		ID("pnmessaver").addEventListener('click',function() {messaver('pnmes')},true)
	} else if (GM_getValue('messagesaver')&&  document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[3]/div[4]/a/span", document, null,XPathResult.ANY_TYPE, null).iterateNext()==null &&document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table", document, null,XPathResult.ANY_TYPE, null).iterateNext()==null) {
		document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr/td[11]/img", document, null,XPathResult.ANY_TYPE, null).iterateNext().src=urls["img"]["menu_nn_center"]
		document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td background=\""+urls["img"]["menu_n_back"]+"\" /><span id=\"repsaver\" >"+string["bt_savereport"]+"</span></td><td><img src=\""+urls["img"]["menu_n_right"]+"\" /></td>"
		ID("repsaver").addEventListener('click',function() {messaver('rep')},true)
	}
}
//Buttons zum anzeigen in den Notizen
if(tools.test(lref())) {
	if(GM_getValue('messagesaver')) {
		document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr/td[7]/img", document, null,XPathResult.ANY_TYPE, null).iterateNext().src=urls["img"]["menu_nn_center"]
		document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td background=\""+urls["img"]["menu_n_back"]+"\" /><span id=\"pnshow\" >"+string["bt_showmessages"]+"</span></td><td><img src=\""+urls["img"]["menu_nn_center"]+"\" /></td>"
		document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td background=\""+urls["img"]["menu_n_back"]+"\" /><span id=\"repshow\">"+string["bt_showreports"]+"</span></td><td><img src=\""+urls["img"]["menu_n_right"]+"\" /></td>"
		ID("pnshow").addEventListener('click',function() {messhower('pnmes')},false)
		ID("repshow").addEventListener('click',function() {messhower('rep')},false)
	}
}
//Speichern der Nachrichten/Berichte
function messaver(type) {
	if (type=="pnmes") {
		var messages=eval(GM_getValue('messages', "[]"))
		document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[4]/table", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML="";
		var divtext=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[4]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML;
		var headertext=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML;
		messages.push(headertext+"<br />"+divtext)
		GM_setValue('messages',uneval(messages))
		alert(string["al_savedmessage"])
	}  else {
		ob=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/table", document, null, XPathResult.ANY_TYPE, null)
		i=0
			do {
				i++
				table=ob.iterateNext()
					if(bbcode.test(table.innerHTML)) {
						document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/div[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<div class=\"smallButton\"><span onclick=\"javascript:$('bb_code').style.display = ($('bb_code').style.display == 'block') ? 'none' : 'block'\" style=\"cursor:pointer\" >BB-Code</span>"
						document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/table["+i+"]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML=""
						document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/table["+(i+1)+"]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML=""
						break;
					}
			} while (table!=null)
		var reports=eval(GM_getValue('reports', "[]"))
		var divtext=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML;
		reports.push(divtext)
		GM_setValue('reports',uneval(reports))
		alert(string["al_savedreport"])
	}
}
//Anzeigen der Nachrichten/Berichte
function messhower(type) {
	if(!ID("showdiv")) {
		var head="<div style=\"background-image: url(\""+urls["img"]["menu_back"]+"\";); background-position: left center; background-repeat: repeat-x; width: 100%;\">"+document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+"</div>"
		document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML="<h1>Tools</h1>"+head+"<div id=\"showdiv\"></div>"
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
		ID("showdiv").innerHTML=str+sel+" <button id=\"delpn\">"+string["bt_deletemessages"]+"</button>"
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
		ID("showdiv").innerHTML=str+sel+" <button id=\"delrep\">"+string["bt_deletereports"]+"</button>"
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
		res1= templer*30+knappe*10+berser*40+langbo*80+spaeh*40+kreuz*100+schw*100+sturm*100+tri*200
		res2= templer*10+knappe*20+berser*50+langbo*160+spaeh*60+kreuz*100+schw*300+sturm*500+tri*600
		res3= templer*80+knappe*30+berser*50+langbo*80+spaeh*60+kreuz*300+schw*500+sturm*200+tri*200
		res4=templer*1+knappe*1+berser*1+langbo*1+spaeh*2+kreuz*4+schw*6+sturm*5+tri*8
		img1="<img src='/img/res2.png' />"
		img2="<img src='/img/res1.png' />"
		img3="<img src='/img/res3.png' />"
		img4="<img src='/img/worker.png' />"
			if(ID("resou1")) {
				ID("resou1").innerHTML=res1; ID("resou2").innerHTML=res2 ; ID("resou3").innerHTML=res3; ID("resou4").innerHTML=res4;
			} else {
				calchtml="<table id='calctable'><tbody><tr><td class='needres'>"+string["tit_calctitel"]+"</td><td class='ressis'>"+img1+"<span id='resou1'>"+res1+"</span>"+img2+"<span id='resou2'>"+res2+"</span>"+img3+"<span id='resou3'>"+res3+"</span></td><td class='siedler'>"+img4+"<span id='resou4'>"+res4+"</span></td></tr></tbody></table>"
				document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[3]/td/div/table/tbody", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML="<tr>"+calchtml+"</tr>"
			}
		window.setTimeout(function() {calcresources()},1000)
	}
}
/************Ende Ressourcenrechner***************************************/

/************Hideheader***************************************************/
//Prüfung welche Version
if(GM_getValue("header")=="1" && GM_getValue("headeractive") && !map.test(document.location.href) ) {hideheader()} else if (GM_getValue("header")=="2" && GM_getValue("headeractive")) {
	hidetop=document.createElement("img")
	hidetop.setAttribute("id","hidetop")
	hidetop.setAttribute("title","Header verstecken")
	hidetop.setAttribute("src",urls["img"]["header"])
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
			countdiv.innerHTML="<div class='move' id='countdownmoveit'><span class='infotext_onoff cursorpointer'><span><span class='infotext'>"+string["tit_move"]+"</span>&otimes;</span></span></div><div id='countdownops'><input id='text' type='text'><button id='addbutton'>"+string["bt_add"]+"</button><input id='month' type='text' maxlength='2' title='"+string['tit_month']+"'>:<input id='day' type='text' maxlength='2' title='"+string['tit_day']+"'>:<input id='hour' type='text' maxlength='2'title='"+string['tit_hour']+"'>:<input id='minute' maxlength='2' type='text' title='"+string['tit_min']+"'>:<input id='secound' maxlength='2' type='text' title='"+string['tit_sec']+"'></div><div id='events'></div><div class='footer'><button class='cancel' id='addhide'>"+string["bt_hide"]+"</button></div>"
			ID('toolboxdiv').appendChild(countdiv)
			var countclock=document.createElement("img")
			countclock.setAttribute("id","countclock")
			countclock.setAttribute("src","http://www.bitzones.net/images/icons/countdown.png")
			countclock.setAttribute("title","Countdown")
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
		ID('countdownmoveit').style.backgroundImage='url("'+urls["img"]["countdown_back"]+'")'
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
	if(GM_getValue('market') && m_send.test(document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[2]/table/tbody/tr/td[2]", document, null, XPathResult.ANY_TYPE, null).iterateNext().getAttribute("background"))) {
	var fill=GM_getValue('fillsend')
	var result=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table[2]/tbody/tr[2]/td[4]", document, null, XPathResult.ANY_TYPE, null).iterateNext()
		if(result) {
			result.innerHTML+="<p class=\"click\" onclick=\"insertNum('kingsage', 'send_res2', '"+fill+"'); insertNum('kingsage', 'send_res1', '"+fill+"'); insertNum('kingsage', 'send_res3', '"+fill+"');\" ><img src=\""+urls["img"]["arrow"]+"\" /> "+fill+"</p><p class='click' id='lastvil'><img src=\""+urls["img"]["arrow"]+"\" /> "+string["tit_lastvil"]+" ("+GM_getValue('lastx')+"|"+GM_getValue('lasty')+")"+"</p>";
		}
		if(!result) {
			var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/table[2]/tbody/tr[2]/td[3]", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<p class=\"click\" onclick=\"insertNum('kingsage', 'send_res2', '"+fill+"'); insertNum('kingsage', 'send_res1', '"+fill+"'); insertNum('kingsage', 'send_res3', '"+fill+"');\" ><img src=\""+urls["img"]["arrow"]+"\" /> "+fill+"</p><p class='click' id='lastvil'><img src=\""+urls["img"]["arrow"]+"\" /> "+string["tit_lastvil"]+" ("+GM_getValue('lastx')+"|"+GM_getValue('lasty')+")"+"</p>";
		}
	ID('lastvil').addEventListener('click',function() {insertlastvil();},true)
	var result=document.evaluate("	/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/form/input", document, null, XPathResult.ANY_TYPE, null).iterateNext()
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
				if(esel==0) {
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<tr><th>"+i+"</th><th>"+stein+"</th><th>"+holz+"</th><th>"+eisen+"</th><th></th><th></th></tr>"
				} else {
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<tr><th>"+i+"</th><th>"+stein+"</th><th>"+holz+"</th><th>"+eisen+"</th><th>"+esel+"</th><th></th><th></th><th></th><th></th></tr>"
				}
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
				if(esel==0) {
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[3]/tbody", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<tr><th>"+i+"</th><th>"+stein+"</th><th>"+holz+"</th><th>"+eisen+"</th><th></th><th></th></tr>"
				} else {
					document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[3]/tbody", document, null, XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<tr><th>"+i+"</th><th>"+stein+"</th><th>"+holz+"</th><th>"+eisen+"</th><th>"+esel+"</th><th></th><th></th><th></th><th></th></tr>"
				}
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
		document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<th>"+string["tit_mapofregion"]+"</th>";
		document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<td rowspan=\"7\"><img src=\"\" id=\"map\" style=\"width: 226px; height: 226px;\" />"
		var x=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[2]/td[2]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML.slice(0,3)
		var y=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[2]/td[2]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML.slice(4,7)
		ID("map").src="minimap.php?x="+x+"&y="+y+""
		var userid=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[4]/td[2]/a", document, null,XPathResult.ANY_TYPE, null).iterateNext().href
		var trenn=userid.indexOf("id=")
		var id=userid.substr(trenn+3,userid.length)
		ind1=lref().indexOf("info") //adden zur Übersicht...
		ind2=lref().indexOf("=")
		var city=lref().substr(ind2+1)
		var city2=city.substr(0,city.indexOf("&s"))
		document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr[4]/td[2]", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="&nbsp;<img src=\""+urls["img"]["mail"]+"\" onclick=\"document.location.href='/game.php?village="+city2+"&s=messages&m=new&pid="+id+"'\" style=\"cursor:pointer\"\" />"
	}
}
/************Ende Minimap & Brief-Button auf Siedlungsansicht*************/

/************Notizbalken*************/
if(GM_getValue('notizbalkenactive')) {
	var tab=document.getElementsByClassName("ressilist")
	tab[0].innerHTML+="<tr><td colspan='2' ><span id='notiz'>"+shownotiz()+"</span></td><td><button class='flatbuttons' id='newentry'>Eintrag</button></td></tr>"
	ID('newentry').addEventListener('click', function(){newentry();},true);
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
/************Ende notizbalken*************/

/***********Weltkarte*******************/
function worldmap() {
	var ismap = confirm(string["al_worldmap"])
	if(ismap) {
		text="<table border='0' cellSpacing=\"0\" cellPadding=\"0\">"
		url=document.location.href
		wurl=url.substr(0,url.indexOf("game.php"))
		for(var y=22;y <= 1000;y+=44) {
			text+="<tr>"
			for(var x=22;x <= 1000;x+=44) {
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

/**********AttackAlarm******************/
function check_attackalarm() {
	tds= document.getElementsByClassName("lay_tower_left_top_attack")[0]
	if(tds) {
		if(GM_getValue("sound_opt")) {
			flash = document.createElement("object")
			flash.setAttribute("data",urls["resource"]["flash_sound"])
			flash.setAttribute("type","application/x-shockwave-flash")
			flash.setAttribute("name","alarm")
			flash.setAttribute("width",1)
			flash.setAttribute("height",1)
			flash.innerHTML="<param name='movie' value='alarm.swf'><!-- doppelt aber unumgaenglich --><param name='quality' value='low'><!-- Abspielgeschwindigkeit geht vor Bildqualitaet --><param name='scale' value='exactfit'><!-- skaliert wie angegeben --><param name='menu' value='false'><!-- minimales Menue --><param name='loop' value='false'><!-- wird nur einmal geladen und gehalten --><param name='wmode' value='transparent'><!-- damit HTML-Elemente drueber liegen koennen -->"
			ID("toolboxdiv").appendChild(flash)
			info = document.createElement("div")
			info.setAttribute("id","attack_info")
			info.innerHTML="<span id='stop_sound'>"+string["tit_stop_sound"]+"</span>"
			ID("toolboxdiv").appendChild(info)
			ID("stop_sound").addEventListener('click', function(){GM_setValue("sound_opt",false);document.location.reload();},true);
			setTimeout("document.location.reload()",120000)
		}
	}
}
/**********ENDE AttackAlarm ************/

/**********Runtime Calc*****************/
function runtime() {
	if(GM_getValue("runtimeactive")) {
		var ico=document.createElement("img")
		ico.setAttribute("id","runtime_ico")
		ico.setAttribute("src",urls["img"]["runtimeico"])
		ico.setAttribute("title","ToolBox")
		ID("runtimeico").appendChild(ico)
		ID("runtime_ico").addEventListener('click',function() {showobj("runtime")},true)
		if(!ID("runtimediv")) {
			var runtimediv=document.createElement("div")
			runtimediv.setAttribute("id","runtimediv")
			x=GM_getValue("runtimeposxkor")
			y=GM_getValue("runtimeposykor")
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
			
			runtimediv.setAttribute("style","top:"+y+"px;left:"+x+"px;visibility:hidden;")
			runtime_html="<div id='village1'><input type='text' id='vil1x' maxlength='3' value='"+v1x+"'><input type='text' id='vil1y' maxlength='3'  value='"+v1y+"'></div><div id='village2'><input type='text' id='vil2x' maxlength='3'  value='"+v2x+"'><input type='text' id='vil2y' maxlength='3'  value='"+v2y+"'><button id='calc_runtime'>"+string["bt_calc"]+"</button></div><div id='runtimes'><table id='runtimetable'><tr><th></th><th>DD:HH:MM</th></tr><tr><td><img src='"+urls["img"]["img_sword"]+"' /></td><td><span id='rtempler'>0</span></td></tr><tr><td><img src='"+urls["img"]["img_spear"]+"' /></td><td><span id='rknappe'>0</span></td></tr><tr><td><img src='"+urls["img"]["img_axe"]+"' /></td><td><span id='rberserker'>0</span></td></tr><tr><td><img src='"+urls["img"]["img_bow"]+"' /></td><td><span id='rlb'>0</span></td></tr><tr><td><img src='"+urls["img"]["img_spy"]+"' /></td><td><span id='rspy'>0</span></td></tr><tr><td><img src='"+urls["img"]["img_light"]+"' /></td><td><span id='rkreuz'>0</span></td></tr><tr><td><img src='"+urls["img"]["img_heavy"]+"' /></td><td><span id='rschwarz'>0</span></td></tr><tr><td><img src='"+urls["img"]["img_ram"]+"' /></td><td><span id='rram'>0</span></td></tr><tr><td><img src='"+urls["img"]["img_kata"]+"' /></td><td><span id='rkata'>0</span></td></tr><tr><td><img src='"+urls["img"]["img_snob"]+"' /></td><td><span id='rgraf'>0</span></td></tr></table></div>"
			runtimediv.innerHTML="<div class='move' id='runtimemove'><span class='infotext_onoff cursorpointer'><span><span class='infotext'>"+string["tit_move"]+"</span>&otimes;</span></span></div>"+runtime_html+"<div class='footer'><button class='cancel' id='runtimeaddhide'>"+string["bt_hide"]+"</button></div>"
			ID('toolboxdiv').appendChild(runtimediv)
			ID('calc_runtime').addEventListener('click',function() {calc_runtime()},false)
			ID('vil1x').addEventListener('change',function() {save_runpos(ID('vil1x').value,"vil1x")},false)
			ID('vil1y').addEventListener('change',function() {save_runpos(ID('vil1y').value,"vil1y")},false)
			ID('vil2x').addEventListener('change',function() {save_runpos(ID('vil2x').value,"vil2x")},false)
			ID('vil2y').addEventListener('change',function() {save_runpos(ID('vil2y').value,"vil2y")},false)
		}
		ID("runtimeaddhide").addEventListener('click',function() {hideobj("runtime")},false)
		ID("runtimemove").addEventListener('mousedown', function(e){dragStart(e,ID("runtimediv"),"runtimepos");}, false);
		ID('runtimediv').addEventListener('click',function() {setfront("runtimediv")},false)
		
		switch (GM_getValue('lang')) {
			case "Eng":
				ID('runtimemove').style.backgroundImage='url("'+urls["img"]["runtime_bg_eng"]+'")'
				break
			case "De":
				ID('runtimemove').style.backgroundImage='url("'+urls["img"]["runtime_bg_de"]+'")'
				break
			case "Nl":
				ID('runtimemove').style.backgroundImage='url("'+urls["img"]["runtime_bg_nl"]+'")'
				break
		}
		if(GM_getValue('showruntime')) {
			showobj("runtime")
		} else {
			hideobj("runtime")	
		}		
	}
}
function save_runpos(val,type) {
	GM_setValue(type,val)
}
function calc_runtime() {
	var x1=parseInt(ID("vil1x").value);
	var y1=parseInt(ID("vil1y").value);
	var y2=parseInt(ID("vil2y").value);
	var x2=parseInt(ID("vil2x").value);
	if(!isNaN(x1) && !isNaN(y1) && !isNaN(x2) && !isNaN(y2))
	{
		xdif=Math.abs(x2-x1);
		ydif=Math.abs(y2-y1);
		faktor=Math.sqrt(xdif*xdif+ydif*ydif)*60
		ID("rtempler").innerHTML=format_time(faktor*22)
		ID("rknappe").innerHTML=format_time(faktor*18)
		ID("rberserker").innerHTML=format_time(faktor*18)
		ID("rlb").innerHTML=format_time(faktor*18)
		ID("rspy").innerHTML=format_time(faktor*9)
		ID("rkreuz").innerHTML=format_time(faktor*10)
		ID("rschwarz").innerHTML=format_time(faktor*11)
		ID("rram").innerHTML=format_time(faktor*30)
		ID("rkata").innerHTML=format_time(faktor*30)
		ID("rgraf").innerHTML=format_time(faktor*35)
		
	} else {
		alert(string["al_empty"])
	}
}

function format_time(sec) {
	insec=sec
	d=leading_zero(parseInt(insec/86400))
	h=leading_zero(parseInt(rest(insec/86400)*24))
	m=leading_zero(parseInt(rest((insec/86400)*24)*60))
	return d+":"+h+":"+m
}
/**********ENDE Runtime Calc************/

/**********MultiMarket******************/
function multimarket() {
	if(GM_getValue("multimarketactive")) {
		var ico=document.createElement("img")
		ico.setAttribute("id","multimarket_ico")
		ico.setAttribute("src",urls["img"]["multimarketico"])
		ico.setAttribute("title","ToolBox")
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
			multimarket_html="<div id='mmtarget'><input type='text' id='mmtargetx'  value='"+tx+"'><input type='text' id='mmtargety' value='"+ty+"'></div><br><div id='mmres'><input type='text' id='mmres1'  value='"+res1+"'><input type='text' id='mmres2'  value='"+res2+"'><input type='text' id='mmres3'  value='"+res3+"'></div><br><button id='mmall'>"+string["bt_mm_all"]+"</button><button id='mmnone'>"+string["bt_mm_none"]+"</button><button id='mmstart'>"+string["bt_send"]+"</button><div id='mmmain'><table><tr><th>"+string["tit_active"]+"</th><th>Vilalge-Name</th><th>Status</th></tr>"
			var marketfrom=eval(GM_getValue('multimarketvillages'))
			
			for(var i = 0;i<marketfrom.length; i++) {
				split= marketfrom[i].split("{!}")
				multimarket_html+="<tr><td><input type='checkbox' id='mmc"+i+"'></td><td><span>"+split[0]+"</span><input type='hidden' id='mmnum"+i+"' value='"+split[1]+"'><td><img id='mms"+i+"' src='"+urls["img"]["multimarket_wait"]+"' /></td></tr>"
			}
			
			multimarketdiv.innerHTML="<div class='move' id='multimarketmove'><span class='infotext_onoff cursorpointer'><span><span class='infotext'>"+string["tit_move"]+"</span>&otimes;</span></span></div>"+multimarket_html+"</table></div><div class='footer'><button class='cancel' id='multimarketaddhide'>"+string["bt_hide"]+"</button></div>"
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
		
		switch (GM_getValue('lang')) {
			case "Eng":
				ID('multimarketmove').style.backgroundImage='url("'+urls["img"]["multimarket_bg_eng"]+'")'
				break
			case "De":
				ID('multimarketmove').style.backgroundImage='url("'+urls["img"]["multimarket_bg_de"]+'")'
				break
			case "Nl":
				ID('multimarketmove').style.backgroundImage='url("'+urls["img"]["multimarket_bg_nl"]+'")'
				break
		}
		if(GM_getValue('showmultimarket')) {
			showobj("multimarket")
		} else {
			hideobj("multimarket")	
		}	
		regex1=/&s=overview/
		regex2=/&s=overview_villages&m=1/
		if((regex1.test(document.location.href) && !GM_getValue("premium")) || (GM_getValue("premium") && regex2.test(document.location.href))) {
			document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[2]/table/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML+="<button id='mmupdate' >"+string["bt_update"]+"</button>"
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
			cbox.checked=mode
		i++
	} 
}


function updatemm() {
	if(GM_getValue('premium') ) {
			multimarketvillages=new Array()
			try {
				headtable=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
				span=headtable.colSpan
				if(span > 5) {
					var i=2
				} else {
					var i=1
				}
				do {
					i++
					var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td/span/a", document, null,XPathResult.ANY_TYPE, null).iterateNext();
					if (result) {
							vil_num=result.href.split("?village=")[1].split("&")[0]
							var name=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table[2]/tbody/tr["+i+"]/td/span/a/span", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML;
							if(vil_num!=null && name!= null) {
								multimarketvillages.push(name+"{!}"+vil_num)
							}
					} else
					{
						break;
					}
				} while(result!=null);
		} catch(e) {}
			GM_setValue("multimarketvillages",uneval(multimarketvillages))
			alert(string["al_ready"])
	} else {
		multimarketvillages=new Array()
		try{
			headtable=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr/td", document, null,XPathResult.ANY_TYPE, null).iterateNext()
			span=headtable.colSpan
				if(span==8) {
					var i=2
				} else {
					var i=1;
				}
		do {
			i++
			var result= document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]/td/a", document, null,XPathResult.ANY_TYPE, null);
			var rst=result.iterateNext();
			if (rst) {
				vil_num=rst.href.split("?village=")[1].split("&")[0]
				var name=document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/table/tbody/tr["+i+"]/td/a/span", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML;
				if(vil_num!=null && name!= null) {
					multimarketvillages.push(name+"{!}"+vil_num)
				}
			
			} else {
				break;
			}
		} while(rst!=null);
	}catch(e){}
		GM_setValue("multimarketvillages",uneval(multimarketvillages))
		alert(string["al_ready"])
	} 
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
	if(regex.test(document.location.href) || regex2.test(document.location.href)) {
		try {
			document.evaluate("/html/body/div[2]/table/tbody/tr/td[2]/table/tbody/tr[2]/td/div[6]/div/div[4]/table/tbody/tr[2]/td", document, null,XPathResult.ANY_TYPE, null).iterateNext().innerHTML="<a class='menuline' href=\"javascript:insertTags('[quote]','[/quote]','Quote');\"><span>QOUTE</span></a>"
		} catch(e) {}
	}
}
/******ENDE QOUTETAG**************************/


/**Allgemeine Functionen**************************************************/
//toolboxdiv erstellen
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
	icondiv.innerHTML+="<div id='multimarketico'></div><div id='runtimeico'></div><div id='headerico'></div><div id='vilpointico'></div><div id='chatico'></div><div id='notepadico'></div><div id='countdownico'></div><div id='settingsico'></div>"
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
	else if(type=="vilpoint") {
	ID('vilpointimg').style.visibility="hidden"
	ID('vilpointdiv').style.visibility="visible"
	GM_setValue('showvilpoint',true)
	}
	else if(type=="runtime") {
	ID('runtime_ico').style.visibility="hidden"
	ID('runtimediv').style.visibility="visible"
	GM_setValue('showruntime',true)
	}
	else if(type=="multimarket") {
	ID('multimarket_ico').style.visibility="hidden"
	ID('multimarketdiv').style.visibility="visible"
	GM_setValue('showmultimarket',true)
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
	else if(type=="vilpoint") {
	ID('vilpointimg').style.visibility="visible"
	ID('vilpointdiv').style.visibility="hidden"
	GM_setValue('showvilpoint',false)
	}
	else if(type=="runtime") {
	ID('runtime_ico').style.visibility="visible"
	ID('runtimediv').style.visibility="hidden"
	GM_setValue('showruntime',false)
	}	
	else if(type=="multimarket") {
	ID('multimarket_ico').style.visibility="visible"
	ID('multimarketdiv').style.visibility="hidden"
	GM_setValue('showmultimarket',false)
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
	if(!GM_getValue("lang")) {
		GM_setValue("lang","Eng")
	}
	if(!GM_getValue('text1')) {
		GM_setValue('text1',"")
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
	if(!GM_getValue("configxkor")) {
		GM_setValue("configxkor",1)
	}
	if(!GM_getValue("configykor")) {
		GM_setValue("configykor",1)
	}
	if(!GM_getValue("vilpointykor")) {
		GM_setValue("vilpointykor",1)
	}
	if(!GM_getValue("vilpointxkor")) {
		GM_setValue("vilpointxkor",1)
	}
	if(!GM_getValue("countdownposxkor")) {
		GM_setValue("countdownposxkor",1)
	}
	if(!GM_getValue("countdownposykor")) {
		GM_setValue("countdownposykor",1)
	}
	if(!GM_getValue("runtimeposykor")) {
		GM_setValue("runtimeposykor",1)
	}
	if(!GM_getValue("runtimeposxkor")) {
		GM_setValue("runtimeposxkor",1)
	}
	if(!GM_getValue("multimarketposykor")) {
		GM_setValue("multimarketposykor",1)
	}
	if(!GM_getValue("multimarketposxkor")) {
		GM_setValue("multimarketposxkor",1)
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
function initlang() {
lang ={
	Eng: {
		bt_save:"Save",
		bt_settings:"Toolbox",
		bt_hide:"X",
		bt_resett:"Reset",
		bt_send:"Send",
		bt_savereport:"Save Report",
		bt_savemessage:"Save Message",
		bt_showreports:"Show reports",
		bt_showmessages:"Show messages",
		bt_deletemessages:"Delete message",
		bt_deletereports:"Delete report",
		bt_hidetop:"Hide header",
		bt_add:"Ok",
		bt_config:"Change",
		bt_calc:"Calculate",
		bt_update:"Update Multimarket",
		bt_mm_all:"All",
		bt_mm_none:"None",
		tit_paste:"Paste the Buildings-section here",
		tit_lang:"Language",
		tit_config:"Order of extrabuttons",
		tit_buttons:"Destination",
		tit_titel:"Settings",
		tit_active:"active",
		tit_liable:"The author of the chat is not liable for the written text.",
		tit_calctitel:"Needed resources:",
		tit_scriptby:"&copy; &amp; Script von",
		tit_styleby:"&copy; Style von",
		tit_copyright:"&copy; of images: Kingsage.de",
		tit_headeralways:"Always",
		tit_headerbutton:"Button",
		tit_recruit:"Recruit",
		tit_move:"Move",
		tit_end:"passed",
		tit_message:"Message",
		tit_report:"Report",
		tit_mapofregion:"Region of the village",
		tit_wrong_countdown:"No text entered, or bad time.",
		tit_month:"Month",
		tit_day:"Day",
		tit_hour:"Hour",
		tit_min:"Minute",
		tit_sec:"Secounde",
		tit_exset:"Extrabutton-settings",
		tit_lastvil:"Last village",
		tit_insert:"Write your comment here",
		tit_genworldmap:"Generate",
		tit_sound:"Sound ON",
		tit_stop_sound:"I noticed the attack. Stop the sound!",
		al_stringerror:"Text is too long or empty. Only 65 chars.",
		al_savedmessage:"Saved Message",
		al_savedreport:"Saved Report",
		al_deletedmessages:"Message deleted",
		al_deletedreport:"Report deleted",
		al_worldmap:"Is the minimapsize = 9x9 Fields with 5px?",
		al_empty:"Some inputs are empty",
		al_ready:"Done!",
		op_burg:"Castle",
		op_markt:"Market",
		op_markta:"Market-accept",
		op_bar:"Barracks orders",
		op_baraus:"Barracks train",
		op_barfor:"Barracks research",
		op_snob:"Residence",
		op_gold:"Goldsmith",
		op_map:"Map",
		op_none:"None"
		},
	De: {
		bt_save:"Speichern",
		bt_settings:"Toolbox",
		bt_hide:"X",
		bt_resett:"Zurück",
		bt_send:"Senden",
		bt_savereport:"Bericht speichern",
		bt_savemessage:"Nachricht speichern",
		bt_showreports:"Berichte anzeigen",
		bt_showmessages:"Nachrichten anzeigen",
		bt_deletemessages:"Nachricht löschen",
		bt_deletereports:"Bericht löschen",
		bt_hidetop:"Header verstecken",
		bt_add:"Ok",
		bt_calc:"Berechnen",
		bt_update:"Multimarket updaten",
		bt_mm_all:"Alle",
		bt_mm_none:"Keine",
		tit_paste:"Hier ersp&auml;hte Geb&auml;udestufen einf&uuml;gen",
		bt_config:"ändern",
		tit_lang:"Sprache",
		tit_config:"Reihenfolge der zus. Buttons",
		tit_buttons:"Ziel",
		tit_titel:"Einstellungen",
		tit_active:"aktiviert",
		tit_liable:"Der Chatautor übernimmt keine Haftung für den erscheinenden Text.",
		tit_calctitel:"Benötigte Rohstoffe:",
		tit_scriptby:"&copy; &amp; Script von",
		tit_styleby:"&copy; Style von",
		tit_copyright:"&copy; der Bilder: Kingsage.de",
		tit_headeralways:"Immer",
		tit_headerbutton:"Button",
		tit_recruit:"Ausbilden",
		tit_move:"bewegen",
		tit_end:"abgelaufen",
		tit_message:"Nachricht",
		tit_report:"Bericht",
		tit_mapofregion:"Region der Siedlung",
		tit_wrong_countdown:"Kein text eingegeben, oder falsche Zeitangabe.",
		tit_month:"Monat",
		tit_day:"Tag",
		tit_hour:"Stunde",
		tit_min:"Minute",
		tit_sec:"Sekunde",
		tit_exset:"Extrabutton-Einstellungen",
		tit_lastvil:"Letzte Siedlung",
		tit_insert:"Schreibe dein Kommentar hier rein",
		tit_genworldmap:"Generieren",
		tit_sound:"Sound An",
		tit_stop_sound:"Ich habe den Angriff bemerkt. Stoppe den Sound!",
		al_stringerror:"Der Text ist zulang oder leer. Maximal 65 Zeichen.",
		al_savedmessage:"Nachricht gespeichert",
		al_savedreport:"Bericht gespeichert.",
		al_deletedmessages:"Nachricht gelöscht",
		al_deletedreport:"Bericht gelöscht",
		al_illegal:"Das ist eine illegale Funktion.\nMöchtest du diese wirklich benutzen?",
		al_worldmap:"Ist die Minimap 9x9 Felder mit 5px groß?",
		al_empty:"Einige Felder sind leer!",
		al_ready:"Fertig!",
		op_burg:"Burg",
		op_markt:"Markt",
		op_markta:"Markt Annehmen",
		op_bar:"Kaserne Befehle",
		op_baraus:"Kaserne Ausbilden",
		op_barfor:"Kaserne Forschung",
		op_snob:"Residenz",
		op_gold:"Goldschmiede",
		op_map:"Karte",
		op_none:"Kein"
		},
	Nl: {
		bt_save:"Opslaan",
		bt_settings:"Toolbox",
		bt_hide:"X",
		bt_resett:"Herstel.",
		bt_send:"Verzend",
		bt_savereport:"Rapport opslaan",
		bt_savemessage:"Bericht opslaan",
		bt_showreports:"Bekijk rapporten",
		bt_showmessages:"Bekijk berichten",
		bt_deletemessages:"Verwijder bericht",
		bt_deletereports:"Verwijder rapport",
		bt_hidetop:"Verberg logo",
		bt_add:"Ok",
		bt_calc:"Bereken",
		bt_update:"Update Multimarket", //neu
		bt_mm_all:"All", //neu
		bt_mm_none:"None", //neu
		tit_paste:"Plak de gebouwen selectie hier",
		bt_config:"Configuratie",
		tit_lang:"Taal",
		tit_config:"volgorde van de extra knoppen",
		tit_buttons:"bestemming",
		tit_titel:"Instellingen",
		tit_active:"aktief",
		tit_liable:"De maker van de chat is niet verandwoordelijk voor de geschreven tekst.",
		tit_calctitel:"Benodigde grondstoffen:",
		tit_scriptby:"&copy; &amp; Script van",
		tit_styleby:"&copy; Style van",
		tit_copyright:"&copy; of images: Kingsage.de",
		tit_headeralways:"Altijd",
		tit_headerbutton:"Button",
		tit_mapofregion:"Kaart van de regio",
		tit_recruit:"Trainen",
		tit_move:"Verplaats",
		tit_end:"verstreken",
		tit_message:"Bericht",
		tit_report:"Rapport",
		tit_wrong_countdown:"Geen tekst invoer, slechte timing.",
		tit_month:"Maand",
		tit_day:"Dag",
		tit_hour:"Uur",
		tit_min:"Minuut",
		tit_sec:"Seconde",
		tit_exset:"Extra knoppen-Instellingen",
		tit_lastvil:"Laatste dorp",
		tit_insert:"", //neu
		tit_genworldmap:"", //neu
		tit_sound:"", //neu
		tit_stop_sound:"", //neu
		al_stringerror:"Tekst is te lang of leeg. max 65 karakters.",
		al_savedmessage:"Bericht opgeslagen",
		al_savedreport:"Rapport opgeslagen",
		al_deletedmessages:"Bericht verwijderd",
		al_deletedreport:"Rapport verwijderd",
		al_illegal:"Dit is een illegale funtie.\n Wilt u het echt gebruiken?",
		al_worldmap:"Is the minimapsize = 9x9 Felder with 5px?", //neu
		al_empty:"Some inputs are empty", //neu
		al_ready:"Done!", //neu
		op_burg:"Kasteel",
		op_markt:"Markt",
		op_markta:"Markt-accepteren",
		op_bar:"Barakken orders",
		op_baraus:"Barakken trainen",
		op_barfor:"Barakken onderzoeken",
		op_snob:"Paleis",
		op_gold:"Goudsmit",
		op_map:"Kaart",
		op_none:"Niets"
		}
	}
}
function initinfo() {
beschreibung = {
	Eng: {
		premium: {
			tit: "Premium",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Everywhere",
			info: "If you use a premium account , you have to set this function."
				},
		fillin: {
			tit: "Market-Fill",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Market <img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Send raw materials",
			info: "This function adds a button to auto-fill the inputs with a value. You can set the value here."
				},
		highlighter: {
			tit: "Highlighter",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Overvew [Production,Troops]",
			info: "Highlights attacked and/or supported villages with different colors."
					},
		extrabuttons: {
			tit: "Extrabuttons",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Overiew",
			info: "Adds some useful extrabuttons to the overview. You can choose the buttons, which should appear. Up to 9 different Buttons possible."
					},
		extrabuttonstab: {
			tit: "Extrabuttons in new Tab",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Overview",
			info: "You only can use this function in combination with the 'Extrabuttons'. This function opens the sites in a new tab in the browser."
						},
		messagesaver: {
			tit: "Messagesaver",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Messages & Reports / Tools",
			info: "Using this function you can save messages and/or reportsd permanently. Go to Tools to view the saved messages/reports. There you can delete them, too."
					},
		villageinfo: {
			tit: "Village-Info",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Villageoverview",
			info: "This function adds a minimap to the villageoverview site. (optimal map size:9 x 9 sectors, 5 pixels per field). It adds a brief-button, which directly links to the 'Write Meesage Site' and automaticly fills in the username."
					},
		calc: {
			tit: "Ressourcecalculator",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Barracks <img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Train",
			info: "This function precalculates the needed ressources and miller for the recruiting."
			},
		notepad: {
			tit: "Notepad",
			dest: "Moveable window",
			info: "This function creates and 10-page-Notepad. There you can write some text, which will be saved."
				},
		chat: {
			tit: "Chat",
			dest: "Moveable window",
			info: "This function creates a chat, where you can chat with other Kingsage players. There are four virtual rooms."
			},
		header: {
			tit: "Header",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Everywhere",
			info: "This function allows you to push the content 150px to the top, so you have more place for the maincontent. You can choose between 2 modes: always and button."
				},
		countdown: {
			tit: "Countdown",
			dest: "Moveable window",
			info: "This feature allows you to create a list of configurable countdowns. <br /> Entries are made in the format month / day / hour / minute / second."
				},
		vilpoint: {
			tit:"Converter",
			dest:"Moveable window",
			info:"In some Kingsage-versions the settlement points are merged with the troop points. This function is calculates from the building stages of a spy report, the settlement points."
				},	
		notizbalken: {
			tit:"Noticeline",
			dest:"Everywhere",
			info:"With this function you can add some information to....."
				},
		worldmap: {
			tit:"Worldmap",
			dest:"Settings",
			info:"Press the 'Generate'-button to generate a worldmap."
				},
		attackalarm: {
			tit:"Attackalarm",
			dest:"Everywhere",
			info:"If you get attacked, this feature plays a sound. Its necessary to reload your page every 2 minutes."
				},
		runtime: {
			tit:"Runtimecalculator",
			dest:"Everywhere",
			info:"Sometimes you need to know the runtimes between two villages. This function will calculate it."
				},
		multimarket: {
			tit:"Multimarket",
			dest:"Everywhere",
			info:"The Multimarket-Feature is an extension for the Market-Fill-Feature. You can automaticly send resources from your village to a destination, with only 1 Click!"
				}
		},
	De: {
		premium: {
			tit: "Premiumaccount?",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> &Uuml;berall",
			info: "Ohne Premiumaccount muss die Funktion deaktiviert sein, mit Premiumaccount aktiviert."
				},
		header: {
			tit: "Header verstecken",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> &Uuml;berall",
			info: "Verschiebt das Spiel-Fenster um 150px nach oben, so dass mehr Spielelemente auf einen Blick zu sehen sind. Wählbar als dauerhafte Einstellung (Immer) oder als Zusatzbutton (Button)"
				},
		fillin: {
			tit: "Ressourcen",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Markt <img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Rohstoffe verschicken",
			info: "Diese Funktion fügt auf Klick in die Ressourcenfelder des Marktes eine bestimmte Menge Rohstoffe ein. Der zugehörige Wert wird im Eingabefeld festgelegt."
				},
		highlighter: {
			tit: "Hervorhebung der Siedlungen",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Überblick <img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Produktion, Truppen",
			info: "Angegriffene und/oder unterstützte Siedlungen werden farblich hervorgehoben."
					},
		extrabuttons: {
			tit: "Zusätzliche Buttons",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Übersicht",
			info: "Fügt am rechten Rand des Spiels zusätzliche Buttons (Direktlinks) hinzu, die direkt zu Gebäuden führen"
					},
		extrabuttonstab: {
			tit: "Zusätzliche Buttons in neuem Tab öffnen",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Übersicht <img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Zusätzliche Buttons",
			info: "Bei aktivierter Funktion werden die Direktlinks in einem neuen Browser-Tab geöffnet."
						},
		messagesaver: {
			tit: "Nachrichten und Berichte speichern",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Nachrichten &amp; Berichte / Tools",
			info: "Nachrichten und Berichte können in den „Tools“ dauerhaft abgespeichert, jederzeit wieder aufgerufen oder gelöscht werden."
					},
		villageinfo: {
			tit: "Minimap auf Siedlungs-Infoseite",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Karte <img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Siedlungs-Infoseite",
			info: "Die Informationsseite jeder Siedlung enthält zur Orientierung eine Mini-Map (optimal bei der Karteneinstellung 9 x 9 Sektoren, 5 Pixel je Feld). Zusätzlich befindet sich neben dem Namen des Besitzers ein Direktlink (Brief-Symbol), der es ermöglicht, diesem ohne Umweg eine Nachrichten zu schreiben."
					},
		calc: {
			tit: "Ressourcenrechner",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Kaserne <img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Truppen ausbilden",
			info: "Der Ressourcenrechner errechnet im Voraus die benötigten Rohstoffe und die Siedlerzahl für die Truppenausbildung."
			},
		notepad: {
			tit: "Notizblock",
			dest: "Bewegliches Zusatzfenster",
			info: "Ein 10-seitiger Notizblock zum Speichern von Text."
				},
		chat: {
			tit: "Chat",
			dest: "Bewegliches Zusatzfenster",
			info: "Der Chat bietet die Möglichkeit mit anderen Spielern in vier virtuellen Räumen in Echtzeit zu kommunizieren."
				},
		countdown: {
			tit: "Countdown",
			dest: "Bewegliches Zusatzfenster",
			info: "Bietet die Möglichkeit, eine Liste frei konfigurierbarer Countdowns anzulegen.<br />Eintr&auml;ge werden im Format Monat/Tag/Stunde/Minute/Sekunde vorgenommen."
				},
		vilpoint: {
			tit:"Konverter",
			dest:"Bewegliches Zusatzfenster",
			info:"In manchen KingsAge-Versionen werden die Siedlungspunkte mit den Truppenpunkten verrechnet. Diese Funktion berechnet aus den Geb&auml;udestufen eines Spionageberichts die bereingte Punktzahl."
				},
		notizbalken: {
			tit:"Notizbalken",
			dest:"&Uuml;berall",
			info:"With this function you can add some information to....."
				},
		worldmap: {
			tit:"Weltkarte",
			dest:"Einstellungen",
			info:"Drücke den 'Generieren'-Button, um eine Weltkarte zu erstellen"
				},
		attackalarm: {
			tit:"Angriffsalarm",
			dest:"&Uuml;berall",
			info:"Wenn du Angegriffen wirst, spielt diese Funktion einen Sound ab. Die Seite wird dazu jede 2 Minuten neugeladen."
				},
		runtime: {
			tit:"Laufzeitenrechner",
			dest:"&Uuml;berall",
			info:"Mit dieser Funktion kannst du dir die Laufzeit zwischen 2 Burgen berechnen lassen."
			},
		multimarket: {
			tit:"Multimarket",
			dest:"Everywhere",
			info:"The Multimarket-Feature is an extension for the Market-Fill-Feature. You can automaticly send resources from your village to a destination, with only 1 Click!"
				}
		},
	Nl: {
		premium: {
			tit: "Premium",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Overaal",
			info: "Heeft u een premium account?"
				},
		fillin: {
			tit: "Markt vullen",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Markt <img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Grondstoffen te sturen",
			info: "Het maakt een knop voor de waarde v/d invoer, dat u bepaald."
				},
		highlighter: {
			tit: "Markeerstift",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Overzicht [Productie,Troepen]",
			info: "Markeert aangevallen, ondersteunende, of beide, dorpen met verschillende kleuren."
					},
		extrabuttons: {
			tit: "Extra knoppen",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Overzicht",
			info: "Maak extra nuttige knoppen om Kingsage goed te overzien. U kan vrij kiezen welke knoppen zichtbaar worden. Tot  9 Verschillende Knoppen mogelijk."
					},
		extrabuttonstab: {
			tit: "Extra knoppen in een nieuwe TAB",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Overzicht",
			info: "U kunt alleen deze functie gebruiken samen met de 'Extra knoppen'. Deze functie openet de TAB in een nieuw venster in uw browser"
						},
		messagesaver: {
			tit: "Berichten bewaren",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Berichten & Rappoerten / Gereedschap",
			info: "Met deze functie kunt u berichten en of rappoerten permanent opslaan. Voor de opgeslagen rapporten en berichten gaat u naar Gereedschap waar u ze ook kan verwijderen."
					},
		villageinfo: {
			tit: "Dorp-info",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Dorp-info",
			info: "Deze functie maakt een mini kaart bij de dorp sinfo. (optimale kaart gtote:9 x 9 sectors, 5 pixels per veld). Er is een brief-knop, welke direct naar de linkt naar schrijf bericht gaat en automatisch de gebruikersnaam vult."
					},
		calc: {
			tit: "Grondstoffen-rekenmachine",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Barraken <img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Trein",
			info: "Deze fuctie berekend de benodigde grondstoffen voor het recuteren v/d troepen."
			},
		notepad: {
			tit: "Kladblok",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Overal",
			info: "Deze functie maakt een 10 pagina`s tellend kladblok, de text die u schijft wordt opgeslagen."
				},
		chat: {
			tit: "Chat",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Overal",
			info: "Deze functie maakt een chat mogelijk, waar u kan chatten met Kingsage spelers in 4 virtuele kamers."
			},
		header: {
			tit: "Logo",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Overal",
			info: "Deze functie , verwijderd het logo, zodat u meer informatie op uw scherm heeft. U kunt kiezen uit 2 instellingen: altijd of knop."
				},
		countdown: {
			tit: "Countdown",
			dest: "<img src='http://www.kingsage.de/img/arrow_right_raquo.png' /><img src='http://www.kingsage.de/img/arrow_right_raquo.png' /> Overal",
			info: "Deze functie maakt u een aftel klok. er is geen maximun aan invoeren. Simpel , zet de eindtijd en beschrijving."
				},
		vilpoint: {
			tit:"Omvormer",
			dest:"Overal",
			info:"Deze functie berekend de 'echte' nederzettting's punten. Plak de gebouwen selectie van het spionnen rapport en druk 'bereken'."
				},
		notizbalken: { //neu
			tit:"Noticeline",
			dest:"Everywhere",
			info:"With this function you can add some information to....."
				},
		worldmap: { //neu
			tit:"Worldmap",
			dest:"Settings",
			info:"Press the 'Generate'-button to generate a worldmap."
				},
		attackalarm: { //neu
			tit:"Angriffsalarm",
			dest:"&Uuml;berall",
			info:"Wenn du Angegriffen wirst, spielt diese Funktion einen Sound ab. Die Seite wird dazu jede 2 Minuten neugeladen."
				},
		runtime: { //neu
			tit:"Runtimecalculator",
			dest:"Everywhere",
			info:"Sometimes you need to know the runtimes between two villages. This function will calculate it."
				},
		multimarket: {
			tit:"Multimarket",
			dest:"Everywhere",
			info:"The Multimarket-Feature is an extension for the Market-Fill-Feature. You can automaticly send resources from your village to a destination, with only 1 Click!"
				}
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
			conf_back_eng:"http://www.bitzones.net/images/bg/configmove_bg_EN.png",
			conf_back_de:"http://www.bitzones.net/images/bg/configmove_bg_DE.png",
			conf_back_nl:"http://www.bitzones.net/images/bg/configmove_bg_NL.png",
			sett_back_eng:"http://www.bitzones.net/images/bg/settingsmove_bg_EN.png",
			sett_back_de:"http://www.bitzones.net/images/bg/settingsmove_bg_DE.png",
			sett_back_nl:"http://www.bitzones.net/images/bg/settingsmove_bg_NL.png",
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
			vilpoint:"http://www.bitzones.net/images/icons/villagepoints.png",
			vilpointsmove_bg_eng:"http://www.bitzones.net/images/bg/vilpointsmove_bg_EN.png",
			vilpointsmove_bg_de:"http://www.bitzones.net/images/bg/vilpointsmove_bg_DE.png",
			vilpointsmove_bg_nl:"http://www.bitzones.net/images/bg/vilpointsmove_bg_NL.png",
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
			runtimeico:"http://www.bitzones.net/images/icons/rutime.png",
			runtime_bg_end:"",
			runtime_bg_de:"",
			runtime_bg_nl:"",
			multimarketico:"http://www.bitzones.net/images/icons/multimarket.png",
			multimarket_bg_end:"",
			multimarket_bg_de:"",
			multimarket_bg_nl:"",
			multimarket_wait:"http://www.bitzones.net/images/icons/delete.png",
			multimarket_ready:"http://www.bitzones.net/images/icons/yes.png",
		},
		links: {
			chat_get:"http://www.bitzones.net/code/Original/chat.php",
			chat_send:"http://www.bitzones.net/code/Original/chat2.php"
		},
		resource: {
			css_file:"http://www.bitzones.net/css/beta.css",
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
	if (currentTime > (lastCheck + 86400)) { //24 hours after last check
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