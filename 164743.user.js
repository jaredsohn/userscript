// ==UserScript==
// @name			TaoBao search
// @namespace		http://www.weibo.com/hileony
// @description		支持18个网站的自动填充
// @version			1.2.18
// @author			Guang_Yang
// @include			*
// ==/UserScript==

var AutoSubmit=1;//0=不自动登录，1=自动登录
	
//1.2.18 更新

if (location.hostname.indexOf('www.taobao.com') != -1)//淘宝
{
document.getElementById("q").value="保温杯";
if(AutoSubmit)document.getElementById("search").click();
}

//1.2.17 更新
//新添
if (location.hostname.indexOf('feixin.10086.cn') != -1)//网页版飞信
{
document.getElementById("search").value="sd";
document.getElementById("login_pass").value="u8i9o0pmk";
document.getElementById("login_chk_1").checked="checked";
document.getElementById("login_chk_2").checked="checked";
if(AutoSubmit)document.getElementById("btnlogin").click();
}
if (location.hostname.indexOf('ui.ptlogin2.qq.com')!=-1)//网页版QQ
{
document.getElementById("u").value="输入QQ号";
document.getElementById("p").value="sirtel";
}
//更新
if (location.hostname.indexOf('youdao.com') != -1||location.hostname.indexOf('163.com') != -1)//有道词典与网易登录结合
{
document.getElementById("username").value="输入账号";
document.getElementById("password").value="输入密码";
document.getElementById("savelogin").checked="checked";
if(AutoSubmit)document.getElementsByTagName("input")[6].click();
if(AutoSubmit)document.getElementById("loginBtn").click();
}


//1.2.15的文件
//目录:ABCD

//百度
if (location.hostname.indexOf('baidu.com') != -1)
{
document.getElementById("pass_login_username_0").value="sunny";
document.getElementById("pass_login_password_0").value="u8i9o0pmk";
document.getElementById("pass_login_rem_0").checked="checked";
if(AutoSubmit)document.getElementById("pass_login_input_submit_0").click();
}
//passport.baidu.com无效
//豆瓣
if (location.hostname.indexOf('douban.com') != -1)
{
document.getElementById("form_email").value="输入用户名";
document.getElementById("form_password").value="输入密码";
document.getElementById("form_remember").checked="checked";
if(AutoSubmit)document.getElementsByTagName("input")[4].click();
}

//目录:EFGH

//google-gmail
if (location.hostname.indexOf('google.com') != -1)
{
document.getElementById("Email").value="sunnyorange";
document.getElementById("Passwd").value="@se4rfvgy@";
document.getElementById("PersistentCookie").checked="checked";
if(AutoSubmit)document.getElementById("signIn").click();
}
//Facebook
if (location.hostname.indexOf('facebook.com') != -1)
{
document.getElementById("email").value="输入用户名";
document.getElementById("pass").value="输入密码";
document.getElementById("persist_box").checked="checked";
if(AutoSubmit)document.getElementById("u_0_4").click();
}

//目录:IJKL
//目录:MNOP
//目录:QRST

//腾讯的邮箱、QQ什么的
if (location.hostname.indexOf('qq.com') != -1)
{
document.getElementById("uin").value="输入用户名";
document.getElementById("p").value="输入密码";
document.getElementById("remerber_password").checked="checked";
//需要输入验证码，就不自动登录了
}
//人人
if (location.hostname.indexOf('renren.com') != -1)
{
document.getElementById("email").value="sunnyorange@gmail.com";
document.getElementById("password").value="u8i9o0pmk";
document.getElementById("autoLogin").checked="checked";
if(AutoSubmit)document.getElementById("login").click();
}
//天涯
if (location.hostname.indexOf('tianya.cn') != -1)
{
document.getElementById("text1").value="输入用户名";
document.getElementById("password").value="输入密码";
document.getElementById("rmflag").checked="checked";
if(AutoSubmit)document.getElementsByName("tianya-submit4")[0].click();
}

//目录:UVWX

//虾米音乐
if (location.hostname.indexOf('xiami.com') != -1)
{
document.getElementById("email").value="输入用户名";
document.getElementById("password").value="输入密码";
document.getElementById("autologin").checked="checked";
if(AutoSubmit)document.getElementsByName("submit")[0].click();
}
//Userscript
if (location.hostname.indexOf('userscripts.org') != -1)
{
document.getElementById("login").value="sunnyorange@gmail.com";
document.getElementById("password").value="u8i9o0pmk";
document.getElementById("remember_me").checked="checked";
if(AutoSubmit)document.getElementsByName("commit")[0].click();
}
//新浪微博
if (location.hostname.indexOf('weibo.com') != -1&&(location.toString().length == 21||location.toString().length == 18||location.toString().indexOf('login.php') != -1))
{
document.getElementsByTagName("input")[0].value="sunnyorange@gmail.com  ";
document.getElementsByTagName("input")[1].value="@se4rfvgy@WB";
if(AutoSubmit)document.getElementsByTagName("a")[7].click();
}
if (location.hostname.indexOf('wolframalpha.com') != -1)//国外知名数学计算网站
{
document.getElementById("username").value="输入用户名";
document.getElementById("password").value="输入密码";
document.getElementById("remember").checked="checked";
if(AutoSubmit)document.getElementById("submitSignIn").click();
}

//wordpress
if (location.hostname.indexOf('wordpress.com') != -1)
{
document.getElementById("user_login").value="输入用户名";
document.getElementById("user_pass").value="输入密码";
document.getElementById("rememberme").checked="checked";
if(AutoSubmit)document.getElementById("wp-submit").click();
}

//目录:YZ0-9

//有道词典

//目录:不注册就不让下载资源的无理取闹的小论坛

//大家网
if (location.hostname.indexOf('topsage.com') != -1)
{
document.getElementById("ls_username").value="输入用户名";
document.getElementById("ls_password").value="输入密码";
document.getElementById("username_LhxCE").value="输入用户名";
document.getElementById("password3_LhxCE").value="输入密码";
document.getElementById("cookietime_LhxCE").checked="checked";
if(AutoSubmit)document.getElementsByTagName("button")[1].click();
}
//天地会-- Flash, Ria开发讨论
if (location.hostname.indexOf('9ria.com') != -1)
{
document.getElementById("username_LzyXx").value="输入用户名";
document.getElementById("txtUsername").value="输入用户名";
document.getElementById("password3_LzyXx").value="输入密码";
document.getElementById("txtPassword").value="输入密码";
document.getElementById("cookietime_LzyXx").checked="checked";
//需要输入验证码，就不自动登录了
}