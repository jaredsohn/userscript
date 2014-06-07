// ==UserScript==
// @name           FP God Mode B
// @namespace      http://www.fotka.pl/profil/suchar/
// @description    dodaje panel pozwalający na błyskawiczne i wygodne kasowanie wielu zdjęć na przestrzeni wszystkich albumów
// @include        http://www.fotka.pl/out/users_info.php*
// @version        1.1
// @copyright      2013+, suchar
// @author         suchar
// @run-at         document-end
// @grant          unsafeWindow
// @grant          GM_xmlhttpRequest
// ==/UserScript==
var u = unsafeWindow;
var $ = u.$;

var FAKE = 4;
var PRAWD_FAKE = 16;
var PORNO = 9;
var KRADZIEZ = 10;
var OBRAZLIWE = 15;
var GRAFIKA = 14;
var REKLAMA = 17;

main();
function main(){
    var albums = document.getElementsByClassName("album");
    for(var i=0; i<albums.length; i++){
        for(var j=0; j<albums[i].childNodes.length; j+=3){
            var photoDiv = albums[i].childNodes[j];              
            var photo = photoDiv.firstChild;
            photoDiv.removeChild(photo);
            var link = document.createElement("A");			
            link.href = photo.src.replace("72_p", "800_s").replace("amin", "a");
            link.target = "_blank";
            link.appendChild(photo);
            photoDiv.appendChild(link);
            photoDiv.appendChild(newCheckbox()); 
        }
    }	
    
    var p = document.createElement("input");
    p.type = "button";
    p.style.fontSize = "10pt";
    p.value = "usuń zaznaczone zdjęcia";
    p.addEventListener("click", doPost, true);
    
    var p2 = document.createElement("input");
    p2.type = "button";
    p2.style.fontSize = "10pt";
    p2.value = "zaznacz wszystkie";
    p2.addEventListener("click", selectAll, true);
    
    var container = document.createElement("div");
    container.id = "fpgodmodepanel";
    container.appendChild(p);
    container.appendChild(p2);
    container.appendChild(newCombobox());
    unsafeWindow.$("h2:last").after(container);
    
    var scroll = document.createElement("a");
    scroll.href = "#fpgodmodepanel";
    scroll.style.fontSize = "75%";
    scroll.style.cssFloat = "right";
    scroll.innerHTML = "dół strony";
    unsafeWindow.$("h2:first").append(scroll);	
}
function doPost(){
    var uid = document.location.href.match(/user_id=(\d+)/)[1];  // powinno zawsze banglać	
    if (!uid) {
        alert("Skrypt 'FP GOD MODE' nie wie na jakim profilu się znajduje, więc nie może kontynuować");
        return;
    }
    
    var combo = document.getElementById("powod");
    if (combo.selectedIndex == 0){
        alert("Wybierz zbiorczy powód kasacji zaznaczonych zdjęć!");
        return;
    }
    var reason = combo.options[combo.selectedIndex].value;
    
    var checkboxy = document.getElementsByTagName("input");
    var pidList = "";
    for(var i=0; i<checkboxy.length; i++){
        var c = checkboxy[i];
        if (c.type == "checkbox" && c.className == "fpgodmode" && c.checked == true){
            if(pidList == ""){
                pidList = '"' + extractPID(c.previousSibling.firstChild.src) + '"';
            }else{
                pidList += "," + '"' + extractPID(c.previousSibling.firstChild.src) + '"';
            }
        }
    }
    if (pidList == "") return;
    
    var powod_szczegoly = '';
    if (reason == 4 || reason == 10 || reason == 5) {
        if (reason == 4) {
            powod_szczegoly = u.getDetailedReason("Podaj kogo udaje użytkownik (będzie on widoczny dla użytkownika):");
        } else if (reason == 10) {
            powod_szczegoly = u.getDetailedReason("Podaj od kogo zostały ukradzione zdjęcia (będzie on widoczny dla użytkownika):");
        } else {
            powod_szczegoly = u.getDetailedReason();
        }
        if (!powod_szczegoly) {
            alert('Nieprawidłowa odpowiedź');
            return;
        }
    }
   
    var postdata = 'val={"owner_id":'+uid+',"owner_type":1,"powod":"'+reason+'","powod_szczegoly":"'+powod_szczegoly+'","ids":['+pidList+'],"timeline_type":"ja"}';	
    console.log(postdata);
    //alert("will post " + postdata);
    //return;
    GM_xmlhttpRequest({
        method: "POST",
        url: "http://www.fotka.pl/ajax_action/moderate_photos",
        data: postdata,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        onload: function(e){
            console.log(e);
            try{
                var respObj = JSON.parse(e.responseText);
                if(respObj){
                    console.log(respObj);
                    if(respObj.status == "OK"){
                        alert("Otrzymano " + respObj.data.punkty + " punktów");
                    }else{
                        throw JSON.parse(e.responseText);
                    }
                }				
            }catch(exc){
                alert("Wystąpił błąd podczas usuwania. Odpowiedź serwera:\n" + exc.data.info);
            }
            
            window.location = window.location.href;
        }
    });
    
}
function extractPID(url){
    return url.substring(url.lastIndexOf("/")+1, url.lastIndexOf("_72_p"));
}
function selectAll(){
    var c = document.getElementsByTagName("input");	
    for(i=0; i<c.length; i++){
        if(c[i].type == "checkbox" && c[i].className == "fpgodmode"){
            var par = c[i].parentNode.parentNode;
            if(par != null && par.style.display != "none") c[i].checked = true;
        }
    }
}
function newCheckbox(){
    var c = document.createElement("input");
    c.type = "checkbox";
    c.style.cssFloat = "left";
    c.className = "fpgodmode";
    return c;
}
function newCombobox(){
    var select = document.createElement("select");
    select.id = "powod";
    select.style.fontSize = "10pt";
    
    var oDefault = document.createElement("option");
    oDefault.innerHTML = "[wybierz powód]";
    
    var o1 = document.createElement("option");
    o1.value = FAKE;
    o1.innerHTML = "fejk";
    
    var o2 = document.createElement("option");
    o2.value = PRAWD_FAKE;
    o2.innerHTML = "prawdopodobnie fake";
    
    var o3 = document.createElement("option");
    o3.value = PORNO;
    o3.innerHTML = "porno*";
    
    var o4 = document.createElement("option");
    o4.value = KRADZIEZ;
    o4.innerHTML = "kradzież*";
    
    var o5 = document.createElement("option");
    o5.value = OBRAZLIWE;
    o5.innerHTML = "obraźliwe";
    
    var o6 = document.createElement("option");
    o6.value = GRAFIKA;
    o6.innerHTML = "grafika";
    
    var o7 = document.createElement("option");
    o7.value = REKLAMA;
    o7.innerHTML = "reklama";
    
    select.appendChild(oDefault);
    select.appendChild(o1);
    select.appendChild(o2);
    select.appendChild(o3);
    select.appendChild(o4);
    select.appendChild(o5);
    select.appendChild(o6);
    select.appendChild(o7);
    
    return select;
}