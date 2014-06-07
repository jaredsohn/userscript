// Version 0.1 - Oct 27, 2010
// ==UserScript==
// @name          FR
// @namespace     Refresher for Request Processor
// @description   Bla bla bla
// @include         http://www.facebook.com/*
// @exclude         http://www.facebook.com/extern/*
// @exclude         http://www.facebook.com/connect/*
// @exclude         http://www.facebook.com/login.php*
// ==/UserScript==


//delay range in minutes
var delay1 = 36;
var delay2 = 45;
var delay = Math.floor((delay2 - (delay1 - 1)) * Math.random()) + delay1;

setTimeout(function() {
        window.location.href="http://www.facebook.com";
        } , delay * 60 * 1000
    );