/*

Slacky Repository to mirror redirect

Public Domain - created by ZeroUno (2009)

*/

// ==UserScript==
// @name        Slacky-Repository redirect
// @description Redirects automatically to a mirror of Slacky.eu
// @version     0.2
// @include     http://repository.slacky.eu/slackware-12.2/*
// @include     http://repository.slacky.eu/slackware-13.0/*
// @include     http://repository.slacky.eu/gnome-slacky-12.1/*
// ==/UserScript==

/* select your preferred mirror */

// Slackware-12.2 packages
//var mirror = "http://dogbert.no-root.org/";
//var mirror = "http://slack.isper.sk/pub/";


// Slackware-12.2, Slackware-13.0, GnomeSlacky-12.1
// var mirror = "http://filer-1.filearena.net/pub/slackware/addon/slacky/"
var mirror = "http://darkstar.ist.utl.pt/slackware/addon/slacky/";




if (window.location.href.match("http://repository.slacky.eu")) {
var slackyUrl = window.location.href;
var urlArray = slackyUrl.split("repository.slacky.eu/");
var targetUrl = mirror + urlArray[1];
window.location = targetUrl;
}
