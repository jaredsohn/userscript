// ==UserScript==
// @name           Battlelog Custom Emblem
// @namespace      simpsoholic
// @description    Allows images to be used as a platoon emblem
// @version        1.4
// @include        http://battlelog.battlefield.com/bf3/*
// @include        battlelog.battlefield.com/bf3/*
// @match          http://battlelog.battlefield.com/bf3/*
// ==/UserScript==

// This script uses the super mega awesome JPEG encoder from http://www.bytestrom.eu/blog/2009/1120a_jpeg_encoder_for_javascript, written by Andreas Ritter (Based off code from Adobe)
// It also uses the code from http://stackoverflow.com/questions/2303690/resizing-an-image-in-an-html5-canvas/3223466#3223466, written by 'syockit' for hq resizing. (I know it _really_ isn't meant to be used, but it's good enough for me)
// As well as random bits of copy pasta from all over the internet.

var $ = function(id) { return document.getElementById(id); }; // Why? Because I'm a lazy bastard.

var stretchtofit = true;
var useblbg = true;
var hqstretch = false;
var useforall = false;
var dropdownopen = false;

var encoder;

// Same order as elements appear in DOM
var sizes = [
	[ 320, 320 ],
	[ 26, 26 ],
	[ 36, 36 ],
	[ 60, 60 ],
	[ 100, 100 ]
];

var emblemData = [];

function rand(from, to, dontround)
{
	if(dontround == undefined) { 
		return Math.floor(Math.random() * (to - from + 1) + from);
	} else {
		return Math.random() * (to - from + 1) + from;
	}
}

function twodp(number) 
{
	return Math.round(number*100)/100;
}

// Called by the change event of the file input. 
// Reads the selected file from the user and applies it to the selected size.
function load_image(event, size) 
{
    var file = event.target.files[0];
    var reader = new FileReader();
	if(useforall == true) {
		reader.onload = function(event2) {
			for(var i in sizes) {
				image_loaded(event2, i);
			}
		}
	} else { 
		reader.onload = function(event2) {
			image_loaded(event2, size);
		}
	}
    reader.readAsDataURL(file);
	$("selectimage").disabled = true;
	$("selectimage").innerHTML = '<img src="/public/base/shared/loading16x16.gif">';
	$("bigasssaveemblembutton").disabled = true;
}

// Run once the image is loaded, checks if it's actually an image 
// then inserts the data into an img object and starts processing.
function image_loaded(event, size)
{
    var data = event.target.result;
	if(data.substr(0, 10) != "data:image") {
		alert("Selected file is not an image!");
		image_finished(); // Bit of a hack for reseting the state of the popup
		return;
	}
	
	// Turns out you can just upload a gif right into their shit.
	// 1.3: Not anymore, they fixed it (I think)
	/*
	if(data.substr(0, 14) == "data:image/gif") {
		var useasgif = confirm("Looks like you've uploaded a GIF. \nWould you like to preserve the animation and use the GIF as it is? \nPlease note that the GIF will only apply to the size you have selected and will not be resized.");
		if(useasgif) {
			data_ready(data, size);
			return;
		}
	}
	*/
	
	var img = new Image();
	img.addEventListener('load', function() {
		process_image(img, size);
	}, false);
	img.src = data;
}

// The guts of the operation - Uses a canvas element to resize 
// and convert the resulting image to a data URI.
function process_image(img, size) 
{
	var converter = document.createElement('canvas'); 
	converter.width = sizes[size][0];
	converter.height = sizes[size][1];
			
	var ctx = converter.getContext("2d");
	// If the image is going to be stretched, either use the thumbnailer if it's
	// bigger than the canvas, or just stretch it using the canvas' own methods.
	if(stretchtofit == true) {
		if(hqstretch == true && img.width > converter.width && img.height > converter.height) {
			new thumbnailer(converter, img, sizes[size][0], 3);
		} else {
			ctx.drawImage(img, 0, 0, converter.width, converter.height);
		}
	} else {
		ctx.drawImage(img, (converter.width/2) - (img.width/2), (converter.height/2) - (img.height/2));
	}
		
	// Fill in space with the battlelog BG colour if needed
	if(useblbg == true) {
		var compositeOperation = ctx.globalCompositeOperation;
		ctx.globalCompositeOperation = "destination-over";
		ctx.fillStyle = "#F4F4F4";
		ctx.fillRect(0, 0, converter.width, converter.height);
	}
	
	// Encode the canvas data into a jpeg data URI for the ajax request later.
	// This uses Andreas Ritter's JPEG encoder.
	var imgdata = ctx.getImageData(0, 0, converter.width, converter.height);
	var jpegURI = encoder.encode(imgdata);
			
	if(jpegURI.substr(0, 23) != "data:image/jpeg;base64,") {
		alert("Couldn't convert image to jpeg");
	} else {
		data_ready(jpegURI, size);
	}
}

// Don't you love how 'size' is passed to like over 9000 functions
function data_ready(data, size) 
{
	var img = $(sizes[size][0] + "x" + sizes[size][1]);
	img.src = data;
	emblemData[size] = data;
	image_finished();
}

function image_finished()
{
	$("selectimage").disabled = "";
	$("selectimage").innerHTML = 'Select Image';
	$("chooseoverlay").style.display = "none";
	$("choosepopup").style.display = "none";
	if(emblemData[0] != null && emblemData[1] != null && emblemData[2] != null && emblemData[3] != null && emblemData[4] != null) {
		$("bigasssaveemblembutton").disabled = false;
	}
}

function upload_emblems(tofeed)
{
	if(tofeed == undefined || tofeed == null || tofeed == false) {
		var tofeed = false;
	}
	
	// Get the AJAX request destination
	var url = $("platoon-editbadge-editframe-badge-save");
	if(url == null || url.action == undefined) {
		alert("Couldn't get post URL. DICE has probably changed Battlelog.\n\nReport this on the userscript.org page.");
		return;
	}
	url = url.action;
	
	// Get the post-check-sum which is needed for the request
	var pcselements = document.getElementsByName("post-check-sum");
	if(pcselements.length == 0) {
		alert("Couldn't get post-check-sum value. DICE has probably changed Battlelog.\n\nReport this on the userscripts.org page.");
		return;
	} 
	var postChecksum = pcselements[0].value;
	
	// Disable the upload button and show the loading thing
	$("bigasssaveemblembutton").disabled = true;
	$("chooseoverlay").style.display = "block";
	$("pleasewaitpopup").style.display = "block";
	
	// Generate some random data for what's meant to be the emblem (TODO: Improve on this)
	var bgcolour = rand(8388608, 16777215).toString(16).toUpperCase();
	var left = rand(0, 320);
	var top = rand(0, 320);
	var fillcolour = rand(8388608, 16777215).toString(16).toUpperCase();
	var scalex = twodp(Math.random());
	var scaley = twodp(Math.random());
	var angle = twodp(rand(0, 270, true));
	
	// Setup the variables and URL encode them for the request
	var postData = {
		'badge': emblemData[0].replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/gif;base64,/, ""),
		'badgeSmall': emblemData[4],
		'badge60x': emblemData[3].replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/gif;base64,/, ""),
		'badge36x': emblemData[2].replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/gif;base64,/, ""),
		'badge26x': emblemData[1].replace(/^data:image\/jpeg;base64,/, "").replace(/^data:image\/gif;base64,/, ""),
		'badgeData': '{"objects":[{"type":"path","left":' + left + ',"top":' + top + ',"width":320,"height":320,"fill":"#' + fillcolour + '","overlayFill":null,"stroke":null,"strokeWidth":1,"scaleX":' + scalex + ',"scaleY":' + scaley + ',"angle":' + angle + ',"flipX":false,"flipY":false,"opacity":1,"selectable":true,"path":[["M",0,0],["h",320],["v",320],["H",0],["V",0],["z"]],"partId":"square"}],"background":"#' + bgcolour +'"}',
		'tofeed': tofeed ? "post" : "false",
		'post-check-sum': postChecksum
	};
	
	var args = [];
	for(var i in postData) {
		args[args.length] = encodeURIComponent(i) + "=" + encodeURIComponent(postData[i]);
	}
	var request = args.join("&");

	// Create and send the request!
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) {
			if(xhr.status == 200 ) {
				var response = JSON.parse(xhr.responseText);
				if(response.type == "success" && response.message == "OK") {
					alert("Emblem saved successfully");
					window.location.href = window.location.href.replace("/editbadge", "");
				} else {
					alert("There was an error saving your emblem\n\nResponse: " + xhr.responseText);
				}
			} else {
				alert("ERROR " + xhr.status + ": " + xhr.responseText);
			}
			$("bigasssaveemblembutton").disabled = false;
			$("chooseoverlay").style.display = "none";
			$("pleasewaitpopup").style.display = "none";
		} 
	}
	xhr.send(request);
}

function open_file_select_popup(num) 
{
	$("chooseoverlay").style.display = "block";
	$("choosepopup").style.display = "block";
	
	// onChange is not fired if the user selects the same image twice. So we create a new file input to overcome this.
	if($("pictfile") != null) {
		$("pictfilegoeshere").removeChild($("pictfile"));
	}
	
	var pictfile = document.createElement("input");
	pictfile.type = "file";
	pictfile.id = "pictfile";
	pictfile.style = "opacity: 0;";
	pictfile.addEventListener('change', function(event) {
		load_image(event,num);
	}, false);
	pictfile.addEventListener('mouseover', function(event) {
		$("selectimage").setAttribute("style", "background-position: right -29px;");
	}, false);
	pictfile.addEventListener('mouseout', function(event) {
		$("selectimage").setAttribute("style", "");
	}, false);

	$("pictfilegoeshere").appendChild(pictfile);
}

function close_file_select_popup()
{
	$("selectimage").disabled = "";
	$("selectimage").innerHTML = 'Select Image';
	$("chooseoverlay").style.display = "none";
	$("choosepopup").style.display = "none";
}

// Run when the script is loaded
function add_button()
{
	var parent = document.getElementsByClassName("platoon-editbadge-header")[0];
	var button = document.createElement("button");
	button.setAttribute("class","base-button-arrow-gigantic");
	button.setAttribute("style","float:right; position: relative; top: -30px;");
	button.id = "uploadcustombutton";
	button.innerHTML = "Use Custom Image";
	parent.appendChild(button);
	$("uploadcustombutton").addEventListener('click', create_custom_popup, false);
}

function min_controls()
{
	$("controls").setAttribute("style", "");
	dropdownopen = false;
}

function create_custom_popup() 
{
	if($("popup-custom-emblem") != null) {
		$("popup-custom-emblem").style.display = "block";
		return;
	}
	
	// Danger, Will Robinson! Incoming Firefox hack!
	var blank_img = "data:image/gif;base64,R0lGODlhAQABAIAAANvf7wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==";
	
	// Excuse the mess.
	document.getElementsByClassName("base-center-popups")[0].innerHTML += '<div id="popup-custom-emblem" class="common-popup common-popup-big no-footer common-popup-remove ui-draggable" style="display: none; z-index: 1002; left: 50%; top: 295px; "><div class="common-popup-title-container"><div class="common-popup-title common-popup-handle">Custom Platoon Emblem<div class="common-popup-close-container "><div class="common-popup-close">&nbsp;</div></div></div></div><div class="common-popup-content-container"><div class="common-popup-content"><div style="top:0px;left:10px;width:898px;height:472px;background:#000;position:absolute; z-index:1000;opacity:0.8;display: none;" id="chooseoverlay"></div><div style="position:absolute;top:120px;left:240px;width:405px;height:60px;background:#FFFFFF;z-index:1001;border:5px solid #000000;padding:10px;display:none;text-align:center;" id="pleasewaitpopup"><h1 style="font-family: \'bebasneueregular\',arial,sans-serif;font-size:28px;color:black;font-weight:normal;margin-bottom:10px;">Please wait while your emblem is uploaded</h1><img src="/public/base/shared/loading16x16.gif" /></div><div style="position:absolute;top:70px;left:294px;width:300px;height:275px;background:#FFFFFF;z-index:1001;border:5px solid #000000;padding:10px;display:none;" id="choosepopup"><p style="margin-bottom: 15px; line-height:1.3em;">Select the options you want then click \'Select Image\' to use your desired image.</p><hr><p style="line-height:30px;"><input type="checkbox" id="stretch" checked="checked">Stretch image to fit<br><input type="checkbox" id="blbg" checked="checked">Fill with Battlelog background colour<br><input type="checkbox" id="hqstretch">Higher quality resize (VERY SLOW)<br><input type="checkbox" id="useforall">Use this image for all sizes</p><hr><span class="file-wrapper" style="margin-top:5px;margin-left:95px;"><span id="pictfilegoeshere"><input type="file" id="pictfile" /></span><button id="selectimage" class="base-button-arrow-small">Select Image</button></span><button class="base-button-arrow-small-grey" id="cancelselect" style="margin-left:95px; margin-top: 7px;">Cancel</button></div><div id="wrap"><div id="large"><div><a class="image base-no-ajax" href="#"><span class="rollover" style="width:321px;height:321px;" data-size=0></span><img src="'+ blank_img +'" id="320x320" style="width:320px;height:320px;border:1px solid #021a40;" /></a></div><p style="text-align: center;">320x320 - Shown on main platoon page</p></div><div id="smaller"><div><a class="image base-no-ajax" href="#"><span class="rollover" style="width:27px;height:27px;" data-size=1></span><img src="'+ blank_img +'" id="26x26" style="width:26px;height:26px;vertical-align:middle;border:1px solid #021a40;" /></a><span style="margin-left: 10px">26x26 - Shown in platoon dropdown</span></div><div><a class="image base-no-ajax" href="#"><span class="rollover" style="width:37px;height:37px;" data-size=2></span><img src="'+ blank_img +'" id="36x36" style="width:36px;height:36px;vertical-align:middle;border:1px solid #021a40;" /></a><span style="margin-left: 10px">36x36 - Unknown</span></div><div><a class="image base-no-ajax" href="#"><span class="rollover" style="width:61px;height:61px;" data-size=3></span><img src="'+ blank_img +'" id="60x60" style="width:60px;height:60px;vertical-align:middle;border:1px solid #021a40;" /></a><span style="margin-left: 10px">60x60 - Shown in users\' profiles</span></div><div><a class="image base-no-ajax" href="#"><span class="rollover" style="width:101px;height:101px;" data-size=4></span><img src="'+ blank_img +'" id="100x100" style="width:100px;height:100px;vertical-align:middle;border:1px solid #021a40;" /></a><span style="margin-left: 10px">100x100 - Shown in battle feed</span></div></div><div id="controls"><div style="position: relative; left: 170px;"><surf:container> <button id="bigasssaveemblembutton" class="base-button-arrow-almost-gigantic-dropdown base-button-general-dropdown" disabled="disabled">Save Emblem</button><div id="emblemuploadddarea" class="base-button-dropdown base-general-dropdown-area" style="width: 296px; top: 56px; display: none; "><div class="base-button-dropdown-inner"><ul><li><a href="#" class="base-no-ajax" id="uploadandtofeed">Upload and add event to battle feed</a></li><li><a href="#" class="base-no-ajax" id="justupload">Just upload</a></li></ul></div><div class="base-button-dropdown-shadow"></div></div></surf:container></div></div></div><div class="base-clear"></div></div></div><div class="common-popup-footer-container"></div></div>';
	
	if(stretchtofit == true) {
		$("stretch").checked = true;
	} else {
		$("stretch").checked = false;
	}
	
	if(useblbg == true) {
		$("blbg").checked = true;
	} else {
		$("blbg").checked = false;
	}
	
	if(hqstretch == true) {
		$("hqstretch").checked = true;
	} else {
		$("hqstretch").checked = false;
	}
	
	if(useforall == true) {
		$("useforall").checked = true;
	} else {
		$("useforall").checked = false;
	}
	
	$("stretch").addEventListener('change', function(event) {
		stretchtofit = event.target.checked;
	}, false);
	
	$("blbg").addEventListener('change', function(event) {
		useblbg = event.target.checked;
	}, false);
	
	$("hqstretch").addEventListener('change', function(event) {
		hqstretch = event.target.checked;
	}, false);
	
	$("useforall").addEventListener('change', function(event) {
		useforall = event.target.checked;
	}, false);

	$("cancelselect").addEventListener('click', function() {
		close_file_select_popup();
	}, false);
	
	$("bigasssaveemblembutton").addEventListener('click', function() {
		if(dropdownopen == false) {
			$("controls").setAttribute("style", "height: 110px;");
			dropdownopen = true;
		} else {
			min_controls();
		}
	}, false);
	
	document.addEventListener('click', function() {
		if(dropdownopen == true && $("emblemuploadddarea").style.display == "none") {
			min_controls();
		}
	}, false);
	
	$("uploadandtofeed").addEventListener('click', function() {
		min_controls();
		upload_emblems(true);
	}, false);
	
	$("justupload").addEventListener('click', function() {
		min_controls();
		upload_emblems();
	}, false);
	
	var ouras = document.getElementsByClassName("image");
	for(var i=0; i<ouras.length; i++) {
		ouras[i].addEventListener('click', function(event) {
			open_file_select_popup(event.target.getAttribute("data-size"));
		}, false);
	}
	
	$("popup-custom-emblem").style.display = "block";
}

function init() 
{
	encoder = new JPEGEncoder(100);
	
	// Excuse the mess.
	var fileselectimage = 'data:image/png;base64,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';
	
	var style = document.createElement("style");
	style.type = "text/css";
	style.innerHTML = "#wrap { width: 680px; margin: 0 auto; } #large { float: left; width: 325px; padding: 10px; } #smaller { float: right; width: 315px; padding: 10px; } #smaller div { margin-bottom: 30px; } #controls { clear: both; padding: 5px 10px; text-align: center; } .image { text-decoration:none; } span.rollover {opacity: 1;background:url(" + fileselectimage + ") center center no-repeat #000;cursor: pointer;position: absolute;z-index: 10;opacity: 0;color: #FFFFFF;} span.rollover:hover { opacity: .7; -webkit-box-shadow: 0px 0px 4px #000; -moz-box-shadow: 0px 0px 4px #000; box-shadow: 0px 0px 4px #000; } .file-wrapper { display: inline-block; overflow: hidden; position: relative; } .file-wrapper input { margin-left:-5px; cursor: pointer; font-size: 100px; height: 100%; opacity: 0.01; position: absolute; right: 0; top: 0; } .file-wrapper button { display: inline-block; margin-right: 5px; }";
	document.getElementsByTagName('body')[0].appendChild(style);
	
	$("content").addEventListener( "DOMNodeInserted", function(event) {
		if(event.target.id == "platoon-editbadge-page") {
			startup();
		}
	}, false );
	
	if($("platoon-editbadge-page") != null) {
		startup();
	}
}

function startup()
{
	add_button();
}

/* ----------- http://stackoverflow.com/questions/2303690/resizing-an-image-in-an-html5-canvas/3223466#3223466, written by 'syockit', minified ----------- */
function thumbnailer(a,b,c,d){this.canvas=a;a.width=b.width;a.height=b.height;this.ctx=a.getContext("2d");this.ctx.drawImage(b,0,0);this.img=b;this.src=this.ctx.getImageData(0,0,b.width,b.height);this.dest={width:c,height:Math.round(b.height*c/b.width)};this.dest.data=new Array(this.dest.width*this.dest.height*3);this.lanczos=lanczosCreate(d);this.ratio=b.width/c;this.rcp_ratio=2/this.ratio;this.range2=Math.ceil(this.ratio*d/2);this.cacheLanc={};this.center={};this.icenter={};this.process1(this,0)}function lanczosCreate(a){return function(b){if(b>a)return 0;b*=Math.PI;if(Math.abs(b)<1e-16)return 1;var c=b/a;return Math.sin(b)*Math.sin(c)/b/c}}thumbnailer.prototype.process1=function(a,b){a.center.x=(b+.5)*a.ratio;a.icenter.x=Math.floor(a.center.x);for(var c=0;c<a.dest.height;c++){a.center.y=(c+.5)*a.ratio;a.icenter.y=Math.floor(a.center.y);var d,e,f,g;d=e=f=g=0;for(var h=a.icenter.x-a.range2;h<=a.icenter.x+a.range2;h++){if(h<0||h>=a.src.width)continue;var i=Math.floor(1e3*Math.abs(h-a.center.x));if(!a.cacheLanc[i])a.cacheLanc[i]={};for(var j=a.icenter.y-a.range2;j<=a.icenter.y+a.range2;j++){if(j<0||j>=a.src.height)continue;var k=Math.floor(1e3*Math.abs(j-a.center.y));if(a.cacheLanc[i][k]==undefined)a.cacheLanc[i][k]=a.lanczos(Math.sqrt(Math.pow(i*a.rcp_ratio,2)+Math.pow(k*a.rcp_ratio,2))/1e3);weight=a.cacheLanc[i][k];if(weight>0){var l=(j*a.src.width+h)*4;d+=weight;e+=weight*a.src.data[l];f+=weight*a.src.data[l+1];g+=weight*a.src.data[l+2]}}}var l=(c*a.dest.width+b)*3;a.dest.data[l]=e/d;a.dest.data[l+1]=f/d;a.dest.data[l+2]=g/d}if(++b<a.dest.width){this.process1(a,b)}else{this.process2(a)}};thumbnailer.prototype.process2=function(a){a.canvas.width=a.dest.width;a.canvas.height=a.dest.height;a.ctx.drawImage(a.img,0,0);a.src=a.ctx.getImageData(0,0,a.dest.width,a.dest.height);var b,c;for(var d=0;d<a.dest.width;d++){for(var e=0;e<a.dest.height;e++){b=(e*a.dest.width+d)*3;c=(e*a.dest.width+d)*4;a.src.data[c]=a.dest.data[b];a.src.data[c+1]=a.dest.data[b+1];a.src.data[c+2]=a.dest.data[b+2]}}a.ctx.putImageData(a.src,0,0)}

/* ----------- http://www.bytestrom.eu/blog/2009/1120a_jpeg_encoder_for_javascript, written by Andreas Ritter (Based off code from Adobe), minified ----------- */
/*
  Copyright (c) 2008, Adobe Systems Incorporated
  All rights reserved.

  Redistribution and use in source and binary forms, with or without 
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright notice, 
    this list of conditions and the following disclaimer.
  
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the 
    documentation and/or other materials provided with the distribution.
  
  * Neither the name of Adobe Systems Incorporated nor the names of its 
    contributors may be used to endorse or promote products derived from 
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
/*
JPEG encoder ported to JavaScript and optimized by Andreas Ritter, www.bytestrom.eu, 11/2009

Basic GUI blocking jpeg encode

v 0.9a

Licensed under the MIT License

Copyright (c) 2009 Andreas Ritter

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

function JPEGEncoder(a){function Z(){var b=(new Date).getTime();if(!a)a=50;X();K();L();M();Y(a);var c=(new Date).getTime()-b;console.log("Initialization "+c+"ms")}function Y(a){if(a<=0){a=1}if(a>100){a=100}if(y==a)return;var b=0;if(a<50){b=Math.floor(5e3/a)}else{b=Math.floor(200-a*2)}I(b);y=a;console.log("Quality set to: "+a+"%")}function X(){var a=String.fromCharCode;for(var b=0;b<256;b++){w[b]=a(b)}}function W(a,b,c,d,e){var f=e[0];var g=e[240];var h;const i=16;const j=63;const k=64;var l=Q(a,b);for(var o=0;o<k;++o){p[z[o]]=l[o]}var q=p[0]-c;c=p[0];if(q==0){N(d[0])}else{h=32767+q;N(d[n[h]]);N(m[h])}var r=63;for(;r>0&&p[r]==0;r--){}if(r==0){N(f);return c}var s=1;var t;while(s<=r){var u=s;for(;p[s]==0&&s<=r;++s){}var v=s-u;if(v>=i){t=v>>4;for(var w=1;w<=t;++w)N(g);v=v&15}h=32767+p[s];N(e[(v<<4)+n[h]]);N(m[h]);s++}if(r!=j){N(f)}return c}function V(){P(65498);P(12);O(3);O(1);O(0);O(2);O(17);O(3);O(17);O(0);O(63);O(0)}function U(){P(65476);P(418);O(0);for(var a=0;a<16;a++){O(A[a+1])}for(var b=0;b<=11;b++){O(B[b])}O(16);for(var c=0;c<16;c++){O(C[c+1])}for(var d=0;d<=161;d++){O(D[d])}O(1);for(var e=0;e<16;e++){O(E[e+1])}for(var f=0;f<=11;f++){O(F[f])}O(17);for(var g=0;g<16;g++){O(G[g+1])}for(var h=0;h<=161;h++){O(H[h])}}function T(){P(65499);P(132);O(0);for(var a=0;a<64;a++){O(e[a])}O(1);for(var b=0;b<64;b++){O(f[b])}}function S(a,b){P(65472);P(17);O(8);P(b);P(a);O(3);O(1);O(17);O(0);O(2);O(17);O(1);O(3);O(17);O(1)}function R(){P(65504);P(16);O(74);O(70);O(73);O(70);O(0);O(1);O(1);O(0);P(1);P(1);O(0);O(0)}function Q(a,b){var c,d,e,f,g,h,i,j;var k=0;var l;const m=8;const n=64;for(l=0;l<m;++l){c=a[k];d=a[k+1];e=a[k+2];f=a[k+3];g=a[k+4];h=a[k+5];i=a[k+6];j=a[k+7];var p=c+j;var q=c-j;var r=d+i;var s=d-i;var t=e+h;var u=e-h;var v=f+g;var w=f-g;var x=p+v;var y=p-v;var z=r+t;var A=r-t;a[k]=x+z;a[k+4]=x-z;var B=(A+y)*.707106781;a[k+2]=y+B;a[k+6]=y-B;x=w+u;z=u+s;A=s+q;var C=(x-A)*.382683433;var D=.5411961*x+C;var E=1.306562965*A+C;var F=z*.707106781;var G=q+F;var H=q-F;a[k+5]=H+D;a[k+3]=H-D;a[k+1]=G+E;a[k+7]=G-E;k+=8}k=0;for(l=0;l<m;++l){c=a[k];d=a[k+8];e=a[k+16];f=a[k+24];g=a[k+32];h=a[k+40];i=a[k+48];j=a[k+56];var I=c+j;var J=c-j;var K=d+i;var L=d-i;var M=e+h;var N=e-h;var O=f+g;var P=f-g;var Q=I+O;var R=I-O;var S=K+M;var T=K-M;a[k]=Q+S;a[k+32]=Q-S;var U=(T+R)*.707106781;a[k+16]=R+U;a[k+48]=R-U;Q=P+N;S=N+L;T=L+J;var V=(Q-T)*.382683433;var W=.5411961*Q+V;var X=1.306562965*T+V;var Y=S*.707106781;var Z=J+Y;var $=J-Y;a[k+40]=$+W;a[k+24]=$-W;a[k+8]=Z+X;a[k+56]=Z-X;k++}var _;for(l=0;l<n;++l){_=a[l]*b[l];o[l]=_>0?_+.5|0:_-.5|0}return o}function P(a){O(a>>8&255);O(a&255)}function O(a){q.push(w[a])}function N(a){var b=a[0];var c=a[1]-1;while(c>=0){if(b&1<<c){r|=1<<s}c--;s--;if(s<0){if(r==255){O(255);O(0)}else{O(r)}s=7;r=0}}}function M(){for(var a=0;a<256;a++){x[a]=19595*a;x[a+256>>0]=38470*a;x[a+512>>0]=7471*a+32768;x[a+768>>0]=-11059*a;x[a+1024>>0]=-21709*a;x[a+1280>>0]=32768*a+8421375;x[a+1536>>0]=-27439*a;x[a+1792>>0]=-5329*a}}function L(){var a=1;var b=2;for(var c=1;c<=15;c++){for(var d=a;d<b;d++){n[32767+d]=c;m[32767+d]=[];m[32767+d][1]=c;m[32767+d][0]=d}for(var e=-(b-1);e<=-a;e++){n[32767+e]=c;m[32767+e]=[];m[32767+e][1]=c;m[32767+e][0]=b-1+e}a<<=1;b<<=1}}function K(){i=J(A,B);j=J(E,F);k=J(C,D);l=J(G,H)}function J(a,b){var c=0;var d=0;var e=new Array;for(var f=1;f<=16;f++){for(var g=1;g<=a[f];g++){e[b[d]]=[];e[b[d]][0]=c;e[b[d]][1]=f;d++;c++}c*=2}return e}function I(a){var b=[16,11,10,16,24,40,51,61,12,12,14,19,26,58,60,55,14,13,16,24,40,57,69,56,14,17,22,29,51,87,80,62,18,22,37,56,68,109,103,77,24,35,55,64,81,104,113,92,49,64,78,87,103,121,120,101,72,92,95,98,112,100,103,99];for(var c=0;c<64;c++){var i=d((b[c]*a+50)/100);if(i<1){i=1}else if(i>255){i=255}e[z[c]]=i}var j=[17,18,24,47,99,99,99,99,18,21,26,66,99,99,99,99,24,26,56,99,99,99,99,99,47,66,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99,99];for(var k=0;k<64;k++){var l=d((j[k]*a+50)/100);if(l<1){l=1}else if(l>255){l=255}f[z[k]]=l}var m=[1,1.387039845,1.306562965,1.175875602,1,.785694958,.5411961,.275899379];var n=0;for(var o=0;o<8;o++){for(var p=0;p<8;p++){g[n]=1/(e[z[n]]*m[o]*m[p]*8);h[n]=1/(f[z[n]]*m[o]*m[p]*8);n++}}}var b=this;var c=Math.round;var d=Math.floor;var e=new Array(64);var f=new Array(64);var g=new Array(64);var h=new Array(64);var i;var j;var k;var l;var m=new Array(65535);var n=new Array(65535);var o=new Array(64);var p=new Array(64);var q=[];var r=0;var s=7;var t=new Array(64);var u=new Array(64);var v=new Array(64);var w=new Array(256);var x=new Array(2048);var y;var z=[0,1,5,6,14,15,27,28,2,4,7,13,16,26,29,42,3,8,12,17,25,30,41,43,9,11,18,24,31,40,44,53,10,19,23,32,39,45,52,54,20,22,33,38,46,51,55,60,21,34,37,47,50,56,59,61,35,36,48,49,57,58,62,63];var A=[0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0];var B=[0,1,2,3,4,5,6,7,8,9,10,11];var C=[0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,125];var D=[1,2,3,0,4,17,5,18,33,49,65,6,19,81,97,7,34,113,20,50,129,145,161,8,35,66,177,193,21,82,209,240,36,51,98,114,130,9,10,22,23,24,25,26,37,38,39,40,41,42,52,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,225,226,227,228,229,230,231,232,233,234,241,242,243,244,245,246,247,248,249,250];var E=[0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0];var F=[0,1,2,3,4,5,6,7,8,9,10,11];var G=[0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,119];var H=[0,1,2,3,17,4,5,33,49,6,18,65,81,7,97,113,19,34,50,129,8,20,66,145,161,177,193,9,35,51,82,240,21,98,114,209,10,22,36,52,225,37,241,23,24,25,26,38,39,40,41,42,53,54,55,56,57,58,67,68,69,70,71,72,73,74,83,84,85,86,87,88,89,90,99,100,101,102,103,104,105,106,115,116,117,118,119,120,121,122,130,131,132,133,134,135,136,137,138,146,147,148,149,150,151,152,153,154,162,163,164,165,166,167,168,169,170,178,179,180,181,182,183,184,185,186,194,195,196,197,198,199,200,201,202,210,211,212,213,214,215,216,217,218,226,227,228,229,230,231,232,233,234,242,243,244,245,246,247,248,249,250];this.encode=function(a,b){var c=(new Date).getTime();if(b)Y(b);q=new Array;r=0;s=7;P(65496);R();T();S(a.width,a.height);U();V();var d=0;var e=0;var f=0;r=0;s=7;this.encode.displayName="_encode_";var m=a.data;var n=a.width;var o=a.height;var p=n*4;var w=n*3;var y,z=0;var A,B,C;var D,E,F,G,H;while(z<o){y=0;while(y<p){D=p*z+y;E=D;F=-1;G=0;for(H=0;H<64;H++){G=H>>3;F=(H&7)*4;E=D+G*p+F;if(z+G>=o){E-=p*(z+1+G-o)}if(y+F>=p){E-=y+F-p+4}A=m[E++];B=m[E++];C=m[E++];t[H]=(x[A]+x[B+256>>0]+x[C+512>>0]>>16)-128;u[H]=(x[A+768>>0]+x[B+1024>>0]+x[C+1280>>0]>>16)-128;v[H]=(x[A+1280>>0]+x[B+1536>>0]+x[C+1792>>0]>>16)-128}d=W(t,g,d,i,k);e=W(u,h,e,j,l);f=W(v,h,f,j,l);y+=32}z+=8}if(s>=0){var I=[];I[1]=s+1;I[0]=(1<<s+1)-1;N(I)}P(65497);var J="data:image/jpeg;base64,"+btoa(q.join(""));q=[];var K=(new Date).getTime()-c;console.log("Encoding time: "+K+"ms");return J};Z()}

window.addEventListener( 'load', init, false );