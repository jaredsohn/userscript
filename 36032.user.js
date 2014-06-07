// ==UserScript==
// @name          Lift Guest Viewing Limit (vBulletin)
// @namespace     http://userscripts.org/scripts/show/36032
// @description   Remove the viewing limit for guest/unregistered users imposed by the LGV addon of vBulletin forum software
// @include       http://*/showthread.php?*
// @include       http://*/showpost.php?*
// @grant         none
// @updateURL     https://userscripts.org/scripts/source/36032.meta.js
// @version       2012.9.22
// ==/UserScript==

// The script is wrapped in an anonymous function
(function() {

// Extends the String object with a trim funcion if it's not implemented natively in String.prototype (Javascript 1.8.1 addition)
if (typeof String.prototype.trim !== "function") {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	};
}

// Deletes the cookie with the passed name. The path and domain parameters are also specified if passed
function deleteCookie(cookieName, cookiePath, cookieDomain) {
	document.cookie = cookieName + "=; max-age=0" + ((cookiePath) ? "; path=" + cookiePath : "") + ((cookieDomain) ? "; domain=" + cookieDomain : "");
}

// Eliminates the cookie with the passed name, regardless of the path and domain used to set it
function destroyCookie(cookieName) {

	// Extracts the superdomain of the current host (with a leading dot, "www.example.com" --> ".example.com")
	var cookieSuperDomain = window.location.hostname.indexOf(".");
	cookieSuperDomain = (cookieSuperDomain != -1) ? window.location.hostname.substr(cookieSuperDomain) : null;

	// Tries to delete the cookie calling deleteCookie with different combinations of path and domain
	deleteCookie(cookieName); // Path = current path, Domain = current host
	deleteCookie(cookieName, "/"); // Path = /; Domain = current host
	deleteCookie(cookieName, null, cookieSuperDomain); // Path = current path; Domain = superdomain
	deleteCookie(cookieName, "/", cookieSuperDomain);	// Path = /; Domain = superdomain

}

// Enumerates all the cookies which apply to the current document
// Returns null if there isn't any applicable cookie
function enumerateCookies() {

	// Separates the cookie string into an array
	var arrCookies = document.cookie.split(";");
	if (arrCookies[0] === "") return null;

	// Returns the trimmed array of cookies
	return arrCookies.map(function(s) {return s.trim();});

}

// Enumerates all the cookies to test if one that follows the name pattern is present
// If it is, deletes it
var allCookies = enumerateCookies();
if (allCookies === null) return;

allCookies.forEach(function(s) {
	var nameMatch = s.match(/^([^=]*userlgv)=\d+/i);
	if (nameMatch !== null) destroyCookie(nameMatch[1]);
});

})();