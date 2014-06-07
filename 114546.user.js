// ==UserScript==
// @name           tribalwars-Hotkeys-by-tw4me.com
// @namespace      Bone008
// @description    Ermoeglicht das Einrichten und Verwenden von beliebigen Hotkeys fuer Schnellleisten-, sonstige und direkte Links.
// @include        http://*/game.php*
// @version        2.01
// @resource       toggle_plus  http://www.my-dsforen.de/bone008/resources/toggle_plus.png
// @resource       toggle_minus http://www.my-dsforen.de/bone008/resources/toggle_minus.png
// ==/UserScript==

var api = typeof unsafeWindow != 'undefined' ? unsafeWindow.ScriptAPI : window.ScriptAPI;
api.register( 'Hotkeys', 7.4, 'Bone008', 'Tigerteufel@die-staemme.de' );

(function(){

// Version des Scripts
var version = "2.01";


if(typeof GM_getResourceURL != "function"){
	function GM_getResourceURL(res_name){
		switch(res_name){
			case "toggle_plus": return "http://www.my-dsforen.de/bone008/resources/toggle_plus.png"; break;
			case "toggle_minus": return "http://www.my-dsforen.de/bone008/resources/toggle_minus.png"; break;
			default: postErrorMsg("No resource with name: "+res_name); break;
		}
	}
}


// Standard-Variablen deklarieren
var win = (typeof unsafeWindow != "undefined" ? unsafeWindow : window);
var url = location.href;
var $_GET = getVariables();
var game_data = win.game_data;
var globalTable = document.body.getElementsByClassName("main_layout");
var PA = (document.body.innerHTML.match("icon header arr_down") ? true:false);
var SL = gid("quickbar_inner");
// Umlaut-Variablen fuer modale Fenster
var ae="\xE4",oe="\xF6",ue="\xFC",AE="\xC4",OE="\xD6",UE="\xDC",sz="\xDF";

if(typeof game_data != "object"){
	postErrorMsg("game_data object not found!");
	return;
}
if(globalTable && globalTable.length && globalTable[0]){
	globalTable = globalTable[0];
} else{
	globalTable = gid("main_layout");
	if(!globalTable){
		postErrorMsg("main table not found");
		return;
	}
}

var darkener = new DarkenSystem();
var storage = new Storage("hotkeys",false);



// Startfunktion; wird nach Deklarationen der Objekte aufgerufen
function init(){
	General.init();
	
	darkener.depth(150000);
	if(game_data.screen == "settings" && game_data.mode == "settings"){
		SettingsAPI.generate();
		if(SettingsAPI.get_ini("open_onload"))
			SettingsAPI.toggleContent({target:gid("hotkeys_toggleimg")},true);
	}
}




/* General: steuert das Capturing und Ausfuehren der festgelegten Hotkeys */
var General = {
	enabled: true,
	
	init: function(){
		window.addEventListener("keydown",function(e){General.captured(e);},false);
	},
	
	captured: function(e){
		var target_tag = e.target.tagName.toLowerCase();
		if( (target_tag == "input" && e.target.type == "text") || target_tag == "textarea" ){
			return;
		}
		if(!this.enabled) return;
		
		var all = storage.listValues(/hotkey_\d+/);
		for(var i=0; i<all.length; i++){
			var key_data = storage.getValue(all[i]);
			if(!checkHotkeyStructure(key_data)){
				postErrorMsg("unable to verify structure of "+all[i]);
				continue;
			}
			
			if(	e.keyCode == key_data.keyCode &&
				e.ctrlKey == key_data.ctrlKey &&
				e.shiftKey == key_data.shiftKey &&
				e.altKey == key_data.altKey){
					
					switch(key_data.type){
						case 1:	// direkt
							if(!PA){ postErrorMsg("user not premium"); break; }
							
							var furl = key_data.data.url.replace(/\{game\}/g,"/game.php?village="+game_data.village.id);
							
							
							if(key_data.data.blank)
								window.open(furl);
							else
								location.href = furl;
							break;
							
							
							
						case 2:	// SL
							if(!SL){ postErrorMsg("quickbar not enabled"); break; }
							
							var sla = SL.getElementsByTagName("a");
							
							for(var j=0; j<sla.length; j++){
								var sl_link = sla[j].cloneNode(true);
								var sl_img = sl_link.getElementsByTagName("img");
								
								// Sonderfall wegen ploetzlichem title-Attribut in den SL-Link-Bildern auf dem VP
								if(sl_img.length && sl_img[0] && sl_img[0].getAttribute("title") && !key_data.data.inner.match(/title=".+"/)){
									sl_img[0].removeAttribute("title");
								}
								
								if(trim(sl_link.innerHTML) == key_data.data.inner){
									this.call(sla[j]);
								}
							}
							break;
							
							
							
						case 3:	// sonstiger
							var scan_elements = [];
							if(key_data.data.link_type == 0)
								scan_elements = nodes2array(document.getElementsByTagName("a"));
							if(key_data.data.link_type == 1){
								scan_elements = nodes2array(document.getElementsByTagName("button"));
								var inputs = nodes2array(document.getElementsByTagName("input"));
								for(var j=0; j<inputs.length; j++){
									if(inputs[j].type == "submit" || inputs[j].type == "button")
										scan_elements.push(inputs[j]);
								}
							}
							
							for(var j=0; j<scan_elements.length; j++){
								var scan_content;
								if(key_data.data.recog_method == 0)
									scan_content = scan_elements[j].getAttribute(key_data.data.html_attr);
								else if(key_data.data.recog_method == 1)
									scan_content = trim((scan_elements[j].value ? scan_elements[j].value : scan_elements[j].innerHTML));
								
								if(!scan_content){ postErrorMsg("unable to get scan_content of element "+j); continue; }
								
								
								if(this.matchWildcards(key_data.data.value,scan_content)){
									this.call(scan_elements[j]);
									break;
								}
							}
							break;
							
							
							
						default:
							postErrorMsg(all[i]+" has invalid type");
					}
			}
		}
	},
	
	matchWildcards: function(pattern,str){
		var patt = pattern.split("*");
		var last_index = -1;
		for(var i=0; i<patt.length; i++){
			var curr_index = str.indexOf(patt[i]);
			// Erster Teil: muss an erster Stelle sein
			if(i==0 && curr_index != 0)
				return false;
			// Letzter Teil: muss an letzter Stelle sein (index+laenge = gesamt_laenge)
			else if(i>=patt.length-1){
				if(patt[i].length>0 && curr_index+patt[i].length != str.length)
					return false;
			}
			// Standardfall
			else if(curr_index < last_index || curr_index <= -1)
				return false;
			else{
				last_index = curr_index;
			}
		}
		return true;
	},
	
	
	call: function(node){
		node.focus();
		
		if(node.tagName.toLowerCase() == "a"){
			if(node.target == "blank")
				window.open(node.href);
			else
				location.href = node.href;
		}
		else if(node.tagName.toLowerCase() == "input" || node.tagName.toLowerCase() == "button"){
			node.click();
		}
		else
			postErrorMsg("unable to call node: invalid node-type");
	}
};




/* SettingsAPI: fuer Einstellungen unter Einstellungen -> Einstellungen
		isOpen: boolean, gibt an, ob die Einstellungen derzeit geoeffnet sind
		-------------------------------------------------------------------------------------
		generate: generiert den Container des UIs auf der Einstellungs-Seite und zeigt es an
		generateContent: wird von generate aufgerufen und fuellt den uebergebenen Container mit Inhalt
		refreshContent: laedt die Hotkey-Liste neu
		editHotkey: Bearbeiten des angeklickten Hotkeys
		deleteHotkey: Loeschen des angeklickten Hotkeys
		toggleContent: schaltet die Sichtbarkeit des Contents um
		closeHkPopup: schliesst das Popup-Fenster von newHotkey
*/
var SettingsAPI = {
	isOpen: false,
	
	generate: function(){
		var settingsForm = document.getElementsByClassName("vis settings")[0].parentNode;
		var mainTable = settingsForm.parentNode;
		
		
		var hk_container = $("div");
		hk_container.id = "hotkeys_container";
		
		hk_container.appendChild($("hr"));
		
		var headline = $("h3");
		
		var toggle_img = $("img");
		toggle_img.id = "hotkeys_toggleimg";
		toggle_img.src = GM_getResourceURL("toggle_plus");
		toggle_img.style.cursor = "pointer";
		toggle_img.title = "Einstellungen anzeigen";
		toggle_img.addEventListener("click",function(e){SettingsAPI.toggleContent(e);},false);
		headline.appendChild(toggle_img);
		
		headline.appendChild(document.createTextNode(" Hotkeys "));
		
		var version_span = $("span");
		version_span.className = "grey";
		version_span.innerHTML = version;
		headline.appendChild(version_span);
		hk_container.appendChild(headline);
		

//		Inhalt der Einstellungen generieren & anzeigen		
		var hk_content = $("div");
		hk_content.id = "hotkeys_content";
		hk_content.style.display = "none";
		this.generateContent(hk_content);
		hk_container.appendChild(hk_content);
		

		hk_container.appendChild($("hr"));
		
		mainTable.insertBefore(hk_container,settingsForm);
	},
	
	generateContent: function(hk_content){
		var s_colums = 4;
		var s_table = $("table");
		s_table.className = "vis";
		s_table.style.width = "900px";
		
		var s_header_tr = $("tr");
		var s_th = $("th");
		s_th.setAttribute("colspan",s_colums);
		s_th.innerHTML = "حفظ مفاتيح التشغيل";
		s_header_tr.appendChild(s_th);
		s_table.appendChild(s_header_tr);
		
		var s_ex_tr = $("tr");
		var s_ex_td = $("td");
		s_ex_td.setAttribute("colspan",s_colums);
		s_ex_td.innerHTML = "جدول الروابط و اختصارتها التي تم تخزينها ";
		s_ex_tr.appendChild(s_ex_td);
		s_table.appendChild(s_ex_tr);
		
		var s_sign_tr = $("tr");
		var s_sign_th = [];
		s_sign_th[0] = $("th");
		s_sign_th[0].innerHTML = "رمز الاختصار";
		s_sign_th[1] = $("th");
		s_sign_th[1].innerHTML = "النوع";
		s_sign_th[2] = $("th");
		s_sign_th[2].innerHTML = "وصف الاختصار";
		s_sign_th[3] = $("th");
		s_sign_th[3].width = "8px";
		s_sign_th[3].innerHTML = "&nbsp;";
		s_sign_tr.appendChild(s_sign_th[0]);
		s_sign_tr.appendChild(s_sign_th[1]);
		s_sign_tr.appendChild(s_sign_th[2]);
		s_sign_tr.appendChild(s_sign_th[3]);
		s_table.appendChild(s_sign_tr);
		
		
		var saved_keys = storage.listValues(/hotkey_\d+/);
		for(var i=0; i<saved_keys.length; i++){
			var hk = storage.getValue(saved_keys[i]);
			if(typeof hk != "object"){
				postErrorMsg("unable to get valid listed value "+saved_keys[i]);
				continue;
			}
			
			if(checkHotkeyStructure(hk)){
				var hk_row = $("tr");
				hk_row.className = (i%2 ? "row_b" : "row_a");
				hk_row.id = saved_keys[i];
				hk_row.title = saved_keys[i];
				
				var hk_key_td = $("td");
				hk_key_td.innerHTML = (hk.ctrlKey ? "Strg + ":"") + (hk.shiftKey ? "Shift + ":"") + (hk.altKey ? "Alt + ":"") + "<strong>"+decodeKey(hk.keyCode,false)+"</strong>";
				
				var hk_type_td = $("td");
				hk_type_td.innerHTML = (hk.type==1 ? "رابط مباشر" : (hk.type==2 ? "وصلة بار سريع" : (hk.type==3 ? "مواقع اخرى" : "غير معروف")));
				
				var hk_info_td = $("td");
				switch(hk.type){
					case 1: // direkt
						hk_info_td.innerHTML = '<strong>اربط:</strong> <span style="font-family: Courier New;">'+htmlspecialchars(hk.data.url.length>50 ? hk.data.url.substr(0,50)+"..." : hk.data.url)+'</span>' + (hk.data.blank ? "<br>سا يتم فتح اربط في تاب جديد في المتصفح":"");
						break;
					case 2: // direkt
						hk_info_td.innerHTML = hk.data.inner;
						break;
					case 3: // direkt
						var istr = "";
						istr += "<strong>النوع:</strong> " + (hk.data.link_type ? "Button":"Link") + "<br>";
						istr += "<strong>اسلوب:</strong> " + (hk.data.recog_method ? "Inhalt":"HTML-Attribut") + "<br>";
						istr += (hk.data.recog_method ? "" : "<strong>HTML-Attribut:</strong> "+hk.data.html_attr+"<br>");
						istr += "<strong>قيمه:</strong> "+htmlspecialchars(hk.data.value);
						hk_info_td.innerHTML = istr;
						break;
					default:
						break;
				}
				
				var hk_act_td = $("td");
				hk_act_td.align = "center";
				var hk_edit_img = $("img");
				hk_edit_img.src = "/graphic/rename.png";
				hk_edit_img.style.cursor = "pointer";
				hk_edit_img.title = "Bearbeiten";
				hk_edit_img.addEventListener("click",function(e){SettingsAPI.editHotkey(e);},false);
				hk_act_td.appendChild(hk_edit_img);
				var hk_del_img = $("img");
				hk_del_img.src = "/graphic/delete.png";
				hk_del_img.style.cursor = "pointer";
				hk_del_img.title = "L"+oe+"schen";
				hk_del_img.addEventListener("click",function(e){SettingsAPI.deleteHotkey(e);},false);
				hk_act_td.appendChild(hk_del_img);
				
				hk_row.appendChild(hk_key_td);
				hk_row.appendChild(hk_type_td);
				hk_row.appendChild(hk_info_td);
				hk_row.appendChild(hk_act_td);
				
				s_table.appendChild(hk_row);
			}
			else{
				postErrorMsg("structure check of "+saved_keys[i]+" failed!");
				continue;
			}
		}
		
		if(saved_keys.length == 0){
			var no_row = s_ex_tr.cloneNode(true);
			no_row.firstChild.align = "center";
			no_row.firstChild.style.fontStyle = "italic";
			no_row.firstChild.innerHTML = "حتى الان لا يوجد اي اختصارت";
			s_table.appendChild(no_row);
		}
		
		
		
		hk_content.appendChild(s_table);
		
		var clear_btn = $("button");
		clear_btn.addEventListener("click",function(){if(confirm("هل انته متاكد من افراغ المعلومات و حذف الاختصارات")){ storage.clear(/hotkey_\d+/); SettingsAPI.refreshContent(); }},false);
		clear_btn.innerHTML = "قم بي حذف كل الروبط الموجوده و مسح الذكره";
		hk_content.appendChild(clear_btn);
		
		var new_block = $("p");
		var new_btn = $("button");
		new_btn.addEventListener("click",function(){newHotkey.init();},false);
		new_btn.innerHTML = "اضف اختصار جديد ";
		new_block.appendChild(new_btn);
		hk_content.appendChild(new_block);
		
		
		
		
		var global_set = $("fieldset");
		var global_headline = $("legend");
		global_headline.style.fontWeight = "bold";
		global_headline.style.fontSize = "15px";
		global_headline.innerHTML = " الخيارات العامه";
		global_set.appendChild(global_headline);
		
		var global_f = $("form");
		global_f.name = "hotkeys_global_options_form";
		
		var new_define_key_alert = $("input");
		new_define_key_alert.type = "checkbox";
		new_define_key_alert.name = "new_define_key_alert";
		new_define_key_alert.checked = this.get_ini("new_define_key_alert");
		global_f.appendChild(new_define_key_alert);
		var new_define_key_alert_lbl = $("span");
		new_define_key_alert_lbl.innerHTML = " <b>اختصار جديد:</b> اضهر التعليمات عند صناعة اختصار جديد";
		global_f.appendChild(new_define_key_alert_lbl);
		
		global_f.appendChild($("br"));
		
		var open_onload = $("input");
		open_onload.type = "checkbox";
		open_onload.name = "open_onload";
		open_onload.checked = this.get_ini("open_onload");
		global_f.appendChild(open_onload);
		var open_onload_lbl = $("span");
		open_onload_lbl.innerHTML = " طبط اثناء التحميل";
		global_f.appendChild(open_onload_lbl);
		
		global_set.appendChild(global_f);
		
		global_set.appendChild($("br"));
		
		var global_save_btn = $("button");
		global_save_btn.addEventListener("click",function(){SettingsAPI.saveGlobalOptions();},false);
		global_save_btn.innerHTML = "حفظ";
		global_set.appendChild(global_save_btn);
		
		hk_content.appendChild(global_set);
	},
	
	
	
	refreshContent: function(){
		clearNode(gid("hotkeys_content"));
		this.generateContent(gid("hotkeys_content"));
	},
	
	editHotkey: function(e){
		alert("ليست مفاتيح الاختصار التحرير في هذا الإصدار بعد المتكاملة!");
	},
	
	deleteHotkey: function(e){
		if(confirm("هل انته متكد من الحذف ما لديك من اختصارات")){
			var ruler = e.target;
			while(ruler.tagName.toLowerCase() != "tr"){
				ruler = ruler.parentNode;
			}
			
			storage.deleteValue(ruler.id);
			alert("تم حفض الاختصار الجيد\n\............قم بي زيارة مدونات بلابليه لي كل جديد في حرب القبائل tw4me.com!");
			this.refreshContent();
		}
	},
	
	
	saveGlobalOptions: function(){
		var save_obj = {};
		var f = getForm("hotkeys_global_options_form");
		
		this.set_ini("new_define_key_alert",f.elements.new_define_key_alert.checked);
		this.set_ini("open_onload",f.elements.open_onload.checked);
		
		alert("تم حفض الاخيارت العامه");
	},
	
	
	toggleContent: function(e,forceState){
		var newState = (typeof forceState == "undefined" ? !this.isOpen : forceState);
		this.isOpen = !this.isOpen;
		
		gid("hotkeys_content").style.display = (newState ? "" : "none");
		e.target.src = GM_getResourceURL("toggle_"+(newState ? "minus" : "plus"));
		e.target.title = (newState ? "إخفاء إعدادات" : "عرض إعدادات");
	},
	
	
	set_ini: function(key,value){
		var saved_config = storage.getValue("config",{});
		saved_config[key] = value;
		storage.setValue("config",saved_config);
	},
	get_ini: function(key){
		var saved_config = storage.getValue("config",{});
		if(typeof saved_config[key] != "undefined"){
			return saved_config[key];
		}
		return this.default_ini[key];
	},
	default_ini: {
		new_define_key_alert: true,
		open_onload: false
	}
};


/*	newHotkey: steuert das Anlegen eines neuen Hotkeys
		popup: Referenz auf das Popup-Fenster fuer neue Hotkeys
		currentHotkey: Hotkey-Objekt mit den Daten fuer den aktuell ausgewaehlten neuen Hotkey
		---------------------------------------------------
		init: EventHandler, wenn "Neuen Hotkey erstellen" angeklickt wird. Oeffnet Popup mit Einstellungen fuer den HK
		displayNewHotkey: zeigt im entsprechenden Feld den gedrueckten Hotkey von HotkeyCreator an
		save: verwaltet das Speichern des Hotkeys
		closeHkPopup: schliesst das Popup beim Klick auf den Schliessen-Button
*/
var newHotkey = {
	popup: null,
	currentHotkey: null,
	data: {},
	
	redrawPopup: function(){
		if(!this.popup) return;
		var p_width = 700;
		var p_height = window.innerHeight/1.3;
		this.popup.style.width = p_width+"px";
		this.popup.style.height = p_height+"px";
		
		// wegen Box-Modell
		p_width += parseInt(this.popup.style.padding)*2;
		p_height += parseInt(this.popup.style.padding)*2;
		
		this.popup.style.left = (window.innerWidth-p_width)/2 + "px";
		this.popup.style.top = (window.innerHeight-p_height)/2 + "px";
	},
	
	init: function(){
		this.closeHkPopup();
		
		darkener.set(50);
		this.popup = $("div");
		this.popup.style.zIndex = darkener.depth()+1;
		this.popup.style.position = "fixed";
		this.popup.style.border = "2px solid black";
		this.popup.style.background = 'url("/graphic/index/main_bg.jpg")';
		this.popup.style.padding = "12px";
		this.popup.style.overflow = "auto";
		this.redrawPopup();
		window.addEventListener("resize",function(){newHotkey.redrawPopup();},false);
		
		var close_btn = $("a");
		close_btn.href = "javascript:void(0)";
		close_btn.addEventListener("click",this.closeHkPopup,false);
		close_btn.innerHTML = "X";
		close_btn.title = "Schlie"+sz+"en";
		close_btn.style.position = "absolute";
		close_btn.style.right = "5px";
		close_btn.style.top = "5px";
		this.popup.appendChild(close_btn);
		
		var headl = $("h3");
		headl.align = "center";
		headl.innerHTML = "اختصار جديد";
		this.popup.appendChild(headl);
		
		var new_table = $("table");
		new_table.className = "vis";
		new_table.width = "100%";
		
		
		var key_row = $("tr");
		
		var key_lbl = $("th");
		key_lbl.width = "25%";
		key_lbl.style.textAlign = "center";
		key_lbl.innerHTML = "تحديد الاختصار";
		key_row.appendChild(key_lbl);
		var key_td = $("td");
		var key_val = $("span");
		key_val.style.fontSize = "13pt";
		key_val.innerHTML = "&nbsp;";
		key_val.id = "hotkeys_new_key_value";
		key_td.appendChild(key_val);
		var key_btn = $("button");
		key_btn.id = "hotkeys_new_key_button";
		key_btn.addEventListener("click",HotkeyCreator.startCapture,false);
		key_btn.innerHTML = "&raquo; اختار المفتاح لي اختصار &laquo;";
		key_td.appendChild(key_btn);
		key_row.appendChild(key_td);
		
		new_table.appendChild(key_row);
		
		new_table.appendChild(getEmptyRow(true,true,false));
		
		
		var type_row = $("tr");
		
		var type_lbl = $("th");
		type_lbl.style.textAlign = "center";
		type_lbl.innerHTML = "نوع الاختصار";
		type_row.appendChild(type_lbl);
		
		var type_td = $("td");
		var type_selection = $("select");
		type_selection.id = "hotkeys_new_type_select";
		type_selection.style.width = "140px";
		type_selection.addEventListener("change",function(e){ TypeManager.showGroup(e.target); },false);
		var default_option = $("option");
		default_option.className = "grey";
		default_option.value = "0";
		default_option.innerHTML = "نوع الاختصار...";
		type_selection.appendChild(default_option);
		var direct_option = $("option");
		direct_option.value = "1";
		direct_option.innerHTML = "رابط مباشر";
		if(!PA) direct_option.style.display = "none";
		type_selection.appendChild(direct_option);
		var quickbar_option = $("option");
		quickbar_option.value = "2";
		quickbar_option.innerHTML = "اختصار من البار السريع";
		if(!SL) quickbar_option.style.display = "none";
		type_selection.appendChild(quickbar_option);
		var other_option = $("option");
		other_option.value = "3";
		other_option.innerHTML = "اختصارت اخرى";
		type_selection.appendChild(other_option);
		type_td.appendChild(type_selection);
		
		type_row.appendChild(type_td);
		new_table.appendChild(type_row);
		
		new_table.appendChild(getEmptyRow(true,true,false));
		
		var options_row = $("tr");
		var empty_th = $("th");
		var options_td = $("td");
		TypeManager.init(options_td);
		
		options_row.appendChild(empty_th);
		options_row.appendChild(options_td);
		new_table.appendChild(options_row);
		
		
		this.popup.appendChild(new_table);
		
		globalTable.appendChild(this.popup);
	},
	
	displayNewHotkey: function(hk){
		if(typeof hk != "object"){ postErrorMsg("invalid call of newHotkey.displayNewHotkey"); return; }
		
		this.currentHotkey = hk;
		
		var hk_string = "";
		if(hk.ctrlKey) hk_string += "Strg + ";
		if(hk.shiftKey) hk_string += "Shift + ";
		if(hk.altKey) hk_string += "Alt + ";
		
		hk_string += decodeKey(hk.keyCode,true);
		
		
		gid("hotkeys_new_key_value").firstChild.nodeValue = hk_string + " ";
		gid("hotkeys_new_key_button").firstChild.nodeValue = " تحديد اختصار من جديد";
	},
	
	save: function(){
		var save_object = {};
		
		
		var hk_key = new_DataGrabber.getKey();
		if(typeof hk_key != "object"){
			alert("يجب تحديد المفتاح");
			return;
		}
		save_object.keyCode = hk_key.keyCode;
		save_object.ctrlKey = hk_key.ctrlKey;
		save_object.shiftKey = hk_key.shiftKey;
		save_object.altKey = hk_key.altKey;
		
		save_object.data = {};
		
		
		var hk_data, hk_errormsg;
		
		var hk_type = new_DataGrabber.getType();
		switch(hk_type){
			case 0: // nichts
			case false:
				hk_errormsg = "لديك لكتابة هوتكي لتحديد!!";
				break;
			case 1: // Direktlink
				hk_data = new_DataGrabber.getDirect();
				hk_errormsg = "يوجد خطاء في اربط او اربط غير موجود :(";
				break;
			case 2: // SL-Link
				hk_data = new_DataGrabber.getQuickbar();
				hk_errormsg = "اختر احد اروبط الموجوده في البار السريع";
				break;
			case 3: // sonstiger
				hk_data = new_DataGrabber.getOther();
				hk_errormsg = "إعدادات أخرى للارتباط غير صالح!";
				break;
			default:
				postErrorMsg("DataGrabber.getType returned invalid value");
				return;
				break;
		}
		save_object.type = hk_type;
		
		if(typeof hk_data != "object"){
			alert( (typeof hk_data == "string" ? hk_data+"\n" : "") + hk_errormsg);
			return;
		}
		
		save_object.data = hk_data;
		
		
		var saved_keys = storage.listValues(/hotkey_\d+/);
		var randID;
		while(contains(saved_keys,"hotkey_"+(randID = e_rand(10000,99999))) !== false);
		
		storage.setValue("hotkey_"+randID,save_object);
		alert("تم حفض الاختصار الجيد.......\n.....قم بي زيارة مدونات بلابليه لي كل جديد في حرب القبائل tw4me.com!");
		this.closeHkPopup();
		SettingsAPI.refreshContent();
	},
	
	closeHkPopup: function(){
		if(newHotkey.popup && newHotkey.popup.parentNode)
			globalTable.removeChild(newHotkey.popup);
		darkener.set(0);
	}
};


/* HotkeyCreator: steuert das Capturing und Auswerten beim Festlegen der Tastenkombination
	darkenerDefaultDepth: legt den Standard-zIndex der Abdeckung fest
	startCapture: legt das Popup-Fenster in den Hintergrund, gibt eine Info-Meldung aus und setzt den EventListener auf endCapture
	endCapture: wertet den Tastendruck aus, holt das Popup wieder in den Vordergrund und laesst ueber newHotkey.displayNewHotkey die gedrueckte Taste(n) anzeigen
*/
var HotkeyCreator = {
	darkenerDefaultDepth: 0,
	startCapture: function(){
		this.blur();
		var thiz = HotkeyCreator;
		thiz.darkenerDefaultDepth = darkener.depth();
		darkener.depth(thiz.darkenerDefaultDepth+10);
		General.enabled = false;
		
		 if(SettingsAPI.get_ini("new_define_key_alert")){
			alert(	"Dr"+ue+"cke nach Klick auf OK die gew"+ue+"nschte Tastenkombination f"+ue+"r diesen Hotkey.\n"+
					"Die Zusatztasten Strg, Shift (Umschalt) und Alt k"+oe+"nnen f"+ue+"r Kombinationen hergenommen werden (z.B. Strg+Q oder Shift+Alt+D).\n"+
					"Es k"+oe+"nnen f"+ue+"r gleiche Tasten mit anderen Zusatztasten auch unterschiedliche Hotkeys festgelegt werden (z.B. kannst du Shift+J und Alt+J verschiedene Funktionen geben).\n"+
					"Die Verwendung von Kombinationen, die in deinem Browser schon eine Funktion haben, wird nicht empfohlen (z.B. Strg+P f"+ue+"r Drucken)."
				 );
		}
		
		window.addEventListener("keydown",thiz.endCapture,false);
	},
	endCapture: function(e){
		var thiz = HotkeyCreator;
		if(e.which == 16 || e.which == 17 || e.which == 18){
			return;
		}
		if(!e.keyCode){
			alert("لم يتم التعرف على هذا المفتاح ويمكن استخدامه!");
			return;
		}
		
		var the_hotkey = new Hotkey(e.ctrlKey,e.shiftKey,e.altKey,e.which);
		
		General.enabled = true;
		darkener.depth(thiz.darkenerDefaultDepth);
		newHotkey.displayNewHotkey(the_hotkey);
		window.removeEventListener("keydown",thiz.endCapture,false);
	}
};



/* TypeManager: Objekt zur Verwaltung der verschiedenen Hotkey-Typen beim Anlegen eines neuen Hotkeys
	init: erstellt die Nodes fuer die Verwaltung und fuellt target damit; wird von newHotkey.init aufgerufen
	showGroup: Handler, der aufgerufen wird, wenn im Dropdown-Feld ein Typ ausgewaehlt wird
	ContentFiller: Unter-Objekt zur Fuellung der einzelnen Inhalte der Typen
	quicklinkSelected: Handler, der aufgerufen wird, wenn bei "SL-Link" in der kopierten Schnellleiste ein Link angeklickt wird
	otherShowMethod: zeigt bei "sonstiger Link" das UI fuer die ausgewaehlte Methode an
*/
var TypeManager = {
	initialized: false,
	container: null,
	
	init: function(target){
		var direct_div = $("div");
		direct_div.style.display = "none";
		direct_div.id = "hotkeys_new_direct";
		var quickbar_div = direct_div.cloneNode(true);
		quickbar_div.id = "hotkeys_new_quickbar";
		var other_div = direct_div.cloneNode(true);
		other_div.id = "hotkeys_new_other";
		
		
		if(PA){
			this.ContentFiller.direct(direct_div);
		target.appendChild(direct_div);
			if(SL){
				this.ContentFiller.quick(quickbar_div);
				target.appendChild(quickbar_div);
			}
		}
		
		this.ContentFiller.other(other_div);
		target.appendChild(other_div);
		
		
		target.appendChild($("br"));
		
		var submit_btn = $("button");
		submit_btn.style.display = "none";
		submit_btn.id = "hotkeys_new_submit";
		submit_btn.addEventListener("click",function(){ newHotkey.save(); },false);
		submit_btn.innerHTML = "Speichern";
		target.appendChild(submit_btn);
	},
	
	showGroup: function(selector){
		var sIndex = 0;
		if(selector.options[selector.selectedIndex].value)
			sIndex = selector.options[selector.selectedIndex].value;
			
		if(gid("hotkeys_new_direct"))	gid("hotkeys_new_direct").style.display = (sIndex==1 ? "" : "none");
		if(gid("hotkeys_new_quickbar"))	gid("hotkeys_new_quickbar").style.display = (sIndex==2 ? "" : "none");
		if(gid("hotkeys_new_other"))	gid("hotkeys_new_other").style.display = (sIndex==3 ? "" : "none");
		if(gid("hotkeys_new_submit"))	gid("hotkeys_new_submit").style.display = (sIndex ? "" : "none");
	},
	
	
	ContentFiller: {
		direct: function(t){
			var instructions = $("p");
			instructions.innerHTML = "F&uuml;ge hier eine URL ein, den der Hotkey aufrufen soll. Du kannst auch die Schnellleisten-Funktion {game} einbauen, die wie in der SL durch &quot;/game.php?village={DORF_ID}&quot; ersetzt wird. Es sind auch &quot;javascript:&quot;-Links m&ouml;glich, wodurch du auch ganze Schnellleistenscripte als Hotkey festlegen kannst, ohne sie in der SL zu haben.";
			t.appendChild(instructions);
			
			var url_txt = $("input");
			url_txt.type = "text";
			url_txt.id = "hotkeys_new_direct_url";
			url_txt.size = "75";
			t.appendChild(url_txt);
			
			t.appendChild($("br"));
			
			var blank_checkbox = $("input");
			blank_checkbox.type = "checkbox";
			blank_checkbox.id = "hotkeys_new_direct_blank";
			t.appendChild(blank_checkbox);
			var blank_description = $("span");
			blank_description.innerHTML = " افتح في نافذه جديده";
			t.appendChild(blank_description);
			
			t.appendChild($("br"));
		},
		
		quick: function(t){
			var instructions = $("p");
			instructions.innerHTML = "قم في البدايه في تحديد.";
			t.appendChild(instructions);
			
			var sl_clone = SL.cloneNode(true);
			var quick_links = sl_clone.getElementsByTagName("a");
			for(var i=0; i<quick_links.length; i++){
				quick_links[i].href = "javascript:void(0)";
				quick_links[i].addEventListener("click",function(e){TypeManager.quicklinkSelected(e,sl_clone);},false);
			}
			t.appendChild(sl_clone);
		},
		
		other: function(t){
			var instructions = $("p");
			instructions.innerHTML = "مع هذا النوع يمكنك تحديد جميع الروابط الأخرى والأزرار في اللعبة كما هوتكي. لديك طريقتين : الآلي واليدوي";
			t.appendChild(instructions);
			
			var method_radio_auto = $("input");
			method_radio_auto.type = "radio";
			method_radio_auto.name = "hotkeys_other_method";
			method_radio_auto.addEventListener("click",function(){ this.blur(); TypeManager.otherShowMethod(1); },false);
			var method_radio_manual = method_radio_auto.cloneNode(true);
			method_radio_manual.addEventListener("click",function(){ this.blur(); TypeManager.otherShowMethod(2); },false);
			var method_lbl_auto = $("span");
			method_lbl_auto.innerHTML = "&nbsp;automatisch&nbsp;";
			var method_lbl_manual = $("span");
			method_lbl_manual.innerHTML = "&nbsp;manuell&nbsp;";
			
			t.appendChild(method_radio_auto);
			t.appendChild(method_lbl_auto);
			t.appendChild(method_radio_manual);
			t.appendChild(method_lbl_manual);
			
			t.appendChild($("hr"));
			
			
			var auto_div = $("div");
			auto_div.id = "hotkeys_new_other_auto";
			auto_div.style.display = "none";
			var manual_div = $("div");
			manual_div.id = "hotkeys_new_other_manual";
			manual_div.style.display = "none";
			
			
			
			var manual_headline = $("h4");
			manual_headline.innerHTML = "Manuell";
			manual_div.appendChild(manual_headline);
			var manual_description = $("p");
			manual_description.innerHTML = "مع هذا الأسلوب، يمكنك تحديد المعايير حتى ينصح من أجل العثور على الروابط المدرجة أدناه للمستخدمين المتقدمين!!!";
			manual_div.appendChild(manual_description);
			
			var manual_form = $("form");
			manual_form.name = "hotkeys_new_other_manual_form";
			var manual_table = $("table");
			manual_table.className = "vis";
			manual_table.style.width = "100%";
			manual_table.style.backgroundColor = "#ffffff";
			
			var manual_type_row = $("tr");
			var manual_type_lbl = $("th");
			manual_type_lbl.innerHTML = "Typ";
			manual_type_lbl.width = "20%";
			manual_type_row.appendChild(manual_type_lbl);
			var manual_type_td = $("td");
			manual_type_td.innerHTML = '<input type="radio" name="link_type" value="link"> Link<br><input type="radio" name="link_type" value="button"> Button';
			manual_type_row.appendChild(manual_type_td);
			manual_table.appendChild(manual_type_row);
			
			var manual_recog_row = $("tr");
			var manual_recog_lbl = $("th");
			manual_recog_lbl.innerHTML = "Ermittlungs-Methode";
			manual_recog_row.appendChild(manual_recog_lbl);
			var manual_recog_td = $("td");
			manual_recog_td.innerHTML = '<input type="radio" name="recog_type" value="htmlattr"> HTML-Attribut<br><input type="radio" name="recog_type" value="content"> محتويات';
			manual_recog_row.appendChild(manual_recog_td);
			manual_table.appendChild(manual_recog_row);
			
			var manual_settings_row = $("tr");
			var manual_settings_lbl = $("th");
			manual_settings_lbl.innerHTML = "Werte";
			manual_settings_row.appendChild(manual_settings_lbl);
			var manual_settings_td = $("td");
			manual_settings_td.innerHTML =
				"<table>"+
					"<tr>"+
						"<th>HTML-Attribut:</th>"+
						'<td><input type="text" name="htmlattr_value" size="45"></td>'+
					"</tr>"+
					"<tr>"+
						"<th>Wert:</th>"+
						'<td><input type="text" name="the_value" size="45"></td>'+
					"</tr>"+
					"<tr>"+
						'<td colspan="2">Das Feld <b>HTML-Attribut</b> muss nur ausgef&uuml;llt werden, wenn als Ermittlungs-Methode <i>HTML-Attribut</i> ausgew&auml;hlt ist.<br>'+
						'Bei <b>Wert</b> muss der entsprechende Wert eingetragen werden. Bei ausgew&auml;hltem <i>Inhalt</i> ist das der Inhalt des Links/Buttons, bei <i>HTML-Attribut</i> der Wert des Attributs.<br>'+
						'In beiden F&auml;llen kann ein Stern (*) als Platzhalter f&uuml;r beliebig viele Zeichen verwendet werden.</td>'+
					"</tr>"+
				"</table>"
			;
			manual_settings_row.appendChild(manual_settings_td);
			manual_table.appendChild(manual_settings_row);
			
			
			manual_form.appendChild(manual_table);
			manual_div.appendChild(manual_form);
			
			
			var auto_headline = $("h4");
			auto_headline.innerHTML = "Automatisch";
			auto_div.appendChild(auto_headline);
			var auto_description = $("p");
			auto_description.innerHTML = "Mit dieser Methode versucht das Script automatisch, den gew&uuml;nschten Link zu identifizieren. Dazu musst du einfach zu der Seite navigieren, auf der sich der Link befindet, und ihn anklicken.";
			auto_div.appendChild(auto_description);
			
			var auto_info = $("p");
			auto_info.style.fontWeight = "bold";
			auto_info.innerHTML = "Die automatische Erkennung ist in dieser Version noch nicht integriert.";
			auto_div.appendChild(auto_info);
			
			
			
			t.appendChild(auto_div);
			t.appendChild(manual_div);
		}
	},
	
	quicklinkSelected: function(e,sl_clone){
		var tCopy = e.target;
		while(tCopy.tagName.toLowerCase() != "a") tCopy = tCopy.parentNode;
		
		newHotkey.data.quickInner = tCopy.innerHTML;
		
		var quick_links = sl_clone.getElementsByTagName("a");
			for(var i=0; i<quick_links.length; i++){
				quick_links[i].style.border = "none";
			}
		
		tCopy.style.border = "1px solid black";
		tCopy.blur();
	},
	
	otherShowMethod: function(num){
		gid("hotkeys_new_other_auto").style.display 	= (num==1 ? "" : "none");
		gid("hotkeys_new_other_manual").style.display 	= (num==2 ? "" : "none");
	}
};



// new_DataGrabber: liest die Daten aus dem Formular aus und gibt sie einzeln zurueck
var new_DataGrabber = {
	getKey: function(){
		if(newHotkey.currentHotkey)
			return newHotkey.currentHotkey;
		return false;
	},
	
	getType: function(){
		var slct = gid("hotkeys_new_type_select");
		if(slct && parseInt(slct.value)){
			return parseInt(slct.value);
		}
		return false;
	},
	
	getDirect: function(){
		var durl = gid("hotkeys_new_direct_url");
		var dblank = gid("hotkeys_new_direct_blank");
		var ret = {};
		if(durl && durl.value){
			ret.url = trim(durl.value);
		}
		else return false;
		ret.blank = (dblank && dblank.checked ? true : false);
		return ret;
	},
	
	getQuickbar: function(){
		if(newHotkey.data.quickInner){
			return {inner: trim(newHotkey.data.quickInner)};
		}
		return false;
	},
	
	getOther: function(){
		var ret = {};
		var f = getForm("hotkeys_new_other_manual_form");
		
		if(!(f.elements.link_type[0].checked || f.elements.link_type[1].checked)){ return "يجب تحديد نوع!"; }
		ret.link_type = (f.elements.link_type[0].checked ? 0 : 1);
		
		var forceAttr = false;
		if(f.elements.recog_type[0].checked){
			ret.recog_method = 0;
			forceAttr = true;
		}
		else if(f.elements.recog_type[1].checked){
			ret.recog_method = 1;
		}
		else{ return "يجب تحديد طريقة التهديف!"; }
		
		var htmlattr = trim(f.elements.htmlattr_value.value);
		if(!htmlattr && forceAttr){
			return "Du musst ein HTML-Attribut angeben!";
		}
		ret.html_attr = htmlattr;
		
		var val = trim(f.elements.the_value.value);
		if(!val) return "Du musst einen Wert angeben!";
		ret.value = val;
		
		return ret;
	}
};



init();


function Hotkey(_ctrl,_shift,_alt,_code){
	this.ctrlKey = _ctrl;
	this.shiftKey = _shift;
	this.altKey = _alt;
	this.keyCode = _code;
}

function decodeKey(key,mayAsk){
	if(String.fromCharCode(key).match(/^[A-Z0-9]$/)){
		return String.fromCharCode(key);
	}
	else{
		var saved_codes = storage.getValue("config_saved_codes",{});
		var all_codes = saved_codes;
		for(var i in decode_codes){
			saved_codes[i] = decode_codes;
		}
		
		if(typeof saved_codes[key] == "string"){
			return saved_codes[key];
		}
		
		var new_code;
		if(mayAsk && (new_code = trim(window.prompt(""+ue+""+ae+""+ue+""+ue+"","")))){
			saved_codes[key] = new_code;
			
			storage.setValue("config_saved_codes",saved_codes);
			return new_code;
		}
		return "(andere Taste)";
	}
}
var decode_codes = {/*TODO*/};



// ueberprueft den Aufbau eines Hotkey-Objekts
function checkHotkeyStructure(obj){
	if(	typeof obj != "object" ||
		typeof obj.keyCode != "number" ||
		typeof obj.ctrlKey != "boolean" ||
		typeof obj.shiftKey != "boolean" ||
		typeof obj.altKey != "boolean" ||
		typeof obj.type != "number" ||
		typeof obj.data != "object")
			return false;
	
	switch(obj.type){
		case 1:
			if(typeof obj.data.url != "string" || typeof obj.data.blank != "boolean")
				return false;
			break;
		case 2:
			if(typeof obj.data.inner != "string")
				return false;
			break;
		case 3:
			if(	(obj.data.link_type !== 0 && obj.data.link_type !== 1) ||
				(obj.data.recog_method !== 0 && obj.data.recog_method !== 1) ||
				typeof obj.data.html_attr != "string" ||
				typeof obj.data.value != "string")
					return false;
			break;
		default:
			return false;
			break;
	}
	
	return true;
}


// Funktion mit mindestens einem Argument, die einen tr-Node zurueckgibt, der pro zusaetzliches Argument eine leere (oder je nach 1. Argument mit &nbsp; gefuellte) Zelle (true = th, false = td) enthaelt
function getEmptyRow(fill){
	var row = $("tr");
	for(var i=1; i<arguments.length; i++){
		if(arguments[i] === true)
			var cell = $("th");
		else
			var cell = $("td");
		if(fill)
			cell.innerHTML = "&nbsp;";
		
		row.appendChild(cell);
	}
	return row;
}


// Abdunklungs-System
function DarkenSystem(){
	var DOM_ELEMENT = $("div");
	DOM_ELEMENT.setAttribute("style","background-color: #000000; position: fixed; top: -10px; left: -10px; width: 250%; height: 250%;");
	document.body.appendChild(DOM_ELEMENT);
	DOM_ELEMENT.style.display = "none";
	DOM_ELEMENT.style.zIndex = 1000;
	
	this.set = function(alpha){
		if(alpha <= 0){
			DOM_ELEMENT.style.display = "none";
		} else{ DOM_ELEMENT.style.display = "inline";
			if(navigator.appName.indexOf("Internet Explorer") == -1){
				DOM_ELEMENT.style.opacity = alpha/100;
			} else{
				DOM_ELEMENT.style.filter = "Alpha(opacity="+alpha+")";
			}
		}
	}
	this.depth = function(setVal){
		if(typeof setVal == "undefined"){
			return parseInt(DOM_ELEMENT.style.zIndex);
		}
		else{
			DOM_ELEMENT.style.zIndex = parseInt(setVal);
		}
	}
}

// Gibt die an die URL uebergebenen GET-Variablen als Objekt zurueck.
function getVariables(){
	var get_vars = (location.search.length>1 ? location.search.substr(1).split("&") : []);
	var retval = {};
	for(var i=0; i<get_vars.length; i++){
		var d_pair = get_vars[i].split("=");
		if(d_pair.length >= 2)
			retval[d_pair[0]] = d_pair[1];
		else if(d_pair.length > 0)
			retval[d_pair[0]] = null;
	}
	return retval;
}

// Konvertiert eine uebergebene DOM-Node-List in ein Array
function nodes2array(nodelist){
	if(typeof nodelist.length == "undefined")
		return nodelist;
	var ret = [];
	for(var i=0; i<nodelist.length; i++){
		ret.push(nodelist[i]);
	}
	return ret;
}

function contains(arr,cont){
	for(var i=0; i<arr.length; i++){
		if(arr[i] == cont) {
			return i;
		}
	}
	return false;
}

function getForm(name){
	for(var i=0; i<win.document.forms.length; i++){
		if(win.document.forms[i].name == name){
			return win.document.forms[i];
		}
	}
}


function gid(id){
	return document.getElementById(id);
}
function $(type){
	return document.createElement(type);
}
function trim(str){
	if(typeof str != "string") return str;
	return str.replace(/^\s+/,"").replace(/\s+$/,"");
}
function e_rand(min,max){
	return (min + parseInt( Math.random() * ( max-min+1 ) ));
}

function htmlspecialchars(str) {
	if(typeof str == "string") {
		str = str.replace(/&/g, "&amp;");
		str = str.replace(/"/g, "&quot;");
		str = str.replace(/'/g, "&#039;");
		str = str.replace(/</g, "&lt;");
		str = str.replace(/>/g, "&gt;");
	}
	return str;
}


// Leert den Inhalt eines DOM-Nodes
function clearNode(cont){
	while(cont.childNodes.length > 0){
		cont.removeChild(cont.childNodes[0]);
	}
}


// Entwicklerhilfe
function var_dump(obj,nonrecursive,recDepth){
	if(!recDepth) recDepth = 1;
	var depthStr = ""; for(var i=1; i<recDepth; i++) depthStr += "\t";
	
	var retStr = "";
	
	
	if(!(nonrecursive&&recDepth-1) && typeof obj == "object"){
		retStr += "{\n";
		for(var i in obj){
			retStr += depthStr+"\t" + (typeof i=="string" ? '"'+i+'"' : i) +': ';
			retStr += var_dump(obj[i],nonrecursive,recDepth+1)+"\n";
		}
		retStr += depthStr + "}";
	}
	else if(typeof obj == "string"){
		retStr = '"'+obj+'"';
	}
	else{
		retStr = obj;
	}
	
	return retStr;
}


// Gibt einen Fehler in die Konsole aus.
function postErrorMsg(val){
	if(typeof GM_log == "function"){
		GM_log("exception: "+val);
	}
	else if(window.opera && window.opera.postError){
		window.opera.postError(val);
	}
	else{
		throw val;
	}
}








// Storage-Klasse
// Autor: Hypix
// Zur freien Verwendung
function Storage(prefix,forceGM)
{
  var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1
  var win = gm ? unsafeWindow : window;
  var ls = false;
  var intGetValue;
  var intSetValue;
  var prefix = prefix;
  try {ls = typeof(win.localStorage) != "undefined";} catch(e) {}
  if( !ls && !gm )
    throw("Keine geeignete Speicherm\xF6glichgkeit gefunden");
  if( forceGM && gm || !ls)
  {
    if( gm )
    {
      prefix = prefix + "_" + document.location.host.split('.')[0];
      intSetValue = function(key,value) 
      {
        GM_setValue(prefix+"_"+key,value);
      };
      intGetValue = function(key,defaultValue)
      {
        return GM_getValue(prefix+"_" + key, defaultValue);
      }
      this.deleteValue = function(key)
      {
        GM_deleteValue(prefix+"_"+key);
      }
      this.listValues = function(re)
      {
        var allkeys = GM_listValues();
        var serverKeys = [];
        var rePrefix = new RegExp("^"+prefix+"_(.*)$");
        if( typeof(re) != "undefined" )
          var reKey = new RegExp(re);
        for( var i = 0; i < allkeys.length; i++ )
        {
          var res = allkeys[i].match(rePrefix);
          if( res )
          {
            if( reKey ) 
            {
              res = res[1].match(reKey);
              if( res )
                serverKeys.push(res);
            }
            else
              serverKeys.push(res[1]);
          }
        }
        return serverKeys;
      }
    }
  }
  else if( ls )
  {
    intSetValue = function(key,value) 
    {
      localStorage.setItem(prefix+"_"+key, value );
    };    
    intGetValue = function(key,defaultValue)
    {
      var value = localStorage.getItem(prefix+"_"+key);
      if( value )
        return value;
      else
        return defaultValue;
    };
    this.deleteValue = function(key)
    {
      localStorage.removeItem(prefix+"_"+key);
    }
    this.listValues = function(re)
    {
      var keys = [];
      var rePrefix = new RegExp("^"+prefix+"_(.*)$");
      if( typeof(re) != "undefined")
        var reKey = new RegExp(re);
      for( var i = 0; i < win.localStorage.length; i++ )
      {
        var res = localStorage.key(i).match(rePrefix);
        if( res )
        {
          if( reKey ) 
          {
            res = res[1].match(reKey);
            if( res )
              keys.push(res);
          }
          else
            keys.push(res[1]);
        }
      }
      return keys;
    }
  }
  this.clear = function(re)
  {
    var keys = this.listValues(re);
    for( var i = 0; i < keys.length; i++ )
      this.deleteValue(keys[i]);
  }
  this.setValue = function(key,value)
  {
    switch( typeof(value) )
    {
      case "object":
      case "function":
        intSetValue(key,"j"+JSON.stringify(value));
        break;
      case "number":
        intSetValue(key,"n"+value);
        break;
      case "boolean":
        intSetValue(key,"b" + (value ? 1 : 0));
        break;
      case "string":
        intSetValue(key,"s" + value );
        break;
      case "undefined":
        intSetValue(key,"u");
        break;
    }
  }  
  this.getValue = function(key,defaultValue)
  {
    var str = intGetValue(key);
    if( typeof(str) != "undefined" )
    {
      switch( str[0] )
      {
        case "j":
          return JSON.parse(str.substring(1));
        case "n":
          return parseFloat(str.substring(1));
        case "b":
          return str[1] == "1";
        case "s":
          return str.substring(1);
        default:
          this.deleteValue(key);
      }
    }
    return defaultValue;
  }
  this.getString = function(key)
  {
    return intGetValue(key);
  }
  this.setString = function(key,value)
  {
    intSetValue(key,value);
  }
}






})();