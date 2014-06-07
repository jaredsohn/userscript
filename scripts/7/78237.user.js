// ==UserScript==
// @name       Remove Reuters Comments
// @namespace  kchmck
// @include    http://www.reuters.tld/article/*
// @include    http://reuters.tld/article/*
// @require    http://userscripts.org/scripts/source/44063.user.js
// ==/UserScript==

// This is free software. It comes without any warranty, to the extent permitted
// by applicable law. You can redistribute it and/or modify it under the terms
// of the Do What The Fuck You Want To Public License, Version 2, as published
// by Sam Hocevar. See http://sam.zoy.org/wtfpl/COPYING for more details.

$(window).addEvent("load", function () {
  $$(".articleComments").dispose();
});
