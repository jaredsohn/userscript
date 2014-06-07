// ==UserScript==
// @name           DS Hotkeys
// @namespace      Die StÃ¤mme
// @author         Bone008, edited by knish3r
// @version        1.0.1c
// @description    ErmÃ¶glicht das Einrichten von Hotkeys. Funktioniert mit Opera ab 10.50, Firefox 3.6, Safari 4+ und googleChrome4+
// @include        http://*.net/game.php*
// @include        http://*.net
// ==/UserScript==

(function() {
var storage = new Storage("DSHotkeys",true);
var url = location.href;
getGameData();
game_data.link_base = game_data.link_base.replace(/&amp;/g,"&");
var SL = gid("quickbar_inner");
var PA = document.body.innerHTML.match(/icon header arr_down/);
var gm = typeof(unsafeWindow) != "undefined" && navigator.userAgent.indexOf("Firefox")>-1
var win = gm ? unsafeWindow : window;
win.hotkeys_enabled = true;


var abdeckung_depth = 100;

var abdeckung = _new("div");
abdeckung.id = "abdeckung";
abdeckung.setAttribute("style","z-index: "+abdeckung_depth+"; left: 0px; top: 0px;");
abdeckung.style.position = "fixed";
abdeckung.style.width = (window.innerWidth*100)+"px";
abdeckung.style.height = (window.innerHeight*100)+"px";
abdeckung.style.background = "black";
var appended = false;


// globale Variablen definieren
var SAVEDKEYS = [];
var ctrlPressed = false;
var shiftPressed = false;
var altPressed = false;
watchKeyboard();




if(game_data.screen == "settings" && game_data.mode == "settings"){
	var displayLink = initSettings();
	if(url.match("openSettings")) showSettings(displayLink);
}

function initSettings(){
	var settingsForm = document.getElementsByClassName("vis settings")[0].parentNode;
	var mainTable = settingsForm.parentNode;
	
	var seperateLine = _new("hr");
	mainTable.insertBefore(seperateLine,settingsForm);
	
	var header = _new("h3");
	header.setAttribute("style","display: inline");
	header.innerHTML = "DS Hotkeys&nbsp;&nbsp;";
	mainTable.insertBefore(header,settingsForm);
	
	var displayLink = _new("a");
	displayLink.href = "javascript:void(0)";
	displayLink.innerHTML = "Einstellungen einblenden";
	displayLink.addEventListener("click",function(){showSettings(this);},true);
	mainTable.insertBefore(displayLink,settingsForm);
	
	
	var container = _new("div");
	container.id = "hotkeys_container";
	
	
	mainTable.insertBefore(container,settingsForm);
	mainTable.insertBefore(seperateLine.cloneNode(true),settingsForm);
	
	return displayLink;
}

function showSettings(_link){
	if(_link) _link.style.display = "none";
	var container = gid("hotkeys_container");
	
	container.appendChild(_new("br"));
	
	var tr = [], th = [], td = [];
	
	var key_table = _new("table");
	key_table.className = "vis settings";
	
	
	tr[0] = _new("tr");
	th[0] = _new("th");
	th[0].innerHTML = "Taste(n)";
	th[0].width = "200px";
	th[1] = _new("th");
	th[1].innerHTML = "Typ";
	th[1].width = "200px";
	th[2] = _new("th");
	th[2].innerHTML = "Link/Adresse";
	th[2].width = "600px";
	th[3] = _new("th");
	th[3].innerHTML = "Optionen";
	tr[0].appendChild(th[0]);
	tr[0].appendChild(th[1]);
	tr[0].appendChild(th[2]);
	tr[0].appendChild(th[3]);
	key_table.appendChild(tr[0]);
	
	var all_keys = listValues("hotkey_","object");
	for(var i in all_keys){
		var keyData = all_keys[i].split("||");
		if(keyData.length != 3){
			//log("Invalid value saved at position "+i+"; Value: "+all_keys[i]);
			continue;
		}
		
		tr[i+1] = _new("tr");
		tr[i+1].id = "row_hotkey_"+i.split("_")[2];
		
		var tdX1 = _new("td"); tdX1.innerHTML = "";
		var zusatz = keyData[0].split("//")[1].split(",");
		for(var j=0; j<zusatz.length && zusatz[j]; j++){ tdX1.innerHTML += zusatz[j]+" + "; }
		tdX1.innerHTML += "<b>"+decodeKey(keyData[0].split("//")[0])+"</b>";
		tr[i+1].appendChild(tdX1);
		
		var tdX2 = _new("td");
		
		var link_type = keyData[1];
		if(link_type == "direct")	link_type = "Direktlink";
		if(link_type == "advanced")	link_type = "Erweiterter Link";
		if(link_type == "quickbar")	link_type = "Schnellleisten-Link";
		
		tdX2.innerHTML = link_type;
		tr[i+1].appendChild(tdX2);
		
		var tdX3 = _new("td");
		var thelink = keyData[2].split("==//==");
		tdX3.innerHTML = (thelink[0]=="{overview}" ? "Dorf&uuml;bersicht" : thelink[0]) + (thelink[1] == "true" ? " <i>(neuer Tab)</i>" : "");
		tr[i+1].appendChild(tdX3);
		
		
		var tdX4 = _new("td");
		var del_a = _new("a");
		del_a.href = "javascript:void(0)";
		del_a.innerHTML = "L&ouml;schen";
		del_a.addEventListener("click",deleteHotkey,true);
		tdX4.appendChild(del_a);
		tr[i+1].appendChild(tdX4);
		
		key_table.appendChild(tr[i+1]);
	}
	
	container.appendChild(key_table);
	
	var addLink = _new("a");
	addLink.href = "javascript:void(0)";
	addLink.innerHTML = "Hotkey hinzuf&uuml;gen";
	addLink.addEventListener("click",function(){showAddingArea(this);},true);
	container.appendChild(addLink);
}

function showAddingArea(_link){
	if(_link) _link.style.display = "none";
	
	var container = gid("hotkeys_container");
	
	container.appendChild(_new("br"));
	
	var addingForm = _new("form");
	addingForm.action = "javascript:void(0)";
	addingForm.name = "adding_form";
	
	var header = _new("h4");
	header.innerHTML = "Neuer Hotkey";
	addingForm.appendChild(header);
	
	var settings_table = _new("table");
	settings_table.className = "vis";
	
	var basic_key = _new("tr");
	var label1 = _new("th");
	label1.setAttribute("style","text-align:right");
	label1.innerHTML = "Taste:";
	var value1 = _new("td");
	value1.id = "defineKey_container";
	var value1_1 = _new("td");
	var val1_1_link = _new("a");
	val1_1_link.href = "javascript:void(0)";
	val1_1_link.setAttribute("style","font-size: small");
	val1_1_link.innerHTML = "Gemerkte Tasten lÃ¶schen";
	val1_1_link.addEventListener("click",deleteSavedKeys,true);
	value1_1.appendChild(val1_1_link);
	
	var define_link = _new("a");
	define_link.href = "javascript:void(0)";
	define_link.innerHTML = "Festlegen";
	define_link.addEventListener("click",defineKey,true);
	value1.appendChild(define_link);
	
	basic_key.appendChild(label1);
	basic_key.appendChild(value1);
	basic_key.appendChild(value1_1);
	settings_table.appendChild(basic_key);
	
	
	var extra_keys = _new("tr");
	var label2 = _new("th");
	label2.setAttribute("style","text-align:right");
	label2.setAttribute("valign","top");
	label2.innerHTML = "Zusatztasten:";
	var value2 = _new("td");
	value2.id = "extraKeys_container";
	
	var checkbox = _new("input");
	checkbox.type = "checkbox";
	checkbox.name = "extraKey";
	
	value2.appendChild(checkbox.cloneNode(true));
	value2.innerHTML += " Strg<br>";
	value2.appendChild(checkbox.cloneNode(true));
	value2.innerHTML += " Shift<br>";
	value2.appendChild(checkbox.cloneNode(true));
	value2.innerHTML += " Alt<br>";
	
	extra_keys.appendChild(label2);
	extra_keys.appendChild(value2);
	settings_table.appendChild(extra_keys);
	
	
	
	var emptyRow = _new("tr");
	var emptyTh = _new("th");
	var emptyTd = _new("td");
	emptyRow.appendChild(emptyTh);
	emptyRow.appendChild(emptyTd);
	settings_table.appendChild(emptyRow);
	
	
	
	var target = _new("tr");
	var label3 = _new("th");
	label3.setAttribute("style","text-align:right");
	label3.setAttribute("valign","top");
	label3.innerHTML = "Ziel:";
	var value3 = _new("td");
	value3.id = "target_container";
	value3.innerHTML = "<b>Link-Typ:</b> ";
	
	var radio_1 = _new("input");
	radio_1.type = "radio";
	radio_1.name = "link_type";
	radio_1.id = "type_radio_1";
	radio_1.setAttribute("onchange",'document.getElementById("type_container_1").style.display = "none";document.getElementById("type_container_2").style.display = "none";document.getElementById("type_container_3").style.display = "none";document.getElementById("type_container_"+this.id.split("_")[2]).style.display = "inline";this.blur();');
	var radio_2 = radio_1.cloneNode(true);
	radio_2.id = "type_radio_2";
	var radio_3 = radio_1.cloneNode(true);
	radio_3.id = "type_radio_3";
	
	if(PA){
		value3.appendChild(radio_1);
		value3.innerHTML += "Direktlink ";
	}
		value3.appendChild(radio_2);
	value3.innerHTML += "Erweiterter Link ";
	if(SL){
		value3.appendChild(radio_3);
		value3.innerHTML += "Schnellleisten-Link ";
	}
	
	value3.appendChild(_new("hr"));
	
	
//	ZunÃ¤chst unsichtbar
	var direct_container = _new("div");
	direct_container.id = "type_container_1";
	direct_container.style.display = "none";
	
	var label4 = _new("strong");
	label4.innerHTML = "Link-Adresse: ";
	direct_container.appendChild(label4);
	
	var directTarget = _new("input");
	directTarget.type = "text";
	directTarget.name = "directTarget";
	directTarget.id = "directTarget";
	directTarget.size = "50";
	direct_container.appendChild(directTarget);
	
	direct_container.appendChild(_new("br"));
	
	var check_blank = _new("input");
	check_blank.type = "checkbox";
	check_blank.id = "checkbox_blank";
	direct_container.appendChild(check_blank);
	
	var label5 = _new("span");
	label5.innerHTML = " In neuem Tab &ouml;ffnen";
	direct_container.appendChild(label5);
	
	
	value3.appendChild(direct_container);
	
	
	
	var advanced_container = _new("div");
	advanced_container.id = "type_container_2";
	advanced_container.style.display = "none";
	
	var defineAdvanced = _new("a");
	defineAdvanced.href = "javascript:void(0)";
	defineAdvanced.innerHTML = "Jetzt festlegen";
	defineAdvanced.addEventListener("click",defineAdvancedLink,true);
	advanced_container.appendChild(defineAdvanced);
	
	
	value3.appendChild(advanced_container);
	
	
	
	var SL_container = _new("div");
	SL_container.id = "type_container_3";
	SL_container.style.display = "none";
	
	
	var defineQuickbar = _new("a");
	defineQuickbar.href = "javascript:void(0)";
	defineQuickbar.innerHTML = "Jetzt festlegen";
	defineQuickbar.addEventListener("click",defineQuickbarLink,true);
	SL_container.appendChild(defineQuickbar);
	
	
	value3.appendChild(SL_container);
	
//	===================
	
	
	
	target.appendChild(label3);
	target.appendChild(value3);
	settings_table.appendChild(target);
	
	var submitRow = _new("tr");
	var submitTd = _new("td");
	var submitButton = _new("input");
	submitButton.type = "button";
	submitButton.value = "Speichern";
	submitButton.addEventListener("click",saveNewHotkey,true);
	submitTd.appendChild(submitButton);
	
	submitRow.appendChild(emptyTh.cloneNode(true));
	submitRow.appendChild(submitTd);
	
	settings_table.appendChild(submitRow);
	
	
	
	
	
	addingForm.appendChild(settings_table);
	container.appendChild(addingForm);
}


function defineKey(e){
	e.target.style.display = "none";
	gid("defineKey_container").innerHTML += "<span style=\"text-decoration: blink; font-weight: bold\">Bitte jetzt die gew&uuml;nschte Taste dr&uuml;cken...</span>";
	abdunkeln(0.5);
	window.defineKey_enabled = true;
	win.hotkeys_enabled = false;
	document.addEventListener("keydown",function(event){
		if(!window.defineKey_enabled) return;
		var key = event.which;
		if(key==16||key==17||key==18){ // wenn eine der zusatztasten => abbrechen
			alert("Die Zusatztasten Strg, Shift (Umschalt) und Alt kÃ¶nnen nicht verwendet werden!");
			return;
		}
		abdunkeln(0);
		window.basicKey = key;
		
		gid("defineKey_container").innerHTML = decodeKey(key,true);
		
		win.hotkeys_enabled = true;
		window.defineKey_enabled = false;
	},false);
}

function defineAdvancedLink(event){
	var defineLink = event.target;
	defineLink.style.display = "none";
	defineLink.parentNode.innerHTML += "<span style=\"text-decoration: blink; font-weight: bold\">Bitte jetzt Link ausw&auml;hlen...</span>";
	abdunkeln(0.5);
	var menus = document.getElementsByClassName("navi-border");
	window.all_m_links = [];
	for(var i=0; i<menus.length; i++){
		if(SL && SL.innerHTML == menus[i].innerHTML){
			continue;
		}
		menus[i].setAttribute("style",menus[i].getAttribute("style")+"; position: relative; z-index: "+(abdeckung_depth+(20-i)));
		var menu_links = menus[i].getElementsByTagName("a");
		for(var j=0; j<menu_links.length; j++){
			menu_links[j].setAttribute("onclick","return false");
			window.all_m_links.push(menu_links[j]);
		}
		
		window.defineAdvanced_enabled = true;
		menus[i].addEventListener("click",function(e){
			if(!window.defineAdvanced_enabled) return;
			var klicked = e.target;
			if(klicked.tagName == "IMG" || klicked.parentNode.tagName == "A") klicked = klicked.parentNode;
			if(klicked.tagName == "A"){
				var klickedName = klicked.innerHTML.replace(/\W/g,"");
				var isoverview = false;
				if(klicked.href.match(/village=\d+&screen=overview$/)){
					klickedName = "{overview}";
					isoverview = true;
				}
				window.advancedLink = klickedName;
				
				abdunkeln(0);
				gid("type_container_2").innerHTML = (isoverview ? "Dorf&uuml;bersicht" : "<span>"+klicked.innerHTML+"</span>");
				
				for(var j=0; j<window.all_m_links.length; j++){
					window.all_m_links[j].removeAttribute("onclick");
				}
				
				window.defineAdvanced_enabled = false;
			}
		},false);
	}
}


function defineQuickbarLink(event){
	var defineLink = event.target;
	defineLink.style.display = "none";
	defineLink.parentNode.innerHTML += "<span style=\"text-decoration: blink; font-weight: bold\">Bitte jetzt Link ausw&auml;hlen...</span>";
	abdunkeln(0.5);
	SL.setAttribute("style","position: relative; z-index: "+(abdeckung_depth+5));
	
//	SL-Funktionen deaktivieren
	var SL_links = SL.getElementsByTagName("a");
	for(var i=0; i<SL_links.length; i++){
		SL_links[i].setAttribute("onclick","return false");
	}
	
	window.defineQuickbar_enabled = true;
	SL.addEventListener("click",function(e){
		if(!window.defineQuickbar_enabled) return;
		var klicked = e.target;
		if(klicked.tagName == "A"){
			var klickedName = klicked.textContent.replace(/^\s+(.+)\s+$/,"$1");
			window.quickbarLink = klickedName;
			
			abdunkeln(0);
			gid("type_container_3").innerHTML = "<span>"+klickedName+"</span>";
			
			for(var i=0; i<SL_links.length; i++){
				SL_links[i].removeAttribute("onclick");
			}
			
			window.defineQuickbar_enabled = false;
		}
	},false); // unbedingt false wegen zurÃ¼cksetzen des onclick-handlers bei den Links!
}

function saveNewHotkey(e){
//	Formulardaten auslesen und prÃ¼fen
	var basicKey = window.basicKey;
	if(!basicKey){
		alert("Noch keine Taste ausgewÃ¤hlt!");
		return;
	}
	
	var extra_keys = [];
	var extra_keys_checks = gid("extraKeys_container").getElementsByTagName("input");
	for(var i=0; i<extra_keys_checks.length; i++){
		if(extra_keys_checks[i].checked){
			extra_keys.push(extra_keys_checks[i].nextSibling.nodeValue.replace(/\s/g,""));
		}
	}
	
	var link_types = document.getElementsByName("link_type");
	var link_type = null;
	for(var i=0; i<link_types.length; i++){
		if(link_types[i].checked){
			link_type = parseInt(link_types[i].id.split("_")[2]);
		}
	}
	
	
	var real_link_type = null, link_value = null;
	
	if(link_type == 1){
		if(gid("directTarget").value == ""){
			alert("Kein Link angegeben!");
			return;
		}
		real_link_type = "direct";
		link_value = gid("directTarget").value+"==//=="+gid("checkbox_blank").checked;
	}
	else if(link_type == 2){
		if(!window.advancedLink){
			alert("Noch kein Erweiterter Link ausgewÃ¤hlt!");
			return;
		}
		real_link_type = "advanced";
		link_value = window.advancedLink;
	}
	else if(link_type == 3){
		if(!window.quickbarLink){
			alert("Noch kein Schnelleistenlink ausgewÃ¤hlt!");
			return;
		}
		real_link_type = "quickbar";
		link_value = window.quickbarLink;
	}
	else{
		alert("Kein Link-Typ ausgewÃ¤hlt!");
		return;
	}
	
	
//	Speicheraufbau:				{Grundtaste}//{Zusatztaste},{Zusatztaste}...||{Link-Typ}||{Wert_je_nach_Typ}
	if(!real_link_type || !link_value){
		alert('Es trat leider ein interner Fehler im Script "DS Hotkeys" auf. Bitte informiere den Ersteller! (Fehlernummer: 587238)');
		return;
	}
	
	var newCount = 1;
	for(var count=1; true; count++){
		if(!storage.getString("hotkey_"+count)){
			newCount = count;
			break;
		}
	}
	
	setValue("hotkey_"+count,   basicKey + "//" + extra_keys.join(",") + "||" + real_link_type + "||" + link_value);
	alert("Der Hotkey wurde gespeichert!");
	location.href = location.href+"&openSettings";
}

function deleteHotkey(e){
	if(!confirm("Wirklich lÃ¶schen?")) return;
	var obj = e.target;
	while(obj.tagName != "TR"){
		obj = obj.parentNode;
	}
	var hk_id = obj.id.split("_")[2];
	deleteValue("hotkey_"+hk_id);
	alert("Der Hotkey wurde gelÃ¶scht!");
	location.href = location.href+"&openSettings";
}

function deleteSavedKeys(){
	if(!confirm("Willst du wirklich alle gemerkten Tasten lÃ¶schen?")){
		return;
	}
	
	var all_keys = storage.listValues();
	for(var i=0; i<all_keys.length; i++){
        if( all_keys[i].match(/keyCode/) )
            deleteValue(all_keys[i]);
	}
	alert("Die gemerkten Tasten wurden gelÃ¶scht!");
}


function isValidChar(theChar){
	if(String.fromCharCode(theChar).match(/^[A-Z0-9]$/))
		return true;
	return false;
}

function decodeKey(key,mayAsk){
	var result;
	if(isValidChar(key)){
		return String.fromCharCode(key);
	}
	else{
		var saved_keys = storage.listValues();
        for (var i=0 ; i < saved_keys.length ; i++ ) {
                if( saved_keys[i] == "keyCode_"+key )
                return storage.getString("keyCode_"+key);
        }

		
		
		
		if(mayAsk && (result = prompt("Welche Taste wurde gedrÃ¼ckt?\nDie gewÃ¤hlte Taste ist zwar gÃ¼ltig, kann aber nicht als Buchstabe oder Zahl dargestellt werden.\nHilf bei der Verbesserung des Scriptes und gib an, welche Taste du gedrÃ¼ckt hast (die Taste wird gespeichert und in Zukunft erkannt):",""))){
			setValue("keyCode_"+key,result);
			return result;
		}
		else{
			return "andere Taste";
		}
	}
}






function watchKeyboard(){
//	globales Array fÃ¼llen
	SAVEDKEYS = listValues("hotkey_","array");
	
//	Zusatztasten Ã¼berwachen
	window.addEventListener("keydown",function(e){
		var keypressed = e.which;
		switch(keypressed){
		case 16: // Shift
			shiftPressed = true;
			break;
		case 17: // Strg
			ctrlPressed = true;
			break;
		case 18: // Alt
			altPressed = true;
			break;
        default: break;
		}
	},false);
	window.addEventListener("keyup",function(e){
		var keypressed = e.which;
		switch(keypressed){
		case 16: // Shift
			shiftPressed = false;
			break;
		case 17: // Strg
			ctrlPressed = false;
			break;
		case 18: // Alt
			altPressed = false;
			break;
		default: break;
		}
	},false);
	
	
	
	window.addEventListener("keydown",function(e){
		if(!win.hotkeys_enabled) return;
		var thekey = e.which;
		for(var i=0; i<SAVEDKEYS.length; i++){
			if(thekey == SAVEDKEYS[i].split("//")[0]){
				var keyData = SAVEDKEYS[i].split("||");
				var needed_extraKeys = keyData[0].split("//")[1].split(","); // Shift
				var broken = false;

				for(var j=0; j<needed_extraKeys.length; j++){
                				
                    if(ctrlPressed){
                        if( needed_extraKeys[j] == "Strg" ) {
                        if( needed_extraKeys[j] === false ){
                            continue;
                        }}
                    }
                    if(shiftPressed){
                        if( needed_extraKeys[j] == "Shift" ) {
                        if( needed_extraKeys[j] === false ){
                            continue;
                        }}
                    }
                    if(altPressed){
                        if( needed_extraKeys[j] == "Alt" ) {
                        if( needed_extraKeys[j] === false ){
                            continue;
                        }}
                    }
				
					if(		(needed_extraKeys[j] == "Strg" && !ctrlPressed) ||
							(needed_extraKeys[j] == "Shift" && !shiftPressed) ||
							(needed_extraKeys[j] == "Alt" && !altPressed)){
						broken = true;
					}
				}
				if(broken) continue;
				
				if(keyData[1] == "direct"){
					if(keyData[2].split("==//==")[1] == "true"){
						window.open(keyData[2].split("==//==")[0]);
					}
					else{
						location.href = keyData[2].split("==//==")[0];
					}
				}
				else if(keyData[1] == "advanced"){
					var menu_links = [];
					var menus = document.getElementsByClassName("navi-border");
					for(var j=0; j<menus.length; j++){
						if(SL && SL.innerHTML == menus[j].innerHTML){
							continue;
						}
						var curr_links = menus[j].getElementsByTagName("a");
						for(var k=0; k<curr_links.length; k++){
							menu_links.push(curr_links[k]);
						}
					}
					
					for(var l=0; l<menu_links.length; l++){
						if(menu_links[l].innerHTML.replace(/\W/g,"") == keyData[2]  || (keyData[2]=="{overview}" && menu_links[l].href.match(/village=\d+&screen=overview$/))){
							menu_links[l].focus();
							if(menu_links[l].target == "_blank"){
								window.open(menu_links[l].href);
							}
							else{
								location.href = menu_links[l].href;
							}
						}
					}
				}
				else if(keyData[1] == "quickbar"){
					var SL_links = SL.getElementsByTagName("a");
					for(var k=0; k<SL_links.length; k++){
						if(SL_links[k].textContent == keyData[2]){
							SL_links[k].focus();
							if(SL_links[k].target == "_blank"){
								window.open(SL_links[k].href);
							}
							else{
								location.href = SL_links[k].href;
							}
						}
					}
				}
				else{
					//log("Fehler beim Aufrufen des Hotkeys "+i+": ungÃ¼ltiger Typ");
				}
			}
		}
	},true);
}

function watchTextfields(){
	var allFields = [];
	var inputs = document.getElementsByTagName("input");
	for(var i=0; i<inputs.length; i++){
		if(inputs[i].type == "text"){
			allFields.push(inputs[i]);
		}
	}
	
	var textareas = document.getElementsByTagName("textarea");
	for(var i=0; i<textareas.length; i++){
		allFields.push(textareas[i]);
	}
	
	
	for(var i=0; i<allFields.length; i++){
		allFields[i].setAttribute("onfocus","window.hotkeys_enabled = false");
		allFields[i].setAttribute("onblur","window.hotkeys_enabled = true");
	}
}
watchTextfields();
// Erst am Ende aufrufen wegen im Script generierten!








function abdunkeln(wert){
	if(appended) document.body.removeChild(abdeckung);
	appended = false;
	if(wert){
		abdeckung.style.opacity = wert.toString();
		document.body.appendChild(abdeckung);
		appended = true;
	}
}
function _new(type){
	return document.createElement(type);
}
function setValue(name,value){
	storage.setString(name,value);
}
function getValue(name,standard){
	return storage.getValue(name,standard);
}
function deleteValue(name){
	storage.deleteValue(name);
}
function existValues(){
	for(var i=0; i<existValues.arguments.length; i++){
		if(getValue(existValues.arguments[i]) == undefined) return false;
	}
	return true;
}
function listValues(regex,return_type,type2){
	if(!return_type){ alert('Es trat leider ein interner Fehler im Script "DS Hotkeys" auf. Bitte informiere den Ersteller! (Fehlernummer: 1963463)'); return "ERROR"; }
	var myVals1 = [], myVals11 = [], myVals2 = {};
    var storageVals = storage.listValues();
    var stor = new Array(storageVals.length);
    for(var x=0 ; x < storageVals.length ; x++) {
        stor[x] = "DSHotkeys_" + game_data.world + "_" + storageVals[x];}
                    
	for(var i in stor){
		if(stor[i].toString().indexOf(game_data.world+"_") != -1){
			if(regex && !stor[i].match(regex.replace(/\*/g,""))){ continue; }
			myVals1.push(storage.getString(storageVals[i]));
			myVals11.push(stor[i].replace(game_data.world+"_",""));
			myVals2[stor[i].replace(game_data.world+"_","")] = storage.getString(storageVals[i]); 

		}
	}
	return (return_type == "array" ? (type2 == "names" ? myVals11 : myVals1) : myVals2);
}
function gid(id){
	return document.getElementById(id);
}

function log(name) {
    gm ? GM_log(name) : window.opera.postError(name);
}

/* Einbinden der game_data */
function getGameData() {
if(typeof(unsafeWindow) != 'undefined'  && navigator.userAgent.indexOf("Firefox")>-1) {
	game_data = unsafeWindow.game_data;
} else {
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.textContent = 	"var input=document.createElement('input');" + 
						"input.type='hidden';" + 
						"input.value=JSON.stringify(game_data);"  + 
						"input.id='game_data';" + 
						"document.body.appendChild(input);";
	document.body.appendChild(script);
	document.body.removeChild(script);

	eval("game_data=" + document.getElementById("game_data").value + ";");
	return game_data;
}}

/*Quellcode der Storage-Funktion von Hypix; vielen Dank an dieser Stelle*/
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
    throw("Keine geeignete SpeichermÃ¶glichgkeit gefunden");
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
