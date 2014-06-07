// ==UserScript==
// @name          Cutest
// @description  Cutest Contest Cheat
// @author        baabthe
// @include       http://apps.facebook.com/cutestbaby/challenge/*
// ==/UserScript==

var Pagez= document.URL
var GOTOIT= Pagez.substring(46)


onload: location.href= "http://apps.facebook.com/cutestbaby/cast_vote/" + GOTOIT + "?contest_id=35&vote=1&is_weekly=y";