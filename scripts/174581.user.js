// ==UserScript==
// @name           Remove Coords
// @namespace      حرب القبائل
// @description	   Version 2.0
// @author         Aywac
// @include        http://ae*.tribalwars.ae/*
// ==/UserScript==

$("#message").each(function(){
    var $this = $(this);
    var t = $this.val();
    $this.val(t.replace(/coord/g,"").replace(/claim/g,"").replace(/player/g,"").replace(/]/g,"").replace(/\[/g,"").replace(/\//g,""));
});