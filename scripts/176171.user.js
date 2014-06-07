// ==UserScript==
// @name       Pokemon Pyramid 2
// @namespace  http://use.i.E.your.homepage/
// @version    1.2
// @description  adds a hotkey to the search button
// @match      http://pokemonjourney.net/rpg/PokePyramid/maps-372
// @copyright  2012+, You
// ==/UserScript==

var node_list = document.getElementsByTagName('INPUT');
var poke_filter = document.getElementsByTagName('TD')[2].childNodes[0];

function randomFromInterval(from,to)
{
    return Math.floor(Math.random()*(to-from+1)+from);
}

function findPokemon(){
    var i;
    for (i = 0; i < node_list.length; i++) {
        var node = node_list[i];  
        
        if (node.getAttribute('type') == 'submit') {
            
            if(node.value == "Catch!"){ 
                
                if (poke_filter.nodeValue != "You have found a Pineco!"){
                    alert(poke_filter.nodeValue);
                    node.click();
                    
                }                
                
                
            }else{
                
                node.click(); 
                
            }
            
            
        }
    }     
       
}

var time = randomFromInterval(300,900);
setTimeout(findPokemon, time);

