// ==UserScript==
// @name            ogame
// @version         0.1
// @description     Calcul
// @exclude         http://board.ogame.*
// @include         http://*.ogame.*/*
// ==/UserScript==

/*=================================================================================================================================================*/

 

function separateurMilliers (nombre)
{
    nombre += '' ;
    var sep = '.' ;
    var reg = /(\d+)(\d{3})/ ;
    
    while( reg.test( nombre)) 
    {
        nombre = nombre.replace( reg, '$1' +sep +'$2') ;
    }
    
    return nombre ;
}

var displayButton = document.createElement("div") ;
	displayButton.innerHTML = "<img src='http://www.imageshotel.org/images/Eolindel/affichage.gif' />" ;
	displayButton.addEventListener("click", function ClicBouton()
                         { 
                             var affichageRessourcesPillees = document.createElement("div") ;
                             affichageRessourcesPillees.innerHTML = separateurMilliers(GM_getValue("mTotal" , '0')) + ' Metal / ' + 
                                 separateurMilliers(GM_getValue("cTotal", '0')) + ' Crystal / ' + 
                                 separateurMilliers(GM_getValue("dTotal", '0')) + ' Deut / ' +
                                 separateurMilliers(GM_getValue("compteur", '0')) + ' Loots' ;
                             
                             document.getElementById('contentWrapper').insertBefore(affichageRessourcesPillees, document.getElementById('vide')) ; 
                         } , true) ;

var clearButton = document.createElement("div") ;
	clearButton.innerHTML = "<img src='http://www.imageshotel.org/images/Eolindel/clear.gif' />" ;
	clearButton.addEventListener("click", function ClicBouton()
                         { 
                             GM_deleteValue("mTotal") ;
                             GM_deleteValue("cTotal") ;
                             GM_deleteValue("dTotal") ;
                             GM_deleteValue("compteur") ;
                         } , true) ;

document.getElementById('myPlanets').insertBefore(displayButton, document.getElementById('vide')) ;
document.getElementById('myPlanets').insertBefore(clearButton, document.getElementById('vide')) ;

$(document).ajaxSuccess(function(e,xhr,settings){
    if (settings.url.indexOf("page=showmessage") == -1) return;
    
    $(".overlayDiv > .showmessage").each(function(){
        var battlereport = this.getElementsByClassName("battlereport")[0];
        if (battlereport) {
            var pillage = document.getElementById("shortreport").getElementsByTagName('tr')[7].getElementsByTagName('tr')[1].getElementsByTagName('td')[1].innerHTML ;
            var pillageSplit = pillage.split('unités') ;   
            GM_setValue("mTotal", parseInt(pillageSplit[0].replace( /[^0-9-]/g, "")) + parseInt(GM_getValue("mTotal" , '0'))) ;
            GM_setValue("cTotal", parseInt(pillageSplit[1].replace( /[^0-9-]/g, "")) + parseInt(GM_getValue("cTotal" , '0'))) ;
            GM_setValue("dTotal", parseInt(pillageSplit[2].replace( /[^0-9-]/g, "")) + parseInt(GM_getValue("dTotal" , '0'))) ; 
            GM_setValue("compteur", 1 + parseInt(GM_getValue("compteur", '0'))) ;
        }
    });
});