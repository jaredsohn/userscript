// STFU with your adverts
// (C)Copyright February 2010 - Allan K Preston
// Distributed under the GPLv3
//
// ==UserScript==
// @name		AboveTopSecret Fix
// @description		ATS Fix. Recently a popular conspiracist website deployed some technology that detects the presence of advertisment blocking programs/addons, and when detected, displays an irritating overlay on top of their page, making the site unusable until you unload the addon/program. How their detection works, I do not know, but I get rid of their overlay by simply changing its css display property to "none". Note to ATS: I have no objection to the adverts, and had you asked nicely, I would have told ABP to whitelist your domain, but when you start deploying technical "solutions", I will just counter with my own.
// @include		http://www.abovetopsecret.com/*
// @include		http://abovetopsecret.com/*
// ==/UserScript==

document.getElementById('ffall').innerHTML=''
document.getElementById('ffall').style.display='none'
