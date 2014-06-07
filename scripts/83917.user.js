// ==UserScript==
// @name           OA AutoLogin
// @namespace      OA AutoLogin
// @description    OA AutoLogin
// @include        http://passport.oa.com/modules/passport/signin.ashx*
// ==/UserScript==
function addJQuery(callback) {
    var script = document.createElement("script");
    script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.head.appendChild(script);
    }, false);
    document.head.appendChild(script);
}
function main() {
    try {
        $('#txtLoginName').val('ytzong');
        $('#txtPassword').val('830212');
        $('#txtPassword').focus();
    }
    catch (e) { }
}
addJQuery(main);