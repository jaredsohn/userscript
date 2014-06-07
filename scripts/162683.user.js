// ==UserScript==
// @name         Apple Developer site fixes
// @namespace    http://bronosky.com/
// @version      0.2
// @description  Enables disabled field features and expands truncated content on Apple sites iOS developers frequent.
// @include      http*://developer.apple.com/ios/*
// These next 3 are only for the login form fix
// @include      http*://daw.apple.com/*
// @include      http*://itunesconnect.apple.com/*
// @include      http*://appleid.apple.com/*
// @require      http://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @copyright    Copyleft 2012+, Richard Bronosky
// @license      (CC) Attribution Non-Commercial Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// ==/UserScript==

race_condition_timing = 1500

// Enable password paste on login forms
$('#accountpassword').each(function(){this.onpaste=null})

// Expand name on App IDs > Manage
// We have to wait for Apple's JS that modifies the DOM after it loads.
if($(".name strong")){setTimeout(function(){
  $('.name strong').each(function (i, e) {
    var e = $(e),
        t = e.attr('title');
    if (t) {
      e.text(t);
    }
  });
}, race_condition_timing);}

// Expand [Provision Profile] name on Provisioning > Distribution
// We have to wait for Apple's JS that modifies the DOM after it loads.
if($("td.appid")){setTimeout(function(){
  $('td.appid').each(function (i, e) {
    var e = $(e),
        t = e.attr('title');
    if (t) {
      e.text(t);
    }
  });
}, race_condition_timing);}

// Expand App ID on Provisioning > Distribution
// We have to wait for Apple's JS that modifies the DOM after it loads.
if($("td.profile span")){setTimeout(function(){
  $('td.profile span').each(function (i, e) {
    var e = $(e),
        t = e.attr('title');
    if (t) {
      e.text(t);
    }
  });
}, race_condition_timing);}

// Enable the Submit button on Provisioning > Distribution > Modify
// We have to wait for Apple's JS that modifies the DOM after it loads.
if($("input:radio[name='distributionMethod']")){setTimeout(function(){
    $("input:radio[name='distributionMethod']").not(":checked").first().click();
    $("input:radio[name='distributionMethod']").not(":checked").first().click();
    $('input[name="provisioningProfileName"]').css({'width':'300px'})
}, race_condition_timing);}

// Display AppIDs on iTunesConnect > Manage Your Apps > See All
$('div.software-column-type-col-0').not('a div').each(function(){
    var e = this,
	    h = $('a', e).attr('href'),
        f = $(e).find('p:first'),
        p = $('<p>...</p>').insertAfter(f);
	$.ajax(h).done(function(d){
		appid = $($(d).find('.app-info-container label + span')[1]).text();
		p.text(appid);
	})
})