// Copyright (c) 2008-2009, Hao Chen
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// Version 0.61 - 2009.7.13
// - Fixed bug for profiles not showing up
// - fixed styling issues (thanks Michael R. Bernstein http://friendfeed.com/webmaven)
//
// Version 0.5 - 2008.10.20
// - Fixed bug for profiles not showing up
//
// Version 0.4 - 2008.09.19
// - Support for new Friendfeed layout
//
// Version 0.36 - 2008.09.05
// - Style fix
//
// Version 0.35 - 2008.08.30
// - Support for beta.friendfeed.com
//
// Version 0.34 - 2008.07.24
// - Fix unimportant javascript bug
//
// Version 0.33 - 2008.07.21
// - Removed profile for yourself from your comments/likes/discussion page unless SHOW_PROFILE_FOR_SELF is set to true
//
// Version 0.32 - 2008.07.18
// - Fixed another RegEx bug: some LinkedIn profiles did not show up
//
// Version 0.31 - 2008.07.09
// - Fixed RegEx bug: some LinkedIn profiles did not show up
//
// Version 0.3 - 2008.07.08
// - Does not show profiles for yourself as a default, but configurable SHOW_PROFILE_FOR_SELF
// - More compact
// - Added auto update script
//
// Version 0.2 - 2008.07.07
// - Adds profile info to FF user page using LinkedIn profile if available
// - Edit variable at top of script to customize what fields to display
// - Displays multiple of the same type (ie. two twitter accounts)
//
// Version 0.1 - 2008.07.04
// - Adds profile info to FF user page using Twitter bio if available
//
// Contact: detect [at] hotmail [dot] com
//
// ==UserScript==
// @name           FriendFeed Profile
// @namespace      http://userscripts.org/users/44035
// @description    Adds a user profile to FF user page.
// @include        http://friendfeed.com/*
// @exclude        http://friendfeed.com/settings/*
// @exclude        http://friendfeed.com/account/*
// @exclude        http://friendfeed.com/rooms/*
// @exclude        http://friendfeed.com/public/*
// @exclude        http://beta.friendfeed.com/list/*
// @exclude        http://beta.friendfeed.com/settings/*
// @exclude        http://beta.friendfeed.com/account/*
// @exclude        http://beta.friendfeed.com/rooms/*
// @exclude        http://beta.friendfeed.com/public/*
// @version        0.61
// ==/UserScript==

//set these to true or false depending on what you want to see on people's profile
var SHOW_PROFILE_FOR_SELF = true;

var SHOW_TWITTER = true;
var SHOW_TWITTER_BIO = true;
var SHOW_TWITTER_LOCATION = true;
var SHOW_TWITTER_WEBSITE = true;

var SHOW_LINKEDIN = true;
var SHOW_LINKEDIN_TITLE = true;
var SHOW_LINKEDIN_LOCATION = true;
var SHOW_LINKEDIN_CURRENT = true;
var SHOW_LINKEDIN_SUMMARY = true;
var SHOW_LINKEDIN_SKILLS = true;

// do not edit below this line unless you've got javascript-fu
GM_addStyle(".with-padding {padding-left: 10px;} .with-padding h4 {margin-left: -10px; }");

var gmScript_url = "http://userscripts.org/scripts/source/29623.user.js";
var gmScript_name = "Friendfeed Profile";
var gmScript_version = 0.61;

autoUpdateFromUserscriptsDotOrg(
	{
		name: gmScript_name,
		url: gmScript_url,
		version: gmScript_version,
	}
);

var whereToAdd;

function GM_wait() 
{
	if(typeof unsafeWindow.jQuery == 'undefined') 
	{ 
		window.setTimeout(GM_wait,100); 
	}
	else 
	{ 
		$ = unsafeWindow.jQuery; letsJQuery(); 
	}
}
GM_wait();

function getUID()
{
	return $('#sidebar #profile a.l_profile:eq(0)').attr('href').substr(1);
}

function getTwitter(url)
{
	GM_xmlhttpRequest({
      method: 'GET',
	  url: url,
	  onload: function(result) 
	  {
		  whereToAdd.before('<div>&nbsp;</div>');
		  bio = new RegExp(/<span class="bio">(.*)<\/span>/).exec(result.responseText);
		  if(SHOW_TWITTER_BIO && bio) whereToAdd.before('<div class="section with-padding"><h4>Bio</h4>' + bio[1].toString() + '</div>');
		  location = new RegExp(/<span class="adr">(.*)<\/span>/).exec(result.responseText);
		  if(SHOW_TWITTER_LOCATION && location) whereToAdd.before('<div class="section with-padding"><h4>Location</h4>' + location[1].toString() + '</div>');
		  website = new RegExp(/<span class="label">Web<\/span>(.*)<\/a>/).exec(result.responseText);
		  if(SHOW_TWITTER_WEBSITE && website) whereToAdd.before('<div class="section with-padding"><h4>Website</h4>' + website[1].toString() + '</div>');
	  }
	}
    );
}

function getLinkedIn(url)
{
	GM_xmlhttpRequest({
      method: 'GET',
	  url: url,
	  onload: function(result) 
	  {
		  whereToAdd.before('<div>&nbsp;</div>');
		  skills = new RegExp(/<p class="skills">([\S\s]*?)<\/p>/ig).exec(result.responseText);
		  if(SHOW_LINKEDIN_SKILLS && skills) 
		  {
			txtSkills = $.trim(skills[1].toString());
			if(txtSkills.length > 140)
			{
				txtSkills = txtSkills.substring(0,140) + '<a href="#" onclick="$(\'#linkedInSkillsMore\').show();$(this).hide();return false;" title="Show more of skills">...</a><div id="linkedInSkillsMore" style="display:none">' + txtSkills.substring(140) + '</div>';
			}
			whereToAdd.before('<div class="section with-padding"><h4>Skills</h4>' + txtSkills + '</div>');
		  }
		  summary = new RegExp(/<p class="summary">([\S\s]*?)<\/p>/ig).exec(result.responseText);
		  if(SHOW_LINKEDIN_SUMMARY && summary) 
		  {
			txtSummary = $.trim(summary[1].toString());
			if(txtSummary.length > 140)
			{
				txtSummary = txtSummary.substring(0,140) + '<a href="#" onclick="$(\'#linkedInSummaryMore\').show();$(this).hide();return false;" title="Show more of summary">...</a><div id="linkedInSummaryMore" style="display:none">' + txtSummary.substring(140) + '</div>';
			}
			whereToAdd.before('<div class="section with-padding"><h4>Summary</h4>' + txtSummary + '</div>');
		  }
		  current = new RegExp(/<ul class="current">([\S\s]*?)<\/ul>/ig).exec(result.responseText);
		  if(SHOW_LINKEDIN_CURRENT && current) whereToAdd.before('<div class="section with-padding"><h4>Current</h4>' + '<ul style="list-style-type:none;margin:0;padding:0;border:0;">' + $.trim(current[1].toString()).replace(/<li>/gim, '<li style="padding-bottom:6px">-') + '</ul></div>');
		  location = new RegExp(/<p class="locality">([\s\S]*?)<\/p>/).exec(result.responseText);
		  if(SHOW_LINKEDIN_LOCATION && location) whereToAdd.before('<div class="section with-padding"><h4>Location</h4>' + $.trim(location[1].toString()) + '</div>');
		  title = new RegExp(/<p class="headline title.*">([\s\S]*?)<\/p>/).exec(result.responseText);
		  if(SHOW_LINKEDIN_TITLE && title) whereToAdd.before('<div class="section with-padding"><h4>Title</h4>' + title[1].toString() + '</div>');
	  }
	}
    );
}

function isSelf()
{
	return(window.location.href.replace('http://' + window.location.hostname, '').indexOf(getUID()) != -1);
}

function letsJQuery() 
{
	whereToAdd = $('#page .header .body .servicespreview');
	if(SHOW_PROFILE_FOR_SELF ? true : !isSelf())
	{
		if(SHOW_TWITTER)
		{
			twitter = $('a[rel*="me"][href^="http://twitter.com/"]');
			for(var i=0;i<twitter.length;i++)
			{
				getTwitter(twitter.eq(i).attr('href'))
			}
		}
		if(SHOW_LINKEDIN)
		{
			linkedin = $('a[rel*="me"][href^="http://www.linkedin.com/"]');
			for(var i=0;i<linkedin.length;i++)
			{
				getLinkedIn(linkedin.eq(i).attr('href'))
			}
		}
		whereToAdd.prepend('<div>&nbsp;</div>');
	}
}

function autoUpdateFromUserscriptsDotOrg(SCRIPT) {
  try {
    if (!GM_getValue) return; // Older version of Greasemonkey. Can't run.
    // avoid a flood of dialogs e.g. when opening a browser with multiple tabs set to homepage
    // and a script with * includes or opening a tabgrop
    var DoS_PREVENTION_TIME = 2 * 60 * 1000;
    var isSomeoneChecking = GM_getValue('CHECKING', null);
    var now = new Date().getTime();
    GM_setValue('CHECKING', now.toString());

    if (isSomeoneChecking && (now - isSomeoneChecking) < DoS_PREVENTION_TIME) return;

    // check daily
    var ONE_DAY = 24 * 60 * 60 * 1000;
    var ONE_WEEK = 7 * ONE_DAY;
    var TWO_WEEKS = 2 * ONE_WEEK;
    var lastChecked = GM_getValue('LAST_CHECKED', null);
    if (lastChecked && (now - lastChecked) < TWO_WEEKS) return;

    GM_xmlhttpRequest({
      method: 'GET',
	  url: SCRIPT.url + '?source', // don't increase the 'installed' count just for update checks
	  onload: function(result) {
	  if (!result.responseText.match(/@version\s+([\d.]+)/)) return;     // did not find a suitable version header

	  var theOtherVersion = parseFloat(RegExp.$1);
	  if (theOtherVersion <= parseFloat(SCRIPT.version)) return;      // no updates or older version on userscripts.orge site

	  if (window.confirm('A new version ' + theOtherVersion + ' of greasemonkey script "' + SCRIPT.name + '" is available.\nYour installed version is ' + SCRIPT.version + ' .\n\nUpdate now?\n')) {
	    GM_openInTab(SCRIPT.url);   // better than location.replace as doing so might lose unsaved data
	  }
	}
      });
    GM_setValue('LAST_CHECKED', now.toString());
  } catch (ex) {
  }
}
