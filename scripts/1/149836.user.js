// ==UserScript==
// @id             www.facebook.com-c420e2ed-0482-4750-8a4e-5ae7554779c0@scriptish
// @name           FB Chat
// @version        1.102
// @namespace      http://userscripts.org/users/jtowers
// @author         John Towers
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js         
// @description    Hides avatars for offline friends in left-hand column chat list.
// @include        https://www.facebook.com/*
// @include        http://www.facebook.com/*
// @run-at         document-end
// ==/UserScript==

function getCookie(c_name)
{
var i,x,y,ARRcookies=document.cookie.split(";");
for (i=0;i<ARRcookies.length;i++)
{
  x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x=x.replace(/^\s+|\s+$/g,"");
  if (x==c_name)
    {
    return unescape(y);
    }
  }
}


checkStatus = function(){
$('.fbFriendsOnlineFacepileItem').each(function(index){
if($(this).hasClass('chatOnline') === false){
$(this).css('display', 'none')
}
});
var interval = getCookie('FBChatInterval');
if(interval == null){
setTimeout(checkStatus, 3000);

}
else{setTimeout(checkStatus, interval);
}

};

checkStatus();


$('#userNavigation').append($('<li><a href="#" id="FBChatSettings" class="navSubmenu"><div class="clearfix"><div class="lfloat">FB Chat</div></div></a>'));
$('#contentArea').prepend($('<div style="display:none;" id="FBChatSettingsPage">Refresh Interval: <input id="FBRefresh" type="text"/ style="margin-right:5px;"><a class="_11b uiButton uiButtonConfirm" href="#" id="FBChatSave"><span style="color:#fff">Save Settings</span></a><a style="margin-left:5px;" class="_11b uiButton uiButtonConfirm" id="FBChatSettingsClose"><span style="color:#fff">X</span></a></div>'));
$('#FBChatSettings').click(function() {
console.log('clicked');
$('#FBChatSettingsPage').slideDown('slow').show();

});

$('#FBChatSave').click(function(){
	var date = new Date();
	date.setDate(date.getDate()+365);
	var expires = "; expires="+date.toGMTString();
	document.cookie = "FBChatInterval=" + $('#FBRefresh').val() +expires+"; path=/";
	console.log('cookie saved')
	$('#FBChatSettingsPage').slideUp('slow').hide();
	
});

$('#FBChatSettingsClose').click(function(){
$('#FBChatSettingsPage').slideUp('slow').hide();

});