// ==UserScript==
// @name           last.fm Mutual Friends
// @namespace      http://z3c.info/
// @description    Shows mutual friends when visiting a user's profile
// @include        http://www.last.fm/user/*
// @include        http://www.lastfm.*/user/*
// @exclude        http://www.last.fm/user/*/*
// @exclude        http://www.lastfm.*/user/*/*
// ==/UserScript==

$ = unsafeWindow.$;
$$ = unsafeWindow.$$;
uwd = unsafeWindow.document;

var debug = false;

var VisitedProfile = {
  getNickname: function() {
    var nickEls = $$("#userBadge .badgeHead h1");

    if (nickEls.length != 1) {
      log("Total count of elements not one! Count: " + nickEls);
      return null;
    } else {
      var nickEl = nickEls[0];
      return nickEl.textContent;
    }
  }
};

var User = {
  isSignedIn: function() {
    return $("idBadgerUser") !== null;
  },
  
  getNickname: function() {
    var nickEls = $$("#idBadgerUser span:nth-child(2)")
    if (nickEls.length != 1) {
      log("Total count of elements not one! Count: " + nickEls);
      return null;
    } else {
      var nickEl = nickEls[0];
      return nickEl.textContent;
    }
  }
};

var Friends = {
  fetchList: function(nickname, callback) {
    var friendsUrl = "http://www.last.fm/user/" + nickname + "/friends",
      response = "",
      nextPageExists = true,
      nextPageAnchors;
    
    getPartialList(friendsUrl, callback);
  }
}

function UserCard(hCardElement) {
  this.nickname = hCardElement.id;
  this.html = hCardElement.innerHTML;
}

function getPartialList(url, callback) {
  GM_xmlhttpRequest({
    method: "GET",
    url: url,
    headers: {
      "User-Agent":"Greasemokey script",
      "Accept":"text/monkey,text/xml",
      },
    onload: function(details) {
      getPartialListOnLoad(details, url, callback);
    }
  });
}

function getPartialListOnLoad(details, url, callback) {
    var tempDiv,
      vCards,
      i,
      pagination,
      nextPageAnchors,
      nextPageUrl = null,
      userCards = [],
      img;

    if (details.status != 200) {
      log("Status was not 200: %s", details.status);
      return;
    } else {
      // create temporary DIV and load document into it so we can apply
      // selectors (removing any scripts first)
      tempDiv = $(unsafeWindow.document.createElement('div'))
        .update(details.responseText
          .replace(/<script(.|\s)*?\/script>/g, "")
        );

      // select all cards
      vCards = tempDiv.select("div.vcard");
      log("Number of vCards on url (%s): %s", url, vCards.length);
      for (i = 0; i < vCards.length; i++) {
        vCards[i].select("p.info")[0].remove();
        img = vCards[i].select("img")[0];
        img
          .writeAttribute("width", 34)
          .writeAttribute("height", 34)
          .writeAttribute("src",
            img.readAttribute("src").replace(/64/g, '34'));
        userCards.push(new UserCard(vCards[i]));
      }
      log("userCards length: %s", userCards.length);
      
      // check if there is pagination
      pagination = tempDiv.select("div.pagination");
      if (pagination.length == 0) {
        log("No pagination on URL: %s", url);
        nextPageUrl = null;
      } else {
        nextPageAnchors = pagination[0].select("a.nextlink");
        if (nextPageAnchors.length != 1) {
          log("Last page: %s", url);
          nextPageUrl = null;
        } else {
          nextPageUrl = nextPageAnchors[0].href;
        }
      }
    }
    
    callback(userCards, nextPageUrl === null);
    if (nextPageUrl) {
      log("Fetching next page: %s", nextPageUrl);
      getPartialList(nextPageUrl, callback)
    }

}

function sortUserCards(userCards) {
  userCards.sort(function(a, b) {
    return a.nickname < b.nickname ? -1 : (a.nickname > b.nickname ? 1 : 0);
  });
}

function log(message) {
  if (!debug) {
    return;
  }

 for (var i = 1; i < arguments.length; i++) {
    message = message.replace('%s', arguments[i])
  }
  
  GM_log(message);
}

function display(mutual, mutualFriendsModule) {
  var headingH2,
      h2WrapperSpan,
      userList,
      userListElement,
      friendsModule,
      FRIENDS_MODULE_INDEX = 5,
      i;
  
  mutualFriendsModule.select("h2 span")[0]
    .update("Mutual Friends ("+ mutual.length +")");
  
  userList = $(uwd.createElement('ul'))
    .addClassName("usersSmall")
    .addClassName("clearit");
  
  for (i = 0; i < mutual.length; i++) {
    userListElement = $(uwd.createElement('li'))
      .addClassName("user");

    if (i % 2 == 0) {
      userListElement.addClassName("odd");
      
      if (i == 0) {
        userListElement.addClassName("first");
      }
    }
    
    userList.insert(
      userListElement
        .insert($(uwd.createElement('div'))
          .insert(mutual[i].html)
      )
    );
  }
    
  mutualFriendsModule.select("p")[0]
    .replace(userList);
}

function findMutual(un, vpn, uFriendsCards, vpFriendsCards, mutualFriendsModule) {
  var i,
    j,
    mutual = [];

  i = 0;
  j = 0;
  while (i < uFriendsCards.length && j < vpFriendsCards.length) {
    ufNick = uFriendsCards[i].nickname;
    vpfNick = vpFriendsCards[j].nickname;
    if (ufNick == vpfNick) {
      mutual.push(uFriendsCards[i]);
      i++;
      j++;
    } else if (ufNick > vpfNick) {
      j++;        
    } else {
      i++;        
    }
  }
  
  log("Mutual friends between %s and %s: %s", un, vpn, mutual.length);
  display(mutual, mutualFriendsModule);
}

function startLoading(un, vpn, mutualFriendsModule) {
  var uFriendsCards = [],
      vpFriendsCards = [],
      uFriendsFinalized = false,
      vpFriendsFinalized = false;

  Friends.fetchList(un, function(hCardElements, isFinal) {
    uFriendsCards = uFriendsCards.concat(hCardElements);
    log("uFriendsCards length: %s", uFriendsCards.length);
    
    if (isFinal) {
      log("uFriendsCards final");
      sortUserCards(uFriendsCards);
      uFriendsFinalized = true;
    }

    if (uFriendsFinalized && vpFriendsFinalized) {
      findMutual(un, vpn, uFriendsCards, vpFriendsCards, mutualFriendsModule);
    }
  });

  Friends.fetchList(vpn, function(hCardElements, isFinal) {
    vpFriendsCards = vpFriendsCards.concat(hCardElements);
    log("vpFriendsCards length: %s", vpFriendsCards.length);
    
    if (isFinal) {
      log("vpFriendsCards final");
      sortUserCards(vpFriendsCards);
      vpFriendsFinalized = true;

      if (uFriendsFinalized && vpFriendsFinalized) {
        findMutual(un, vpn, uFriendsCards, vpFriendsCards, mutualFriendsModule);
      }
    }
  });
}

function constructModuleDiv() {
  var mutualFriendsModule,
      headingH2,
      h2WrapperSpan,
      friendsModule,
      FRIENDS_MODULE_INDEX = 5,
      i;
  
  mutualFriendsModule = $(uwd.createElement('div'));
  mutualFriendsModule.addClassName("module");
  
  headingH2 = $(uwd.createElement('h2'));
  headingH2.addClassName("heading");
  
  h2WrapperSpan = $(uwd.createElement('span'));
  h2WrapperSpan.addClassName("h2Wrapper");
  h2WrapperSpan.update("Mutual Friends");

  headingH2.insert(h2WrapperSpan);
  mutualFriendsModule.insert(headingH2);

  friendsModule = $$("div.module")[FRIENDS_MODULE_INDEX];
  friendsModule.insert({ before: mutualFriendsModule });
  
  return mutualFriendsModule;
}

(function () {
  var un,
      vpn,
      loadFriendsAnchor,
      mutualFriendsModule;

  if (!User.isSignedIn()) {
    return;
  }
  un = User.getNickname();

  vpn = VisitedProfile.getNickname();
  if (vpn == null) {
    return;
  }

  if (un == vpn) {
    return;
  }
  
  mutualFriendsModule = constructModuleDiv();

  loadFriendsAnchor = $(uwd.createElement('a'));
  loadFriendsAnchor.writeAttribute("href", "#loadMutualFriends");
  loadFriendsAnchor.update("Load mutual friends list");
  
  mutualFriendsModule.insert(
    $(uwd.createElement('p'))
      .insert(loadFriendsAnchor));
  
  loadFriendsAnchor.observe('click', function(event) {
    window.setTimeout(function () {
      event.element().update("Loa... wait for it... ding...")
      startLoading(un, vpn, mutualFriendsModule);
    }, 0);
    event.stop();
  });
})();