// ==UserScript==
// @name           Facebook Bierjunge
// @namespace      http://projekte.altajo.de
// @include        *.facebook.com*
// ==/UserScript==

var likes = document.getElementsByClassName("default_message");
for(var i = 0; i < likes.length; i++){
    likes[i].innerHTML = "H&auml;ngt!";
    likes[i].title = "Daf&uumlr h&auml;ngt was!";
}
var dislikes = document.getElementsByClassName("saving_message");
for(var i = 0; i < dislikes.length; i++){
    dislikes[i].innerHTML = "H&auml;ngt doch nicht.";
    dislikes[i].title = "Ich kniese... Bier schmeckt mir nicht.";
}

//var jq = document.createElement('script');
//jq.src = 'http://code.jquery.com/jquery-latest.js';
//jq.type = 'text/javascript';
//document.getElementsByTagName('head')[0].appendChild(jq);

//jQuery("button.like_link span.default_message").html("Hängt!");