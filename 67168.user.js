// ==UserScript==
// @name           Fix NinjaVideo for Linux
// @namespace      whatever
// @description    Fixes latest broken ninjavideo helper on linux
// @include        http://127.0.0.1*/*
// ==/UserScript==
var theMoviePage = document.body.innerHTML.replace(/127.0.0.1:64653\/(www.*megaupload.*avi)/g, '/$1');

if (theMoviePage != document.body.innerHTML) {

    //just link straight to the video not through the helper
    document.body.innerHTML = document.body.innerHTML.replace(/127.0.0.1:64653\/(www.*megaupload.*avi)/g, '/$1');

    //give the first div containing the movie object an id
    document.body.innerHTML = document.body.innerHTML.replace(/<div/, "<div id='moviediv'");

    //hide the player div until we're actually allowed to connect
    document.getElementById('moviediv').style.display = 'none';

    // can't use document.write here for some reason? FireFox is throwing a security **** fit about it
    try {
        document.body.innerHTML = "<div align='center' id='downloadcounter'>Sorry, you've got to wait <div id='countdown' style='font-size: 24px; font-weight: bold; font-family: arial;'>1</div> seconds</div>" + document.body.innerHTML;
    } catch(e) {
        alert(e);
    }

    // we have to wait due to megaupload's changes
    count = 46;

    function countdown() {
        if (count > 0) {
            count--;
            if (count == 0) {
                document.getElementById('moviediv').style.display = '';
                document.getElementById('downloadcounter').style.display = 'none';
            }
            if (count > 0) {
                document.getElementById('countdown').innerHTML = count;
                window.setTimeout(countdown, 1000);

            }
        }

    }
    countdown();

}
