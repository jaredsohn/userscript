// HR WiFi auto loger
// ==UserScript== bobby@nova.is
// @name  Bobby
// @include        https://ol-wlc.ru.is/login.html*
// @include        http://ol-wlc.ru.is/login.html*


document.getElementById("username").value = "username here";
document.getElementById("password").value = "password here";
document.getElementById("login").form.submit();
document.getElementByTagName("form")[0].submit();
document.getElementById("onKeyPress").value = true;

// ==/UserScript== bobby