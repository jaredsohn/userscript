// ==UserScript==
// @name       Export simulation
// @version    1.0
// @description  Permet d'exporter en un clic une simulation de combat guerre tribale.
// @match      http://*.guerretribale.fr/game.php?*mode=sim&screen=place
// @copyright  2013, tondeuse
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

/*-----------------------------------------------------------*/
/*------------------VARIABLES GLOABLES-----------------------*/
/*-----------------------------------------------------------*/

var imgLanc = "[img]http://cdn2.tribalwars.net/graphic/unit/unit_spear.png[/img]";
var imgPE = "[img]http://cdn2.tribalwars.net/graphic/unit/unit_sword.png[/img]";
var imgGuerr = "[img]http://cdn2.tribalwars.net/graphic/unit/unit_axe.png[/img]";
var imgArch = "[img]http://cdn2.tribalwars.net/graphic/unit/unit_archer.png[/img]";
var imgScout = "[img]http://cdn2.tribalwars.net/graphic/unit/unit_spy.png[/img]";
var imgCavLeg = "[img]http://cdn2.tribalwars.net/graphic/unit/unit_light.png[/img]";
var imgArchMont = "[img]http://cdn2.tribalwars.net/graphic/unit/unit_marcher.png[/img]";
var imgCavLour = "[img]http://cdn2.tribalwars.net/graphic/unit/unit_heavy.png[/img]";
var imgBelier = "[img]http://cdn2.tribalwars.net/graphic/unit/unit_ram.png[/img]";
var imgCata = "[img]http://cdn2.tribalwars.net/graphic/unit/unit_catapult.png[/img]";
var imgPaladin = "[img]http://cdn2.tribalwars.net/graphic/unit/unit_knight.png[/img]";
var imgNoble = "[img]http://cdn2.tribalwars.net/graphic/unit/unit_snob.png[/img]";
var imgMilice = "[img]http://cdn2.tribalwars.net/graphic/unit/unit_militia.png[/img]";
var imgBois = "[img]http://cdn2.tribalwars.net/graphic/holz.png[/img]";
var imgArgile = "[img]http://cdn2.tribalwars.net/graphic/lehm.png[/img]";
var imgFer = "[img]http://cdn2.tribalwars.net/graphic/eisen.png[/img]";
var imgPop = "[img]http://cdn2.tribalwars.net/graphic/face.png[/img]";

/*---------------------------------------------------------------*/
/*------------------FIN VARIABLES GLOABLES-----------------------*/
/*---------------------------------------------------------------*/

function addExportLink(){
    
    //Ajout du lien
    var htmlToAdd = "<br><a id='export-simu' >Exporter la simulation</a>"; 
    $( "a:contains('Attaquer avec ces unités')" ).after(htmlToAdd);
    
    $('#export-simu').css('cursor', 'pointer');
}

function addExportTextBox(){
    
    //On ajoute la textbox qui va contenir le BBCode d'export
    var htmlToAdd = "<textarea rows='3' id='txtarea'></textarea>"; 
    $( "#export-simu" ).after(htmlToAdd);   
}

function addTextInTextBox(){
    var text = "";
    
    text+="[table][**][||][||]" + imgLanc + "[||]" + imgPE + "[||]" + imgGuerr + "[||]" +imgArch + "[||]" +
        imgScout  + "[||]" + imgCavLeg + "[||]" + imgArchMont + "[||]" +imgCavLour + "[||]" +imgBelier + "[||]" +
        imgCata + "[||]" +imgPaladin + "[||]" +imgNoble + "[||]" +imgMilice + "[/**]";
    
    var trTab = $('table .vis').get(1);
    var ligne1 =  $(trTab).find('tr')[1];
    var ligne2 =  $(trTab).find('tr')[2];
    var ligne3 =  $(trTab).find('tr')[4];
    var ligne4 =  $(trTab).find('tr')[5];
    
    
    text+="[*]Attaquant[|]Unités:";
    $(ligne1).find('td.unit-item').each(function(){
        text+="[|]" + $(this).text();
    });
    text+="[/*]";    
    
    text+="[*][|]Pertes:";
    $(ligne2).find('td.unit-item').each(function(){
        text+="[|]" + $(this).text();
    });
    text+="[/*]";
    text+="[*][|][|][|][|][|][|][|][|][|][|][|][|][|][|][/*]";
    text+="[*]Défenseur[|]Unités:";
    $(ligne3).find('td.unit-item').each(function(){
        text+="[|]" + $(this).text();
    });
    text+="[/*]";
    
    text+="[*][|]Pertes:";
     $(ligne4).find('td.unit-item').each(function(){
        text+="[|]" + $(this).text();
    });
    text+="[/*][/table]";
    
    $( "#txtarea" ).append(text);
}

function selectText(){
    $( "#txtarea" ).focus();
    $( "#txtarea" ).select();
}


$(document).ready(function () { 
    
    addExportLink();
    
    $('#export-simu').click(function(){
        addExportTextBox();
        addTextInTextBox();
        selectText();
    });
    
});




