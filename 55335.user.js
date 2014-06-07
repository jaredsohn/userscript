// ==UserScript==
// @name           Reddit Hover Voter
// @namespace      www.spocksplanet.com
// @description    Are you tired of having to click your mouse button to show your approval/disapproval on Reddit? Well, tire no more. With this script, you only need to hover over the arrow to vote.
// @include        http://reddit.com/*
// @include        http://*.reddit.com/*
// ==/UserScript==

/*

  Author: Volkan Unsal, spocksplanet@gmail.com
  Date:   2009-08-09

*/
var waitTime = 200; //milliseconds


//HoverIntent
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=$.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};

		//[object XPCNativeWrapper [object HTMLDivElement]]
		
		//vs
		
		//[object HTMLDivElement]

//DOM is ready
//Fetch all the rows with arrows
$('.arrow')
	.each(function(){

		$(this).hoverIntent({
			sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
			interval: waitTime,   // number = milliseconds of polling interval
			over: function(){
						var evt = document.createEvent("HTMLEvents");
						evt.initEvent("click", true, true);
						this.dispatchEvent(evt); 
					},  
			timeout: 0,   // number = milliseconds delay before onMouseOut function call
			out: function(){}    
		});
	
	
	});

//mouseOver


//mouseOut


})(unsafeWindow.jQuery);

