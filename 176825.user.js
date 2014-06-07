// ==UserScript==
// @name       AdoptaUnTio Plus
// @namespace  http://userscripts.org/scripts/show/176825
// @version    0.4.8
// @updateURL   http://userscripts.org/scripts/source/176825.user.js
// @description  descargar fotos de los perfiles y busca clones/fakes con un click
// @match      http://www.adoptauntio.es/*
// @include    http://www.adoptauntio.es/*
// ==/UserScript==

$(function(){
   
    $('#photo-gallery .gallery-fullsize-view').each(function() {
        var urlfoto = $(this).children('.image-wrapper').find('img').attr('src');
        var linkafoto = '<div style="margin:3px 0; float: left;"><a style="background:url(http://www.mvusertools.com/ext/aut/save-icon.png) no-repeat;width: 16px; height: 16px; display: block;overflow: hidden; text-indent: 100%; white-space: nowrap;" href="'+urlfoto+'" target="_blank" title="Descargar foto" >Descargar foto</a></div>';
        
        var googleapi = 'https://www.google.com/searchbyimage?&image_url='+urlfoto+'';
        var linkgooglesearch = '<div style="margin:3px 0 0 5px;"><a style="background:url(http://www.mvusertools.com/ext/aut/lupa-icon.png) no-repeat;width: 16px; height: 16px; display: block;overflow: hidden; text-indent: 100%; white-space: nowrap;" href="'+googleapi+'" target="_blank" title="Buscar clones de la foto" >Buscar clones de la foto</a></div>';
    	
        $(this).children('.image-wrapper').prepend(linkgooglesearch);
        $(this).children('.image-wrapper').prepend(linkafoto);
    });
    
});