// ==UserScript==
// @name           Megaupload sin esperas
// @version        2.1
// @namespace      DJMeu
// @description    Descarga desde MU sin tener que esperar.
// @include        http://*megaupload.com/?*d=*
// ==/UserScript==

var version='2.1',
    id='49360',
    scriptname="Megaupload sin esperas";

GM_registerMenuCommand('MU sin esperas: Visitar la p\u00e1gina del script',function(){
    document.location.href = 'http://userscripts.org/scripts/show/'+id;
});
//-------------------------------------------------------------------------------------------//
GM_xmlhttpRequest({
    method:'GET',
    url:'http://userscripts.org/scripts/source/' +id+ '.meta.js',
    onload:function(resp){
        resp.responseText.match(/@version\s+([\d.]+)/);
        var updatedversion = RegExp.$1;
        
        if(!updatedversion || !version || version==updatedversion) return;
            alert("Megaupload sin esperas ha encontrado una nueva versi\u00f3n (v" +updatedversion+ ").\nHaz click para actualizar.");
            document.location.href = 'http://userscripts.org/scripts/source/' +id+ '.user.js';
    }
});

location.href ="javascript:var count=1;";
setTimeout(function(){window.location.href = document.getElementById('downloadlink').firstChild.href;},2000);