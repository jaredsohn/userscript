// ==UserScript==
// @name                NYTimes PictureZoom
// @namespace           beeswax.noneofyours.inc
// @description         Make all NYTimes pictures zoomable
// @downloadURL         http://userscripts.org/scripts/source/179231.user.js
// @updateURL           http://userscripts.org/scripts/source/179231.user.js
// @version             0.0.6
// @match               *://*.nytimes.com/*
// ==/UserScript==

if (window.location.host=='graphics8.nytimes.com'){return;}

var imageZoom = function(target){
    console.log(target)
    img=target.srcElement

    if (img.src) {
        if (img.src.indexOf('graphics8.nytimes.com')>-1) {
            path=img.src.replace(/\/[^\/]+$/,'');
            id=path.replace(/.*\//,'').replace(/[_-][^-_]+$/,'');
            end=img.src.match(/(?:-v.)?\.jpg$/)[0]
            namePattern= RegExp('('+path+"\/.*"+id+".*)(-[^-]+)("+end+")","gi")
            newName=img.src.replace(namePattern,function (match,g1,g2,g3){if(!(g2.substr(0,7)=='-custom')){return (g1+'-superJumbo'+g3);}else {return match;}})
            window.open(newName);
            }
        }
    }

var addListeners = function(target){
    imgs=target.relatedNode.querySelectorAll('img')
    for (i=0;i<imgs.length;i++){
        img=imgs[i]
        if (img.src){
            if(img.src.indexOf('graphics8.nytimes.com')>-1){
                // Avoid processing whole-page ad overlays
                if ((img.src.indexOf('/ads/')>-1)||(img.src.indexOf('/adx/')>-1)){
                    return
                    }
                // Fix old-style slideshows so that images load and can be zoomed
                if ((img.src.indexOf('pixel.gif'))&&(img.parentNode.style.backgroundImage)){
                    url=img.parentNode.style.backgroundImage.match(RegExp('http.*jpg'))
                    if(url) {
                        img.src=url
                        }
                    }
                if (img.onclick){img.onclick=null}
                img.setAttribute('href',null)
                //console.log("Event listener: " + img.src)
                img.parentNode.setAttribute('style','cursor: -webkit-zoom-in;cursor:-moz-zoom-in');
                img.addEventListener("click", imageZoom, false);
                }
            }
        }
    }

document.relatedNode=document
addListeners(document)

document.addEventListener("DOMNodeInserted", addListeners, false);