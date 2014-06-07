// ==UserScript==
// @name           Kronos MCAnime - Ocultar publicaciones
// @namespace      MetalTxus
// @match          http://kronos.mcanime.net
// ==/UserScript==

function initializeCSS() {    
    $('#wrapper').css('width', '655px');
    $('#content[class="main wide"]').css('margin', '0 5px 0 0');
    $('#content[class="main wide"]').css('float', 'none');
    $('#iconbar, #tab-menu, #content[class="main wide"]').css('margin', 'auto');
    
    $('#iconbar').css('margin-top', '10px');
    $('#iconbar').css('margin-bottom', '10px');
    $('#tab-menu').css('margin-left', '10px');
    
    $('#sidebar').css('width', '288px');
    $('#sidebar').css('position', 'fixed');
    $('#sidebar').css('right', '8px');
    $('#sidebar').css('top', '36px');
}

$(document).ready(function() {
    $('#user-actions').append('<img id="toggleSidebar" title="Publicaciones" src="https://dl.dropbox.com/s/y6lbskq2f86pzwq/publications_single.png">');
    $('#toggleSidebar').click(function() { $('#sidebar').toggle(); });
    $('#sidebar').hide();
    initializeCSS();
});