// ==UserScript==
// @name           Orkut skin
// @namespace      http://userscripts.org/scripts/show/39411
// @description    muda estilo do orkut (fonte, cor, tamanho, imagem de fundo, etc)
// @include        http://*.orkut.*
// @author         Leandro Costa
// ==/UserScript==


//////////////////////////////////////////////////////////////////////////////////
// ------------------------------Principais ---------------------------------- //
////////////////////////////////////////////////////////////////////////////////


// cor de fundo, ex: blue, green, purple, red, etc.
// se for colocar uma imagem de fundo, deixe em branco, ex.: fundo = '' ;
var fundo = ''; 

// imagem que sera exibida como plano de fundo, se quiser.
var imagem = 'http://lh6.ggpht.com/_9BQ3j7f9uXM/RlBiRrHfF0I/AAAAAAAAAlw/vTyh0On6Wf4/PICT0022.JPG';
// mais imagens: http://www.natures-desktop.com/images/Wallpaper/widescreen1920x1200/

// letra, escolha a fonte desejada, ex.: arial ,comic sans, etc
var letra = 'verdana'; /* verdana, arial, courier new, etc */

// tamanho da letra
var tamanho_letra = '12px';

// cor da letra
var cor_letra = 'navy';

// cor dos links
var links = 'navy';

// cor dos links quando se passa o mouse por cima
var link_onMouse = 'orange'; 


////////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------- fim das configuracoes Principais ------------------------------ //
//////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////
// --------------------------------------Menu Orkut ---------------------------------------- //
//////////////////////////////////////////////////////////////////////////////////////////////

// letra do menu, escolha a fonte desejada
var letra_menu = 'verdana';

// tamanho da letra, tem que ser em px. ex.: 10px
var tamanho_menu = '11px'; 

// cor das palavras no menu, Pagina Inicial | Recados | Amigos | etc
var cor_letra_menu = 'black';

// cor do fundo do menu
var fundo_menu = 'gray';

////////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------ fim da configuracao Menu Orkut --------------------------- //
//////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////////////
// ------------------------------------ Outras cores do Orkut ----------------------------- //
/////////////////////////////////////////////////////////////////////////////////////////////

/* 

para deixar transparente deixe vazio 

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



/////////////////////////////////////////////////////////////////////////////////////////////
// ----------------------------- fim da configuracao Outras cores ----------------------- //
///////////////////////////////////////////////////////////////////////////////////////////






// NAO RECOMENDAVEL que se mude a partir desta parte

//----------------------------------------------------------------

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


//---------------------------NAO MEXER--------------------------------





























