// ==UserScript==
// @name       Shanbay Plus
// @namespace  http://stormluke.me/
// @version    0.1
// @description  some enhancement on shanbay.com
// @match      http://www.shanbay.com/*
// @require    http://code.jquery.com/jquery-1.9.1.min.js
// ==/UserScript==

function change(html, rootsDiv) {
  if(html) {
    rootsDiv.html(html);
  } else {
    rootsDiv.html('无数据');  
  }
}

function fetch(word, rootsDiv) {
  GM_xmlhttpRequest({
    method: 'GET',
    url: 'http://www.iciba.com/' + word,
    onload: function(response) {
      var html = $('#dict_content_6',response.responseText).html();
      change(html, rootsDiv);
    }
  });
}

$('#review').bind('DOMSubtreeModified', function() {
  var rootsDiv = $('#roots div.alert');
  if(rootsDiv.html()) {
    var word = $('h1.content').text().replace(/\[.*\]/, '').replace(/\W/g, '');
    rootsDiv.removeClass();
    rootsDiv.addClass('well');
    rootsDiv.html('载入中...');
    console.log(word);
    fetch(word, rootsDiv);
  };
});
