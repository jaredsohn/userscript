// ==UserScript==
// @name           [+] Nebula [+]
// @namespace      
// @description    Nebula skin
// @include        http://www.orkut.com/*
// @author         Dragonboyhelp
// ==/UserScript==


//////////////////////////////////////////////////////////////////////////////////////////////
// Principais ------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////



// cor de fundo , se for colocar uma foto de fundo , deixe em branco , ex.: fundo = '';
var fundo = ''; 

// imagem , que sera exibida como plano de fundo , se voce quizer eh claro
// Ex.: imagem = 'http://www.site.com/imagem.jpg'

var imagem = 'http://img514.imageshack.us/img514/2498/virusinfectedgreenwallp.jpg';

// letra , escolha a sua fonte desejada , ex.: arial , comic sans ms , etc
var letra = 'verdana';  /* verdana, arial, courier new, etc */

// tamanho da letra
var tamanho_letra = '12px';

// cor da letra
var cor_letra = 'navy';

// a cor dos links
var links = 'navy';

// a cor dos links qndo vc passa o mouse em cima
var link_onMouse = 'orange'; 


///////////////////////////////////////////////////////////////////////////////////////////////
// fim da configuracao PRINCIPAIS -----------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////





///////////////////////////////////////////////////////////////////////////////////////////////
// Menu Orkut -------------------------------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////

// letra do menu , escolha a fonte desejada
var letra_menu = 'verdana';

// tamanho da letra , tem que ser assim , NUMERO . PX , ex.: 10px
var tamanho_menu = '11px'; 

// cor das palavras no menu , Pagina Inicial | Amigos | e assim vai
var cor_letra_menu = 'black';

// cor do fundo do menu
var fundo_menu = 'gray';

///////////////////////////////////////////////////////////////////////////////////////////////
// fim da configuracao MENU ORKUT -----------------------------------------------
///////////////////////////////////////////////////////////////////////////////////////////////




//////////////////////////////////////////////////////////////////////////////////////////////
// Outras cores do Orkut -------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////

// eu resolvi nao colocar os nome e os lugares das cores 
// correspondentes, entao va mudando , de 1 em 1 , para ver
// a cor que voce quer em cada parte 


/* 

para deixar TRANSPARENTE deixe sem nada 

Exemplo ... cor1 = '';

*/


var  cor1  = 'white'; 
var  cor2  = 'silver';
var  cor3  = 'white'; 
var  cor4  = 'silver';
var  cor5  = 'white'; 
var  cor6  = 'silver';
var  cor7  = 'white';
var  cor8  = 'silver';
var  cor9  = 'white';



////////////////////////////////////////////////////////////////////////////////////////////
// fim da configuracao OUTRAS CORES ------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////












// Nao eh RECOMENDAVEL que voce mude algo, a partir desta parte

//---------------------------NAO MEXA--------------------------------

var transparente = 'http://www.bluekut.xpg.com.br/transparente.gif';
skin=document.body.innerHTML;
skin=skin.replace(/(#c9d6eb)/g,cor1); 
skin=skin.replace(/(#bfd0ea)/g,cor2); 
skin=skin.replace(/(#e5ecf4)/g,cor3);   
skin=skin.replace(/(#e4f2f9)/g,cor4); 
skin=skin.replace(/(#f0e8f5)/g,cor5);
skin=skin.replace(/(#d4dded)/g,cor6); 
skin=skin.replace(/(#ebffed)/g,cor7); 
skin=skin.replace(/(#fcf0d8)/g,cor8); 
skin=skin.replace(/(#a1bbe4)/g,cor9); 
document.body.background=''+imagem+'';
skin=skin.replace(/http...images3.orkut.com.img.tr1.gif/gi,transparente);
skin=skin.replace(/http...images3.orkut.com.img.tr2.gif/gi,transparente);
skin=skin.replace(/http...images3.orkut.com.img.tr3.gif/gi,transparente);
skin=skin.replace(/http...images3.orkut.com.img.tr4.gif/gi,transparente);
skin=skin.replace(/http...images3.orkut.com.img.tr8.gif/gi,transparente);
skin=skin.replace(/http...images3.orkut.com.img.tg4.gif/gi,transparente);
document.body.innerHTML=skin+
'<style type="text/css">'+
'<!--'+
'body {'+
'background:'+fundo+
';font-family:'+letra+',sans-serif'+
';font-size: '+tamanho_letra+
'}'+
'table {'+
';font-family:'+letra+',sans-serif'+
';font-size: '+tamanho_letra+
'color:'+cor_letra+
'}'+
'a:link,a:visited,a:active {'+ 
'color: '+links+''+
'; text-decoration: none;'+
'}'+
'a:hover {'+ 
'color: '+link_onMouse+''+
'; text-decoration: underline;'+
'}'+
'.H,.H:link,.H:visited {'+
'font-family: '+letra_menu+', sans-serif;'+ 
'font-size:'+tamanho_menu+';'+
'color:'+cor_letra_menu+'; '+
'text-decoration: none;'+
'background-color:'+fundo_menu+''+
'}'+
'.H:hover { '+
'font-family: Verdana, sans-serif;'+ 
'font-size: 11px;'+ 
'color: #FFFFFF;'+
'}'+
'.T { border:'+fundo_menu+' 1px solid }'+
'.F,.F:link,.F:visited {background-color:'+fundo_menu+'}'+
'-->'+
'</style>';


//---------------------------NAO MEXA--------------------------------

