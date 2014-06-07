// ==UserScript==
// @name           Deviant enlarge (fixed)
// @namespace      znerp
// @description    Larger images displayed on shift+mouseover on deviantART.com.
// @include        http://*.deviantart.com/*
// @exclude        http://*.deviantart.com/art/*
// ==/UserScript==

function sqr(x)
{
    return (x*x);
}

eventThingX = 0;
eventThingY = 0;
var globalTimer;
var newDiv = document.createElement('div');
var inner = newDiv.appendChild(document.createElement('div'));
newDiv.setAttribute('id', 'deviantEnlarge');
newDiv.setAttribute('style', 'padding:3px;display:none;position:fixed;z-index:100;top:20px;left:20px;background-color:#778;');
document.body.appendChild(newDiv);
newDiv.addEventListener(
    'mouseover',
    function(event)
    {
        this.style.display = "inline";
    },
    true);
newDiv.addEventListener(
    'mouseout',
    function(event)
    {
        window.clearTimeout(globalTimer);
        this.style.display = "none";
    },
    true);
newDiv.addEventListener(
    'mousemove',
    function(e)
    {
        if(sqr(eventThingX - e.pageX) + sqr(eventThingY - e.pageY) > 2500)
        {
            window.clearTimeout(globalTimer);
            this.style.display = "none";
        }
    },
    true);

setInterval(getImagesToEnlarge, 1000);

function getImagesToEnlarge()
{
    if(document.oldURL != document.location.hash)
    {
        document.oldURL = document.location.hash;
        var allImages = document.evaluate('//img', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
        for(var i = allImages.snapshotLength - 1; i >= 0; i--)
        {
            var thisImage = allImages.snapshotItem(i);
            if(thisImage.src != thisImage.src.replace(/http:[^\.]*\.pv\.(.*)\/150\//,"http://fc02.$1/"))
            {
                thisImage.addEventListener(
                    'mouseover',
                    function(event)
                    {
                        // Remove the following two lines if you don't want to require the shift key
                        if(event.shiftKey != 1)
                            return false;
                        thisImage = this;
                        fullsize = this.src.replace(/http:[^\.]*\.pv\.(.*)\/150\//,"http://fc02.$1/");
                        globalTimer = window.setTimeout(
                        function(thisImage)
                        {
                            return function(result)
                            {
                                inner.setAttribute('style', 'background:url("http://sh.deviantart.com/shadow/alpha-000000/2.6667-0.35/113/150/logo.png");min-height:'+158+'px;min-width:'+121+'px;');
                                inner.innerHTML = "<a href="+thisImage.parentNode.href+"><img style = 'max-width: "+ (parseInt(window.innerWidth) - 60) +"px; max-height: "+ (parseInt(window.innerHeight) - 40) +"px; cursor: crosshair' src='" + fullsize + "'></a></div>";
                                newDiv.style.display = "inline"
                                newDiv.style.zIndex = 500;
                                newDiv.style.opacity = .9;
                            }
                        }(thisImage),
                        500);
                    },
                    true);
                thisImage.addEventListener(
                    'mouseout',
                    function(event)
                    {
                        window.clearTimeout(globalTimer);
                        newDiv.style.display = "none";
                    },
                    true);
                thisImage.addEventListener(
                    'mousemove',
                    function(e)
                    {
                        eventThingX = e.pageX;
                        eventThingY = e.pageY;
                    },
                    true);
            }
        }
    }
}
