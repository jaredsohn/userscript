// ==UserScript==
// @name           Gawker Gallery Expander
// @namespace      http://userscripts.org/users/124800
// @description    Displays large gallery images on Gawker sites without making you click stupid thumbnails. Works on Gawker, Deadspin, Kotaku, Jezebel, io9, Jalopnik, Gizmodo, Lifehacker and Fleshbot.
// @include        http://*gawker.com/*/*
// @include        http://*deadspin.com/*/*
// @include        http://*kotaku.com/*/*
// @include        http://*kotaku.com.au/*/*
// @include        http://*jezebel.com/*/*
// @include        http://*io9.com/*/*
// @include        http://*jalopnik.com/*/*
// @include        http://*gizmodo.com/*/*
// @include        http://*lifehacker.com/*/*
// @include        http://*fleshbot.com/*/*
// ==/UserScript==

/*************************

VERSION HISTORY:

v1.1.0 - 21 July, 2010:
 - Images larger than browser window dimensions are now resized to fit. Click resized images to display their full size.
 - Left sidebar is now hidden on gallery pages to give a larger viewing area.

v1.0.0 - 20 March, 2010:
 - Initial release.
 
**************************/

// the getElementsByClassName() function below is from:
// http://code.google.com/p/getelementsbyclassname/

var getElementsByClassName = function (className, tag, elm){
	if (document.getElementsByClassName) {
		getElementsByClassName = function (className, tag, elm) {
			elm = elm || document;
			var elements = elm.getElementsByClassName(className),
				nodeName = (tag)? new RegExp("\\b" + tag + "\\b", "i") : null,
				returnElements = [],
				current;
			for(var i=0, il=elements.length; i<il; i+=1){
				current = elements[i];
				if(!nodeName || nodeName.test(current.nodeName)) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	else if (document.evaluate) {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = "",
				xhtmlNamespace = "http://www.w3.org/1999/xhtml",
				namespaceResolver = (document.documentElement.namespaceURI === xhtmlNamespace)? xhtmlNamespace : null,
				returnElements = [],
				elements,
				node;
			for(var j=0, jl=classes.length; j<jl; j+=1){
				classesToCheck += "[contains(concat(' ', @class, ' '), ' " + classes[j] + " ')]";
			}
			try	{
				elements = document.evaluate(".//" + tag + classesToCheck, elm, namespaceResolver, 0, null);
			}
			catch (e) {
				elements = document.evaluate(".//" + tag + classesToCheck, elm, null, 0, null);
			}
			while ((node = elements.iterateNext())) {
				returnElements.push(node);
			}
			return returnElements;
		};
	}
	else {
		getElementsByClassName = function (className, tag, elm) {
			tag = tag || "*";
			elm = elm || document;
			var classes = className.split(" "),
				classesToCheck = [],
				elements = (tag === "*" && elm.all)? elm.all : elm.getElementsByTagName(tag),
				current,
				returnElements = [],
				match;
			for(var k=0, kl=classes.length; k<kl; k+=1){
				classesToCheck.push(new RegExp("(^|\\s)" + classes[k] + "(\\s|$)"));
			}
			for(var l=0, ll=elements.length; l<ll; l+=1){
				current = elements[l];
				match = false;
				for(var m=0, ml=classesToCheck.length; m<ml; m+=1){
					match = classesToCheck[m].test(current.className);
					if (!match) {
						break;
					}
				}
				if (match) {
					returnElements.push(current);
				}
			}
			return returnElements;
		};
	}
	return getElementsByClassName(className, tag, elm);
};

function basename (path, suffix) {
    // Returns the filename component of the path  
    // 
    // version: 910.820
    // discuss at: http://phpjs.org/functions/basename    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   improved by: Ash Searle (http://hexmen.com/blog/)
    // +   improved by: Lincoln Ramsay
    // +   improved by: djmix
    // *     example 1: basename('/www/site/home.htm', '.htm');    // *     returns 1: 'home'
    // *     example 2: basename('ecra.php?p=1');
    // *     returns 2: 'ecra.php?p=1'
    var b = path.replace(/^.*[\/\\]/g, '');
        if (typeof(suffix) == 'string' && b.substr(b.length-suffix.length) == suffix) {
        b = b.substr(0, b.length-suffix.length);
    }
    
    return b;}

function substr_count (haystack, needle, offset, length) {
    // Returns the number of times a substring occurs in the string  
    // 
    // version: 909.322
    // discuss at: http://phpjs.org/functions/substr_count    // +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
    // +   bugfixed by: Onno Marsman
    // *     example 1: substr_count('Kevin van Zonneveld', 'e');
    // *     returns 1: 3
    // *     example 2: substr_count('Kevin van Zonneveld', 'K', 1);    // *     returns 2: 0
    // *     example 3: substr_count('Kevin van Zonneveld', 'Z', 0, 10);
    // *     returns 3: false
    var pos = 0, cnt = 0;
     haystack += '';
    needle += '';
    if (isNaN(offset)) {offset = 0;}
    if (isNaN(length)) {length = 0;}
    offset--; 
    while ((offset = haystack.indexOf(needle, offset+1)) != -1){
        if (length > 0 && (offset+needle.length) > length){
            return false;
        } else{            cnt++;
        }
    }
 
    return cnt;}

function gebi(el)
{
	return document.getElementById(el);
}

/////////////  end functions  /////////////////////////// 

// make sure images are being showcased, not videos
if (gebi("thumb_list"))
{
	if (substr_count(gebi("thumb_list").innerHTML, "play_icon") == 0)
	{
		// get the JSON image data, but I can't be bothered parsing it properly so let's split/explode instead
		var galleryData = gebi("wrapper").innerHTML;
		galleryData = galleryData.split('galleryData = {"success":true,"images":[');
		galleryData = galleryData[1].replace(/"bigimageHeight"/g, '');
		var imageData = galleryData.split("{");
		var bigImages = '';
		var bigImgSrc = '';
		var newHtml = '';
		var imgCount = 1;
		
		// hide the left sidebar to get the biggest image viewing area
		gebi("sidebar").style.display = "none";
		gebi("container").id = "";
		gebi("wrapper").id = "";

		// remove the top 500x image
		var galleryImage = getElementsByClassName("gallery_image", "span");
		for (keyVar in galleryImage)
		{
			galleryImage[keyVar].innerHTML = '';
		}

		// replace the thumbs with nice anchored link ones
		var thumbItems = getElementsByClassName("gpager_control", "img");
		imgCount = 1;
		var thumbHtml = '';
		for (keyVar in thumbItems)
		{
			// make sure thumb hasn't already been added
			if (substr_count(thumbHtml, basename(thumbItems[keyVar].src)) == 0)
			{
				thumbHtml += '<div class="item"><a href="#img'+imgCount+'">';
				thumbHtml += '<img class="gpager_control" src="'+thumbItems[keyVar].src+'" alt="" /></a></div>\n';
				imgCount++;
			}
		}
		
		// add the thumbs to the page
		gebi("thumb_list").innerHTML = '<div style="padding:10px 0 5px 20px">Jump to an image:</div>\n'+thumbHtml;

		// loop through each image
		imgCount = 1;
		for (keyVar in imageData)
		{
			// note: sometimes multiple image sizes are found, so we'll only add the last size found (which should be the biggest)
			bigImages = imageData[keyVar].split(',"bigimage');
			for (keyVar in bigImages)
			{
				bigImgSrc = bigImages[keyVar].split('"');
				bigImgSrc = bigImgSrc[2];
			}
			if (bigImgSrc != null)
			{
				bigImgSrc = bigImgSrc.replace(/\\/g, "");
				// make sure img hasn't already been added and that my makeshift JSON parsing has actually found an img src
				if (substr_count(newHtml, basename(bigImgSrc)) == 0 && bigImgSrc.substr(0, 7) == 'http://')
				{
					newHtml += '<a name="img'+imgCount+'"></a><img class="bigImg" onclick="this.style.width=\'\'; this.style.height=\'\'; this.style.cursor=\'default\'" src="'+bigImgSrc+'" alt="" style="float:none;margin:20px 0 0 10px" /><br />\n';
					imgCount++;
				}
			}
		}
		
		// add the big imgs to the page
		gebi("thumb_list").innerHTML += '<div style="clear:both;padding-left:10px">'+newHtml+'</div>';

		// resize imgs that are wider than the window...
		// wait 2 seconds for img requests to be sent first so we can get their dimensions
		// .. should really wait using some other method but meh
		setTimeout(function(){
			var bigImgs = getElementsByClassName("bigImg", "img");
			for (keyVar in bigImgs)
			{
				if (bigImgs[keyVar].height > window.innerHeight)
				{
					bigImgs[keyVar].style.height = (window.innerHeight - 30) + "px";
					bigImgs[keyVar].style.cursor = "-moz-zoom-in";
				}
				if (bigImgs[keyVar].width + 70 > window.innerWidth)
				{
					bigImgs[keyVar].style.width = (window.innerWidth - 100) + "px";
					bigImgs[keyVar].style.height = "";
					bigImgs[keyVar].style.cursor = "-moz-zoom-in";
				}
			}
		}, 2000);
		
		// hide the right-hand image navigation browser
		var galleryThumbsDiv = getElementsByClassName("galleryThumbnails", "div");
		for (keyVar in galleryThumbsDiv)
		{
			galleryThumbsDiv[keyVar].style.display = "none";
		}
	}
}

// FIN