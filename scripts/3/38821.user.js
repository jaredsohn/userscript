// ==UserScript==
// @name           Reddit - Inline Fun
// @namespace      movzx
// @description    Provides inline buttons to many popular humor sites (e.g. instantrimshot.com)
// @include        http://*.reddit.com/*
// @include        http://reddit.com/*
// ==/UserScript==

//List of supported sites
var funBuddies = new Array(
            //new Array(swf_source, matching_regex, element_width, element_height),
            new Array('http://www.instantrimshot.com/rimshot.swf', 'https?://(www\.)?instantrimshot.com/?', 24, 24),
            new Array('http://www.instantcrickets.com/crickets.swf', 'https?://(www\.)?instantcrickets.com/?', 24, 24),
            new Array('http://www.sadtrombone.com/sad_trombone.swf', 'https?://(www\.)?sadtrombone.com/?', 61, 38),
            new Array('http://www.instantboo.com/red_btn.swf', 'https?://(www\.)?instantboo.com/?', 48, 48),
            new Array('http://www.instanttumbleweed.com/tumbleweed2.swf', 'https?://(www\.)?instanttumbleweed.com/?', 48, 48),
			new Array('http://www.instantcaruso.com/csi.swf', 'https?://(www\.)?instantcaruso.com/?', 48, 31)
        );

//These should match the indexes in the funBuddies array
var SWF_SOURCE   = 0;
var MATCH_REGEX  = 1;
var SWF_WIDTH    = 2;
var SWF_HEIGHT   = 3;

var links = document.getElementsByTagName('a');
if (links)
{
    for(linkdex in links)
    {
        var link = links[linkdex];
        for(fundex in funBuddies)
        {
            var buddy = funBuddies[fundex];
            if (link.href.match(buddy[MATCH_REGEX]))
            {
                var obj = createSWFElement(buddy[SWF_SOURCE],buddy[SWF_WIDTH],buddy[SWF_HEIGHT]);
                if (obj != null) link.parentNode.insertBefore(obj, link);
            }
        }
    }
}

//Creates an embedded object and returns it
//swf - the source of the swf file to use
//width - the width of the object to create
//height - the height of the object to create
function createSWFElement(swf,width,height)
{
    var obj = document.createElement('object');
    obj.setAttribute('classid','clsid:D27CDB6E-AE6D-11cf-96B8-444553540000');
    obj.setAttribute('codebase','http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0');
    obj.setAttribute('width',width);
    obj.setAttribute('height',height);

    var parm1 = document.createElement('param');
    parm1.setAttribute('name','movie');
    parm1.setAttribute('value',swf);
    obj.appendChild(parm1);

    var parm2 = document.createElement('param');
    parm1.setAttribute('name','quality');
    parm1.setAttribute('value','high');
    obj.appendChild(parm2);

    var embed = document.createElement('embed');
    embed.setAttribute('src',swf);
    embed.setAttribute('width',width);
    embed.setAttribute('height',height);
    embed.setAttribute('quality','high');
    embed.setAttribute('pluginspage','http://www.macromedia.com/go/getflashplayer');
    embed.setAttribute('type','application/x-shockwave-flash');
    obj.appendChild(embed);

    return obj;
}