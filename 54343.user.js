// ==UserScript==
// @name         perldoc.perl.org-position-relative-fix
// @version      0.0.1
// @description  Replaces position: relative with position: absolute in perldoc.perl.org
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
