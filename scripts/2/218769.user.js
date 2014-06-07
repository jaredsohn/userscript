// Copyright 2013 Mahdi Kheirkhah under GPL v2 or later
// mahdi.kheirkhah@yahoo.com
//

// ==UserScript==
// @name          Modify Content
// @namespace     http://userscripts.com/users/modcon
// @description   Replaces the "\\n" with a blank
// @include       http://nava.kashanu.ac.ir/OfficeAS/UI/index.php
// ==/UserScript==

var box = document.getElementById("MSG-VIEW-TEXT");
var text = box.value;
var find = "\\n";

box.value = text.replace(new RegExp(find, 'g'), '');