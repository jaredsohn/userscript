// ==UserScript==
// @name          Add Enlarge Picture Option to eBay Search Results
// @description   This script adds an "Enlarge" link to all search results on ebay.co.uk and ebay.com. Hover the mouse over the link to enlarge the thumbnail picture.
// @author        nice_bow_tie
// @homepage      http://userscripts.org/scripts/show/68201
// @updateURL     http://userscripts.org/scripts/source/68201.meta.js
// @downloadURL   http://userscripts.org/scripts/source/68201.user.js
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_xmlhttpRequest
// @grant         GM_addStyle
// @grant         GM_deleteValue
// @grant         GM_log
// @grant         GM_registerMenuCommand

// @include       http://www.ebay.co.uk/*
// @include       http://www.ebay.com/*
// @include       http://stores.ebay.co.uk/*
// @include       http://stores.ebay.com/*
// @include       http://my.ebay.co.uk/*
// @include       http://my.ebay.com/*

// @version       0.9.2

// @nbt:changelog 0.9.1  Fixed: Enlarged pictures were sometimes cropped on lower resolution displays
// @nbt:changelog 0.9.1  Fixed: Didn't work on the new search results page design
// @nbt:changelog 0.9.1  Pressing F1 while viewing an enlarged picture will now open the script settings window
// @nbt:changelog 0.9    Updated the appearance of the image pop-up and scroll box
// @nbt:changelog 0.9    Fixed a problem with enlarged pictures sometimes not displaying correctly in Google Chrome
// @nbt:changelog 0.9    Improved compatibility with the new search results page design
// @nbt:changelog 0.9    Other minor bug-fixes and code improvements
// @nbt:changelog 0.8.3  Fixed: Enlarge links were sometimes only shown on the first 11 results
// @nbt:changelog 0.8.3  Fixed: Now works on the new gallery view page design (the Enlarge link is overlaid on the gallery image)
// @nbt:changelog 0.8.3  Better support for Opera and other browsers that don't use the Greasemonkey API
// @nbt:changelog 0.8.2  A few bugfixes
// @nbt:changelog 0.8.1  Fixed an issue where the "More options" pop-up on some results was blank
// @nbt:changelog 0.8.1  Pictures are now always enlarged to at least 400px on the longest side
// @nbt:changelog 0.8.1  Starting from the next update, the script installer will be run automatically after you agree to update
// @nbt:changelog 0.8    Fixed various problems caused by the updated search page layout
// @nbt:changelog 0.7    Fixed a problem that caused Enlarge to not appear on some results
// @nbt:changelog 0.7    Better compatibility with Google Chrome

// ==/UserScript==

(function(){

var SCRIPT_NAME        = "Add Enlarge Picture Option to eBay Search Results";
var SCRIPT_VERSION     = "0.9.2.20130812";

var SCRIPT_HOMEPAGE    = "http://userscripts.org/scripts/show/68201";
var SCRIPT_URL         = "https://userscripts.org/scripts/source/68201.user.js";

var NEW_LINK_TEXT      = "Enlarge";
var HOVER_DELAY        = 250; //initial delay in ms
var AUTO_UPDATE_PERIOD = 48;  //hours between automatic update checks
var MAX_IMAGE_COUNT    = 20;  //maximum number of enlarged pictures to show

var HOSTNAME           = window.location.hostname;
var SITE               = HOSTNAME.substr(HOSTNAME.lastIndexOf(".ebay.") + 1);

var page_is_my_ebay    = (HOSTNAME == "my." + SITE);

//localise the 'enlarge' text for a few non-english sites; the script only runs
//on ebay.com and ebay.co.uk by default, and those are the only officially
//supported and tested sites, but users of other sites may add custom includes
if (SITE == "ebay.de")  NEW_LINK_TEXT = "Vergrößern";
if (SITE == "ebay.es")  NEW_LINK_TEXT = "Ampliar";
if (SITE == "ebay.it")  NEW_LINK_TEXT = "Ingrandisci";

var popup, settings_dlg = null, modal_bg_mask = null;
var arrow_control, arrow_control_inner;
var activated_by_click, active_link = null;
var link_array = [], delay_timer = null;
var link_data_array = [];
var current_focus = null;
var drag_delta = {x:0, y:0};

if (window.self != window.top || window.location.pathname.indexOf("/itm/") == 0)
	return;

// ===========================================================================

//check if the Greasemonkey API is supported
//if not, add some functions so the script will at least run without error,
//even if it's not fully functional
//assume that if GM_addStyle doesn't exist, none of the others do either
if (typeof GM_addStyle != "function")
{
	//GM_addStyle can be implemented
	GM_addStyle = function(css)
	{
		var style = document.createElement("style");
		style.textContent = css;
		document.getElementsByTagName("head")[0].appendChild(style);
	};

	//cross-domain XHR can't be simulated without server-side help, so just
	//call the onerror handler if it exists
	GM_xmlhttpRequest = function(details)
	{
		if (details && details.onerror) details.onerror();
	};

	//everything else is just a no-op
	GM_getValue = GM_setValue = GM_log = GM_registerMenuCommand = function(){};
}

// ===========================================================================

//has_storage is true if GM_getValue and GM_setValue are available and working
var has_storage = (function()
{
	var ts = +new Date()+"";
	var key = "__TEST__";
	GM_setValue(key, ts);
	var has_storage = (GM_getValue(key) == ts);
	if (typeof GM_deleteValue == "function") GM_deleteValue(key);
	return has_storage;
})();

// ===========================================================================

function Preference(name, default_value)
{
	this.name = name;
	this.value = GM_getValue(this.name);
	if (typeof this.value == "undefined")
		this.value = default_value;
}

Preference.prototype.Update = function(new_value)
{
	var updated = (this.value !== new_value);
	if (updated)
		GM_setValue(this.name, this.value = new_value);
	return updated;
}

var prefs = {
	click_to_enlarge    : new Preference("ClickToEnlarge", false),
	add_to_myebay       : new Preference("AddToMyEbay",    false),
	auto_update_enabled : new Preference("AutoUpdate",     has_storage)
};

// ===========================================================================
// HELPER FUNCTIONS
// ===========================================================================

//helper function: does node have class class_name?
function HasClass(node, class_name)
{
	var classes = (node && node.className) ? node.className.split(" ") : [];
	for (var i = 0; i < classes.length; i++)
		if (classes[i] == class_name)
			return true;
	return false;
}

//helper function: add class class_name to node
function AddClass(node, class_name)
{
	if (node && !HasClass(node, class_name))
		node.className = node.className ? (node.className + " " + class_name) : class_name;
}

//helper function: remove class class_name from node
function RemoveClass(node, class_name)
{
	if (node && node.className)
	{
		var classes = node.className.split(" ");
		for (var i = 0; i < classes.length; i++)
			if (classes[i] == class_name)
				classes.splice(i--, 1);
		node.className = classes.join(" ");
	}
}

//helper function: return the first ancestor node with class class_name
function GetAncestorByClassName(node, class_name)
{
	while (node && !HasClass(node, class_name)) node = node.parentNode; return node;
}

//helper function: does the node have this ancestor node?
function HasAncestor(node, ancestor)
{
	if (ancestor == null) return false;
	while (node && node != ancestor) node = node.parentNode; return (node == ancestor);
}

//helper function: run regex re on data_string and return the match at index match_index, or the default_value
function RegExMatch(data_string, re, match_index, default_value)
{
	var ar = data_string ? data_string.match(re) : null;
	return (ar && match_index < ar.length) ? ar[match_index] : default_value;
}

//convert a string into a DOM node (or nodes), and return the top-level node(s)
//return_first = true: only return the first top-level node
function StringToDOM(html_string, return_first)
{
	var node = document.createElement("div");
	node.innerHTML = html_string;
	switch (node.childNodes.length)
	{
		case 0:  return null;
		case 1:  return node.firstChild;
		default: return return_first ? node.firstChild : Array.prototype.slice.call(node.childNodes, 0);
	}
}

//evaluate the expression in xpath and return the result
//context_node = context node for the query (if null, uses 'document')
//result_type = type of XPathResult to return
function XPath_Evaluate(xpath, context_node, result_type)
{
	return document.evaluate
		(xpath, context_node || document, null, result_type, null);
}

//evaluate the expression in xpath and return the first matching node
//context_node = context node for the query (if null, uses 'document')
function XPath_Node(xpath, context_node)
{
	var result_type = XPathResult.FIRST_ORDERED_NODE_TYPE;
	return XPath_Evaluate(xpath, context_node, result_type).singleNodeValue;
}

//return a predicate string (in square brackets) that can be used in an
//xpath expression to select elements with class class_name
function XPath_ClassSelect(class_name)
{
	var str = "";
	for (var i = 0; i < arguments.length; i++)
		str += (i?" or ":"") +
			"contains(concat(' ',normalize-space(@class),' '),' " + arguments[i] + " ')";
	return "["+str+"]";
}

// ===========================================================================
// SCRIPT FUNCTIONS
// ===========================================================================

//calculate the layout for displaying the img relative to the ref_node
//if img == null, calculate the layout for largest possible fully-visible image
//return: {popup_left, popup_top, img_width, img_height}
function CalculateLayout(ref_node, img)
{
	var layout = {};

	var r = ref_node.getBoundingClientRect();
	var margin = 15; //margin around popup

	var viewport_width  = document.documentElement.clientWidth;
	var viewport_height = document.documentElement.clientHeight;

	if (popup.querySelector("img") == null) //at the first call
	{
		popup.style.top = "-999px";
		popup.style.display = "block";
		CalculateLayout.padding = {	h:popup.offsetWidth  + 2 * margin,
		                            v:popup.offsetHeight + 2 * margin };
		popup.style.display = "none";
	}

	var padding = CalculateLayout.padding;
	var max_img_width  = Math.max(r.left, viewport_width - r.right)- padding.h;
	var max_img_height = viewport_height - padding.v;
	var on_left = (r.left > viewport_width - r.right);

	if (img)
	{
		var h = img.naturalHeight || img.height;
		var w = img.naturalWidth  || img.width;

		//scale up small images to 400px on the longest side
		var scale_by = 400 / Math.max(h, w);
		if (scale_by > 1.1) {h *= scale_by; w *= scale_by;}

		//scale down big images so they fit in the max image size
		scale_by = Math.min(max_img_width / w, max_img_height / h);
		if (scale_by < 1) {h *= scale_by; w *= scale_by;}

		//must be a minimum of 300px on the longest side
		var scale_by = 300 / Math.max(h, w);
		if (scale_by > 1) {h *= scale_by; w *= scale_by;}

		layout.img_width  = w;
		layout.img_height = h;
	}
	else
	{
		layout.img_width  = max_img_width;
		layout.img_height = max_img_height;
	}

	if (on_left)
		layout.popup_left = r.left - layout.img_width - padding.h;
	if (!on_left || layout.popup_left < 0)
		layout.popup_left = r.right;

	layout.popup_top  = r.top - 100;
	//take arrow ctrl into account on the overlay design
 	if (ref_node.firstChild == arrow_control_inner)
		layout.popup_top += arrow_control_inner.offsetHeight;
	var total_height = layout.img_height + padding.v;
	if (layout.popup_top + total_height > viewport_height)
		layout.popup_top = viewport_height - total_height;
	layout.popup_top = Math.max(layout.popup_top, 0);

	layout.popup_left += margin + window.scrollX;
	layout.popup_top  += margin + window.scrollY;

	return layout;
}

//display the current enlarged image + arrow control, or an error message if no images are loaded
//active_link is the current active link object
function DisplayCurrentImage()
{
	if (delay_timer != null || active_link.image_count < 1)
		return;

	if (active_link.image_number > active_link.image_count)
		active_link.image_number = active_link.image_count; //set to last image if invalid index

	if (active_link.image_number > active_link.img_array.length)
		return; //image to display is not yet loaded

	var img = active_link.img_array[active_link.image_number-1];
	var layout = CalculateLayout(active_link.link_node, img);
	if (popup.style.display == "none" || !HasAncestor(img, popup))
	{
		img.style.width  = (img.width  = layout.img_width)  + "px";
		img.style.height = (img.height = layout.img_height) + "px";

		//add current image to popup window...
		if (popup.firstChild) popup.removeChild(popup.firstChild);
		popup.appendChild(img);

		//...and display it
		popup.style.top = "-99999px";
		popup.style.left = layout.popup_left + "px";
		popup.style.display = "block";
		RemoveClass(active_link.link_node, "nbt-wait");
		RemoveClass(arrow_control_inner, "nbt-wait");
		popup.style.top = layout.popup_top + "px";
		RemoveClass(popup, "nbt-wait-img");

		if (window.chrome)
		{
			//this fixes a weird Chrome display glitch where sometimes the
			//popup isn't correctly painted
			popup.style.opacity = 0.99;
			setTimeout(function(){popup.style.opacity = 1;}, 0);
		}
	}

	//update arrow control
	var left_arrow = arrow_control_inner.childNodes[0];
	left_arrow.className = (active_link.image_number > 1) ? "nbt-active-arrow" : "";
	var right_arrow = arrow_control_inner.childNodes[2];
	right_arrow.className = (active_link.image_number < active_link.image_count) ? "nbt-active-arrow" : "";
	var arrow_text = arrow_control_inner.childNodes[1];
	arrow_text.innerHTML = active_link.image_number + "<span style=\"padding-right:2px\"> of </span>" + active_link.image_count;

	//position arrow control
	arrow_control_inner.style.display = (active_link.image_count > 1) ? "block" : "none";
	if (HasClass(active_link.link_node, "nbt-enlarge-link-overlay"))
	{
		if (active_link.link_node.firstChild != arrow_control_inner)
			active_link.link_node.insertBefore(arrow_control_inner, active_link.link_node.firstChild);
	}
	else
	{
		var link_rect = active_link.link_node.getBoundingClientRect();
		if (!arrow_control.firstChild)
			arrow_control.appendChild(arrow_control_inner);
		arrow_control.style.paddingBottom = (5 + link_rect.height) + "px";
		var left_delta = link_rect.width - arrow_control_inner.offsetWidth;
		if (layout.popup_left < link_rect.left && left_delta < 0)
			left_delta = 0;
		if (left_delta > 0) left_delta /= 2;
		arrow_control.style.top = (link_rect.top + link_rect.height - arrow_control.offsetHeight + window.scrollY) + "px";
		arrow_control.style.left = (link_rect.left + left_delta - arrow_control_inner.offsetLeft + window.scrollX) + "px";
		arrow_control.style.visibility = (active_link.image_count > 1) ? "visible" : "hidden";
	}
}

//convert an eBay-hosted image URL to the next best size (or the best size if get_best_size is true)
//if the URL is not an eBay-hosted image, or it's already the least preferable size, then it's returned unchanged
function ConvertImageURL(url, get_best_size)
{
	//eBay-hosted images are stored at various sizes, with a number suffix on the filename to indicate
	//the size... the script is interested in the following sizes (in order of preference):
	//1. standard enlarge size: suffix 12
	//2. supersize: suffix 3
	//3. listing page size: suffix 35 or 2 (there seems to be 2 slightly different naming schemes)

	var ar = url ? url.match(/^(http:\/\/i\d*.ebayimg.com\/.+?)(~~_|_)(\d+)(.jpg|.gif|.png)$/i) : null;
	if (ar == null) return url;

	ar.shift();
	if (get_best_size)    ar[2] = 12;
	else if (ar[2] == 12) ar[2] = 3;
	else if (ar[2] == 3)  ar[2] = (ar[1] == "~~_") ? 35 : 2;

	return ar.join("");
}

function MakeGalleryURL(item_id, image_no, offset, version)
{
	return "http://galleryplus.ebayimg.com/ws/web/" +
	       item_id+"_"+image_no+"_"+(version||0)+"_1"+(offset||"")+".jpg";
}

//image onload handler
function ImageLoaded(e)
{
	//check the link is still activated
	if (active_link && active_link.img_loading == this)
	{
		active_link.img_array.push(this);
		active_link.img_loading = null;
		DisplayCurrentImage();
		if (active_link.image_count > 0)
			LoadNextImage(); //image count is known, so load next image
	}
}

//image error handler
function ImageError(e)
{
	//check the link is still activated
	if (active_link && active_link.img_loading == this)
	{
		if (active_link.image_urls.length > active_link.img_array.length)
		{
			//if the error happens when loading a URL from image_urls, see if there's an alternative
			//URL available for this image... if so, retry with the new URL
			var image_urls_index = active_link.img_array.length;
			var new_url = ConvertImageURL(this.src);
			if (this.src == active_link.image_urls[image_urls_index] && this.src != new_url)
			{
				this.src = active_link.image_urls[image_urls_index] = new_url;
				return;
			}
		}

		if (active_link.img_array.length == 0)
		{
			//failed to load the first image, so push an error message instead
			//this will be displayed in the popup in place of an image
			var span = document.createElement("span");
			span.innerHTML = "Error loading<br>picture";
			active_link.img_array.push(span);
		}

		active_link.img_loading = null;
		active_link.image_count = active_link.img_array.length;
		DisplayCurrentImage();
	}
}

//load next image
function LoadNextImage()
{
	var image_no = active_link.img_array.length + 1;

	if (image_no > active_link.image_number + 2)
		return; //only load up to 2 pictures ahead of the current one

	if (active_link.image_count < 0 || image_no <= active_link.image_count)
	{
		var img = active_link.img_loading = document.createElement("img");
		img.style.display = "block";
		img.addEventListener("load", ImageLoaded, false);
		img.addEventListener("error", ImageError, false);

		//load from image_urls if possible, but if it's the first image or if image_urls is empty
		//then use the default format URL instead
		if (image_no > 1 && active_link.image_urls.length >= image_no)
			img.src = active_link.image_urls[image_no-1];
		else
			img.src = MakeGalleryURL(active_link.item_id, image_no);
	}
}

//get the image count for the current result
//return either the image count or a URL that can be queried to get information
//about the images in the listing
function GetImageCount(link_node, item_id)
{
	var image_count, xhr_path, attr, re;
	if (link_node && (attr = link_node.getAttribute("onmouseover") || link_node.getAttribute("onmouseover_nbt")))
	{
		//old-style 'Enlarge' link
		re = /"images":(\d+)/;
		if (image_count = RegExMatch(attr, re, 1))
			return image_count;

		//old-style 'More options' link
		re = /^return preview\(event, "(?:http:\/\/.+?)?((\/sch)?\/preview\/[^"]{1,300})"/;
		if (xhr_path = RegExMatch(attr, re, 1))
			return xhr_path;
	}

	if (link_node && (attr = link_node.getAttribute("onclick")))
	{
		//old-style 'Quick look' and 'More options' links
		re = /^return showMoreInfo\(event, "((\/sch)?\/moreinfo\/[^"]{1,300})"/;
		if (xhr_path = RegExMatch(attr, re, 1))
			return xhr_path + (xhr_path.indexOf("?") >= 0 ? "&" : "?") + "_dlg=1&_jgr=0&_ts=" + (+new Date());
	}

	if (link_node && (attr = link_node.getAttribute("url")))
	{
		//new-style 'Quick look' and 'More options' links
		re = /^http:\/\/.+?(\/.+)/;
		if (xhr_path = RegExMatch(attr, re, 1))
			return xhr_path + (xhr_path.indexOf("?") >= 0 ? "&" : "?") + "_fly=1&_ql=1&scp=ce0";
	}

	if (link_node && (attr = link_node.getAttribute("c")))
	{
		//old-style 'Enlarge' link on new page design
		re = /^\s*(\d+)\s*$/;
		if (image_count = RegExMatch(attr, re, 1))
			return image_count;
	}

	return 1;
}

//image count callback
//extract the image information from response_data, add the image URLs to
//image_urls and return the number of images found
function GetImageCount_Callback(response_data, item_id, image_urls)
{
	if ((response_data+"").indexOf(item_id) == -1)
		return 1;

	//read the custom image URLs from the data
	var ar, data = RegExMatch(response_data, /"imageUrls":\[(.*?)\]/, 1, "");
	var re = /"(.+?)",?/g;
	while ((ar = re.exec(data)) != null)
	{
		if (/^http:\/\//.test(ar[1]))
			image_urls.push(ConvertImageURL(ar[1], true));
	}

	if (image_urls.length == 0)
	{
		re = /\{"viewer":\{"itemId":"\d+","version":(\d\d?),"count":(\d\d?)/;
		if (ar = response_data.match(re))
		{
			for (var i = 1; i <= ar[2]; i++)
				image_urls.push(MakeGalleryURL(item_id, i, null, +ar[1]));
		}

		data = RegExMatch(response_data, /"picModelList":\[(.*?)\]/, 1);
		re = /\{"offset":(null|"\d{3}"),"(?:picCount|count)":(\d\d?),"version":(\d\d?)\},?/g;

		while ((ar = re.exec(data)) != null)
		{
			var offset = (ar[1] == "null") ? null : ("_" + ar[1].substr(1,3));
			for (var i = 1; i <= ar[2]; i++)
				image_urls.push(MakeGalleryURL(item_id, i, offset, +ar[3]));
		}
	}

	return image_urls.length ? image_urls.length :
			+RegExMatch(response_data, /"(?:images|count)":(\d+),/, 1, 0) || 1;
}

//set the image count for link to image_count...
//if image_count is null, get the image count from GetImageCount_Callback
function SetImageCountForLink(link, image_count, response_data)
{
	if (link.image_count < 0) //mustn't be already set
	{
		if (typeof image_count != "number")
			image_count = GetImageCount_Callback(response_data, link.item_id, link.image_urls);

		link.image_count = Math.min(image_count || 1, MAX_IMAGE_COUNT);
	}
}

//callback function for the XHR request used to find the image count and URLs
//for the current link... if the request timed out, response_data is undefined
function ImageCountCallback(this_link, response_data)
{
	window.clearTimeout(this_link.xhr_timer);

	if (this_link.image_count < 0) //mustn't be already set
	{
		//set the image count
		SetImageCountForLink(this_link, null, response_data);

		if (this_link == active_link)
		{
			//show the current image
			DisplayCurrentImage();
			//if the first image is already loaded, continue with the next one
			if (active_link.img_array.length > 0)
				LoadNextImage();
		}
	}
}

//this is the starting point of the picture display process for the link enlarge_link
//by_click indicates whether activation is the result of a click or a hover
function Activate(enlarge_link, by_click)
{
	if (active_link == null && (!prefs["click_to_enlarge"].value || by_click))
	{
		activated_by_click = by_click;

		//get the link_data for this link
		var link_data = null;
		for (var i = 0; i < link_data_array.length; i++)
			if (link_data_array[i].new_link == enlarge_link)
			{
				link_data = link_data_array[i];
				break;
			}

		//try to get item number from the href of a link in the current result node
		var item_id = null;
		if (link_data && link_data.result_cell)
		{
			var nodes = link_data.result_cell.querySelectorAll("a[href]");
			for (var i = 0; i < nodes.length; i++)
				if (item_id = nodes[i].href.match(/QQitemZ(\d+)QQ|\/(\d+)\?|&item=(\d+)&/))
				{
					item_id = item_id[1] || item_id[2] || item_id[3];
					break;
				}
		}

		if (item_id)
		{
			for (var i = 0; i < link_array.length; i++)
				if (link_array[i].link_node == enlarge_link)
					break;

			if (i == link_array.length)
				link_array[i] = { link_node     : enlarge_link,
				                  image_count   : -1, //unknown
				                  image_number  : 1,
				                  img_array     : [],
				                  image_urls    : [],
				                  xhr_timer     : null };

			var this_link = active_link = link_array[i];

			active_link.item_id = item_id;
			active_link.img_loading = null;
			//an active link has higher z-index so it displays correctly in front of the arrow control
			if (HasClass(active_link.link_node, "nbt-enlarge-link"))
				active_link.link_node.style.zIndex = 500002;

			delay_timer = window.setTimeout(function() {
					delay_timer = null;
					AddClass(active_link.link_node, "nbt-wait");
					DisplayCurrentImage(); //this resets the cursor if image is displayed
				}, activated_by_click ? 10 : HOVER_DELAY);

			if (active_link.image_count < 0)
			{
				var result = GetImageCount(link_data.cur_link, item_id);

				if (!isNaN(result))
					SetImageCountForLink(active_link, +result);

				else if (active_link.xhr_timer == null)
				{
					//this timer will fire if the XHR call takes too long or fails
					active_link.xhr_timer = window.setTimeout(function() {ImageCountCallback(this_link);}, 5000);

					//call the URL, then pass the response and callback to ImageCountCallback
					GM_xmlhttpRequest({ method: "GET", url: "http://"+window.location.hostname+result,
					                    onload: function(response)
					                    {
					                        if (response && response.status == 200)
					                            ImageCountCallback(this_link, response.responseText);
											else
					                            ImageCountCallback(this_link);
					                    },
					                    onerror: function()
					                    {
					                        ImageCountCallback(this_link);
					                    }
					                 });
				}
			}

			LoadNextImage(); //load the first picture
		}
	}
}

//hide the enlarged image for the currently active link
//by_click indicates whether it's the result of a click (or escape-key press), or a mouseout
function Deactivate(by_click)
{
	//only deactivate if currently active and it was activated in the same way
	if (active_link && by_click == activated_by_click)
	{
		//this check resets the image number if the current image hasn't yet loaded
		if (popup.style.display == "block" && active_link.image_number > active_link.img_array.length)
			active_link.image_number = active_link.img_array.length || 1;

		window.clearTimeout(delay_timer);

		popup.style.display = "none";
		arrow_control.style.visibility = "hidden";
		arrow_control_inner.style.display = "none";

		RemoveClass(active_link.link_node, "nbt-wait");
		if (HasClass(active_link.link_node, "nbt-enlarge-link"))
			active_link.link_node.style.zIndex = 0;
		active_link = null;
	}
}

//show the next or previous picture, return true if handled, else false
function ShowNext(show_next)
{
	if (arrow_control_inner.style.display == "none")
		return false;

	if (typeof ShowNext.last_scroll_time == "undefined") ShowNext.last_scroll_time = 0;

	//add a short delay, so that scrolling isn't too fast
	var new_scroll_time = new Date().getTime();
	if (new_scroll_time - ShowNext.last_scroll_time > 100)
	{
		ShowNext.last_scroll_time = new_scroll_time;

		if (show_next)
		{
			if (active_link.image_number == active_link.img_array.length)
			{
				//at the last loaded image...
				if (active_link.img_array.length < active_link.image_count)
				{
					//...but more to come, so wait for the new image to load
					++active_link.image_number;
					AddClass(popup, "nbt-wait-img");
					AddClass(active_link.link_node, "nbt-wait");
					AddClass(arrow_control_inner, "nbt-wait");
				}
			}
			else if (active_link.image_number < active_link.img_array.length)
			{
				DisplayCurrentImage(++active_link.image_number);
				LoadNextImage();
			}
		}

		else if (active_link.image_number > 1)
			DisplayCurrentImage(--active_link.image_number);
	}

	return true;
}

//mouse over/out handler for existing links
//this delays the mouseover event, to prevent the annoying behaviour where the
//popup appears every time the mouse pointer just moves across the link
function CurLinkMouseHandler(e)
{
	if (typeof CurLinkMouseHandler.timer == "undefined")
		CurLinkMouseHandler.timer = null;

	switch (e.type)
	{
		case "mouseover":
		{
			if (CurLinkMouseHandler.timer == null)
			{
				var onmouseover = e.target.getAttribute("onmouseover_nbt");
				if (onmouseover)
					e.target.setAttribute("onmouseover", onmouseover);
				CurLinkMouseHandler.timer = window.setTimeout(function()
				{
					var event = document.createEvent("MouseEvents");
					event.initMouseEvent("mouseover", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
					e.target.dispatchEvent(event);
					CurLinkMouseHandler.timer = null;
				}, HOVER_DELAY);
				e.stopPropagation(); //prevent eBay's mouseover handler running
			}
			break;
		}

		case "mouseout":
		{
			if (e.target.hasAttribute("onmouseover_nbt"))
				e.target.removeAttribute("onmouseover");
			if (CurLinkMouseHandler.timer)
			{
				window.clearTimeout(CurLinkMouseHandler.timer);
				CurLinkMouseHandler.timer = null;
				e.stopPropagation(); //prevent eBay's mouseout handler running
			}
			break;
		}
	}
}

//enlarge link onclick handler
function EnlargeClicked(e)
{
	if (e.target == this && this.lastChild && this.lastChild.focus)
		this.lastChild.focus();

	if (HasAncestor(e.target, arrow_control_inner))
		return; //clicking the arrow control shouldn't deactivate the link

	if (active_link && active_link.link_node == this)
		Deactivate(true);
	else
		Activate(this, true);

	e.preventDefault(); //prevent default click action
}

//enlarge link keydown handler
function EnlargeKeyDown(e)
{
	var key = e.keyCode;
	if (key == 13) //enter
		EnlargeClicked.call(this, e);
	else if (active_link && active_link.link_node == this)
	{
		if (key == 27) //escape
			Deactivate(true);
		if (key >= 37 && key <= 40 && ShowNext(key == 39 || key == 40))
			e.preventDefault(); //prevent default page scroll action
	}
}

//enlarge link onmouseover handler
function EnlargeMouseOver(e)
{
	if (!HasAncestor(e.relatedTarget, this))
		Activate(this, false);
}

//enlarge link onmouseout handler
function EnlargeMouseOut(e)
{
	if (!HasAncestor(e.relatedTarget, this))
		if (active_link && active_link.link_node == this && !HasAncestor(e.relatedTarget, arrow_control))
			Deactivate(false);
}

//arrow control onmouseout handler
function ArrowControlMouseOut(e)
{
	if (!HasAncestor(e.relatedTarget, arrow_control) && active_link && !HasAncestor(e.relatedTarget, active_link.link_node))
		Deactivate(false);
}

//document onclick handler
function DocumentClicked(e)
{
	if (active_link && !HasAncestor(e.target, active_link.link_node) &&
	                   !HasAncestor(e.target, popup) &&
	                   !HasAncestor(e.target, arrow_control) &&
	                   !HasAncestor(e.target, settings_dlg) &&
	                   !HasAncestor(e.target, modal_bg_mask))
		Deactivate(true);
}

//document mousescroll handler
function DocumentMouseScroll(e)
{
	if (active_link && (HasAncestor(e.target, active_link.link_node) || HasAncestor(e.target, arrow_control)))
		if (ShowNext(e.wheelDelta ? e.wheelDelta < 0 : e.detail > 0))
			e.preventDefault(); //prevent default page scroll action
}

//dialog drag handler
function DragMove(e)
{
	if (settings_dlg)
	{
		settings_dlg.style.left = (e.pageX - drag_delta.x) + "px";
		settings_dlg.style.top = (e.pageY - drag_delta.y) + "px";
	}
	e.preventDefault();
}

//dialog drag end handler
function DragEnd(e)
{
	document.removeEventListener("mousemove", DragMove, true);
	document.removeEventListener("mouseup", DragEnd, true);
	RemoveClass(document.documentElement, "move-cursor");
	e.preventDefault();
}

//dialog drag start handler
function DragBegin(e)
{
	if (e.target == this && e.which == 1)
	{
		document.addEventListener("mousemove", DragMove, true);
		document.addEventListener("mouseup", DragEnd, true);
		AddClass(document.documentElement, "move-cursor");

		drag_delta.x = e.pageX - (parseInt(settings_dlg.style.left, 10) || 0);
		drag_delta.y = e.pageY - (parseInt(settings_dlg.style.top, 10) || 0);

		e.preventDefault();
	}
}

//document keydown handler
function DocumentKeyDown(e)
{
	//close settings dialog if the Escape key is pressed
	if (settings_dlg && settings_dlg.style.display != "none" && e.keyCode == 27)
	{
		Ctrl("cancel").click();
		e.preventDefault();
	}
}

//return the settings dialog control with the given name
function Ctrl(name) {return settings_dlg.elements.namedItem(name);}

//set the tab order to simulate a modal dialog
//show = true: enable only descendents of modal_div to get tab focus
function SetModalTabOrder(modal_div, show)
{
	var tabIndex_elements = "a, area, button, input, object, select, textarea, frame, iframe, div.scroll, div.scro";
	var i, qsa = document.querySelectorAll(tabIndex_elements);

	if (show)
	{
		for (i = 0; i < qsa.length; i++)
		{
			if (qsa[i].hasAttribute("tabIndex"))
				qsa[i].setAttribute("tabIndex-old", qsa[i].tabIndex);
			qsa[i].tabIndex = -1;
		}

		qsa = modal_div.querySelectorAll(tabIndex_elements);
		for (i = 0; i < qsa.length; i++)
			qsa[i].tabIndex = 1;
	}
	else
	{
		for (i = 0; i < qsa.length; i++)
		{
			if (qsa[i].hasAttribute("tabIndex-old"))
			{
				qsa[i].tabIndex = qsa[i].getAttribute("tabIndex-old");
				qsa[i].removeAttribute("tabIndex-old");
			}
			else
				qsa[i].removeAttribute("tabIndex");
		}
	}
}

//display the settings dialog
function ShowSettingsDlg()
{
	ShowSettingsDlg.firstRun = typeof ShowSettingsDlg.firstRun == "undefined";

	//create settings dialog
	settings_dlg = StringToDOM("<form id='nbt-settings-dlg' style='display:none;'>" +
		"<h3><a class='nbt-close-btn' title='Close without saving changes' href='javascript:;' name='cancel'></a></h3><div>" +
		"<div class='nbt-table'><table cellspacing='0' cellpadding='0' border='0'>" +
		"<tr><td>Script name:</td><td><b>"+SCRIPT_NAME+"</b></td></tr>" +
		"<tr><td>Version:</td><td>"+SCRIPT_VERSION+"</td></tr>" +
		"<tr><td>Author:</td><td>nice_bow_tie</td></tr>" +
		"<tr><td>Home page:</td><td><a href='"+SCRIPT_HOMEPAGE+"'>"+SCRIPT_HOMEPAGE+"</a></td></tr>" +
		"<tr><td>&nbsp;</td></tr>" +
		"<tr><td colspan='2'>To comment on this script or report any problems, please <a href='http://contact."+ SITE +
		"/ws/eBayISAPI.dll?ContactUserNextGen&recipient=nice_bow_tie'>contact me</a>.</td></tr>" +
		"</table></div>" +
		"<div><label><input type='checkbox' name='click_to_enlarge'> Turn on 'click to enlarge' mode</label><br>" +
		"<label><input type='checkbox' name='add_to_myebay'> Add enlarge links to items listed in My eBay</label><br>" +
		"<label"+(!has_storage?" style='color:#888'":"")+"><input type='checkbox' name='auto_update_enabled'"+(!has_storage?" disabled":"")+"> Check for script updates automatically (recommended)</label><br>" +
		"<label><input type='checkbox' name='update_cb'> <a href='javascript:;' name='update_check'>Check for script update now</a></label></div>" +
		"<p class='nbt-buttons'><input type='button' name='apply' value='Apply changes'> &nbsp;<input type='button' name='cancel' value='Cancel'></p>" +
		"</div></form>");
	document.body.appendChild(settings_dlg);

	//create modal background overlay
	modal_bg_mask = StringToDOM("<div id='nbt-modal-bg-mask'>&nbsp;</div>");
	document.body.appendChild(modal_bg_mask);

	if (ShowSettingsDlg.firstRun)
		GM_addStyle(
		"#nbt-settings-dlg {position:fixed; border:solid #888 1px; padding:0; box-shadow:0.5em 0.5em 1.5em #888; background:#fff; z-index:600001; white-space:nowrap;}" +
		"#nbt-settings-dlg h3 {background-color:#ddd; background:-webkit-linear-gradient(top,#fff,#ccc); background:-moz-linear-gradient(top,#fff,#ccc); margin:0; padding:0; line-height:0; text-align:right; cursor:move;}" +
		"#nbt-settings-dlg > div {margin:1em;}" +
		"#nbt-settings-dlg .nbt-table {border:solid #888 1px; padding:0.6em 1em; margin-bottom:1em;}" +
		"#nbt-settings-dlg table td {padding:2px 0; color:#000;}" +
		"#nbt-settings-dlg table td:first-child {padding-right:1.5em;}" +
		"#nbt-settings-dlg label {color:#000;}" +
		"#nbt-settings-dlg .nbt-buttons {text-align:center; padding-top:1em;}" +
		"#nbt-settings-dlg .nbt-buttons input {font-size:100%; padding:0.2em 1em;}" +
		"#nbt-settings-dlg .nbt-buttons input[name='apply'] {font-weight:bold;}" +
		"#nbt-settings-dlg .nbt-buttons input:enabled {cursor:pointer;}" +
		"#nbt-settings-dlg input[name='update_cb'] {visibility:hidden;}" +
		"#nbt-settings-dlg a {text-decoration:none; color:#0000cc;}" +
		"#nbt-settings-dlg a:hover {text-decoration:underline;}" +
		"#nbt-settings-dlg a.nbt-close-btn {cursor:pointer; margin:0.3em 0.5em; display:inline-block; width:18px; height:18px; background:transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAARdJREFUKM99kk2Kg0AQhZ8h68ZDuHaRVQ7RJ5AcQsgiYCf+Id4l4E2EgIEQW7qTM+g+vCxCZBydqVVR9b4q6lFo25b7/Z7WWuKP6LqOYRiybVuuzucztNaI4xiPx2MGGWOYpimMMaiq6lOMoohSSu52Oz6fzxGy1jIIAkopqZQiADjfZhRFvF6vcF0XRVHg9XrhdDphGAb4vo+yLJ0JAACHw4G32w2u64Ik+r6fiGfATwjATAwAq9/Aer1ezBcBpRSbpoEQAkIIXC4XJEkycc5ZEqdpCpLIsgzDMGCz2SDPc2cyWUrJIAhojBknaq1HW4/H48fWLMtY1zWEEMjzHJ7nTY7UWvO7abvdAvf7nWEY/vsaWuvxNd4oua6GpFHfqwAAAABJRU5ErkJggg==) 3px 3px no-repeat;}" +
		"#nbt-settings-dlg a.nbt-close-btn:hover {text-decoration:none; outline:dotted 1px #000;}" +
		"#nbt-modal-bg-mask {position:fixed; z-index:600000; width:100%; height:100%; background:rgba(255, 255, 255, 0.6); top:0; left:0; cursor:default;}" +
		".move-cursor, .move-cursor * {cursor:move !important;}" +
		".progress-cursor, .progress-cursor * {cursor:progress !important;}");

	document.addEventListener("keydown", DocumentKeyDown, false);
	settings_dlg.addEventListener("click", SettingsDlgClick, false);
	settings_dlg.firstChild.addEventListener("mousedown", DragBegin, false);

	SetModalTabOrder(settings_dlg, true);

	window.setTimeout(function() {

		Ctrl("click_to_enlarge").checked    = prefs["click_to_enlarge"].value;
		Ctrl("add_to_myebay").checked       = prefs["add_to_myebay"].value;
		Ctrl("auto_update_enabled").checked = prefs["auto_update_enabled"].value;

		Ctrl("apply").disabled = true;

		//centre dialog in the browser window
		settings_dlg.style.display = "";
		var left = (modal_bg_mask.offsetWidth - settings_dlg.offsetWidth) / 2;
		settings_dlg.style.left = (left > 0 ? left : 0) + "px";
		var top = (modal_bg_mask.offsetHeight - settings_dlg.offsetHeight) / 2 * 0.9;
		settings_dlg.style.top =  (top > 0 ? top : 0) + "px";

		current_focus = document.activeElement;
		Ctrl("cancel").focus();

		if (!has_storage)
			window.alert("Note: the \""+SCRIPT_NAME+"\" script uses Greasemonkey-specific APIs that are not supported by your browser. Any settings you change here will be reverted when you load a new page, and will not be permanently saved.");

	}, 500);
}

//settings dialog click handler
function SettingsDlgClick(e)
{
	switch (e.target.name)
	{
		case "apply":
		{
			if (prefs["auto_update_enabled"].value && !Ctrl("auto_update_enabled").checked &&
				!confirm("You have selected to disable automatic update checks. You will no longer be notified when a new version of the script is available.\n\nAre you sure you wish to continue?"))
				return;

			//save updated settings
			var updated_1 = prefs["click_to_enlarge"]   .Update(Ctrl("click_to_enlarge").checked);
			var updated_3 = prefs["add_to_myebay"]      .Update(Ctrl("add_to_myebay").checked);
			var updated_4 = prefs["auto_update_enabled"].Update(Ctrl("auto_update_enabled").checked);

			if (page_is_my_ebay && updated_3)
			{
				//reload the page
				AddClass(document.documentElement, "progress-cursor");
				window.location.reload();
				return;
			}
			//fall through
		}

		case "cancel":
		{
			RemoveClass(settings_dlg, "progress-cursor");
			SetModalTabOrder(settings_dlg, false);

			document.removeEventListener("keydown", DocumentKeyDown, false);
			settings_dlg.removeEventListener("click", SettingsDlgClick, false);
			settings_dlg.firstChild.removeEventListener("mousedown", DragBegin, false);

			settings_dlg.parentNode.removeChild(settings_dlg);
			settings_dlg = null;
			modal_bg_mask.parentNode.removeChild(modal_bg_mask);
			modal_bg_mask = null;

			//set focus back to previous element
			if (current_focus && current_focus.focus)
				current_focus.focus();
			return;
		}

		case "update_check":
		{
			if (!HasClass(settings_dlg, "progress-cursor"))
			{
				AddClass(settings_dlg, "progress-cursor");
				CheckForUpdate(true, function() {RemoveClass(settings_dlg, "progress-cursor");});
			}
			e.preventDefault();
			return;
		}

		case "click_to_enlarge":
		case "add_to_myebay":
		case "auto_update_enabled":
		{
			Ctrl("apply").disabled = false;
			return;
		}
	}
}

// ===========================================================================
// FUNCTION: CheckForUpdate (manual_check, callback)
// Check for an update to the script and if one exists, let the user know.
// manual_check = true if the user initiated the check, or false otherwise
// callback     = function to call when the check is complete, but before
//                any UI is displayed (use with manual check only, can be null)
// Requires the following variables to be defined:
//    AUTO_UPDATE_PERIOD, SCRIPT_NAME, SCRIPT_VERSION, SCRIPT_URL
// ===========================================================================

function CheckForUpdate(manual_check, callback)
{
	//compare two version strings each containing up to 3 dot-separated numbers
	//return true if 'version' is a higher version number than 'cur_version'
	function IsHigherVersion(version, cur_version)
	{
		version = version.split(".");
		cur_version = cur_version.split(".");

		for (var i = 0; i < 3; i++)
		{
			var diff = (+version[i] || 0) - (+cur_version[i] || 0);
			if (diff > 0) return true;
			if (diff < 0) break;
		}

		return false;
	}

	var ts = new Date().getTime();
	var current_hour = parseInt(ts/3600000, 10);
	var last_checked_hour = +GM_getValue("LastUpgradeCheck") || 0;

	//only do automatic checks every AUTO_UPDATE_PERIOD hours
	if (!manual_check && current_hour < last_checked_hour + AUTO_UPDATE_PERIOD)
		return;

	GM_setValue("LastUpgradeCheck", current_hour);

	//skip the first automatic check, and all automatic checks in environments
	//where LastUpgradeCheck can't be set (for example, in native Google Chrome
	//which doesn't support GM_get/setValue)
	if (!manual_check && last_checked_hour == 0)
	{
		GM_log("Skipping automatic update check");
		return;
	}

	var xhr = {
		method: "GET",
		url:    SCRIPT_URL.replace(/.user.js$/, ".meta.js") + "?ts="+ts
	};

	//XMLHttpRequest error handler
	xhr.onerror = function()
	{
		if (callback) callback();

		if (manual_check)
		{
			try {window.alert("An error occurred.");}
			catch(e) {GM_log(e.message);}
		}

		GM_log("Update check failed");
	}

	//XMLHttpRequest load handler
	xhr.onload = function(response)
	{
		if (!response || response.status != 200)
		{
			xhr.onerror();
			return;
		}

		if (callback) callback();

		var re = /@version[ \t]+(\d+(?:\.\d+)*)/;
		var new_version = RegExMatch(response.responseText, re, 1) || "0";

		var new_version_found = IsHigherVersion(new_version, SCRIPT_VERSION);
		var new_changes = [];

		//loop through all @nbt:changelog entries
		var exec_result, re = /@nbt:changelog[ \t]+(\d+(?:\.\d+)*)[ \t]*(.*)/g;
		while (exec_result = re.exec(response.responseText))
		{
			//check if the changelog entry is for a later version of the script
			if (IsHigherVersion(exec_result[1], SCRIPT_VERSION))
			{
				var changelog_entry = exec_result[2];
				if (changelog_entry != "")
				{
					//add this entry to the changes array, ignore duplicates
					for (var i = 0; i < new_changes.length; i++)
						if (new_changes[i] == changelog_entry)
							break;
					if (i == new_changes.length)
						new_changes.push(changelog_entry);
				}
			}
		}

		if (new_version_found)
		{
			var msg = "An update to the \""+SCRIPT_NAME.toUpperCase()+"\" script is available.\n";

			if (new_changes.length > 0)
			{
				msg += "\nChanges in the new version:\n";
				for (var i = 0; i < new_changes.length && i < 6; i++) //show 6 changes max
					msg += "    • " + new_changes[i] + "\n";
			}

			msg += "\nPress OK to update the script now.";

			try
			{
				if (window.confirm(msg))
					window.location.href = SCRIPT_URL;

				else if (!manual_check)
					window.alert("You will be prompted to update again later.\n\nTo turn off update notifications, click 'Script settings' on any search results page and untick \"Check for script updates automatically\".");
			}

			catch(e)
			{
				GM_log(e.message);
			}
		}

		else if (manual_check)
		{
			try {window.alert("No update found.");}
			catch(e) {GM_log(e.message);}
		}
	}

	try
	{
		GM_xmlhttpRequest(xhr);
	}

	catch(e)
	{
		xhr.onerror();
	}
}

//Add a new Enlarge link to each result (process up to 50 results in each call)
function AddTheLinks()
{
	var first_run = !AddTheLinks.layout_data;
	if (first_run)
	{
		AddTheLinks.layout_data = {};

		/* Add an entry to AddTheLinks.layout_data for each result layout that
		the script is interested in (eg. list view, gallery view, my eBay)
		The entries describe how the layouts are detected, and how new links
		get added to them. Each entry contains the following properties:

		selector    : a selector that selects results matching this layout
		link_parent : an xpath expression, relative to the element found by the
		              selector, that indicates where a new link should be added
		              in this layout if no link already exists, the new link is
		              appended to this node
		extra_nodes : (optional) an html string specifying extra nodes that
		              should be added between the parent and the link itself,
		              used to duplicate the DOM structure of existing links
		              Note: the link itself is appended to the first empty
		              element in the extra nodes - no link elements should be
		              included in this string

		If a result already has a link, link_parent and extra_nodes are ignored
		and the new link is just added as a sibling of the existing link */

		if (!page_is_my_ebay)
		{
			AddTheLinks.layout_data["ListView"] =
			{
				selector:    "table.li, .lview .li, .lv .li",
				link_parent: ".//div" + XPath_ClassSelect("dyn","dynSgCol") + "/.. | " +
				             ".//td" + XPath_ClassSelect("dyn","dynSgCol"),
				extra_nodes: "<div class='anchors'><div class='group'><div class='mi-l'>" +
				             "<div class='mi'></div></div></div></div>",
			};

			AddTheLinks.layout_data["GalleryView"] =
			{
				selector:    "td.pcell, td.rsittlref, td.gallery, div.rsittlref",
				link_parent: ".//*" + XPath_ClassSelect("mi"),
			};

			AddTheLinks.layout_data["SideBySideView"] =
			{
				selector:    "td.left .tri-i, td.right .tri-i",
				link_parent: ".//td" + XPath_ClassSelect("main-l"),
				extra_nodes: "<div class='mi-l clear'></div>",
			};
		}

		if (page_is_my_ebay && prefs["add_to_myebay"].value)
		{
			AddTheLinks.layout_data["MyeBay"] =
			{
				selector:    "tr.my_itl-itR",
				link_parent: "./td[2]/div",
				extra_nodes: "<div class='pl-alC' style='text-align:center; font-family:verdana; font-size:10px; color:#666666; font-weight:normal;'></div>",
			};
		}

		//new link template
		AddTheLinks.link_template = StringToDOM("<a class='mi-a nbt-new-link nbt-enlarge-link' tabindex='0'>"+NEW_LINK_TEXT+"</a>");

		for (var i in AddTheLinks.layout_data)
		{
			var layout_data = AddTheLinks.layout_data[i];

			//adjust result selector to ignore results already processed
			layout_data.selector = layout_data.selector.replace(/\s*(,|$)/g, ":not([nbt-result-cell])$1");

			if ((layout_data.extra_nodes = StringToDOM(layout_data.extra_nodes || "<div></div>", true)))
			{
				//append link to first empty node
				var node_tmp = XPath_Node("descendant-or-self::*[not(node())]", layout_data.extra_nodes);
				node_tmp && node_tmp.appendChild(AddTheLinks.link_template.cloneNode(true));
			}
		}
	}

	var count = 0;
	var limit = 50; // maximum number of links to add in a single call

	for (var i in AddTheLinks.layout_data)
	{
		var layout_data = AddTheLinks.layout_data[i];

		var result_cells = document.querySelectorAll(layout_data.selector);

		for (var j = 0; j < result_cells.length && count < limit; j++)
		{
			var result_cell = result_cells[j];
			result_cell.setAttribute("nbt-result-cell", i);

			//find the thumbnail in this result cell
			var thumbnail = XPath_Node(".//img[contains(@src,'thumbs') or contains(@imgurl,'thumbs')]|.//a[contains(@imgurl,'thumbs')]", result_cell);
			if (thumbnail)
			{
				//find existing links in this result cell
				var e = result_cell.querySelectorAll("a.mi-a, a.pl-pll, a.ppr, a.tpr");
				if (e.length >= 2)
				{
					//if any node is followed by a non-ws textnode, ignore it -
					//this fixes the new list view, where some results may have
					//a "More options" link directly under the title as well as
					//one on the thumbnail
					e = Array.prototype.slice.call(e, 0); //convert to array
					var l = e.length;
					while (l--)
					{
						var n = e.shift();
						if (!(n.nextSibling && n.nextSibling.nodeType == 3 &&
								n.nextSibling.nodeValue.match(/\S/)))
							e.push(n);
					}

					if (e.length >= 2)
						continue; //skip if there's still more than one
				}

				var new_link = null, cur_link = e[0] || null;
				var wpr = GetAncestorByClassName(thumbnail, "wpr");

				var ref_link = cur_link;
				if (cur_link && !cur_link.firstChild)
					ref_link = null; //don't add new link next to empty cur_link

				if (wpr && !GetAncestorByClassName(thumbnail, "li")
				        && !GetAncestorByClassName(thumbnail, "lv"))
				{
					//new gallery view
					if (wpr.lastChild && wpr.lastChild.className == "nbt-enlarge-link-overlay")
						continue;
					new_link = StringToDOM("<div class='nbt-enlarge-link-overlay'><a class='nbt-new-link' tabindex='0'>"+NEW_LINK_TEXT+"</a></div>");
					wpr.appendChild(new_link);
				}

				else
				{
					if (ref_link)
					{
						if (HasClass(cur_link, "nbt-enlarge-link"))
							continue; //shouldn't happen, but in case it does...

						//add new link before existing link
						new_link = AddTheLinks.link_template.cloneNode(true);
						ref_link.parentNode.insertBefore(new_link, ref_link);
					}

					else
					{
						//add new dom fragment (including new link) as a child of
						//the node given by xpath layout_data.link_parent
						var parent_node = XPath_Node(layout_data.link_parent, result_cell);
						if (!parent_node || !layout_data.extra_nodes)
							continue;

						var n = parent_node.appendChild(layout_data.extra_nodes.cloneNode(true));
						if ((new_link = n.getElementsByTagName("A")[0]) == null)
							continue;
					}

					new_link.parentNode.style.whiteSpace = "nowrap";
				}

				if (cur_link)
				{
					if (cur_link.textContent.indexOf(NEW_LINK_TEXT) >= 0)
					{
						//hide existing enlarge link
						new_link.className = cur_link.className + " nbt-enlarge-link";
						new_link.style.cssText += cur_link.style.cssText;
						cur_link.style.display = "none";
					}

					cur_link.addEventListener("mouseover", CurLinkMouseHandler, true);
					cur_link.addEventListener("mouseout",  CurLinkMouseHandler, true);

					var onmouseover = cur_link.getAttribute("onmouseover");
					if (onmouseover)
					{
						cur_link.setAttribute("onmouseover_nbt", onmouseover);
						cur_link.removeAttribute("onmouseover");
					}
				}

				//save data for this result
				link_data_array.push({ result_cell : result_cell,
				                       new_link    : new_link,
				                       cur_link    : cur_link });

				//event handlers for the new enlarge link
				new_link.addEventListener("click",     EnlargeClicked,   false);
				new_link.addEventListener("keydown",   EnlargeKeyDown,   false);
				new_link.addEventListener("mouseover", EnlargeMouseOver, false);
				new_link.addEventListener("mouseout",  EnlargeMouseOut,  false);

				count++;
			}
		}
	}

	//call the function again to process remaining results...
	if (!(first_run && count == 0))
		window.setTimeout(AddTheLinks, (count > 0 ? 100 : 1000));

	return (count > 0);
}

// ===========================================================================
// MAIN SCRIPT EXECUTION STARTS HERE
// ===========================================================================

if (AddTheLinks())
{
	var nodes = StringToDOM(
		//popup window
		"<div id='nbt-popup-window' style='display:none;'></div>" +
		//arrow control
		"<div id='nbt-arrow-ctrl'><div id='nbt-arrow-ctrl-inner'><div title='Previous'><div></div></div><span>&nbsp;</span><div title='Next'><div></div></div></div></div>"
	);

	popup         = document.body.appendChild(nodes[0]);
	arrow_control = document.body.appendChild(nodes[1]);

	arrow_control_inner = arrow_control.firstChild;

	arrow_control.addEventListener("mouseout", ArrowControlMouseOut, false);
	arrow_control_inner.childNodes[0].addEventListener("mouseup", function() {ShowNext(false);}, false);
	arrow_control_inner.childNodes[2].addEventListener("mouseup", function() {ShowNext(true); }, false);

	GM_addStyle(
	"#nbt-arrow-ctrl {position:absolute; top:0; z-index:500001; visibility:hidden; padding:1em 1em 0; -webkit-user-select:none;}" +
	"#nbt-arrow-ctrl-inner {width:9em; text-align:center; background-color:#fff; border:solid #333 1px; box-shadow:0 0 0.4em #888; border-radius:5px; overflow:hidden;}" +
	"#nbt-arrow-ctrl-inner>* {height:2em; line-height:2em;}" +
	"#nbt-arrow-ctrl-inner>span {display:inline-block; white-space:nowrap; max-width:3.9em;}" +
	"#nbt-arrow-ctrl-inner>div {width:2.5em;}" +
	"#nbt-arrow-ctrl-inner>div>div {position:relative; height:100%; top:0; opacity:0.2;}" +
	"#nbt-arrow-ctrl-inner>div:first-child {float:left}" +
	"#nbt-arrow-ctrl-inner>div:first-child>div {background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAAMJJREFUKM+N0LFKgmEUBuCnvowygkSwyaVNh9A5x6DZe+ge0uvoHqJLyLU1BYfa2owfJAgjMEvDluP2K571e773cF42zz4auF8HdlDCNR7xlYcSKugiwy+WefACPfwFWGCyetyLlA7eMA80xh2acIQWbvEeST/x4QY1FKCNAb4jZY4XXOFgtXLXlpMwwjCuO0MRJ7iMmj7wmWJVhifMUMdx4HNU8bp1PSkHZniI7uo4RDEPLjHFc/RYRjltOHQWuI/TfxycM1yE1zj2AAAAAElFTkSuQmCC') center no-repeat;}" +
	"#nbt-arrow-ctrl-inner>div:last-child {float:right}" +
	"#nbt-arrow-ctrl-inner>div:last-child>div {background:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAOCAYAAAAWo42rAAAAAXNSR0IArs4c6QAAAAlwSFlzAAALEwAACxMBAJqcGAAAALRJREFUKM+V0rFKggEUxfFfmSEqqAQ6NrvZnHs49g69g/ocPoCb+Aqu7m26tLRIIKEoDWJfn7VcXErpO9uFe+/538OFMVq4dkY5DHEX9Sv2p5q/8Yk39FGPBb+0wVcMpJjg/i/rCapooIxbdIL5JVAOOawwwxpNFFEJ7htso+eoAh4wRxIoOzzj8VIG5cOyi0UwpXjHAG2UBMsIy7BLYqAXUV1liidT4B+Y4gk1XJw65l9P8QP/RjAamXxgswAAAABJRU5ErkJggg==') center no-repeat;}" +
	"#nbt-arrow-ctrl-inner>div.nbt-active-arrow>div {opacity:1;}" +

	".nbt-wait, .nbt-wait a, .nbt-wait .nbt-active-arrow {cursor:wait !important;}" +
	".nbt-active-arrow:hover {cursor:pointer; background-color:#faa; background:-webkit-linear-gradient(top,#fdd, #f88); background:-moz-linear-gradient(top,#fdd, #f88); background:linear-gradient(to bottom,#fdd, #f88);}" +
	"#nbt-arrow-ctrl-inner>.nbt-active-arrow:first-child>div:active, #nbt-arrow-ctrl-inner>.nbt-active-arrow:first-child:active>div {right:2px;}" +
	"#nbt-arrow-ctrl-inner>.nbt-active-arrow:last-child>div:active, #nbt-arrow-ctrl-inner>.nbt-active-arrow:last-child:active>div {left:2px;}" +

	".nbt-enlarge-link-overlay {position:absolute; bottom:5px; left:5px; width:9em; line-height:2em; text-align:center; background-color:#fff; border:solid #333 1px; border-radius:5px; box-shadow:0 0 0.4em #888; cursor:pointer; opacity:0; -moz-transition:opacity .75s ease 0s; -webkit-transition:opacity .75s ease 0s;}" +
	".itmcdV2:hover .nbt-enlarge-link-overlay {opacity:0.9;}" +
	".nbt-enlarge-link-overlay:hover a {text-decoration:underline;}" +
	".nbt-enlarge-link-overlay a.nbt-new-link {position:relative; left:-2px; color:inherit !important; font-weight:bold;}" +
	".nbt-enlarge-link-overlay #nbt-arrow-ctrl-inner {border-width:0 0 1px 0; box-shadow:none; border-radius:5px 5px 0 0;}" +

	"a.nbt-new-link {padding-left:18px; background:url('data:image/gif;base64,R0lGODlhDgAOAMQAAGZmZtnZ2ZmZmWtra8XFxf///4yMjKampubm5rS0tHx8fMzMzO3t7XNzc5aWlr+/v////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEHABAALAAAAAAOAA4AAAVCICSOZCkGDgA4gQkRwMEwB0CYzVLsxdKUBAWPp7iNEsJhwZAgBZWFYik3fPyAAwECIVC5UKqU10VSAcjlMRqiXotCADs=') no-repeat 0 0 !important; text-decoration:none;}" +
	"a.nbt-new-link:hover {text-decoration:underline !important;}" +
	"a.nbt-new-link:not(:last-child) {margin-right:10px;}" +
	"a.nbt-enlarge-link {position:relative; z-index:0; cursor:pointer;}" +
	"div.rsicn, div.rsic {overflow:visible;}" +

	"#nbt-popup-window {position:absolute; z-index:500000; padding:15px; background-color:#fff; border:solid #888 1px; border-radius:10px; -moz-box-shadow:0 0 1em 0.5em #888; box-shadow:0 0 1em 0.5em #888; color:red; font-weight:bold; white-space:nowrap;}" +
	".nbt-wait-img img {visibility:hidden;}"
	);

	//document click handler must be added in capture phase, so that when clicking
	//on another link this handler will deactivate the current link (if any) first
	document.addEventListener("click", DocumentClicked, true);

	document.addEventListener("DOMMouseScroll", DocumentMouseScroll, false);
	document.addEventListener("mousewheel",     DocumentMouseScroll, false);
}

if (!page_is_my_ebay)
{
	//add 'script settings' link
	var lnks = document.querySelectorAll(".sft .lnks, .tabs-sc .lnks")[0];
	if (lnks)
	{
		var new_node = lnks.appendChild(StringToDOM("<span> <i>|</i> <a href='javascript:;' class='clink cs'>Script settings</a></span>"));
		new_node.childNodes[3].addEventListener("click",
				function(e) {ShowSettingsDlg(); e.preventDefault();}, false);
	}
}

GM_setValue("version", SCRIPT_VERSION);
GM_registerMenuCommand("Enlarge Picture Script settings", ShowSettingsDlg);

document.addEventListener("keydown", function(e)
{
	if (popup.style.display == "block" && e.keyCode == 112)
	{
		ShowSettingsDlg();
		e.preventDefault();
	}
}, false);


//check for new version of the script
if (prefs["auto_update_enabled"].value)
	window.setTimeout(function() {CheckForUpdate(false);}, 1000);

})()
