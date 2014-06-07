// ==UserScript==
// @name           jsFiddle indent space 2
// ==/UserScript==
(function() {

window.addEventListener('load', function onWindowLoad() {
  window.removeEventListener('load', onWindowLoad, false);

  setTimeout(function() {
    evalInPage(function() {
      ['html', 'css', 'js'].forEach(function(type) {
        try {
          document.querySelector('iframe.' + type).CodeMirror.setIndentUnit(2);
        } catch (e) {}
      });
    });
  }, 1500);

}, false);


function evalInPage(func) {
  //location.href = 'javascript:void((' + func + ')());';
  let form = document.createElement('form');
  form.action = 'javascript:void((' + Function.prototype.toString.call(func) + ')());';
  document.body.appendChild(form);
  form.submit();
  form.parentNode.removeChild(form);
}

})();
