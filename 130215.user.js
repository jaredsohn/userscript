// ==UserScript==
// @id             moug-post-id@yu-tang
// @name           moug post id
// @namespace      https://userscripts.org/users/441822
// @author         yu-tang
// @version        0.2.0
// @description    Post id for moug.
// @homepageURL    https://userscripts.org/scripts/show/130215
// @updateURL      https://userscripts.org/scripts/source/130215.meta.js
// @include        http://www.moug.net/faq/viewtopic.php*
// @include        http://moug.net/faq/viewtopic.php*
// @match          http://www.moug.net/faq/viewtopic.php*
// @match          http://moug.net/faq/viewtopic.php*
// ==/UserScript==
{

//###################################################
// GM_xpath function (非完全互換、簡易実装です)
//###################################################
if (typeof GM_xpath == 'undefined') {  // for Greasemonkey and Chrome (not Scriptish)
  var GM_xpath = function(arg) {
    var nl = document.evaluate(
        arg.path,
        (arg.node || document),
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );
    if (arg.all) {
      for (var i = 0, l = nl.snapshotLength, elms = []; i < l; i++)
        elms[i] = nl.snapshotItem(i);
      return elms;
    } else {
      return (nl.snapshotLength > 0) ? nl.snapshotItem(0) : null;
    }
  };
}

var postId = function() {
  // Check for one-time execution.
  if (document.getElementById('1')) return;

  // Add styles.
  GM_addStyle('span.postId{margin-left:1em;} span.postId:before{content:"＃";}');

  // Get list node.
  var e = GM_xpath({
    path: "//span[@class='small' and starts-with(., '投稿日時:')]",
    all : true
  });

  for (var i = 0, l = e.length, span; i < l; ++i) {
    span = document.createElement("span");
    span.className = "postId small";
    span.innerHTML = (i + 1).toString();
    e[i].parentNode.appendChild(span);
  }

  /**
   * レス番の span 自体に id を付けると、#n で移動したときに
   * 微妙に上が見切れるので、別途テーブルに id を付与する
   */
  e = GM_xpath({
    path: "//table[@class='response']",
    all : true
  });
  for (i = 0, l = e.length; i < l; ++i) {
    /* 数字から始まる id は CSS の仕様的に NG なため、'post' の 'p' を付加します */
    e[i].id = 'p' + (i + 1).toString();
  }

  /**
   * # アンカー指定のURLだった場合、初期状態ではアンカーが存在しないので
   * JavaScript で移動させる。
   * アンカー指定の主なバリエーションは、下記の通り。
   *
   * (1)NG: http://www.moug.net/faq/viewtopic.php#p2?t=123456&highlight=hoge
   * (2)Ok: http://www.moug.net/faq/viewtopic.php?t=123456&highlight=hoge&#p2
   * (3)Ok: http://www.moug.net/faq/viewtopic.php?t=123456#p2&highlight=hoge
   */
  var hash = window.location.hash;
  if (hash != '') {
    var re = /^#p(\d+).*$/;
    if (re.test(hash)) {
      hash = hash.replace(re, '$1');
      e = document.getElementById(hash);
      if (e) e.scrollIntoView(true);
    }
  }
}; // end of anonymous function

postId();

} // end of local scope
