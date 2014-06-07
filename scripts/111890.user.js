// ==UserScript==
// @name           Hangar18's Youtubber Sharer
// @namespace      nada
// @include        http://www.youtube.com/watch?v=*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js
// ==/UserScript==

//Guardamos En La Variable panel El Elemento Con ID watch-actions
var panel = document.getElementById('watch-actions');
var After = document.getElementById('watch-flag');

//creamos el elemento boton con el que compartimos
boton = document.createElement('button'); //creamos
boton.setAttribute('class','yt-uix-tooltip-reverse yt-uix-button yt-uix-tooltip'); //definimos stilo
boton.setAttribute('onclick','var Link = window.location.href;window.open(\"http://hangar18.com.ar/sharev.php?q=\" + Link,\"\",\"toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, width=800, height=197, top=85, left=140\");'); //definimos accion
boton.title = 'Compartir En Hangar18!'; //definimos tooltip
boton.innerHTML = '<span class="yt-uix-button-content"><img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5Ojf/2wBDAQoKCg0MDRoPDxo3JR8lNzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzf/wAARCAAQABADASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgME/8QAJRAAAQMDAgYDAAAAAAAAAAAAAQIDEQQFMQYTABIhQVFxFBVS/8QAFQEBAQAAAAAAAAAAAAAAAAAAAwX/xAAeEQABAwQDAAAAAAAAAAAAAAABAAIDERITMSJBov/aAAwDAQACEQMRAD8AbaiULvY3Ktmua+UkbyWt1MIRnkg4MdScyPEDiOm3TZ7Omsqa9sVCzu7G6mFt/mBkkSQczHaQSdZogW7WZqLq42i2AlxKlmA8cBM49iZyO4Jz0uhPtdbpqLWtCrXzB1akdQycFM49D14niQ6WQzYA43brTztMI+N3S//Z"></span>'; //definimos contenido html

panel.insertBefore(boton,After); //agregamos el boton