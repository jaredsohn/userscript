// ==UserScript==

// @name           helms deep

// @description    a tunes for your deeps experience

// @author         drfunk

// @homepage       http://eat.my/ass

// @version        4.20

// @include        http*://forum.free-games.com.au/*

// ==/UserScript==



var musics = ['rXdMNMDHP3Y', 'F-whZ56yJzg', 'YNWHgN9Di9w', '8i46N2ZFPb0', '3PAwp_1wYz8', 'coacDhNsoZw', '4fYfdlKIon4'];

var tube = musics[Math.floor(Math.random()*musics.length)];

var iframe = document.createElement("iframe");
iframe.setAttribute("height", "1px");
iframe.setAttribute("width", "1px");
iframe.setAttribute("src", "http://www.youtube.com/embed/" + tube + "?autoplay=1&loop=1");

document.body.appendChild(iframe);
document.body.style.backgroundImage = "url('http://i.imgur.com/8fzA1.gif')";