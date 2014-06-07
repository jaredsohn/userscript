// ==UserScript== 
// @name           flickr block adult content 2
// @namespace      pratikpoddar@delicious
// @description    Want to monitor and restrict the pictures your child sees on Flickr (which is unmonitored) 
// @include        http://www.flickr.com/photos/*/*
// ==/UserScript==

tobematched = document.getElementById("DiscussPhoto").innerHTML.toLowerCase()
if(tobematched.match("sexy") || tobematched.match("nude") || tobematched.match("porn") || tobematched.match("fuck"))
{
document.getElementById("photoswftd").style.display = "none";
document.getElementById("Photo").innerHTML = "<font size=\"2\">[Image blocked]</font>" + document.getElementById("Photo").innerHTML;
}