// ==UserScript==
// @name           clicrbs plus
// @namespace      clicrbs plus
// @description    clicrbs align center
// @include        http://www.clicrbs.com.br/rs/
// @include        http://www.clicrbs.com.br/sc/
// @include        http://www.clicrbs.com.br/jsp/default.jsp*
// ==/UserScript==
// align center
stylesheet = ''+
'div.bloco.editorial.esportes a { color:#4E6E0B !important; }'+
'h3.titulo-a a, h3.titulo-b a, h3.titulo-c a, h3.titulo-d a, h3.titulo-e a { color:#0066DD !important; }'+
'div#menu { top:18.5em !important; }'+
'div.bloco.um div.linha { width:81.5em !important; }'+
'#bloco-um { left:14.3em !important; }'+
'div.bloco.tres div.linha.tres-blocos.esportes div.coluna-b div.bloco.destaque p.texto-a,'+
'div.bloco.tres div.linha.tres-blocos.esportes div.coluna-b div.bloco.destaque p.texto-s a,'+
'div.bloco.tres div.linha.esportes div.coluna-b div.bloco.destaque div.marcador-a,'+
'div.bloco.tres div.linha.esportes div.coluna-b div.bloco.destaque div.marcador-a a,'+
'div.bloco.tres div.linha.esportes div.coluna-b div.bloco.destaque div.marcador-b,'+
'div.bloco.tres div.linha.esportes div.coluna-b div.bloco.destaque div.marcador-b a,'+
'div.bloco.tres div.linha.esportes div.coluna-b div.bloco.destaque div.marcador-c,'+
'div.bloco.tres div.linha.esportes div.coluna-b div.bloco.destaque div.marcador-c a { color:#000 !important; }'+
'div.bloco.tres div.linha.tres-blocos.esportes,'+
'#topo, #geral, #bloco-um, #mapadosite { background-image: none !important; }'+
'#rasgaPagina, #coluna-extra-estrutura, #retanguloMedio,'+
'div.menu div.publicidade.button div, #multiofertas, #fly { display:none !important }'+
'#geral { margin:0 50%; left: -500px !important; overflow:hidden; width:1000px !important; }'+
'#glb-barra div.topo-menu { margin:0 auto; width:1000px !important; }';
var newstyle = document.createElement("style");
newstyle.type = "text/css";
var css = document.createTextNode(stylesheet);
newstyle.appendChild(css);
document.getElementsByTagName('body')[0].appendChild(newstyle);

// disable auto refresh
var m = document.getElementsByTagName('meta'), l=m.length;
while(l--) {
    if(m[l].getAttribute('http-equiv')==='Refresh') {
        m[l].parentNode.removeChild(m[l]);
    }
}