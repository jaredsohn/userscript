// ==UserScript==
// @name          British English
// @namespace     http://philwilson.org/
// @description   Makes favorite become favourite, etc.
// @include       *
// ==/UserScript==

// based on xurble.org's Google search term highlighter

// Spelling differences between American and British English
// http://www2.gsu.edu/~wwwesl/egw/jones/differences.htm
// there are probably hundreds more on wikipedia


(function () {

// i know, totally non-scalable
var us=["favorite", "color", "gray", "honor", "defense", "center", "meter", "theater", "encylopedia", "maneuver", "jewelry", "plow", "criticiz"];
var gb=["favourite", "colour", "grey", "honour", "defence", "centre", "metre", "theatre", "encylopaedia", "manoeuver", "jewellery", "plough", "criticis"]

function innit_british(){
    for(var i=0; i<us.length; i++){
        make_it_so(us[i], document.body, gb[i]);
    }
}

// this isn't _quite_ right because of the new span element, but it's good enough for me
function make_it_so(term, container, replacement){
    var term_low = term.toLowerCase();

    for(var i=0; i<container.childNodes.length; i++){
        var node = container.childNodes[i];

        if (node.nodeType == 3){
            var data = node.data;
            var data_low = data.toLowerCase();
            if (data_low.indexOf(term_low) != -1){
                //term found!
                var new_node = document.createElement('SPAN');
                node.parentNode.replaceChild(new_node,node);
                var result;
                
                while((result = data_low.indexOf(term_low)) != -1){
                    new_node.appendChild(document.createTextNode(data.substr(0,result+1)));
                    new_node.appendChild(document.createTextNode(replacement.substr(1)));
                    data = data.substr(result + term.length);
                    data_low = data_low.substr(result + term.length);
                }
                new_node.appendChild(document.createTextNode(data));
            }
        }else{
            //recurse
            make_it_so(term, node, replacement);
        }
    }
}

innit_british();

})();  