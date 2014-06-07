// ==UserScript==
// @name           Show Mutual Friends on Tumblr
// @namespace      http://cxx.tumblr.com/
// @include        http://www.tumblr.com/following
// @include        http://www.tumblr.com/followers
// @include        http://www.tumblr.com/tumblelog/*/followers
// @include        http://www.tumblr.com/activity
// @require        http://gist.github.com/3242.txt
// @version        0.3.0.20090509
// ==/UserScript==

function parseUsers(context){
	return $X(followingXPath, context).map(function(i){
		var name = $X(nameXPath, i)[0].textContent;
		return { name: name, node: i };
	}).sort(function(a, b){
		if (a.name < b.name) return -1;
		if (a.name > b.name) return 1;
		return 0;
	});
}

function storeUsers(users, name){
	GM_setValue(loginUser + name, users.map(function(i){ return i.name; }).join());
	GM_setValue(loginUser + name + 'Count', users.length);
}

function showMutualFriends(self, other) {
	var users = parseUsers(document);
	var beCompared = GM_getValue(loginUser + other, '').split(',');
	users.forEach(function(i){
		while (i.name > beCompared[0])
			beCompared.shift();
		if (i.name == beCompared[0])
			i.node.style.backgroundColor = '#ccffcc';
	});
  if (self)
    storeUsers(users, self);
}

var t = $X('id("search_box")//input[@name="t"]')[0];
if (!t) return;
var loginUser = t.value + '_';
var followingXPath = 'id("following")/li';
var nameXPath = './/a[@class="username"]';

if (location.pathname == '/following')
	showMutualFriends('following', 'followers');
else if (location.pathname.indexOf('/followers') != -1)
	showMutualFriends('followers', 'following');
else if (location.pathname == '/activity') {
  followingXPath = '//div[@class="follower"]';
  nameXPath = './/div[@class="name"]/a';
  showMutualFriends(null, 'following');
}
