// ==UserScript==
// @name           powody blokad
// @namespace      http://www.fotka.pl/profil/Bozar
// @include        http://www.fotka.pl/out/users_info.php*
// @version        1.0.1
// ==/UserScript==


var uid = document.location.href.match(/user_id=(\d+)/)[1];

var divOver = newElem("div");
divOver.style.width = "100%";
divOver.style.height = "100%";
divOver.style.backgroundColor = "rgba(0,0,0,0.7)";
divOver.style.zIndex = "10";
divOver.style.position = "absolute";
hidePopup();


var container = newElem("div");
var text = newElem("div");
text.innerHTML = "Wybierz powód blokady konta";
text.style.fontWeight = "bold";
text.style.marginBottom = "4px";
container.appendChild(text);
var textbox = newElem("input");
textbox.style.fontSize = "8pt";
textbox.style.width = "200px";
textbox.addEventListener("keypress", isEnter, false);
container.appendChild(textbox);
var templates = newElem("select");
templates.appendChild(newElem("option"));
templates.style.fontSize = "8pt";
templates.style.width = "110px";
templates.style.marginLeft = "4px";
templates.addEventListener("change", replace, true);
var entries = getEntries();
for(var i=0; i<entries.length; i++){
	var o = newElem("option");
	o.innerHTML = entries[i];
	if(o.innerHTML.length > 0) templates.appendChild(o);
}
var bNew = newButton("zapisz", createNew);
var bDel = newButton("usuń", deleteSelected);
var bOK = newBigButton("zablokuj", blokada_konta);
var bClose = newBigButton("anuluj", hidePopup);
container.appendChild(templates);
container.appendChild(bNew);
container.appendChild(bDel);
container.appendChild(newElem("br"));
container.appendChild(bOK);
container.appendChild(bClose);
var outerContainer = newElem("div");
outerContainer.appendChild(container);
outerContainer.style.padding = "20px";
outerContainer.style.width = "400px";
outerContainer.style.backgroundColor = "white";
outerContainer.style.margin = "100 auto";
divOver.appendChild(outerContainer);
document.body.insertBefore(divOver, document.body.firstChild);




// pokazywanie opcji
unsafeWindow.blokuj_konto = function(user_id){	
	showPopup();
	textbox.focus();	
}

function blokada_konta(){
	var powód = textbox.value;
	var user_id = uid;
	if(!powód || powód=='' || powód==null){
		alert("Podaj powód blokady!");
		return false;	
	}		
	unsafeWindow.ajax_it('/ajax/info_operacje.php','info_operacje',[user_id,0,'blokada_konta',0,powód]);
	hidePopup();
	GM_setValue("powody_blokad-licznik", GM_getValue("powody_blokad-licznik",0) + 1);
	return true; 	
}

function showPopup(){
	divOver.style.display = "block";
}

function hidePopup(){
	divOver.style.display = "none";
}

function newButton(title, event){
	var ret = newElem("input");
	ret.value = title;
	ret.className = ret.type = "button";	
	ret.addEventListener("click", event, true);
	ret.style.fontSize = "8pt";
	ret.style.padding = "1px";
	ret.style.marginLeft = "4px";
	return ret;
}

function newBigButton(title, event){
	var ret = newButton(title, event)
	ret.style.fontSize = "10pt";
	ret.style.padding = "4px";
	ret.style.marginRight = "4px";
	ret.style.marginTop = "4px";
	ret.style.marginLeft = "0";
	return ret;
}

function getEntries(){
	try{
		return JSON.parse(GM_getValue("powody_blokad"));
	}catch(e){
		return [];
	}
}

function saveEntries(){
	var arr = [];
	var options = templates.childNodes;	
	for(var i=0; i<options.length; i++){
		if(options[i].innerHTML.length > 0) arr[i] = options[i].innerHTML;
	}
	GM_setValue("powody_blokad", JSON.stringify(arr));
}

function createNew(){
	if(textbox.value != ""){
		var o = newElem("option");
		o.innerHTML = html_entity_encode(textbox.value);
		templates.appendChild(o);
		saveEntries();
	}
}

function deleteSelected(){
	var options = templates.childNodes;
	if(templates.childNodes.length > 1 && templates.value.length > 0){
		if(confirm("Czy na pewno chcesz skasować ten powód?")){			
			for(var i=0; i<options.length; i++){
				if(options[i].selected){
					templates.removeChild(options[i]);
				}
			}
			saveEntries();
		}	
	}
}

function replace(e){
	textbox.value = html_entity_decode(templates.value);	
}

function html_entity_decode(str) {
	return str.replace(/¶/g,"\n").replace(/&amp;/g,"&");  	
}

function html_entity_encode(str) {
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"¶");  
}

function isEnter(e){
	if (e.keyCode == 13){
		blokada_konta();
	}
}

function newElem(type){
	return document.createElement(type);
}