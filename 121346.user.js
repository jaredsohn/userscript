// ==UserScript==

// @name		interpals.net Photo Enlarger (for Firefox)
// @namespace		http://nk0de.tumblr.com/
// @description		Enlarge thumbnail profile pictures when the mouse pointer is hovered over
// @include		http://www.interpals.net/*
// @version		1.1
// @license		GPL v3 or any later version (http://www.gnu.org/copyleft/gpl.html)
// @icon		https://twitpic.com/show/iphone/7xswxm


// ==/UserScript==

/* This script works on the site www.interpals.net only. When you hover the mouse 
pointer over the thumbnail images in profile pages, it enlarges itself to its full-size. 
Many thanks to everyone at Stack Overflow who answered my questions, 
specially Brock Adams, who helped me out a lot writing this. 

Tested on Firefox v8.0.1. (There's a modified version for Chrome. Visit http://userscripts.org/scripts/show/121347)
*/

/* Any feedback, suggestion, bug, please contact me. */

/*
Twitter 	: twitter.com/nK0de
Tumblr		: nk0de.tumblr.com
WordPress	: nk0de.wordpress.com
Gmail		: imnk0de@gmail.com
*/


function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() 
{
//Create the div and the image that will be pointed to our large pictures.
$("body").append ('<div id="idLargePicturePopupWindow"><img></div>');

/* In case the popup covers the current mouse position, it must also trigger the hover change.  
   This avoids certain annoying blinking scenarios. */
$('#idLargePicturePopupWindow').bind 
(
    "mouseenter mouseleave",
    {bInPopup: true},
    myImageHover
);

// Activate the mouseover on the desired images on the target page.
$('#profPhotos .profPhotoLink > img').bind 
(
    "mouseenter mouseleave",
    {bInPopup: false},
    myImageHover
);

function myImageHover (zEvent) 
{
    if (zEvent.type == 'mouseenter') 
    {

        if ( ! zEvent.data.bInPopup) 
        {

            var imgurl = this.src.toString();
	// Need to replace '/thumbs/75x60/' part with '/photos/' to get the full size image.
            var bigimg = imgurl.replace(/\/thumbs\/[0-9x]+\//i, "/photos/");

            $("#idLargePicturePopupWindow img").attr ('src', bigimg);
        }

        $("#idLargePicturePopupWindow").show();
    }
    else 
    {
        $("#idLargePicturePopupWindow").hide();
    }
}

}

// Here we add the CSS styles that make this approach work.
GM_addStyle ( (<><![CDATA[
    #idLargePicturePopupWindow 
	{
        position:               absolute;
        background:             white;
        border:                 none;
        margin:                 1ex;
        opacity:                1.0;
        z-index:                1222;
        min-height:             100px;
        min-width:              200px;
        padding:                0;
        display:                none;
        top:                    2em;
        left:                   50em;
    }
    #idLargePicturePopupWindow img 
	{
        margin:                 0;
        margin-bottom:          -4px;
        padding:                0;
    }
]]></>).toString () );

addJQuery(main);
