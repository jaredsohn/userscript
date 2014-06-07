// ==UserScript==
// @name           Stats TWMap
// @version        1.0
// ==/UserScript==

/* original script by relaxeaza
 * modified by bmnds
 */
if( game_data.screen == 'info_ally' ) {
        id = $( location ).attr('href').match( /id=([0-9]+)/ )[1];
        window.open('http://' + game_data.world + '.tribalwarsmap.com/' + game_data.market + '/history/tribe/' + id);
} else if( game_data.screen == 'info_player' ) {
        id = $( location ).attr('href').match( /id=([0-9]+)/ )[1];
        window.open('http://' + game_data.world + '.tribalwarsmap.com/' + game_data.market + '/history/player/' + id);
} else if( game_data.screen == 'info_village' ) {
        id = $( location ).attr('href').match( /id=([0-9]+)/ )[1];
        window.open('http://' + game_data.market + '.twstats.com/' + game_data.world + '/index.php?page=village&id=' + id);
} else
        alert('Voce deve estar na visualizacao de uma aldeia, jogador ou tribo!');