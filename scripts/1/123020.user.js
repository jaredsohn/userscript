// ==UserScript==
// @name           BRChan anti-fingerprint
// @namespace      http://www.brchan.org/
// @description    Evita o funcionamento do fingerprint de browser do BRChan
// @run-at         document-start
// @author         Anao
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html

// @include        http://brchan.org/*
// @include        http://www.brchan.org/*

// @version        1.0.0
// ==/UserScript==

// Substitui a funcao de MD5 usada pelo fingerprint por um gerador aleatorio
function inject_js(){
    window.hex_md5 = function(){
        var charset = "0123456789abcdef";
        var random_hash = "";
        for(var i = 0; i < 32; i++)
            random_hash += charset.charAt( Math.floor(Math.random()*16) );
        return random_hash;
    }
}

// Executa a funcao acima no contexto da pagina
var uw = unsafeWindow ? unsafeWindow : window;
var md5scr = uw.document.createElement("script");
md5scr.appendChild(uw.document.createTextNode("(" + inject_js + ")();"));
(uw.document.body || uw.document.head || uw.document.documentElement).appendChild(md5scr);

// Intercepta o carregamento do script md5.js, assim a funcao acima prevalece
uw.document.addEventListener("beforeload", init_antifp, true);
function init_antifp(scr){
    if(scr.target && scr.target.src && scr.target.src.indexOf("md5.js") != -1)
        scr.preventDefault();
}