// ==UserScript==
// @name           Who do you know
// @author         mastitrain.com
// @namespace      http://www.mastitrain.com
// @description    aishwariya
// @include        http*://www.orkut.com/GLogin.aspx*
// ==/UserScript==


//Altere aqui os enderecos das fotos
fotos = [
       "http://mastitrain.googlepages.com/aish1copy.jpg",
       "http://mastitrain.googlepages.com/aish2.jpg",
	   "http://mastitrain.googlepages.com/aish3.jpg",
	   "http://mastitrain.googlepages.com/aish4.jpg",
	    ];

document.images[3].src=fotos[Math.floor(Math.random()*fotos.length)];
