// ==UserScript==
// @name           followerStatChecker
// @namespace      followerStatChecker
// @include        http://twitter.com/following*
// @include        https://twitter.com/following*
// @include        http://twitter.com/followers*
// @include        https://twitter.com/followers*
// ==/UserScript==

document.getElementById("following_count_link").href = "/following";
document.getElementById("follower_count_link").href = "/followers";


users = document.getElementsByClassName("user-detail");

userScreenname = "";
userCurrently = "";

usersCount = 0;
intervalID = 0;
intervalCount = 0;

statAdd();

function statAdd () {
  userScreenname = users[usersCount].getElementsByClassName("screenname")[0].textContent;
  userCurrently = users[usersCount].getElementsByClassName("user-body")[0].innerHTML;
  var xmlURL = "http://twitter.com/blocks/destroy/"+userScreenname+".xml";
  intervalID = window.setInterval(intervalAction, 300);
  intervalCount = 0;
  
  users[usersCount].getElementsByClassName("user-body")[0].innerHTML = userCurrently + "<br /><br />"
  + '<span style="color:#666" class="follower-stat">Loading</span>';
  
  GM_xmlhttpRequest({
    method:"POST", 
    url:xmlURL,
    onload:function(x){
      stattAddAction(x)
    },
    onerror:function(x) {
      errorAction(x)
    }
  });
}

function intervalAction() {
  var waitingStr = users[usersCount].getElementsByClassName("follower-stat")[0].innerHTML;
  
  if (intervalCount==3) {
    intervalCount = 0;
    waitingStr = "Loading";
  } else {
    intervalCount++;
    waitingStr += ".";
  }
  
  users[usersCount].getElementsByClassName("follower-stat")[0].innerHTML = waitingStr;
}

function stattAddAction(x) {
  clearInterval(intervalID);
  
  var parser = new DOMParser();
  var xml = parser.parseFromString( x.responseText, "text/xml" );
  var userId = xml.getElementsByTagName("id")[0].textContent;
  var createdAt = xml.getElementsByTagName("created_at")[0].textContent;
  var statCount = xml.getElementsByTagName("statuses_count")[0].textContent;
  var following = xml.getElementsByTagName("friends_count")[0].textContent;
  var followers = xml.getElementsByTagName("followers_count")[0].textContent;
  var description = xml.getElementsByTagName("description")[0].textContent;
  var followsYou = document.getElementById("user_"+userId).className;
  
  followsYou = (followsYou.indexOf("direct-messageable") != -1) ? true : false;
  
  
  users[usersCount].getElementsByClassName("follower-stat")[0].style.color = "#333";
  users[usersCount].getElementsByClassName("follower-stat")[0].innerHTML = "tweets : <em>" + statCount + "</em><br />"
  + "following / followers : <em>" + following + " / " + followers + "</em><br />"
  + "account elapsed : <em>" + parseDate(createdAt) + "</em>";
  
  if (description.length > 0) {
    users[usersCount].getElementsByClassName("follower-stat")[0].innerHTML += '<br />description :<br />&quot;' + description + "&quot;";
  }
  
  if (!followsYou) {
    users[usersCount].getElementsByClassName("follower-stat")[0].innerHTML += '<br /><em style="color:#c33;">*Does not follow You*</em>';
  }
  
  usersCountIncl();
}

function errorAction(x) {
  clearInterval(intervalID);
  
  users[usersCount].getElementsByClassName("follower-stat")[0].innerHTML = x;
  
  usersCountIncl();
}

function parseDate(date){
  var dateArray = date.split(" ");
  var parsedData = dateArray[1]+"/"+dateArray[2]+"/"+dateArray[5];
  var diff = dateDiff(parsedData);
  var str = "";
  
  if (diff <= 1) {
    str = diff + " Day (from " + parsedData + ")";
  } else {
    str = diff + " Days (from " + parsedData + ")";
  }
  
  return str;
}

function dateDiff(date){
  var rdate = new Date(date);
  var today = new Date();
  var datediff = Math.ceil((today.getTime() - rdate.getTime()) /  86400000);
  return datediff; 
}

function usersCountIncl() {
  usersCount++;
  if (usersCount<users.length) {
    statAdd();
  }
}