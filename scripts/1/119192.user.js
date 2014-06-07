// ==UserScript==
// @name             WarLog [GW]
// @namespace        http://worm.vline.ru/gw/
// @description      Ссылки на участников боя в логе боя.
// @include          http://www.ganjawars.ru/warlog.php*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

function parse(text, color) {
    
    // убираем цвет
    text = text.replace(/<font.*>(.*)<\/font>/i, '$1');
    
    if (/<\!-- s(\d+) -->/.test(text)) {
        
        text = text.replace(/<\!-- s(\d+) -->(.*)\[(\d+)\]<!-- d\d+ -->/, '<a href="http://www.ganjawars.ru/syndicate.php?id=$1"><img src="http://images.ganjawars.ru/img/synds/$1.gif" alt="" style="border: none" /></a><a style="color: '+ color +'" href="http://www.ganjawars.ru/search.php?key=$2">$2</a>[$3]');
        
    } else {
        
        text = text.replace(/^(\s+|)(.*)\[(\d+)\]$/, '<a style="color: '+ color +'" href="http://www.ganjawars.ru/search.php?key=$2">$2</a>[$3]');
        
    }
    
    return text;
    
}

function getNode() {
    
    var span = root.document.getElementsByTagName('span');
    for (var i = 0, l = span.length; i < l; i++) {
        
        for (var k = 0; k < span[i].childNodes.length; k++) {
            
            if (typeof span[i].childNodes[k].nodeValue != 'undefined' && /начался бой/i.test(span[i].childNodes[k].nodeValue)) {
                
                var retval = {};
                
                //список красных
                retval.red  = span[i].childNodes[k + 1];
                // список синих
                retval.blue = span[i].childNodes[k + 5];
                
                return retval;
                
                
            }
            
        }
        
    }
    
    return false;
    
}

function getTeam(team, name) {
    
    for (var i = 0; i < team.length; i++) {
        
        team[i] = parse(team[i], name);
        
    }
    
    return team;
    
}

if (root.location.href.indexOf('http://www.ganjawars.ru/warlog.php') >= 0) {
    
    if ((nodes = getNode()) == false) {
        
        return;
        
    }
    
    var red_array  = nodes.red.innerHTML.split(/,/);
    var blue_array = nodes.blue.innerHTML.split(/,/);
    
    red_array  = getTeam(red_array, 'red');
    blue_array = getTeam(blue_array, 'blue');
    
    nodes.red.innerHTML  = red_array.join(', ');
    nodes.blue.innerHTML = blue_array.join(', ');
    
}


})();