// ==UserScript==
// @id             www.qlranks.com-5ac0301c-25df-402b-a830-c570151b5681@QuakeLiveCopyKey
// @name           QLRanks compare players
// @version        1.2
// @namespace      js_qlranks_compare
// @require        http://code.jquery.com/jquery-1.10.1.min.js
// @author         José Pedro Vidal Pinho de Oliveira Santos
// @description    Script to compare 2 duel players in qlranks
// @include        http://*.qlranks.*
// @run-at         document-end
// ==/UserScript==

//--------------------------------------------------------------------
// vars
//--------------------------------------------------------------------
var player1 = null;
var player2 = null;
var content;

//--------------------------------------------------------------------
// the form
//--------------------------------------------------------------------
content = '<div id="compare" style="float:left;">';
content += '<input type="text" style="width:129px;" id="compare_player1" value="player 1">';
content += '<input type="text" style="width:129px;" id="compare_player2" value="player 2" style="margin-left:3px">';
content += '<button id="compare_btn" href="http://www.google.com" type="button" style="margin-left:3px;">Compare</button>';
content += '</div>';

//--------------------------------------------------------------------
// print the form
//--------------------------------------------------------------------
$('#searchbar') .before(content);

//--------------------------------------------------------------------
// focus in & focus out events
//--------------------------------------------------------------------
$('#compare_player1') .focusin(function () {
    player1 = $('#compare_player1') .val();
    if (player1 == 'player 1') {
        $('#compare_player1') .val('');
    }
});
$('#compare_player1') .focusout(function () {
    player1 = $('#compare_player1') .val();
    if (player1 == '') {
        $('#compare_player1') .val('player 1');
        player1 = null;
    } else {
        $('#compare_player1') .css('border', '1px solid #FFFFFF');
    }
});
$('#compare_player2') .focusin(function () {
    player2 = $('#compare_player2') .val();
    if (player2 == 'player 2') {
        $('#compare_player2') .val('');
    }
});
$('#compare_player2') .focusout(function () {
    player2 = $('#compare_player2') .val();
    if (player2 == '') {
        $('#compare_player2') .val('player 2');
        player2 = null;
    } else {
        $('#compare_player2') .css('border', '1px solid #FFFFFF');
    }
});

//--------------------------------------------------------------------
// prevent the enter key to submit the wrong form
//--------------------------------------------------------------------
$( "#compare_player1 , #compare_player2" ).keydown(function( event ) {
    if ( event.which == 13 ) {
        event.preventDefault();
        $('#compare_btn') .click();
    }
});
$( "#compare_player1 , #compare_player2" ).keyup(function( event ) {
    if ( event.which != 13 ) {
        player1 = $('#compare_player1') .val();
        player2 = $('#compare_player2') .val();
    }
});

//--------------------------------------------------------------------
// error check and submit
//--------------------------------------------------------------------
$('#compare_btn') .click(function () {
    if (player1 == null && player2 == null) {
        $('#compare_player1') .css('border', '1px solid #DD2222');
        $('#compare_player2') .css('border', '1px solid #DD2222');
    } else if (player1 == null && player2 != null) {
        $('#compare_player1') .css('border', '1px solid #DD2222');
        $('#compare_player2') .css('border', '1px solid #FFFFFF');
    } else if (player1 != null && player2 == null) {
        $('#compare_player1') .css('border', '1px solid #FFFFFF');
        $('#compare_player2') .css('border', '1px solid #DD2222');
    } else {
        window.location.href = 'http://www.qlranks.com/duel/compare/' + player1 + '/' + player2;
    }
});
