///////////////////////////////////////////
//
// ==UserScript==
// @name	IC Styles
// @author	Momentum
// @version	0.0.4
// @namespace	http://userscripts.org/scripts/show/38002
// @description	0.0.4 - Modifies IC CSS styles
// @include	http://www.imperialconflict.com*
// @require     http://sizzlemctwizzle.com/updater.php?id=38002
// ==/UserScript==
//
///////////////////////////////////////////

///////////////////////////////////////////
//
// Copyright (C) 2008
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or any
// later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
///////////////////////////////////////////

(function() {try {

  var head, style;
  head = document.getElementsByTagName('head')[0];
  if (head) {
    style = document.createElement('style');
    style.type = 'text/css';
    if (window.location.href.match(/imperialconflict\.com\/forum/gi)) {
      style.innerHTML = 'body { background: #000000 ! important; }';
    } else {
      style.innerHTML = 'a:hover { color: blue ! important; }';
    }
    style.innerHTML += '.statusData { background-color: transparent; }';
    style.innerHTML += '.title { border-color: #CCCCCC; }';
    style.innerHTML += 'a { text-decoration: none ! important; }';
    style.innerHTML += 'a.icFamilyLink[relation="ally"]:hover { color: #8888FF ! important; } ';
    style.innerHTML += 'a.icFamilyLink[relation="nap"]:hover  { color: yellow  ! important; } ';
    style.innerHTML += 'a.icFamilyLink[relation="war"]:hover  { color: red     ! important; } ';
    style.innerHTML += 'a.icFamilyLink[relation="me"]:hover   { color: green   ! important; } ';
    head.appendChild(style);
  }

} catch(e) {dump('IC Styles Error ('+e.lineNumber+'): '+e+'\n')} })();