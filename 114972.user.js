// ==UserScript==
// @name           Reddit Endless Scroll
// @namespace      xpsdeset
// @description    Keep's on showing reddit's when you reach the end of the page.
// @include        http://www.reddit.com/*
// ==/UserScript==


var str='\n\
function addScroll()\n\
{\n\
$("body").append("<p id=\\"loading\\" style=\\"display:none;position: fixed; bottom: 10px; font-size: large; background: none repeat scroll 0% 0% red;\\">Loading</p>");\n\
(function($){\n\
		$.fn.endlessScroll = function(options){\n\
		\n\
		var defaults = {\n\
			bottomPixels: 50,\n\
			fireOnce: true,\n\
			fireDelay: 150,\n\
			loader: "<br />Loading...<br />",\n\
			data: "",\n\
			insertAfter: "div:last",\n\
			resetCounter: function(){ return false; },\n\
			callback: function(){ return true; },\n\
			ceaseFire: function(){ return false; }\n\
		};\n\
		\n\
		var options = $.extend(defaults, options);\n\
		var firing       = true;\n\
		var fired        = false;\n\
		var fireSequence = 0;\n\
		if(options.ceaseFire.apply(this) === true)\n\
		{\n\
			firing = false;\n\
		}\n\
		\n\
		if (firing === true)\n\
		{\n\
			$(window).scroll(function(){\n\
				if ($(document).height() - $(window).height() <= $(window).scrollTop() + options.bottomPixels)\n\
				{\n\
					if ((options.fireOnce == false || (options.fireOnce == true && fired != true)))\n\
					{\n\
						if(options.resetCounter.apply(this) === true)\n\
						{\n\
							fireSequence = 0;\n\
						}\n\
						\n\
						fired = true;\n\
						fireSequence++;\n\
						$(options.insertAfter).after("<div id=\\"endless_scroll_loader\\">" + options.loader + "</div>");\n\
						if (typeof options.data == "function")\n\
						{\n\
							data = options.data.apply(this);\n\
						}\n\
						else\n\
						{\n\
							data = options.data;\n\
						}\n\
						if (data !== false)\n\
						{\n\
							$("div#endless_scroll_loader").remove();\n\
							$(options.insertAfter).after("<div id=\\"endless_scroll_data\\">" + data + "</div>");\n\
							$("div#endless_scroll_data").hide().fadeIn();\n\
							$("div#endless_scroll_data").removeAttr("id");\n\
							var args = new Array();\n\
							args[0] = fireSequence;\n\
							options.callback.apply(this, args);\n\
							if (options.fireDelay !== false || options.fireDelay !== 0)\n\
							{\n\
								\n\
								$("body").after("<div id=\\"endless_scroll_marker\\"></div>");\n\
								$("div#endless_scroll_marker").fadeTo(options.fireDelay, 1, function(){\n\
									$(this).remove();\n\
									fired = false;\n\
								});\n\
							}\n\
							else\n\
							{\n\
								fired = false;\n\
							}\n\
						}\n\
					}\n\
				}\n\
			});\n\
		}\n\
	};\n\
	})(jQuery);\n\
var working=true;\n\
$(document).endlessScroll({\n\
				bottomPixels: 450,\n\
				fireDelay: 10,\n\
				callback: function(p){\n\
			$("#loading").show();\n\
if(working)\n\
{working=false;			\n\
$.get($("p.nextprev a[rel$=next]")[0].href,\n\
function(data)\n\
{$("[id=siteTable]:last").append($(data).find("[id=siteTable]:last").html());\n\
$("p.nextprev a[rel$=next]")[0].href=$(data).find("p.nextprev a[rel$=next]")[0].href;\n\
working=true;$("#loading").hide();\n\
});\n\
}}\n\
			});\n\
}\n\
if($("p.nextprev a[rel$=next]").length>0)\n\
addScroll();';  
  
 var head= document.body;
 var script= document.createElement('script');
 script.type= 'text/javascript';
 script.text= str;
 head.appendChild(script);



