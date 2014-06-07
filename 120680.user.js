// ==UserScript==
// @name           Facebook Phonebook Exporter
// @namespace      http://bradfitz.com/
// @description    export your Facebook friends' phone numbers to your phone / addressbook
// @include        http://www.facebook.com/friends/*
// @author         Brad Fitzpatrick <brad@danga.com>
// ==/UserScript==

(function() {
  var xpath = function(node, expr) {
    var xpe = new XPathEvaluator();
    var nsResolver = xpe.createNSResolver(node.ownerDocument == null ?
					  node.documentElement :
					  node.ownerDocument.documentElement);
    var result = xpe.evaluate(expr, node, nsResolver, 0, null);
    var ret = [];
    var res;
    while (res = result.iterateNext()) {
      ret.push(res);
    }
    return ret;
  };

  var submitJson = function(json) {
    var div = document.createElement("div");
    document.body.appendChild(div);
    div.innerHTML = "<form method='POST' target='addressbooker' action='http://addressbooker.appspot.com/submit' id='addressbooker'></form>";
    var form = document.getElementById("addressbooker");
    var createField = function(name, value) {
      var field = document.createElement("input");
      field.setAttribute("type", "hidden");
      field.setAttribute("name", name);
      field.setAttribute("value", value);
      return field;
    };
    form.appendChild(createField("json", json));
    form.appendChild(createField("handle", Math.floor(Math.random() * Math.pow(2, 31))));
    form.appendChild(createField("group", "Facebook"));
    form.submit();
  };

  var abort = function(errmsg) {
    GM_log("Aborting export: " + errmsg);
    alert(errmsg);
    throw errmsg;
  };

  // Returns pagination info "1-50 of 150 friends" -> [1, 50, 150]
  // Returned array is [1_based_window_start_exclusive,
  //                    1_based_window_end_exclusive,
  //                    total_friends]
  // Or aborts if it can't find it.
  var getPageInfo = function() {
    var spans = xpath(document, "//span[@class='UIPager_PageNum']");
    if (!spans.length) {
      abort("Failed to find UIPager_PageNum span. " +
	    "Can't determine paging / number of friends.");
    }

    var lastSummaryText = spans[0].innerHTML;
    var m;
    if (m = /\b(\d+).+?(\d+).+?(\d+)/.exec(lastSummaryText)) {
    	var nums = [m[1], m[2], m[3]];
    	// Sort it so it's robust against re-ordering from translation:
    	nums.sort(function (a, b) { return a - b; });
    	return nums;
    }
    // Not paginated.  Single page.
    if (m = /(\d+)\s+\w+/.exec(lastSummaryText)) {
    	return [1, m[1], m[1]];
    }    
    abort("Couldn't find pagination information.");
  };

  var get = function(name) {
    var ele = document.getElementById(name);
    if (!ele) {
      abort("Required element '" + name + "' not found; aborting.");
    }
    return ele;
  };

  var getPageNextButton = function() {
    var btns = xpath(document,
		     "//a[contains(@class, 'UIPager_ButtonForward')]");
    if (!btns.length) {
      abort("Can't find forward button.");
    }
    return btns[0];
  };

  var newMouseClickEvent = function() {
    var evt = document.createEvent("MouseEvents");
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0,
		       false, false, false, false, 0, null);
    return evt;
  };

  // Presses forward button and runs provided onLoaded callback when
  // the pagination display info has changed.
  var clickNextButton = function(onLoaded) {
    var initialPageInfo = getPageInfo();
    getPageNextButton().dispatchEvent(newMouseClickEvent());
    var tries = 0;  // incremented every 100 ms.
    
    var waitForLoad = function() {
      var currentPageInfo = getPageInfo();
      if (currentPageInfo[0] == initialPageInfo[0]) {
	// Still loading.
	if (++tries > 100) {
	  // Abort after 10 seconds.
	  abort("Aborting page flipping after 10 seconds.");
	}
	window.setTimeout(waitForLoad, 100 /* ms */);
	return;
      }
      // Changed!
      onLoaded();
    };
    waitForLoad();
  };

  var extractThisPage = function(outputFriends) {
    GM_log("Extracting info.");
    var ffriends = get("FriendsPage_Container");
    var children = ffriends.childNodes;
    for (var i = 0; i < children.length; ++i) {
      var child = children[i];
      
      // The friend to append to ret.
      var friend = {
	name: null,
	numbers: [],
	img: null,
      };

      // Extract the name.
      var name = xpath(child, "descendant::node()/a[@class='UIObjectListing_Title']/text()");
      if (name.length) {
	friend.name = name[0].textContent;
      }

      // Extract the phone numbers.
      var phoneDivs = xpath(child, "descendant::node()/div[contains(@class,'FriendsPage_PhonebookRight')]");
      if (!phoneDivs.length) {
	abort("Didn't find phonebook right for: " + friend.name);
      }
      for (var pi = 0; pi < phoneDivs[0].childNodes.length; ++pi) {
	var phoneDiv = phoneDivs[0].childNodes[pi];
	friend.numbers.push({
	    "type": phoneDiv.childNodes[0].innerHTML,
	    "number": phoneDiv.childNodes[1].textContent,
        });
      }
	
      // Extract the image.
      var img = xpath(child, "descendant::node()/img");
      if (img.length) {
	friend.img = img[0].src;
      }

      outputFriends.push(friend);
    }
  };

  // The main export function.
  var doExport = function() {
    var initialPageInfo = getPageInfo();
    if (initialPageInfo[0] != 1) {
      abort("Please start at the first page, then Export again.");
    }

    var friendList = [];  // list of person objects
    var extractPageAndContinue = function () {
      var pageInfo = getPageInfo();
      GM_log("Extracting page: " + pageInfo);
      extractThisPage(friendList);
      GM_log("Number of friends extracted: " + friendList.length);
      if (pageInfo[1] != pageInfo[2]) {
	GM_log("More pages remaining; pressing next...");
	clickNextButton(extractPageAndContinue);
	return;
      }
      GM_log("Finished extracting; now posting JSON remotely...");
      var json = unsafeWindow.JSON.stringify(friendList);
      submitJson(json);
    };
    extractPageAndContinue();
  };

  GM_registerMenuCommand("Export Facebook Phonebook", doExport, "x", "shift alt");

  var auxList = document.getElementById("fb_menubar_aux");
  if (auxList) {
      var newLi = document.createElement("li");
      newLi.setAttribute("class", "fb_menu");
      auxList.firstChild.insertBefore(newLi, auxList.firstChild.firstChild.nextSibling);
      newLi.innerHTML = "<div class='fb_menu_title'><a href='#'>EXPORT</a></div>";
      newLi.firstChild.firstChild.addEventListener("click", doExport, false);
  }

 })();
