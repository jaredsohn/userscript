// ==UserScript==
// @name	LiveJournal Adult Content
// @author	WCityMike
// @description	This script clicks past the "Adult Content Notice" screen on LiveJournal you can be presented with if you're not logged in.  It is a hack of Redux's script for a MySpace friends button.
// @include	http://community.livejournal.com/*
// @include	http://www.livejournal.com/*

// ==/UserScript==

document.getElementsByName("adult_check")[0].click()

})();
