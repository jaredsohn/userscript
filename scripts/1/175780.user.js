// ==UserScript==
// @name        百度音乐盒拉宽
// @descriptiton  修正百度音乐盒右边的空白，注意不要改变右边歌词模块的宽度.
// @author    527836355
// @license GPL3.0
// @namespace   5278@124.com
// @include     http://play.baidu.com/
// @run-at document-start
// @version     1.0
// ==/UserScript==
//根据建议还是改一下吧,相当于加入样式
GM_addStyle('#pauseAd{display:none!important;}.column3{right:0px !important;}.column2{margin-right:-165px !important;}');
