// ==UserScript==
// @name        Userscripts.org Scam Filter
// @description Filters out scam scripts at Userscripts.org.
// @namespace   http://userscripts.org/scripts/review/164451
// @updateURL   https://userscripts.org/scripts/source/164451.meta.js
// @downloadURL https://userscripts.org/scripts/source/164451.user.js
// @homepageURL https://userscripts.org/scripts/show/164451
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @include     /^https?://(www\.)?userscripts\.org/scripts/?((#.*)|(search.*)|(\?page.*)|(\?sort.*))?$/
// @version     3.454
// ==/UserScript==

$(document).ready(function(){

// *** Set update info ***

// Tell auto-updater which version is currently installed
var installedVersion = 3.454; 

// Tell auto-updater this script's description page URL
var thisScriptURL = location.protocol + '//userscripts.org/scripts/show/163038'; 

// Tell auto-updater this script's meta data URL, for checking the script's latest version number
var thisScriptMetaURL = location.protocol + '//userscripts.org/scripts/source/163038.meta.js'; 

// *** End update info ***

// IDs of known scam authors
var scammers = [
	100000556836192, 100004686823385, 100003568317637, 100004786591650, //1
];

// Ignore the following script authors. This is to prevent known false-positive detections
var whitelist = [
	606397499388806
];

// Set global variables
var cScam;
var gid = [];

// Load jQuery cookie functions
loadJQcookies();

/* Check for an existing session cookie: Ajax Range header for bandwidth limiting measure doesn't work without a session cookie.
If one is not found, retrieve the login page once (without logging in), which creates the session cookie for us */
if ($.cookie('_uso_session') == null) {
	$.ajax({
		url: location.protocol + '//userscripts.org/login', 
		dataType: 'text', 
		async: false,
		cache: false
	});
}

// If our toggle cookie doesn't exist yet, create it, so our toggle state can be saved
if ($.cookie('ScamHide') == null) $.cookie('ScamHide', '1', { expires: 730, path: '/' }); 

// Create a function to read our toggle cookie
function readCookie(){cScamHide = ($.cookie('ScamHide') == 1) ? true : false;}

// Set the text to use when tagging suspected scam scripts
var tag = '<span style="color:darkred;font-weight:bold;line-height:50%;">[SUSPECTED SCAM]</span>&nbsp; ';

// Set the expanded warning to be placed in the descriptions of suspected scam scripts
var caution = '<span style="line-height:100%;color:darkred;font-weight:bold;margin-bottom:-10px;display:block;">' + 
	'Warning: This script is a suspected scam. ' + 
	'Use caution when considering installing it.<br />' + 
	'<span class="reason" style="color:red;font-weight:bold;font-family:verdana;font-size:90%;line-height:150%;" hidden=""></span></span><br />' +
	'<span style="font-style:italic;line-height:110%;">Author\'s description:</span> ';
	
// Set update notice
var notify = ' <a style="font-size:80%" class="notify" target="_blank" href="' + thisScriptURL + '">' +
	'Scam Filter Update Available!</a>';
	
// Insert our toggle link, along with fields to show # of detected scams and the auto-update notice
$('a:contains("Name")[href^="/scripts"]:first')
	.after('&nbsp; ' + 
	'<a href="#a" class="autoToggle">Toggle Scam Filter</a>&nbsp;(' + 
	'<span class="working" style="color:orange;text-shadow:0px 0px 5px #yellow;">[Working]</span>' + ': ' +
	'<span class="total">0</span> ' + 
	'<span class="tog"></span>' + 
	')' +
	'<span class="upd"></span>');
	
// Set toggle link hover effect
$('a.autoToggle').hover(
	function(){
		$(this).css('color','#FFDD11');
	},
	function(){
		$(this).css('color','white');
	}
);

// Read our cookie to determine toggle state
readCookie();

// Set toggle text based on cookie
if (cScamHide){
	$('span.tog').text('hidden');
} else {
	$('span.tog').text('shown');
}

// Loop through each list row
$('tr[id^="scripts-"]').each(function(i,val){

	// Extract script ID from row ID
	id = $(this).attr('id').replace('scripts-','');
	suspects[i] = id;
	
	// Retrieve script description page
	$.ajax({
		url: location.protocol + '//userscripts.org/scripts/fans/' + suspects[i], 
		dataType: 'text', 
		headers: {Range: "bytes=1600-2400"}, //offset 1712 logged in, 1630 logged out. 666 total
		cache: false,
		success: handOff1
	});
	
	function handOff1(data){
		// Hand off the retrieved description page to the checkScriptAuthor function
		checkScriptAuthor(data,suspects[i]);
		
		// If this was the last loop iteration, change "Working" text to "Done" and hide/show scams based on toggle
		if (i == $('tr[id^="scripts-"]').length-1) $('span.working').text('Done').css('color','white').css('text-shadow','');
		toggleScams(false);
	}
});

function checkScriptAuthor(data,id){
	var uid = id;
	
	// Get script author's ID from the retrieved script description page
	var auth = data.match(/;s=80&amp;default=identicon" rel="nofollow" user_id="(\d*)"/i);
	var author = parseInt(RegExp.$1);
	
	// If the script's author is in our whitelist, move on
	if (whitelist.indexOf(author) > -1){
		return false;
	// If the script's author matches one of our known scammers, tag the script as a suspected scam
	} else if (scammers.indexOf(author) > -1){
		tagScam('scammer',id);
	// Otherwise, retrieve the script code for scanning
	} else {
	
		$.ajax({
			url: location.protocol + '//userscripts.org/scripts/source/' + id + '.user.js', 
			dataType: 'text', 
			cache: false,
			success: function(data){
				handOff2(data,uid);
			}
		});
		
		function handOff2(data,id){
			// Hand off the retrieved script code to the checkScript function
			checkScript(data,id);
		}
	}
}

function checkScript(data,id){
	//Skip scripts that don't contain at least one instance of the word "facebook" or "ultoo"
	if ( (data.search('facebook') > -1) || (data.search('ultoo.com') > -1) ){ 
	
		// Check the script code for known scam patterns
		if (data.search('&action=subscribe') > -1){
			tagScam('&action=subscribe',id);
		} else if (data.search('/ajax/friends/lists/subscribe') > -1){
			tagScam('/ajax/friends/lists/subscribe',id);
		} else if (data.search('/ajax/follow/follow_profile.php') > -1){
			tagScam('/ajax/follow/follow_profile.php',id);
		} else if (((data.search('p,a,c,k,e,d') > -1) || (data.search('p,a,c,k,e,r') > -1)) && (data.search('eval') > -1)){
			tagScam('packer',id);
		} else if ( (data.search(/document\.getElementsByName\('PollUserName'\)\[0\]/i) > -1) && (data.search('ultoo.com') > -1) ){
			tagScam('ultoo',id);
		} else if (data.search(/facebook.com\/plugins\/like\.php?href\=/i) > -1){
			tagScam('facebook.com/plugins/like.php?href=',id);
		} else if (data.search(/(&|\?)action\=add_friend/i) > -1) {
			tagScam('paramsAdd',id);
		}
	}
}

function tagScam(reason,id){
	
	// Set row selector
	var row = 'tr[id="scripts-' + id + '"] ';
	
	// Tag the suspected scam's HTML code
	$(row).addClass('scam'); 
	
	// Show reason only on hover
	$(row + 'td.script-meat').css('padding-bottom','0').hover(
		function(){
			$('span.reason', this).removeAttr('hidden');
		},
		function(){
			$('span.reason', this).attr('hidden','');
		}
	);
	
	// Hide the suspected scam if the cookie tells us the toggle is set to hide
	if (cScamHide) $(row).attr('hidden',''); 
	
	// Tag the suspected scam visually using our preset messages
	$(row + 'a.title')
		.css('color','darkred')
		.before(tag)
		.parent().children('p.desc').prepend(caution);
		
	// Set reason text
	if (reason == '&action=subscribe'){
		var reason = 'Source contains url subscribe token [&action=subscribe].';
	} else if (reason == '/ajax/friends/lists/subscribe'){
		var reason = 'Source contains ajax subscribe code [/ajax/friends/lists/subscribe].';
	} else if (reason == 'packer'){
		var reason = 'Source contains "Packer" hidden eval code [eval(p,a,c,k...)].';
	} else if (reason == '/ajax/follow/follow_profile.php'){
		var reason = 'Source contains Ajax profile follow code [/ajax/follow/follow_profile.php]';
	} else if (reason == 'scammer'){
		var reason = 'This script was published by a known scam author.';
	} else if (reason == 'ultoo'){
		var reason = 'Source contains Ultoo.com scam code that procures points for one particular user.';
	} else if (reason == 'facebook.com/plugins/like.php?href='){
		var reason = 'Source contains Facebook "like" reference to specific pages [like.php?href=].'; 
	} else if (reason == 'paramsAdd'){
		var reason = 'Source contains Facebook friend add token for a specific user [&action=add_friend].'; 
	} 
	
	// Append reason text
	$(row + 'span.reason').text(' Reason: ' + reason);
	
	// Increment the running count of detected scams
	$('span.total').text(parseInt($('span.total').text()) + 1);
}

// Set the toggle link's click function
$('a.autoToggle').click(function(){
	toggleScams(true);
});

// Make sure the toggle setting is respected in case a toggle click occurred during the loop
toggleScams(false);

function toggleScams(click){
	// Read our cookie to determine the current toggle setting
	readCookie();
	
	/* If toggleScams is running as a result of a toggle link click, toggle hide/show setting and hide or show the scams. 
	If it's running initially (not the result of a click), simply hide/show scams based on the current setting. */
	
	if (cScamHide){
		if (click) {showScams(click)} else {hideScams(click)}
	} else {
		if (click) {hideScams(click)} else {showScams(click)}
	}
}

function hideScams(click){
	$('tr.scam').attr('hidden','');
	$('span.tog').text('hidden');
	
	// If toggleScams is running as a result of a toggle link click, toggle the cookie appropriately
	if (click) $.cookie('ScamHide', '1', { expires: 730, path: '/' });
}

function showScams(click){
	$('tr.scam').removeAttr('hidden');
	$('span.tog').text('shown');
	
	// If toggleScams is running as a result of a toggle link click, toggle the cookie appropriately
	if (click) $.cookie('ScamHide', '0', { expires: 730, path: '/' });
}

/* Auto-updater: Daily check. 
If an update is found, update notice displays on the current and next two subsequent page loads, 
then stops displaying again until following day. */

// If the auto-update cookie doesn't exist, create it.
if ($.cookie('ScamFilterUpdate') == null) $.cookie('ScamFilterUpdate', '1', { expires: 1, path: '/' });

// Convert the cookie's data into a number
var cUpdater = parseInt($.cookie('ScamFilterUpdate'));

// If the cookie showed a number less than 4, retrieve Scam Hider's remote meta data, which includes its version number
if (cUpdater < 4){
	$.ajax({
		url: thisScriptMetaURL, 
		dataType: 'text', 
		cache: false,
		success: checkUpdates
	});
}

function checkUpdates(data){
	// Extract Scam Hider's current version number from the retrieved data...
	var currentVersion = parseFloat(data.substr(data.search(/@version/i) + 13, 5));
	
	// and compare it to the installed version number.
	if (currentVersion > installedVersion){
		
		// If the current version number retrieved is greater than the installed version number, show our update notice.
		$('span.upd').html(notify);
		
		// Set the notification link's tooltip to show installed + latest versions
		$('a.notify').attr('title','Installed version: ' + installedVersion + ' Latest version: ' + currentVersion);
		
		/* If the user doesn't update and loads another script listing page, increment the cookie's number.
		This lets the user see the update notice for 3 page loads total, then doesn't bother them again for another day
		(the cookie is set to expire in 24 hours). */
		$.cookie('ScamFilterUpdate', cUpdater + 1, { expires: 1, path: '/' });
	}
}

// Add jQuery cookie functions: Makes the cookie functions above work. This must load above function use for Chrome/Tampermonkey support. 
/* jQuery Cookie Plugin v1.3.1 https://github.com/carhartl/jquery-cookie
 * Copyright 2013 Klaus Hartl. Released under the MIT license */ 
function loadJQcookies(){
	(function (factory) {if (typeof define === 'function' && define.amd) {define(['jquery'], factory);} else {factory(jQuery);}}
		(function ($) {
			var pluses = /\+/g;
			function raw(s) {return s;} function decoded(s) {return decodeURIComponent(s.replace(pluses, ' '));}
			function converted(s) {
				if (s.indexOf('"') === 0) {s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');}
				try {return config.json ? JSON.parse(s) : s;} catch (er) {} }
			var config = $.cookie = function (key, value, options) {
				if (value !== undefined) {
					options = $.extend({}, config.defaults, options);
					if (typeof options.expires === 'number') {var days = options.expires, 
						t = options.expires = new Date(); t.setDate(t.getDate() + days); }
					value = config.json ? JSON.stringify(value) : String(value);
					return (document.cookie = [
	config.raw ? key : encodeURIComponent(key),	'=', config.raw ? value : encodeURIComponent(value),
	options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '',
	options.domain ? '; domain=' + options.domain : '',	options.secure ? '; secure' : ''].join(''));}
				var decode = config.raw ? raw : decoded; var cookies = document.cookie.split('; '); var result = key ? undefined : {};
				for (var i = 0, l = cookies.length; i < l; i++) {
					var parts = cookies[i].split('='); var name = decode(parts.shift()); var cookie = decode(parts.join('='));
					if (key && key === name) {result = converted(cookie); break;} if (!key) {result[name] = converted(cookie);}}
				return result;};
			config.defaults = {};
			$.removeCookie = function (key, options) {
				if ($.cookie(key) !== undefined) {$.cookie(key, '', $.extend({}, options, {expires: -1}));return true;}return false;
			};
		})
	);
}
// End jQuery Cookie Plugin *************************************************

});