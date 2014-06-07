
// ==UserScript==
// @name           Meteor
// @description    Automatically clicks the "Go" button when it logs you out.
// @include        http://www.mymeteor.ie/*
// @include        https://www.mymeteor.ie/*
// @include        http://www.mymeteor.ie/prepaylanding/*
// @include        https://www.mymeteor.ie/prepaylanding/*
// @version        1.0
// ==/UserScript==

buttonGo = document.getElementsByhref('/go/freewebtext')[0];
var A = document.createEvent("MouseEvents");
A.initEvent("click", true, true);
buttonGo.dispatchEvent(A);