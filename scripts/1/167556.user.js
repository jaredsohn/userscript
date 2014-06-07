// ==UserScript==
// @name           Powody usuwania z SG
// @namespace      http://www.fotka.pl/profil/suchar
// @description    umożliwia zdefiniowania własnej listy powodów usuwania zdjęć ze strony głównej
// @include        http://www.fotka.pl/
// @include        http://www.fotka.pl/najnowsze/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version        1.0
// @copyright      2013+, suchar
// @author         suchar
// @run-at         document-end
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_log
// @grant          unsafeWindow
// ==/UserScript==

var u = unsafeWindow;
var $ = u.$;
var id;
var photoBox;

function removeClick() {
    $('#index-container').undelegate('.index-item-moderate', 'click');
    $('#index-container').delegate('.index-item-moderate', 'click', function() {
        id = $(this).attr('id').replace('photo_', '');
        photoBox = $(this).parent().parent();
        showPopup();
        textbox.focus();
    });
}
var initTimeout = setTimeout(function() { removeClick(); }, 1000);

var container = newElem("div");
container.id = 'pwObscure';
container.setAttribute('class', 'fotkaLightBoxObscure');
hidePopup();
var pwContainer = newElem("div");
pwContainer.id = 'pwContainer';
pwContainer.className = 'fotkaLightBoxContainer pwclass';
container.appendChild(pwContainer);
var fotkaLightBox = newElem("div");
fotkaLightBox.className = 'fotkaLightBox';
fotkaLightBox.style.width = '470px';
pwContainer.appendChild(fotkaLightBox);
var fotkaLightBorder = newElem("div");
fotkaLightBorder.className = 'fotkaLightBorder';
fotkaLightBox.appendChild(fotkaLightBorder);
var fotkaLightContent = newElem("div");
fotkaLightContent.id = 'pwBox';
fotkaLightContent.className = 'fotkaLightContent';
fotkaLightContent.style.padding = '20px 20px 20px 20px';
fotkaLightBorder.appendChild(fotkaLightContent);
var text = newElem("div");
text.innerHTML = "Wybierz powód ukrycia na stronie głównej (niewidoczne dla usera):";
text.style.fontWeight = "bold";
text.style.marginBottom = "4px";
fotkaLightContent.appendChild(text);
var textbox = newElem("input");
textbox.style.fontSize = "8pt";
textbox.style.width = "200px";
textbox.addEventListener("keypress", isEnter, false);
textbox.addEventListener("keydown", isEnter, false);
fotkaLightContent.appendChild(textbox);
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
var bOK = newBigButton("skasuj", kasowanie_zdjecia);
var bClose = newBigButton("anuluj", hidePopup);
fotkaLightContent.appendChild(templates);
fotkaLightContent.appendChild(bNew);
fotkaLightContent.appendChild(bDel);
fotkaLightContent.appendChild(newElem("br"));
fotkaLightContent.appendChild(bOK);
fotkaLightContent.appendChild(bClose);
unsafeWindow.document.body.appendChild(container);  

function kasowanie_zdjecia(){
    var powod = textbox.value;
    var user_id = id;
    if(!powod || powod=='' || powod==null){
        alert("Wybierz powód ukrycia na stronie głównej!");
        return false;    
    }
    
    $.post('/popular/moderate', {
        id: id,
        powod_szczegoly: powod
    }, function(response) {
        photoBox.remove();
    });
    
    hidePopup();
    return true;     
}

function showPopup(){
    container.style.display = "block";
}

function hidePopup(){
    container.style.display = "none";
}

function newButton(title, event){
    var ret = newElem("input");
    ret.value = title;
    ret.className = ret.type = "button";    
    ret.addEventListener("click", event, true);
    ret.style.fontSize = "8pt";
    ret.style.padding = "0px 3px";
    ret.style.marginLeft = "6px";
    return ret;
}

function newBigButton(title, event){
    var ret = newButton(title, event)
    ret.style.fontSize = "10pt";
    ret.style.padding = "0px 3px";
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
        kasowanie_zdjecia();
    }
    if (e.keyCode == 27){
        hidePopup();
    }
}

function newElem(type){
    return document.createElement(type);
}