// ==UserScript==
// @name           iGoolge 3 columns 1st to 50%
// @namespace      dio
// @description    modify the columns of the igoogle 3 column layout as follow: 50% 25% 25%
// @include        http://www.google.com/ig*
// ==/UserScript==


var column_one = document.getElementById("c_1");
column_one.style.width = "50%";
var column_two = document.getElementById("c_2");
column_two.style.width = "25%";
var column_three = document.getElementById("c_3");
column_three.style.width = "24%";
var header = document.getElementById("nhdrwrapsizer");
header.style.height = "60px";
var footer = document.getElementById("footerwrap");
footer.style.height = "0px";
var undo_box = document.getElementById("undo_box");
undo_box.style.position = "absolute";
undo_box.style.top = "2px";
undo_box.style.right = "410px";