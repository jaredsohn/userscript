(function(){

// ==UserScript==
// @name prikol.i.ua remove context menu
// @description prikol.i.ua remove context menu

    var imgs = document.getElementsByTagName("img");

    for (var i = 0; i < imgs.length; i++){
        var img = imgs[i];
        try {
            img.removeAttribute("oncontextmenu");
        } catch(e){}
    }

})();
 // ==/UserScript==