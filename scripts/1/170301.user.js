// ==UserScript==
// @name        StandupBoard User Scroller For Jira 6 + Greenhopper 6.2
// @namespace   agileboard_scroller
// @description In the Greenhopper boards, scroll from user to user using the PageUp and PageDown keys
// @include     */secure/RapidBoard.jspa?rapidView=1*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version     1.1
// ==/UserScript==

console.log("Greenhopper Standup board user scroller");

var index = 0;
var jumpOffset = -101;
var jumpCorrection = 15;
var itemJumps = null;
var checkAgileBoardPresent = null;

;(function($){$.fn.shuffle=function(){var allElems=this.get(),getRandom=function(max){return Math.floor(Math.random()*max)},shuffled=$.map(allElems,function(){var random=getRandom(allElems.length),randEl=$(allElems[random]).clone(true)[0];allElems.splice(random,1);return randEl});this.each(function(i){$(this).replaceWith($(shuffled[i]))});return $(shuffled)}})(jQuery);

/**
 * Map Key v0.7
 * Copyright © 2010 Josh Pyles / Pixelmatrix Design LLC
 * http://pixelmatrixdesign.com
 */
;(function(e){e.mapKey=function(t,n,r){var i=e.extend({},e.fn.mapKey.defaults,r);e.fn.mapKey.storeBinding(t,n,i.direction)};e.fn.mapKey=function(t,n){var r=e.extend({},e.fn.mapKey.defaults,n);return this.each(function(){var n=e(this);var i=e.meta?e.extend({},r,n.data()):r;var s="";var o;if(i.trigger){o=function(){n.trigger(i.trigger)}}else if(n.is("a[href]")){o=function(){window.location=n.attr("href")}}e.fn.mapKey.storeBinding(t,o,i.direction)})};e.fn.mapKey.storeBinding=function(t,n,r){if(typeof t=="number"){if(r=="up"){e.fn.mapKey.bindings.up[t]=n}else{e.fn.mapKey.bindings.down[t]=n}}else{var i=e.fn.mapKey.keys[t];if(typeof i=="number"){if(r=="up"){e.fn.mapKey.bindings.up[i.toString()]=n}else{e.fn.mapKey.bindings.down[i.toString()]=n}}else if(typeof i=="object"){e.each(i,function(t,i){if(r=="up"){e.fn.mapKey.bindings.up[i.toString()]=n}else{e.fn.mapKey.bindings.down[i.toString()]=n}})}}};e.fn.mapKey.kdown=function(t){if(e.fn.mapKey.enabled){var n=t.charCode?t.charCode:t.keyCode?t.keyCode:0;if(!e(t.target).is("input, textarea, select")){var r=e.fn.mapKey.bindings.down[n];if(r){if(typeof r=="string"){window.location=r}else if(typeof r=="function"){r()}t.preventDefault()}if(e.fn.mapKey.bindings.up[n]!=undefined){t.preventDefault()}}}};e.fn.mapKey.kup=function(t){if(e.fn.mapKey.enabled){if(!e(t.target).is("input, textarea, select")){var n=t.charCode?t.charCode:t.keyCode?t.keyCode:0;var r=e.fn.mapKey.bindings.up[n];if(r){if(typeof r=="string"){window.location=r}else if(typeof r=="function"){r()}t.preventDefault()}}}};e.fn.mapKey.enable=function(){e.fn.mapKey.enabled=true};e.fn.mapKey.disable=function(){e.fn.mapKey.enabled=false};e.fn.mapKey.defaults={trigger:undefined,direction:"up"};e.fn.mapKey.enabled=true;e.fn.mapKey.bindings={up:{},down:{}};e.fn.mapKey.keys={back:8,tab:9,enter:13,shift:16,ctrl:17,alt:18,opt:18,pause:19,caps:20,esc:27,space:32,pgup:33,pgdown:34,end:35,home:36,left:37,up:38,right:39,down:40,insert:45,del:46,top0:48,top1:49,top2:50,top3:51,top4:52,top5:53,top6:54,top7:55,top8:56,top9:57,0:[48,96],1:[49,97],2:[50,98],3:[51,99],4:[52,100],5:[53,101],6:[54,102],7:[55,103],8:[56,104],9:[57,105],a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,lwindows:91,rwindows:92,windows:[91,92],lcmd:91,rcmd:92,cmd:[91,92],select:93,num0:96,num1:97,num2:98,num3:99,num4:100,num5:101,num6:102,num7:103,num8:104,num9:105,multiply:106,add:107,subtract:109,decimalpt:110,divide:111,f1:112,f2:113,f3:114,f4:115,f5:116,f6:117,f7:118,f8:119,f9:120,f10:121,f11:122,f12:123,numlock:144,scrolllock:145,";":186,"=":187,",":188,"-":189,".":190,"/":191,"`":192,"[":219,backslash:220,"]":221,singlequote:222};e(document).bind("keyup",e.fn.mapKey.kup);e(document).bind("keydown",e.fn.mapKey.kdown)})(jQuery);

/**
 * @author Ariel Flesler
 */
;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

$(document).ready(function()
{
	console.log("GAH: set checkAgileBoardPresent interval");
	checkAgileBoardPresent = setInterval(function()
	{
		present = $("#ghx-pool").children().length;
		if(present)
		{
			initialize();
		}
	}, 100);
	
	console.log("GAH: set greenHopperPoller interval");
	greenHopperPoller = setInterval(function()
	{
		if (typeof GH != 'undefined')
		{
			disableGreenHopperPoller();
		}
	}, 100);
});

/**
 * Initialize the page, place the shortcuts and find the swimlanes
 */
function initialize()
{
	console.log("GAH: clear checkAgileBoardPresent interval");
	clearInterval(checkAgileBoardPresent);

	console.log("GAH: Shuffling developers!");
	$(".ghx-swimlane").shuffle();
	
	console.log("GAH: Determine itemJumps!");
	itemJumps = $(".ghx-swimlane");
	jumpOffset = ($('#ghx-column-header-group').height()*-1)+3;
		
	console.log("GAH: Mapping the keys");
	$(function(){
	  $.mapKey(".", nextItem, {direction: "down"});
	  $.mapKey("pgdown", nextItem, {direction: "down"});
	  $.mapKey("pgup", prevItem, {direction: "down"});
	  $.mapKey(",", prevItem, {direction: "down"});
	});
	console.log("GAH: Keys are mapped!");

	// Easter egg
	$(".ghx-feedback > a").text("Geshuffled en zo, veel plezier!");
	$(".ghx-feedback").animate({ height: +50 }, 500, function()
	{
		$(".ghx-feedback").slideToggle();
	});
	
	console.log("GAH: Done initializing...");
	
	console.log("GAH: Scrolling, scrolling, scrolling!");
	setTimeout(function(){
		$.scrollTo('#ghx-work', 1500, {offset: jumpCorrection});
	}, 800);
}

/**
 * Disable the GreenHopperPoller to prevent ajax
 * updates during the standup, this breaks the 
 * page-up,pagedown positions
 */
function disableGreenHopperPoller()
{
	GH.RefreshHandler.Poller.handler=null;
	GH.RefreshHandler.Poller.stopPoller();
	GH.RefreshHandler.disable();
	GH.RefreshHandler.enabled = false;
	
	console.log("GAH: clear greenHopperPoller interval");
	clearInterval(greenHopperPoller);
	console.log("GAH-check: " + GH.RefreshHandler.enabled);
}

/**
 * Jump to the next item in itemJumps 
 */
function nextItem()
{
	if(index < (itemJumps.length-1))
	{
		index += 1;
		var swimlane_id = $(itemJumps[index]).attr('swimlane-id');
		$('#ghx-pool').scrollTo($('.ghx-swimlane[swimlane-id="' + swimlane_id + '"]'), 600, { offset: jumpOffset });
	}
	else
	{
		index = -1;
		nextItem();
	}
	
	console.log("GAH: jumping to NEXT item");
}

/**
 * Jump to the previous item in itemJumps 
 */
function prevItem()
{
	if(index > 0)
	{
		index -= 1;
		var swimlane_id = $(itemJumps[index]).attr('swimlane-id');
		$('#ghx-pool').scrollTo($('.ghx-swimlane[swimlane-id="' + swimlane_id + '"]'), 600, { offset: jumpOffset });
	}
	
	console.log("GAH: jumping to PREVIOUS item");
}
