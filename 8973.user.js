// ==UserScript==
// @name          Principal.com Login
// @namespace     http://palamarchuk.net
// @description   Automatically selects "Personal" login type
// @include       https://*.principal.com/signon/initial/
// ==/UserScript==
//
// ==RevisionHistory==
// Version 1:
// Released: 2007-05-01.
// Initial release.
// ==/RevisionHistory==

// Copyright: Andriy Palamarchuk 2007 (apa3a_at_yahoo_dot_com)
// License:
//     Mozilla Public License, version 1.1 or later
//     General Public License, version 3.0 or later
//
// Contact me if you have questions, suggestions.
//
// DESCRIPTION
//
// This script fixes an annoying detail about login form on Principal.com.
// One always has to select "Personal" login type, like the site could
// not remember this on the first time in a cookie.
// This very simple script automatically selects "Personal" login type.
//
// INSTALLATION
//
// See http://diveintogreasemonkey.org/install/userscript.html for information
// how to install a Greasemonkey script.

document.getElementById("personallogin").click();
