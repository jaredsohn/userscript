// ==UserScript==
// @name           Enable password input for QIB transaction page
// @namespace      http://blog.hammady.net
// @description    This enables the password input for QIB transaction page instead of using the stupid onscreen keyboard
// @match          https://ibank.qib.com.qa/efs/servlet/efsonline/jsp/trans-confirm-external-wait.jsp
// @version	   1.0
// ==/UserScript==

document.getElementsByName("transactionPassword")[0].removeAttribute("readonly")

