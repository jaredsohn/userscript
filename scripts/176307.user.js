// ==UserScript==
// @name       Next episode script for AnimeUltima
// @namespace  http://varemenos.com
// @version    0.1
// @description  enter something useful
// @match      http://www.animeultima.tv/*-episode-*/
// @copyright  2012+, Adonis K.
// ==/UserScript==

var x = location.pathname;
var episode = {
    number: 0,
    next: 1,
    nexturl: "",
    name: ""
};

var y = "-episode-";

var number_start = x.search(y) + y.length;
episode.number = x.substr(number_start);
episode.number = parseInt(episode.number.substr(0, episode.number.length-1));
episode.next = episode.number + 1;
episode.name = x.substr(0, x.search(y));
episode.nexturl = "http://animeultima.tv/" + episode.name + y + episode.next + "/";

// create event listener that listens to the shortcut "N"
$("html").keypress(function(e){
    if(e.charCode == 110){
        // console.log(episode.nexturl);
        location.href = episode.nexturl;
    }
});