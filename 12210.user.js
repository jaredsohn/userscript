// ==UserScript==
// @name           TexAgs GM - Thread Highlighter
// @namespace      Texags
// @description    Highlights threads posted, replied to, or posted by a user on your watch list
// @include        http://www.texags.com/main/*
// @include        http://texags.com/main/*
// @include		 http://www.mybcs.com/*
// @include		 http://mybcs.com/*
// ==/UserScript==


/*********  USER DEFINED VARIABLES  ***********/

var userWatchList = Array('WatchOle', 'Liucci', 'JeremyK', 'MWR Admin', 'ooshwa', 'myBCS.com', 'thisladyisacop', 'Mr. Traffic');

var sipList = Array('2005Horn', '33', '91 Horn', '94 Texas EX', 'A Corda', 'AkersN', 'AlexNguyen', 'austx', 'Authentic Horn', 'awinlonghorn', 'bassale47', 
'BleedOrange10', 'booleyHorn', 'BoyNamedSue', 'Chest Rockwell', 'Devinp23', 'Dr Drunkenstein', 'Fast Times', 'FtWorthHorn', 'FWHORN', 'FXST', 
'gnglonghorn', 'GoHorns94', 'h264', 'Hellraiser97', 'highwayman', 'horn1', 'Hornblood', 'Hornographer', 'Horns11', 'hookem3', 'huisache', 'IgnatiusReilly', 
'IIIHorn', 'INIGO MONTOYA', 'Jakovasaur', 'jefford22', 'jkavvytx', 'JTaylor', 'KidTwist', 'l-horndev', 'landman1', 'Lifeguard NO.2', 'Lhorn01', 
'locohorn', 'LonghornDub', 'LonghornsNo1', 'Lost Saucer', 'MidnightBevo', 'Mister Randy Watson', 'Mr. Drummond', 'MustangOrange', 'nbbob', 'NerveEndings', 
'Nonhostile Sip', 'northernhorn', 'Norwegian Wood', 'ObjectiveUTLAW91', 'onehorn', 'Pato', 'Professor Terguson', 'realhorn', 'rscharnell', 'saltwater', 
'Samsill98', 'Skihorn', 'sodiumacetate', 'squid', 'TEXAS FIGHT!', 'Tex Pete', 'Texas velvet maestro', 'Texas_Fan', 'Texas75', 'TexasBorn', 'TexasEx1994', 
'The Lat Man', 'Theo', 'THorns90', 'toucan82', 'UniHorn', 'UT2005', 'UTGrad02', 'UTLawHorn', 'W.E. Henley', 'West Horn', 'Winston Wolfe');

var tardList = Array('0raider0', 'Big 12-0', 'BillJack', 'Cowtown Raider', 'Cowtown Red', 'DrKennethNoisewater', 'Hong Kong Paul', 'PaleHorse', 'raiderjay', 
'rockylarues', 'shiner raider', 'TechDiver', 'Techsan_02', 'TechTard', 'TENBOLLS', 'Texas Tech Universe', 'ttechguy', 'Zorro');

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

var testReply = /postreply/;
var testPost = /posttopic/;
var testTopic = /forum.topic/;
var testBCSTopic = /Topics/;

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

else if (testTopic.test(window.location.href)) {
	var theFooter = getElementsByClass("footer2");
	var myUserName = theFooter[1].childNodes[1].innerHTML;
	var topics = getElementsByClass("topics", null, "a");
	var findTopicID = /topic_id=(\d+)/;
	var thisTopic, topicID, lastReplyCount, currentReplyCount;
	for (i=0; i<topics.length;i++) {
		thisTopic = topics[i];
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
