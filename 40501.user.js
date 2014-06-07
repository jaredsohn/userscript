// ==UserScript==
// @name           PostNuker3000
// @namespace      http://forums.penny-arcade.com/member.php?u=8153
// @description    Basically an improved ignore list.
// @include        http://forums.penny-arcade.com/showthread.php**
// @include        http://platformers.net/forum/index.php*
// ==/UserScript==

window.addEventListener("load", function(e) {

  DEBUG = false;
  function remove(element) {
      element.parentNode.removeChild(element);
  }

  function xpath(path) {
    return document.evaluate(
	  path,
	  document,
	  null,
	  XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	  null);
  }

  function getUserName(path) {
    //Returns a string, the path should result in a text element
    //being returned after evaluation.
    return document.evaluate(
	  path,
	  document,
	  null,
	  XPathResult.STRING_TYPE,
	  null).stringValue;
  }

  function nukePosts(username, xpexpr) {
    //username should be either a string or an array

    if (DEBUG) { unsafeWindow.console.log("=============enter nukePosts============="); }

    if (typeof(username) == "object") {
	  if (DEBUG) { unsafeWindow.console.log("Username array: %s   length: %s", username, username.length); }
	  for (var i = 0; i < username.length; i++ ) {

	    if (DEBUG) {
		  unsafeWindow.console.log("=============username loop #%s/%s=============", i + 1, username.length);
		  unsafeWindow.console.log("username[%s]: %s", i, username[i]);
	    }
	    var posts = xpath(xpexpr.replace('USERNAME', username[i]));
	    if (DEBUG) {
		  unsafeWindow.console.log("User: %s", username[i]);
		  unsafeWindow.console.log(xpexpr.replace('USERNAME', username[i]));
		  unsafeWindow.console.log("Snapshot length: %s", posts.snapshotLength);
	    }
	    if (posts.snapshotLength > 0) {
		  for (var j = 0; j < posts.snapshotLength; j++) {
		    remove(posts.snapshotItem(j));
		  }
	    }
	    if (DEBUG) {unsafeWindow.console.log("===============End of loop #%s/%s=============", i + 1, username.length); }
	  }
    }
    else {
	  if (DEBUG) {
	    unsafeWindow.console.log("A string was passed");
	    unsafeWindow.console.log("User: %s", username);
	    unsafeWindow.console.log(xpexpr.replace('USERNAME', username));
	  }
	  var posts = xpath(xpexpr.replace('USERNAME', username));
	  for (var j = 0; j < posts.snapshotLength; j++) {
	  remove(posts.snapshotItem(j));
	  }
    }
    if (DEBUG) { unsafeWindow.console.log("=============exit nukePosts============="); }
  }

  var href = window.location.href;

  if (href.match(/http\:\/\/forums\.penny-arcade\.com.*/i)) {

//    var users = new Array("Clawshrimpy", "PikaPuff");
    var users = new Array("Clawshrimpy");

    var posts = '//div[starts-with(@id, "postmenu")]/a[text()="USERNAME"]/ancestor::div[@class="page"]/parent::*';
    var quoted = '//div[starts-with(@id, "post_message")]//strong[text()="USERNAME"]/ancestor::div[@class="page"]/parent::*';

    nukePosts(users, posts);
    nukePosts(users, quoted);

  //   userIDs = new Array("6501");
  //  var postsByUID = '//div[starts-with(@id, "postmenu")]/a[@href="member.php?u=USERNAME"]/ancestor::div[@class="page"]/parent::*';
  //   for (var i = 0; i < userIDs.length; i++) {
  // 	var userName = getUserName('//div[starts-with(@id, "postmenu")]/a[@href="member.php?u=' + userIDs[i] + '"]/text()');
  // 	nukePosts(userIDs[i], postsByUID);
  // 	nukePosts(userName, quoted);
  // 	unsafeWindow.console.log(userName);
  //   }
  }

  if (href.match(/http\:\/\/platformers\.net.*/i)) {

    var users = new Array("Clawshrimpy")
    var posts = '//a[@title="View the profile of USERNAME"]/ancestor::tr';
    var quoted = '//div[@class="post"]//div[@class="quoteheader"]/a[contains(text(), "USERNAME")]/ancestor::tr';

    nukePosts(users, posts);
    nukePosts(users, quoted);

    var NoImagesForYou = new Array("Chara", "God-Jesus");
    var images = '//a[@title="View the profile of USERNAME"]/ancestor::tr//div[@class="post"]//img[not(starts-with(@src, "http://platformers.net"))]';
    var quoted_images = '//div[@class="post"]//div[@class="quoteheader"]//a[contains(text(), "USERNAME")]/ancestor::div[1]/following-sibling::*[1]//img[not(starts-with(@src, "http://platformers.net"))]';

    nukePosts(NoImagesForYou, images);
    nukePosts(NoImagesForYou, quoted_images);

  //   for (var i = 0; i < users.length; i++) {
  // 	  nukePosts(users[i], posts);
  // 	  nukePosts(users[i], quoted);
  //   }
  //      for (var i = 0; i < NoImagesForYou.length; i++) {
  //  	  nukePosts(NoImagesForYou[i], images);
  //  	  nukePosts(NoImagesForYou[i], quoted_images);
  //    }
  }
}, false);