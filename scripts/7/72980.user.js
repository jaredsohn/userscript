// ==UserScript==
// @name          Google Image Mouseover - Sworn's Mod
// @description	  View Google Image search results in a CSS popup on mouseover
// @include       http*://images.google.*/*
// @include       http*://www.google.*/search*
// ==/UserScript==

/*************************************************
 This script is based on Google Image Relinker with Mouseover - Nathan's Mod with Mouseover by Nathan Mercer
   http://userscripts.org/scripts/show/55130
 It removes the link changing to keep the original link, so you can find the context around an image
***************************************************/
/*************************************************
 This script is based on Google Image Relinker with Mouseover by Bhabishya Kumar  
   http://userscripts.org/scripts/show/9524
 It changes the location of the popup to always be in either the left or right
 top corner depending on where the mouse cursor is located.
 It also allows it to work with image results in standard google searches
***************************************************/

GM_addStyle(".thumbnail{position: relative;z-index: 0;}.thumbnail:hover{background-color: transparent;z-index: 50;}.thumbnail span{ position: absolute;border-width: 0;padding: 0px;left: -1000px;visibility: hidden;color: black;text-decoration: none;}.thumbnail span img{ border-width: 0;padding: 0px;}");

window.addEventListener("load", alterLinks, false);

function selectNodes(doc, context, xpath)
{
   var nodes = doc.evaluate(xpath, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
   var result = new Array( nodes.snapshotLength );

   for (var x=0; x<result.length; x++)
   {
	  result[x] = nodes.snapshotItem(x);
   }

   return result;
}

function cropImage(img)
{
		if( img.height > window.innerHeight)
        {
			var ratio = (window.innerHeight/img.height);
			img.height = window.innerHeight;
            
            if( img.width > window.innerWidth/2)
            {
                var ratio = ((window.innerWidth/2)/img.width);
                img.width = window.innerWidth/2;
                img.height *= ratio;
            }
		}

 		if( img.width > window.innerWidth/2)
        {
			var ratio = ((window.innerWidth/2)/img.width);
			img.width = window.innerWidth/2;
            
            if( img.height > window.innerHeight)
            {
                var ratio = (window.innerHeight/img.height);
                img.height = window.innerHeight;
                img.width *= ratio;
            }
		}
}
   
function handleMouseOver(event)
{

	var span = event.currentTarget.getElementsByTagName("span")[0];
	var img = span.getElementsByTagName("img")[0];
	var imgWidth = span.getElementsByTagName("input")[0];
	imgWidth.value = imgWidth.value == "" ? img.width : imgWidth.value;
	var imgHeight = span.getElementsByTagName("input")[1];
	imgHeight.value = imgHeight.value == "" ? img.height : imgHeight.value;
    
	cropImage(img);
    span.style.position = "fixed";
    span.style.top =  "0px";
    
    left = 0;
    
    if (event.clientX < window.innerWidth/2)
    {
 		left =  window.innerWidth - img.width;
    }
    
    span.style.left = left + "px";
    span.style.visibility = "visible";
}

function handleMouseOut(event)
{
	var span = event.currentTarget.getElementsByTagName("span")[0];
	span.style.visibility = "hidden";
}


function addCSSMagic(thumbnailLink, fullImageLinkURL)
{
	// Add thumbnail class to each link
	thumbnailLink.className = "thumbnail";
	thumbnailLink.addEventListener("mouseover", handleMouseOver, false);
	thumbnailLink.addEventListener("mouseout", handleMouseOut, false);

	// Add a hidden span holding actual image for each link
	var span = document.createElement('span');
	thumbnailLink.appendChild(span);
	var image = document.createElement('img');
	image.src = fullImageLinkURL;
	span.appendChild(image);
	var imgWidth = document.createElement("input");
	imgWidth.setAttribute("type","hidden");
	imgWidth.setAttribute("value","");
	span.appendChild(imgWidth);
	var imgHeight = document.createElement("input");
	imgHeight.setAttribute("type","hidden");
	imgHeight.setAttribute("value","");
	span.appendChild(imgHeight);

}

function alterLinks(){

	doc = window.document;

	// Get a list of all A tags that have an href attribute containing the start and stop key strings.
	var googLinks = selectNodes(doc, doc.body, "//A[contains(@href,'/imgres?imgurl=')][contains(@href,'&imgrefurl=')]");

	if(googLinks.length > 0){

		for (var x=0; x<googLinks.length; x++)
		{
			// Capture the stuff between the start and stop key strings.
			var gmatch = googLinks[x].href.match( /\/imgres\?imgurl\=(.*?)\&imgrefurl\=/ );

			// If it matched successfully...
			if (gmatch)
			{
				// Replace the link's href with the contents of the text captured in the regular expression's parenthesis.
				addCSSMagic(googLinks[x], decodeURI(gmatch[1]));
			}
		}

	}
    else
    { //CustomizeGoogle Extension has already changed the hrefs

		// Get a list of all A tags containing IMG tags.
		googLinks = selectNodes(doc, doc.body, "//A[.//IMG]");

		for (var x=0; x<googLinks.length; x++)

		{
			addCSSMagic(googLinks[x], googLinks[x].href);
		}

	}
}


