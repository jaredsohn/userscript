// ==UserScript==
// @name           TexAgs GreaseMonkey
// @namespace      texags
// @description    just a test to see what all I can do...
// @include        http://texags.com/main/forum.*
// @include        http://www.texags.com/main/forum.*
// ==/UserScript==
var watchList = Array();


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var elsLen = els.length;
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}
var theFooter = getElementsByClass("footer2");
var myUserName = theFooter[1].childNodes[1].innerHTML
if (myUserName == null){
	
} else {
	var theTDs = getElementsByClass("smallstandard",null,"td");
	
	//alert (theTDs.length);
	for (i=0; i<theTDs.length; i++){
		if (myUserName == theTDs[i].innerHTML){
			for(j=0;j<theTDs[i].parentNode.childNodes.length; j++){
				theTDs[i].parentNode.childNodes[j].style.background = '#ddffdd';
				theTDs[i].parentNode.childNodes[j].style.fontWeight = 'bold';
				if (j==2){
					var topicURL = theTDs[i].parentNode.childNodes[j].childNodes[0].href;
				}
				if (j==4){
					var lastReplyCount = GM_getValue(topicURL,'noop');
					var currentReplyCount = theTDs[i].parentNode.childNodes[j].innerHTML;
					if (lastReplyCount=='noop'){
						GM_setValue(topicURL,currentReplyCount);
					} else if (currentReplyCount > lastReplyCount) {					
						theTDs[i].parentNode.childNodes[j].innerHTML += " <font color='red'>+"+ (currentReplyCount-lastReplyCount) +"</font>";
						GM_setValue(topicURL,currentReplyCount);
					}
				}
			}

		} else {
			for(q=0; q<watchList.length; q++){
				if (watchList[q] == theTDs[i].innerHTML){
					for(j=0;j<theTDs[i].parentNode.childNodes.length; j++){
						theTDs[i].parentNode.childNodes[j].style.background = '#ffdddd';
						theTDs[i].parentNode.childNodes[j].style.fontWeight = 'bold';
					}
				}
			}
		}
	}
}

var theAd = getElementsByClass("SportsWarTopicAd",null,"span");
if (theAd.length>0){
	theAd[0].innerHTML = '';
}
var theOtherAd = getElementsByClass("smallboxtitle",null,"div");
if (theOtherAd.length>0){
	for (i=0; i<theOtherAd.length; i++){
		if (theOtherAd[i].childNodes[0].innerHTML == "TexAgs Sponsor"){
			theOtherAd[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = 'none';
			
		}
	}
}
