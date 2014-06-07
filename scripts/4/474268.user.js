// ==UserScript==
// @name        tiebaLastPage
// @include     http://tieba.baidu.com/*
// @version     1
// ==/UserScript==

var $ = unsafeWindow.$;

//添加链接函数
var addLastPage = function(element)
{
  console.log(element);
  if ($(element).find('a[class*=th_tit]').length != 0) {
    var a = $(element).find('a[class*=th_tit]').attr("href").replace("/p/", "");
    var href = "http://tieba.baidu.com/f?ct=335675392&z=" + a + "&sc=1#sub";
    $(element).find('.threadlist_rep_num,.j_rp_num').wrap("<a id='llink' href=" 
      + href + " target='_blank' >&nbsp;&nbsp;&nbsp;&nbsp;");
  }
}

//添加原本网页的
$('.j_thread_list').each(function(){
  addLastPage(this);
});

//添加动态生成的
new MutationObserver(function(records) {
    records.forEach(function(record) {
        Array.prototype.forEach.call(record.addedNodes, function(element) {
            if (element.getAttribute('class')&&element.getAttribute('class').indexOf("j_thread_list")!=-1) {
                addLastPage(element);
            }
        });
    });
}).observe(document.body, {
    'childList': true,
    'subtree': true
});

//话题贴
var topic = $('#thread_topic');
if (topic.length != 0) {
  var a = topic.find('a#topic_post_title').attr("href").replace("http://tieba.baidu.com/p/", "");
  var href = "http://tieba.baidu.com/f?ct=335675392&z=" + a + "&sc=1#sub";
  topic.find('#topic_post_relynum').wrap("<a id='llink' href=" + href + " target='_blank' >&nbsp;&nbsp;&nbsp;&nbsp;");
}