// ==UserScript==
// @name           (dm) Egotastic Link Swapper
// @namespace      EgotasticLinkTools
// @description    swap egotastic image links to direct image links.
// @include        http://egotastic.com/*
// @match          http://egotastic.com/*
// ==/UserScript==

/*
 * Known Issues:
 * 
 *  The script by design does not swap the large main image when looking at a
 *  gallery. This is so if you wish you can easily click it to cycle to the
 *  next image. You can get the direct link below it on the gallery index.
 */

/*
 * Set to false if you don't want to remove the scroller like if you have
 * javascript turned on. Useful if you just want the link swapping function.
 */
var jsdisabled = true;

/*
 * xpat (xpatexpr, start_node, single_node)
 *         xpatexpr = XPathEvaluation expression.
 *         start_node = starting point node ie 'document'
 *        single_node = boolean true/false whether to return
 *            just a single first found node
 *
 * Performs XPath evaluation and returns xpath result or
 * single node if boolean true.
 */
function xpat(xpatexpr, start_node) {
    var xpat_tmp;
    var nsResolver = document.createNSResolver(
            start_node.ownerDocument === null ?
                    start_node.documentElement :
                        start_node.ownerDocument.documentElement);

    if (arguments.length < 2) {
        throw "Xpath call error missing parameter, 1st argument was: " +
        arguments[0];
    }
    return document.evaluate(xpatexpr, start_node, nsResolver,
            7, null);
}

function xpgetArray (xpathresult) {
    var counter, length, newArray = [];
    var rtn_val;

    switch (xpathresult.resultType) {
    case 0: //  XPathResult['ANY_TYPE'] = 0;
        // this shouldn't happen
        break;
    case 1: //  XPathResult['NUMBER_TYPE'] = 1;
        rtn_val = [xpathresult.numberValue];
        break;
    case 2: //  XPathResult['STRING_TYPE'] = 2;
        rtn_val = [xpathresult.stringValue];
        break;
    case 3: //  XPathResult['BOOLEAN_TYPE'] = 3;
        rtn_val = [xpathresult.booleanValue];
        break;
    case 4: //  XPathResult['UNORDERED_NODE_ITERATOR_TYPE'] = 4;
        while (length=xpathresult.iterateNext()) { newArray.push(length); }
        rtn_val = newArray;
        break;
    case 5: //  XPathResult['ORDERED_NODE_ITERATOR_TYPE'] = 5;
        while (length=xpathresult.iterateNext()) { newArray.push(length); }
        rtn_val = newArray;
        break;
    case 6: //  XPathResult['UNORDERED_NODE_SNAPSHOT_TYPE'] = 6;
        if (xpathresult.snapshotLength > 0) {
            for (counter = 0, length = xpathresult.snapshotLength; counter < length; counter += 1) {
                newArray.push(xpathresult.snapshotItem(counter));
            }
        }
        rtn_val = newArray;
        break;
    case 7: //  XPathResult['ORDERED_NODE_SNAPSHOT_TYPE'] = 7;
        if (xpathresult.snapshotLength > 0) {
            for (counter = 0, length = xpathresult.snapshotLength; counter < length; counter += 1) {
                newArray.push(xpathresult.snapshotItem(counter));
            }
        }
        rtn_val = newArray;
        break;
    case 8: //  XPathResult['ANY_UNORDERED_NODE_TYPE'] = 8;
        rtn_val = [xpathresult.singleNodeValue];
        break;
    case 9: //  XPathResult['FIRST_ORDERED_NODE_TYPE'] = 9;
        rtn_val = [xpathresult.singleNodeValue];
        break;
    default:
        break;
    }
    return rtn_val;
}


function cleanlink(url) {
	return url.replace(/-\d+x\d+(\....)$/i, '$1').replace(/_lead(\....)$/i, '$1');
}

function unhide() {
	//get rid of the scrolling crap
	var image_container, image_slider, ul, li, li_length, counter, arrows, dupe, dupes = [], dupecheck = {};
	
	image_container = document.getElementById('image-gallery-container');
	if (!image_container) {
		// not a gallery page so get out
		return;
	}
	image_container.removeAttribute('class');
	image_slider = document.getElementById('image-gallery-slider');
	image_slider.setAttribute('style', 'display: block; visibility: visible; position: relative; z-index: 2; left: 0px; width: 440px;');
	
	ul = image_slider.getElementsByTagName('ul');
	ul[0].setAttribute('style', 'margin-top: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px; position: relative; list-style-type: none; z-index: 1; ');
	
	li = ul[0].getElementsByTagName('li');
	li_length = li.length;
	
	for (counter = 0; counter < li_length; counter += 1) {
		img = li[counter].getElementsByTagName('img')[0];
		if (dupecheck[img.src] === true) {
			dupes.push(li[counter]);
		} else {
			li[counter].setAttribute('style', 'overflow-x: hidden; overflow-y: hidden; float: left; width: 100px; height: 100px;');
			dupecheck[img.src] = true;
		}
	}
	
	while (dupes.length > 0) {
		deletenode(dupes.pop());
	}
	
	li = ul[0].getElementsByTagName('li');
	li_length = li.length;
	image_container.setAttribute('style', 'height: ' + (20 + Math.ceil(li_length / 4) * 100) + 'px;');
	
	arrows = xpgetArray(xpat('//span[contains(@class, "arrw")]', document));
	deletenode(arrows.shift());
	deletenode(arrows.shift());
}

function deletenode (node) {
	node.parentNode.removeChild(node);
}

function swaplinks() {
	var baseimg, newimg;
	var image_container;
	var imgs, imgsl, counter, tmpref;
	var mainimg;
	var urllist = [];
	
	image_container = document.getElementById('image-gallery-container');

	// grab all images
	if (image_container) {
		imgs = image_container.getElementsByTagName("img");
	} else {
		imgs = document.getElementsByTagName("img");
		
	}
	imgsl = imgs.length;
	
	// swap all the links to direct links.
	for (counter = 0; counter < imgsl; counter += 1) {
		tmpref = imgs[counter].parentNode;
	
		// make sure the image is child of a link
		if (tmpref.nodeName === 'A') {
			// make sure the image points to something we care about not like a button or something
			if (/egotastic\.com\/wp-content\/uploads\//i.test(imgs[counter].src)) {
				if (image_container) {
					tmpref.href = cleanlink(imgs[counter].src);
				} else {
//					if (imgs[counter].className === 'attachment-thumbnail') } || imgs[counter].className === 'attachment-medium') {
					if (imgs[counter].className === 'attachment-thumbnail') {
						tmpref.href = cleanlink(imgs[counter].src);
					}
				}
				urllist.push(tmpref.href);
			}
		}
	}
	showdump(urllist);
}
function showdump(urllist) {
	var urltxt = urllist.join('\r\n');
    var textbox = document.createElement("textarea");
    var slider = document.getElementById('image-gallery-slider');
    if (!slider) {
    	return; // we're not on a gallery page
    }
    textbox.style.width = '100%';
    textbox.style.height = '20px';
    textbox.innerHTML = urltxt;
    slider.insertBefore(textbox, slider.firstChild);

}
if (jsdisabled === true) {
	unhide();
}
swaplinks();
