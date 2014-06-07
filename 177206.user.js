// ==UserScript==
// @name        GrooveShark Now Plaing Title
// @namespace   GS-NPT
// @include     http://grooveshark.com*
// @version     1
// ==/UserScript==
var song;
var singer;
var song_bk;
var singer_bk;

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);var title;var song;var singer;var song_bk;var singer_bk;(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function getSong()
{
    singer = jQ('#now-playing-metadata a:first').html();
    song = jQ('#now-playing-metadata a:last').html();
    
    if(singer != singer_bk || song != song_bk)
    {
        title = singer+' - '+song+' | ';
    }
    
    
    $('title').html(title);
    setTimeout(function(){(getSong)();},500);
    
    si = title.substr(0,1)
    title = title.substr(1)+si;
    
    song_bk = jQ('#now-playing-metadata a:last').html();
    singer_bk = jQ('#now-playing-metadata a:first').html();
}




// load jQuery and execute the main function
addJQuery(getSong);
