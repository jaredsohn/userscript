// ==UserScript==
// @name                WME Hide LandMarks
// @namespace           @HL_Myriades
// @description         Allow you to hide specific landmarks type
// @include             https://www.waze.com/editor/*
// @include             https://www.waze.com/*/editor/*
// @icon                http://s3.amazonaws.com/uso_ss/icon/187091/large.png?1389896234
// @updateURL           https://userscripts.org/scripts/source/187091.meta.js
// @downloadURL         https://userscripts.org/scripts/source/187091.user.js
// @version             3.0
// @grant				none
// ==/UserScript==

window.WMEHL = {'loaded': false, 'script_name':'WME LandMarks Tools', 'version': '3.0', 'script_URL': 'http://userscripts.org/scripts/show/187091', 'Debug_Level': 1};
//	Debug level :: 0 -> nothing, 1 -> basic, 2 -> debug, 3 -> crazy debug 
var HL_options = new Array();
var isReset = false;
var requested_div = "";

/* bootstrap, will call HL_init() */
function HL_bootstrap(){
	HL_addLog(1, 'info', 'init');
	if (typeof(unsafeWindow) === "undefined"){
		unsafeWindow = ( function () {
			var dummyElem = document.createElement('p');
			dummyElem.setAttribute('onclick', 'return window;');
			return dummyElem.onclick();
		}) ();
	}
	/* begin running the code! */
	setTimeout(HL_init, 1000);
}

/* helper function */
function getElementsByClassName(classname, node) {
  if(!node) node = document.getElementsByTagName("body")[0];
  var a = [];
  var re = new RegExp('\\b' + classname + '\\b');
  var els = node.getElementsByTagName("*");
  for (var i=0,j=els.length; i<j; i++)
    if (re.test(els[i].className)) a.push(els[i]);
  return a;
}

function getId(node) {
  return document.getElementById(node);
}

function getSelectedValue(node){
	var t = getId(node);
	return t.options[t.selectedIndex].value;
}

function HL_tab_switch(){
	getId('HL_H_Transports').style.display = 'none';
	getId('HL_H_Loisirs').style.display = 'none';
	getId('HL_H_Nature').style.display = 'none';
	getId('HL_H_Public').style.display = 'none';
	getId('HL_H_Services_Public').style.display = 'none';
	getId(getSelectedValue('HL_POI_select')).style.display = 'block';
}

function HL_setTranslations(){
	// Default language 'en'
	HL_translations.en["WMEHideLandmarks"] = "WME Hide Landmarks";
	HL_translations.en["HideLandmarks"] = "Hide Landmarks";
	HL_translations.en["CommonHides"] = "Most popular";
	switch(HL_cur_lng){
		// English
		case 'en':
			break;
		// Français
		case 'fr':
			HL_translations.fr["WMEHideLandmarks"] = "WME Masquage de POI";
			HL_translations.fr["HideLandmarks"] = "Masquage de POI";
			HL_translations.fr["CommonHides"] = "Les plus utilisés";
			break;
	}
}

function HL_getTranslations(){
	HL_def_translations = HL_translations[HL_def_lng];
	HL_available_translations = HL_translations[HL_cur_lng];
	HL_categories_translations = HL_available_translations.landmark.categories;
	HL_mtfcc_translations = HL_available_translations.landmark.mtfcc;
}

function clacAngle(){
/*
	fA = Sqr(((Xc - Xb) ^ 2) + ((Yc - Yb) ^ 2)) 'distance entre b et c
	fB = Sqr(((Xc - Xa) ^ 2) + ((Yc - Ya) ^ 2)) 'distance entre a et c
	fC = Sqr(((Xb - Xa) ^ 2) + ((Yb - Ya) ^ 2)) 'distance entre a et b
	fAngle = ((fA ^ 2) + (fC ^ 2) - (fB ^ 2)) / (2 * fA * fC) '(a2 + c2 - b2) / (2*a*c)
	Acos(fAngle) 'inverse du cosinus
	Degrees(fAngle) 'fonction degree
*/
}

function HL_addLog(HL_Level, HL_type, HL_text){
	if(HL_Level <= WMEHL.Debug_Level){
		var HLaL_text = 'WME_HL_' + WMEHL.version + ' : ' + HL_text;
		switch(HL_type){
			case 'info':
				console.info(HLaL_text);
				break;
			case 'error':
				console.error(HLaL_text);
				break;
			default:
				console.log(HLaL_text);
				break;
		}
		if(typeof(arguments[3]) !== 'undefined'){
			console.debug(HLaL_text);
			console.debug(arguments[3]);
		}
	}
}

function HL_POI_html_init(){
	//	Primary checks
	if(getId('HL_POI_extra_infos') != null)return;
	selLandmark = HL_selectionManager.selectedItems[0];
	if(typeof(selLandmark) === 'undefined')return;
	if(selLandmark.type != 'landmark')return;
	HL_POI_html();
}

function HL_POI_html(){
	//	Primary checks
	var LandGeometry = selLandmark.geometry;
	if(typeof(LandGeometry) === 'undefined')return;
	var LandBounds = LandGeometry.bounds;
	if(typeof(LandBounds) === 'undefined')return;
	//	Vars
	var lm_width = Math.abs(LandBounds.left - LandBounds.right);
	var lm_height = Math.abs(LandBounds.bottom - LandBounds.top);
	var lm_is_visible = 'no';
	if(lm_width >= 50 || lm_height >= 50)lm_is_visible = 'yes';
	var lm_aera = LandGeometry.getArea();
	//	HTML rendering
	var WME_POI_infos = getId('landmark-edit-general');
	WME_HL_POI_addon = document.createElement('div');
	WME_HL_POI_addon.id = 'HL_POI_extra_infos';
	WME_HL_POI_addon.innerHTML = '<hr><b>Extra informations</b><br>';
	WME_HL_POI_addon.innerHTML += '- Landmark is visible on client : ' + lm_is_visible + '<br>';
	WME_HL_POI_addon.innerHTML += '- Box width : ' + eval(Math.round(lm_width * 100) / 100) + 'm<br>';
	WME_HL_POI_addon.innerHTML += '- Box height : ' + eval(Math.round(lm_height * 100) / 100) + 'm<br>';
	WME_HL_POI_addon.innerHTML += '- Landmark area : ' + eval(Math.round(lm_aera * 1) / 1)+ ' m²<br>';
	if(getId('HL_on_off').checked){
		WME_HL_POI_addon.innerHTML += '<input type="button" id="_HL_btn_hide_all" value="Hide this landmark type" /><br>';
		// WME_HL_POI_addon.innerHTML += '<input type="button" id="_HL_btn_fix_geo" value="Fix landmark geometry" /><br>';
	}
	WME_POI_infos.appendChild(WME_HL_POI_addon);
	//	Event
	getId('_HL_btn_hide_all').onclick = HL_btn_Hider;
	HL_addLog(1, 'info', 'Renderred landmark extra infos');
}

function HL_btn_Hider(){
	HL_selectionManager.unselectAll();
	getId('_HL_' + selLandmark.attributes.mtfcc).checked = true;
}

function HL_html(){
	//	Les traductions
	// HL_setTranslations();
	HL_getTranslations();
	//	L'onglet
	newtab = document.createElement('li');
	newtab.id = 'HL_tab_selector';
	newtab.innerHTML = '<a href="#sidepanel-hidel" data-toggle="tab">Landmark Tools</a>';
	HL_navTabs.appendChild(newtab);
	//	Le contenant 1
	var addon = document.createElement('div');
	addon.id = "sidepanel-hidel";
	addon.className = "tab-pane";
	//	L'entête du contenu
	addon.innerHTML = '<b><a href="' + WMEHL.script_URL + '" target="_blank"><u>' + WMEHL.script_name + '</u></a></b> v ' + WMEHL.version;
	addon.innerHTML += '<span style="padding-left: 20px;"><input type="checkbox" id="HL_on_off" /><label style="padding-left: 5px;" for="HL_on_off">On-Off</label></span>';
	HL_tabContent.appendChild(addon);
	//	Les onglets du plugin
	myTabs = document.createElement('ul');
	myTabs.id = 'HL_tab_subselector';
	myTabs.className = "nav nav-tabs";
	myTabs.innerHTML = '<li class="active"><a href="#hidel-hidding" data-toggle="tab">Hide</a></li>';
	myTabs.innerHTML += '<li class=""><a href="#hidel-tools" data-toggle="tab">Options / Tools</a></li>';
	// myTabs.innerHTML += '<li class=""><a href="#hidel-infos" data-toggle="tab">Infos</a></li>';
	addon.appendChild(myTabs);
	//	Le contenant 2
	var addon_tab_content = document.createElement('div');
	addon_tab_content.className = "tab-content";
	addon.appendChild(addon_tab_content);
	//	Le contenu 1
	var section = document.createElement('p');
	section.className = "tab-pane active";
	section.style.padding = "8px 16px";
	section.style.textIndent = "-16px";
	section.id = "hidel-hidding";
	//	Commons
	section.innerHTML = '<div style="text-align: center;">'
						+ '<input type="button" id="btn_hl_none" value="None" /><span style="padding-left: 3px;"></span>'
						+ '<input type="button" id="btn_hl_reset" value="Reset to default options" />'
						+ '</div><br/><div id="HL_common">'
						+ '<input type="checkbox" id="hl_ch" /> <b>Common hides</b><br>'
						+ '<input type="checkbox" id="_HL_H2053" /> ' + HL_mtfcc_translations.H2053 + '<br/>'
						+ '<input type="checkbox" id="_HL_H3010" /> ' + HL_mtfcc_translations.H3010 + '<br/>'
						+ '<input type="checkbox" id="_HL_K2181" /> ' + HL_mtfcc_translations.K2181 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0200" /> ' + HL_mtfcc_translations.W0200 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0216" /> ' + HL_mtfcc_translations.W0216 + '<br/>'
						+ '<input type="checkbox" id="_HL_K2452" /> ' + HL_mtfcc_translations.K2452 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0001" /> ' + HL_mtfcc_translations.W0001 + '<br/>'
						+ '<input type="checkbox" id="_HL_K2110" /> ' + HL_mtfcc_translations.K2110 + '<br/></div>';
	//	Sélection des catégories de POI
	section.innerHTML += '<div style="padding-top:16px">'
						+ '<span style="padding-right: 10px;"><b>Select a category</b></span>'
						+ '<select id="HL_POI_select">'
						+ '	<option value="HL_H_Transports">' + HL_categories_translations.transportation + '</option>'
						+ '	<option value="HL_H_Loisirs">' + HL_categories_translations.leisure + '</option>'
						+ '	<option value="HL_H_Nature">' + HL_categories_translations.nature + '</option>'
						+ '	<option value="HL_H_Public">' + HL_categories_translations.public + '</option>'
						+ '	<option value="HL_H_Services_Public">' + HL_categories_translations.public_service + '</option>'
						+ '</select></div>';
	//	Catégorie transports
	section.innerHTML += '<div id="HL_H_Transports" style="display:block;">'
						+ '<input type="checkbox" id="hl_tr" /> <b>Transports hide options</b><br>'
						+ '<input type="checkbox" id="_HL_W0002" /> ' + HL_mtfcc_translations.W0002 + '<br/>'
						+ '<input type="checkbox" id="_HL_C3067" /> ' + HL_mtfcc_translations.C3067 + '<br/>'
						+ '<input type="checkbox" id="_HL_K2400" /> ' + HL_mtfcc_translations.K2400 + '<br/>'
						+ '<input type="checkbox" id="_HL_K2451" /> ' + HL_mtfcc_translations.K2451 + '<br/>'
						+ '<input type="checkbox" id="_HL_K2453" /> ' + HL_mtfcc_translations.K2453 + '<br/>'
						+ '<input type="checkbox" id="_HL_K2454" /> ' + HL_mtfcc_translations.K2454 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0003" /> ' + HL_mtfcc_translations.W0003 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0201" /> ' + HL_mtfcc_translations.W0201 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0202" /> ' + HL_mtfcc_translations.W0202 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0203" /> ' + HL_mtfcc_translations.W0203 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0204" /> ' + HL_mtfcc_translations.W0204 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0205" /> ' + HL_mtfcc_translations.W0205 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0206" /> ' + HL_mtfcc_translations.W0206 + '<br/>'
					  + '</div>';
	//	Catégorie Loisirs
	section.innerHTML += '<div id="HL_H_Loisirs" style="display:none;">'
						+ '<input type="checkbox" id="hl_lo" /> <b>Loisirs hide options</b><br>'
						+ '<input type="checkbox" id="_HL_K2190" /> ' + HL_mtfcc_translations.K2190 + '<br/>'
						+ '<input type="checkbox" id="_HL_K2545" /> ' + HL_mtfcc_translations.K2545 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0101" /> ' + HL_mtfcc_translations.W0101 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0112" /> ' + HL_mtfcc_translations.W0112 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0115" /> ' + HL_mtfcc_translations.W0115 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0121" /> ' + HL_mtfcc_translations.W0121 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0140" /> ' + HL_mtfcc_translations.W0140 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0211" /> ' + HL_mtfcc_translations.W0211 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0212" /> ' + HL_mtfcc_translations.W0212 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0213" /> ' + HL_mtfcc_translations.W0213 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0214" /> ' + HL_mtfcc_translations.W0214 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0215" /> ' + HL_mtfcc_translations.W0215 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0217" /> ' + HL_mtfcc_translations.W0217 + '<br/>'
					  + '</div>';
	//	Catégorie Nature
	section.innerHTML += '<div id="HL_H_Nature" style="display:none;">'
						+ '<input type="checkbox" id="hl_na" /> <b>Nature hide options</b><br>'
						+ '<input type="checkbox" id="_HL_C3023" /> ' + HL_mtfcc_translations.C3023 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0218" /> ' + HL_mtfcc_translations.W0218 + '<br/>'
						+' <input type="checkbox" id="_HL_W0219" /> ' + HL_mtfcc_translations.W0219 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0220" /> ' + HL_mtfcc_translations.W0220 + '<br/>'
						+ '</div>';
	//	Catégorie Public
	section.innerHTML += '<div id="HL_H_Public" style="display:none;">'
						+ '<input type="checkbox" id="hl_pu" /> <b>Public hide options</b><br>'
						+ '<input type="checkbox" id="_HL_K3544" /> ' + HL_mtfcc_translations.K3544 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0111" /> ' + HL_mtfcc_translations.W0111 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0150" /> ' + HL_mtfcc_translations.W0150 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0160" /> ' + HL_mtfcc_translations.W0160 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0180" /> ' + HL_mtfcc_translations.W0180 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0207" /> ' + HL_mtfcc_translations.W0207 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0208" /> ' + HL_mtfcc_translations.W0208 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0209" /> ' + HL_mtfcc_translations.W0209 + '<br/>'
						+ '<input type="checkbox" id="_HL_W0210" /> ' + HL_mtfcc_translations.W0210 + '<br/>'
						+ '</div>';
	//	Services Publics
	section.innerHTML += '<div id="HL_H_Services_Public" style="display:none;">'
						+ '<input type="checkbox" id="hl_sp" /> <b>Services Public hide options</b><br>'
						+ '<input type="checkbox" id="_HL_K1231" /> ' + HL_mtfcc_translations.K1231 + '<br>'
						+ '<input type="checkbox" id="_HL_K1237" /> ' + HL_mtfcc_translations.K1237 + '<br>'
						+ '<input type="checkbox" id="_HL_K2165" /> ' + HL_mtfcc_translations.K2165 + '<br>'
						+ '<input type="checkbox" id="_HL_K2194" /> ' + HL_mtfcc_translations.K2194 + '<br>'
						+ '<input type="checkbox" id="_HL_K2540" /> ' + HL_mtfcc_translations.K2540 + '<br>'
						+ '<input type="checkbox" id="_HL_K2543" /> ' + HL_mtfcc_translations.K2543 + '<br>'
						+ '<input type="checkbox" id="_HL_K2582" /> ' + HL_mtfcc_translations.K2582 + '<br>'
						+ '<input type="checkbox" id="_HL_W0221" /> ' + HL_mtfcc_translations.W0221 + '<br>'
						+ '<input type="checkbox" id="_HL_W0222" /> ' + HL_mtfcc_translations.W0222 + '<br>'
						+ '</div>';
	addon_tab_content.appendChild(section);
	//	Le contenu 1
	var section = document.createElement('p');
	section.className = "tab-pane";
	section.style.padding = "8px 16px";
	section.style.textIndent = "-16px";
	section.id = "hidel-tools";
	section.innerHTML = '<b>Options / Tools</b><br>';
	section.innerHTML += '<input type="checkbox" id="lh_glh">&nbsp;General highlight<br>';
	section.innerHTML += '<input type="checkbox" id="st_sl">&nbsp;Highlight too small landmarks<br>';
	// section.innerHTML += '<input type="checkbox" id="h2l2">&nbsp;Highlight too high level landmark (not yet)<br>';
	// section.innerHTML += '<input type="button" id="d2_sl" value="Delete too small landmarks">&nbsp;(lvl 3)(not yet)<br>';
	addon_tab_content.appendChild(section);
}

function un_tickAll(){
	var HL_script = getId(requested_div);
	var HL_script_inputs = HL_script.getElementsByTagName('input');
	var need2Bchecked = false;
	for(var i=0; i < HL_script_inputs.length; i++){
		if(i == 0){
			need2Bchecked = HL_script_inputs[i].checked;
			continue;
		}
		else{
			HL_script_inputs[i].checked = need2Bchecked;
		}
	}
	requested_div = "";
}

function showAll(){
	var HL_script = getId('hidel-hidding');
	var HL_script_inputs = HL_script.getElementsByTagName('input');
	for(var i=0; i < HL_script_inputs.length; i++){
		HL_script_inputs[i].checked = false;
	}
}

//	On masque/affiche les landmarks et +
function HideL(){
	if(HL_waze_landmarks.active === true){
		for(var mark in HL_waze_landmarks.objects){
			var landmark = HL_waze_landmarks.get(mark);
			var poly = getId(landmark.geometry.id);
			if(poly !== null){
				if(getId('HL_on_off').checked){
					var mtfcc = landmark.attributes.mtfcc;
					//	Check if visibility is allowed
					var theId = '_HL_' + mtfcc;
					if(getId(theId).checked){
						poly.setAttribute("visibility", "hidden");
						continue;
					}
					else{
						poly.setAttribute("visibility", "visible");
					}
					//	General highlight
					if(getId('lh_glh').checked){
						var fillColor = "#999";
						var stroke = "#ccc";
						var fillOpacity = 0.5;
						//	Highlight 2 small landmark
						switch(is2small(landmark)){
							case 1:
								stroke = "#FF0000";
								fillColor = "#FF4D4D";
								break;
							case 2:
								stroke = "#FF0000";
								fillColor = "#FF9900";
								break;
							default:	//	global highlight
								switch(mtfcc){
									case 'W0002':	//	station services
										fillColor = "#00d894";
										stroke = "#00d894";
										break;
									case "W0001":	//	parking
										fillColor = "#f99";
										break;
									case "H2053":	//	océan
									case "H3010":	//	rivières
										fillColor = "#09f";
										stroke = "#69f";
										break;
									case "K2181":
									case "K2190":
										fillColor = "#0f0";
										stroke = "#9f9";
										break;
								}
								break;
						}
						poly.setAttribute("stroke", stroke);
						poly.setAttribute("fill", fillColor);
						poly.setAttribute("fill-opacity",fillOpacity);
						continue;
					}
				}
				poly.setAttribute("visibility", "visible");
				poly.setAttribute("fill", "#0093ae");
				poly.setAttribute("stroke", "#0093ae");
				poly.setAttribute("fill-opacity", 0.4);
			}
		}
	}
}

function is2small(landmark){
	if(HL_waze_Map.zoom < 5)return 0;
	if(!getId('st_sl').checked)return 0;
	var LandBounds = landmark.bounds;
	var v_Dist = Math.abs(LandBounds.bottom - LandBounds.top);
	var h_Dist = Math.abs(LandBounds.left - LandBounds.right);
	if(v_Dist < 40 && h_Dist < 40)return 1;
	if(v_Dist < 50 && h_Dist < 50)return 2;
}

//	On vérifie les options pour la sauvegarde
function HL_CheckOptions(){
	getInputs('hidel-hidding');
	getInputs('hidel-tools');
	//	On-Off
	addRemove(getId('HL_on_off'));
}

function getInputs(divId){
	var HL_script = getId(divId);
	var HL_script_inputs = HL_script.getElementsByTagName('input');
	for(var i=0; i < HL_script_inputs.length; i++){
		addRemove(HL_script_inputs[i]);
	}
}

function addRemove(DOMinput){
	//	Ajout
	if(DOMinput.checked === true){
		if(HL_options.indexOf(DOMinput.id) == -1){
			HL_options.push(DOMinput.id);
		}
	}
	//	Retrait
	else{
		if(HL_options.indexOf(DOMinput.id) > -1){
			HL_options.splice(HL_options.indexOf(DOMinput.id),1);
		}
	}
}

//	restore saved settings
function HL_restoreOptions(){
	if(localStorage.WMEHLScript) {
		HL_addLog(1, 'info', 'loading options');
		HL_options = JSON.parse(localStorage.WMEHLScript);
		for(var i=0; i < HL_options.length; i++){
			getId(HL_options[i]).checked = true;
		}
	}
	//	Default options
	else{
		getId('HL_on_off').checked = true;
		getId('lh_glh').checked = true;
		getId('st_sl').checked = true;
		HideDefaultOptions();
	}
}

function HideDefaultOptions(){
	if(isReset === true){
		var HL_script = getId('hidel-hidding');
		var HL_script_inputs = HL_script.getElementsByTagName('input');
		for(var i=0; i < HL_script_inputs.length; i++){
			HL_script_inputs[i].checked = false;
		}
	}
	getId('_HL_H2053').checked = true;
	getId('_HL_H3010').checked = true;
	getId('_HL_K2181').checked = true;
	getId('_HL_W0200').checked = true;	//	Autre
	isReset = false;
	HL_CheckOptions();
}

//	overload the WME exit function
function HL_saveOptions(){
	if(localStorage){
		HL_CheckOptions();
		var HL_options_JSON = JSON.stringify(HL_options);
		localStorage.WMEHLScript = HL_options_JSON;
		HL_addLog(1, 'info', 'options saved');
	}
}

function HL_init(){
	//	Waze object needed
	HL_Waze = unsafeWindow.W;
	if(typeof(HL_Waze) == 'undefined'){
		HL_addLog(1, 'error', 'unsafeWindow.W NOK', HL_Waze);
		window.setTimeout(HL_init, 500);
		return;
	}
	HL_waze_Map = HL_Waze.map;
	if(typeof(HL_waze_Map) == 'undefined'){
		HL_addLog(1, 'error', 'map NOK', HL_waze_Map);
		window.setTimeout(HL_init, 500);
		return;
	}
	HL_waze_model = HL_Waze.model;
	if(typeof(HL_waze_model) == 'undefined'){
		HL_addLog(1, 'error', 'model NOK', HL_waze_model);
		window.setTimeout(HL_init, 500);
		return;
	}
	HL_selectionManager = HL_Waze.selectionManager;
	if(typeof(HL_selectionManager) == 'undefined'){
		HL_addLog(1, 'error', 'selectionManager NOK', HL_selectionManager);
		window.setTimeout(HL_init, 500);
		return;
	}
	HL_waze_landmarks = HL_waze_model.landmarks;
	if(typeof(HL_waze_landmarks) == 'undefined'){
		HL_addLog(1, 'error', 'landmarks NOK', HL_waze_landmarks);
		window.setTimeout(HL_init, 500);
		return;
	}
	HL_addLog(1, 'info', 'Waze OK');
	//	Waze GUI needed
	HL_userTabs = getId('user-info');
	if(typeof(HL_userTabs) == 'undefined'){
		HL_addLog('error', 'userTabs NOK', HL_userTabs);
		window.setTimeout(HL_init, 500);
		return;
	}
	HL_navTabs = HL_userTabs.getElementsByTagName('ul')[0];
	if(typeof(HL_navTabs) == 'undefined'){
		HL_addLog(1, 'error', 'navTabs NOK', HL_navTabs);
		window.setTimeout(HL_init, 500);
		return;
	}
	HL_tabContent = HL_userTabs.getElementsByTagName('div')[0];
	if(typeof(HL_tabContent) == 'undefined'){
		HL_addLog(1, 'error', 'tabContent NOK', HL_tabContent);
		window.setTimeout(HL_init, 500);
		return;
	}
	HL_addLog(1, 'info', 'GUI OK');
	//	Traductions
	HL_translations = unsafeWindow.I18n.translations;
	if(typeof(HL_translations) == 'undefined'){
		setTimeout(HL_init, 500);
		return;
	}
	HL_cur_lng = unsafeWindow.I18n.locale;
	if(typeof(HL_cur_lng) == 'undefined'){
		setTimeout(HL_init, 500);
		return;
	}
	HL_def_lng = 'en';
	HL_addLog(1, 'info', 'Traductions OK');
	//	WMEHL
	WMEHL = unsafeWindow.WMEHL;
	if(typeof(WMEHL) == 'undefined'){
		setTimeout(HL_init, 500);
		return;
	}
	HL_addLog(2, 'info', 'WMEHL OK', WMEHL);
	//	Then do the job
	HL_html();
	//	restore saved settings
	HL_restoreOptions();
	//	Btn / radio Events
	getId('lh_glh').onchange = HideL;
	getId('st_sl').onchange = HideL;
	getId('HL_on_off').onchange = HideL;
	getId('HL_POI_select').onchange = HL_tab_switch;
	getId('hl_ch').onchange = function(){requested_div = "HL_common"; un_tickAll();};
	getId('hl_tr').onchange = function(){requested_div = "HL_H_Transports"; un_tickAll();};
	getId('hl_lo').onchange = function(){requested_div = "HL_H_Loisirs"; un_tickAll();};
	getId('hl_na').onchange = function(){requested_div = "HL_H_Nature"; un_tickAll();};
	getId('hl_pu').onchange = function(){requested_div = "HL_H_Public"; un_tickAll();};
	getId('hl_sp').onchange = function(){requested_div = "HL_H_Services_Public"; un_tickAll();};
	getId('btn_hl_none').onclick = showAll;
	getId('btn_hl_reset').onclick = function(){isReset = true; HideDefaultOptions();};
	//	Waze events
	HL_selectionManager.events.register("selectionchanged", null, HL_POI_html_init);
	HL_selectionManager.events.register("selectionchanged", null, HideL);
	HL_waze_Map.events.register("mergeend", null, HideL);
	HL_waze_Map.events.register("zoomeend", null, HideL);
	//	Periodics updates
	window.setInterval(HideL, 250);
	//	beforeunload WME overload
	window.addEventListener("beforeunload", HL_saveOptions, false);
	HL_addLog(1, 'info', 'loaded');
	WMEHL.loaded = true;
}

/* engage! =================================================================== */
HL_bootstrap();
/* end ======================================================================= */

/* Version 3.0
- Plug-in rename from "hide landmarks" to landmark tools
- Add : extra info on detail pane
- Add : a button on detail pane, that allows you to hide all a landmark type
- Add : tools / options Tab
- Add : "On-Off" checkbox (keep extra detail pane)
- Add : button to unselect all hidding landmark
- Add : button to reset hidding to defaults
- Add : general highlighting option (following WME color highlight)
- Add : too small landmark highlighting option
- Add : hide all a category
- Fix : landmark unselect when hiding a landmark type using the button (thanks to DummyD2)
- Fix : display on landmark geometry changed
- Improvement : general code (much faster it seems and less stress for navigator)
- Suppress : extra translations
*/

/*	TODO
-1 : auto off when creating a landmark
-2 : Highlight landmark with too high level (may conflicts with WME highlights)
-3 : fix landmark geometry (supress extra geometry nodes)
-4 : button suppress too small landmarks (L3?)
*/