// ==UserScript==
// @name          Team City Build Broken
// @namespace     http://conkersoftware.co.uk/teamcity/
// @description   Turns the page red when a build is broken
// @include       http://thriller:8000/*
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			
            GM_JQ = document.createElement('script');
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4.4/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

	// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

	var timerId;
	
	// All your GM code must be inside this function
    function letsJQuery()
	{
		timerId = window.setInterval(function() { conker.teamcity.checkForBreakage() }, 5000);
    }
	
window.conker = {};

conker.teamcity =
{
	checkForBreakage: function()
	{
		if(this.buildIsBroken())
		{
			$("body").css("background-color", "#cb000b");
			$(".tableCaption").css("background-color", "#febfbc");
			$(".overviewTypeTable").css("background-color", "#fedfde");
			
		}
		else
		{
			if(this.buildIsBrokenAndResponsibilityTaken())
			{
				$("body").css("background-color", "#ed9506");
				$(".tableCaption").css("background-color", "#fccc7f");
				$(".overviewTypeTable").css("background-color", "#fee6c1");
			}
			else
			{
				$("body").css("background-color", "#b1ef8e");
				$(".tableCaption").css("background-color", "#d0f5bb");
				$(".overviewTypeTable").css("background-color", "#effce7");
			}
		}
	},
	
	buildIsBroken : function()
	{
		var brokenBuildsOnOverview = $("#content .tableCaption img[src='/img/buildStates/error.gif']");
		var brokenProjectBuild = $("#main_navigation img[src='/img/buildStates/error.gif']");
		return (brokenBuildsOnOverview.length > 0 || brokenProjectBuild.length > 0);
	},
	
	buildIsBrokenAndResponsibilityTaken : function()
	{
		var brokenBuildsOnOverview = $("#content .tableCaption img[src='/img/buildStates/errorWithResp.gif']");
		var brokenProjectBuild = $("#main_navigation img[src='/img/buildStates/errorWithResp.gif']");
		return (brokenBuildsOnOverview.length > 0 || brokenProjectBuild.length > 0);
	}
}

