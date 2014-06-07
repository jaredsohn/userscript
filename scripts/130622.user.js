// ==UserScript==
// @name           博聆分享之土豆
// @author         iamzhanghdabei
// @description    add boling share
// @include        *tudou.com/programs/view*
// @include        *tudou.com/playlist/p*
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
    var title = window.encodeURIComponent($("#vcate_title").text());
    var new_article_link = "http://www.bling0.com/articles/new?type=externalvideo&article_top_post_attributes_video_page_link="+link_url+"&title="+title;
    $("<a href=\""+new_article_link +"\" style =\"font-size:14px;color:red;\" target=\"_blank\">" + "分享到博聆网</a>").insertBefore($("#lights"))

  })
}

// load jQuery and execute the main function
addJQuery(main);