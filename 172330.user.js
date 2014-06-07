// ==UserScript==
// @name       IRCTC Auto Login
// @namespace  http://facebook.com/shivesh96
// @version    0.1
// @description  This Script Help you to Automatically Login to IRCTC Website
// @match      https://www.irctc.co.in
// @include    https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/services/home.do
// @include    https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/services/history.do?*
// @include    https://www.irctc.co.in/cgi-bin/bv60.dll/irctc/services/login.do
// @copyright  2013+, Shivesh96
// ==/UserScript==

function loginUser()
{        
    document.forms.LoginForm.password.value="Password Here";     
    document.forms.LoginForm.userName.value="User Name Here";
    document.forms.LoginForm.submit();
}
loginUser();
