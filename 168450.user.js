// ==UserScript==
// @name         度娘盘直接下载
// @namespace    http://jixun.org/
// @version      1.0.1.2
// @description  反正我又不用度娘云管家
// @include      *n.baidu.com/share/link*
// @include      *n.baidu.com/s/*
// @copyright    2012+, Jixun
// @run-at       document-start
// ==/UserScript==

try { var w=unsafeWindow } catch (e) { var w=window }
w.navigator.__defineGetter__ ('platform', function () {return 'Cracked by Jixun ^^'});