// ==UserScript==
// @name        DisableGoogleAds
// @namespace   https://github.com/mohan43u/greasemonkey
// @description removes Google's ads
// @include     http://*google*
// @include     https://*google*
// @version     1
// @grant       none
// ==/UserScript==
document.onreadystatechange = function(){
    if(document.readyState == "complete"){
        let o = new MutationObserver(function(ms, s){
            ms.forEach(function(m){
                let es = m.target.querySelectorAll(".ads-container");
                for(let i = 0; i < es.length; i++){
                    let e = es[i];
                    e.parentNode.removeChild(e);
                }
            });
        });
        o.observe(document, {attributes: true, childList:true, subtree:true, characterData:true});
    }
}