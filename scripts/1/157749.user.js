//  __  __                            _    _ _____ 
// |  \/  |                          | |  | |_   _|
// | \  / | __ _ _ __ _ __ ___   ___ | |  | | | |  
// | |\/| |/ _` | '__| '_ ` _ \ / _ \| |  | | | |  
// | |  | | (_| | |  | | | | | | (_) | |__| |_| |_ 
// |_|  |_|\__,_|_|  |_| |_| |_|\___/ \____/|_____|
//
// Created by Shida Li and Erica Xu
//
// Installation procedures:
// Chrome:
// 		Go to Wrench-Menu -> Tools -> Extensions
// 		Drag and drop "marmo-ui.user.js" into the extensions page
// 		Click on "Add" button
// Firefox:
// 		Download GreaseMonkey from 
// 		https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
// 		Drag and drop "marmo-ui.user.js" into the browser
// 		Alternatively, open the js from userscript.org
// 		Wait and click on "Install" button
//
// ==UserScript==
// @name				MarmoUI
// @description			Marmoset Improved! Better UI and functionality
// @author				Erica Xu (www.ericaxu.com) and Shida Li (www.lishid.com)
// @version				1.3.1
// @include				https://marmoset.student.cs.uwaterloo.ca*
// ==/UserScript==
//
// Some functionalities are inspired by Marmoset Plus from http://userscripts.org/scripts/show/134262
//


//Variables here are volatile. They are not usable from within the page, but only within this script
var global_css = "body,h1,h2,h3{font-family:'Droid Sans',helvetica,arial,sans-serif}body{color:#eee;background:#022d49;margin:0}h1,h2,h3{margin:1em 0 .5em 0;font-weight:normal}h1{font-size:1.7em}h2{font-size:1.5em}h3{font-size:1.3em;color:#eee}.wrapper{margin:1em 7.5%}a:link{color:#fc3;-webkit-transition:all .3s ease-in-out;-moz-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out}a:visited{color:#3e90c6}a:hover{color:#ff8700}div.header{background:#022d49;padding:4em 0 3em 0;margin:0;color:white;border:0}div.header p{text-align:center;font:4em 'Lobster',helvetica,sans-serif;padding:.3em;margin:0}div.breadcrumb{background:inherit;margin:0;padding:0}div.breadcrumb p{background:inherit;font-family:'Droid Sans',helvetica,arial,sans-serif;font-variant:normal;width:80%;margin:0 6% 0 0;padding:.5em 0 0 0}div.logout,div.submit-button{background:#fc3;font-family:'Droid Sans',helvetica,arial,sans-serif;color:#03426a;width:7em;padding:.1em .5em;margin:0;text-align:center;font-weight:normal;-moz-border-radius:50px;-webkit-border-radius:50px;border-radius:50px;-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity = 91);filter:alpha(opacity = 91);-webkit-transition:all .3s ease-in-out;-moz-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out;cursor:pointer}div.logout p,div.submit-button p{font-size:1.5em;font-variant:normal;padding:0;margin:.1em auto}div.logout:hover,div.submit-button:hover{background:#eee;color:#03426a}div.logout a{font-family:inherit!important;text-decoration:none!important;color:#03426a!important}div.submit-button a,div.logout a{font-family:inherit;text-decoration:none;color:#111;font-weight:normal;text-align:center;display:block;padding:.2em .5em;margin:-.2em -.5em}div.breadcrumb p.nav{font-family:'Droid Sans',helvetica,arial,sans-serif;font-size:1.5em;font-variant:normal;font-weight:normal;display:inline-block;padding:0;margin:0}div.breadcrumb p a:link,div.breadcrumb p a:visited{color:#fc3;text-decoration:underline}div.breadcrumb p a:hover{color:#ff8700}div.footer{border-top:0;text-align:center;padding:.5em;margin:1em}div.footer a:visited{color:#fc3}div.footer a:hover{color:#ff8700}.notifier-update{background:#fc3;text-align:center}.notifier-text{line-height:3em;display:block}.notifier-update a,.notifier-update a:visited{color:#022d49;font-weight:bold}.notifier-close{position:absolute;top:0;right:.5em;font-size:2.0em;color:#000;text-decoration:none}ul.my-courses,ul.all-courses{list-style:none;font-size:1.1em}ul.my-courses li,ul.all-courses li{margin:.3em 0}ul.release-tokens{list-style:none}table{border-style:ridge;border:0;border-collapse:collapse;width:100%;margin:2em 0 0 0;font-size:1em}form[name='submitform']{background:#fc3;color:#111;width:45%;margin:2em auto 0 auto;padding:.5em;-webkit-border-radius:1em;-moz-border-radius:1em;border-radius:1em;font-size:1.2em;text-align:center}form[name='submitform'] p{text-align:center;font-weight:bold}form[name='submitform'] input[type='submit']{color:#eee;background:#022d49;height:2em;width:6em;-webkit-border-radius:1em;-moz-border-radius:1em;border-radius:1em;border:0;cursor:pointer;-webkit-transition:all .3s ease-in-out;-moz-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out}form[name='submitform'] input[type='submit']:hover{background:#25a0ca}div.submission-bg{background:#fff;opacity:.7;position:fixed;width:100%;height:100%;top:0;left:0}div.submission-wrapper{display:table;position:fixed;width:100%;height:100%;top:0;left:0}div.submission-cell{display:table-cell;vertical-align:middle}div.submission-popup{background-color:#fc3;color:#111;display:block;border:0;text-align:left;padding:1.5em;z-index:9999;width:50%;margin:0 25%}div.submission-popup a:link,div.submission-popup a:visited{color:#022d49}div.submission-popup h2{text-align:center}div.submission-popup h2,div.submission-popup p{color:#111;margin:.5em 0 1em 0}div.submission-popup form{margin:1em auto}a#submission-close{margin:0;right:24%;position:absolute;color:#111;text-decoration:underline}div.submission-popup div.submit-button{margin:.5em auto;background:#c1dbed}div.submission-popup div.submit-button a:link{color:#fc3;text-decoration:none}div.submission-popup div.submit-button p{margin:.1em auto}div.submission-popup div.submit-button:hover{background:#eee}table a:link{color:#03426a;font-weight:bold}table a:visited{color:#03426a}table a:hover{color:#ff8700}th{background:#2c6b94;color:#eee;font-size:1.1em;font-weight:normal;text-transform:capitalize!important;text-align:center;vertical-align:center;padding:1em .5em;border:0;margin:0}td{text-align:center;vertical-align:middle;padding:.5em;margin:0;border:0}td a{display:block}th.description,td.description{text-align:center}td.left{text-align:left}td.long-result{text-align:left}th.number,td.number{text-align:right}col.right{border-right:0 solid black}div.build-output{margin:1em 7.5%;width:85%;background:#ffe799;color:#111;overflow-x:scroll}div.build-output pre{padding:1em 2em;letter-spacing:1px;font-family:monospace;white-space:pre;letter-spacing:1px}form{padding:0;margin:0}table.stacktrace td{padding-left:3em}input[type='file'],input[type='submit'],input[type='hidden']{font-family:'Droid Sans',helvetica,arial,sans-serif!important;font-size:1em}table.form td{padding:.25em;text-align:left}table.form td.label{font-weight:bold;text-align:right;background:#fff9e5;padding-left:3em;padding-right:.5em}table.form tr.submit td{background:#fc3;text-align:center}tr{color:#111;-webkit-transition:all .3s ease-in-out;-moz-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out}table tr:hover{background:#9ac5e1}tr.r0{background:#f5fbff}tr.r1{background:#e4f4fe}tr.selected,tr.selected:hover{background:#fc3}tr.highlight{background:#00ffaf}td.passed{background:#5fbf5f}td.failed{background:#9f3f3f}td.error{background:#c00}td.huh{background:#fc3}td.timeout{background:#f0f}td.not_implemented{background:#fff}td.could_not_run{background:#808080}td.warning{background:#0000df}table.codetable{border-style:none;border-width:0;border-collapse:collapse;margin:0}table.codetable td{text-align:left;vertical-align:baseline;padding:0;border:0;margin:0}table.codetable td.codecoveredcount{text-align:right;background:#abcabd;vertical-align:baseline;padding:0 2px;border:0;margin:0}table.codetable td.codeuncoveredcount{text-align:right;background:#f0c8c8;vertical-align:baseline;padding:0 2px;border:0;margin:0}table.codetable td.codeuncovered{text-align:left;background:#f0c8c8;vertical-align:baseline;padding:0 2px;border:0;margin:0}table.codetable td.linenumber{text-align:right;background:#fff;vertical-align:baseline;padding:0 2px;border:0;margin:0}.codehighlight{background:#fff3cc}.codekeyword{color:green;font-weight:bold}.codestring{color:fuchsia}.codeliteral{color:fuchsia}.codecomment{color:blue;font-style:italic}.statusmessage{border:1px solid #cedff2;background-color:#f5faff;color:#039;padding:7px}";
//var global_fonts = "WebFontConfig = { google: { families: ['Droid+Sans::latin', 'Lobster::latin'] } };";

function loadMarmoUI(run)
{
	//Utility functions
	function getProtocol()
	{
		return "https:" == document.location.protocol ? "https" : "http";
	}

	function appendToHead(element)
	{
		document.getElementsByTagName("head")[0].appendChild(element);
	}

	function loadCSS()
	{
		var style = document.createElement("style");
		style.type = "text/css";
		if (style.styleSheet) style.styleSheet.cssText = global_css;
		else style.appendChild(document.createTextNode(global_css));
		appendToHead(style);
	}

	//Import fonts from google. Provided by Google Web Fonts
	/*
	function loadFonts()
	{
		//Create a script to pass data to Google's script
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.textContent = global_fonts;
		appendToHead(script);
		
		//Load the Google's script asynchronously
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = getProtocol() + "://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js";
		script.async = "true";
		appendToHead(script);
	}*/

	//Load jQuery from Google CDN
	function loadJQuery(run)
	{
		//Don't load twice
		if(typeof jquery != 'undefined' && jQuery)
		{
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.textContent = "(" + run.toString() + ")()";
			document.body.appendChild(script);
			return;
		}
		//Load jQuery
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src = getProtocol() + "://ajax.googleapis.com/ajax/libs/jquery/1.9.0/jquery.min.js";
		script.addEventListener("load", function ()
		{
			var script = document.createElement("script");
			script.type = "text/javascript";
			script.textContent = "(" + run.toString() + ")()";
			document.body.appendChild(script);
		}, false);
		appendToHead(script);
	}

	//loadFonts(); - We'll use our embedded fonts for better speeds
	loadCSS();
	loadJQuery(run);
}

function runMarmoUI()
{
	//Script-wise global variables that we can use here
	var reload_time = 5; // Time to wait until reload, in seconds
	var update_location = "https://raw.github.com/lishd/MarmoUI/master/updater.css"; //latest version inside a CSS
	var update_download = "http://userscripts.org/scripts/source/157749.user.js"; //Download page
	var current_version = "marmo_ui_1_3_1"; //Current version to check updates
	//Embedded data in base64 form
	var EMBED_DATA =
	{
		Favicon : "data:image/x-icon;base64,AAABAAEAEBAAAAAAAABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAzzP9TM8z/gTPM/4EzzP/JM8z//zPM//8zzP/JM8z/gTPM/4EzzP9TAAAAAAAAAAAAAAAAAAAAAAAAAAAzzP9TM8z/qTPM//8zzP//M8z//zPM//8zzP//M8z//zPM//8zzP//M8z/qTPM/1MAAAAAAAAAAAAAAAAzzP9TM8z//zPM//8zzP//M8z//zPM//8zzP//M8z//zPM//8zzP//Q1VB/0ktAv9DVUH/M8z/UwAAAAAzzP9TM8z/qT58gP9JLQL/M8z//zPM//8+fID/SS0C/zPM//8zzP//Q1VB/0ktAv8+fID/SS0C/0NVQf8zzP9TM8z/gTPM//9JLQL/SS0C/zPM//8zzP//SS0C/0ktAv8zzP//M8z//0ktAv9JLQL/M8z//zPM//8+fID/M8z/gTPM/4EzzP//SS0C/0ktAv8zzP//M8z//0ktAv9JLQL/M8z//zPM//9JLQL/SS0C/zPM//8zzP//OKTA/zPM/8kzzP/JM8z//0ktAv9JLQL/M8z//zPM//9JLQL/SS0C/zPM//8zzP//SS0C/0ktAv8zzP//M8z//zPM//8zzP/JM8z//zPM//9JLQL/SS0C/zPM//8zzP//SS0C/0ktAv8zzP//M8z//0ktAv9JLQL/M8z//zPM//8zzP//M8z//zPM//8zzP//SS0C/0ktAv8zzP//M8z//0ktAv9JLQL/M8z//zPM//9JLQL/SS0C/zPM//8zzP//M8z//zPM//8zzP/JM8z//0ktAv9JLQL/M8z//zPM//9JLQL/SS0C/zPM//8zzP//SS0C/0ktAv8zzP//M6r//zPM//8zzP/JM8z/gUNVQf9JLQL/SS0C/z58gP84pMD/SS0C/0ktAv8+fID/OKTA/0ktAv9JLQL/M8z//zOF//8zzP//M8z/yTPM/4E+fID/SS0C/z58gP9DVUH/SS0C/0ktAv8+fID/Q1VB/0NVQf9JLQL/PnyA/zPM//8tLeD/M8z//zPM/4EzzP9TM8z/qTPM/9czzP//M8z//zPM//8zzP//M8z//zPM//8zzP//M8z//zPM//8zzP//LS3g/zPM/4EzzP+BAAAAADPM/1MzzP+0M8z//zPM//8zzP//M8z//zPM//8zzP//M6r//zOF//8tLeD/LS3g/y0t4P8tLeD/LS3g/wAAAAAAAAAAM8z/UzPM/6kzzP//M8z//zPM//8zzP//M8z//zPM//8zzP//M8z//zPM/4EtLeD/AAAAAAAAAAAAAAAAAAAAAAAAAAAzzP9TM8z/gTPM/4EzzP/JM8z//zPM//8zzP/JM8z/gTPM/4EzzP+BLS3g/wAAAAAAAAAA8A8AAOAHAADAAwAAgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAMAAAADgAwAA8AMAAA==",
		Font_DroidSans : "data:application/x-font-woff;base64,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",
		Font_Lobster : "data:application/x-font-woff;base64,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",
		Loading : "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==",
	};

	//Colors
	var red_tint = [255, 0, 0];
	var green_tint = [175, 255, 30];

	//Utilities
	var PAGE =
	{
		LOGIN: 				{value: 0, link: "marmoset"},
		COURSE_LIST: 		{value: 1, link: "view/index.jsp"},
		PROBLEM_LIST: 		{value: 2, link: "view/course.jsp?coursePK="},
		SUBMISSION_LIST: 	{value: 3, link: "view/project.jsp?projectPK="},
		SUBMISSION_DETAILS: {value: 4, link: "view/submission.jsp?submissionPK="},
		SUBMISSION_PAGE: 	{value: 5, link: "view/submitProject.jsp?projectPK="},
		CONFIRM_RELEASE:	{value: 6, link: "view/confirmReleaseRequest.jsp?submissionPK="},
		ERROR: 				{value: 7, link: "action/SubmitProjectViaWeb"},
		LOGIN_ERROR:		{value: 8, link: "authenticate/PerformLogin"}
	};

	//Add a jquery highlight function
	//Arguments: color, finalColor, finalOpacity
	jQuery.fn.highlight = function()
	{
		//Format a color and opacity into an rgba string to be used for CSS coloring
		function formatRgba(color, opacity)
		{
			return "rgba(" + color[0] + "," + color[1] + "," + color[2] + "," + opacity + ")"
		}

		var color = arguments[0] || [255, 255, 153];
		var finalColor = arguments[1] || false;
		var opacity = arguments[2] || 1;
		$(this).each(function()
		{
			var element = $(this);
			var steps = 75;
			var step = 0;
			var power = 4;
			//Clear the previous highlight if possible
			if (element.highlight) window.clearInterval(element.highlight);
			//Create a repeating task
			element.highlight = window.setInterval(function()
			{
				if(step < steps)
				{
					//Set the backgroundColor's alpha from 1 to 0
					var newOpacity = Math.pow(1 - (step / steps), power);
					//Optimization: Don't care about the small amount left, just skip the rest of the animation
					if(newOpacity < 0.05) step = steps;
					element.css("backgroundColor", formatRgba(color, newOpacity));
				}
				//Fade in to finalColor
				else if(step < steps * 2 && finalColor)
				{
					//Set the backgroundColor's alpha from 0 to opacity
					element.css("backgroundColor", formatRgba(finalColor, Math.pow(step / steps - 1, 1 / power) * opacity));
				}
				//Finished, clear color and quit
				else
				{
					if(!finalColor) element.css("backgroundColor", "");
					else element.css("backgroundColor", formatRgba(finalColor, opacity));
					window.clearInterval(element.highlight);
					delete element.highlight;
				}
				step++;
			}, 20);
		});
	};

	//Add a jquery sort function
	jQuery.fn.sortElements = (function ()
	{
		var sort = [].sort;
		return function (comparator, getSortable)
		{
			getSortable = getSortable || function (){ return this; };
			var placements = this.map(function ()
			{
				var sortElement = getSortable.call(this),
					parentNode = sortElement.parentNode,
					// Since the element itself will change position, we have
					// to have some way of storing it's original position in
					// the DOM. The easiest way is to have a 'flag' node:
					nextSibling = parentNode.insertBefore(document.createTextNode(''), sortElement.nextSibling);
				return function ()
				{
					// Insert before flag:
					parentNode.insertBefore(this, nextSibling);
					// Remove flag:
					parentNode.removeChild(nextSibling);
				};
			});

			return sort.call(this, comparator).each(function (i)
			{
				placements[i].call(getSortable.call(this));
			});
		};
	})();

	function addTableHighlight()
	{
		//Add highlight to table rows
		$("table tr").click(function ()
		{
			$(this).siblings().removeClass("selected");
			$(this).addClass("selected");
		});
	}

	function addTableSorting()
	{
		//Add some CSS for the arrows to be shown - This will add the up arrow and down arrow
		$("head").append($("<style type='text/css'></style>").html(".sort_asc:after{content:' \\2191';}.sort_desc:after{content:' \\2193';}"));
		//The actual sorting using sortElements
		var table = $("table");
		$("table tr th").css("cursor", "pointer").attr("title", "Sort by this column").wrapInner("<span />").each(function()
		{
			var th = $(this);
			var thIndex = th.index();
			var inverse = false;
			th.click(function()
			{
				th.siblings().find("span").removeClass("sort_asc").removeClass("sort_desc");
				th.find("span").removeClass("sort_asc").removeClass("sort_desc").addClass(inverse?"sort_desc":"sort_asc");
				table.find("td")
				.filter(function(){ return $(this).index() === thIndex; })
				.sortElements(function(a, b)
				{
					if($.text([a]) == $.text([b]))
						return 0;
					return ($.text([a]) > $.text([b])) ? (inverse ? -1 : 1) : (inverse ? 1 : -1);
				}, function()
				{
					return this.parentNode; //The tr is what we want to move
				});
				inverse = !inverse;
			});
		});
	}

	function parseMarmosetDate(date)
	{
		return Date.parse((new Date()).getFullYear() + " " + date.split(",")[1].match(/[a-zA-Z0-9 \:]+/)[0].trim().replace(" at ", " "));
	}

	//Trims the .text() of all jquery elements
	function trimInner(elements)
	{
		elements.each(function(index, value){$(value).text($.trim($(value).text()));});
	}

	//Apply a tint to elements if all test scores in text matches
	function applyTintIfEqual(elements, text)
	{
		//Only highlight if text says "?"
		if(text.trim() == "?")
		{
			elements.highlight();
			return;
		}

		//Red if it says did not compile , failed or error
		if(text.indexOf("not compile") != -1 || text.indexOf("failed") != -1 || text.indexOf("error") != -1)
		{
			elements.highlight(false, red_tint, 0.25);
			return;
		}

		//Green if it says passed
		if(text.indexOf("passed") != -1)
		{
			elements.highlight(false, green_tint, 0.35);
			return;
		}

		//Match all 0/0 formats
		var matches = text.match(/(\d+)\s\/\s(\d+)/g);
		if(matches != null)
		{
			var matched = true;
			//Check if any of them are not full scores
			for(var i = 0; i < matches.length; i++)
			{
				var match = matches[i].match(/(\d+)\s\/\s(\d+)/);
				if(match[1] != match[2])
				{
					matched = false;
				}
			}

			//Apply tint accordingly
			if(matched)
			{
				elements.highlight(false, green_tint, 0.35);
			}
			else
			{
				elements.highlight(false, red_tint, 0.25);
			}
		}
	}

	//Load a page asynchronously and call "callback" when done
	function asyncLoadPage(element, requestURL, callback, retry)
	{
		if(retry < 0) retry = 10;
		if(retry == 0)
		{
			element.html("Failed to load");
			return;
		}
		$.ajax({ url: requestURL, cache: false })
		//Done then callback
		.done(function(html)
		{
			callback(element, html, requestURL);
		})
		//Failed then retry
		.fail(function()
		{
			window.setTimeout(function() 
			{
				asyncLoadPage(element, requestURL, callback, retry - 1);
			}, 1000);
			element.highlight();
		});
	}

	//Queue an asynchronous reload, should contain a <span class='update'></span> for updating the countdown
	function queueAsyncReload(element, requestURL, callback, countdown)
	{
		element.find(".update").html(countdown);
		if(countdown == 0)
		{
			asyncLoadPage(element, requestURL, callback, -1);
		}
		else
		{
			window.setTimeout(function() 
			{
				queueAsyncReload(element, requestURL, callback, countdown - 1);
			}, 1000);
		}
	}

	function addSubmissionBox()
	{
		//Add the submission box
		$("body").append("<div id='submission-box'><div class='submission-bg'></div><div class='submission-wrapper'><div class='submission-cell'><div class='submission-popup'></div></div></div></div>");
		$("#submission-box").hide();
		//Event for closing the submission popup
		$(".submission-popup").click(function(event){ event.stopPropagation(); });
		$(".submission-wrapper").click(function(event){ $("#submission-box").hide(); });
		//Hook the escape key
		$(document).keydown(function(e){ if(e.keyCode == 27){ $("#submission-box").hide(); }});

		//Add an iframe for submitting the solution to, this will make sure the page doesn't get redirected
		$("body").append("<iframe id='sumbission-loader' name='sumbission-loader' style='display:none;'></iframe>");
		$("#sumbission-loader").load(function(){ if($("#sumbission-loader")[0].contentWindow.location.href.indexOf("blank") === -1) document.location.reload(true); });
	}

	function applyChangesAll(current_page)
	{
		//Load some nice fonts
		$("head").append($("<style></style>").attr("type", "text/css").html("@font-face{font-family:'Droid Sans';font-style:normal;font-weight:400;src:local('Droid Sans'),local('DroidSans'),url(" + EMBED_DATA.Font_DroidSans + ") format('woff')}@font-face{font-family:'Lobster';font-style:normal;font-weight:400;src:local('Lobster'),url(" + EMBED_DATA.Font_Lobster + ") format('woff')}"));

		//Add the loading image
		$("head").append($("<style></style>").attr("type", "text/css").html(".loading{background:url(" + EMBED_DATA.Loading + ") no-repeat center;}"));

		//Wrap contents inside a wrapper for centering
		$("body").wrapInner("<div class='wrapper'></div>");

		//Change page (browser) title
		document.title = "MarmoUI - " + document.title;
		//Change page title
		$("p:contains('Marmoset Submission and Testing Server')").html("Marmoset");

		//Add the favicon
		$("head").append("<link href='" + EMBED_DATA.Favicon + "' rel='icon' type='image/x-icon'>");

		//Add navigation CSS
		var nav = $("div.breadcrumb p:not(:contains('Logout'))").addClass("nav");
		//Trim all links since some of them has spaces at the end
		trimInner(nav.find("a"));
		var navText = nav.html();
		if(typeof navText != "undefined" && current_page != PAGE.LOGIN.value)
		{
			//Remove the ugly greeting if applicable
			navText = navText.substring(navText.indexOf(":") + 1);
			//Add in a link to go to the homepage
			navText = "<a href='/'>Marmoset</a> | " + navText;
			//Change the breadcrumb separator
			navText = navText.replace(/\|/g, "&rsaquo;");
			nav.html(navText);
		}

		//Capitalize the table header for consistency
		$("th").css("text-transform", "capitalize");

		//Remove inconsistent (and useless) greeting message
		$("p:contains('Welcome')").remove();

		//Remove current time and replace by an actual footer
		$(".footer").html("MarmoUI - Created by <a href='http://www.lishid.com' target='_blank'>Shida Li</a> and <a href='http://www.ericaxu.com' target='_blank'>Erica Xu</a>.");

		//Redirect logout to the homepage since logout doesn't actually logs you out
		$("div.logout a").attr("href", "/");

		//Fix tables not having a proper <p> tag
		$("table").each(function(index, value)
		{
			if(typeof value.parentNode === "undefined" || value.parentNode.nodeName != "P")
				$(value).wrap("<p></p>");
		});

		//Load the updater - This will only show if the updater loads and is of a different version
		$("head").append("<link href='" + update_location + "' type='text/css' rel='stylesheet'/>");
		$("body").prepend("<div style='display:none;' class='notifier-update'>" +
			"<a class='notifier-text' href='" + update_download + "' target='_blank'>Update available: <span class='notifier-text-inner'></span></a>" +
			"<a class='notifier-close' href='#' onclick='$(\".notifier-update\").fadeOut().queue(function(){$(this).remove();}); return false;'>x</a></div>");
		$("body").addClass(current_version);

		//Google analytics helps for statistics
		$("body").append("<script type='text/javascript'>var _gaq = _gaq || []; _gaq.push(['_setAccount', 'UA-38018139-1']); _gaq.push(['_trackPageview']);(function() { var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true; ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';	var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s); })();</script>");
	}

	function applyChangesProblemsList()
	{
		//When async callbacks, decrypt the result from the page and integrate into the page
		function loadSubmission(tableCell, requestResult, requestURL)
		{
			//Highlight the cell since we just updated it
			tableCell.highlight();
			//Get the page from the request
			var page = $(requestResult.trim());
			//Get the first line of submission
			var firstLine = page.find("tr:eq(1)");
			//No submission yet
			if(firstLine.length == 0)
			{
				tableCell.html("No submission");
				return;
			}

			//Find Link to the first submission and put an anchor linking to it
			var link = firstLine.find("a:contains('view')").attr("href");
			if(typeof link == "undefined" || !link) link = requestURL;
			tableCell.html("<a href='" + link + "'></a>");

			//Check if latest solution is untested
			//If untested, show it as untested and queue an async reload
			if(firstLine.find("td:contains('tested yet')").length > 0)
			{
				tableCell.find("a").html("Not tested (reload in <span class='update'></span> s)");
				queueAsyncReload(tableCell, requestURL, loadSubmission, reload_time);
			}
			//Check if latest solution failed to compile
			//If failed to compile, show it as uncompiled and exits
			else if(firstLine.find("td:contains('not compile')").length > 0)
			{
				tableCell.find("a").html("Compilation failed");
				tableCell.highlight(false, red_tint, 0.25);
				return;
			}
			else
			{
				//Get the scores
				var scores = firstLine.find("td:contains('/')");
				var anchor = tableCell.find("a");
				//Should match Public test and Release test
				scores.each(function(index, item)
				{
					//Match all int/int
					var matches = $(item).html().match(/(\d+)\s\/\s(\d+)/);
					//Put an & sign in between
					if(anchor.html() != "") anchor.append(" & ");
					anchor.append(matches[0]);
				});
				applyTintIfEqual(tableCell, anchor.html());
			}
		}

		function loadTokensFromSubmission(tableCell, requestResult, requestURL)
		{
			//Get the page from the request
			var page = $(requestResult.trim());
			//Get the first line of submission
			var firstLine = page.find("tr:not(:contains('not compile')):eq(1)");
			//No submission yet
			if(firstLine.length == 0)
			{
				tableCell.html("3");
			}
			else
			{
				//Find Link to the first submission and put an anchor linking to it
				var link = firstLine.find("a:contains('view')").attr("href");
				//async load the latest submission to find the tokens
				asyncLoadPage(tableCell, link, loadTokens, -1);
			}
		}

		//When async callbacks, decrypt the result from the page and integrate into the page
		function loadTokens(tableCell, requestResult, requestURL)
		{
			//Highlight the cell since we just updated it
			tableCell.highlight();
			try
			{
				//Grab the token from the page
				var tokens = requestResult.match(/You currently have \d+ release/)[0].match(/\d+/)[0];
				var tokenText = tokens;
				//Find the next release token availability
				if(tokens < 3)
				{
					//First release token
					var tokens = requestResult.match(/\<li\>[a-zA-Z0-9 ,\:]+\<br\>/g);
					var tmp = tokens[tokens.length - 1];
					//Calculate time difference
					var nextToken = parseMarmosetDate(tmp) - Date.now();
					//Add in the text for the next token time
					tokenText += " (renew in " + Math.floor(nextToken / 3600000) + "h " + Math.floor((nextToken % 3600000) / 60000) + "m)";
				}
				//Show the tokens
				tableCell.html(tokenText);
			}
			catch(error)
			{
				//Set to 3 tokens if we can't find the token string
				tableCell.html("3");
			}
		}

		//Remove useless breadcrumb
		$("h1").remove();
		//Remove "Projects"
		$("h2").remove();

		//Change submit button
		$("input[type='submit']").attr("value", "Submit");

		//Change "web <br> submission" to something better
		$("th:contains('web')").html("Submit Solution");

		//Add the submission column
		$("tr th:nth-child(2)").after("<th>Last submission</th>");
		$("tr td:nth-child(2)").after("<td><div class='loading'>&nbsp;</div></td>");

		//Add the tokens column
		$("tr th:nth-child(3)").after("<th>Tokens</th>");
		$("tr td:nth-child(3)").after("<td><div class='loading'>&nbsp;</div></td>");

		//Load the tokens and submission results asychronously via ajax
		$("tr").each(function(index, row)
		{
			if(index == 0) return;
			var link = $(row).find("a:contains('view')").attr("href");

			//Optimize this, only open the page once so that we don't waste mroe time and resources to load the page twice
			asyncLoadPage($(row), link, function(row, requestResult, requestURL)
			{
				loadSubmission(row.find("td:eq(2)"), requestResult, requestURL);
				loadTokensFromSubmission(row.find("td:eq(3)"), requestResult, requestURL);
			}, -1);

			//asyncLoadPage($(row).find("td:eq(2)"), link, loadSubmission, -1);
			//asyncLoadPage($(row).find("td:eq(3)"), link, loadTokensFromSubmission, -1);
		});

		//Add a submission popup and an Iframe for submitting
		addSubmissionBox();
		//Add the click events for the submission popups
		var submit = $("a:contains('submit')").click(function(event)
		{
			//Prevent redirection
			event.preventDefault();
			//Prevent closing
			event.stopPropagation();
			//The table row
			var row = $(this.parentNode.parentNode);
			//The project PK number
			var projectPK = $(this).attr("href").match("projectPK=([0-9]+)")[1];
			//Reset popup html
			var popup = $(".submission-popup").html("");
			//Add Close, Project, Submissions and Deadline
			popup.append("<a id='submission-close' href='#' onclick='$(\"#submission-box\").hide();return false;'>Close</a>");
			popup.append("<h2>Project: " + row.find("td:eq(0)").html() + " (" + row.find("td:eq(6)").html() + ")</h2>");
			popup.append("<p>Submissions: <a href='" + row.find("td:eq(1) a").attr("href") + "'>view</a></p>");
			popup.append("<p>Due: " + row.find("td:eq(5)").html() + "</p>");
			//Add the submission form
			popup.append("<form target='sumbission-loader' enctype='multipart/form-data' action='/action/SubmitProjectViaWeb' method='POST'>" +
			"<input type='hidden' name='projectPK' value='" + projectPK + "'>" +
			"<input type='hidden' name='submitClientTool' value='web'>" +
			"<input type='file' name='file' size='20'></form>" + 
			"<div class='submit-button'><p><a onclick='$(\"form\").submit();'>Submit</a></p></div>");

			//Fix the anchor having an extra space at the end
			trimInner($("h2 a"));
			//Show the popup box
			$("#submission-box").show();
		});

		//Add highlight to table rows
		addTableHighlight();
		//Add sorting to table
		addTableSorting();
	}

	function applyChangesSubmissionList()
	{
		//When async callbacks, refresh the page if can't find "not tested yet"
		function checkReload(tableCell, requestResult, requestURL)
		{
			//Highlight the cell since we just updated it
			tableCell.highlight();

			//Get the page from the request
			var page = $(requestResult.trim());
			//Get the first line of submission
			var linesWithUntested = page.find("tr:contains('tested yet')");

			//Retry async load since there's still untested stuff
			if(linesWithUntested.length > 0 || requestResult == "")
			{
				tableCell.html("Not tested (reload in <span class='update'></span> s)");
				queueAsyncReload(tableCell, requestURL, checkReload, reload_time);
			}
			else
			{
				//No more untested solutions, reload to see results
				document.location.reload(true);
			}
		}

		//Add CSS class
		$("table").addClass("submissions");
		//Change the submit link to a button
		var submitLink = $("h3").eq(0).html();
		$("h3").eq(0).replaceWith("<div class='submit-button'><p>" + submitLink + "</p></div>");
		
		//Remove useless header for project. It's already in breadcrumb anyways
		$("h1").remove();
		//Remove "Submissions"
		$("h2").remove();
		//Change "detailed <br> test results" to something shorter
		$("th:contains('detailed')").html("Details");

		//Highlight passed and failed test cases
		$("tr").each(function(index, row)
		{
			var cell = $(row).find("td").eq(2);
			if(cell.length == 0) return;

			//If uncompiled, then we want to make it into 2 cells instead of 3
			if(cell.html().indexOf("not compile") != -1 && cell.attr("colspan") > 1)
			{
				cell.attr("colspan", "2").after("<td></td>");
			}
			applyTintIfEqual(cell, cell.html());

			cell = $(row).find("td").eq(3);
			if(cell.length == 0) return;
			applyTintIfEqual(cell, cell.html());
		});

		//Check if there are any untested submissions
		$("td:contains('tested yet')").each(function(index, cell)
		{
			checkReload($(cell), "", window.location);
		});

		//Add a submission popup and an Iframe for submitting
		addSubmissionBox();

		//Add the click events for the submission popups
		var submit = $("a:contains('Submit')").click(function(event)
		{
			//Prevent redirection
			event.preventDefault();
			//Prevent closing
			event.stopPropagation();
			//The project PK number
			var projectPK = $(this).attr("href").match("projectPK=([0-9]+)")[1];
			//Reset popup html
			var popup = $(".submission-popup").html("");
			//Add Close, Project, Submissions and Deadline
			popup.append("<a id='submission-close' href='#' onclick='$(\"#submission-box\").hide();return false;'>Close</a>");
			popup.append("<p>Due: " + $("p:contains('Deadline')").html().replace("<b>Deadline:</b>", "").trim() + "</p>");
			//Add the submission form
			popup.append("<form target='sumbission-loader' enctype='multipart/form-data' action='/action/SubmitProjectViaWeb' method='POST'>" +
			"<input type='hidden' name='projectPK' value='" + projectPK + "'>" +
			"<input type='hidden' name='submitClientTool' value='web'>" +
			"<input type='file' name='file' size='20'></form>" + 
			"<div class='submit-button'><p><a onclick='$(\"form\").submit();'>Submit</a></p></div>");
			//Show the popup box
			$("#submission-box").show();
		});
		
		//Add highlight to table rows
		addTableHighlight();
		//Add sorting to table
		addTableSorting();
	}

	function applyChangesSubmissionPage()
	{
		//Add CSS class
		$(".description").has("span").addClass("long-result");
		//Remove useless header for project. It's already in breadcrumb anyways
		$("h1").remove();
		//Remove name and user
		$("h2").eq(0).remove();
		//Remove Test results
		$("h2").eq(1).remove();
		$("h3").eq(0).replaceWith("<p>Note: failed = wrong, error = crashed.</p>");
		//Remove deadline
		$("p:contains('Deadline')").remove();
		$("th:contains('test')").text("Test");
		//For those who failed the test, change the pre to a normal p
		var pre = $("pre").eq(0).text();
		$("pre").eq(0).replaceWith("<div class='build-output'><pre>" + pre + "</pre></div>");
		//Make the scores bigger
		$("p:contains('points for')").each(function(index, value){var inner = $(value).html(); $(value).replaceWith("<h3 style='color:#fc3;font-weight:bold;'>" + inner + "</h3>");});
		//Add sorting to table
		addTableSorting();

		//Highlight passed and failed test cases
		$("tr").each(function(index, row)
		{
			var cell = $(row).find("td").eq(2);
			if(cell.length == 0) return;
			applyTintIfEqual(cell, cell.html());
		});

		//Release test
		var releaseTestElement = $("h3").has("a").eq(0);
		//Change the release test link to a button that actually release tests it with a popup confirm
		if(releaseTestElement.length)
		{
			var link = releaseTestElement.find("a").attr("href");
			var submissionPK = releaseTestElement.find("a").attr("href").match("submissionPK=([0-9]+)")[1];
			releaseTestElement.replaceWith(
				// <input type='submit' value='OK'>
				"<form method='POST' action='/action/RequestReleaseTest'><div class='submit-button' style='width:10em'><p>" +
				"<input type='hidden' name='submissionPK' value='" + submissionPK + "'>" +
				"<a href='" + link + "' onclick='if(confirm(\"Are you sure you want to release test this?\")){$(\"form\").submit();} return false;'>" +
				"Release Test" +
				"</a></p><div></form>");
		}
		//Release tokens
		$("ul").eq(0).addClass("release-tokens");

		//First release token
		$("ul.release-tokens li").each(function()
		{
			var tmp = $(this).html().replace("<br>", "");
			//Calculate time difference
			var nextToken = parseMarmosetDate(tmp) - Date.now();
			//Add in the text for the next token time
			$(this).html(tmp + " (in " + Math.floor(nextToken / 3600000) + "h " + Math.floor((nextToken % 3600000) / 60000) + "m)");
		});
	}

	//Start of actual executing code

	//Find out which page we're on
	var path = $(location).attr("href");
	var current_page = PAGE.LOGIN.value; //By default, we'll assume it's the login page
	//Check which page we're on
	for(var page in PAGE)
	{
		if(path.indexOf(PAGE[page].link) >= 0)
		{
			current_page = PAGE[page].value;
		}
	}

	//Universial pages changes
	applyChangesAll(current_page);

	//Page specific changes
	switch(current_page)
	{
		case PAGE.LOGIN.value:
			//Remove Logout button
			$("div.logout").remove();
			//Chang submit button
			$("input[type='submit']").attr("value", "Use this account");
			$("p:contains('please login as')").remove();
		break;
		case PAGE.COURSE_LIST.value:
			//TODO: make this into a table?

			//Add class to lists
			$("ul").eq(0).addClass("my-courses");
			//Remove the colon at the end of the links
			$("ul a").each(function (index, row) {$(row).text($(row).text().replace(":", ""));});
		break;
		case PAGE.PROBLEM_LIST.value:
			applyChangesProblemsList();
		break;
		case PAGE.SUBMISSION_LIST.value:
			applyChangesSubmissionList();
		break;
		case PAGE.SUBMISSION_DETAILS.value:
			applyChangesSubmissionPage();
		break;
		case PAGE.SUBMISSION_PAGE.value:
			//Change the weirdly written title
			$("h1").text("Web Submission");

			//Replace the form's table with something better looking
			$("table.form").eq(0).replaceWith("<p><input type='file' name='file' size='40'></p><p><input type='submit' value='Submit'></p>");
		break;
		case PAGE.CONFIRM_RELEASE.value:
			//Completely bypass this page and clicks the button for the user (This page shouldn't occur anyways)
			//There will be a confirmation popup in the previous page
			$("body").append("<div style='position:fixed;left:0;top:0;height:100%;width:100%;background:#fff;z-index:99999;text-align:center;font-size:3em;color:#000;'>Please wait patiently while we submit this for you</div>");
			$("input[type='submit']").click();
		break;
		case PAGE.ERROR.value:
			//Change navigation for a go back button
			$(".nav").html("<a href='#' onclick='history.back(); return false;'>Go back</a>");
			//Remove the ugly image
			$("p img").remove();
			//Add something more constructive inside the title
			$("h1").text("Oops, Marmoset has encountered an error!");
			//jQuery for the hide/show effect
			$("table tr th").click(function()
			{
				$("table tr").has("td").toggle();
			})
			.append(" (Click for details)").css("cursor", "pointer");
			$("table tr").has("td").hide();
			//Remove the logout button as it's completely useless
			$(".logout").remove();
		break;
		case PAGE.LOGIN_ERROR.value:
			//If we get to this page, then something is wrong
			//First check if the page contains an error, if so, redirect back to homepage
			if($("h3:contains('Apache Tomcat')").length > 0) window.location = "/";
		break;
	}
}

loadMarmoUI(runMarmoUI);