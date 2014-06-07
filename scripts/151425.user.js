// ==UserScript==
// @name        togetter2txt
// @namespace   http://userscripts.org/users/473164
// @include     http://togetter.com/*
// @version     1.0
// ==/UserScript==
(function(){
  // ユーザー名と日付を出力する
  const PRINT_USER = false;
  // ツイートの区切り
  const SEPALETOR = '\n';
  
  var tweetBox = get_x('//div[@class="tweet_box"]');
  if(tweetBox.length == 1){
    var div = document.createElement('div');
    div.setAttribute('style', 'font-weight : bold');
    var span = document.createElement('span');
    span.innerHTML = "&raquo;Download : ";
    var a = document.createElement('a');
    a.id = 'downloadTextLink';
    a.innerHTML = '読込中…';
    a.href = 'javascript:void(0)';
    div.appendChild(span);
    div.appendChild(a);
    tweetBox[0].parentNode.insertBefore(div, tweetBox[0]);
    
    var timerId = setInterval(function(){
      var readMore = get_x('//a[contains(@onclick, "tgtr.moreTweets")]');
      if(readMore.length > 0){
        readMore[0].click();
      }else{
        clearInterval(timerId);
        var a = document.getElementById('downloadTextLink');
        a.href = 'data:application/octet-stream,';
        var tweet = get_x('//div[@class="tweet"]');
        var status = get_x('//div[@class="status_right"]');
        for (var i=0; i < tweet.length; i++){
          var tweet_text = tweet[i].innerHTML.replace(/<[^<>]+>/g, '') + '\n';
          var status_text = '\t' + status[i].innerHTML.replace(/(?:<[^<>]+>|[\t\n])/g, '') + '\n';
          status_text = status_text.replace(/([0-9]{4}\/[0-9]{2}\/[0-9]{2})/, ' $1');
          if(PRINT_USER == true){
            a.href += encodeURIComponent(tweet_text + status_text + SEPALETOR);
          }
          else{
            a.href += encodeURIComponent(tweet_text + SEPALETOR);
          }
        }
        a.innerHTML = document.title.replace(/ - Togetter/, '') + '.txt';
      }
    }, 1000);
  }
  function get_x(query, parent_element){
    var ary = [];
    var results = document.evaluate(query, parent_element || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    for (var i = 0; i < results.snapshotLength; i++){
      ary.push(results.snapshotItem(i));
    }
    return ary;
  }
}
)();
