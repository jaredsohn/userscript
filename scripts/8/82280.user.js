// ==UserScript==
// @name neo craigslist
// @version 1.0
// @author Neo		
// @namespace      
// @description    
// @include        http://*.craigslist.org/*
// ==/UserScript==




var rows,i;
rows=document.getElementsByTagName('p');
for(i in rows)
{
  rows[i].title="neo";
}
