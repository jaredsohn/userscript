// ==UserScript==
// @name        Icy Tower FLD highscore percentages
// @description Supplies percentages for Free Lunch Design Icy Tower highscore lists.
// @include     http://www.freelunchdesign.com/smf/*
// @include     http://freelunchdesign.com/smf/*
// ==/UserScript==

(function(e,v,i,j,c,s){s=function(e){return parseFloat(e.textContent||e.innerText)};for(i in e=document.getElementsByTagName('table'))with(e[i])try{if(rows[0].cells[0].firstChild.nodeValue==='Rank')for(j in rows)try{(v=rows[j].insertCell(4)).appendChild(document.createTextNode((v=s(rows[j].cells[3])/s(rows[1].cells[3])*100)?Math.round(v*10)/10+'%':'Percent'))}catch(c){}}catch(c){}})()