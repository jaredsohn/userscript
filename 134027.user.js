// ==UserScript==
// @name           Leave Editsite Check
// @namespace      wiki
// @version        2
// @description    Checks if the user really want to leave the wiki edit page
// @include        https://wiki.his.de/*action=edit*
// @include        https://wikint.his.de/*action=edit*
// @include        http://wiki.his.de/*action=edit*
// @include        http://wikint.his.de/*action=edit*
// @include        https://wiki.his.de/*action=submit*
// @include        https://wikint.his.de/*action=submit*
// @include        http://wiki.his.de/*action=submit*
// @include        http://wikint.his.de/*action=submit*
// @grant          none
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js
// ==/UserScript==

$('#wpTextbox1').keyup(load);

//WikiEd compatible
$("#wikEdFrame").ready(function(){
    load();
});

$('#wpSave').click(unload);
$('#wpPreview').click(unload);
$('#wpDiff').click(unload);

function noUnload()
{
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