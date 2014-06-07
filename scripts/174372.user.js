// ==UserScript==
// @name        nCore Turbo
// @namespace   https://ncore.cc/
// @include     https://ncore.cc/torrents.php*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @credit      dsdenes
// @version     0.1
// ==/UserScript==

// Changelog
// - Aktiválódik ha bármilyen film listázást (nem névre keresés) seed alapján csökkenő rendezünk
// - 30 oldalról lekéri a filmeket
// - IMDB csökkenő sorrendbe rendezi
// - Beállítható minimum IMDB érték
// - Duplikációkat megpróbálja kiszűrni
// - A zöld négyzetre (pipa) kattintva elrejti a filmet és többször nem jeleníti meg
// - A film nevére kattintva (megnyitás új ablakban) a film nevére keres

// CONFIG
var maxPages = 30;
var minScore = 6.5;
// CONFIG

try {
    var docLoc = document.location.href;
    
    var seen = [];
    if (typeof localStorage !== 'undefined') {
        try {
            seen = JSON.parse(localStorage.getItem("nCoreTurbo::seen"));
        } catch (e) {
        }
    }
    if (!seen) seen = [];
    
    /* Turn back */
    if (!docLoc.match(/miszerint=seeder/) || !docLoc.match(/hogyan=DESC/) ||  docLoc.match(/mire=/) || (!docLoc.match(/csoport_listazas=osszes_film/) && !docLoc.match(/tags=/) && !docLoc.match(/kivalasztott_tipus=/))) {
        throw 'Do not run';
    }
    
    if (!docLoc.match(/oldal=[0-9]+/)) {
        docLoc+='&oldal=1';
    }
    
    function is_float (mixed_var) {
      return +mixed_var === mixed_var && (!isFinite(mixed_var) || !!(mixed_var % 1));
    }
    
    $('body').append('<div id="loaderHider"><div><span>1</span>. találati oldal lekérése...</div></div>');
    $('#loaderHider').css({
        'position': 'fixed',
        'z-index': '1000',
        'top': '0',
        'left': '0',
        'width': '100%',
        'height': '100px',
        'background-color': '#000',
        'opacity': '0.7'
    });
    
    $('#loaderHider div').css({
        'position': 'absolute',
        'width': '100%',
        'top': '35%',
        'font-size': '22px',
        'color': '#fff',
        'text-align': 'center'
    });
    
    var doStyle = function() {
        $('.torrent_ok').css({
            'cursor': 'pointer'
        });
    }
    
    var lastPage = /oldal=([0-9]+)/.exec($('#pager_top a:last').attr('href'))[1];
    if (lastPage > maxPages) lastPage = maxPages;
    
    var clearLine = '<div style="clear:both;"></div>';
    
    $('.box_torrent_all').empty();
    var rows = [];
    
    $(document).on('readyAll', function() {
        rows.sort(function(a, b) {
            return b[0] - a[0];
        });
        
        $(rows).each(function() {
            $('.box_torrent_all').append(this[1]);
        });
        
        doStyle();
    
        $('#loaderHider').hide();
    });
    
    $(document).on('click', '.torrent_ok', function() {
        $(this).parents('.box_torrent').slideUp();
        var box = $(this).parents('.box_torrent');
        
        seen.push($(box).attr('rel'));
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("nCoreTurbo::seen", JSON.stringify(seen));    
        }
    });
    
    var j = 1;
    var titles = [];
    
    var loadPage = function(page) {
    //for (var page = 1; page  < lastPage + 1; page++) {
        $.get(docLoc.replace(/oldal=[0-9]+/, 'oldal=' + page), {}, function(data) {
            $('.infolink', data).each(function() {
                try {
                    var score = parseFloat(/imdb: ([0-9]\.[0-9])/.exec($(this).text())[1]);
                    var box = $(this).parents('.box_torrent');
                    //console.log($('nobr', box).text());
                    //console.log($('.box_s2', box).text());
                    if (is_float(score) && minScore <= score) {
                        var title = /([a-zA-Z\.]+)\.[0-9]{4}/.exec($('nobr', box).text())[1];                    
                        $(box).attr('rel', title);
    
                        if (seen.indexOf(title) !== -1) {
                            throw 'Seen this film';
                        }
    
                        if (titles.indexOf(title) !== -1) {
                            throw 'Title exists';
                        }
    
                        titles.push(title);
                        
                        $('nobr', box).parents('a').eq(0).attr('href', 'https://ncore.cc/torrents.php?miszerint=seeders&hogyan=DESC&mire=' + title + '&miben=name');
                        rows.push([score, clearLine + $(box)[0].outerHTML + clearLine + box.next().next()[0].outerHTML]);
                    }
                } catch(e) {
                }
            });      
            if (j >= lastPage) {
                $(document).triggerHandler('readyAll');
            } else {
                $('#loaderHider span').html(j + 1);
                loadPage(++j);
            }
        }, 'html');
    }
    //}
    
    loadPage(j);

} catch (e) {
    console.log(e);
}