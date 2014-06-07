// Append Element within a (single) Tag
// version 0.0.1
// 2013-09-14
// Copyright (c) 2013, Rick Bychowski
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// ==UserScript==
// @name           Append Element within a (single) Tag
// @namespace      http://hiranyaloka.com/
// @include        http://launch.rosettastone.com/en/system_check/rs3*
// ==/UserScript==

// Set these four values 
var hostTag         = 'H1';  // Host Tag
var tagIndex        = '0'    // Tag Index (zero-based)
var insertedElement = 'a';   // Inserted Element
var appendedHTML    = '<a href="http://launch.rosettastone.com/en/launch/rs3?allowed_legacy_flash_version=true&disable_speech=false&system_check_passed=false">&nbsp;&nbsp; => ECDS Rosetta LogIn</a> <='

var host = document.getElementsByTagName(hostTag)[tagIndex];
var vector = document.createElement(insertedElement);
vector.innerHTML = appendedHTML;
host.appendChild(vector);