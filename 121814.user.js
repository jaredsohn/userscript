// ==UserScript==
// @name           Raika ELBA: Enable password manager to store login password
// @namespace      http://userscripts.org/users/79816
// @description    Disables the pretty useless conversion of the password field characters to stars (*) in the ELBA JavaScript
// @version        1.0.2
// @copyright      2011, ulrichb
// @include        https://banking.raiffeisen.at/logincenter/login*
// ==/UserScript==

(function () {
  if (unsafeWindow.encryptPwd) {
    var originalEncryptPwd = unsafeWindow.encryptPwd;
    
    unsafeWindow.encryptPwd = function () {
      var inpPwd = unsafeWindow.jQuery("input[id='loginform:LOGINPASSWD']");
      var pwd;
      
      if (inpPwd) {
        pwd = inpPwd.val();
        //console.log('pwd:' + pwd);
      }
      
      var res = originalEncryptPwd.apply(this, arguments);
      
      if (pwd) {
        inpPwd.attr("value", pwd);
      }
      
      return res;
    };
  }
})();

