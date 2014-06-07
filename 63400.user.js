// ==UserScript==
// @name           BodyMod.org De-Censor
// @namespace      None
// @description    Display Preview pics inline even to non-supporters
// @include        http://www.bodymod.org/mods/mods.aspx?*                
// ==/UserScript==


var whiteSpace = /^\s*$/

function outDated() {
        alert("BodyMod De-Censor outdated.")
    }
    
function fiddle(){    
    block=document.getElementById('noModDisplay');
    if(block!=null){
        
        if(!whiteSpace.test(block.innerHTML)){
            embedLinks = document.getElementById('embeds').querySelectorAll('.embedLink');
            if(embedLinks.length >=4) {
                    imageURL=embedLinks[3].getElementsByTagName('input')[0].getAttribute('value');
                    block.innerHTML='<img alt="Image of the mod" src="'+imageURL+'" />'
                }
        }
    }  
}

window.addEventListener(
    'load', 
    function() { fiddle() },
    true);
