// ==UserScript==
// @name        Add Event in Kankou Gifu to Google Calender
// @version     2014032602
// @namespace   https://userscripts.org/users/ats777
// @include     http://www.kankou-gifu.jp/event/*/
// @grant       none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js
// ==/UserScript==

function main($) {

base_url = 'http://cc-lab.sakura.ne.jp/app/040/';
count_url = base_url + 'count.cgi';
gcrank_url = base_url + 'gcrank.html';

var gc_btn_url = 'https://www.google.com/calendar/images/ext/gc_button6_ja.gif';

// タイトル
var q_text = $('#detailInfo > h2').text().replace(/　*\[.*/,'');
// 詳細
var q_details;
// 住所
var q_location;
// 開催期間
var q_dates;
// 開催期間 取得失敗 警告
var q_dates_warning = '【開催日時 要確認】';

// 開催期間のデフォルトは今日（取得失敗時に利用）
var now = new Date();
// 開始:年
var sy = now.getFullYear();
// 終了:年
var ey = sy;
// 開始:月
var sm = now.getMonth();
if ( sm < 10 ) { sm = '0' + sm; }
// 終了:月
var em = sm;
// 開始:日
var sd = now.getDate();
if ( sd < 10 ) { sd = '0' + sd; }
// 終了:日
var ed = now.getDate()+1;
if ( ed < 10 ) { ed = '0' + ed; }

var sdate_pat = '(?:([0-9０-９]{4}|平成[0-9０-９]{2})[\/年])?(?:は)?([0-9０-９]{1,2})[\/月]([0-9０-９]{1,2})(?:日)?[^～]*';
var edate_pat = '～(?:([0-9０-９]{4})[\/年])?(?:([0-9０-９]{1,2})[\/月])?([0-9０-９]{1,2})(?:日)?';
/*
開催期間が２日間以上のもの
sdate_pat + edate_pat
開催期間が１日だけのもの
sdate_pat

福地温泉青だるライトアップ
http://www.kankou-gifu.jp/event/1216/
2013/12/24～2014/3/31(予定)
特別イベント期間：2014/2/3～2/13
=> q_dates = '20131224/20140332'

伊自良湖ワカサギ釣り
http://www.kankou-gifu.jp/event/1278/
9月下旬～5月上旬
今年は9/15(日・祝)～2014/05/06(火・振)
=> q_dates = '20130915/20140507'

安八梅まつり
http://www.kankou-gifu.jp/event/1294/
2013/02/17(日)～03/17(日)
=> q_dates = '20130217/20130318'

春の高山祭｜イベント｜ぎふの旅ガイド
http://www.kankou-gifu.jp/event/1311/
毎年4/14～15
=> q_dates = 20140414/20140416

大垣まつり
http://www.kankou-gifu.jp/event/1322/
2013年は5月11日(土)12(日)
=> q_dates = '20130511/20130512'

北アルプス・雪の回廊
http://www.kankou-gifu.jp/event/3235/
2014年1月～3月（天候により変動あり）
=> 【開催日時 要確認】

こども天国!!　みたけの森ささゆりまつり
http://www.kankou-gifu.jp/event/4559/
平成２６年６月１日（日）
=> q_dates = '20140601/20140602'
*/

// 全角数字->半角数字
function zen2han(str) {
  if ( typeof str != 'undefined' ) {
    // '０'.charCodeAt(0) => 65296
    return str.replace(/[０-９]/g,function(c){return c.charCodeAt(0)-65296});
  } else {
    return '';
  }
}

// 文字列切り捨て
function truncate(text, length, ellipsis) {
  if ( typeof length == 'undefined' ) {
    var length = 20;
  }
  if ( typeof ellipsis == 'undefined' ) {
    var ellipsis = '…';
  }
  if ( text.length < length ) {
    return text;
  }
  return text.substr(0,length) + ellipsis;
}

// 詳細の収集
q_details = window.location.href + "\n\n";
$('#detailList > table > tbody > tr ~ tr').each(function(){
  var th = $(this).children('th').text().trim().replace(/\s+/,' ');
  // 詳細 項目名
  q_details += th + "：";
  var td = $(this).children('td').text().trim().replace(/\s+/,' ');
  //if ( th == '開催期間' || th == '営業時間' ) {
  if ( th == '開催期間' ) {
    if ( ( m = td.match(sdate_pat + edate_pat) )
      || ( m = td.match(sdate_pat) ) ) {
      m = m.map(function(s){return zen2han(s)});
      sy = m[1] || '';
      sm = m[2] || '';
      sd = m[3] || '';
      ey = m[4] || '';
      em = m[5] || '';
      ed = m[6] || '';
      //alert([sy,sm,sd,ey,em,ed]);
      // 開始:月
      if ( sm.length == 1 ) {
        sm = '0' + sm;
      }
      // 開始:日
      if ( sd.length == 1 ) {
        sd = '0' + sd;
      }
      // 終了:月
      if ( em == '' ) {
        em = sm;
      } else if ( em.length == 1 ) {
        em = '0' + em;
      }
      // 終了:日
      if ( ed != '') {
        ed = parseInt(ed) + 1;
      } else {
        ed = parseInt(sd) + 1;
      }
      if ( ed < 10 ) {
        ed = '0' + ed;
      }
      // 年跨ぎ判定
      var multiyear = (sm > em) ? 1 : 0;
      // 年の設定
      if ( sy != '' && ey == '' ) {
        if ( m = sy.match(/平成(\d{2})/) ) {
          sy = parseInt(m[1]) + 1988;
        }
        ey = parseInt(sy) + multiyear;
      } else if ( sy == '' && ey != '' ) {
        sy = parseInt(ey) - multiyear;
      } else if ( sy == '' && ey == '' ) {
        ey = new Date().getFullYear();
        sy = ey - multiyear;
      }
      // 開催期間を取得できたので警告を消去
      q_dates_warning = '';
    }
  } else if ( th == '住所' ) {
    // 住所の設定
    q_location = td;
  } else if ( th == 'ホームページ' ) {
    td = $(this).find('td a').attr('href');
  }
  if ( th == '開催期間'
    || th == '開催時間'
    || th == '住所'
    || th == '営業時間'
    || th == '料金'
    || th == 'アクセス'
    || th == '備考' ) {
    // URLを2000バイト以下に抑えるため、長い項目を省略する
    td = truncate(td);
  }
  // 詳細 項目値
  q_details += td + "\n";
});

// 開催期間の設定
q_dates = [ sy, sm, sd, '/', ey, em, ed ].join('');
//alert(q_dates);

var gc_add_url = 'https://www.google.com/calendar/event?'
               + 'action=TEMPLATE'
               + '&text=' + encodeURIComponent(q_text + q_dates_warning)
               + '&dates=' + q_dates
               + '&location='+ encodeURIComponent(q_location)
               + '&details=' + encodeURIComponent(q_details)
               + '&trp=true';

$('#detailList > *:last-child').after(
  $('<div>',{
    style: 'margin-top:10px;text-align:center;'
  }).append(
    $('<a>',{
      href: gc_add_url,
      target: '_blank',
      style: 'vertical-align:middle;'
    }).append(
      $('<img>',{
        src: gc_btn_url,
        click: function(){
          if ( window.location.href.match(/\/(\d+)\/$/) ) {
            $.post(count_url, RegExp.$1);
          }
        } // click
      }) // </img>
    ) // </a>
  ) // </div>
);

$('#btnReserve').before(
  $('<iframe>',{
    src: gcrank_url,
    style: 'width:100%;border:none;'
  })
);
//alert('ok');

} // main

if ( typeof $ == 'undefined' ) {
  // for Chrome
  (function(callback){
    var script = document.createElement('script');
    script.setAttribute('src', "//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js");
    script.addEventListener('load', function(){
      var script = document.createElement('script');
      script.textContent = '(' + callback.toString() + ')(jQuery.noConflict(true));';
      document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
  })(main);
} else {
  main($);
}
