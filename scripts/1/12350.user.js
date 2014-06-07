// JavaScript Document
// Youtube Fullscreen in Browser Window redirector script
// version 1 (2007-10-03, night/morning CST)
// Copyright (c) 2007 Devin Lieberman <fuzzyhampster93@gmail.com>
//
// Big thanks to Leslie Hoare <sadako@gmail.com> who made the script actually work!
//
// This work is licensed under the Creative Commons Attribution 2.5 License.
// To view a copy of this license, visit http://creativecommons.org/licenses/by/2.5/
// or send a letter to Creative Commons, 543 Howard Street, 5th Floor,
// San Francisco, California, 94105, USA.
//
// WARNING: You Really don't need to add sites, IT WILL BRAKE THE SCRIPT ANYWAYS!!!
//
// ==UserScript==
// @name    Youtube Fullscreen Redirector
// @description    Redirects YouTube videos to the full screen version. Big thanks to Leslie Hoare for fixing the script!
// @include    http://www.youtube.com/watch?v=*
// @include    http://*youtube.com/watch?v=*
// @exclude    http://www.youtube.com/v/*
// @exclude    http://*youtube.com/v/*
// ==/UserScript==

(function(){
    var matches = /watch\?v=([a-zA-Z0-9_-]{11})/.exec(location.href);
    if(matches)
        location.replace("http://www.youtube.com/v/" + matches[1]);
})();