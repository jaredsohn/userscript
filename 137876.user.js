// ==UserScript==
// @name       自动跳转到微博
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      https://login.sina.com.cn/signup/signup1.php*
// @copyright  2012+, You
// ==/UserScript==

if(document.getElementsByClassName("title_big")[0].innerText == "恭喜您，新浪会员注册成功!")
{
    var email = document.getElementsByClassName("fb")[0].innerText;
    var url = "http://weibo.omom.com/apis/z/add.php?step=regsina&email="+email;
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", url);
    xmlhttp.onreadystatechange=function()
    {                
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            document.location.href = "http://weibo.com";
        }
    }
    xmlhttp.send(null);
    return true;
}