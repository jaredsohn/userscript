// ==UserScript==
// @name           Reddit Instant Rimshot
// @namespace      movzx
// @description    Adds an embedded rim shot button before instantrimshot.com links
// @include        http://www.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==
var swf_w = 24;	//Width of the button
var swf_h = 24;	//Height of the button
var matchtxt = 'https?://(www\.)?instantrimshot.com/?';		//Regex to match the link against
var rimshot_src = 'http://www.instantrimshot.com/rimshot.swf';	//Location of the instant rimshot swf

var links = document.getElementsByTagName('a');
if (links)
{
    for(var index=0;index< links.length;index++)
    {
        if (links[index].href.match(matchtxt))
        {
            var obj = document.createElement('object');
            obj.setAttribute('classid','clsid:D27CDB6E-AE6D-11cf-96B8-444553540000');
            obj.setAttribute('codebase','http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0');
            obj.setAttribute('width',swf_w);
            obj.setAttribute('height',swf_h);

            var parm1 = document.createElement('param');
            parm1.setAttribute('name','movie');
            parm1.setAttribute('value',rimshot_src);
            obj.appendChild(parm1);

            var parm2 = document.createElement('param');
            parm1.setAttribute('name','quality');
            parm1.setAttribute('value','high');
            obj.appendChild(parm2);

            var embed = document.createElement('embed');
            embed.setAttribute('src',rimshot_src);
            embed.setAttribute('width',swf_w);
            embed.setAttribute('height',swf_h);
            embed.setAttribute('quality','high');
            embed.setAttribute('pluginspage','http://www.macromedia.com/go/getflashplayer');
            embed.setAttribute('type','application/x-shockwave-flash');
            obj.appendChild(embed);

            links[index].parentNode.insertBefore(obj, links[index]);
        }
    }
}