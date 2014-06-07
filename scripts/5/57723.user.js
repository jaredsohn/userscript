// ==UserScript==
// @name         Popup Alt and Broken Image Placeholder
// @namespace    http://userscripts.org/users/sadeghi85
// @description  Popups images' ALT text like IE and Netscape, also shows broken image placeholders.
// @include      *
// @grant        none
// ==/UserScript==

// http://userscripts.org/scripts/show/57723

nodeInserted();

var ecount = true;

document.addEventListener("DOMNodeInserted", function(e) {
    
    if (ecount)
    {
        setTimeout(function() {
            
            nodeInserted();
            
            ecount = true;
            
        }, 1000);
        
        ecount = false;
    }
    
}, true);

//document.addEventListener("DOMNodeInserted", nodeInserted, false);

function nodeInserted()
{
    var images = document.images;
    
    if (images)
    {
        for (var i = 0; i < images.length; ++i)
        {
            var image = images[i];
            
            if (image.src !== document.URL)
            {
                if (image.title && image.alt)
                {
                    if (image.title !== image.alt)
                    {
                        image.title = image.title + " :: " + image.alt;
                    }
                }
                
                if ( ! image.title)
                {
                    if (typeof image.parentNode !== "undefined" && image.parentNode.getAttribute("href") && image.parentNode.getAttribute("title"))
                    {
                        image.title = image.parentNode.getAttribute("title");
                        
                        if (image.alt)
                        {
                            image.title = image.title + " :: " + image.alt;
                        }
                    }
                    else
                    {
                        if (image.alt)
                        {
                            image.title = image.alt;
                        }
                        else
                        {
                            image.title = image.src;
                        }
                    }
                }
               
                image.alt = "";
                
                if ( ! isImageOk(image))
                {
                    var imageStyle = window.getComputedStyle(image);
                    
                    if (parseInt(imageStyle.width, 10) && parseInt(imageStyle.height, 10) && parseInt(imageStyle.width, 10) < 24 && parseInt(imageStyle.height, 10) < 24)
                    {
                        image.setAttribute("width", parseInt(imageStyle.width, 10));
                        image.setAttribute("height", parseInt(imageStyle.height, 10));
                        
                        image.style.width = "24px";
                        image.style.height = "24px";

                        image.addEventListener("load", Reset, false);
                    }
                    
                    image.style.MozForceBrokenImageIcon = 1;
                }
            }
        }
    }
}

function Reset()
{
    this.style.width = "";

    this.style.height = "";
}

function isImageOk(image)
{
    // During the onload event, IE correctly identifies any images that
    // weren’t downloaded as not complete. Others should too. Gecko-based
    // browsers act like NS4 in that they report this incorrectly.
    if ( ! image.complete)
    {
        return false;
    }
    
    // However, they do have two very useful properties: naturalWidth and
    // naturalHeight. These give the true size of the image. If it failed
    // to load, either of these should be zero.
    
    if (typeof image.naturalWidth !== "undefined" && image.naturalWidth === 0)
    {
        return false;
    }
    
    // No other way of checking: assume it’s ok.
    return true;
}

