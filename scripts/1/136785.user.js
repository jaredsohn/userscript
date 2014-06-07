// ==UserScript==
// @name           Recent Group Posts
// @namespace      Recent Group Posts
// @include        http://*bungie.net*/Account/Profile.aspx
// @include 	   http://*bungie.net/fanclub/*/Forums/createpost.aspx*
// @include	   http://*bungie.net*/groupposts	
// @author	   robby118
// ==/UserScript==

var groupPostIndex;
if (localStorage.getItem("groupPostIndex"))
	groupPostIndex = localStorage.getItem("groupPostIndex");
else
	groupPostIndex = 0;

function getParameter(str, parameterName)
{
  parameterName = parameterName.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regexS = "[\\?&]"+parameterName+"=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(str);
  if(results == null) 
  {
    return "";
  } 
  else 	
  {
    return results[1];
  }
}

function getCookie(name) {
	var results = document.cookie.match(name + '=(.*?)(;|$)');
	if (results)
		return (unescape(results[1]));
	else
		return null;
}

if (document.URL.search(/profile/i) != -1)
{
	var profileBox = document.getElementsByClassName("profile").item(2), recentGroupPostURL = localStorage.getItem("recentGroupPostURL" + groupPostIndex), recentGroupPostDate = localStorage.getItem("recentGroupPostDate" + groupPostIndex);
	profileBox.innerHTML += '<li style="padding-left: 56px; margin-top: -24px;"><a href="/groupposts">Last Group Forum Post: '+recentGroupPostDate+'</a></li>';
}
else if (((document.URL.search(/fanclub/i)) != -1) && ((document.URL.search(/createpost/i)) != -1) && ((document.URL.search(/edit/i)) == -1))
{
	document.getElementById("ctl00_mainContent_postForm_skin_submitButton").addEventListener("click", function() { 
	var forumURL = document.getElementById("ctl00_backToIndexLink").href, postID = getParameter(document.URL, 'postID'), d = new Date(), m = d.getMonth() + 1, m_2 = m.toString(), da = d.getDate().toString(), y = d.getFullYear(), fullDate, postSubject = (document.URL.search(/reply/i) != -1) ? document.getElementById("ctl00_mainContent_postForm_skin_subjectPanel").childNodes[2].textContent : document.getElementById("ctl00_mainContent_postForm_skin_subject").value, groupName = document.getElementById("ctl00_forumHeader_groupForumsLink").textContent, postText = document.getElementById("ctl00_mainContent_postForm_skin_body").value, postTextFinal;
	postTextFinal = postText.substring(0,199);
	if (m_2.length < 2)
		m_2 = "0" + m_2;
	if (da.length < 2)
		da = "0" + da;
	fullDate = m_2 + "." + da + "." + y;
	if ((document.URL.search(/reply/i) != -1))
	{
		forumURL = forumURL.replace(getParameter(forumURL, 'forumID'), postID);
		forumURL = forumURL.replace(/topics.aspx/i, "posts.aspx");
		forumURL = forumURL.replace(/forumID/i, "postID");
	}
	else
	{
	}
	++groupPostIndex;
	localStorage.setItem("recentGroupPostURL" + groupPostIndex, forumURL);
	localStorage.setItem("recentGroupPostDate" + groupPostIndex, fullDate);
	localStorage.setItem("recentGroupPostGroupName" + groupPostIndex, groupName);
	localStorage.setItem("recentGroupPostSubject" + groupPostIndex, postSubject);
	localStorage.setItem("recentGroupPostText" + groupPostIndex, postTextFinal);
	localStorage.setItem("groupPostIndex", groupPostIndex);
	}, true); 
}
else if (document.URL.search(/groupposts/i) != -1)
{
	document.title = "Bungie.net : Recent Group Posts";
	var baseStylesheet = window.document.createElement('link'), contentBlock = document.getElementsByClassName("content").item(0), username = getCookie("BungieDisplayName"); 
	baseStylesheet.rel = 'stylesheet';
	baseStylesheet.type = 'text/css';
	baseStylesheet.href = '/base_css/base.css';
	document.getElementsByTagName("head").item(0).appendChild(baseStylesheet);
	contentBlock.innerHTML = '<div class="block-b" style="width: 90%;"><h2>Recent Group Posts <a href="javascript: void(0);" style="text-transform: none;">(clear all)</a></h2></div>';
	for (var i = groupPostIndex; i > 0; i--)
	{
		var recentGroupPostURL = localStorage.getItem("recentGroupPostURL" + i), recentGroupPostDate = localStorage.getItem("recentGroupPostDate" + i), recentGroupPostGroupName = localStorage.getItem("recentGroupPostGroupName" + i), recentGroupPostSubject = localStorage.getItem("recentGroupPostSubject" + i), recentGroupPostText = localStorage.getItem("recentGroupPostText" + i);
		contentBlock.innerHTML += '<ul class="arrow2" id="groupPost'+i+'"><li><h6 class="restrict_text"><strong><a href="'+recentGroupPostURL+'">'+username+' : '+recentGroupPostGroupName+' : '+recentGroupPostSubject+'</a></strong></h6><p class="restrict_text" style="font-size: 12px; font-family: Arial; color: #BBBBBB;">'+recentGroupPostText+'</p><p style="font-size: 12px; font-family: Arial; color: #BBBBBB;"><i>Posted - '+recentGroupPostDate+'</i></p></li></ul>';
	}
	document.getElementsByClassName("block-b").item(0).getElementsByTagName("a").item(0).addEventListener("click", function() { localStorage.setItem("groupPostIndex", 0); location.reload(); }, false);
}
else
{
	// Poop.
}