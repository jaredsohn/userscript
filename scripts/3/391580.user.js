// ==UserScript==
// @name		YouTubeStuff
// @version		2014.02.12
// @namespace		sebaro
// @description		Get partners and block users form results pages.
// @include		http://youtube.com*
// @include		http://www.youtube.com*
// @include		https://youtube.com*
// @include		https://www.youtube.com*
// ==/UserScript==


(function() {
  
var blockedUsers = [];

function getMyContentGM(url) {
  var xmlHTTP = GM_xmlhttpRequest({
    method: 'GET',
    url: url,
    synchronous: true
  });
  return xmlHTTP.responseText;
}

function setMyOptions(key, value) {
  localStorage.setItem(key, value);
}

function getMyOptions() {
  if (localStorage.getItem("blockedUsers")) 
    return localStorage.getItem("blockedUsers");
  else
    return "";
}
 
function removeUser(ytuser, save) {
  var ytUser, ytParent;
  var ytAnchors = document.getElementsByClassName('yt-user-name');
  for (var i = 0 ; i < ytAnchors.length; i++) {  
    if (ytAnchors[i].href.indexOf('/user/') != -1 || ytAnchors[i].href.indexOf('/channel/') != -1) {
      ytUser = ytAnchors[i].href.replace(/.*\/(user|channel)\//, "");
      if (ytUser == ytuser) {
	ytParent = ytAnchors[i].parentNode;
	while (ytParent) {
	  if (ytParent.className.indexOf("yt-lockup clearfix yt-uix-tile result-item-padding") != -1) {
	    ytParent.parentNode.removeChild(ytParent);
	    break;
	  }
	  else {
	    ytParent = ytParent.parentNode;
	  }
	}
      }
    }
  }
  if (save) {
    if (blockedUsers.indexOf(ytuser) == -1) {
      blockedUsers.push(ytuser);
      setMyOptions("blockedUsers", blockedUsers.join(","));
    }
  }
}

/*
if (window.location.href.indexOf('youtube.com/user') != -1) {
  var ytUser, sbURL, sbText, ytPartner, ytChTitles;
  ytUser = window.location.href.match(/youtube.com\/user\/(.*?)(\?|&|$)/);
  sbURL = 'http://socialblade.com/youtube/user/' + ytUser[1];
  sbText = getMyContentGM(sbURL);
  ytPartner = sbText.match(/(YT Partner)/);
  if (!ytPartner) ytPartner = sbText.match(/Network\/Claimed By/);  
  if (ytPartner) {
    ytChTitles = document.getElementsByClassName("qualified-channel-title-text");
    ytChTitles[ytChTitles.length-1].innerHTML += ' (Partner)';
  }
}
*/

if (window.location.href.indexOf('youtube.com/results') != -1) {
  
  blockedUsers = getMyOptions().split(",");
  
  var ytURL, ytText, ytUser, sbURL, sbText, sbClaimed, ytPartner, ytViews, ytMess;
  var ytRemove = [];
  var ytUsers = [];
  function setMyListener(i) {
    ytRemove[i].addEventListener('click', function() {removeUser(ytUsers[i], true);}, false);
  }
  var ytAnchors = document.getElementsByClassName('yt-user-name');
  
  for (var i = 0 ; i < ytAnchors.length; i++) {
    if (ytAnchors[i].href.indexOf('/user/') != -1 || ytAnchors[i].href.indexOf('/channel/') != -1) {
      ytUser = ytAnchors[i].href.replace(/.*\/(user|channel)\//, "");
      for (var u = 0; u < blockedUsers.length; u++) {
	if (blockedUsers[u] == ytUser) removeUser(blockedUsers[u], false);
      }
    }
  }
  for (var i = 0 ; i < ytAnchors.length; i++) {
    if (ytAnchors[i].href.indexOf('/user/') != -1 || ytAnchors[i].href.indexOf('/channel/') != -1) {
      ytUser = ytAnchors[i].href.replace(/.*\/(user|channel)\//, "");
      ytUsers[i] = ytUser;
      ytURL = 'http://youtube.com/channel/' + ytUser;
      ytText = getMyContentGM(ytURL);
      ytUser = ytText.match('rel=\"canonical\"\\s+href=\"http?://www.youtube.com/user/(.*?)"');
      ytUser = (ytUser) ? ytUser[1] : null;
      sbText = "";
      if (ytUser) {
	sbURL = 'http://socialblade.com/youtube/user/' + ytUser;
	sbText = getMyContentGM(sbURL);
      }
      sbClaimed = sbText.match(/Claimed\s+By:[\s\S]*?<span.*?>(.*?)<\/span>/);
      if (sbClaimed) {
	ytPartner = (sbClaimed[1] == 'None') ? false : true;
      }
      else {
	ytPartner = false;
      }
      if (ytPartner) {
	ytMess = ' (P) >>> <a href="' + sbURL + '" target="_blank">SocialBlade<a>';
      }
      else {
	ytMess = ' (NP) >>> <a href="' + sbURL + '" target="_blank">SocialBlade<a>';
      }
      sbURL = 'http://socialblade.com/youtube/user/' + ytUser + '/monthly';
      sbText = getMyContentGM(sbURL);
      ytViews = sbText.match(/Daily\s+Averages([\s\S]*?)Last\s+30\s+Days/);
      if (ytViews) {
	ytViews = ytViews[1].match(/>(\+|-).*<\/span>/g);
	if (ytViews && ytViews[1]) {
	  ytMess += ' ' + ytViews[1].replace(/^>/, '').replace(/<.*$/, '');
	}
      }
      ytRemove[i] = document.createElement('button');
      ytRemove[i].innerHTML = 'X';
      ytRemove[i].style = 'background-color:red;color:white;font-weight:bold;width:15px;height:15px;cursor:pointer;border-radius:20px;';
      setMyListener(i);
      ytAnchors[i].parentNode.innerHTML += ytMess + '  ';
      ytAnchors[i].parentNode.appendChild(ytRemove[i]);
    }
  }
}


})();
