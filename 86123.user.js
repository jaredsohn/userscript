// ==UserScript==
// @name           ELR Thread++
// @author         Eibwen
// @include        http://elitelinerider.com/thread.php*
// @include        http://*.elitelinerider.com/thread.php*
// @version        0.1
// ==/UserScript==

//First, get information from the thread starter!

var topic = document.getElementsByTagName("font")[1].innerHTML;
var person = document.getElementsByTagName("a")[0].innerHTML;
var topicclick = document.getElementsByTagName("a")[0].onClick;
var linkid = document.getElementsByTagName("a")[0].href;
var rank = document.getElementsByTagName("font")[2].innerHTML.substr(25);

var message = document.getElementsByTagName("pre")[0].innerHTML;

var replylist = "";
var pagelist = "<br /><font style='font-family: Verdana, Geneva, sans-serif; color: white; font-size: 12px;'>Pages: ";

var page = document.getElementsByTagName("td");
for (i = 0; i < page.length; i++) {
	if (page[i].innerHTML.substr(0, 5) == "Page:") {
		pagelist += page[i].innerHTML.substr(6);
	}
}

pagelist += "</font>";

var name = getElementsByClassName("commentleft");
for (i = 0; i < name.length; i++) {
	var rankc = name[i].getElementsByTagName("a")[0].innerHTML.substr(25, 32);
	var linkid = name[i].getElementsByTagName("a")[0].href;


	replylist += "<br /><div style='background-color: #333333; opacity: 0.8; -webkit-border-radius: 8px; -moz-border-radius: 8px;'>";
	replylist += "<div style='padding: 15px;'>";
	replylist += "<font style='font-family: Verdana, Geneva, sans-serif;' size='4'><a href='" + linkid + "' style='text-decoration: none; color: " + rankc + ";''>" + name[i].getElementsByTagName("font")[0].innerHTML + "</a></font>";
	if (rankc.substr(0, 6) == "yellow") { // Mod
		replylist += "<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipmod.gif' />";
		replylist += "<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Moderator</font>";
	} else if (rankc.substr(0, 3) == "red" || rankc.substr(0, 7) == "#800000") { // Admin
		replylist += "<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipad.gif' />";
		replylist += "<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Administrator</font>";
	} else if (rankc.substr(0, 7) == "#77ff77") { // Active Member
		replylist += "<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipam.gif' />";
		replylist += "<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Active Member</font>";
	} else if (rankc.substr(0, 7) == "#00cc00") { // Elite Member
		replylist += "<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipem.gif' />";
		replylist += "<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Elite Member</font>";
	} else if (rankc.substr(0, 7) == "#ff7f00") { // Elite Player
		replylist += "<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/Pip-test-2.gif' />";
		replylist += "<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Elite Player</font>";
	} else if (rankc.substr(0, 7) == "#0000ff") { // Movie Moderator
		replylist += "<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipmr.gif' />";
		replylist += "<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Movie Moderator</font>";
	} else if (rankc.substr(0, 7) == "#000000" || rankc.substr(0, 5) == "black") { // VIP
		replylist += "<br /><img src='http://i.imgur.com/nn4kf.gif' />";
		replylist += "<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Very Important Pickle</font>";
	} else if (rankc.substr(0, 7) == "#FF69B4") { // NOOB
		replylist += "<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipnub.gif' />";
		replylist += "<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>NOOB</font>";
	} else if (rankc.substr(0, 7) == "#CD00CC") { // Reputed
		replylist += "<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/piprep.gif' />";
		replylist += "<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Reputed</font>";
	} else { // Normal
		replylist += "<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipmem.gif' />";
		replylist += "<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Member</font>";
	}
	replylist += "<hr style='border: 0px; height: 1px; background-color: white;' />";
	
	var message2 = getElementsByClassName("commentright")[i].innerHTML;

	replylist += "<font style='word-wrap: break-word; white-space: pre-wrap; font-family: Verdana, Geneva, sans-serif; font-size: 12px; color: white; font-weight: normal;'>" + message2 + "</font>";

	replylist += "</div></div>";
}

// Clear thread!

document.getElementsByTagName("div")[3].innerHTML = "";

// Write thread!

document.write("<br /><br /><br /><div style='float: left;'><a href='forum.php?set=allbutton' style='font-family: Verdana, Geneva, sans-serif; text-decoration: none; font-size: 12px; color: white;' onmouseover='this.style.color=\"#FF0000\"' onmouseout='this.style.color=\"#FFFFFF\"'>ELR</a> <b style='color: white;'>></b> <a href='#' onClick='" + topicclick + "'><font style='font-family: Verdana, Geneva, sans-serif; color: red; font-size: 12px;'><b>" + topic + "</font></a></div><div style='float: right;'><form action='post.php' class='thread' method='POST'><input type='hidden' name='threadarea' value='chat' /><input name='threadid' type='hidden' value='4000'><input type='submit' style='background-image: url(/buttonback.gif); width: 140; border-color: maroon; background-color: maroon;' value='Post a Comment!'></form></div>");

//document.write("<hr style='border: 0px; height: 1px; background-color: white;' />");
document.write("<br /><br />");

// Topic starter

document.write("<div style='background-color: #610000; opacity: 0.8; -webkit-border-radius: 8px; -moz-border-radius: 8px;'>");
document.write("<div style='padding: 15px;'>");
document.write("<font style='font-family: Verdana, Geneva, sans-serif;'><a href='" + linkid + "' style='text-decoration: none;'>" + person + "</a></font>");

// Find out which rank he has!
if (rank.substr(0, 6) == "yellow") { // Mod
	document.write("<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipmod.gif' />");
	document.write("<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Moderator</font>");
} else if (rank.substr(0, 3) == "red" || rank.substr(0, 7) == "#800000") { // Admin
	document.write("<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipad.gif' />");
	document.write("<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Administrator</font>");
} else if (rank.substr(0, 3) == "red") { // Elite Admin
	document.write("<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipad.gif' />");
	document.write("<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Administrator</font>");
} else if (rank.substr(0, 7) == "#77ff77") { // Active Member
	document.write("<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipam.gif' />");
	document.write("<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Active Member</font>");
} else if (rank.substr(0, 7) == "#00cc00") { // Elite Member
	document.write("<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipem.gif' />");
	document.write("<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Elite Member</font>");
} else if (rank.substr(0, 7) == "#ff7f00") { // Elite Player
	document.write("<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/Pip-test-2.gif' />");
	document.write("<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Elite Player</font>");
} else if (rank.substr(0, 7) == "#0000ff") { // Movie Moderator
	document.write("<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipmr.gif' />");
	document.write("<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Movie Moderator</font>");
} else if (rank.substr(0, 7) == "#000000" || rank.substr(0, 5) == "black") { // VIP
	document.write("<br /><img src='http://i.imgur.com/nn4kf.gif' />");
	document.write("<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Very Important Pickle</font>");
} else if (rank.substr(0, 7) == "#FF69B4") { // NOOB
	document.write("<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipnub.gif' />");
	document.write("<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>NOOB</font>");
} else if (rank.substr(0, 7) == "#CD00CC") { // Reputed
	document.write("<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/piprep.gif' />");
	document.write("<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Reputed</font>");
} else { // Normal
	document.write("<br /><img src='http://i272.photobucket.com/albums/jj194/Hedgehogs4Me/pipmem.gif' />");
	document.write("<br /><font style='font-family: Verdana, Geneva, sans-serif; font-size: 12px; font-weight: bold; color: white;'>Member</font>");
}

document.write("<hr style='border: 0px; height: 1px; background-color: white;' />");

// Message, yay!

document.write("<font style='word-wrap: break-word; white-space: pre-wrap; font-family: Verdana, Geneva, sans-serif; font-size: 12px; color: white; font-weight: normal;'>" + message + "</font>");

document.write("</div>");
document.write("</div>");

document.write(replylist);
document.write(pagelist);

// Cookies :3

function get_cookie(cookie_name) {
	var results = document.cookie.match('(^|;) ?' + cookie_name + '=([^;]*)(;|$)');

	if (results)
		return (unescape(results[2]));
	else
		return null;
}

function getElementsByClassName(classname, node)  {
    if(!node) node = document.getElementsByTagName("body")[0];
    var a = [];
    var re = new RegExp('\\b' + classname + '\\b');
    var els = node.getElementsByTagName("*");
    for(var i=0,j=els.length; i<j; i++)
        if(re.test(els[i].className))a.push(els[i]);
    return a;
}