// ==UserScript==
// @name dswat.net in-page samples.
// @description Turns the links to the MP3 samples of records @ dswat.net into HTML5 audio players.
// @match http://*.dswat.net/catalog/product_info.php*
// ==/UserScript==
var previews = window.document.querySelectorAll('img[alt="Click to listen"]');
    players = [];
Array.prototype.slice.call(previews).forEach(function (preview) {
    var player = window.document.createElement('audio');
    player.src = preview.parentNode.href;
    player.controls = player.autobuffer = true;
    preview.parentNode.parentNode.replaceChild(player, preview.parentNode);
    players.push(player);
    player.addEventListener('play', function (e) {
        players.forEach(function (player) {
            if (player != e.target) player.pause();
        });
    })
});
