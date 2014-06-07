// ==UserScript==
// @name       ATV VLC Playlist
// @namespace  m36
// @version    0.1
// @description  
// @match      http*://atv.at/contentset/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @copyright  2013
// ==/UserScript==
(function () {
    function getplaylist() {
        if (PlayerProxy.options.contentset_id > 0) {
            var link = "";
            if (PlayerProxy.playlist.active != null) {
                console.log(PlayerProxy.playlist.active);
                if (PlayerProxy.playlist.active.page_count > 0) {
                    for (i=0;i<PlayerProxy.playlist.active.page_count;i++) {
                        //console.log(PlayerProxy.playlist.active.pages[i]);
                        if (typeof PlayerProxy.playlist.active.pages[i] !== 'undefined') {
                            if (PlayerProxy.playlist.active.pages[i].length > 0) {
                                for (j=0;j<PlayerProxy.playlist.active.pages[i].length;j++) {
                                    if (typeof PlayerProxy.playlist.active.pages[i][j].parts !== 'undefined') {
                                        if (PlayerProxy.playlist.active.pages[i][j].parts.length > 0) {
                                            for (k=0;k<PlayerProxy.playlist.active.pages[i][j].parts.length;k++) {
                                                if (typeof PlayerProxy.playlist.active.pages[i][j].parts[k] !== 'undefined') {
                                                    link += PlayerProxy.playlist.active.pages[i][j].parts[k].alternative_m3u8 + " ";
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (link != "") {
                window.removeEventListener("DOMNodeInserted",getplaylist,false);
                prompt('CMD LINE:',"vlc "+link);
                //document.getElementById('search_input').removeAttribute('size');
                //document.getElementById('search_input').value = "vlc "+link;                
            }
        }
    }
    window.addEventListener("DOMNodeInserted",getplaylist, false);
})() ;