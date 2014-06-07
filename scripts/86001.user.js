// ==UserScript==
// @name           Chromacity for dAmn - Page JS
// @namespace      nuckchorris0.deviantart.com
// @description    Chromacity for dAmn - Page JS
// @include        http://chat.deviantart.com/chat/*
// ==/UserScript==

// Majority of code by NuckChorris0
// Some parts by realillusions, sumopiggy, nol888, and others.
// Thanks to dAmnGoodies for the idea (and code) for setting it up as an external JS file.
// Thanks to Nicks-be-Gone for teaching me how to handle dAmn without using MiddleMan.js.
// Thanks to MiddleMan.js for making dAmn scripts easier.  And faster.
// Thanks to Coral CDN for giving me a free way to keep from pissing off UserScripts.org.
// Thanks to electricjonny and Pickley for being awesome.
// Thanks to Evlwolf, TragicArmadillo, and Lildevilat13 for constantly telling me to hurry.

var chromacity = window.chromacity = ({
	colors: {
		name: 'd',
		msg: 'd'
	},
	colorsBlacklist: ['ABB2AB', 'EAF2EE', 'DAE2DE', 'B0BFB9', '94A09B', 'C2C8C2', '353E39', '080808', '2E3735', 'DDDDDD', '6E7D7B', 'AFC81C', 'E8E8E8', 'F0F0F0', '212A2A', 'AFC81C', '2E3735', 'AFC81C', 'D3E0DC', '3E8EB7', 'DEE8E5', '3E8EB7', 'CED8D5', 'AFBCB0', 'DCE7DC', '999999'],
	init: function(){
		var chromacityStyle = document.createElement("style");
		chromacityStyle.id  = "chromacity-CSS";
		var me = dAmn_Client_Username;
		chromacityStyle.appendChild(document.createTextNode(".u-"+me+" .from { color: #"+chromacity.colors.name+"; } .u-"+me+" .text { color: #"+chromacity.colors.msg+"; }"));
		document.getElementsByTagName("head")[0].appendChild(chromacityStyle);
		chromacity.users = ({});
		chromacity.users[me] = ({});
		chromacity.users[me].name = chromacity.colors.name;
		chromacity.users[me].msg = chromacity.colors.msg;
		MiddleMan.Interface.chatNotice(false,"&nbsp;<b>Chromacity has loaded.</b>",false,1);
		jQuery.getScript('http://damncolors.nol888.com.nyud.net/ColorList.php',function(){
			MiddleMan.Interface.chatNotice(false,"&nbsp;Chromacity has loaded dAmnColors list for comaptibility.",false,1);
		});
	},
	apply: function(user,colors){
		if (jQuery("#chromacity-CSS").html().indexOf(".u-"+user) == -1){
			jQuery("#chromacity-CSS").append(".u-"+user+" .from { color: #"+colors[1]+"; } .u-"+user+" .text { color: #"+colors[2]+"; }\n");
			chromacity.users[user] = ({});
			chromacity.users[user].msg = colors[2];
			chromacity.users[user].name = colors[1];
		} else if (chromacity.users[user].msg != colors[2] || chromacity.users[user].name != colors[1]){
			jQuery("#chromacity-CSS").html(jQuery("#chromacity-CSS").html().replace(".u-"+user+" .from { color: #"+chromacity.users[user].name+"; } .u-"+user+" .text { color: #"+chromacity.users[user].msg+"; }",".u-"+user+" .from { color: #"+colors[1]+"; } .u-"+user+" .text { color: #"+colors[2]+"; }\n"));
			chromacity.users[user] = ({});
			chromacity.users[user].msg = colors[2];
			chromacity.users[user].name = colors[1];
		}
	},
	settings: {
		change: function(n,m){
			window.chromacity.colors.name = n;
			window.chromacity.colors.msg = m;
			window.chromacity.settings.setdata('name',n);
			window.chromacity.settings.setdata('msg',m);
			window.chromacity.apply(dAmn_Client_Username,['',n,m]);
		},
		setdata: function(name, value){
			if (typeof(name) == "string"){
				if (('localStorage' in window) && window['localStorage'] !== null){
					localStorage["chromacity_"+name] = value;
				} else {
					cookieDate=new Date();
					cookieDate.setTime(cookieDate.getTime()+(100 * 24 * 60 * 60 * 1000));
					document.cookie = "chromacity_" + name + "=" + escape(value) + "; expires=" +  cookieDate.toGMTString() + "; path=/; domain=deviantart.com";
				}
			}
		},
		getdata: function(name,d){
			if (localStorage["chromacity_"+name] != null && localStorage["chromacity_"+name] != undefined){
				return localStorage["chromacity_"+name];
			} else {
				var cookies = document.cookie.split(/; /);
				for (var i = 0; i < cookies.length; i++) {
					var cookieVal = cookies[i].split(/=/);
					if (cookieVal[0] == "chromacity_" + name) {
						return unescape(cookieVal[1]);
					}
				}
			}
			return d;
		},
/*		promptForColors: function(){
			var tempName = prompt('Name Color?\n Format is FF0000. DO NOT put a # in front.', window.chromacity.settings.getdata('name',''));
			var tempMsg = prompt('Message Color?\n Format is FF0000. DO NOT put a # in front.', window.chromacity.settings.getdata('msg',''));
			window.chromacity.settings.change(tempName, tempMsg);
		}, */
		migrateOldColors: function(){
			jQuery.getScript('http://damncolors.nol888.com.nyud.net/ColorList.php',function(){
				if (!window.colors[dAmn_Client_Username.toLowerCase()] || window.colors[dAmn_Client_Username.toLowerCase()] == null){
					MiddleMan.Interface.chatNotice(false,"&nbsp;<b>Chromacity Error:</b> Could not port from dAmnColors. Server may be down, or you may not be in the dAmnColors database.",false);
				} else {
					var old  = ({});
					old.name = window.colors[dAmn_Client_Username.toLowerCase()][0].replace("#","").toUpperCase();
					old.msg  = window.colors[dAmn_Client_Username.toLowerCase()][1].replace("#","").toUpperCase();
					window.chromacity.settings.change(old.name,old.msg);
					jQuery("#name-color-box").val(old.name).validHex().applyFarbtastic();
					jQuery("#msg-color-box").val(old.msg).validHex().applyFarbtastic();
					jQuery(".focus").click();
					if (window.chromacity.settings.getdata('firstTime',true) == true){
						jQuery('#chromacity-btn').attr('src','http://i52.tinypic.com/2rpcztk.png').css('margin-top','8px');
						jQuery(".damncrc-error .damncrc-hide img").click();
						window.chromacity.settings.setdata('firstTime',false);
					}
				}
			});
		}
	},
});

MiddleMan.Event.bind("dAmnChat", "send", "chromacity_addColor", function(args){
	if(args.cmd.toLowerCase() == "msg" && args.str.indexOf("(bot)") == -1 && chromacity.colors.name != "d" && chromacity.colors.msg != "d"){
		args.str += ' <abbr title="colors:'+chromacity.colors.name+':'+chromacity.colors.msg+'"></abbr>';
	} else if (args.cmd.toLowerCase() != "npmsg" && args.str.indexOf("(bot)") != -1 ){
		args.str = args.str.replace("(bot)","");
	}
	return args;
});
MiddleMan.Event.bind("dAmnChat_recv", "msg", "chromacity_getColor", function(packet){
	var sub_packet = dAmn_ParsePacket(packet.body);
	if (sub_packet.body.indexOf('&abbr\tcolors:')>-1) {
		var hexRegExp = /&abbr\tcolors:((?:[A-F]|[0-9]){3}(?:(?:[A-F]|[0-9]){3})?):((?:[A-F]|[0-9]){3}(?:(?:[A-F]|[0-9]){3})?)\t/;
		var colors = hexRegExp.exec(sub_packet.body);
		window.chromacity.apply(sub_packet.args.from.toLowerCase(),colors);
		return packet;
	} else if (window.colors && window.colors[sub_packet.args.from.toLowerCase()]){
		var oldColors = window.colors[sub_packet.args.from.toLowerCase()];
		var colors = ({'name':oldColors[0].replace("#","").toUpperCase(),'msg':oldColors[1].replace("#","").toUpperCase()});
		window.chromacity.apply(sub_packet.args.from.toLowerCase(),['',colors.name,colors.msg]);
		return packet;
	} else {
		return packet;
	}
});

/**
 * Color Picker for Settings Panel
 *
 * Parts stolen from jQuery UI's Roll-Your-Own Skin page, 
 * then modified to work for the settings panel on Chromacity.
 */

/**
 * Farbtastic Color Picker 1.2
 * © 2008 Steven Wittens
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

jQuery.fn.farbtastic = function (callback) {
  jQuery.farbtastic(this, callback);
  return this;
};

jQuery.farbtastic = function (container, callback) {
  var container = jQuery(container).get(0);
  return container.farbtastic || (container.farbtastic = new jQuery._farbtastic(container, callback));
}

jQuery._farbtastic = function (container, callback) {
  // Store farbtastic object
  var fb = this;

  // Insert markup
  jQuery(container).html('<div class="farbtastic"><div class="color"></div><div class="wheel"></div><div class="overlay"></div><div class="h-marker marker"></div><div class="sl-marker marker"></div></div>');
  var e = jQuery('.farbtastic', container);
  fb.wheel = jQuery('.wheel', container).get(0);
  // Dimensions
  fb.radius = 84;
  fb.square = 100;
  fb.width = 194;

  // Fix background PNGs in IE6
  if (navigator.appVersion.match(/MSIE [0-6]\./)) {
    jQuery('*', e).each(function () {
      if (this.currentStyle.backgroundImage != 'none') {
        var image = this.currentStyle.backgroundImage;
        image = this.currentStyle.backgroundImage.substring(5, image.length - 2);
        jQuery(this).css({
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
      jQuery(fb.callback).unbind('keyup', fb.updateValue);
    }

    // Reset color
    fb.color = null;

    // Bind callback or elements
    if (typeof callback == 'function') {
      fb.callback = callback;
    }
    else if (typeof callback == 'object' || typeof callback == 'string') {
      fb.callback = jQuery(callback);
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
      x = (event.pageX || 0*(event.clientX + jQuery('html').get(0).scrollLeft)) - pos.x;
      y = (event.pageY || 0*(event.clientY + jQuery('html').get(0).scrollTop)) - pos.y;
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
      jQuery(document).bind('mousemove', fb.mousemove).bind('mouseup', fb.mouseup);
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
    jQuery(document).unbind('mousemove', fb.mousemove);
    jQuery(document).unbind('mouseup', fb.mouseup);
    document.dragging = false;
  }

  /**
   * Update the markers and styles
   */
  fb.updateDisplay = function () {
    // Markers
    var angle = fb.hsl[0] * 6.28;
    jQuery('.h-marker', e).css({
      left: Math.round(Math.sin(angle) * fb.radius + fb.width / 2) + 'px',
      top: Math.round(-Math.cos(angle) * fb.radius + fb.width / 2) + 'px'
    });

    jQuery('.sl-marker', e).css({
      left: Math.round(fb.square * (.5 - fb.hsl[1]) + fb.width / 2) + 'px',
      top: Math.round(fb.square * (.5 - fb.hsl[2]) + fb.width / 2) + 'px'
    });

    // Saturation/Luminance gradient
    jQuery('.color', e).css('backgroundColor', fb.pack(fb.HSLToRGB([fb.hsl[0], 1, 0.5])));

    // Linked elements or callback
    if (typeof fb.callback == 'object') {
      // Set background/foreground color
      jQuery(fb.callback).css({
        backgroundColor: fb.color,
        color: fb.hsl[2] > 0.5 ? '#000' : '#fff'
      });

      // Change linked value
      jQuery(fb.callback).each(function() {
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
  jQuery('*', e).mousedown(fb.mousedown);

    // Init color
  fb.setColor('#000000');

  // Set linked elements/callback
  if (callback) {
    fb.linkTo(callback);
  }
}

// validation for hex inputs
jQuery.fn.validHex = function() {
	
	return this.each(function() {
		
		var value = jQuery(this).val().toUpperCase();
		value = value.replace(/[^#a-fA-F0-9]/g, ''); // non [#a-f0-9]
		if(value.match(/#/g) && value.match(/#/g).length > 1) value = value.replace(/#/g, ''); // ##
		if(value.indexOf('#') == -1) value = '#'+value; // no #
		if(value.length > 7) value = value.substr(0,7); // too many chars
		
		if (chromacity.colorsBlacklist[value.replace("#","")]){
			jQuery(this).addClass('blacklisted');
		} else {
			jQuery(this).removeClass('blacklisted');
		}

		jQuery(this).val(value);
	});	

};

//color pickers setup (sets bg color of inputs)
jQuery.fn.applyFarbtastic = function() {
	return this.each(function() {
		jQuery('<div/>').farbtastic(this).remove();
	});
};

jQuery('.damnc-header h1').after('<img src="http://i52.tinypic.com/2rpcztk.jpg" id="chromacity-btn">');
jQuery("a[title='Drag']").css('margin','8px 8px 0 0');
var rPos = 0;
jQuery('.damnc-header').children().each(function(){
	var el = jQuery(this);
	if (el.attr('id').toLowerCase() != 'chromacity-btn'){
		var rEl = el.css('right').replace("px","").valueOf();
		var r = Number(el.outerWidth(true)) + Number(rEl);
		rPos = (rPos < r)?r:rPos;
	}
});
jQuery('#chromacity-btn').css({'right':rPos,'position':'absolute','margin':'8px 8px 0 0','top':'2px','z-index':'51','cursor':'pointer'});

jQuery('#chromacity-btn').after('<div id="chromacity-settings"><div id="chromacity-picker"></div><div class="settings-right"><div id="name-settings"><div id="name-label">Name</div><input class="hex" id="name-color-box"></div><div id="msg-settings"><div id="msg-label">Message</div><input class="hex" id="msg-color-box"></div><div class="settings-buttons"><div id="port-btn">Port<span>from dAmnColors</span></div><div id="apply-btn">Apply<span>these colors</span></div></div></div></div>');
jQuery('#chromacity-settings').css({'top':(jQuery('#chromacity-btn').position().top+4)+"px",'right':(rPos+4)+"px"}).hide();

jQuery('#chromacity-btn').click(function(){
	jQuery('#chromacity-settings').toggle();
});

jQuery('input.hex').validHex().keyup(function(){ jQuery(this).validHex(); }).focus(function(){ jQuery(this).click(); }).click(function(){
	jQuery('.focus').removeClass('focus');
	jQuery(this).addClass('focus');
	jQuery('#picker').remove();
	jQuery('#chromacity-picker').append('<div id="picker"></div>').addClass('picker-on');
	jQuery('#picker').farbtastic(this);
	return false;
}).applyFarbtastic();

jQuery('#apply-btn').click(function(){
	var name = jQuery('#name-color-box').val().replace("#","").toUpperCase();
	var msg = jQuery('#msg-color-box').val().replace("#","").toUpperCase();
	if (!chromacity.colorsBlacklist[name] && !chromacity.colorsBlacklist[msg]){
		window.chromacity.settings.change(name,msg);
	} else {
		if (chromacity.colorsBlacklist[name]){
			jQuery('#name-color-box').addClass('blacklisted');
		} else if (chromacity.colorsBlacklist[msg]){
			jQuery('#msg-color-box').addClass('blacklisted');
		}
	}
	if (window.chromacity.settings.getdata('firstTime',true) == true){
		jQuery('#chromacity-btn').attr('src','http://i52.tinypic.com/2rpcztk.png').css('margin-top','8px');
		jQuery(".damncrc-error .damncrc-hide img").click();
		window.chromacity.settings.setdata('firstTime',false);
	}
});
jQuery('#port-btn').click(function(){
	window.chromacity.settings.migrateOldColors();
});
jQuery(function(){
	window.chromacity.init();
	var myColors  = ({});
	myColors.name = window.chromacity.settings.getdata('name','d');
	myColors.msg  = window.chromacity.settings.getdata('msg','d');
	window.chromacity.colors.name = myColors.name;
	window.chromacity.colors.msg = myColors.msg;
	if (myColors.name != 'd' && myColors.msg != 'd'){
		window.chromacity.apply(dAmn_Client_Username,['',myColors.name,myColors.msg]);
		jQuery("#name-color-box").val(myColors.name).validHex().applyFarbtastic();
		jQuery("#msg-color-box").val(myColors.msg).validHex().applyFarbtastic();
	}
	if (window.chromacity.settings.getdata('firstTime',true) == true){
		MiddleMan.Interface.chatNotice(false,"<div style=\"overflow: auto;\"><div style=\"float: left;\"><img src=\"http://i55.tinypic.com/ftmx06.jpg\" /></div><div style=\"float: left; padding-top: 5px; padding-left: 10px;\"><h2 style=\"padding: 0px; margin: 0px;\"><u>Welcome to Chromacity</u></h2>To begin using Chromacity, click on the rainbow \"<code>!</code>\" at the top-right corner of your screen.<br />Then, pick your colors or click \"Port from dAmnColors\" to have Chromacity automatically get your settings from dAmnColors.</div></div>",false,600);
		jQuery('#chromacity-btn').attr('src','http://i51.tinypic.com/2qjhj7m.png').css('margin-top','2px');
	}
	var rPos = 0;
	jQuery('.damnc-header').children().each(function(){
		var el = jQuery(this);
		if (el.attr('id').toLowerCase() != 'chromacity-btn' && el.attr('id').toLowerCase() != 'chromacity-settings'){
			var rEl = el.css('right').replace("px","").valueOf();
			var r = Number(el.outerWidth(true)) + Number(rEl);
			rPos = (rPos < r)?r:rPos;
		}
	});
	jQuery('#chromacity-btn').css('right',rPos);
});