// ==UserScript==
// @name       OGame Resource Helper
// @version    0.1
// @description  Additional time information for buildings
// @include       http://*.ogame.*/game/index.php?page=resources*
// @include       http://*.ogame.*/game/index.php?page=station*
// @include       http://*.ogame.*/game/index.php?page=research*
// @include       http://*.ogame.*/game/index.php?page=shipyard*
// @include       http://*.ogame.*/game/index.php?page=defense*
// @copyright  Copyright (C) 2013 by K4z
// ==/UserScript==


var sourcecode = document.getElementsByTagName("html")[0].innerHTML.replace(/\s/g, '');
var prod_metal = parseFloat(sourcecode.match(/"metal":{"resources":{.+?"production":(.+?)},"tooltip":"/)[1]);
var prod_crystal = parseFloat(sourcecode.match(/"crystal":{"resources":{.+?"production":(.+?)},"tooltip":"/)[1]);
var prod_deuterium = parseFloat(sourcecode.match(/"deuterium":{"resources":{.+?"production":(.+?)},"tooltip":"/)[1]);
delete sourcecode;


window.addEventListener ('load', function () {
    setInterval (_reload, 200);
}, false);


function _reload() {
    var detail_status = document.getElementById("detail").style.display;
    if(detail_status == "block") {
        var current_metal = parseFloat(document.getElementById('resources_metal').innerHTML.replace(/[.\s]/g, '').match(/(.+?)(<.+?>)?$/));
        var current_crystal = parseFloat(document.getElementById('resources_crystal').innerHTML.replace(/[.\s]/g, '').match(/(.+?)(<.+?>)?$/));
        var current_deuterium = parseFloat(document.getElementById('resources_deuterium').innerHTML.replace(/[.\s]/g, '').match(/(.+?)(<.+?>)?$/));
        
        var costs_node_array = document.getElementsByClassName("cost");
        var cost, type;
        for(var i=0; i<costs_node_array.length; i++) {
            cost = parseFloat(costs_node_array[i].innerHTML.replace(/[.\s]/g, '').match(/(.+?)(<.+?>)?$/));
            type = costs_node_array[i].parentNode.className.match(/(.+?) tooltip/)[1];
            
            switch(type) {
                case "metal": 
                    var metal_left = cost-current_metal;
                    if(metal_left >= 0) {
                        var time = Math.round(metal_left/prod_metal);                            
                        costs_node_array[i].innerHTML = thousand_sep(cost)+"<p>"+format_output(time)+"</p>";
                    }
                    break;
                case "crystal": 
                    var crystal_left = cost-current_crystal;
                    if(crystal_left >= 0) {
                        var time = Math.round(crystal_left/prod_crystal);  
                        costs_node_array[i].innerHTML = thousand_sep(cost)+"<p>"+format_output(time)+"</p>";
                    }
                    break;
                case "deuterium": 
                    var deuterium_left = cost-current_deuterium;
                    if(deuterium_left >= 0) {
                        var time = Math.round(deuterium_left/prod_deuterium);  
                        costs_node_array[i].innerHTML = thousand_sep(cost)+"<p>"+format_output(time)+"</p>";
                    }
                    break;
                default:
                    break;
            }
                                  
            
        }


    }
}

function format_output(time) {
    var output = '';
    if(time < 60) {
        output = time+"s";
    } else if(time<3600) {
        output = Math.ceil(time/60.0)+"m";
    } else if(time<86400) {
        output = Math.floor(time/3600.0)+"h "+Math.round((time%3600)/60)+"m";
    } else {
        output = Math.floor(time/86400.0)+"d "+Math.round((time%86400)/3600.0)+"h";
    }
    return output;
}

function thousand_sep(nr) {
    var nr_tmp = nr.toString();
    for (var dots = Math.ceil((nr_tmp.length / 3) - 1); dots > 0; dots--) {
        nr_tmp = nr_tmp.substr(0, nr_tmp.length - (dots * 3)) + '.' +
                 nr_tmp.substring(nr_tmp.length - (dots * 3), nr_tmp.length);
    }
    return (nr_tmp);
}