// ==UserScript==
// @name            Twitter First Follow Chain
// @version         1
// @namespace       http://ellab.org/
// @author          angusdev
// @description     Show someone's first follow's first follow's first follow's ...
// @include         http://twitffc.appjet.net/
// ==/UserScript==

/*
Author: Angus http://angusdev.mysinablog.com/
              http://angusdev.blogspot.com/
Date:   2009-03-11

Version history:
1    11-Mar-2009    First release
*/

(function() {

var SCRIPT_VERSION = 1;
var userlist = new Array();

function clone(obj){
  if(obj == null || typeof(obj) != 'object') {
    return obj;
  }

  var temp = {};
  for(var key in obj) {
    temp[key] = clone(obj[key]);
  }
  return temp;
}

function contains(arr, obj) {
  for (var i=0;i<arr.length;i++) {
    if (arr[i] === obj) {
      return true;
    }
  }

  return false;
}

function extract(s, prefix, suffix) {
  var i = s.indexOf(prefix);
  if (i >= 0) {
    s = s.substring(i + prefix.length);
  }
  else {
    return '';
  }
  if (suffix) {
    i = s.indexOf(suffix);
    if (i >= 0) {
      s = s.substring(0, i);
    }
    else {
      return '';
    }
  }
  return s;
}

function getFirstFriend(username) {
  if (contains(userlist, username)) {
    // stop here
    unsafeWindow.addCyclicUserBlock(username);
    return;
  }

  unsafeWindow.showStatusMessage('fetching ' + username + ' ...');
  userlist.push(username);

  var userprofilegmopts = clone(unsafeWindow.getUserProfileGMOpts(username));
  userprofilegmopts.onload = function(t) {
    var user = unsafeWindow.parseUserProfile(username, t.responseText);
    unsafeWindow.addUserBlock(user);
    var firstfriendgmopts = clone(unsafeWindow.getFirstFriendPageGMOpts(user));
    if (firstfriendgmopts) {
      firstfriendgmopts.onload = function(t) {
        var firstFriend = unsafeWindow.parseFirstFriend(t.responseText);
        if (firstFriend) {
          getFirstFriend(firstFriend);
        }
      };

      GM_xmlhttpRequest(firstfriendgmopts);
    }
    else {
      // no user
      unsafeWindow.addEndUserBlock();
      unsafeWindow.clearStatusMessage();
    }
  };
  GM_xmlhttpRequest(userprofilegmopts);
}

var startButton = document.getElementById('start');
if (SCRIPT_VERSION == unsafeWindow.SCRIPT_VERSION_NEEDED && startButton) {
  startButton.disabled = false;
  startButton.addEventListener('click', function() {
    var username = unsafeWindow.start();
    if (!username) {
      return;
    }

    userlist = new Array();

    // check login status and mobile version
    var logingmopts = clone(unsafeWindow.getCheckLoginGMOpts());
    logingmopts.onload = function(t) {
      var checkLoginResult = unsafeWindow.checkLoginStatus(t.responseText);
      if (!checkLoginResult.isLogin) {
        unsafeWindow.clearStatusMessage();
        alert('Please login twitter in the same browser and try again');
        return;
      }
      else if (checkLoginResult.isMobileVersion) {
        // switch to standard version
        unsafeWindow.showStatusMessage('switching to standard version...');
        var gmopts = clone(checkLoginResult.switchToStandardOptions);
        gmopts.onload = function(t) {
          getFirstFriend(username);
        };

        GM_xmlhttpRequest(gmopts);
      }
      else {
        // standard version
        getFirstFriend(username);
      }
    };

    unsafeWindow.showStatusMessage('checking login status...');
    GM_xmlhttpRequest(logingmopts);
  }, false);
}
})();