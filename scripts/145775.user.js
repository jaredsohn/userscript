// ==UserScript==
// @name           szablony pw
// @namespace      http://www.fotka.pl/profil/suchar/
// @include        http://*.fotka.pl/wiadomosci/talk/*
// @version	       3.0
// ==/UserScript==
if(!unsafeWindow.$) return;
var $ = unsafeWindow.$;
if(!$) return;
var panel = newElem("div");
panel.id = "szablonPW";
panel.innerHTML = "Szablony: ";
var templates = newElem("select");
templates.id = "template";
templates.style.fontSize = "8pt";
templates.style.width = "390px";
var entries = getEntries();
for(var i=0; i<entries.length; i++){
    var o = newElem("option");
    o.innerHTML = entries[i]["nazwa"];
    o.value = entries[i]["value"];
    templates.appendChild(o);
}
var bReplace = newButton("wklej", replace, 6);
var bNew = newButton("zapisz", createNew, 6);
var bRemove = newButton("usuń", deleteSelected, 2);
panel.appendChild(templates);
panel.appendChild(bNew);
panel.appendChild(bRemove);
panel.appendChild(bReplace);
document.getElementById("pw-form-container").insertBefore(panel,document.getElementById("pw-form"));
function replace(e){
    if(document.getElementById("pw-form-textareaEmoji").innerHTML != ""){
        if(confirm("PW zawiera już treść. Czy chcesz ją zastąpić?")){
            document.getElementById("pw-form-textareaEmoji").innerHTML = html_entity_decode(templates.value);
        }else{
            document.getElementById("pw-form-textareaEmoji").innerHTML += "\n\n" + html_entity_decode(templates.value);
            e.preventDefault();
        }
    }else{
        document.getElementById("pw-form-textareaEmoji").innerHTML = html_entity_decode(templates.value);
    }
}
function createNew(){
    if(document.getElementById("pw-form-textareaEmoji").innerHTML != ""){
        var o = newElem("option");
        
        var nazwa = prompt("Podaj nazwę szablonu");
    	if(nazwa == null || nazwa == "")
        {
        	o.innerHTML = html_entity_encode(document.getElementById("pw-form-textareaEmoji").innerHTML).substring(0,70);    
        } else {
            o.innerHTML = nazwa;
        }
        o.value = html_entity_encode(document.getElementById("pw-form-textareaEmoji").innerHTML);
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
    ret.style.padding = "0px 3px";
    ret.style.marginLeft = space+"px";
    ret.style.height = "27px";
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
        arr.push({nazwa: options[i].innerHTML, value: options[i].value});
    }
    GM_setValue("szablony_pw", JSON.stringify(arr));
}
function newElem(type){
    return document.createElement(type);
}
function html_entity_decode(str) {
    return str.replace(/¶/g,"\n").replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">");  	
}
function html_entity_encode(str) {
    return str.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"¶");  
}