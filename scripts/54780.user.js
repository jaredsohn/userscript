// ==UserScript==
// @name           jobnet filter
// @namespace      http://userscripts.org/users/101825
// @description    filter posts from jobnet.co.il
// @include        http://jobnet.co.il/PositionResults.aspx?*
// @include        http://www.jobnet.co.il/PositionResults.aspx?*
// ==/UserScript==

blackList = new Array(
	"someone@somewhere.com", 
	"another@email.co.il", 
	"yet@another.email.com"
);

function emailIsFiltered(email) {
	var i;
	
	email = email.toLowerCase();
	for (i = 0; i < blackList.length; i++)
		if (email == blackList[i].toLowerCase())
			return true;
	
	return false;
}

function listPosts() {
	var i, expr, xpathResult, result;
	
	expr = "//td[@class='font2a']/table/tbody/tr[td/table[@width='600']]";
	xpathResult = document.evaluate(expr, document, null, 
					XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	
	result = new Array();
	for (i = 0; i < xpathResult.snapshotLength; i++)
		result.push(xpathResult.snapshotItem(i));
	
	return result;
}

function post_getEmail(post) {
	var expr, xpathResult, aNode;
	
	expr = ".//a[@id = 'linkEmail']";
	xpathResult = document.evaluate(expr, post, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	if (xpathResult.snapshotLength == 0)
		return null;
	
	aNode = xpathResult.snapshotItem(0);
	return aNode.innerHTML;
}

function post_filter(post) {
	email = post_getEmail(post);
	if (email && emailIsFiltered(email))
		post.parentNode.removeChild(post);
}

posts = listPosts();
for (i = 0; i < posts.length; i++)
	post_filter(posts[i]);
