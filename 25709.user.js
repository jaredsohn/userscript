// ==UserScript==
// @name                 WLR Basic
// @namespace       http://forums.whirlpool.net.au
// @version              2.0
// @description       WLR Basic
// @include              http://forums.whirlpool.net.au/*
// @include              http://whirlpool.net.au/*
// @include             http://whirlpool.net.au/wiki/?tag=wlr
// @exclude             http://forums.whirlpool.net.au/forum-replies.cfm?*p=-2*
// @exclude             http://forums.whirlpool.net.au/forum-replies.cfm*&r=*#r*
// @exclude             http://forums.whirlpool.net.au/forum-replies.cfm*&ux*
// @exclude             http://forums.whirlpool.net.au/forum-replies-archive.cfm*
// ==/UserScript==
//based on MeatSacks WLR script
//0.2 changes - fixed "Mark All Read" bug
//0.3 changes - fixed wlr settings thread track number bug
//0.4 changes - added function to disable colouring of threads/posts
//0.5 changes - changed the colour picker link to be more obvious
//0.6 changes - added style flip. added only colour end square. Added settings reset to default. Added new post number hover.
//0.7 changes - changed to GM storage. 
//0.8 changes - changed in thread post highlighting - no longer highlights first couple of posts. Fixed in thread highlighting when click back button. Fixed disable colouring when only colour last square is checked. Fixed number of threads to track. Fixed New GM Key glitch
//0.9 changes - fixed colour picker code
//1.0 changes - fixed colour reset
//1.1 changes - fixed thread colour highlighting/save changes
//1.2 changes - fixed max tracking glitch
//1.3 changes - fixed max tracking glitch - 2nd go
//1.4 changes - fixed max tracking glitch - 3rd
//1.5 changes - added option to disable tracking of sticky threads
//1.6 changes - added option to disable colouring of end square
//1.7 changes - fixed max tracking glitch - 4th go & added new exclude (&ux)
//1.8 changes - fixed mark all read glitch (thanks AnyWho)
//1.9 changes - added a scrollto anchor option
//2.0 changes - fixed max tracking glitch (thanks AnyWho) 2nd go

$ = unsafeWindow.jQuery;

var dUrl = document.URL.toLowerCase();

if(GM_getValue('lastRead0') && (GM_getValue('lastRead0').charAt(0) == ',') ){

	$('body').prepend('<div style="border: 3px solid grey; position: absolute; height: 100px; width: 100%; background-color: rgb(97, 105, 166); z-index: 99;" id="wlrAlert">'+
					'	<p style="margin: 5px 0pt 0pt 40px; color: white; font-size: 20px;width:600px;">An error has occured in the greasemonkey script.</p>'+
					'	<p style="margin: 5px 0pt 0pt 40px; color: white; font-size: 20px;width:600px;">Click this button to fix it. '+
					'		<button id="fixtrack" style="height:20px;width:60px;margin:0 0 0 20px;padding:0px 0 17px 0;">Fix</button>'+
					'	</p> '+
					'	<p style="margin: 18px 0pt 0pt 40px; color: white; font-size: 12px;">Note: In order to fix this error for good, it would help if you could post to the '+
					'	greasemonkey thread and describe what you were doing before the error occured.</p>'+
					'</div>');
					
	$('#fixtrack').mouseup(function(){

		$('#wlrAlert').remove();
		
		window.setTimeout(function(){
		
			var getV = GM_getValue('lastRead0');
			
			var tttest = getV.substr(getV.indexOf(',')+1);
			
			GM_setValue('lastRead0', tttest);

		}, 0);		
	
	});
					
}

/**check if threadnumber is in gm storage***/

function checkIfPrev(tn){

	var ofTheMac, checkForAmp;
	var cLR = GM_getValue('lastRead0');

	if(cLR){

		if(cLR.match(tn) ){

			var clrThis = cLR.split(',');
			
			clrThis.pop();

			for(var u =0;u<clrThis.length;u++){

				checkForAmp = clrThis[u].split('t=')[1].split('&')[0].split('#')[0];

				if( checkForAmp == tn ){

					ofTheMac = clrThis[u];
					
					break;

				}	

			}

		}
		else{
		
			ofTheMac = 'newThread';
		
		}
				
	}
	else{
	
		ofTheMac = 'newCookie';
	
	}

	return ofTheMac;

}


var numTotrack, bcg, hpc, jtbgc, nptc, nojtbgc, nnptc, lbox, flip, setSplit;

if(GM_getValue('wlrSettings0')){

	setSplit = GM_getValue('wlrSettings0').split(',');
	
	numTotrack = setSplit[0];
	bcg = setSplit[1];
	hpc = setSplit[2];
	jtbgc = setSplit[3];
	nptc = setSplit[4];
	nojtbgc = setSplit[5];
	nnptc = setSplit[6];
	lbox = setSplit[7];
	flip = setSplit[8];
	(setSplit.length < 10)? nostick = 'false': nostick = setSplit[9];
	(setSplit.length < 11)? noColourEnd = 'false': noColourEnd = setSplit[10];
	(setSplit.length < 12)? scrollTo = 'false': scrollTo = setSplit[11];

}
else{

	numTotrack = '1000';
	bcg = '#CFCBBC';
	hpc = 'false';
	jtbgc = "#95b0cb";
	nptc = 'false';
	nojtbgc = "#cbc095";
	nnptc = 'false';
	lbox = 'false';
	flip = 'false';
	nostick = 'false';
	noColourEnd = 'false';
	scrollTo = 'false';
	
	GM_setValue('wlrSettings0', '1000,#CFCBBC,false,#95b0cb,false,#cbc095,false,false,false,false,false');
}

$('#menu_forum ul').append('<li><a href="http://forums.whirlpool.net.au/wiki/?tag=wlr">WLR</a></li>');

if(dUrl.indexOf('wiki/?tag=wlr') > -1){

	/********
	Colour Picker Code - http://acko.net/dev/farbtastic
	***********/
	// $Id: farbtastic.js,v 1.2 2007/01/08 22:53:01 unconed Exp $
	// Farbtastic 1.2
	jQuery = unsafeWindow.jQuery;
	jQuery.fn.farbtastic = function (callback) {
	  $.farbtastic(this, callback);
	  return this;
	};

	jQuery.farbtastic = function (container, callback) {
	  var container = $(container).get(0);
	  return jQuery._farbtastic(container, callback);
	  
	  //return container.farbtastic || ( container.farbtastic = new jQuery._farbtastic(container, callback));	  
	  
	}

	jQuery._farbtastic = function (container, callback) {
	  // Store farbtastic object
	  var fb = this;

	  // Insert markup
	  $(container).html('<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>');
	  var e = $('.farbtastic', container);
	  fb.wheel = $('.wheel', container).get(0);
	  // Dimensions
	  fb.radius = 84;
	  fb.square = 100;
	  fb.width = 194;

	  // Fix background PNGs in IE6
	  if (navigator.appVersion.match(/MSIE [0-6]\./)) {
	    $('*', e).each(function () {
	      if (this.currentStyle.backgroundImage != 'none') {
	        var image = this.currentStyle.backgroundImage;
	        image = this.currentStyle.backgroundImage.substring(5, image.length - 2);
	        $(this).css({
	          'backgroundImage': 'none',
	          'filter': "progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=crop, src='" + image + "')"
	        });
	      }
	    });
	  }

	  /**
	   * Link to the given element(s) or callback.
	   */
	  fb.linkTo = function (callback) {
	    // Unbind previous nodes
	    if (typeof fb.callback == 'object') {
	      $(fb.callback).unbind('keyup', fb.updateValue);
	    }

	    // Reset color
	    fb.color = null;

	    // Bind callback or elements
	    if (typeof callback == 'function') {
	      fb.callback = callback;
	    }
	    else if (typeof callback == 'object' || typeof callback == 'string') {
	      fb.callback = $(callback);
	      fb.callback.bind('keyup', fb.updateValue);
	      if (fb.callback.get(0).value) {
	        fb.setColor(fb.callback.get(0).value);
	      }
	    }
	    return this;
	  }
	  fb.updateValue = function (event) {
	    if (this.value && this.value != fb.color) {
	      fb.setColor(this.value);
	    }
	  }

	  /**
	   * Change color with HTML syntax #123456
	   */
	  fb.setColor = function (color) {
	    var unpack = fb.unpack(color);
	    if (fb.color != color && unpack) {
	      fb.color = color;
	      fb.rgb = unpack;
	      fb.hsl = fb.RGBToHSL(fb.rgb);
	      fb.updateDisplay();
	    }
	    return this;
	  }

	  /**
	   * Change color with HSL triplet [0..1, 0..1, 0..1]
	   */
	  fb.setHSL = function (hsl) {
	    fb.hsl = hsl;
	    fb.rgb = fb.HSLToRGB(hsl);
	    fb.color = fb.pack(fb.rgb);
	    fb.updateDisplay();
	    return this;
	  }

	  /////////////////////////////////////////////////////

	  /**
	   * Retrieve the coordinates of the given event relative to the center
	   * of the widget.
	   */
	  fb.widgetCoords = function (event) {
	    var x, y;
	    var el = event.target || event.srcElement;
	    var reference = fb.wheel;

	    if (typeof event.offsetX != 'undefined') {
	      // Use offset coordinates and find common offsetParent
	      var pos = { x: event.offsetX, y: event.offsetY };

	      // Send the coordinates upwards through the offsetParent chain.
	      var e = el;
	      while (e) {
	        e.mouseX = pos.x;
	        e.mouseY = pos.y;
	        pos.x += e.offsetLeft;
	        pos.y += e.offsetTop;
	        e = e.offsetParent;
	      }

	      // Look for the coordinates starting from the wheel widget.
	      var e = reference;
	      var offset = { x: 0, y: 0 }
	      while (e) {
	        if (typeof e.mouseX != 'undefined') {
	          x = e.mouseX - offset.x;
	          y = e.mouseY - offset.y;
	          break;
	        }
	        offset.x += e.offsetLeft;
	        offset.y += e.offsetTop;
	        e = e.offsetParent;
	      }

	      // Reset stored coordinates
	      e = el;
	      while (e) {
	        e.mouseX = undefined;
	        e.mouseY = undefined;
	        e = e.offsetParent;
	      }
	    }
	    else {
	      // Use absolute coordinates
	      var pos = fb.absolutePosition(reference);
	      x = (event.pageX || 0*(event.clientX + $('html').get(0).scrollLeft)) - pos.x;
	      y = (event.pageY || 0*(event.clientY + $('html').get(0).scrollTop)) - pos.y;
	    }
	    // Subtract distance to middle
	    return { x: x - fb.width / 2, y: y - fb.width / 2 };
	  }

	  /**
	   * Mousedown handler
	   */
	  fb.mousedown = function (event) {
	    // Capture mouse
	    if (!document.dragging) {
	      $(document).bind('mousemove', fb.mousemove).bind('mouseup', fb.mouseup);
	      document.dragging = true;
	    }

	    // Check which area is being dragged
	    var pos = fb.widgetCoords(event);
	    fb.circleDrag = Math.max(Math.abs(pos.x), Math.abs(pos.y)) * 2 > fb.square;

	    // Process
	    fb.mousemove(event);
	    return false;
	  }

	  /**
	   * Mousemove handler
	   */
	  fb.mousemove = function (event) {
	    // Get coordinates relative to color picker center
	    var pos = fb.widgetCoords(event);

	    // Set new HSL parameters
	    if (fb.circleDrag) {
	      var hue = Math.atan2(pos.x, -pos.y) / 6.28;
	      if (hue < 0) hue += 1;
	      fb.setHSL([hue, fb.hsl[1], fb.hsl[2]]);
	    }
	    else {
	      var sat = Math.max(0, Math.min(1, -(pos.x / fb.square) + .5));
	      var lum = Math.max(0, Math.min(1, -(pos.y / fb.square) + .5));
	      fb.setHSL([fb.hsl[0], sat, lum]);
	    }
	    return false;
	  }

	  /**
	   * Mouseup handler
	   */
	  fb.mouseup = function () {
	    // Uncapture mouse
	    $(document).unbind('mousemove', fb.mousemove);
	    $(document).unbind('mouseup', fb.mouseup);
	    document.dragging = false;
	  }

	  /**
	   * Update the markers and styles
	   */
	  fb.updateDisplay = function () {
	    // Markers
	    var angle = fb.hsl[0] * 6.28;
	    $('.h-marker', e).css({
	      left: Math.round(Math.sin(angle) * fb.radius + fb.width / 2) + 'px',
	      top: Math.round(-Math.cos(angle) * fb.radius + fb.width / 2) + 'px'
	    });

	    $('.sl-marker', e).css({
	      left: Math.round(fb.square * (.5 - fb.hsl[1]) + fb.width / 2) + 'px',
	      top: Math.round(fb.square * (.5 - fb.hsl[2]) + fb.width / 2) + 'px'
	    });

	    // Saturation/Luminance gradient
	    $('.color', e).css('backgroundColor', fb.pack(fb.HSLToRGB([fb.hsl[0], 1, 0.5])));

	    // Linked elements or callback
	    if (typeof fb.callback == 'object') {
	      // Set background/foreground color
	      $(fb.callback).css({
	        backgroundColor: fb.color,
	        color: fb.hsl[2] > 0.5 ? '#000' : '#fff'
	      });

	      // Change linked value
	      $(fb.callback).each(function() {
	        if (this.value && this.value != fb.color) {
	          this.value = fb.color;
	        }
	      });
	    }
	    else if (typeof fb.callback == 'function') {
	      fb.callback.call(fb, fb.color);
	    }
	  }

	  /**
	   * Get absolute position of element
	   */
	  fb.absolutePosition = function (el) {
	    var r = { x: el.offsetLeft, y: el.offsetTop };
	    // Resolve relative to offsetParent
	    if (el.offsetParent) {
	      var tmp = fb.absolutePosition(el.offsetParent);
	      r.x += tmp.x;
	      r.y += tmp.y;
	    }
	    return r;
	  };

	  /* Various color utility functions */
	  fb.pack = function (rgb) {
	    var r = Math.round(rgb[0] * 255);
	    var g = Math.round(rgb[1] * 255);
	    var b = Math.round(rgb[2] * 255);
	    return '#' + (r < 16 ? '0' : '') + r.toString(16) +
	           (g < 16 ? '0' : '') + g.toString(16) +
	           (b < 16 ? '0' : '') + b.toString(16);
	  }

	  fb.unpack = function (color) {
	    if (color.length == 7) {
	      return [parseInt('0x' + color.substring(1, 3)) / 255,
	        parseInt('0x' + color.substring(3, 5)) / 255,
	        parseInt('0x' + color.substring(5, 7)) / 255];
	    }
	    else if (color.length == 4) {
	      return [parseInt('0x' + color.substring(1, 2)) / 15,
	        parseInt('0x' + color.substring(2, 3)) / 15,
	        parseInt('0x' + color.substring(3, 4)) / 15];
	    }
	  }

	  fb.HSLToRGB = function (hsl) {
	    var m1, m2, r, g, b;
	    var h = hsl[0], s = hsl[1], l = hsl[2];
	    m2 = (l <= 0.5) ? l * (s + 1) : l + s - l*s;
	    m1 = l * 2 - m2;
	    return [this.hueToRGB(m1, m2, h+0.33333),
	        this.hueToRGB(m1, m2, h),
	        this.hueToRGB(m1, m2, h-0.33333)];
	  }

	  fb.hueToRGB = function (m1, m2, h) {
	    h = (h < 0) ? h + 1 : ((h > 1) ? h - 1 : h);
	    if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
	    if (h * 2 < 1) return m2;
	    if (h * 3 < 2) return m1 + (m2 - m1) * (0.66666 - h) * 6;
	    return m1;
	  }

	  fb.RGBToHSL = function (rgb) {
	    var min, max, delta, h, s, l;
	    var r = rgb[0], g = rgb[1], b = rgb[2];
	    min = Math.min(r, Math.min(g, b));
	    max = Math.max(r, Math.max(g, b));
	    delta = max - min;
	    l = (min + max) / 2;
	    s = 0;
	    if (l > 0 && l < 1) {
	      s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
	    }
	    h = 0;
	    if (delta > 0) {
	      if (max == r && max != g) h += (g - b) / delta;
	      if (max == g && max != b) h += (2 + (b - r) / delta);
	      if (max == b && max != r) h += (4 + (r - g) / delta);
	      h /= 6;
	    }
	    return [h, s, l];
	  }

	  // Install mousedown handler (the others are set on the document on-demand)
	  $('*', e).mousedown(fb.mousedown);

	    // Init color
	  fb.setColor('#000000');

	  // Set linked elements/callback
	  if (callback) {
	    fb.linkTo(callback);
	  }
	}

	/************
	end colour picker code
	*******************/
	
	
	
	GM_addStyle(".farbtastic {"+
	 " position: absolute;"+
	"}"+
	".farbtastic * {"+
	"  position: absolute;"+
	"  cursor: crosshair;"+
	"}"+
	".farbtastic, .farbtastic .wheel {"+
	"  width: 195px;"+
	"  height: 195px;"+
	"}"+
	".farbtastic .color, .farbtastic .overlay {"+
	"  top: 47px;"+
	"  left: 47px;"+
	"  width: 101px;"+
	"  height: 101px;"+
	"}"+
	".farbtastic .wheel {"+
	"  background: url(http://img.photobucket.com/albums/v215/thegooddale/wheel.png) no-repeat;"+
	"  width: 195px;"+
	"  height: 195px;"+
	"}"+
	".farbtastic .overlay {"+
	"  background: url(http://img.photobucket.com/albums/v215/thegooddale/mask.png) no-repeat;"+
	"}"+
	".farbtastic .marker {"+
	"  width: 17px;"+
	"  height: 17px;"+
	"  margin: -8px 0 0 -8px;"+
	"  overflow: hidden; "+
	"  background: url(http://img.photobucket.com/albums/v215/thegooddale/marker.png) no-repeat;"+
	"}	"+
	"#cPick{"+
	"	position:relative;	"+
	"	width:200px;"+
	"}"+
	"#colorpicker{"+
	"	background-color:transparent !important;"+
	"}"+
	"#toggleC{"+	
		"color:green;"+
		"font-size:10px;"+
		"opacity:0.5;"+
		"position:relative;"+
		"text-decoration:underline;"+
		"top:5px;"+
	"}"+
	"#resetWLR {"+
	"font-size:10px;"+
	"padding:0;"+
	"width:60px;"+
	"float:left;"+
	"}"+
	"#saveWLR {"+
	"height:58px;"+
	"padding:0;"+
	"width:80px;"+
	"margin-left:20px;"+
	"}"	);	


	var iHazSettinz = '<p>Default Settings Are Enabled</p>';

	if(setSplit){
	
		iHazSettinz = '';
	
	}

	$('#breadcrumb').after('<div id="wlrSettings" style="position:relative;background:#EEEEEE;border:1px solid grey;'+
						'margin:0.5em 0.5em 3em 0.5em;padding:2em 3em; z-index:3;">'+
						'<h2 style="border-bottom:1px dashed #888888;font-family:Arial,sans-serif;margin:0pt 0pt 0.6em;padding:0pt 0pt 0.2em;">Last Read Settings</h2>'+
						iHazSettinz+
						'<p>Number Of Threads To Track:'+
						'	<select selected="'+numTotrack+'" name="wlrsetts">'+
						'		<option value="300">300</option>'+
						'		<option value="500">500</option>'+
						'		<option value="1000">1000</option>'+
						'		<option value="2000">2000</option>'+
						'		<option value="5000">5000</option>'+
						'	</select>'+
						'</p>'+
						'<p>Highlighted Posts Colour:'+
						'	<input type="text" size="7" id="lighted" value="'+bcg+'" name="wlrsetts"/>'+
						'	<a class="wReset" style="margin-left:40px;color:green;text-decoration:underline;" href="#">reset</a>'+
						'	<input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+hpc+'"><span style="opacity:0.5;font-size:10px;">&nbsp;disable colouring</span>'+
						'	<div class="showColourPicker" style="height:22px;width:22px;background:'+bcg+';position:relative;margin:-35px 0 0 230px">'+
						'	</div>'+
						'</p>'+
						'<p>New Posts Thread Colour:'+
						'	<input type="text" size="7" id="last" name="wlrsetts" value="'+jtbgc+'" />'+
						'	<a class="wReset" style="margin-left:40px;color:green;text-decoration:underline;" href="#">reset</a>'+
						'	<input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+nptc+'"><span style="opacity:0.5;font-size:10px;">&nbsp;disable colouring</span>'+
						'	<div class="showColourPicker" style="height:22px;width:22px;background:'+jtbgc+';position:relative;margin:-35px 0 0 230px">'+
						'	</div>						'+
						'</p>'+
						'<p>No New Posts Thread Colour:'+ 
						'	<input type="text" size="7" id="nolast" name="wlrsetts" value="'+nojtbgc+'" />'+
						'	<a class="wReset" style="margin-left:40px;color:green;text-decoration:underline;" href="#">reset</a>'+
						'	<input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+nnptc+'"><span style="opacity:0.5;font-size:10px;">&nbsp;disable colouring</span>'+
						'	<div class="showColourPicker" style="height:22px;width:22px;background:'+nojtbgc+';position:relative;margin:-35px 0 0 250px">'+
						'	</div>						'+
						'</p>'+	
						'<a id="toggleC" href="#">Show Colour Picker</a>'+
						'<div id="toggleColourP" style="display:none;width:200px;height:225px;position:absolute;border:grey 3px solid;background-color:#EEEEEE;z-index:5;"><form id="cPick"><input type="text" id="color" name="color" value="#123456" /></form>'+
						'<div id="colorpicker"></div></div><br />		<br/>	'+
						'<p><input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+lbox+'"><span style="opacity:0.5;font-size:10px;">&nbsp;only colour end square</span>&nbsp;&nbsp;<img src="http://img.photobucket.com/albums/v215/thegooddale/noneread.gif" /></p>'+						
						'<p><input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+flip+'"><span style="opacity:0.5;font-size:10px;">&nbsp;style flip&nbsp;&nbsp; (Colours unread posts in threads rather than read posts)</span>'+
						'<p><input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+nostick+'"><span style="opacity:0.5;font-size:10px;">&nbsp;don\'t track sticky threads</span></p>'+
						'<p><input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+noColourEnd+'"><span style="opacity:0.5;font-size:10px;">&nbsp;don\'t colour end square</span></p>'+																								
						'<p><input type="checkbox" name="wlrsetts" style="margin-left:10px;" value="'+scrollTo+'"><span style="opacity:0.5;font-size:10px;">&nbsp;scroll to anchor after page load</span></p>'+																														
						'</p>'+
						'<br/><br/><button id="resetWLR">Reset Settings To Default Values</button>&nbsp;<button id="saveWLR">Save</button>				'+
						'<span id="changesSaved" style="color:green;margin-left:20px;display:none;">Changes Saved</span>'+
						'</div>');	
						
	
	$('#colorpicker').farbtastic('#color');

	$('.wReset').one("click", function(){
	
		var va;
		var tPrev = $(this).prev();
	
		if(tPrev.attr('id') == 'lighted'){
		
			va = '#CFCBBC';
		}
		else if(tPrev.attr('id') == 'last'){
		
			va = "#95b0cb";
		
		}
		else if(tPrev.attr('id') == 'nolast'){
		
			va = "#cbc095";
		
		}
	
		tPrev.val(va);
		
		tPrev.parent().next().css('background', va);
		
		return false;
	
	});
	
	$('#wlrSettings input[@type="text"]').bind("click mouseup blur keyup input", function() {	

		var wlrSetThis = $(this);
	
		var colourDiv = $(this).parent().next();
		
		colourDiv.css('background', wlrSetThis.val())
		
	});

	$('#toggleC').click(function(evt){

		var eY = evt.pageY-80;
		var eX = evt.pageX-300;	
		
		($(this).text() == 'Show Colour Picker')?$(this).text('Hide Colour Picker') : $(this).text('Show Colour Picker');
		
		$('#toggleColourP').toggle().css({"left": eX, "top": eY});
		
		return false;
	
	});
	
	var wI = document.getElementsByName('wlrsetts');
	
	$(wI).each(function(q){

		if((wI[q].type == "checkbox") && (setSplit[q] == 'true')){
		
			wI[q].checked = true;
		
		}
		else if(wI[q].type == "select-one"){
		
			wI[q].value = setSplit[q];
		
		}
	
	});	
	
	document.getElementById('saveWLR').addEventListener('mouseup', function(){

		var tAr = [];

		$(wI).each(function(i){
		
			var toPush;
		
			(wI[i].type == "checkbox")?toPush=wI[i].checked: toPush=wI[i].value;
		
			tAr.push(toPush);
		
		});
		if(tAr[0] < setSplit[0] && GM_getValue("lastRead0").split(',').length > tAr[0]){

			var getLR2split = GM_getValue("lastRead0").split(',')[tAr[0]];

			var getLR2split2 = GM_getValue("lastRead0").split(getLR2split+',')[1];

			GM_setValue("lastRead0", getLR2split2);

		}

		GM_setValue('wlrSettings0', tAr.toString());
		
		$('#changesSaved').fadeIn(1000).fadeOut(2000);
		
	}, false);
	
	document.getElementById('resetWLR').addEventListener('mouseup', function(){
	
		GM_setValue('wlrSettings0', '1000,#CFCBBC,false,#95b0cb,false,#cbc095,false,false,false');
		
		$('#changesSaved').fadeIn(1000).fadeOut(2000);
	
	}, false);

}



/*******run on forum-threads.cfm page********/
	
if((dUrl.indexOf('threads') > -1) || (dUrl.indexOf('user') > -1)){

	var stupidimages, stupidAtags, lazyFuckers = 'newread', lazyFuckers2 = "nonewread";

	var durM = dUrl.match('user');
	
	var userLink = $('#left .userinfo dt a span').text();
	
	if(	nptc == 'true'){
	
		lazyFuckers = 'lazyFuckers';
	
	}
	if(nnptc == 'true'){
	
		lazyFuckers2 = 'lazyFuckers';
	
	}

													
	if(durM){

		stupidimages = $("td.goend>a");

	}
	else{
	
		stupidimages = $("a[@title='Jump to last post']"); 
		
	}
	
	GM_addStyle("#threads table tbody tr.newread td{background:"+jtbgc+" url(http://img.photobucket.com/albums/v215/thegooddale/generic-gradient6.png) !important}"+
				"#threads table tbody tr.nonewread td{background:"+nojtbgc+" url(http://img.photobucket.com/albums/v215/thegooddale/generic-gradient6.png) !important}"+
				".stopTrack{"+
					"border-bottom-color:grey;"+
					"border-bottom-style:dashed;"+
					"border-bottom-width:1px;"+
					"float:left;"+
					"margin-top:-5px;"+
					"margin-left:-14px;"+
					"opacity:0.3;"+			
				"}			"+	
				".markRead{"+
					"float:right;"+
					"opacity:0.3;"+
					"border-bottom-color:grey;"+
					"border-bottom-style:dashed;"+
					"border-bottom-width:1px;"+	
					"margin-top:-5px;"+					
				"}"+
				".wlrx{"+
				"	position:absolute;"+
				"	font-size:9px !important;"+
				"	width:95px;		"+		
				"}");

	for(var z=0;z<stupidimages.length;z++){
	
		var jThis = $(stupidimages[z]);
		var checkClass = jThis.parent().parent()[0].className.match('sticky');

		if(nostick == 'true' && checkClass){

			continue;
		
		}
		else{

			var jumpThreadNum = stupidimages[z].href.split('t=')[1].split('&')[0].split('#')[0];
			var tCheck = checkIfPrev(jumpThreadNum);
			var lastPoster, postedInColour;
			var postedin = false, jThisParent = jThis.parent();
				
			
			if(tCheck != 'newCookie' && tCheck != 'newThread'){
			
				var cookArrThreadNum = tCheck.split('t=')[1].split('&')[0].split('#')[0];
				
				if(durM){
				
					stupidAtags = Number(jThis.parent().prev().prev().text());
					lastPoster = jThis.parent().prev().find('b').text();
					
					if(jThisParent[0].style.backgroundColor == "rgb(226, 208, 187)"){
					
						postedin = true;
						postedInColour = "background-image: url(http://forums.whirlpool.net.au/img/forum/grad-morange.gif) !important; background-color: #E2C6A8 !important;";
					
					}					

				}
				else{
				
					stupidAtags = Number(jThis.parent().prev().prev().prev().prev().text()); 
					lastPoster = jThis.parent().prev().find('a').text();
					
					if(jThisParent[0].style.backgroundColor == "rgb(192, 180, 167)"){
					
						postedin = true;
						postedInColour = "background-color: #C2B7AA !important;";
					
					}					
				
				}
					
				
	            var replyNum = stupidAtags+1;

				if( jumpThreadNum == cookArrThreadNum ){
				
					var tholdpare = jThisParent.parent();

					if( (tCheck.split('#r')[1]< replyNum) && (replyNum > 1) && (lastPoster != userLink)){
					
						if( lbox == 'true' && nptc == 'false' ){
						
							lazyFuckers = 'lazyFuckers';
						
							jThisParent.attr("style", "background:"+jtbgc+" url(http://img.photobucket.com/albums/v215/thegooddale/generic-gradient6.png) !important");
							
						}

						var newpostsTitle = replyNum - tCheck.split('#r')[1]+' new posts';
						
						jThis.attr('href', '/forum-replies.cfm?'+tCheck).attr('title', 'Jump to last read post');
						tholdpare.attr("class", lazyFuckers).children('td.reps:first').attr('title', newpostsTitle).prepend('<span attcheat="'+jumpThreadNum+
							','+tCheck+','+replyNum+'" class="small wlrx"><a '+
							'href="# title="Stop Tracking Thread" class="stopTrack">S</a>'+
							'<a href="#" title="Mark All Posts As Read" class="markRead">M</a>'+	
							'</span>');
					
					}
					else{
						if(!tholdpare.hasClass("pointer") ){
						
							if( lbox == 'true' && nnptc == 'false' ){
							
								lazyFuckers2 = 'lazyFuckers2';
							
								jThisParent.attr("style", "background:"+nojtbgc+" url(http://img.photobucket.com/albums/v215/thegooddale/generic-gradient6.png) !important");
								
							}					
						
							tholdpare.attr("class", lazyFuckers2).children('td.reps:first').prepend('<span attcheat="'+jumpThreadNum+','+replyNum+'" class="small wlrx">'+
							'<a href="#" title="Stop Tracking Thread" class="stopTrack">S</a>'+	
								'</span>');
						
						}
						
					}
					if(lbox == 'false' && noColourEnd == 'true' && postedin){
					
						jThisParent.attr('style', postedInColour+' !important;');
						
					}					
				
				}
			
			}
		
		}

	}
	
	/***stop tracking thread***/
	
	var awhof = $('.stopTrack, .markRead');
	
	for(var d=0;d<awhof.length;d++){	
	
		awhof[d].addEventListener('click', function(e){
		
			e.preventDefault();
	
			var mehThis = $(this);
			var mehThisParent = mehThis.parent();
			var aSP = mehThisParent.attr('attcheat').split(',');
			var stRem = GM_getValue("lastRead0");
			var wholeThreadNum = stRem.slice( stRem.indexOf(aSP[0]), stRem.indexOf( ',', stRem.indexOf(aSP[0])) );
			var getLastTD = mehThisParent.parent().parent().children('td:last');
			var wholeReplace, setReadAll;		
			
			if(mehThis.hasClass("stopTrack")){
			
				wholeReplace = stRem.replace("t="+wholeThreadNum+",","");

				GM_setValue("lastRead0", wholeReplace);	
				
				getLastTD.removeAttr("style");

				mehThisParent.parent().parent().removeClass("newread nonewread");
			
			}
			else{
			
				var pageNo = '&p=1';

				var getLastPage = mehThisParent.parent().prev().prev().children('span.small').children('a:last')
				
				if(getLastPage[0]){
				
					pageNo = '&p='+getLastPage[0].href.split('&p=')[1]; 
				
				}

				if(wholeThreadNum.indexOf('&')>-1){
				
					setReadAll = wholeThreadNum.split('&')[0]+pageNo.split('#r')[0]+'#r'+aSP[2];
				
				}
				else{

					setReadAll = wholeThreadNum.split('#r')[0]+'#r'+aSP[2];
				
				}

				wholeReplace = stRem.replace(wholeThreadNum, setReadAll);

				GM_setValue("lastRead0", wholeReplace);	
				
				getLastTD.attr("style", "background:"+nojtbgc+" url(http://img.photobucket.com/albums/v215/thegooddale/generic-gradient6.png) !important");

				mehThisParent.parent().parent().removeClass("newread").attr("class", lazyFuckers2);

			}

			mehThis.remove();

			return false;
		

		}, false);
	
	}
	
	
}	

/*******run on forum-replies page********/

if(dUrl.indexOf('replies') > -1) {

	var lastReadLink;
	var yOff = (window.pageYOffset+window.innerHeight);
	var threadNumber = dUrl.split('t=')[1].split('&')[0].split('#')[0];
	var anchorArrRev = $('a[@title$=specific post]');
		
	function hazRead(rN, eType){

		if(Number(anchorArrRev.eq(anchorArrRev.length-1)[0].href.split('#r')[1]) <= Number(rN) && (eType != 'new') && (hpc == 'false')&&(flip == 'false')){ //if the last link on the page is lower than what already read up to

			GM_addStyle(".bodypost{background:"+bcg+" !important}");

			return 'noNew';
		
		}
		else{
		
			anchorArrRev.each(function(i){	
			
			var h = $(this).attr('href');

				var curtop = 0;
				var t = this;
				curtop = t.offsetTop;
				
				for(t!== null;t=t.offsetParent;){  //http://www.quirksmode.org/blog/archives/2008/01/using_the_assig.html

				    curtop += t.offsetTop;

				}			
				if(i === 0){ 

					/*if( (hpc =='false') && (flip == 'false') ){//always colour and grab the first link just in case first thread post is bigger than viewable area
					
						$(this).parent().parent().css('background', bcg+' !important');
						
					}*/
					lastReadLink = this.href;

				}
				if( (flip == 'false') && ((Number(h.slice(h.lastIndexOf('#r')+2))) < Number(rN)) && (eType == 'load') && (hpc == 'false')){

					$(this).parent().parent().css('background', bcg);

				}		
				else if( (flip == 'true') && ((Number(h.slice(h.lastIndexOf('#r')+2))) > Number(rN)) && (eType == 'load') && (hpc == 'false')){

					$(this).parent().parent().css('background', bcg);
				
				}				
				if( curtop < yOff ){

					lastReadLink = this.href;
					
				}


			});

			return 't='+lastReadLink.split('t=')[1];
		
		}

	}
	
	window.addEventListener('scroll', function() {

		if((window.pageYOffset+window.innerHeight) > yOff){

			yOff = (window.pageYOffset+window.innerHeight);

		}

	}, false);	
	
	window.addEventListener('load', function(){

		var loadCheck = checkIfPrev(threadNumber);

		if(loadCheck != 'newThread' && loadCheck != 'newCookie'){

			hazRead(loadCheck.slice(loadCheck.lastIndexOf('#r')+2), 'load');
		
		}

	}, false);	
	
	
	window.addEventListener('unload', function(){

			var cP = checkIfPrev(threadNumber);
			var returnedLink;
			
			if( cP == 'newThread') {
			
				returnedLink = hazRead(0, 'unload');
			
				var getLR2splitCheck = GM_getValue("lastRead0").split(',');
			
				if(getLR2splitCheck.length < Number(numTotrack)) {
				
					GM_setValue("lastRead0", GM_getValue('lastRead0')+returnedLink+",");
				
				}
				else{
				
					var sliceFirstTrack = GM_getValue("lastRead0");
					
					var sliceFirstTrack2 = sliceFirstTrack.substr(sliceFirstTrack.indexOf(',')+1)+returnedLink+",";
				
					GM_setValue("lastRead0", sliceFirstTrack2);				
				
				}

			}			
			else if(cP == 'newCookie'){
			
					returnedLink = hazRead(0, 'unload');
			
					GM_setValue("lastRead0", returnedLink+",");
			
			}
			else{
			
				var checkSplit = cP.slice(cP.lastIndexOf('#r')+2);
				returnedLink = hazRead(checkSplit, 'unload');

				if( (returnedLink !='noNew')&& ( Number(returnedLink.slice(returnedLink.lastIndexOf('#r')+2)) > Number(checkSplit) ) ){

					var repREturned = GM_getValue("lastRead0").replace(cP,returnedLink);

					GM_setValue("lastRead0", repREturned);

				}

			}
			//unsafeWindow.console.log(GM_getValue("lastRead0"));
	}, false);

	if(dUrl.indexOf('#')>-1 && scrollTo == 'true' && !dUrl.match('bottom')){
		
		window.setTimeout(function(){

			var an = '#'+dUrl.split('#')[1];
			var a = $('a[@href$='+an+']');
			var avatarCheck = a.parent().parent().prev().prev().find('a:first').height();

			if(avatarCheck>30){

				$.scrollTo(a, 500, {offset:-150});
				
			}
			else{
			
				$.scrollTo(a, 500);
			
			}

		
		}, 1000);

	}
	
}
