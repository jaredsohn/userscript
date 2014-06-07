// ==UserScript==
// @name       Grooveshark playlist download
// @namespace  GrooveSharkPlaylistDl
// @version    0.1
// @description  Gets grooveshark playlist
// @include        https://grooveshark.com/#!/playlist/*
// @include        http://grooveshark.com/#!/playlist/*
// ==/UserScript==


function getSongs() {
  var playlist = {};
  $(".module.module-row.song.grid-item").each(function(){
      var song = $(this).find(".module-row-cell.song span").html();
      var artist = $(this).find(".secondary-text.tooltip-for-full-text").html();
      playlist[song] = artist;
  });
  json_playlist = JSON.stringify(playlist);
  displayMsg = json_playlist;
  alert(displayMsg);
}


function main() {
    var btn = $('<button/>',
    {
        text: 'Get Playlist',
        click: function () { getSongs(); },
        style: 'margin-left:50px;'
    });

  btn.insertAfter(".stat-summary")
}

window.addEventListener('load', function() {
    setTimeout(main, 5000);
},false);
