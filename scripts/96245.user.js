// ==UserScript==
// @name           szablony pw
// @namespace      http://www.fotka.pl/profil/Bozar/
// @include        http://www.fotka.pl/wiadomosci/talk/*
// @version	       1.0.2
// ==/UserScript==

if(!unsafeWindow.$) return;

var panel = newElem("div");
panel.style.textAlign = "center";
panel.style.clear = "both";
panel.innerHTML = "Szablony: ";

var templates = newElem("select");
templates.id = "template";
templates.style.fontSize = "8pt";
templates.style.width = "340px";

var entries = getEntries();
for(var i=0; i<entries.length; i++){
	var o = newElem("option");
	o.innerHTML = entries[i];
	templates.appendChild(o);
}

var bReplace = newButton("wklej", replace, 6);
var bSend = newButton("wklej i wyślij", replaceSend, 2);
var bNew = newButton("zapisz", createNew, 6);
var bRemove = newButton("usuń", deleteSelected, 2);
bSend.type = "submit";
panel.appendChild(templates);
panel.appendChild(bNew);
panel.appendChild(bRemove);
panel.appendChild(bReplace);
panel.appendChild(bSend);

document.getElementById("formularz_dodawania").appendChild(panel);

function replace(e){
	if(document.getElementById("tresc").value != ""){
		if(confirm("PW zawiera już treść. Czy chcesz ją zastąpić?")){
			document.getElementById("tresc").value = html_entity_decode(templates.value);
		}else{
			document.getElementById("tresc").value += "\n\n" + html_entity_decode(templates.value);
			e.preventDefault();
		}
	}else{
		document.getElementById("tresc").value = html_entity_decode(templates.value);
	}
}

function replaceSend(e){	
	if(document.getElementById("tresc").value != ""){
		if(confirm("PW zawiera już treść. Czy na pewno chcesz zamiast niej wysłać wybrany szablon?")){
			document.getElementById("tresc").value = templates.value;
		}else{
			e.preventDefault();
		}
	}else{
		document.getElementById("tresc").value = templates.value;
	}
}

function createNew(){
	if(document.getElementById("tresc").value != ""){
		var o = newElem("option");
		o.innerHTML = html_entity_encode(document.getElementById("tresc").value);
		templates.appendChild(o);
		saveEntries();
	}
}

function deleteSelected(){
	var options = templates.childNodes;
	if(templates.childNodes.length > 0){
		if(confirm("Czy na pewno chcesz skasować ten szablon?")){			
			for(var i=0; i<options.length; i++){
				if(options[i].selected){
					templates.removeChild(options[i]);
				}
			}
			saveEntries();
		}	
	}
}

function newButton(title, event, space){
	var ret = newElem("input");
	ret.value = title;
	ret.className = ret.type = "button";	
	ret.addEventListener("click", event, true);
	ret.style.fontSize = "8pt";
	ret.style.padding = "1px";
	ret.style.marginLeft = space+"px";
	return ret;
}

function getEntries(){
	try{
		return JSON.parse(GM_getValue("szablony_pw"));
	}catch(e){
		return [];
	}
}

function saveEntries(){
	var arr = [];
	var options = templates.childNodes;	
	for(var i=0; i<options.length; i++){
		arr[i] = options[i].innerHTML;
	}
	GM_setValue("szablony_pw", JSON.stringify(arr));
}

function newElem(type){
	return document.createElement(type);
}

function html_entity_decode(str) {
	return str.replace(/¶/g,"\n").replace(/&amp;/g,"&");  	
}

function html_entity_encode(str) {
  return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"¶");  
}

