// ==UserScript==
// @name           'Message User' Quoting
// @namespace      'Message User' Quoting
// @description    Clicking the 'message user' link on a user's post will automatically quote his/her (lol, there are no girls) post.
// @include        http://*bungie.net/Account/Profile.aspx?postID=*
// @include        http://*bungie.net/Forums/posts.aspx?postID=*
// ==/UserScript==

if (document.URL.match(/Forums/i) && document.URL.match(/postID/i))
{
	var posts = document.getElementsByClassName("forumpost"), i = 1;
	for (i; i <= posts.length; i++)
	{
		var messageLink;
		if (i < 10)
		{
			if (!document.getElementById("ctl00_mainContent_postRepeater1_ctl0" + i + "_ctl00_postControl_skin_msgUser"))
			{
				continue;
			}
			else
			{
				document.getElementById("ctl00_mainContent_postRepeater1_ctl0" + i + "_ctl00_postControl_skin_msgUser").addEventListener("click", function() { var postCtl = this.id.substring(35,37); localStorage.setItem("quotedPostAuthor", document.getElementById("ctl00_mainContent_postRepeater1_ctl" + postCtl + "_ctl00_postControl_skin_usernameLink").textContent); localStorage.setItem("quotedPostContent", document.getElementById("ctl00_mainContent_postRepeater1_ctl" + postCtl + "_ctl00_postControl_skin_PostBlock").innerHTML); }, true);
			}
		}
		else
		{
			if (!document.getElementById("ctl00_mainContent_postRepeater1_ctl" + i + "_ctl00_postControl_skin_msgUser"))
			{
				continue;
			}
			else
			{
				document.getElementById("ctl00_mainContent_postRepeater1_ctl" + i + "_ctl00_postControl_skin_msgUser").addEventListener("click", function() { var postCtl = this.id.substring(35,37); localStorage.setItem("quotedPostAuthor", document.getElementById("ctl00_mainContent_postRepeater1_ctl" + postCtl + "_ctl00_postControl_skin_usernameLink").textContent); localStorage.setItem("quotedPostContent", document.getElementById("ctl00_mainContent_postRepeater1_ctl" + postCtl + "_ctl00_postControl_skin_PostBlock").innerHTML); }, true);
			}
		}

	}
}
else if (document.URL.match(/postID/i) && document.URL.match(/msg/i))
{
	var author = localStorage.getItem("quotedPostAuthor"), post = localStorage.getItem("quotedPostContent"), urllink, linkAddress, linkText, messageBox = document.getElementById("ctl00_mainContent_messageForm_skin_body");
	// Tankz, speedysurfer2205!
	post = post.replace(/%3C/g, "<");
	post = post.replace(/%20/g, " ");
	post = post.replace(/&gt;/g, ">");
	post = post.replace(/&amp;/g, "&");
	post = post.replace(/<br><br>\[Edited on (.*?)\]/, "");
	post = post.replace(/<br>/g, "\n");
	post = post.replace(/<i>/g, "[i]");
	post = post.replace(/<\/i>/g, "[/i]");
	post = post.replace(/<b>/g, "[b]");
	post = post.replace(/<\/b>/g, "[/b]");
	post = post.replace(/<u>/g, "[u]");
	post = post.replace(/<\/u>/g, "[/u]");
	urllink = post.match(/<a target=\"_blank\" href=\"(.*?)\">(.*?)<\/a>/g);
	if (urllink == null || urllink.length == 0)
	{
	}
	else
	{
		for (var i = 0; i < urllink.length; i++)
		{
			linkAddress = urllink[i].replace(/<a target=\"_blank\" href=\"/,"");
			linkAddress = linkAddress.replace(/\">(.*?)<\/a>/,"");
			linkText = urllink[i].replace(/<a target=\"_blank\" href=\"(.*?)\">/,"");
			linkText = linkText.replace(/<\/a>/,"");
			if (linkText == linkAddress)
			{
				post = post.replace(urllink[i], "[url]"+linkAddress+"[/url]");
			}
			else
			{
				post = post.replace(urllink[i], "[url="+linkAddress+"]"+linkText+"[/url]");
			}
		}
	}
	post = post.replace(/<span class=(.*?)IBBquotedtable(.*?)>/gi, "[quote]");
	post = post.replace(/<\/span>/g, "[/quote]");
	messageBox.value = "[quote][b]Posted by:[/b] " + author + "\n" + post + "[/quote]";
	messageBox.focus();
}
else
{
}