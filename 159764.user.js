// ==UserScript==
// @name       BT Factory ADs remover
// @namespace  http://userscripts.org/users/ziki
// @version    0.2.1
// @match      http://*.wkdown.info/*
// @match      http://*.pidown.info/*
// @match      http://*.97down.info/*
// @match      http://*.kidown.com/*
// @match      http://*.17domn.com/*
// @match      http://*.rmdown.com/*
// @run-at document-start
// @copyright  2012+, Ziki
// ==/UserScript==

(function (){
    var ads = document.getElementsByTagName('a'),ad,i;
    for (i=ads.length-1; i>=0; i=i-1) {
        ad=ads[i];
        ad.parentNode.removeChild(ad); 
    }
    
    ads = document.getElementsByTagName('script');
    for (i=ads.length-1; i>=0; i=i-1) {
        ad=ads[i];
        ad.parentNode.removeChild(ad); 
    }
    function doKill(){
        
        try{
            document.getElementById('down_btn').onclick=null;
            document.getElementById('name').type="text";
            
        } catch(e){}
        try{
            ads = document.getElementsByName('submit');
            for (i=ads.length-1; i>=0; i=i-1) {
                ad=ads[i];
                ad.onclick = null;
            }
        } catch(e){}
        document.getElementById('name').focus();
    }
    document.addEventListener("DOMContentLoaded", doKill, true);
    //ads = document.getElementsByTagName('script');
})();
