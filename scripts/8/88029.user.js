// ==UserScript==
// @name          Copy Salesforce Setup Link
// @version       1.0.0
// @date          2010-10-01
// @description    Copies the Setup links to the header in the new User Interface (Winter '11)
// @include        https://*.salesforce.com/*
// @include        https://*.visual.force.com/*
// ==/UserScript==
//
// Copyright (c) 2010, Eric Howard (http://www.synergis.com)
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ================
//
// This is a Greasemonkey user script: http://greasemonkey.mozdev.org/
// To use it, install Greasemonkey, restart Firefox, revisit this script, and click on install.
//
// ================

var userNavArea = document.getElementById('userNav');

var setupNav = document.createElement("a");
setupNav.href = "/ui/setup/Setup";
setupNav.innerHTML = 'Setup';

userNavArea.parentNode.insertBefore(setupNav,userNavArea);
