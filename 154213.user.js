// ==UserScript==
// @name           Winnfail MP3 Direct Download
// @description    Baixa automaticamente ao ser redirecionado para a pagina de download em Winnfail.
// @version        0.1
// @namespace      
// @author         Alex Soares
// @description    
// @include        http://www.winnfail.com/mp3.php?video_id=*
// @run-at         document-idle
// ==/UserScript==
var fonte = document.getElementsByTagName('a')[0];
var link = fonte.href;
window.location=link;
for (var i = 0; i<5; i++) {
setTimeout((function(i){return function(){if(i == 2) {window.close();};};})(i), 1000*i);
}