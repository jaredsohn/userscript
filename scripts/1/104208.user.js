// ==UserScript==
// @name Descarga fotos Tuenti
// @description Anyade un link para descargar las fotos de tus amigos
// @match http://www.tuenti.com/*
// ==/UserScript==

var change = function() {
    if(location.hash.indexOf('m=Photo') === -1 || location.hash.indexOf('func=view_photo') === -1) {
        return;
    }

    var photo = document.getElementById('photo_image');
    if(photo === null) {
        window.setTimeout(change, 100);
        return;
    }
    var photourl = photo.getAttribute('src');
    var link = document.createElement('a');
    link.href = photourl;
    link.textContent = 'Bajar foto';

    var photoinfo = document.getElementById('photo_main_info');
    photoinfo.appendChild(link);
};

window.addEventListener("hashchange", change);