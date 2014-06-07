// ==UserScript==
// @name           login pic
// @author         Bharadwaj
// @namespace      http://stanleystl.googlepages.com/whodoyouknow.user.js
// @description    Muda a imagem do pagina inicial do orkut
// @include        http*://www.orkut.com/GLogin.aspx*
// ==/UserScript==

/*
====================================================
COMO EDITAR
====================================================

 Basta acrescentar o endereco da imagem ENTRE ASPAS apï¿½s a , (virgula).
 Caso acrescente como ultimo endereco NAO USE a virgula.
 A ORDEM DAS NAO IMPORTA!!!
 Apenas mude os enderecos das imagens, o restante NAO MEXA.
 Caso nao tenha onde hospedar suas imagens, recomendo o site: http://imagehack.us
 
=====================================================
SO QUERO UMA IMAGEM, O QUE FAZER?
=====================================================
 Apague os outros enderecos e tire a virgula do final.

*/

//Altere aqui os enderecos das fotos
fotos = [
       "http://img209.imageshack.us/img209/7061/bujjigadu0018rd4.jpg",
       "http://www.dragonballworld.it/rarita/gokussj6mini.jpg",
       "http://img209.imageshack.us/img209/7061/bujjigadu0018rd4.jpg",
       "http://img71.imageshack.us/img71/504/adautoal5.jpg"
       ];

document.images[3].src=fotos[Math.floor(Math.random()*fotos.length)];
