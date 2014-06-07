// ==UserScript==
// @name       12306验证码输入正确自动登陆,提交订单(调试中)
// @namespace  http://userscripts.org/users/liuxiang
// @version    0.1
// @description  12306验证码输入正确自动登陆,提交订单(调试中)
// @match      https://kyfw.12306.cn/otn/login/init
// @match      https://kyfw.12306.cn/otn/leftTicket/init
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @updateURL	https://userscripts.org/scripts/source/186407.meta.js
// @downloadURL	https://userscripts.org/scripts/source/186407.user.js
// @copyright  2013+, You
// ==/UserScript==


document.addEventListener("DOMContentLoaded", function () {
    
    // 自动填写
    document.getElementById("username").value='请关闭此userScript';
    document.getElementById("password").value='******';
    
    // 自定义账号切换
    document.getElementById('username').parentNode.insertAdjacentHTML("beforeEnd","&nbsp;&nbsp;<a id='acc1'>账-1</a>");
    document.getElementById('username').parentNode.insertAdjacentHTML("beforeEnd","&nbsp;&nbsp;<tr/><a id='acc2'>账-2</a>");
    //document.getElementById('forget_password_id').insertAdjacentHTML("beforeEnd","<br/>&nbsp;&nbsp;<a id='acc1'>liux..</a>");
    //document.getElementById('forget_password_id').insertAdjacentHTML("beforeEnd","&nbsp;&nbsp;<tr/><a id='acc2'>2900..</a>");      
    document.getElementById('acc1').onclick=account1;
    document.getElementById('acc2').onclick=account2;
    
    
    // 验证码注册事件
    var randCode = document.getElementById("randCode"); // get video element
    randCode.onkeyup=onkeyupi;
    
}, false);	

// 验证码正确,自动登陆
var errorNum=0;
function onkeyupi(){
    if(randCode.value.length == 4)
    {
        //for(var i=0;i<1000;i++);
        var a = document.getElementById('i-ok').style.cssText;
        
        if(a == 'display: block;')
        {
            document.getElementById("loginSub").click();// 验证码输入正确,自动登陆
            document.getElementById('selectYuding').children[0].click();// 登陆后自动切换到车票预订页
            document.getElementById('show_more').click();// 展开高级选项页 @TODO 无效
        }else
        {
            errorNum=errorNum+1;
            if(errorNum >1)
            {
                document.getElementById("img_rand_code").click();
                errorNum = 0;
            }
        }
    }
}

function account1()
{
    document.getElementById("username").value='******';
    document.getElementById("password").value='******';
    document.getElementById("randCode").focus();
}

function account2()
{
    document.getElementById("username").value='******';
    document.getElementById("password").value='******';
    document.getElementById("randCode").focus();
}