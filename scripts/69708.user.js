// DLFP LinuxFrForumSansResume Greasemonkey script
//
// ==UserScript==
// @name LinuxFrForumSansResume v0.1
// @namespace http://linuxfr.org/forums/
// @description hide the summary of the threads
// @include http://linuxfr.org/forums/*
// ==/UserScript==
//
/*
  ------------------------------------------------------------------
     made by sputnick in da FreAkY lApPy lAb (c) 2010
     gilles.quenot <AT> gmail <DOT> com

     This program is free software; you can redistribute it and/or
     modify it under the terms of version 2 of the GNU General Public
     License published by the Free Software Foundation.
  ------------------------------------------------------------------
    ,,_
   o"  )@
    ''''
  ------------------------------------------------------------------

  vim:ts=4:sw=4

*/

if (window.location.href == "http://linuxfr.org/forums/")
	window.location.replace('http://linuxfr.org/forums/index2,,.html');

