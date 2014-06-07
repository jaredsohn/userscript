{\rtf1\ansi\ansicpg1252\deff0\deflang1033{\fonttbl{\f0\fnil\fcharset0 Courier New;}{\f1\fswiss\fcharset0 Arial;}}
\viewkind4\uc1\pard\f0\fs20 // ==UserScript==\par
// @name          Ad Slicer for MySpace\par
// @namespace     Adrian232\par
// @description   Removes all the ads, and the space they leave behind.\par
// @source        http://userscripts.org/scripts/show/3890\par
// @identifier    http://userscripts.org/scripts/source/3890.user.js\par
// @creator       Adrian (myspace.com/adrian232)\par
// @version       1.0.14\par
// @date          2008-3-6\par
// @include       http://myspace.com/*\par
// @include       http://*.myspace.com/*\par
// @exclude       http://*myspace.com/\par
// @exclude       http://*myspace.com/index.cfm?fuseaction=splash*\par
// @exclude       http://del.B.myspace.com/*\par
// @exclude       http://deSK.myspace.com/*\par
// ==/UserScript==\par
// Created by Adrian: http://www.myspace.com/adrian232\par
// WARNING: Before you even THINK about changing the line(s) above and reposting this\par
// script as your own, remember that I have put a lot of hard work into this script and\par
// do not appreciate it getting stolen by amateur script writers!\par
// If you have something to add to this script, contact me on MySpace about it. If it's\par
// worthy of putting it in the next release, I will credit you.\par
// DO NOT UNDER ANY CIRCUMSTANCES RE-POST THIS SCRIPT WITHOUT CONTACTING ME FIRST!\par
\par
/***********************\\\par
|* User Script Updates *|\par
\\***********************/\par
// http://userscripts.org/scripts/show/2296\par
var ScriptData =  \{\par
\tab name: "Ad Slicer for MySpace",\par
\tab namespace: "Adrian232",\par
\tab description: "Removes all the ads, and the space they leave behind.",\par
\tab\par
\tab source: "http://userscripts.org/scripts/show/3890",\par
\tab identifier: "http://userscripts.org/scripts/source/3890.user.js",\par
\tab\par
\tab version: "1.0.14",\par
\tab date: Date.parse("March 6, 2008")\par
\};\par
var UpdateChecking = false;\par
window.addEventListener("load", function(e) \{\par
\tab try \{\par
\tab\tab unsafeWindow.UserScriptUpdates.requestAutomaticUpdates(ScriptData);\par
\tab\tab UpdateChecking = true;\par
\tab\} catch(e) \{\par
\tab\tab UpdateChecking = false;\par
\tab\tab GM_log("User Script Updates is not installed. To receive notices of new updates, visit http://userscripts.org/scripts/show/2296");\par
\tab\}\par
\}, false);\par
\par
(function() \{\par
\tab var frames = document.getElementsByTagName('iframe');\par
\tab var scripts = document.getElementsByTagName('script');\par
\tab var images = document.getElementsByTagName('img');\par
\tab var tables = document.getElementsByTagName('table');\par
\tab var divs = document.getElementsByTagName('div');\par
\tab\par
\tab var remove = null, modify = null; // reusable objects\par
\tab\par
\tab var srch = null, header = null, topnav = null;\par
\par
\tab // first, extract them from the new "Home" page\par
\tab remove = document.getElementById('squareAd');\par
\tab if (remove) destroy(remove);\par
\tab remove = document.getElementById('marketingcontent');\par
\tab if (remove) destroyParent(remove);\par
\tab remove = document.getElementById('advert');\par
\tab if (remove) destroy(remove);\par
\tab remove = document.getElementById('ad-wrap');\par
\tab if (remove) destroy(remove);\par
\tab remove = document.getElementById('leaderboardRegion');\par
\tab if (remove) destroy(remove);\par
\tab remove = document.getElementById('tkn_leaderboard');\par
\tab if (remove) destroyParent(remove);\par
\tab remove = document.getElementById('ctl00_Main_ctl00_InfoBar1_pnlAdSpot');\par
\tab //if (remove) destroy(remove);\par
\tab //remove = document.getElementById('googleTLogo');\par
\tab if (remove) destroy(remove);\par
\tab remove = document.getElementById('googleads');\par
\tab if (remove) destroy(remove);\par
\tab remove = document.getElementById('rightlinks');\par
\tab if (remove) destroy(remove);\par
\tab /* // These are handled below\par
\tab remove = document.getElementById('ctl00_Main_ctl00_CMS_ProfileHome_gads');\par
\tab if (remove) destroy(remove);\par
\tab remove = document.getElementById('ctl00_Main_ctl00_CMS_ProfileHome_Gads_A');\par
\tab if (remove) destroy(remove);\par
\tab remove = document.getElementById('ctl00_Main_ctl00_CMS_ProfileHome_Gads');\par
\tab if (remove) destroy(remove);\par
\tab remove = document.getElementById('ctl00_Main_ctl00_ProfileHome_gads');\par
\tab if (remove) destroy(remove);\par
\tab */\par
\tab\par
\tab // resize a few things, just in case it gets stuck\par
\tab topnav = document.getElementById('topnav');\par
\tab srch = document.getElementById('srch');\par
\tab header = document.getElementById('header');\par
\tab if (header && !isPage("videos")) header.style.setProperty('height', '20px', 'important');\par
\tab modify = document.getElementById('home_infoBar');\par
\tab if (modify) modify.style.setProperty('width', '94%', 'important');\par
\tab if (srch && srch.parentNode && !isPage("videos") && !isPage("profile")) \{\par
\tab\tab var newdiv = document.createElement('div');\par
\tab\tab srch.parentNode.replaceChild(newdiv, srch);\par
\tab\tab newdiv.appendChild(srch);\par
\tab\tab srch = newdiv;\par
\tab\tab srch.style.setProperty('margin-left', '-20px', 'important');\par
\tab\tab srch.style.setProperty('margin-top', '-3em', 'important');\par
\tab\} else\par
\tab\tab srch = null;\par
\tab /*\par
\tab modify = document.getElementById('header_search');\par
\tab if (modify && isPage("videos")) \{\par
\tab\tab modify.style.setProperty('backgroundImage', 'none', 'important');\par
\tab\tab modify.style.setProperty('backgroundColor', 'transparent', 'important');\par
\tab\tab modify.style.setProperty('marginLeft', '190px', 'important');\par
\tab\tab modify.style.setProperty('marginTop', '-2em', 'important');\par
\tab\tab //modify.style.setProperty('width', 'auto', 'important');\par
\tab\tab var query = document.getElementById('q');\par
\tab\tab if (query) \{\par
\tab\tab\tab query.style.setProperty('width', '400px', 'important');\par
\tab\tab\}\par
\tab\tab //var submit = document.getElementById('submitBtn');\par
\tab\tab //if (submit) \{\par
\tab\tab //\tab submit.style.setProperty('position', 'relative', 'important');\par
\tab\tab //\tab submit.style.setProperty('left', '1em', 'important');\par
\tab\tab //\}\par
\tab\}\par
\tab */\par
\tab // adjust for profile links select box\par
\tab modify = document.getElementById('profilelinks');\par
\tab if (modify && modify.parentNode && modify.parentNode.id == "googlebar") \{\par
\tab\tab modify.style.setProperty('float', 'left', 'important');\par
\tab\tab modify.style.setProperty('margin-left', '10px', 'important');\par
\tab\tab if (isPage("profile"))\par
\tab\tab\tab modify.style.setProperty('margin-top', '-1.25em', 'important');\par
\tab\tab else\par
\tab\tab\tab modify.style.setProperty('margin-top', '-1.5em', 'important');\par
\tab\tab if (srch) \{\par
\tab\tab\tab var inputs = srch.getElementsByTagName('input');\par
\tab\tab\tab for (var x = 0; x < inputs.length; x++) \{\par
\tab\tab\tab\tab if (inputs[x].id == 'q' || inputs[x].className == "txt") \{\par
\tab\tab\tab\tab\tab inputs[x].style.setProperty('width', '275px', 'important');\par
\tab\tab\tab\tab\tab srch.style.setProperty('margin-left', '80px', 'important');\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\}\par
\par
\tab if (header.offsetWidth < 850) \{\par
\tab\tab for (var y = 0; y < images.length; y++) \{\par
\tab\tab\tab if (images[y].parentNode && (images[y].className == 'googleLogo' || images[y].getAttribute('alt') == 'Powered by Google')) \{\par
\tab\tab\tab\tab google = images[y];\par
\tab\tab\tab\tab // It's just too much hassle to try to manipulate this, so... Destroy!\par
\tab\tab\tab\tab destroy(google);\par
\tab\tab\tab\tab destroyParent(google);\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab google.style.setProperty('width', '0px', 'important');\par
\tab\tab\tab\tab google.style.setProperty('height', '0px', 'important');\par
\tab\tab\tab\tab //google.style.setProperty('marginTop', '-54px', 'important');\par
\tab\tab\tab\tab //googlw.style.setProperty('marginLeft', '54px', 'important');\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab /* re-justify the right-floating links in header */\par
\tab /* This never seemed to work right...\par
\tab if (header) \{\par
\tab\tab //alert('header found!');\par
\tab\tab for (var y = 0; y < header.childNodes.length; y++) \{\par
\tab\tab\tab var t = header.childNodes[y];\par
\tab\tab\tab if (t.style && t.className.match(/right/)) \{\par
\tab\tab\tab\tab t.style['margin-top'] = '-20px';\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\}\par
\tab */\par
\par
\tab // loop thru all SCRIPT tags that load ads\par
\tab for (var y = 0; y < scripts.length; y++) \{\par
\tab\tab var t = scripts[y];\par
\tab\tab\par
\tab\tab var n = scripts[y].nextSibling;\par
\tab\tab // skip over text nodes\par
\tab\tab //for (n = scripts[y].nextSibling; n && n.nodeName == "#text"; n = n.nextSibling);\par
\tab\tab\par
\tab\tab //t.className = "1";\tab // debug\par
\tab\tab /* There are 2 kinds of scripts MySpace uses:\par
\tab\tab  * 1) <script src="blahblah.js"></script> (this one has src defined)\par
\tab\tab  * 2) <script> some.javascript.here(); </script> (this one doesn't)\par
\tab\tab  *\par
\tab\tab  * And then there are Google ads:\par
\tab\tab  * 3) <script src="http://pagead[0-9].googlesyndication.com/..."></script>\par
\tab\tab  */\par
\tab\tab // ignore any of type 2 that don't contain the oas_ad() function\par
\tab\tab if (!t.src && !t.text.match(/(?:oas_ad|sdc_wrapper)\\(/))\par
\tab\tab\tab continue;\par
\tab\tab //t.className = "2";\tab // debug\par
\tab\tab // ignore all valid myspace scripts\par
\tab\tab if (t.src.match(/x\\.myspace\\.com/) ||\par
\tab\tab\tab t.src.match(/x\\.myspacecdn.com/) ||\par
\tab\tab\tab t.src.match(/cache\\.static\\.userplane\\.com/) || // chat script\par
\tab\tab\tab t.src.match(/\\/WebResource.axd/)\par
\tab\tab\tab )\par
\tab\tab\tab continue;\par
\tab\tab //t.className = "3";\tab // debug\par
\tab\tab // if the next sibling is a script, then stop here\par
\tab\tab if (!n || n.nodeName == "SCRIPT")\par
\tab\tab\tab continue;\par
\tab\tab //t.className = "4";\tab // debug\par
\tab\tab // destroy the next sibling\par
\tab\tab destroy(n);\par
\tab\tab destroyParent(t);\par
\tab\tab //t.className = "5";\tab // debug\par
\tab\}\par
\tab\par
\tab // dirty id's\par
\tab for (var y = 0; y < divs.length; y++) \{\par
\tab\tab if (!divs[y].id) continue;\par
\tab\tab if (divs[y].id.match(/_[gG]ads/) || divs[y].id.match(/ad-wrap/))\par
\tab\tab\tab destroy(divs[y]);\par
\tab\tab if (divs[y].id.match(/ad-hdr/) ||\par
\tab\tab\tab (divs[y].firstChild && divs[y].firstChild.nodeType == Node.TEXT_NODE && divs[y].firstChild.nodeValue == "Sponsored Links"))\par
\tab\tab\tab destroyParent(divs[y]);\par
\tab\}\par
\tab\par
\tab // the "advertisement" image is a dead giveaway\par
\tab for (var y = 0; y < images.length; y++) \{\par
\tab\tab if (images[y].src.match(/advertisement/)) \{\par
\tab\tab\tab destroyParent(images[y]);\par
\tab\tab\tab destroy(images[y]);\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab // destroy all frames, JIC\par
\tab for (var y = 0; y < frames.length; y++)\par
\tab\tab destroy(frames[y]);\par
\tab\par
\tab // un-hide special nodes\par
\tab for (y = 0; y < tables.length; y++) \{\par
\tab\tab var t = tables[y];\par
\tab\tab if (t.className == "sidenav") \{\tab // for the side navbar in mail\par
\tab\tab\tab for (var p = t.parentNode; p; p = p.parentNode) \{\par
\tab\tab\tab\tab if (p.nodeName == "TABLE") \{\par
\tab\tab\tab\tab\tab unhide(p);\par
\tab\tab\tab\tab\tab unhide(p.parentNode);\par
\tab\tab\tab\tab\tab if (p.previousSibling) // the blank table before it, too\par
\tab\tab\tab\tab\tab\tab unhide(p.previousSibling.previousSibling);\par
\tab\tab\tab\tab\tab break;\par
\tab\tab\tab\tab\}\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\}\par
\tab\tab\par
\tab // destroy the parent node\par
\tab function destroyParent(node) \{\par
\tab\tab var p = node.parentNode;\par
\tab\tab if (p&& p.id != "content" && // exclusions JIC\par
\tab\tab\tab\tab p.id != "contentWrap" &&\par
\tab\tab\tab\tab p.id != "SplashContentWrap" &&\par
\tab\tab\tab\tab p.id != "photo_wrap" &&\par
\tab\tab\tab\tab p.id != "photo_list" &&\par
\tab\tab\tab\tab p.id != "mainContentBlock" &&\par
\tab\tab\tab\tab p.id != "ctl00_Head1" &&\par
\tab\tab\tab\tab p.id != "header" &&\par
\tab\tab\tab\tab p.id != "main" &&\par
\tab\tab\tab\tab p.id != "body" &&\par
\tab\tab\tab\tab p.id != "nav" &&\par
\tab\tab\tab\tab p.id != "rightRail" &&\par
\tab\tab\tab\tab p.id != "whosOnlineDiv" &&\par
\tab\tab\tab\tab p.id != "srch" &&\par
\tab\tab\tab\tab p.id != "searchmain" &&\par
\tab\tab\tab\tab p.id != "blog_content" &&\par
\tab\tab\tab\tab p.id != "groupsnarrowleft" &&\par
\tab\tab\tab\tab p.id != "books_skinny" &&\par
\tab\tab\tab\tab p.id != "headControls" &&\par
\tab\tab\tab\tab !(isPage("home") && (p.id == "col1" || p.id == "col2" || p.id == "col3")) &&\par
\tab\tab\tab\tab p.id != "aspnetForm" && // form for picture comments\par
\tab\tab\tab\tab p.nodeName != "BODY" && // don't destroy the BODY tag\par
\tab\tab\tab\tab p.parentNode && // or any child of the BODY\par
\tab\tab\tab\tab p.parentNode.nodeName != "BODY" &&\par
\tab\tab\tab\tab p.parentNode.nodeName.id != "body" &&\par
\tab\tab\tab\tab !containsTdText(p))\par
\tab\tab\tab destroy(p);\par
\tab\}\par
\tab\par
\tab // destroy the node and all its children\par
\tab function destroy(node) \{\par
\tab\tab for (var y = 0; y < node.childNodes.length; y++) \{\par
\tab\tab\tab var p = node.childNodes[y];\par
\tab\tab\tab if (p.style)\par
\tab\tab\tab\tab p.style.setProperty('display', 'none', 'important');\par
\tab\tab\}\par
\tab\tab if (node.style)\par
\tab\tab\tab node.style.setProperty('display', 'none', 'important');\par
\tab\}\par
\tab\par
\tab function unhide(node) \{\par
\tab\tab if (node && node.style) \{\par
\tab\tab\tab if (node.nodeName == "TABLE")\par
\tab\tab\tab\tab node.style.setProperty('display', 'table', 'important');\par
\tab\tab\tab else if (node.nodeName == "TD")\par
\tab\tab\tab\tab node.style.setProperty('display', 'table-cell', 'important');\par
\tab\tab\tab else if (node.nodeName == "TR")\par
\tab\tab\tab\tab node.style.setProperty('display', 'table-row', 'important');\par
\tab\tab\tab else\par
\tab\tab\tab\tab node.style.setProperty('display', 'block', 'important');\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab function containsTdText(node) \{\par
\tab\tab if (node) \{\par
\tab\tab\tab cells = node.getElementsByTagName("TD");\par
\tab\tab\tab for (var i = 0; i < cells.length; i++)\par
\tab\tab\tab\tab if (cells[i].className == "text")\par
\tab\tab\tab\tab\tab return true;\par
\tab\tab\tab return false;\par
\tab\tab\}\par
\tab\}\par
\tab\par
\tab function isPage(name) \{\par
\tab\tab if (typeof name == "RegExp") \{\par
\tab\tab\tab search = name;\par
\tab\tab\} else \{\par
\tab\tab\tab if (name == "home")\par
\tab\tab\tab\tab search = /fuseaction=user[^\\.]*$/i;\par
\tab\tab\tab if (name == "videos")\par
\tab\tab\tab\tab search = /^https?:\\/\\/vids\\.myspace\\.com\\//i;\par
\tab\tab\tab if (name == "profile")\par
\tab\tab\tab\tab search = /myspace\\.com\\/([0-9a-zA-Z]+|index\\.cfm\\?fuseaction=user\\.viewprofile[^_]*)$/i;\par
\tab\tab\}\par
\tab\tab if (search && document.location && document.location.href) \{\par
\tab\tab\tab if (document.location.href.match(search))\par
\tab\tab\tab\tab return true;\par
\tab\tab\tab return false;\par
\tab\tab\} else\par
\tab\tab\tab return false;\par
\tab\}\par
\})();\par
// ==UserScript==\par
// @name           Myspace Notifier\par
// @namespace      http://www.myspace.com/iforgotmyemoquote\par
// @description    Will notify you of any new mail, friend requests, etc., from anywhere on the 'net.\par
// @include        *\par
// ==/UserScript==\par
\par
// Note: You must be logged into myspace for this script to function.\par
// Using this script might make some internet connections seem slow, this is because\par
// the myspace homepage is requested every time you load any new page. \par
\par
// Configuration Options:\par
messages = true;\par
messageIcon = 'http://x.myspace.com/images/icon_envelope.gif';\par
friendrequests = true;\par
friendrequestIcon = 'http://x.myspace.com/images/icon_envelope.gif';\par
comments = true;\par
commentIcon = 'http://x.myspace.com/images/icon_envelope.gif';\par
imgcomments = true;\par
imgcommentIcon = 'http://x.myspace.com/images/icon_envelope.gif';\par
blogComments = true;\par
blogCommentIcon = 'http://x.myspace.com/images/icon_envelope.gif';\par
blogSubscriptions = true;\par
blogSubscriptionIcon = 'http://x.myspace.com/images/icon_envelope.gif';\par
events = true;\par
eventIcon = 'http://x.myspace.com/images/icon_envelope.gif';\par
birthdays = true;\par
birthdayIcon = 'http://r4wr.com/images/GMbirthday.png';\par
\par
/* Don't edit anything below unless you know what you're doing */\par
\par
function makeRequest() \{\par
\tab GM_xmlhttpRequest(\{\par
\tab\tab method: 'GET',\par
\tab\tab url: 'http://home.myspace.com/index.cfm?fuseaction=user',\par
\tab\tab headers: \{\par
\tab\tab\tab 'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3',\par
\tab\tab\tab 'Accept': 'text/xml',\par
\tab\tab\},\par
\tab\tab onload: function(responseDetails) \{\par
\tab\tab\par
\tab\tab\tab // Store html of the myspace homepage.\par
\tab\tab\tab var response = responseDetails.responseText;\par
\tab\tab\tab\par
\tab\tab\tab // Retrieve the user's friend identifier.\par
\tab\tab\tab friendid=/friendid=(\\d+)"/g.exec(response)[1];\par
\par
\tab\tab\tab // Fill in applicable notifications\par
\tab\tab\tab var html = '';\par
\tab\tab\tab var msgText=/id="indicatorMail" class="(\\w+)/g.exec(response)[1];\par
\tab\tab\tab if(messages && msgText == 'show') \{\par
\tab\tab\tab\tab html+= '<a href="http://mail.myspace.com/index.cfm?fuseaction=mail.inbox"><img src="'+messageIcon+'"> New Messages</a><br />';\par
\tab\tab\tab\tab show = 1;\par
\tab\tab\tab\}\par
\tab\tab\tab var reqText=/id="indicatorFriendRequest" class="(\\w+)/g.exec(response)[1];\par
\tab\tab\tab if(friendrequests && reqText == 'show') \{\par
\tab\tab\tab\tab html+= '<a href="http://mail.myspace.com/index.cfm?fuseaction=mail.friendRequests"><img src="'+friendrequestIcon+'"> New Friend Requests</a><br />';\par
\tab\tab\tab\tab show = 1;\par
\tab\tab\tab\}\par
\tab\tab\tab var comText=/id="indicatorComments" class="(\\w+)/g.exec(response)[1];\par
\tab\tab\tab if(comments && comText == 'show') \{\par
\tab\tab\tab\tab html+= '<a href="http://comments.myspace.com/index.cfm?fuseaction=user.HomeComments&amp;friendID='+friendid+'"><img src="'+commentIcon+'"> New Comments</a><br />';\par
\tab\tab\tab\tab show = 1;\par
\tab\tab\tab\}\par
\tab\tab\tab var imgText=/id="indicatorImageComments" class="(\\w+)/g.exec(response)[1];\par
\tab\tab\tab if(imgcomments && imgText == 'show') \{\par
\tab\tab\tab\tab html+= '<a href="http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewPicture&amp;friendID='+friendid+'"><img src="'+imgcommentIcon+'"> New Picture Comments</a><br />';\par
\tab\tab\tab\tab show = 1;\par
\tab\tab\tab\}\par
\tab\tab\tab var bcomText=/id="indicatorBlogComments" class="(\\w+)/g.exec(response)[1];\par
\tab\tab\tab if(blogComments && bcomText == 'show') \{\par
\tab\tab\tab\tab html+= '<a href="http://blog.myspace.com/index.cfm?fuseaction=blog.controlcenter"><img src="'+blogCommentIcon+'"> New Blog Comments</a><br />';\par
\tab\tab\tab\tab show = 1;\par
\tab\tab\tab\}\par
\tab\tab\tab var blogText=/id="indicatorBlogs" class="(\\w+)/g.exec(response)[1];\par
\tab\tab\tab if(blogSubscriptions && blogText == 'show') \{\par
\tab\tab\tab\tab html+= '<a href="http://blog.myspace.com/index.cfm?fuseaction=blog.controlcenter"><img src="'+blogSubscriptionIcon+'"> New Blog Subscription Posts</a><br />';\par
\tab\tab\tab\tab show = 1;\par
\tab\tab\tab\}\par
\tab\tab\tab var eventText=/id="indicatorEvents" class="(\\w+)/g.exec(response)[1];\par
\tab\tab\tab if(events && eventText == 'show') \{\par
\tab\tab\tab\tab html+= '<a href="http://mail.myspace.com/index.cfm?fuseaction=mail.eventInvite"><img src="'+eventIcon+'"> New Event Invitation</a><br />';\par
\tab\tab\tab\tab show = 1;\par
\tab\tab\tab\}\par
\tab\tab\tab var bdayText=/id="indicatorBirthday" class="(\\w+)/g.exec(response)[1];\par
\tab\tab\tab if(birthdays && bdayText == 'show') \{\par
\tab\tab\tab\tab html+= '<a href="http://collect.myspace.com/index.cfm?fuseaction=user.birthdays&amp;friendID='+friendid+'"><img src="'+birthdayIcon+'"> New Birthdays</a><br />';\par
\tab\tab\tab\tab show = 1;\par
\tab\tab\tab\}\par
\par
\tab\tab\tab if(show) \{\par
\tab\tab\tab\tab // Create notifier element.\par
\tab\tab\tab\tab var notifier = document.createElement('div');\par
\tab\tab\tab\tab notifier.setAttribute('id', 'GM_MSNotify');\par
\tab\tab\tab\tab document.body.appendChild(notifier);\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab notifier.innerHTML = html;\par
\tab\tab\tab\tab\par
\tab\tab\tab\tab // Apply some custom CSS to the notifier element.\par
\tab\tab\tab\tab GM_addStyle('#GM_MSNotify \{' +\par
\tab\tab\tab\tab\tab 'display:block!important;' +\par
\tab\tab\tab\tab\tab 'position:fixed!important;' +\par
\tab\tab\tab\tab\tab 'top:0!important;' +\par
\tab\tab\tab\tab\tab 'left:0!important;' +\par
\tab\tab\tab\tab\tab 'z-index:9999!important;' +\par
\tab\tab\tab\tab\tab 'width:150px!important;' +\par
\tab\tab\tab\tab\tab 'background-color:#000000!important;' +\par
\tab\tab\tab\tab\tab 'opacity:80.0!important;' +\par
\tab\tab\tab\tab\tab 'text-align:left!important;' +\par
\tab\tab\tab\tab\tab '-moz-border-radius:0 0px 10 10!important;' +\par
\tab\tab\tab\tab\tab 'padding:3px!important;\}' +\par
\tab\tab\tab\tab\tab '#GM_MSNotify a \{' +\par
\tab\tab\tab\tab\tab 'display:inline!important;' +\par
\tab\tab\tab\tab\tab 'color:#FF0000!important;' +\par
\tab\tab\tab\tab\tab 'text-decoration:none!important;' +\par
\tab\tab\tab\tab\tab 'line-height:8px;' +\par
\tab\tab\tab\tab\tab 'font:bold 10px Tahoma, serif!important;\}' +\par
\tab\tab\tab\tab\tab '#GM_MSNotify br \{display:inline!important\}' +\par
\tab\tab\tab\tab\tab '#GM_MSNotify img \{width:12px!important;opacity:1!important;border:none!important\}'\par
\tab\tab\tab\tab );\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\});\par
\}\par
\par
// Make sure we're not in a frame's body, then execute script.\par
if(top.location == location) \{\par
\tab makeRequest();\par
\}\par
\par
// ==UserScript==\par
// @name           MySpace Mail - AJAX\par
// @namespace      http://userscripts.org/scripts/show/25151\par
// @description    Changes the MySpace Mail inbox page a bit and adds a frame to view messages.\par
// @include        http://messaging.myspace.com/index.cfm?fuseaction=mail.inbox*\par
// ==/UserScript==\par
\par
function $(obj) \{return document.getElementById(obj);\} //prototype javascript framework\par
\par
function addStyle() \{\par
\tab iStatus = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4' +\par
\tab\tab 'c6QAAAAZiS0dEAP8A%2FwD%2FoL2nkwAAAAlwSFlzAAALEwAACxMBAJqcGAAAAJxJREFUKM%2BVksENwyAMRZ9R' +\par
\tab\tab '9ugAOTfZgBEYBGWMikEYgQ1KzhmgS%2FTaXkwETSLRf8N6tr6%2FEWr5tAAOuANvYAMiwT4KIgregAhMnCsDjmB' +\par
\tab\tab 'fRgstHKwQrFQNkzIYtXE1mabJp0XwKavnHq0DMDal2opPn5%2BG0RxmHKFGRqPr1WbK9p2K5Q7PPak2ztpiJth5' +\par
\tab\tab '0Ifbb3G%2BQ1YG%2BfdrfAGPbC8k%2FKOJkgAAAABJRU5ErkJggg%3D%3D';\par
\tab iRead = 'data:image/gif;base64,R0lGODlhFAANAKECAICAgPf39%2F%2F%2F%2F%2F%2F%2F%2FyH5BAEHAAMAL' +\par
\tab\tab 'AAAAAAUAA0AAAI43ICpao0Co4SoHQHmzMBmrFGUF5RAiQanSaKrmXaOq8KvbKz3zc5vSsMdfkCXcLhIHi3MpvMJ' +\par
\tab\tab 'LQAAOw%3D%3D';\par
\tab s = '#msgAction, #msgList, #msgView \{margin: 3px 0pt;\}\\\par
\tab\tab #msgAction input \{border: 1px solid #0072BA; font-family: inherit; color: #ffffff; background-color: #6698CB; \}\\\par
\tab\tab #msgList \{border: 1px solid #cccccc;\}\\\par
\tab\tab #GM_MySpaceMailAJAX table thead tr \{display: block; position: relative;\}\\\par
\tab\tab #GM_MySpaceMailAJAX table tbody \{display: block; height: 205px; overflow: auto; width: 100%;\}\\\par
\tab\tab #GM_MySpaceMailAJAX table tbody tr \{border-top: 1px solid #cccccc;\}\\\par
\tab\tab tr.even \{background-color: #f0f0f0;\}\\\par
\tab\tab #GM_MySpaceMailAJAX table td, #GM_MySpaceMailAJAX table th \{width: 20px; padding: 5px 2px;\}\\\par
\tab\tab #GM_MySpaceMailAJAX table td + td + td, #GM_MySpaceMailAJAX table th + th + th \{width: 41px;\}\\\par
\tab\tab #GM_MySpaceMailAJAX table td + td + td + td, #GM_MySpaceMailAJAX table th + th + th + th \{width: 331px;\}\\\par
\tab\tab #GM_MySpaceMailAJAX table td + td + td + td + td, #GM_MySpaceMailAJAX table th + th + th + th + th \{width: 105px; text-align: right;\}\\\par
\tab\tab #status \{background: transparent url('+iStatus+') no-repeat scroll center;\}\\\par
\tab\tab td.status \{background: transparent none no-repeat scroll 1px 50%;\}\\\par
\tab\tab td.unread \{background-image: url(http://x.myspacecdn.com/Modules/Messaging/Static/img/Envelope.gif);\}\\\par
\tab\tab td.read \{background-image: url('+iRead+');\}\\\par
\tab\tab td.replied \{background-image: url(http://x.myspacecdn.com/Modules/Messaging/Static/img/Sent.gif);\}\\\par
\tab\tab #GM_MySpaceMailAJAX table img \{max-width: 40px; max-height: 30px;\}\\\par
\tab\tab #GM_MySpaceMailAJAX a \{color: #0072BA;\}\\\par
\tab\tab a.name \{font-size: 110%;\}\\\par
\tab\tab .online \{background: transparent url(http:\\/\\/a177.ac-images.myspacecdn.com\\/images01\\/59\\/l_12ac26c7a736a49e68dbec859b357e88.gif) no-repeat scroll left top; padding-left:20px;\}\\\par
\tab\tab #msgView \{border: 1px solid #cccccc; padding: 3px; height: 350px; overflow: auto;\}\\\par
\tab\tab #msgView * \{max-width: 100%;\}\\\par
\tab\tab #msgView #msgInfo \{background-color: #f0f0f0; padding: 3px;\}\\\par
\tab\tab #msgInfo #reply, #msgInfo span \{float: right;\}';\par
\tab GM_addStyle(s.replace(/\}/g, '\}\\n'));\par
\}\par
\par
function getInfo() \{\par
\tab checkAll = $('checkboxHeader');\par
\tab deleteButton = $('ctl00_ctl00_Main_messagingMain_MessageList_TrashMailButton');\par
\tab msgPagerData = $('___msPagerState').value.split(',');\par
\tab msgFirst = msgPagerData[0]*1 - ((msgPagerData[1]*1)*(msgPagerData[2]*1-1)) + 1;\par
\tab msgRows = $('messages').tBodies[0].rows;\par
\tab msgData = [];\par
\tab for (i = 1; i < msgRows.length; i++) \{\par
\tab\tab msgData[i-1] = \{\par
\tab\tab\tab 'id': msgFirst-i,\par
\tab\tab\tab 'checkbox': msgRows[i].cells[0].childNodes[1],\par
\tab\tab\tab 'date': msgRows[i].cells[1].textContent,\par
\tab\tab\tab 'senderLink': msgRows[i].cells[2].childNodes[1].firstChild.href,\par
\tab\tab\tab 'senderPic': msgRows[i].cells[2].childNodes[1].firstChild.firstChild.src,\par
\tab\tab\tab 'sender':  msgRows[i].cells[2].childNodes[1].firstChild.firstChild.title,\par
\tab\tab\tab 'online': (msgRows[i].cells[2].childNodes[1].childNodes[8]) ? ((msgRows[i].cells[2].childNodes[1].childNodes[8].nodeName=='IMG')?true:false) : false,\par
\tab\tab\tab 'status': msgRows[i].cells[3].childNodes[1].textContent,\par
\tab\tab\tab 'subject': msgRows[i].cells[4].childNodes[1].textContent,\par
\tab\tab\tab 'link': msgRows[i].cells[4].childNodes[1].href\par
\tab\tab\};\par
\tab\}\par
\tab $('messages').parentNode.innerHTML = '';\par
\tab $('messageArea').lastChild.previousSibling.id = 'GM_MySpaceMailAJAX';\par
\tab //console.log(msgData);\par
\tab return msgData;\par
\}\par
\par
function newElement(element, parent, content, id, className) \{\par
\tab newE = document.createElement(element);\par
\tab parent.appendChild(newE);\par
\tab if (content) newE.innerHTML = content;\par
\tab if (id) newE.id = id;\par
\tab if (className) newE.className = className;\par
\tab return newE;\par
\}\par
\par
function addChangeEvent(node, num) \{\par
\tab node.addEventListener('click', function () \{changeOut(num);\}, false);\par
\}\par
\par
function createTable() \{\par
\tab msgAction = newElement('div', $('GM_MySpaceMailAJAX'), null, 'msgAction');\par
\tab msgAction.appendChild(deleteButton);\par
\tab msgList = newElement('div', $('GM_MySpaceMailAJAX'), null, 'msgList');\par
\tab msgTable = newElement('table', msgList);\par
\tab msgTableHead = newElement('thead', msgTable);\par
\tab msgTableHeadRow = newElement('tr', msgTableHead, '<th>'+checkAll.innerHTML+'</th><th id="status"></th><th></th><th>Sender, Subject</th><th>Date</th>');\par
\tab msgTableBody = newElement('tbody', msgTable);\par
\tab for (j = 0; j < msgData.length; j++) \{\par
\tab\tab newRow = newElement('tr', msgTableBody, null, null, (j%2==0)?'odd':'even');\par
\tab\tab checkbox = newElement('td', newRow, null, null, 'checkbox');\par
\tab\tab checkbox.appendChild(msgData[j].checkbox);\par
\tab\tab newElement('td', newRow, '', null, 'status ' + msgData[j].status.toLowerCase());\par
\tab\tab newElement('td', newRow, '<a href="'+msgData[j].senderLink+'"><img src="' + msgData[j].senderPic + ' /></a>');\par
\tab\tab newElement('td', newRow, '<a class="name'+ ((msgData[j].online)?' online':'') +'" href="'+msgData[j].senderLink+'">' + msgData[j].sender + '</a><br />' + msgData[j].subject);\par
\tab\tab newElement('td', newRow, msgData[j].date.replace(/^\\s+/, '').replace(/ \\d\{4\}/, ''));\par
\tab\tab addChangeEvent(newRow.childNodes[3], j);\par
\tab\}\par
\}\par
\par
function changeOut(num) \{\par
\tab msgView.innerHTML = '<div style="text-align: center;"><img src="http://x.myspace.com/modules/common/static/img/loadercircles.gif" /><br /><br />:: Loading Message ::</div>';\par
\tab if (!msgData[num].text || !msgData[num].replyLink || !msgData[num].script) \{\par
\tab\tab GM_xmlhttpRequest(\{ \par
\tab\tab\tab method: 'GET',\par
\tab\tab\tab url: msgData[num].link,\par
\tab\tab\tab headers: \{'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey'\},\par
\tab\tab\tab onload: function(responseDetails) \{\par
\tab\tab\tab\tab html = responseDetails.responseText.replace(/\\t|\\r|\\n/g, '');\par
\tab\tab\tab\tab msgBody = /<div id="messageBodyContainer"[^>]+>(.*?)<br \\/><br \\/><\\/div><\\/div><\\/div><div class="alignR">/.exec(html);\par
\tab\tab\tab\tab msgReply = /value="Reply" onclick=".*?(http:\\/\\/messaging\\.myspace\\.com\\/index\\.cfm\\?fuseaction=mail\\.reply&amp;.*?)&quot;,/.exec(html);\par
\tab\tab\tab\tab msgScript = /src="(\\/WebResource.axd\\?[^"]+)"/.exec(html);\par
\tab\tab\tab\tab msgData[num].text = msgBody[1];\par
\tab\tab\tab\tab msgData[num].replyLink = msgReply[1].replace(/&amp;/g, '&');\par
\tab\tab\tab\tab msgData[num].script = msgScript[1];\par
\tab\tab\tab\tab extScript.src = msgData[num].script;\par
\tab\tab\tab\tab msgView.innerHTML = '<div id="msgInfo"><div><a id="reply" href="'+msgData[num].replyLink+'">Reply &#187;</a><a class="name" href="'+msgData[num].senderLink+'">'+msgData[num].sender+'</a></div><div><span>'+msgData[num].date+'</span>'+msgData[num].subject+'</div></div>';\par
\tab\tab\tab\tab msgView.innerHTML += msgData[num].text;\par
\tab\tab\tab\}\par
\tab\tab\});\par
\tab\}\par
\tab else \{\par
\tab\tab extScript.src = msgData[num].script;\par
\tab\tab msgView.innerHTML = '<div id="msgInfo"><div><a id="reply" href="'+msgData[num].replyLink+'">Reply &#187;</a><a class="name" href="'+msgData[num].senderLink+'">'+msgData[num].sender+'</a></div><div><span>'+msgData[num].date+'</span>'+msgData[num].subject+'</div></div>';\par
\tab\tab msgView.innerHTML += msgData[num].text;\par
\tab\}\par
\}\par
\par
if ($('messages')) \{\par
\tab addStyle();\par
\tab getInfo();\par
\tab createTable();\par
\tab extScript = newElement('script', document.documentElement.firstChild);\par
\tab extScript.type = 'text/javascript';\par
\tab msgView = newElement('div', $('GM_MySpaceMailAJAX'), '<div style="text-align: center">Click on any message above to view its contents here</div>', 'msgView');\par
\}\par
// ==UserScript==\par
// @name            Myspace Auto-Login\par
// @namespace       Salvador Adame\par
// @description     Automatically logins in to MySpace if Firefox remembers your password. Works with new MySpace changes unlike all the others.\par
// @include \tab\tab http://*.myspace.com/*\par
// @include \tab\tab http://myspace.com/*\par
// @include \tab\tab http://www.myspace.com\par
// @include \tab\tab http://login.myspace.com/index.cfm?fuseaction=login.process*\par
\par
// ==/UserScript==\par
\par
var timer = 1000;\par
var timo, maySubmit = true;\par
var form = document.forms.namedItem('aspnetForm');\par
var uid = form.elements.namedItem('ctl00$Main$SplashDisplay$ctl00$Email_Textbox');\par
var pw = form.elements.namedItem('ctl00$Main$SplashDisplay$ctl00$Password_Textbox');\par
\par
function doSignIn() \{\par
\tab if(uid.value.length && pw.value.length) \{\par
\tab\tab form.submit();\par
\tab\} else \{ \par
\tab\tab window.setTimeout(doSignIn, timer);\par
\tab\}\par
\}\par
\par
doSignIn();\par
// ==UserScript==\par
// @name           MySpace - Remove unwanted stuff.\par
// @description    This will remove all unwanted (at least my unwnated) stuff from\par
// @description     your portal page of myspace.\par
// @include        http://home.myspace.com/index.cfm?fuseaction=user*\par
// @include        http://home.myspace.com/Modules/HomeDisplay/Pages/Home.aspx??fuseaction=user*\par
// @Version/Date\tab 1.0/9-10-2007\par
// @Code            Shane - myspace.com/DFW_Dino\par
// ==/UserScript==\par
\par
\par
\par
myremoveChild("header");\par
\par
myremoveChild("squareAd");\par
\par
myremoveChild("home_infoBar");\par
\par
myremoveChild("home_coolNewVideos");\par
\par
myremoveChild("splash_profile");\par
\par
myremoveChild("home_greybox");\par
\par
myremoveChild("home_setHomePage");\par
\par
myremoveChild("home_schools");\par
\par
myremoveChild("footer");\par
\par
myremoveChild("StatusBox");\par
\par
myremoveChild("home_searchAddressBook");\par
\par
\par
\par
\par
//Funcation Area\par
\par
//******************************************************************************\par
//Will remove the child of the element of the object you pass\par
//******************************************************************************\par
function myremoveChild(elm)\par
\{\par
\par
  var myContent = document.getElementById(elm);\par
\par
  myContent.parentNode.removeChild(myContent);\par
  \par
  myContent = null;\par
\par
\par
\}\par
// Version 5.3\par
// Wednesday, January, 10, 2007.\par
// Myspace Annoyance Removal\par
// Daniel Teichman\par
// danielteichman[xATx]gmail[xDOTx]com\par
//\par
// Much code added, replaced, and otherwise tweaked by James Bodell\par
// james.bodell[^7]gmail[*]com\par
//\par
// ==UserScript==\par
// @name         Myspace Annoyance Removal\par
// @description  Removes the Cool New People, the Featured Profile, the block ads, the ad at the top of the page, and other assorted annoyances.  Optionally removes certain elements on a per-profile basis.  It even updates automatically!\par
// @include      http://*.myspace.com*\par
// @include      http://myspace.com*\par
// @include      http://*.myspace.com\par
// @include      http://myspace.com\par
// ==/UserScript==\par
/*\par
COPYRIGHT NOTICE:\par
Copyright (C) 2006 and onwards  Daniel Teichman\par
\par
This script is provided free of charge and may be distributed\par
free of charge.  This script may only be bundled with other software\par
that is to be provided free of charge.  If you wish to use this script\par
for any other use, ask the author.\par
\par
This script is distributed WITHOUT ANY WARRANTY whatsoever.\par
\par
If you suddenly find that you computer won't boot or that someone stole\par
your credit cards, it wasn't my fault.\par
*/\par
var loc = document.location.toString();\par
var i;\par
var version = "5.3";\par
var latest;\par
\par
// These arrays define what elements will get removed.  You can comment/uncomment \par
// what you want or don't want to see, or hunt down and add the ID tags or \par
// class name of anything else you want removed.  Comma separated.  Be careful, especially with class names!\par
var homepageRemove = new Array (\par
//\tab "home_profileInfo",\par
//\tab "home_messages",\par
//\tab "home_bulletins",\par
//\tab "home_friends",\par
\tab "splash_profile",\par
\tab "splash_coolNewPeople",\tab\par
\tab "squareAd",\par
\tab "ctl00_Main_ctl00_ProfileHome_gads",  // Google ads\par
\tab "home_setHomePage",\par
\tab "home_schools",\par
\tab "home_infoBar",\par
\tab "home_greybox",\par
\tab "home_additionalLinks",\par
\tab "home_pickURL",\par
\tab "home_userURLInfo"\par
\tab );\par
var mainpageRemove = new Array (\par
\tab "splash_coolNewPeople",\par
\tab "splash_getStarted",\par
//\tab "ctl00_Main_SplashDisplay_userVideos_VideoToday",  // header for videotoday\par
//\tab "splash_videotoday",\par
\tab "splash_greybox",\par
//\tab "splash_music",   //controls both MySpace Music and MySpace Specials\par
//\tab "ctl00_Main_SplashDisplay_featuredVideos_CMS_videos",\par
\tab "ctl00_Main_SplashDisplay_gads_CMS_Splash_Gads" //randomly displayed google ads\par
\tab );\par
var profileRemove = new Array ( \par
//\tab "Table2"   // Profile pic and all interest contents\par
//\tab "mini"      // the Flash music player\par
//\tab "Table1"   // Interests (both title and contents) and Extend Network box (will hide the other toggles of this script)\par
//  "GeneralRow", "ProfileGeneral"  // (or "Television" "Heroes", etc.)  Individual rows or content of the interests section.\par
//\tab "contactTable"\par
//  Find more yourself!\par
\tab );\par
var groupsRemove = new Array ( \par
//\tab "header_search"\par
\tab );\par
var removeOASads = true;   // Nearly all the ads are tied to this\par
var removeBannerAd = true;  //  The banner ad on some pages needs a different approach\par
var maxImageWidth = "250";  //  This is the arbitrary image size you can set for the profile annoyance settings.\par
\par
\par
var closebutton = "data:image/jpeg,%FF%D8%FF%E0%00%10JFIF%00%01%01%01%00%60%00%60%00%00%FF%DB%00C%00%08%06%06%07%06%05%08%07%07%07%09%09%08%0A%0C%14%0D%0C%0B%0B%0C%19%12%13%0F%14%1D%1A%1F%1E%1D%1A%1C%1C%20%24.'%20%22%2C%23%1C%1C(7)%2C01444%1F'9%3D82%3C.342%FF%DB%00C%01%09%09%09%0C%0B%0C%18%0D%0D%182!%1C!22222222222222222222222222222222222222222222222222%FF%C0%00%11%08%00%0F%00%0F%03%01%22%00%02%11%01%03%11%01%FF%C4%00%1F%00%00%01%05%01%01%01%01%01%01%00%00%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%10%00%02%01%03%03%02%04%03%05%05%04%04%00%00%01%7D%01%02%03%00%04%11%05%12!1A%06%13Qa%07%22q%142%81%91%A1%08%23B%B1%C1%15R%D1%F0%243br%82%09%0A%16%17%18%19%1A%25%26'()*456789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E1%E2%E3%E4%E5%E6%E7%E8%E9%EA%F1%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%C4%00%1F%01%00%03%01%01%01%01%01%01%01%01%01%00%00%00%00%00%00%01%02%03%04%05%06%07%08%09%0A%0B%FF%C4%00%B5%11%00%02%01%02%04%04%03%04%07%05%04%04%00%01%02w%00%01%02%03%11%04%05!1%06%12AQ%07aq%13%222%81%08%14B%91%A1%B1%C1%09%233R%F0%15br%D1%0A%16%244%E1%25%F1%17%18%19%1A%26'()*56789%3ACDEFGHIJSTUVWXYZcdefghijstuvwxyz%82%83%84%85%86%87%88%89%8A%92%93%94%95%96%97%98%99%9A%A2%A3%A4%A5%A6%A7%A8%A9%AA%B2%B3%B4%B5%B6%B7%B8%B9%BA%C2%C3%C4%C5%C6%C7%C8%C9%CA%D2%D3%D4%D5%D6%D7%D8%D9%DA%E2%E3%E4%E5%E6%E7%E8%E9%EA%F2%F3%F4%F5%F6%F7%F8%F9%FA%FF%DA%00%0C%03%01%00%02%11%03%11%00%3F%00%EB%BCC%E3%3Dc%C2%BE1x%EFm%BC%ED%12%7D%86%1F%90%06%0A%14%07%D8%C3%A9%DCrC%7Bt%04%1A%B1%E0o%13%EB%9E%26%D65%1B%8B%9BuM%24.%22%C2%8CD%F9%18%40%DC%16%25I'%DF%1Ft%10%09%E2%7F%03j%3E%26%F1%3C%177%1A%9A%8D%25%14%0F%24d%3CC%1F0Q%8C%12%C4%0F%98%F3%CFB%14%03w%C1%1E%11%BD%F0%B7%DBR%E3R%F3%E1%95%FF%00u%0Cc%09%81%FCg%3C%86%23%8C%03%8E9-%C6%3E9%B8ry%9F%5BV%A6%5D%FD%9F%EE%A8%FBnT%B6%7D%FE%EEkn%FF%00F%7F%FF%D9";\par
\par
function removeCSS () \{\par
styles = document.getElementsByTagName("style");\par
for (i = styles.length - 1; i >= 0; i--) styles[i].parentNode.removeChild(styles[i]);\par
\}\par
\par
function removeImages () \{\par
images = document.getElementsByTagName("img");\par
for (i = images.length - 1; i >= 0; i--) images[i].parentNode.removeChild(images[i]);\par
\}\par
\par
function resizeImages () \{\par
images = document.getElementsByTagName("img");\par
for (i = images.length - 1; i >= 0; i--) images[i].style.maxWidth=maxImageWidth;\par
\}\par
\par
function removeAV () \{\par
media = document.getElementsByTagName("embed");\par
for (i = media.length - 1; i >= 0; i--)\par
\tab if (media[i].getAttribute("src").toLowerCase().indexOf(".swf") == -1)\par
\tab\tab media[i].parentNode.removeChild(media[i]);\par
\}\par
\par
function removeFlash () \{\par
flash = document.getElementsByTagName("embed");\par
for (i = flash.length - 1; i >= 0; i--)\par
\tab if (flash[i].getAttribute("src").toLowerCase().indexOf(".swf") > -1)\par
\tab\tab flash[i].parentNode.removeChild(flash[i]);\par
\}\par
\par
function removeFalling () \{\par
marquee = document.getElementsByTagName("marquee");\par
for (i = marquee.length - 1; i >= 0; i--)\par
\tab if (marquee[i].getAttribute("direction").toLowerCase().indexOf("down") > -1)\par
\tab\tab marquee[i].parentNode.removeChild(marquee[i]);\par
\}\par
\par
function removeMarquee () \{\par
marquee = document.getElementsByTagName("marquee");\par
for (i = marquee.length - 1; i >= 0; i--)\par
\tab marquee[i].parentNode.removeChild(flash[i]);\par
\}\par
\par
function isBlocked(item) \{\par
var prefs = GM_getValue(loc, "none");\par
if (prefs.indexOf(item) > -1) return true;\par
else return false;\par
\}\par
\par
function filterProfile () \{\par
var prefs = GM_getValue(loc, "none");\par
if (prefs.indexOf("css") > -1) removeCSS();\par
if (prefs.indexOf("images") > -1) removeImages();\par
if (prefs.indexOf("flash") > -1) removeFlash();\par
if (prefs.indexOf("av") > -1) removeAV();\par
if (prefs.indexOf("falling") > -1) removeFalling();\par
if (prefs.indexOf("marquee") > -1) removeMarquee();\par
if (prefs.indexOf("imgwidth") > -1) resizeImages();\par
\}\par
\par
function setObnox () \{\par
var valueToSet = "";\par
if (document.getElementById("check_css").checked) valueToSet += "css";\par
if (document.getElementById("check_images").checked) valueToSet += "images";\par
if (document.getElementById("check_flash").checked) valueToSet += "flash";\par
if (document.getElementById("check_av").checked) valueToSet += "av";\par
if (document.getElementById("check_falling").checked) valueToSet += "falling";\par
if (document.getElementById("check_marquee").checked) valueToSet += "marquee";\par
if (document.getElementById("check_width").checked) valueToSet += "imgwidth";\par
GM_setValue(loc, valueToSet);\par
\}\par
\par
function displayObnoxOps () \{\par
document.getElementById("ctl00_Main_ctl00_UserNetwork1_ctrlMessage").parentNode.innerHTML = '<a id="annoysme" style="cursor:pointer;">Is this profile annoying?</a>';\par
document.addEventListener('click', function(event) \{\par
//event.stopPropagation();\par
//event.preventDefault();\par
if (!document.getElementById("obnoxious") && event.target == document.getElementById("annoysme"))\{\par
document.body.innerHTML += '<div id="obnoxious" style="background-color:#FFFFCC;position:absolute;top:0px;right:0px;width:350px;height:auto;z-index:100001"><table><tr><td align="center" valign="top"><font color="black"><b>Profile Annoyance Options</b></font></td><td align="right" valign="top"><img src='+closebutton+' style="cursor:pointer;" onClick="document.getElementById(\\'obnoxious\\').parentNode.removeChild(document.getElementById(\\'obnoxious\\'))"></td></tr><tr><td align="left" valign="top" colspan="2"><font size="1" color="black">Is this profile annyoing you?  Is it time to zap something?  Let\\' do it! Just check everything you want to block. To unblock an item, simply return to this panel, and leave that item unblocked.  After unblocking items, you will not see them again until you reload the page.  Note that you may have to block Audio/Video for some tricky flash elements.</font><br><br><center><table border="0"><tr><td><input type="checkbox" id="check_css"></td><td>CSS</td></tr><tr><td><input type="checkbox" id="check_images"></td><td>Images</td></tr><tr><td><input type="checkbox" id="check_flash"></td><td>Flash</td></tr><tr><td><input type="checkbox" id="check_av"></td><td>Audio/Video</td></tr><tr><td><input type="checkbox" id="check_falling"></td><td>Falling Objects</td></tr><tr><td><input type="checkbox" id="check_marquee"></td><td>Marquees/Scrollers</td></tr><tr><td><input type="checkbox" id="check_width"></td><td>Image Width</td></tr></table></center><br><center><input type="button" value="Fix It!" id="fixitbutton"></center></td></tr></table></div>';\par
if (isBlocked("css")) document.getElementById("check_css").click();\par
if (isBlocked("images")) document.getElementById("check_images").click();\par
if (isBlocked("flash")) document.getElementById("check_flash").click();\par
if (isBlocked("av")) document.getElementById("check_av").click();\par
if (isBlocked("imgwidth")) document.getElementById("check_width").click();\par
\}\par
if (document.getElementById("obnoxious") && event.target == document.getElementById("fixitbutton")) \{\par
setObnox();\par
document.getElementById("obnoxious").parentNode.removeChild(document.getElementById("obnoxious"));\par
filterProfile();\par
\}\par
\par
\}, true);\par
\par
\}\par
\par
function displayObnoxOpsGroup () \{\par
document.body.innerHTML += '<div id="obnoxious" style="background-color:#FFFFCC;position:absolute;top:0px;right:0px;width:350px;height:auto;z-index:100001"><table><tr><td align="center" valign="top"><font color="black"><b>Profile Annoyance Options</b></font></td><td align="right" valign="top"><img src='+closebutton+' style="cursor:pointer;" onClick="document.getElementById(\\'obnoxious\\').parentNode.removeChild(document.getElementById(\\'obnoxious\\'))"></td></tr><tr><td align="left" valign="top" colspan="2"><font size="1" color="black">Is this profile annyoing you?  Is it time to zap something?  Let\\' do it! Just check everything you want to block. To unblock an item, simply return to this panel, and leave that item unblocked.  After unblocking items, you will not see them again until you reload the page.  Note that you may have to block Audio/Video for some tricky flash elements.</font><br><br><center><table border="0"><tr><td><input type="checkbox" id="check_css"></td><td>CSS</td></tr><tr><td><input type="checkbox" id="check_images"></td><td>Images</td></tr><tr><td><input type="checkbox" id="check_flash"></td><td>Flash</td></tr><tr><td><input type="checkbox" id="check_av"></td><td>Audio/Video</td></tr><tr><td><input type="checkbox" id="check_width"></td><td>Image Width</td></tr></table></center><br><center><input type="button" value="Fix It!" id="fixitbutton"></center></td></tr></table></div>';\par
if (isBlocked("css")) document.getElementById("check_css").click();\par
if (isBlocked("images")) document.getElementById("check_images").click();\par
if (isBlocked("flash")) document.getElementById("check_flash").click();\par
if (isBlocked("av")) document.getElementById("check_av").click();\par
if (isBlocked("imgwidth")) document.getElementById("check_width").click();\par
document.addEventListener('click', function(event) \{\par
//event.stopPropagation();\par
//event.preventDefault();\par
if (document.getElementById("obnoxious") && event.target == document.getElementById("fixitbutton")) \{\par
setObnox();\par
filterProfile();\par
\}\par
\par
\}, true);\par
\par
\}\par
\par
function checkOutdated () \{\par
GM_xmlhttpRequest(\{\par
    method: 'GET',\par
    url: "http://www.holyhell.net/userscripts/mar/version.php",\par
    headers: \{\par
        'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',\par
        'Accept': 'application/atom+xml,application/xml,text/xml,text/javascript,text',\par
    \},\par
    onload: function(responseDetails) \{\par
\tab latest = responseDetails.responseText;\par
\tab //if (version != latest) \{\par
\tab if (version < latest) \{\par
\tab\tab document.body.innerHTML += '<div id="updateavailable" style="background-color:#FFFFCC;position:absolute;top:'+window.pageYOffset+'px;right:0px;width:350px;height:auto;z-index:100001"><table><tr><td align="center" valign="top"><font color="black"><b>Update Available</b></font></td><td align="right" valign="top"><a style="cursor:pointer;" onClick="document.getElementById(\\'updateavailable\\').style.display = \\'none\\'"><font size="-3" color="red">[X]</font></a></tr><tr><td align="left" valign="top" colspan="2"><font size="1" color="black">There is an update available for the Myspace Annoyance Remover. Simply right-click the link below and &quot;Install User Script&quot;</font><br><br><center><a href=\\"http://userscripts.org/scripts/source/3332.user.js"><font size="-3" color="blue">http://userscripts.org/scripts/source/3332.user.js</font></a><br><a href="http://userscripts.org/scripts/show/3332"><font size="-3" color="blue">Script Homepage @ Userscripts.org</font></a></center></td></tr></table></div>';\par
\tab updateOutdated();\par
\tab setTimeout("document.getElementById('updateavailable').style.display = 'none'", 15000);\par
\tab\}\par
    \}\par
\});\par
\}\par
\par
function updateOutdated () \{\par
if (document.getElementById("updateavailable").style.display != "none") \{\par
document.getElementById("updateavailable").style.top = window.pageYOffset;\par
setTimeout(updateOutdated, 5);\par
\}\par
\}\par
\par
function inArray (x, y) \{\par
\tab for (var i in y)\par
\tab\tab if (x == y[i])\par
\tab\tab\tab return true;\par
\tab return false;\par
\}\par
\par
function hideElements (y) \{\par
\tab if (y.length > 0) \{\par
\tab\tab var all = document.getElementsByTagName("*");\par
\tab\tab for (var k in all)  //(var k=0; k<all.length; k++)\par
\tab\tab\tab if (inArray(all[k].id, y) || inArray(all[k].className, y)) \par
\tab\tab\tab\tab all[k].style.display = "none";\par
\tab\}\par
\}\par
\par
\par
\par
var mainpage = false;\par
if (loc == "http://www.myspace.com") mainpage = true;\par
else if (loc == "http://www.myspace.com/") mainpage = true;\par
else if (loc == "http://myspace.com/") mainpage = true;\par
else if (loc == "http://myspace.com") mainpage = true;\par
else if (loc.indexOf("home.myspace.com") > -1 && loc.indexOf("fuseaction=splash") > -1) mainpage = true;\par
else if (loc == "http://home.myspace.com") mainpage = true;\par
else if (loc == "http://home.myspace.com/") mainpage = true;\par
else if (loc.indexOf(".com/index.cfm") > -1 && loc.indexOf("&") == -1) mainpage = true;\par
\par
if (loc.indexOf("dex.cfm?fuseaction=ad") > -1 || loc.indexOf("collect.myspace.com") > -1) \{\par
var links = document.links;\par
for (var i = 0; i < links.length; i++)\par
\tab if (links[i][i].innerHTML.indexOf("ip th") > -1)\par
\tab\tab document.location.href = links[i].href;\par
\par
\}\par
\par
else \{\par
\par
if (removeOASads) \{\par
\tab var scriptElements;\par
\tab scriptElements = document.getElementsByTagName("script");\par
\tab for (var i = 0; i < scriptElements.length; i++)\par
\tab\tab if (scriptElements[i].innerHTML.indexOf("oas_ad") > -1)\par
\tab //\tab\tab scriptElements[i].parentNode.innerHTML = "";\par
\tab\tab\tab scriptElements[i].parentNode.style.display = "none";\par
\}\par
\par
if (removeBannerAd) \{\par
\tab var bannerAd = document.getElementById("advert");\par
\tab if (bannerAd != undefined)\par
\tab\tab bannerAd.innerHTML = "";\par
\}\par
\par
if (loc.indexOf("http://home.myspace.com") > -1 && loc.indexOf("n=user") > -1) \{\par
\tab hideElements(homepageRemove);\par
\tab document.getElementById("main").style.minHeight = "300px";\par
\}\par
\tab\par
else if (mainpage) \{\par
\tab hideElements(mainpageRemove);\par
\tab checkOutdated();\par
\}\par
\par
else if (loc.indexOf("profile.myspace.com") > -1 || document.getElementsByTagName("title").item(0).innerHTML.indexOf("www.myspace.com/") > -1) \{\par
hideElements(profileRemove);\par
displayObnoxOps();\par
filterProfile();\par
\}\par
\par
else if (loc.indexOf("groups.myspace.com") > -1 && loc.indexOf("fuseaction=groups.groupProfile&groupID") > -1) \{\par
hideElements(groupsRemove);\par
displayObnoxOpsGroup();\par
\}\par
\};\par
\par
\par
if (unsafeWindow.parent == unsafeWindow)\{\par
\tab var footer = document.getElementById("footer");\par
\tab if (footer == undefined)\par
\tab\tab footer = document.getElementById("msft");\par
\tab if (footer != undefined) \par
\tab\tab footer.innerHTML += "<center><div id=\\"adrmvr\\" style=\\"width:640px;background-color:#FFFFCC;\\" align=\\"left\\">This page was processed by the Myspace Annoyance Removal userscript for Greasemonkey.  If you have any comments or questions, head over to <a href=\\"http://userscripts.org/scripts/show/3332\\">http://userscripts.org/scripts/show/3332</a> or send an e-mail to danielteichman[xATx]gmail[xDOTx]com  You can help out by reporting pages that get around this script.</div></center><br>";\tab\par
//This is insanely buggy.  If anyone can figure out how to make this not cause a JavaScript error, drop me a line\par
\}\par
//displayObnoxOps();\par
//checkOutdated();\par
// ==UserScript==\par
// @name          MySpaceHax\par
// @namespace     http://reasonfailed.blogspot.com/\par
// @description   Gives menu access to MySpace profile sections (including hidden ones)\par
// @include       http://*.myspace.com/index.cfm?fuseaction=*&friendid=*\par
// ==/UserScript==\par
\par
// find friendID\par
\par
var path = location.href;\par
var query = '';\par
if(path.indexOf('friendID=') > 0)\par
\tab query = 'friendID=';\par
if(path.indexOf('friendid=') > 0)\par
\tab query = 'friendid=';\par
var section = path.split(query);\par
var friendID = '';\par
if(section.length > 1)\par
        friendID = section[1];\par
section = friendID.split('&');\par
if(section.length > 1)\par
        friendID = section[0];\par
//alert('|'+path+'|'+friendID+'|');\par
\par
// add menu\par
\par
var myHaxMenu = document.createElement("div");\par
myHaxMenu.innerHTML = '<style type="text/css">'\par
+'<!--'\par
+'#myhaxlayer #table1 a \{'\par
+'text-decoration: none !important;'\par
+'color: #000000 !important;'\par
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'\par
+'font-size: 10px !important;'\par
+'font-weight: bold !important;'\par
+'font-style: normal !important;'\par
+'\}'\par
+'#myhaxlayer #table1 a:hover \{'\par
+'text-decoration: none !important;'\par
+'color: #0000FF !important;'\par
+'font-family: Verdana, Arial, Helvetica, sans-serif !important;'\par
+'font-size: 10px !important;'\par
+'font-weight: bold !important;'\par
+'font-style: normal !important;'\par
+'\}'\par
+'#myhaxlayer #table1 \{'\par
+'background-color: #CCCCCC !important;'\par
+'\}'\par
+'-->'\par
+'</style>'\par
+'<div style="position: absolute; width: 65px; height: 100px; z-index: 1; right; top: 0pt; right: 0pt" id="myhaxlayer">'\par
+'<table border="0" width="100%" id="table1" bgcolor="#C0C0C0">'\par
+'<tr><td><p align="left">'\par
+'<a href="http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid='+friendID+'">Profile</a><br>'\par
+'<a href="http://blog.myspace.com/index.cfm?fuseaction=blog.ListAll&friendID='+friendID+'">Blog</a><br>'\par
+'<a href="http://viewmorepics.myspace.com/index.cfm?fuseaction=user.viewPicture&friendID='+friendID+'">Pictures</a><br>'\par
+'<a href="http://vids.myspace.com/index.cfm?fuseaction=vids.uservids&friendID='+friendID+'">Videos</a><br>'\par
+'<a href="http://home.myspace.com/index.cfm?fuseaction=user.viewfriends&friendID='+friendID+'">Friends</a><br>'\par
+'<a href="http://comments.myspace.com/index.cfm?fuseaction=user.viewComments&friendID='+friendID+'">Comments</a>'\par
+'</font></td></tr></table></div>';\par
document.body.insertBefore(myHaxMenu, document.body.firstChild);\par
\par
\par
\f1\par
}
