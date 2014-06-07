// ==UserScript==
// @name       QuickPic
// @namespace  http://gm.bungie.co/
// @version    0.1
// @description  Quickly upload and post images from your computer to Bungie.net.
// @require    http://code.jquery.com/jquery-latest.js
// @match      *://*.bungie.net/Forums/createpost.aspx?forumID=*
// @match      *://*.bungie.net/Forums/Createpost.aspx?forumID=*
// @match      *://*.bungie.net/forums/createpost.aspx?forumID=*
// @match      *://*.bungie.net/forums/Createpost.aspx?forumID=*
// @match      *://*.bungie.net/fanclub/*/Forums/createpost.aspx?forumID=*
// @match      *://*.bungie.net/fanclub/*/Forums/Createpost.aspx?forumID=*
// @match      *://*.bungie.net/fanclub/*/forums/createpost.aspx?forumID=*
// @match      *://*.bungie.net/fanclub/*/forums/Createpost.aspx?forumID=*
// @match      *://*.bungie.net/Forums/createpost.aspx?postID=*&act=reply
// @match      *://*.bungie.net/Forums/Createpost.aspx?postID=*&act=reply
// @match      *://*.bungie.net/forums/createpost.aspx?postID=*&act=reply
// @match      *://*.bungie.net/forums/Createpost.aspx?postID=*&act=reply
// @match      *://*.bungie.net/Account/Profile.aspx?msgID=*&act=reply
// @match      *://*.bungie.net/Account/profile.aspx?msgID=*&act=reply
// @match      *://*.bungie.net/account/Profile.aspx?msgID=*&act=reply
// @match      *://*.bungie.net/account/profile.aspx?msgID=*&act=reply
// @match      *://*.bungie.net/Account/Profile.aspx?msgID=*&act=reply&boardID=*
// @match      *://*.bungie.net/Account/profile.aspx?msgID=*&act=reply&boardID=*
// @match      *://*.bungie.net/account/Profile.aspx?msgID=*&act=reply&boardID=*
// @match      *://*.bungie.net/account/profile.aspx?msgID=*&act=reply&boardID=*
// @match      *://*.bungie.net/fanclub/*/Forums/Createpost.aspx?postID=*&act=reply
// @match      *://*.bungie.net/fanclub/*/Forums/createpost.aspx?postID=*&act=reply
// @match      *://*.bungie.net/fanclub/*/forums/Createpost.aspx?postID=*&act=reply
// @match      *://*.bungie.net/fanclub/*/forums/createpost.aspx?postID=*&act=reply
// @icon       http://gm.bungie.co/ctjl96/images/quickpic/32.png
// @copyright  © ctjl96 (© 2012 acnboy34 : Bungie.co)
// ==/UserScript==

defaultStyle = 'margin-left:5px;float:left;display:block;height:20px;border:1px solid #5C5D5F;background:#1B1D1F;padding-left:5px;padding-right:5px;line-height:20px;color:#A3A3A4;text-align:center;width:auto;text-decoration:none"';

$('.formgroup3').before('<br /><div class="formgroup3" id="divContain" style="width:273px" />');
$('#divContain').append('<a id="expandButton" style="cursor:pointer;cursor:hand;' + defaultStyle + ' onmouseover="this.style.border=\'1px solid #56AACD\';this.style.background=\'#17668A\';this.style.color=\'#DCE8EE\';" onmouseout="this.style.marginLeft=\'5px\';this.style.float=\'left\';this.style.display=\'block\';this.style.height=\'20px\';this.style.border=\'1px solid #5C5D5F\';this.style.background=\'#1B1D1F\';this.style.paddingLeft=\'5px\';this.style.paddingRight=\'5px\';this.style.lineHeight=\'20px\';this.style.color=\'#A3A3A4\';this.style.textAlign=\'center\';this.style.width=\'auto\';this.style.textDecoration=\'none\'">attach file</a>');
$('#expandButton').after('<br /><br /><div id="expandable" style="display:none"><iframe src="http://i.bungie.co/src/script_portal.html" style="height:200px; width:273px; border:none" id="submitFrame" scrolling="no" /></div>');
$('#expandButton').click(function(){ 
    $('#expandable').slideToggle('slow', 'linear', function(){
	document.getElementById('submitFrame').src = document.getElementById('submitFrame').src;
	});
});
$('#divContain').after('<br>');