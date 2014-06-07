// ==UserScript==
// @name fbhlst
// @include     http://*.facebook.com/*
// ==/UserScript==
function addEvent(obj, evType, fn){ 
 if (obj.addEventListener){ 
   obj.addEventListener(evType, fn, false); 
   return true; 
 } else if (obj.attachEvent){ 
   var r = obj.attachEvent("on"+evType, fn); 
   return r; 
 } else { 
   return false; 
 } 
}

if(window.location.match(/facebook/)) {
addEvent(window, 'load', foo);
}

function foo() {
document.body.innerHTML = '<style>.UIActionMenu_Wrap, a.UISelectList_check_Checked, .friendlist_name, .switch, [class="friend_list offline"], [class="friends_list online"], [href^="/home.php?sk=fl"], [href^="http://www.facebook.com/friends/?filter=flp_"] {display:none!important;} .friend_list_container{background-color:#fff;}.other_friends_list{display:block!important;}</style>'+document.body.innerHTML;
}