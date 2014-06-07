// ==UserScript==
// @name           RMB Post Boost
// @namespace      lolz
// @description    Boost your RMB post count. This exploit works by forcing a post into a 20 page thread. RMB counts the post towards your post count, so your flooding isn't readily visible. 
// @include        http://www.ratemybody.com/*
// ==/UserScript==

// So the script works immediately, I've included a 20 page thread to exploit. However, this thread will likely be deleted quickly when RMB admins discover this script, and you will likely have to replace the two variables below with a different 20 page thread. 

var exploitsubmitpage = "http://www.ratemybody.com/forum/post.aspx?method=Reply&TOPIC_ID=877044&FORUM_ID=18&CAT_ID=3&Forum_Title=General/Miscellaneous%20nonsense&Topic_Title=RMB%20Ignore%20User%20Script&returnPage=5"

var exploitconfirmpage = "http://www.ratemybody.com/forum/5_-_877044.html"


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function GetCookie(sName)
{
  // cookies are separated by semicolons
  var aCookie = document.cookie.split("; ");
  for (var i=0; i < aCookie.length; i++)
  {
    // a name/value pair (a crumb) is separated by an equal sign
    var aCrumb = aCookie[i].split("=");
    if (sName == aCrumb[0]) 
      return unescape(aCrumb[1]);
  }
  // a cookie with the requested name does not exist
  return null;
}
var username = GetCookie('userID');
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (username != "547629"){
	var message = document.getElementById('txtMessage');
	var currentpage = location.href;
	var f = document.forms[2];
	if (currentpage == exploitsubmitpage){
		message.value = "Noobs";
		f.submit();
	}

	if (currentpage == exploitconfirmpage){
		window.location = exploitsubmitpage;
	}
}