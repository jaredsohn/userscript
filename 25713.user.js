// DLFP SSL Greasemonkey script
// Copyright (c) 2008 Alexis ROBERT
// Under the terms of the MIT license
//
// ==UserScript==
// @name LinuxFR SSL v0.1
// @namespace http://alexis.robertlan.eu.org/greasemonkey/
// @description Always redirect to linuxfr's SSL version
// @include http://linuxfr.org/*
// ==/UserScript==

document.getElementsByTagName('body')[0].innerHTML = "<div style='font-weight: bold; font-size: 2em; text-align: center;'><p>SSL SAIBIEN.</p><p>Veuillez patienter pendant que nous vous remettons dans le droit chemin ...</p></div>";
document.location.href = document.location.href.replace(/http:\/\/linuxfr.org/,'https://linuxfr.org');
