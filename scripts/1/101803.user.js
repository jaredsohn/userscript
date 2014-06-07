// ==UserScript==
// @name           Wrap delete buttons
// @namespace      stackoverflow
// @description    Wrap delete buttons
// @include        http://*stackoverflow.com/*
// @include        http://*superuser.com/*
// @include        http://*serverfault.com/*
// @include        http://*stackapps.com/*
// @include        http://*askubuntu.com/*
// @include        http://*stackexchange.com/*
// @exclude        */reputation
// ==/UserScript==

(function(){
  var start=function(){
    (function wait(){
      if($("#interestingTags>a,#ignoredTags>a").length && !$("#interestingTags>a~span,#ignoredTags>a~span").length){
        setTimeout(wait,100);
      }else{
        $("#interestingTags>a,#ignoredTags>a").each(function(){
          $(this)
          .next().css({"vertical-align":"middle","height":"20px"})
          .mousedown(function(e){
            if(confirm("Confirm to delete '"+$(this).prev().text()+"' tag?")){
              var parent = $(this).parent();
              $(this).click();
              parent.remove();
            }
          })
          .andSelf().wrapAll("<span style='text-decoration:none;white-space:nowrap'/>");
        });
      }
    })();
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