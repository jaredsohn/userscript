// ==UserScript==
// @name          Always link to full LiveJournal userinfo (new version)
// @namespace     
// @description   Modify links to LJ user info to always point to full LJ userinfo.
// @include       http://*.livejournal.com/*
// ==/UserScript==

(function(){
//	http://pla4ushiy-angel.livejournal.com/profile
// 	http://users.livejournal.com/mzk_/profile

//  var userinfoRegEx = /^(?:http:\/\/www\.livejournal\.com)?\/userinfo.bml\?user=([^&]+)/i;

  var normalLink = /^http:\/\/([^\.]+)\.livejournal\.com\/profile/i;
  var strangeLink = /^(?:http:\/\/users\.livejournal\.com)?\/([^\/]+)\/profile/i;
  var commLink = /^(?:http:\/\/community\.livejournal\.com)?\/([^\/]+)\/profile/i;


//  var userOwnPageLink = /^(?:http:\/\/www\.livejournal\.com)?\/(?:users|community)\/([^\/]+)\/profile/i;

  var l = document.getElementsByTagName("a");
  for (var cand = null, i = 0; (cand = l[i]); i++) {

    uim = normalLink.exec(cand.getAttribute('href'));

    if (uim != null) {
	cand.setAttribute('href','http://' + uim[1] + '.livejournal.com/profile?mode=full');
	continue;
      
    	}
    
	
    uim = strangeLink.exec(cand.getAttribute('href'));

    if (uim != null) {
	cand.setAttribute('href','http://users.livejournal.com/'+ uim[1] + '/profile?mode=full');
     	continue;
    	}

    uim = commLink.exec(cand.getAttribute('href'));

    if (uim != null) {
	cand.setAttribute('href','http://community.livejournal.com/'+ uim[1] + '/profile?mode=full');
     	continue;
    	}
   
  }
})();
