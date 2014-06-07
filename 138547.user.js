// ==UserScript==
//
// @name           GSTable.fm
//
// @description    Makes the spotify button on turntable.fm search grooveshark for the currently playing song instead
//
// @namespace      MediocreGopher
//
// @author         Marco Munizaga/Brian Picciano
//
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
//
// @version        1.1
//
// Urls process this user script on
// @include        http://turntable.fm/*
//
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var turntable = unsafeWindow.turntable;

    var timer = setInterval(function(){
         $('.spotify.btn').css('background-image','url("http://i.imgur.com/LkVrZ.png")')
        for (obj in turntable){
            if (turntable[obj] != undefined && obj != 'playlist' && turntable[obj].hasOwnProperty('currentSong')){
                lol=turntable[obj];
                $('.spotify.btn').each(function(i,element) {
                    element.onclick = function(e){window.open('http://grooveshark.com/#!/search?q='+lol.currentSong.metadata.song,'_blank')};
                });
            }
        }
    }, 1e3);


