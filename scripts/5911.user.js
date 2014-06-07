// ==UserScript==
// @name           SweClockers.com title fixer
// @namespace      http://alvsbyn.nu/~anton
// @description    Strips "SweClockers.com - Forum:" from page titles. Thanks to Henrik Nyh and his script Strip tab prefixes [1] for inspiration. [1] http://userscripts.org/scripts/show/1582
// @include        http://sweclockers.com/forum/*
// @include        http://www.sweclockers.com/forum/*
// ==/UserScript==

t = document.title;
i = t.indexOf('Forum: ');

if (document.title != 'SweClockers.com - Forum') document.title = t.substring(i + 7);