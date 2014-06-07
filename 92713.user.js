// ==UserScript==
// @name           WikiaMove
// @namespace      djschwartz.me
// @author         dj
// @description    Change links to pvx.wikia and guildwars.wikia to new domains
// @version        0.0.2
// @date           2010-12-14
// ==/UserScript==

var links = document.links;
var link;
for(var i = 0; i <= links.length-1; i++)
{
  link = links[i];
  	link.href = link.href.replace("pvxwiki.com/wiki", "gwpvx.com");
	link.href = link.href.replace("pvx.wikia.com/wiki", "gwpvx.com");
	link.href = link.href.replace("guildwars.wikia.com/wiki", "guildwiki.org");
}