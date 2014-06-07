// ==UserScript==
// @name           alipay
// @namespace      http://userscripts.org/users/102589
// @description    Alipay Payment
// @include        https://taobao.alipay.com/trade/trade_payment.htm
// ==/UserScript==

var forms = document.getElementsByName('paymentForm');
if (forms.length != 0) { // confirm
    // make a new password inputbox
    var pwd = document.getElementById('pwd');
    var inputs = document.getElementsByName('ktDdPasswordInput'); // confirm
    if (pwd != null && inputs.length != 0) {
        var cters = inputs[0].getElementsByClassName('alieditContainer');
        if (cters.length != 0) {
            var cter = cters[0];
            var newpwd = pwd.cloneNode(true);
            newpwd.setAttribute('type', 'password');
            cter.parentNode.replaceChild(newpwd, cter);
            pwd.parentNode.removeChild(pwd);
            // change submit behavior
            // not tested on mobile-protected alipay accounts
            unsafeWindow.CheckFrom2 = function() {
                return true;
            };
        }
    }
}
