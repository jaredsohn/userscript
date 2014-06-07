// ==UserScript==
// @name           Myspace Notifier Extended
// @namespace      chef_boyardee Edited by Xon
// @description    Will notify you of any new mail, friend requests, etc., from anywhere on the 'net.
// @include        *
// @exclude     http://home.myspace.com/index.cfm?fuseaction=user*
// ==/UserScript==

// Note: You must be logged into myspace for this script to function.
// Using this script might make some internet connections seem slow, this is because
// the myspace homepage is requested every time you load any new page.

// Configuration Options:
//Change the "true"'s to "false" if you don't want to be notified of that certain event.
messages = true;
messageIcon = 'http://i23.photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/mail.png';
friendrequests = true;
friendrequestIcon = 'http://i23.photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/friend.png';
comments = true;
commentIcon = 'http://i23.photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/comment.png';
imgcomments = true;
imgcommentIcon = 'http://i23.photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/camera.png';
blogComments = false;
blogCommentIcon = 'http://i23.photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/blog.png';
blogSubscriptions = false;
blogSubscriptionIcon = 'http://i23.photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/blog.png';
events = true;
eventIcon = 'http://i23.photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/calendar.png';
birthdays = false;
birthdayIcon = 'http://i23.photobucket.com/albums/b384/chef_boyardee_is_awesome/Notifier/birthday.png';

/* Borders */
var borderTop = '';
var borderBottom = '#172959 2px solid';
var borderLeft = '';
var borderRight = '#172959 2px solid';

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

                        var msgText=/id="indicatorMail" class="(\w+)/g.exec(response)[1];
                        if(messages && msgText == 'show') {
                                html+= '<a href="http://mail.myspace.com/index.cfm?fuseaction=mail.inbox" target="_blank"><img src="'+messageIcon+'"> New Messages</a><br />';
                                show = 1;
                        }
                        var reqText=/id="indicatorFriendRequest" class="(\w+)/g.exec(response)[1];
                        if(friendrequests && reqText == 'show') {                                                  target="_blank"
                                html+= '<a href="http://mail.myspace.com/index.cfm?fuseaction=mail.friendRequests"><img src="'+friendrequestIcon+'"> New Friend Requests</a><br />';
                                show = 1;
                        }
                        var comText=/id="indicatorComments" class="(\w+)/g.exec(response)[1];
                        if(comments && comText == 'show') {
                                html+= '<a href="http://comments.myspace.com/index.cfm?fuseaction=user.HomeComments&amp;friendID='+friendid+'" target="_blank"><img src="'+commentIcon+'"> New Comments</a><br />';
                                show = 1;
                        }
                        var imgText=/id="indicatorImageComments" class="(\w+)/g.exec(response)[1];
                        if(imgcomments && imgText == 'show') {
                                html+= '<a href="http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewPicture&amp;friendID='+friendid+'" target="_blank"><img src="'+imgcommentIcon+'"> New Picture Comments</a><br />';
                                show = 1;
                        }
                        var bcomText=/id="indicatorBlogComments" class="(\w+)/g.exec(response)[1];
                        if(blogComments && bcomText == 'show') {
                                html+= '<a href="http://blog.myspace.com/index.cfm?fuseaction=blog.controlcenter" target="_blank"><img src="'+blogCommentIcon+'"> New Blog Comments</a><br />';
                                show = 1;
                        }
                        var blogText=/id="indicatorBlogs" class="(\w+)/g.exec(response)[1];
                        if(blogSubscriptions && blogText == 'show') {
                                html+= '<a href="http://blog.myspace.com/index.cfm?fuseaction=blog.controlcenter" target="_blank"><img src="'+blogSubscriptionIcon+'"> New Blog Subscription Posts</a><br />';
                                show = 1;
                        }
                        var eventText=/id="indicatorEvents" class="(\w+)/g.exec(response)[1];
                        if(events && eventText == 'show') {
                                html+= '<a href="http://mail.myspace.com/index.cfm?fuseaction=mail.eventInvite" target="_blank"><img src="'+eventIcon+'"> New Event Invitation</a><br />';
                                show = 1;
                        }
                        var bdayText=/id="indicatorBirthday" class="(\w+)/g.exec(response)[1];
                        if(birthdays && bdayText == 'show') {
                                html+= '<a href="http://collect.myspace.com/index.cfm?fuseaction=user.birthdays&amp;friendID='+friendid+'" target="_blank"><img src="'+birthdayIcon+'"> New Birthdays</a><br />';
                                show = 1;
                        }

                        if(show) {
                                // Create notifier element.
                                var notifier = document.createElement('div');
                                notifier.setAttribute('id', 'GM_MSNotify');
                                document.body.appendChild(notifier);

                                var closebutton = "http://img296.imageshack.us/img296/1539/crossrb2.png";
                                var close = '<div id="close"><img src='+closebutton+' onClick="document.getElementById(\'GM_MSNotify\').parentNode.removeChild(document.getElementById(\'GM_MSNotify\'))"></div>';

                                notifier.innerHTML = html + close;

                                // Apply some custom CSS to the notifier element.
                                GM_addStyle('#GM_MSNotify {' +
                                        'display:block!important;' +
                                        'position:fixed!important;' +
                                        posVertical + ':0!important;' +
                                        posHorizontal + ':0!important;' +
                                        'z-index:9999!important;' +
                                        'width:130px!important;' +
                                        //Change this value to change the background color;
                                        'background:#254394 url(http://img169.imageshack.us/img169/3491/mspvv3.jpg) no-repeat top left!important;' +
                                        'border-top:' + borderTop + '!important;' +
                                        'border-bottom:' + borderBottom + '!important;' +
                                        'border-left:' + borderLeft + '!important;' +
                                        'border-right:' + borderRight + '!important;' +
                                        'min-height:20px!important;' +
                                        //Don't edit anything else. There's no need to!
                                        'opacity:50.0!important;' +
                                        'filter: alpha(opacity=50);' +
                                        '-moz-opacity: 0.5;' +
                                        'text-align:left!important;' +
                                        '-moz-border-radius-topleft:' + cornerTopLeft + ';' +
                                        '-moz-border-radius-topright:' + cornerTopRight + ';' +
                                        '-moz-border-radius-bottomleft:' + cornerBottomLeft + ';' +
                                        '-moz-border-radius-bottomright:' + cornerBottomRight + ';' +
                                        'padding:25px 5px 5px 5px!important;}' +
                                        '#GM_MSNotify a {' +
                                        'display:inline!important;' +
                                        //Change this value to change the font color;
                                        'color:#FFFFFF!important;' +
                                        //Don't edit anything else. There's no need to!
                                        'text-decoration:none!important;' +
                                        'line-height:8px;' +
                                        'font:bold 10px Century Gothic, serif!important;}' +
                                        '#GM_MSNotify br {display:inline!important}' +
                                        '#GM_MSNotify img {width:12px!important;opacity:1!important;border:none!important}' +
                                        '#GM_MSNotify a:hover {text-decoration:underline!important;}' +
                                        '#GM_MSNotify #close {cursor:pointer;position:absolute!important;top:5px!important;right:5px!important;}'
                                );
                        }
                }
        });
}

// Make sure we're not in a frame's body, then execute script.
if(top.location == location) {
        makeRequest();
}


