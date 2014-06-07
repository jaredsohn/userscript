// ==UserScript==
// @name           Ctrl+Enter(IanRos & danutzu)
// @namespace      Acest script vă ajută să face-ți submit la mesaj , folosind combinația de taste ctrl + enter
// @include        http://torrentsmd.com/forum.php*
// @include        http://www.torrentsmd.com/forum.php*
// @author         IanRos
// ==/UserScript==
(function(){
window.addEventListener('keypress', function(e){
if (e.ctrlKey && e.keyCode == 13 && e.target.form) {
e.target.form.submit();
}
}, false);
})();