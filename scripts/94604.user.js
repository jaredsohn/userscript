// ==UserScript==
// @name           Follower Count
// @namespace      com.salesforce.greasemonkey
// @description    Changes follower counts on profile page
// @include        https://na10.salesforce.com/_ui/core/userprofile/UserProfilePage*
// ==/UserScript==

var followersLink = document.getElementById("moreFollowersLink");
followersLink.innerHTML = "Show More (285,492)";

var followingLink = document.getElementById("showFollowingLink");
followingLink.innerHTML = "Show More (413)";