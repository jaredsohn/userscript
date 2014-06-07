// ==UserScript==
// @name Sudinfo Plus hack
// @version 2.0
// @description Rend Sudinfo Plus gratuit !
// @match http://plus.sudinfo.be*
// ==/UserScript==
 
window.addEventListener('load', function(e) {
    document.getElementById('loginbox').remove();
    unsafeWindow.app.ereader.login.updateStatus = function() {
        unsafeWindow.app.ereader.login.user.subscription = true;
    };
});