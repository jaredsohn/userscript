// ==UserScript==
// @name           RB Forum Filter
// @namespace      ratebeer.com
// @description    Removes posts and replies by specified users
// @include        http://www.ratebeer.com/forums*
// @include        http://ratebeer.com/forums*
// @author         3fourths
// ==/UserScript==

var IgnoreName = new Array();

// Change and add your own usernames to ignore.
// Be sure to leave off the comma after the last element.
// 
// For example:  IgnoreName = [ 'UserName1', 'UserName2', 'UserName3' ]

IgnoreName =[
'Tibeerious'
];

// loop through names

for (i = 0; i < IgnoreName.length; i++) {
	// remove replies in topics
	ForumReplies = document.evaluate('//tr/td/img[@src="http://res.cloudinary.com/ratebeer/image/upload/w_50,c_limit,q_80,d_user_def.gif/user_' + IgnoreName[i] + '.jpg"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (j = 0; j < ForumReplies.snapshotLength; j++) {
		(foo = ForumReplies.snapshotItem(j).parentNode.parentNode).parentNode.removeChild(foo);
	}

	// remove threads started
	ForumTopics = document.evaluate('//tr/td/a[@title="View ' + IgnoreName[i] + '\'s Profile"]',document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null)
	for (j = 0; j < ForumTopics.snapshotLength; j++) {
		(foo = ForumTopics.snapshotItem(j).parentNode.parentNode).parentNode.removeChild(foo)
	}

}



