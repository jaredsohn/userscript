// ==UserScript==
// @name       zhihu-favorites
// @namespace  https://gist.github.com/4602119
// @version    0.1.1
// @description  加载并展开知乎收藏夹
// @match     http://www.zhihu.com/collection/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @copyright  2012+, TZ <atian25@qq.com>
// ==/UserScript==

$(function(){

  //添加按钮
  $('#zh-list-meta-wrap').append('<span class="zg-bull">•</span>  <a href="javascript:;" id="expandAll">列出全部</a>');

  //注册点击事件
  $('#expandAll').one('click', function(){
    var last = '';
    var itemCount = $('#zh-list-answer-wrap .zm-item').length;
    waitForKeyElements("#zh-list-answer-wrap .zm-item", function(jNode){
      var start = $('#zh-load-more').attr('data-next').toString();
      if(last !== start){
        itemCount = $('#zh-list-answer-wrap .zm-item').length;
        $('#expandAll').replaceWith('<span id="expandAll">努力的加载中(' + itemCount + ')...</span>');
        loadMore();
        last = start;
        console.log('loaded, next=%s', start, itemCount);
      }else if(start == '-1'){
        $('#expandAll').replaceWith('加载完成,共' + itemCount + '条');
        //展开全部
        $('.zm-item-rich-text').css('display','block');
      }
      packNode(jNode);
    });
    loadMore();
  });
});

//分析内容
function packNode(dom){
  var title = dom.find('.zm-item-title a').text();
  var questionUrl = dom.find('.zm-item-title a').attr('href');
  var content = dom.find('.zm-editable-content').html();
  var answerUrl = dom.find('.answer-date-link-wrap a').attr('href');
  console.log({
    title: title,
    questionUrl: questionUrl,
    answerUrl: answerUrl,
    content: content
  });
}

//点击按钮
function clickNode(dom){
  var clickEvent = document.createEvent("HTMLEvents");
  clickEvent.initEvent ("click", true, true);
  dom.dispatchEvent(clickEvent);
}

//点击加载更多
function loadMore(){
  clickNode($('#zh-load-more')[0]);
}
