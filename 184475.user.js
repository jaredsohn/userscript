// ==UserScript==
// @id             videobam.com-22b7f25e-154a-471e-bd42-faaa4f603099@videobam-2013-11-23@daud.iciware.com
// @name           Videobam Embedded MP4 Native with Video Tag
// @version        1.0
// @namespace      videobam-2013-11-23@daud.iciware.com
// @author         
// @description    
// @include        http://videobam.com/widget/*
// @run-at         document-end
// ==/UserScript==

function forEach(arr, fnc)
{ for (var i = 0; i < arr.length; i++) fnc(arr[i]); }

var fallback = document.querySelector('.video-js-box');

var data = { };
var config = document.getElementsByName('flashvars')[0].value.substr('config='.length);
forEach(JSON.parse(config).playlist, function(item)
{
    if (/\.(jpg|jpeg|png)$/i.test(item.url))
        data.poster = item.url;
    else
        data.src    = item.url;
});

document.body.innerHTML = 
'<video src="' + data.src + '" poster="' + data.poster +
        '" controls style="width: 100%; height: 100%;">' + 
    fallback.innerHTML +
'</video>';

forEach(document.getElementsByTagName("link"), function(item)
    { if (item.rel == 'stylesheet') item.parentNode.removeChild(item); });

document.body.style.marginBottom = "0px";

