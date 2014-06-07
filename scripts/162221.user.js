// ==UserScript==
// @name        Map Maker "toggle map/sat" hotkey
// @description Toggles map/sat view by pressing the space key
// @namespace	bozar
// @include		http://www.google.com/mapmaker*
// @include		http://www.google.pl/mapmaker*
// @version		1.0.0
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.8.1/jquery.min.js
// @grant		none
// ==/UserScript==

$(document).keypress(keypress);

function keypress(e){
    //console.log(e.charCode);
    if(e.charCode == 32){    	
        var type = document.activeElement.nodeName;        
        if(type == "BODY"){                      
            if( $("#maptypenormal:visible").length == 1 ){
                $("#maptypenormal").click();                
            }else if( $("#maptypehybrid:visible").length == 1 ){
                $("#maptypehybrid").click();                
            }
        }        
    }    
}