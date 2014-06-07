// ==UserScript==
// @author         Crend King
// @version        1.3.3
// @name           Image fix and linkify
// @namespace      http://users.soe.ucsc.edu/~kjin
// @description    Show and reload broken images, and linkify images.
// @include        http://*
// @include        https://*
// @homepage       http://userscripts.org/scripts/show/23775
// @downloadURL    https://userscripts.org/scripts/source/23775.user.js
// @updateURL      https://userscripts.org/scripts/source/23775.meta.js
// ==/UserScript==

/*

version history

1.3.3 on 04/22/2009:
- Add keyboard shortcut option (alt+r).

1.3.2 on 04/15/2009:
- Add option to skip tiny img nodes in fail safe function.

1.3.1 on 04/14/2009:
- Fix bug in reload function.

1.3 on 04/11/2009:
- Refactor fail safe code for higher compatibility.

1.2.6 on 04/09/2009:
- Fix XPath bug in 1.2.5.
- Ignore images with no src attribute for linkification

1.2.5 on 04/07/2009:
- Ignore images with no src attribute for fail safe.

1.2.4 on 03/30/2009:
- Fix fail safe bug in version 1.2.3.

1.2.3 on 03/26/2009:
- Use onclick instead of hyperlink to linkify images.

1.2.2 on 03/16/2009:
- Fix false linkification on image nodes who have onclick event.

1.2.1 on 03/14/2009:
- Only linkify images whose ancestor nodes are not anchors or have onclick event.

1.2 on 03/13/2009:
- Rewrite the script with XPath, simplify code.
- Add option to force no border for linked images.
- Fix one-level onclick event problem.

1.1 on 05/18/2008:
- Rewrote the script to support Firefox 3.

1.0.2 on 05/07/2008:
- Added "Reload Missing Images" function (Greasemonkey user script menu).

1.0.1 on 03/30/2008:
- Fixed problem when an image is assigned some events, such as onClick or onMouseDown. This problem may cause some script-based pages malfunction.

1.0 on 03/14/2008:
- This script is incompatible with Windows Live Hotmail. I added it in the exclude list. If you find any other incompatible site, please tell me. Thank you!

*/


///// preference section /////

// whether or not replace failed images with Firefox default broken icon
// also endow failed images possibility of reloading
const use_fail_safe = true;

// whether or not linkify images
const do_linkify = true;

// if linkify, whether or not link in new tab
const link_in_new_tab = true;

// if enabled, linked images have no border
// this will overwrite image's original style!
// otherwise, no change about images' borders will be made
const link_force_no_border = true;

// if the width OR the height of an img node is smaller than this value
// it will be skipped in the fail safe function
const min_dimension = 10;

// use this option to enable/disable keyboard shortcut (alt+r).
const key_shortcut = true;

///// code section /////

const backup_attr = ["src", "width", "height", "onload"];
const backup_dest = "ifal";
const broken_icon = "resource://gre/res/broken-image.gif";
const icon_dimension = 16;
const base_on_error = 'src="' + broken_icon + '"; removeAttribute("onload");';
const menu_text = "Reload broken images";

// use onerror event to replace broken image with Firefox broken icon
// also backup original image information for reload
// if the image is successfully loaded, onerrer will not be called,
// and thus will not be replaced with broken icon
function fail_safe(img_node)
{
	// make backup
	// original width and height will be overwriten by the dimension of the broken icon
	// original onload will be suppressed
	var backup = {};	
	var this_on_error = base_on_error;
	
	for (var i = 0; i < backup_attr.length; i++)
	{
		var attr = backup_attr[i];
		if (img_node.hasAttribute(attr))
			backup[attr] = img_node.getAttribute(attr);
	}
	
	if (img_node.hasAttribute("width"))
	{
		// skip this node if its width is too small
		if (img_node.getAttribute("width") < min_dimension)
			return;
		
		this_on_error += ' width="' + icon_dimension + '";';
	}
	
	if (img_node.hasAttribute("height"))
	{
		// skip this node if its width is too small
		if (img_node.getAttribute("height") < min_dimension)
			return;
		
		this_on_error += ' height="' + icon_dimension + '";';
	}
	
	// stringify and store the backup in custom backup attribute
	img_node.setAttribute(backup_dest, backup.toSource());
	
	// set up onerror even
	img_node.setAttribute("onerror", this_on_error);
	
	// force the image to reload from cache
	// if reload fails, onerror will be effective
	img_node.src = img_node.src;
}

// linkify an image node
// use onclick to open image tab
function linkify(img_node)
{
	if (link_in_new_tab)
		img_node.setAttribute("onclick", 'window.open("' + img_node.src + '")');
	else
		img_node.setAttribute("onclick", 'window.location="' + img_node.src + '"');
	
	// change cursor style to hand
	img_node.style.cursor = "pointer";
}

function reload()
{
	// only broken image nodes have custom backup attribute, created by onerror event
	var imgs = document.evaluate("//img[@" + backup_dest + "]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < imgs.snapshotLength; i++)
	{
		var curr_node = imgs.snapshotItem(i);
		
		// restore backup
		var backup = eval(curr_node.getAttribute(backup_dest));
		
		// restore original image information
		for (var attr in backup)
			curr_node.setAttribute(attr, backup[attr]);
		
		// onerror and backup attribute are not touched
		// if this image fail again, onerror event will be triggered again
	}
}

function on_keypress(event)
{
	if (event.ctrlKey || event.shiftKey || event.metaKey)
		return;
	
	var key_code = String.fromCharCode(event.which);
	if (key_code == 'r' && event.altKey)
	{
		reload()
		event.preventDefault();
	}
}

if (use_fail_safe)
{
	// if the image node has its own onerror event, do not overwrite it
	var imgs = document.evaluate("//img[@src and not(@onerror)]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < imgs.snapshotLength; i++)
		fail_safe(imgs.snapshotItem(i));
}

if (do_linkify)
{
	// only linkify image nodes whose ancestor nodes are not anchors or have onclick event
	var imgs = document.evaluate("//img[@src and not(@onclick) and count(ancestor::*[name() = 'A' or @onclick][1]) = 0]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < imgs.snapshotLength; i++)
		linkify(imgs.snapshotItem(i));
}

GM_registerMenuCommand(menu_text, reload);

if (key_shortcut)
	document.addEventListener("keypress", on_keypress, true);