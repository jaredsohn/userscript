// ==UserScript==
// @name Tieba Anonymous=Deceiving
// @namespace	http://aboutall.cn
// @author	HjtHjtHjt
// @icon	http://tb.himg.baidu.com/sys/portrait/item/4447b3acbcb6b3acbcb6d0a1b6b9b6b94e17
//@run-at document-end
// @version	1.1.0
// @description	贴吧匿(qi)名(pian)模式开启~
// @include	http://tieba.baidu.com/*
// ==/UserScript==

while(document.getElementsByClassName("d_author")[0])
{
document.getElementsByClassName("d_author")[0].remove();
}
while(document.getElementsByClassName("at j_user_card")[0])
{
document.getElementsByClassName("at j_user_card")[0].remove();
}
while(document.getElementsByClassName("j_user_card lzl_p_p")[0])
{
document.getElementsByClassName("j_user_card lzl_p_p")[0].remove();
}