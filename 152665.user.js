// ==UserScript==
// @name        Pokemon Vortex test
// @namespace   http://userscripts.org/users/192333
// @include     http://*.pokemon-vortex.com/map.php*
// @version     1
// @grant			GM_deleteValue
// @grant			GM_getValue
// @grant			GM_setValue
// @grant			GM_info
// ==/UserScript==
//pkmnappearomega
var int=self.setInterval(function(){check_pokemon()},1000);
function check_pokemon(){
    AjaxMove(6, 16, 9);
    new_poke = document.getElementById('pkmnappearomega');
    if(new_poke != 'undefined'){
        console.log(new_poke);
    }
}
