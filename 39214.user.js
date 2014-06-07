// zzyzx.xyzzy@gmail.com
// zzyzx_xyzzy (OKCupid)
// zzyzx_xyzzy@userscripts.org
// zzyzx.xyzzy.googlepages.com/okcupidhacks
//
// ==UserScript==
// @name           OKC Mark Comments Read
// @namespace      http://zzyzx.xyzzy.googlepages.com/okcmarkread
// @description    Collapse comments made before a certain date. Provide controls to set the threshold date.
// @include        http://www.okcupid.com/relevant*comments*
// ==/UserScript==

date = GM_getValue('date',0);
//GM_log('date: ' + date);
//commentsToHide = document.evaluate(
//	"//div[contains(concat(' ', @class, ' '), ' post ')]"
//+	"[descendant::script[1]/text()["
//+	"	number(substring-before( "
//+	"		substring-after(substring-after(string(),'Date' ), '('), "
//+	"	' ')) <= number(" + GM_getValue('date', '0') + ")"
//+	"]]",
//	document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
	
var commentsToHide = new Array();
allComments = document.evaluate(
	"//div[contains(concat(' ', @class, ' '), ' post ')]",document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)

for(var i = 0; i < allComments.snapshotLength; i++) {
	var commentDate = document.evaluate(""
+			"	number(substring-before( "
+			"		substring-after(substring-after("
+			"			./p[@class='title']"
+			"		,'Date' ), '('), "
+			"	' '))",
			allComments.snapshotItem(i), null, XPathResult.STRING_TYPE, null).stringValue;
	//GM_log('comment date: ' + commentDate);
	if(commentDate <= date){
		
	 commentsToHide[commentsToHide.length]=allComments.snapshotItem(i);
	
	} 
	//var firstDate = document.evaluate("./p[@class='title']",allComments.snapshotItem(i), null, XPathResult.STRING_TYPE, null).stringValue;
			
	
}

//GM_log('found ' + commentsToHide.length + ' old comments.');

for(var i = 0; i < commentsToHide.length; i++) {
	try {		
		ignoreComment(commentsToHide[i], 'marked read');
	} catch(e) {
		GM_log('failed: ' + commentsToHide[i]);
	}
}


var commentRoot= document.evaluate(
    "//ul[@class='relevant_links']",
    document,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null
);

commentRoot.snapshotItem(0).appendChild(markReadControls());


function markReadControls() {
	markButton = e('a', {href:window.location.href}, [t('Mark all read')]);
	markButton.addEventListener('click', function (evt) {
		//find the first date... (assumed to be in the first comment;
		var firstDate = document.evaluate(""
+			"	number(substring-before( "
+			"		substring-after(substring-after("
+			"			//p[@class='title']"
+			"		,'Date' ), '('), "
+			"	' '))",
			document, null, XPathResult.STRING_TYPE, null).stringValue;
		//var firstDate = document.evaluate("//p[@class='title']",document, null, XPathResult.STRING_TYPE, null).stringValue;

		//GM_log('firstdate: ' + firstDate);
		if(firstDate > 0){			
			GM_setValue('date', firstDate);
		} 
	}, false);

	clearButton = e('a', {href:window.location.href}, [t('Mark all unread')]);
	clearButton.addEventListener('click', function (evt) {
		//GM_log('0');
		GM_setValue('date', '0');
	}, false);

	return e('div', {class:'text', align:'center'}, [
		markButton,
		t(' | '),
		clearButton,
	]);
}

				


function ignoreComment(comment, reason) {
	//this is duplicated out of the killfile script...

	//grab the username for curiosity's sake
	var username = document.evaluate(
		"string(descendant::a[contains(@href, '/profile')])", 
		comment, null, XPathResult.STRING_TYPE, null).stringValue;
	
	//grab the date script(clone it)
	var dateScript = document.evaluate(
		"descendant::script/text()[contains(string(), 'Date')]/ancestor::span[1]", 
		comment, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.cloneNode(true);
	
	//and grab the post link
	var postLink = document.evaluate(
		"descendant::p[@class='title']//a",
		comment, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null
	).singleNodeValue.cloneNode(true);	
	
	var showLink = e('a', {href:'javascript:void(0)'}, [t('show')]);
	
	var hiddenCommentPlaceholder = e('div', {class:'post clearfix collapsed'}, [
		e('a', {href:('/profile?u=' + username)}, [t(username)]),
		t(' commented on '),
		postLink,
		t(' - '),
		dateScript,
		t(' (' + reason + ') ('),
		showLink, 
		t(')'),
	]);
	showLink.addEventListener('click', function(evt) {
		hiddenCommentPlaceholder.parentNode.replaceChild(comment, hiddenCommentPlaceholder);
	}, false);

	comment.parentNode.replaceChild(hiddenCommentPlaceholder, comment);
}

function e(name, attribs, children) {
	//make an element with some attributes and children.
	var r = document.createElement(name);
	for (var i in attribs) {
		r.setAttribute(i, attribs[i]);
	}
	for (var i = 0; i < children.length; i++) {
		r.appendChild(children[i]);
	} 
	return r;
}

function t(text) {
	//make a text node.
	return document.createTextNode(text);
}
