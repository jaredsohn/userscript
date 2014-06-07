// ==UserScript==
// @name          Kongregate comment pagination
// @namespace     http://www.kongregate.com/
// @description   Adds comment pagination.
// @include       http://www.kongregate.com/games/*/*
// @exclude       http://www.kongregate.com/games/*/*/*
// ==/UserScript==

setTimeout(initCommentButtons, 100);

var page = 1, enabledPrev = true, enabledNext = true;
var commentButtonContainer, viewMoreButton, prevButton, pageIndex, nextButton, newButtonContainer;
var nextPageUrl = document.location.toString().split("?")[0]+"/comments", prevPageUrl = null;
var nextPagePlaceholder, prevPagePlaceholder;

function initCommentButtons() {
	if(!document.getElementById("commentutility")) {
		setTimeout(initCommentButtons, 100);
		return;
	}
	commentButtonContainer = document.createElement("li");
	commentButtonContainer.innerHTML = "&nbsp;|&nbsp;";
	viewMoreButton = document.createElement("a");
	viewMoreButton.innerHTML = "View more";
	viewMoreButton.href = "javascript:void(0);";
	viewMoreButton.addEventListener("click", initPages, false);
	commentButtonContainer.appendChild(viewMoreButton);
	try {
		newButtonContainer = document.getElementById("commentutility");
		newButtonContainer.appendChild(commentButtonContainer);
	} catch(e) {
		
	}
}

function initPages(event) {

	viewMoreButton.removeEventListener("click", initPages, false);
	commentButtonContainer.removeChild(viewMoreButton);
	commentButtonContainer.innerHTML = "&nbsp;|&nbsp;";

	prevButton = document.createElement("a");
	prevButton.innerHTML = "&lt;&lt;Prevous";
	prevButton.href = "javascript:void(0);";
	prevButton.addEventListener("click", prevPage, false);
	commentButtonContainer.appendChild(prevButton);

	pageIndex = document.createElement("span");
	pageIndex.innerHTML = "&nbsp;[page 1]&nbsp;";
	commentButtonContainer.appendChild(pageIndex);

	nextButton = document.createElement("a");
	nextButton.innerHTML = "Next&gt;&gt;";
	nextButton.href = "javascript:void(0);";
	nextButton.addEventListener("click", nextPage, false);
	commentButtonContainer.appendChild(nextButton);

	nextPagePlaceholder = document.createElement("span");
	nextPagePlaceholder.innerHTML = "Next&gt;&gt;";

	prevPagePlaceholder = document.createElement("span");
	prevPagePlaceholder.innerHTML = "&lt;&lt;Prevous";

	loadCommentPage(nextPageUrl);
}

function disablePrevButton() {
	if(!enabledPrev) return;
	enabledPrev = false;
	commentButtonContainer.insertBefore(prevPagePlaceholder, prevButton);
	commentButtonContainer.removeChild(prevButton);
}

function disableNextButton() {
	if(!enabledNext) return;
	enabledNext = false;
	commentButtonContainer.insertBefore(nextPagePlaceholder, nextButton);
	commentButtonContainer.removeChild(nextButton);
}

function enablePrevButton() {
	if(enabledPrev) return;
	enabledPrev = true;
	commentButtonContainer.insertBefore(prevButton, prevPagePlaceholder);
	commentButtonContainer.removeChild(prevPagePlaceholder);
}

function enableNextButton() {
	if(enabledNext) return;
	enabledNext = true;
	commentButtonContainer.insertBefore(nextButton, nextPagePlaceholder);
	commentButtonContainer.removeChild(nextPagePlaceholder);
}

function nextPage(event) {
	page++;
	loadCommentPage(nextPageUrl);
}

function prevPage(event) {
	page--;
	loadCommentPage(prevPageUrl);
}

function updatePage() {
	pageIndex.innerHTML = "&nbsp;[page "+page+"]&nbsp;";
}

function loadCommentPage(page) {
	disablePrevButton();
	disableNextButton();
	try {
		GM_xmlhttpRequest({
			method: "GET",
			url: page,
			onload: function(t) {
				parseCommentResult(page, t.responseText);
			},
			onerror: function(t) {
				enablePrevButton();
				enableNextButton();
			}
		});
	} catch(e) {
		enablePrevButton();
		enableNextButton();
	}
}

function parseCommentResult(resPage, result) {

	var commentsResultText, newCommentsList;
	newCommentsList = document.getElementById("recent_comments").getElementsByTagName("div")[0];
	newCommentsList.innerHTML = commentsResultText = result.match(/<div>\s*(<div class="user_message comment[\s\S]+?)<\/div>\s*<\/div>\s*<\/div>/)[1]+"</div></div>";

	var prevButtonUrl = result.match(/<a href="(\/games\/\S+?\/\S+?\/comments\S+?)" rel="nofollow">&laquo;&nbsp;Prev<\/a>/);

	if(prevButtonUrl) {
		enablePrevButton();
		prevPageUrl = prevButtonUrl[1];
	} else disablePrevButton();

	var nextButtonUrl = result.match(/<a href="(\/games\/\S+?\/\S+?\/comments\S+?)" rel="nofollow">Next&nbsp;&raquo;<\/a>/);

	if(nextButtonUrl) {
		enableNextButton();
		nextPageUrl = nextButtonUrl[1];
	} else disableNextButton();

	updatePage();

	getRatings(commentsResultText);

}

function getRatings(resultText) {

	if(!document.getElementById("mystuff")) return;
	var userName = document.getElementsByClassName("username")[0].innerHTML;

	var commentIDs = resultText.match(/id="comment_[0-9]+?"/g);
	for(var i=0;i<commentIDs.length;i++) {
		commentIDs[i] = commentIDs[i].match(/[0-9]+/)[0];
	}
	var commentIDsString = encodeURIComponent("["+commentIDs.join(",")+"]");
	
	try {
		GM_xmlhttpRequest({
			method: "GET",
			url: "/accounts/"+userName+"/comment_ratings.json?comment_ids="+commentIDsString,
			onload: function(t) {
				rateComments(t.responseText);
			}
		});
	} catch(e) {
		
	}
}

function rateComments(ratings) {
	ratings = JSON.parse(ratings);
	var currentComment, i;
	for(i in ratings) {
		currentComment = document.getElementById("comment_"+i);
		currentComment.className += ratings[i]?" rated_positive":" rated_negative";
	}
}