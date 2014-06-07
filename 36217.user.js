// ==UserScript==
// @name           Forumfall Dumb Motherfucker Ignorer
// @namespace      forums.darkfallonline.com
// @description    Ignores dumb motherfuckers
// @include        http://forums.darkfallonline.com/showthread.php?*
// ==/UserScript==
var IGNORED_KEY = 'ignored_users_key';
var IGNORED_HTML = '<span style="color:red; font-size: 3em">FUCKING RETARD.</span>';

function init() {
	var userLinks = document.evaluate(
		"//a[@class='bigusername']", // link with the motherfucker's nick
		document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	var a, ignored;
	for (var i = 0; i < userLinks.snapshotLength; i++) {
		a = userLinks.snapshotItem(i);
		ignored = removeText(a);
		appendLink(a, ignored);
		
	}
}
function removeText(a) {
	var userId = getUserId(a);
	if(!isUserIgnored(userId))
		return false;
	
	var messageDiv = getMessageDiv(a);
	if(!messageDiv.getAttribute('originalMessage'))
		messageDiv.setAttribute('originalMessage', messageDiv.innerHTML);

	messageDiv.innerHTML = IGNORED_HTML;
	if(nextObject(messageDiv))
		nextObject(messageDiv).style.display = 'none'; // removes signature

	return true;
}
function unremoveText(a) {
	var messageDiv = getMessageDiv(a);
	messageDiv.innerHTML = messageDiv.getAttribute('originalMessage');
	if(nextObject(messageDiv))
		nextObject(messageDiv).style.display = ''; // removes signature
}

function isUserIgnored(userId) {
	var ignored = GM_getValue(IGNORED_KEY, '').split(',');
	for(var i = 0; i < ignored.length; i++)
		if(ignored[i] == userId)
			return true;
	
	return false;
}

function getMessageDiv(a) {
	var postId = a.parentNode.id.split('_')[1];
	return document.getElementById('post_message_' + postId);
}
function getUserId(a) {
	return a.getAttribute('href').split('?u=')[1];
}
function appendLink(a, ignored) {
	var user = a.innerHTML;
	
	var ignoreLink = document.createElement('span');
	addGlobalStyle('.ignoreLink { font-size: .8em; cursor: pointer; } .ignoreLink:hover { text-decoration: underline; }');
	ignoreLink.className = 'ignoreLink';
	ignoreLink.setAttribute('ignored',  ignored);
	ignoreLink.innerHTML = '(' + (ignored ? 'unignore' : 'ignore') + ')';
	ignoreLink.addEventListener('click', function(e) {
		var i = this.getAttribute('ignored') == 'true';
		i ? unignoreUser(a) : ignoreUser(a);
		this.setAttribute('ignored',  !i);
		
		this.innerHTML = '(' + (!i ? 'un' : '') + 'ignore)';

		e.stopPropagation();
	}, false);

	a.parentNode.appendChild(ignoreLink);
}
function ignoreUser(a) {
	var ignored = GM_getValue(IGNORED_KEY, '');
	ignored += getUserId(a) + ',';
	
	GM_setValue(IGNORED_KEY, ignored);
	
	removeText(a);
}
function unignoreUser(a) {
	var ignored = GM_getValue(IGNORED_KEY, '').split(',');
	var userId = getUserId(a);
	var newIgnored = '';
	for(var i = 0; i < ignored.length; i++)
		newIgnored += ignored[i] == userId ? '' : ignored[i] + ',';
	
	GM_setValue(IGNORED_KEY, newIgnored);
	
	unremoveText(a);
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}
function nextObject(node) {
	var n = node;
	do n = n.nextSibling;
	while (n && n.nodeType != 1);
	return n;
}

try {
init();
}catch(e) {alert(e);}