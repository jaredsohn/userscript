// ==UserScript==
// @name           nemasu
// @namespace      http://cocococo.pecori.jp/
// @include        http://twitter.com/
// @require        http://gist.github.com/raw/3242/1a7950e033a207efcfc233ae8d9939b676bdbf46
// @require        http://gist.github.com/raw/34615/04333b7e307eb029462680e4f4cf961f72f4324c
// ==/UserScript==

(function() {
  var DATABASE_URL = 'http://wedata.net/databases/nemasu/items.json';
  var reasons = [];
  
  var database = new Wedata.Database(DATABASE_URL);
  database.clearCache();
  
  database.get(function(items) {
    items.forEach(function(item) {
      reasons.push(item.name);
    });
  });
  
  var frm = $X('//div[@id="tweeting_controls"]')[0];
  var twbtn = $X('//a[@id="tweeting_button"]')[0];
  var ta = $X('//textarea[@id="status"]')[0];
  var ids = $X('//a[@class="tweet-url screen-name"]');
  var btn = document.createElement('a');
  
  btn.setAttribute('class', 'a-btn a-btn-m'); 
  btn.appendChild(document.createTextNode('nemasu'));
  btn.addEventListener('click', (function() {
    var reason = '', replyString = '', hashtag = '';
    if (Math.random() > 0.2){
      reason = reasons[Math.floor(Math.random() * reasons.length)];
    }
    
    if (Math.random() > 0.8){
      replyString = '@' + ids[Math.floor(Math.random() * ids.length)].firstChild.nodeValue + ' ';
    }
    
    if (Math.random() > 0.9){
      hashtag = ' #nemasu';
      if (Math.random() > 0.6){
        hashtag = ' #nemasuJP';
      }
    }
    
    ta.value = replyString + reason + "寝ます" + hashtag;
    twbtn.setAttribute('class', 'a-btn a-btn-m');
    twbtn.removeAttribute('disabled');
    
  }), false);
  frm.insertBefore(btn, frm.firstChild);
})();

