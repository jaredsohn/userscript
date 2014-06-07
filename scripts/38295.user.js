// Yahoo Groups Album List Extender
// Made By Josh Witt
//
//
// ==UserScript==
// @name              Yahoo Groups Photo Album List Extender
// @description       Extends The Number of Photos Shown At Once
// @include           http://groups.yahoo.com/group/*/photos/album/0/list
// @include           http://groups.yahoo.com/group/*/photos/album/*/pic/*/list
// @include           http://groups.yahoo.com/group/*/photos/album/*/pic/list
// @include           http://groups.yahoo.com/group/*/photos/album/*/pic/*/list?mode=tn&order=ordinal&start=1&&
// ==/UserScript==

	location.href = location.href.replace ('list', 'list?mode=tn&order=ordinal&start=1&&count=1000&dir=asc');