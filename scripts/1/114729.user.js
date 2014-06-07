// Clarity Timesheet Script!
// Copyright (c) 2010, Capgemini Deutschland
// Infos auf http://sww.sdm.de/app/snuggets/Technik/Clarity
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Clarity Timesheet Script", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Clarity holiday visual enhancer
// @namespace      http://www.capgemini.com/ts/csd/clarity
// @description    Highlights nonbusiness days within the clarity timesheet
// @include        htt*://*.capgemini.com/niku/app?action=timeadmin.editTimesheet*
// ==/UserScript==

document.body.innerHTML = document.body.innerHTML + "<style type=\"text/css\">.calNonWorking{background-color: #434043 !important; color: white !important;}</style>";