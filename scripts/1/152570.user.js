// ==UserScript==
// @name           masowa niszczarka komentarzy
// @namespace      http://www.fotka.pl/profil/suchar/
// @include        http://www.fotka.pl/profil/*/wpisy
// @include        http://www.fotka.pl/profil/*/albumy*
// @version        2.2
// @copyright      2012+, suchar
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue 
// @grant          GM_setValue
// ==/UserScript==
const P_BLUZGI = 3;
const P_WWW = 4;
const P_PORNO = 5;
const P_SPAM = 6;
const P_OBRAZA = 7;
const $ = unsafeWindow.$;
var bBeginSelect;
if (!unsafeWindow.myProfile){
    if(unsafeWindow.comments){
        switch(GM_getValue("pozycja", "1")){
            case "1":
                $("#comments-list").before(createPanel("1"));
                break;
            case "2":
                $("#comments-list").after(createPanel("2"));
                break;
            case "3":
                $("#comments-list").before(createPanel("1"));
                $("#comments-list").after(createPanel("2"));
        }
        $("#comments-more").click(function(){
            setTimeout(function(){$(document).trigger("commentsChanged");},2000);
        });
        $(document).bind("commentsChanged", addCheckboxes);    // nasłuchujemy przyszłych zmian stron
        addCheckboxes();
    }
}
function selectAll(){
    $(".chk").attr("checked", "true");
}
function annihilate(e){
    var c = document.getElementsByClassName("chk");
    for(i=0; i<c.length; i++){
        if (c[i].checked == true){
            var combo = e.target.previousSibling;
            if (combo.selectedIndex == 0){
                alert("Wybierz powód usunięcia komentarzy");
                return;
            }
            var commentID = c[i].id.split("_")[1];
            var powod = combo.options[combo.selectedIndex].value;
            if (unsafeWindow.firstPhoto){skasujProfiloweKomenty(commentID, powod);}
            if (!unsafeWindow.firstPhoto){skasujInneKomenty(commentID, powod);}
        }
    }
}
function skasujProfiloweKomenty(comentID, powod){
    var postdata = 'val=["' + comentID +
        '","' + powod +
        '",'+ unsafeWindow.id +']' +
        '&x=' + new Date().getTime();
    GM_xmlhttpRequest({
        id: comentID,
        method: "POST",
        url: "http://www.fotka.pl/ajax/komentarz_usun_fp.php",
        data: postdata,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        onload: function(response){
            //idealnie komentarze powinny znikać tylko po otrzymaniu potwierdzenia ale nie zawsze je otrzymujemy
            //if(response.responseText == '"OK"'){
            //$("#comment_" + comentID).css("display", "none");//animate({height: 0}, 200);
            $('#comment_' + comentID).slideUp('slow');
            //}
        }
    });
}
function skasujInneKomenty(comentID, powod){
    var postdata = 'val={"owner_id":"' + unsafeWindow.modules_comments_owner_id +
        '","owner_type":"' + unsafeWindow.modules_comments_owner_type + 
        '","user_id":' + unsafeWindow.id +
        ',"numer":"' + comentID +
        '","powod":"' + powod + '"}' +
        '&x=' + new Date().getTime();
    GM_xmlhttpRequest({
        id: comentID,
        method: "POST",
        url: "http://www.fotka.pl/ajax_action/moderate_comments",
        data: postdata,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        onload: function(e){
            //idealnie komentarze powinny znikać tylko po otrzymaniu potwierdzenia ale nie zawsze je otrzymujemy
            //if(e.responseText == '"OK"'){
            //$("#comment_" + commentID).css("display", "none");//animate({height: 0}, 200);
            $('#comment_' + comentID).slideUp('slow');
            //}
        }
    });    
}
function createPanel(gdzie){
    var info = newElem("span");
    info.innerHTML = "Masowa niszczarka komentarzy";
    info.style.margin = "0 2px";
    
    var bConfig = newElem("img");
    bConfig.src = "data:image/gif;base64,R0lGODlhDgAOANU8ANDQ0K2trbe3t8jIyHt7e5KSks3NzczMzMLCwq6urmhoaLu7u5eXl5WVld7e3ouLi7+/v29vb2tra6+vr5qamsHBwd3d3Y6OjomJicrKys/Pz7y8vOPj44GBgWNjY3R0dNzc3NTU1KmpqaWlpW5ubtXV1aioqH19fZ2dnXh4eHl5eaGhoYeHh7q6uuLi4pGRkcDAwIqKinV1ddLS0oiIiH9/f7S0tGdnZ8PDw7Ozs8fHx2JiYgAAAAAAAAAAAAAAACH5BAEAADwALAAAAAAOAA4AAAZoQJ5wKFyNUMQkL8BxFJTDhmv2gA4LDphKmGAoWaABJRaweIk1HMAA0JQGHSIBAdDZD4gTMQUxVCANHgoKRDIbBy0LLztKEQsZNgIXjEkfAjoJOQ+USQQhJhMYnEkRIgE0o0oSJDdWQkEAOw%3D%3D";
    bConfig.addEventListener("click", config, true);
    bConfig.style.cursor = "pointer";
    bConfig.style.verticalAlign = "middle";
    bConfig.style.margin = "0 2px";
    bConfig.title = "Ustawienia";
    
    var bSelectAll = newButton("Zaznacz wszystkie", selectAll);
    
    bBeginSelect = newButton("Zaznacz login", beginSelect);
    
    var reason = newElem("select");
    reason.id = "reason" + gdzie;
    reason.addEventListener("change", function(){$("#reason1").attr("value", this.value);$("#reason2").attr("value", this.value);}, true);
    reason.style.textShadow = "0 1px 0 #379";
    reason.style.fontStyle = "italic";
    reason.style.color = "white";
    reason.style.background = "#50a3ca";
    reason.style.borderRadius = "4px";
    reason.style.marginLeft = "4px";
    var oDefault = document.createElement("option");
    oDefault.innerHTML = "[wybierz powód]";
    reason.appendChild(oDefault);
    var o1 = document.createElement("option");
    o1.value = P_BLUZGI;
    o1.innerHTML = "wulgaryzmy";
    reason.appendChild(o1);
    var o2 = document.createElement("option");
    o2.value = P_WWW;
    o2.innerHTML = "adres www";
    reason.appendChild(o2);
    var o3 = document.createElement("option");
    o3.value = P_SPAM;
    o3.innerHTML = "spam";
    reason.appendChild(o3);
    var o4 = document.createElement("option");
    o4.value = P_PORNO;
    o4.innerHTML = "pornografia";
    reason.appendChild(o4);    
    var o5 = document.createElement("option");
    o5.value = P_OBRAZA;
    o5.innerHTML = "obraźliwe";
    reason.appendChild(o5);
    
    var bAnnihilate = newButton("Usuń zaznaczone", annihilate);
    bAnnihilate.style.color = "#DD0000";
    
    var container = newElem("div");
    container.appendChild(info);
    container.appendChild(bConfig);
    container.appendChild(document.createElement("br"));
    container.appendChild(bSelectAll);
    container.appendChild(bBeginSelect);
    container.appendChild(reason);
    container.appendChild(bAnnihilate);
    container.style.fontSize = "8pt";
    container.style.textAlign = "center";
    container.style.margin = "5px 5px 10px 5px";
    
    var cont1 = newElem("div");
    cont1.className = "Box BoxShadow";
    cont1.appendChild(container);
    
    var cont2 = newElem("div");
    cont2.className = "comments-item-box";
    cont2.appendChild(cont1);
    return cont2;

} //koniec createPanel
function beginSelect(e){
    bBeginSelect.value = "Kliknij avatar";
    $("#comments-list .comments-item-av").css("background-color", "DeepSkyBlue");
    $("#comments-list .comments-item-av img").css("opacity", "0.4");
    pulse(true);
    $("#comments-list .comments-item-av").click(function(e){
        e.preventDefault();
        var target  = $(this.lastChild.previousSibling).find("img").attr("alt");
        $("#comments-list .comments-item-av").unbind("click");
        pulse(false);
        bBeginSelect.value = "Zaznacz login";
        selectLogin(target);
    });
}
function pulse(enabled){
    if(enabled){
        $("#comments-list .comments-item-av").css("background-color", "DeepSkyBlue");
        $("#comments-list .comments-item-av img").css("opacity", "1.0");
        $("#comments-list .comments-item-av img").animate({opacity: 0.5}, 333).animate({opacity: 1.0}, 333, 'linear', function(){pulse(true);});
    }else{
        $("#comments-list .comments-item-av img").stop(true, false).animate({opacity: 1.0} , 333);
    }
}
function selectLogin(login){
    if(login != null && login != ""){
        var c = document.getElementsByClassName("chk");
        for(i=0; i<c.length; i++){
            var commentID = c[i].id.split("_")[1];
            var test = document.getElementById("comment_"+commentID).firstChild.nextSibling.lastChild.previousSibling.firstChild.nextSibling.getAttribute("alt");
            if(test && test.toLowerCase() == login.toLowerCase()){
                document.getElementById("checkbox_" + commentID).checked = true;
            }
        }
    }
}
function addCheckboxes(){
    $("#comments-list .comments-item").each(function(){
        if($(this).attr("id") == "comment_{numer}") return;
        if($(this).attr("niszczarka") == null){
            var cid = $(this).attr("id").split("_")[1];
            $(this).append(createCheckbox(cid)).attr("niszczarka", "tak");
        }
    });
}
function config(){
    var res = prompt("W którym miejscu chcesz widzieć przyciski niszczarki?\n1 - nad komentarzami\n2 - pod komentarzami\n3 - tu i tu");
    if(res == null) return;
    if(res == 1 || res == 2 || res == 3){
        GM_setValue("pozycja", res);
        alert("Ustawienia zapisane. Będą widoczne po odświeżeniu strony");
    }else{
        alert("No człowieku... 1, 2 albo 3!");
    }
}
function createCheckbox(id){
    var c = document.createElement("input");
    c.type = "checkbox";
    c.id = "checkbox_"+id;
    c.className = "chk";
    c.style.left = "-4px";
    c.style.top = "40px";
    c.style.zIndex = 101;
    c.style.cssFloat = "left";
    c.style.position = "absolute";
    return c;
}
function newElem(type){
    return document.createElement(type);
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