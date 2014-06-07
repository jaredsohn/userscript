// ==UserScript==
// @name           Moderacja profilu kafelkowego
// @description    Dodaje możliwość moderacji strony głównej profilu kafelkowego
// @namespace      http://www.fotka.pl/profil/suchar/
// @include        http://www.fotka.pl/profil/*
// @exclude        http://www.fotka.pl/profil/*/albumy/*/*
// @exclude        http://www.fotka.pl/profil/*/grupy*
// @exclude        http://www.fotka.pl/profil/*/prezenty*
// @exclude        http://www.fotka.pl/profil/*/znajomi*
// @exclude        http://www.fotka.pl/profil/*/opisy*
// @exclude        http://www.fotka.pl/profil/*/wpisy*
// @exclude        http://www.fotka.pl/profil/*/ulubione*
// @version        1.1
// @copyright      2014+, suchar
// @author         suchar
// @run-at         document-end
// @grant          unsafeWindow
// ==/UserScript==
var u = unsafeWindow;
var $ = u.$;
function newElem(type){
    return document.createElement(type);
}
function DodajZnaczki(){
    var znikanie_google_ico = $('.google_ico');
    znikanie_google_ico.remove();
    var znikanie_kasuj = $('.kasuj_zdjecie');
    znikanie_kasuj.remove();
    var znikanie_kasuje = $('.kasuj_zdjecia');
    znikanie_kasuje.remove();
    var znikanie_przenies = $('.przenies_zdjecie');
    znikanie_przenies.remove();
    var albums = $('.index-container-item');
    for(var i=0; i<albums.length; i++){
        var id_zdjecia = albums[i].id.split('-')[3];
        if (id_zdjecia > 10){
            var blok = albums[i].firstElementChild;
            
            var link = blok.firstElementChild.firstElementChild.src;
            var google_ico = newElem('a');
            google_ico.href = "https://www.google.pl/searchbyimage?site=imghp&image_url="+link;
            google_ico.className = "google_ico";
            google_ico.style.width = "16px";
            google_ico.style.height = "16px";
            google_ico.style.top = "12px";
            google_ico.style.right = "12px";
            google_ico.style.backgroundImage = "url(/img/google.gif)";
            google_ico.style.position = "absolute";
            google_ico.target = "_blank";
            blok.insertBefore(google_ico, blok.firstElementChild.nextSibling);
            
            var kasuj_zdjecie = newElem('div');
            kasuj_zdjecie.id = 'kasuj_zdjecie_' + id_zdjecia;
            kasuj_zdjecie.className = 'kasuj_zdjecie ico_mod_delete';
            kasuj_zdjecie.style.cursor = 'pointer';
            kasuj_zdjecie.style.left = '10px';
            kasuj_zdjecie.style.top = '10px';
            blok.appendChild(kasuj_zdjecie);
            u.zdjecia_usun_init();
            
            var kasuj_zdjecia = newElem('input');
            kasuj_zdjecia.id = 'kasuj_zdjecia_' + id_zdjecia;
            kasuj_zdjecia.type = "checkbox";
            kasuj_zdjecia.className = 'kasuj_zdjecia';
            kasuj_zdjecia.style.position = 'absolute';
            kasuj_zdjecia.style.zIndex = '20';
            kasuj_zdjecia.style.left = '8px';
            kasuj_zdjecia.style.top = '24px';
            blok.appendChild(kasuj_zdjecia);
            
            if (i > 0 && u.Photos.album_nr == 1){
                var przenies_zdjecie = newElem('div');
                przenies_zdjecie.id = 'przenies_zdjecie_' + id_zdjecia;
                przenies_zdjecie.className = 'przenies_zdjecie icos16 ico16_27';
                przenies_zdjecie.style.cursor = 'pointer';
                przenies_zdjecie.style.position = 'absolute';
                przenies_zdjecie.style.zIndex = '20';
                przenies_zdjecie.style.left = '11px';
                przenies_zdjecie.style.top = '41px';
                blok.appendChild(przenies_zdjecie);
            }
        }
    }
    $('.przenies_zdjecie').bind('click', function() {
        var id = $(this).attr('id').split('_')[2];
        var msg = new u.MessageBox('Czy na pewno ustawić to zdjęcie jako pierwsze?');
        msg.addButton({
            'type': u.MessageBoxButtons.BUTTON,
            'title': 'Tak',
            'event': function() {
                data = new Object(),
                data.owner_id = u.profile_id;
                data.owner_type = 1;
                data.id = id;
                u.action('move_photos', data);
            }
        });
        msg.addButton({
            'type': u.MessageBoxButtons.CANCEL
        });
        msg.show();
    });
}

function main(){
    if (!u.myProfile){
        var container = newElem('div');
        container.style.textAlign = 'center';
        container.style.margin = '10px 0px';
        container.style.display = 'block';
        container.id = 'moderacja_zdjec';
        container.innerHTML = '<input type="button" value="Zaznacz wszystkie zdjęcia" class="button zaznacz_all" style="font-size:10px;margin:0 0 5px 0;"> <input type="button" value="Usuń zaznaczone zdjęcia" class="button kasuj_zdjecia_button" style="font-size: 10px; margin: 0px 0px 5px; cursor: pointer;" title="Usuń">';
        var cont1 = newElem('div');
        cont1.className = 'Box BoxShadow';
        cont1.appendChild(container);
        var cont2 = newElem('div');
        cont2.className = 'comments-item-box';
        cont2.appendChild(cont1);
        $('#index-container-columns').before(cont2);
        
        var obj = $('.zaznacz_all');
        obj.bind('click', function(){
            var photos = $('.kasuj_zdjecia');
            if(obj.attr('value') == 'Odznacz wszystkie zdjęcia'){
                photos.attr('checked',false);
                obj.attr('value','Zaznacz wszystkie zdjęcia');
            } else {
                photos.attr('checked',true);
                obj.attr('value','Odznacz wszystkie zdjęcia');
            }
        });
        u.zdjecia_kilka_usun_init();
        checkForChanges();
    }
}

var lastHeight = $("#index-container-columns").outerHeight();
function checkForChanges()
{
    if ($("#index-container-columns").outerHeight() != lastHeight){
        lastHeight = $("#index-container-columns").outerHeight(); 
        DodajZnaczki();
    }
    setTimeout(checkForChanges, 500);
}

setTimeout(function () {main();}, 500);