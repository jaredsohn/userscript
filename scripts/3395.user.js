/*
    Focus right frame on www.bloglines.com
    (c) 2006 Carsten Clasohm
    http://www.clasohm.com/

    Copy, use, modify, spread as you see fit.
*/

// ==UserScript==
// @name            Bloglines Focus
// @namespace       http://www.clasohm.com
// @description     Sets the focus on Bloglines' article frame. (2006-02-28)
// @include         http://www.bloglines.com/myblogs_display*
// ==/UserScript==

parent.frames[1].focus();
