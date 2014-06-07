// ==UserScript==
// @name           WAASU AutoLogin
// @namespace      MrNerdHair
// @description    Automatically logs into Augusta State University's WAASU wireless network, assuming Firefox saved your credentials.
// @include        http*://waasugate*.aug.edu/login.pl?*
// ==/UserScript==

function autoLogin() {
    if (document.getElementById("l_bs_name").value.length > 0 && document.getElementById("l_bs_password").value.length > 0) {
        var forms = document.getElementsByName("bluesocket_u");
        if (forms.length > 0) forms[0].submit();
    }
}

window.addEventListener("load", autoLogin, false);