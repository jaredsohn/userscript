// ==UserScript==

// @name            GM FA-Filter

// @author          Tjeerdo
// @version         1.0     
// @description     FA-Filter
// @include         http://*.tribalwars.net/game.php?*screen=am_farm*

/* Functionaliteiten:
 * Sneltoetsen (A, B en C knoppen, vorig en volgende dorp), volgende pagina
 * Dorpen die al worden aangevallen worden eruit gefiltert
 * Dorpen waarbij je de vorige keer verliezen had worden er ook uitgefilterd
 * Sorteren op afstand (oplopend/asc) (aflopend = desc)
 *
 */

/* TO-DO List:
 * GS filteren
 */

// ==/UserScript==

// a function that loads jQuery and calls a callback function when jQuery has finished loading
var load,execute,loadAndExecute;load=function(a,b,c){var d;d=document.createElement("script"),d.setAttribute("src",a),b!=null&&d.addEventListener("load",b),c!=null&&d.addEventListener("error",c),document.body.appendChild(d);return d},execute=function(a){var b,c;typeof a=="function"?b="("+a+")();":b=a,c=document.createElement("script"),c.textContent=b,document.body.appendChild(c);return c},loadAndExecute=function(a,b){return load(a,function(){return execute(b)})};

loadAndExecute("//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js", function() {

$('#footer_left').append(' - Dorpen zijn gefilterd');

$("div#am_widget_Farm img[src$='http://cdn2.tribalwars.net/graphic/command/attack.png?901ab']").each(function(i, e) {
   $(this).closest('tr').remove();
});
if (!document.URL.match("order=distance")) {
    location.href = game_data.link_base_pure + "am_farm&order=distance&dir=asc&Farm_page=0";
};

document.onkeydown = function(e) {
    if (e.which == 39) { //39 is de keycode voor het rechterpijltje
        location.href = document.getElementById("village_switch_right").href.replace(/page=\d+/, "page=0");
    }
    if (e.which == 37) { // 37 is de keycode voor het linkerpijltje
         location.href = document.getElementById("village_switch_left").href.replace(/page=\d+/, "page=0");;
    }
    if (e.which == 68) { //68 is de keycode voor de D
        location.href = game_data.link_base_pure + "am_farm&order=distance&dir=asc&Farm_page=" + ++(document.URL.match(/page=(\d+)/) || [, 0])[1];
    }
    if (e.which == 83) { // 83 is de keycode voor de S
        location.href = game_data.link_base_pure + "am_farm&order=distance&dir=asc&Farm_page=" + --(document.URL.match(/page=(\d+)/) || [, 0])[1];
    }
    if(e.which == 65 || e.which == 66 || e.which == 67) { // keycodes 65: A, 66: B, 67: C
        var key = String.fromCharCode(e.which).toLocaleLowerCase();
        var knop = document.getElementsByClassName("tooltip farm_icon farm_icon_" + key);
            knop[0].click();
            $(knop[0]).closest('tr').remove();
    }
};
});