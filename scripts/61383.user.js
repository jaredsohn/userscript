// ==UserScript==
// @name    		Gaia - Time and Population
// @author  		Mindset (http://www.gaiaonline.com/p/mindset)
// @description 	Returns GST and Gaians Online to Gaia's header
// @include 		http://www.gaiaonline.com/*
// @include 		http://gaiaonline.com/*
// @require 		http://sizzlemctwizzle.com/updater.php?id=61383
// @require 		http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js
// ==/UserScript==

/* Newest version: Another major revamp -- using chat/gsi JSON to get the time/pop instead of AJAX. 
Also, now compatible with Google Chrome. 
v.2: small edit to improve speed in Firefox. */

/* To make this compatible with Chrome, a function that loads jQuery and calls a function when jQuery has
finished loading - from http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script */
function addJQuery(callback) 
{
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.5.1/jquery.min.js");
	script.addEventListener('load', function()
	{
		var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

/* the main function of this userscript */
function timepop()
{
	// add new css styles
	var style = document.createElement('style');
	style.setAttribute('type','text/css');
	style.innerHTML = "/* new CSS for the time/population bar */ \n\
		#gaia_header .hud { \n\
			background-position: -13px -28px !important; \n\
		} \n\
		#gaia_header .hud-stats { \n\
			height: 24px !important; \n\
		} \n\
		#gaia_header .hud-stats .hud-item { \n\
			line-height: 20px !important; \n\
			height: 20px !important; \n\
		} \n\
		#gaia_header .hud-stats .hud-group-spacer { \n\
			height: 17px !important; \n\
		} \n\
		#gaia_header .hud-timepop { \n\
			height: 20px; \n\
			background-repeat: no-repeat; \n\
			background-position: -13px -30px; \n\
			position: absolute; \n\
			top: 39px; \n\
			right: 0; \n\
			overflow: hidden; \n\
		} \n\
		#gaia_header .hud-timepop .hud-item-list { \n\
			margin-bottom: 4px; \n\
			padding-left: 12px; \n\
			padding-right: 6px; \n\
			height: 20px; \n\
		} \n\
		#gaia_header .hud-timepop .hud-item { \n\
			color: #FFF; \n\
			font-weight: bold; \n\
			font-size: 12px; \n\
			margin-left: 2px; \n\
			line-height: 16px !important; \n\
			height: 16px !important; \n\
		} \n\
		#gaia_header .hud-timepop .hud-group-spacer { \n\
			height: 16px !important; \n\
			margin-left: 8px !important; \n\
		} \n\
		#gaia_header .hud-sprite .trophy-icon { \n\
			background-image:url(http://oi51.tinypic.com/4nlw1.gif) !important; \n\
			background-position: 0px -1px !important; \n\
		} \n\
		#cta-refill, #cta-get_gaia_cash { top: 1px !important; } \n\
		/* for people using the mule tool */ \n\
		#gmSelectLogin { \n\
			height: 15px !important; \n\
			position: relative !important; \n\
			top: -1px !important; \n\
		} \n\
		";
	$("head").append(style);

	var timepoptxt = '<div style="display: none;"><div id="timepop" class="hud-timepop hud-sprite"><ul class="hud-item-list"><li class="hud-item" id="time"></li><li class="hud-item hud-spacer hud-group-spacer">&nbsp;</li><li class="hud-item" id="pop"></li></ul></div></div>';
	$("body").append(timepoptxt);
	
	// get the population
	$.getJSON("http://www.gaiaonline.com/chat/gsi/index.php?v=json&m=[[2100]]", function(json)
	{
		var add_commas = function(nStr) {
			nStr += '';
			x = nStr.split('.');
			x1 = x[0];
			x2 = x.length > 1 ? '.' + x[1] : '';
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(x1)) {
				x1 = x1.replace(rgx, '$1' + ',' + '$2');
			}
			return x1 + x2;
		};
		var gaians = add_commas(json[0][2]["total"]) + " Gaians Online";
		$("#pop").text(gaians);
	});

	// get the time 
	$.getJSON("http://www.gaiaonline.com/chat/gsi/index.php?v=json&m=[[341]]", function(json)
	{
		var gst = json[0][2][1] + " GST";
		$("#time").text(gst);
	});

	var stats = $("#gaia_header div.hud-stats");
	$("#timepop").insertAfter(stats);

	// make sure the timepop header bar doesn't look weird next to the others
	var statswidth = stats.width();
	if ( statswidth < 250 )
	{
		var spacer = (Math.round((250 - statswidth)/4)+8) + "px";
		stats.find("li.hud-group-spacer").css({"margin-left": spacer, "margin-right": spacer });
	}
	
}

/* load jQuery and execute the main function */
var header = document.getElementById("gaia_header");
if (header) // only add the time/population to pages with a header
{
	if (jQuery)
	{
		// jQuery is loaded
		timepop();
	}
	else
	{
		// jQuery is not loaded
		addJQuery(timepop);
	}
}
