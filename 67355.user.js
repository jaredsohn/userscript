// ==UserScript==
// @name			G.O.O.G.L.E. Tag (Alternative Ver.)
// @namespace		http://tokyo.fffff.at/
// @include			http://www.google.tld/search?*
// @require			http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

(function() {

// press num key to change colors
var colors = [
	"red",
	"green",
	"blue",
	"cyan",
	"magenta",
	"yellow",
	"black",
	"white"
];

// class for dripping effect
var drip_step = 2;
var drip_max_length = 30;
var drip_creation_rate = 0.1;
var drip_stop_rate = 0.05;
var drips = new Array();

var Drip = function(init_x, init_y) {
	this.x = init_x;
	this.y = init_y;
	
	this.drip_length = 0;
	
	this.dripping = true;
	
	this.draw = function(context) {
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

// ref. http://gist.github.com/226604

var spray_x = -1;
var spray_y = -1;

$(canvas_front).mousedown(function(e) {
	spray_x = window.pageXOffset + e.clientX - offset_left;
	spray_y = window.pageYOffset + e.clientY - offset_top;
	
	ctx_front.beginPath();
	ctx_front.moveTo(spray_x, spray_y);
});

$(canvas_front).mouseup(function(e) {
	spray_x = -1;
	spray_y = -1;
	ctx_front.closePath();
});

$(canvas_front).mouseout(function(e) { // same as above
	spray_x = -1;
	spray_y = -1;
	ctx_front.closePath();
});

$(canvas_front).mousemove(function(e) {
	if (spray_x < 0 || spray_y < 0) {
		return;
	}
	
	spray_x = window.pageXOffset + e.clientX - offset_left;
	spray_y = window.pageYOffset + e.clientY - offset_top;
	
	if(Math.random() < drip_creation_rate) {
		drips.push(new Drip(spray_x, spray_y));
	}
	
	ctx_front.lineTo(spray_x, spray_y);
	ctx_front.stroke();
	
	ctx_front.moveTo(spray_x, spray_y);
});

// hook keypress to change colors
$(document).keypress(function(e) {
	var key_num = parseInt(String.fromCharCode(e.which));
	if(key_num < colors.length) changeColor(key_num);
});

// dripping effect
function drawDrips() {
	for(var i=0; i<drips.length; i++) {
		if(drips[i].dripping) {
			drips[i].draw(ctx_back);
		}
	}
}

// color change
function changeColor(i) {
	// merge canvases
	ctx_back.drawImage(canvas_front, 0, 0);
	var empty_img = ctx_front.createImageData(width, height);
	ctx_front.putImageData(empty_img, 0, 0);
	
	// clear drips
	drips = new Array();
	
	// change color
	ctx_front.strokeStyle = colors[i];
	ctx_back.strokeStyle = colors[i];
}

var width, height, offset_top, offset_left;
var canvas_front, canvas_back;
var ctx_front, ctx_back;

// initialize
$(document).ready(function () {
	var li = $(".g:first");
	var ol = li.parent();
	
	ol.css("min-width",ol.width());
	ol.css("min-height",ol.height());
	
	// canvas settings
	width = ol.width();
	height = ol.height();
	offset_top = ol.offset().top;
	offset_left = ol.offset().left;

	// canvas to show strokes
	canvas_front = unsafeWindow.document.createElement("canvas"); // unsafe!!!
	$(canvas_front).attr("width", width);
	$(canvas_front).attr("height", height);
	$(canvas_front).css("top", offset_top);
	$(canvas_front).css("left", offset_left);
	$(canvas_front).css("position", "absolute");
	$(canvas_front).attr("id", "front");
	
	ctx_front = canvas_front.getContext("2d");
	ctx_front.strokeStyle = colors[0];
	ctx_front.lineWidth = 5;
	ctx_front.lineJoin = "round";
	ctx_front.lineCap = "round";
	
	// canvas to show drips
	canvas_back = canvas_front.cloneNode(false);
	$(canvas_back).attr("id", "back");
	
	ctx_back = canvas_back.getContext("2d");
	ctx_back.strokeStyle = colors[0];
	ctx_back.lineWidth = 2;
	ctx_back.lineJoin = "round";
	ctx_back.lineCap = "round";

	$(".g").each(function(){
		$(this).css("top",$(this).offset().top);
		$(this).css("left",$(this).offset().left);
	});
	
	$(".g").css("position","absolute");
	
	function moveElement(e) {
		var scale = 50.0;
		$(this).animate({
			top: $(this).offset().top + scale*(e.clientY - window.innerHeight/2.0),
			left: $(this).offset().left + scale*(e.clientX - window.innerWidth/2.0)
		}, 1000 );
	}
	
	$(".g").dblclick(moveElement);
	
	li.before($(canvas_back));
	li.before($(canvas_front));
	
	setInterval(drawDrips, 100);
});

})();