// ==UserScript==
// @name           Myspace Notifier
// @namespace      http://r4wr.com/userscripts/
// @description    Will notify you of any new mail, friend requests, etc., from anywhere on the 'net.
// @include        *
// ==/UserScript==
//The information above is the original creator of this script.  Myspace made some changes causing this script to no longer work
//This update was created by http://www.myspace.com/_saintjimmy

// Note: You must be logged into myspace for this script to function.
// Using this script might make some internet connections seem slow, this is because
// the myspace homepage is requested every time you load any new page. 

// Configuration Options:
messages 		= true;
messageIcon 		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAKCAIAAADgjEOTAAAABGdBTUEAALGPC/xhBQAAAG5JREFUKFNjZGCY+db1MgNeILxbl+Gtaw4Q/ccNIApA6oBqcCmFy0LVQZR+RwVwzQjz/r3/AkRAPoSBzIYYATUPIvd72z6IUiAJZEMEUdT9uvMMKAckMRko6uCKIErhCMUfRIULOJxBIYQHAdUAAAHfGf49+5glAAAAAElFTkSuQmCC';
friendrequests 		= true;
friendrequestIcon 	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAIAAAD9iXMrAAAABGdBTUEAALGPC/xhBQAAAIRJREFUKFNjZGCYyQADAqs3wdlAxodQP2QuUB0UCaz2/g8DQDZcHGIWuro7n+8AFRNWd+rNCSzqgPqQEVDF8lPbIOqQEQOym4DSQEuB6iBWo7gVom7mmZm4ENQNaOYBHVd7uAriRHTz0NwHVIfFfZjhknYmjahwIVYdxFkEwhklzJCiCgABcekENil0cQAAAABJRU5ErkJggg==';
comments 		= true;
commentIcon 		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAIAAAA21aCOAAAABGdBTUEAALGPC/xhBQAAAHNJREFUKFNjZGCY+W9WBgNewJQ2g+HfLMb/hABQDYnq/r3/ggsBLUMy7+Pt/7gQsro/r0/hQijm/Xu+BxdCtRfZyx9v/368DuQMGAC5Dxx+jMgIJAtWBBcEqgGpQ0bw4ASbgSyFqg5uPJp+dPMg6jAUzQQAG+gufMpufvIAAAAASUVORK5CYII=';
imgcomments 		= true;
imgcommentIcon 		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAIAAAA21aCOAAAABGdBTUEAALGPC/xhBQAAAHlJREFUKFNjfFO+jQEbEOl8jCIMVPcfA4A1z0RBEHXfdp6GIyAXKIiMQBog6n7svA1HEHXIdoCMx6Xu151nEATRBlWH5kKgBBZ1aK6BcH/euA5BUPOQPYXpBqCjcarDEUyo4YTsBngAge1EC08kLkQPTAFudUAVcHUAezgbJ6Cnrq8AAAAASUVORK5CYII=';
blogComments 		= true;
blogCommentIcon 	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAANCAIAAAAWvsgoAAAABGdBTUEAALGPC/xhBQAAAKhJREFUKFNjZGCYyYAKvrW9AwpwVQmhiQO5QKUIdFNI6Ftb+/+ZM4EkmhSK0nfB3kBFENX4lILUpaVBjASqfmNhCEcw48G2I9SlpYHYqACoB+IlqDqgkUAEVPfzxnVkBNSFRSnEPJxKIT4AKgIioG6g0t/b9iEjhKlAHwD9AXE4ROmPNVuREYoD4OEHUYoJEG5FDmrkMIKYB1MHDgFcCFUdXqUQ18MNAgAu2fTNcC0gXQAAAABJRU5ErkJggg==';
blogSubscriptions 	= true;
blogSubscriptionIcon 	= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAIAAAA21aCOAAAABGdBTUEAALGPC/xhBQAAAHNJREFUKFOFkTsSgCAMBWPvbTlHDuDFLC1p1RkcO/BJ/BBE2EnxSHZShI5oYHZUxZiemDm0gHN5mw9/hSWvt5fAGG3lzR8gAbSV59YlLZGkozxrrczSgAyUN0VEBfIUlDfeQHqyhLKXSblXv/R5v/hvDeAcs5Ff7sKAhN8AAAAASUVORK5CYII=';
events 			= true;
eventIcon 		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAIAAAD9iXMrAAAABGdBTUEAALGPC/xhBQAAAGpJREFUKFNjZJj5n4EoAFRHDCJKEcjOmf8JArDbSFL39d9/CAJqQyOBtiHMe//9Hy6Eou7px79ATVhJFHXXPvzHhVDUHX4BcgQaCeQCEVSd2moQCyKEFQFlgWoYIOrwA5A6YAACKfwIqAYAnV1u5iRQ49YAAAAASUVORK5CYII=';
birthdays 		= true;
birthdayIcon 		= 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAAMCAIAAAA21aCOAAAABGdBTUEAALGPC/xhBQAAAG1JREFUKFNjZGCYyQAGu/IjgaTbxOVYuUBBoLqZu/I/ITPQuBCzQIrwI5A6oIrbs/8Dyf9gANcA50JkQeqQVUCUwjXApRDqIEJwdXAuRASkjhgENe/bk79wBNSGzEWYB2RRWx2aq5G5UHuJDGcAA8VSQdEzE9sAAAAASUVORK5CYII=';

show = 0;
/* Don't edit anything below unless you know what you're doing */

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
			friendid=/friendid=(\d+)"/g.exec(response)[1];

			// Fill in applicable notifications
			var html = '';
			
			var msgText=/New Messages/g.exec(response);
			if(messages && /New Messages/g.test(response) && msgText[0] == 'New Messages') {
				html+= '<a href="http://messaging.myspace.com/index.cfm?fuseaction=mail.inbox"><img src="'+messageIcon+'"> New Messages</a><br />';
				show = 1;
			}

			var reqText = /New Friend Request/g.exec(response);
			if(friendrequests && /New Friend Requests/g.test(response) && reqText[0] == 'New Friend Request') {
				html+= '<a href="http://messaging.myspace.com/index.cfm?fuseaction=mail.friendRequests"><img src="'+friendrequestIcon+'"> New Friend Requests</a><br />';
				show = 1;
			}

			var comText=/New Comments/g.exec(response);
			if(comments && /New Comments/g.test(response) && comText[0] == 'New Comments') {
				html+= '<a href="http://comments.myspace.com/index.cfm?fuseaction=user.HomeComments&amp;friendID='+friendid+'"><img src="'+commentIcon+'"> New Comments</a><br />';
				show = 1;
			}

			var imgText = /New Photo Comments/g.exec(response);
			if(imgcomments && /New Photo Comments/g.test(response) && imgText[0] == 'New Photo Comments') {
				html+= '<a href="http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewPictureComments&NewComments=1&friendID='+friendid+'"><img src="'+imgcommentIcon+'"> New Photo Comments</a><br />';
				show = 1;
			}

			var bcomText=/New Blog Comments/g.exec(response);
			if(blogComments && /New Blog Comments/g.test(response) && bcomText[0] == 'New Blog Comments') {
				html+= '<a href="http://blog.myspace.com/index.cfm?fuseaction=blog.controlcenter"><img src="'+blogCommentIcon+'"> New Blog Comments</a><br />';
				show = 1;
			}

			var blogText=/New Blog Subscription Post/g.exec(response);
			if(blogSubscriptions && /New Blog Subscription Post/g.test(response) && blogText[0] == 'show') {
				html+= '<a href="http://blog.myspace.com/index.cfm?fuseaction=blog.controlcenter"><img src="'+blogSubscriptionIcon+'"> New Blog Subscription Posts</a><br />';
				show = 1;
			}
			var eventText=/New Event/g.exec(response);
			if(events && /New Event/g.test(response) && eventText[0] == 'New Event') {
				html+= '<a href="http://messaging.myspace.com/index.cfm?fuseaction=mail.eventInvite"><img src="'+eventIcon+'"> New Event</a><br />';
				show = 1;
			}
			var bdayText=/Birthday/g.exec(response);
			if(birthdays && /Birthday/g.test(response) && bdayText[0] == 'show') {
				html+= '<a href="http://collect.myspace.com/index.cfm?fuseaction=user.birthdays&amp;friendID='+friendid+'"><img src="'+birthdayIcon+'"> New Birthdays</a><br />';
				show = 1;
			}


			if(show) {
				// Create notifier element.
				var notifier = document.createElement('div');
				notifier.setAttribute('id', 'GM_MSNotify');
				document.body.appendChild(notifier);
				
				notifier.innerHTML = html;
				
				// Apply some custom CSS to the notifier element.
				GM_addStyle('#GM_MSNotify {' +
					'display:block!important;' +
					'position:fixed!important;' +
					'bottom:0!important;' +
					'left:0!important;' +
					'z-index:9999!important;' +
					'width:150px!important;' +
					'background-color:#000099 !important;' +
					'opacity:100.0!important;' +
					'text-align:left!important;' +
					'-moz-border-radius:0 10px 0 0!important;' +
					'padding:3px!important;}' +
					'#GM_MSNotify a {' +
					'display:inline!important;' +
					'color:#FFFFFF!important;' +
					'text-decoration:none!important;' +
					'line-height:8px;' +
					'font:bold 10px Tahoma, serif!important;}' +
					'#GM_MSNotify br {display:inline!important}' +
					'#GM_MSNotify img {opacity:1!important;border:none!important}'
				);
			}
		}
	});
}

// Make sure we're not in a frame's body, then execute script.
if(top.location == location) {
	makeRequest();
}