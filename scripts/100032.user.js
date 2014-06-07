// ==UserScript==
// @name Whom to Follow
// @include     http://twitter.com/* 
// @include     https://twitter.com/* 
// ==/UserScript==

function correct(elem) {
  elem.textContent =
      elem.textContent.replace(/(who)(\s(to|you)\sfollow)/gi, '$1m$2');
}

// Global Top Navigation
var interval0 = setInterval(function() {
  var globalNavWhoToFollow =
      document.getElementById('global-nav-who_to_follow');
  if (globalNavWhoToFollow) {
    globalNavWhoToFollow = globalNavWhoToFollow.firstChild;  
    if (/who to follow/i.test(globalNavWhoToFollow.textContent)) {
      correct(globalNavWhoToFollow);
      clearInterval(interval0);
    }      
  }    
}, 500);

// Righthand Navigation
var interval1 = setInterval(function() {
  var rightNavWhoToFollow =
      document.getElementsByClassName('dashboard-component-title');
  for (var i = 0, length = rightNavWhoToFollow.length; i < length; i++) {
    var whoToFollow = rightNavWhoToFollow[i];
    if (/who to follow/i.test(whoToFollow.textContent)) {
      correct(whoToFollow);
      clearInterval(interval1);
      break;
    }
  }  
}, 500);

// Who to follow section
var interval3 = setInterval(function() {
  if ((window.location.hash === '#!/who_to_follow/suggestions') ||
      (window.location.hash === '#!/who_to_follow')) {
    var interval2 = setInterval(function() {
      var whoToFollowDiv =
          document.getElementsByClassName('who-to-follow-header');
      if (whoToFollowDiv) {
        var whoToFollowHeader = whoToFollowDiv[0].getElementsByTagName('H1')[0];
        correct(whoToFollowHeader);
        clearInterval(interval2);  
      }
      var streamTitleDiv = document.getElementsByClassName('stream-title');
      if (streamTitleDiv) {
        var streamTitleHeader = streamTitleDiv[0].getElementsByTagName('H2')[0];
        console.log(streamTitleHeader);
        correct(streamTitleHeader);
      }         
    }, 500);
  } else if (window.location.pathname === '/settings/account') {
    var findPeopleLink = document.getElementById('find_people_link');
    if (findPeopleLink) {
      correct(findPeopleLink);
    }
  }
}, 500);

