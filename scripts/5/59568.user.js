// ==UserScript==
// @name           followerStatChecker (yk build)
// @namespace      http://lanieve.jp/
// @description      This script is Twitter follower page additional information.
// @include        http://twitter.com/followers*
// @include        https://twitter.com/followers*
// ==/UserScript==

usersCount = 0;
users = document.getElementsByClassName("user-detail");

statAdd();

function statAdd () {
  var userScreenname = users[usersCount].getElementsByClassName("screenname")[0].textContent;
  var userCurrently = users[usersCount].getElementsByClassName("user-body")[0].innerHTML;
  var xmlURL = "http://twitter.com/blocks/destroy/"+userScreenname+".xml";
  
  GM_xmlhttpRequest({
    method:"POST", 
    url:xmlURL,
    onload:function(x){
      var currentlyHTML = userCurrently;
      var usersCount = usersCountLoad();
      
      var parser = new DOMParser();
      var xml = parser.parseFromString( x.responseText, "text/xml" );
      var createdAt = xml.getElementsByTagName("created_at")[0].textContent;
      var statCount = xml.getElementsByTagName("statuses_count")[0].textContent;
      var friendsCount = xml.getElementsByTagName("friends_count")[0].textContent;
      var followerCount = xml.getElementsByTagName("followers_count")[0].textContent;
	  var friendsRate = String(Math.round(100 * Number(followerCount) /   Number(friendsCount)) / 100);
      if (parseInt(friendsRate) < 1) { rateColor = "#f66";} else {rateColor = "#66f";}
	  
	  HTML = "<br /><div style='color:#666;border: 1px solid #888;'>" + "created : " + parseDate(createdAt) + " (" + dateDiff(createdAt) + " days) post : " + statCount + "<br />  follow:" + friendsCount + " follower:" + followerCount + " (<span style='color:" + rateColor + ";'>" + friendsRate  + "</span>)</div>" ;
	  
      users[usersCount].getElementsByClassName("user-body")[0].innerHTML = currentlyHTML + HTML;
      usersCountIncl();
    },
    onerror:function(responseDetails) { alert(responseDetails) }
  });
}

function parseDate(date){
  var dateArray = date.split(" ");
  var dateFormat = dateArray[1]+"/"+dateArray[2]+"/"+dateArray[5];
  return dateFormat;
}

function dateDiff(date){
  var rdate = new Date(date);
  var today = new Date();
  var datediff = Math.ceil((today.getTime() - rdate.getTime()) / 	86400000);
  return datediff; 
}

function usersCountLoad() {
  return usersCount;
}

function usersCountIncl() {
  usersCount++;
  if (usersCount<users.length) {
    statAdd();
  }
}