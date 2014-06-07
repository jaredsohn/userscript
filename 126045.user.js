// ==UserScript==
// @name Boards.ie - Keyboard Shortcuts
// @namespace http://userscripts.org/users/436255
// @description Left/right arrow keys for navigation in threads and forums, ctrl+left for parent forum, quickly switch focus to the "Find a Forum" or Search textboxes. Use z/a to navigate thread lists, and enter to open threads
// @version 1.6.4
// @icon http://s3.amazonaws.com/uso_ss/icon/125952/large.png
// @include http://www.boards.ie/*
// @include https://www.boards.ie/*
// @grant GM_addStyle
// ==/UserScript==

//v1.1 - don't change page if left/right used in text box
//v1.2 - switch to omnibox if using new skin
//v1.2.1 - fix for ctrl+left to parent forum
//v1.2.2 - fix for ctrl+left to parent forum
//v1.3 - added "Mark Forums Read" functionality
//v1.4 - updated to work with Talk To Forums
//v1.5 - Full reworking, allow for navigation of thread lists
//v1.5.1/2/3 - Bugfixes, minor enhancements
//v1.6 - Also navigate post lists, follow, reply, quote
//v1.6.1 - 0-9: open link in posts
//v1.6.2 - Show tooltips
//v1.6.3 - fix for tooltips newlines
//v1.6.4 - fix for l/r/etc in text boxes or with ctrl

GM_addStyle("\
	.highlight436255 {\n\
		border:red solid 1px !important;\n\
	}\n\
	#tooltip436255 {\n\
		display:none;\n\
		position:relative;\n\
	}\n\
	#tooltip436255 div {\n\
		background: #333;\n\
    	background: rgba(0,0,0,.8);\n\
    	border-radius: 5px;\n\
    	color: #fff;\n\
    	padding: 5px 15px;\n\
    	position: absolute;\n\
		left:40%;\n\
		top:-20px;\n\
    	z-index: 198;\n\
		width: 60%;\n\
	}");

if(window.top == window.self)
	window.addEventListener('keydown', keyShortcuts, true);

var loc = document.location.href;
var ttforum = (loc.indexOf("/ttforum/") != -1);
var ttfthread = (loc.indexOf("/ttfthread/") != -1);
var forum = (loc.indexOf("forumdisplay.php") != -1);
var thread = (loc.indexOf("showthread.php") != -1);
var usercp = loc.indexOf("usercp.php") != -1;
var homepage = (loc == "http://boards.ie/" || loc == "https://boards.ie/" || loc == "http://www.boards.ie/" || loc == "https://www.boards.ie/");
var index = -1;
var tdindex = 1;
if(forum)
{
	if(document.getElementById('threadslist').getElementsByTagName("tr")[1].getElementsByTagName("td").length == 6)
		tdindex = 2;
}
var tooltip = document.createElement('div');
tooltip.id = 'tooltip436255';
var tooltipinner = document.createElement('div');
tooltip.appendChild(tooltipinner);
var showtooltips = false;

/*
=> - 39
<= - 37
^ - 38
v - 40
Del - 46
` - 223
Space - 32
\ - 220
m - 77
a - 65
z - 90
Enter - 13
o - 79
q - 81
t - 84
r - 82
f - 70
l - 76
 */
function keyShortcuts(key)
{
	var code = key.keyCode;
	var ctrl = key.ctrlKey;
	var alt = key.altKey;
	var intext = (document.activeElement.nodeName == 'TEXTAREA' || document.activeElement.nodeName == 'INPUT');
	var hl = document.getElementsByClassName('highlight436255')[0];
	if(code == 32 && ctrl)
	{
		// Ctrl + Space - searchbox
		if(document.getElementById("user_search_input") != null)
			document.getElementById("user_search_input").focus();
		else if(alt)
			document.getElementById("sbutton").focus();
		else
			document.getElementById("forumtitle").focus();
	}
	else if(code == 39 && !intext)
	{
		// => - increase page, or go to last page with ctrl
		if(ttforum || ttfthread)
		{
			if(ctrl && document.getElementsByClassName("last")[0] != null)
				location.href = document.getElementsByClassName("last")[0];
			else if(document.getElementsByClassName("next")[0] != null)
				location.href = document.getElementsByClassName("next")[0];
		}
		else
		{
			var navlinks = document.getElementsByClassName("pagenav")[0].getElementsByTagName("a");
			for(var i = 0; i < navlinks.length; i++)
			{
				if(navlinks[i].rel == "next")
					location.href = navlinks[i];
			}
		}
	}
	else if(code == 37 && !intext)
	{
		// <= - decrease page, or go to parent forum with ctrl
		if(ttforum || ttfthread)
		{
			if(ctrl)
			{
				var navbarlinks = document.getElementById("breadcrumb-inner").getElementsByTagName("a");
				location.href = navbarlinks[navbarlinks.length - 1];
			}
			else if(document.getElementsByClassName("prev")[0] != null)
				location.href = document.getElementsByClassName("prev")[0];
		}
		else
		{
			if(ctrl)
			{
				var navbarlinks = document.getElementsByClassName("navbar")[0].parentNode.getElementsByTagName("a");
				location.href = navbarlinks[navbarlinks.length - 1];
			}
			else
			{
				var navlinks = document.getElementsByClassName("pagenav")[0].getElementsByTagName("a");
				for(var i = 0; i < navlinks.length; i++)
				{
					if(navlinks[i].rel == "prev")
						location.href = navlinks[i];
				}
			}
		}
	}
	else if(code == 77 && !intext && !ctrl && (forum || ttforum))
	{
		// M - Mark forum read
		if(ttforum)
		{
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			document.getElementById("mark-forum-read").dispatchEvent(evt);
		}
		else
		{
			var toolsmenulinks = document.forms['forumadminform'].getElementsByTagName("a");
			for(var i = 0; i < toolsmenulinks.length; i++)
			{
				if(toolsmenulinks[i].innerHTML == "Mark This Forum Read")
				{
					var evt = document.createEvent("MouseEvents");
					evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
					toolsmenulinks[i].dispatchEvent(evt);
				}
			}
		}
	}
	else if((usercp || forum || ttforum || homepage || thread || ttfthread) && !intext && (code == 65 || code == 90))
	{
		// a/z - navigate forums/threads
		var list;
		if(forum)
			list = document.getElementById('threadslist').getElementsByTagName("tr");
		else if(ttforum)
			list = document.getElementsByClassName('forum-threadlist-table')[0].getElementsByTagName("tr");
		else if(usercp)
			list = document.getElementById('collapseobj_usercp_forums').getElementsByTagName("tr");
		else if(homepage)
			list = document.getElementsByClassName('module-wrapper')[0].getElementsByTagName("tr");
		else if(thread)
			list = document.getElementsByClassName('postcontent');
		else if(ttfthread)
			list = document.getElementsByClassName('postbit-wrapper');
		if(hl != null)
			hl.classList.remove('highlight436255');
		if(index == -1)
		{
			if(code == 65)
			{
				if(ctrl)
					index = (thread || ttfthread) ? 0 : 1;
				else
				{
					for(var j = list.length - 1; j > ((thread || ttfthread) ? 0 : 1) && index == -1; j--)
					{
						if(isElementInViewport(list[j]))
							index = j;
					}
					if(index == -1)
						index = list.length - 1;
				}
			}
			else if(code == 90)
			{
				if(ctrl)
					index = list.length - 1;
				else
				{
					for(var j = ((thread || ttfthread) ? 0 : 1); j < list.length && index == -1; j++)
					{
						if(isElementInViewport(list[j]))
							index = j;
					}
					if(index == -1)
						index = (thread || ttfthread) ? 0 : 1;
				}
			}
		}
		else if(code == 65 && index > ((thread || ttfthread) ? 0 : 1))
		{
			if(ctrl)
			{
				index = ((thread || ttfthread) ? 0 : 1);
				key.preventDefault();
			}
			else
				index--;
		}
		else if(code == 90 && index < list.length - 1)
		{
			if(ctrl)
				index = list.length - 1;
			else
				index++;
		}
		if(thread)
			list[index].parentNode.parentNode.parentNode.parentNode.classList.add('highlight436255');
		else if(ttfthread)
			list[index].classList.add('highlight436255');
		else
			list[index].getElementsByTagName("td")[tdindex].classList.add('highlight436255');
		hl = document.getElementsByClassName('highlight436255')[0];
		if(!isElementInViewport(hl))
			hl.scrollIntoView(code == 90);
		if(homepage || forum || ttforum)
		{
			tooltipinner.innerHTML = ttforum ? hl.getElementsByTagName('a')[0].title.replace(/(\r\n|\n|\r)/gm, '<br />') : hl.title.replace(/(\r\n|\n|\r)/gm, '<br />');
			hl.appendChild(tooltip);
		}
	}
	else if((ttforum || forum) && !intext && code == 13 && hl != null)
	{
		if(ctrl)
		{
			if(ttforum)
			{
				if(hl.getElementsByClassName('spritethreadbit-firstunread')[0] != null)
					window.open(hl.getElementsByClassName('spritethreadbit-firstunread')[0].parentNode);
				else
					window.open(hl.parentNode.getElementsByTagName("td")[tdindex+1]
						.getElementsByTagName("a")[hl.parentNode.getElementsByTagName("td")[tdindex+1].getElementsByTagName("a").length - 2]);
			}
			else if(hl.getElementsByTagName("a")[0].id.lastIndexOf("thread_gotonew", 0) === 0)
				window.open(hl.getElementsByTagName("a")[0]);
			else if(hl.getElementsByTagName("a")[1].id.lastIndexOf("thread_gotonew", 0) === 0)
				window.open(hl.getElementsByTagName("a")[1]);
			else
				window.open(hl.parentNode.getElementsByTagName("td")[tdindex+1]
					.getElementsByTagName("a")[hl.parentNode.getElementsByTagName("td")[tdindex+1].getElementsByTagName("a").length - 1]);
		}
		else if(alt)
		{
			if(ttforum)
				window.open(hl.getElementsByClassName('threadbit-threadlink-pages')[0]
					.getElementsByTagName('a')[hl.getElementsByClassName('threadbit-threadlink-pages')[0].getElementsByTagName('a').length - 1]);
			else
				window.open(hl.getElementsByTagName("div")[0].getElementsByTagName("a")[hl
					.getElementsByTagName("div")[0].getElementsByTagName("a").length - 1]);
		}
		else if(hl.getElementsByTagName("a")[0].id.lastIndexOf("thread_gotonew", 0) === 0)
			window.open(hl.getElementsByTagName("a")[1]);
		else
			window.open(hl.getElementsByTagName("a")[0]);
	}
	else if(usercp && !intext && code == 13 && hl != null)
	{
		window.open(hl.getElementsByTagName("a")[0]);
	}
	else if(homepage && !intext && code == 13 && hl != null)
	{
		// Enter - open highlighted
		if(ctrl)
			window.open(hl.getElementsByTagName("a")[1]);
		else if(alt)
			window.open(hl.parentNode.getElementsByTagName('td')[tdindex+1].getElementsByTagName("a")[0]);
		else
			window.open(hl.getElementsByTagName("a")[0]);
	}
	else if((forum || ttforum) && !intext && !ctrl && code == 79)
	{
		// O - open all unread threads
		if(ttforum)
		{
			var linksj = document.getElementsByClassName("spritethreadbit-firstunread");
			for(var j = 0; j < linksj.length; j++)
				window.open(linksj[j].parentNode.href);
		}
		else
		{
			var linksj = document.getElementsByTagName("a");
			for(var j = 0; j < linksj.length; j++)
			{
				if(linksj[j].id.indexOf("gotonew") != -1)
					window.open(linksj[j].href);
			}
		}
	}
	else if(usercp && !intext && !ctrl && code == 79)
	{
		// O - open all unread
		var linksj = document.getElementById('collapseobj_usercp_subthreads').getElementsByTagName('tr');
		for(var j = 1; j < linksj.length - 1; j++)
		{
			if(linksj[j].getElementsByTagName('td')[2].getElementsByTagName('a')[0].id.lastIndexOf('thread_gotonew', 0) === 0)
				window.open(linksj[j].getElementsByTagName('td')[2].getElementsByTagName('a')[0]);
			else if(linksj[j].getElementsByTagName('td')[2].getElementsByTagName('a')[1].id.lastIndexOf('thread_gotonew', 0) === 0)
				window.open(linksj[j].getElementsByTagName('td')[2].getElementsByTagName('a')[1]);
		}
	}
	else if(!intext && !ctrl && code == 81 && hl != null)
	{
		// q - quote highlighted
		if(ttfthread)
		{
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			hl.getElementsByClassName('reply')[0].dispatchEvent(evt);
		}
		else if(thread)
			location.href = hl.getElementsByClassName('postbit_quote')[0];
	}
	else if(!intext && !ctrl && code == 84 && hl != null)
	{
		// t - thank/unthank highlighted
		if(ttfthread)
		{
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			if(hl.getElementsByClassName('thank')[0] != null)
				hl.getElementsByClassName('thank')[0].dispatchEvent(evt);
			else if(hl.getElementsByClassName('remove-thank')[0])
				hl.getElementsByClassName('remove-thank')[0].dispatchEvent(evt);
		}
		else if(thread)
		{
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			if(hl.getElementsByClassName('postbit_thanks')[0] != null)
				hl.getElementsByClassName('postbit_thanks')[0].dispatchEvent(evt);
			//else if(hl.getElementsByClassName('remove-thank')[0])
			//	hl.getElementsByClassName('remove-thank')[0].dispatchEvent(evt);
		}
	}
	else if(!intext && !ctrl && code == 77 && hl != null)
	{
		// m - multi-quote highlighted
		if(ttfthread)
		{
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			if(hl.getElementsByClassName('multiquote')[0] != null)
				hl.getElementsByClassName('multiquote')[0].dispatchEvent(evt);
		}
		else if(thread)
		{
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			if(hl.getElementsByClassName('postbit_multiquote_off')[0] != null)
				hl.getElementsByClassName('postbit_multiquote_off')[0].dispatchEvent(evt);
			else if(hl.getElementsByClassName('postbit_multiquote_on')[0])
				hl.getElementsByClassName('postbit_multiquote_on')[0].dispatchEvent(evt);
		}
	}
	else if(!intext && !ctrl && code == 82)
	{
		// r - reply to thread/post new thread
		if(thread)
			location.href = document.getElementsByClassName('vB_Navigation_PostReplyTop')[0];
		else if(ttfthread)
		{
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			document.getElementsByClassName('post-reply-button')[0].dispatchEvent(evt);
		}
		else if(ttforum)
		{
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			document.getElementsByClassName('post-question-button')[0].dispatchEvent(evt);
		}
	}
	else if(!intext && !ctrl && code == 70)
	{
		// f - follow/unfollow
		if(forum || ttforum)
		{
			if(document.getElementsByClassName('unfollow_forum')[0].style.display != 'none')
			{
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
				document.getElementsByClassName('unfollow_forum')[0].dispatchEvent(evt);
			}
			else
			{
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
				document.getElementsByClassName('follow_forum')[0].dispatchEvent(evt);
			}
		}
		else if(thread || ttfthread)
		{
			if(document.getElementsByClassName('unfollow_thread')[0].style.display != 'none')
			{
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
				document.getElementsByClassName('unfollow_thread')[0].dispatchEvent(evt);
			}
			else
			{
				var evt = document.createEvent("MouseEvents");
				evt.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
				document.getElementsByClassName('follow_thread')[0].dispatchEvent(evt);
			}
		}
	}
	else if(!intext && !ctrl && code >= 48 && code <= 57)
	{
		// 0-9: open links
		if(thread)
			window.open(hl.getElementsByClassName('postcontent')[0].getElementsByTagName('a')[code == 48 ? 10 : code - 49]);
		else if(ttfthread)
			window.open(hl.getElementsByClassName('postbit-postbody')[0].getElementsByTagName('a')[code == 48 ? 10 : code - 49]);
	}
	else if(!intext && !ctrl && code == 76 && hl != null)
	{
		// l - toggle tooltips display
		showtooltips = !showtooltips;
		tooltip.style.display = showtooltips ? 'block' : 'none';
	}
}
function isElementInViewport (el) {
	var rect = el.getBoundingClientRect();
	return (
			rect.top >= 0 &&
			rect.left >= 0 &&
			rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
			rect.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
}