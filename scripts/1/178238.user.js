// ==UserScript==
// @name        Circumvent YouTube age limit
// @description Bypasses video age limits on YouTube.
// @namespace   http://ajf.me
// @version     1.1.3
// @include     /^https?://(www)?\.youtube\.com/watch?.*$/
// ==/UserScript==
window.onload = (function () {
    var playerUnavailable;
    playerUnavailable = document.getElementById('player-unavailable');

    // #player-unavailable isn't there for some reason, give up
    if (playerUnavailable === null)
        return;

    var classNames;
    classNames = playerUnavailable.className.split(' ');

    // #player-unavailable is hidden - no problem here
    if (classNames.indexOf('hid') !== -1)
        return;

    // Not unavailable because of age limit, some other reason
    if (document.getElementById('watch7-player-age-gate-content') === null)
        return;

    // Split query parameters
    var queryString, pairs, i, pair, queryParameters;
    queryString = window.location.search.substr(1);
    pairs = queryString.split('&');
    queryParameters = {};
    for (i = 0; i < pairs.length; i++) {
        pair = pairs[i].split('=');
        queryParameters[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }

    videoID = queryParameters.v;

    // Make video player
    document.getElementById('player-unavailable').style.display = 'none';
    var embed;
    moviePlayer = document.createElement('embed');
    moviePlayer.id = 'movie_player';
    moviePlayer.bgcolor = '#000000';
    moviePlayer.allowfullscreen = 'true';
    moviePlayer.allowscriptaccess = 'always';
    moviePlayer.name = 'movie_player';
    moviePlayer.src = '/v/' + videoID + '?version=3&autoplay=1&rel=0';
    moviePlayer.type = 'application/x-shockwave-flash';

    // Make video player container not offscreen
    document.getElementById('player-api').style.position = 'static';

    // YouTube changed something and now there's already a broken player in there
    // So let's get ahold of it
    var badPlayer = document.getElementById('movie_player');

    // Append!
    document.getElementById('player-api').appendChild(moviePlayer);
    
    // Remove bad player
    document.getElementById('player-api').removeChild(badPlayer);
}());
