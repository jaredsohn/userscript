/*
Geocaching VIP List
http://www.lildevil.org/greasemonkey/vip-list

--------------------------------------------------------------------------------

This is a Greasemonkey user script.

Follow the instructions on http://www.lildevil.org/greasemonkey/
to install Greasemonkey and this user script.

--------------------------------------------------------------------------------
*/

// ==UserScript==
// @name          GC VIP List
// @description   Add links to VIP logs. Show only the logs you want to see.
// @namespace     http://www.lildevil.org/greasemonkey/
// @version       3.3
// @copyright     2008-2011 Lil Devil
// @license       Attribution-Noncommercial-Share Alike; http://creativecommons.org/licenses/by-nc-sa/3.0/
// @icon          http://www.lildevil.org/greasemonkey/images/VIP-icon.png
// @include       http://*.geocaching.com/seek/cache_details.aspx?*
// @include       http://*.geocaching.com/my/myfriends.aspx*
// @include       http://*.geocaching.com/profile*
// @include       http://*.geocaching.com/account/default.aspx
// @include       http://*.geocaching.com/account/ManageFriends.aspx
// @include       http://*.geocaching.com/seek/cache_favorited.aspx*
// @include       http://*.geocaching.com/my/favorites.aspx
// ==/UserScript==

// the following is for http://www.jslint.com/
/*jslint browser: true, undef: true, nomen: true, bitwise: true, immed: false */
/*global $ GM_addStyle GM_getValue GM_log GM_openInTab GM_setValue GM_xmlhttpRequest XPathResult window Check_for_Update Main Refresh_VIP_Display Reload_Cache_Page_With_All_Logs Toggle_Cache_Logs_Table */

(function(){

var SCRIPT_NAME = 'GC VIP List';
var SCRIPT_VERSION = '3.3';

var Page_URL = document.location.toString();

try {
	if (window != window.top) { return; }	// abort if running in an iframe
} catch(err) { return; }	// Greasemonkey throws a security error when accessing window.top from an iframe

 // Do this before anything else to reduce overhead
if (GM_getValue('Always_Load_All_Logs', false)) {

	// If this is the cache page, reload to show all logs
	if (Page_URL.match(/geocaching\.com\/seek\/cache_details\.aspx/i)) {		// Cache page
		if (Reload_Cache_Page_With_All_Logs()) { return; }
	}
}

Check_for_Update(SCRIPT_NAME, SCRIPT_VERSION);

var SCRIPT_START_TIME = new Date();
var MAX_SCRIPT_TIME = 17;	// set MAX_SCRIPT_TIME to 3 seconds less than
							// about:config:dom.max_chrome_script_run_time (default: 20)
MAX_SCRIPT_TIME *= 1000;	// convert to milliseconds

var DEBUG = false;			// set to 'true' to enable debugging output to the console

var USE_STORAGE = false;
try {
	USE_STORAGE = (typeof(window.localStorage) != 'undefined');
} catch (err) {}

var VIP_Working_List	= [];
var VIP_Displayed_List	= [];
var Add_List			= [];
var Log_List			= [];
var Multi_Log_Owners	= [];
var First_Logs			= [];
var NextRowClass		= '';
var My_Logs				= {	findStatus	: -1,
							findLogID	: '' };
var Cache_Owner			= '';
var Count_Logs_Aborted	= false;
var All_Logs_Shown		= false;
var More_Logs_URL		= '';
var Timeout_Timer		= 0;

var Page_Name, Login_Name = '', Login_Name_Link;

var Displayed_Prefs = {};
var Working_Prefs	= {};
var Default_Prefs	= {	ShowBadges:			true,
						ShowHelp:			true,
						ShowVIPs:			true,
						ShowMine:			true,
						ShowMineAlways:		true,
						ShowOwner:			true,
						ShowOwnerAlways:	false,
						ShowMulti:			false,
						ShowMultiAlways:	false,
						ShowImages:			true,
						ShowImagesAlways:	false,
						AlwaysLoadAllLogs:	false,
						Position:			1,
						DateTab:			false,
						DateFormatList:		'm/dY{/yy}Y',
						DateFormatLogs:		'MM dY{, yyyy}Y',
						DateFormatHide:		'RR, MM dY{, yyyy}Y'
						};

String.prototype.trim = function() {
	if (!this.length) { return ''; }

	// remove leading and trailing spaces
	var s = this.replace(/^(\s|\&nbsp;|\xA0)+/i, '');
	return     s.replace(/(\s|\&nbsp;|\xA0)+$/i, '');
};

String.prototype.parseHTMLentities = function() {
	var d = document.createElement('div');
	d.innerHTML = this;
	return d.textContent;
};

String.prototype.repeat = function(len) {
	var s = '', i = 0;
	while (i++ < len) {
		s += this;
	}
	return s;
};
String.prototype.zeroPad = function(len) {
	return '0'.repeat(len - this.length) + this;
};
Number.prototype.zeroPad = function(len) {
	return this.toString().zeroPad(len);
};
String.prototype.quotemeta = function() {
	return (this+'').replace(/([\$\(\)\*\+\-\.\/\?\[\\\]\^\{\|\}])/g, '\\$1');
};

var Month_Names = ['January','February','March','April','May','June',
					'July','August','September','October','November','December'];
var Day_Names = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

Date.prototype.format = function(f) {
	// adapted from http://www.codeproject.com/KB/scripting/dateformat.aspx
	if (!this.valueOf() || !f) { return ' '; }
	var d = this;

	//	y{...}y	include stuff between brackets only if current year
	//	Y{...}Y	include stuff between brackets only if not current year
	if (d.getFullYear() == SCRIPT_START_TIME.getFullYear()) {
		f = f.replace(/y\{(.*?)\}y/g, '$1');
		f = f.replace(/Y\{(.*?)\}Y/g, '');
	} else {
		f = f.replace(/y\{(.*?)\}y/g, '');
		f = f.replace(/Y\{(.*?)\}Y/g, '$1');
	}

	//	w{...}w	include stuff between brackets only if within the last week (less than 7 days ago)
	//	W{...}W	include stuff between brackets only if not within the last week
	var oneDay = 1000*60*60*24;
	var RR = Day_Names[d.getDay()];
	var R  = RR.substr(0, 3);
	var delta = Math.ceil((d.getTime() - SCRIPT_START_TIME.getTime()) / oneDay);
	if (Math.abs(delta) < 7) {
		if (delta < -1) {
			RR = 'Last ' + RR;
			R  = 'Last ' + R;
		} else if (delta == -1) {
			RR = R = 'Yesterday';
		} else if (delta === 0) {
			RR = R = 'Today';
		} else if (delta == 1) {
			RR = R = 'Tomorrow';
		} else {
			RR = 'Next ' + RR;
			R  = 'Next ' + R;
		}
		f = f.replace(/w\{(.*?)\}w/g, '$1');
		f = f.replace(/W\{(.*?)\}W/g, '');
	} else {
		f = f.replace(/w\{(.*?)\}w/g, '');
		f = f.replace(/W\{(.*?)\}W/g, '$1');
	}

	// https://developer.mozilla.org/En/Core_JavaScript_1.5_Reference/Global_Objects/String/Replace#Specifying_a_function_as_a_parameter
	return f.replace(/(yyyy|yy|y|MM|M|mm|m|DD|D|RR|R|dd|d|s)/g,
		function (str, m1) {
			switch (m1) {
				case 'yyyy'	:	return d.getFullYear();
				case 'yy'	:	return d.getFullYear().toString().substr(2);
				case 'y'	:	return d.getFullYear().toString().substr(2) - 0;

				case 'MM'	:	return Month_Names[d.getMonth()];
				case 'M'	:	return Month_Names[d.getMonth()].substr(0, 3);

				case 'mm'	:	return (d.getMonth() + 1).zeroPad(2);
				case 'm'	:	return (d.getMonth() + 1);

				case 'DD'	:	return Day_Names[d.getDay()];
				case 'D'	:	return Day_Names[d.getDay()].substr(0, 3);

				case 'RR'	:	return RR;
				case 'R'	:	return R;

				case 'dd'	:	return d.getDate().zeroPad(2);
				case 'd'	:	return d.getDate();
				case 's'	:	return '<sup>' +(d.getDate() % 10 == 1 && d.getDate() !== 11 ? 'st' :
												(d.getDate() % 10 == 2 && d.getDate() !== 12 ? 'nd' :
												(d.getDate() % 10 == 3 && d.getDate() !== 13 ? 'rd' : 'th'))) +
										'</sup>';
			}
		}
	);
};

Array.prototype.duplicates = function() {
	this.sort();
	var dups = [], i, len = this.length - 1;
	for (i=0; i<len; i++ ) {
		if (this[i] == this[i+1]) {
			if (dups.indexOf(this[i]) == -1) {
				dups.push(this[i]);
			}
		}
	}
	return dups;
};

 // Log types and image icons to be counted.
var Img_Files = [];
var Img_Desc = [];
Img_Desc[ 0] = 'Attended';				Img_Files[ 0] = 'icon_attended.gif';
Img_Desc[ 1] = 'Webcam Photo Taken';	Img_Files[ 1] = 'icon_camera.gif';
Img_Desc[ 2] = 'Found';					Img_Files[ 2] = 'icon_smile.gif';
Img_Desc[ 3] = 'Did Not Find';			Img_Files[ 3] = 'icon_sad.gif';
Img_Desc[ 4] = 'Will Attend';			Img_Files[ 4] = 'icon_rsvp.gif';
Img_Desc[ 5] = 'Note';					Img_Files[ 5] = 'icon_note.gif';
Img_Desc[ 6] = 'Review Note';			Img_Files[ 6] = 'big_smile.gif';
Img_Desc[ 7] = 'Retracted';				Img_Files[ 7] = 'icon_redlight.gif';
Img_Desc[ 8] = 'Published';				Img_Files[ 8] = 'icon_greenlight.gif';
Img_Desc[ 9] = 'Disabled';				Img_Files[ 9] = 'icon_disabled.gif';
Img_Desc[10] = 'Enabled';				Img_Files[10] = 'icon_enabled.gif';
Img_Desc[11] = 'Performed Maintenance';	Img_Files[11] = 'icon_maint.gif';
Img_Desc[12] = 'Needs Maintenance';		Img_Files[12] = 'icon_needsmaint.gif';
Img_Desc[13] = 'Needs Archived';		Img_Files[13] = 'icon_remove.gif';
Img_Desc[14] = 'Archived/Unarchived';	Img_Files[14] = 'traffic_cone.gif';
Img_Desc[15] = 'Update Coordinates';	Img_Files[15] = 'coord_update.gif';
Img_Desc[16] = 'Announcement';			Img_Files[16] = 'icon_announcement.gif';

var Icon = {};
Icon.Warning = 'data:image/gif;base64,' +
	'R0lGODlhEAAQAOMPAAgFN0k7RGleI2VigIJ8LqeVLcmoB9/GCeTRNf3WAergB//mBP7zDPb1Lf/+Cf8A' +
	'ACH5BAEAAA8ALAAAAAAQABAAAARn8Mn5Gr23OYW70kRHIYyziZOiCIYTiogLBKeoOMVsvhdyH4CC6dA5' +
	'LBaKgIHBWPAmieNCYFwwiJRq1KBIJJo8RNR7IBgWUYZhcvBGCTP0OIRouw2BgttbkBj+gIGAAgMTA4eI' +
	'iYcPEQA7';

Icon.GrayVIP = 'data:image/gif;base64,' +	// not on list
	'R0lGODlhDwAKAOMKADw8PJeXl7q6usDAwMbGxszMzNLS0tjY2N7e3uTk5P//////////////////////' +
	'/yH5BAEKAA8ALAAAAAAPAAoAAAQ+8IVJK5Up660nAkgIjiAyHcChpix6TIYByPFsG1NRALvOA7zChEAE' +
	'EAlGI3EyaAKag+ezORFYr9hrQGLpbiMAOw==';

Icon.GreenVIP = 'data:image/gif;base64,' +	// VIP
	'R0lGODlhDwAKAOMKAABmAGbMAJnjOqHnRKrrTrLvWLvzYsP3bMz7dtT/f9X/gNX/gNX/gNX/gNX/gNX/' +
	'gCH5BAEKAA8ALAAAAAAPAAoAAAQ+8IVJK5Up660nAkgIjiAyHcChpix6TIYByPFsG1NRALvOA7zChEAE' +
	'EAlGI3EyaAKag+ezORFYr9hrQGLpbiMAOw==';

Icon.BlueVIP = 'data:image/gif;base64,' +	// cache owner
	'R0lGODlhDwAKAOMMAAAyZheK/1Wp/1eq/1+u/2Wx/2u0/3W5/4C+/ovE/5XJ/53N////////////////' +
	'/yH5BAEKAA8ALAAAAAAPAAoAAAQ/8IVJK5Ur662nAkoIjqAyJUCipmyRTggCyPEMDPN0HAC/94DeYWIo' +
	'AoqG47E4ITgBTgIU6pwIrtgsNiCxeLkRADs=';

Icon.RedVIP = 'data:image/gif;base64,' +	// logged-in user
	'R0lGODlhDwAKAOMKAIAAAP8AAP9jY/90dP+Fhf+Wlv+np/+4uP/Jyf/b2//y8v/y8v/y8v/y8v/y8v/y' +
	'8iH5BAEKAA8ALAAAAAAPAAoAAAQ+8IVJK5Up660nAkgIjiAyHcChpix6TIYByPFsG1NRALvOA7zChEAE' +
	'EAlGI3EyaAKag+ezORFYr9hrQGLpbiMAOw==';

Icon.RedDot = 'data:image/gif;base64,' +
	'R0lGODdhAQABAIABAP8AAP///ywAAAAAAQABAAACAkQBADs=';

Icon.Pencil = 'data:image/gif;base64,' +
	'R0lGODlhDgALAKU6AFU9EYdfKIFkLaRiI756GqqJQ7eISb2IScmFQbyNQseMSMWYSdSRRtKWUdiVR9Cd' +
	'Rt+ZQNKbXdiaVNOfZtejY9ilWNW2etuxhdO4dtG3kOe+d+TJVefAi+fLd+3Kbe3QePnHlOvTfu7TefnJ' +
	'kfDTee7UffHUe/LWevXcXvXcX+/SrPXfW/DStPbdbPffY/fhWvbTrvfiW/jiXfnjsvzgxP32wv32xP33' +
	'x//y4P/z5f///////////////////////yH5BAEKAD8ALAAAAAAOAAsAAAZKwJ9wKKxcHsTkT8PKqRRK' +
	'YWjGgdEm0ZKt5aFEoqJbKnaCRDs31MvEiGJqLhnJEbVkNqtPI1rASQgLBlE/AiAjCAODPwABBwmKP0EA' +
	'Ow==';

Icon.Wrench = 'data:image/gif;base64,' +
	'R0lGODlhDQALAKU3AEN50Ul90U1/01GD1VOD1YSEhIWFhYiIiGKN1YmJiY2NjWeT246Ojo+Pj5GRkZKS' +
	'kpSUlJaWlnSb3HWd3ZmZmZubm5ycnHuh33yh3Xyh3p2dnaCgoJWlvIep4Kampo2r3ZGw46OvxLKyspy4' +
	'5rW1taO+6bu7u6W/6anB6sDAwK3E67DH67DH7LLI7MbGxrXK7cnJycvLy9LS0tXV1dbW1uHh4ebm5v//' +
	'/////////////////////////////////yH5BAEKAD8ALAAAAAANAAsAAAZHwJ9wqKlQhkihpSaLJJEk' +
	'G+TRUDx/IpqDkUo8ITEZTOYyJD+hmcmzKSQ7KwzncL2wXiXEdaJqoTIEVwsjJxICV0IDAQCIP0EAOw==';

Icon.CollapseGray = 'data:image/gif;base64,' +
	'R0lGODlhDAAMAOMMAIqvwoywwo6xxJG0xZO1xpa3x5i4yJq6yZ27y5+9zKG+zaTAzqXBz6XBz6XBz6XB' +
	'zyH5BAEAAA8ALAAAAAAMAAwAAAQt8IFJ6wsv6x3E/o8wgNtAkBpRPEXrtqzxGHRNzweaHYj+IAlfQuEj' +
	'Lo7I5CMCADs=';

Icon.CollapseHover = 'data:image/gif;base64,' +
	'R0lGODlhDAAMAIQUAEt6qWCPvXWgy4au14mw2I2z2Y+02pO325S425a53Jm73Zu83p6+36LB4KbD4anG' +
	'4q3J5LHL5b7U6f///6XBz6XBz6XBz6XBz6XBz6XBz6XBz6XBz6XBz6XBz6XBz6XBzyH5BAEAAB8ALAAA' +
	'AAAMAAwAAAVB4BeMZClKaJoiQCBF0NMsyWEI7RvP9Z3DMpoN55oYj0aiBIlUOhoMxaFAGDihUqo194xO' +
	'q0SGYEwmAz6AtHr9CQEAOw==';

Icon.ExpandGray = 'data:image/gif;base64,' +
	'R0lGODlhDAAMAOMMAIqvwoywwo6xxJG0xZO1xpa3x5i4yJq6yZ27y5+9zKG+zaTAzqXBz6XBz6XBz6XB' +
	'zyH5BAEAAA8ALAAAAAAMAAwAAAQ58IFJ6wsv6x3EFp4mDNtAagOxEapGFE8hz3JsPEau5/ixHT7NAbFB' +
	'EDWIxCah1CQUm+gDuqhar48IADs=';

Icon.ExpandHover = 'data:image/gif;base64,' +
	'R0lGODlhDAAMAIQSAEt6qWCPvXWgy4au14mw2I2z2Y+02pO325S425a53J6+36LB4KbD4anG4q3J5LHL' +
	'5b7U6f///6XBz6XBz6XBz6XBz6XBz6XBz6XBz6XBz6XBz6XBz6XBz6XBz6XBz6XBzyH5BAEAAB8ALAAA' +
	'AAAMAAwAAAU+4BeMZClCaJoiQAA9ThNFyWEI7RvP9Z3DMpoN55oZjUTI8ZhkLBSzAmHQfEanVWhESm0p' +
	'BOBwGPABmM/oTwgAOw==';

Icon.Help = 'data:image/png;base64,' +
	'iVBORw0KGgoAAAANSUhEUgAAABIAAAAQCAYAAAAbBi9cAAAABmJLR0QA/wD/AP+gvaeTAAACrUlEQVR4' +
	'2q2TS2hUdxTGf/dmJhESnJhEM8lI0/howAhGsPjAx8YiUmjBoKCNj+LKhQtB14JIKaWbIi50Ib4QUUZw' +
	'o4JSrWJailWDMT6qRqPm4WgmJnPvnXvv/39OF26USRSKZ3vO+fEdzvc5qsrnqMREjeuPopmiukFEN4lq' +
	'WkSwooMictSKnvi2LfX4/XlnPEVXHgTtIrqvqTbR4KjFWguA67pEFnpe+ANWZPu6xdOyE4Iu3fXarciR' +
	'lnSy8m0h4N5zj743HlaUaalyWjOTqameROf9Ec9a2bx15RfZEtC5rtEZInJtTqaicSjvc7E7R0Mqyer5' +
	'jSjKjUd5/ukdZkVLHZm6Si51veq3Vpbt+P6rJ+77aoph1NE8Ndk4MhZy4fYQfiHkh2VN1FSVU1tVwaq2' +
	'esod5Y+eIYbHQuY3pxq9IOwA+ADkF+ONSVfp6h0hKEbEYhkei7h8Z5C//83hAMtb6xgpeNzsfU11VQIv' +
	'iDaOA4oyDsrT3CjGWiIT8XP2Nq4jzPtyCqN+TN+rAtYITwfyJFyXQhBmSt7vByGqYBQiE6KiqMLSOWny' +
	'hZBfT9+iGBkUMI6gjuIFUamPvCB6GVk7K1M9idExHxGDiLDz4HUAbGxABUVpSNcShDF+EL4sOa0QhMf6' +
	'cx5tzVNIOu8W1Qo//biIvVsWYsRgVHDU8nVLPQ+f5fGL0bESkBdEx8929vYnXFi9YDrJhIMxMScv3+fU' +
	'lQfvTCkxqxbOJlnmcvjC3X6/GB8f15Bbfvm93Ygc2fbd3MrYCp3dL+gbzCNGyNSnWNKaIZEoY8/hvzwr' +
	'svnqb+uyE0Zkze5z7VZk39oVsxpammqoKC8DICgauh/nOHS+e0BEt/+5f332o1kD+GbXmZlWdIOIbLJW' +
	'0iKKFRkU1aMieuLGgY5Ph/b/1H9M6pYknjzwKwAAAABJRU5ErkJggg==';

Icon.Logbook = 'data:image/gif;base64,R0lGODlhEAAQAKIGABobAAgICPr7odfZAPH0AAAAAP///wA' +
	'AACH5BAEAAAYALAAAAAAQABAAAANJaBpa/cqUSWtto4y8NXfSQIxkmWHjlAEicYappo6vRm44DdqEOru' +
	'7lo9Xa5VMweOxmBJMnDoUQUCtRmG9gnNy9eC+uJ1lPDEkAAA7';

Icon.GroupEdit	= 'http://www.geocaching.com/images/silk/group_edit.png';
Icon.Single		= 'http://www.geocaching.com/images/silk/user.png';
Icon.Group		= 'http://www.geocaching.com/images/silk/group.png';

var Tooltip = {ShowBadges:	'This option controls whether the VIP badges are shown on each cache log.',
			ShowVIPs:		'Include logs by cachers on your VIP List in the Logs display.',
			ShowMine:		'Highlight your own logs in red.',
			ShowMineAlways:	'Always include your own logs in the VIP Logs display, even if you are not on the VIP List.',
			ShowOwner:		'Highlight the cache owner&rsquo;s logs in green.',
			ShowOwnerAlways:'Always include the cache owner&rsquo;s logs in the VIP Logs display, even if the cache owner is not on the VIP List.',
			ShowMulti:		'Highlight multiple &ldquo;found&rdquo; logs by the same person in bold.',
			ShowMultiAlways:'Always include multiple logs in the VIP Logs display, even if the logger is not on the VIP List.',
			ShowImages:		'Indicate which VIP logs have images with them.',
			ShowImagesAlways:'Always include logs with images in the VIP Logs display, even if the logger is not on the VIP List.',
			AlwaysLoadAllLogs:'Always re-load the page to show all logs. Also re-writes links on other pages to load cache pages with all logs.',
			ShowHelp:		'If there are no VIP logs, show some brief instructions on how to add cachers to the VIP list. ' +
							'These instructions automatically disappear if there are any VIP logs.',
			Position:		'Use this menu to choose where the VIP List will appear.',
			Legend:			'<center><b>VIP Legend</b></center>' +
							'<span class="VIP_log">VIP logs</span><br/>' +
							'<span class="logged_in_user">Your logs</span><br/>' +
							'<span class="cache_owner_log">Cache owner&rsquo;s logs</span><br/>' +
							'<span class="ordinary_log">Other logs</span><br/>' +
							'<span class="multiple_logs">Multiple &ldquo;found&rdquo; logs</span>',
			DateFormatList:	'Specify the format for dates in the logs display.',
			DateFormatLogs:	'Specify the date format on the actual cache logs.',
			DateFormatHide:	'Specify the date format for the cache&rsquo;s hide date.',
			DateFormatHelp:	'<table cellspacing="1" cellpadding="1">' +
							'<tr><th>Token</th><th>Description</th><th>Example</th></tr>' +
							'<tr><td>d</td><td>Day of month.</td><td>1-31</td></tr>' +
							'<tr><td>dd</td><td>Day of month with leading zero.</td><td>01-31</td></tr>' +
							'<tr><td>s</td><td>The date&rsquo;s ordinal suffix.</td><td>st, nd, rd, th</td></tr>' +
							'<tr><td>DD</td><td>Day name.</td><td>Sunday, Monday</td></tr>' +
							'<tr><td>D</td><td>Abbreviated day name.</td><td>Sun, Mon</td></tr>' +
							'<tr><td>RR</td><td>Relative day name.</td><td>Last Tuesday,<br/>Yesterday,<br/>Today</td></tr>' +
							'<tr><td>R</td><td>Abbreviated relative day name.</td><td>Last Tue</td></tr>' +
							'<tr><td>m</td><td>Month number.</td><td>1-12</td></tr>' +
							'<tr><td>mm</td><td>Month number with leading zero.</td><td>01-12</td></tr>' +
							'<tr><td>MM</td><td>Month name.</td><td>January, February</td></tr>' +
							'<tr><td>M</td><td>Abbreviated month name.</td><td>Jan, Feb</td></tr>' +
							'<tr><td>yy</td><td>Two digit year.</td><td>00-99</td></tr>' +
							'<tr><td>yyyy</td><td>Four digit year.</td><td>1999-2010</td></tr>' +
							'<tr><td colspan=3><br/><b>Meta-tokens</b> - These special codes will include any<br/>tokens between their brackets <u>only</u> if &hellip;</td></tr>' +
							'<tr><td>w{&hellip;}w</td><td colspan=2>&hellip; the date is within a week of today&rsquo;s date.</td></tr>' +
							'<tr><td>W{&hellip;}W</td><td colspan=2>&hellip; the date is <u>not</u> within a week of today&rsquo;s date.</td></tr>' +
							'<tr><td>y{&hellip;}y</td><td colspan=2>&hellip; the date is in the current calendar year.</td></tr>' +
							'<tr><td>Y{&hellip;}Y</td><td colspan=2>&hellip; the date is <u>not</u> in the current calendar year.</td></tr>' +

							'<tr><td colspan=3><br/><b>Examples</b><br/>' +
							'M dY{, yy}Y - "Aug 10" if in current year, or "Aug 10, 08" if previous year<br/>' +
							'RR, MM dsY{, yyyy}Y - "Friday, May 25th, 2007" or "Yesterday, April 1st"<br/>' +
							'm/d/yy - short U.S. date format<br/>' +
							'd/m/yy - short euro date format' +
							'</td></tr></table>',
			DateFormatSample:'This is an example of what a date will look like using the above format.',
			ThisCacheFound:	'You %s this %s. Click to scroll to your log.',
			ThisCacheIsMine:'',
			ClickToAdd:		'Click to add %s to the VIP list.',
			ClickToRemove:	'Click to remove %s from the VIP list.',
			AddedToList:	' added to the VIP list.',
			RemovedFromList:' removed from the VIP list.',
			EditListLink:	'Click to edit the VIP list.',
			OptionsLink:	'Click to change the VIP list options.',
			AddLink:		'Click to add a username to the VIP list.',
			AddName:		'Enter a username to add to the VIP list.',
			AlreadyOnList:	' is already on the VIP list.',
			AlreadyAdded:	' has already been added to the VIP list.',
			ClickLogType:	'Click an icon above to scroll to the first log of that type.',
			HeaderIcon:		'Click to scroll to the first VIP log.',
			ClickToScroll:	'Click to scroll to this &ldquo;%s&rdquo; log.',
			PictureFrame:	'Click to show the %s image%s for this log.',
			HowToAdd:		'Add geocachers to the VIP list by clicking on the ' +
							'<span style="white-space:nowrap">' +
							'<img src="' + Icon.GrayVIP + '" title="VIP" /> ' +
							'icon</span> next to their logs.'
			};

Main();

 // ---------------------------------- Functions ---------------------------------- //

function LD_removeStyle(theID) {
	var styleSheet = document.getElementById(theID);
	if (styleSheet) {
		styleSheet.parentNode.removeChild(styleSheet);
	}
}

function LD_addStyle(css, theID) {
	var head = document.getElementsByTagName('head');
	if (!head) { return; }
	var styleSheet = document.createElement('style');
	styleSheet.type = 'text/css';
	try {
		styleSheet.innerHTML = css;
	} catch(err) {
		styleSheet.innerText = css;
	}
	if (theID) {
		LD_removeStyle(theID);	// no duplicate IDs
		styleSheet.id = theID;
		styleSheet.title = theID;
	}
	head[0].appendChild(styleSheet);
}

function LD_disableStyle(theID, mode) {		// true=disable, false=enable
	if (typeof(mode) != 'boolean') { mode = true; }
	var matchType = typeof(theID);
	for (var i=document.styleSheets.length-1; i>=0; i--) {
		if ( document.styleSheets[i].title &&
			((matchType == 'string') && (theID  ==  document.styleSheets[i].title)) ||
			((matchType == 'object') &&  theID.test(document.styleSheets[i].title)) ) {
				document.styleSheets[i].disabled = mode;
		}
	}
}

function LD_enableStyle(theID) {
	LD_disableStyle(theID, false);
}

function Add_Styles() {
	// use !important to force override of other styles
	GM_addStyle('#VIP_table { z-index:85; position:relative; }' +
				'#VIP_table li { text-indent:-20px; padding-left:20px; }' +
				'#VIP_table li.subordinate        { padding-left:40px; }');

	GM_addStyle('.VIP_warning_row { background:#FFFE09 !important; }' +
				'.WidgetBody img  { vertical-align:middle; }' +
				'.CacheDetailNavigationWidget .WidgetBody { padding:0.5em !important; }' +
				'#VIP_options                        { margin-right:0.5em !important; }' +
				'#VIP_original_DateHidden { display:none; }');

	GM_addStyle('#VIP_white { background-color:white;' +
							' left:0; top:0; position:absolute;' +
							' width:2000px; height:2000px; z-index:82; }' +
				'#VIP_black { background-color:black; opacity:0.75;' +
							' left:0; top:0; position:absolute;' +
							' width:2000px; height:2000px; z-index:80; }');


	// styles for the tabs in the options dialog - pure CSS!
	// http://code.google.com/p/css-trees-and-tabs/
	GM_addStyle('#VIP_options > input[type="radio"] { display:none; }' +
				'#VIP_options > input[type="radio"] + label {' +
									' background-color:#EDF1F8; border:1px solid #C0CEE3;' +
									' -moz-border-radius-topleft:5px;' +
									' -moz-border-radius-topright:5px;' +
									' font-weight:bold; font-size:smaller;' +
									' margin:0 0.5em 0 0.5em; padding:0.1em 0.7em 3px 0.7em; }' +
				'#VIP_options > input[type="radio"]:checked + label {' +
									' margin:0 0.3em 0 0.3em; padding:0.3em 0.9em 3px 0.9em;' +
									' background-color:white; border-bottom-color:white; }' +
				'#VIP_options > input[type="radio"]:not(:checked) + label:hover {' +
									' cursor:pointer; background-color:#C0CEE3; }' +
				'#VIP_options > input[type="radio"]:checked + label + .VIP_tab' +
									' { display:block; }' +
				'#VIP_options > .VIP_tab { display:none; float:left; width:100%;' +
										 ' margin-top:3px; margin-bottom:0.3em;' +
										 ' padding:2px; border:1px solid #C0CEE3; }');

	// other styles for the options dialog
	GM_addStyle('#VIP_options input[type="checkbox"]:disabled + label { color:lightgray; }' +
				'#VIP_options select              { font-size:90%; }' +
				'#VIP_options input[type="text"]  { font-size:90%; width:97%; }' +
				'#VIP_options label               { font-weight:normal; }' +
				'#VIP_table button { font-family:Verdana,Tahoma,Arial,sans-serif; font-size:80%; }' +
				'#VIP_date_options li             { text-indent:0; padding-left:0; }');

	// styles for javascript <img> and <span> links
	GM_addStyle('img.link        { cursor:pointer; }' +
				'span.link       { cursor:pointer; color:#003399; font-size:90%;' +
								 ' padding-right:1px; white-space:nowrap; background-color:inherit; }' +
				'span.link:hover { color:#FF6600; text-decoration:underline; }' +
				'span.link > img { vertical-align:text-bottom; background-color:inherit; }');

	// styles for javascript links on the Friends page
	GM_addStyle('#VIP_add_all_friends   { cursor:pointer; white-space:nowrap; margin-right:1em;' +
										' font-size:x-small; font-weight:normal;' +
										' color:#003399; text-decoration:underline; }' +
				'#VIP_add_all_friends:hover { color:#FF6600; text-decoration:none; }' +
				'#VIP_add_all_friends > img { background-color:white; }');

	// styles for editing the VIP list
	GM_addStyle('.VIP_disabled_text { cursor:pointer; color:red;' +
									' background-color:transparent;' +
									' background-image:url(' + Icon.RedDot + ');' +
									' background-repeat:repeat-x;' +
									' background-position:left 60%; }' +
				'.VIP_disabled_text:hover { text-decoration:underline; }' +
				'.VIP_enabled_text        { cursor:pointer; }' +
				'.VIP_enabled_text:hover  { text-decoration:underline; }');

	// VIP list styles for each reason a log is on the list
	GM_addStyle('.ordinary_log    { color:#777777 !important; }' +
				'.VIP_log         { color:#003399 !important; }' +
				'.logged_in_user  { color:maroon !important; }' +
				'.cache_owner_log { color:darkgreen !important; }' +
				'.multiple_logs   { font-weight:bold !important; }');

	// styles for the hide/show cache log buttons
	GM_addStyle('#VIP_collapse_cache_logs, #VIP_expand_cache_logs ' +
					'{ width:12px; height:12px; margin:4px 3px 0 0; float:right; cursor:pointer; }' +
				'#VIP_collapse_cache_logs       { background-image:url(' + Icon.CollapseGray  + '); }' +
				'#VIP_collapse_cache_logs:hover { background-image:url(' + Icon.CollapseHover + '); }' +
				'#VIP_expand_cache_logs         { background-image:url(' + Icon.ExpandGray    + '); }' +
				'#VIP_expand_cache_logs:hover   { background-image:url(' + Icon.ExpandHover   + '); }');

	LD_addStyle('#VIP_cache_logs_table_body > tr            { display:none; }', 'VIP_hide_all_logs');
	LD_addStyle('#VIP_cache_logs_table_body > tr[isVIP]     { display:table-row; }', 'VIP_show_VIP_logs');
	LD_addStyle('#VIP_cache_logs_table_body > tr[multi]     { display:table-row; }', 'VIP_show_multi_logs');
	LD_addStyle('#VIP_cache_logs_table_body > tr[logimages] { display:table-row; }', 'VIP_show_pix_logs');

	LD_disableStyle('VIP_hide_all_logs');

	// add a bottom border to the cache logs rows so when some are hidden there will be a line
	GM_addStyle('table.LogsTable td { border-bottom: 1px solid #D7D7D7; }');

	// tooltip styles - adapted from http://psacake.com/web/jl.asp
	GM_addStyle('#VIP_tooltip       { position:relative; }' +
				'#VIP_tooltip > span{ display:none; z-index:200; white-space:nowrap;' +
									' line-height:normal; padding:2px 4px; text-align:left;' +
									' font-weight:normal; font-size:smaller;' +
									' background:lightyellow; color:black; border:thin solid black; }' +
				'#VIP_tooltip:hover > span { display:block; position:absolute; right:16px; bottom:0; }' +
				'#VIP_tooltip:hover > span#VIP_date_format_help    { bottom:-120px; right:20px; }' +
				'#VIP_tooltip:hover > span#VIP_date_format_help td { border-top:thin solid lightgrey; }');
}

function Debug_Log(str, funcName) {
	if (DEBUG) {
		if (!funcName) {
			funcName = arguments.callee.caller.toString().match(/function\s+([^\s\(]+)/);
			funcName = funcName ? funcName[1] : 'anonymous';
		}
		var now = new Date();
		GM_log(now.toLocaleTimeString().slice(0, -3) + '.' + now.getMilliseconds().zeroPad(3) +
				 ': ' + Page_Name +
				 ': ' + funcName +
				 '(): ' + str);
	}
}

function $() {
	if (arguments.length==1) {
		return document.getElementById(arguments[0]);
	}
	var elements = [];
	for (var i = 0; i < arguments.length; i++) {
		var e = arguments[i];
		if (typeof e == 'string') {
			e = document.getElementById(e);
		}
		elements.push(e);
	}
	return elements;
}

function newElement() {
	if(arguments.length == 1) {
		return document.createTextNode(arguments[0]);
	} else {
		var newNode = document.createElement(arguments[0]),
				 newProperties = arguments[1];
		for (var prop in newProperties) {
			if ((prop.indexOf('on') === 0) && (typeof(newProperties[prop]) == 'function')) {
				newNode.addEventListener(prop.substring(2), newProperties[prop], false);
			} else if (',innerHTML,textContent'.indexOf(','+prop) != -1) {
				newNode[prop] = newProperties[prop];
			} else if ((',checked,disabled,selected'.indexOf(','+prop) != -1) && !newProperties[prop]) {
				// value is false, which browsers do not support, so don't set the property at all
			} else if (/\&/.test(newProperties[prop])) {
				newNode.setAttribute(prop, newProperties[prop].parseHTMLentities());
			} else {
				newNode.setAttribute(prop, newProperties[prop]);
			}
		}
		for(var i=2, len=arguments.length; i<len; i++) {
			newNode.appendChild(arguments[i]);
		}
		return newNode;
	}
}

function firstElementChild(p) {
	if (typeof(p.firstElementChild) != 'undefined') {
		return p.firstElementChild;
	} else {
		var child = p.firstChild;
		while (child && child.nodeType !== 1) {
			child = child.nextSibling;
		}
		return child;
	}
}

function nextElementSibling(p) {
	if (typeof(p.nextElementSibling) != 'undefined') {
		return p.nextElementSibling;
	} else {
		var sibling = p.nextSibling;
		while (sibling && sibling.nodeType !== 1) {
			sibling = sibling.nextSibling;
		}
		return sibling;
	}
}

function previousElementSibling(p) {
	if (typeof(p.previousElementSibling) != 'undefined') {
		return p.previousElementSibling;
	} else {
		var sibling = p.previousSibling;
		while (sibling && sibling.nodeType !== 1) {
			sibling = sibling.previousSibling;
		}
		return sibling;
	}
}

function xPath(expr, context, typ) {
	var result = document.evaluate(	(expr || '//body'),
									(context || document),
									null,
									(typ || XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE),
									null);
	switch (typ) {
		case XPathResult.NUMBER_TYPE: return result.numberValue;
		case XPathResult.STRING_TYPE: return result.stringValue;
		case XPathResult.BOOLEAN_TYPE: return result.booleanValue;
		case XPathResult.ANY_UNORDERED_NODE_TYPE:
		case XPathResult.FIRST_ORDERED_NODE_TYPE: return result.singleNodeValue;
		default: return result;
	}
}

function Get_Offsets(obj) {
	var top = 0, left = 0;
	do {
		top  += obj.offsetTop;
		left += obj.offsetLeft;
	} while ((obj = obj.offsetParent));
	return {top  : top,
			left : left };
}

 // return a node's parent of a certain type. if not found, return null
function Get_Parent(thisNode) {
	if (!thisNode || !thisNode.parentNode) { return thisNode; }
	if (arguments.length < 2) { return thisNode.parentNode; }

	for (var i=1; i < arguments.length; i++) {
		var nodeNameToLookFor = arguments[i].toLowerCase();
		do {
			thisNode = thisNode.parentNode;
		} while (thisNode && (thisNode.nodeName.toLowerCase() !== nodeNameToLookFor));
	}
	return thisNode;
}

function Get_URL_Parameter(fieldName, theUrl) {
	var parts = (theUrl || document.location).toString().split(/[?#]/);
	var queryString = parts[1];

	var re = new RegExp('(^|&)' + fieldName + '=(.*?)(&|$)', 'i');
	if (queryString.match(re)) {
		return RegExp.$2;
	}
	return '';
}

function Reload_Cache_Page_With_All_Logs() {
	var parts = document.location.toString().split(/[?#]/);
	var queryString = parts[1];

	// if already viewing all logs, don't do anything.
	if (queryString.match(/(^|&)log=y(&|$)/i)) { return false; }

	// Remove any existing log parms.
	queryString = queryString.replace(/(^|&)log=.*?(?=&|$)/ig, '');
	queryString = queryString.replace(/^&+/, '');

	// Add all-logs parm to URL and reload page.
	document.location.replace(parts[0] + '?' + queryString + '&log=y' + (parts[2] ? ('#' + parts[2]) : ''));
	return true;
}

function Case_Insensitive_Sort(a, b) {
	var aLow = a.toLowerCase();
	var bLow = b.toLowerCase();
	if (aLow < bLow) { return -1; }
	if (aLow > bLow) { return 1; }
	return 0;
}

function encodeName(str) {
	return encodeURIComponent(str).replace(/%20/g, '+');
}

function decodeName(str) {
	return decodeURIComponent(str.replace(/\+/g, ' '));
}

function List_to_String(arr) {
	return arr.sort(Case_Insensitive_Sort).map(encodeName).join(',');
}

function String_to_List(str) {
	var arr;
	if (str.indexOf('#:#') == -1) {
		return str.split(',').map(decodeName);
	} else {
		return decodeURI(str).split('#:#');		// backwards compatibility
	}
}

function Read_VIP_List(compare) {
	// permanent storage  - data stored in About:Config
	// VIP_Working_List   - global variable used to store working array
	// VIP_Displayed_List - working array is saved here when it is displayed

	// compare = false or undefined
		// read permament storage and save in working array, return true
	// compare = true  - compare Displayed list to permanent storage
		// changed = true - read permament storage and save in working array, return true
		// changed = false - return false

	var storedVal = GM_getValue('VIP_List', '');
	var changed = true;
	if (compare) {
		changed = (List_to_String(VIP_Displayed_List) !== storedVal);
	}
	if (changed) {
		VIP_Working_List = storedVal.length ? String_to_List(storedVal) : [];
	}
	return changed;
}

function Write_VIP_List() {
	// use encodeURI so unicode characters will be saved properly
	GM_setValue('VIP_List', List_to_String(VIP_Working_List));

	// if using FF 3.5 or greater, trigger a storage event
	// which will be caught by other windows and they will update with new data.
	// otherwise set a local value
	var now = new Date().getTime().toString();
	if (USE_STORAGE) {
		window.localStorage.setItem('VIP_Update_Message', now + '\t' + Working_Prefs.AlwaysLoadAllLogs);
	} else {
		GM_setValue('Update_Message', now + '\t' + Working_Prefs.AlwaysLoadAllLogs);
	}
}

function Prefs_Object_to_String(obj) {
	return '' + obj.ShowVIPs	+ obj.ShowHelp +
				obj.ShowMine	+ obj.ShowMineAlways +
				obj.ShowOwner	+ obj.ShowOwnerAlways +
				obj.ShowMulti	+ obj.ShowMultiAlways +
				obj.ShowImages	+ obj.ShowImagesAlways +
				obj.Position	+ obj.ShowBadges +
				obj.AlwaysLoadAllLogs +
				obj.DateFormatList +
				obj.DateFormatLogs + obj.DateFormatHide;
}

function Read_VIP_Prefs(compare) {
	var newPrefs = {
		ShowBadges			: GM_getValue('Show_Badges',		Default_Prefs.ShowBadges),
		ShowHelp			: GM_getValue('Show_Help',			Default_Prefs.ShowHelp),
		ShowVIPs			: GM_getValue('Show_VIPs',			Default_Prefs.ShowVIPs),
		ShowMine			: GM_getValue('Show_Mine',			Default_Prefs.ShowMine),
		ShowMineAlways		: GM_getValue('Show_Mine_Always',	Default_Prefs.ShowMineAlways),
		ShowOwner			: GM_getValue('Show_Owner',			Default_Prefs.ShowOwner),
		ShowOwnerAlways		: GM_getValue('Show_Owner_Always',	Default_Prefs.ShowOwnerAlways),
		ShowMulti			: GM_getValue('Show_Multi',			Default_Prefs.ShowMulti),
		ShowMultiAlways		: GM_getValue('Show_Multi_Always',	Default_Prefs.ShowMultiAlways),
		ShowImages			: GM_getValue('Show_Images',		Default_Prefs.ShowImages),
		ShowImagesAlways	: GM_getValue('Show_Images_Always',	Default_Prefs.ShowImagesAlways),
		AlwaysLoadAllLogs	: GM_getValue('Always_Load_All_Logs',Default_Prefs.AlwaysLoadAllLogs),
		Position			: GM_getValue('Position',			Default_Prefs.Position),
		DateTab				: GM_getValue('Date_Tab',			Default_Prefs.DateTab),
		DateFormatList		: GM_getValue('Date_Format_List',	Default_Prefs.DateFormatList),
		DateFormatLogs		: GM_getValue('Date_Format_Logs',	Default_Prefs.DateFormatLogs),
		DateFormatHide		: GM_getValue('Date_Format_Hidden',	Default_Prefs.DateFormatHide)
	};
	var changed = true;
	if (compare) {
		changed = (Prefs_Object_to_String(Displayed_Prefs) !== Prefs_Object_to_String(newPrefs));
	}
	if (changed) {
		Working_Prefs = newPrefs;
	}
	return changed;
}

function Write_VIP_Prefs() {
	GM_setValue('Show_Badges',			Working_Prefs.ShowBadges);
	GM_setValue('Show_Help',			Working_Prefs.ShowHelp);
	GM_setValue('Show_VIPs',			Working_Prefs.ShowVIPs);
	GM_setValue('Show_Mine',			Working_Prefs.ShowMine);
	GM_setValue('Show_Mine_Always',		Working_Prefs.ShowMineAlways);
	GM_setValue('Show_Owner',			Working_Prefs.ShowOwner);
	GM_setValue('Show_Owner_Always',	Working_Prefs.ShowOwnerAlways);
	GM_setValue('Show_Multi',			Working_Prefs.ShowMulti);
	GM_setValue('Show_Multi_Always',	Working_Prefs.ShowMultiAlways);
	GM_setValue('Show_Images',			Working_Prefs.ShowImages);
	GM_setValue('Show_Images_Always',	Working_Prefs.ShowImagesAlways);
	GM_setValue('Always_Load_All_Logs',	Working_Prefs.AlwaysLoadAllLogs);
	GM_setValue('Position',				Working_Prefs.Position);
	GM_setValue('Date_Tab',				Working_Prefs.DateTab);
	GM_setValue('Date_Format_List',		Working_Prefs.DateFormatList);
	GM_setValue('Date_Format_Logs',		Working_Prefs.DateFormatLogs);
	GM_setValue('Date_Format_Hidden',	Working_Prefs.DateFormatHide);

	// if using FF 3.5 or greater, trigger a storage event
	// which will be caught by other windows and they will update with new data.
	// otherwise set a local value
	var now = new Date().getTime().toString();
	if (USE_STORAGE) {
		window.localStorage.setItem('VIP_Update_Message', now + '\t' + Working_Prefs.AlwaysLoadAllLogs);
	} else {
		GM_setValue('Update_Message', now + '\t' + Working_Prefs.AlwaysLoadAllLogs);
	}
}

function Background_Hide(displayTable) {
	// put a white border around the table
	var liteOverlay = $('VIP_white');
	if (!liteOverlay) {
		liteOverlay = document.createElement('div');
		liteOverlay.id = 'VIP_white';
		document.body.appendChild(liteOverlay);
	}
	var offsets = Get_Offsets(displayTable);
	liteOverlay.style.top	= (offsets.top  - 5) + 'px';
	liteOverlay.style.left	= (offsets.left - 5) + 'px';
	liteOverlay.style.height= (displayTable.offsetHeight + 10) + 'px';
	liteOverlay.style.width	= (displayTable.offsetWidth  + 10) + 'px';
	liteOverlay.style.display= '';

	// gray out everything else around the table and border
	var darkOverlay = $('VIP_black');
	if (!darkOverlay) {
		darkOverlay = document.createElement('div');
		darkOverlay.id = 'VIP_black';
		document.body.appendChild(darkOverlay);
	}
	darkOverlay.style.height  = document.body.scrollHeight + 'px';
	darkOverlay.style.width   = document.body.scrollWidth  + 'px';
	darkOverlay.style.display = '';

	// offsetHeight and offsetWidth: total size of object
	// clientHeight and clientWidth: total size of content area in view
	// scrollHeight and scrollWidth: total size of content, some may not be visible due to scrollbars
}

function Background_Show() {
	$('VIP_black').style.display = 'none';
	$('VIP_white').style.display = 'none';
}

function Count_Visible_Logs() {
	var cacheLogsTable = $('VIP_cache_logs_table_body');
	if (!cacheLogsTable) { return; }
	var totalLogs = parseInt($('NumVisits').textContent.replace(',',''), 10);
	Debug_Log('totalLogs=' + totalLogs);
	var header = 'No Cache Logs';

	if (totalLogs) {
		var visibleLogs = 0;
		for (var i=0; i<cacheLogsTable.rows.length; i++) {
			if (cacheLogsTable.rows[i].offsetHeight > 0) {
				visibleLogs++;
			}
		}
		Debug_Log('visibleLogs=' + visibleLogs);

		if (visibleLogs == totalLogs) {
			header = totalLogs + ' Cache Logs';
		} else {
			header = visibleLogs + ' of ' + totalLogs + ' Cache Logs';
		}
	}

	// replace the Cache Logs title
	$('VIP_cache_logs_header').innerHTML = header;
}

function Show_Log_Row(theID) {
	var newRule = '#VIP_cache_logs_table_body > tr[logid="' + theID + '"] { display:table-row; }',
		i = document.styleSheets.length - 1,
		thisSheet;
	for ( ; i>=0; i--) {
		thisSheet = document.styleSheets[i];
		if (thisSheet.title == 'VIP_show_specific_logs') {
			break;
		}
	}
	if (i >= 0) {
		thisSheet.insertRule(newRule, thisSheet.cssRules.length);
	} else {
		LD_addStyle(newRule, 'VIP_show_specific_logs');
	}
	LD_enableStyle('VIP_show_specific_logs');
}

function Show_and_Navigate() {
	// 'this' is the link that was clicked
	var logID = this.href.split('#')[1];

	if (this.hasAttribute('logtype')) {
		var logType = this.getAttribute('logtype');
		if ((logType >= 0) && (logType < Img_Files.length)) {
			// show all logs of a certain type
			LD_enableStyle('VIP_show_logtype_' + logType);
		} else if (logType == -1) {
			// first hide all logs
			Toggle_Cache_Logs_Table(true);

			// show all VIP logs
			if (Working_Prefs.ShowVIPs) {
				LD_enableStyle('VIP_show_VIP_logs');
			}
			if (Working_Prefs.ShowMine  && Working_Prefs.ShowMineAlways) {
				LD_enableStyle('VIP_show_my_logs');
			}
			if (Working_Prefs.ShowOwner && Working_Prefs.ShowOwnerAlways) {
				LD_enableStyle('VIP_show_CO_logs');
			}
			if (Working_Prefs.ShowMulti && Working_Prefs.ShowMultiAlways) {
				LD_enableStyle('VIP_show_multi_logs');
			}
			if (Working_Prefs.ShowImages && Working_Prefs.ShowImagesAlways) {
				LD_enableStyle('VIP_show_pix_logs');
			}
		}
	} else {
		// show just this one log
		Show_Log_Row(logID);
	}
	Count_Visible_Logs();
//	if (document.location.hash) {		// this may be needed for Opera, doesn't matter on Firefox
//		window.setTimeout(function() {
//			document.location.hash = document.location.hash;
//		}, 10);
//	}
}

function Add_Found_Indicator() {
	// xpath to find new checkmark
	// //a[contains(@href, "log.aspx")]/following-sibling::img[contains(@src, "check.gif")]
	if ($('VIP_goto_my_log')) { return; }	// abort if icon already added

	if (My_Logs.findStatus >= 0) {
		var iconPath = 'http://www.geocaching.com/images/icons/' + Img_Files[My_Logs.findStatus];
		var cacheType = 'cache';
		var cacheNameSpan = $('ctl00_ContentBody_CacheName');
		if (cacheNameSpan) {
			cacheType = firstElementChild(Get_Parent(cacheNameSpan, 'tr').cells[0]).firstChild.alt.toLowerCase();
			cacheType = cacheType.trim()					// remove leading and trailing spaces
								 .replace(/^an?\s*/, '')	// remove leading A or An
								 .replace(/\s{2,}/g, ' ');	// remove double spaces
		}

		var logType = Img_Desc[My_Logs.findStatus].toLowerCase();
		var tip = Tooltip.ThisCacheFound.replace(/%s/, logType).replace(/%s/, cacheType);

		// create the new element
		var statusIcon = newElement('a', {	id      : 'VIP_goto_my_log',
											href    : '#' + My_Logs.findLogID,
											onclick : Show_and_Navigate },
								newElement('img', { src   : iconPath,
													title : tip } ));

		var cacheNameSpan = $('ctl00_ContentBody_CacheName');
		cacheNameSpan.parentNode.appendChild(document.createTextNode(' '));
		cacheNameSpan.parentNode.appendChild(statusIcon);
	}
}

function Add_Owner_Indicator(ownerName) {
	// abort if not my cache or icon already added
	if ((ownerName !== Login_Name) || $('VIP_this_is_my_cache')) { return; }

	// create the new element
	var statusIcon = newElement('img', {id    : 'VIP_this_is_my_cache',
										src   : 'http://www.geocaching.com/images/WptTypes/name_tag.gif',
										title : Tooltip.ThisCacheIsMine });

	var cacheNameSpan = $('ctl00_ContentBody_CacheName');
	cacheNameSpan.parentNode.insertBefore(statusIcon, cacheNameSpan.parentNode.firstChild);
}

function Show_Wait_Cursor() {
	document.body.style.cursor = 'wait';
}

function Hide_Wait_Cursor(ms) {
	window.setTimeout(function () {	document.body.style.cursor = 'default'; }, ms || 10);
}

function Toggle_Cache_Logs_Table(mode) {	// true=collapse, false=show
	if (typeof(mode) != 'boolean') {
		mode = /collapse/i.test(this.id);
	}

	if (mode) {
		LD_enableStyle('VIP_hide_all_logs');
		LD_disableStyle('VIP_show_VIP_logs');
		LD_disableStyle('VIP_show_CO_logs');
		LD_disableStyle('VIP_show_my_logs');
		LD_disableStyle('VIP_show_multi_logs');
		LD_disableStyle('VIP_show_pix_logs');
		LD_disableStyle(/^VIP_show_logtype_/);
		LD_removeStyle('VIP_show_specific_logs');
		Count_Visible_Logs();
	} else {
		Show_Wait_Cursor();
		window.setTimeout(function () { LD_disableStyle('VIP_hide_all_logs');
										Hide_Wait_Cursor(10);
										Count_Visible_Logs();
									}, 10);
	}
}

function Add_Collapse_Button_to_Cache_Logs_Table() {
	var cacheLogsTable = xPath('.//table[contains(@class, "LogsTable")]',
								$('Content'), XPathResult.FIRST_ORDERED_NODE_TYPE);
	if (!cacheLogsTable) { return; }

	// create button to collapse block
	var collapseButtonDiv = newElement('div', { id		: 'VIP_collapse_cache_logs',
												title	: 'Hide all Cache Logs',
												onclick	: Toggle_Cache_Logs_Table });

	// create button to expand block
	var expandButtonDiv = newElement('div', {	id		: 'VIP_expand_cache_logs',
												title	: 'Show all Cache Logs',
												onclick	: Toggle_Cache_Logs_Table });

	var headerSpan = newElement('span', { id : 'VIP_cache_logs_header' },
										newElement('Cache Logs'));

	var headerTH = newElement('th', {},
							expandButtonDiv,
							collapseButtonDiv,
							newElement('img', { src : Icon.Logbook }),
							newElement(' '),
							headerSpan);

	// create a header cell and add expand and collapse buttons to it
	cacheLogsTable.createTHead().insertRow(-1).appendChild(headerTH);

	// delete the empty last row
	cacheLogsTable.deleteRow(-1);

	// give the tBody an ID so other functions can find it quickly
	cacheLogsTable.tBodies[0].id = 'VIP_cache_logs_table_body';

	Count_Visible_Logs();
}

function On_VIP_List(theName, theList, mode) {	// if mode == true return index
	theName = theName.toLowerCase();
	theList = theList || VIP_Working_List;
	var regex = new RegExp('^' + theName.quotemeta() + '$', 'i');
	for (var i=0; i < theList.length; i++) {
		if (regex.test(theList[i])) {
			return mode ? i : true;
		}
	}
	return mode ? -1 : false;
}

function Toggle_VIP_in_List(newVIP, mode) {
	// mode = true				= add only
	// mode = false				= remove only
	// mode = undefined or null	= toggle

	// return value = true		= he's now in the list
	// return value = false		= he's no longer in the list

	// read list first in case it was changed in another window or tab.
	Read_VIP_List();
	var VIPindex = On_VIP_List(newVIP, null, true);
	if (VIPindex >= 0) {
		// he's in the list
		if (mode === true) {
			// add only but he's already here. do nothing.
			return true;
		} else {
			// mode === false (remove) or mode === null (toggle)
			VIP_Working_List.splice(VIPindex, 1);
			Write_VIP_List();
			return false;
		}
	} else {
		// he's NOT in the list
		if (mode === false) {
			// remove only but he's already NOT here. do nothing.
			return false;
		} else {
			// mode === true (add) or mode === null (toggle)
			VIP_Working_List.push(newVIP);
			Write_VIP_List();
			return true;
		}
	}
}

function Toggle_VIP() {		// VIP image clicked.
	var VIPname = this.getAttribute('logowner');
	var iconSrc = Icon.BlueVIP;
	if      (VIPname == Login_Name)  { iconSrc = Icon.RedVIP; }
	else if (VIPname == Cache_Owner) { iconSrc = Icon.GreenVIP; }

	if (Toggle_VIP_in_List(VIPname, null)) {
		this.src = iconSrc;
		window.status = VIPname + Tooltip.AddedToList;
		window.setTimeout(function(){ window.status=''; }, 2000);
	}
	else {
		this.src = Icon.GrayVIP;
		window.status = VIPname + Tooltip.RemovedFromList;
		window.setTimeout(function(){ window.status=''; }, 2000);
	}

	// if not using FF 3.5 or greater, can't trigger a storage event
	// so just force an update of this one window
	if (!USE_STORAGE) {
		Refresh_VIP_Display(true);
	}
}

function Add_or_Remove_Badge(onList, loggedInLog, ownerLog, badgeID, badgeOwner, parentObj, insertBeforeObj) {
	var badge = $(badgeID);
	if (Working_Prefs.ShowBadges) {
		var badgeTitle	= Tooltip.ClickToAdd.replace(/%s/, badgeOwner);
		var badgeSrc	= Icon.GrayVIP;
		if ( onList ) {
			badgeTitle = Tooltip.ClickToRemove.replace(/%s/, badgeOwner);
			if (loggedInLog && Working_Prefs.ShowMine){
				badgeSrc = Icon.RedVIP;
			} else if (ownerLog && Working_Prefs.ShowOwner) {
				badgeSrc = Icon.GreenVIP;
			} else {
				badgeSrc = Icon.BlueVIP;
			}
		}

		if (badge) {
			// change it
			badge.title = badgeTitle;
			badge.src   = badgeSrc;
		} else {
			// add it
			badge = newElement('img', { id      : badgeID,
										title	: badgeTitle,
										src		: badgeSrc,
										logOwner: badgeOwner,
										'class'	: 'link',
										onclick	: Toggle_VIP
									});

			// if insertBeforeObj is null, will act like appendChild
			parentObj.insertBefore(document.createTextNode(' '), insertBeforeObj);
			parentObj.insertBefore(badge, insertBeforeObj);
		}
	}
	else if (badge) {	// ! Working_Prefs.ShowBadges
		// remove it
		badge.parentNode.removeChild(badge);
	}
}

function Change_Hidden_Date_Format() {
	var hideDateFormatted = $('VIP_formatted_DateHidden'),
		hideSecs;
	if (hideDateFormatted) {
		hideSecs = hideDateFormatted.getAttribute('value') - 0;
	} else {
		var cacheOwnerSpan = xPath('.//span[a[contains(@href, "/profile/")]]',
										$('Content'), XPathResult.FIRST_ORDERED_NODE_TYPE),
			hideDateSpan = nextElementSibling(cacheOwnerSpan),
			m = hideDateSpan.firstChild.textContent.indexOf(':');
		if (m < 0) { return; }

		var hideDateOriginal = hideDateSpan.firstChild.splitText(m + 2),
			hideDateText = hideDateOriginal.textContent.trim();
		hideSecs = Date.parse(hideDateText);
		hideDateFormatted = document.createElement('span');
		hideDateFormatted.id = 'VIP_formatted_DateHidden';
		hideDateFormatted.setAttribute('value', hideSecs);
		hideDateFormatted.innerHTML = hideDateText;

		var temp = document.createElement('span');
		temp.id = 'VIP_original_DateHidden';
		temp.innerHTML = hideDateText;

		hideDateSpan.replaceChild(temp, hideDateOriginal);
		hideDateSpan.insertBefore(hideDateFormatted, temp.nextSibling);
	}

	if (!isNaN(hideSecs)) {
		hideDateFormatted.innerHTML = new Date(hideSecs).format(Working_Prefs.DateFormatHide);
	}
}

function Add_All_Friends_to_VIP_List() {
	var friendsPanel =	$('ctl00_ContentBody_pnlMyFriends')   ||	// my friends page
						$('ctl00_ContentBody_pnlPending')     ||	// pending friends page
						$('displayfriends');						// manage friends page
	if (!friendsPanel) { return; }

	var friends = xPath('.//a[@logowner]', friendsPanel, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);

	var total = 0;
	for (var i=0; i < friends.snapshotLength; i++) {
		var friendLink = friends.snapshotItem(i);
		var friendName = friendLink.getAttribute('logowner');

		if (On_VIP_List(friendName)) { continue; }

		VIP_Working_List.push(friendName);

		Add_or_Remove_Badge(true, (friendName == Login_Name), false, friendLink.id + '_VIP',
							friendName,	friendLink.parentNode, friendLink.nextSibling);
		total++;
	}
	Write_VIP_List();
	this.blur();
	var p = '';
	if (this.textContent.match(/Pending/i)) { p = ' pending'; }
	if (total) {
		var s = 's were';
		if (total == 1) { s = ' was'; }
		window.alert(total + p + ' friend' + s + Tooltip.AddedToList);
	} else if (friends.snapshotLength > 0) {
		window.alert('All your' + p + ' friends are already on the VIP List.');
	} else {
		window.alert('You have no' + p + ' friends.');
	}
}

function Add_Badges_to_Friends_List() {
	var friendsPanel =	$('ctl00_ContentBody_pnlMyFriends')   ||	// my friends page
						$('ctl00_ContentBody_pnlPending')     ||	// pending friends page
						$('displayfriends') ||						// manage friends page
						$('ctl00_ContentBody_uxMyFriendsPanel');	// my profile page
	if (!friendsPanel) { return; }

	var whichFriendsPage, xPathSearch, xPathSearch2, pending = '';
	switch (friendsPanel.id) {
		case 'ctl00_ContentBody_pnlMyFriends' :
				whichFriendsPage = 'myfriends';
				xPathSearch  = './/h4/a[contains(@href, ".geocaching.com/profile/?guid=")]';
				xPathSearch2 =   './/h3[contains(text(), "My Friends")]' +
								'|.//h3[contains(text(), "Your Friends")]';
				break;

		case 'ctl00_ContentBody_pnlPending' :
				whichFriendsPage = 'pendingfriends';
				xPathSearch =  './/td/a[contains(@href, ".geocaching.com/profile/?guid=")]';
				xPathSearch2 = './/h3[text()="Pending Friend Requests"]';
				pending = 'pending ';
				break;

		case 'displayfriends' :
				whichFriendsPage = 'managefriends';
				xPathSearch  =   './/h4/a[contains(@href, "/profile/default.aspx?guid=")]';
				xPathSearch2 =   './../..//h3[contains(text(), "My Friends")]' +
								'|./../..//h3[contains(text(), "Your Friends")]';
				break;

		case 'ctl00_ContentBody_uxMyFriendsPanel' :
				whichFriendsPage = 'myaccount';
				xPathSearch = './/p/a[contains(@href, "/profile/default.aspx?guid=")]';
	}

	var friends = xPath(xPathSearch, friendsPanel, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);

	Debug_Log(friends.snapshotLength + ' friends found.');

	for (var i=0 ; i < friends.snapshotLength; i++ ) {
		var friendLink = friends.snapshotItem(i);
		var friendID = friendLink.id || 'friend_' + i;	// create an ID if one doesn't exist (manage friends page)
		if (! friendID.match(/(_lnkName|_uxFriendLink|friend_)/)) { continue; }
		friendID += '_VIP';
		var friendName = friendLink.textContent.trim();
		friendLink.setAttribute('logowner', friendName);	// used to "add all friends to VIP list"
		var onVIPlist = On_VIP_List(friendName);
		Add_or_Remove_Badge(onVIPlist, (friendName == Login_Name), false, friendID, friendName,
							friendLink.parentNode, friendLink.nextSibling);
	}
	if (friends.snapshotLength === 0 || !xPathSearch2) { return; }

	// if we already added the "add all friends" link, we're done.
	if ($('VIP_add_all_friends')) { return; }

	// find a place to add a link to "add all friends to VIP list"
	var friendsHeader = xPath(xPathSearch2, friendsPanel, XPathResult.FIRST_ORDERED_NODE_TYPE);
	if (!friendsHeader) { return; }

	// we found a place to put it, so create the link
	var newSpan = document.createElement('span');
	newSpan.id = 'VIP_add_all_friends';
	newSpan.innerHTML = '<img src="http://www.geocaching.com/images/silk/group.png" ' +
					'align="absmiddle"/>Add all ' + pending + 'friends to the VIP List';
	newSpan.addEventListener('click', Add_All_Friends_to_VIP_List, false);

	// find (or create) the proper place to add the link
	var h3 = friendsHeader;
	var parentObj = h3.parentNode;				// h3.div
	var newTD;
	if (parentObj.nodeName == 'DIV') {			// this script is running first
		var newTable = document.createElement('table');
		newTable.id = 'friendsHeaderTable';
		newTable.style.width = '100%';
		newTable.className = h3.className;
		h3.style.borderBottomStyle = 'none';

		var dest = h3.nextSibling;				// save the insert location
		var newTR = newTable.insertRow(-1);
		newTR.insertCell(-1).appendChild(h3);	// move the h3 element into the new table
		newTD = newTR.insertCell(-1);
		newTD.style.textAlign = 'right';
		newTD.appendChild(newSpan);
		parentObj.insertBefore(newTable, dest);
	} else if (parentObj.nodeName == 'TD') {	// Friends List Enhancement script ran first
		newTD = Get_Parent(h3, 'tr').insertCell(-1);
		newTD.style.textAlign = 'right';
		newTD.appendChild(newSpan);
	}
}

function Add_Badges_to_Favorite_List() {
	var favPanel =	$('ctl00_ContentBody_pnlPremiumMembers') ||
					$('ctl00_ContentBody_pnlUsers');
	var profiles = xPath('.//td/a[contains(@href, "/profile/?guid=")]',
						favPanel, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
	Debug_Log(Page_Name == 'favoritesList' ?
				 profiles.snapshotLength      + ' caches found.' :
				(profiles.snapshotLength / 2) + ' users found.');

	for (var i=0 ; i < profiles.snapshotLength; i++ ) {
		var profileLink = profiles.snapshotItem(i);
		if (profileLink.firstChild.nodeName == 'IMG') { continue; }	// skip avatars
		var profileID = 'VIP_' + Get_URL_Parameter('guid', profileLink.href);
		var profileName = profileLink.textContent.trim();
		var onVIPlist = On_VIP_List(profileName);
		Add_or_Remove_Badge(onVIPlist, (profileName == Login_Name), false, profileID, profileName,
							profileLink.parentNode, profileLink.nextSibling);
	}
}

function Parse_Date(dateString) {
	dateString = dateString.replace(' by ', '').trim();
	if (! dateString.match(/\s\d{4}$/)) {
		dateString += ', ' + SCRIPT_START_TIME.getFullYear();
	}
	var secs = Date.parse(dateString);
	if (isNaN(secs)) {
		return NaN;
	}
	return secs;
}

function Prepare_Logs() {
	// check that we have a logs table to work with
	var logsTable = $('VIP_cache_logs_table_body');
	if (!logsTable) { return; }

	// store the start time
	var startTime = new Date().getTime(), midTime;

	// Execute xpath query to get the list of logs
	var logsList = xPath(
		'./tr/td/strong[img[contains(@src, "/images/icons/")]]',
		logsTable, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);

	if (DEBUG) {
		midTime = new Date().getTime();
		Debug_Log('xpath time: ' + (midTime - startTime));
		Debug_Log('logs found: ' + logsList.snapshotLength);
	}

	// make a first pass to do stuff that never changes
	var logsListLength = logsList.snapshotLength;
	for (var i = 0; i < logsListLength; i++ ) {
		var strongObj = logsList.snapshotItem(i);

		// get the filename part of the image src
		var path = strongObj.childNodes[0].src;
		path = path.substr(path.lastIndexOf('/')+1);

		// extract some information
		var trObj		= Get_Parent(strongObj, 'tr');
		var imgID		= Img_Files.indexOf(path);
		var logDateObj	= strongObj.childNodes[1];	// #text node
		var logDateSecs	= Parse_Date(logDateObj.textContent);
		var logOwnerObj	= strongObj.getElementsByTagName('a')[0];
		var logID		= logOwnerObj.id;
		var logOwner	= logOwnerObj.textContent;
		if (imgID < 0) {
			GM_log('Log icon not recognized: ' + path + ' on log' + logDateObj.textContent + logOwner);
			continue;
		}

		// keep track of all the owners of "found" logs so we can look for multis later
		if ((imgID >= 0) && (imgID <= 2)) {
			Multi_Log_Owners.push(logOwner);
		}

		// put the log date in its own span for ease of changing format
		var logDateSpan = document.createElement('span');
		logDateSpan.setAttribute('value', logDateSecs);
		logDateSpan.innerHTML = logDateObj.textContent;
		strongObj.replaceChild(logDateSpan, logDateObj);

		// mark the very first log date so we can use it as a sample in the options dialog
		if (i === 0) {
			logDateSpan.id = 'VIP_first_log';
		}

		// store link to the first log of this type
		if (!First_Logs[imgID]) {
			First_Logs[imgID] = logID;
		}

		//Set some attributes on the table row for easier filtering
		trObj.setAttribute('logid', logID);
		trObj.setAttribute('logtype', imgID);
		trObj.setAttribute('logowner', logOwner);

		// determine if this log has images
		var logImages = xPath(
			'./table//a[contains(@rel, "tb_images") and img]',
			// look for the "rel" attribute for compatiblity with geothumbs which changes everything else
			strongObj.parentNode,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
		if (logImages.snapshotLength) {
			//Debug_Log(logImages.snapshotLength + ' images found for log' + logDateObj.textContent + logOwner);
			trObj.setAttribute('logimages', logImages.snapshotLength);
			logImages.snapshotItem(0).id = 'VIP_image_' + logID;
		}

		// if the log was entered by the logged-in user, determine whether to add an indicator
		if (logOwner == Login_Name) {

			// if we have NOT already run across one of the "found" type of logs...
			if ((My_Logs.findStatus < 0) || (My_Logs.findStatus > 2)) {

				// have I found the cache?
				if (imgID < 3) {				// found, attended, webcam photo taken
					My_Logs.findStatus = imgID;
					My_Logs.findLogID  = logID;
				}

				// if we have NOT already run across a "DNF" log...
				else if (My_Logs.findStatus != 3) {

					// have I DNF'd the cache?
					if (imgID == 3) {			// DNF
						My_Logs.findStatus = 3;
						My_Logs.findLogID  = logID;
					}
				}
			}
		}
	} // for

	Multi_Log_Owners = Multi_Log_Owners.duplicates();	// get the duplicates

	if (DEBUG) {
		var endTime = new Date().getTime();
		Debug_Log('loop time: ' + (endTime - midTime));
	}
}

function Count_Logs() {
	// check that we have a logs table to work with
	var logsTable = $('VIP_cache_logs_table_body');
	if (!logsTable) { return; }

	// store the start time
	var startTime = new Date().getTime(), midTime;
	Count_Logs_Aborted = false;

	// empty the arrays
	Log_List = [];

	// Execute xpath query to get the list of log images.
	var logsList = xPath(
		'./tr/td/strong[img[contains(@src, "/images/icons/")]]',
		logsTable, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);

	if (DEBUG) {
		midTime = new Date().getTime();
		Debug_Log('xpath time: ' + (midTime - startTime));
		Debug_Log('logs found: ' + logsList.snapshotLength);
	}

	// determine if the log date format needs updating
	var updateLogDates = (Displayed_Prefs.DateFormatLogs != Working_Prefs.DateFormatLogs);

	for (var i = 0; i < logsList.snapshotLength; i++) {
		var now = new Date().getTime();
		if ((now - startTime) > MAX_SCRIPT_TIME) {
			GM_log('Script is running too long. Probably because too many logs. Aborting.');
			Count_Logs_Aborted = true;
			break;
		}

		var strongObj = logsList.snapshotItem(i);

		// get the filename part of the image src
		var path = strongObj.childNodes[0].src;
		path = path.substr(path.lastIndexOf('/')+1);

		// extract some information
		var trObj		= Get_Parent(strongObj, 'tr');
		var imgID		= Img_Files.indexOf(path);
		var logDateSpan	= strongObj.childNodes[1];
		var logDateSecs	= logDateSpan.getAttribute('value') - 0;
		var logOwnerObj	= strongObj.getElementsByTagName('a')[0];
		var logID		= logOwnerObj.id;
		var logOwner	= logOwnerObj.textContent;
		if (imgID < 0) {
			continue;
		}

		// update the log date format
		if (updateLogDates) {
			logDateSpan.innerHTML = ' ' + new Date(logDateSecs).format(Working_Prefs.DateFormatLogs) + ' by ';
		}

		// we already determined if this log has images, so just get those results
		var logHasImages = 0;
		if (Working_Prefs.ShowImages && trObj.hasAttribute('logimages')) {
			logHasImages = trObj.getAttribute('logimages');
		}

		// is this a qualifying log?
		var onVIPlist	= On_VIP_List(logOwner);
		var myLog		= (logOwner == Login_Name);
		var ownerLog	= (logOwner == Cache_Owner);
		var multiLog	= ( (imgID <= 2) && (Multi_Log_Owners.indexOf(logOwner) >= 0) );

		// set an attribute on VIP logs to make it easy to show them later
		if (onVIPlist) {
			trObj.setAttribute('isVIP', '1');
		} else if (trObj.hasAttribute('isVIP')) {
			trObj.removeAttribute('isVIP');
		}

		// set an attribute on multi logs to make it easy to show them later
		if (Working_Prefs.ShowMulti && Working_Prefs.ShowMultiAlways && multiLog) {
			trObj.setAttribute('multi', '1');
		} else if (trObj.hasAttribute('multi')) {
			trObj.removeAttribute('multi');
		}

		// how should this log be highlighted?
		var											  hiliteclass = 'ordinary_log';
		if (onVIPlist)								{ hiliteclass = 'VIP_log'; }
		if (Working_Prefs.ShowOwner && ownerLog)	{ hiliteclass = 'cache_owner_log'; }
		if (Working_Prefs.ShowMine  && myLog)		{ hiliteclass = 'logged_in_user'; }
		if (Working_Prefs.ShowMulti && multiLog)	{ hiliteclass += ' multiple_logs'; }

		// if log is by one of our VIPs, or special case to display, push it on to the array
		if ((Working_Prefs.ShowVIPs   &&									onVIPlist)	||
			(Working_Prefs.ShowImages && Working_Prefs.ShowImagesAlways && logHasImages)||
			(Working_Prefs.ShowOwner  && Working_Prefs.ShowOwnerAlways  && ownerLog)	||
			(Working_Prefs.ShowMine   && Working_Prefs.ShowMineAlways   && myLog)		||
			(Working_Prefs.ShowMulti  && Working_Prefs.ShowMultiAlways  && multiLog) ) {
			Log_List.push(logDateSecs.zeroPad(16) + '\t' +
						logID.zeroPad(12) + '\t' +
						imgID + '\t' + logOwner + '\t' +
						logHasImages + '\t' + hiliteclass);
		}

		// add, update, or remove the image
		Add_or_Remove_Badge(onVIPlist, myLog, ownerLog, 'Toggle_VIP_'+logID, logOwner, strongObj);
	} // for

	if (DEBUG) {
		var endTime = new Date().getTime();
		Debug_Log('loop time: ' + (endTime - midTime));
	}
}

function Determine_Logged_In_User() {
	var loginLogoutLink = $('ctl00_LoginUrl') || $('ctl00_ContentLogin_uxLoginStatus_uxLoginURL');
	Login_Name_Link = loginLogoutLink.parentNode.getElementsByTagName('a')[0];

	// if logged in, Login_Name_Link will be the link to the username
	// if not logged in, Login_Name_Link will be the same as loginLogoutLink
	if (loginLogoutLink != Login_Name_Link) {
		Login_Name = Login_Name_Link.textContent.trim();
		loginLogoutLink.previousSibling.textContent = ' | ';	// replace . with |
		LD_addStyle('#VIP_cache_logs_table_body > tr[logowner="' + Login_Name + '"] { display:table-row; }',
		'VIP_show_my_logs');
	}
}

function Add_Badge_to_Logged_In_User() {
	if (Login_Name) {
		var onVIPlist = On_VIP_List(Login_Name);
		Add_or_Remove_Badge(onVIPlist, true, false, 'Toggle_Logged_In_User',
							Login_Name, Login_Name_Link.parentNode, Login_Name_Link.nextSibling);
	}
}

function Add_Badge_to_Cache_Owner() {
	var cacheOwnerElement = xPath('.//a[contains(@href, "/profile")]',
									$('Content'), XPathResult.FIRST_ORDERED_NODE_TYPE);
	if (cacheOwnerElement && Cache_Owner) {
		var cell = cacheOwnerElement.parentNode,
			onVIPlist = On_VIP_List(Cache_Owner);
		Add_or_Remove_Badge(onVIPlist, (Cache_Owner == Login_Name), true,
							'Toggle_Cache_Owner', Cache_Owner, cell);
	}
}

function Add_Badge_to_Profile_Page() {
	var profileHeader = $('ctl00_ContentBody_lblUserProfile');
	var fields = profileHeader.textContent.split(':');
	if (fields.length > 1) {
		var userName = fields[1].trim();
		var onVIPlist = On_VIP_List(userName);
		Debug_Log(userName + ' is ' + (onVIPlist ? '' : 'not ') + 'on the VIP list.');
		Add_or_Remove_Badge(onVIPlist, (userName == Login_Name), false,
							'toggle_VIP', userName, profileHeader);
	}
}

function Display_Log_Totals() {
	var totals_obj = $('ctl00_ContentBody_lblFindCounts');
	if (!totals_obj.firstChild) { return; }
	var totalsIcons = totals_obj.firstChild.getElementsByTagName('img');

	for (var i=0; i < totalsIcons.length; i++) {
		var thisImage = totalsIcons[i];
		var thisImageFileName = thisImage.src;
		thisImageFileName = thisImageFileName.substr(thisImageFileName.lastIndexOf('/')+1);

		var imgID = Img_Files.indexOf(thisImageFileName);
		if (imgID < 0) { continue; }

		var newAnchor  = newElement('a', {  href	: '#' + First_Logs[imgID],
											logtype : imgID,
											onclick : Show_and_Navigate
										});

		thisImage.parentNode.replaceChild(newAnchor, thisImage);
		newAnchor.appendChild(thisImage);
		newAnchor.nextSibling.insertData(0, ' ');

		// create styles for later un-hiding
		LD_addStyle('#VIP_cache_logs_table_body > tr[logtype="' + imgID + '"] { display:table-row; }',
					'VIP_show_logtype_' + imgID);
		LD_disableStyle('VIP_show_logtype_' + imgID);
	}

	// add instructions
	var newInstructs = newElement('small', { innerHTML : Tooltip.ClickLogType });
	totals_obj.firstChild.appendChild(newElement('br', {}));
	totals_obj.firstChild.appendChild(newInstructs);
}

function Next_Row_Class(init) {
	if (init === true) {			// start over - output ignored
		NextRowClass = 'AlternatingRow';
	} else if (init === false) {	// return same as last
	} else {						// init undefined - toggle
		if (NextRowClass != 'AlternatingRow') {
			NextRowClass = 'AlternatingRow';
		} else {
			NextRowClass = '';
		}
	}
	return NextRowClass;
}

function Swap_Row_Class(obj) {
	var currentClass = obj.className;
	Debug_Log('current: ' + currentClass);
	if (currentClass.match(/AlternatingRow/)) {
		Debug_Log('was Alt');
		obj.className = currentClass.replace(/AlternatingRow/, '').replace(/\s\s/, ' ');
	} else {
		Debug_Log('was not Alt');
		obj.className = currentClass + ' AlternatingRow';
	}
}

function Simulate_Click() {
	var targetID = this.previousSibling.previousSibling.hash.substr(1);
	var evt = document.createEvent('MouseEvents');
	evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	var pic = document.getElementById('VIP_image_' + targetID);
	if (pic) {
		pic.dispatchEvent(evt);
	}
}

function Determine_Table_Position(desiredPoint) {
	var xPathStrings = ['./div[h3[img[contains(@src, "/stockholm/16x16/home.gif")]]]',	// top
						'./p',															// after Nav (before map)
						'./div[img[contains(@src, "/images/attributes/")]]',			// after map (before attributes)
						'./div[h3[img[contains(@src, "/WptTypes/sm/tb_coin.gif")]]]',	// after attributes and ad (before inventory)
						'./div[h3[img[contains(@src, "/stockholm/16x16/pages.gif")]]]'	// after inventory (before bookmarks)
						];
	// Table normally contains Nav, Map, watchers, Facebook, Attributes, advertisement, Inventory, Bookmarks, My Bookmarks

	var oResult = null;
	var navColumnTD = $('ctl00_ContentBody_lnkTravelBugs').parentNode;

	while (!oResult && (desiredPoint < xPathStrings.length)) {
		oResult = xPath(xPathStrings[desiredPoint], navColumnTD, XPathResult.FIRST_ORDERED_NODE_TYPE);
		desiredPoint++;
	}
	return oResult;
}

function Display_VIP_Table(tableType, VIPdiv) {
	// set attributes on main DIV
	VIPdiv.id			= 'VIP_table';
	VIPdiv.className	= 'CacheDetailNavigationWidget ' +
							((Working_Prefs.Position===0) ? 'Reverse' : '') + 'Spacing';

	// is there already a VIP table?
	var oldTable = $('VIP_table');
	var nextSib  = Determine_Table_Position(Working_Prefs.Position);
	var addTable = true;
	if (oldTable && (oldTable.nextSibling == nextSib)) {
		oldTable.parentNode.replaceChild(VIPdiv, oldTable);
		addTable = false;
	}
	else if (oldTable) {
		oldTable.parentNode.removeChild(oldTable);
	}
	oldTable = null;
	if (addTable) {
		// get a reference to the table cell that contains the "Navigation" table, map, inventory, etc.
		var navColumnTD = $('ctl00_ContentBody_lnkTravelBugs').parentNode;

		// insert the new VIP table
		navColumnTD.insertBefore(VIPdiv, nextSib);
	}

	// if options or edit display, gray out the rest of the window
	if (tableType !== 'VIP') {
		Background_Hide(VIPdiv);
	}
}

function Set_Display_Update_Time() {
	var now = new Date().getTime().toString();
	Login_Name_Link.setAttribute('last_display_time', now);
}

function Edit_VIP_List_Toggle_Member() {
	var indexToToggle = this.id.match(/^VIP_toggle_(img|name)_(\d+)$/)[2];
	var img_obj  = $('VIP_toggle_img_'  + indexToToggle);
	var name_obj = $('VIP_toggle_name_' + indexToToggle);
	if (name_obj) {
		if (name_obj.className == 'VIP_enabled_text') {
			name_obj.className	= 'VIP_disabled_text';
			name_obj.title		= 'Click to add ' + VIP_Working_List[indexToToggle];
			img_obj.title		= 'Click to add ' + VIP_Working_List[indexToToggle];
			img_obj.src			= Icon.GrayVIP;
		} else {
			name_obj.className	= 'VIP_enabled_text';
			name_obj.title		= 'Click to remove ' + VIP_Working_List[indexToToggle];
			img_obj.title		= 'Click to remove ' + VIP_Working_List[indexToToggle];
			img_obj.src			= Icon.BlueVIP;
		}
	}
}

function Edit_VIP_List_New_Row(rowName, rowNum, rowClass) {
	return newElement('li', { 'class' : rowClass },
							newElement('img', { title   : 'Click to remove ' + rowName,
												'class'	: 'link',
												src     : Icon.BlueVIP,
												id      : 'VIP_toggle_img_' + rowNum,
												onclick : Edit_VIP_List_Toggle_Member
										}),
							newElement(' '),
							newElement('span', {title   : 'Click to remove ' + rowName,
												'class'	: 'VIP_enabled_text',
												id      : 'VIP_toggle_name_' + rowNum,
												onclick : Edit_VIP_List_Toggle_Member
											},
											newElement(rowName)
										)
						);
}

function Add_VIP_during_Edit() {
	var newName = window.prompt(Tooltip.AddName, '');
	if (newName.length) {
		newName = newName.trim();
	}
	if (newName.length) {
		if (On_VIP_List(newName)) {
			window.alert(newName + Tooltip.AlreadyOnList);
		}
		else if (On_VIP_List(newName, Add_List)) {
			window.alert(newName + Tooltip.AlreadyAdded);
		}
		else {
			Add_List.push(newName);
			var addButton	= $('add_VIP');
			var VIP_table	= $('VIP_table');
			var listParent	= $('VIP_list');
			var nextRow		= addButton.getAttribute('nextrow');

			var newLI = Edit_VIP_List_New_Row(newName, nextRow, Next_Row_Class());
			listParent.appendChild(newLI);
			Background_Hide(VIP_table);

			Swap_Row_Class(addButton.parentNode);

			nextRow++;
			addButton.setAttribute('nextrow', nextRow);
		}
	}
}

function Storage_Event_Trigger() {
	var lastDisplay = Login_Name_Link.getAttribute('last_display_time') || 0,
		updateTrigger = 0;
	if (USE_STORAGE) {
		updateTrigger = window.localStorage.getItem('VIP_Update_Message');
	} else {
		updateTrigger = GM_getValue('Update_Message');
	}

	if (updateTrigger) {
		updateTrigger = updateTrigger.split('\t')[0];
	}

	Debug_Log('updateTrigger = ' + updateTrigger);
	Debug_Log('lastDisplay   = ' + lastDisplay);
	if (updateTrigger > lastDisplay) { Refresh_VIP_Display(); }
}

function Start_Update_Thread() {
	if (USE_STORAGE) {
		document.addEventListener('storage', Storage_Event_Trigger, false);
	} else {
		Timeout_Timer = window.setInterval(Storage_Event_Trigger, 2000);
	}
}

function Stop_Update_Thread() {
	if (USE_STORAGE) {
		document.removeEventListener('storage', Storage_Event_Trigger, false);
	} else {
		window.clearInterval(Timeout_Timer);
	}
}

function Save_VIP_List() {
	VIP_Working_List = [];

	var i = 0;
	var name_obj = $('VIP_toggle_name_' + i);
	while (name_obj ) {
		if (name_obj.className == 'VIP_enabled_text') {
			VIP_Working_List.push(name_obj.textContent);
		}
		i++;
		name_obj = $('VIP_toggle_name_' + i);
	}

	Add_List = [];
	Write_VIP_List();
	Background_Show();
	Refresh_VIP_Display(true);
//	$('VIP_table').scrollIntoView();
	Start_Update_Thread();
}

function Cancel_VIP_Edit() {
	Background_Show();
	Refresh_VIP_Display(true);
//	$('VIP_table').scrollIntoView();
	Start_Update_Thread();
}

function Edit_VIP_List() {
	Stop_Update_Thread();

	Next_Row_Class(true);
	Read_VIP_List();
	VIP_Working_List.sort(Case_Insensitive_Sort);
	Add_List = [];

	// Add names to table body
	var ULbody = newElement('ul', { id : 'VIP_list' });
	for (var i=0; i < VIP_Working_List.length; i++) {
		ULbody.appendChild(Edit_VIP_List_New_Row(VIP_Working_List[i], i, Next_Row_Class()));
	}

	var header = newElement('h3', { 'class' : 'WidgetHeader' },
							newElement('img', { src : Icon.GroupEdit }),
							newElement(' Edit VIP List')
							);

	var footer = newElement('p', {  style	: 'text-align:left; padding-top:0.4em;',
									'class' : 'NoSpacing ' + Next_Row_Class()
								},
							newElement('button', {	id      : 'add_VIP',
													type    : 'button',
													title   : Tooltip.AddLink,
													nextRow : i,
													onclick : Add_VIP_during_Edit
												},
											newElement('Add')
										),
							newElement(' \xA0 \xA0 \xA0'),
							newElement('button', {  id      : 'save_VIP_list',
													type    : 'button',
													onclick : Save_VIP_List
												},
											newElement('Save')
										),
							newElement(' '),
							newElement('button', {  id      : 'cancel_VIP_edit',
													type    : 'button',
													onclick : Cancel_VIP_Edit
												},
											newElement('Cancel')
										)
							);

	var mainDiv = newElement('div', {}, header, newElement('div', { 'class' : 'WidgetBody' }, ULbody, footer));
	Display_VIP_Table('Edit', mainDiv);

	// call one more time so when we add lines they come out right.
	Next_Row_Class();
}

function Save_VIP_Prefs() {
	Working_Prefs = {
		ShowBadges:			$('VIP_show_badges_checkbox').checked,
		ShowHelp:			$('VIP_show_help_checkbox').checked,
		ShowVIPs:			$('VIP_show_VIPs_checkbox').checked,
		ShowMine:			$('VIP_show_mine_checkbox').checked,
		ShowMineAlways:		$('VIP_show_mine_always_checkbox').checked,
		ShowOwner:			$('VIP_show_owner_checkbox').checked,
		ShowOwnerAlways:	$('VIP_show_owner_always_checkbox').checked,
		ShowMulti:			$('VIP_show_multi_checkbox').checked,
		ShowMultiAlways:	$('VIP_show_multi_always_checkbox').checked,
		ShowImages:			$('VIP_show_images_checkbox').checked,
		ShowImagesAlways:	$('VIP_show_images_always_checkbox').checked,
		AlwaysLoadAllLogs:	$('VIP_always_load_all_logs_checkbox').checked,
		Position:			$('VIP_position').value - 0,
		DateTab:			$('VIP_date_tab').checked,
		DateFormatList:		$('VIP_date_format_list').value,
		DateFormatLogs:		$('VIP_date_format_logs').value,
		DateFormatHide:		$('VIP_date_format_hidden').value
	};
	if (!Working_Prefs.DateFormatList.trim()) { Working_Prefs.DateFormatList = Default_Prefs.DateFormatList; }
	if (!Working_Prefs.DateFormatLogs.trim()) { Working_Prefs.DateFormatLogs = Default_Prefs.DateFormatLogs; }
	if (!Working_Prefs.DateFormatHide.trim()) { Working_Prefs.DateFormatHide = Default_Prefs.DateFormatHide; }

	Write_VIP_Prefs();

	// if already showing all logs, function will do nothing.
	if (Working_Prefs.AlwaysLoadAllLogs) {
		Reload_Cache_Page_With_All_Logs();
	}
	Background_Show();

	Refresh_VIP_Display(true);
//	$('VIP_table').scrollIntoView();
	Start_Update_Thread();
}

function Show_Sample_Date(str) {
	var thisID, thisObj, secs;
	if (typeof(str) == 'string') {
		thisID = str;
		thisObj = $(str);
	} else {
		thisID = this.id;
		thisObj = this;
	}
	if (thisID.match(/_list$/) && Log_List[0]) {
		secs = Log_List[0].split('\t')[0] - 0;
	}
	if (!secs && thisID.match(/_logs$/) && $('VIP_first_log')) {
		secs = $('VIP_first_log').getAttribute('value') - 0;
	}
	if (!secs) {
		secs = $('VIP_formatted_DateHidden').getAttribute('value') - 0;
	}
	var dateString = new Date(secs).format(thisObj.value);
	$(thisID + '_sample').innerHTML = dateString;
}

function Edit_VIP_Prefs_Line(	checkboxID, rowClass,
								chek, dis, labelTitle,
								checkboxClick, label) {
	return newElement('li', { 'class' : rowClass },
					newElement('input', {	type    : 'checkbox',
											id      : checkboxID,
											checked : chek,
											disabled : dis,
											onclick	: checkboxClick
								}),
					newElement(' '),
					newElement('label', {	'for'		: checkboxID,
											title		: labelTitle,
											innerHTML	: label
								})
					);
}

function Edit_VIP_Prefs() {
	Stop_Update_Thread();
	Read_VIP_Prefs();

	// create the header
	var header = newElement('h3', { 'class' : 'WidgetHeader' },
							newElement('img', { src : Icon.GroupEdit }),
							newElement(' VIP Options')
							);

	// create the display options tab
	Next_Row_Class(true);
	var ULbody1 = newElement('ul', {});

	ULbody1.appendChild(Edit_VIP_Prefs_Line('VIP_show_VIPs_checkbox', Next_Row_Class(),
			Working_Prefs.ShowVIPs, false, Tooltip.ShowVIPs,
			null, 'Include <span class="VIP_log">VIP logs</span> in list.'));

	ULbody1.appendChild(Edit_VIP_Prefs_Line('VIP_show_mine_checkbox', Next_Row_Class(),
			Working_Prefs.ShowMine, false, Tooltip.ShowMine,
			function(){document.getElementById('VIP_show_mine_always_checkbox').disabled=!this.checked;},
			'<span class="logged_in_user">Highlight</span> your own logs.'));

	ULbody1.appendChild(Edit_VIP_Prefs_Line('VIP_show_mine_always_checkbox',
			'subordinate ' + Next_Row_Class(false),
			Working_Prefs.ShowMineAlways, !Working_Prefs.ShowMine, Tooltip.ShowMineAlways,
			null, 'Include in list even if not a VIP.'));

	ULbody1.appendChild(Edit_VIP_Prefs_Line('VIP_show_owner_checkbox', Next_Row_Class(),
			Working_Prefs.ShowOwner, false, Tooltip.ShowOwner,
			function(){document.getElementById('VIP_show_owner_always_checkbox').disabled=!this.checked;},
			'<span class="cache_owner_log">Highlight</span> the cache&nbsp;owner&rsquo;s&nbsp;logs.'));

	ULbody1.appendChild(Edit_VIP_Prefs_Line('VIP_show_owner_always_checkbox',
			'subordinate ' + Next_Row_Class(false),
			Working_Prefs.ShowOwnerAlways, !Working_Prefs.ShowOwner, Tooltip.ShowOwnerAlways,
			null, 'Include in list even if not a VIP.'));

	ULbody1.appendChild(Edit_VIP_Prefs_Line('VIP_show_multi_checkbox', Next_Row_Class(),
			Working_Prefs.ShowMulti, false, Tooltip.ShowMulti,
			function(){document.getElementById('VIP_show_multi_always_checkbox').disabled=!this.checked;},
			'<span class="multiple_logs">Highlight</span> multiple &ldquo;found&rdquo; logs by the same person.'));

	ULbody1.appendChild(Edit_VIP_Prefs_Line('VIP_show_multi_always_checkbox',
			'subordinate ' + Next_Row_Class(false),
			Working_Prefs.ShowMultiAlways, !Working_Prefs.ShowMulti, Tooltip.ShowMultiAlways,
			null, 'Include in list even if not a VIP.'));

	ULbody1.appendChild(Edit_VIP_Prefs_Line('VIP_show_images_checkbox', Next_Row_Class(),
			Working_Prefs.ShowImages, false, Tooltip.ShowImages,
			function(){document.getElementById('VIP_show_images_always_checkbox').disabled=!this.checked;},
			'Indicate logs that have images.&nbsp;' +
			'<img src="../images/silk/photo.png" style="vertical-align:text-bottom">'));

	ULbody1.appendChild(Edit_VIP_Prefs_Line('VIP_show_images_always_checkbox',
			'subordinate ' + Next_Row_Class(false),
			Working_Prefs.ShowImagesAlways, !Working_Prefs.ShowImages, Tooltip.ShowImagesAlways,
			null, 'Include in list even if not a VIP.'));

	ULbody1.appendChild(Edit_VIP_Prefs_Line('VIP_show_help_checkbox', Next_Row_Class(),
			Working_Prefs.ShowHelp, false, Tooltip.ShowHelp,
			null, 'Show instructions if there are no VIP&nbsp;logs.'));

	ULbody1.appendChild(Edit_VIP_Prefs_Line('VIP_show_badges_checkbox', Next_Row_Class(),
			Working_Prefs.ShowBadges, false, Tooltip.ShowBadges,
			null, 'Show VIP badges.'));

	ULbody1.appendChild(Edit_VIP_Prefs_Line('VIP_always_load_all_logs_checkbox', Next_Row_Class(),
			Working_Prefs.AlwaysLoadAllLogs, false, Tooltip.AlwaysLoadAllLogs,
			null, 'Always load all logs.'));

	// create the date formats tab
	Next_Row_Class(true);
	var ULbody2 = newElement('ul', {});

	ULbody2.appendChild(newElement('li', {	'class' : Next_Row_Class(),
											style	: 'padding-top:0.4em;' },
									newElement('label', {	'for'	: 'VIP_date_format_list',
															title	: Tooltip.DateFormatList },
												newElement('VIP logs date format: ')),
									newElement('input', {	type	: 'text',
															id		: 'VIP_date_format_list',
															value	: Working_Prefs.DateFormatList,
															onchange: Show_Sample_Date,
															onkeyup	: Show_Sample_Date
														}),
									newElement('br', {}),
									newElement('div', {		style	: 'min-height:3em;',
															id		: 'VIP_date_format_list_sample',
															title	: Tooltip.DateFormatSample },
												newElement('&nbsp;'))
						));

	ULbody2.appendChild(newElement('li', {	'class' : Next_Row_Class(),
											style	: 'padding-top:0.4em;' },
									newElement('label', {	'for'	: 'VIP_date_format_logs',
															title	: Tooltip.DateFormatLogs },
												newElement('Cache logs date format: ')),
									newElement('input', {	type	: 'text',
															id		: 'VIP_date_format_logs',
															value	: Working_Prefs.DateFormatLogs,
															onchange: Show_Sample_Date,
															onkeyup	: Show_Sample_Date
														}),
									newElement('br', {}),
									newElement('div', {		style	: 'min-height:3em;',
															id		: 'VIP_date_format_logs_sample',
															title	: Tooltip.DateFormatSample },
												newElement('&nbsp;'))
						));

	ULbody2.appendChild(newElement('li', {  'class' : Next_Row_Class(),
											style	: 'padding-top:0.4em;' },
								newElement('label', {	'for'	: 'VIP_date_format_hidden',
														title	: Tooltip.DateFormatHide },
											newElement('Cache hide date format: ')),
								newElement('input', {	type	: 'text',
														id		: 'VIP_date_format_hidden',
														value	: Working_Prefs.DateFormatHide,
														onchange: Show_Sample_Date,
														onkeyup	: Show_Sample_Date
													}),
								newElement('br', {}),
								newElement('div', {		style	: 'min-height:3em;',
														id		: 'VIP_date_format_hidden_sample',
														title	: Tooltip.DateFormatSample },
											newElement('&nbsp;'))
						));

	ULbody2.appendChild(newElement('li', {	'class'   : Next_Row_Class(),
											style : 'padding-top:1em; padding-bottom:1em;' },
								newElement('span', { id : 'VIP_tooltip' },
											newElement('img',  { src : Icon.Help }),
											newElement('span', { id	 : 'VIP_date_format_help',
																innerHTML : Tooltip.DateFormatHelp })),
								newElement('span', { style : 'font-size:smaller' },
											newElement(' Help with date formats.'))
						));

	var sel = newElement('select', { id : 'VIP_position' });
	var levels = ['Top', 'After Navigation', 'After Map', 'After Attributes', 'After Inventory', 'Bottom'];
	for (var i=0; i<levels.length; i++) {
		sel.appendChild(newElement('option', {	value    : i,
												selected : (Working_Prefs.Position == i) },
									newElement(levels[i])));
	}
	ULbody2.appendChild(newElement('li', {  'class' : Next_Row_Class(),
											style	: 'text-align:center; padding-top:1em;' },
									newElement('label', {	'for' : 'VIP_position',
															title : Tooltip.Position },
												newElement('Position: ')),
									sel));

	// put the two tabs together into the body
	var body = newElement('div', { 'class' : 'WidgetBody' },
						newElement('div', { id : 'VIP_options' },
								newElement('input', {	type	: 'radio',
														id		: 'VIP_display_tab',
														name	: 'VIP_tab',
														checked : 'checked'
													}),
								newElement('label', { 'for' : 'VIP_display_tab' },
											newElement('Display')),
								newElement('div', { id		: 'VIP_display_options',
													'class' : 'VIP_tab' },
											ULbody1),

								newElement('input', {	type    : 'radio',
														id      : 'VIP_date_tab',
														name    : 'VIP_tab'
													}),
								newElement('label', { 'for' : 'VIP_date_tab' },
											newElement('Dates')),
								newElement('div', { id		: 'VIP_date_options',
													'class' : 'VIP_tab' },
											ULbody2)
								)
						);

	// add the footer
	var footer = newElement('p', {  style	: 'text-align:center;',
									'class' : 'NoSpacing ' },
							newElement('button', {  id        : 'save_VIP_prefs',
													type      : 'button',
													onclick   : Save_VIP_Prefs },
										newElement('Save')),
							newElement(' '),
							newElement('button', {  id        : 'cancel_VIP_edit',
													type      : 'button',
													onclick   : Cancel_VIP_Edit },
										newElement('Cancel'))
							);

	body.appendChild(footer);
	var mainDiv = newElement('div', {}, header, body);
	Display_VIP_Table('Edit', mainDiv);

	$('VIP_date_options').style.height = $('VIP_display_options').firstChild.offsetHeight + 'px';
	$('VIP_date_tab').checked = Working_Prefs.DateTab;
	Show_Sample_Date('VIP_date_format_list');
	Show_Sample_Date('VIP_date_format_logs');
	Show_Sample_Date('VIP_date_format_hidden');
//	$('VIP_table').scrollIntoView();
}

function Build_VIP_Log_List_for_Display() {
	// create list of VIP's logs
	Next_Row_Class(true);
	var ULbody = newElement('ul', {}), headerLink, headerText, showHelpIcon, newLI, newImg;
	if (Log_List.length) {
		// Add title indicating total number of logs.
		var s = (Log_List.length == 1) ? '' : 's';
		headerText = Log_List.length + ' VIP Log' + s;
		showHelpIcon = true;

		// Sort users logs in reverse entry order.
		Log_List.sort().reverse();
		for (var i=0; i < Log_List.length; i++) {
			// Extract data fields for each user's log.
			var logFlds		= Log_List[i].split('\t');
			var logSecs		= logFlds[0] - 0;	// log date in seconds since 1970
			var logID		= logFlds[1] - 0;
			var typeID		= logFlds[2] - 0;
			var logOwner	= logFlds[3];
			var logHasImages= logFlds[4] - 0;
			var hiliteclass	= logFlds[5];

			var logHref = '#' + logID;
			if (i === 0) {
				headerLink = logHref;
			}

			// Add data to table.
			var ttip = Tooltip.ClickToScroll.replace(/%s/, Img_Desc[typeID]);
			var dateString = new Date(logSecs).format(Working_Prefs.DateFormatList);

			var newAnchor = newElement('a', {	href	: logHref,
												title	: ttip,
												'class'	: 'lnk' + (hiliteclass ? ' ' + hiliteclass : ''),
												onclick	: Show_and_Navigate
											},
									newElement('img', { src   : '../images/icons/' + Img_Files[typeID],
														style : 'width:16px; height:16px;'
													}),
									newElement(' '),
									newElement('span', {}, newElement(dateString + ' ' + logOwner))
									);

			newLI = newElement('li', { 'class' : Next_Row_Class() }, newAnchor);

			if (logHasImages > 0) {
				s = (logHasImages == 1) ? '' : 's';
				newImg = newElement('img', {src		: '../images/silk/photo' + s + '.png',
											'class' : 'link',
											style	: 'vertical-align:text-bottom;',
											title	: Tooltip.PictureFrame.replace(/%s/, logHasImages)
																		.replace(/%s/, s),
											onclick : Simulate_Click
										});

				newLI.appendChild(newElement(' '));
				newLI.appendChild(newImg);
			}
			ULbody.appendChild(newLI);
		}
	} else {
		headerText = 'No VIP Logs';
		headerLink = '';
		showHelpIcon = false;
		newLI = newElement('li', { 'class' : Next_Row_Class() });
		if (All_Logs_Shown && Working_Prefs.ShowBadges && Working_Prefs.ShowHelp) {
			newLI.innerHTML = Tooltip.HowToAdd;
			newLI.style.paddingLeft = 0;
			newLI.style.textIndent = 0;
		} else {
			newLI.style.height = '3px';
		}
		ULbody.appendChild(newLI);
	}

	// if all logs are not shown, add a warning to the end of the list.
	if (!All_Logs_Shown) {
		newLI = newElement('li', { 'class' : 'VIP_warning_row'
								},
						newElement('img', { src  : Icon.Warning,
											title : 'Warning'
										}),
						newElement(' This list is not complete. '),
						newElement('a', {	'class' : 'lnk',
											href	: More_Logs_URL,
											style	: 'white-space:nowrap;'
										},
								newElement('span', {}, newElement('Load more logs'))
								)
						);
		ULbody.appendChild(newLI);
	}

	// if we aborted because we were taking too long, add a warning to the list.
	if (Count_Logs_Aborted) {
		newLI = newElement('li', { 'class' : 'VIP_warning_row'
								},
						newElement('img', { src   : Icon.Warning,
											title : 'Warning'
										}),
						newElement(' Too many logs.'),
						newElement('br', {}),
						newElement('VIP List truncated.')
						);
		ULbody.appendChild(newLI);
	}

	// build the header
	var header = newElement('h3', { 'class' : 'WidgetHeader' });

	if (showHelpIcon) {
		header.appendChild(	newElement('div',  { id        : 'VIP_tooltip',
												 style     : 'float:right;' },
									newElement('img',  { src       : Icon.Help }),
									newElement('span', { innerHTML : Tooltip.Legend })
									));
	}

	// use an icon that is appropriate for the mode
	newImg = newElement('img', { src : ((Log_List.length == 1) ? Icon.Single : Icon.Group) });

	// if there's a link, wrap it around the icon
	if (headerLink) {
		header.appendChild(newElement('a', { id		: 'VIP_header_link',
											logtype : -1,
											href	: headerLink,
											title	: Tooltip.HeaderIcon,
											onclick : Show_and_Navigate
											},
										newImg
										));
	} else {
		header.appendChild(newImg);
	}
	header.appendChild(newElement(' ' + headerText));

	// build the footer
	var footer = newElement('p', {  style	: 'text-align:right; font-size:90%;',
									'class' : 'NoSpacing'
								},
						newElement('span', {id		: 'edit_VIP_list',
											'class' : 'link',
											title	: Tooltip.EditListLink,
											onclick : Edit_VIP_List
											},
								newElement('img', { src : Icon.Pencil }),
								newElement('Edit List')
									),
						newElement(' '),
						newElement('span', {id		: 'edit_VIP_prefs',
											'class' : 'link',
											title	: Tooltip.OptionsLink,
											onclick : Edit_VIP_Prefs
											},
								newElement('img', { src : Icon.Wrench }),
								newElement('Options')
								)
						);

	return newElement('div', {}, header, newElement('div', { 'class' : 'WidgetBody' }, ULbody), footer);
}

function Refresh_VIP_Display(redraw, force) {
	// if VIP list or prefs changed, recompute and display
	// else if redraw==true then redraw old display
	var changed = force || false, VIPdiv;
	if (Read_VIP_List(true)) {
		if (DEBUG) { Login_Name_Link.style.backgroundColor = 'lightpink'; }
		changed = true;
	} else if (Read_VIP_Prefs(true)) {
		if (DEBUG) { Login_Name_Link.style.backgroundColor = 'yellow'; }
		changed = true;
	} else if (redraw) {
		if (DEBUG) { Login_Name_Link.style.backgroundColor = 'lightgrey'; }
	}

	switch (Page_Name) {
		case 'cache' :			if (changed) {
									Add_Badge_to_Logged_In_User();
									Add_Badge_to_Cache_Owner();
									Change_Hidden_Date_Format();
									Count_Logs();
									VIPdiv = Build_VIP_Log_List_for_Display();
									Display_VIP_Table('VIP', VIPdiv);
									VIP_Displayed_List = VIP_Working_List;
									Displayed_Prefs = Working_Prefs;
									Set_Display_Update_Time();
								} else if (redraw) {
									VIPdiv = Build_VIP_Log_List_for_Display();
									Display_VIP_Table('VIP', VIPdiv);
								}
								break;

		case 'profile':			Add_Badge_to_Logged_In_User();
								Add_Badge_to_Profile_Page();
								VIP_Displayed_List = VIP_Working_List;
								Displayed_Prefs = Working_Prefs;
								Set_Display_Update_Time();
								break;

		case 'friends':			Add_Badge_to_Logged_In_User();
								Add_Badges_to_Friends_List();
								VIP_Displayed_List = VIP_Working_List;
								Displayed_Prefs = Working_Prefs;
								Set_Display_Update_Time();
								break;

		case 'favoritesList':
		case 'favoriteCache':	Add_Badge_to_Logged_In_User();
								Add_Badges_to_Favorite_List();
								VIP_Displayed_List = VIP_Working_List;
								Displayed_Prefs = Working_Prefs;
								Set_Display_Update_Time();
	}

	if (DEBUG) {
		window.setTimeout(function(){
			Login_Name_Link.style.backgroundColor = '';
		}, 300);
	}
}

function Determine_Cache_Owner() {
	// get real name of cache owner
	var hiddenByThisUserLink = $('ctl00_ContentBody_uxFindLinksHiddenByThisUser');
	if (hiddenByThisUserLink) {
		Cache_Owner = decodeName(Get_URL_Parameter('u', hiddenByThisUserLink.href));
		Debug_Log(Cache_Owner);
		Add_Owner_Indicator(Cache_Owner);
		Add_Badge_to_Cache_Owner();
		LD_addStyle('#VIP_cache_logs_table_body > tr[logowner="' + Cache_Owner + '"] { display:table-row; }',
					'VIP_show_CO_logs');
	}
}

function Find_More_Logs_Object() {
	// We don't have much to go on to find this link.
	// All we know is it should be within a <p> and have "log=y" within it's href.
	// Problem is someone could include a similar link in the description or a log.
	// Fortunately one of those would be within a table while the one we want is not.
	var objs = xPath('.//p[a[contains(@href, "log=y")]]', $('Content'), XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE);

	// loop in reverse because the one we want /should/ be near the end of the page.
	for (var i=objs.snapshotLength-1; i>=0; i--) {
		if (Get_Parent(objs.snapshotItem(i), 'table') === null) {
			return objs.snapshotItem(i);
		}
	}

	// if we got here it means the link doesn't exist - already showing all logs.
	return null;
}

function Process_Cache_Page() {
	var findCounts_obj = $('ctl00_ContentBody_lblFindCounts');		// (note)55 (find)23 (DNF)2 ...
	var logWarning_obj = nextElementSibling(findCounts_obj);		// Warning. Spoilers may be included ...
	var numVisits_obj  = previousElementSibling(findCounts_obj);	// xx Logged Visits
	var moreLogs_obj   = Find_More_Logs_Object();					// There are more logs. View them all...
	numVisits_obj.id = 'NumVisits';									// for a prettier url #hash

	Determine_Cache_Owner();

	// See if 'MoreLogs' link is present.
	if (moreLogs_obj) {
		var moreLogsURL_obj = moreLogs_obj.getElementsByTagName('a')[0];

		// save URL without # for use in VIP table
		More_Logs_URL = moreLogsURL_obj.href;

		// Add anchor tag to link, to scroll page at start of logs.
		moreLogsURL_obj.href += '#NumVisits';

		// Copy 'more logs' link above the logs.
		var dupMoreLogs_obj = moreLogs_obj.cloneNode(true);
		logWarning_obj.parentNode.insertBefore(dupMoreLogs_obj, logWarning_obj.nextSibling);
	}

	// Get count of each image type. Build display string.
	Add_Collapse_Button_to_Cache_Logs_Table();
	Change_Hidden_Date_Format();
	Prepare_Logs();
	Count_Logs();

	// Format the list into a table.
	All_Logs_Shown = !moreLogs_obj;
	var mainDiv = Build_VIP_Log_List_for_Display();

	if (!moreLogs_obj) {
		Display_Log_Totals();
	}

	Add_Found_Indicator();
	Display_VIP_Table('VIP', mainDiv);
	VIP_Displayed_List = VIP_Working_List;
	Displayed_Prefs = Working_Prefs;
	Set_Display_Update_Time();

	// create thread to watch for list or pref changes from other windows or tabs
	Start_Update_Thread();

	// Scroll to log anchor.
	if (Page_URL.match(/#NumVisits$/)) {
		document.location = document.location;		// FireFox doesn't need this but Opera does
	}
}

function Check_for_Update(scriptName, scriptVersion) {
	try {
		var checkURL = 'http://www.lildevil.org/greasemonkey/current-versions.txt';
		if (window.opera) {
			// Opera doesn't support cross-domain xmlhttpRequests so use a URL on geocaching.com
			checkURL = 'http://www.geocaching.com/seek/log.aspx?LUID=606117a5-b2d0-4450-8fa1-f7faae43e4be';
		}

		// show version number on http://www.lildevil.org/greasemonkey/versions
		var versObj = document.getElementById(scriptName);
		if (versObj) {
			versObj.innerHTML = scriptVersion;
		}

		// avoid a flood of dialogs e.g. when opening a browser with multiple tabs open
		var now = new Date().getTime();
		var DOSpreventionTime = 2 * 60 * 1000;	// two minutes
		var lastStart = GM_getValue('Update_Start', null);
		GM_setValue('Update_Start', now.toString());
		if (lastStart && (now - lastStart) < DOSpreventionTime) { return; }

		// time to check yet?
		var oneDay = 24 * 60 * 60 * 1000;
		var lastChecked = GM_getValue('Update_Last', null);
		var checkDays = GM_getValue('Update_Days', 1);
		if (lastChecked && (now - lastChecked) < (oneDay * checkDays)) { return; }

		GM_xmlhttpRequest({
			method: 'GET',
			url: checkURL,
			headers: { 'User-Agent' : scriptName + ' v' + scriptVersion + ' auto updater' },
			onload: function(result) {
				var re = new RegExp('[\\s\\>]' + scriptName + '\\s+v([\\d\\.]+)\\s+(\\d+)\\s+(.+?)[\\<\\s]', 'i');
				if (!result.responseText.match(re)) {
					GM_log(scriptName + ': Updater: response unrecognized');
					return;
				}

				var theOtherVersion = RegExp.$1;
				GM_setValue('Update_Days', +RegExp.$2);
				var theOtherURL = RegExp.$3;

				if (theOtherVersion.replace(/\./g, '') <= scriptVersion.replace(/\./g, '')) { return; } // no updates or older version
				if (theOtherURL.indexOf('http') !== 0) { theOtherURL = 'http://' + theOtherURL; }

				if (window.confirm(	'Version ' + theOtherVersion +
									' of the "' + scriptName +
									'" greasemonkey script is available.\n' +
									'You are currently using version ' + scriptVersion +
									'.\n\nClick OK for instructions on how to upgrade.\n')) {
					GM_openInTab(theOtherURL);
				}
			}
		});
		GM_setValue('Update_Last', new Date().getTime().toString());
	}
	catch (err) { }
}

function Main() {
	Add_Styles();
	Next_Row_Class(true);
	Read_VIP_List();
	Read_VIP_Prefs();
	Determine_Logged_In_User();
	Add_Badge_to_Logged_In_User();

	if (Page_URL.match(/\/cache_details\.aspx/i)) {						// CACHE PAGE
		Page_Name = 'cache';
		Process_Cache_Page();
	}
	else if (Page_URL.match(/\/myfriends\.aspx/i) ||					// MY FRIENDS PAGE
			 Page_URL.match(/\/account\/default\.aspx/i) ||				// MY PROFILE PAGE
			 Page_URL.match(/\/account\/ManageFriends\.aspx/i) ) {		// MANAGE FRIENDS PAGE
		Page_Name = 'friends';
		Add_Badges_to_Friends_List();
		VIP_Displayed_List = VIP_Working_List;
		Displayed_Prefs = Working_Prefs;
		Set_Display_Update_Time();
		Start_Update_Thread();
	}
	else if (Page_URL.match(/\/profile/i)) {							// USER PROFILE PAGE
		Page_Name = 'profile';
		Add_Badge_to_Profile_Page();
		VIP_Displayed_List = VIP_Working_List;
		Displayed_Prefs = Working_Prefs;
		Set_Display_Update_Time();
		Start_Update_Thread();
	}
	else if (Page_URL.match(/\/my\/favorites\.aspx/i)) {				// MY FAVORITE LIST
		Page_Name = 'favoritesList';
		Add_Badges_to_Favorite_List();
		VIP_Displayed_List = VIP_Working_List;
		Displayed_Prefs = Working_Prefs;
		Set_Display_Update_Time();
		Start_Update_Thread();
	}
	else if (Page_URL.match(/\/cache_favorited\.aspx/i)) {				// USERS WHO FAVORITED THIS CACHE
		Page_Name = 'favoriteCache';
		Add_Badges_to_Favorite_List();
		VIP_Displayed_List = VIP_Working_List;
		Displayed_Prefs = Working_Prefs;
		Set_Display_Update_Time();
		Start_Update_Thread();
	}
	else {
		Debug_Log('No page match for ' + Page_URL);
	}

	Debug_Log('script run time: ' + (new Date().getTime() - SCRIPT_START_TIME.getTime()));
}
})();
