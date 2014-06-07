// ==UserScript==
// @name          DreamHost Rewards Reorganizer
// @namespace     http://squarefree.com/userscripts
// @description   Puts the "You currently have $X.XX of Rewards payments built up!" block at the top.
// @include       https://panel.dreamhost.com/index.cgi?tree=home.rew&
// ==/UserScript==

/*

  Author: Jesse Ruderman - http://www.squarefree.com/
 
*/


// Overview: we want to move block3 before block1, keeping the spacing reasonable.

// block1  br1  block2  br2  block3
// <table> <br> <table> <br> <table>


// Block3 contains the only <select> on the page.  Use this to find block3.

var block3 = document.getElementsByTagName("select")[0]
.parentNode.parentNode.parentNode
.parentNode.parentNode.parentNode
.parentNode.parentNode.parentNode.parentNode;


// Find the other elements.

var br2 = block3.previousSibling.previousSibling;
var block2 = br2.previousSibling.previousSibling;
var br1 = block2.previousSibling.previousSibling;
var block1 = br1.previousSibling.previousSibling;


// Move br2 and block3 to the top.

block1.parentNode.insertBefore(block3,block1);
block1.parentNode.insertBefore(br2,block1);
