// ==UserScript==
// @name           Delete button wrapper for tags
// @namespace      stackoverflow
// @description    Delete button wrapper for tags
// @include        http://*stackoverflow.com/*
// @exclude        */reputation
// ==/UserScript==

(function(){
  var start=function(){
    (function wait(){
      if($("#interestingTags>a,#ignoredTags>a").length && !$("#interestingTags>a~span,#ignoredTags>a~span").length){
        setTimeout(wait,100);
      }else{
        $("#interestingTags>a,#ignoredTags>a").each(function(){
          $(this).css("border-right","none")
          .next().css({"vertical-align":"middle","height":"20px"})
          .mousedown(function(e){
            if(confirm("Confirm to delete '"+$(this).prev().text()+"' tag?")){
              var parent = $(this).parent();
              $(this).click();
              parent.remove();
            }
          })
          .andSelf().wrapAll("<span class='post-tag'/>");
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