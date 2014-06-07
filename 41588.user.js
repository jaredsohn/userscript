// ==UserScript==
// @name           New Bnet taglines
// @namespace      http://www.bungie.net/forums/topics.aspx?forumID=10
// @include        http://*.bungie.net/*
// ==/UserScript==
titletext=new Array();
//here r teh taglinz
titletext[0]="Welcome to Bungie Studios: DO NOT ASK FOR RECON YOU IDIOTS";
titletext[1]="Welcome to Bungie Studios: Possible side effects include serious bouts of awesome accompanied by occasional badical";
titletext[2]="Welcome to Bungie Studios: Y U Ban Meh?!11!!!";
titletext[3]="Welcome to Bungie Studios: Please leave your crap at the door";
titletext[4]="Welcome to Bungie Studios: Beware the Soffish";
titletext[5]="Welcome to Bungie Studios: Skiska, u got it gewd";
titletext[6]="Welcome to Bungie Studios: DO NOT EAT";
var i=Math.floor(7*Math.random());

document.title=titletext[i];