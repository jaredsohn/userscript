// ==UserScript==
// @name       Freebitco.in Hotkeys
// @version    1.0
// @namespace  freebitcoin_hotkeys
// @description  Adds just-dice hotkeys to freebitco.in
// @match      http://freebitco.in/*
// ==/UserScript==

//
// encourage me to keep coding by donating:
// 1CCD2iNCaKNMfJsQhhtJVvZCzDo547PXvj
// thanks... zx81 :)
//

var script = function(){
    $(document).keypress(function(e){
    
        // if dice page is showing
        if($("#double_your_btc_tab").is(':visible')){
            switch(String.fromCharCode(e.which)){
            
                // just-dice hotkeys
                case 'z':	// bet min
                    $("#double_your_btc_min").click();
                    break;
                case 'b':	// bet max
                    $("#double_your_btc_max").click();
                    break;
                case 'c':	// bet x2
                    $("#double_your_btc_2x").click();
                    
                    break;
                case 'x':	// bet /2            
                    var stake = $("#double_your_btc_stake_div input").val();                
                    stake = Number(stake) / 2;
                    stake = Number(stake).toFixed(8)
                    $("#double_your_btc_stake_div input").val(stake);
                    break;
                case 'l': 
                    $("#double_your_btc_bet_lo_button").click();
                    break;
                case 'h': //console.log('high'); 
                    $("#double_your_btc_bet_hi_button").click();
                    break;
                    
                default: //console.log('key not implemented');
            }
        }
    });
    
    console.log('hotkeys by zx81\nencourage me to keep coding by donating:\n1CCD2iNCaKNMfJsQhhtJVvZCzDo547PXvj');  
}

var inject = function(){
    var injectScriptElement = document.createElement("script");
    var txt = script.toString();
    injectScriptElement.innerHTML = "(" + txt + ")();";
    injectScriptElement.type = "text/javascript";
    injectScriptElement.id = "freebitcoinhotkeys";
    document.getElementsByTagName("head")[0].appendChild(injectScriptElement);
}

var checkReadyState = function(){
    if(document.readyState == 'complete'){
        inject();                    
    } else {  
        setTimeout(checkReadyState, 500)
    }
}

checkReadyState();


/*
*/