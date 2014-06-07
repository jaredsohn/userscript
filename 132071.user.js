// ==UserScript==
// @id             moug-pretty-date@yu-tang
// @name           moug pretty date
// @namespace      https://userscripts.org/users/441822
// @author         yu-tang
// @version        0.1.2
// @description    Pretty date for moug.
// @homepageURL    https://userscripts.org/scripts/show/132071
// @updateURL      https://userscripts.org/scripts/source/132071.meta.js
// @include        http://www.moug.net/faq/view*
// @include        http://www.moug.net/faq/posting.php*
// @include        http://moug.net/faq/view*
// @include        http://moug.net/faq/posting.php*
// ==/UserScript==
{

/**
 * prettyDate()
 * ==============
 * 日時文字列を twitter スタイルに整形します。
 */
function prettyDate(args) { /* args = {targetDate, baseTime} */
  var A_SECOND          = 1000;
  var A_MINUTE          = A_SECOND * 60;
  var AN_HOUR           = A_MINUTE * 60;
  var TWENTY_FOUR_HOURS = AN_HOUR  * 24;

  var targetTime = args.targetDate.getTime();
  var elapsed = args.baseTime - targetTime; // in milliseconds
  var nextInterval = 0;

  /* 24 hours ago or more */
  if (elapsed >= TWENTY_FOUR_HOURS) {
    var m = args.targetDate.getMonth() + 1;
    var d = args.targetDate.getDate();
    var monthDateInLocal = m + '月' + d + '日';
    return {date: monthDateInLocal, nextInterval: nextInterval};
  }

  /* 1 hour ago or more */
  if (elapsed >= AN_HOUR) {
    var h = Math.floor(elapsed / AN_HOUR);
    nextInterval = (h + 1) * AN_HOUR - elapsed;
    return {date: h + '時間', nextInterval: nextInterval*1};
  }

  /* 1 minute ago or more */
  if (elapsed >= A_MINUTE) {
    var m = Math.floor(elapsed / A_MINUTE);
    nextInterval = (m + 1) * A_MINUTE - elapsed;
    return {date: m + '分', nextInterval: nextInterval};
  }

  /* 1 second ago or more */
  if (elapsed >= A_SECOND) {
    var s = Math.floor(elapsed / A_SECOND);
    nextInterval = (s + 1) * A_SECOND - elapsed;
    return {date: s + '秒', nextInterval: nextInterval};
  }
  /* just now */
  if (elapsed >= 0) {
    return {date: 'たった今', nextInterval: 5 * A_SECOND};
  }

  /* something is wrong */
  return {date: args.targetDate.toLocaleString(), nextInterval: nextInterval};

} /* end of prettyDate function */


function toPrettyDate(args) { /* args = {route, diff, elements} */
  if (!args.elements) return;

  // Set base time.
  var baseTime = Date.now() + args.diff;

  // Iterating element arrays
  /**
   * ループ中で配列要素を削除する都合上、逆順でループします。
   */
  var e, time, updDate, targetDate, prtDate, nextInterval = 0;
  var i = args.elements.length;
  while (i--) {
    e = args.elements[i];
    time = e.getElementsByTagName('time')[0]; /* 無いかもしれない。無い場合は undefined */
    /**
     * 下記でパースする日付が "2012/04/23 09:28:17" のようにタイムゾーン
     * 未指定だった場合、地方時とみなされます。もしクライアント PC の設定
     * が日本時間ではなかった場合、誤ってパースされる危険性があるため、
     * タイムゾーン指定を追加してパースするものとします。
     * time 要素を使用するため、保持する日付式は ISO-8601 (のサブセットの
     * W3C-DTF) 形式を採用します。
     * YYYY-MM-DDThh:mm:ssTZD
     * （例：2001-08-02T10:45:23+09:00）
     * time 要素の実装が進めば将来的には time 要素から日付を直接取得できる
     * と思われますが、Firefox12 or Chrome18 時点ではインターフェイスが整備
     * されていないため、datetime 属性（文字列）から取得して日付変換します。
     * 
     * 実装の確認は下記にて行いました。
     * Text-level semantics - HTML5 API チェッカー - HTML5 チュートリアル - HTML5.JP
     * http://www.html5.jp/tutorial/apicheck/text-level-semantics.html 
     */
      updDate = (time && time.getAttribute('datetime'))
             || e.innerHTML.replace(
                  (args.route == 'viewforum'
                    ? /^\s*(\d{2})\/(\d{2})\/(\d{2}) (.+)\s*$/
                    : /^投稿日時\:&nbsp;(\d{2})\/(\d{2})\/(\d{2}) (.+)$/
                  ),
                  '20$1-$2-$3T$4\+09:00'
                );

    /**
     * トピック表示の場合、args.elements の中にバージョン指定用の 
     * span 要素が混入します。innerHTML の値は空文字列だったり、
     * "(Windows XP全般 : Excel 2003)" のような文字列だったりします。
     * そのため、下記にて Date 変換でエラー (NaN) になった要素を
     * 除外します。
     */
    targetDate = new Date(updDate);
    if (isNaN(targetDate)) {
      args.elements.splice(i, 1);
      continue;
    }

    prtDate = prettyDate({
      targetDate: targetDate,
      baseTime  : baseTime
    });

    if (prtDate.nextInterval) {
      if (nextInterval == 0)
        nextInterval = prtDate.nextInterval;
      else if (nextInterval > prtDate.nextInterval)
        nextInterval = prtDate.nextInterval;
    }

    // set title only at the first time.
    if (!e.hasAttribute('title')) {
      /**
       * 日本語ロケールでの日時文字列を自前で生成します
       * ==============================================
       *
       * Chrome で Date.toLocaleString() を使わない理由
       * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
       * Firefox12 では、Date.toLocaleString() は以下のような戻り値を
       * 返します。
       *
       * "2012年4月28日 20:42:15"
       *
       * 一方、Chrome18 は、以下のような戻り値を返します。
       *
       * "Sat Apr 28 2012 20:42:15 GMT+0900 (東京 (標準時))"
       *
       * これはかなりイヤンな感じなので、Google Chrome 上での実行時にも
       * Firefox の日本ロケール表記に統一整形するため、自前処理します。
       *
       * Firefox で Date.toLocaleString() を使わない理由
       * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
       * Firefox には下記バグがあり、Scriptish 経由だと文字化けする場合が
       * あるためです。
       *
       * 441370 – Date.toLocaleString() uses wrong encoding if called from an XPCOM component
       * https://bugzilla.mozilla.org/show_bug.cgi?id=441370 
       *
       * たとえば本来「2012年4月30日」と出力してほしいのに、「2012N430ú」
       * とかになります。
       * どうやら XPCOM の途中に SJIS 変換するダメな処理が挟まっている模様。
       * Scriptish の同じバージョンでも再現したりしなかったりするので、
       * 再現条件は未特定だけれど、特定作業が大変そう（な上に特定した
       * ところで回避できるか不明）なので、toLocaleString() を呼ばずに、
       * 単純に自前生成で回避しておきます。
       */
      var yyyy = targetDate.getFullYear(),
          m    = targetDate.getMonth() + 1,
          d    = targetDate.getDate();
      e.setAttribute('title', yyyy + '年' + m + '月' + d + '日 ' +targetDate.toLocaleTimeString());
    }

    // set or update pretty date value.
    if (time)
      time.innerHTML = prtDate.date;
    else if (args.route == 'viewforum')
      e.innerHTML = '<time datetime="' + updDate + '">' + prtDate.date + '</time>';
    else
      e.innerHTML = '投稿日時:&nbsp;<time datetime="' + updDate + '">' + prtDate.date + '</time>';

    // If the pretty date value is frozen, remove the element from target array.
    if (prtDate.nextInterval == 0)
      args.elements.splice(i, 1);
  }

  // set next timer.
  if (nextInterval) {
    window.setTimeout(toPrettyDate, nextInterval, args);
  }

}

/**
 * 整形処理の概要
 * ==============
 * サーバーから時刻を取得して、それを基準値として使用します。
 * したがってオフライン時は基準値がずれることがあります。
 */
var online = window.navigator.onLine;
var route = window.location.pathname.slice(5, -4);  // "/faq/hoge.php" -> "hoge"
var selectors = (
  route == 'viewforum'
  ? 'div#center table.qlist td:nth-child(2)'                       /* 更新日時列 */
  : 'div#center table.response div.floatR span.small:first-child'  /* 投稿日時欄 */
);
var elements = (function(){
  var nodeList = document.querySelectorAll(selectors);
  var e = [];
  for (var i = 0, len = nodeList.length; i < len; ++i)
    e.push(nodeList[i]);
  return e;
})(selectors);
var STORAGE_KEY = 'moug_pretty_date.diff'; /* Chrome (Webkit) が const を未実装の模様なので、var で代替します。 */
var diff = sessionStorage.getItem(STORAGE_KEY);
/**
 * diff の値（サーバー日時とローカル日時の差分）は、そう頻繁には
 * 変わらないと予想されます。それを毎回（ページを遷移するたびに）
 * サーバーに問い合わせるのは無駄手間になる可能性が高いため、
 * 初回問い合わせ時にセッションストレージに保存して、同じセッション
 * 内であれば使いまわすようにします。
 */
if (diff === null) {
  if (online) {
    GM_xmlhttpRequest({
      method: "HEAD",
      url   : "http://" + window.location.hostname + "/",
      onload: function(response) {
        var d = /^Date: (.+)$/im.exec(response.responseHeaders)[1];
        var serverDate = new Date(d);
        var localDate = new Date();
        var diff = serverDate - localDate;
        // 現在のセッションの保存領域にデータを保存する
        sessionStorage.setItem(STORAGE_KEY, diff);
        toPrettyDate({
          route    : route,
          diff     : diff,
          elements : elements
        });
      }
    });
  } else { // offline
    //  GM_notification("オフラインのため、サーバー日時ではなくローカル日時を基準とします。");
    toPrettyDate({
      route    : route,
      diff     : 0,
      elements : elements
    });
  }
} else {
  toPrettyDate({
    route    : route,
    diff     : new Number(diff),
    elements : elements
  });
}

} // end of local scope
