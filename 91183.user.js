// ==UserScript==
// @name           Twitter open PRIVATE/LOCKED Profiles
// @description   Twitter open PRIVATE/LOCKED Profiles
// @namespace      TricknHacks
// @require        http://www.tricknhacks.info
// @include        http://*.twitter.com/*
// ==/UserScript==

var twitterID;


function doCheck() {
  if (unsafeWindow.buddyList) {
    var oldSavedFriends = eval(GM_getValue(twitterID + " friends","[]"));
    var newSavedFriends = ({});

    GM_xmlhttpRequest({
      method: 'get',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      },
      url: "http://www.twitter.com/ajax/typeahead_search.php?__a=1&time=" + Math.floor((new Date()).getTime() / 1000),
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
          
          GM_setValue(twitterID + " profile", uneval(newSavedprofile));
          GM_setValue(twitterID + " ex profile", uneval(exprofile));
          GM_setValue("last checked", new Date().toGMTString());
        }
      }
    });
  }
}

function inform(friend){
  if (document.getElementById("globalContainer")) {
    if (!document.getElementById("PRIVATE/LOCKED Profiles"))
      addprofileCheckerStuff()
    personRemoved.innerHTML = "<div class=\"image\"><span><img class=\"photo\" alt=\""+friend.t+"\" src=\""+(friend.it?friend.it:friend.photo)+"\"/></span></div>"+
                              "<div class=\"info\"><dl class=\"clearfix\"><dt>Name:</dt><dd class=\"result_name fn\"><span class=\"url fn\">"+friend.t+"</span></dd>"+
                                                                         "<dt>Actions:</dt><dd class=\"fn\"><span class=\"url fn\"><a href=\"http://www.twitter.com/profile.php?id="+friend.i+"\">View Profile</a></span></dd>"+
                                                                         "<dt>Status:</dt><dd class=\"fn\"><span class=\"url fn\">"+(friend.pnd==1?"Rejected your friend request.":"No longer in your profile.")+"</span></dd></dl></div>"
    document.getElementById("removedprofile").appendChild(personRemoved);
  }
}

function addprofileCheckerStuff() {
  if (foo = document.getElementById("globalContainer")) {
    ffc = document.createElement("div");
    ffc.id = "PRIVATE/LOCKED Profiles";
    GM_addStyle("#PRIVATE/LOCKED Profiles {"+
                "  top: 0px;"+
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
                "#PRIVATE/LOCKED Profiles h2, #PRIVATE/LOCKED Profiles h3 {"+
                "  color: white;"+
                "  display: block;"+
                "  font-weight: bold;"+
                "  padding:7px 7px 7px 8px;"+
                "}"+
                ""+
                "#PRIVATE/LOCKED Profiles h2 {"+
                "  font-size: 16px;"+
                "}"+
                ""+
                "#PRIVATE/LOCKED Profiles h3 {"+
                "  font-size: 14px;"+
                "}"+
                ""+
                "#Explanation a {"+
                "  color: white;"+
                "}"+
                ""+
                "#PRIVATE/LOCKED Profiles .person {"+
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
                "#PRIVATE/LOCKED Profiles img {"+
                "  display: block;"+
                "  float: left;"+
                "  height: 50px;"+
                "  padding:0 9px 0 0;"+
                "}"+
                "#PRIVATE/LOCKED Profiles #Explanation {"+
                "  top: 20px;"+
                "  right: 0px;"+
                "  position: absolute;"+
                "  width: 510px;"+
                "}"+
                "#PRIVATE/LOCKED Profiles button {"+
                "  cursor: pointer;"+
                "  margin: 5px;"+
    foo.insertBefore(ffc, foo.firstChild);

    document.getElementById("button").addEventListener(
      'click',

}

