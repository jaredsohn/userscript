// ==UserScript==
// @name       注册新浪账号和邮箱
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  新浪注册助手
// @match      https://login.sina.com.cn/signup/signup.php?entry=sso*
// @copyright  2012+, You
// ==/UserScript==

function getid()
{
	var url = "http://weibo.omom.com/apis/z/getid.php";
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", url);
    xmlhttp.onreadystatechange=function()
    {                
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var ret = eval('(' + xmlhttp.responseText + ')');
            if(ret.code == 'A00000')
            fill(ret.data);
            else
            alert('自动填写失败！请重试或联系技术解决。');
        }
    }
    xmlhttp.send(null);
    return true;
}

function fill(data)
{
	document.getElementsByName("user_name")[0].value = data.uname;
	document.getElementsByName("password")[0].value = data.pwd;
	document.getElementsByName("password2")[0].value = data.pwd;
	document.getElementsByName("selectQid")[0].value = data.qst;
	document.getElementsByName("pwdA")[0].value = data.asr;
	document.getElementsByName("nick")[0].value = data.nick;
        document.getElementsByName("selectQoption")[0].value = data.qst;
        document.getElementsByName("door")[0].focus();

}

getid()