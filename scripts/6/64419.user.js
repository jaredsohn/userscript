// ==UserScript==
// @name           MWS Logoff Redirect
// @namespace      http://userscripts.org/users/7677
// @description    Avoid delay in the logoff redirect to the login page
// @include        https://sso.am.health.ge.com/logoff.jsp?TARGET=http://gemselib.med.ge.com/ematrix/components/emxTaskSSOAuthentication.jsp?nav=process
// @include        https://sso.am.health.ge.com/logoff.jsp?TARGET=http://myworkshop.health.ge.com/ematrix/components/emxTaskSSOAuthentication.jsp?nav=process
// ==/UserScript==
(function() {
    window.location.href = window.location.href.replace(/^https:\/\/sso.am.health.ge.com\/logoff.jsp\?TARGET=/, "$'");
})();