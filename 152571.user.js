// ==UserScript==
// @name           Pager2
// @namespace      http://www.fotka.pl/profil/suchar/
// @include        http://www.fotka.pl/profil/*/wpisy
// @include        http://www.fotka.pl/profil/*/albumy*
// @version        2.1
// @copyright      2012+, suchar
// @grant          GM_xmlhttpRequest
// @grant          GM_getValue 
// @grant          GM_setValue
// ==/UserScript==
const u = unsafeWindow;
const $ = u.$;
if(!u.comments) return;
var currentPage = 1;
var albumId;
var albumType;
var albumNr;
var my_owner_id;
var my_owner_type;
getAlbumTmp();
var maxPage = getMaxPage();
var pageNrSelect;
u.pager = true;	// dzięki temu inne modyfikacje wiedzą w jakim trybie pracować
u.currentCommentsPage = 1;
// anulowanie automatycznego doczytywania komentarzy
u.entry.get = function(){};
u.comments.get = function(){};
$("#comments-more").hide();
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
function createPanel(gdzie){
    var panel = newElem("div");
    var bPrev = newButton("Poprzednia", pagePrev);
    var bNext = newButton("Następna", pageNext);
    pageNrSelect = newElem("select");
    pageNrSelect.id = "pageNrSelect" + gdzie;
    pageNrSelect.addEventListener("change", pageSelect, true);
    pageNrSelect.style.textShadow = "0 1px 0 #379";
    pageNrSelect.style.fontStyle = "italic";
    pageNrSelect.style.color = "white";
    pageNrSelect.style.background = "#50a3ca";
    pageNrSelect.style.borderRadius = "4px";
    pageNrSelect.style.marginLeft = "4px";
    for(var i=1; i<=maxPage; i++){
        var o = newElem("option");
        o.innerHTML = i;
        pageNrSelect.appendChild(o);
    }
    
    var bReload = newButton(" R ", pageReload);
    var logo = newElem("img");
    logo.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAZCAYAAACSP2gVAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEAAACxABrSO9dQAAAAd0SU1FB9wLDw86NxDTa/gAAAAadEVYdFNvZnR3YXJlAFBhaW50Lk5FVCB2My41LjExR/NCNwAAAu1JREFUWEftl1GZKjEMhdcDDjCAARSggG8NrIN95mUtoIGHKwAPOLgfGrAw95zeJj1t07IC+vDTmdNMJqRpCh/bti0mhOKiEIqLQiguCqG4KITiohCKi0J18/nn7wNsAdRPatuSbfSZfWRnYP4EruCZ7Y07+AE7sR3FRR6/sKN+NjvlcrmcwA28wJZ5gPR93RAOduJwxLfZK9C/GjtyHNgewOwLGynBGN/F9fNLO5JsFUlKxEkDP4qje9b4Uq6y6S+zl+do87L5PJKvwJbJUZsb8MrENee/gVaFxnUzvaWxS/FnXeOHVJ5BAo7gzkTk+x24AkvQXV/AwMxRVSmik6oycK8BDH1kW91O3WoamNPtNfVpjOxwXVWW6YQJ0fus7UcJ4mqao2q/ik48QbjmipvO3qHB+Cpm27PMPXVuBmw1rnDbksaurUrTux3QgqSwqixBN5/gw+JIk6ClW70A90xK9Yzc+zYJbLvtNwK2GleLLySu1c76F2PXfhc2agMJ4RZjg7YEHdMEHtyLE0j/H8A1X6Av9m2Ba60I7w249m1kWtZHCxA17FRhGKu4AtIWwfjOjjFNT+EgOWmbpkk8rF92RNpC2V4bM/EjHddaKQfRTSNWbVV/EK55XuOa9Z9Z/B73CCTjAJ5tckj6gAP+7oicE+7ttidpQ5yhlaINultNaNrs0/swalzD7dHY8ScHE689aZhcJOMM7DcQR4+ZpA840FWfliLm35WzoqeJJqA7rqHpVkuVh1HjqgJXIjuOooWHApJRHemgq7T0IY7ItBwxr8F0K0NN5rVntYllwqyZ6pwfBKKRYVxqN9KBtwEkgkd5128i6EQzXZ08LZjn3wOzZQ/qgoam/qKjXntXRKoujOonIsWKcRg/72XOtygSwmqx5ISYLZ3o34TUHCMwx32tfSTMOvRpaUNjtbB61BeTxspkLFZV0d8Xxf5iqF3145P3MuffLUpIgy+sO1vEhOKiEIqLQiguCqG4MLaPf0e+JRs2gooAAAAAAElFTkSuQmCC";
    logo.alt = "PAGER";
    logo.style.top = "6px";
    logo.style.position = "relative";
    logo.addEventListener("dblclick", config, true);
    logo.title = "Ustawienia";
    panel.appendChild(logo);
    panel.appendChild(bPrev);
    panel.appendChild(bNext);
    panel.appendChild(pageNrSelect);
    panel.appendChild(bReload);
    panel.style.textAlign = "center";
    panel.style.margin = "4px";
    panel.style.margin = "5px 5px 10px 5px";

    var cont1 = newElem("div");
    cont1.className = "Box BoxShadow";
    cont1.appendChild(panel);
    
    var cont2 = newElem("div");
    cont2.className = "comments-item-box";
    cont2.appendChild(cont1);
    return cont2;
    
    
} //koniec createPanel
function pagePrev(){
    if(currentPage >= 2){
        currentPage = parseInt(currentPage) - 1;
        loadPage(currentPage);
    }
}
function pageNext(){
    if(currentPage < maxPage){
        currentPage = parseInt(currentPage) + 1;
        loadPage(currentPage);
    }
}
function pageSelect(){
    currentPage = this.value
        loadPage(currentPage);
}
function pageReload(){
    loadPage(currentPage);
}
function loadPage(n){
    $("#pageNrSelect1").attr("value", currentPage);
    $("#pageNrSelect2").attr("value", currentPage);
    $("#comments-list > .comments-item").css("opacity", "0.5");
    var loading = $(newElem("div"));
    loading.html("Ładowanie...");
    loading.css({position: "absolute", zIndex: "100", fontSize: "14pt", width: "50%", textAlign: "center", fontWeigth: "bold", color: "black"});
    $("#comments-list div:eq(0)").before(loading);
    if (u.firstPhoto){
        GM_xmlhttpRequest({
            method: "GET",
            url: "http://www.fotka.pl/profil/"+u.profile_login+"/entries.html?page="+n,
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
            onload: function(e){
                u.currentCommentsPage = currentPage; // dla innych modyfikacji			
                $("#comments-list").html(e.responseText);
                $(document).trigger("commentsChanged");		// nadajemy zmiany stron
                if (u.usuwanie_moderator) u.modules_comments_del_fp_init(u.modules_albums_owner_id); // nie ma co usuwać warunku - i tak wam nie zadziała :)
                loading.remove();
            }
        });
    }
    if (!u.firstPhoto){
        var owner_id = u.modules_comments_owner_id;
        if (u.myProfile){owner_id = my_owner_id;}
        var owner_type = u.modules_comments_owner_type;
        if (u.myProfile){owner_type = my_owner_type;}
        var postdata = 'val={"owner_id":' + owner_id +
            ',"owner_type":' + owner_type + 
            ',"photo_owner_id":' + albumId + 
            ',"photo_owner_type":' + albumType + 
            ',"photo_album_nr":' + albumNr +
            ',"page":' + n +
            ',"limit":10}' +
            '&x=' + new Date().getTime();
        GM_xmlhttpRequest({
            method: "POST",
            url: "http://www.fotka.pl/ajax_action/modules_comments_actions_get",
            headers: {"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8","Accept": "text/xml"},
            data: postdata,
            onload: function(e){
                u.currentCommentsPage = currentPage; // dla innych modyfikacji
                Wczytaj(eval("("+e.responseText+")"));
                $(document).trigger("commentsChanged");		// nadajemy zmiany stron
                if (u.usuwanie_moderator) u.modules_comments_del_fp_init(u.modules_albums_owner_id); // nie ma co usuwać warunku - i tak wam nie zadziała :)
                loading.remove();
            }
        });
    }
}
function Wczytaj(response) {
    lock = false;
    var comments = response.data['comment'];
    var comment_template = $('#comments-template').html();
    var comment_temp_oryg = $('#comments-template');
    //console.log(comment_temp_oryg);
    var comment;
    $("#comments-list").html("");
    for(var i in comments) {
        comment = comment_template;
        if(comments[i].users.login == undefined) {
            comment = comment.replace(/{avatar}/, '<span><img src="http://s.asteroid.pl/img/users/usuniete_32.png" alt="?" /></span>');
            comment = comment.replace(/{info}/, 'konto usunięte');
        } else {
            comment = comment.replace(/{avatar}/, '<a href="/profil/' + comments[i].users.login + '/"><img src="' + comments[i].users.av_url_32 + '" alt="' + comments[i].users.login + '"/></a>');
            comment = comment.replace(/{info}/, escape(Login_str_no_float1(comments[i].users.login, comments[i].users.gwiazda, comments[i].users.ft,comments[i].users.fp)));
        }
        comment = comment.replace(/{content}/, comments[i].comment);
        comment = comment.replace(/{datetime}/, comments[i].datetime);
        comment = comment.replace(/{numer}/g, comments[i].numer);
        comment = comment.replace(/{profileOwnerComment}/, (u.profile_id == comments[i].users.id ? ' profileOwnerComment' : ''));
        $('#comments-list').append(comment);
    }
    if (!u.myProfile) {
        $('#comments-list').find('.ico-delete').remove();
    }
    $('#comments-list').append(comment_temp_oryg);
    return ;
}
function Login_str_no_float1(login, gwiazda, ft, fp, login_olny){
    var link_gwiazda = "/klubgwiazd";
    if (typeof(zalogowany_login) != 'undefined' && zalogowany_login==login) {
        link_gwiazda = "/konto_gwiazda.php";
    }
    var html = '<a href="/profil/'+ login +'/"><span>'+login+'</span></a>';
    if(gwiazda > 0 && (gwiazda < 100 || gwiazda > 100)){
        html = '<a href="/profil/'+ login +'/"><span class="kg'+gwiazda+'" style="font-weight:bold;">'+login+'</span></a>';
    }
    if(login_olny == undefined) {
        if (((gwiazda > 10 && gwiazda < 31) || (gwiazda > 36 && gwiazda < 78) || (gwiazda > 82)) && gwiazda!=100) {
            html += '<a href="'+link_gwiazda+'"><img src="http://s.asteroid.pl/img/blank.gif" alt="" class="png g16 g16_' + gwiazda +'" /></a>';
        }
        if(ft){
            html += '<a href="http://team.fotka.pl"><img src="http://s.asteroid.pl/img/blank.gif" class="icos16 ico16_14" style="float:none;border:0;width:18px;height:12px;vertical-align:middle;position:relative;top:-2px;margin-left:6px;" /></a>';
        } else if(fp){
            html += '<a href="http://przyjaciele.fotka.pl"><img src="http://s.asteroid.pl/img/blank.gif" class="icos16 ico16_33" style="float:none;border:0;width:18px;height:12px;vertical-align:middle;" /></a>';
        }
    }
    return html;
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
function getAlbumTmp(){
    var scripts = document.getElementsByTagName("script");
    for(var i=0; i<scripts.length; i++){
        if(scripts[i].innerHTML.length == 0) continue;
        
        var test = scripts[i].innerHTML.substring(0, 1000).match(/comments\.setAlbum\((\d+),(\d+),(\d+)\)/);
        if(test != null) { 
            albumId = parseInt(test[1]);
            albumType = parseInt(test[2]);
            albumNr = parseInt(test[3]);
        }
        var test1 = scripts[i].innerHTML.substring(0, 1000).match(/var comments = new Comments\((\d+), (\d+)\)/);
        if(test1 != null) {             
            my_owner_id = parseInt(test1[1]);
            my_owner_type = parseInt(test1[2]);
        }
    }
}
function getMaxPage(){
    var scripts = document.getElementsByTagName("script");
    for(var i=0; i<scripts.length; i++){
        if(scripts[i].innerHTML.length == 0) continue;
        
        if (u.firstPhoto){
            var test = scripts[i].innerHTML.substring(0, 1000).match(/entry\.setCounters\((\d+)\)/);
            if(test != null) return Math.min(100, Math.ceil(parseInt(test[1]) / 10));
        }
        if (!u.firstPhoto){
            var test = scripts[i].innerHTML.substring(0, 1000).match(/comments\.setCounters\((\d+)\)/);
            if(test != null) return Math.min(100, Math.ceil(parseInt(test[1]) / 10));
        }
    }
    return 1;
}
function config(){
    var res = prompt("W którym miejscu chcesz widzieć przyciski pagera?\n1 - nad komentarzami\n2 - pod komentarzami\n3 - tu i tu");
    if(res == null) return;
    if(res == 1 || res == 2 || res == 3){
        GM_setValue("pozycja", res);
        alert("Ustawienia zapisane. Będą widoczne po odświeżeniu strony");
    }else{
        alert("No człowieku... 1, 2 albo 3!");
    }
}
