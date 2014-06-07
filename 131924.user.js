// ==UserScript==
// @name           SnipeTheWeb
// @namespace      http://*
// @description    Take a sniper rifle into your hand and wreck havoc upon the web
// @include        http://*
// @include        https://*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==
// auther:  petrifiednightmares
// version: 0.1.2

var r;

var ready=0;

var Reticule = function(imageUrl,reloadSound,shootSound)
{
	this.domElement = $('<div class="snipetheweb" style="position:absolute; pointer-events: none; width:200px; z-index: 100000; height: 200px; left:0px; top:0px;" id="aimingReticule"><img style="width: 100%; height:100%;" src="'+imageUrl+'"></img></div>')
	$('body').append(this.domElement);
	this.speed= 50;
	this.loaded=false;
	this.targetX=0;
	this.targetY=0;
	this.moving= false;
	
	this.movementTimer;
	
	var self= this;
	
	this.shootSound = shootSound;
	this.reloadSound = reloadSound;
	
	this.reload();
}

Reticule.prototype.followCursor = function (x,y) {
	this.domElement.css({"left":x,"top":y});
}

Reticule.prototype.move = function()
{
	if(this.moving && (this.getX() != this.targetX || this.getY != this.targetY ))
	{
		var deltaY = this.targetY - this.getY();
		var deltaX = this.targetX - this.getX();
		
		var distance = this.distance(this.targetX,this.targetY);
		
		if(distance <= this.speed)
		{
			this.setLocation(this.targetX,this.targetY);
		}
		else
		{
			var multiplier = this.speed / distance;
			this.setLocation(this.getX()+deltaX*multiplier,this.getY()+deltaY*multiplier);
		}
	}
	var self = this;
	clearTimeout(this.movementTimer);
	this.movementTimer = setTimeout(function(){self.move()},20);
}
Reticule.prototype.setLocation= function(x,y)
{
	this.domElement.css({"left":x,"top":y});
}
Reticule.prototype.getX = function()
{
	return parseInt(this.domElement.css('left'));
}

Reticule.prototype.getY = function()
{
	return parseInt(this.domElement.css('top'));
}

Reticule.prototype.getCenter = function()
{
	return {x:this.getX()+100,y:this.getY() +100};
}

Reticule.prototype.distance = function(x,y)
{
	return Math.sqrt(Math.pow(this.getX()-x,2) + Math.pow(this.getY()-y,2));
}

Reticule.prototype.fire = function()
{
	if(this.loaded)
	{
		this.moving=false;
		var self = this;
		this.loaded = false;
		this.shootSound.play();
		var target = this.getTarget();
		new Bullethole(self.getCenter().x, self.getCenter().y);
		this.impact(target);
		this.recoil(function(){
			setTimeout(function(){
				self.reload();
			},100);
		});
	}	
}

Reticule.prototype.getTarget= function()
{
	var x = this.getCenter().x;
	var y = this.getCenter().y;
	var element = $($.elementFromPoint(x,y));
	return element;
}
Reticule.prototype.impact= function(target)
{
	if(target.offset() != null)
		new Target(target);
}
Reticule.prototype.recoil = function(callBack)
{
	var self = this;
	var distance = Math.random() * 25 + 75;
	var overshoot = Math.random()*5 + 10;
	this.domElement.stop().clearQueue().animate({"top":this.getY()-distance},10,function(){
		self.domElement.stop().clearQueue().animate({"top":self.getY()+distance+overshoot},150,'swing', function(){
			self.domElement.stop().clearQueue().animate({"top":self.getY()-overshoot},250,function(){
				callBack();
			});
		});
	});
}
Reticule.prototype.reload= function()
{
	var self = this;
	this.reloadSound.play();
	this.domElement.animate({rotate: '-=45deg'}, 300, function(){
		self.domElement.animate({rotate: '+=45deg'}, 150,function(){
			self.loaded=true;
			self.moving=true;
		});
	});
}

var Sound = function(name, oggurl, mp3url, order)
{
	this.domElement = $('<audio id="'+name+'" preload="auto"><source src="'+oggurl+'" type="audio/ogg"></source><source src="'+mp3url+'" type="audio/mp3"></source></audio>')
	this.audioElement = this.domElement[0];
	$('body').append(this.domElement);
	
	this.domElement.bind('canplay',function(){
		ready++;
	});
}
Sound.prototype.play = function()
{
	this.stop();
	this.audioElement.currentTime=0;
	this.audioElement.play();
}
Sound.prototype.stop= function()
{
	this.audioElement.pause();
}
var Target = function(domElement)
{
	domElement.addClass('snipetheweb-hidden');
	this.domElement = domElement.clone();

	this.domElement.addClass('snipetheweb');
	this.domElement.css({"position":"absolute", "z-index":1000});
	this.domElement.css({"top":domElement.offset().top,"left":domElement.offset().left});
	domElement.hide();
	
	$('body').append(this.domElement);
	
	var rotation = Math.random()*361;
	this.domElement.rotate(rotation+'deg');
	
	this.gravityAccel = 3;
	this.yVel = -parseInt(Math.random()*40);
	this.xVel = parseInt(Math.random()*40)-20;
	this.bounceTimes = parseInt(Math.random()*5)+10;
	this.bounceCounter = 0;

	this.move();
}
Target.prototype.move = function()
{
	this.domElement.css({"top":parseInt(this.getY()+this.yVel)+'px', "left":parseInt(this.getX()-this.xVel)+'px'});
	this.yVel += this.gravityAccel;
	if(this.hitGround())
	{
		if(this.bounceCounter < this.bounceTimes)
		{
			this.bounce();
			this.bounceCounter++;
			var self = this;
			setTimeout(function(){self.move()},50);
		}
	}
	else
	{
		var self = this;
		setTimeout(function(){self.move()},50);
	}
}
Target.prototype.hitGround = function()
{
	return (window.innerHeight+$(document).scrollTop()) - (this.getY() + this.domElement.height()) < 20;
}
Target.prototype.bounce = function()
{
	this.yVel = - (40/Math.pow(this.bounceTimes,2))*(Math.pow(this.bounceTimes - this.bounceCounter,2));
}
Target.prototype.getX = function()
{
	return parseInt(this.domElement.css('left'));
}
Target.prototype.getY = function()
{
	return parseInt(this.domElement.css('top'));
}
var Bullethole = function(x,y)
{
	x-=25;
	y-=25;
	var urlList=["http://i.imgur.com/uuEqc.png","http://i.imgur.com/5J8mc.png","http://i.imgur.com/j1IpB.png"];
	
	var imageIndex = parseInt(Math.random()*3);
	
	var rotation = Math.random()*361;
	
	this.domElement = $('<img class="snipetheweb" style="position:absolute;pointer-events: none; 10000; width:50px; height:50px; left:'+x+'px; top:'+y+'px;" src="'+urlList[imageIndex]+'"></img>');
	
	this.domElement.rotate(rotation+'deg');
	
	$('body').append(this.domElement);
}
$(document).ready(function() {
	var reloadSound = new Sound("reload","http://k004.kiwi6.com/hotlink/f36a597m7g/bolt_action.ogg","http://k004.kiwi6.com/hotlink/0m1284cug0/bolt_action.mp3");
	var shootSound = new Sound("gunshot","http://k004.kiwi6.com/hotlink/x73d8t1487/gunshot.ogg","http://k004.kiwi6.com/hotlink/2u683o637q/gunshot.mp3");
	
	$(document).keyup(function(e){
		if(e.keyCode == 192)
		{
			var loader = $('<div style="position: fixed; left: 0px; top:0px; height: 100%; width: 100%; background: rgba(0,0,0,0.5);"><img style="left:50%; margin-left: -110px; position:relative; top:50%" src="http://i.imgur.com/Lbh5F.gif" alt="please wait"></img></div>');
			$('body').append(loader);
			runWhenReady(loader,reloadSound,shootSound);
		}
		else if (e.keyCode == 27)
		{
			unload();
		}
	});
});

function unload()
{
	$("html").css({"cursor":"auto"});
	$('.snipetheweb').each(function(){
		$(this).remove();
	});
	$('.snipetheweb-hidden').each(function(){
		$(this).show();
	});
	$(document).unbind('mousemove');
	$(document).unbind('click');
}

function runWhenReady(loader,reloadSound,shootSound)
{
	if(ready>=2)
	{
		loader.remove();
		r = new Reticule("http://i.imgur.com/8cbxD.png",reloadSound,shootSound);
		
		$("html").css({"cursor":"none"});
		
		$(document).mousemove(function(e){
			r.followCursor(e.pageX-100,e.pageY-100);
		});
		
		$(document).scroll(function(e){
			r.followCursor(e.pageX-100,e.pageY-100);
		});
		
		$(document).click(function(e){
			e.preventDefault();
			r.fire();
		});
	}
	else
	{
		setTimeout(function(){runWhenReady(loader,reloadSound,shootSound)},300);
	}
}



















(function ($) {
    // Monkey patch jQuery 1.3.1+ to add support for setting or animating CSS
    // scale and rotation independently.
    // 2009-2010 Zachary Johnson www.zachstronaut.com
    // Updated 2010.11.06
    var rotateUnits = 'deg';
    
    $.fn.rotate = function (val)
    {
        var style = $(this).css('transform') || 'none';
        
        if (typeof val == 'undefined')
        {
            if (style)
            {
                var m = style.match(/rotate\(([^)]+)\)/);
                if (m && m[1])
                {
                    return m[1];
                }
            }
            
            return 0;
        }
        
        var m = val.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/);
        if (m)
        {
            if (m[3])
            {
                rotateUnits = m[3];
            }
            
            $(this).css(
                'transform',
                style.replace(/none|rotate\([^)]*\)/, '') + 'rotate(' + m[1] + rotateUnits + ')'
            );
        }
        
        return this;
    }
    
    // Note that scale is unitless.
    $.fn.scale = function (val, duration, options)
    {
        var style = $(this).css('transform');
        
        if (typeof val == 'undefined')
        {
            if (style)
            {
                var m = style.match(/scale\(([^)]+)\)/);
                if (m && m[1])
                {
                    return m[1];
                }
            }
            
            return 1;
        }
        
        $(this).css(
            'transform',
            style.replace(/none|scale\([^)]*\)/, '') + 'scale(' + val + ')'
        );
        
        return this;
    }

    // fx.cur() must be monkey patched because otherwise it would always
    // return 0 for current rotate and scale values
    var curProxied = $.fx.prototype.cur;
    $.fx.prototype.cur = function ()
    {
        if (this.prop == 'rotate')
        {
            return parseFloat($(this.elem).rotate());
        }
        else if (this.prop == 'scale')
        {
            return parseFloat($(this.elem).scale());
        }
        
        return curProxied.apply(this, arguments);
    }
    
    $.fx.step.rotate = function (fx)
    {
        $(fx.elem).rotate(fx.now + rotateUnits);
    }
    
    $.fx.step.scale = function (fx)
    {
        $(fx.elem).scale(fx.now);
    }
    
    /*
Starting on line 3905 of jquery-1.3.2.js we have this code:
// We need to compute starting value
if ( unit != "px" ) {
self.style[ name ] = (end || 1) + unit;
start = ((end || 1) / e.cur(true)) * start;
self.style[ name ] = start + unit;
}
This creates a problem where we cannot give units to our custom animation
because if we do then this code will execute and because self.style[name]
does not exist where name is our custom animation's name then e.cur(true)
will likely return zero and create a divide by zero bug which will set
start to NaN.
The following monkey patch for animate() gets around this by storing the
units used in the rotation definition and then stripping the units off.
*/
    
    var animateProxied = $.fn.animate;
    $.fn.animate = function (prop)
    {
        if (typeof prop['rotate'] != 'undefined')
        {
            var m = prop['rotate'].toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);
            if (m && m[5])
            {
                rotateUnits = m[5];
            }
            
            prop['rotate'] = m[1];
        }
        
        return animateProxied.apply(this, arguments);
    }
})(jQuery);




(function ($) {
    // Monkey patch jQuery 1.3.1+ css() method to support CSS 'transform'
    // property uniformly across Safari/Chrome/Webkit, Firefox 3.5+, IE 9+, and Opera 11+.
    // 2009-2011 Zachary Johnson www.zachstronaut.com
    // Updated 2011.05.04 (May the fourth be with you!)
    function getTransformProperty(element)
    {
        // Try transform first for forward compatibility
        // In some versions of IE9, it is critical for msTransform to be in
        // this list before MozTranform.
        var properties = ['transform', 'WebkitTransform', 'msTransform', 'MozTransform', 'OTransform'];
        var p;
        while (p = properties.shift())
        {
            if (typeof element.style[p] != 'undefined')
            {
                return p;
            }
        }
        
        // Default to transform also
        return 'transform';
    }
    
    var _propsObj = null;
    
    var proxied = $.fn.css;
    $.fn.css = function (arg, val)
    {
        // Temporary solution for current 1.6.x incompatibility, while
        // preserving 1.3.x compatibility, until I can rewrite using CSS Hooks
        if (_propsObj === null)
        {
            if (typeof $.cssProps != 'undefined')
            {
                _propsObj = $.cssProps;
            }
            else if (typeof $.props != 'undefined')
            {
                _propsObj = $.props;
            }
            else
            {
                _propsObj = {}
            }
        }
        
        // Find the correct browser specific property and setup the mapping using
        // $.props which is used internally by jQuery.attr() when setting CSS
        // properties via either the css(name, value) or css(properties) method.
        // The problem with doing this once outside of css() method is that you
        // need a DOM node to find the right CSS property, and there is some risk
        // that somebody would call the css() method before body has loaded or any
        // DOM-is-ready events have fired.
        if
        (
            typeof _propsObj['transform'] == 'undefined'
            &&
            (
                arg == 'transform'
                ||
                (
                    typeof arg == 'object'
                    && typeof arg['transform'] != 'undefined'
                )
            )
        )
        {
            _propsObj['transform'] = getTransformProperty(this.get(0));
        }
        
        // We force the property mapping here because jQuery.attr() does
        // property mapping with jQuery.props when setting a CSS property,
        // but curCSS() does *not* do property mapping when *getting* a
        // CSS property.  (It probably should since it manually does it
        // for 'float' now anyway... but that'd require more testing.)
        //
        // But, only do the forced mapping if the correct CSS property
        // is not 'transform' and is something else.
        if (_propsObj['transform'] != 'transform')
        {
            // Call in form of css('transform' ...)
            if (arg == 'transform')
            {
                arg = _propsObj['transform'];
                
                // User wants to GET the transform CSS, and in jQuery 1.4.3
                // calls to css() for transforms return a matrix rather than
                // the actual string specified by the user... avoid that
                // behavior and return the string by calling jQuery.style()
                // directly
                if (typeof val == 'undefined' && jQuery.style)
                {
                    return jQuery.style(this.get(0), arg);
                }
            }

            // Call in form of css({'transform': ...})
            else if
            (
                typeof arg == 'object'
                && typeof arg['transform'] != 'undefined'
            )
            {
                arg[_propsObj['transform']] = arg['transform'];
                delete arg['transform'];
            }
        }
        
        return proxied.apply(this, arguments);
    };
})(jQuery);




(function ($){
  var check=false, isRelative=true;

  $.elementFromPoint = function(x,y)
  {
    if(!document.elementFromPoint) return null;

    if(!check)
    {
      var sl;
      if((sl = $(document).scrollTop()) >0)
      {
       isRelative = (document.elementFromPoint(0, sl + $(window).height() -1) == null);
      }
      else if((sl = $(document).scrollLeft()) >0)
      {
       isRelative = (document.elementFromPoint(sl + $(window).width() -1, 0) == null);
      }
      check = (sl>0);
    }

    if(isRelative)
    {
      x -= $(document).scrollLeft();
      y -= $(document).scrollTop();
    }
	
	var element = document.elementFromPoint(x,y);
	var tagname = $(element).prop('tagName');
	
	if(tagname != undefined)
	{
		tagname=tagname.toLowerCase();
		if(tagname != 'body' && tagname != 'html')
			return element;
		else
			return [];
	}
	return [];
  }	

})(jQuery);




/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 *
 */
