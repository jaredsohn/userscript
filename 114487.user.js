// ==UserScript==
// @name          tempo
// @namespace     AMARFF
// @include       http://*.ecsocialapps.com*
// ==/UserScript==

if(document.location.href.indexOf("thank_you.php") > -1) {
window.open('', '_self', '');
window.close();
}

if(document.location.href.indexOf("vote_friend_pic") > -1) {
if(document.getElementsByName("frm_vote")[0]){
document.getElementsByName("frm_vote")[0].submit();
void(0);
}
else{
window.open('', '_self', '');
window.close();
}

}
