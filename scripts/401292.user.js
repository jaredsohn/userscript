// ==UserScript==
// @name        RFK Revisited
// @namespace   RFK Revisited
// @include     http://radio.krautchan.net/
// @require     http://radio.krautchan.net/static/js/html5player.js
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @require     https://gist.github.com/raw/2625891/waitForKeyElements.js
// @version     1
// @grant       none
// ==/UserScript==

waitForKeyElements (
    "#np-dj", 
    missionsongtitel
);

function missionsongtitel() {
    // Div für Songtitel   
        var songtitel = document.createElement("h5");
        songtitel.setAttribute('id', 'nowPlayingTrack');
    songtitel.setAttribute('class', 'outline');
    songtitel.innerHTML = '<img src="/static/img/loader.gif" alt="Loader" class="loader" title="Loading..." />';
    songtitel.style.display = 'inline-block';

    
        var elmFoo = document.getElementById('np-dj');
        elmFoo.parentNode.insertBefore(songtitel, elmFoo.nextSibling);
    
    
    // Abfrage für Songtitel
        var interval = setInterval(function () {
            
            $.getJSON('/api/site/nowplaying', function(data) {
    
                if (!data.data.track) {
                    meta = "No tags available";
                }
                else {
                    meta = data.data.track.artist + ' - ' + data.data.track.title;
                }
        
                // if data is different update with nice effect
                if ( meta != _currentSong ) {
                    _currentSong = meta;
                    $('#nowPlayingTrack').fadeOut( 'normal', function() {
                        $('#nowPlayingTrack').html( meta );
                    });
                    $('#nowPlayingTrack').fadeIn( 'normal' );
                }
           });  
        }, 1000);
}