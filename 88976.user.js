// Version 0.1 - Oct 27, 2010
// ==UserScript==
// @name          MRMP
// @namespace     Refresher for re-connection
// @description   Bla bla bla
// @include       http://apps.facebook.com/inthemafia/*
// @include       http://apps.new.facebook.com/inthemafia/*
// @include       http://facebook.mafiawars.com/*
// @include       http://toolbar.zynga.com/*
// @include       http://foo.*
// @include       http://foo.com/*
// @include       chrome://browser/*
// ==/UserScript==

//delay range in minutes
var delay1 = 24;
var delay2 = 36;
var delay = Math.floor((delay2 - (delay1 - 1)) * Math.random()) + delay1;

setTimeout(function() {
        window.location.href="http://toolbar.zynga.com/click.php?to=mwgamestatsplaynow";
        } , delay * 60 * 1000
    );