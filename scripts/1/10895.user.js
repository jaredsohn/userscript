// ==UserScript==
// @name           Self Adder Pro
// @namespace      Zamaan
// @description    Add Your Own Self As A Friend, Install This Java Script, You Need Greasy Monkey For It, And Mainly Mozilla Firefox .
// @include        http://www.orkut.com/Friends.aspx
// ==/UserScript==
javascript:add=document.forms[1];
add.action='FriendAdd.aspx?Action.yes&'+location.href.match(/uid=\d*/gi);add.submit();alert('User Added ;)'); void (0)