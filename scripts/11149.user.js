// ==UserScript==....................................
// @name           TexAgs GreaseMonkey - Classic
// @namespace      texags
// @description    Version 1.02
// @include        http://texags.com/main/forum.*
// @include        http://www.texags.com/main/forum.*
// ==/UserScript==

/*********  USER DEFINED VARIABLES  ***********/

var userWatchList = Array('WatchOle', 'Liucci', 'JeremyK', 'MWR Admin', 'ooshwa');

var sipList = Array('2005Horn', '33', '91 Horn', '94 Texas EX', 'A Corda', 'AkersN', 'AlexNguyen', 'austx', 'Authentic Horn', 'awinlonghorn', 'bassale47', 
'BleedOrange10', 'booleyHorn', 'BoyNamedSue', 'Chest Rockwell', 'Devinp23', 'Dr Drunkenstein', 'Fast Times', 'FtWorthHorn', 'FWHORN', 'FXST', 
'gnglonghorn', 'GoHorns94', 'h264', 'Hellraiser97', 'highwayman', 'horn1', 'Hornblood', 'Hornographer', 'Horns11', 'hookem3', 'huisache', 'IgnatiusReilly', 
'IIIHorn', 'INIGO MONTOYA', 'Jakovasaur', 'jefford22', 'jkavvytx', 'JTaylor', 'KidTwist', 'l-horndev', 'landman1', 'Lifeguard NO.2', 'Lhorn01', 
'locohorn', 'LonghornDub', 'LonghornsNo1', 'Lost Saucer', 'MidnightBevo', 'Mister Randy Watson', 'Mr. Drummond', 'MustangOrange', 'nbbob', 'NerveEndings', 
'Nonhostile Sip', 'northernhorn', 'Norwegian Wood', 'ObjectiveUTLAW91', 'onehorn', 'Pato', 'Professor Terguson', 'realhorn', 'rscharnell', 'saltwater', 'Samsill98', 'Skihorn', 'sodiumacetate', 'squid', 
'TEXAS FIGHT!', 'Tex Pete', 'Texas velvet maestro', 'Texas_Fan', 'Texas75', 'TexasBorn', 'TexasEx1994', 'TexasEx93', 'texashornfan', 
'The Lat Man', 'Theo', 'THorns90', 'toucan82', 'UniHorn', 'UT2005', 'UTGrad02', 'UTLawHorn', 'W.E. Henley', 'West Horn', 'Winston Wolfe');

var tardList = Array('0raider0', 'Big 12-0', 'BillJack', 'Cowtown Raider', 'Cowtown Red', 'DrKennethNoisewater', 'Hong Kong Paul', 'PaleHorse', 'raiderjay', 
'rockylarues', 'shiner raider', 'TechDiver', 'Techsan_02', 'TechTard', 'TENBOLLS', 'Texas Tech Universe', 'ttechguy', 'Zorro');

var showAds = true;
var maxImgSize = 1000;
var sigChecked = false;

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
var testThread = /forum.reply/;
var replyBool = false, postBool = false, topicBool = false, threadBool = false;
if(testReply.test(window.location.href)) replyBool = true;
else if(testPost.test(window.location.href)) postBool = true;
else if(testTopic.test(window.location.href)) topicBool = true;
else if(testThread.test(window.location.href)) threadBool = true;


if (topicBool) {
	var theFooter = getElementsByClass("footer2");
	var myUserName = theFooter[1].childNodes[1].innerHTML;
	var lastReplyCount, currentReplyCount;
	var topics = getElementsByClass("topics", null, "a");
	for (i=0; i<topics.length;i++) {
		lastReplyCount = GM_getValue(topics[i].href, 'none');
		if (lastReplyCount == 'none') {
			if (topics[i].parentNode.parentNode.childNodes[3].innerHTML == myUserName) {
				for(j=0;j<topics[i].parentNode.parentNode.childNodes.length; j++){
					topics[i].parentNode.parentNode.childNodes[j].style.background = postedHighlightColor;
					topics[i].parentNode.parentNode.childNodes[j].style.fontWeight = 'bold';
				}
				GM_setValue(topics[i].href, topics[i].parentNode.parentNode.childNodes[4].innerHTML);
			}
			for(j=0; j<userWatchList.length; j++){
				if (userWatchList[j].toUpperCase() == topics[i].parentNode.parentNode.childNodes[3].innerHTML.toUpperCase()){
					for(k=0;k<topics[i].parentNode.parentNode.childNodes.length; k++){
						topics[i].parentNode.parentNode.childNodes[k].style.background = watchListHighlightColor;
						topics[i].parentNode.parentNode.childNodes[k].style.fontWeight = 'bold';
					}
				}
			}
		}
		else {
			var bgColor;
			if (topics[i].parentNode.parentNode.childNodes[3].innerHTML == myUserName) bgColor = postedHighlightColor;
			else bgColor = repliedHighlightColor;
			for(j=0;j<topics[i].parentNode.parentNode.childNodes.length; j++){
				topics[i].parentNode.parentNode.childNodes[j].style.background = bgColor;
				topics[i].parentNode.parentNode.childNodes[j].style.fontWeight = 'bold';
			}
			currentReplyCount = topics[i].parentNode.parentNode.childNodes[4].innerHTML;
			if (lastReplyCount == 'null') {GM_setValue(topics[i].href,currentReplyCount);}
			else if (currentReplyCount != lastReplyCount) {
				topics[i].parentNode.parentNode.childNodes[4].innerHTML = lastReplyCount +" <font color='red'>+" + (currentReplyCount-lastReplyCount) + "</font>";
				GM_setValue(topics[i].href,currentReplyCount);
			}
		}
	}
}
else if (threadBool) {
	var allAnchors, thisAnchor, userLevelImg;
	allAnchors = document.evaluate('//a[@name]',document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allAnchors.snapshotLength; i++) {
		thisAnchor = allAnchors.snapshotItem(i);
		userLevelImg = thisAnchor.parentNode.nextSibling.childNodes[1].childNodes[0];	
		for (var j = 0; j < sipList.length; j++) {
			if (sipList[j].toUpperCase() == thisAnchor.childNodes[0].innerHTML.toUpperCase()) {
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
			if (tardList[k].toUpperCase() == thisAnchor.childNodes[0].innerHTML.toUpperCase()) {
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
}
else if (replyBool || postBool) {
	var allInputs;
	allInputs = document.evaluate("//input[@type='checkbox']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
	for (var i = 0; i < allInputs.snapshotLength; i++)
		allInputs.snapshotItem(i).checked = sigChecked;
	if (replyBool) {
		var url = window.location.href;
		var findForumID = /forum_id=(\d+)/, findTopicID = /&topic_id=(\d+)/;
		url.match(findForumID);
		var forumID = RegExp.$1;
		url.match(findTopicID);
		var topicID = RegExp.$1;
		var constructURL = 'http://www.texags.com/main/forum.reply.asp?topic_id=' + topicID + '&forum_id=' + forumID;
		var submitSpan = getElementsByClass("inlinewordbuttons",null,"span");
		submitSpan[0].childNodes[0].childNodes[0].addEventListener('click', function(event) {
			if (GM_getValue(constructURL, 'none') == 'none')
				GM_setValue(constructURL, 'null');
			}, false);
	}
}

if (showAds) {}
else {
var theAd = getElementsByClass("SportsWarTopicAd",null,"span");
if (theAd.length>0){
	theAd[0].parentNode.removeChild(theAd[0]);
}
var theOtherAd = getElementsByClass("smallboxtitle",null,"div");
if (theOtherAd.length>0){
	for (i=0; i<theOtherAd.length; i++){
		if (theOtherAd[i].childNodes[0].innerHTML == "TexAgs Sponsor" || theOtherAd[i].childNodes[0].innerHTML == "Aggieland Sponsor"){
			var AdTD = theOtherAd[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
			AdTD.parentNode.removeChild(AdTD);
		}
	}
}
}

