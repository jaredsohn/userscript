// ==UserScript==
// @name        ckds_supporter
// @namespace   TiH
// @description  访问http://www.v2ipo.com/activity/show开始点赞。
// @include     http://www.v2ipo.com/activity/show
// @updateURL      https://userscripts.org/scripts/source/431159.meta.js
// @downloadURL    https://userscripts.org/scripts/source/431159.user.js 
// @version     1.4
// @require     http://www.v2ipo.com/static/js/jquery-1.8.3.min.js
// ==/UserScript==

//GM_setValue("ck_count", 0);
//GM_setValue("ck_mails", "");

if (GM_getValue("ck_mails", "") == "")
    GM_setValue("ck_mails", "ckds01@yeah.net;111111\nckds02@yeah.net;111111\nckds03@yeah.net;111111\nckds04@yeah.net;111111\nckds05@yeah.net;111111\nckds06@yeah.net;111111");

if (GM_getValue("ck_start", "") == "")
    GM_setValue("ck_start", false);
    
var debugx = document.createElement("div");
debugx.id = "debug";
document.body.appendChild(debugx);
GM_addStyle("#debug { width:280px; z-index:1000; text-align: center; background-color:#fff;position:absolute; top:0; left:0; border:1px solid grey; }");

var progress = document.createElement("span");
progress.id = "progress";
debugx.appendChild(progress);
progress.innerHTML='Come on!';

var inpem = document.createElement("textarea");
inpem.id = "inpem";
inpem.value=GM_getValue("ck_mails", "");
debugx.appendChild(inpem);
GM_addStyle("#inpem { width:270px; height:300px; }");

var ck_start = document.createElement("a");
ck_start.innerHTML = "开始";
ck_start.id = "ck_start";
ck_start.addEventListener("click", ck_startf, false);
debugx.appendChild(ck_start);
GM_addStyle("#ck_start{ color: #FFF; border:1px solid grey; background-color:#966;}");
GM_addStyle("#ck_start:hover{background-color:#a88;}");


var getmails = GM_getValue("ck_mails", "")
ck_work();

function ck_startf(){
    alert("开始点赞..结束会弹出提示，结束前请勿关闭浏览器^_^");
    var inps = inpem.value.replace(/ /g,"");
    GM_setValue("ck_mails", inps);
    GM_setValue("ck_succeess", 0);
    GM_setValue("ck_start", true);
    getmails = GM_getValue("ck_mails", "");
    ck_work();
    return;
}

function ck_work(){
    if (getmails != "" && GM_getValue("ck_start", false)){
       var i = GM_getValue("ck_count", 0);
        getmails = getmails.split("\n");
       var ck_user = getmails[i].split(";");
        setTimeout(function (){__login(ck_user[0], ck_user[1]);},100);
        setTimeout(function(){__support();},300);
        setTimeout(function (){__logout();},500);
       i++;
        progress.innerHTML= i +'/' + getmails.length;
        if (i >= getmails.length){
           GM_setValue("ck_start", false);
            //alert("全都赞完啦！成功赞了" + GM_getValue("ck_succeess", 0) + "个！");
            setTimeout(function (){alert("全都赞完啦！成功赞了" + GM_getValue("ck_succeess", 0) + "个！");},500);
            i = 0;
        }
       GM_setValue("ck_count", i);
        setTimeout(function(){location.reload();},600);
        
        //__login(mails[i]);
        //alert(mails[i]);
        
        //__logout();
    }
    return;
}

//location.reload();
/*
    flag4 = true;
    flag5 = true;
    $("#ajax_email").val("ckds01@163.com");
    $("#ajax_pwd").val("111111")
    setTimeout(function(){$("#ajax_submit").trigger('mousedown');},200);*/


function __login(mail,pwd){
$.ajax({
                    type: 'POST',
                    url: '/login/ajax_login',
                    data : 'email='+mail+'&'+'password='+pwd+'&'+unsafeWindow.csrf_name+'='+unsafeWindow.csrf_token_name,
                    dataType:"json",
                    success : function(msg){
                        if(msg==0)
                        {
                            $("#check_ajax_email").show();
                            $("#check_ajax_email").html('邮箱或密码错误');
                        }
                        if(msg==1)
                        {
                            ;//location.reload();
                        }
                        if(msg==2)
                        {
                            ;//location.reload();
                        }
                        if(msg==3)
                        {
                            $("#check_ajax_email").show();
                            $("#check_ajax_email").html('账户已冻结');
                        }
                        if(msg==4)
                        {
                            $("#check_ajax_email").show();
                            $("#check_ajax_email").html('邮箱未激活');
                            $("#check_ajax_email").after(' <a href="/login/send">重新发送激活邮件</a>');
                        }
                        if(msg==5)
                        {
                            $("#check_ajax_email").show();
                            $("#check_ajax_email").html('邮箱不存在');
                        }
                    }
                });
}

function __logout(){

        $.ajax({
            type: 'POST',
            url: '/login/ajax_logout',
            data : unsafeWindow.csrf_name+'='+unsafeWindow.csrf_token_name,
            success : function(msg){
                if(msg == 1) {
                    ;//location.reload();
                }else {
                    return false;
                }
            }
            });
}

function __support()
{
    $.ajax({
        type: 'POST',
        url: '/activity/vote',
        data : 'activity_id=240'+'&'+unsafeWindow.csrf_name+'='+unsafeWindow.csrf_token_name,
        dataType:'json',
        success : function(msg){
            if(msg.message=='login')
            {
                ;//alert('肿么出现问题了呢..这个用户没登录..');
            }
            if(msg.message=='success')
            {
                GM_setValue("ck_succeess", GM_getValue("ck_succeess", 0) + 1);//$("#"+id).html(msg.vote);
            }
            if(msg.message=='fail')
            {
                ;//alert('亲，一天只能点一次，明天再来吧！');
            }
        }
    })
}