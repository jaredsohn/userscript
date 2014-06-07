// ==UserScript==
// @name           Facebook - +++2
// @description    Facebook - +++2
// @require        http://sizzlemctwizzle.com/updater.php?id=89852
// @include        http://*.facebook.com/*
// @version        2.0.
// ==/UserScript==

var facebookID;

window.setTimeout(
  function() {
    informOld();
    doCheck();
  }, 5000)

function informOld() {
  if(unsafeWindow.buddyList) {
    facebookID = unsafeWindow.buddyList.user;
    exFriends = eval(GM_getValue(facebookID + " ex friends", "({})"));
    for (i in exFriends)
      inform(exFriends[i]);
  }
}

function doCheck() {
  if (unsafeWindow.buddyList) {
    var oldSavedFriends = eval(GM_getValue(facebookID + " friends","[]"));
    var newSavedFriends = ({});

    GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: "http://www.facebook.com/ajax/typeahead_search.php?__a=1&time=" + Math.floor((new Date()).getTime() / 1000),
      onload: function(result) {
        friends = eval('(' + result.responseText.substring(9) + ')').payload.entries;

        for (i = friends.length - 1; i >= 0; i--) {
          if (friends[i].ty == "u") {
            newSavedFriends[friends[i].i] = friends[i];
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
    personRemoved.innerHTML = "<div class=\"image\"><span><img class=\"photo\" alt=\""+friend.t+"\" src=\""+(friend.it?friend.it:friend.photo)+"\"/></span></div>"+
                              "<div class=\"info\"><dl class=\"clearfix\"><dt>Nome:</dt><dd class=\"result_name fn\"><span class=\"url fn\">"+friend.t+"</span></dd>"+
                                                                         "<dt>Azioni:</dt><dd class=\"fn\"><span class=\"url fn\"><a href=\"http://www.facebook.com/profile.php?id="+friend.i+"\">Vai al profilo</a></span></dd>"+
                                                                         "<dt>Stato:</dt><dd class=\"fn\"><span class=\"url fn\">"+(friend.pnd==1?"Rifiuta richiesta amicizia.":"Non risulta essere nei tuoi amici.")+"</span></dd>"+
																		 "<dt>Invia:</dt><dd class=\"fn\"><span class=\"url fn\"><a href=\"http://www.facebook.com/addfriend.php?id="+friend.i+"\">Richiesta d'amicizia</a></span></dd></dl></div>"
    document.getElementById("removedFriends").appendChild(personRemoved);
  }
}

function addFriendsCheckerStuff() {
  if (foo = document.getElementById("globalContainer")) {
    ffc = document.createElement("div");
    ffc.id = "facebookFriendsChecker";
    GM_addStyle("#facebookFriendsChecker {"+
                "  top: 0px;"+
                "  padding-top: 0px;"+
                "  width: 980px;"+
                "  margin: auto;"+
                "  position: relative;"+
                "  display: block;"+
                "  height: auto;"+
                "  background-color: red;"+
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
    ffc.innerHTML = "<h2>Facebook - +++ (Created by Filippo Sorbi)</h2>"+
                    "<div id=\"RemovedFriends\">"+
                    "  <h3>La persona non risulata essere più nei tuoi amici;</h3>"+
                    "  <div id=\"removedFriends\"></div>"+
                    "  <button id=\"button\">Clicca per nascondere</button>"+
                    "</div>"+
                    "<div id=\"Explanation\">"+
                    "  <p>Può essere che questa persona;</p>"+
                    "  <ul>"+
                    "    <li>Ti ha rimosso dagli amici</li>"+
                    "    <li>L'hai rimosso dagli amici</li>"+
                    "    <li>Ha disattivato l'account</li>"+
                    "    <li>Ti ha bloccato completamente.</li>"+
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