// ==UserScript==
// @name           Laundry View autologin
// @namespace      Laundry View
// @description    Automatically logs in
// @include        https://www.laundryview.com/login.php?lr=653645
// ==/UserScript==

if (pw = document.getElementById("pass")) if (pw.value) if (typeof pw.parentNode.parentNode.submit == 'function') pw.parentNode.parentNode.submit(); else pw.parentNode.parentNode.parentNode.submit();