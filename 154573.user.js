// ==UserScript==
// @name			账户自动填充
// @namespace		http://www.weibo.com/hileony
// @description		支持27个网站的自动填充
// @version			1.3.27
// @author			Guang_Yang
// @include			*
// ==/UserScript==
var AutoSubmit = 1; //0=不自动登录，1=自动登录
var hos0 = (location.hostname).split(".")[0];
var hos = (location.hostname).split(".")[1];
var getElementsByClassName = function (searchClass, node, tag) {
    if (document.getElementsByClassName) {
        return document.getElementsByClassName(searchClass)
    } else {
        node = node || document;
        tag = tag || '*';
        var returnElements = []
        var els = (tag === "*" && node.all) ? node.all : node.getElementsByTagName(tag);
        var i = els.length;
        searchClass = searchClass.replace(/\-/g, "\\-");
        var pattern = new RegExp("(^|\\s)" + searchClass + "(\\s|$)");
        while (--i >= 0) {
            if (pattern.test(els[i].className)) {
                returnElements.push(els[i]);
            }
        }
        return returnElements;
    }
}
switch (hos) {
    //目录:ABCD

    //百度
case 'baidu':
    document.getElementById("pass_login_username_0").value = "输入用户名";
    document.getElementById("pass_login_password_0").value = "输入密码";
    document.getElementById("pass_login_rem_0").checked = "checked";
    if (AutoSubmit) document.getElementById("pass_login_input_submit_0").click();
    break; //passport.baidu.com无效
    //豆瓣
case 'douban':
    document.getElementById("form_email").value = "输入用户名";
    document.getElementById("form_password").value = "输入密码";
    document.getElementById("form_remember").checked = "checked";
    if (AutoSubmit) document.getElementsByTagName("input")[4].click();
    break;

    //目录:EFGH

    //Gmail
case 'google':
    document.getElementById("Email").value = "输入用户名";
    document.getElementById("Passwd").value = "输入密码";
    document.getElementById("PersistentCookie").checked = "checked";
    if (AutoSubmit) document.getElementById("signIn").click();
    break;
    //Facebook
case 'facebook':
    document.getElementById("email").value = "输入用户名";
    document.getElementById("pass").value = "输入密码";
    document.getElementById("persist_box").checked = "checked";
    if (AutoSubmit) document.getElementById("u_0_4").click();
    break;

    //目录:IJKL
    //目录:MNOP
    //目录:QRST

    //腾讯的邮箱、QQ什么的
case 'qq':
    document.getElementById("uin").value = "输入用户名";
    document.getElementById("p").value = "输入密码";
    document.getElementById("remerber_password").checked = "checked";
    //需要输入验证码，就不自动登录了
    break;
    //人人
case 'renren':
    document.getElementById("email").value = "输入用户名";
    document.getElementById("password").value = "输入密码";
    document.getElementById("autoLogin").checked = "checked";
    if (AutoSubmit) document.getElementById("login").click();
    break;
    //天涯
case 'tianya.cn':
    document.getElementById("text1").value = "输入用户名";
    document.getElementById("password").value = "输入密码";
    document.getElementById("rmflag").checked = "checked";
    if (AutoSubmit) document.getElementsByName("tianya-submit4")[0].click();
    break;

    //目录:UVWX

    //虾米音乐
case 'xiami':
    document.getElementById("email").value = "输入用户名";
    document.getElementById("password").value = "输入密码";
    document.getElementById("autologin").checked = "checked";
    if (AutoSubmit) document.getElementsByName("submit")[0].click();
    break;

case 'org':
    switch (hos0) {
        //Userscript
    case 'userscripts':
        document.getElementById("login").value = "输入用户名";
        document.getElementById("password").value = "输入密码";
        document.getElementById("remember_me").checked = "checked";
        if (AutoSubmit) document.getElementsByName("commit")[0].click();
        break;
    }
    break;
case 'com':
    switch (hos0) {
        //人人
    case 'renren':
        document.getElementById("login").value = "输入用户名";
        document.getElementById("password").value = "输入密码";
        document.getElementById("remember_me").checked = "checked";
        if (AutoSubmit) document.getElementsByName("commit")[0].click();
        break;
    }
    break;

    //web飞信
case '10086':
    document.getElementById("login_username").value = "输入手机号";
    document.getElementById("login_pass").value = "输入密码";
    document.getElementById("login_chk_1").checked = "checked";
    document.getElementById("login_chk_2").checked = "checked";
    if (AutoSubmit) document.getElementById("btnlogin").click();
    break;

    //新浪微博(重点更新！)
case 'weibo':
    document.getElementsByName("username")[0].value = "输入用户名";
    document.getElementsByName("password")[0].value = "输入密码";
    document.getElementById("login_form_savestate").checked = "checked";
    if (AutoSubmit) getElementsByClassName("W_btn_g ")[0].click();
    break;

    //Wolframalpha
case 'wolframalpha':
    document.getElementById("username").value = "输入用户名";
    document.getElementById("password").value = "输入密码";
    document.getElementById("remember").checked = "checked";
    if (AutoSubmit) document.getElementById("submitSignIn").click();
    break;

    //wordpress
case 'wordpress':
    document.getElementById("user_login").value = "输入用户名";
    document.getElementById("user_pass").value = "输入密码";
    document.getElementById("rememberme").checked = "checked";
    if (AutoSubmit) document.getElementById("wp-submit").click();
    break;

    //目录:YZ0-9

    //Yahoo
case 'yahoo':
    document.getElementById("username").value = "输入用户名";
    document.getElementById("passwd").value = "输入密码";
    document.getElementById("persistent").checked = "checked";
    if (AutoSubmit) document.getElementById(".save").click();
    break;

    //有道词典与网易登录结合
case 'youdao':
case '163':
    document.getElementById("username").value = "输入用户名";
    document.getElementById("password").value = "输入密码";
    document.getElementById("savelogin").checked = "checked";
    if (AutoSubmit) {
        getElementsByClassName("login_btn")[0].click();
        document.getElementById("loginBtn").click();
    }
    break;

    //目录:不注册就不让下载资源的无理取闹的小论坛

    //大家网
case 'topsage':
    document.getElementById("ls_username").value = "输入用户名";
    document.getElementById("ls_password").value = "输入密码";
    document.getElementById("username_LhxCE").value = "输入用户名";
    document.getElementById("password3_LhxCE").value = "输入密码";
    document.getElementById("cookietime_LhxCE").checked = "checked";
    if (AutoSubmit) document.getElementsByTagName("button")[1].click();
    break;
    //天地会-- Flash, Ria开发讨论
case '9ria':
    document.getElementById("username_LzyXx").value = "输入用户名";
    document.getElementById("txtUsername").value = "输入用户名";
    document.getElementById("password3_LzyXx").value = "输入密码";
    document.getElementById("txtPassword").value = "输入密码";
    document.getElementById("cookietime_LzyXx").checked = "checked";
    //需要输入验证码，就不自动登录了
    break;
//小米
case 'xiaomi':
document.getElementById("miniLogin_username").value="输入用户名";
document.getElementById("miniLogin_pwd").value="输入密码";
document.getElementById("user").value="输入用户名";
document.getElementById("password").value="输入密码";
document.getElementById("auto").checked="checked";
break;
//MIUI
case 'miui':
document.getElementById("user").value="输入用户名";
document.getElementById("password").value="输入密码";
break;

//华为网盘
case 'dbank':
document.getElementById("nsp_user").value="输入用户名";
document.getElementById("pass").value="输入密码";
document.getElementById("rememberme").checked="checked";
if(AutoSubmit)document.getElementById("submit_btn").click();
break;

//迅雷
case 'xunlei':
document.getElementById("u").value="输入用户名";
document.getElementById("p").value="输入密码";
document.getElementByName("u").value="输入用户名";
document.getElementById("p_show").value="输入密码";
if(AutoSubmit)document.getElementById("viplogin_submit").click();
break;

//天翼云
case '189':
document.getElementById("txtUserID").value="输入用户名";
document.getElementById("txtPwd").value="输入密码";
document.getElementById("cb_SaveName").checked="checked";
if(AutoSubmit)document.getElementById("ibtn_Login").click();
break;

//115
case '115':
document.getElementById("js-account").value="输入用户名";
document.getElementById("js-passwd").value="输入密码";
document.getElementById("js-remember_pwd").checked="checked";
if(AutoSubmit)document.getElementById("js-submit").click();
break;

//联通
case '10010':
document.getElementById("userName").value="输入用户名";
document.getElementById("password").value="输入密码";
document.getElementById("rememberMe").checked="checked";
break;

//快盘
case 'kuaipan':
document.getElementById("login-username").value="输入用户名";
document.getElementById("login-password").value="输入密码";
document.getElementById("login-auto").checked="checked";
if(AutoSubmit)document.getElementById("login-submit").click();
break;
}