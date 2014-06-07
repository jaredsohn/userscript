// ==UserScript==
// @name           博聆分享之新浪
// @author         iamzhanghdabei
// @description    add boling share
// @include        http://weibo.com*
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

  function add_boling_link() {
        $("img.video_play").live("click",function(){
          var article = $(this).parents("dl.feed_list");
          if ($("a.boling",article).length === 0){
            var video = $("li[action-type='feed_list_media_video']",article)
            var videoinfo = window.decodeURIComponent(video.attr("action-data"));
            var link_url = videoinfo.split("full_url=")[1];
            var title =  videoinfo.split("short_url=")[0].split("title=")[1];
            var new_article_link = "http://www.bling0.com/articles/new?type=externalvideo&article_top_post_attributes_video_page_link="+link_url+"&title="+title;
            $("<a class=\"v_boling\" style =\"font-size:14px;color:red;\" href=\""+new_article_link +"\" target=\"_blank\">" + "分享视频到博聆网</a>").insertBefore($("a[action-type='feed_list_forward']",article));  
          };
        });
        $("img.bigcursor").live("click",function(){
          var article =$(this).parents("dl.feed_list");
          if ($("a.boling",article).length === 0){
           // var image_link = article.find("img[action-type='feed_list_media_bigimg']").attr("src");
            var title = article.find("p[node-type='feed_list_content']").text();
             var image_link = $(this).attr("src").replace("thumbnail","bmiddle")
            var new_article_link = "http://www.bling0.com/articles/new?type=picture&article_top_post_attributes_external_image_url="+image_link+"&title="+title;
           
  
             if (image_link.length != 0){
              $("<a class=\"p_boling\" style =\"font-size:14px;color:red;\" href=\""+new_article_link +"\" target=\"_blank\">" + "分享图片到博聆网</a>").insertBefore($("a[action-type='feed_list_forward']",article));
            }
          };
        });
  }
  $(document).ready(function(){
    add_boling_link();
  })
}

// load jQuery and execute the main function
addJQuery(main);