// ==UserScript==
// @name         perldoc.perl.org-get-rid-of-position-fixed
// @version      0.0.1
// @description  Gets rid of the floating (position: fixed) header in perldoc.perl.org
// @author       Shlomi Fish ( http://www.shlomifish.org/ )
// @include      http://perldoc.perl.org/*
// ==/UserScript==
// ===============================================================

//
// License is X11 License:
// http://www.opensource.org/licenses/mit-license.php

unsafeWindow.onscroll = null;

unsafeWindow.addEventListener( "load", function () {         
    unsafeWindow.onscroll = null;
    }
); 
