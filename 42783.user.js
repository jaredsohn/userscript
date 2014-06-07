// ==UserScript==
// @name           CodeProject Title Mod
// @namespace      http://endflow.net/
// @description    Removes prefix string ("CodeProject: ") from page title.
// @include        http://www.codeproject.com/KB/*/*.aspx
// @include        http://69.10.233.10/KB/*/*.aspx
// @version        0.1.0
// ==/UserScript==
// @author         Yuki KODAMA (Twitter: kuy, Skype: netkuy)
// @history        [2009-02-02] 0.1.0 first version

(function(){
document.title = document.title.replace('CodeProject: ', '');
})();
