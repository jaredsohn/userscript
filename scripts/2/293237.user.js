// ==UserScript==
// @name       Bender-Racefaces-Repleceator
// @namespace  http://kamelstall.de/
// @version    0.4
// @description  enter something useful < Thats useful!
// @match      http://forum.mods.de/*
// @copyright  2012+, You
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// ==/UserScript==
$j = jQuery.noConflict();

var makeEmFaces = function(allTheFaces) {
    $j('tr[username]').each(function(i,tr){
        var userid = $j('a[onclick*=openProfile]', tr).first().attr('onClick').replace(/^.+\((.*)\)/g,'$1');
        
        // http://alltheragefaces.com/api/face/426
        var rageid = userid % allTheFaces.length + 1;
        $j('img[src*=avatar]', tr).attr('src', allTheFaces[rageid]['png']).css('width', '125px');
    }); 
};


// load ragefaces >:-O
var allTheFaces = null;
var now = +new Date; // obvious obfuscation
if (GM_getValue('faceAge', 0) > (now-(3600000*24))) {
    allTheFaces = GM_getValue('allTheFaces', null);
}

if (allTheFaces == null) {
    $j.get('http://alltheragefaces.com/api/all/faces', function(data){
        makeEmFaces($j.parseJSON(data));
        GM_setValue('allTheFaces', data);
        GM_setValue('faceAge', now);
    });
}
else {
    makeEmFaces($j.parseJSON(allTheFaces));
}