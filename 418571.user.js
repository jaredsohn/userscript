// ==UserScript==
// @name        little ituring
// @namespace   http://
// @description 使图灵社区的页面更易用
// @include     http://www.ituring.com.cn/*
// @version     1.00
// @grant       none
// ==/UserScript==
//'我的空间'与用户名指向相同的链接，不如将'我的空间'替换为'我的电子书'
if (document.getElementById('usermenu') .children[1].textContent == '我的空间')
    document.getElementById('usermenu') .children[1].innerHTML = '<a href="/book/ebook?sort=mine">我的电子书</a>'

//在阅读电子书时，为前后章节链接绑定左右键
document.onkeydown = function (event)
{
    var currentKey = event.keyCode;

    
    if (currentKey == '37')
    {
        if (document.getElementsByClassName('btn-group pull-right') [0].children[0].className != 'btn disabled')
        {
            //左键按下，且未被禁用，打开前一节
            document.location = document.getElementsByClassName('btn-group pull-right') [0].children[0];
        }
    }
    if (currentKey == '39')
    {
        if (document.getElementsByClassName('btn-group pull-right') [0].children[1].className != 'btn disabled')
        {
            //右键按下，且未被禁用，打开后一节
            document.location = document.getElementsByClassName('btn-group pull-right') [0].children[1];
        }
    }
}
