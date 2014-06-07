// Flickr Flash Interactive Panorama Preview
// version 0.0.1 beta
// 2010-02-16
// Copyright (c) 2007-2008, Aldo Hoeben (fieldOfView.com) & Todd Moon (toddmoon.com)
// Adapted for a Flash viewer by Seb Perez-Duarte - 2010
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.3 or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Flickr Flash Interactive Panorama Preview", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name        Flickr Flash Interactive Panorama Preview
// @namespace   http://fieldofview.com/flickrtools/greasemonkey/
// @description replaces previews of equirectangular images on Flickr.com with an interactive Flash view
// @include     http://*flickr.com/photos/*
// @include     http://*flickr.com/groups/equirectangular
// @include     http://*flickr.com/groups/equirectangular/*
// ==/UserScript==

Debug_Log = false;

// == CONSTANTS == //
var SCRIPT_VERSION = "0.0.1";
var SCRIPT_NAME = "preview.flashinteractivepano.flickr.user.js"

var SCRIPT_HOME = "http://theseblog.free.fr/panoviewer/";

var CONTENT_MODE = new Object();
CONTENT_MODE.PHOTO = 1;
CONTENT_MODE.VIEWER = 2;

var BUTTON_TYPE = new Object();
BUTTON_TYPE.BUTTON = 1;
BUTTON_TYPE.LINK = 2;

var PHOTO_PAGE_PREVIEW_BUTTON_IMAGES = new Object();
PHOTO_PAGE_PREVIEW_BUTTON_IMAGES.GREY = "data:image/gif;base64,R0lGODlhKwAYANUAAOXl5dPT0+vr69nZ2c7OzrOzs3JycvT09Nzc3MLCwszMzMjIyKurq6Kiora2trCwsPn5+YqKip6enpubm35+fnl5eVNTU15eXmtra0NDQ/v7+/7+/u7u7vb29qmpqa+vr7q6utvb2+Pj4319fdfX1/Ly8sbGxpCQkODg4I6OjsrKyt/f39DQ0JeXl/Hx8eLi4ubm5ry8vPf395OTk9bW1v39/aCgoIWFhefn56ioqGNjY8TExOHh4aysrGhoaP///yH5BAAAAAAALAAAAAArABgAAAb/wJ9wSCwaj8ikcslsOp/QH8TFEeAEmmj0sEp8GqfbSDLYaJu8T+xFBJwuktJZGUotZDiRnINQ5SwjHHNHHToJGgQhCCEcBAENHgwWJ1mDQx0RFD8EKz8uNBwJJQcfDA0WBJaXFjAcAR0CLAAbKzEyMC0OGDNZPkO+wD7ARb5DHz4dIRooIChZNQAfPzszNwY4P8XZ29raQt4tEQcBGiSzQysDPxosEgbq3N/ZwvLDRC0pBzQuCBoyPCVqcFChQQQDEBRI1Fv4Kx4RGxho7EgwAIWCBQIOFGSRoICJEQga1qPHkMiCDAcVmPBQoEAAEgRekPgwwMMEF6rWXaiwkkCHcx8JbDgIESPBAhUjTOT8sSFABgcgWrwoIQIFjBcPcpCwcQPG0ho/JlggUcBDjwZlJzQw4WCECqY5IYRAkeLCiQJZPXzAe2LEgwDnVG2gKgCEAR0VIqTIVGGGAhEAfi5laoZPxwIgWAj4ucHM5M+gQ4tmEgQAOw==";
PHOTO_PAGE_PREVIEW_BUTTON_IMAGES.COLOR = "data:image/gif;base64,R0lGODlhKwAYANUAAP39/OPj5Pf29lZnirq9xJmmv8vLzG5+oNnb3am/4fn5+nB4jzZBYaKptNTSzd7f34abv4CMo7O2vDRQipSt1KKkqvDw8Nzh5/T1+KqutZCdtfDz98XL2LvO8NXc6rbD2fPy8szU4LS/0RgoWeXi29TV3IuLktbU0wgOQszHwYeVrOLm7HCKv+fp7NrY2OXr81xfdevo4HSW1FBupu7v8uzr6JGaqO3u7/Xy7LGspo6Fe7y4r4Si0wAAAJmZmf///ywAAAAAKwAYAAAG/8CfcEgsGo9Ioy/JbDqXzqhUCDUKaLfWqqWYPo2YB6FiOwwGkZKXWRVeGpIL8XJgmEDrY7u0+AgCAXgvCAkyIzAWeUVVAgwiAAYICC40HBwqEDIoCwCKQ1ACCwM/Bg8/FicvBCACDRAsIwaeVEIYIys4DgItBgE/HhICMREUEwedPUPJyz3LRclQFQwYLgoPEg+dPwENPwQHMxO+yULO5D/n5T9QJjMbDgAnAdo/D2qQLBNq6Pz8zeTmaP0wcWDDCQsIAGDwsAHADQMKAmigMCCEOoD9LvaD4mNCBxEEQnj48OHFBgUXHBAokGAAAmUw/8X8JCQFChkUPojQUKAAh44QHDyEKNABQoREnqAoYDAhAQQDArypyOBCQoKrAwjMWjfEAQoeFCIEwBGDRFlXHVgsWLG1jY8RHQpUIJOhQgQVIiim2Mr1hwIEJHQwONCggQaePc3kcDBvFhQAIALU2AGDwYAFB0TBMJGCRICojoloQ0ggQwYJBmpEpReab542rqX4mE27tu3buHPjJhAEADs=";
PHOTO_PAGE_PREVIEW_BUTTON_IMAGES.COLOR_PRESSED = "data:image/gif;base64,R0lGODlhKwAYANUAAP39/HCKv7vO8JSt1NXc6vPy8lxfdbq9xIuLklZniqKptMvLzMXL2BgoWbbD2eXi23B4j5mmv+Pj5LO2vNnb3TRQitzh53SW1Iabv+Xr8+zr6NTSzaKkqvDz99bU09TV3G5+oPT1+OLm7FBupvf29jZBYYSi0/Xy7Km/4bS/0YCMo5GaqMzU4IeVrJCdtQgOQtrY2Ofp7PDw8Pn5+szHwe7v8o6Fe6qutbGspry4r+vo4N7f3+3u75mZmQAAAP///ywAAAAAKwAYAAAG/8BDb0gsGo/IJPLHbDqf0KgU2ptar9gqlFTjxUSxGXbc1DZDuwNnBUokVB/y2PyzKCYWpwVUQhTkVmYfEA4kEhJ/GRQoFw0GMoBSWiQlKQALFBQwNQwMLRgXLxAAkVQ/JBAJPws7PzIeGQcFJAoYAQ0LpU9VIQ0iJxskMQsSPwQTJDoqAxUgpD5N0NI+0k/QP1UcJSEwMzsTO6Q/Ego/ByAjFcXXP9Xs7EzXVQgjHRsAHhLiPztxlwEV4rQbOJDaNXdlfiAA0cGDDAoAQhDoAIDHghkSXAxIwCIewWrRCibsUUFAigMsCDhwkKHDDAsbDkRAkYBCSI8GQ8KrQuPFhY4BDlK4iBCBAQsGBFhEEIBBBSRdTKrMKFEBBYYFJMy1uAFjAoqvCQ5ATfhjwwsTA1RIOKHjQdtaAgJAEDE2apkGAiJwWHODg4oWKTbSqGt3BoUHNkqAUKDAxVCibXBs0Fe3CoACEjTkMFAiAQQQqQwgoPFAQtbKTcQ9PHDjxoQFGrLuQ024FJ3aZG7jxhIEADs=";


// == SCRIPT LIFECYCLE == //

var pathSegments = getLowercasePathSegments( document.location.pathname );

//Determine which supported page we are on, if any.
if ( isPhotoPage( pathSegments ) && isPhotoInEquirectangularPool() )
{
    renderPhotoPagePreviewButton( pathSegments );
}
else if ( isEquirectangularGroupPage( pathSegments ) )
{
    renderEquirectangularGroupPagePreviewButtons();
}
else if ( isEquirectangularPool( pathSegments ) )
{
    renderEquirectangularPoolPreviewButtons();
}

//== FUNCTIONS ==//

function DebugLog( message )
{
    if ( Debug_Log )
    {
        GM_log( message );
    }
}

//Determines if the pathSegments indicates that is a photo page. Returns true or false.
function isPhotoPage( pathSegments )
{
    DebugLog( "isPhotoPage\n" + ( pathSegments.length >= 3 && pathSegments[0] == "photos" ).toString() );
    return pathSegments.length >= 3 && pathSegments[0] == "photos";
}

//Determines if the pathSegments indicates that is the equirectangular group page. Returns true or false.
function isEquirectangularGroupPage( pathSegments )
{
    DebugLog( "isEquirectangularGroupPage\n" + ( pathSegments.length == 2 && pathSegments[0] == "groups" && pathSegments[1] == "equirectangular" ).toString() );
    //groups/equirectangular
    return pathSegments.length == 2 && pathSegments[0] == "groups" && pathSegments[1] == "equirectangular";
}


//Determines if the pathSegments indicates that is the equirectangular group pool. Returns true or false.
function isEquirectangularPool( pathSegments )
{
    DebugLog( "isEquirectangularPool\n" + ( pathSegments.length >= 3 && pathSegments[0] == "groups" && pathSegments[1] == "equirectangular" && pathSegments[2] == "pool" ).toString() );
    //groups/equirectangular/pool
    return pathSegments.length >= 3 && pathSegments[0] == "groups" && pathSegments[1] == "equirectangular" && pathSegments[2] == "pool";
}

//Renders the preview button into the button bar of an individual photo.
function renderPhotoPagePreviewButton( pathSegments )
{
    var photoid = pathSegments[2];
    var flickrButtonBar = document.getElementById("button_bar");
    var flickrDiv = document.getElementById("photoImgDiv" + photoid);

    //Create the button and assign properties.
    var previewButton = document.createElement('img');
    previewButton.id = "gm_FlashPreviewToggle";
    previewButton.width = "43";
    previewButton.height = "24";
    previewButton.border = "0";
    previewButton.style.cursor = "pointer";
    previewButton.src = PHOTO_PAGE_PREVIEW_BUTTON_IMAGES.GREY;

    //Record content and mode
    previewButton.ContentContainer = flickrDiv;
    previewButton.PhotoContent = flickrDiv.innerHTML;
    previewButton.ViewerContent = getPreviewSource( photoid, 500, 350 );
    previewButton.ContentMode = CONTENT_MODE.PHOTO;
    previewButton.ButtonType = BUTTON_TYPE.BUTTON;

    assignPreviewButtonDelegates( previewButton );

    //Add the button to the bar.
    flickrButtonBar.appendChild( previewButton );
}

//Delegated event wire-up utitlity. Using this allows you to use the "this" keyword in a delegated function.
function addEvent( target, eventName, handlerName )
{
    target.addEventListener(eventName, function(e){target[handlerName](e);}, false);
}

//Render preview buttons for each thumbnail on the Equirectangular Group page
function renderEquirectangularGroupPagePreviewButtons()
{
    DebugLog( "renderEquirectangularGroupPagePreviewButtons()" );

    renderThumbnailPreviewButtons( getAllThumbnailPhotoBoxes( "div" ) );
}

//Render preview buttons for each thumbnail on the Equirectangular Group Pool page
function renderEquirectangularPoolPreviewButtons()
{
    DebugLog( "renderEquirectangularPoolPreviewButtons()" );

    renderThumbnailPreviewButtons( getAllThumbnailPhotoBoxes( "p" ) );
}

//Use XPath to find all of the named nodes with the class "PoolList"
function getAllThumbnailPhotoBoxes( nodeName )
{
    var allPhotoBoxes = document.evaluate(
        "//" + nodeName + "[@class='PoolList']",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    return allPhotoBoxes;
}

//Takes an XPath snapshot of all thumbnail nodes and renders preview buttons above each one.
function renderThumbnailPreviewButtons( allPhotoBoxes )
{
    var thisPhotoBox;

    var individualPreviewButtons = new Array();

    for (var i = 0; i < allPhotoBoxes.snapshotLength; i++)
    {
        thisPhotoBox = allPhotoBoxes.snapshotItem(i);

        //Find the photo link and parse out its photo data.
        //take the content out of the paragraph
        //add the button to the paragraph
        //add a div to the paragraph
        //add the content back in the div

        var allLinks = document.evaluate(
            "./span[@class='photo_container pc_t']/a",
            thisPhotoBox,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
        );

        var photoLink = allLinks.snapshotItem(0);

        var photoPathSegments = getLowercasePathSegments( photoLink.href );
        var photoID = photoPathSegments[2];

        var currentContent = thisPhotoBox.innerHTML;
        thisPhotoBox.innerHTML = "";

        var newDiv = document.createElement('div');
        newDiv.innerHTML = currentContent;

        //Create the button and assign properties.
        var previewLink = document.createElement('a');
        previewLink.href = "javascript:;";
        //previewButton["class"] = "FlashIndividualPreviewButton";
        previewLink.innerHTML = "Preview in Interactive Panorama Viewer";
        previewLink.style.cursor = "pointer";

        //Record content and mode
        previewLink.ContentContainer = newDiv;
        previewLink.PhotoContent = currentContent;
        previewLink.ViewerContent = getPreviewSource( photoID, 250, 175, true);
        previewLink.ContentMode = CONTENT_MODE.PHOTO;
        previewLink.ButtonType = BUTTON_TYPE.LINK;
        previewLink.PreviewText = previewLink.innerHTML
        previewLink.CloseText = "Close preview";

        assignPreviewButtonDelegates( previewLink );

        thisPhotoBox.appendChild( newDiv );
        thisPhotoBox.appendChild( previewLink );


        individualPreviewButtons.push( previewLink );
    }

}

//Assign mouse-over and click event for an individual preview button.
function assignPreviewButtonDelegates( previewButton )
{
    //Assign delegates and wire up events calling them.
    previewButton.TogglePreview = toggleIndividualPreview;
    addEvent(previewButton, "click", "TogglePreview");

    if(previewButton.ButtonType == BUTTON_TYPE.BUTTON)
        assignPreviewButtonMouseOver( previewButton );
}

//Assign image changing mouse-over (out, up, down) events for a preview button.
function assignPreviewButtonMouseOver( previewButton )
{
    previewButton.ShowColorImage = showColorImage;
    addEvent(previewButton, "mouseover", "ShowColorImage");
    addEvent(previewButton, "mouseup", "ShowColorImage");

    previewButton.ShowGreyImage = showGreyImage;
    addEvent(previewButton, "mouseout", "ShowGreyImage");

    previewButton.ShowColorPressedImage = showColorPressedImage;
    addEvent(previewButton, "mousedown", "ShowColorPressedImage");
}

//Event handler for a preview button on a photo page.
function toggleIndividualPreview()
{
    if ( this.ContentMode == CONTENT_MODE.PHOTO )
    {
        this.ContentMode = CONTENT_MODE.VIEWER;
        this.ContentContainer.innerHTML = this.ViewerContent;
        if (this.ButtonType == BUTTON_TYPE.LINK)
            this.innerHTML = this.CloseText;
    }
    else
    {
        this.ContentMode = CONTENT_MODE.PHOTO;
        this.ContentContainer.innerHTML = this.PhotoContent;
        if (this.ButtonType == BUTTON_TYPE.LINK)
            this.innerHTML = this.PreviewText;
    }
}

//Event Handler to show the colored image.
function showColorImage()
{
    this.src = PHOTO_PAGE_PREVIEW_BUTTON_IMAGES.COLOR;
}

//Event Handler to show the grey image.
function showGreyImage()
{
    this.src = PHOTO_PAGE_PREVIEW_BUTTON_IMAGES.GREY;
}

//Event Handler to show the pressed color image.
function showColorPressedImage()
{
    this.src = PHOTO_PAGE_PREVIEW_BUTTON_IMAGES.COLOR_PRESSED;
}

//Calculates the iFrame script source pointing to the viewer.
function getPreviewSource( photoid, width, height, isGroupPage )
{
    var FlashPreviewURL = SCRIPT_HOME + "index.php?photo=" + photoid;

    var extraStyle = (isGroupPage)?';margin:' + (-10 -(height-100)/2) + 'px 0 4px ' + (-(width-100)/2) + 'px;' :'';

    var source = "<iframe width='" + width + "' height='" + height + "' style='overflow:hidden;border:0" + extraStyle + "' src='" + FlashPreviewURL + "'></iframe>";
    return source;
}

//Determines if the individual photo is in the "equirectangular" pool
function isPhotoInEquirectangularPool()
{
    var groups = unsafeWindow.in_groupsA;

    for( var i = 0; i < groups.length; i++ )
    {
        if ( groups[i].nsid == "44671723@N00" && groups[i].status == 1 )
            return true;
    }

    return false;
}

//Finds path segments in the given path. Removes the protocol and domain name if present. Returns an array of the segments.
function getLowercasePathSegments( path )
{
    //replace preceding protocl and domain and then any preceding or trailing slashes then split on the remaining slashes.
    return path.toLowerCase().replace( /^https?:\/\/[^\/]*/, "" ).replace(/^\/+|\/+$/g,"").split("/");
}
