// ==UserScript==
// @author         Crend King
// @version        1.3.5
// @name           Display original image
// @namespace      http://www.cs.ucsc.edu/~kjin
// @description    Display images with their original sizes, and show images' metadata such as EXIF.
// @include        http://*
// @include        https://*
// @homepage       http://userscripts.org/scripts/show/47917
// @downloadURL    https://userscripts.org/scripts/source/47917.user.js
// @updateURL      https://userscripts.org/scripts/source/47917.meta.js
// ==/UserScript==

/*

version history

1.3.5 on 12/24/2009:
- fix a bug about the geometry of the background.

1.3.4 on 07/31/2009:
- replace check_min_edge option with check_min_area option.
- add check_min_diff option.

1.3.3 on 07/30/2009:
- check_min_edge checks both source and target geometries.

1.3.2 on 06/08/2009:
- Add the minimum length of the edges the images should be checked for resize.

1.3.1 on 06/06/2009:
- Display error messages when fail to request image metadata.

1.3 on 06/06/2009:
- When displaying images, use the modifier key to show images' metadata.
- Avaiable to display any image.
- It is optional to check if the image is resized or not. Use check_resize option to toggle.
- Minor changes, clean deprecated options.

1.2.8 on 06/05/2009:
- Fix bug when auto_adjust is set to false, zooming does not work.

1.2.7 on 06/01/2009:
- Add auto adjust option. Enabled by default.

1.2.6 on 05/03/2009:
- Only track images whose width AND length are both greater than the specified threshold (see options).
 
1.2.5 on 05/03/2009:
- Show and hide the displayed image rather than re-create and hide.
- Zoom displayed image by fraction of its current height, not absolute pixels.
- Different border color for shrinked and enlarged images. 
- Track images only if they meet the minimal image resize ratio.

1.2 on 05/01/2009:
- Add keyboard modifier option.
- Fix problem that cached and resized images are not able to display.
- Fix wrong position of original image if window is scrolled.
- Zoom/close original image by wheeling/clicking anywhere in the window.
- Minor changes.

1.1 on 04/30/2009:
- Zoom in/out original image with mouse wheel.

1.0 on 04/30/2009:
- Initial version.

*/


///// preference section /////

const modifier = "shift";
const img_margin = 40;
const bg_color = "black";
const bg_opacity = 0.618;
const border_width = 1;
const border_style = "solid";
const border_color_shrinked = "green";
const border_color_enlarged = "red";
const zoom_step_ratio = 0.2;
const zoom_min_height = 200;
const auto_adjust = true;
const check_resize = true;
const check_min_area = 400;
const check_min_diff = 400.1;


///// code section /////

const MAX_Z_INDEX = 2147483647;

var float_bg;
var float_window;
var float_img;
var float_info;

var img_aspect_ratio;
var img_zoom_min_height;

function create_background()
{
	// dark background of the display mode
	
	float_bg = document.createElement("div");
	
	// the background covers the current window, not the whole document
	float_bg.style.position = "absolute";
	float_bg.style.left = "0px";
	float_bg.style.top = "0px";
	float_bg.style.backgroundColor = bg_color;
	float_bg.style.opacity = bg_opacity;
	
	var window_width = window.innerWidth + window.scrollMaxX;
	var window_height = window.innerHeight + window.scrollMaxY;
	float_bg.style.width = (window_width >= screen.width ? window_width : screen.width) + "px";
	float_bg.style.height = (window_height >= screen.height ? window_height : screen.height) + "px";
	
	// make sure the background is in front of the original contents
	float_bg.style.zIndex = MAX_Z_INDEX - 1;
}

function create_float_window()
{
	// container of the displayed image
	
	float_window = document.createElement("div");
	float_window.style.position = "absolute";
	
	// in front of the dark background
	float_window.style.zIndex = MAX_Z_INDEX;
}

function create_float_img()
{
	// the displayed image

	float_img = document.createElement("img");
	
	// in the center of its container
	float_img.style.position = "absolute";
	float_img.style.left = "0px";
	float_img.style.top = "0px";
	float_img.style.right = "0px";
	float_img.style.bottom = "0px";
	float_img.style.margin = "auto";
}

function create_float_info()
{
	// EXIF info box
	
	float_info = document.createElement("div");
	float_info.style.position = "absolute";
	float_info.style.color = "white";
	float_info.style.backgroundColor = bg_color;
	float_info.style.opacity = bg_opacity;
	float_info.style.whiteSpace = "pre";
	float_info.style.textAlign = "left";
	float_info.style.display = "none";
}

function fill_info_text(info)
{
	// write text into the info box
	
	float_info.textContent = "";
	
	for (var i in info)
	{
		if (typeof(info[i]) != "object")
			float_info.textContent += i + ": " + info[i] + "\n";
		else if (info[i].__count__ > 0)
		{
			float_info.textContent += i + ":\n";
			for (var e in info[i])
				float_info.textContent += "\t" + e + ": " + info[i][e] + "\n";
		}
	}
}

function get_img_info(img_src)
{
	// ajax request to IMG-2-JSON
	
	GM_xmlhttpRequest(
	{
		method: "GET",
		url: "http://img2json.appspot.com/go/?callback=fill_info_text&url=" + img_src,
		onload: function(response)
		{
			var res = eval(response.responseText);
			
			if (typeof(res) == "string")
				float_info.textContent = "Unable to get metadata:\n" + res;
		},
		onerror: function(response)
		{
			float_info.textContent = "Unable to get metadata:\n" + response.responseText;
		}
	});

	float_info.textContent = "Requesting metadata...";
}

function move_img_info(event)
{
	// the info box follows mouse
	// if the modifier key is not pressed, hide the info box
	
	var modifier_down = eval("event." + modifier + "Key");
	if (modifier_down == undefined)
		modifier_down = true;
	
	if (modifier_down)
	{
		float_info.style.display = "inline";
		float_info.style.left = event.clientX + "px";
		float_info.style.top = event.clientY + 20 + "px";
	}
	else
		float_info.style.display = "none";
}

function zoom_float_img(event)
{
	const this_step_ratio = (event.detail <= 0 ? zoom_step_ratio : -zoom_step_ratio);
	const img_new_height = float_img.height * (1 + this_step_ratio);
	
	// maintain minimum image height in zooming
	if (img_new_height >= img_zoom_min_height)
	{
		float_img.height = img_new_height;
		float_img.width = img_new_height * img_aspect_ratio;
	}
	
	event.preventDefault();
}

function hide_float(event)
{
	float_bg.style.display = "none";
	float_window.style.display = "none";
}

function show_float(event)
{
	var modifier_down = eval("event." + modifier + "Key");
	if (modifier_down == undefined)
		modifier_down = true;
	
	if (modifier_down)
	{
		//const window_width = window.innerWidth;
		const window_width = document.body.clientWidth;
		const window_height = window.innerHeight;
		
		// set the image container to the center of the current window
		float_window.style.left = window.scrollX + "px";
		float_window.style.top = window.scrollY + "px";
		float_window.style.width = window_width + "px";
		float_window.style.height = window_height + "px";
		
		// image's original geometry
		float_img.src = event.target.src;
		float_img.width = float_img.naturalWidth;
		float_img.height = float_img.naturalHeight;
		
		img_aspect_ratio = float_img.naturalWidth / float_img.naturalHeight;
		img_zoom_min_height = Math.min(zoom_min_height, float_img.naturalHeight);

		// in case of too big image, auto adjust image size
		if (auto_adjust)
		{
			if (float_img.height > window_height - img_margin)
			{
				float_img.height = window_height - img_margin;
				float_img.width = float_img.height * img_aspect_ratio;
			}
			
			if (float_img.width > window_width - img_margin)
			{
				float_img.width = window_width - img_margin;
				float_img.height = float_img.width / img_aspect_ratio;
			}
		}

		float_bg.style.display = "inline";
		float_window.style.display = "inline";
		
		get_img_info(event.target.src);
	}
}

function check_img(target_img)
{
	const display_area = target_img.width * target_img.height;
	const natural_area = target_img.naturalWidth * target_img.naturalHeight;

	// difference between the image's natural and displayed area
	const area_diff = Math.abs(display_area - natural_area);
	
	const min_abs_diff = parseInt(check_min_diff);
	const min_ratio_diff = check_min_diff - min_abs_diff;
	
	var make_border = true;
	
	if (display_area < check_min_area || natural_area < check_min_area)
		make_border = false;
	
	if (area_diff < min_abs_diff ||
		area_diff < Math.max(display_area, natural_area) * min_ratio_diff)
		make_border = false;
	
	// decorate images with borders if not too small absolute area and not too little area difference
	if (make_border)
	{
		target_img.style.borderWidth = border_width + "px";
		target_img.style.borderStyle = border_style;
		target_img.style.borderColor =
			(display_area <= natural_area ? border_color_shrinked : border_color_enlarged);
	}
}

// process each image
var imgs = document.getElementsByTagName("img");
for (var i = 0; i < imgs.length; i++)
{
	imgs[i].addEventListener("mousemove", show_float, false);
	
	if (check_resize)
	{
		if (imgs[i].naturalWidth == 0 || imgs[i].naturalHeight == 0)
			imgs[i].addEventListener("load", function(event) {check_img(event.target);}, false);
		else
			check_img(imgs[i]);
	}
}

create_background();
create_float_window();
create_float_img();
create_float_info();

float_window.appendChild(float_img);
float_window.appendChild(float_info);
document.body.appendChild(float_bg);
document.body.appendChild(float_window);

float_window.addEventListener("DOMMouseScroll", zoom_float_img, false);
float_window.addEventListener("mousemove", move_img_info, false);
float_window.addEventListener("click", hide_float, false);
float_bg.addEventListener("click", hide_float, false);

hide_float();