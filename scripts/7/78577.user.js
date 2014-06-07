// ==UserScript==
// @name          Control Yourself From Browsing
// @namespace     amarff
// @description   Enter the site name & mention the time limit.It close the site.
// ==/UserScript==

//#Copy after this (javascript: should also be copied) & save as bookmark# javascript: 
site=prompt("Enter sites name","http://frendz4m.com");
time=prompt("Enter Time period in minutes",-1);
time=time*1000*60;
win = window.open(site, "");
win.setTimeout("close();",time);
void(0);

//END COPY