// ==UserScript==
// @name       开通新浪微博
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  enter something useful
// @match      *weibo.com/signup/full_info.php*
// @copyright  2012+, You
// ==/UserScript==

function getinfo()
{
	var url = "http://weibo.omom.com/apis/z/weiboinfo.php";
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
    document.getElementById("nickname").value = data.nick;
    document.getElementById("realname").value = data.name;
    document.getElementById("sin").value = data.idnum;
    if(data.nick.length % 2){
        document.getElementById("rdoboy").checked = "checked";
    }else{
        document.getElementById("rdogirl").checked = "checked";
    }
    document.getElementsByName("basedoor")[0].focus();
    document.getElementById("submit").click();
}

getinfo();