// ==UserScript==
// @name NotAlwaysClean
// @namespace DalekSec Userscripts
// @version 3.1
// @description	Remove extra stuff from NotAlwaysRight, NotAlwaysWorking, NotAlwaysLearning, NotAlwaysRelated and NotAlwaysRomantic, leaving just the content and the page switcher. 
// @include /https?://(www\.)?notalways(right|working|learning|related|romantic|friendly)\.com/.*/
// ==/UserScript==
var mainContent = document.getElementsByClassName("container_content")[0]; // The main content
var pageNavigation = document.getElementsByClassName("wp-pagenavi")[0]; // The page switcher
var navButtons = document.getElementById("ad_desktop_wrapper_right"); // The add story and random story buttons.
document.body.innerHTML = ''; // Strip away everything.
// Now tweak the buttons, make them less noticable, basically - turn them into links.
var navButton_random = navButtons.getElementsByTagName("a")[0];
var navButton_add = navButtons.getElementsByTagName("a")[1];
navButton_random.innerHTML = 'Random story<br>';
navButton_add.innerHTML = 'Add story<br>';
// Make a link to the homepage.
var homelink = document.createElement("a");
homelink.href = "/";
homelink.innerHTML = 'Home<br>';
// Now add the useful elements back in.
document.body.appendChild(homelink);
document.body.appendChild(navButton_random);
document.body.appendChild(navButton_add);
document.body.appendChild(mainContent);
// The page switcher isn't present on some pages. To avoid this breaking further code, need to check if it actually exists.
if(pageNavigation !== undefined) { document.body.appendChild(pageNavigation); }
// Add related sites to the bottom.
var related_sites = ["NotAlwaysRight", "NotAlwaysWorking", "NotAlwaysLearning", "NotAlwaysRelated", "NotAlwaysRomantic", "NotAlwaysFriendly"];
var i;
var link_div = document.createElement("div");
link_div.style.width = "100%";
link_div.style.marginTop = "50px";
for(i = 0; i < related_sites.length; i++) {
    var related_link = document.createElement("a");
    related_link.href = "//"+related_sites[i]+".com";
    related_link.innerHTML = related_sites[i]+"<br>";
    link_div.appendChild(related_link);
}
document.body.appendChild(link_div);
// Strip the social sharing buttons from the stories.
var social_stuff = document.getElementsByClassName("post_social");
for(i = 0; i < social_stuff.length; i++) { social_stuff[i].innerHTML = ''; }