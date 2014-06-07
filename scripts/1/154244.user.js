// ==UserScript==
// @name Facebook Math Typesetting
// @namespace clemensboos.net
// @version 0.5
// @description Typesets TeX mathematical expressions in the Facebook Chat
// @include *facebook*
// @exclude *facebook*/ai.php*
// @updateURL http://userscripts.org/scripts/source/154244.meta.js
// ==/UserScript==

function contentEval(source) {
  // Check for function input.
  if ('function' == typeof source) {
    // Execute this function with no arguments, by adding parentheses.
    // One set around the function, required for valid syntax, and a
    // second empty set calls the surrounded function.
    source = '(' + source + ')();'
  }

  // Create a script node holding this  source code.
  var script = document.createElement('script');
  script.setAttribute("type", "application/javascript");
  script.textContent = source;

  // Insert the script node into the page, so it will run, and immediately
  // remove it to clean up.
  document.body.appendChild(script);
  document.body.removeChild(script);
}

var script = document.createElement("script");
script.type = "text/javascript";
script.src = "https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=TeX-AMS_HTML";
script.addEventListener("load", OnMathJaxLoad, false);
document.getElementsByTagName("head")[0].appendChild(script);


function OnMathJaxLoad() {
    setTimeout(OnMathJaxInit, 500);
}

function OnMathJaxInit() {
    contentEval("MathJax.Hub.Config({ tex2jax: { displayMath: [['$$','$$']] }, menuSettings: { context: \"Browser\" } });");
    
    console.info("MathJax loaded.");
    
    setTimeout(OnAjaxLoaded, 1000);
}

function OnAjaxLoaded() {
    unsafeWindow.dockChat = unsafeWindow.document.getElementById("fbDockChat");
    
    if (unsafeWindow.dockChat == null)
        return;
    
    typesetChat();
    
    unsafeWindow.dockChat.addEventListener("DOMNodeInserted", OnDOMModified);
}

function OnDOMModified()
{
    typesetChat();
}

function typesetChat()
{
    contentEval("MathJax.Hub.Queue([\"Typeset\", MathJax.Hub, window.dockChat]);");
}