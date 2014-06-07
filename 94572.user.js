// ==UserScript==
// @name           DS - KeepTroopsInSimulator
// @namespace      *
// @description    Fügt zwei Buttons zum Truppen aus dem Simulator speichern und laden hinzu
// @author         Ulrich-Matthias Schäfer
// @include        http://de*.die-staemme.de/game.php*screen=place*mode=sim*
// ==/UserScript==

// Modifikationen und Weiterverbreitung dieses Scripts benötigen die
// Zustimmung des Autors.
// -----------------------------------------------------------------------------


var $ = unsafeWindow.$;

//Buttons hinzufügen
$('form[name="units"]').append($('<input type="button" value="Truppen der letzten Simulation einf&uuml;gen" id="DS_KeepTroopsInSimulator_PASTE_TROOPS" />'));
$('form[name="units"]').append($('<input type="button" value="Jetzige Truppen speichern" id="DS_KeepTroopsInSimulator_COPY_TROOPS" />'));

var fields = document.getElementsByTagName('INPUT');

// Einfügen
document.getElementById('DS_KeepTroopsInSimulator_PASTE_TROOPS').addEventListener('click',function(){
    for(var i = 0;i<fields.length;i++)
    {
        if(fields.length != fields[i] && fields[i].getAttribute('type') != 'text')
            continue;

        fields[i].value = GM_getValue('DS_SIMULATE_'+fields[i].getAttribute('name'));
    }
}, false);

// Kopieren
document.getElementById('DS_KeepTroopsInSimulator_COPY_TROOPS').addEventListener('click',function(){
    for(var i = 0;i<fields.length;i++)
    {
        if(fields.length != fields[i] && fields[i].getAttribute('type') != 'text')
            continue;
            
        GM_setValue('DS_SIMULATE_'+fields[i].getAttribute('name'),fields[i].value);
    }
}, false);