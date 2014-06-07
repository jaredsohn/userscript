// ==UserScript==
// @name           Layout Estadao
// @version        2.1
// @namespace      www.estadao.com.br
// @description    Muda o layout da pagina do Estado.com.br
//                 Cor da fonte das noticias: preta
//                 Cor do resumo da noticia na 1a pagina: vermelha
//                 Adicao de espaco entre o titulo e o resumo da noticia na 1a pagina
//                 Atualizado para o novo layout de Mar/2010
// @include        http://www.estadao.com.br/*
// ==/UserScript==
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle('.bb-md-noticia-coment p, .bb-md-noticia .corpo p { color: #000 !important; }  .bb-md-news p {padding-top:3px; padding-left:2px; font-family:Verdana; color: #600;');