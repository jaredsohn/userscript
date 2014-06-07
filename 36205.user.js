// Firefox user script for modifying dpreview forum pages
// version 1.1
// 08-13-2008
// ==UserScript==
// @name dpreview_forums
// @namespace http://jfriend.smugmug.com
// @description Enhance usability of dpreview forums
// @include http://forums.dpreview.com/forums/read*
// ==/UserScript==
// Apply this script to only the read and readflat pages with the include directive above


function DPR_ExpandImage()
{
    // This function is called from an event handler when an embedded image is done being loaded
    // Here all we want to do is to call the JavaScript function in the page called "expandimg"
    // with two parameters, the object ID number and the expand type which is 1 for what we want to do,
    // but there are two difficulties with that:
    //
    // First, we're not in the page execution context (we're in GreaseMonkey's context)
    // Second, we need to get the object value so we can pass it to expandimg
    //
    // We could solve the first one with the GreaseMonkey function unsafeWindow,
    // but it is safer (from a security point of view) to use the location.href substitute
    // which is a safer way to execute JavaScript in the full context of the page.
    //
    // To get the object id number, we will parse it out of the id value on the object itself
    // which is of the form "embedimgXXX where XXX is what we want
   
    location.href = "javascript:void(expandimg(" + this.id.substr(8) + ", 1));";
}

function MonitorAllImages()
{
    // cycle through all possible consecutive objects in the page that have ids that look like embedimgXXX
    for (var i=1; ; i++)
    {
        var obj = document.getElementById("embedimg" + i);

        // If we didn't find this object, then break out of the loop, as we must be done
        if (!obj)
            break;

        // if the image is already loaded, then we can just expand it immediately because the load event won't get called
        if (obj.complete)
        {
            location.href = "javascript:void(expandimg(" + i + ", 1));";
        }

        else
        {
            // Add a listener so we can be called when this image has been fully loaded and thus it's size is completely known
            obj.addEventListener("load", DPR_ExpandImage, false);
        }
    }
}

MonitorAllImages();

// End of the code