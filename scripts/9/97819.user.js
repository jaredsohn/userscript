// ==UserScript==
// @name           old_twitter_erase_persistent_statuses
// @version        1.0.0
// @namespace      http://d.hatena.ne.jp/phithon/
// @description    Erase persistent status message from old Twitter. / 旧Twitterでつぶやき入力欄の文字が消えない問題を解消します。
// @include        http://twitter.com/*
// @include        https://twitter.com/*
// ==/UserScript==
if (!document.getElementById('doc')) {
    document.cookie = 'param_status=; expires=Thu, 1-Jan-1970 00:00:00;';
}
