// ==UserScript==
// @id             KATz unframe
// @name           KATz unframe
// @namespace      KATz
// @description    KATz unframe
// @include        http://katz.cd/download/*
// @include        http://www.katzporn.com/download/*
// ==/UserScript==

document.location.href=document.querySelector('#container>iframe').src;