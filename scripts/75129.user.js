// ==UserScript==
// @description Version 00.1
// @name    New Window Test
// @version 00.1
// @author .WalterRules
// @exclude  http://*
// ==/UserScript==

javascript:var%20d=document,f='http://www.munishirts.info',l=d.location,e=encodeURIComponent;1;try{if%20(!/^(.*\.)?munishirts\.[^.]*$/.test(l.host))throw(0);}catch(z)%20{a=function()%20{if%20(!window.open(f,'munishirts','toolbar=0,status=0,resizable=0,width=626,height=436'))l.href=f+p};if%20(/Firefox/.test(navigator.userAgent))setTimeout(a,0);else{a()}}void(0)