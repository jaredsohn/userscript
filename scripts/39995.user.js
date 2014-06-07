// ==UserScript==
// @name          New York Times Comments Plus
// @namespace     http://www.wetdogfur.com/greasemonkey
// @description   Another way of reading comments on The New York Times website
// @include       http://*.blogs.nytimes.com/*
// @include       http://nytimes.com/*
// @include       http://www.nytimes.com/*
// ==/UserScript==

// version 0.9.1 (beta)
// 2009-02-01
// Copyright (c) 2009 David Seguin
// Enjoy

//my API key
//if you're going to use this a lot, get your own key at http://developer.nytimes.com/apps/register
var nytApiKey = "mschwjy9jpmur8f98nerbjtv";

//INITIALIZE VARIABLES
//placeholder for div that will hold comments
var commentPreview;
//initialize recommends total
var totalRecommends = 0;
//initialize total comments count
var n = 25;
// is this a blog or article?
var blogDiv = document.getElementById('related-content');
var articleDiv = document.getElementById('articleExtras');
if (blogDiv) {
	targetDiv = document.getElementById('related-content');
	var nytUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
}
if (articleDiv) {
	targetDiv = document.getElementById('articleExtras');
	var nytUrl = 'http://www.nytimes.com' + window.location.pathname;	
}
//build the first data call
var nytUrlEncoded = encodeURIComponent(nytUrl);
var nytDataCall = "http://api.nytimes.com/svc/community/v2/comments/url/exact-match.xml?url=" + nytUrlEncoded + "&api-key=" + nytApiKey + "&sort=oldest";

//FUNCTIONS
//pop open single comment
function see_comment (id) {
	return function () {
		//get bits
		var commentblock = document.getElementById("comment"+ id);
		var tweetline = document.getElementById("tweet"+ id);
		var commentmeta = document.getElementById("commentmeta"+ id);
		//show and hide bits
      	commentblock.style.display = 'block';
		commentmeta.style.display = 'block';
		tweetline.style.display = 'none';
	}
};

//open all comments
function openAllComments () {
	return function () {
		GM_addStyle(".tweet, #openAllInstructions {display: none;}"+
		".fullcomment, .commentfooter {display: block !important;}");
	}
}

//follow a commenter
function highlight_commenter(userID, commentid) {
	return function () {
		GM_setValue(userID,"follow");
		var commentdiv = document.getElementById("comment"+ commentid).parentNode;
		commentdiv.setAttribute("class", "nytc-comment follow");
	}
};

//get comments by user (on demand)
function getCommentsByUser (userCommentsUrl, commentid, username) {
	return function () {
		nytUserCommentsCall = 'http://' + userCommentsUrl + '?&api-key=' + nytApiKey;
		//target div
		cctargetDiv = document.getElementById('xtraholder'+commentid);
		//spinner
		cctargetDiv.innerHTML = '<img src="http://i40.tinypic.com/2yy5oo3.gif" height="15" width="15" class="spinner"><br>';
		//fetch feed
		GM_xmlhttpRequest({
			method: 'GET', url: nytUserCommentsCall, headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3','Accept': 'application/atom+xml,application/xml,text/xml',},
			onload: function(responseDetails) {
				//overwrite spinner
				cctargetDiv.innerHTML = '<h4>More comments from ' + username + ':</h4>';
				var dom = new DOMParser().parseFromString(responseDetails.responseText, 'application/xml');
				var entries = dom.getElementsByTagName('comment');
				for (var i = 0; i < entries.length; i++) {
					//get bits
		            ccBody = entries[i].getElementsByTagName('commentBody')[0].textContent;
					ccURL = entries[i].getElementsByTagName('articleURL')[0].textContent;
					ccRec = entries[i].getElementsByTagName('recommendations')[0].textContent;
					ccCDateE = entries[i].getElementsByTagName('createDate')[0].textContent;
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
						createMin = simpleCDate.getMinutes();
							if (createMin < 10) {createMin = "0" + createMin;}
					ccCDate = createHour + ':' + createMin + createTime + " EST " + createDay + "/" + createMonth  + "/" + createYear;
					//make holder
					otherComments = document.createElement("div");
					otherComments.setAttribute("class", "othercomment");
					//build other comments block
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
					getOC.push(' recommendations from readers</p>');
					//stuff it
					otherComments.innerHTML = getOC.join('');
					//push it out
					cctargetDiv.appendChild(otherComments);
					}//for.. loop end
			}//onload end
		})//GM_xmlhttpRequest end
	};//return function end
}//getCommentsByUser end

//get commenter's TimesPeople recommendations (on demand)
function getTPrecs (userid, commentid, username) {
	return function () {
		nytPeopleCall = 'http://timespeople.nytimes.com/view/user/' + userid + '/rss.xml';
		//target div
		cctargetDiv = document.getElementById('xtraholder'+commentid);
		//spinner
		cctargetDiv.innerHTML = '<img src="http://i40.tinypic.com/2yy5oo3.gif" height="15" width="15" class="spinner"><br>';
		//fetch feed
		GM_xmlhttpRequest({
			method: 'GET', url: nytPeopleCall, headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3','Accept': 'application/atom+xml,application/xml,text/xml',},
			onload: function(responseDetails) {
				//overwrite spinner
				cctargetDiv.innerHTML = '<h4>'+username+'\'s recommendations on TimesPeople:</h4>';
				var dom = new DOMParser().parseFromString(responseDetails.responseText, 'application/xml');
				var entries = dom.getElementsByTagName('item');
				for (var i = 0; i < entries.length; i++) {
					//get bits
		            tpTitle = entries[i].getElementsByTagName('title')[0].textContent;
					tpLink = entries[i].getElementsByTagName('link')[0].textContent;
					tpDesc = entries[i].getElementsByTagName('description')[0].textContent;
					tpPubDate = entries[i].getElementsByTagName('pubDate')[0].textContent;
					//make holder
					otherComments = document.createElement("div");
					otherComments.setAttribute("class", "othercomment");
					//build tp block
					var getOC = []
					getOC.push('<p><a href="');
					getOC.push(tpLink);
					getOC.push('">');
					getOC.push(tpTitle);
					getOC.push('</a><br>');
					getOC.push(tpDesc);
					getOC.push('<br>');
					getOC.push(tpPubDate);
					getOC.push('</p>');
					//stuff it
					otherComments.innerHTML = getOC.join('');
					//push it out
					cctargetDiv.appendChild(otherComments);
					}//for end
			}//onload end
		})//GM_xmlhttpRequest end
	}//return function end
}//getTP end

//build comment
function make_comment () {
	//create the new div
	commentPreview = document.createElement("div");
	//speedy push 'n' join suggested to me by Al McLean:
	//some comments are better than others
	if (thisEditorsSelection=="Y") {
		commentPreview.setAttribute("class", "nytc-comment nytc-echoice");
		var commentbody = [];
		commentbody.push('<div id="comment');
		commentbody.push(thisCommentSequence);
		commentbody.push('">');
		commentbody.push('<p class="fullcomment">');
		commentbody.push(thisCommentSequence);
		commentbody.push('\) ');
		commentbody.push(thisCommentBody);
		commentbody.push('</p<p class="commentmeta"><cite>&#8212; ');
		commentbody.push(thisDisplayName);
		commentbody.push(' of ');
		commentbody.push(thisLocation);
		commentbody.push(' <a title="Always highlight ');
		commentbody.push(thisDisplayName);
		commentbody.push('\'s comments" class="followcommenter" id="follow');
		commentbody.push(userID);
		commentbody.push('">&#9733;</a></cite>');
		commentbody.push(thisRecommendations);
		commentbody.push(' recommendations from readers ');
		commentbody.push(selectedStatus);
		commentbody.push('</p>');
		commentbody.push('<p class="commentfooter" id="commentmeta'); 
		commentbody.push(thisCommentSequence); 
		commentbody.push('">comment written ');
		commentbody.push(thisCreateDate);
		commentbody.push('<br>comment approved ');
		commentbody.push(thisApproveDate);
		commentbody.push('<br><a id="getTP');
		commentbody.push(thisCommentSequence);
		commentbody.push('">');
		commentbody.push(thisDisplayName);
		commentbody.push('\'s recommendations on TimesPeople</a>');
		commentbody.push('<br><a id="morefrom');
		commentbody.push(thisCommentSequence);
		commentbody.push('">See more comments from ');
		commentbody.push(thisDisplayName);
		commentbody.push('</a></p><div class="xtraholder" id="xtraholder'); 
		commentbody.push(thisCommentSequence); 
		commentbody.push('"></div>')
		}
	//reg'lar ol' comments
	else {commentPreview.setAttribute("class", "nytc-comment");
		var commentbody = [];
		commentbody.push('<p class="tweet" id="tweet');
		commentbody.push(thisCommentSequence);
		commentbody.push('"> ');
		commentbody.push(thisCommentSequence);
		commentbody.push('\) ');
		commentbody.push(thisTweet); 
		commentbody.push('<p class="fullcomment" id="comment'); 
		commentbody.push(thisCommentSequence); 
		commentbody.push('">');
		commentbody.push(thisCommentSequence);
		commentbody.push('\) ');
		commentbody.push(thisCommentBody); 
		commentbody.push('</p><p class="commentmeta"><cite>&#8212; '); 
		commentbody.push(thisDisplayName); 
		commentbody.push(' of ');
		commentbody.push(thisLocation); 
		commentbody.push(' <a title="Always highlight '); 
		commentbody.push(thisDisplayName); 
		commentbody.push('\'s comments" class="followcommenter" id="follow');
		commentbody.push(userID); 
		commentbody.push('">&#9733;</a></cite>');
		commentbody.push(thisRecommendations); 
		commentbody.push(' recommendations from readers');
		commentbody.push(selectedStatus);
		commentbody.push('</p><p class="commentfooter" id="commentmeta'); 
		commentbody.push(thisCommentSequence); 
		commentbody.push('"><span class="followingcommenter">&#9733; You are following ');
		commentbody.push(thisDisplayName);
		commentbody.push('<br></span>comment written ');
		commentbody.push(thisCreateDate);
		commentbody.push('<br>comment approved ');
		commentbody.push(thisApproveDate);
		commentbody.push('<br><a id="getTP');
		commentbody.push(thisCommentSequence);
		commentbody.push('">');
		commentbody.push(thisDisplayName);
		commentbody.push('\'s recommendations on TimesPeople</a>');
		commentbody.push('<br><a id="morefrom');
		commentbody.push(thisCommentSequence);
		commentbody.push('">See more comments from ');
		commentbody.push(thisDisplayName);
		commentbody.push('</a></p><div class="xtraholder" id="xtraholder'); 
		commentbody.push(thisCommentSequence); 
		commentbody.push('"></div>');
		};
		//fill div
		commentPreview.innerHTML = commentbody.join('');
		//change classes if needed:
		//that's hot!
		if (hotness=="hot"){
			commentPreview.setAttribute("class", "nytc-comment hot"); }
		//I'm following this guy
		if (follow=="follow"){
			commentPreview.setAttribute("class", "nytc-comment follow"); }
}

//CSS
//#aColumn is for opinion, #aCol is for blogs
GM_addStyle(".nytc-comment {margin:0; padding: 10px; border-bottom: 1px solid #CCCCCC}" +
			".nytc-comment .fullcomment, .nytc-comment .commentfooter {display: none;}" +
			".nytc-echoice {background: #F0F4F5;}" +
			".tweet {margin-bottom: 2px}" +
			".tweet i {font-size: 85%;}" +
			".hot {background: #EBF1F5;}" + 
			".follow {background: #F5EBEF;}" +
			".hot .tweet, .follow .tweet, #readersComments {display:none;}" +
			".hot .fullcomment, .follow .fullcomment {display:block;}" +
			".hot .commentfooter, .follow .commentfooter, .othercomment .commentfooter {display:block;}" +
			".follow .followcommenter {display:none;}" +
			".followingcommenter {display:none;}" +
			".follow .followingcommenter {display:block;}" +
			"#aColumn h4, #aCol h4 {line-height:1.7; padding-bottom:20px; border-bottom: 1px solid #CCCCCC;}" +
			"h4 span.hot, h4 span.nytc-echoice, h4 span.follow {padding: 5px;}" +
			"h4 span.commentkey {font-weight: normal;}" +
			"#aCol h4 span.commentkey {font-size:0.9em;}" +
			".nytc-echoice .fullcomment, .nytc-echoice .commentfooter {display: block;}" +
			".fullcomment {font-size: 110%; padding: 0 0 0 10px;}" +
			".commentfooter {font-size: 80%; color: #666; text-align: right}" +
			"#aCol .commentfooter {font-size: 1.1em}" +
			".blog p.commentfooter {font-size: 1.3em;}" +
			".commentmeta {text-align: right; margin-top:2px;}" +
			".commentmeta cite {display:block;padding:0;}" +
			".followcommenter {cursor: pointer; font-style: normal; color: #0067B8; font-size: 1.3em}" +
			".followcommenter:hover {text-decoration: none; color: #D63800;}" +
			".othercomment {margin: 0 0 0 50px; font-size:110%;}" +
			".othercomment .commentfooter {margin:0 0 20px;}" +
			"#aColumn .xtraholder h4, #aCol .xtraholder h4 {padding-bottom:0; margin:0 0 0 40px;}" +
			".nytc-comment .morelink, .recommendlink, .commentfooter a, #openAll {cursor: pointer;}" +
			"#aCol .othercomment {font-size: 1em}" +
			".spinner {float: right; margin: 0 70px 0 0; padding: 0 0 20px 0;}" +
			".nytc-comment .morelink.details {text-align: right; display:block;}");

//OK, LET'S DO THIS THING:
function startXmlHttp(n, dom) {
	if (n > 0) {
		//global - get total comments found from root node of xml
		var totalCommentsFound = dom.evaluate("//result_set/results/totalCommentsFound", dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var totalCommentsReturned = dom.evaluate("//result_set/results/totalCommentsReturned", dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i = 0; i < totalCommentsFound.snapshotLength; i++) {
			thisTotalCommentsFound = totalCommentsFound.snapshotItem(i).textContent;
			thisTotalCommentsReturned = totalCommentsReturned.snapshotItem(i).textContent;
		}
		
		//comment-specific - get comment info from comment nodes of xml
		var commentSequence = dom.evaluate("//result_set/results/comments/comment/commentSequence", dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var commentBody = dom.evaluate("//result_set/results/comments/comment/commentBody", dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var displayName = dom.evaluate("//result_set/results/comments/comment/display_name", dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var epochApproveDate = dom.evaluate("//result_set/results/comments/comment/approveDate", dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var epochCreateDate = dom.evaluate("//result_set/results/comments/comment/createDate", dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var recommendations = dom.evaluate("//result_set/results/comments/comment/recommendations", dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var editorsSelection = dom.evaluate("//result_set/results/comments/comment/editorsSelection", dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var location = dom.evaluate("//result_set/results/comments/comment/location", dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		var userComments = dom.evaluate("//result_set/results/comments/comment/userComments", dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
		//get replies - this is cool even if there is no node
		var replyCommentBody = dom.evaluate("//result_set/results/comments/comment/replies/comments/comment/commentBody", dom, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	
		if ( n == 25 ) {
			//get some basic info for the first swipe, only need to do these things once:
			//make number of comments a real number
			numberOfComments = parseFloat(thisTotalCommentsFound);
			//if there are any comments at all, display heading:
			if (numberOfComments > 0) {
				commentIntro = document.createElement("h4");
				commentIntro.innerHTML = 'There are ' + thisTotalCommentsFound + ' comments.<br>' +
				'<span class="commentkey"><span class="hot">Most recommended</span>, <span class="nytc-echoice">the Editors\' selections</span>, and <span class="follow">&#9733; your favorites</span> are highlighted.' +
				'<span id="openAllInstructions"<br>Or you can <a id="openAll">expand all comments</a>.</span></span>';
				targetDiv.parentNode.insertBefore(commentIntro, targetDiv);
				document.getElementById("openAll").addEventListener("click", openAllComments(), true);
			}
			//do a quick loop to get a sample of recommendations
			//it would be better to get all the comments but this would take too many calls
			//25 should be enough to give us an idea of what's hot
			for (var i = 0; i < displayName.snapshotLength; i++) {
				getRec = recommendations.snapshotItem(i).textContent;
					//make a real number
					getRecNum = parseFloat(getRec);
					//add to recommendations total
					totalRecommends = totalRecommends + getRecNum;
					}
			//get average recommendations for the first 25
			averageCommentRecommends = totalRecommends/25;
			//what's hot?
			hotComment = averageCommentRecommends*1.95;
		}
		
		//get the elements from xml for the comment at hand
        for (var i = 0; i < displayName.snapshotLength; i++) {
			thisCommentSequence = commentSequence.snapshotItem(i).textContent;
			thisCommentBody = commentBody.snapshotItem(i).textContent;
				//make a tweet
				//strip html
				var stripDiv = document.createElement("div");
				stripDiv.innerHTML = thisCommentBody;
				//get 140 chars
				thisTweet = stripDiv.textContent.substring(0,140);
				//is it short?
					//if so, show the original and a link to comment details
					tweetLength = thisTweet.length;
					if (tweetLength < 140)  {
					//shortTweet="true";
					thisTweet = thisCommentBody + "<i><a class='morelink details' id='commentlink" + thisCommentSequence + "'>(comment details)</a></i></p>";
					}
					//if long, show the tweet and a link to see more
					else {
					//shortTweet="false";
					thisTweet = thisTweet + "... <i><a class='morelink' id='commentlink" + thisCommentSequence + "'>(read)</a></i></p>";
					}
			//display name may have html in it
			getDisplayName = displayName.snapshotItem(i).textContent;
				//strip html - the Andy Revkin rule
				var revkinDiv = document.createElement("div");
				revkinDiv.innerHTML = getDisplayName;
			thisDisplayName = revkinDiv.textContent;
			//approval date, in epoch
			thisEpochApproveDate = epochApproveDate.snapshotItem(i).textContent;
				//format date to human-readable
				simpleADate = new Date(thisEpochApproveDate*1000);
				approveMonth = simpleADate.getMonth() + 1;
				approveDay = simpleADate.getDate();
				approveYear = simpleADate.getFullYear();
				approveHour = simpleADate.getHours();
					if (approveHour >= 12) {approveTime = " pm";}
					else {approveTime = " am";}
					if (approveHour > 12) {approveHour -= 12;}
					if (approveHour == 0) {approveHour = 12;}
				approveMin = simpleADate.getMinutes();
					if (approveMin < 10) {approveMin = "0" + approveMin;}
			thisApproveDate = approveHour + ':' + approveMin + approveTime + " EST " + approveDay + "/" + approveMonth  + "/" + approveYear;
			//created date, in epoch
			thisEpochCreateDate = epochCreateDate.snapshotItem(i).textContent;
				//format date to human-readable
				simpleCDate = new Date(thisEpochCreateDate*1000);
				createMonth = simpleCDate.getMonth() + 1;
				createDay = simpleCDate.getDate();
				createYear = simpleCDate.getFullYear();
				createHour = simpleCDate.getHours();
					if (createHour >= 12) {createTime = " pm";}
					else {createTime = " am";}
					if (createHour > 12) {createHour -= 12;}
					if (createHour == 0) {createHour = 12;}
				createMin = simpleCDate.getMinutes();
					if (createMin < 10) {createMin = "0" + createMin;}
			thisCreateDate = createHour + ':' + createMin + createTime + " EST " + createDay + "/" + createMonth  + "/" + createYear;
			//highlight by recommendations
			thisRecommendations = recommendations.snapshotItem(i).textContent;
				//make a real number
				thisRecommendationsNumber = parseFloat(thisRecommendations);
				//hot? total recommendations must also be higher than 6
				if (thisRecommendationsNumber > hotComment && thisRecommendationsNumber > 6){ hotness="hot" }
				else {hotness="not"}
			thisEditorsSelection = editorsSelection.snapshotItem(i).textContent;
				//make this a little more palatable
				if (thisEditorsSelection=="Y"){ selectedStatus = "<br>and was selected by the editors as exceptional";}
				else {selectedStatus = "";}
			thisLocation = location.snapshotItem(i).textContent;
			//user comments xml with filepath
			thisUserComments = userComments.snapshotItem(i).textContent;
				//remove filepath (50 chars)
				UCxml = thisUserComments.substr(50);
				//split at (dot)
				var temp = new Array();
				temp = UCxml.split('.');
				//the first part of the split is the user ID
				userID = temp[0];
			//are we following this user?
			if (GM_getValue(userID, 0) == "follow") { follow="follow"; }
			else { follow="nofollow"; }
			
			//build out the comment
			make_comment ();
			
			//insert the new div
			targetDiv.parentNode.insertBefore(commentPreview, targetDiv);
			
			//ADD LISTENERS:
			//make more.. link only for unrated comments 
			if (thisEditorsSelection=="N") {
				var linkToClick = "commentlink" + thisCommentSequence;
				document.getElementById(linkToClick).addEventListener("click", see_comment(thisCommentSequence), true);}
			//make commenter highlight link
			var commenterLinkToClick = "follow" + userID;
			document.getElementById(commenterLinkToClick).addEventListener("click", highlight_commenter(userID, thisCommentSequence), true);
			//link for loading user comments from other articles
			var moreCommentsLinkToClick = "morefrom" + thisCommentSequence;
			document.getElementById(moreCommentsLinkToClick).addEventListener("click", getCommentsByUser(thisUserComments, thisCommentSequence, thisDisplayName), true);
			//load timespeople recommendations
			var tpLinkToClick = "getTP" + thisCommentSequence;
			document.getElementById(tpLinkToClick).addEventListener("click", getTPrecs(userID, thisCommentSequence, thisDisplayName), true);
		}//for... loop ends

		//show anything over the next 25
		if (numberOfComments > 25 && n < numberOfComments) {
			nytDataCall = "http://api.nytimes.com/svc/community/v2/comments/url/exact-match.xml?url=" + nytUrlEncoded + "&offset=" + n + "&api-key=" + nytApiKey + "&sort=oldest";
		} else {
			return;
		}
	}
	
	GM_xmlhttpRequest({
		method: 'GET',
		url: nytDataCall,
		headers: {'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey/0.3','Accept': 'application/atom+xml,application/xml,text/xml',},
		onload: function(responseDetails) {
			var dom = new DOMParser().parseFromString(responseDetails.responseText, 'application/xml');
			startXmlHttp(n + 25, dom);
		},
	});
}  

startXmlHttp(0, "");
