// ==UserScript==
// @name          Always link to full JournalFen userinfo (new version)
// @namespace     
// @description   Modify links to JF user info to always point to full JF userinfo.
// @include       http://www.journalfen.net/*
// ==/UserScript==

(function(){
//	http://pla4ushiy-angel.livejournal.com/profile
//	http://www.journalfen.net/userinfo.bml?user=adbaculum

//  var userinfoRegEx = /^(?:http:\/\/www\.journalfen\.net)?\/userinfo.bml\?user=([^&]+)/i;

  var normalLink = /^(?:http:\/\/www\.journalfen\.net)?\/userinfo.bml\?user=([^&]+)/i;

// http://www.journalfen.net/userinfo.bml?user=bad_penny&mode=full

//  var userOwnPageLink = /^(?:http:\/\/www\.journalfen\.net)?\/(?:users|community)\/([^\/]+)\/profile/i;

  var l = document.getElementsByTagName("a");
  for (var cand = null, i = 0; (cand = l[i]); i++) {

    uim = normalLink.exec(cand.getAttribute('href'));

    if (uim != null) {
	cand.setAttribute('href','http://' + 'www' + '.journalfen.net/userinfo.bml?user=' + uim[1] + '&mode=full');
	continue;
      
    	}
    
	   
  }
})();
