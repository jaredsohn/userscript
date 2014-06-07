// Facebook Classic Favicon User Script
// 2007-05-03
// Copyright (c) 2007, Tom Kropf
// http://userscripts.org/people/23412
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Facebook Classic Favicon", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Facebook Classic Favicon
// @namespace     http://swanky.de/greasemonkey/
// @description   Replaces Facebook's current favicon with the old one.
// @source        http://userscripts.org/scripts/show/9014
// @include       http://*.facebook.com/*
// @include       http://facebook.com/*
// @include	  https://*.facebook.com/*
// @include	  https://facebook.com/*
// @version       0.0.1
// ==/UserScript==

// Squirrels are your friends!

var pitas = document.createElement('link');
pitas.setAttribute('rel', 'shortcut icon');
pitas.setAttribute('href', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAANbY1E9YMgAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAKLUExURe7w9dTb5%2Bzv9MLM3uLo9e3w9dfd6Ont8%2Bru86S11u7z%2FMjR4f%2F%2F%2F8DK3KKyzqm30aOyzuLm7pqryert8%2Bzu8%2F7%2F%2F7jE2fDy9ujs8uns8panx5Slxt%2Fl8%2B%2Fy9s3W48fP4Ovy%2BpuryPf4%2BrzH2vb6%2F7vG2p%2Buy8HK3eTr9sXP38fP377J3MjU6aO11rrE2rnF2Zut0e3w9KGz1Z%2B13KS21vT2%2Bejr8qO11dzk89Te7unt8vHy9%2Bzx%2B5epx6681MPN3qe10Jusytvk8ai20fP2%2BOTo77zH2%2Bvv8vv9%2F%2B3w8%2FP2%2Fo%2BjxLTB19Pa5%2FX5%2F8rU6J6y0%2Brt8ebs%2BJuryufr8vHy9tzh6%2BXo8LbF36i5197j66GxzaOyze%2Fz98vU5%2Ff6%2Fqm52XePur%2FK3q6%2B2uTn7%2B%2Fy98nS45WnyLO%2F1eDn9ePn8K2606SzzbbC2IuewpOlxp6uy6u40qu50rnF2rO%2B1sbP4N3i6%2BDo9Zapyau40bfD2Nzi65Omxpmqytrg67%2FJ3O3u87bB1%2FP1%2BK%2B81LrF2sjQ4ePq99PZ5urt9PT2%2BNLb7c3U5Ky605Kkxe%2Fx9Y2fwuzu9OTq9efq8LbB2dXa54ygwtnf6tXc59Xb5%2Bvx%2B%2BTp8aW31%2BLm732Uutrh6%2BXp8ZipydXc6cjT6eDl7oufwp2ty4yfwrTA15mqyOHo9bG91Oru9J6uzPX3%2BPL0%2BNfd6cPM3t3i7JKlxuTo8Ky825WnxrnE2ezv9fDx9uTp8NTa5%2BPr9u7y9r3I3OPp9dPb6ODl7eXq99zk8pepyPr7%2FMjR4Ort8sDJ3dLY5ZSmx6CvzOvu8%2B31%2F%2B%2Fy9e%2Fz9rnE2vD2%2FcXR5%2B3w9qq50bC91dDa7LXD3pmryZyty0yrQmMAAAEeSURBVHjaABAB7%2F4ANV%2BcLkxGDc%2BTpysDFr2EXgAUDDmbY1gJLTcwNFkyCVAzAEkKJxtwqGF8bJ2mGltcpdYAuDhyyoElfbZz1w4aDyYOTwBVQqSqeD1DAxgLZxBBG7XVAM67wwuMU3oXHRCVEtiNb8IABSBAZiI%2BI61lYm6LbY%2BwkQAFCmtxxB7IzTpadK4voAa%2BAIDQxUuHmgAHs2SQgh%2FTBgQAAkoGyaMCtwdXEzYdFmiWBAAAPCp%2FXUfGq4i8UYV5Aa%2FBABeGD7E7CBMxB565rINWlBwAAJnHABnLBQgRdQ2yA35NaQCOSLpqkgJ7wNKh1CG%2FlwF3AIkVRREUGRgpn1QSP3aYAakARAyKUhVOJCxg0bSiKAQczAIMAGGIXVwET1%2F4AAAAAElFTkSuQmCC");

var head = document.getElementsByTagName('head')[0];
head.appendChild(pitas);

// 0.0.1	Initial release.