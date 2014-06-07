// ==UserScript==
// @name       Travian Crop Finder
// @namespace  http://travian-tools.co.cc/cropfinder.php
// @version    0.1
// @description  Travian Crop Finder
// @match      http://t*.travian.*/*
// @copyright  2012+, Me
// ==/UserScript==


var link = document.createElement('a');
link.setAttribute('href', 'http://travian-tools.co.cc/cropfinder.php');
link.innerHTML = "CROP FINDER";
link.style.color='red';

var table = document.getElementById('stime').appendChild(link); ;