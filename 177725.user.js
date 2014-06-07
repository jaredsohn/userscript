// ==UserScript==
// @name       tu click skip ad
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      http://adf.ly/*
// @copyright  2013, killer-rose
// ==/UserScript==



(function() {
    
    function auticlick(){
        var lnk = $('#skip_ad_button').parent().attr('href');
        if (lnk != undefined) {
            console.log(lnk);
            window.location.href = lnk;
        }
        else{
            console.log("-");
    		setTimeout(auticlick, 1000);
        }
    };
    
    setTimeout(auticlick, 1000);
    //$('#Interstitual table tr td')[1].remove();
})();




