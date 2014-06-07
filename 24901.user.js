// Dnevnik.hr Video Downloader
// Version 0.1

// Copyright (c) 2008 by Darko Prelec
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name          Dnevnik.hr Video Downloader
// @namespace     http://www.warezhr.org
// @description   Simple script to download videos from Dnevnik.hr
// @include       http://dnevnik.hr/*
// @include       http://www.dnevnik.hr/*
// ==/UserScript==

var section = unsafeWindow.section_video;
var dir     = unsafeWindow.media_dir;
var file    = unsafeWindow.media_filename;

var link = 
    'http://streamflv.dnevnik.hr/' 
    + section + '/'
    + dir     + '/'
    + file;

var link_lo = link + '-1.flv';
var link_hi = link + '-2.flv';


var myparent = document.getElementById('video');
makeLink(myparent, link_lo, 'Download Video in Low Quality');
makeLink(myparent, link_hi, 'Download Video in High Quality');


// from: http://www.pxl8.com/createElement.html
function makeLink(myparent, link, message) {
    var newLink=document.createElement('a');
    newLink.setAttribute('href', link);
    newLink.setAttribute('target', '_blank');

    var linkText=document.createTextNode(message + ' ');

    newLink.appendChild(linkText);
    myparent.appendChild(newLink);
    
    return true;
}