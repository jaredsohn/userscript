// ==UserScript==
// @name			Drippingoogle
// @namespace		http://tokyo.fffff.at/
// @include			http://www.google.tld/
// @include			http://www.google.tld/intl/*/
// @include			http://www.google.tld/webhp*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function(){

// class for dripping effect
var drip_step = 1;
var drip_max_length = 50;
var drip_creation_rate = 0.05;
var drip_stop_rate = 0.1;
var drips = new Array();

var Drip = function(init_x, init_y, color) {
	this.x = init_x;
	this.y = init_y;
	this.color = color;
	
	this.drip_length = 0;
	
	this.dripping = true;
	
	this.draw = function(context) {
		context.strokeStyle = this.color;
		context.beginPath();
		context.moveTo(this.x, this.y);
		this.y += drip_step;
		context.lineTo(this.x, this.y);
		context.stroke();
		context.closePath();
		
		this.drip_length += drip_step;
		
		if(this.drip_length > drip_max_length || Math.random() < drip_stop_rate) {
			this.dripping = false;
		}
	};
};

var im_w, im_h, canvas, ctx;

// place canvas and initialize drips
$(document).ready(function () {
	// logo position
	var logo = document.getElementById("logo");
	
	// canvas settings
	im_w = $(logo).width();
	im_h = $(logo).height();
	
	var logo_img = new Image();
	
	if($(logo).context.nodeName == "DIV") {
		var url = logo.style.backgroundImage;
		logo_img.src = url.substr(4, url.length-5); // rough workaround
	} else if($(logo).context.nodeName == "IMG") {
		logo_img.src = logo.src;
	}
	
	canvas = document.createElement("canvas");
	$(canvas).attr("width", im_w);
	$(canvas).attr("height", im_h);
	$(canvas).css("top", $(logo).offset().top);
	$(canvas).css("left", $(logo).offset().left);
	$(canvas).css("position", "absolute");
	$(canvas).attr("id", "drip");
	
	ctx = canvas.getContext("2d");
	ctx.lineWidth = 1;
	ctx.lineJoin = "round";
	ctx.lineCap = "round";
	$(logo).after($(canvas));
	var logo_data = imageToData(logo_img);
	
	for(var y=0; y<im_h; y+=1){
		for(var x=0; x<im_w; x+=1){
			var rgb = getRGB(logo_data, x, y);
			
			var max_val = Math.max(rgb[0],Math.max(rgb[1],rgb[2]));
			var min_val = Math.min(rgb[0],Math.min(rgb[1],rgb[2]));
			var saturation = 0.0;
			if(max_val > 0) saturation = (max_val - min_val)/max_val;
			
			var saturation_th = 0.5;
			if(Math.random() < drip_creation_rate && saturation > saturation_th) {
				var color_temp = "rgb("+rgb[0]+","+rgb[1]+","+rgb[2]+")";
				drips.push(new Drip(x, y+1, color_temp));
			}
		}
	}

	// start animation
	setInterval(drawDrips, 100);
});

// dripping effect
function drawDrips() {
	for(var i=0; i<drips.length; i++) {
		if(drips[i].dripping) {
			drips[i].draw(ctx);
		}
	}
}

function getRGB(data, x, y){
	var ri = (y*im_w + x)*4;
	var gi = (y*im_w + x)*4 + 1;
	var bi = (y*im_w + x)*4 + 2;
	return [data[ri], data[gi], data[bi]];
}

// ref. http://stackoverflow.com/questions/1393056/html-canvas-draw-image-without-anti-aliasing
function imageToData(image) {
	var canvas_temp = unsafeWindow.document.createElement("canvas"); // unsafe!
	canvas_temp.width = image.width;
	canvas_temp.height = image.height;
	var ctx_temp = canvas_temp.getContext("2d");
	ctx_temp.drawImage(image, 0, 0);
	return ctx_temp.getImageData(0, 0, canvas_temp.width, canvas_temp.height).data;
}

})();