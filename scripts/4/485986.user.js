// ==UserScript==
// @name           Kronos MCAnime - Ignorar usuarios
// @namespace      MetalTxus
// @match          http://kronos.mcanime.net/*
// ==/UserScript==

function ignoreUser() {
    // Introducir aquí las IDs de usuario en el formato 'id', 'id', '...'
	var ignoredUsers = ['927359'];    
    
    for (var i = 0; i < ignoredUsers.length; i++) {
    	$('a[href="/perfil/' + ignoredUsers[i] + '/actividades"]').parent().parent().each(function(i, element) {
        	$(element).remove();
    	});
    }
}

$(document).ready(function() {
    setInterval(ignoreUser, 2000);
});