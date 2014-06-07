// YGPAO
// Made By Josh Witt
//
//
// ==UserScript==
// @name              Yahoo Groups Photo Album Optimizer
// @description       Optimizes Yahoo Groups Album Experience
// @include           http://groups.yahoo.com/group/*/photos/album/*/pic/*/view?picmode=&mode=tn&order=ordinal&start=1&count=*&dir=asc
// @exclude           *view?picmode=original&mode*
// ==/UserScript==

	location.href = location.href.replace ('view?picmode=&mode', 'view?picmode=original&mode=tn&order=ordinal&start=1&dir=asc');