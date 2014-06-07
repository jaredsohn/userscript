/*
// ==UserScript==
// @id              百度网址免跳转
// @name            百度网址免跳转
// @version         0.2.9
// @namespace       http://cuoan.net/
// @author          Xinkai Chen <yeled.nova@gmail.com> http://cuoan.net/
// @description     使得百度的搜索结果不再通过百度的服务器转向，从而避免隐私泄漏与减少响应时间。
// @include         http://www.baidu.com/*
// @run-at          document-end
// @homepage        http://cuoan.net/
// @homepageURL     http://cuoan.net/
// @website         http://cuoan.net/
// @updateURL       http://userscripts.org/scripts/source/149118.meta.js
// ==/UserScript==

需要支持Typed Array、FileReader、Blob的浏览器。
访问 http://www.cuoan.net/百度搜索链接免跳转/ 并留言。

====== Changelog =======

0.2.9   2012-11-03
* 由于百度变更算法，暂时将本脚本改为no-op。请等待更新。

0.2.2   2012-10-01
* 支持更长网址的破解

0.2.1   2012-09-30
* Fix typo
* 支持更长网址的破解

0.2     2012-09-30
* 使用Typed Array，所以解码速度变快了
* 使用GB18030进行解码，支持未经escape的中文字符
* 使用Asynchronous calls，减少界面卡顿时间
* 遇到不支持GM_*函数的情况下，不再报错（建议使用测试通过的用户脚本管理器）
* 改写部分代码，改进性能

0.1.1   2012-09-29
* 可以破解更多的网址了

0.1     2012-09-26
* 最初发布

====== Changelog =======
*/

var VERSION;

VERSION = "0.2.9";