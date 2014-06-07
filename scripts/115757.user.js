// ==UserScript==
// @name           Geekhack Spy Shades
// @namespace      http://geekhack.org/
// @description    let them feel your indifference
// @include        http://geekhack.org/vaispy*
// ==/UserScript==

function init_ignorelist()
{
	// EDIT HERE EDIT HERE EDIT HERE EDIT HERE EDIT HERE EDIT HERE EDIT HERE
	// comma-seperated list of forum-ids / user-names to ignore
	var forums_to_ignore = '85, 87, 88, 89, 67'.split(/,\s*/);
	var users_to_ignore = ''.split(/,\s*/);
	// EDIT HERE EDIT HERE EDIT HERE EDIT HERE EDIT HERE EDIT HERE EDIT HERE
	// DON'T TOUCH THE REST UNLESS YOU KNOW WHAT YOU'RE DOING

	// build filter-object
	window.ignore = {};
	for (var i = 0; i < forums_to_ignore.length; i++)
	{
		window.ignore[forums_to_ignore[i]] = true;
	}
	window.ignore_users = {};
	for (var i = 0; i < users_to_ignore.length; i++)
	{
		window.ignore_users[users_to_ignore[i].toLowerCase()] = true;
	}
	// remove ignored items from view
	var spy_table = document.getElementById('spy_table').children[0];
	var forum_link_id = '';
	var user_name = '';
	for (var i = 1; i < spy_table.children.length; i++)
	{
		if (spy_table.children[i].children[3].innerHTML.length < 6)
		{
			continue;
		}
		user_name = spy_table.children[i].children[1].children[0].children[0].innerHTML.toLowerCase();
		forum_link_id = spy_table.children[i].children[3].innerHTML.match(/href.*f=(\d+)/)[1];
		if (window.ignore[forum_link_id] || window.ignore_users[user_name])
		{
			for (var j = 0; j < 4; j++)
			spy_table.children[i].children[j].innerHTML = '';
		}
	}
}

// forum spy's hacked push function
// returns if forumid is listed in forums_to_ignore
function push() {
	if (play == 0) {
		setTimeout("push()", 1000);
		return;
	}

	var cell;
	var cellnext;
	var text;
	var clip;
	var poster_clip = '';
	var where = '';
	var post_url;
	var style = '';

	var what = whats.pop();
	var when = whens.pop();
	var title = titles.pop();
	var preview = previews.pop();
	var poster = posters.pop();
	var threadid = threadids.pop();
	var postid = postids.pop();
	var userid = userids.pop();
	var spyid = spyids.pop();
	var forumid = forumids.pop();
	var forumname = forumnames.pop();
	var view = views.pop();
	var numreplies = replies.pop();
	var lastpost = lastposts.pop();
	var statusicon = statusicons.pop();

	// INSERTED BLOCK ------------------------------
	// ignore update if in ignorelist
	if (window.ignore[forumid] || window.ignore_users[poster.toLowerCase()])
	{
		if (whats.length > 0) {
			setTimeout("push()", pushtime);
		}
		else {
			setTimeout("getXML()", xmldelay);
		}
		return;
	}
	// \INSERTED BLOCK -----------------------------

	rowClass = rowClass == 'alt2' ? 'alt1' : 'alt2';
	highestid = Math.max(parseInt(spyid), highestid);
	post_url = vburl + 'showthread.php?';

	if (vB_PHP_Emulator.prototype.stripos(what, 'thread')) {
		post_url = post_url + 't=' + threadid;
	} else {
		post_url = post_url + 'p=' + spyid + '#post' + spyid;
	}

	if(title.length == 0) {
		clip = '<strong>Unknown</strong>';
	} else {
		clip = '<img src="' + statusicon + '" alt="" />&nbsp;<strong><a href="' + post_url + '">' + title + '</a></strong>';
	}

	if (preview.length > 0) {
	    clip = clip + '<br />' + preview ;
	}

    clip = clip + ' (' + view + ' views, ' + numreplies + ' replies)';

	if (userid.length > 0) {
		poster_clip = '<a href="' + vburl + 'member.php?u=' + userid + '">' + poster + '</a>';
	}

    poster_clip = poster_clip + '<br />' + when;

	if (parseInt(forumname.length) > 0) {
		where = where + '<strong><a href="' + vburl + 'forumdisplay.php?f=' + forumid + '">' + forumname + '</a></strong>';
	} else {
		where = '';
	}

    if (is_opera) {
        text = '<table cellpadding="3" cellspacing="0" border="0" width="100%"><tr><td width="20" class="blockbody ' + rowClass + ' smallfont" nowrap="nowrap" align="center">' + what + '</td><td class="blockbody ' + rowClass + ' smallfont" width="225" nowrap="nowrap" align="left">' + poster_clip + '</td><td class="blockbody ' + rowClass + ' smallfont" width="80%">' + clip + '</td><td class="blockbody ' + rowClass + ' smallfont" width="200" nowrap="nowrap" align="center">' + where + '</td></tr></table>';
	} else {
	    text = '<td class="blockbody ' + rowClass + ' smallfont" align="center">' + what + '</td><td class="blockbody ' + rowClass + ' smallfont">' + poster_clip + '</td><td class="blockbody ' + rowClass + ' smallfont">' + clip + '</td><td align="center" class="blockbody ' + rowClass + ' smallfont">' + where + '</td>';
    }

	Element.setOpacity('row1', 0.0);

	if (is_ie) {
		for (i = (spymax - 1); i >= 1; i--) {
			cell = document.getElementById("spy_table").rows[i];
			cellnext = document.getElementById("spy_table").rows[i + 1];
			if (cell.innerHTML.length > 31) {
				cellnext.cells[0].innerHTML = cell.cells[0].innerHTML;
				cellnext.cells[1].innerHTML = cell.cells[1].innerHTML;
				cellnext.cells[2].innerHTML = cell.cells[2].innerHTML;
				cellnext.cells[3].innerHTML = cell.cells[3].innerHTML;
				cellnext.style.display = '';
			}
		}

		document.getElementById("row1").cells[0].innerHTML = '<div class="smallfont">' + what + '</div>';
		document.getElementById("row1").cells[1].innerHTML = '<div class="smallfont">' + poster_clip + '</div>';
		document.getElementById("row1").cells[2].innerHTML = '<div class="smallfont">' + clip + '</div>';
		document.getElementById("row1").cells[3].innerHTML = '<div class="smallfont">' + where + '</div>';
	} else {
		for (i = (spymax - 1); i >= 1; i--) {
			cell = document.getElementById("row" + i);
			cellnext = document.getElementById("row" + (i + 1));
			if (cell.innerHTML != "") {
				cellnext.innerHTML = cell.innerHTML;
				cellnext.style.display = '';
			}
		}
		document.getElementById("row1").innerHTML = text;
	}

	Effect.Appear('row1', { duration: fadetime });

	if (whats.length > 0) {
		setTimeout("push()", pushtime);
	}
	else {
		setTimeout("getXML()", xmldelay);
	}
}

// embed code in website, overwrites original push function
var s = document.createElement('script');
s.innerHTML = push.toString() + init_ignorelist.toString() + "init_ignorelist();";
document.documentElement.getElementsByTagName( "HEAD" )[0].appendChild(s);

/*
2011-10-19
applied more of soarer's tweaks:
- fixed forum_link_id regex
- added option to suppress updates from certain users

2011-10-18
replaced document.head. with document.documentElement.getElementsByTagName("HEAD") for compatibility issues
script should now work with Firefox 3.6
thanks, soarer
*/

