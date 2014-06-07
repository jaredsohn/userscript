// ==UserScript==
// @name          Hello World
// @namespace     http://diveintogreasemonkey.org/download/
// @description   example script to alert "Hello world!" on every page
// @include       http://en29.tribalwars.net/*
// @exclude       
// ==/UserScript==

function insertUnit(input, count) 
{
  if(input.value != count)
    input.value=count;
  else
    input.value='';
}
function insertNumber(input, count) 
{
  if(input.value != count)
    input.value=count;
  else
    input.value='';
}
 
insertUnit(document.forms[0].x,500);insertUnit(document.forms[0].y,500);insertUnit(document.forms[0].spear,0);insertUnit(document.forms[0].sword,0);insertUnit(document.forms[0].axe,0);insertUnit(document.forms[0].archer,0);insertUnit(document.forms[0].spy,0);insertUnit(document.forms[0].light,0);insertUnit(document.forms[0].marcher,0);insertUnit(document.forms[0].heavy,0);insertUnit(document.forms[0].ram,0);insertUnit(document.forms[0].catapult,0);insertUnit(document.forms[0].snob,0);
