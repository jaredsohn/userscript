// ==UserScript==
// @name           TexAgs GM - Sip/Tard Tags
// @namespace      Texags
// @description    Adds sip and tard tags
// @include        http://www.texags.com/main/forum.reply.*
// @include        http://texags.com/main/forum.reply.*
// @include        http://www.mybcs.com/Content/Forums/Replies.*
// @include        http://mybcs.com/Content/Forums/Replies.*
// ==/UserScript==


var sipList = Array('2005Horn', '33', '91 Horn', '94 Texas EX', 'A Corda', 'AkersN', 'AlexNguyen', 'austx', 'Authentic Horn', 'awinlonghorn', 'bassale47', 
'BleedOrange10', 'booleyHorn', 'BoyNamedSue', 'Chest Rockwell', 'Devinp23', 'Dr Drunkenstein', 'Fast Times', 'FtWorthHorn', 'Full Tilt', 'FWHORN', 'FXST', 
'gnglonghorn', 'GoHorns94', 'h264', 'Hellraiser97', 'highwayman', 'horn1', 'Hornblood', 'Hornographer', 'Horns11', 'hookem3', 'huisache', 'IgnatiusReilly', 
'IIIHorn', 'INIGO MONTOYA', 'Jakovasaur', 'jefford22', 'jkavvytx', 'JTaylor', 'KidTwist', 'l-horndev', 'landman1', 'Lifeguard NO.2', 'Lhorn01', 'LHorns3',
'locohorn', 'LonghornDub', 'LonghornsNo1', 'Lost Saucer', 'MidnightBevo', 'Mister Randy Watson', 'Mr. Drummond', 'MustangOrange', 'nbbob', 'NerveEndings', 
'Nonhostile Sip', 'northernhorn', 'Norwegian Wood', 'ObjectiveUTLAW91', 'onehorn', 'Pato', 'Professor Terguson', 'realhorn', 'rscharnell', 'saltwater', 
'Samsill98', 'Skihorn', 'sodiumacetate', 'squid', 'TEXAS FIGHT!', 'Tex Pete', 'Texas velvet maestro', 'Texas_Fan', 'Texas75', 'TexasBorn', 'TexasEx1994', 
'The Lat Man', 'Theo', 'THorns90', 'toucan82', 'UniHorn', 'UT2005', 'UTGrad02', 'UTLawHorn', 'W.E. Henley', 'West Horn', 'Winston Wolfe');

var tardList = Array('0raider0', 'Big 12-0', 'BillJack', 'BreakPoint778', 'Cowtown Raider', 'Cowtown Red', 'DrKennethNoisewater', 'Hong Kong Paul', 'leachfan', 'PaleHorse', 'raiderjay', 
'rockylarues', 'shiner raider', 'TechDiver', 'Techsan_02', 'TechTard', 'TENBOLLS', 'Texas Tech Universe', 'ttechguy', 'TTechDeck', 'TTUClint', 'Zorro');


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

var testThread = /forum.reply/;
var testBCSThread = /Replies/;

if (testThread.test(window.location.href)) {
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
}