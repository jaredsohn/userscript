// ==UserScript==
// @name        eBattles
// @namespace   com.erepublik.ebattles
// @include     http://*.erepublik.com/*/military/battlefield/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1.1
// ==/UserScript==

var JQUERY_URL = "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js";
function addJQuery(b){var c="script";var a=document.createElement(c);a.setAttribute("src",JQUERY_URL);a.addEventListener("load",function(){var a=document.createElement(c);a.textContent="("+b.toString()+")();";document.body.appendChild(a)},!1);document.body.appendChild(a)};
function UserScript(){
    var $z = jQuery.noConflict();
    if(typeof unsafeWindow == 'undefined') unsafeWindow = window;
// ===================================================================

	function moreUpdate() {
		jQuery.getJSON("/en/military/battle-stats/"+unsafeWindow.SERVER_DATA.battleId+"/"+unsafeWindow.SERVER_DATA.division, function(){
			setTimeout(moreUpdate, 5000);
		});
	}

    jQuery(document).ready(function(){
    
    	// Disabled Are you still here ?
    	setInterval("globalSleepTick=120;", 1000);
    	moreUpdate();
    	
    	// show details
    	jQuery("#pvp").css("background-position","center bottom");
    	jQuery("#pvp").css("padding-top","200px");
    	jQuery("#qonsole").css("height","210px");
    	jQuery("#qonsole").css("background","none repeat scroll 0 0 rgba(17, 17, 17, 0.87)");
    	jQuery(".close_console").css("display","none");
    	jQuery(".campaign_toggler").css("display","none");
    	jQuery("#qonsole h3").html("Your are in Division " + jQuery("#qonsole .entry.current .cz3 span").html());
    	jQuery("#qonsole .entry em").css("opacity","1");
     	jQuery("#qonsole .entry .pdomi_left em").css("right","5px");
     	jQuery("#qonsole .entry .pdomi_right em").css("left","5px");
     	jQuery("#qonsole .entry .pdomi_left").css("width","67px");
     	jQuery("#qonsole .entry .pdomi_right").css("width","67px");
    	
    	unsafeWindow.jQuery("body").ajaxSuccess(function(e,r,o) {
    		if (o.url.indexOf('battle-stats') == -1)
    			return;
    		
    		// update
    		var data = JSON.parse(r.response);
    		var walls = data.division.domination;
    		
    		for(var k in walls)
    		{
    			var l = (Math.round(walls[k]*100))/100;
    			var r = Math.round(10000-(l*100))/100;
    			
    			jQuery('#qonsole .div'+k+' .cz3 .pdomi_left em').html(l + "%");
    			jQuery('#qonsole .div'+k+' .cz3 .pdomi_right em').html(r + "%");
    		}
		});
    });

// ===================================================================
} if(navigator.userAgent.toLowerCase().indexOf('chrome') > -1){addJQuery(UserScript);}else{UserScript();}