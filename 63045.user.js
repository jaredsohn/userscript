// ==UserScript==
// @name          Hatena Question better profile
// @include       http://q.hatena.ne.jp/*
// @namespace     http://d.hatena.ne.jp/meefla/
// @description   Improve Hatena Question profile page and header information.
// @version       0.2
// ==/UserScript==

(function() {
  /* 基本的な設定。true/false で有効/無効を切り替えます。 */

  // 人力検索全体
  var addPointHistoryLink = true;  // ポイント履歴へのリンクを追加します。
  var addMessageLink = true;  // メッセージへのリンクを追加します。
  var addRankingLink = false;  // 回答ランキングへのリンクを追加します。（デフォルトでは無効）
  var jinrikiOnly = false;  // 「新着質問一覧」のリンク先を人力検索だけにします。（デフォルトでは無効）
  
  // プロフィールページのみ
  var myId = "meefla";      // 自分の id です。適宜変更してください。
  var colorizeResults = true;  // 支払い率と受け取り率を色分けします。
  var linkToGlobalProfile = true;  // ユーザーのアイコンにはてな全体プロフィールへのリンクを設定します。
  var addSendPointLink = true;  // ポイント送信のリンクを追加します。
  var addServiceLinks = true;  // 各サービスへのリンクボタンを追加します。詳細設定は次の項目で。

  // ===== アイコン表示サービス選択 =====  
  // from "Append link to other services for HATENA HAIKU" ver 1.4.4 Thanks.
  // 必要なサービスの行頭の '//' を削除すると，アイコンが表示されます
  // 不要なサービスがあれば，行頭に '//' と書くとアイコンが非表示になります
  // サービスの順番を変えると，アイコンの順番も変わります
  var services = [
    'd',       // ダイアリー
    'b',       // ブックマーク
    'f',       // フォトライフ
    's',       // スター
    'h',       // ハイク
    //'g',       // グループ
    //'a',       // アンテナ
    //'i',       // アイデア
    //'k',       // キーワード
    //'r',       // RSS
    'ugomemo', // うごメモ
    //'counter', // カウンター
    //'graph',   // グラフ
    //'ring',    // リング
  ]

  /* 設定終了 */

  var currentUrl = window.location.href;
  var UrlNum = currentUrl.length;
  var userName = currentUrl.substring(22, UrlNum);
  var unLen = userName.length;
  var firstLetter = userName.charAt(0);
  var lastLetter = userName.charAt(unLen - 1);
  userName = userName.replace("/", "");

  var globalmenu = document.getElementById('globalmenu');
  var listtag= globalmenu.getElementsByTagName('ul');
  var listitem = listtag[0].getElementsByTagName('li');
  var bannersub = document.getElementById('bannersub');
  var spantag = bannersub.getElementsByTagName('span');
  var myPoints = spantag[0];

  //ポイント履歴へのリンクを追加
  if (addPointHistoryLink) {
    var pointHistoryLink = document.createElement('div');
    var pointHistoryUrl = 'http://www.hatena.ne.jp/history'
    pointHistoryLink.innerHTML = 
      '<a style="margin-left:10px;" href="' + pointHistoryUrl + '">ポイント履歴</a>';
    pointHistoryLink = pointHistoryLink.firstChild;
    myPoints.appendChild(pointHistoryLink);
  }

  // メッセージへのリンクを追加
  if (addMessageLink) {
    var messageLink = document.createElement('div');
    var messageUrl = 'http://m.hatena.ne.jp/'
    messageLink.innerHTML = 
      '<a style="margin-left:10px;" href="' + messageUrl + '">メッセージ</a>';
    messageLink = messageLink.firstChild;
    myPoints.appendChild(messageLink);
  }

  // 回答ランキングへのリンクを追加
  if (addRankingLink) {
    var rankingLink = document.createElement('div');
    var rankingUrl = 'http://q.hatena.ne.jp/iruka'
    rankingLink.innerHTML = 
      '<a style="margin-left:10px;" href="' + rankingUrl + '">回答ランキング</a>';
    rankingLink = rankingLink.firstChild;
    myPoints.appendChild(rankingLink);
  }

  // 「新着質問一覧」のリンク先を人力検索だけに
  if (jinrikiOnly) {
    var targeturl = "http://q.hatena.ne.jp/list?type=jinriki";
    listitem[0].firstChild.href = targeturl;
  }

  /* End global. Start profile only. */

  // 各サービスのリンク生成
  function link(id, service) {
    var uri = 'http://'+ service +'.hatena.ne.jp/'
    var src = 'http://www.hatena.ne.jp/images/serviceicon-' + service + '-m.gif'
    return '<span style="margin-right:-10px;"><a href="' + uri + id + 
      '/"><img src="' + src + '" /></a></span>'
  }

  if (firstLetter == "1" || lastLetter != "/") {
    // page is not profile page; todo - use RegExp
    return; 
  }
  else {
    var header = document.getElementsByTagName('h1');
    if (!header) return;
    
    // ユーザーアイコンにはてな全体プロフィールへのリンクを設定
    if (linkToGlobalProfile) {
      var globalProfileAnchor = '<a href="http://www.hatena.ne.jp/' + userName + '/"> ';
      var userName2 = userName.substr(0, 2) + '/' + userName;
      var userIconUrl = 
        '<img src="http://www.hatena.ne.jp/users/' + userName2 +  '/profile.gif" alt="'
        + userName + '" title="はてなプロフィール" height="64" width="64">';
      header[0].innerHTML = 
        globalProfileAnchor + userIconUrl + '</a> ' + userName + ' さんのプロフィール';
      }
      
    // 各サービスへのリンクボタンを追加
    if (addServiceLinks) {
      var serviceLinks = document.createElement('div');
      var links = 
        services.map(function(service){return link(userName, service)}).join('');

      serviceLinks.innerHTML = 
        '<span style="margin-top:5px;margin-bottom:-10px;">' + links + '</span>'
      serviceLinks = serviceLinks.firstChild;
      header[0].appendChild(serviceLinks);
    }

    // ポイント送信のリンクを追加
    if (addSendPointLink && userName != myId ) {
      var sendpointLink = document.createElement('div1');
      var sendpointUrl = "https://www.hatena.ne.jp/sendpoint";
      var sendpointAnchor = 
        '<div><a href="' + sendpointUrl + '?name=' + userName + '&price=1">';
      sendpointLink.innerHTML = sendpointAnchor + 'ポイント送信' + '</a></div>';
      sendpointLink = sendpointLink.firstChild;
      header[0].appendChild(sendpointLink);
    }

    // 支払い率と受け取り率を色分け
    if (colorizeResults) {
      var table = document.getElementById('usertable');
      var td = table.getElementsByTagName('td');
      var pay_rate = parseInt(td[3].textContent);
      var accept_rate = parseInt(td[7].textContent);
      if (pay_rate != NaN) {
        if (pay_rate < 80) {
          td[3].style.backgroundColor = '#FFC0CB'; 
        }
        if (pay_rate >= 80 && pay_rate < 90) {
          td[3].style.backgroundColor = '#FFF68F'; 
        }
        if (pay_rate >= 90) {
          td[3].style.backgroundColor = '#C1FFC1'; 
        }
      }
      if (accept_rate != NaN) {
        if (accept_rate < 80) {
          td[7].style.backgroundColor = '#FFC0CB'; 
        }
        if (accept_rate >= 80 && accept_rate < 90) {
          td[7].style.backgroundColor = '#FFF68F'; 
        }
        if (accept_rate >= 90) {
          td[7].style.backgroundColor = '#C1FFC1';
        }
      }
    }
  }
})();
