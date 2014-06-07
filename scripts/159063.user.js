// ==UserScript==
// @name       NewRelic autologin
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Autologins to new relic page. User name and password must be changed in the script.
// @match      https://rpm.newrelic.com/login*
// @copyright  2012+, You
// ==/UserScript==
signIn();

function signIn() {
    var d = unsafeWindow.document;
    var emailTxt = d.getElementById('login_email');
    var pwdTxt = d.getElementById('login_password');
    
    emailTxt.value = 'my@user.email';
    pwdTxt.value = 'my_password';
    
    d.getElementById('Login_submit').click();
}
