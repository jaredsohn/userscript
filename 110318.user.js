// ==UserScript==
// @name            Hacker News Threshold
// @namespace       http://giu.me
// @description     Allows you to highlight threads on Hacker News which have a number of points greater than a specified threshold
// @include			http://news.ycombinator.com/
// @include			http://news.ycombinator.com/news
// @include			http://news.ycombinator.com/ask
// @include			http://news.ycombinator.com/newest
// @version			1.1
// ==/UserScript==

//A thanks for this snippet goes to tghw:
//http://stackoverflow.com/questions/2246901/how-can-i-use-jquery-in-greasemonkey-scripts-in-google-chrome
function addJQuery(callback) {
	var script = document.createElement("script");
	script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.7.0/jquery.min.js");
	script.addEventListener('load', function() {
	var script = document.createElement("script");
		script.textContent = "(" + callback.toString() + ")();";
		document.body.appendChild(script);
	}, false);
	document.body.appendChild(script);
}

function addThreshold(){
	$("head").append("<style>.hnth{background: #FFFB93 !important;}.hnterr{background:#FF0000;color:#fff;}</style>");

	function highlightThreads(threshold){
		var $hnfti = $("#hnfti");
		if(!isNaN(threshold)){
			$hnfti.removeClass("hnterr");
			$(".hnth").removeClass("hnth");
			$("span[id^='score_']").filter(function(){
				var m = $(this).html().match(/[0-9]+/g);

				if(m){
					return parseInt(threshold) <= parseInt(m[0]);
				}
				else{
					return false;
				}
			})
			.closest("tr").prev().addClass("hnth");
		}
		else{
			$(".hnth").removeClass("hnth");
			$hnfti.addClass("hnterr");
		}
	}

	$("#hnfti").live("keyup", function(){
		highlightThreads($(this).val());
	});

	var startthreshold = 100;

	$($(".pagetop")[0]).append(" | Threshold: <input type='text' id='hnfti' value='"+startthreshold+"'  />");

	highlightThreads(startthreshold);
}


addJQuery(addThreshold);