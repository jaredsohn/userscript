// ==UserScript==
// @name           Spotify + MusicBrainz
// @description    Insert Spotify links on MusicBrainz website
// @version        2012.12.30.1
// @author         Aurelien Mino <aurelien.mino@gmail.com>, based on the userscript Spotify + Last.fm (http://emil.hesslow.se/spotify/spotify__lastfm.user.js)
// @namespace      http://userscripts.org/users/40229
// @include        http://*musicbrainz.org/artist/*
// @include        http://*musicbrainz.org/release-group/*
// @include        http://*musicbrainz.org/release/*
// @include        http://*musicbrainz.org/label/*
// @include        http://*musicbrainz.org/recording/*
// @include        http://*musicbrainz.org/work/*
// @include        https://*musicbrainz.org/artist/*
// @include        https://*musicbrainz.org/release-group/*
// @include        https://*musicbrainz.org/release/*
// @include        https://*musicbrainz.org/label/*
// @include        https://*musicbrainz.org/recording/*
// @include        https://*musicbrainz.org/work/*

// ==/UserScript==

var scr = document.createElement("script");
scr.textContent = "(" + insert_spotify_links + ")();";
document.body.appendChild(scr);

function insert_spotify_links() {

    // Creates a link element
    function createLink(type, name, artists) {
	    var q = [];
	    if (type == 'artist') {
        	q.push('artist%3a%22'+ encodeURIComponent(name) +'%22');
	    } else if (type == 'release' || type == 'release-group') {
		    q.push('album%3a%22'+ encodeURIComponent(name) +'%22');
	    } else if (type == 'recording' || type == 'work') {
		    q.push('track%3a%22'+ encodeURIComponent(name) +'%22');
	    }
        if (artists) {
            q.push('artist%3a%22'+ encodeURIComponent(artists) +'%22')
        }

        var a = document.createElement('a');
        a.href = 'spotify:search:'+ q.join('%20');
        a.title = 'Listen in Spotify'
        a.setAttribute('spotifyLink', true);
        var img = document.createElement('img');
        img.style.border = 'none';
        img.style.marginLeft = '3px';
        img.src = 'data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAGlJREFUeNpi%2BP%2F%2FPwMMuy1j%2BA%2FEBchiIMzEgAn63ZczzkcWwKaoEYgdgAr7cSraGfm%2FAUgZAnECPpNACj8AqQd4FQGtKgBSB2B8FqigArLxQPABaNoEFEVAcB6IBZCsW4DPdwewWQ8QYACnBy8V7gSvaAAAAABJRU5ErkJggg%3D%3D';
        a.appendChild(img);
        return a;
    }

    // Handles primary topic of a page (release-group, release, recording, work)
    if (m = window.location.href.match(/(artist|release-group|release|recording|work)/)) {

        var entity_type = m[1];
        var entity_name = $('#content h1 a:first').text();
        
        var subheader = $.trim($('#content h1~p.subheader').text());

        var entity_artist;
        if (m = subheader.match(/ by (.*)/)) {
            entity_artist = m[1];
        }
        
        // Create Spotify link for entity
        var link = createLink(entity_type, entity_name, entity_artist);
        $('#content h1 a:first').after(link);
        
        // Create Spotify links for artists
        if($('#content h1~p.subheader').length > 0) {
        
            $.each($('#content h1~p.subheader a[href*="/artist/"]'), function(index, artist_link) {
                var spotify_link = createLink('artist', $(artist_link).text());
                $(artist_link).after(spotify_link);            
            })
        
        }
    }

}


