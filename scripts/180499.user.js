// ==UserScript==
// @name       RYM to Grooveshark
// @version    0.2
// @description  adds link on release pages that will find the tracks on grooveshark
// @match      http://rateyourmusic.com/release/*
// @match      https://rateyourmusic.com/release/*
// @match      http://grooveshark.com
// @copyright  2013+, thought_house
// ==/UserScript==

if (window.location.origin == 'http://rateyourmusic.com') {

    var $ = unsafeWindow.jQuery;
    var tracks = [];
    var $artist = $('span[itemprop="byArtist"] [itemprop="name"]:visible');
    var artist = $artist.attr('title') == '[Artist5]' ? '' : $artist.text();
    var album = $('.album_title').text();
    var gs_window = null;
    var track_ids = [];

    $('#tracks li.track').each(function() {
        if ($(this).find('.tracklist_num').text().trim() != '') {
        	tracks.push($(this).find('span[itemprop=name]').text().trim());
        }
    });
    
    $('.section_tracklisting').after('<div id="section_grooveshark" style="padding: 10px; padding-left: 20px; padding-right: 20px; "></div>');
    $('#section_grooveshark').append('<div id="grooveshark" style="border: 1px #ccc solid; border-radius: 5px; padding: 5px; background: #FFF; "></div>');
    $('#grooveshark').append('<a href="http://grooveshark.com/" id="get_grooveshark_playlist" style="color: #55C; text-decoration:none;"></a>');
    $('#get_grooveshark_playlist').append('<img width=16 src="http://grooveshark.com/favicon.ico" /> Play on Grooveshark');
    
    $('#get_grooveshark_playlist').on('click', function(event) {
        event.preventDefault();
        gs_window = window.open($(this).attr('href'), '_blank');
        $.ajax({
            url: 'http://topjon.site90.net/tinysong.php?artist=' + artist + '&album=' + album,
            data: { tracks: tracks },
            dataType: 'jsonp',
            scriptCharset: 'utf8',
            error: function(data, status, err) {
                console.log(data);
                alert('Network error - try again');
            },
            success: function(data) {
                //console.log(data);
                var aregex = new RegExp(artist.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'i');
                var not_found = [];
                for (var i = 0; i < tracks.length; i++) {
                    var regex = new RegExp(tracks[i].replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'i');
                    if (data[i] !== undefined && data[i].length > 0) {
                        var goodid = 0;
                        var bestid = -1;
                        for (var j = data[i].length - 1; j >= 0; j--) {
                            if (data[i][j].ArtistName.match(aregex)) {
                                if (data[i][j].SongName.match(regex)) {
                                    goodid = j;
                                }
                                if (data[i][j].SongName.toLowerCase() == tracks[i].toLowerCase()) {
                                    bestid = j;
                            	}
                            }
                        }
                        bestid = bestid == -1 ? goodid : bestid;
                        track_ids[i] = data[i][bestid].SongID;
                    } else {
                        not_found.push(tracks[i]);
                    }
                }
                var ok = true;
                if (not_found.length > 0) {
                    var ask = "These tracks were not found in Grooveshark:\n\n";
                    for (i = 0; i < not_found.length; i++) {
                        ask += not_found[i] + "\n";
                    }
                    ask += "\nContinue anyway?";
                    ok = confirm(ask);
                }
                if (ok) {
                    gs_window.postMessage(track_ids, 'http://grooveshark.com');
                } else {
                    gs_window.close();
                }
            }
        });
        
    });

} else {
    var song_ids = [];
    var api_ready = false;
    var adding_tracks = false;
    
    window.addEventListener('message', function(event) {
        //console.log('heyhey ' + event.data + ' from ' + event.origin);
        if (event.origin == 'http://rateyourmusic.com') {
            song_ids = event.data;
        }
        if (event.origin == 'http://grooveshark.com' && event.data.match(/GroovesharkAPIReady/)) {
            api_ready = true;
        }
        if (api_ready && song_ids.length && !adding_tracks) {
            var i = 0;
            var self = this;
            
            adding_tracks = true;
            var timer = setInterval(function() {
                //console.log(event.origin + ': add song ' + song_ids[i]);
                unsafeWindow.Grooveshark.addSongsByID([ song_ids[i] ], i == 0);
                i++;
                if (i == song_ids.length) {
                    clearInterval(timer);
                }
            }, 1000);
            
        }
    });
}