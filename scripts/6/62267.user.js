// ==UserScript==
// @name           plonk4wp
// @namespace      http://userscripts.org/users/ph7/
// @description    A greasemonkey script that ignores comments made in wordpress by certain users.
// @include        http://*.wordpress.com/*
// @copyright      2009+, ph7 (http://userscripts.org/users/ph7/)
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @version        0.2.1
// ==/UserScript==

// check that we have selectors API
if(!document.querySelector) {
	alert("Selectors API not available! Please update your browser for plonk4wp to work.");
	return;
}

// set menu command
GM_registerMenuCommand("Edit wordpress 'plonklist'", editPlonkList);

// set variables
var regex=null;
var commentBlockCnt=0;
var commentBlockStats=null;
var recentCommentBlockCnt=0;
var recentCommentBlockStats=null;

var plonklist=GM_getValue("plonklist");
if(plonklist==undefined) {
	// first time run
	plonklist="";
	GM_setValue("plonklist", plonklist);
} else {
	plonklist=trim(plonklist);
}

// go!
applyFilter();


function editPlonkList() {
	answer=window.prompt("Please enter a comma separated list of the users you wish to ignore",plonklist);
	if(answer!=null && plonklist!=answer) {
		plonklist=trim(answer);
		GM_setValue("plonklist", plonklist);
		applyFilter();
	}
}

function applyFilter() {

	// reset vars
	commentBlockCnt=0;
	commentBlockStats=Array();
	recentCommentBlockCnt=0;
	recentCommentBlockStats=Array();

	regex=null;
	info("plonklist: '"+plonklist+"'");

	// create the regex
	var a_plonklist=plonklist.split(",");
	if(a_plonklist.length>0) {
		var rs="";
		for (var i in a_plonklist) {
			var user=trim(a_plonklist[i]);
			if(user.length>0) {
				if(rs.length>0)
					rs+="\|";
				rs+="^"+user+"$";
				commentBlockStats[user]=0;
				recentCommentBlockStats[user]=0;
			}
		}
		if(rs.length>0)
			regex = new RegExp(rs, "i");
	}

	// do the filtering
	filterCommentlist();
	filterRecentCommentlist();

	// output stats
	for(var user in commentBlockStats) {
		if(commentBlockStats[user])
			info("blocked "+commentBlockStats[user]+" comment(s) by: '"+user+"'");
	}
	info("blocked "+commentBlockCnt+" comments in total.");

	for(var user in recentCommentBlockStats) {
		if(recentCommentBlockStats[user])
			info("blocked "+recentCommentBlockStats[user]+" recent comment(s) by: '"+user+"'");
	}
	info("blocked "+recentCommentBlockCnt+" recent comments in total.");

}

function filterRecentCommentlist() {
	// get recent comment list
	var commentlist=document.querySelector("table[class~='recentcommentsavatar']");
	if(!commentlist) {
		info("recent comment list NOT found.");
	} else {
		var changed=false;
		Array.filter(
			commentlist.querySelectorAll("tr>td[class^='recentcommentsavatar']"),
			function(tditem) {
				var author=null;
				if(regex) {
					// try to get comment's author
					if(tditem.title)
						author=trim(tditem.title);
				}
				//
				showHideRecentComment(tditem.parentNode, author);
			}
		);
	}
}

function showHideRecentComment(tritem, author) {
	var changed=false;
	var element=tritem;
	var hide=regex && author && regex.test(author);

	if(element) {
		var curhide=element.style.display=="none";
		if(hide) {
			recentCommentBlockCnt++;
			recentCommentBlockStats[author]++;
		}
		if(hide && !curhide) {
			element.style.display="none";
			changed=true;
		} else if(!hide && curhide) {
			element.style.display="block";
			changed=true;
		}
	}
	return changed;
}

function filterCommentlist() {

	// get comment list
	var commentlist=document.querySelector("ol[class~='commentlist'], ol[id='commentlist']");
	if(!commentlist) {
		info("comment list NOT found.");
	} else {
		Array.filter(
			commentlist.querySelectorAll("li[class~='comment']"),
			function(listitem) {
				var author=null;
				if(regex) {
					// try to get comment's author
					var commentauthor=listitem.querySelector("div[class~='vcard'] *[class~='fn']");
					if(!commentauthor)
						commentauthor=listitem.querySelector("cite");
					if(commentauthor)
						author=trim(commentauthor.textContent);
				}
				//
				showHideComment(listitem, author);
			}
		);
	}
}

function showHideComment(listitem, author) {
	var changed=false;
	var element=listitem;
	var hide=regex && author && regex.test(author);

	//threaded that contains children?
	if(listitem.parentNode.querySelector("li[id='"+listitem.id+"']>ul[class~='children']")!=null)
		element=listitem.querySelector("div");

	if(element) {
		var curhide=element.style.visibility=="hidden";
		if(hide) {
			commentBlockCnt++;
			commentBlockStats[author]++;
		}
		if(hide && !curhide) {
			element.style.visibility="hidden";
			element.style.height=0;
			changed=true;
		} else if(!hide && curhide) {
			element.style.visibility="visible";
			element.style.height="auto";
			changed=true;
		}
	}
	return changed;
}

function trim(str, chars) {
	str=str.replace(/\n\|\r/g, "");
	return ltrim(rtrim(str, chars), chars);
}

function ltrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("^[" + chars + "]+", "g"), "");
}

function rtrim(str, chars) {
	chars = chars || "\\s";
	return str.replace(new RegExp("[" + chars + "]+$", "g"), "");
}

function info(str) {
	console.info("plonk4wp: "+str);
}
