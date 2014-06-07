// ==UserScript==
// @name Tieba Democracy
// @namespace	http://hjthjthjt.tk/
// @author	HjtHjtHjt
// @icon	http://tb.himg.baidu.com/sys/portrait/item/4447b3acbcb6b3acbcb6d0a1b6b9b6b94e17
//@run-at document-end
// @version	1.0.0
// @description	贴吧民主-去除等级，人人平等
// @include	http://tieba.baidu.com/*
// ==/UserScript==

//喜大普奔
while(document.getElementsByClassName("l_badge")[0])
{
document.getElementsByClassName("l_badge")[0].remove()
}