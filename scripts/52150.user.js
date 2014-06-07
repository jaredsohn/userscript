// ==UserScript==
// @name MafiaBUG
// @description game
// @namespace facebook
// @version 0.1
// @include http://apps.facebook.com/inthemafia/*
// ==/UserScript==



if (document.body.innerHTML.indexOf('<label class="clearfix"><input class="inputcheckbox" id="ids[]" name="ids[]" value="') != -1)
{
//url to follow
var user_id_tmp= document.body.innerHTML.split('<label class="clearfix"><input class="inputcheckbox" id="ids[]" name="ids[]" value="');


for(i = 0; i < user_id_tmp.length; i++){
var user_id=user_id_tmp[i].split('"')[0];
document.alert(user_id);
url = "http://apps.facebook.com/inthemafia/status_invite.php?from="+user_id;

GM_xmlhttpRequest({
  method:"GET",
  url: url,
  headers:{
    "User-Agent":"Mozilla/5.0",            // Recommend using navigator.userAgent when possible
    "Accept":"text/xml"
  }
});



}


}