// ==UserScript==
// @name           Shelfari - Discussion collapse
// @namespace      http://mathiasbaert.be/userscripts/shelfari.com/discussioncollapse
// @description    Makes posts in discussions collapsable, Adds onclickbehaviour to the icons on top: unread (show only unread), posts (show all), friends (show only from friends)
// @include        http://www.shelfari.com/clubdiscussiondetails*
// @include        http://www.shelfari.com/bookdiscussiondetails*
// ==/UserScript==

// startpoint of this script
prepareDocument();
setupButtons();
collapseAll();

// functions
	/**
	 * Changes the document to toggling posts
	 */
function prepareDocument(){
	var posts = getPosts();
	for ( var i=0; i<posts.length; i++ ) {
		prepareResponse(posts[i]);
	}
}
	/**
	 * @return array of HTMLElements
	 */
function getPosts(){
	return getElementsByXPath("//td[@class='opinionResponseList']");
}
	/**
	 * Expects a td[@class='opinionResponseList'] and changes its html to be able to toggle it
	 * @param HTMLElement
	 */
function prepareResponse(element){
	var responseBody = getElementByXPath("div[@class='opinionResponseBody']", element);

	var head = document.createElement('div');
	head.setAttribute('class', 'opinionResponseBodyHead');
	head.appendChild(makeImageZoomIn());
	head.appendChild(makeImageZoomOut());
	addClickListener(head.childNodes[0], expandPost);
	addClickListener(head.childNodes[1], collapsePost);
	hideElement(head.childNodes[0]);

	var body = document.createElement('div');
	body.setAttribute('class', 'opinionResponseBodyBody');

	var breakFound = false;
	while ( responseBody.childNodes.length ) {
		if ( !breakFound ) {
			breakFound = responseBody.childNodes[0].tagName == 'DIV';
			head.appendChild(responseBody.childNodes[0]);
		} else {
			body.appendChild(responseBody.childNodes[0]);
		}
	}

	responseBody.appendChild(head);
	responseBody.appendChild(body);
}
	/**
	 * @param HTMLElement
	 * @param function
	 */
function addClickListener(element, callback){
	element.addEventListener(
		'click',
		function(event) {
			callback(event.target);
			event.stopPropagation();
			event.preventDefault();
		},
		true
	);
}
	/**
	 * @param HTMLElement a td[@class='opinionResponseList'] or one of its children
	 */
function collapsePost(element){
	var element = findPostUp(element);

	hideElement(findPostReplyImage(element));

	element.style.paddingTop = '2px';
	element.style.paddingBottom = '2px';

	var userImage = findPostUserImage(element);
	userImage.style.width = "36px";
	userImage.style.height = "36px";

	var imageContainer = findPostImageContainer(element);
	var bodyContainer = findPostBodyContainer(element);

	imageContainer.style.minHeight = '36px';
	bodyContainer.style.minHeight = '0';

	imageContainer.style.width = '57px';

	bodyContainer.style.height = '37px';

	var postBody = findPostBody(element);
	postBody.style.height = '16px';
	postBody.style.overflow = 'hidden';

	var postHead = findPostHead(element);
	postHead.style.height = '19px';
	postHead.style.overflow = 'hidden';

	hideElement(findPostCollapseImage(element));
	showElement(findPostExpandImage(element));
}
	/**
	 * @param HTMLElement a td[@class='opinionResponseList'] or one of its children
	 */
function expandPost(element){
	var element = findPostUp(element);

	showElement(findPostReplyImage(element));

//	element.style.paddingTop = '';
//	element.style.paddingBottom = '';

	var userImage = findPostUserImage(element);
	userImage.style.width = "50px";
	userImage.style.height = "50px";

	var imageContainer = findPostImageContainer(element);
	var bodyContainer = findPostBodyContainer(element);

	imageContainer.style.minHeight = '';
	bodyContainer.style.minHeight = '';

	imageContainer.style.width = '';

	bodyContainer.style.height = '';

	var postBody = findPostBody(element);
	postBody.style.height = '';
	postBody.style.overflow = '';

	var postHead = findPostHead(element);
	postHead.style.height = '';
	postHead.style.overflow = '';

	hideElement(findPostExpandImage(element));
	showElement(findPostCollapseImage(element));
}
	/**
	 * @param function
	 */
function collapseAllUnless(test){
	var posts = getPosts();
	for ( i=0; i<posts.length; i++ ) {
		if ( !test(posts[i]) ) {
			collapsePost(posts[i]);
		} else {
			expandPost(posts[i]);
		}
	}
}
function collapseAll(){
	collapseAllUnless(function(){return false;});
}
function expandAll(){
	collapseAllUnless(function(){return true;});
}
function showNew(){
	collapseAllUnless(function(element){return getElementByXPath("descendant::img[@src='/images/discuss-new.png']", element);});
}
function showFriends(){
	collapseAllUnless(function(element){return getElementByXPath("descendant::img[@src='/images/discuss-friend-posted.png']", element);});
}
function setupButtons(){
	var newPosts, allPosts, friendsPosts;
	if ( newPosts = getElementByXPath("//div[@class='unreadThreadCount']") ) {
		addClickListener(wrapElementInLink(newPosts), showNew);
	}
	if ( allPosts = getElementByXPath("//div[@class='discussionThreadCount']") ) {
		addClickListener(wrapElementInLink(allPosts), expandAll);
	}
	if ( friendsPosts = getElementByXPath("//div[@id='ctl00_ContentPlaceHolder1_FriendPostIndicator']") ){
		addClickListener(wrapElementInLink(friendsPosts), showFriends);
	}
}
	/**
	 * @param HTMLElement a td[@class='opinionResponseList'] or one of its children
	 * @return HTMLElement
	 */
function findPostUp(element){
	return getElementByXPath("ancestor-or-self::td[@class='opinionResponseList']", element);
}
	/**
	 * @param HTMLElement a td[@class='opinionResponseList']
	 * @return HTMLElement
	 */
function findPostImageContainer(element){
	return getElementByXPath("descendant::div[@class='opinionResponseImage']", element);
}
	/**
	 * @param HTMLElement a td[@class='opinionResponseList']
	 * @return HTMLElement
	 */
function findPostBodyContainer(element){
	return getElementByXPath("descendant::div[@class='opinionResponseBody']", element);
}
	/**
	 * @param HTMLElement a td[@class='opinionResponseList']
	 * @return HTMLElement
	 */
function findPostHead(element){
	return getElementByXPath("descendant::div[@class='opinionResponseBodyHead']", element);
}
	/**
	 * @param HTMLElement a td[@class='opinionResponseList']
	 * @return HTMLElement
	 */
function findPostBody(element){
	return getElementByXPath("descendant::div[@class='opinionResponseBodyBody']", element);
}
	/**
	 * @param HTMLElement a td[@class='opinionResponseList']
	 * @return HTMLElement
	 */
function findPostUserImage(element){
	return getElementByXPath("descendant::div[@class='opinionResponseImage']//img", element);
}
	/**
	 * @param HTMLElement a td[@class='opinionResponseList']
	 * @return HTMLElement
	 */
function findPostCollapseImage(element){
	return getElementByXPath("descendant::img[@class='zoomout']", element);
}
	/**
	 * @param HTMLElement a td[@class='opinionResponseList']
	 * @return HTMLElement
	 */
function findPostExpandImage(element){
	return getElementByXPath("descendant::img[@class='zoomin']", element);
}
	/**
	 * @param HTMLElement a td[@class='opinionResponseList']
	 * @return HTMLElement
	 */
function findPostReplyImage(element){
	return getElementByXPath("descendant::input[@src='images/discuss-reply.png']", element);
}
	/**
	 * @param HTMLElement
	 */
function showElement(element){
	if ( element) {
		element.style.display='';
	}
}
	/**
	 * @param HTMLElement
	 */
function hideElement(element){
	if ( element) {
		element.style.display='none';
	}
}
	/**
	 * @return HTMLElement
	 */
function makeImageZoomIn(){
	var img = document.createElement('img');
	img.setAttribute('class', 'zoomin');
	img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAI6SURBVDjLpZJbaJJxGMaHgdcFXURdBLtZrGitiFh0uhjRVRTVWI1as7mQakhjyyEkRAcaHSCrj0xrWGuuoVsr25qzfeYObh6yJJdzavoZs3Sy8PhJ8vR9EoHkotXFA/+b3+//vC9vEYCi/8mvh8H7nTM8kyF0LpoacCazLxzxbM/bb1S3OUo8GQtz/iggGfi1O0NaAzS8kQwCURqBORrTX9LQf5jHQ3KWlA1RnAUFeneGsATSoKIZOGdTsAWSMPuTsFNJeL7SEOoF4GtrUKuuShUUvJpKUd4wnYMtDDj5KQGTN4FRTyInOvH8MDonL6BKuRcFBey8fqYyC0/4Ehhn4JGZOBp1AtT1VkOkrYfMKIKgsxq7b+zErssV0TyBxjaf9UVomBh4jPnVyMCG6ThbGfKRVtwebsK1wdO4+JIPce8xbBGXI0+gMkWoqZ/137jjIBlY/zEGnqoO+2R7wGvfj/N9x3FAWonNojKUCUtTeQKlMUT02+fgCqVzs7OwzhnLyd4HU2xlCLsOYlPz+sI7uK8Pcu4O+EnNRAhWfwKOzym8Y2LyxCAf9GGHZDvKm9Zha2NptudcRUnBQ7rZ5+G0aVzEpS4nJelwZMXt9myL3Bpskyq9FmUzQuZu2B63QCXcEH50ak3Jb4KF0i+p5D5r3aYeJeoRNCgwfq8BCv7q8F8L2Dw9u5HbcWateuj6IXi0V0HUrsCiBGweNBRzZbxVasXJYkhrll1ZtIDNnaPLl9w6snRlwSX+a34AgPPwSZzC+6wAAAAASUVORK5CYII=');
	return img;
}
	/**
	 * @return HTMLElement
	 */
function makeImageZoomOut(){
	var img = document.createElement('img');
	img.setAttribute('class', 'zoomout');
	img.setAttribute('src', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAIjSURBVDjLpZJvSBNhHMdlwV4n9CIsCAxaEEQEvSh6ExQEva1eFBFY2YuQ/pERUUZUkiihy47U9WdlrWSzoqW1rW6ZbrY/zoazOXfX7hZe3jZm2+12h+Pb3YpgtUXWiw88bz6f5/d7eKoAVP0PPw9Oal7zZlombGGJHQzlCs+D2UL/2Bzb50kRD0Z4zR8DpCK/jsikj5FAJWQwKQlMUsLUlzwcE2ncJmfILjurqRhwRGTCy+TBpmSEZkT4mRw8sRwCbA7RWQnWsQT0L2iiYuDlpMhSvFSUvYr4/pMANyVgOCp8DzECWp9E2IoBdd+YMrIqj9ICXIr8bjoL6cJ5zB9tgHygDuLO3chu2465DZuQWrU2VRKw+NMFOiHBrcgjyq1Diuycyhblrw87kb7bjmR3G3h9M7jWi0jUrERJwOROsJM/xn8byYJUZMfHDDLHT/56c1GerV4ulgSMQxwxEEgizOWLu6uyLZQpxj7ERRhsNDquG0T7pR26sm/Q7YhrbgzGSMsoB19MQPCziHEFdzSDnlc02k0uTFiuwHpuC99/eqOu7Ee69iyqabGEicuPQmxTb7Bw9k6g0Njji7fojZTXeAqcpw/++40wHVvH3zuyWvdboBIDTVu1T89sNg8TBxF3GuC6WQ/DoRX8XwdUHp9Yr+1tWGO2t+1C1HoVxP6lWFBA5VZ9rbarbpnZcLgW+r3VzQsOqHTuW7KoY8/imrKP+K98A227/eEeskW1AAAAAElFTkSuQmCC');
	return img;
}
	/**
	 * @param HTMLElement
	 * @param string
	 * @return HTMLElement link
	 */
function wrapElementInLink(element, href){
	var link = document.createElement('a');
	link.setAttribute('href', href||'#');
	element.parentNode.insertBefore(link, element);
	link.appendChild(element);
	return link;
}
	/**
	 * @param string
	 * @param string
	 * @return array
	 */
function getElementsByXPath(expression, element){
	var result;
	var elements = [];
	result = document.evaluate(
		expression,
		(element || document),
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for ( var i = 0; i < result.snapshotLength; i++ ) {
		elements.push(result.snapshotItem(i));
	}
	return elements;
}
	/**
	 * @param string
	 * @param HTMLElement optional
	 * @return HTMLElement or false
	 */
function getElementByXPath(expression, element){
	var result;
	if ( result = getElementsByXPath(expression, element) ) {
		return result[0];
	}
	return false;
}