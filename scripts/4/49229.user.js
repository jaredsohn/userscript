// ==UserScript==
// @name           Func func
// @namespace      http://nabb.trap17.com
// @description    Function functions. Only required for Chrome.
// @include        http://www.kongregate.com/*
// ==/UserScript==

// Nabb, 15th May 2009: nabb.trap17.com

// This script is required for some of my scripts.

setTimeout("nF=function(a){b=a.split(\".\");d=window;for(c=0;c<b.length-1;){d=d[b[c++]]}return[d,b[c]]};nFR=function(a){return a.substring(a.indexOf('(')+1,a.indexOf(')'))};nFA=function(a,x,y){b=nF(a);c=b[0][b[1]].toString();b[0][b[1]]=new Function(nFR(c),(x?x:'')+';'+c.substring(c.indexOf('{')+1,c.length-1)+';'+(y?y:''))};nFE=function(a,s,r){b=nF(a);c=b[0][b[1]].toString();b[0][b[1]]=new Function(nFR(c),(c.substring(c.indexOf('{')+1,c.length-1)).replace(s,r))}",0)