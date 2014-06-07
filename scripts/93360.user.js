// ==UserScript==
// @name           Namensschuchtel sei gegangen
// @namespace      krautchan
// @description    Namensschuchteln wegbuxxen!
// @include        http://krautchan.net/*
// @version        3
// ==/UserScript==
//

// Add jQuery
(function(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
            GM_JQ = document.createElement('script');

        GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }
    GM_wait();
})();

// Check if jQuery's loaded
function GM_wait() {
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        letsJQuery();
    }
}
function saveFags(){
    //GM_setValue('namefags', unsafeWindow.document.getElementById('namefags').value);
}

function letsJQuery(){
    storage=unsafeWindow.localStorage;
    if(storage.getItem("namefags") == null)storage.setItem("namefags", "");
    blacklist=storage.getItem("namefags");
    blacklist=blacklist.split(",");
    subjects=$(".postsubject");
    for(i=0;i<subjects.length;i++){
        text=subjects[i].firstChild;
        if(text!=null && blacklist.indexOf(text.nodeValue) >-1){
            $(text).parents("table").remove()
        }
    }
    div=document.createElement("div");
    div.innerHTML='Namensschuchteln ausblenden: <input id="namefags" style="width: 80%" type="text" value="'+storage.getItem("namefags")+'" /><input type="button" value="und tschüss" id="namefags-button"onclick="window.localStorage.setItem(\'namefags\', document.getElementById(\'namefags\').value);window.location.reload()" />';
    $("body").append(div);
}
