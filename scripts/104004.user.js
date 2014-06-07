// ==UserScript==
// @name          Classic Google
// @namespace     MVGM_soft (at) yahoo.com
// @author        MVGM (Mohammad Ali Varasteh)
// @version       0.0.2 (beta)
// @description	  Restore the Classic (basic) google image search
// @include       *.google.*/search*tbm=isch*
// @exclude       *&sout=1*
// ==/UserScript==


var loc = window.location.href; 
    window.location = loc +"&sout=1"