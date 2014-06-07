// ==UserScript==
// @name           Enable password input for QIB main page
// @namespace      http://blog.hammady.net
// @description    This enables the password input for QIB main page instead of using the stupid onscreen keyboard
// @match          https://ibank.qib.com.qa/efs/servlet/efs/jsp-ns/login.jsp?*
// @version        1.0
// ==/UserScript==

document.getElementsByName("Password")[0].removeAttribute("readonly")