// ==UserScript==
// @name           Harmony Harmony
// @namespace      4chan
// @description    OPEN YOUR EYES
// @include        http://boards.4chan.org/v/*
// ==/UserScript==


var div = document.createElement('div');
div.style.zIndex = '-1';
div.style.padding = '0px';
div.style.margin = '0px';
div.style.position = 'fixed';
div.style.left = '0px';
div.style.bottom = '0px';
div.style.marginBottom = '-120px';
div.style.width = '100%';
div.style.height = '380px';
var embed = document.createElement('embed');
embed.setAttribute('src', "http://daggervale.org/dolphins.swf");
embed.setAttribute('quality', "high");
embed.setAttribute('width', "100%");
embed.setAttribute('height', "380");
embed.setAttribute('name', "dolphins");
embed.setAttribute('wmode', "transparent");
embed.setAttribute('type', "application/x-shockwave-flash");
div.appendChild(embed);
document.getElementsByTagName('body')[0].appendChild(div);
