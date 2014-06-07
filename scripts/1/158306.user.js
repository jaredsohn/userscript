// ==UserScript==
// @name		Neopets Reminders
// @namespace	Jahn Johansen
// @description	Remind yourself to do the dailies and such.
// @include		http://*.neopets.com/*
// @include		http://neopets.com/*
// @match		http://*.neopets.com/*
// @match		http://neopets.com/*
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js
// @version     1
// ==/UserScript==

var bootScript = function(){
	// Contains everything *AFTER* the domain, e.g. /index.phtml
	var page = location.pathname + location.search;
	
	// Please let me know if I'm missing some, here.
	var dailies = {
		// DAILIES
		"Collect Interest":
		{
			href:"/bank.phtml",
			type:"daily"
		},
		"Buy Stocks":
		{
			href:"/stockmarket.phtml?type=list&bargain=true",
			type:"daily"
		},
		"Lab Ray":
		{
			href:"/lab.phtml",
			type:"daily"
		},
		"Forgotten Shore":
		{
			href:"/pirates/forgottenshore.phtml",
			type:"daily"
		},
		"Anchor Management":
		{
			href:"/pirates/anchormanagement.phtml",
			type:"daily"
		},
		"Tombola":
		{
			href:"/island/tombola.phtml",
			type:"daily"
		},
		"Deserted Tomb":
		{
			href:"/worlds/geraptiku/tomb.phtml",
			type:"daily"
		},
		"Faerie Caverns":
		{
			href:"/faerieland/caverns/index.phtml",
			type:"daily"
		},
		"Fruit Machine":
		{
			href:"/desert/fruit/index.phtml",
			type:"daily"
		},
		"Negg Cave":
		{
			href:"/shenkuu/neggcave/",
			type:"daily"
		},
		// MORE FREQUENTLY THAN DAILIES
		"Qasalan Expellibox":
		{
			href:"/mall/shop.phtml?page=giveaway",
			type:"interval",
			delay: 60 * 60 * 8
		},
		"Coltzan's Shrine":
		{
			href:"/desert/shrine.phtml",
			type:"interval",
			delay:60 * 60 * 12
		},
		"Winter Kiosk":
		{
			href:"/winter/kiosk.phtml",
			type:"interval",
			delay: 60 * 60 * 6
		},
		"Wheel of Excitement":
		{
			href:"/faerieland/wheel.phtml",
			type:"interval",
			delay: 60 * 60 * 2
		},
		"Wheel of Mediocrity":
		{
			href:"/prehistoric/mediocrity.phtml",
			type:"interval",
			delay:60 * 40
		},
		"Healing Springs":
		{
			href:"/faerieland/springs.phtml",
			type:"interval",
			delay : 60 * 30
		}
	};
	
	// Good luck finding us, bitches! Temporary variables are temporary. B)
	$ = undefined;
	var jQ = jQuery;
	var $ = jQ;
	jQuery = undefined;
	
	/*!
	 * jQuery Cookie Plugin v1.3
	 * https://github.com/carhartl/jquery-cookie
	*/
	(function(e,t,n){function i(e){return e}function s(e){return decodeURIComponent(e.replace(r," "))}var r=/\+/g;var o=e.cookie=function(r,u,a){if(u!==n){a=e.extend({},o.defaults,a);if(u===null){a.expires=-1}if(typeof a.expires==="number"){var f=a.expires,l=a.expires=new Date;l.setDate(l.getDate()+f)}u=o.json?JSON.stringify(u):String(u);return t.cookie=[encodeURIComponent(r),"=",o.raw?u:encodeURIComponent(u),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}var c=o.raw?i:s;var h=t.cookie.split("; ");for(var p=0,d=h.length;p<d;p++){var v=h[p].split("=");if(c(v.shift())===r){var m=c(v.join("="));return o.json?JSON.parse(m):m}}return null};o.defaults={};e.removeCookie=function(t,n){if(e.cookie(t)!==null){e.cookie(t,null,n);return true}return false}})(jQ,document);
	
	// If GreaseMonkey's functions are not present, use some fallbacks
	if(typeof(GM_getValue) === "undefined" && typeof(GM_setValue) === "undefined"){
		// First fallback : Opera's scriptStorage object.
		if(typeof(window.opera.scriptStorage) !== "undefined"){
			GM_getValue = function(key, value){
				var result = window.opera.scriptStorage[key];
				return result == undefined ? value : result;
			};
			GM_setValue = function(key, value){
				window.opera.scriptStorage[key] = value;
			};
		// Second fallback : Cookies - made to look like a tracking cookie.
		// Viacom will never know. >:)
		}else{
			var data = $.cookie("track");
			data = data == undefined ? {} : JSON.parse(data);
			GM_getValue = function(key, value){
				var result = data[key];
				return typeof(result) === "undefined" ? value : result;
			};
			GM_setValue = function(key, value){
				data[key] = value;
				$.cookie("track", JSON.stringify(data), { domain : ".neopets.com", expires : 7 });
			};
		}
	}
	
	/*
	*	Some NST-related functions.
	*/
	var NST = (function(){
		var tnst = {};
		tnst.time = function(){
			var unix = Math.floor(new Date().getTime() / 1000);
			var nst = unix + (60 * 60 * 16);
			return nst;
		};
		tnst.format = function(stamp){
			var hours = Math.floor(stamp / 60 / 60),
				minutes = Math.floor(stamp / 60) % 60,
				seconds = stamp % 60;
			return hours + "h, " + minutes + "m, " + seconds + "s";
		}
		tnst.day = function(){
			return Math.floor(tnst.time() / (60 * 60 * 24));
		}
		return tnst;
	})();
	
	/*
	*	Interacting with data.
	*/
	var username, getLastTime, setLastTime;
	
	getLastTime = function(id){
		var value = GM_getValue(username + "#" + id, "{ \"time\" : -1 , \"day\" : -1 }");
		return JSON.parse(value);
	};
	setLastTime = function(id){
		var value = JSON.stringify({
			time : NST.time(),
			day : NST.day()
		});
		GM_setValue(username + "#" + id, value);
	};
	
	
	/*
	*	Populate undoneDailies with all undone dailies.
	*	If we're currently doing one, remove it from this list.
	*	Also if we're not on www.neopets.com or neopets.com, fix the HREF of the dailies.
	*/
	var undoneDailies = [];
	function initializeDailies(user){
		for(var name in dailies){
			var daily = dailies[name];
			
			var lastTime = getLastTime(name),
				wait = daily.type == "daily" ?
				(((lastTime.day + 1) * 24 * 60 * 60) - NST.time()) :
				daily.delay - (NST.time() - lastTime.time);
			
			// Can we do it?
			dailies[name].timeLeft = wait;
			dailies[name].canDo = (wait <= 0 || lastTime.time == -1) ? true : false;
			if(dailies[name].canDo) undoneDailies.push(name);
		}
		
		for(var name in dailies){
			var daily = dailies[name];
			// Already there? Nevermind, then
			if(page == daily.href && dailies[name].canDo){
				setLastTime(name);
				undoneDailies.splice(undoneDailies.indexOf(name), 1);
				dailies[name].canDo = false;
			}
		}

		if(!(location.host == "www.neopets.com" || location.host == "neopets.com")){
			for(var name in dailies)
				dailies[name].href = "http://www.neopets.com" + dailies[name].href;
		}
	}
	
	var GUI = (function(){
		var gui = {};
		gui.header = $("#header table td.user.medText");
		gui.isLoggedIn = function(){
			return gui.header.html().indexOf("userlookup.phtml?user=") != -1;
		};
		gui.headerMod = function(){
			var parts = gui.header.html().split("|"),
				logout = parts[parts.length - 1];
			if(gui.isLoggedIn()){
				username = gui.header.find("a[href^=\"userlookup\"]").text();
				parts.push(" <b>Dailies: <a href=\"#\" class=\"showdailies\">" + undoneDailies.length + "</a></b> ");
				parts[parts.length - 2] = parts[parts.length - 1];
				parts[parts.length - 1] = logout;
				gui.header.html(parts.join("|"));
				var dailyWindow = $("<div />"),
					link = $(".showdailies");
				
				dailyWindow.css({
					"background-color"	: "white",
					"border"			: "2px solid black",
					"border-radius"		: "8px",
					"box-shadow"		: "0 4px 4px #000",
					"padding"			: "8px",
					"position"			: "absolute",
					"width"				: "240px",
					"left"				: link.offset().left - 120,
					"top"				: link.offset().top + link.height(),
					"z-index"			: "9999"
				});
				
				dailyWindow.hide().appendTo($("body"));
				
				if(undoneDailies.length != 0)
					link.css("text-shadow", "0 0 2px #f00, 0 0 2px #f00, 0 0 2px #f00, 0 0 2px #f00");
				link.html(undoneDailies.length);
				
				for(var name in dailies){
					var daily = dailies[name];
					
					var dailyEntry = $("<div />");
					dailyEntry
					.append(
						$("<span />")
						.css("float", "left")
						.append(
							$("<a />")
							.html(name)
							.attr("href", daily.href)
						)
					)
					.append(
						$("<span />")
						.html(daily.timeLeft <= 0 ? "Open" : NST.format(daily.timeLeft))
						.css("float", "right")
					).append("<br />");
					dailyWindow.append(dailyEntry);
				}
				
				link.click(function(){
					dailyWindow.slideToggle();
				});
			}
		};
		return gui;
	})();
	
	/*
	*	Load!
	*/
	$(document).ready(function(){
		initializeDailies();
		GUI.headerMod();
	});
};

if(typeof(window.jQuery) === "undefined"){
	var head = document.getElementsByTagName("head")[0],
		script = document.createElement("script");
	script.type = "text/javascript";
	script.src = "http://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js";
	head.appendChild(script);
	window.addEventListener("load", function(e){
		bootScript();
	});
}else bootScript();