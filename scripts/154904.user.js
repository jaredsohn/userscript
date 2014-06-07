                                                                     
                                                                     
                                                                     
                                             
// ==UserScript==
// @name         Centered Youtube
// @namespace    http://www.technikov.com/
// @description  The script aligns the new 2013 YouTube layout in the center of your browser. 
// @include      *.youtube.com/*
// @match        http://*.youtube.com/*
// @match        https://*.youtube.com/*
// @include      https://*.youtube.com/*
// @include      http://*.youtube.com/*
// @version      1.5
// @copyright    2013, Konstantin Budnikov and Ryan Laguna 
// @license      (CC) Attribution Share Alike; http://creativecommons.org/licenses/by-sa/3.0/
// @icon         http://img515.imageshack.us/img515/9339/youtubeuw.png
// @grant        none
// ==/UserScript==


// Applies backgrounds.
document.body.style.background = '#f1f1f1';
document.getElementById('body-container').style.background = 'white';

// Sets width and centers page.
document.getElementById('body-container').style.maxWidth = '1304px';
document.getElementById('body-container').style.marginLeft = 'auto';
document.getElementById('body-container').style.marginRight = 'auto';
document.getElementById('footer-container').style.cssText = 'max-width: 1304px !important';
document.getElementById('footer-container').style.marginLeft = 'auto';
document.getElementById('footer-container').style.marginRight = 'auto';