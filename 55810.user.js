// ==UserScript==
// @name           Hatena Question Plus
// @namespace      http://d.hatena.ne.jp/Cherenkov/
// @include        http://q.hatena.ne.jp/*
// @description    人力検索はてな(http://q.hatena.ne.jp/)にちょっとした機能を加える。
// @version        0.0.2
// ==/UserScript==

/*
version 0.0.2 (20100210)
・はてなの仕様変更に伴ない、プロフィールページの判定を修正。

version 0.0.1の主な機能は4つ
・ヘッダーにはてなポイント履歴ページへのリンクを付ける。
・質問ページのサイドバーに質問者の簡単なプロフィールを表示する。
・プロフィールページに詳細プロフィールとダイアリーのリンクを付ける。
・プロフィールページに総(支払い|受け取り)ポイントを表示する
*/


//ヘッダーにはてなポイント履歴ページへのリンクを付ける
(function() {
  var point = document.querySelector('.point strong');
  var range = document.createRange();
  var df = range.createContextualFragment('<a href="http://www.hatena.ne.jp/history"><strong>' + point.textContent + '</strong></a>');
  point.parentNode.replaceChild(df, point);
  range.detach();

  //広告不可視化 Stylish入れてない人向け
  GM_addStyle(<><![CDATA[
    .text-ad,
    .sidebar-ad,
    .side-yahoo,
    [class*="google_afc"],
    [id*="ad-red-"],
    a[href*="http://ad-hatena.jp/"]
    {display: none !important;}
  ]]></>);
})();



//質問ページのサイドバーに質問者の簡単なプロフィールを表示する
(function() {
  //質問ページか判定
  if(!document.querySelector('.question-header')) return false;

  var profile_url = document.querySelector('.hatena-id-icon').parentNode.href;
  var questionlist_url = profile_url + "questionlist";
  var answerlist_url = profile_url + "answerlist";
  var loading_img = "data:image/gif;base64,R0lGODlhGAAYAPQAAP%2F%2F%2FwAAAM7Ozvr6%2BuDg4LCwsOjo6I6OjsjIyJycnNjY2KioqMDAwPLy8nZ2doaGhri4uGhoaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH%2FC05FVFNDQVBFMi4wAwEAAAAh%2FhpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh%2BQQJBwAAACwAAAAAGAAYAAAFriAgjiQAQWVaDgr5POSgkoTDjFE0NoQ8iw8HQZQTDQjDn4jhSABhAAOhoTqSDg7qSUQwxEaEwwFhXHhHgzOA1xshxAnfTzotGRaHglJqkJcaVEqCgyoCBQkJBQKDDXQGDYaIioyOgYSXA36XIgYMBWRzXZoKBQUMmil0lgalLSIClgBpO0g%2Bs26nUWddXyoEDIsACq5SsTMMDIECwUdJPw0Mzsu0qHYkw72bBmozIQAh%2BQQJBwAAACwAAAAAGAAYAAAFsCAgjiTAMGVaDgR5HKQwqKNxIKPjjFCk0KNXC6ATKSI7oAhxWIhezwhENTCQEoeGCdWIPEgzESGxEIgGBWstEW4QCGGAIJEoxGmGt5ZkgCRQQHkGd2CESoeIIwoMBQUMP4cNeQQGDYuNj4iSb5WJnmeGng0CDGaBlIQEJziHk3sABidDAHBgagButSKvAAoyuHuUYHgCkAZqebw0AgLBQyyzNKO3byNuoSS8x8OfwIchACH5BAkHAAAALAAAAAAYABgAAAW4ICCOJIAgZVoOBJkkpDKoo5EI43GMjNPSokXCINKJCI4HcCRIQEQvqIOhGhBHhUTDhGo4diOZyFAoKEQDxra2mAEgjghOpCgz3LTBIxJ5kgwMBShACREHZ1V4Kg1rS44pBAgMDAg%2FSw0GBAQGDZGTlY%2BYmpyPpSQDiqYiDQoCliqZBqkGAgKIS5kEjQ21VwCyp76dBHiNvz%2BMR74AqSOdVwbQuo%2Babppo10ssjdkAnc0rf8vgl8YqIQAh%2BQQJBwAAACwAAAAAGAAYAAAFrCAgjiQgCGVaDgZZFCQxqKNRKGOSjMjR0qLXTyciHA7AkaLACMIAiwOC1iAxCrMToHHYjWQiA4NBEA0Q1RpWxHg4cMXxNDk4OBxNUkPAQAEXDgllKgMzQA1pSYopBgonCj9JEA8REQ8QjY%2BRQJOVl4ugoYssBJuMpYYjDQSliwasiQOwNakALKqsqbWvIohFm7V6rQAGP6%2BJQLlFg7KDQLKJrLjBKbvAor3IKiEAIfkECQcAAAAsAAAAABgAGAAABbUgII4koChlmhokw5DEoI4NQ4xFMQoJO4uuhignMiQWvxGBIQC%2BAJBEUyUcIRiyE6CR0CllW4HABxBURTUw4nC4FcWo5CDBRpQaCoF7VjgsyCUDYDMNZ0mHdwYEBAaGMwwHDg4HDA2KjI4qkJKUiJ6faJkiA4qAKQkRB3E0i6YpAw8RERAjA4tnBoMApCMQDhFTuySKoSKMJAq6rD4GzASiJYtgi6PUcs9Kew0xh7rNJMqIhYchACH5BAkHAAAALAAAAAAYABgAAAW0ICCOJEAQZZo2JIKQxqCOjWCMDDMqxT2LAgELkBMZCoXfyCBQiFwiRsGpku0EshNgUNAtrYPT0GQVNRBWwSKBMp98P24iISgNDAS4ipGA6JUpA2WAhDR4eWM%2FCAkHBwkIDYcGiTOLjY%2BFmZkNlCN3eUoLDmwlDW%2BAAwcODl5bYl8wCVYMDw5UWzBtnAANEQ8kBIM0oAAGPgcREIQnVloAChEOqARjzgAQEbczg8YkWJq8nSUhACH5BAkHAAAALAAAAAAYABgAAAWtICCOJGAYZZoOpKKQqDoORDMKwkgwtiwSBBYAJ2owGL5RgxBziQQMgkwoMkhNqAEDARPSaiMDFdDIiRSFQowMXE8Z6RdpYHWnEAWGPVkajPmARVZMPUkCBQkJBQINgwaFPoeJi4GVlQ2Qc3VJBQcLV0ptfAMJBwdcIl%2BFYjALQgimoGNWIhAQZA4HXSpLMQ8PIgkOSHxAQhERPw7ASTSFyCMMDqBTJL8tf3y2fCEAIfkECQcAAAAsAAAAABgAGAAABa8gII4k0DRlmg6kYZCoOg5EDBDEaAi2jLO3nEkgkMEIL4BLpBAkVy3hCTAQKGAznM0AFNFGBAbj2cA9jQixcGZAGgECBu%2F9HnTp%2BFGjjezJFAwFBQwKe2Z%2BKoCChHmNjVMqA21nKQwJEJRlbnUFCQlFXlpeCWcGBUACCwlrdw8RKGImBwktdyMQEQciB7oACwcIeA4RVwAODiIGvHQKERAjxyMIB5QlVSTLYLZ0sW8hACH5BAkHAAAALAAAAAAYABgAAAW0ICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi%2BAS2SoyXrK4umWPM5wNiV0UDUIBNkdoepTfMkA7thIECiyRtUAGq8fm2O4jIBgMBA1eAZ6Knx%2BgHaJR4QwdCMKBxEJRggFDGgQEREPjjAMBQUKIwIRDhBDC2QNDDEKoEkDoiMHDigICGkJBS2dDA6TAAnAEAkCdQ8ORQcHTAkLcQQODLPMIgIJaCWxJMIkPIoAt3EhACH5BAkHAAAALAAAAAAYABgAAAWtICCOJNA0ZZoOpGGQrDoOBCoSxNgQsQzgMZyIlvOJdi%2BAS2SoyXrK4umWHM5wNiV0UN3xdLiqr%2BmENcWpM9TIbrsBkEck8oC0DQqBQGGIz%2Bt3eXtob0ZTPgNrIwQJDgtGAgwCWSIMDg4HiiUIDAxFAAoODwxDBWINCEGdSTQkCQcoegADBaQ6MggHjwAFBZUFCm0HB0kJCUy9bAYHCCPGIwqmRq0jySMGmj6yRiEAIfkECQcAAAAsAAAAABgAGAAABbIgII4k0DRlmg6kYZCsOg4EKhLE2BCxDOAxnIiW84l2L4BLZKipBopW8XRLDkeCiAMyMvQAA%2BuON4JEIo%2BvqukkKQ6RhLHplVGN%2BLyKcXA4Dgx5DWwGDXx%2BgIKENnqNdzIDaiMECwcFRgQCCowiCAcHCZIlCgICVgSfCEMMnA0CXaU2YSQFoQAKUQMMqjoyAglcAAyBAAIMRUYLCUkFlybDeAYJryLNk6xGNCTQXY0juHghACH5BAkHAAAALAAAAAAYABgAAAWzICCOJNA0ZVoOAmkY5KCSSgSNBDE2hDyLjohClBMNij8RJHIQvZwEVOpIekRQJyJs5AMoHA%2BGMbE1lnm9EcPhOHRnhpwUl3AsknHDm5RN%2Bv8qCAkHBwkIfw1xBAYNgoSGiIqMgJQifZUjBhAJYj95ewIJCQV7KYpzBAkLLQADCHOtOpY5PgNlAAykAEUsQ1wzCgWdCIdeArczBQVbDJ0NAqyeBb64nQAGArBTt8R8mLuyPyEAOwAAAAAAAAAAAA%3D%3D";

  //雛形を作っておく
  var profile_widget = <div class="question-status">
            <ul>
              <li class="__sidebar-li__">
                <a href={questionlist_url} title="質問履歴">
                  質問
                </a>
                <ul>
                  <li id="qCount">
                    <img src={loading_img}/>
                  </li>
                  <li id="qAverage">
                  </li>
                </ul>
              </li>
              <li class="__sidebar-li__">
                <a href={answerlist_url} title="回答履歴">
                  回答
                </a>
                <ul>
                  <li id="aCount">
                    <img src={loading_img}/>
                  </li>
                  <li id="aAverage">
                  </li>
                </ul>
              </li>
              <li class="__sidebar-li__">
                いるか賞
                <ul>
                  <li id="iruka">
                    <img src={loading_img}/>
                  </li>
                </ul>
              </li>
            </ul>
          </div>.toString();
  var range = document.createRange()
  var d = range.createContextualFragment(profile_widget);
  var sidebar = document.querySelector('#sidebar');
  sidebar.insertBefore(d, sidebar.firstChild);
  range.detach();


  GM_xmlhttpRequest({
    method:"GET",
    url: profile_url,
    headers:{
      "User-Agent":"Mozilla/5.0", "Accept":"text/xml"
    },
    onload:function(res) {

      var dom = document.createElement("div");
      dom.innerHTML = res.responseText;

      //質問関係の行
      var qRow = dom.querySelectorAll('#usertable tr:first-child + tr > td');
      var questionCount = qRow[0].textContent;
      var payCount = Number(qRow[1].textContent);
      var payAverage = qRow[2].textContent.replace(/ポイント/,"");
      var payPer = qRow[3].textContent;
      var payTotal = parseInt(Number(payCount * payAverage));
      if(payCount == 0) {
        payAverage = 0;
        payTotal = 0;
      }
      var payAverageTitle = "総支払いポイントは約 " + payTotal + " ポイント";

      //回答関係の行
      var aRow = dom.querySelectorAll('#usertable tr:first-child + tr + tr + tr > td');
      var answerCount = aRow[0].textContent;
      var receiveCount = Number(aRow[1].textContent);
      var receiveAverage = aRow[2].textContent.replace(/ポイント/,"");
      var receivePer = aRow[3].textContent;
      var receiveTotal = parseInt(Number(receiveCount * receiveAverage));
      if(receiveCount == 0) {
        receiveAverage = 0;
        receiveTotal = 0;
      }
      var receiveAverageTitle = "総受け取りポイントは約 " + receiveTotal + " ポイント";

      //いるか
      var iruka = dom.querySelector('.myirukacell');

      //雛形の上から順番に置換と追加
      var qA = <>{payCount} / {questionCount}回 ({payPer})</>.toString();
      var range = document.createRange();
      var qCdf = range.createContextualFragment(qA);
      var qCount = document.querySelector('#qCount img');
      qCount.parentNode.replaceChild(qCdf, qCount);
      range.detach();

      var qB = <>平均支払い：<u title={payAverageTitle}>{payAverage}</u>ポイント</>.toString();
      var range = document.createRange();
      var df = range.createContextualFragment(qB);
      var qAverage = document.querySelector('#qAverage');
      qAverage.appendChild(df);
      range.detach();

      var aA = <>{receiveCount} / {answerCount}回 ({receivePer})</>.toString();
      var range = document.createRange();
      var d = range.createContextualFragment(aA);
      var aCount = document.querySelector('#aCount img');
      aCount.parentNode.replaceChild(d, aCount);
      range.detach();

      var aB = <>平均受け取り：<u title={receiveAverageTitle}>{receiveAverage}</u>ポイント</>.toString();
      var range = document.createRange();
      var d2 = range.createContextualFragment(aB);
      var aAverage = document.querySelector('#aAverage');
      aAverage.appendChild(d2);
      range.detach();

      var piruka = document.querySelector('#iruka img');
      piruka.parentNode.replaceChild(iruka, piruka);
    }
});

  GM_addStyle(<><![CDATA[
    .__sidebar-li__
    {background: transparent none repeat scroll 0% 0% !important;
    -moz-background-clip: border !important;
    -moz-background-origin: padding !important;
    -moz-background-inline-policy: continuous !important;
    padding-top: 0pt !important;}

    .__sidebar-profile__
    {border: 1px solid #B1B1C7; width: 64px; height: 64px;}
  ]]></>);
})();



//プロフィールページに詳細プロフィールとダイアリーのリンクを付ける
(function() {
  var profileHeader = document.querySelector('.profile-header');

  //プロフィールページか判定
  if(!/さんのプロフィール$/.test(document.title)) return;

  var userId = /q\.hatena\.ne\.jp\/(.+?)\//.exec(location.href)[1];

  var src = <h1 class="profile-header">
               <a href="http://www.hatena.ne.jp/@@userId/" title="プロフィールをもっと見る">
                 @@profileHeader
               </a>
               <a href="http://d.hatena.ne.jp/@@userId/" title="@@userIdさんのダイアリー">
                 <img class="__diary_link__" src="http://www.hatena.ne.jp/images/serviceicon-d-m.gif"/>
               </a>
             </h1>.toString()
             .replace(/@@profileHeader/, profileHeader.innerHTML)
             .replace(/@@userId/g, userId);

  var range = document.createRange();
  var df = range.createContextualFragment(src);
  profileHeader.parentNode.replaceChild(df, profileHeader);
  range.detach();

  GM_addStyle(<><![CDATA[
    .__diary_link__
    {border: none !important;}
  ]]></>);
})();



//プロフィールページに総(支払い|受け取り)ポイントを表示する
(function() {
  //プロフィールページか判定
  if(!/さんのプロフィール$/.test(document.title)) return;

  //計算
  var q = document.querySelectorAll('#usertable tr + tr > td');
  var payCount = Number(q[1].textContent);
  var payAverage = Number(q[2].textContent.replace(/ポイント/, ""));
  var payTotal = parseInt(payCount * payAverage);
  if(payCount == 0) payTotal = 0;

  var a = document.querySelectorAll('#usertable tr + tr + tr + tr > td');
  var reciCount = Number(a[1].textContent);
  var reciAverage = Number(a[2].textContent.replace(/ポイント/, ""));
  var reciTotal = parseInt(reciCount * reciAverage);
  if(reciCount == 0) reciTotal = 0;

  //セル追加
  var payTh = document.createElement("th");
  payTh.appendChild(document.createTextNode("総支払いポイント"));
  var t = document.querySelector('#usertable tr');
  t.appendChild(payTh);

  var payTd = document.createElement("td");
  payTd.setAttribute("align", "center");
  payTd.appendChild(document.createTextNode(payTotal + "ポイント"));
  var d = document.querySelector('#usertable tr + tr');
  d.appendChild(payTd);

  var reciTh = document.createElement("th");
  reciTh.appendChild(document.createTextNode("総受け取りポイント"));
  var t = document.querySelector('#usertable tr + tr + tr');
  t.appendChild(reciTh);

  var reciTd = document.createElement("td");
  reciTd.setAttribute("align", "center");
  reciTd.appendChild(document.createTextNode(reciTotal + "ポイント"));
  var t = document.querySelector('#usertable tr + tr + tr + tr');
  t.appendChild(reciTd);

  //調整
  var iruka = document.querySelector('.myirukacell');
  iruka.setAttribute("colspan", 4);

  GM_addStyle(<><![CDATA[
    table#usertable td,
    table.configtable th
    {width: 20% !important;}
  ]]></>);
})();