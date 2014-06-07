// ==UserScript==
// @name          Craigslist image preview 2.3
// @description   View craigslist image previews
// @include       http://*.craigslist.org/*
// @include       http://*.craigslist.ca/*
// @exclude       http://*.craigslist.org/
// @exclude       http://*.craigslist.ca/
// ==/UserScript==

/*
Modified: 20100106
By: Imran Niazi
   Fixed double images (craigslist own image preview version adds an image preview.  it was fixed actually in the craigslist image 
   preview 2.2 (labeled as '2' in the script) but it broke the mouse over preview of the images. I put in the compare to see if the
   previous link isnt the same check in this one from 2.2.
*/

/*
Modified: 20100106
By: Jared Dutton
Changes:
	Got the script from user Kite
	Not concerned with history of the script so removed comments referring to changes
	Changed some of the function and variable names to be more meaningful
	Added some comments to clarify different sections of code
	Added maxImages so that ads with lots of images don't slow things too much
		(I was getting annoyed at ads with 50+ images)
	Changed to display image in corner to prevent page from bouncing while looking at full sized image
TODO: Add max images to preferences
TODO: Make full sized width more intelligent / add maximum height, choose one of them if keep aspect ratio isn't selected, otherwise use both
*/

/* This is a reworking of "Craigslist image preview" by Jeffrey Palm.
 * I fixed 3 bugs & added 2 improvements.
 * Bug fix #1 (missing thumbnails): the image preview didn't appear if the original img 
 * tag in the ad has any attribute (style, border, etc.) before the source attribute.
 * Bug fix #2 (small pics blown up): Small images were enlarged.
 * Bug fix #3 (internationalize): Now works in Canada too.
 * Improvement #1 (small-pics clutter): filter out small images, so that they don't even appear
 * Improvement #2 (enlarge thumbnail on mouseover): up to 550x600 pixels.
 * All my changes are shown with a VERSION 2 CODE comment.
 */

// --------------------------------------------------
// misc
// --------------------------------------------------

var PREFIX = "*cs*.";
var SIZE_PARAM = "size";
var KEEP_ASPECT_RATIO_PARAM = "aspect.ratio";
var CLASS = "showFullSize";
var size = 0;
var mouseMoves = 0;
var lastImg;
var maxImages = 7;
var fullSizeDiv;
var fullSizeWidth = 450;

function updateFullSizeImage(url) {
	var images = document.getElementsByName("FullSizeImage");
	var image = images[0];

	image.src=url;
	if (url == '')
	{
		image.style.visibility="hidden";
 	}
 	else
 	{
		image.style.visibility="visible";
 	}
}

function setValue(key,val) {
  GM_setValue(PREFIX + key,val);
  return val;
}

function getValue(key,defaultValue) {
  var res = GM_getValue(PREFIX + key);
  if (!res) res = defaultValue;
  return res;
}

/**
 * String[tag] (Node) -> Node
 * Creates a new node.
 */
function newNode(tag,on) {
  var e = document.createElement(tag);
  if (on) on.appendChild(e);
  return e;
}

/**
 * String[text] (Node) -> Node
 * Creates a new text node.
 */
function newTextNode(text,on) {
  var e = document.createTextNode(text);
  if (on) on.appendChild(e);
  return e;
}

/**
 * Node Node -> Void
 * Inserts newNode before target.
 * http://lists.xml.org/archives/xml-dev/200201/msg00873.html
 */
function insertBefore(newNode,target) {
  var parent   = target.parentNode;
  var refChild = target; //target.nextSibling;  
  if(refChild) parent.insertBefore(newNode, refChild);
  else parent.appendChild(newNode);  
}

function showImages(_link) {
  var link = _link;
  return function(details) {
    if (details.responseText) {
      
      // Get the links to images from the target page via regular expression
      if (images = details.responseText.match(/<img ([^>]+)>/gi)) {

        //
        // Go thru the links
        // div will hold the new div below the links parent
        //
        var div;
        for (j=0; j<images.length && j<maxImages; j++) {
          currentImage = images[j];
          if (!currentImage) continue;

          // Make sure that we aren't dealing with an array          
          currentImage = currentImage.split('src="')[1];
          currentImage = currentImage.split('"')[0];

          // On first pass through for loop create the div to hold the links
          if (!div) {
            var d = newNode("div",link.parentNode);
            var br = newTextNode(" ",link.parentNode);
            div = newNode("div",link.parentNode);
          }

          // Create the link and image and add them
          var newA = newNode("a",div);
          var img = newNode("img",newA);
          img.className = CLASS;
          img.src = currentImage;

          // Change the size of the image for the thumbnails
          // Don't change the height if we're keeping the aspect ratio
          if (!keepAspectRatio) {
            img.style.maxWidth = size + "px";
          }
          img.style.maxHeight = size + "px";

          newTextNode(" ",div);
          newA.href = currentImage;

          // Filter out small images, add mouseover blowups
          // Do this by deleting the parent node that was created earlier
          img.addEventListener("load", function() {
                                 if (this.height < size) {
                                   this.parentNode.parentNode.removeChild(this.parentNode);
                                 } 
                              },true);

          // Set the large image to the one being moused over
          img.addEventListener("mouseover", function() { updateFullSizeImage(this.wrappedJSObject.src) },true);
                               
          // When mouse out of an image set it back to original size
          img.addEventListener("mouseout", function() { updateFullSizeImage('') },true);

        }
      }
    }
  };
}

// Add input boxes at top for preferences
function addLinkAtTop() {

  var span = newNode("span");
  span.style.verticalAlign = "middle";

  newTextNode("change size: ",span);

  var sel = newNode("select",span);
  for (var i=10; i<=300; i += 10) {
    var opt = newNode("option",sel);
    opt.value = i;
    if (i == size) opt.selected = true;
    opt.innerHTML = i;
  }
  sel.addEventListener("change",function() {
                         var v = sel.value;
                         size = setValue(SIZE_PARAM,v);
                         changeSizes();
                       },true);

  newTextNode(" keep aspect ratio: ",span);

  var check = newNode("input",span);
  check.type = "checkbox";
  if (keepAspectRatio) check.checked = "1";
  check.addEventListener("change",function() {
                           var v = check.checked;
                           keepAspectRatio = setValue(KEEP_ASPECT_RATIO_PARAM,v);
                           changeSizes();
                         },true);
  
  var tab = document.getElementById("topbar");
  if (!tab) {
    tab = document.getElementsByTagName("table")[0];
  }
  tr = newNode("tr",tab);
  td = newNode("td",tab);
  td.appendChild(span);
  tab.insertBefore(tr,tab.firstChild);
}

// This changes the thumbnail sizes when called
function changeSizes() {
  var imgs = document.getElementsByTagName("img");
  for (var i in imgs) {
    var img = imgs[i];
    if (img.className != CLASS) continue;

    // Change the sizes of the images
    // 1.5: Don't change the height if we're keeping the aspect ratio
    if (!keepAspectRatio) {
      img.style.maxWidth = size + "px";
    }
    img.style.maxHeight = size + "px";
  }
}

// Loop through all the ads on the page to show their images
function loopThroughAds() {
  //
  // find all the links to listings and display the images
  // This goes through the sale item links and sends them to showImages to show the images
  links = document.getElementsByTagName("a");
  for (i=0; i<links.length; i++) {
  
    if(i==0 || (link!=links[i-1])){

		link = links[i];

		// If the target page is a craigslist ad, get the link and send it to the showImages function
		if (link.href && link.href.match(/.*craigslist.*\/\d+\.html$/)) {
		GM_xmlhttpRequest({
			method:"GET",
				url: link.href,
				headers:{
				"User-Agent": "monkeyagent",
				"Accept":"text/html,text/monkey,text/xml,text/plain"
				},
				onload: showImages(link)
			});
		}
	}
  }
}

// Get preferences, show preferences at top, loop through ads to show images
function main() {
  var largeImage = document.createElement("div");
  largeImage.innerHTML = '<div style="position: fixed; top: 2em; right: 2em; "><img id="FullSizeImage" style="visibility: hidden; border-style: solid; border-color: black; border-width: 2 " name="FullSizeImage" src="" width="' + fullSizeWidth + '"></div>'
  document.body.insertBefore(largeImage,document.body.firstChild);

  size = getValue(SIZE_PARAM,100);
  keepAspectRatio = getValue(KEEP_ASPECT_RATIO_PARAM,true);
  addLinkAtTop();
  loopThroughAds();

}

try {main();} catch (e) {}
