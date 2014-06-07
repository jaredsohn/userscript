// ==UserScript==
// @id             FurAffinity_Watchlist_popup
// @name           FurAffinity Watchlist popup
// @version        1.0
// @updateURL	   http://userscripts.org/scripts/source/166371.meta.js
// @downloadURL    http://userscripts.org/scripts/source/166371.user.js
// @namespace      FurAffinity Watchlist popup
// @author         Michael Ooms
// @description    Changes the link to the watchlist to a popup screen
// @include        http://www.furaffinity.net/user/*/
// @run-at         document-end
// ==/UserScript==

//get the list of elements with the "cat" tag, this is used by the buddylist url's
var elementList = document.getElementsByClassName("cat");


//save the url to a variable for the event handler since the 7th element contains the watched list url
var watchedURL = elementList[7].firstChild.href;
//change the href to a # to ensure that no page leaves occur
elementList[7].firstChild.href="#";
//Add an event listener to make sure that the popup code is properly executed
elementList[7].addEventListener('click', function (e) {
	popupWindow = window.open(watchedURL,'popUpWindow','height=600,width=200,left=200,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
    e.preventDefault();
    return false;
});

//see the comments above, it's the same code but now for the 9th element, the watching list

var watchingURL = elementList[9].firstChild.href;
elementList[9].firstChild.href="#";
elementList[9].addEventListener('click', function (e) {
	popupWindow = window.open(watchingURL,'popUpWindow','height=600,width=200,left=200,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
    e.preventDefault();
    return false;
});