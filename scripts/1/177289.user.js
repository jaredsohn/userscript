// ==UserScript==
// @name    说吧通话助手
// @author  有一份田
// @description 突破"说吧"会员和积分限制,自由畅打电话,自由呼叫
// @namespace   http://userscripts.org/scripts/show/177289
// @updateURL   https://userscripts.org/scripts/source/177289.meta.js
// @downloadURL https://userscripts.org/scripts/source/177289.user.js
// @icon    http://duoluohua.com/myapp/script/shuoba/images/icon_48.png
// @license GPL version 3
// @encoding    utf-8
// @include https://www.10086china.com/
// @include https://www.10086china.com/index*
// @include http://www.10086china.com/
// @include http://www.10086china.com/index*
// @run-at  document-end
// @version 2.0.1
// ==/UserScript==



/*
 * === 说明 ===
 *@作者:有一份田
 *@官网:http://duoluohua.com/download/
 *@Email:youyifentian@gmail.com
 *@Git:http://git.oschina.net/youyifentian
 *@转载重用请保留此信息
 *@最后修改时间:2013.09.07
 *
 *
 */
 // ===使用声明====
 
var statement='  声明:该脚本严禁用于任何商业通途,仅供个人学习、交流、研究、测试使用,\
切勿用其损害他人或公司利益,本脚本从安装使用开始,其产生的任何行为均由安装使用者本人负责,\
与原作者无任何关系,任何使用者一旦安装本脚本即认为其了解并同意本声明。';

 if(!window.localStorage["yyft_shuoba_isconsent"]){
    alert(statement);
    window.localStorage["yyft_shuoba_isconsent"]=1;
 }
 // ====/使用声明====
 
var version="2.0.1";


//是否在本地脚本无效时启用远程的开发者测试脚本,该脚本一般为
//开发测试的Beta版,仅在本地无效而作者又未来得及部署更新时会启用,
//主要用于紧急情况,当然你可以把其值改为:false以关闭该功能.
//另外:远程脚本与本地脚本执行条件和环境不同,不能直接复制到油猴子扩展中直接使用.
isRemoteJs=true;

//以下为自定义信息,仅会在用户没有登录和绑定信息时显示

//主叫电话(可选,并不会显示)
var myPhone="";

//用户头像地址(可选)
var myPicUrl="";

//用户昵称(可选)
var myName="";


(function(){

    document.myPhone=myPhone;
    document.myPicUrl=myPicUrl;
    document.myName=myName; 
    document.Call=myCall;

    var callBtn=document.getElementById("callbtn");
    if(!callBtn){
        if(isRemoteJs)loadRemoteJs();
        return;
    }
    try{
        var infoBox=document.getElementsByClassName("myinfo"),
        userInfo=infoBox[0],html="",
        imgurl=userInfo.getElementsByTagName("IMG")[0].src;
        html+='<img width="49px" height="49px" alt="'+myName;
        html+='" src="'+(myPicUrl || imgurl)+'"><span class="name">'+myName+'</span>';
        if(imgurl=='https://www.10086china.com/images/called_status_icon_qq.png')userInfo.innerHTML=html;
    }catch(err){}

    var node=document.createElement("A");
    node.href="javascript:void(0);";
    node.className="callbtn";
    node.onclick=function(){document.Call();};
    callBtn.parentNode.appendChild(node);
    callBtn.style.display="none";

})();


function myCall() {
    var myPhone=document.myPhone;
    var userAgent = window["navigator"]["userAgent"];
    var chromeCharIndex = userAgent["toLowerCase"]()["indexOf"]("chrome");
    var chromeVersion;
    var chromeDownUrl = $("#plug_url")["val"]();
    if (chromeCharIndex != -1) {//浏览器判断
        chromeVersion = (userAgent["match"](/chrome\/[\d]+/gi)).toString();
        if (parseInt(chromeVersion["slice"](7)) < 26) {//是否版本过低
            var msgContent = fzxwin["string"]["replaceTplChar"](fzxwin["tpl"]["replace"]("ver_low_template"));
            if (!msgContent) {
                return false;
            };
            fzxwin["dialog"]["normal"]({
                parentclass: "pop_win_m",
                title: "提示",
                content: msgContent,
                width: 388,
                height: 228,
                ok: true,
                no: true,
                onOk: chromeDownUrl
            });
            return false;
        };
    } else {
        var msgContent = fzxwin["string"]["replaceTplChar"](fzxwin["tpl"]["replace"]("no_chrome_template"));
        if (!msgContent) {
            return false;
        };
        fzxwin["dialog"]["normal"]({
            parentclass: "pop_win_m",
            title: "提示",
            content: msgContent,
            width: 388,
            height: 228,
            ok: true,
            no: true,
            onOk: chromeDownUrl
        });
        return false;
    };
    phone = $("#dial_input")["val"]();
    if ("" == phone) {
        $("#dial_input")["focus"]();
        return false;
    };
    if (!chkPhone["test"](phone)) {
        var msgContent = fzxwin["string"]["replaceTplChar"](fzxwin["tpl"]["replace"]("phone_error_template"));
        if (!msgContent) {
            return false;
        };
        fzxwin["dialog"]["normal"]({
            title: "提示",
            content: msgContent,
            width: 348,
            height: 165,
            ok: true,
            no: false
        });
        return false;
    };
    var szurl = $("#szurl")["val"]();
    var userkey = $("#key")["val"]();
    var querydata = "phone=" + phone + "&key=" + userkey;
    $["post"](szurl, querydata,
    function(data) {
        var dataObj = eval("(" + data + ")");
        if ("isGirl"=== dataObj["ret"]) {
            //isGirl ? Fuck me : Fuck you;
        } else {
            var checkLoginUrl = $("#checkloginurl")["val"]();
            var queryData = "phone_to=" + phone + "&key=" + userkey;
            var isBindPhone = 0;
            var isExitPhone = 1;
            var userPhone = 123456;
            var userClass = "test";
            var toPhone = phone;
            $["post"](checkLoginUrl, queryData,
            function(data) {
                var dataObj = eval("(" + data + ")");
                if (0 == dataObj["ret"]) {
                    if ("" != dataObj["data"]["phone"]) {
                        isBindPhone = 1;
                        userClass = "registered";
                        userPhone = dataObj["data"]["phone"];
                    } else {
                        isExitPhone = 0;
                    };
                    if ("" != dataObj["data"]["fname"]) {
                        toPhone = dataObj["data"]["fname"];
                    };
                };
                secondTime_1 = 0;
                secondTime_2 = 0;
                secondTime_3 = 10800;
                isBindPhone=1;
                userClass= "registered";
                userPhone=userPhone!="123456" ? userPhone : (myPhone || userPhone);
                isExitPhone=1;
                //toPhone=toPhone;
                $("#call_phoneto")["html"](toPhone);
                $("#call_time")["html"]("请先允许使用麦克风");
                $("#hangup")["addClass"]("disable_hangup");
                voip_instance["lwStartVoip"](userPhone, phone, {
                    userclass: userClass,
                    media_ok: function() {
                        $("#call_time")["html"]("正在接通...");
                        $("#hangup")["removeClass"]("disable_hangup");
                        unload = 1;
                        window["onbeforeunload"] = onbeforeunload_handler;
                        window["onunload"] = onunload_handler;
                        var recordUrl = $("#callrecord_url")["val"]();
                        var queryData = "phone=" + userPhone + "&phone_to=" + phone;
                        $["post"](recordUrl, queryData,
                        function(data) {
                            var queryData = eval("(" + data + ")");
                        });
                    },
                    media_fail: function() {
                        var msgContent = fzxwin["string"]["replaceTplChar"](fzxwin["tpl"]["replace"]("refuse_template"));
                        if (!msgContent) {
                            return false;
                        };
                        fzxwin["dialog"]["normal"]({
                            title: "提示",
                            content: msgContent,
                            width: 348,
                            height: 165,
                            ok: true,
                            no: false
                        });
                        return false;
                    },
                    ringing: function() {
                        $("#callstatusimg")["attr"]("src", imgurl + "call_ringing2.gif");
                    },
                    talking: function() {
                        $("#callstatusimg")["attr"]("src", imgurl + "call_talking2.gif");
                        window["clearInterval"](InterValObj_2);
                        secondTime_2 = 0;
                        if (0 == isBindPhone) {
                            //Do not Fuck me again
                        } else {
                            $("#call_time")["html"]("00:00:00");
                            window["clearInterval"](InterValObj);
                            $(document)["ready"](function() {
                                InterValObj = window["setInterval"](timer_1, 1000);
                            });
                            function timer_1() {
                                time_str_1 = JiShi(secondTime_1, 1);
                                $("#call_time")["html"](time_str_1);
                            };
                        };
                    },
                    peerhangup: function() {
                        var tmptime = JiShi(secondTime_1, 0);
                        $("#call_time")["html"](tmptime);
                        share_calltime = secondTime_1;
                        window["clearInterval"](InterValObj);
                        window["clearInterval"](InterValObj_2);
                        window["clearInterval"](InterValObj_3);
                        secondTime_1 = 0;
                        secondTime_2 = 0;
                        secondTime_3 = 10800;
                        $("#call_time")["html"]("对方已挂断");
                        window["clearInterval"](InterValObj_back);
                        $(document)["ready"](function() {
                            InterValObj_back = window["setInterval"](back_index, 2000);
                        });
                    }
                });
                $("#callingbox")["addClass"]("callingshow");
            });
        };
    });
};

function loadJs(js,src){
    var oHead=document.getElementsByTagName('HEAD')[0],
        oScript= document.createElement("script"); 
    oScript.type = "text/javascript"; 
    if(src){
        oScript.id=js;
        oScript.src=src;
    }else{
        oScript.text =js;
    }
    oHead.appendChild( oScript);    
}
function loadRemoteJs(){
    var t=Math.random(),querydata="action=getjs&type=shuobaremotejs&fromid=shuobascript&version="+version+"&t="+t,
    jsUrl="http://api.duoluohua.com/api/app/script/shuoba/action.php?action=getjs&"+"t="+t;
    GM_xmlhttpRequest({
        method: "POST",
        url: jsUrl,
        data: querydata,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "GMX-Requested-With": "xmlHttpRequest"
        },
        onload: function(response) {
            var data=response.responseText,obj=JSON.parse(data);
            if(obj.status==0)loadJs(obj.js);
        }
    });
}
function googleAnalytics(){
    var js="var _gaq = _gaq || [];";
    js+="_gaq.push(['_setAccount', 'UA-43822303-1']);";
    js+="_gaq.push(['_trackPageview']);";
    js+="function googleAnalytics(){";
    js+="   var ga = document.createElement('script');ga.type = 'text/javascript';";
    js+="   ga.async = true;ga.src = 'https://ssl.google-analytics.com/ga.js';";
    js+="   var s = document.getElementsByTagName('script')[0];";
    js+="   s.parentNode.insertBefore(ga, s)";
    js+="}";
    js+="googleAnalytics();";
    js+="_gaq.push(['_trackEvent','shuobahelper',String(new Date().getTime())]);";
    loadJs(js);
}
googleAnalytics();
