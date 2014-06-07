// ==UserScript==
// @name		scrooget
// @namespace	http://prosayist.com
// @description	Change scroogle's Gw form method from post to get to enable saving or reloading of result pages
// @include		http://*scroogle.org/*
// ==/UserScript==
// by Prosayist
// License = if it works for you great, if you make it work better also great, if you claim you made it.. liar
//
df=document.forms;
for(i=0;i<df.length;i++){df[i].method='get';}