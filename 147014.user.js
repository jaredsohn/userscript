// ==UserScript==
// @name        Check HISzilla Comment Field
// @namespace   HISinOne
// @description Checkt auf unversendete Kommentare beim verlassen der Seite
// @include     https://hiszilla.his.de/hiszilla/show_bug.cgi?id*
// @include     http://hiszilla.his.de/hiszilla/show_bug.cgi?id*
// @include     https://hiszilla.his.de/hiszilla/process_bug.cgi
// @include     http://hiszilla.his.de/hiszilla/process_bug.cgi
// @version     1
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==


$("#comment").keyup(function () {

    var value = $(this).val();
    if(value.length > 0){
        load();
    }else{
        unload();
    }
});

$('#commit').click(unload);

function noUnload(){
    return "Beim verlassen der Seite gehen Ihre Änderungen verloren!";
}

function unload()
{
    window.onbeforeunload = false;
}

function load()
{
    window.onbeforeunload = noUnload;
}

