// ==UserScript==
// @name    x Für ok
// @version    1.0
// @author        Flökiii Fan
// @include      http://*.die-staemme.de/game.php*screen=market*
// ==/UserScript==

var inputs=document.getElementsByTagName("input");
for(i=0;i<inputs.length;i++){
    if(inputs[i].value=="» OK «"){
        input=inputs[i];
        id="return_32";
        input.id=id;
        break;
    }else if(inputs[i].value=="OK"){
        input=inputs[i];
        id="return_32";
        input.id=id;
        break;
    }
}

var script_area=document.createElement("script");
var script_text=document.createTextNode(';function TasteLosgelassen (Ereignis){if(!Ereignis)Ereignis = window.event;if(Ereignis.which){Tastencode=Ereignis.which;}else if(Ereignis.keyCode){Tastencode=Ereignis.keyCode;}if(Tastencode==88){document.getElementById("return_32").click();}}document.onkeyup = TasteLosgelassen;');
document.getElementsByTagName("body")[0].appendChild(script_area).appendChild(script_text);  