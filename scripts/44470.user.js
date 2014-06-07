//---------------------------------------------------------------------------------------------------
//    Copyright (C) 2008  Michael D. Irizarry
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    For a copy of the latest GNU General Public License, see <http://www.gnu.org/licenses/gpl.html>.

// ==UserScript==
// @name          Facebook Twitter Updates
// @namespace     http://socialvitamin.com/apps/
// @description   Post Tweets from Facebooks new "Share" feature in 140 characters or less. You will be able to Tweet from Facebook using Facebooks "Share" feature.
// @include       http://*.facebook.com/*
// @include       http://facebook.com/*
// @include       http://*.facebook.com/home.php#/*
// ==/UserScript==


// TODO:
// - Show message that it has been posted to Twitter
// - Shorten URLS
// - Only Strings working :( will fix later since gateway does not decode, will update later.
// - Add Twitter Trend Cloud

(function() {

	// Facebook Twitter Style
	GM_addStyle(
		'#home_stream {width:750px;} ' +
		'#home_left_column {width: 930px;} ' +
		'#home_sidebar {display:none; !important} ' +
		'#home_filter_list {float:right;} ' +
		'#home_stream h3 {width:700px;} ' +
		'.commentable_item .show_all_link, .commentable_item .wallpost {width:700px; !important} ' +
		'.UIComposer_Pic {display:none;} ' +
		'.UIComposer_STATE_PIC_OUTSIDE .UIComposer_UIRoundedBox {padding-left: 0px;}' +
		'.UIComposer_Prompt label {display:none} ' +
		'.UIComposer_Prompt:before {content:"What are you doing?"} ' +
		'.UIComposer_Prompt {font-size:1.4em;!important}' +
		'#settings input {margin: 5px; width: 180px;}' +
		'#settings label {width: 190px;}' +
		'#settings {float:left; margin: 50px; padding:15px; width: 200px; position: fixed; '+
					'bottom: 0.3em; right: 0.3em; border: thin solid black; ' +
					'color: black; background: #94E4E8; ' +
					'-moz-border-radius: 10px; z-index: 99999}'
	);

	// Setting Menu
	GM_registerMenuCommand('Facebook Twitter Updates Settings', showSettings);
	
	// Twitter Updates
	var $;
	var jQuery;
	var user = GM_getValue('user');
	var pass = GM_getValue('pass');
	
	// Add jQuery
	var jQ = document.createElement('script');
	    jQ.src = 'http://jqueryjs.googlecode.com/files/jquery-1.3.2.min.js';
	    jQ.type = 'text/javascript';

	document.body.appendChild(jQ);
	
	// Check if jQuery's is loaded
	var isjQueryLoaded = setInterval(function() {
	  if (typeof unsafeWindow.jQuery != 'undefined') {
	        clearInterval(isjQueryLoaded);
	        jQuery = unsafeWindow.jQuery;
			$ = jQuery.noConflict(true); 
	        onLoadComplete();
	   }
	 },100);
	 
	// Load Complete
	function onLoadComplete() {

		// Check Settings
		if (! GM_getValue('first_config_done', false)) {
			showSettings();
			return;
		}
		
		// Facebook Share Button Event Handler
		jQuery('.UIComposer_Button').click(function () {
		      // Status
		      var statusUpdate = jQuery('.UIComposer_TextAreaShadow textarea').val();  
		      if (statusUpdate != "") { update(statusUpdate); } 
		});
		
	}
	
	// Update Tweeter status
	// www.SWXFormat.com public gateway by Aral Balkan
	function update(statusUpdate) {
		
		request('http://swxformat.org/php/json.php/Twitter.update/' + 
			statusUpdate.substring(0, 139) + '/' + user + '/' + pass + '/', function(data) {
				console.log(data);
		});

	}
	
	// Request
	function request(url, callback)
	{
	    var iFrameObj = document.createElement('IFRAME');
	    iFrameObj.id = 'fbIframe';
	    document.body.appendChild(iFrameObj);       
	    iFrameObj.src = url;                        
	
	    jQuery(iFrameObj).load(function() 
	    {
	    	// Callback 
	        callback("Success");
	        document.body.removeChild(iFrameObj);
	    });
	}
	
	// Build Settings UI
	function showSettings() {
		
			var html = '<img src="http://assets0.twitter.com/images/twitter_logo_header.png" /> <br />' +
					   'Please provide your Twitter Username and Password. <br />';
			jQuery('<div/>').attr({id:'settings'}).html(html).appendTo(document.body);
			jQuery('<label/>').attr({for:'username'}).html('Username:').appendTo('#settings');
			jQuery('<input/>').attr({id:'username'}).appendTo('#settings');
			jQuery('<label/>').attr({for:'password'}).html('Password:').appendTo('#settings');
			jQuery('<input/>').attr({id:'password', type:'password'}).appendTo('#settings');
			jQuery('<div/>').attr({id:'settingsMenu', style:'float:right;'}).html('<a id="closeSettings" href="">Close</a>&nbsp;|&nbsp;<a id="saveSettings" href="">Save Settings</a>').appendTo('#settings');
			
			// Get Values
			jQuery('#username').val(GM_getValue("user"));
			
			// Save and Close
			jQuery('#closeSettings').click(function() { 
				jQuery('#settings').hide('slow');
			});
			jQuery('#saveSettings').click(unsafeWindow.saveSettings);
			
	}
	
	// Save Settings
	unsafeWindow.saveSettings = function() {
  			var u = jQuery('#username').val();
			var p = jQuery('#password').val();
			
			if (u.length > 0 && p.length > 0) {
				window.setTimeout(GM_setValue, 0, "user", u);
				window.setTimeout(GM_setValue, 0, "pass", p);
				window.setTimeout(GM_setValue, 0, "first_config_done", true);
				jQuery('#settings').css('background-color', '#94E4E8');	
				jQuery('#settings').hide('slow');
			} else {
				jQuery('#settings').css('background-color', '#D6D4D4');	
			}
	};

})();	


