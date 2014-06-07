// ==UserScript==
// @name       Pokemon Vortex Movement Keys
// @version    1.0
// @description  Use arrows keys and a,s,w,d keys to move on the maps
// @match      http://*.pokemon-vortex.com/*
// @copyright  VortexHacked 2012
// ==/UserScript==

(function(w){
    
    var d = w.document;
    var $A = function(a){var b=[];for(var i=0;i<a.length;i++){b.push(a[i]);}return b;};
    var $$ = function(s,r){return $A((r || d).querySelectorAll(s));};
    var $1 = function(s,r){return (r || d).querySelector(s);};
    
    if (w.location.pathname === '/map.php') {
        [
            {"s":"#arrows img[src$='/arrowleft.gif']","k":[37,100,65]}, // left
            {"s":"#arrows img[src$='/arrowleftup.gif']","k":[103]}, // leftup
            {"s":"#arrows img[src$='/arrowup.gif']","k":[38,104,87]}, // up
            {"s":"#arrows img[src$='/arrowrightup.gif']","k":[105]}, // rightup
            {"s":"#arrows img[src$='/arrowright.gif']","k":[39,102,68]}, // right
            {"s":"#arrows img[src$='/arrowrightdown.gif']","k":[99]}, // rightdown
            {"s":"#arrows img[src$='/arrowdown.gif']","k":[98,83,40]}, // down
            {"s":"#arrows img[src$='/arrowleftdown.gif']","k":[97]}, // leftdown
            {"s":"form[action='wildbattle.php'] input[type='submit']","k":[101,13,32]} // battle
        ].forEach(function(map){
            d.addEventListener('keydown', function(e){
                map.k.forEach(function(k){
                    if (e.which !== k)
                        return;
                    
                    var bt = $1(map.s);
                    if (!bt)
                        return;
                    
                    bt.click();
                    e.preventDefault();
                    return;
                });
            }, false);
        });
    }
    
})(typeof unsafeWindow !== 'undefined' ? unsafeWindow : window);