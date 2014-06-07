// ==UserScript==
// @name       ColorChange
// @namespace  bro555.org
// @version    0.1
// @description  ColorChange
// @match      http://*.imperiaonline.org/imperia/game_v5/game/village.php
// @copyright  2012+, You
// ==/UserScript==

var y = 1;
var x = 2;
var e = document.body.style.background = 'gray';

setInterval(
function checker(){
    if(x == y){
        document.body.style.background = 'orange';
        x=x+1;
    }
    else if (x != y){
        document.body.style.background = 'green';
        y=y+1;
    }
	
    //location.reload();
    xajax_find_babysit(1, 1);
},10000); 