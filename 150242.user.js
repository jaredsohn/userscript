// ==UserScript==
// @name         Facebook Text-Based Emoticons
// @version      1.0
// @author       Bogdan Zarchievici
// @e-mail       bogdan.zarchievici@gmail.com
// @description  Removes all graphic emoticons on Facebook and restores the text-based smilies.
// ==/UserScript==
function text_based_emoticons()
{
	var text_based_emoticons=document.querySelectorAll('.emote_text');
	var graphic_emoticons=document.querySelectorAll(".emote_img");
	for (i=0; i<graphic_emoticons.length; i++) graphic_emoticons[i].style.display='none';
	for (i=0; i<text_based_emoticons.length; i++) text_based_emoticons[i].style.display='inline';
}
window.onload=function()
{
	setInterval(text_based_emoticons,1000);
}