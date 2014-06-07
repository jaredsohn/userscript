// ==UserScript==
// @name          CouchSurfing Mods
// @namespace     http://www.callum-macdonald.com/code/
// @description   Modify CouchSurfing.org a little...
// @include       http://*couchsurfing.org/group_read.html*
// @author        Callum Macdonald
// @copyright     2009 by Callum Macdonald
// @license       GPL v3+
// @version       0.10
// @lastupdated   2009-11-27
// ==/UserScript==

//console.log('booooooya');

function addClass(element, value) {
	if(!element.className) {
		element.className = value;
	} else {
		newClassName = element.className;
		newClassName+= " ";
		newClassName+= value;
		element.className = newClassName;
	}
}

function doXpath(query) {
	var result = document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	return result;
} // doXpath()

function insertAfter(new_node, existing_node) {
	// if the existing node has a following sibling, insert the current
	// node before it. otherwise appending it to the parent node
	// will correctly place it just after the existing node.
	if (existing_node.nextSibling) {
		// there is a next sibling. insert before it using the mutual
		// parent's insertBefore() method.
		existing_node.parentNode.insertBefore(new_node, existing_node.nextSibling);
	} else {
		// there is no next sibling. append to the end of the parent's
		// node list.
		existing_node.parentNode.appendChild(new_node);
	}
} // insertAfter()

function showLinks() {
	var showLinks = document.createElement('div');
	showLinks.appendChild(document.createTextNode('show all'));
	return showLinks;
} // showLinks()

function createNextLink(newPostCount) {
	var nextLinkP = document.createElement('p');
	var nextLink = document.createElement('a');
	nextLink.href='#new_post' + (newPostCount + 1);
	nextLink.appendChild(document.createTextNode('Jump to next new post'));
	nextLinkP.appendChild(nextLink);
	return nextLinkP;
} // createNextLink()

function createNewPostAnchor(newPostCount) {
	var newAnchor = document.createElement('a');
	newAnchor.setAttribute('name', 'new_post' + newPostCount);
	newAnchor.setAttribute('id', 'new_post' + newPostCount);
	return newAnchor;
} // createNewPostAnchor()

// Set the main container page width to 100% instead of 800px
var tableMainContainerResult = doXpath('//table[@class="main-container"]');
var tableMainContainer = tableMainContainerResult.snapshotItem(0);
tableMainContainer.width = '100%';

// Add our custom styles
var css = <><![CDATA[
div.description { width: 600px; }
div.post_new div.description { font-size: 1.4em !important; }
div.thread, div.post { border-width: 1px 1px 1px 1px !important; width: 630px; background: white none repeat scroll 0 0; }
div.post_new { background: pink none repeat scroll 0 0; }
]]></>.toString();

GM_addStyle(css);

/**
 * Posts are a div.post with multiple child divs. The new post have a child
 * div.meta_new while previously seen posts have one child div.meta.
 * If the whole thread is new, there are no div.meta_new at all.
 */

// Set up this counter outside the loop so it's human readable (starts at 1)
var newPostCount = 0;

// Try to get all the div.post items that have div.meta children
var newPosts = doXpath('//div[@class="meta_new"]/..');

// If there is at least 1 new post, hide the other posts
if (newPosts.snapshotLength > 0) {
	// Add the post_new class to the new posts
	var thisPost;
	for (var i = 0; i < newPosts.snapshotLength; i++) {
		newPostCount++; // Increment this counter so it starts from 1 (human readable)
		thisPost = newPosts.snapshotItem(i);
		addClass(thisPost, 'post_new');
		// Add a new_postX anchor
		var newAnchor = createNewPostAnchor(newPostCount);
		insertAfter(newAnchor, thisPost.firstChild.nextSibling);
		// Now add a link to the next new post anchor
		var divDescription =  thisPost.firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling;
		divDescription.appendChild(createNextLink(newPostCount));
	}

	// Add the post_old class to the other posts
	var oldPosts = doXpath('//div[@class="meta"]/..[@class="post"]');
	for (var i = 0; i < oldPosts.snapshotLength; i++) {
		thisPost = oldPosts.snapshotItem(i);
		addClass(thisPost, 'post_old');
	}

	// Add a final new_postX link at the bottom of the page
	var newAnchor = createNewPostAnchor(newPostCount + 1);
	document.body.appendChild(newAnchor);

	// Let's add some stats to the top of the page
	var h2LocationResult = doXpath('/html/body/div[2]/div/table/tbody/tr/td/h2');
	var h2Location = h2LocationResult.snapshotItem(0);
	var stats = document.createElement('div');
	stats.appendChild(document.createTextNode('New posts: ' + newPostCount + ' '));
	var link = document.createElement('a');
	link.href='#new_post1';
	link.appendChild(document.createTextNode('Jump to first new post'));
	stats.appendChild(link);
	insertAfter(stats, h2Location);

}
