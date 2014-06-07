// ==UserScript==
// @name H.264 Replacer
// @description Using embedded external player to play HTML5 H.264 video
// @author RReverser
// ==/UserScript==

addEventListener('load', function(){
var supportedMimeTypes = ['video/mp4', 'video/x-ms-wmv', 'video/wmv', 'video/divx'];
var supportedVideoExtensions = ['.mp4', '.wmv', '.mp4v', '.m4v', '.mpg'];
var useDivX = /*@Use DivX Web Player.@bool@*/false/*@*/;
var embedType = useDivX ? "video/divx" : "application/x-mplayer2";
var pluginsPage = useDivX ? "http://dist.divx.com/divx/DivXInstaller.exe" : "http://port25.technet.com/videos/downloads/wmpfirefoxplugin.exe";

var getSupportedMediaSource = function(videoElement)
{
    if (videoElement.src && isFormatSupported(videoElement))
    {
        console.log("getSupportedMediaSource: found supported video source: '" + videoElement.src + "'");
        return videoElement.src;
    }

    var sources = videoElement.getElementsByTagName("source");
    var supportedSource = null;

    for (var i=0; i<sources.length; i++)
    if (sources[i].src && isFormatSupported(sources[i]))
    {
        console.log("getSupportedMediaSource: found supported video source: '" + sources[i].src + "'");
        return sources[i].src;
    }
}

var isFormatSupported = function(videoOrSourceElement)
{
if (videoOrSourceElement.type)
    {
        var type = videoOrSourceElement.type.toLowerCase();
        var index = type.indexOf(';');

        if (index != -1)
            type = type.slice(0, index);

        console.log("isFormatSupported: found a video/source element with mime type '" + type + "'");
        
        return (supportedMimeTypes.indexOf(type) >= 0);
    }
    else if (videoOrSourceElement.src)
    {
        var src = videoOrSourceElement.src.toLowerCase();
        var lastIndex = src.lastIndexOf(".");

        if (lastIndex != -1) src = src.slice(lastIndex);

        console.log("isFormatSupported: found a video/source element with ext '" + src + "'");
        
        return (supportedVideoExtensions.indexOf(src) >= 0);
    }

    return false;
}

var createControlFromVideo = function(videoElement)
{
    console.log("createControlFromVideo: looking for supported media sources");
    var supportedMediaSource = getSupportedMediaSource(videoElement);

    if (!supportedMediaSource)
    {
        console.log("createControlFromVideo: video element contains an unsupported media source");
        return null;
    }
    else
    {
        console.log("createControlFromVideo: video element contains a supported media source: '" + supportedMediaSource + "'");
    }

    var control = document.createElement("embed");
    control.type = embedType;

    var defaultAttrs =
    [
        // common
        "class",
        "contenteditable",
        "contextmenu",
        "dir",
        "draggable",
        "id",
        "hidden",
        "lang",
        "style",
        "spellcheck",
        "tabindex",
        "title",
        // events
        "onblur",
        "onchange",
        "onclick",
        "oncontextmenu",
        "ondblclick",
        "ondrag",
        "ondragend",
        "ondragenter",
        "ondragleave",
        "ondragover",
        "ondragstart",
        "ondrop",
        "onfocus",
        "onkeydown",
        "onkeypress",
        "onkeyup",
        "onmousedown",
        "onmousemove",
        "onmouseout",
        "onmouseover",
        "onmouseup",
        "onmousewheel",
        "onscroll",
        "onselect",
        "onsubmit",
        // video
        "loop",
        "autoplay"
    ];
    for(var attr in defaultAttrs)
    {
        var attrName = defaultAttrs[attr];
        var attrValue = videoElement.getAttribute(attrName);
        if(attrValue != null) control.setAttribute(attrName, attrValue);
    }
    
    control.setAttribute('AutoStart', (videoElement.getAttribute('autoplay') != null));
    control.setAttribute('Src', supportedMediaSource);
    control.setAttribute('Volume', videoElement.volume * 100);
    control.setAttribute('pluginsPage', pluginsPage);

    return control;
}

var processVideoElements = function()
{
    var videoElements = document.getElementsByTagName("video");
    console.log("processVideoElements: Document contains " + videoElements.length + " video elements");

    for (var i=0; i<videoElements.length; i++)
    {
        console.log("processVideoElements: --- Processing video element #" + i + " ---");
        videoElement = videoElements[i];
        videoElement.removeEventListener("DOMSubtreeModified", processVideoElements, true);

        var objectElement = createControlFromVideo(videoElement);

        if (objectElement)
        {
            console.log("processVideoElements: *SUCCESSFULLY CONVERTED* a video element to an object");
            videoElement.parentNode.replaceChild(objectElement, videoElement);
        }
        else
        {
            console.log("processVideoElements: adding a DOMSubtreeModified listener to this video element");
            videoElement.addEventListener("DOMSubtreeModified", processVideoElements, true);
        }
    }
}

setTimeout(processVideoElements, 100);
}, false);
