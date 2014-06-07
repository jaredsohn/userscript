// ==UserScript==
// @name           Myspace Notifier - Customizable
// @namespace      james butler
// @description    A customizable version of the popular MySpace Notifier.
// @version:       2007/08/18
// @include        *
// @exclude        http://home.myspace.com/*
// @exclude        *txt
// @exclude        *.css
// @exclude        *.js
// ==/UserScript==
//Myspace made some changes causing this script to no longer work
//This update was created by http://www.myspace.com/sean_is_a_bamf
//Rewritten again by james butler

//====================================================================//
// Note: You must be logged into myspace for this script to function. //
//====================================================================//
// Using this script might make some internet connections seem slow, this is because
// the myspace homepage is requested every time you load any new page.

/* Image Options: */
//FYI: If you come accross better images that you'd like to use please feel free to
//use those images instead of these. All you have to do is change the icon url.
New_Messages_Ntfy		= true;
New_Messages_Text 		= 'Messages';
New_Messages_Icon 		= 'http://photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/mail.png';

New_Comments_Ntfy		= true;
New_Comments_Text 		= 'Comments';
New_Comments_Icon 		= 'http://photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/comment.png';

New_ImgComments_Ntfy	= true;
New_ImgComments_Text 	= 'Photo Comments';
New_ImgComments_Icon 	= 'http://photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/camera.png';

New_BlogComments_Ntfy	= true;
New_BlogComments_Text 	= 'Blog Comments';
New_BlogComments_Icon 	= 'http://photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/blog.png';

New_BlogPosts_Ntfy		= true;
New_BlogPosts_Text 		= 'Blog Posts';
New_BlogPosts_Icon 		= 'http://photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/blog.png';

New_Birthdays_Ntfy		= true;
New_Birthdays_Text 		= 'Birthdays';
New_Birthdays_Icon 		= 'http://photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/birthday.png';

New_Friends_Ntfy		= true;
New_Friends_Text 		= 'Friend Adds';
New_Friends_Icon 		= 'http://photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/friend.png';

New_Events_Ntfy			= true;
New_Events_Text 		= 'Event Invites';
New_Events_Icon 		= 'http://photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/calendar.png';


open_new_window			= true;


/*Customizations*/
/* Borders */
var borderTop = '';
var borderBottom = '#000000 2px solid';
var borderLeft = '';
var borderRight = '#000000 2px solid';

/* Corner Radius */
var cornerTopLeft = '0em';
var cornerTopRight = '0em';
var cornerBottomLeft = '0em';
var cornerBottomRight = '.5em';

/* Position */
//Options: top | bottom
var posVertical = "top";
//Options: left | right
var posHorizontal = "left";

/* Image & BG Color */
//BG Color
var bgcolor = "#0a4d08";
//BG Img URL
var imgurl = "http://i18.tinypic.com/4lpb38i.jpg";
//Closer Img URL
var closebutton = "http://i13.tinypic.com/4loozmp.jpg";

/* Font */
//Options: normal | bold | bolder | lighter | 100-900
var fontw = "normal";
//Font Size
var fontsize = "10px"
//Font Face
var fontf = "Times New Roman";
//Font Color
var fontcolor = "#FFFFFF";

/* Text Decorations */
//Options: none | underline | overline | line-through | blink
//Default Text//
var textdeco = "blink";
//Hover//
var hoverdeco = "underline";



//==============================================================//
// Do NOT edit anything below unless you know what you're doing //
//==============================================================//




/***********************\
|* User Script Updates *|
\***********************/
// http://userscripts.org/scripts/show/6365
var SCRIPT = {
	name: "Myspace Notifier - Customizable",
	namespace: "Chef_Boyardee - http://userscripts.org/people/23523",
	description: "Instantly alerts you to new MySpace notifications, from any page on the net.",
	source: "http://userscripts.org/scripts/show/6365",
	identifier: "http://userscripts.org/scripts/show/6365.user.js",
	version: "2007/08/13"
};

function makeRequest() {
	GM_xmlhttpRequest({

	method: 'GET',
	url: 'http://home.myspace.com/index.cfm?fuseaction=user',
	headers: {
		'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',
		'Accept': 'text/xml',
	},
	onload: function(responseDetails) {

		// Store html of the myspace homepage.
		var response = responseDetails.responseText;

		// Retrieve the user's friend identifier.
		RegExp.lastIndex=0;
		var friendid=/friendid=(\d+)/.exec(response)[1];

		// Fill in applicable notifications
		var response = response.match(/New [A-z ]+!/g);
		if (response && response.length >= 1) response = response.join(); else return;

        var newtitle = '<font style="font: '+fontw + ' ' + fontsize + ' ' + fontf+', serif!important; color: '+fontcolor+';">New:</font><br>';
		var html = '';

		if(New_Messages_Ntfy && response.match('New Messages'))
			html+= '<a href="http://messaging.myspace.com/index.cfm?fuseaction=mail.inbox">'
					+ '<img src="'+New_Messages_Icon+'"> '+New_Messages_Text+'</a>\n';

		if(New_Comments_Ntfy && response.match('New Comments'))
			html+= '<a href="http://comments.myspace.com/index.cfm?fuseaction=user.HomeComments&friendID='+friendid+'">'
					+ '<img src="'+New_Comments_Icon+'"> '+New_Comments_Text+'</a>\n';

		if(New_ImgComments_Ntfy && response.match('New Photo Comments'))
			html+= '<a href="http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewPictureComments&NewComments=1&friendID='+friendid+'">'
					+ '<img src="'+New_ImgComments_Icon+'"> '+New_ImgComments_Text+'</a>\n';

		if(New_BlogComments_Ntfy && response.match('New Blog Comments'))
			html+= '<a href="http://blog.myspace.com/index.cfm?fuseaction=blog.controlcenter">'
					+ '<img src="'+New_BlogComments_Icon+'"> '+New_BlogComments_Text+'</a>\n';

		if(New_BlogPosts_Ntfy && response.match('New Blog Subscription Posts'))
			html+= '<a href="http://blog.myspace.com/index.cfm?fuseaction=blog.controlcenter">'
					+ '<img src="'+New_BlogPosts_Icon+'"> '+New_BlogPosts_Text+'</a>\n';

		if(New_Birthdays_Ntfy && response.match('Birthdays'))
			html+= '<a href="http://collect.myspace.com/index.cfm?fuseaction=user.birthdays&friendID='+friendid+'">'
					+ '<img src="'+New_Birthday_Icon+'"> '+New_Birthday_Text+'</a>\n';

		if(New_Friends_Ntfy && response.match('New Friend Requests'))
			html+= '<a href="http://messaging.myspace.com/index.cfm?fuseaction=mail.friendRequests">'
					+ '<img src="'+New_Friends_Icon+'"> '+New_Friends_Text+'</a>\n';

		if(New_Events_Ntfy && response.match('New Events'))
			html+= '<a href="http://messaging.myspace.com/index.cfm?fuseaction=mail.eventInvite">'
					+ '<img src="'+New_Events_Icon+'"> '+New_Events_Text+'</a>\n';


		if(html.length>1) {

			//	Add target to the links
			html = html.replace(/<a href=/g,'<a target="'+(open_new_window == true? '_blank' : '_top' )+'" onclick="this.style.display=\'none!important\';document.getElementById(\'GM_MSNotify\').parentNode.removeChild(document.getElementById(\'GM_MSNotify\'));" href=');

			//	Add blank alts to the images
			html = html.replace(/<img src=/g,'<img alt="" src=');

			// Create notifier element.
			var notifier = document.createElement('div');
			notifier.setAttribute('id', 'GM_MSNotify');
			document.body.appendChild(notifier);

			var close = '<img class="noti_close" src='+closebutton+' alt="X" onclick="document.getElementById(\'GM_MSNotify\').parentNode.removeChild(document.getElementById(\'GM_MSNotify\'));">';

			notifier.innerHTML = newtitle+'<nobr>'+html+'</nobr>' + close;

			// Apply some custom CSS to the notifier element.
			GM_addStyle('#GM_MSNotify {' +
			'display:block!important;' +
			'position:fixed!important;' +
			posVertical + ':0px!important;' +
			posHorizontal + ':0px!important;' +
			'z-index:9999!important;' +
			'width:130px!important;' +
			'background:'+bgcolor+ ' url('+imgurl+') no-repeat top left!important;' +
			'border-top:' + borderTop + '!important;' +
			'border-bottom:' + borderBottom + '!important;' +
			'border-left:' + borderLeft + '!important;' +
			'border-right:' + borderRight + '!important;' +
			'min-height:20px!important;' +
			'opacity:'+opacityLevel+'!important;' +
			'text-align:left!important;' +
			'-moz-border-radius-topleft:' + cornerTopLeft + ';' +
			'-moz-border-radius-topright:' + cornerTopRight + ';' +
			'-moz-border-radius-bottomleft:' + cornerBottomLeft + ';' +
			'-moz-border-radius-bottomright:' + cornerBottomRight + ';' +
			'padding:25px 5px 5px 5px!important;}' +
			'#GM_MSNotify a {' +
			'background:none!important;' +
			'display:block!important;' +
			'color:'+fontcolor+'!important;' +
			'text-decoration:'+textdeco+'!important;' +
			'line-height:8px;' +
			'font: '+fontw + ' ' + fontsize + ' ' + fontf+', serif!important;}' +
			'#GM_MSNotify br {display:inline!important}' +
			'#GM_MSNotify img {width:14px!important;height:14px!important;opacity:1!important;border:none!important;display:inline!important;}' +
			'#GM_MSNotify a:hover {text-decoration:'+hoverdeco+'!important;display:inline!important;}' +
			'#GM_MSNotify .noti_close {width:auto!important;height:auto!important;cursor:pointer;position:absolute!important;top:5px!important;right:5px!important; color: red; font-weight: bold; font-size:14px;}'
			);
		}
	}
	});
}

// Make sure we're not in a frame's body, then execute script.
if(top.location == location) {
	makeRequest();
}
