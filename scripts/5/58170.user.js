// ==UserScript==
// @name           Loved Tracks RSS
// @namespace      http://www.last.fm/user/freeman_fx
// @include        http://www.last.fm/user/*
// ==/UserScript==


//get username
var xu = document.evaluate("//h1",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var us = xu.snapshotItem(0);
var username = us.childNodes[0].data;
//
var x = document.evaluate("//p[@class='userActivity']",document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
var main = x.snapshotItem(0);
newElement = document.createElement('a');
var link = 'http://ws.audioscrobbler.com/2.0/user/'+username+'/lovedtracks.rss';
newElement.setAttribute('href',link);

var img = document.createElement('img');
 img.style.border = 'none';
    img.style.marginLeft = '3px';
    img.src = 'data:image/png;charset=utf-8;base64,R0lGODlhDAAMANUAAOwiLPSanPRaXPQ+RPR2fPzS1OwyPPROVPzq7PRqbPRGTPSKjOwqLPR+hPzm5Ow6PPz29PRydPRCRPza3PRWXPRudPRKTOwuNOwmLPSepPRmbPR6hPzW1Ow2PPRSVPzy9PRqdPSOlOwqNPSChOw6RPz+/PRCTPRKVAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACwAAAAADAAMAAAGfcBCZ0AimRSKk0XBGVw0JqLpeDqRDIZSyZHxWCwHhYX0SGQmJQTopCApJKRMxDT6QECDgcRE0iJGFR8OCkMKJh4LCCUjGyUhBh1jGyEUDg4DDhMiHWwQJQsLJQkBJRgGBxYFEBQUn40HIiZKJAMdBiIMAAAdHFNtAw9YF7xBADs=';
    newElement.appendChild(img);
    main.insertBefore(newElement,main.childNodes[1]);