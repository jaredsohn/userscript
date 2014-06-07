// ==UserScript==
// @name           SoundCloud Comments removal
// @description    Removes annoying comments from SoundCloud audio
// @author         Chris Van Oort
// @include        http://*
// @version        1.0
// ==/UserScript==

function removeComments(){
    var ret = document.getElementsByClassName("timestamped-comments");
    var i = 0;
    for (i = 0; i < ret.length; i++)
    {
        ret[i].style.visibility = 'hidden';
    }
}
setInterval(removeComments, 1000);