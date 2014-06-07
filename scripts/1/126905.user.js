// ==UserScript==
// @name           Cam4 Archived Images - Gallery
// @namespace      cam4
// @description    Displays thumbnails for all images at once
// @include        http://de.cam4.com/*/archive/*
// @include        http://www.cam4.com/*/archive/*
// ==/UserScript==


// evaluate XPath
var xpath = function (xpath, refNode) {
    var n = [],
        res = (refNode.ownerDocument || refNode).evaluate(xpath, refNode, null,
              XPathResult.ORDERED_NODE_ITERATOR_TYPE, null),
        r = res.iterateNext();
    while (r != null) {
        n[n.length] = r;
        r = res.iterateNext();
    }
    return n;
}


// remove column containing ads
var adsCol = xpath("//div[contains(@id,\"right-content\")]", document)[0];
if (adsCol)
    adsCol.parentNode.removeChild(adsCol);


// function to set picture
setPic = function(picId) {
    bigpic.src = url.replace(/\/\d*.jpg/g, "/" + picId + ".jpg");
}


// find script div containing image ids
var mc = document.getElementById("main-content")
var scripts = xpath("//div[contains(@class,\"archive-container\")]/script", mc);
var sf = scripts[0].innerHTML;
// "Parse" script: Simply evaluate it up to the loadimages call and return
// the generated "snapshots" array
var indLI = sf.lastIndexOf("loadimages");
if (indLI >= 0)
    sf = sf.substring(0, indLI);
var snapshots = (new Function(sf + "return snapshots;"))();


// find picture div, current picture URL
bigpic = xpath("//div[contains(@class,\"bigpic\")]/img", document)[0];
url = bigpic.src;


// increase size of thumbnail box, add scroll bar
var thumbsrow = xpath("//div[contains(@class,\"thumbsrow\")]", document)[0];
thumbsrow.style.height = "500px";
thumbsrow.style.width = "auto";
thumbsrow.style.padding = "5px 5px 5px 5px";
thumbsrow.style.margin = "5px 30px 5px 450px";
thumbsrow.style.overflow = "scroll";

// Build HTML for image gallery. Could be improved!!

// template for each thumbnail image, _FUNC_ and _ID_ are placeholders for
// the function to call on click and the image id
var template = '<div style="border:0px; border-left: 1px solid #E0E0E0; width: 120px; float: left; clear: none;" id="_ID_"><a href="javascript:_FUNC_"><img style="border: 0px;" src="http://99.192.241.34/CDN/snap/120x90/_ID_.jpg" alt="0"></a></div>';
var pics= "";
for (var i = 0; i < snapshots.length; i++)
{
    // This should call the setPic function defined above.
    // Can't get this to work right, so completely inline it here
    var func = "(function(){bigpic=document.evaluate('//div[contains(@class,&quot;bigpic&quot;)]/img',document,null,XPathResult.ORDERED_NODE_ITERATOR_TYPE,null).iterateNext();bigpic.src=bigpic.src.replace(/\\d*.jpg/g,'_ID_.jpg');})()"
    pics+= template.replace(/_FUNC_/, func).replace(/_ID_/g, snapshots[i]);
}
thumbsrow.innerHTML = pics;
