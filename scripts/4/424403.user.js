// ==UserScript==
// @name        Flickr+
// @namespace   flickr.com
// @description Gives a direct link to the Flickr Image & commercial usage only button...
// @author      PumaDias
// @icon        http://i.imgur.com/pNacMzo.png
// @version     1.0.3
// @updateURL   https://userscripts.org/scripts/source/424403.user.js
// @downloadURL https://userscripts.org/scripts/source/424403.user.js
// @homepage    https://userscripts.org/scripts/show/424403
// @include     http://*flickr.com*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// ==/UserScript==

if ($('.top-nav').length) {
    sUrl = $(location).attr('href');
    if (sUrl.indexOf('?q=')>0) {
        if (sUrl.indexOf('&l=comm&ct=0')>0) $('.top-nav:first').append('<li class="toplink"><a class="gn-link" href="'+sUrl.split('&')[0]+'"><span>View all</span></a></li>');
        else $('.top-nav:first').append('<li class="toplink"><a class="gn-link" href="'+sUrl+'&l=comm&ct=0&mt=all&adv=1"><span>Commercial Usage</span></a></li>');
    }
}
if ($('.nav-menu').length && $('.main-photo').attr('src').length) {
    viewDownloadOptions();
    $("body").click(function(e){
        setTimeout(function (){
           if ($('#my_download').length<1) viewDownloadOptions();
           }, 200);
    }, false);
}

function viewDownloadOptions() {
    sImage = $('.main-photo').attr('src').split('_').splice(0,2).join('_');
    sHtml = '<li id="my_download"><a class="gn-title" href="'+sImage+'_d.jpg'+'" target="_blank"><span>Download</span></a>';
    sHtml += '<ul class="gn-submenu" role="menu">';
    sHtml += '<li role="menuitem"><a href="'+sImage+'_o_d.jpg'+'" target="_blank">Original</a></li>';
    sHtml += '<li role="menuitem"><a href="'+sImage+'_b_d.jpg'+'" target="_blank">Medium</a></li>';
    sHtml += '<li role="menuitem"><a href="'+sImage+'_z_d.jpg'+'" target="_blank">Small</a></li>';
    sHtml += '</ul></li>';
    $('.nav-menu:first').append(sHtml);
}