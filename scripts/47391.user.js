// ==UserScript==
// @name            BBC Posting Tools II
// @author          Luke Bonaccorsi AKA SpeedySurfer
// @contributor		CAVX +
// @contributor		Sprool ++
// @contributor		paulmarv  +++
// @contributor		647 - BBC Tools Integration ++++ 
// @description     This script adds Tools for the Bungie BBC Script
// @license         Creative Commons Attribution License
// @version	        0.9
// @include         http://*bungie.net/Forums/createpost.aspx*
// @include			http://*bungie.net/fanclub/*/Forums/createpost.aspx*
// @include			http://*bungie.net/account/profile.aspx?uid=*&page=PostMsg
// @include			http://*bungie.net/Account/Profile.aspx?msgID=*&act=reply*
// @include			http://*bungie.net/Account/Profile.aspx?postID=*&act=msg
// @include			http://*.bungie.net/fanclub/btvn/Group/GroupHome.aspx
// @released        23-04-2009
// @compatible      Greasemonkey
// ==/UserScript==

/*
 * This file is a Greasemonkey user script. To install it, you need
 * the Firefox plugin "Greasemonkey" (URL: http://greasemonkey.mozdev.org/)
 * After you installed the extension, restart Firefox and revisit
 * this script. Now you will see a new menu item "Install User Script"
 * in your tools menu.
 *
 * To uninstall this script, go to your "Tools" menu and select
 * "Manage User Scripts", then select this script from the list
 * and click uninstall :-)
 *
 * Creative Commons Attribution License (--> or Public Domain)
 * http://creativecommons.org/licenses/by/2.5/
*/
function addFormatting()
{
var divArray = document.getElementsByTagName("div");
for (var j = 0; j<divArray.length; j++)
{
if(divArray[j].getAttribute("class") == "list-c" || divArray[j].getAttribute("class") == "list-b" )
{
if(divArray[j].getAttribute("class") == "list-c")
{
	msgBox="ctl00_mainContent_postForm_skin_body";
}else{
	msgBox="ctl00_mainContent_messageForm_skin_body";
}
divArray[j].innerHTML = divArray[j].innerHTML.replace(/<div class=.formgroup3.>/i,"<div class=\"formgroup1\"><div style=\"position:relative; z-index: 5; width: 250px;\">&nbsp;&nbsp;\
</div><div align=\"left\" style=\"position:relative; width:100%; left:0px; top:-10px;\">\
<input type=\"button\" name=\"block\" id=\"advanced2button\" value=\"Open BBC Tools\" onClick=\"advanced2div=document.getElementById('advanced2'); advanced2button=document.getElementById('advanced2button'); newname=advanced2div.style['display'];advanced2div.style['display']=advanced2button.name; advanced2button.name=newname; if(advanced2button.value=='Open BBC Tools'){advanced2button.value='Close BBC Tools'}else{advanced2button.value='Open BBC Tools'}\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('advanced2button'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('advanced2button'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\"></div>\
<div id=\"advanced2\" style=\"display:none\"><br />Insert Forum Link:&nbsp;&nbsp\
<select name=\"FLink\" id=\"FLink\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=105242]The Halo 3 Forum[/url]\">Halo 3 Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=3]The Community Forum[/url]\">Community Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=1]The Underground Forum[/url]\">Underground Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=10]The Flood Forum[/url]\">Flood Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=4]The Gallery Forum[/url]\">Gallery Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=9]The Classifieds Forum[/url]\">Classifieds Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=5576]The Optimatch Playlist Forum[/url]\">Optimatch Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=6]The Halo 2 Forum[/url]\">Halo 2 Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=2]The Halo 1 & 2 PC Forum[/url]\">Halo 1 & 2 PC Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=7]The Halo CE Forum[/url]\">Halo CE Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=5]The News Forum[/url]\">News Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=8]The Voting Booth[/url]\">Voting Booth</option>\
</select>&nbsp;&nbsp;\
<input type=\"button\" id=\"insertbutton2\" onClick=\"thisButton=document.getElementById('insertbutton2');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('FLink').options[document.getElementById('FLink').selectedIndex].value; textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"Insert Link\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertbutton2'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertbutton2'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" /><br /><br />\
Insert Smilies:&nbsp;&nbsp;\
<select name=\"Smilielist\" id=\"Smilies\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
<option value=\":)\">Normal Smile :)</option>\
<option value=\":D\">Big Smile :D</option>\
<option value=\":P\">Tounge :P</option>\
<option value=\":(\">Sad :(</option>\
<option value=\">:(\">Mad >:(</option>\
<option value=\"XD\">Laugh Hard XD</option>\
<option value=\":'(\">Sad Cry :'(</option>\
<option value=\":O\">Shocked :O</option>\
<option value=\":-V\">Talk :-V</option>\
<option value=\":-X\">Kiss :-X</option>\
<option value=\"@>:---\">Rose @>:---</option>\
</select>&nbsp;&nbsp;\
<input type=\"button\" id=\"insertsmilebutton\" onClick=\"thisButton=document.getElementById('insertsmilebutton');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('Smilies').options[document.getElementById('Smilies').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"Insert Smilie\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertsmilebutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertsmilebutton'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" /><br /><br />\
Insert Special Item:&nbsp;&nbsp;\
<select id=\"Special\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
<option value=\"[quote][/quote]\">Quote Break</option>\
<option value=\"[b]¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦¦[/b]\">Blob Line</option>\
<option value=\"[b][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][][/b]\">Block Line</option>\
<option value=\"[b]_____________________________________________________________[/b]\">Low Line</option>\
</select>\
&nbsp;&nbsp;<input type=\"button\" id=\"insertspecial\" onClick=\"thisButton=document.getElementById('insertspecial');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('Special').options[document.getElementById('Special').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"Insert\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertspecial'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertspecial'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" />\
</div></div><div class=\"formgroup3\">");
}
}
}
addFormatting();

//PRIME BASE COLORS//
//[url=http://#P34054#Blue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Black][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Grey][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Green][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Purple][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Red][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#White][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Yellow][/url]TEXT[url=http://#P34054][/url]


//EXTRA/SPECIAL COLORS//
//[url=http://#P34054#AliceBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#AntiqueWhite][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Aqua][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Aquamarine][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Beige][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Bisque][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#BlanchedAlmond][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#BlueViolet][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Brown][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#BurlyWood][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#CadetBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Chartreuse][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Chocolate][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Coral][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#CornflowerBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Cornsilk][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Crimson][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Cyan][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkCyan][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkGoldenRod][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkGray][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkGreen][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkKhaki][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkMagenta][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkOliveGreen][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Darkorange][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkOrchid][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkRed][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkSalmon][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkSeaGreen][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkSlateBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkSlateGray][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkTurquoise][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DarkViolet][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DeepPink][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DeepSkyBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DimGray][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DimGrey][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#DodgerBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#FireBrick][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#FloralWhite][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#ForestGreen][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Fuchsia][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Gainsboro][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#GhostWhite][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Gold][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#GoldenRod][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#GreenYellow][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#HoneyDew][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#HotPink][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#IndianRed][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Indigo][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Ivory][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Khaki][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Lavender][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LavenderBlush][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LawnGreen][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LemonChiffon][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LightBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LightCoral][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LightCyan][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LightGoldenRodYellow][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LightGray][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LightGreen][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LightPink][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LightSalmon][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LightSeaGreen][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LightSkyBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LightSlateGray][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LightSteelBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LightYellow][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Lime][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#LimeGreen][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Linen][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Magenta][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Maroon][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#MediumAquaMarine][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#MediumBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#MediumOrchid][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#MediumPurple][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#MediumSeaGreen][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#MediumSlateBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#MediumSpringGreen][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#MediumTurquoise][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#MediumVioletRed][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#MidnightBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#MintCream][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#MistyRose][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Moccasin][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#NavajoWhite][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Navy][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#OldLace][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Olive][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#OliveDrab][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Orange][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#OrangeRed][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Orchid][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#PaleGoldenRod][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#PaleGreen][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#PaleTurquoise][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#PaleVioletRed][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#PapayaWhip][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#PeachPuff][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Peru][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Pink][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Plum][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#PowderBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#RosyBrown][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#RoyalBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#SaddleBrown][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Salmon][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#SandyBrown][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#SeaGreen][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#SeaShell][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Sienna][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Silver][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#SkyBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#SlateBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#SlateGray][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Snow][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#SpringGreen][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#SteelBlue][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Tan][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Teal][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Thistle][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Tomato][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Turquoise][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Violet][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#Wheat][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#WhiteSmoke][/url]TEXT[url=http://#P34054][/url]
//[url=http://#P34054#YellowGreen][/url]TEXT[url=http://#P34054][/url]




