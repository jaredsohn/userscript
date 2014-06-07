// ==UserScript==
// @name           Path of Exile Twitch Toggle
// @namespace      PoETwitchToggle
// @description    A simple user script to enable toggling of twitch videos on the path of exile website, by Brybry.
// @include        *pathofexile.com/forum/view-thread/*
// @version        1.0.1
// ==/UserScript==

function LOAD()
{
	var attempts = 0;
	function checkIfLoaded()
	{
		if (attempts++ > 10) return;
		if (document.getElementsByClassName("twitchWidget").length > 0)
		{
			attempts = 0;
			tweak();
		}
		else
			setTimeout(checkIfLoaded,500);
	}

	function tweak()
	{
		if ($(".controls").length <= 0 || $(".twitchWidget").length <= 0)
		{  
			if (attempts < 10)
			{
				attempts++;
				setTimeout(tweak,500)
			}
			return; 
		}

		var tWidgetLabel = $("<label for='widgetToggle'>Hide Widget</label>");
		var tWidgetBox = $("<input type='checkbox' style='display: inline-block;' id='widgetToggle'>");
		var tWidgetPref = JSON.parse(localStorage.getItem("tWidgetPref"));
		if (tWidgetPref === null) {  tWidgetPref = true;  localStorage.setItem("tWidgetPref", true); }
		if (tWidgetPref === true) { $('.twitchWidget').hide(); $(".twitchWidget").css("display", "none");}

		// should use MutationObserver instead
		$(".twitchWidget").bind("DOMSubtreeModified",function(){if (tWidgetPref === true) { $('.twitchWidget').hide(); $(".twitchWidget").css("display", "none");}});

		tWidgetBox.prop("checked", tWidgetPref);
		tWidgetBox.change(function() { tWidgetPref = this.checked; (tWidgetPref === true) ? $(".twitchWidget").hide() : $(".twitchWidget").show(); localStorage.setItem("tWidgetPref", tWidgetPref); });
		$('.controls').prepend(tWidgetLabel,tWidgetBox);
	}
	checkIfLoaded();
}

var script = document.createElement("script");
script.innerHTML="("+LOAD.toString()+")();";
script.type="text/javascript";
document.getElementsByTagName("head")[0].appendChild(script);
