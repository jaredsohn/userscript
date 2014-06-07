// ==UserScript==
// @name           博聆分享之优酷
// @author         iamzhanghdabei
// @description    add boling share
// @include        http://v.youku.com*
// ==/UserScript==
function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

// the guts of this userscript
function main() {
  $(document).ready(function(){
     var link_url = window.location.href;
     var title = $("#subtitle").text();
     var new_article_link = "http://www.bling0.com/articles/new?type=externalvideo&article_top_post_attributes_video_page_link="+link_url+"&title="+title;
     $("<a href=\""+new_article_link +"\" style =\"font-size:14px;color:red;\" target=\"_blank\">" + "分享到博聆网</a>").insertBefore($("#subtitle"));
  }) 
}

// load jQuery and execute the main function
addJQuery(main);