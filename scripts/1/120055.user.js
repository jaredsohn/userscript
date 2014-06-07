// ==UserScript==
// @name           twitter_custom_module
// @version        1.1.1
// @namespace      http://kksg.net
// @description    New New Twitter (2011/12/09 ~) のサイドバーに便利サービスのリンクを追加します。
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==

(function() {

  var links = {
    'Favstar.fm' : 'http://ja.favstar.fm/users/{screen_name}/recent',
    'Twitmemo' : 'http://twitmemo.net/user/{screen_name}',
    'Google': 'http://google.co.jp/search?q={screen_name}',
    'Search @{screen_name}' : 'http://twitter.com/#!/search/%40{screen_name}',
    'Search to:{screen_name}' : 'http://twitter.com/#!/search/to:{screen_name}',
    'Twilog' : 'http://twilog.org/{screen_name}',
    'Favotter': 'http://favotter.net/user/{screen_name}',
    'Twtrfrnd' : 'http://twtrfrnd.com/9m/{screen_name}',
  };

  function add_custom_module(){
    var screen_name = document.getElementsByClassName('profile-card-inner')[0].getAttribute('data-screen-name');
    var dashboard  = document.getElementsByClassName('dashboard')[0];
    var contents = [];
    var count = 0;

    for (var i in links) {
        contents[count++] = '<li><a class=\"list-link\" href=\"';
        contents[count++] = links[i].replace(/{screen_name}/g, screen_name);
        contents[count++] = '\" target=\"_blank\" >';
        contents[count++] = i.replace(/{screen_name}/g, screen_name);
        contents[count++] = '</a></li>';
    }

    var div = document.createElement('div');
    div.className = 'component';
    div.innerHTML = '<div class=\"module\"><ul>' + contents.join('') + '</ul></div>';
    dashboard.appendChild(div);
  }

  document.addEventListener('DOMNodeInserted', function (e) {
    //unsafeWindow.console.log(e.target.className);
    if (e.target.className == "screen-name"){
      add_custom_module();
    }else if(e.target.className == "component"){
      document.getElementById('j_ad').style.display = 'none';
    }

  });

})();