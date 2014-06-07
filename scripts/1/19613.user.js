// ==UserScript==
// @name           Heise.de Forum: all comments on one page
// @description    All comments on one page, iReply, quick-vote, user-scores.
// @include        http://*heise.de/*/foren/*
// @include        http://*heise.de/foren/*
// @version        21.12.2010
// ==/UserScript==


/********************************************
 * USER SETTINGS
 ********************************************/
var overviewPagePostCount  = 16;
var maxJoinedPosts         = overviewPagePostCount * 10; // in overview, add x posts * y pages
var maxJoinedPostsInThread = 80;

// user score is scaled by this value and then fitted into 0-10
var posterScoreScaleFactor = 0.3;

// here you can enable joining on different overview levels
var joinTopLevelForen = 1;
var joinSubLevelForen = 1;

var enableThreadView = 1;

// reply stuff
var enableIReply    = 1;
var enableAutoQuote = 1;
var enableQuickVote = 1;

// "plain" for disabling colored bar indentation
var displayMode = "colored";

// defines the colors used for colored indentation
var branchBorderStyle = "1px dashed";

function getBranchColor(lvl) {
	switch(lvl % 8) {
		case 0:  return "#999999";
		case 1:  return "#445599";
		case 2:  return "#995544";
		case 3:  return "#449955";
		case 4:  return "#994455";
		case 5:  return "#554499";
		case 6:  return "#CC77CC";
		case 7:  return "#554499";
	}
}

function getQuoteColor(lvl) {
	switch(lvl) {
		case 2:  return "#668811";
		case 3:  return "#445599";
		case 4:  return "#995544";
		case 5:  return "#449955";
		case 6:  return "#994455";
		case 7:  return "#554499";
		case 8:  return "#CC77CC";
		case 9:  return "#554499";
		// ...
		default: return "";
	}
}


/********************************************
 * BROWSER DEPENDENT
 ********************************************/
function isOpera() {
	return typeof(opera) != "undefined";
}

function isSafari() {
	return typeof(safari) != "undefined" || /apple/i.test(navigator.vendor) || /safari/i.test(navigator.userAgent);
}

function isChrome() {
	return typeof(chrome) != "undefined";
}


function log(msg) {
	if (isOpera()) opera.postError(msg);
	// else if (isChrome()) console.log(msg); // chrome supports GM_log
	else if(isSafari())
	{
		// according to the docs, GM_log is supported
		if(typeof(GM_log) != undefined)
			GM_log(msg);
	}
	else GM_log(msg);
}

function requestHTML(fileUrl, callback, nr, div) {
	fileUrl = ensureAbsoluteUrl(fileUrl);
	if (isOpera() || isSafari()) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open('GET', fileUrl, true);
		xmlHttp.onreadystatechange = function () {
			if(xmlHttp.readyState == 4 &&
			   xmlHttp.status     == 200)
				callback(xmlHttp.responseText, nr, div, fileUrl);
		};
		xmlHttp.send(null);
	}
	else { // maybe the opera way works here, but this one contains more GM_s
		GM_xmlhttpRequest(
		{
			method: 'GET',
			url: fileUrl,
			onload: function(resp) {
				if(resp.status == 200)
					callback(resp.responseText, nr, div, fileUrl);
			}
		});
	}
}

// TODO: this is limited to simple values, yet sufficient
function setLocalValue(name, val) {
    if (isOpera() || isChrome() || isSafari()) {
		var lifeTime = 31536000;
		document.cookie = escape(name) + "=" + escape(val) +
			";expires=" + (new Date((new Date()).getTime() + (1000 * lifeTime))).toGMTString() + ";path=/";
	}
	else
		GM_setValue(name, val);
}

function getLocalValue(name, def ) {
	if(isOpera() || isChrome() || isSafari()) {
		var cookieJar = document.cookie.split("; ");
		for(var x = 0; x < cookieJar.length; x++) {
			var oneCookie = cookieJar[x].split( "=" );
			if( oneCookie[0] == escape(name) ) {
				try {
					eval('var footm = '+unescape(oneCookie[1]));
					return footm;
				} catch(e) { return def; }
			}
		}
		return def;
	}
	else
		return GM_getValue(name, def);
}



/********************************************
 * THE CODE
 ********************************************/
var baseUrl = 'http://' + document.location.host;
var postingRegExp = /((<div class="vote_posting">[\s\S]*?)?(?=(<div class="posting_date">))\3[\s\S]*?(?=(<div class="tovote_links">))\4[\s\S]*?<\/div>)/;

var searchUrl = baseUrl + '/foren/suche?q=';

function xpath(xp, root)
{
	if(root === undefined) root = document;
	return document.evaluate(xp, root, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}
function xpath1(xp, root)
{
	var res = xpath(xp, root);
	return (res.snapshotLength > 0) ? res.snapshotItem(0) : null;
}

function ensureAbsoluteUrl(url)
{
	if(url.match(/^\//))
		url = baseUrl + url;
	return url;
}

function defineScriptInPageContext(code)
{
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.innerHTML = code;

	document.body.appendChild(script);
}

function getElementsByClassName(oElm, strTagName, strClassName) {

	var arrElements = (strTagName == "*" && document.all) ?
		document.all : oElm.getElementsByTagName(strTagName);

	var arrReturnElements = new Array();
	strClassName = strClassName.replace(/\-/g, "\\-");

	var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");

	for(var i = 0; i < arrElements.length; i++) {

		var oElement = arrElements[i];
		if(oRegExp.test(oElement.className))
			arrReturnElements.push(oElement);

	}
	return (arrReturnElements);
}

function grepTitleLinkURL(html)
{
	var res = html.match(/<a[^>]*? href="([\s\S]*?)"[^>]*? title=(["'])[\s\S]*?\2>/i);
	if(!res) return null;
	return res[1];
}

function joinThreadPosts()
{
	// do it this way to respect priorities
	var rootPostDiv = xpath1("//div[@class='forum_content']");
	if(rootPostDiv == null)
		rootPostDiv = xpath1("//div[@id='mitte_forum']");
	if(rootPostDiv == null)
		rootPostDiv = xpath1("//div[@id='mitte']");
	if(rootPostDiv == null)
		rootPostDiv = xpath1("//td[@class='f-content']");
	if(rootPostDiv == null)
		log("Root div not found!");

	var rootPostText = xpath1("p[@class='posting_text']", rootPostDiv);
	appendReplyFrame(rootPostText, -1, rootPostDiv);

	var replyLinkA = xpath1(".//a[text() = 'Beantworten']", rootPostDiv);
	var replyLink = replyLinkA == null ? "" : replyLinkA.href;
	processMessageDiv(rootPostDiv, document.location.href, replyLink);

	var threadsList = xpath1("//ul[@class='thread_tree']");
	if(threadsList == null)
	{
		log("Thread tree not found - activate it!");
		return;
	}

	var divStack  = new Array();
	divStack.peek = function() { return this[this.length - 1]; }

	var answerDiv = document.createElement('div');
	threadsList.parentNode.insertBefore(answerDiv, threadsList);
	divStack.push(answerDiv);
	
	var threadMsgs = xpath(".//div[@class='thread_title']", threadsList);
	var maxJoinCnt  = Math.min(threadMsgs.snapshotLength, maxJoinedPostsInThread);
	var afterActive = 0;
	var cntJoined   = 0;
	var rootAbsoluteDepth = 0;

	for(var i = 0; i < threadMsgs.snapshotLength && cntJoined <= maxJoinCnt; i++) {
		var msgDiv   = threadMsgs.snapshotItem(i);
		var isActive = 0;

		// search the currently selected beitrag
		if(msgDiv.innerHTML.match("beitrag_aktiv") ||
		   msgDiv.innerHTML.match("active_post")) {
			afterActive = 1;
			isActive = 1;
			rootAbsoluteDepth = countLevel(msgDiv);
			continue;
		}
		else if(afterActive == 0) continue;
		
		// count the number of next_levels upwards
		var curRelativeDepth = countLevel(msgDiv) - rootAbsoluteDepth;

		// only show current subnode
		if(curRelativeDepth <= 0) break;

		// find the URL
		var url = grepTitleLinkURL(msgDiv.innerHTML);
		if(!url) {
			log("Error parsing: " + msgDiv.innerHTML);
			continue;
		}

		// create div for the branch
		var divBranch = document.createElement('div');
		if(!isActive)
			divBranch.style.marginLeft = "20px";
		if(displayMode == "colored")
			divBranch.style.borderLeft = branchBorderStyle + " " + getBranchColor(curRelativeDepth);


//		divBranch.innerHTML = '<a style="display: block; font-size: 6px">^^^</a>';

		// create div for the post
		var divPost = document.createElement('div');
		divPost.style.border = "1px dashed #DDDDDD";
		divPost.style.marginLeft = "8px"; // some space from the border

		// decend down to current level
		while(curRelativeDepth < divStack.length) divStack.pop();

		// add it
		divStack.peek().appendChild(divBranch);
		divBranch.appendChild(divPost);

		// create the ireply frame
		appendReplyFrame(divBranch, cntJoined, divPost);

		// remember current branch
		divStack.push(divBranch);

		// grep it
		requestHTML(url, callbackThread, i, divPost);

		cntJoined++;
	}

	if(afterActive == 0) {
		log("found no active post!");
		return;
	}
}

function appendReplyFrame(div, id, divPost)
{
	if(div == null)
	{
		log("div to attach reply frame to is null");
		return;
	}

	var iReplyFrame = document.createElement('iframe');
	iReplyFrame.id = "reply" + id;
	iReplyFrame.style.display = 'none';
	iReplyFrame.style.width   = '100%';
	iReplyFrame.style.height  = '35em';
	divPost.setAttribute("replyFrameID", iReplyFrame.id);

	var divReply = document.createElement('div');
	divReply.style.marginLeft = divPost.style.marginLeft;
	divReply.appendChild(iReplyFrame);

	div.appendChild(divReply);
}

function callbackThread(txt, nr, div, url)
{
	try
	{
		// pre-check the posting for performance issues
		// else match can lock up
		if(txt.indexOf('<div class="posting_date">') == -1 ||
		   txt.indexOf('<div class="tovote_links">') == -1) {
			log("No known posting: " + url);
			return;
		}

		var mtchs = txt.match(postingRegExp);
		if(mtchs == null) {
			div.innerHTML = "<i>Could not load comment</i>";
			return;
		}

		var html = mtchs[1];
		div.innerHTML = html;

		var replyLinks = txt.match(/<a href="([^"]*)"\s*>Beantworten<\/a>/);
		var replyLink  = (replyLinks != null) ? replyLinks[1] : "";

		processMessageDiv(div, url, replyLink);
	}
	catch(e)
	{
		log('Error processing post: ' + e);
	}
}

function processMessageDiv(div, messageUrl, replyLink) {

	// link username to search
	var userI = xpath1(".//div[@class='user_info']/i", div);
	var userName;
	if(userI != null)
	{
		userName = userI.innerHTML.replace(/^(.*?),&nbsp;.*$/, "$1");
		userI.innerHTML = "<a href=\"" + searchUrl + escape(userName) + "\">" + userI.innerHTML + "</a>";

		userI.innerHTML += getPosterScoreBarCode(userName);
	}
	else
	{
		userName = "?";
		log("Could not find username div!");
	}

	// colorize quote
	var quotes = xpath(".//p/span[@class='quote']", div);
	for(var i = 0; i < quotes.snapshotLength; i++) {
		var e = quotes.snapshotItem(i);

		var patternLength = 10;
		var m = e.innerHTML.match(/^((?:&gt;&nbsp;)+)/);
		if(m != null) {
			var color = getQuoteColor(m[0].length / patternLength);
			if(color != "")
				e.innerHTML = "<span style=\"color: " + color + "\">" + e.innerHTML + "</span>";
		}
	}

	// set the reply links
	if(replyLink != "") {
		replyLink       = ensureAbsoluteUrl(replyLink);
		replyLinkInline = "<a style=\"color: #6673DD\" onclick=\"iReply('" + div.getAttribute ("replyFrameID") +
			"', '" + replyLink + "')\">iReply</a>";
		replyLink       = "<a href=\"" + replyLink + "\">Beantworten</a>";

		if(userI != null)
			userI.innerHTML += " --- " + replyLink + (enableIReply ? " / " + replyLinkInline : "");
	}

	// link posting title to posting
	var postingSubject = xpath1(".//h3[@class='posting_subject']", div);
	if(postingSubject != null)
		postingSubject.innerHTML = "<a href=\"" + messageUrl + "\">" + postingSubject.innerHTML + "</a>";
	else
		log("Posting subject not found!");

	// relink voting buttons
	if(enableQuickVote) {
		var voteLinks = xpath(".//div[@class='tovote_links']/a", div);
		for(var i = 0; i < voteLinks.snapshotLength; i++) {
			var voteLink = voteLinks.snapshotItem(i);
			var url = voteLink.href;

			voteLink.removeAttribute("href");
			voteLink.addEventListener("click",
				quickVoteFunctionBuilder(voteLink, url, userName), true);

			voteLink.setAttribute("onclick", "sendVote(this, '" + url + "');");
		}
	}
}

function quickVoteFunctionBuilder(voteLink, url, author) {
	return function() {
		log("voted for author: " + author);

		// mark as voted
		voteLink.style.backgroundColor = "yellow";

		// extract score
		var matches = url.match(/postvote-(-?\d)/);
		if(!matches) return;

		var score = parseInt(matches[1]);
		log("score: " + score);

		// score the author
		scorePoster(author, score);
	};
}

function getPosterScoreBarCode(author) {
	var absScore = getPosterScore(author);
	if (absScore === undefined) return "";

	// TODO: think about making it logarithmical
	var score = absScore * posterScoreScaleFactor;
	score += 5;
	if(score >= 4 && score <= 6) return "";

	score = Math.min(score, 10);
	score = Math.max(score, 0);
	score += 1;
	score = Math.round(score);

	return "&nbsp;&nbsp;<img src=\"/icons/forum/wertung_" + score + ".gif\" title=\"User-Score: " + absScore + "\"/>";
}

function getPosterScore(author) {
	return getLocalValue("score_" + author, 0);
}
function scorePoster(author, score) {
	var oldScore = getPosterScore(author);
	setLocalValue("score_" + author, oldScore + score);
}

function countLevel(el)
{
	var lvl = 1;

	// limit loop, just to be sure
	for(var i=0; i < 10000; i++) {
		var par = el.parentNode;
		el = par;

		if(par == null) break;
		if(par.className == "thread_tree") break;
		if(par.className == "nextlevel" ||
		   par.className == "nextlevel_line")
			lvl++;
	}

	return lvl;
}

function insertPostStart(url, nr)
{
	var eall = "";
	if(document.location.href.match(/\/e-all/)) eall = "/e-all";

	return url.replace(/(\/(list|foren)\/hs)-\d+/, "$1-" + nr + eall);
}

function extractPostStart(url)
{
	var matches = url.match(/\/hs-(\d+)/);
	if(!matches) return -1;

	return parseInt(matches[1]);
}

function joinOverviewPages()
{
	showOverviewPosterScores(document);

	var pageNrUls   = getElementsByClassName(document, "ul", "forum_navi");
	var threadTrees = getElementsByClassName(document, "ul", "thread_tree");
	if(threadTrees.length == 0)
		threadTrees = getElementsByClassName(document, "ul", "fora_list");

	if(pageNrUls.length   == 0 ||
	   threadTrees.length == 0) {
		log("no forum_navi or thread_tree");
		return;
	}

	var firstPageURL = "";
	var lastPageURL  = "";

	// find the first and last of the page URLs
	var pageLinks = pageNrUls[0].getElementsByTagName("li");
	for(var i = 0; i < pageLinks.length; i++) {
		var pageLink = pageLinks[i];

		if(pageLink.innerHTML.match(/>Neuere</)) break;
		if(pageLink.innerHTML.match(/^\d+$/))    firstPageURL = "";

		// find the URL
		var url = grepTitleLinkURL(pageLink.innerHTML);
		if(!url) continue;

		if(firstPageURL == "")
			firstPageURL = url;
		lastPageURL = url;
	}
	if(firstPageURL == "" || lastPageURL == "") {
		log("found no page URLs");
		return;
	}

	// extract the post numbers
	var firstPostNr = extractPostStart(firstPageURL);
	var lastPostNr  = extractPostStart(lastPageURL);
	if(firstPostNr == -1 || lastPostNr == -1) {
		log("found no post numbers");
		return;
	}

	// limit pages to users setting
	var limited = false;
	if(lastPostNr - firstPostNr > maxJoinedPosts) {
		lastPostNr = firstPostNr + maxJoinedPosts;
		limited = true;
	}

	// add list items and load the overview pages into them
	var threadTree = threadTrees[0];
	for(var j = firstPostNr; j <= lastPostNr; j += overviewPagePostCount) {
		var url = ensureAbsoluteUrl(insertPostStart(lastPageURL, j));

		var li = document.createElement('li');
		li.innerHTML = "<b>Beitr&auml;ge ab Nr. " + j + "</b>";
		threadTree.appendChild(li);

		li = document.createElement('li');
		li.innerHTML = "<i>Lade...</i>";
		threadTree.appendChild(li);

		requestHTML(url, callbackOverviewPage, j, li);
	}

	// add links to navigate
	if(firstPostNr > overviewPagePostCount) {
		var li = document.createElement('li');
		li.innerHTML = "<a href=\"" + ensureAbsoluteUrl(insertPostStart(lastPageURL, firstPostNr - maxJoinedPosts - 3 * overviewPagePostCount)) + "\"><b>Vorwärts...</b></a>";
		threadTree.insertBefore(li, threadTree.childNodes[0]);
	}
	if(limited) {
		var li = document.createElement('li');
		li.innerHTML = "<a href=\"" + ensureAbsoluteUrl(insertPostStart(lastPageURL, lastPostNr + overviewPagePostCount)) + "\"><b>Weiter...</b></a>";
		threadTree.appendChild(li);
	}
}

function callbackOverviewPage(txt, nr, startli, url)
{
	var matches = txt.match(/<ul class=\"(thread_tree|fora_list)\">([\s\S]*)<\/ul>[\s\S]*?<ul class="forum_navi">/i);
	if(!matches) {
		startli.innerHTML = "<b><i>Fehler beim Laden</i></b>";
		return;
	}

	var lis = matches[2];
	lis = lis.replace(/\/read(?!\/showthread-1)/g, "/read/showthread-1");
	startli.innerHTML = "<ul style=\"padding-left: 0px; list-style-type: none\">" + lis + "</ul>";

	showOverviewPosterScores(startli);
}

function showOverviewPosterScores(root) {
	var userdivs = xpath(".//div[@class='thread_user']", root);
	for(var i = 0; i < userdivs.snapshotLength; i++) {
		var div = userdivs.snapshotItem(i);
		div.innerHTML += getPosterScoreBarCode(div.innerHTML.trim());
	}
}

function cleanUpReplyPage()
{
	if(enableAutoQuote && document.getElementsByName("message")[0].value == "") {
		// select the right button the ultra hacky way
		document.getElementsByName("quote")[0].click();
		return;
	}

	var form = xpath1("//div[@class='forum_content' or @id='mitte_forum']");
	var html = form.innerHTML;

	// messy but working
	html = html.replace(/(Unsere Foren|Dieses Forum)[\s\S]*<textarea/i, "<textarea");
	html = html.replace(/<i>\([^)]+\)<\/i>/ig, "");

	document.body.innerHTML = html;
}

function isWriteUrl(url)
{
	return url.match(/\/write\/$/);
}

function ensureShowThreadLinks()
{
	var links = xpath("//a");

	// we need the tree enabled on all links
	for (var i = 0; i < links.snapshotLength; i++) {
		var link = links.snapshotItem(i);
		if(link.href.match(/\/read\//))
			link.href = link.href.replace(/\/read\/(?!showthread-1)/, "/read/showthread-1/");
	}
}

function main()
{
	String.prototype.trim = function() {
		a = this.replace(/^\s+/, '');
		return a.replace(/\s+$/, '');
	};

	ensureShowThreadLinks();

	if(enableIReply) {
		defineScriptInPageContext(
		'function iReply(frameId, replyUrl) {' +
		'var frm = document.getElementById(frameId);' +
		'frm.src = replyUrl;' +
		'frm.style.display = ""' +
		'}');

		// is reply page?
		if((isWriteUrl(document.location.href) || document.body.innerHTML.match(/<textarea name="message"/i)) &&
		  (top === undefined || !isWriteUrl(top.location.href))) {
			cleanUpReplyPage();
			return;
		}
	}
 
	if(enableQuickVote) {
		defineScriptInPageContext(
		'function sendVote(target, voteUrl) {' +
		'var xmlHttp = new XMLHttpRequest();' +
		'xmlHttp.open(\'GET\', voteUrl, true);' +
		'xmlHttp.send(null);' +
		'target.style.backgroundColor = "yellow";' +
		'}');
	}
	// is board overview?
	if(joinSubLevelForen == 1 && document.location.href.match(/\/forum-\d+\/list/) ||
	   joinTopLevelForen == 1 && document.location.href.match(/\/foren\/(hs-\d+\/)?$/)) {
		joinOverviewPages();
		return;
	}

	// else must be a thread view
	joinThreadPosts();
}

main();
