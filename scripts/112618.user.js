// ==UserScript==
// @name           Farmhelfer
// @version        2.0
// @description    Versieht das Spiel an etlichen stellen mit Shortcuts, welche einem beim Farmen helfen!
// @description    Außerdem faerbt es Berichte mit Truppen, die voll zurueck gekehrt sind, farbig ein!
// @description    Desweitren ist es moeglich mithilfe der Tasten "Y, X und C" truppen im versammlungsplatz abzuschicken,
// @description    die man vorher definiert hat!
// @include        http://*.die-staemme.de/game.php?*screen=place*try=confirm*
// @include        http://*.die-staemme.de/game.php?*screen=info_village*
// @include        http://*.die-staemme.de/game.php?*screen=report*
// ==/UserScript==

win = (typeof(unsafeWindow) != 'undefined') ? unsafeWindow : window;
$ = win.$;

api = win.ScriptAPI;
api.register( 'Farmhelfer', 7.4, 'Nik Karbaum', 'picnik2@online.de' );

var server = location.host.split(".")[0];

var troops = new Array();

// Y
troops[89] = {
    spear: 0,  // speer
    sword: 0,  // schwert
    light: 14, // lkav
    axe: 0,     // aexte
    heavy: 0   //skav
};
// X
troops[87] = {
    spear: 50,  // speer
    sword: 0,  // schwert
    light: 0, // lkav
    axe: 0,     // aexte
    heavy: 0   //skav
};
// C
troops[69] = {
    spear: 0,  // speer
    sword: 0,  // schwert
    light: 50, // lkav
    axe: 0,     // aexte
    heavy: 0   //skav
};

// zeigt, je nachdem auf welcher seite man ist, an was fuer tasten zur verfuegung stehen
$(document).ready(function(){
    if(location.href.indexOf("screen=place") != -1 && location.href.indexOf("try=confirm") != -1) {
        $('#troop_confirm_go').attr('value','OK (d)');
    }
    else if(location.href.indexOf("screen=info_village") != -1) {
        $('a:contains("Truppen schicken")').html("&#187; Truppen schicken (a)");
    }
    else if(location.href.indexOf("screen=report") != -1 && location.href.indexOf("&view=") != -1) {
        $('a[href*="type=same"]').html("&#187; Mit gleichen Truppen noch einmal angreifen (s)");
    }
    else if(location.href.indexOf("screen=report") != -1 && location.href.indexOf("&view=") == -1) {
        $('img[src*="max_loot/1.png"]').each(function() {
            $(this).parent().css({"background-color":"#bcdbf5"});
        });

        $('a[href*="screen=report&mode=all&view="]').mousedown(function(e) {
            if(e.target.nodeName == "SPAN")
                $(this).parent().parent().css({"background-color":"#56eb65"});
        });
    }
});


$(document).bind('keydown', function(e) {
    switch(e.which)
    {
        case 89:
        case 88:
        case 67: // Y X oder C
            // je nachdem, welche taste gedrueckt wurde, wird das jeweilige object angesprochen und die daten werden eingefuegt
            if(location.href.indexOf("screen=place") != -1 && location.href.indexOf("try=confirm") == -1) {
                $.each(troops[e.which],function(key,value){
                    $('#unit_input_' + key).attr('value',value);
                });
                $("#target_attack").click();
            }
            break;
        case 68: // D
            // simuliert das druecken der OK taste
            if(location.href.indexOf("screen=place") != -1 && location.href.indexOf("try=confirm") != -1) {
                $('#troop_confirm_go').click();
            }
            break;
        case 65: // A
            // truppen schicken shortcut
            if(location.href.indexOf("screen=info_village") != -1) {
                var home = getUrlParameter('village');
                var attacking = getUrlParameter('id');
                location.href = "http://" + server + ".die-staemme.de/game.php?village=" + home + "&screen=place&target=" + attacking;
            }
            break;
        case 83: // S
            // mit gleichen truppen noch einmal angreifen
            if(location.href.indexOf("screen=report") != -1 && location.href.indexOf("view=") != -1) {
                location.href = $('a[href*="type=same"]').attr('href');
            }
            break;
    }
});

function getUrlParameter(parameter) {
    var loc = location.search.substring(1, location.search.length);
    var param_value = false;

    var params = loc.split("&");
    for (i=0; i<params.length;i++) {
        param_name = params[i].substring(0,params[i].indexOf('='));
        if (param_name == parameter) {
            param_value = params[i].substring(params[i].indexOf('=')+1)
        }
    }
    if (param_value) {
        return param_value;
    }
    else {
        return false;
    }
}