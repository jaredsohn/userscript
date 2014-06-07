// ==UserScript==
// @name       去除帖子右边二维码
// @version    0.1
// @description  完美去除帖子右边客户端二维码，页面刚刚加载完毕时可能会闪一下二维码~
// @include     http://tieba.baidu.com/p/*
// @include     http://tieba.baidu.com/f?*
// @copyright  By 小豆豆
// ==/UserScript==

document.getElementById("j_dimension").innerHTML=" ";