// ==UserScript==....................................
// @name           TexAgs GreaseMonkey
// @namespace      texags
// @description    Version 2.01
// @include        http://texags.com/main/*
// @include        http://www.texags.com/main/*
// @include		 http://mybcs.com/*
// @include		 http://www.mybcs.com/*
// ==/UserScript==


/*********  USER-DEFINED VARIABLES  ***********/

var userWatchList = Array('WatchOle', 'Liucci', 'JeremyK', 'MWR Admin', 'Moderator', 'ooshwa', 'myBCS.com', 'thisladyisacop', 'Mr. Traffic');

var sipList = Array('2005Horn', '33', '91 Horn', '94 Texas EX', 'A Corda', 'AkersN', 'AlexNguyen', 'austx', 'Authentic Horn', 'awinlonghorn', 'bassale47', 
'BleedOrange10', 'booleyHorn', 'BoyNamedSue', 'Chest Rockwell', 'Devinp23', 'Dr Drunkenstein', 'Fast Times', 'FtWorthHorn', 'Full Tilt', 'FWHORN', 'FXST', 
'gnglonghorn', 'GoHorns94', 'h264', 'Hellraiser97', 'highwayman', 'horn1', 'Hornblood', 'Hornographer', 'Horns11', 'hookem3', 'huisache', 'IgnatiusReilly', 
'IIIHorn', 'INIGO MONTOYA', 'Jakovasaur', 'jefford22', 'jkavvytx', 'JTaylor', 'KidTwist', 'l-horndev', 'landman1', 'Lifeguard NO.2', 'Lhorn01', 'LHorns3',
'locohorn', 'LonghornDub', 'LonghornsNo1', 'Lost Saucer', 'MidnightBevo', 'Mister Randy Watson', 'Mr. Drummond', 'MustangOrange', 'nbbob', 'NerveEndings', 
'Nonhostile Sip', 'northernhorn', 'Norwegian Wood', 'ObjectiveUTLAW91', 'onehorn', 'Pato', 'Professor Terguson', 'realhorn', 'rscharnell', 'saltwater', 
'Samsill98', 'Skihorn', 'sodiumacetate', 'squid', 'TEXAS FIGHT!', 'Tex Pete', 'Texas velvet maestro', 'Texas_Fan', 'Texas75', 'TexasBorn', 'TexasEx1994', 'Texdoc',
'The Lat Man', 'Theo', 'THorns90', 'toucan82', 'UniHorn', 'UT2005', 'UTGrad02', 'UTLawHorn', 'W.E. Henley', 'West Horn', 'Winston Wolfe');

var tardList = Array('0raider0', 'Big 12-0', 'BillJack', 'BreakPoint778', 'Cowtown Raider', 'Cowtown Red', 'DrKennethNoisewater', 'Hong Kong Paul', 'leachfan', 'PaleHorse', 'raiderjay', 
'rockylarues', 'shiner raider', 'TechDiver', 'Techsan_02', 'TechTard', 'TENBOLLS', 'Texas Tech Universe', 'ttechguy', 'TTechDeck', 'TTUClint', 'WreckemTXTech', 'Zorro');

var maxImgSize = 1000;
var sigChecked = false;
var pageNumberThreshold = 4;
var maxPageNumbers = 8;

//use http://www.allprofitallfree.com/color-wheel2.html to pick the color of your choice 
//then copy and paste the 6 digit/letter HTML code after the # sign in place of the old color code

var watchListHighlightColor = '#ffdddd';
var postedHighlightColor = '#ddffdd';
var repliedHighlightColor = '#ddddff';

/**********************************************/


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < els.length; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

function insertAtCursor(event) {
	event.preventDefault();
	var link, textarea, openTag, closeTag;
	link = event.currentTarget;
	openTag = '['+link.title+']';
	closeTag = '[/'+link.title+']';
	var textareas = document.getElementsByTagName('textarea');
	textarea = textareas[0];
	var scrollX = textarea.scrollLeft;
	var scrollY = textarea.scrollTop;
	if (textarea.selectionStart || textarea.selectionStart == '0') {
		var startPos = textarea.selectionStart;
		var endPos = textarea.selectionEnd;
		textarea.value = textarea.value.substring(0, startPos)
			+ openTag + textarea.value.substring(textarea.selectionStart, textarea.selectionEnd)
			+ closeTag +textarea.value.substring(endPos, textarea.value.length);
		if (startPos == endPos) textarea.selectionStart = endPos + openTag.length;
		else textarea.selectionStart = endPos + openTag.length + closeTag.length;
		textarea.selectionEnd = textarea.selectionStart;	
	} 
	textarea.focus();
	textarea.scrollLeft = scrollX;
	textarea.scrollTop = scrollY;
}

function postButton(imageSource,title,func) {
	var image, button;
	image = document.createElement('img');
	image.src =  imageSource;
	image.style.backgroundColor = '#5a121e';
	image.style.marginTop = 2;
	image.style.marginLeft = 2;
	image.addEventListener('mouseover', function (event) {this.style.backgroundColor = '#000000';}, false);
	image.addEventListener('mouseout', function (event) {this.style.backgroundColor = '#5a121e';}, false);
	button = document.createElement('a');
	button.title = title;
	button.href = title;
	button.addEventListener('click', func, false);
	button.appendChild(image);
	return button;
}

var testReply = /postreply/;
var testPost = /posttopic/;
var testPM = /privatemessage/;
var testEdit = /replyedit/;
var testTopic = /forum.topic/;
var testThread = /forum.reply/;
var testBCSTopic = /Topics/;
var testBCSThread = /Replies/;

if (testReply.test(window.location.href) || testPost.test(window.location.href) || testEdit.test(window.location.href) || testPM.test(window.location.href)) {
GM_log('test works');	
var allInputs;
	allInputs = document.evaluate("//input[@type='checkbox']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var j = 0; j < allInputs.snapshotLength; j++)
		allInputs.snapshotItem(j).checked = sigChecked;
	if (testReply.test(window.location.href)) {
		var url = window.location.href;
		var findTopicID = /topic_id=(\d+)/;
		url.match(findTopicID);
		var topicID = RegExp.$1;
		var submitSpan = getElementsByClass("inlinewordbuttons",null,"span");
		submitSpan[0].childNodes[0].childNodes[0].addEventListener('click', function(event) {
			if (GM_getValue(topicID, 'none') == 'none')
				GM_setValue(topicID, 'null');
			}, false);
	}
	var headings = getElementsByClass("formlabel", null, "td");
	var reply = /Your/;
	for (var i = 0; i < headings.length; i++) {
		if (reply.test(headings[i].innerHTML)) {
			var textareas = document.getElementsByTagName('textarea');
			var textarea = textareas[0];
			headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///////////yH5BAEAAAAALAAAAAAoAA8AAAJCjI+pywkPo5y0PmOzrnj73X0iFV7RAQSQqppgu0ptx8avjKc6i3qlfnJhYLDMD5Eaxoi+4uiZhEqj0+ev+mpot40CADs=', 'url', insertAtCursor), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAAoAA8AAAJHjI+pyzkPo5y0PmOzrnj73X0iFV5YAKHDkXYIqUbqica1FMPTvPbOXCvJcpdi0dY7ZoQsJHLlYu2Io6qwOrpiP9otqAEOgwsAOw==', 'img', insertAtCursor), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAAoAA8AAAJGjI+pyzkPo5y0PmOzrnj73X0iFULHZV6dg0jlEKQxOsMpSta4Xcf9DXsFXbLi7pebnFS9UvMl3I0y0emnagXpsqKG9/stAAA7', 'quote', insertAtCursor), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhKAAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAAoAA8AAAJHjI+pyzkPo5y0PmOzrnj73X0iFV7HEEAp2p2rVaIRRqvXncWnnPYI/uIEZbbba4XU6Fy2I8sXUw1H1ChVZL16slpl4wv+FgAAOw==', 'email', insertAtCursor), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(document.createElement('br'), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhEwAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAATAA8AAAImjI+Zw+3PDJxOUmovzA1NHnVbMIIR+aCD2rGnubraOY91Ks/KvhcAOw==', 'b', insertAtCursor), headings[i].lastChild.nextSibling);
			headings[i].insertBefore(postButton('data:image/gif;base64,R0lGODlhEwAPAKEBAMDAwP///5mZmf///yH5BAEAAAMALAAAAAATAA8AAAIjjI+Zw+3PDJxOUmovzJU3/2EBJpITOBznqG1s28EPqim2XQAAOw==', 'i', insertAtCursor), headings[i].lastChild.nextSibling);
		}
	}
}

else if (testTopic.test(window.location.href)) {
	var theFooter = getElementsByClass("footer2");
	var myUserName = theFooter[0].childNodes[1].innerHTML;
	var topics = getElementsByClass("topics", null, "a");
	var findTopicID = /topic_id=(\d+)/;
	var thisTopic, topicID, lastReplyCount, currentReplyCount;
	for (i=0; i<topics.length;i++) {
		thisTopic = topics[i];
		if (pageNumberThreshold && thisTopic.parentNode.parentNode.childNodes[4].innerHTML > ((pageNumberThreshold - 1) * 35 - 1)) {
			thisTopic.style.paddingRight = 25;
			var forumID = /(&forum_id=\d+)$/;
			var numberOfPages = Math.ceil(thisTopic.parentNode.parentNode.childNodes[4].innerHTML/35 + 1/35);
			for (var j = 1; j <= numberOfPages; j++) {
				if (numberOfPages > maxPageNumbers && j == Math.floor(maxPageNumbers/2)+1) {
					thisTopic.parentNode.insertBefore(document.createTextNode("..."), thisTopic.parentNode.lastChild.nextSibling);
					j = (numberOfPages - Math.ceil(maxPageNumbers/2) + 1);
				}
				var pageLink = document.createElement('a');
				if (j==1) pageLink.href = thisTopic.href;
				else pageLink.href = thisTopic.href.replace(forumID, "&page="+j+"$1");
				pageLink.setAttribute('class', 'topics');
				pageLink.style.padding = 2;
				pageLink.innerHTML = j;
				thisTopic.parentNode.insertBefore(pageLink, thisTopic.parentNode.lastChild.nextSibling);
			}
		}
		thisTopic.href.match(findTopicID);
		topicID = RegExp.$1;
		lastReplyCount = GM_getValue(topicID, 'none');
		if (lastReplyCount == 'none') {
			if (thisTopic.parentNode.parentNode.childNodes[3].innerHTML == myUserName) {
				for(j=0;j<thisTopic.parentNode.parentNode.childNodes.length; j++){
					thisTopic.parentNode.parentNode.childNodes[j].style.backgroundColor = postedHighlightColor;
					thisTopic.parentNode.parentNode.childNodes[j].style.fontWeight = 'bold';
				}
				GM_setValue(topicID, thisTopic.parentNode.parentNode.childNodes[4].innerHTML);
			}
			for(j=0; j<userWatchList.length; j++){
				if (userWatchList[j].toUpperCase() == thisTopic.parentNode.parentNode.childNodes[3].innerHTML.toUpperCase()){
					for(k=0;k<thisTopic.parentNode.parentNode.childNodes.length; k++){
						thisTopic.parentNode.parentNode.childNodes[k].style.backgroundColor = watchListHighlightColor;
						thisTopic.parentNode.parentNode.childNodes[k].style.fontWeight = 'bold';
					}
				}
			}
		}
		else {
			var bgColor;
			if (thisTopic.parentNode.parentNode.childNodes[3].innerHTML == myUserName) bgColor = postedHighlightColor;
			else bgColor = repliedHighlightColor;
			for(j=0;j<thisTopic.parentNode.parentNode.childNodes.length; j++){
				thisTopic.parentNode.parentNode.childNodes[j].style.backgroundColor = bgColor;
				thisTopic.parentNode.parentNode.childNodes[j].style.fontWeight = 'bold';
			}
			currentReplyCount = thisTopic.parentNode.parentNode.childNodes[4].innerHTML;
			if (lastReplyCount == 'null') {GM_setValue(topicID,currentReplyCount);}
			else if (currentReplyCount != lastReplyCount) {
				thisTopic.parentNode.parentNode.childNodes[4].innerHTML = lastReplyCount +" <font color='red'>+" + (currentReplyCount-lastReplyCount) + "</font>";
				GM_setValue(topicID,currentReplyCount);
			}
		}
	}
}

else if (testThread.test(window.location.href)) {
	var thisAnchor, userLevelImg, userName;
	var allAnchors = document.evaluate('//a[@name]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allAnchors.snapshotLength; i++) {
		thisAnchor = allAnchors.snapshotItem(i);
		userLevelImg = thisAnchor.parentNode.nextSibling.childNodes[1].childNodes[0];
		userName = thisAnchor.childNodes[0].innerHTML.toUpperCase();
		for (var j = 0; j < sipList.length; j++) {
			if (sipList[j].toUpperCase() == userName) {
				var sipTag = document.createElement('img');
				sipTag.src = 'data:image/gif;base64,R0lGODlhGwAUAMT/AP////r6+vTw6+7n3OnezuPZ1+LTvNzKrtr'+
					'JwdC3kM23qcmsf8SicMKih8DAwL6ZYriQU7aMWbGEQat7M6p4LqZyJKVuGaBpFpd1TIlgKXxdN3xQEnR'+
					'SKAAAAMDAwAAAACH5BAEAAB4ALAAAAAAbABQAQAXMoCeOZGmeYkNZ1yIQAAQBl/ECzMVe2Klgm6BwOMQ'+
					'oUB5EIxKhOJ9QZwRxilhYD4ABN6sBYLnLZdNDms+ewnK1u0RoYvH1GimUnCwJbMCACGoLbnBiGyUFGHG'+
					'JcQaBiWR2aJGSkycFCApLTJqaDQqQJ0pNbBcVEHFzFhRGJgpNeRAVOhEXEhMQEzpXFw0lrjUGEgsyNAY'+
					'GLX9xGSUYugkLFQcGMxbFLQNxG8okDW0TTaSzjN/YvCUKFIqJtdgbGkcoahgcREIcGA2flJEhADs=';
				userLevelImg.parentNode.insertBefore(sipTag, userLevelImg.nextSibling);
			}
		}
		for (var k = 0; k < tardList.length; k++) {
			if (tardList[k].toUpperCase() == userName) {
				var tardTag = document.createElement('img');
//credit to crewez of TexAgs for creating the tard tag image
				tardTag.src = 'data:image/gif;base64,R0lGODlhIQAUAMQfAMQIAdmEgMVGQME2MNR0cMlVUOzCwIkIAa0HA'+
					'M5lYPrw8K4XD7oHALknIOiysN2TkL02MMOSgpxJO6sHAM2zqOXY1vbh4OKjoNrIwMUNBsJJP6oGAIQJAb'+
					'EIAP///////yH5BAEAAB8ALAAAAAAhABQAAAX/4CeOZGmeaKqubOtWGBVpdG3fEVWp2KxlAGAwQwQMiUg'+
					'NBtX7ZTrQDgOBmECn1WgnI6GYKrPnoqDtIMrnDsQQ1exIlJ85wNYyyveOwBPdREoRTwgDFgoPHQQGBgQd'+
					'CRcODwsPBhd8HRsbEiVyHQsXFQMBCgQPHqEeDgEXFgEWfAiYCyVEUXQdAwUCBB4ColAeCR0Fr5gcJRJat'+
					'gkeFg68th28t8QcsiQaUGe2BocDz3UKAY18ExscmiQRl1Z7DxcKDoUB0MsGCh6w5n8kFRKYEwgKJJhQgE'+
					'CDAQMaQIgygMACAcUkvIGTAZPFfwjuYLxDxdw5LycoSOBAsiSHAyhLFqI8YLKLCjAjTcqcKSHCRBc4c+o'+
					'0EQIAOw==';
				userLevelImg.parentNode.insertBefore(tardTag, userLevelImg.nextSibling);
			}
		}
	}
	var allImages = document.getElementsByTagName('img');
	for (i=0; i < allImages.length; i++) 
		if(allImages[i].width > maxImgSize) 
			allImages[i].width = maxImgSize;
	var pageNumber, lastPage, testPageNumbers = /Page:/, findPageNumber = /\s(\d+)\s/;
	var pageNumbers = getElementsByClass("mediumboxtitle", null, "div");
	for(i=0;i<pageNumbers.length;i++) 
		if (testPageNumbers.test(pageNumbers[i].innerHTML)) {
			pageNumbers[i].innerHTML.match(findPageNumber);
			pageNumber = RegExp.$1;
			lastPage = (pageNumbers[i].childNodes.length+1)/2;
			if (pageNumber < lastPage) {
				var nextPage = document.createElement('a');
				nextPage.href = pageNumbers[i].childNodes[pageNumber*2-1].href;
				pageNumbers[i].insertBefore(nextPage, pageNumbers[i].lastChild.nextSibling);
				var nextArrow = document.createElement('img');
				nextArrow.src = 'data:image/gif;base64,R0lGODlhDAAMAIcAAAAAAGZmZsvLy93d3e7u7v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAYALAAAAAAMAAwA'+
					'AAhDAA0IGEiwoMACCBMqHFiAgMOHDgcwhBjgoUQBDR8GqEjgYsONICt6JBByY8eJGjmO1GgRJcSI'+
					'DAfInDlTgMCCOA0EBAA7';
				nextPage.insertBefore(nextArrow, nextPage.firstChild);
			}
			if (pageNumber > 1) {
				var prevPage = document.createElement('a');
				prevPage.href = pageNumbers[i].childNodes[pageNumber*2-3].href;
				pageNumbers[i].insertBefore(prevPage, pageNumbers[i].firstChild);
				var prevArrow = document.createElement('img');
				prevArrow.src = 'data:image/gif;base64,R0lGODlhDAAMAIcAAAAAAGZmZsvLy93d3e7u7v///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA'+
					'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAMAAAYALAAAAAAMAAwA'+
					'AAhCAA0IGEiwoMACCBMqHFiAgMOHDgcwfBgAokQBDQkEqPjwYsONICt61BhS5ESSFk9qTIkRIssC'+
					'A2LKlClAYMGbBgICADs=';
				prevArrow.style.paddingRight = 3;
				prevPage.insertBefore(prevArrow, prevPage.firstChild);
			}
		}
}

if (testBCSTopic.test(window.location.href)) {
	var theHeader = getElementsByClass("first", null, "a");
	var myUserName = theHeader[0].innerHTML;
	var bcstopics = getElementsByClass("text", null, "td");
	var findTopicID = /tid=(\d+)/;
	var thisTopic, topicID, lastReplyCount, currentReplyCount, row;
	for (i=0; i < bcstopics.length; i++) {
		thisTopic = bcstopics[i].childNodes[0];
		thisTopic.href.match(findTopicID);
		topicID = RegExp.$1;
		lastReplyCount = GM_getValue(topicID, 'none');
		if (lastReplyCount == 'none') {
			if (thisTopic.parentNode.parentNode.childNodes[4].innerHTML == myUserName) {
				for(j=1;j<(thisTopic.parentNode.parentNode.childNodes.length-1); j++){
					thisTopic.parentNode.parentNode.childNodes[j].style.backgroundColor = postedHighlightColor;
					thisTopic.parentNode.parentNode.childNodes[j].style.borderColor = postedHighlightColor;
					thisTopic.parentNode.parentNode.childNodes[j].style.fontWeight = 'bold';
				}
				GM_setValue(topicID, thisTopic.parentNode.parentNode.childNodes[5].innerHTML);
			}
			for(j=0; j<userWatchList.length; j++){
				if (userWatchList[j].toUpperCase() == thisTopic.parentNode.parentNode.childNodes[4].innerHTML.toUpperCase()){
					for(k=1;k<(thisTopic.parentNode.parentNode.childNodes.length-1); k++){
						thisTopic.parentNode.parentNode.childNodes[k].style.backgroundColor = watchListHighlightColor;
						thisTopic.parentNode.parentNode.childNodes[k].style.borderColor = watchListHighlightColor;
						thisTopic.parentNode.parentNode.childNodes[k].style.fontWeight = 'bold';
					}
				}
			}
		}
		else {
			var bgColor;
			if (thisTopic.parentNode.parentNode.childNodes[4].innerHTML == myUserName) bgColor = postedHighlightColor;
			else bgColor = repliedHighlightColor;
			for(j=1;j<(thisTopic.parentNode.parentNode.childNodes.length-1); j++){
				thisTopic.parentNode.parentNode.childNodes[j].style.backgroundColor = bgColor;
				thisTopic.parentNode.parentNode.childNodes[j].style.borderColor = bgColor;
				thisTopic.parentNode.parentNode.childNodes[j].style.fontWeight = 'bold';
			}
			currentReplyCount = thisTopic.parentNode.parentNode.childNodes[5].innerHTML;
			if (lastReplyCount == 'null') {GM_setValue(topicID,currentReplyCount);}
			else if (currentReplyCount != lastReplyCount) {
				thisTopic.parentNode.parentNode.childNodes[5].innerHTML = lastReplyCount +" <font color='red'>+" + (currentReplyCount-lastReplyCount) + "</font>";
				GM_setValue(topicID,currentReplyCount);
			}
		}
	}
}

else if (testBCSThread.test(window.location.href)) {
	var thisPost, userLevelImg, userName;
	var allPosts = getElementsByClass("poster", null, "td");
	for (var i = 0; i < allPosts.length; i++) {
		thisPost = allPosts[i];
		userLevelImg = thisPost.childNodes[1].childNodes[3].childNodes[0];
		userName = thisPost.childNodes[1].childNodes[1].childNodes[1].innerHTML.toUpperCase();
		for (var j = 0; j < sipList.length; j++) {
			if (sipList[j].toUpperCase() == userName) {
				var sipTag = document.createElement('img');
				sipTag.src = 'data:image/gif;base64,R0lGODlhGwAUAMT/AP////r6+vTw6+7n3OnezuPZ1+LTvNzKrtr'+
					'JwdC3kM23qcmsf8SicMKih8DAwL6ZYriQU7aMWbGEQat7M6p4LqZyJKVuGaBpFpd1TIlgKXxdN3xQEnR'+
					'SKAAAAMDAwAAAACH5BAEAAB4ALAAAAAAbABQAQAXMoCeOZGmeYkNZ1yIQAAQBl/ECzMVe2Klgm6BwOMQ'+
					'oUB5EIxKhOJ9QZwRxilhYD4ABN6sBYLnLZdNDms+ewnK1u0RoYvH1GimUnCwJbMCACGoLbnBiGyUFGHG'+
					'JcQaBiWR2aJGSkycFCApLTJqaDQqQJ0pNbBcVEHFzFhRGJgpNeRAVOhEXEhMQEzpXFw0lrjUGEgsyNAY'+
					'GLX9xGSUYugkLFQcGMxbFLQNxG8okDW0TTaSzjN/YvCUKFIqJtdgbGkcoahgcREIcGA2flJEhADs=';
				userLevelImg.parentNode.insertBefore(sipTag, userLevelImg.nextSibling);
			}
		}
		for (var k = 0; k < tardList.length; k++) {
			if (tardList[k].toUpperCase() == userName) {
				var tardTag = document.createElement('img');
				tardTag.src = 'data:image/gif;base64,R0lGODlhIQAUAMQfAMQIAdmEgMVGQME2MNR0cMlVUOzCwIkIAa0HA'+
					'M5lYPrw8K4XD7oHALknIOiysN2TkL02MMOSgpxJO6sHAM2zqOXY1vbh4OKjoNrIwMUNBsJJP6oGAIQJAb'+
					'EIAP///////yH5BAEAAB8ALAAAAAAhABQAAAX/4CeOZGmeaKqubOtWGBVpdG3fEVWp2KxlAGAwQwQMiUg'+
					'NBtX7ZTrQDgOBmECn1WgnI6GYKrPnoqDtIMrnDsQQ1exIlJ85wNYyyveOwBPdREoRTwgDFgoPHQQGBgQd'+
					'CRcODwsPBhd8HRsbEiVyHQsXFQMBCgQPHqEeDgEXFgEWfAiYCyVEUXQdAwUCBB4ColAeCR0Fr5gcJRJat'+
					'gkeFg68th28t8QcsiQaUGe2BocDz3UKAY18ExscmiQRl1Z7DxcKDoUB0MsGCh6w5n8kFRKYEwgKJJhQgE'+
					'CDAQMaQIgygMACAcUkvIGTAZPFfwjuYLxDxdw5LycoSOBAsiSHAyhLFqI8YLKLCjAjTcqcKSHCRBc4c+o'+
					'0EQIAOw==';
				userLevelImg.parentNode.insertBefore(tardTag, userLevelImg.nextSibling);
			}
		}
	}
	var allImages = document.getElementsByTagName('img');
	for (i=0; i < allImages.length; i++) 
		if(allImages[i].width > maxImgSize) 
			allImages[i].width = maxImgSize;
}