// ==UserScript==
// @name         TF2Lobby Toolkit
// @namespace    http://www.tf2calculator.com
// @version      1.2.2
// @description  Makes several changes to TF2Lobby.com
// @match        http://tf2lobby.com/*
// @match        http://lobby.tf/*
// @copyright    _Hands
// ==/UserScript==

///////////////////////////////////////////////////////////////
//
//                      Settings
//
///////////////////////////////////////////////////////////////

var preffered_gamemode = 9; // Usage: '9' or '6'. Will filter out the opposite.
var regional = true;  // Usage: true/false. Will filter out all lobbies not relevant to your region.
unsafeWindow.preferred_gamemode = preferred_gamemode;
///////////////////////////////////////////////////////////////
//
//                      Script
//
///////////////////////////////////////////////////////////////
unsafeWindow.preferred_gamemode = preferred_gamemode;
if (regional === true) {
    var region = unsafeWindow.myRegion;
}

function customCss(region) {
    var customCss = '<style>';
    customCss = customCss + '#lobbyListContainer{height:100% !important;}#lobbies{height:525px !important;}';
    if (region !== 'EU') {
        customCss = customCss + '[region=NA],[region=CH],[region=RU],';
    } else if (region !== 'NA') {
        customCss = customCss + '[region=NA],[region=CH],[region=RU],';
    } else if (region !== 'CH') {
        customCss = customCss + '[region=NA],[region=EU],[region=RU],';
    } else if (region !== 'RU') {
        customCss = customCss + '[region=NA],[region=CH],[region=EU],';
    }
    customCss = customCss + '[region=Unknown]{display:none !important;}';
    customCss = customCss + '.removeThis,.removeThis *{display:none !important;height:0 !important;padding:0 !important;visibility:hidden !imporant;}';

    customCss = customCss + '</style>';
    $('head').append(customCss);
}
if ($('head')[0]) {
    customCss();
}
$('.mainTeamList li').each( function(){
    $(this).find('.nrContainer').append('  <a href="http://tf2b.com/tf2/'+$(this).attr('fid')+'" style="color:white;" target="_blank" onclick="window.open($(this).attr(\'href\'));return false;">BP</a> <a href="http://steamcommunity.com/profiles/'+$(this).attr('fid')+'" style="color:white;" target="_blank" onclick="window.open($(this).attr(\'href\'));return false;">Steam</a>');
});
unsafeWindow.filter = function(){
    var lobbies = $("#lobbyList li");
    lobbies.each( function(){
        var players = $(this).find(".players").text();
        playersArr = players.split(" / ");
        players = parseInt(playersArr[1]);
        if( players/2 !== preferred_gamemode ){ 
            $(this).addClass('removeThis');
       	}
    });
};
$('body').append('<input value=" Filter gamemode " type="submit" onClick="filter()" style="position:absolute;top:5px;left:5px;">');