// ==UserScript==
// @name            Posting Tools
// @version         4.4.1.1
// @description     Designed to ease the burden of typing in BB code on Bungie.net, and to quickly insert numerous links to help users if need be
// @ new            Re-added the Resize Textfield, Save textfield, Load/Save Post buttons; minor bug fixes
// @author          Duardo & Apocalypex
// @contributor         Luke Bonaccorsi AKA SpeedySurfer
// @contributor		ApocalypeX
// @contributor		robby118
// @contributor		CAVX
// @contributor		Sprool
// @contributor		paulmarv
// @contributor 	PKF_647
// @contributor 	dazarobbo
// @thanks 	Special thanks to Michael Devore over at http://ifixscripts.wordpress.com for helping to reformat the script
// @homepage       http://www.bungie.net/Forums/posts.aspx?postID=27428424
// @license         Creative Commons Attribution License
// @include         http://*bungie.net/Forums/createpost.aspx*
// @include			http://*bungie.net/fanclub/*/Forums/createpost.aspx*
// @include			http://*bungie.net/account/profile.aspx?uid=*&page=PostMsg
// @include			http://*bungie.net/Account/Profile.aspx?msgID=*&act=reply*
// @include			http://*bungie.net/Account/Profile.aspx?postID=*&act=msg
// @released        2008-08-12
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
function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle("a#PTB{background-repeat:no-repeat;height:15px;width:17px;background-image: url(http://i37.photobucket.com/albums/e55/drew_tucker21/expandsm-1.gif);background-position: 0 0px;display:inline-block;} a#PTB:hover{background-repeat:no-repeat;height:15px;width:17px;background-image: url(http://i37.photobucket.com/albums/e55/drew_tucker21/expandsm-1.gif);background-position: 0 -15px;display:inline-block;}");
addGlobalStyle("a#MTB{background-repeat:no-repeat;height:15px;width:17px;background-image: url(http://i37.photobucket.com/albums/e55/drew_tucker21/expandsm-1.gif);background-position: 0 -30px;display:inline-block;} a#MTB:hover{background-repeat:no-repeat;height:15px;width:17px;background-image: url(http://i37.photobucket.com/albums/e55/drew_tucker21/expandsm-1.gif);background-position: 0 -45px;display:inline-block;}");
addGlobalStyle("ul.TB_Resizer li.TB_Resizer{ float: left;display: inline; list-style-type: none;}");

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
divArray[j].innerHTML = divArray[j].innerHTML.replace(/<div class=.formgroup3.>/i,"<div class=\"formgroup1\"><div style=\"position:relative; z-index: 5; width: 530px;\"><input type=\"button\" id=\"italbutton\" onClick=\"thisButton=document.getElementById('italbutton');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; if(endPos-startPos>0){thisButton.value=thisButton.value.replace('/','');extratext=textbox.value.substring(startPos, endPos)+thisButton.value.replace('[','[/')}else{extratext=''}; textbox.value = textbox.value.substring(0, startPos)+ thisButton.value +extratext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=endPos+thisButton.value.length; textbox.setSelectionRange(caretPos, caretPos); if(extratext==''){if(thisButton.value=='[i]'){thisButton.value='[/i]'}else{thisButton.value='[i]'}};\" value=\"[i]\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('italbutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('italbutton'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" />&nbsp;&nbsp;\
                                                                                                                                                                                                                                                                                     <input type=\"button\" id=\"boldbutton\" onClick=\"thisButton=document.getElementById('boldbutton');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; if(endPos-startPos>0){thisButton.value=thisButton.value.replace('/','');extratext=textbox.value.substring(startPos, endPos)+thisButton.value.replace('[','[/')}else{extratext=''};textbox.value = textbox.value.substring(0, startPos)+ thisButton.value +extratext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=endPos+thisButton.value.length; textbox.setSelectionRange(caretPos, caretPos); if(extratext==''){if(thisButton.value=='[b]'){thisButton.value='[/b]'}else{thisButton.value='[b]'}};\" value=\"[b]\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('boldbutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('boldbutton'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\"/>&nbsp;&nbsp;\
                                                                                                                                                                                                                                                                                     <input type=\"button\" id=\"underbutton\" onClick=\"thisButton=document.getElementById('underbutton');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; if(endPos-startPos>0){thisButton.value=thisButton.value.replace('/','');extratext=textbox.value.substring(startPos, endPos)+thisButton.value.replace('[','[/')}else{extratext=''};textbox.value = textbox.value.substring(0, startPos)+ thisButton.value +extratext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=endPos+thisButton.value.length; textbox.setSelectionRange(caretPos, caretPos); if(extratext==''){if(thisButton.value=='[u]'){thisButton.value='[/u]'}else{thisButton.value='[u]'}};\" value=\"[u]\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('underbutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a';thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('underbutton'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\"/>&nbsp;&nbsp;\
                                                                                                                                                                                                                                                                                     <input type=\"button\" id=\"linkbutton\" onClick=\"thisButton=document.getElementById('linkbutton');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; if(endPos-startPos>0){thisButton.value=thisButton.value.replace('/','');extratext=textbox.value.substring(startPos, endPos)+thisButton.value.replace('[','[/')}else{extratext=''};textbox.value = textbox.value.substring(0, startPos)+ thisButton.value +extratext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=endPos+thisButton.value.length; textbox.setSelectionRange(caretPos, caretPos); if(extratext==''){if(thisButton.value=='[url]'){thisButton.value='[/url]'}else{thisButton.value='[url]'}};\" value=\"[url]\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('linkbutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('linkbutton'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\"/>&nbsp;&nbsp;\
                                                                                                                                                                                                                                                                                     <input type=\"button\" id=\"namedlinkbutton\" onClick=\"thisButton=document.getElementById('namedlinkbutton');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; if(endPos-startPos>0){thisButton.value=thisButton.value.replace('/','');extratext=textbox.value.substring(startPos, endPos)+thisButton.value.replace('[url=LINK]','[/url]')}else{extratext=''};textbox.value = textbox.value.substring(0, startPos)+ thisButton.value +extratext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=endPos+thisButton.value.length; textbox.setSelectionRange(caretPos, caretPos); if(extratext==''){if(thisButton.value=='[/url]'){thisButton.value='[url=LINK]'}else{thisButton.value='[/url]'}};\" value=\"[url=LINK]\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('namedlinkbutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('namedlinkbutton'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\"/>&nbsp;&nbsp;\
                                                                                                                                                                                                                                                                                     <input type=\"button\" id=\"quotebutton\" onClick=\"thisButton=document.getElementById('quotebutton');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; if(endPos-startPos>0){thisButton.value=thisButton.value.replace('/','');extratext=textbox.value.substring(startPos, endPos)+thisButton.value.replace('[','[/')}else{extratext=''};textbox.value = textbox.value.substring(0, startPos)+ thisButton.value +extratext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=endPos+thisButton.value.length; textbox.setSelectionRange(caretPos, caretPos); if(extratext==''){if(thisButton.value=='[quote]'){thisButton.value='[/quote]'}else{thisButton.value='[quote]'}};\" value=\"[quote]\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('quotebutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('quotebutton'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" />&nbsp;&nbsp;|&nbsp;\
                                                                                                                                                                                                                                                                                     <input type=\"button\" id=\"youtubebutton\" onClick=\"search = window.prompt('Youtube Search - Please enter what you wish the link to search for','');if(search!=''){url=encodeURIComponent(search); url=url.replace('%20','+'); var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext= '[url=http://search.yahoo.com/web?fr='+url+']Youtube Results: '+search+'[/url]';textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos);}\" value=\"     \" style=\"background: url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/Scripts/youtube.jpg) no-repeat 0px -1px; width: 32px; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('youtubebutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/Scripts/youtube.jpg) no-repeat 0px -19px'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('youtubebutton'); thisButton.style['background']='url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/Scripts/youtube.jpg) no-repeat 0px -1px'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\"/>&nbsp;\
                                                                                                                                                                                                                                                                                     <input type=\"button\" id=\"googlebutton\" onClick=\"search = window.prompt('Google Search - Please enter what you wish the link to search for','');if(search!=''){url=encodeURIComponent(search); url=url.replace('%20','+'); var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext= '[url=http://search.yahoo.com/web?fr='+url+']Google Results: '+search+'[/url]';textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos);}\" value=\"     \" style=\"background: url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/Scripts/google.jpg) no-repeat 0px -1px; width: 30px; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('googlebutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/Scripts/google.jpg) no-repeat 0px -18px'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('googlebutton'); thisButton.style['background']='url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/Scripts/google.jpg) no-repeat 0px -1px'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\"/>&nbsp;\
                                                                                                                                                                                                                                                                                     <input type=\"button\" id=\"yahoobutton\" onClick=\"search = window.prompt('Yahoo! Search - Please enter what you wish the link to search for','');if(search!=''){url=encodeURIComponent(search); url=url.replace('%20','+'); var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext= '[url=http://search.yahoo.com/web?fr='+url+']Yahoo! Results: '+search+'[/url]';textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos);}\" value=\"     \" style=\"background: url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/Scripts/yahoo.jpg) no-repeat 0px -1px; width: 32px; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('yahoobutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/Scripts/yahoo.jpg) no-repeat 0px -19px'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('yahoobutton'); thisButton.style['background']='url(http://i37.photobucket.com/albums/e55/drew_tucker21/bungie/Scripts/yahoo.jpg) no-repeat 0px -1px'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\"/>&nbsp;&nbsp;|&nbsp;\
                                                                                                                                                                                                                                                                                     <input type=\"button\" id=\"spoilerbutton\" onClick=\"spoiler = window.prompt('Enter the text you wish to be hidden, and only display when quoted - Found by BahamutZER0','');if(spoiler!=''){url=encodeURIComponent(spoiler); url=url.replace('%20','+'); var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext='[spoilers][url=http:// '+spoiler+'][/url][/spoilers]';textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos);}\" value=\"spoiler\" style=\"background:#1b1d1f; color:#a82422; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('spoilerbutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('spoilerbutton'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a82422'\"/>\
                                                                                                                                                                                                                                                                                     </div><div align=\"right\" style=\"position:relative; width:545px; left:-445px; top:49px;\">\
<input type=\"button\" name=\"block\" id=\"advancedbutton\" value=\"+\" onClick=\"advanceddiv=document.getElementById('advanced'); advancedbutton=document.getElementById('advancedbutton'); newname=advanceddiv.style['display'];advanceddiv.style['display']=advancedbutton.name; advancedbutton.name=newname; if(advancedbutton.value=='+'){advancedbutton.value='-'}else{advancedbutton.value='+'}\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('advancedbutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('advancedbutton'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\"></div>\
<select name=\"Forumlist\" id=\"Forumlist\" style=\"background:#a3a3a4; width: 100px;color:#1b1d1f; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
                                                                                                                                                                                                                                                                                     <option value=\"[url=http://www.bungie.net/Forums/default.aspx]All Forums[/url]\">Forum Links</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=1]Bungie Universe Forum[/url]\">Bungie Universe</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=3]Community Forum[/url]\">Community Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=304365]Halo: Reach  Forum[/url]\">Halo: Reach</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=304364]Halo 3: ODST Forum[/url]\">Halo 3: ODST</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=105242]Halo 3 Forum[/url]\">Halo 3 Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=5576]Optimatch Forum[/url]\">Optimatch Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=10]The Flood Forum[/url]\">The Flood</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=6]Halo 2 Forum[/url]\">Halo 2 Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=2]Halo PC Forum[/url]\">Halo PC Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=7]Halo 1 Forum[/url]\">Halo 1 Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=4]The Gallery Forum[/url]\">The Gallery</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=5]The News Forum[/url]\">News Forum</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=8]The Voting Booth[/url]\">Voting Booth</option>\
<option value=\"[url=http://www.bungie.net/Forums/topics.aspx?forumID=9]The Classifieds[/url]\">The Classifieds</option>\
</select>&nbsp;\
                                                                                                                                                                                                                                                                                     <input type=\"button\" id=\"insertbutton\" onClick=\"thisButton=document.getElementById('insertbutton');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('Forumlist').options[document.getElementById('Forumlist').selectedIndex].value; textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"background:#a3a3a4; color:#1b1d1f; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertbutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertbutton'); thisButton.style['background']='#a3a3a4'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#1b1d1f'\" />\
                                                                                                                                                                                                                                                                                     &nbsp;&nbsp;&nbsp;<select name=\"pmlist\" id=\"pmlist\" style=\"background:#a3a3a4; color:#1b1d1f; width: 100px; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
                                                                                                                                                                                                                                                                                     <option value=\"[url=http://www.bungie.net/fanclub/hfcs/Group/GroupMembers.aspx]List of Forum Ninjas[/url]\" selected>Ninjas</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=1&page=PostMsg]Achronos[/url]\">Achronos</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=23581&page=PostMsg]Anton P Nym[/url]\">Anton P Nym</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=40153&page=PostMsg]ash55[/url]\">ash55</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=2488&page=PostMsg]BobBQ[/url]\">BobBQ</option>\
<option value=\"[url=http://www.bungie.net/account/profile.aspx?uid=2597260&page=PostMsg]bobcast[/url]\">bobcast</option>\
<option value=\"[url=http://www.bungie.net/account/profile.aspx?uid=596146&page=PostMsg]borrowedchief[/url]\">borrowedchief</option>\
<option value=\"[url=http://www.bungie.net/account/profile.aspx?uid=1083656&page=PostMsg]Butane123[/url]\">Butane123</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=29832&page=PostMsg]Captain K Mart[/url]\">Captain K Mart</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=184&page=PostMsg]chris547[/url]\">chris547</option>\
<option value=\"[url=http://www.bungie.net/account/profile.aspx?uid=2789359&page=PostMsg]dazarobbo[/url]\">dazarobbo</option>\
<option value=\"[url=http://www.bungie.net/account/profile.aspx?uid=89878&page=PostMsg]dmbfan09[/url]\">dmbfan09</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?memberID=8683502&page=PostMsg]Dr Weird[/url]\">Dr Weird</option>\
<option value=\"[url=http://www.bungie.net/account/profile.aspx?uid=94371&page=PostMsg]Duardo[/url]\">Duardo</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=399968&page=PostMsg]El Roboto[/url]\">El Roboto</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=37221&page=PostMsg]GameJunkieJim[/url]\">GameJunkieJim</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=143388&page=PostMsg]Gods Prophet[/url]\">Gods Prophet</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=326&page=PostMsg]goweb[/url]\">goweb</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?memberID=1022649]Jeremiah[/url]\">Jeremiah</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=2285405&page=PostMsg]lukems[/url]\">lukems</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=6693&page=PostMsg]Nedus[/url]\">Nedus</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=38444&page=PostMsg]Nosferatu_Soldie[/url]\">Nosferatu_Soldie</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=424344&page=PostMsg]odmichael[/url]\">odmichael</option>\
<option value=\"[url=http://www.bungie.net/account/profile.aspx?uid=2935625&page=PostMsg]Old Papa Rich[/url]\">Old Papa Rich</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=2500705&page=PostMsg]Pezz[/url]\">Pezz</option>\
<option value=\"[url=http://www.bungie.net/account/profile.aspx?uid=3446359&page=PostMsg]Predator5791[/url]\">Predator5791</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=785739&page=PostMsg]Qbix89[/url]\">Qbix89</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?memberID=8675242&page=PostMsg]Recon Number 54[/url]\">Recon Number 54</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=397780&page=PostMsg]Senor Leche[/url]\">Senor Leche</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=928&page=PostMsg]Sir Fragula[/url]\">Sir Fragula</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=1195&page=PostMsg]SketchFactor[/url]\">SketchFactor</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=104&page=PostMsg]stosh[/url]\">stosh</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=350197&page=PostMsg]THE DON WAN[/url]\">THE DON WAN</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=1659344&page=PostMsg]The Slayer[/url]\">The Slayer</option>\
<option value=\"[url=http://www.bungie.net/account/profile.aspx?uid=1837598&page=PostMsg]TOM T 117[/url]\">TOM T 117</option>\
<option value=\"http://www.bungie.net/account/profile.aspx?uid=995056&page=PostMsg]True Underdog[/url]\">True Underdog</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=5559084&page=PostMsg]urk[/url]\">urk</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=1848159&page=PostMsg]x Foman123 x[/url]\">x Foman123 x</option>\
<option value=\"[url=http://www.bungie.net/account/profile.aspx?uid=1219475&page=PostMsg]x Lord Revan x[/url]\">x Lord Revan x</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?uid=3229&page=PostMsg]Yoozel[/url]\">Yoozel</option>\
</select>&nbsp;\
                                                                                                                                                                                                                                                                                     <input type=\"button\" id=\"insertpmbutton\" onClick=\"thisButton=document.getElementById('insertpmbutton');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('pmlist').options[document.getElementById('pmlist').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"background:#a3a3a4; color:#1b1d1f; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertpmbutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertpmbutton'); thisButton.style['background']='#a3a3a4'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#1b1d1f'\" />\&nbsp;\&nbsp;\|&nbsp;\
                                                                                                                                                                                                                                                                                     <input type=\"button\" id=\"forumsearchbutton\" onClick=\"search = window.prompt('Bungie.net Forum Search - Please enter what you wish the link to search for','');if(search!=''){url=encodeURIComponent(search); url=url.replace('%20','+'); var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext= '[url=http://www.bungie.net/Search/default.aspx?q='+url+'&g=4]Bungie.net Forum Search: '+search+'[/url]';textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos);}\" value=\"     \" style=\"background: url(/images/base_struct_images/search/searchbutton.gif) no-repeat -5px 0; width: 20px; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('forumsearchbutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='url(/images/base_struct_images/search/searchbutton.gif) no-repeat -5px -20px'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('forumsearchbutton'); thisButton.style['background']='url(/images/base_struct_images/search/searchbutton.gif) no-repeat -5px 0'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\"/>\
                                                                                                                                                                                                                                                                                     &nbsp;\
                                                                                                                                                                                                                                                                                     <br><br>\<u>Useful Links</u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Resize textfield: &nbsp;<a class=\"TBR\" id=\"MTB\"></a>&nbsp;&nbsp;<a class=\"TBR\" id=\"PTB\"></a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id=\"saveTBR\">Save textfield size</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a id=\"savepostbutton\">Save Post</a> | <a id=\"loadpostbutton\">Load Post</a><div id=\"advanced\" style=\"display:none\"><br><select id=\"threadlist10\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; width:60px; border-width:1px; border-style:solid;\">\
                                                                                                                                                                                                                                                                                     <option value=\"\">FAQs</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=15804986]FAQ on Bungie.net Member Titles / Prefixes / Bar Colors[/url]\">FAQ on Bungie.net Member Titles</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=29217043]FAQ: Missing an Achievement, Armor, or Other Unlockable Item? Read Here![/url]\">FAQ: Missing an Achievement, Armor, or Other Unlockable Item?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=10355399]Text Markups[/url]\">Text Markups</option>\<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=14414600]In depth explanation of the Halo 3 skill ranking system[/url]\">In depth explanation of the Halo 3 skill ranking system</option>\<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=29495424]A Guide to Bungie Favorites[/url]\">A Guide to Bungie Favorites</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=15044699]Unlinking/Linking Gamertag & Bungie.net Account by Changing WLID[/url]\">Unlinking/Linking Gamertag & Bungie.net Account by Changing WLID</option>\<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=30444661]FAQ on Extended Unicode[/url]\">FAQ on Extended Unicode</option>\<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33409272]Halo 3: ODST Community FAQ[/url]\">Halo 3: ODST Community FAQ</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=22458707]MJOLNIR Armor for XBL: Protecting Your XBox Live Account Against Thieves[/url]\">MJOLNIR Armor for XBL: Protecting Your XBL Account</option>\<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=12858741]Opening NAT for Dummies - Pimp Out Your XBox Live for Halo 3![/url]\">Opening NAT for Dummies - Pimp Out XBL for Halo 3</option>\<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=31824845]Threads of Interest! FAQs, Tips, Guides, & Tricks[/url]\">Threads of Interest! FAQs, Tips, Guides, & Tricks</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=27197879]Pre-Xbox Halo: The Definitive Thread[/url]\">Pre-Xbox Halo: The Definitive Thread</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=26159253]Maps/Campaign fails to load / My maps aren't appearing[/url]\">Maps/Campaign fails to load / My maps aren't appearing</option>\<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=31259385]Halo 3 Tricks, Tips, Strategies, and Guides[/url]\">H3 Tips, Tricks, Strategies, Guides</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=27779298]The Recon Question[/url]\">The Recon Question</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=23577718]How to: make weapons float for Screenshots. A Tutorial[/url]\">How to: make weapons float for Screenshots</option>\<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=28153421]New armour permutations WILL NOT be added to Halo 3/Halo 3: ODST[/url]\">New armour permutations WILL NOT be added to Halo 3/Halo 3: ODST</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=14414600]In depth explanation of the Halo 3 skill ranking system[/url]\">In depth explanation of the Halo 3 skill ranking system</option>\<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=21070598]How To Get UnHacked-101[/url]\">How To Get UnHacked-101</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=28614709]If your having problems with being able to play Halo 2 online look here[/url]\">If your having problems with being able to play Halo 2 online</option>\<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=12051740]Halo PC: READ THIS BEFORE POSTING ABOUT TECH ISSUES!!![/url]\">Halo PC: READ THIS BEFORE POSTING ABOUT TECH ISSUES!!!</option>\</select>\
                                                                                                                                                                                                                                                                                     &nbsp;<input type=\"button\" id=\"insertthreadbutton10\" onClick=\"thisButton=document.getElementById('insertthreadbutton10');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('threadlist10').options[document.getElementById('threadlist10').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertthreadbutton10'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertthreadbutton10'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" />\
&nbsp;&nbsp;|&nbsp;&nbsp;\
<select id=\"threadlist7\" style=\"background:#1b1d1f; color:#a3a3a4; width:300px; width:90px; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
                                                                                                                                                                                                                                                                                     <option value=\"\">Bungie Links</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungiestore.com/]Bungie Store[/url]\">Bungie Store</option>\
<option value=\"[url=http://www.bungie.net/help/code_of_conduct.aspx]Code of Conduct[/url]\">Code of Conduct</option>\
<option value=\"[url=http://www.bungie.net/News/Blog.aspx]Comm Chatter[/url]\">Comm Chatter</option>\
<option value=\"[url=http://www.bungie.net/Online/CommunityFiles.aspx]Community Files[/url]\">Community Files</option>\
<option value=\"[url=http://www.bungie.net/help/contact_us.aspx]Contact Us[/url]\">Contact Us</option>\
<option value=\"[url=http://www.bungie.net/Help/content.aspx?link=bungienet_help]Bungie.net FAQ[/url]\">FAQ</option>\
<option value=\"[url=http://www.bungie.net/Community/GroupSearch.aspx]Group Search[/url]\">Group Search</option>\<option value=\"[url=http://www.bungie.net/Help/default.aspx]Bungie.net Help[/url]\">Help</option>\<option value=\"[url=http://www.bungie.net/Inside/history.aspx]Bungie.net History[/url]\">History</option>\<option value=\"[url=http://www.bungie.net/Inside/jobs.aspx]Bungie Jobs[/url]\">Jobs</option>\<option value=\"[url=http://www.bungie.net/online/playlists.aspx]Matchmaking Playlists[/url]\">Matchmaking Playlists</option>\<option value=\"[url=http://www.bungie.net/News/Media.aspx?age_verify=0]Media Player[/url]\">Media Player</option>\
<option value=\"url=http://www.bungie.net/Inside/teamindex.aspx]Meet the Team[/url]\">Meet the Team</option>\
<option value=\"[url=http://www.bungie.net/Community/PeopleFinder.aspx]People Finder[/url]\">People Finder</option>\
<option value=\"[url=http://www.bungie.net/Inside/content.aspx?link=bungiepodcasttime]Podcast[/url]\">Podcast</option>\
<option value=\"[url=http://www.bungie.net/Projects/default.aspx]Projects[/url]\">Projects</option>\
<option value=\"[url=http://www.bungie.net/Inside/publications.aspx]Publications[/url]\">Publications</option>\
<option value=\"[url=http://www.bungie.net/help/terms_of_use.aspx]Terms of Use[/url]\">Terms of Use</option>\
<option value=\"[url=http://www.bungie.net/News/Blog.aspx?filter=topnews]Top News[/url]\">Top News</option>\
<option value=\"[url=http://www.bungie.net/help/bungiemarks.aspx]Trademarks[/url]\">Trademarks</option>\
<option value=\"[url=http://www.bungie.net/Inside/webcam.aspx]Webcams[/url]\">Webcams</option>\
</select>\
&nbsp;&nbsp;<input type=\"button\" id=\"insertthreadbutton7\" onClick=\"thisButton=document.getElementById('insertthreadbutton7');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('threadlist7').options[document.getElementById('threadlist7').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertthreadbutton7'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertthreadbutton7'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\"  />\
&nbsp;&nbsp;|&nbsp;\
&nbsp;<select id=\"threadlist12\" style=\"background:#1b1d1f; color:#a3a3a4; width:60px; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
                                                                                                                                                                                                                                                                                     <option value=\"\">Profile</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/stats/halo3/fileshare.aspx]Halo 3 File Share[/url]\">Halo 3 File Share</option>\
<option value=\"[url=http://www.bungie.net/Stats/Reach/FileShare.aspx]Halo Reach File Share[/url]\">Halo Reach File Share</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx?page=Chapters]Groups[/url]\">Groups</option>\
<option value=\"[url=http://www.bungie.net/Account/Profile.aspx]Profile[/url]\">Profile</option>\
<option value=\"[url=http://www.bungie.net/Forums/MyTopics.aspx]Saved Threads[/url]\">Saved Threads</option>\
<option value=\"[url=http://www.bungie.net/stats/halo3/default.aspx]Service Record[/url]\">Service Record</option>\
<option value=\"[url=http://www.bungie.net/Account/Settings.aspx?page=avatar]Settings[/url]\">Settings</option>\
</select>&nbsp;&nbsp;<input type=\"button\" id=\"insertthreadbutton11\" onClick=\"thisButton=document.getElementById('insertthreadbutton11');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('threadlist11').options[document.getElementById('threadlist11').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertthreadbutton11'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertthreadbutton11'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" />\
<br /><br />\
<select id=\"threadlist\" style=\"background:#1b1d1f; color:#a3a3a4; width:78px; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
                                                                                                                                                                                                                                                                                     <option value=\"\">H3 Forum</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=27308695]Halo 3 Forum Rules + Threads of Interest[/url]\">HALO 3 FORUM RULES</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=25791027]Air Superiority: Advanced Banshee Techniques[/url]\">Air Superiority: Advanced Banshee Techniques</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=20035948]BTHR Zero X's Easter Egg List[/url]\">BTHR Zero X's Easter Egg List</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=29217043]FAQ: Missing an Achievement, Armor, or Other Unlockable Item? Read Here![/url]\">FAQ: Missing an Achievement, Armor, etc?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=27405018]Halo 3 Forum - Q&A Thread[/url]\">Halo 3 Forum - Q&A Thread</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=31259385]Halo 3 Tricks, Tips, Strategies, and Guides[/url]\">H3 Tips, Tricks, Strategies, Guides</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=23577718]How to: make weapons float for Screenshots. A Tutorial[/url]\">How to: make weapons float for Screenshots</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=144146009]In depth explanation of the Halo 3 skill ranking system[/url]\">In depth explanation of the Halo 3 skill ranking system</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=22458707]MJOLNIR Armor for XBL: Protecting Your XBox Live Account Against Thieves[/url]\">MJOLNIR Armor for XBL: Protecting Your XBL Account</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=13615614]The Official and Only Halo 3 User-Created Gametypes/Maps Thread[/url]\">Official and Only Halo 3 User-Created Content Thread</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=21182116]Official Halo 3 *Mythic Difficulty* Guide (ALL SKULLS ON!!!) on HBO[/url]\">Official Halo 3 *Mythic Difficulty* Guide (ALL SKULLS ON!!!) on HBO</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=13233687]Terminal Discussion *SPOILERS*[/url]\">Terminal Discussion *SPOILERS*</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=27779298]The Recon Question[/url]\">The Recon Question</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=13615614]The Official and Only Halo 3 User-Created Gametypes/Maps Thread[/url]\">Official and Only Halo 3 User-Created Content Thread</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=22799727]The Only AR-BR Thread[/url]\">The Only Ar-BR Thread</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=26657940]The only [i]omg I gut EXP banned for NO RAISON[/i] thread[/url]\">The only OMG I gut EXP banned for NO RAISON thread</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=12858741]Opening NAT for Dummies - Pimp Out Your XBox Live for Halo 3![/url]\">Opening NAT for Dummies - Pimp Out XBL for Halo 3</option>\
</select>&nbsp;&nbsp;<input type=\"button\" id=\"insertthreadbutton\" onClick=\"thisButton=document.getElementById('insertthreadbutton');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('threadlist').options[document.getElementById('threadlist').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertthreadbutton'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertthreadbutton'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" />\
&nbsp;&nbsp;|&nbsp;&nbsp;\
<select id=\"threadlist8\" style=\"background:#1b1d1f; color:#a3a3a4; width:95px; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
                                                                                                                                                                                                                                                                                     <option value=\"\">Halo 3: ODST</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33394182]Halo 3: ODST Forum Rules[/url]\">HALO 3: ODST FORUM RULES</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33409272]Halo 3: ODST Community FAQ[/url]\">Halo 3: ODST Community FAQ</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33484820]Create an Achievement for H3:ODST[/url]\">Create an Achievement for H3:ODST</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33449151]*Official* Halo 3: ODST Video Library[/url]\">*Official* ODST Video Library</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33396129]Easter Eggs in ODST trailer[/url]\">Easter Eggs in ODST trailer</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33400269]ODST Pictures Analyzed[/url]\">ODST Pictures Analyzed</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33523722]List of all shops selling ODST (With Sgt. Johnson info)[/url]\">List of all shops selling ODST (With Sgt. Johnson info)</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33428613]Theory; Dare betrays her Squad?[/url]\">Theory: Dare betrays her Squad?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=37008469]7 Billion Grunts - Community Challenge[/url]\">7 Billion Grunts - Community Challenge</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=35867562]A Community Guide to Survival in Firefight[/url]\">A Community Guide to Survival in Firefight</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=37869115]Unlock the secrets of ODST (Glyph, canon and Egg hunting!)[/url]\">Unlock the secrets of ODST (Glyph, canon and Egg hunting!)</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=37231830]Disc Unreadable[/url]\">Disc Unreadable</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=37248279]Guide to Vidmaster Challenge: Endure (Firefight)[/url]\">Guide to Vidmaster Challenge: Endure (Firefight)</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=37475960]Little did you know, you all just played through an epic poem, hah![/url]\">Little did you know, you all just played through an epic poem, hah!</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=37562464]Glyphs and treasure hunting; the truth about the Sword in ODST[/url]\">Glyphs and treasure hunting; the truth about the Sword in ODST</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=36468885]Halo 3: Mythic Custom Box Cover[/url]\">Halo 3: Mythic Custom Box Cover</option>\
</select>\
&nbsp;&nbsp;<input type=\"button\" id=\"insertthreadbutton8\" onClick=\"thisButton=document.getElementById('insertthreadbutton8');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('threadlist8').options[document.getElementById('threadlist8').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertthreadbutton8'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertthreadbutton8'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" />\
&nbsp;&nbsp;|&nbsp;&nbsp;\
<select id=\"threadlist9\" style=\"background:#1b1d1f; color:#a3a3a4; width:87px; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
                                                                                                                                                                                                                                                                                     <option value=\"\">Halo: Reach</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33394533]Halo: Reach Forum Rules[/url]\">HALO: REACH FORUM RULES</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33563678]Blue Team in Reach. (Old Proof, thread. )[/url]\">Blue Team in Reach. (Old Proof, thread. )</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33498681]My Halo: Reach Wishlist!!! What's yours?[/url]\">My Halo: Reach Wishlist!!! What's yours?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=39626001]Info from Halo Reach first look (VGA)[/url]\">Info from Halo Reach first look (VGA)</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=39840997]The Spartan Barracks Thread[/url]\">The Spartan Barracks Thread</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=35882609]Would you like this new game mode[/url]\">Would you like this new game mode</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33407299]Halo Reach multiplayer wants and ideas[/url]\">Halo Reach multiplayer wants and ideas</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=34398298]Helmet Cameras?[/url]\">Helmet Cameras?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=37675536]Questions about the HALO: REACH BETA?[/url]\">Questions about the HALO: REACH BETA?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=40433835]Post Scans, Ask for Scans, Tell how to Get Scans = BANNED[/url]\">Post Scans, Ask for Scans, Tell how to Get Scans = BANNED</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33563678]Proof, that I know all of the spartans in the Banner. FAQ added.[/url]\">I know the spartans in the Banner!</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33407299]Halo Reach Multiplayer Wants and Needs[/url]\">Halo Reach multiplayer wants & needs</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33591471]Dear Time Travel Theorists[/url]\">Dear Time Travel Theorists</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33398698]Spartan 259?[/url]\">Spartan 259?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33426706]Halo: Reach FAQ[/url]\">Halo: Reach FAQ</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33419026]Halo: Reach - Important Information you should know before speculating[/url]\">Important info. you should know before speculating</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33395529]Did Anyone Notice...Theory[/url]\">Did Anyone Notice...Theory</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33693041]MLG Cheehwawa's Halo Reach Script[/url]\">MLG Cheehwawa's Halo Reach Script</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33592670]Problems with Halo 3's campaign that should be amended for Reach.[/url]\">Problems w/Halo 3's campaign that should be amended</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33787992]Definitive proof Halo 3 ending = Reach[/url]\">Definitive proof Halo 3 ending = Reach</option>\</select>\
&nbsp;&nbsp;<input type=\"button\" id=\"insertthreadbutton9\" onClick=\"thisButton=document.getElementById('insertthreadbutton9');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('threadlist9').options[document.getElementById('threadlist9').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertthreadbutton9'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertthreadbutton9'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" />\
&nbsp;&nbsp;|&nbsp;&nbsp;\
<select id=\"threadlist2\" style=\"background:#1b1d1f; color:#a3a3a4; width:80px; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
                                                                                                                                                                                                                                                                                     <option value=\"\">Optimatch</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=14154374]Optimatch Forum Rules[/url]\">OPTIMATCH FORUM RULES</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=36001219]B.U.N.G.L.E. Playlist[/url]\">B.U.N.G.L.E. Playlist</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=28232835]Spec-Ops, a new type of Hardcore[/url]\">Spec-Ops, a new type of Hardcore</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=34387071]Should SMGs replace Assalt Rifles as your starting weapons?[/url]\">Should SMGs replace Assalt Rifles as your starting weapons?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=20657743]Bungie Make This A Playlist[/url]\">Bungie Make This A Playlist</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=34092592]Bungie Vs World[/url]\">Bungie Vs World</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33828253]Matchmaking Population Breakdown[/url]\">Matchmaking Population Breakdown</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=35193985]Should Bungie bring back Rocket Race?[/url]\">Should Bungie bring back Rocket Race?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=15598903]Should Infection be included in the Halo 3 playlists?[/url]\">Should Infection be included in the Halo 3 playlists?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=21697584]Do you think AR starts should come with the Pistol as secondary weapon?[/url]\">AR starts with secondary pistol?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=16500765]Discuss a Snipers Only Hopper in this Thread[/url]\">Discuss a Snipers Only Hopper</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=18290158]Gametypes for Weekend Playlist Suggestion Thread[/url]\">Gametypes for Weekend Playlist Suggestion Thread</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=28095802]Halo 3 & NXE Game Installs[/url]\">Halo 3 & NXE Game Installs</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=14151166]Halo 3 Matchmaking Playlists *A guide to gametypes in each playlist*[/url]\">Halo 3 Matchmaking Playlists</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=19115885]MLG playlist discussion belongs in the MLG forums[/url]\">MLG playlist discussion belongs in MLG forums</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=15598903]Should Infection be included in the Halo 3 playlists? thread[/url]\">Should Infection be included in the Halo 3 playlists?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=30108896]Discuss Team Splits Here[/url]\">Seeing Team Splits?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=32904795]Falseskill (We Need an Understanding)[/url]\">Falseskill (We Need an Understanding)</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33139068]Removing Team Objective is a Sin[/url]\">Removing Team Objective</option>\
</select>\
&nbsp;&nbsp;<input type=\"button\" id=\"insertthreadbutton2\" onClick=\"thisButton=document.getElementById('insertthreadbutton2');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('threadlist2').options[document.getElementById('threadlist2').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertthreadbutton2'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertthreadbutton2'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" />\<br /><br />\
<select id=\"threadlist3\" style=\"background:#1b1d1f; color:#a3a3a4; width:70px; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
                                                                                                                                                                                                                                                                                     <option value=\"\">Universe</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=45305029]Bungie Universe Forum Rules[/url]\">BUNGIE UNIVERSE FORUM RULES</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33336658]Welcome to the Bungie Universe Forum - Halo Discussion Rule[/url]\">Welcome to the Bungie Universe Forum - Halo Discussion Rule</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=27842439]How do u become guyto ban people??[/url]\">How do u become guyto ban people?? Thread</option>\
<option value=\"http://www.bungie.net/Forums/posts.aspx?postID=40058407]The Marathon Trilogy - Get It! (v2.0)[/url]\">The Marathon Trilogy - Get It! (v2.0)</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=261195]How To Play Marathon On Your PC: A Detailed Guide[/url]\">How To Play Marathon On Your PC: A Detailed Guide</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=40929715]IP Formula FOUND? Bungie AI Formula: Durandal, Cortana... Joyeuse?[/url]\">IP Formula FOUND? Bungie AI Formula: Durandal, Cortana... Joyeuse?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=35949941]Halo 4, In plain sight. V 1.5 Origins update[/url]\">Halo 4, In plain sight. V 1.5 Origins update</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=37907931]The Precursor and Their Three Children[/url]\">The Precursor and Their Three Children</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=36054830]Halo as a Christian Allegory[/url]\">Halo as a Christian Allegory</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=36430414]Humanity are not Forerunners, but in fact Precursors?[/url]\">Humanity are not Forerunners, but in fact Precursors?</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=39612154]The Implications of the Reach Trailer - *TRAILER SPOILERS*[/url]\">The Implications of the Reach Trailer - *TRAILER SPOILERS*</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33630397]Guide to Canon in the Halo Universe[/url]\">Guide to Canon in the Halo Universe</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=34043045]Halo Galactic Map Index[/url]\">Halo Galactic Map Index</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=12114240]Marathon 2: Durandal Video walkthrough-ish thingy [COMPLETED][/url]\">Marathon 2: Durandal Video walkthrough-ish thingy</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=11865379]Pimps at Sea RPG! *Download it Here!*[/url]\">Pimps at Sea RPG! *Download it Here!*</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=319595]The Marathon Survival Guide: how to improve your marathon gameplay[/url]\">The Marathon Survival Guide: how to improve your gameplay</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=25491975]Arete Seven = Bungie's real name?[/url]\">Arete Seven = Bungie's real name?</option>\<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=32131658]Spartans that died through the war of halo[/url]\">Spartans that died during Halo</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=32131658]Comprehensive List and Details of the Halo Novels and Comics[/url]\">List and of the Halo Novels and Comics</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33381763]Mendicant Bias and the Great Intragalactic Scavenger Hunt[/url]\">Mendicant Bias and the Great Intragalactic Scavenger Hunt</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33340499]The Precursor, The Flood, and the Acceleration of Evolution (V2)[/url]\">The Precursor, The Flood, and the Acceleration of Evolution</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=18601742]All of you Halo 4 deniers![/url]\">All of you Halo 4 deniers!</option>\
</select>\
&nbsp;&nbsp;<input type=\"button\" id=\"insertthreadbutton3\" onClick=\"thisButton=document.getElementById('insertthreadbutton3');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('threadlist3').options[document.getElementById('threadlist3').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertthreadbutton3'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertthreadbutton3'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" />\
&nbsp;&nbsp;|&nbsp;&nbsp;\
<select id=\"threadlist4\" style=\"background:#1b1d1f; color:#a3a3a4; width:87px; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
                                                                                                                                                                                                                                                                                     <option value=\"\">Community</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=27308839]Bungie Community Forum Rules[/url]\">BUNGIE COMMUNITY FORUM RULES</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=18748346]Avatars and User Skins Thread[/url]\">Avatars and User Skins Thread</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=17065922]Bungie Webcam Thread[/url]\">Bungie Webcam Thread</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=15804986]FAQ on Bungie.net Member Titles / Prefixes / Bar Colors[/url]\">FAQ on Bungie.net Member Titles / Prefixes / Bar Colors</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=34195544]Bnet Archive of Hilarity[/url]\">Bnet Archive of Hilarity</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=10150]Introduce Yourself!! (in this thread)[/url]\">Introduce Yourself!! (in this thread)</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=16829092]Group Themes Thread[/url]\">Group Themes Thread</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=11687345]Moderator Finder :: uStalker :: Stalk the mods (and your friends)![/url]\">Moderator Finder :: uStalker</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=27428424]Script Central> All GM Scripts Here![/url]\">Script Central</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=15044699]Unlinking/Linking Gamertag & Bungie.net Account by Changing WLID[/url]\">Unlinking/Linking Gamertag & Bungie.net Account by Changing WLID</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=30444661]FAQ on Extended Characters[/url]\">FAQ on Extended Characters</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=31450175]A More Complete Compendium of a Bungie History[/url]\">More Complete Compendium of a Bungie History</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=32103528]Mod-Approved: Bungie.net IRC Chatroom[/url]\">Mod-Approved: Bungie.net IRC Chatroom</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=31282155]Bungie.net Community Projects and Resources[/url]\">Bungie.net Community Projects and Resources</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=23367743&postRepeater1-p=1]Superintendet: General Discussion[/url]\">Superintendent: General Discussion</option>\</select>\
&nbsp;&nbsp;<input type=\"button\" id=\"insertthreadbutton4\" onClick=\"thisButton=document.getElementById('insertthreadbutton4');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('threadlist4').options[document.getElementById('threadlist4').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertthreadbutton4'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertthreadbutton4'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" />\
&nbsp;&nbsp;|&nbsp;&nbsp;\
<select id=\"threadlist5\" style=\"background:#1b1d1f; color:#a3a3a4; width:80px; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
                                                                                                                                                                                                                                                                                     <option value=\"\">The Flood</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://admin.bungie.net/Forums/posts.aspx?postID=45326033]The Flood Forum Rules[/url]\">THE FLOOD FORUM RULES</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=11669112]Bungie.net Member Blogs[/url]\">Bungie.net Member Blogs</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=21070598]How To Get UnHacked-101[/url]\">How To Get UnHacked-101</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=19824659]DO YOU LIKE PIE???[/url]\">DO YOU LIKE PIE???</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=18326209]Say the most Random Facts![/url]\">Say the most Random Facts!</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33882095]Xbox LIVE Free Downloads List[/url]\">Xbox LIVE Free Downloads List</option>\<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=26466683]Play Nice[/url]\">Play Nice</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=29228487]Regarding the PETA board and Other sites[/url]\">Regarding the PETA board and Other sites</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=11663449]The Flood Library v2[/url]\">The Flood Library v2</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=18451013]Short, Scary Stories[/url]\">Short, Scary Stories</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=33210876]Flood Funny Sayings[/url]\">Flood Funny Sayings</option>\</select>\
&nbsp;&nbsp;<input type=\"button\" id=\"insertthreadbutton5\" onClick=\"thisButton=document.getElementById('insertthreadbutton5');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('threadlist5').options[document.getElementById('threadlist5').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertthreadbutton5'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertthreadbutton5'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" />\
&nbsp;&nbsp;|&nbsp;&nbsp;\
<select id=\"threadlist6\" style=\"background:#1b1d1f; color:#a3a3a4; width:85px; border-color:#5c5d5f; border-width:1px; border-style:solid;\">\
                                                                                                                                                                                                                                                                                     <option value=\"\">The Gallery</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=[url=http://www.bungie.net/Forums/posts.aspx?postID=27443056]The Gallery Forum Rules[/url]\">THE GALLERY FORUM RULES</option>\
<option value=\"\">-----------------</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=27526540]The Short List of Improper Posts - Please Read Before Posting[/url]\">Short List of Improper Posts</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=29262184]Creative Emblems![/url]\">Creative Emblems!</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=28070931]Halo 3 Epilogue Story[/url]\">Halo 3 Epilogue Story</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=27510472]Halo 3 Mythbusters - Created by RandomSauce and TURRET BUDDY[/url]\">Halo 3 Mythbusters - by RandomSauce and TURRET BUDDY</option>\
<option value=\"</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=28083717]What if it was Midnight on Snowbound? (subject to change)[/url]\">What if it was Midnight on Snowbound? (subject to change)</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=27927918][Story] Memoirs of an ODST[/url]\">[Story] Memoirs of an ODST</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=31052475][Story] Halo 3: Insurrection[/url]\">[Story] Halo 3: Insurrection</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=28101518]Custom Armor Variants: Original Designs/Post Yours[/url]\">Custom Armor Variants: Original Designs/Post Yours</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=27731266]Armor Fusion (30+ in-game pics)[/url]\">Armor Fusion (30+ in-game pics)</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=27786284]UNSC Insignia Artwork[/url]\">UNSC Insignia Artwork</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=29293306]The Sangheili Chronicles[/url]\">The Sangheili Chronicles</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=31291784]The Halo 3 Epilogue[/url]\">The Halo 3 Epilogue</option>\
<option value=\"[url=http://www.bungie.net/Forums/posts.aspx?postID=28077947]Just Another Fan's Gallery[/url]\">Just Another Fan's Gallery</option>\
</select>\
&nbsp;&nbsp;<input type=\"button\" id=\"insertthreadbutton6\" onClick=\"thisButton=document.getElementById('insertthreadbutton6');var textbox=document.getElementById('"+msgBox+"');var startPos = textbox.selectionStart;var endPos = textbox.selectionEnd; inserttext=document.getElementById('threadlist6').options[document.getElementById('threadlist6').selectedIndex].value;textbox.value = textbox.value.substring(0, startPos)+inserttext+textbox.value.substring(endPos, textbox.value.length); document.getElementById('"+msgBox+"').focus(); caretPos=startPos+inserttext.length; textbox.setSelectionRange(caretPos, caretPos); \" value=\"^\" style=\"background:#1b1d1f; color:#a3a3a4; border-color:#5c5d5f; border-width:1px; border-style:solid;\" onmouseover=\"thisButton=document.getElementById('insertthreadbutton6'); thisButton.style.borderColor='#56AACD'; thisButton.style['background']='#17668a'; thisButton.style['color']='#FFFFFF'\" onmouseout=\"thisButton=document.getElementById('insertthreadbutton6'); thisButton.style['background']='#1b1d1f'; thisButton.style.borderColor='#5c5d5f'; thisButton.style['color']='#a3a3a4'\" />\
<br />\
</div></div></div><div class=\"formgroup3\">");
}
}
}
addFormatting();

const MAX_UNICODE_INT=255;
const REPL_CHARS=[
	[8216,"'"],
	[8217,"'"],
	[8211,"-"],
	[8220,"\""],
	[8221,"\""],
	[8230,"..."]
];
if(document.getElementById('ctl00_mainContent_messageForm_skin_previewButton'))
	var list=document.getElementById("ctl00_mainContent_messageForm_skin_previewButton").parentNode;
else
	var list=document.getElementsByClassName("right_actions")[0];
var btn=document.createElement("a");
btn.innerHTML="PARSE TEXT";
btn.className="ctl00_mainContent_postForm_skin_previewButton";
btn.addEventListener("click",function(){
	var elem=document.getElementById("ctl00_mainContent_postForm_skin_body");
	var str=elem.value;
	var temp="";
	for(var i=0;i<str.length;i++){	
		if(str.charCodeAt(i)<=MAX_UNICODE_INT){
			temp+=str[i];
		}
		else{
			for(var x in REPL_CHARS){
				if(str.charCodeAt(i)==REPL_CHARS[x][0]){
					temp+=REPL_CHARS[x][1];
					break;
				}
			}
		}
	}
	elem.value=temp;
	alert("Done! Extended Characters are Gone!");
},false);
list.insertBefore(btn, list.firstChild);

if(localStorage.getItem("Savedpost") == null){
localStorage.setItem("Savedpost", "-Nothing saved-");
}
if(document.URL.search("msgID") > -1){
document.getElementById("ctl00_mainContent_messageForm_skin_body").rows = localStorage.getItem("TBSIZE");}
else{
document.getElementById("ctl00_mainContent_postForm_skin_body").rows = localStorage.getItem("TBSIZE");
}
var TPTB = document.getElementById('PTB');
TPTB.addEventListener("click", function(){if(document.URL.search("msgID") > -1){document.getElementById('ctl00_mainContent_messageForm_skin_body').rows += 2} else {document.getElementById('ctl00_mainContent_postForm_skin_body').rows += 2}}, true);

var TMTB = document.getElementById('MTB');
TMTB.addEventListener("click", function(){if(document.URL.search("msgID") > -1){document.getElementById('ctl00_mainContent_messageForm_skin_body').rows -= 2} else {document.getElementById('ctl00_mainContent_postForm_skin_body').rows -= 2}}, true);

var saveTBR = document.getElementById('saveTBR');
saveTBR.addEventListener("click", function(){if(document.URL.search("msgID") > -1){var newTBSIZE = document.getElementById("ctl00_mainContent_messageForm_skin_body").rows; localStorage.setItem("TBSIZE", newTBSIZE); alert("Textfield size saved!")}else{var newTBSIZE = document.getElementById("ctl00_mainContent_postForm_skin_body").rows; localStorage.setItem("TBSIZE", newTBSIZE); alert("Textfield size saved!")}}, true);

var savePOST = document.getElementById('savepostbutton');
savePOST.addEventListener("click", function(){if(document.URL.search("msgID") > -1){var thepost = document.getElementById('ctl00_mainContent_messageForm_skin_body').value; localStorage.setItem("Savedpost", thepost); alert("Post saved!"); } else {var thepost = document.getElementById('ctl00_mainContent_postForm_skin_body').value;localStorage.setItem("Savedpost", thepost); alert("Post saved!");}}, true);
var loadPOST = document.getElementById('loadpostbutton');
loadPOST.addEventListener("click", function(){if(document.URL.search("msgID") > -1){var thetextfield = document.getElementById('ctl00_mainContent_messageForm_skin_body'); var thesavedpost = localStorage.getItem("Savedpost"); thetextfield.value += thesavedpost;} else {var thetextfield = document.getElementById('ctl00_mainContent_postForm_skin_body'); var thesavedpost = localStorage.getItem("Savedpost"); thetextfield.value += thesavedpost; }}, true); 



var SUC_script_num = 52501; // Change this to the number given to the script by userscripts.org (check the address bar)

try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
					headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}