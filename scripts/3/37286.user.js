// ==UserScript==
// @name           LJ Profile Reset
// @namespace      http://axisofevil.net/~xtina/
// @description	   Resets the LJ user profile.
// @include        http://*.livejournal.com/profile*
// @include        http://*.livejournal.com/*/profile*
// @include        http://*.livejournal.com/userinfo.bml*
// @exclude        http://*.livejournal.com/*/*/profile*
// @author         the-xtina@livejournal.com
// ==/UserScript==

/*
This resets the userpage back to the best view.  I am going based on cached
copies of several types of LJ profiles (via archive.org):

http://web.archive.org/web/20070624130131/http://the-xtina.livejournal.com/profile
*/

// Set the three variables firstmost.  If you're not using Firefox, edit the
// true/false bits here.
var debug = false;     // If true, appends the new profile to the existing one.
var ljvSwitch = true;  // If false, hides virtual gift images.
var ljBanUser = false; // If true, adds a button for banning users.

//# Stop editing!


// Firefox?
var isFF = true;
if (navigator.userAgent.indexOf("Firefox") == -1) isFF = false;

// This block is for Firefox only.
if (isFF) {
	GM_registerMenuCommand("LJ Profile Reset Options", ljOptions);
	// Grab those values.
	var debug = GM_getValue("debug", "false");
	var ljvSwitch = GM_getValue("vgifts", "false");
	var ljBanUser = GM_getValue("banning", "false");
}

/* *** */


/*
 * First things first.
 */

// These are items that don't appear on the page.  Change them here for your
// language.  Do NOT change anything with __ around it, such as __USER__.
// Also, it should be obvious what's text and what's links.
var ljAccountType_Title = "Account type";  // Paid, permanent, &c.
var ljBanMsg = "Ban this user.";
var ljComments_Title = "Comments";  // This could be better...
var ljCommPost = "Posted";  // Comments posted.
var ljCommRecd = "Received";  // Comments received.
var ljUser_Title = "User";
var ljMaintainers_Title = "Maintainers";
var ljMembers_Title = "Members";
var ljModerators_Title = "Moderators";
var ljMore = "(more details...)";  // The text to link to ?mode=full.
var ljGrease = "Go to the LJ Profile Reset script page.";
var ljTopU = 'Below is user information for __USER__. If you are this user, you can edit your information (or choose what information is considered public) at the <a href="http://www.livejournal.com/editinfo.bml">Edit Info page</a>.';
var ljTopC = 'Below is user information about the <b>__USER__</b> community. ';
var ljTopCJ = 'To join this community, <a href="http://www.livejournal.com/community/join.bml?comm=__USER__">click here</a>.';
var ljTopCL = 'You may <a href="http://www.livejournal.com/community/leave.bml?comm=__USER__">leave the community</a> at any time.';
var ljTopF = 'Below is information about the <b>__USER__</b> feed.';
var ljTopFA = ' If you would like articles from the syndicated site to appear on your friends page, you can <a href="http://www.livejournal.com/friends/add.bml?user=__USER__">add this feed to your friends list</a>.';
var ljTopO = 'Below is information about the <b>__USER__</b> __TYPE__ account.';
var ljWatchedBy_Title = "Watched by";


// Used in the "Label (#):" items.
var patt = /> (.*) \((.*)\)/;  // > Friends (#):
var patt2 = /> (.*):/;         // > Friends:
var patt3 = /^(.*) \((.*)\)/;  // Interests (#);


// This'll be the new profile-y table.
var ljTable = document.createElement("table");
ljTable.setAttribute("border", "0");
ljTable.setAttribute("width", "100%");
ljTable.setAttribute("cellpadding", "6");
ljTable.setAttribute("cellspacing", "-1");


// What kind of profile: community, syndicated, user, &c?  Full profile or no?
var ljFull = window.location.href;

// The action strip (add journal, track user, &c &c).  Had to bump it up here.  Thanks, LJ.
var ljStrip = getElementsByClassName(document, "div", "actions")[0].childNodes[0].childNodes;

var ljType = ljStrip[0].getAttribute("title").toLowerCase();
if (ljType.indexOf("feed") > -1) {
	ljType = 'S';
} else if (ljType.indexOf("community") > -1) {
	ljType = 'C';
} else if (ljFull.substr(0, 12) == "http://news.") {
	ljType = 'N';
} else if (ljType.indexOf("friend") > -1) {
	ljType = 'U';
}
if (ljType.length > 1 || ljType == 'U') {
	ljFull.indexOf("userinfo.bml") > -1 ? ljType = 'O' : ljType = 'U';
}

// Moving on...
ljFull.indexOf("mode=full") == -1 ? ljFull = false : ljFull = true;

// I checked; there's nothing interesting there.
if (ljType == "S" || ljType == "O") ljFull = false;

// This part's just for the banned-user button.  No sense displaying it if you
// can't ban people because you're logged out.
if (ljBanUser) {
	var tmpBan = document.getElementsByTagName("body")[0].getAttribute("class"); // Horizon, Vertigo, Lynx
	if (tmpBan) {
		if (tmpBan.indexOf("logged-out") > -1) ljBanUser = false;
	}
	if (document.getElementById("login")) ljBanUser = false;  // Dystopia, Xcolibur
}

/* ***** */


/*
 * The top bar stuff.
 */

// The userpic block.  Thank gord it's always the same and always present.
var ljUserpic = getElementsByClassName(document, "div", "userpicdiv")[0].innerHTML;


// A note:
// - ljUsername is the actual LJ username.
// - ljUser is the username code, with lj-user icon and bolding and cetera.
// - ljName is the name the user sets for themself.
var ljUser = getElementsByClassName(document, "div", "username")[0];

// Real quick, get the username.
var ljUsername = ljUser.childNodes[0].childNodes[1].childNodes[0].innerHTML;
ljUsername = ljUsername.replace(/\*/g, "");

// What type of external account is it, if applicable?
// This looks at the userhead image code.
if (ljType == "O") {
	var tmpThing = ljUser.childNodes[0].childNodes[0].innerHTML;
	var ljExtType = "";
	if (tmpThing.indexOf("twitter") > -1) {
		ljExtType = "Twitter";
	} else if (tmpThing.indexOf("openid") > -1) {
		ljExtType = "Open ID";
	} else if (tmpThing.indexOf("facebook") > -1) {
		ljExtType = "Facebook";
	} else if (tmpThing.indexOf("google") > -1) {
		ljExtType = "Google";
	} else if (tmpThing.indexOf("mailru") > -1) {
		ljExtType = "Mail.ru";
	} else if (tmpThing.indexOf("vkontakte") > -1) {
		ljExtType = "Vkontakte";
	}
}
ljUser = ljUser.innerHTML;

// User notes?
if (ljUser.indexOf("<span class=\"alias-value\">") > -1) {
	ljUser = ljUser.split('<span class="alias-value">');
	var ljNote = '<span style="font-style: italic; margin-left: 16px;"><img src="http://pics.livejournal.com/the_xtina/pic/00058h56" /> ' + ljUser[1].substr(2, ljUser[1].length - 2);
	ljUser = ljUser[0];
}


// Title and subtitle, for non-feeds only.
var ljTitleblock;
if (ljType != "S") {
	var ljTitle = getElementsByClassName(document, "p", "journal_title")[0];
	if (ljTitle) ljTitle = '<b>' + ljTitle.innerHTML + '</b>';
	var ljSubtitle = getElementsByClassName(document, "p", "journal_subtitle")[0];
	if (ljSubtitle != null) ljSubtitle = '<i>' + ljSubtitle.innerHTML + '</i>';

	if (ljTitle != null && ljSubtitle != null) {
		ljTitleblock = "<br /><div style='font-size:12pt;'>" + ljTitle + "<br />" + ljSubtitle + "</div><br />";
	} else if (ljTitle != null && ljSubtitle == null) {
		ljTitleblock = "<br /><div style='font-size:12pt;'>" + ljTitle + "</div><br />";
	} else if (ljTitle == null && ljSubtitle != null) {
		ljTitleblock = "<br /><div style='font-size:12pt;'>" + ljSubitle + "</div><br />";
	}
}


// The details_stats chunk.
var ljDetails = getElementsByClassName(document, "div", "details_stats")[0].childNodes;
for (var x = 0; x < ljDetails.length; x++) {
	var tmpThing = ljDetails[x].innerHTML;
// User number, created/joined, last updated.  All on one line.
	if (tmpThing.indexOf(" (#") > -1) {
		var tmpArray = tmpThing.split(",")[0].split(" ");
		ljUser += ' ' + tmpArray.pop();

		var ljCreated = tmpArray.pop();
		ljCreated += ' ' + tmpArray.pop();
		var ljCreated_Title = tmpArray.join(" ");

		if (ljDetails[x].childNodes.length == 1) {
			var ljUpdated = "Never updated";
		} else {
			var ljUpdated = ljDetails[x].childNodes[1].childNodes[0].nodeValue;
			ljUpdated += ', <em>' + ljDetails[x].childNodes[1].getAttribute("title") + '</em>';
// Nudge.
			var ljNudge;
			if (ljDetails[x].childNodes.length == 5) {
				ljNudge = '<a href="http://www.livejournal.com/friends/nudge.bml?user=' + ljUsername + '">';
				ljNudge += '<img src="http://pics.livejournal.com/the_xtina/pic/0003azh0" style="border-width: 1px; border-style: solid; border-color: #FFF #666 #666 #FFF; margin: 0 4px 3px 4px; vertical-align: middle;" alt="Nudge this user." title="Nudge this user."></a>';
			}
		}
		if (ljType != "O") {
			var ljUpdated_Title = ljDetails[x].childNodes[0].nodeValue.split(", ")[1];
			ljUpdated_Title = trim(ljUpdated_Title.substr(0, 1).toUpperCase() + ljUpdated_Title.substr(1));
		}
// Account type.
	} else if (tmpThing.toLowerCase().indexOf("<strong") > -1) {
		var ljAccountType = ljDetails[x].innerHTML;
		ljAccountType = ljAccountType.replace(/<\/strong>.*/, "");
		ljAccountType = ljAccountType.replace(/<strong>/, "");
// Adult concepts, oh noes!
	} else if (tmpThing.toLowerCase().indexOf("warning.gif") > -1) {
		var ljAdult = '<p>' + tmpThing + '</p>';
// Oh lord.  Comments and support points.
	} else {
		var tmpArray = tmpThing.split(", ");
		var ljComments = "";
		for (var y = 0; y < tmpArray.length; y++) {
			switch(y) {
				case 0:
					ljComments += '<b>' + ljCommRecd + '</b> ' + tmpArray[y].split(" ")[0]; break;
				case 1:
					ljComments = '<b>' + ljCommPost + '</b> ' + tmpArray[y].split(" ")[0] + ' - ' + ljComments; break;
				case 2:
					var ljSupport = tmpArray[y].split(" <a")[0];
					var ljSupport_Title = '<a' + tmpArray[y].split(" <a")[1]; break;
			}
		}
	}
}


// The links line.
tmpThing = getElementsByClassName(document, "div", "details_links")[0].childNodes[0].childNodes;
for (x = 1; x < tmpThing.length; x += 2) {
	var tmpThing2 = tmpThing[x].getAttribute("href");

// Userpics count.
	if (tmpThing2.indexOf("allpics.bml") > -1) {
		var ljPic = tmpThing[x - 1].nodeValue;
		if (ljPic.substr(0, 1) == ',') ljPic = ljPic.substr(2);
		ljPic = '<a href="' + tmpThing2 + '">' + ljPic + '</a>';
		var ljPic_Title = tmpThing[x].innerHTML;
// Virtual gifts.  The count only.
	} else if (tmpThing2.indexOf("vgift.bml") > -1) {
		var ljVgiftsCt = tmpThing[x - 1].nodeValue;
		if (ljVgiftsCt.substr(0, 1) == ',') ljVgiftsCt = ljVgiftsCt.substr(2);
		ljVgiftsCt = '<a href="' + tmpThing2 + '">' + ljVgiftsCt + '</a>';
		var ljVgiftsCt_Title = tmpThing[x].innerHTML;
// Memories.
	} else if (tmpThing2.indexOf("memories.bml") > -1) {
		var ljMemories = tmpThing[x - 1].nodeValue;
		if (ljMemories.substr(0, 1) == ',') ljMemories = ljMemories.substr(2);
		ljMemories = '<a href="' + tmpThing2 + '">' + ljMemories + '</a>';
		var ljMemories_Title = tmpThing[x].innerHTML;
// Scrapbook.
	} else if (tmpThing2.indexOf("pics.livejournal") > -1) {
		var ljPictures = tmpThing[x - 1].nodeValue;
		if (ljPictures.substr(0, 1) == ',') ljPictures = ljPictures.substr(2);
		ljPictures = '<a href="' + tmpThing2 + '">' + ljPictures + '</a>';
		var ljPictures_Title = tmpThing[x].innerHTML;
// Tags.
	} else if (tmpThing2.indexOf("/tag/") > -1) {
		var ljTags = tmpThing[x - 1].nodeValue;
		if (ljTags.substr(0, 1) == ',') ljTags = ljTags.substr(2);
		ljTags = '<a href="' + tmpThing2 + '">' + ljTags + '</a>';
		var ljTags_Title = tmpThing[x].innerHTML;
// Entries.
	} else {
		var ljEntries = tmpThing[x - 1].nodeValue;
		var ljEntries_Title = tmpThing[x].innerHTML;
	}
}


// The action strip (add journal, track user, &c &c).
// ljStrip was defined way earlier, due to ljType issues.
var ljActions = '<br />\n<span style="-moz-border-radius: 5px; -webkit-border-radius: 5px; border: 1px solid #8FC3F7; background-color: #C5DFF9; padding: 5px;">\n';

for (var x = 0; x < ljStrip.length; x++) {
	// 2 == disabled.
	if (ljStrip[x].childNodes.length == 1) {
		ljStrip[x].childNodes[0].removeChild(ljStrip[x].childNodes[0].childNodes[1]);
		ljActions += '<span class="' + ljStrip[x].getAttribute("class") + '" title="' + ljStrip[x].getAttribute("title") + '"';
		if (ljStrip[x].getAttribute("style")) {
			ljActions += ' style="' + ljStrip[x].getAttribute("style") + '"';
		}
		ljActions += ">\n" + ljStrip[x].innerHTML + "</span>\n";
	}
}
if (ljNudge) {
	ljActions += "<span>" + ljNudge + "</span>";
}
if (ljBanUser) {
	ljActions += "<span><a href=\"http://www.livejournal.com/admin/console/?prefill=ban_set%20" + ljUsername + "\"><img src=\"http://pics.livejournal.com/the_xtina/pic/0005gbh2\" ";
	ljActions += "title=\"" + ljBanMsg + "\" alt=\"" + ljBanMsg + "\" height=18 /></a></span>";
}
ljActions += "</span>\n";

// Deborder the images.
ljActions = ljActions.replace(/<img /gi, '<img style="border-width: 1px; border-style: solid; border-color: #FFF #666 #666 #FFF; margin: 0 4px 3px 4px; vertical-align: middle;" ');


// Make that LJ Note button work!
if (isFF) {  // I  need to learn this stuff for !FF.  :/
	window.addEventListener("mouseover", function checkItem(event) {
		if (getElementsByClassName(document, "div", 'ippu lj_ippu').length > 0) {
			GM_setValue("ljnote", "yes");
		} else {
			if (GM_getValue("ljnote") == "yes") {
				if (getElementsByClassName(document, "span", 'profile_addalias')[0].style.display=="block")
					getElementsByClassName(document, "span", 'profile_addalias')[0].style.display='inline';

				if (getElementsByClassName(document, "span", 'profile_addalias')[1].style.display=="block")
					getElementsByClassName(document, "span", 'profile_addalias')[1].style.display='inline';

				GM_setValue("ljnote", "no");
			}
		}
	}, false);

	window.addEventListener("click", function checkItem(event) {
		if (getElementsByClassName(document, "div", 'ippu lj_ippu').length > 0) {
			GM_setValue("ljnote", "yes");
		} else {
			if (GM_getValue("ljnote") == "yes") {
				if (getElementsByClassName(document, "span", 'profile_addalias')[0].style.display=="block")
					getElementsByClassName(document, "span", 'profile_addalias')[0].style.display='inline';

				if (getElementsByClassName(document, "span", 'profile_addalias')[1].style.display=="block")
					getElementsByClassName(document, "span", 'profile_addalias')[1].style.display='inline';

				GM_setValue("ljnote", "no");
			}
		}
	}, false);
}


/* ***** */


/*
 * Virtual Gifts, if any.  Only if set to true.
 */

if (ljvSwitch) {
	tmpThing = document.getElementById("vgifts_header");
	if (tmpThing) {
		var ljVgifts_Title = trim(tmpThing.childNodes[1].nodeValue);
		ljVgifts_Title = "<a href=\"http://www.livejournal.com/manage/vgift.bml?u=" + ljUsername + "\">" + ljVgifts_Title.replace(" ", "<br />") + "</a>:";
		var ljVgifts_Imgs = document.getElementById("vgifts_body").innerHTML;
	} else {
		// If the user has no recent vgifts and images are on, switch to count.
		ljvSwitch = false;
	}
}


/*
 * The Basic Info section.
 */

// Name, syndicated from, &c &c.
tmpThing = getElementsByClassName(document, "div", "userinfo");

if (tmpThing.length > 0) {
	tmpThing = tmpThing[0].getElementsByTagName("tr");
	var ljInfo = new Array();
	var ljInfo_Title = new Array();
	for (var x = 0; x < tmpThing.length; x++) {
		ljInfo_Title.push(tmpThing[x].childNodes[0].innerHTML);
		ljInfo.push(tmpThing[x].childNodes[1].innerHTML);
	}
}


/* Interlude!  After the above due to ljName. */

// Set the topmost row.
var tmpCell = document.createElement("td");
tmpCell.setAttribute("colspan", "3");
tmpCell.innerHTML = '<a href="http://userscripts.org/scripts/show/37286"><img src="http://pics.livejournal.com/the_xtina/pic/00039w7c" border=0 title="' + ljGrease + '"></a>&nbsp;';
if (ljType == "U" || ljType == "N") {
	tmpCell.innerHTML += ljTopU;
} else if (ljType == "C") {
	tmpCell.innerHTML += ljTopC;
	if (ljActions.indexOf("join.bml") > -1) {
		tmpCell.innerHTML += ljTopCJ;
	} else {
		tmpCell.innerHTML += ljTopCL;
	}
} else if (ljType == "O") {
	tmpCell.innerHTML += ljTopO;
	tmpCell.innerHTML = tmpCell.innerHTML.replace(/__TYPE__/gi, ljExtType);
} else {
	tmpCell.innerHTML += ljTopF;
	if (ljActions.indexOf("add-feed.gif") > -1) {
		tmpCell.innerHTML += ljTopFA;
	}
}
tmpCell.innerHTML = tmpCell.innerHTML.replace(/__USER__/gi, ljUsername);


var tmpRow = document.createElement("tr");
tmpRow.appendChild(tmpCell);
tmpRow.setAttribute("valign", "top");
ljTable.appendChild(tmpRow);

// Is there an adult warning?  Add that too.
if (ljAdult) {
	tmpCell = document.createElement("td");
	tmpCell.setAttribute("colspan", "3");
	tmpCell.innerHTML = ljAdult;
	var tmpRow = document.createElement("tr");
	tmpRow.appendChild(tmpCell);
	tmpRow.setAttribute("valign", "top");
	ljTable.appendChild(tmpRow);
}

// Add the actionstrip to the table.
if (ljActions.length > 150) {
	tmpCell = document.createElement("td");
	tmpCell.setAttribute("colspan", "3");
	tmpCell.setAttribute("id", "actrip");
	tmpCell.setAttribute("align", "center");
	tmpCell.innerHTML = ljActions;
	// Remove disabled actions.
	for (var xyz = 0; xyz < tmpCell.childNodes[1].childNodes.length; xyz++) {
		var zyx = tmpCell.childNodes[1].childNodes[xyz];
		if (zyx.nodeName == "SPAN") {
			if (zyx.childNodes[0].nodeName != "A") {
				zyx.parentNode.removeChild(zyx);
			}
		}
	}
	tmpRow = document.createElement("tr");
	tmpRow.appendChild(tmpCell);
	tmpRow.setAttribute("valign", "top");
	ljTable.appendChild(tmpRow);
}

/* /interlude */

// All chat thingies blah blah users only.  As they're product names,
// translation doesn't apply.
if (ljType == "U") {
	tmpThing = getElementsByClassName(document, "div", "external_services");
	if (tmpThing.length > 0) {
		var ljExtSvcs = new Array();
		tmpThing = tmpThing[0].childNodes[1].childNodes[0];
		if (tmpThing.nodeName.toLowerCase() == "#text") {
			tmpThing = tmpThing.nextSibling;
		}
		tmpThing = tmpThing.childNodes;
		for (x = 0; x < tmpThing.length; x = x + 2) {
			if (tmpThing[x].innerHTML.indexOf("openid") > -1 || tmpThing[x].innerHTML.indexOf("facebook") > -1 || tmpThing[x].innerHTML.indexOf("twitter") > -1)
				var q = 3;
			else
				var q = 1;

			ljExtSvcs.push(tmpThing[x].getAttribute("class") + ' || ' + tmpThing[x].childNodes[q].innerHTML);
		}
	}
}

// Contact block.
if (ljType == "U") {
	var ljContact = getElementsByClassName(document, "div", "contact");
	if (ljContact.length == 1) {
		var ljContact_Title = ljContact[0].childNodes[0].innerHTML;
		ljContact = ljContact[0].innerHTML.split("</p>")[1];
	} else {
		ljContact = undefined;
	}
}


// Schools.
if (ljType == "U") {
	tmpThing = getElementsByClassName(document, "div", "schools");
	if (tmpThing.length > 0) {
		tmpThing = tmpThing[0].childNodes;
		var ljSchools = "";
		for (x = 0; x < tmpThing.length; x++) {
			if (tmpThing[x].tagName == "P") {
				var ljSchools_Title = trim(tmpThing[x].childNodes[0].nodeValue);
				if (ljSchools_Title.substr(-1) == ":") ljSchools_Title = ljSchools_Title.substr(0, ljSchools_Title.length - 1);
			} else if (tmpThing[x].tagName == "SPAN") {
				ljSchools += tmpThing[x].innerHTML;
				if (x < tmpThing.length) ljSchools += "<br />";
			}
		}
	}
}


/* ***** */


/*
 * Bio and interests.  Together because why not.
 */

// Bio.
var ljBio = document.getElementById("bio_body");
if (ljBio) {
	ljBio = ljBio.innerHTML;
	var ljBio_Title = trim(document.getElementById("bio_header").childNodes[1].nodeValue);
}


// Interests.
if (ljType != "S") {
	var tmpThing = document.getElementById("interests_body");
	if (tmpThing) {
		tmpThing2 = tmpThing.childNodes[0].innerHTML;
		if (tmpThing2.indexOf("interests.bml") > -1) {
			var ljInterests = "<b>" + patt3.exec(tmpThing2)[2] + ":</b> " + tmpThing.childNodes[1].innerHTML;
			ljInterests_Title = '<a href="http://www.livejournal.com/interests.bml">' + patt3.exec(tmpThing2)[1] + '</a>:<br /><small>[<';

			tmp = tmpThing2.split("<");
			ljInterests_Title += tmp[2] + "</a>]";
			if (tmp.length == 9) ljInterests_Title += "<br />[<" + tmp[6] + "</a>]";
			ljInterests_Title += "</small>";
		}
	}
}


/* ***** */


/*
 * The friends/readers/maintainers/&c section.
 */

if (ljType == "U") {

//Friends...
	var ljFriendsBlock = "<table border=0>";
	tmpThing = document.getElementById("friends_header").innerHTML;
	var ljFriends_Title = patt.exec(tmpThing);
	if (!ljFriends_Title)
		ljFriends_Title = patt2.exec(tmpThing)[1];
	else
		ljFriends_Title = patt.exec(tmpThing)[1];

	tmpThing = document.getElementById("friends_body");
	if (tmpThing) {
		var ljFriends = '<tr valign="top"><td nowrap>';
		tmpThing = tmpThing.innerHTML;
		if (tmpThing.indexOf("friendlist.bml") > -1) {
			ljFriends += tmpThing;
		} else {
			tmpThing2 = tmpThing;
			tmpThing = document.getElementById("friends_header").innerHTML;
			ljFriends += '<img src="http://l-stat.livejournal.com/img/userinfo.gif" style="vertical-align: middle;">&nbsp;<b>' + patt.exec(tmpThing)[2] + '</b>:</td><td>' + tmpThing2;
		}
		ljFriends += '</td></tr>';
	} else {
		ljFriends = "0 " + ljFriends_Title.substr(0, 1).toLowerCase() + ljFriends_Title.substr(1);
	}

	// Communities: watching goes in Friends, member is its own, same with posting access.
	if (ljFriends.indexOf("friendlist.bml") == -1) {
		tmpThing = document.getElementById("watching_body");
		if (tmpThing) {
			// Partners.
			var tmpPart = document.getElementById("watching_body").getElementsByTagName("p");
			if (tmpPart.length > 0) {
				tmpPart = tmpPart[0];
				var ljPartners = '<tr valign="top"><td nowrap><img src="http://l-stat.livejournal.com/img/partnercomm.gif" style="vertical-align: middle;">&nbsp;<b>';
				tmp = tmpPart.childNodes[0].innerHTML;
				ljPartners += patt.exec(tmp)[2] + '</b>:</td><td>' + tmpPart.childNodes[2].innerHTML;

				// Remove from the watching block.
				document.getElementById("watching_body").removeChild(document.getElementById("watching_body").getElementsByTagName("p")[0]);
			}
			tmpThing = tmpThing.innerHTML;
			if (tmpThing.substr(0, 9) != "This user") {
				var ljWatching = tmpThing;
				tmpThing = document.getElementById("watching_header").innerHTML;
				ljWatching = '<tr valign="top"><td nowrap><img src="http://l-stat.livejournal.com/img/community.gif" style="vertical-align: middle;">&nbsp;<b>' + patt.exec(tmpThing)[2] + '</b>:</td><td>' + ljWatching;
			}
		}
	}

	// Member of...
	tmpThing = document.getElementById("mofs_body");
	if (tmpThing) {
		tmpThing = tmpThing.innerHTML;
		var ljMemberOf = tmpThing;
		tmpThing = document.getElementById("mofs_header").innerHTML;
		var ljMemberOf_Title = patt.exec(tmpThing)[1];
		ljMemberOf = '<b>' + patt.exec(tmpThing)[2] + '</b>: ' + ljMemberOf;
	}

// Where can I, the user, post to?
	tmpThing = document.getElementById("posting_body");
	if (tmpThing) {
		tmpThing = tmpThing.innerHTML;
		var ljPosting = tmpThing;
		tmpThing = document.getElementById("posting_header").innerHTML;
		var ljPosting_Title = patt.exec(tmpThing)[1];
		ljPosting = '<b>' + patt.exec(tmpThing)[2] + '</b>: ' + ljPosting;
	}

// Mutual...
	tmpThing = document.getElementById("mutual_body");
	if (tmpThing) {
		tmpThing = tmpThing.innerHTML;
		var ljMutual = tmpThing;
		tmpThing = document.getElementById("mutual_header").innerHTML;
		var ljMutual_Title = patt.exec(tmpThing)[1];
		ljMutual = '<b>' + patt.exec(tmpThing)[2] + '</b>: ' + ljMutual;
	}

// Also friend of...
	tmpThing = document.getElementById("fofs_body");
	if (tmpThing) {
		tmpThing = tmpThing.innerHTML;
		var ljFriendOf = tmpThing;
		tmpThing = document.getElementById("fofs_header").innerHTML;
		var ljFriendOf_Title = patt.exec(tmpThing)[1];
		ljFriendOf = '<b>' + patt.exec(tmpThing)[2] + '</b>: ' + ljFriendOf;
	}

// Feeds...
	if (ljFriends.indexOf("friendlist.bml") == -1) {
		tmpThing = document.getElementById("watchingfeeds_body");
		if (tmpThing) {
			tmpThing = tmpThing.innerHTML;
			if (tmpThing.substr(0, 9) != "This user") {
				var ljFeeds = tmpThing;
				tmpThing = document.getElementById("watchingfeeds_header").innerHTML;
				ljFeeds = '<tr valign="top"><td nowrap><img src="http://l-stat.livejournal.com/img/syndicated.gif" style="vertical-align: middle;">&nbsp;<b>' + patt.exec(tmpThing)[2] + '</b>:</td><td>' + ljFeeds;
			}
		}
	}

// Games.
	tmpThing = document.getElementById("apps");
	if (tmpThing) {
		tmpThing = tmpThing.innerHTML;
		var ljGames = tmpThing;
		tmpThing = document.getElementById("apps_header").innerHTML;
		var ljGames_Title = '<a href="http://www.livejournal.com/games/info.bml?user=' + ljUsername + '">' + patt.exec(tmpThing)[1] + '</a>:';
		ljGames = document.getElementById("apps_body").childNodes[0].innerHTML;
		ljGames = ljGames.replace(/<li>/g, "");
		ljGames = ljGames.replace(/<\/li>/g, "<br />");
	}

// Friendsblock.
	ljFriendsBlock = ljFriendsBlock + ljFriends;
	if (ljWatching) ljFriendsBlock = ljFriendsBlock + ljWatching;
	if (ljPartners) ljFriendsBlock = ljFriendsBlock + ljPartners;
	if (ljFeeds) ljFriendsBlock = ljFriendsBlock + ljFeeds;

} else if (ljType == "C") {
// Maintainers.
	tmpThing = document.getElementById("maints_body");
	if (tmpThing) {
		tmpThing = tmpThing.innerHTML;
		var ljMaintainers = tmpThing;
		tmpThing = document.getElementById("maints_header").innerHTML;
		ljMaintainers = "<b>" + patt.exec(tmpThing)[2] + "</b>: " + ljMaintainers;
	}

// Moderators
	tmpThing = document.getElementById("mods_body");
	if (tmpThing) {
		tmpThing = tmpThing.innerHTML;
		var ljModerators = tmpThing;
		tmpThing = document.getElementById("mods_header").innerHTML;
		ljModerators = "<b>" + patt.exec(tmpThing)[2] + "</b>: " + ljModerators;
	}

// Members.
	tmpThing = document.getElementById("members_body");
	if (tmpThing) {
		tmpThing = tmpThing.innerHTML;
		if (tmpThing.indexOf("View all") > -1) {
			var ljMembers = '<a href="http://www.livejournal.com/directory.bml?s_fro=1&fro_user=' + ljUsername + '">View all</a>';
		} else {
			var ljMembers = tmpThing;
		}
		tmpThing = document.getElementById("members_header").innerHTML;
		ljMembers = "<b>" + patt.exec(tmpThing)[2] + "</b>: " + ljMembers;
	}

// Watched by.
	tmpThing = document.getElementById("fofs_body");
	if (tmpThing) {
		tmpThing = tmpThing.innerHTML;
		var ljWatchedBy = tmpThing;
		tmpThing = document.getElementById("fofs_header").innerHTML;
		ljWatchedBy = "<b>" + patt.exec(tmpThing)[2] + "</b>: " + ljWatchedBy;
	}
}


/* ***** */


/*
 * Set things.  To never see an item on a profile (e.g., "Gizmo5 Project"),
 * just comment out the appropriate line(s) below.  I tried to be clear with
 * variable names, so as to make it easier on yall.
 */

// Always "User", because (a) there's no instance of just-'user' on the page,
// and (b) heck with it.
if (ljNote)
	setTable(ljUser + "<br />" + ljNote, ljUser_Title);
else
	setTable("<span id='gm_acct'>" + ljUser + "</span>", ljUser_Title);  // hack for another script

if (ljTitleblock)	setTable(ljTitleblock, " ");

// If the user wants images.
if (ljvSwitch)		setTable(ljVgifts_Imgs, ljVgifts_Title);

if (ljInfo) {
	for (x = 0; x < ljInfo.length; x++) {
		setTable(ljInfo[x], ljInfo_Title[x]);
	}
}

if (ljType == "U")	{ if(ljContact) setTable(ljContact, ljContact_Title); }

if (ljExtSvcs) {
	for (var x = 0; x < ljExtSvcs.length; x++) {
		var tmpExt = ljExtSvcs[x].split(" || ");
		var patt = />(.*)</;
		var tUrl = "http://l-stat.livejournal.com/img/profile_icons/";
		switch(tmpExt[0]) {
			case "im_aim":
				var tWid = 11; var tHgt = 13;
				tUrl = 'http://big.oscar.aol.com/' + tmpExt[1] + '?on_url=http://cdn.aim.com/remote/gr/MNB_online.gif&off_url=http://cdn.aim.com/remote/gr/MNB_offline.gif';
				var tmpT = "AIM:";
				break;
			case "im_icq":
				var tWid = 18; var tHgt = 18;
				tUrl = 'http://web.icq.com/whitepages/online?icq=' + patt.exec(tmpExt[1])[1] + '&img=5';
				var tmpT = "ICQ:";
				break;
			case "im_gizmo":
				var tWid = 13; var tHgt = 13;
				tUrl += 'gizmo.gif';
				var tmpT = "Gizmo:";
				break;
			case "im_google":
				var tWid = 18; var tHgt = 18;
				tUrl += 'gtalk.gif';
				var tmpT = "Google Talk:";
				break;
			case "im_jabber":
				var tWid = 12; var tHgt = 17;
				tUrl += 'jabber.gif';
				var tmpT = "Jabber:";
				break;
			case "im_lastfm":
				var tWid = 15; var tHgt = 15;
				tUrl += 'lastfm.gif';
				var tmpT = "Last.fm:";
				break;
			case "im_lj":
				// Could be LJ, or OpenID, or Twitter, or or or.  Great.
				if (tmpExt[1].indexOf("openid") > -1) {
					var tWid = 16; var tHgt = 16;
					tUrl = 'http://l-stat.livejournal.com/img/openid-profile.gif';
					var tmpT = "OpenID:";
				} else if (tmpExt[1].indexOf("facebook") > -1) {
					var tWid = 16; var tHgt = 16;
					tUrl = 'http://l-stat.livejournal.com/img/facebook-profile.gif';
					var tmpT = "Facebook:";
				} else if (tmpExt[1].indexOf("twitter") > -1) {
					var tWid = 16; var tHgt = 16;
					tUrl = 'http://l-stat.livejournal.com/img/twitter-profile.gif';
					var tmpT = "Twitter:";
				} else {
					var tWid = 13; var tHgt = 13;
					tUrl += 'ljtalk.gif';
					var tmpT = "LJ Talk:";
				}
				break;
			case "im_msn":
				var tWid = 16; var tHgt = 13;
				tUrl += 'wlm.gif';
				var tmpT = "MSN:";
				break;
			case "im_yahoo":
				var tWid = 12; var tHgt = 12;
				tUrl = 'http://opi.yahoo.com/online?u=' + patt.exec(tmpExt[1])[1] + '&m=g&t=0';
				var tmpT = "Yahoo!:";
				break;
			case "im_skype":
				var tWid = 16; var tHgt = 16;
				tUrl = 'http://mystatus.skype.com/smallicon/' + patt.exec(tmpExt[1])[1];
				var tmpT = "Skype:";
				break;
		}
		var tmp1 = Math.round((20 - tWid) / 2);
		var tmp2 = Math.round((20 - tHgt) / 2);
		var tmpI = '<img src="' + tUrl + '" alt="' + tmpT.substring(0, tmpT.length - 1) + '" title="' + tmpT.substring(0, tmpT.length - 1) + '" height="' + tHgt + '" width="' + tWid + '" hspace="' + tmp1 + '" align="absmiddle" />';
		setTable(tmpI + tmpExt[1], tmpT);
	}
}

if (ljBio)			setTable(ljBio, ljBio_Title);

if (ljPic)			setTable(ljPic, ljPic_Title);
if (ljSupport)		setTable(ljSupport, '<a href="http://www.livejournal.com/support/">' + ljSupport_Title + '</a>:');
if (ljMemories)		setTable(ljMemories, ljMemories_Title);
if (ljPictures)		setTable(ljPictures, ljPictures_Title);
if (ljTags)			setTable(ljTags, ljTags_Title);
if (ljInterests)	setTable(ljInterests, ljInterests_Title);

if (ljType == "U") {
	if (ljSchools)	setTable(ljSchools, '<a href="http://www.livejournal.com/schools/">' + ljSchools_Title + '</a>:');
}

if (ljType == "U" || ljType == "N") {
	if (ljFriendsBlock)	setTable(ljFriendsBlock, '<a href="http://www.livejournal.com/users/' + ljUsername + '/friends">' + ljFriends_Title + '</a>:');
	if (ljMutual)		setTable(ljMutual, ljMutual_Title);
	if (ljFriendOf)		setTable(ljFriendOf, ljFriendOf_Title);
	if (ljMemberOf)		setTable(ljMemberOf, ljMemberOf_Title);
} else if (ljType == "C") {
	if (ljMaintainers)	setTable(ljMaintainers, ljMaintainers_Title);
	if (ljModerators)	setTable(ljModerators, ljModerators_Title);
	if (ljMembers)		setTable(ljMembers, '<a href="http://community.livejournal.com/' + ljUsername + '/friends">' + ljMembers_Title + '</a>:');
	if (ljWatchedBy)	setTable(ljWatchedBy, ljWatchedBy_Title);
}

if (ljType != "S" && ljType != 'N' && ljType != "O")
	setTable(ljAccountType, '<a href="http://www.livejournal.com/support/faqbrowse.bml?faqid=38">' + ljAccountType_Title + '</a>:');

// Older profiles hid all this behind mode=full.
if (ljFull == true) {
	setTable(ljCreated, ljCreated_Title);
	setTable(ljUpdated, ljUpdated_Title);
	setTable(ljEntries, ljEntries_Title);
	setTable(ljComments, ljComments_Title);
}

// Posting access.
if (ljPosting)		setTable(ljPosting, ljPosting_Title);

// Oh, show the Vgift count regardless.
if (ljVgiftsCt)		setTable(ljVgiftsCt, ljVgiftsCt_Title);

if (ljGames)		setTable(ljGames, ljGames_Title);

if (ljFull == false && ljType != "O") {
	tmpCell = document.createElement("td");
	tmpCell.setAttribute("colspan", "3");
	tmpCell.setAttribute("align", "center");
	tmpCell.innerHTML = '<i><a href="' + window.location.href + '?mode=full">' + ljMore + '</a></i>';
	tmpRow = document.createElement("tr");
	tmpRow.appendChild(tmpCell);
	tmpRow.setAttribute("valign", "top");
	ljTable.appendChild(tmpRow);
}

/* ***** */


/*
 * Remove and print!
 */

tmpThing = document.getElementById("profile_page");
debug == true ? tmpThing.appendChild(ljTable) : tmpThing.parentNode.replaceChild(ljTable, tmpThing);


/* ***** */


/*
 * The functions.
 */

// Setting row elements for the new table.
function setTable(ljTd, ljTh) {
	var tmpCell = document.createElement("th");

// Add : if none present.
	if (ljTh.substr(-1) != ':' && ljTh.length > 2 && ljTh.substr(-4) != "</a>" && ljTh.substr(-8) != "</small>") ljTh += ':';
	ljTh = ljTh.substr(0, 1).toUpperCase() + ljTh.substr(1);

	tmpCell.innerHTML = ljTh;
	tmpCell.setAttribute("align", "right");
	tmpCell.style.whiteSpace = "nowrap";
	tmpCell.setAttribute("width", "1");

	var tmpRow = document.createElement("tr");
	tmpRow.appendChild(tmpCell);
	tmpRow.setAttribute("valign", "top");

	tmpCell = document.createElement("td");

// Vgiftage.
	ljTd == "vg" ? tmpCell.setAttribute("id", "vgifts") : tmpCell.innerHTML = ljTd;

// Add the userpic.
	if (ljTh == "User:") {
		tmpRow.appendChild(tmpCell);
		tmpCell = document.createElement("td");
		tmpCell.innerHTML = ljUserpic;
		tmpCell.setAttribute("align", "center");
		tmpCell.setAttribute("width", "100");
		tmpCell.setAttribute("rowspan", "6");
		tmpRow.appendChild(tmpCell);
	} else {
		tmpCell.setAttribute("colspan", "2");
	}

	tmpRow.appendChild(tmpCell);
	ljTable.appendChild(tmpRow);
}



// Code from: http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(oElm, strTagName, strClassName){
    var arrElements = (strTagName == "*" && oElm.all)? oElm.all :
        oElm.getElementsByTagName(strTagName);

    var arrReturnElements = new Array();
    strClassName = strClassName.replace(/\-/g, "\\-");
    var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
    var oElement;
    for(var i=0; i<arrElements.length; i++){
        oElement = arrElements[i];
        if(oRegExp.test(oElement.className)){
            arrReturnElements.push(oElement);
        }
    }
    return (arrReturnElements)
}

// Code from: http://snipplr.com/view.php?codeview&id=8329
function trim(str) {
    while('' + str.charAt(0) == ' ') {
        str = str.substr(1, str.length);
    }
    while('' + str.charAt(str.length-1)==' ') {
        str = str.substr(0, str.length-1);
    }
    return str;
}

function ljOptions() {
	var theVG = confirm("Do you want to display recent virtual gift images?\n\nClick OK for yes, or Cancel for no.");
	GM_setValue("vgifts", theVG);

	var theDB = confirm("Do you want to append the scripted profile to the existing one?\n\nThis is useful for debugging.\n\nClick OK for yes, or Cancel for no.");
	GM_setValue("debug", theDB);

	var theBU = confirm("Would you like a Ban This User button in the actionstrip?\n\nClick OK for yes, or Cancel for no.");
	GM_setValue("banning", theBU);

	window.location.reload();
}
