// ==UserScript==
// @name           Vkontakte.ru safe url
// @namespace      lmrvsk
// @description    Заменяет некоторые "зловредные" ссылки на прямые.
// @include        http://vkontakte.ru/*
// @include        http://vk.com/*
// ==/UserScript==

var fixlinks = [
  "//a[contains(@href, '/away.php?')][contains(@href, 'tumblr.com')]",
  "//a[contains(@href, '/away.php?')][contains(@href, 'blogspot.com')]",
  "//a[contains(@href, '/away.php?')][contains(@href, '.tomsk.ru')]",
  "//a[contains(@href, '/away.php?')][contains(@href, 'rapidshare.com')]",
  "//a[contains(@href, '/away.php?')][contains(@href, 'rapidshare.de')]",
  "//a[contains(@href, '/away.php?')][contains(@href, 'depositfiles.com')]",
  "//a[contains(@href, '/away.php?')][contains(@href, 'megashare.com')]",
  "//a[contains(@href, '/away.php?')][contains(@href, 'hotfile.com')]",
  "//a[contains(@href, '/away.php?')][contains(@href, 'vip-file.com')]",
  "//a[contains(@href, '/away.php?')][contains(@href, 'fileserve.com')]",
  "//a[contains(@href, '/away.php?')][contains(@href, 'filesonic.com')]",
  "//a[contains(@href, '/away.php?')][contains(@href, 'letitbit.net')]",
  "//a[contains(@href, '/away.php?')][contains(@href, 'bitshare.com')]",
  "//a[contains(@href, '/away.php?')][contains(@href, 'turbobit.net')]",
];

function $x(p, c) {
    if (!c) c = document;
    var i, arr = [], xpr = document.evaluate(p, c, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
    return arr;
}

fixlinks.forEach(
    function(xpath) {
        $x(xpath).forEach(
            function(item) {
            	var awurl = /(.+)\&h=(.+)/;
				item.href = item.href.replace(awurl, '$1');
				awurl = /http:\/\/(.+)\/away\.php\?to=(.+)/;
				item.href = decodeURIComponent(item.href.replace(awurl, '$2'));
            }
        )
    }
)