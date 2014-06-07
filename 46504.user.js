// ==UserScript==
// @name           Link spreader help
// @author         Judaaz
// @description    deletes stuff from post
// @version        0.1
// @comment        click quote button, that's it.
// @include        http://*
// ==/UserScript==


var sub = document.forms[2].subject.value;
var subp = sub.replace( "Re: ", "" );
document.forms[2].subject.value = subp;