// ==UserScript==
// @name       Battler
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://pokemonjourney.net/rpg/PokePyramid/battle.php
// @copyright  2012+, You
// ==/UserScript==

var node_list = document.getElementsByTagName("INPUT");
var node_list2 = document.getElementsByTagName("A");

var x;
for(x = 0; x < node_list2.length; x++){
    var node2 = node_list2[x];
    
    if(node2.innerText === "Restart Battle"){
        node2.click();
        
    }else{
        var i;
        for (i = 0; i < node_list.length; i++) {    
            
            var node = node_list[i];      
            
            if (node.getAttribute('type') == 'submit') {
                
                if(node.value == "Close Combat"){
                    node.click(); 
                }
                
                
            }
        }   
        
        
    }
    
    
}



