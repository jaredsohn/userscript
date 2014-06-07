// ==UserScript==
// @name           Sort Related Accounts by Reputation
// @namespace      stackoverflow
// @description    Sort Related Accounts by Reputation
// @include        http://*stackoverflow.com/*?tab=accounts
// @include        http://*superuser.com/*?tab=accounts
// @include        http://*serverfault.com/*?tab=accounts
// @include        http://*.stackexchange.com/*?tab=accounts
// ==/UserScript==

(function(){
  var start=function(){
    //not yet
  };

  if(window.$){
    start();
  }else{
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.textContent = "(" + start + ")();";
    document.body.appendChild(script);
  }
})();
