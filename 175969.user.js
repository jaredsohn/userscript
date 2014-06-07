// ==UserScript==
// @name       Deviation Logo Change
// @version    1.0
// @description  This userscript will change the 'DiscussionZone' header, to the 'Deviation' logo when you are in our subforum.
// @match      http://www.discussionzone.net/forumdisplay.php?fid=271
// @copyright  2013, Fhoto
// ==/UserScript==

var images = document.getElementsByTagName ("img");
var x=0;
while(x<images.length)
{
if(images[x].src == "http://www.discussionzone.net/images/dzt/logo.png")
{
images[x].src = "http://i.imgur.com/mtlJYvX.png";
}
x=x+1;
}