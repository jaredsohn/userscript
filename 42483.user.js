// ==UserScript==
// @name          New York Times Timespeople Comments
// @namespace     http://www.wetdogfur.com/greasemonkey
// @description   See reader comments on their TimesPeople profile page
// @include       http://timespeople.nytimes.com/view/*
// ==/UserScript==

// version 0.2
// 2009-03-13
// Copyright (c) 2009 David Seguin
// Enjoy

//my API key
//if you're going to use this a lot, get your own key at http://developer.nytimes.com/apps/register
var nytApiKey = "mschwjy9jpmur8f98nerbjtv";

//SET VARIABLES:
//get url and extract user id
var theURL = document.URL.split("//");
	theURL = (theURL[1] ? theURL[1] : theURL[0]).split("/");
var userID = theURL[3];
//mininav div
var pageNav = document.getElementById('menu');

//MAKE LINK TO CLICK:
myComments = document.createElement("div");
myComments.setAttribute("class", "item");
var getMC = [];
getMC.push('<a id="commentcall');
getMC.push(userID);
getMC.push('">');
getMC.push('Comments');
getMC.push('</a>');
myComments.innerHTML = getMC.join('');
//push it out
pageNav.appendChild(myComments);
//add lsitener
var tpLinkToClick = "commentcall" + userID;
document.getElementById(tpLinkToClick).addEventListener("click", getCommentsByUser(), true);

//CSS
GM_addStyle(".othercomment {font-family:Arial,Helvetica,sans-serif;font-size:11px;border-bottom:1px solid #CCCCCC;margin:0 0 10px;padding:0 0 10px;}" +
			"h4.myCommentsH4 {font-family:Arial,Helvetica,sans-serif;font-size:14px;}" +
			"#activity p.commentfooter, #people p.commentfooter {font-size:11px; margin: 10px 0 0 0;text-align:right;}");

//GET COMMENTS:
function getCommentsByUser () {
	return function () {
		nytUserCommentsCall = 'http://api.nytimes.com/svc/community/v2/comments/user/id/' + userID + '.xml?&api-key=' + nytApiKey;
		//Liz: http://api.nytimes.com/svc/community/v2/comments/user/id/57504867.xml?&api-key=mschwjy9jpmur8f98nerbjtv
		//target div
		if (document.getElementById('activity')) {cctargetDiv = document.getElementById('activity')}
		else if (document.getElementById('people')) {cctargetDiv = document.getElementById('people')}
		//spinner
		cctargetDiv.innerHTML = '<img src="http://i40.tinypic.com/2yy5oo3.gif" height="15" width="15" class="spinner"><br>';
		//fetch feed
		GM_xmlhttpRequest({
			method: 'GET', url: nytUserCommentsCall, headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3','Accept': 'application/atom+xml,application/xml,text/xml',},
			onload: function(responseDetails) {
				//overwrite spinner
				cctargetDiv.innerHTML = '<h4 class="myCommentsH4">My comments:</h4>';
				var dom = new DOMParser().parseFromString(responseDetails.responseText, 'application/xml');
				var entries = dom.getElementsByTagName('comment');
				for (var i = 0; i < entries.length; i++) {
					//get bits
		            ccBody = entries[i].getElementsByTagName('commentBody')[0].textContent;
					ccURL = entries[i].getElementsByTagName('articleURL')[0].textContent;
					ccRec = entries[i].getElementsByTagName('recommendations')[0].textContent;
					ccCDateE = entries[i].getElementsByTagName('createDate')[0].textContent;
					ccEdSelectE = entries[i].getElementsByTagName('editorsSelection')[0].textContent;
						//reformat date
						ccCDateS = new Date(ccCDateE*1000);
						createMonth = ccCDateS.getMonth() + 1;
						createDay = ccCDateS.getDate();
						createYear = ccCDateS.getFullYear();
						createHour = ccCDateS.getHours();
							if (createHour >= 12) {createTime = " pm";}
							else {createTime = " am";}
							if (createHour > 12) {createHour -= 12;}
							if (createHour == 0) {createHour = 12;}
						createMin = ccCDateS.getMinutes();
							if (createMin < 10) {createMin = "0" + createMin;}
					ccCDate = createHour + ':' + createMin + createTime + " EST " + createDay + "/" + createMonth  + "/" + createYear;
					//editor's selection?
					if (ccEdSelectE=="Y"){ ccEdSelect = "<br>and was selected by the editors as exceptional";}
					else {ccEdSelect = "";}
					//make holder
					otherComments = document.createElement("div");
					otherComments.setAttribute("class", "othercomment");
					//build comments block
					var getOC = [];
					getOC.push('<p>');
					getOC.push(ccBody);
					getOC.push('</p><p class="commentfooter"');
					getOC.push('<a href="');
					getOC.push(ccURL);
					getOC.push('">');
					getOC.push(ccURL);
					getOC.push('</a>');
					getOC.push('<br>comment written ');
					getOC.push(ccCDate);
					getOC.push('<br>');
					getOC.push(ccRec);
					getOC.push(' recommendations from readers');
					getOC.push(ccEdSelect);
					getOC.push('</p>');
					//stuff it
					otherComments.innerHTML = getOC.join('');
					//push it out
					cctargetDiv.appendChild(otherComments);
					}//for.. loop end
			}//onload end
		})//GM_xmlhttpRequest end
	};//return function end
}//getCommentsByUser end
