// version 1.0
// Copyright (c) 2006, Narga Labs. http://www.narga.net
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
// ==UserScript==
// @name           Digg Forward 1.0
// @namespace      http://www.narga.net
// @description    Forward you to target page and skip Digg Website when you browser Digg via Internet Browser and RSS Reader.
// @include        http://digg.com/*/*
// ==/UserScript==var t = document.getElementById('title');window.location = t.getElementsByTagName('a')[0].href;
