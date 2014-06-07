// ==UserScript==
// @name           battlelogbypass
// @version        1.0.0
// @namespace      http://userscripts.org/users/181830
// @description    Join password protected servers bypassing the prompt.
// @include        http://battlelog.battlefield.com/bf3/*
// ==/UserScript==

function contentEval(source) {
  if ('function' == typeof source) {
    source = '(' + source + ')();'
  }

  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  document.body.appendChild(script);
  document.body.removeChild(script);
}

contentEval( function() {
  joinflow.showPasswordPromptPopup = function() { 
    S.globalContext["session"]["serverPassword"] = 'lol';
    arguments[arguments.length-1]();
  }
});