// ==UserScript==
// @name           comicsundayfirefox4
// @namespace      com.teraapi
// @include        http://club.shogakukan.co.jp/dor/common/js/common.js
// @include        http://club.shogakukan.co.jp/dor/pcviewer_main.php*
// ==/UserScript==
unsafeWindow.browsers = [
    {name:"InternetExplore6.0"  , regex_user_agent:/MSIE 6.0/},
    {name:"InternetExplore7.0"  , regex_user_agent:/MSIE 7.0/},
    {name:"InternetExplore8.0"  , regex_user_agent:/MSIE 8.0/},
    {name:"Safari"              , regex_user_agent:/Safari/},
    {name:"Firefox2"            , regex_user_agent:/Firefox\/2/},
    {name:"Firefox3"            , regex_user_agent:/Firefox/},
];
unsafeWindow.CheckBrowser = function() {
  return "Firefox3";
}