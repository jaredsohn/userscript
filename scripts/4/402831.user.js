// ==UserScript==
// @name       用于下载花瓣网站的图片（原图）
// @namespace  http://xiaosheng.fm/
// @version    0.2
// @description  使用方法：打开花瓣页面，进行搜索，得到满意结果之后按"D"键即可，结果会输出到一个新弹出的窗口，可以使用迅雷进行批量下载
// @match      http://huaban.com/
// @match      http://huaban.com/search/*
// @match      http://huaban.com/boards/*
// @copyright  2012+, RainX
// ==/UserScript==


function getFullImgUrls() 
{
    
    var imgs = document.getElementsByTagName("img");
    
    var fullImgUrls = [];
    
    for ( var i in imgs) {
        var img = imgs[i];
        
        if (img.src && img.src.indexOf("http://img.hb.aicdn.com") === 0) {
            var fullImgUrl = img.src;
            // 移除参数获取原地址
            if (img.src.indexOf("_fw")) {
                fullImgUrl = img.src.substring(0, img.src.indexOf("_fw"));
            }
            
            fullImgUrls.push(fullImgUrl);
        }
    }
    
    return fullImgUrls;
}


// 注册按键事件 d 
document.addEventListener("keydown", function (event) 
                          { 
                              if (event.keyCode == 68) {
                                  var urls = getFullImgUrls();
                                  var urlsHtmls = [];
                                  for (var i = 0; i < urls.length ; i++)
                                  {
                                      var url = urls[i];
                                      var h = "<a href='" + url + "'>" + url + "</a>";
                                  	  urlsHtmls.push(h);
                                  }
                                  var html = urlsHtmls.join("<p>");
                                  var newWindow = window.open("");
                                  newWindow.document.write(html);
                              }
                          }, false); 