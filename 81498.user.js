// ==UserScript==
// @name           支付宝alipay认证脚本
// @namespace      http://bugeye.com/alipay
// @description    绕过支付宝所谓安全控件，为linux系统提供便利
// @include        https://www.alipay.com/
// @include        https://www.alipay.com/user/login.htm
// @include        https://www.alipay.com/user/logout.htm 
// @include        https://taobao.alipay.com/trade/trade_payment.htm*
// @include        https://cashier.alipay.com/standard/payment/cashier.htm*
// @include        https://cashier.alipay.com/standard/gateway/cartoonPay.htm*
// @include        https://taobao.alipay.com/cooperate/gateway.do*
// @include        https://www.alipay.com/cooperate/*
// @include        https://taobao.alipay.com/cooperate/authorize_once.htm*
// @include        https://lab.alipay.com/fund/withdraw/confirm.htm*
// @include        https://lab.alipay.com/user/loginName/emailChange.htm*
// @include        https://lab.alipay.com/user/loginName/emailChangeConfirm.htm*
// ==/UserScript==

//替换form控件,参数为form，返回新的form
//直接替换掉原有的form，这样原form上的eventHandler自然失效
//并修改onsubmit检查和密码框控件
function replaceForm(loginform) {
    loginform.setAttribute('onsubmit','return true;');
    var ourform=loginform.cloneNode(true);
    loginform.parentNode.replaceChild(ourform,loginform);
    return ourform;
}

//替换password框
function replacePwd(oldpwd) {
    var pwd=oldpwd.cloneNode(true);
    oldpwd.parentNode.removeChild(oldpwd);
    pwd.type='password';
    pwd.setAttribute('class', 'i-text');
    return pwd;
}

//Begin............
if(location.href.indexOf("taobao.alipay.com/trade/trade_payment.htm")>-1) {
    //支付宝余额和卡通支付界面,要做两次替换
    var paymentForm=document.getElementsByName('paymentForm')[0];
    var newPaymentForm=replaceForm(paymentForm);
    //查找alieditContainer,好将密码框替换到此处,这里不用getElementXX是因为有些页面有多alieditContainer，而这些DOM完全一样，分辨起来麻烦
    var alieditContainer=document.evaluate(
            "//span[@class='alieditContainer']",
            newPaymentForm,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
    var oldpwd=document.getElementById('pwd');
    var pwd=replacePwd(oldpwd);
    alieditContainer.parentNode.replaceChild(pwd,alieditContainer);
    //bankDirectPayForm
    var bankPayForm=document.getElementsByName('bankDirectPayForm')[0];
//*
    var newForm=replaceForm(bankPayForm);
    alieditContainer=document.evaluate(
            "//span[@class='alieditContainer']",
            newForm,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(1);
//*
    oldpwd=document.getElementById('pd');
    pwd=replacePwd(oldpwd);
    alieditContainer.parentNode.replaceChild(pwd,alieditContainer);
//*/
}
else if(location.href.indexOf("taobao.alipay.com/cooperate/gateway.do")>-1) {
//确认收货
    var onceForm=document.getElementById('authorizeOnceForm');
    var newPaymentForm=replaceForm(onceForm);
    var alieditContainer=document.evaluate(
            "//span[@class='alieditContainer']",
            newPaymentForm,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
    var oldpwd=document.getElementById('pwd');
    var pwd=replacePwd(oldpwd);
    alieditContainer.parentNode.replaceChild(pwd,alieditContainer);
}
else if(location.href.indexOf("www.alipay.com/cooperate/")>-1) {
//合作站点
    var onceForm=document.getElementsByName('paymentForm')[0];
    var newPaymentForm=replaceForm(onceForm);
    newPaymentForm.setAttribute('onsubmit','doSubmit1()');
    var alieditContainer=document.evaluate(
            "//span[@class='alieditContainer']",
            newPaymentForm,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
    var oldpwd=document.getElementsByName('pwd')[0];
    var pwd=replacePwd(oldpwd);
    alieditContainer.parentNode.replaceChild(pwd,alieditContainer);
}
else if(location.href.indexOf("taobao.alipay.com/cooperate/authorize_once.htm")>-1) {
//确认收货
    var onceForm=document.getElementById('authorizeOnceForm');
    var newPaymentForm=replaceForm(onceForm);
    var alieditContainer=document.evaluate(
            "//span[@class='alieditContainer']",
            newPaymentForm,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
    var oldpwd=document.getElementById('pwd');
    var pwd=replacePwd(oldpwd);
    alieditContainer.parentNode.replaceChild(pwd,alieditContainer);
}
else if(location.href.indexOf("cashier.alipay.com/standard/payment/cashier.htm")>-1) {
//收银台
    var balanceForm=document.getElementById('balancePayForm');
    var newPaymentForm=replaceForm(balanceForm);
    //查找alieditContainer,好将密码框替换到此处,这里不用getElementXX是因为有些页面有多alieditContainer，而这些DOM完全一样，分辨起来麻烦
    var alieditContainer=document.evaluate(
            "//span[@class='alieditContainer']",
            newPaymentForm,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
    var oldpwd=document.getElementById('payPassword');
    var pwd=replacePwd(oldpwd);
    alieditContainer.parentNode.replaceChild(pwd,alieditContainer);
    //这里淘宝又把表单验证放在了submit button上。。。
    var btn=document.getElementsByClassName('J_ForAliControl')[0];
    var newbtn=btn.cloneNode(true);
    newbtn.setAttribute('type','submit');
    btn.parentNode.replaceChild(newbtn,btn);
} 
else if(location.href.indexOf("cashier.alipay.com/standard/gateway/cartoonPay.htm")>-1) {
    var balanceForm=document.getElementById('cartoonPayForm');
    var newPaymentForm=replaceForm(balanceForm);
    //查找alieditContainer,好将密码框替换到此处,这里不用getElementXX是因为有些页面有多alieditContainer，而这些DOM完全一样，分辨起来麻烦
    var alieditContainer=document.evaluate(
            "//span[@class='alieditContainer']",
            newPaymentForm,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
    var oldpwd=document.getElementById('payPassword');
    var pwd=replacePwd(oldpwd);
    alieditContainer.parentNode.replaceChild(pwd,alieditContainer);
    //这里淘宝又把表单验证放在了submit button上。。。
    var btn=document.getElementsByClassName('J_ForAliControl')[0];
    var newbtn=btn.cloneNode(true);
    newbtn.setAttribute('type','submit');
    btn.parentNode.replaceChild(newbtn,btn);
} 
else if(location.href.indexOf('lab.alipay.com/fund/withdraw/confirm.htm')>-1) {
    //支付宝提现
    var withForm=document.getElementById('withdrawConfirmForm');
    var newForm=replaceForm(withForm);
    var alieditContainer=document.evaluate(
            "//span[@class='alieditContainer']",
            newForm,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
    var oldpwd=document.getElementById('payPassword');
    var pwd=replacePwd(oldpwd);
    alieditContainer.parentNode.replaceChild(pwd,alieditContainer);
}
else if (location.href.indexOf('lab.alipay.com/user/loginName/emailChange.htm')>-1) {
    //支付宝修改email
    var withForm=document.getElementById('changeEmailForm');
    var newForm=replaceForm(withForm);
    var alieditContainer=document.evaluate(
            "//span[@class='alieditContainer']",
            newForm,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
    var oldpwd=document.getElementById('payPassword');
    var pwd=replacePwd(oldpwd);
    alieditContainer.parentNode.replaceChild(pwd,alieditContainer);
}
else if (location.href.indexOf('lab.alipay.com/user/loginName/emailChangeConfirm.htm')>-1) {
    //支付宝确认修改email
    var withForm=document.getElementById('emalChangeForm'); //我XXX，emal
    var newForm=replaceForm(withForm);
    var alieditContainer=document.evaluate(
            "//span[@class='alieditContainer']",
            newForm,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);
    var oldpwd=document.getElementById('queryPassword');
    var pwd=replacePwd(oldpwd);
    alieditContainer.parentNode.replaceChild(pwd,alieditContainer);
}
else {
    //支付宝登陆首页或登入登出页
    var loginform=document.getElementById('login');
    var ourform=replaceForm(loginform);

    //查找alieditContainer,好将密码框替换到此处,这里不用getElementXX是因为有些页面有多alieditContainer，而这些DOM完全一样，分辨起来麻烦
    var alieditContainer=document.evaluate(
            "//span[@class='alieditContainer']",
            ourform,
            null,
            XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
            null).snapshotItem(0);

    //替换密码框，由于淘宝有些页面密码框位置乱写，所以必须查找上面的alieditXX，不然会插到不好看的地方。
    var oldpwd=document.getElementById('password');
    var pwd=replacePwd(oldpwd);
    alieditContainer.parentNode.replaceChild(pwd,alieditContainer);
}
