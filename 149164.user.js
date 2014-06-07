// ==UserScript==
// @name       豆邮批量删除辅助
// @namespace  http://ktmud.com/
// @version    0.1
// @description  enter something useful
// @match      http://www.douban.com/doumail/
// @copyright  2012+, Jesse Yang
// ==/UserScript==

function init() {
  Do(function() {
    $('input:checkbox').attr('checked', true);
    $('input[name=mc_delete]').focus();
  });
}

function contentEval( source ) {
  if ('function' == typeof source) {
    source = '(' + source + ')();'
      }
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;
  document.body.appendChild(script);
  document.body.removeChild(script);
}
contentEval( init );