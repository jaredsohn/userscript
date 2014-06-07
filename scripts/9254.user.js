// ==UserScript==
// @author         SATO Nobuhito
// @version        1.2
// @name           Gwitter
// @namespace      nobuhito.sato@gmail.com
// @description    This script does the post to twitter with a google search
// @include        http://google.*/search*
// @include        http://www.google.*/search*
// ==/UserScript==
(function() {
  
  var username = '';
  
  var password = '';

  var url = 'twitter.com/statuses/update.json';
  var gwitter_q = document.forms.namedItem("gs").elements.namedItem("q").value;
  var gwitter_last = GM_getValue('last', '');
  if (gwitter_q == gwitter_last) return;
  GM_log('updating...', 0);
  GM_xmlhttpRequest({
    method: 'POST',
    url:    'http://' + username + ':' + password + '@' + url,
    data:   'status=' + encodeURIComponent("I searched '" + gwitter_q +  "' in google.") + '&source=gwitter',
    headers: {
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    onload: function() {
      GM_setValue('last', gwitter_q);
      var body = document.getElementsByTagName('body')[0];
      var twitter = document.createElement('img');
      twitter.src = 'http://twitter-development-talk.googlegroups.com/web/girl_square.gif?gda=snrts0AAAABDeqJz6jMttqtU34ao5wnwyG13cBE5UKrr59RL3SWO1WG1qiJ7UbTIup-M2XPURDSnjdvvYeUIgBOinLjkdSfG';
      twitter.style.position = 'absolute';
      twitter.style.top = '8px';
      twitter.style.left = '35px';
      body.appendChild(twitter);
      GM_log(gwitter_q, 0);
    },
    onerror: function(res) {
      GM_log('Failed - ' + res.status + ': ' + res.statusText, 0);
    },
  });
})();