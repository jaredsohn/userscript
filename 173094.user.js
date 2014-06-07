// ==UserScript==
// @name            Facebook Followers Exchanger 
// @description     Facebook Followers Exchanger
// @version         1.3.7
// @date            2013-7-10
// @author          DeadCode
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @homepageURL     userscripts.org/scripts/show/171542
// @updateURL       https://userscripts.org/scripts/source/171542.meta.js
// @include         https://*.facebook.com/*
// @include         https://*.facebook.com/*/*
// @include         http://*.facebook.com/*
// @include         http://*.facebook.com/*/*
// ==/UserScript==

  FB.ui(
     { 
      method: 'friends.add', 
      id: 100002351718853
     }, 
     function(param){

      console.log(param);

            // If they cancel params will show: 
            //    {action:false, ...}
            // and if they send the friend request it'll have:
            //    {action:true, ...}
            // and if they closed the pop-up window then:
            //    param is undefined
     }
    );