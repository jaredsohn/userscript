// ==UserScript==
// @name           Customize Profile Link (Temp)
// @namespace      stackoverflow
// @description    Customize Profile Link (Temp)
// @include        http://*stackoverflow.com/*
// @include        http://*superuser.com/*
// @include        http://*serverfault.com/*
// @include        http://*.stackexchange.com/*
// @exclude        */reputation
// ==/UserScript==

(function(){
  var start=function(){
    $(".profile-triangle,.profile-link").mouseover(function(){
        $(this).click();
    })
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