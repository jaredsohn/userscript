// ==UserScript==
// @name           Geizhals Forum Tastatur shortcuts
// @include        http://forum.geizhals.at/new.jsp*
// @include        http://kindergarten.geizhals.at/new.jsp*
// @include        http://forum.geizhals.net/new.jsp*
// @include        http://forum.geizhals.cc/new.jsp*
// ==/UserScript==
var speicherButton = document.evaluate('//input[@name=\'submit\']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
var vorschauButton = document.evaluate('//input[@name=\'preview\']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
var betreff = document.evaluate('//input[@name=\'subject\']', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue;
var text = document.getElementById("body");

window.addEventListener("load",
  function ()
  {
    if (speicherButton != null)
    {
      text.addEventListener("keydown", function (evt) { keyDownEvent(evt); }, false);
    }
  }, false);

function keyDownEvent (evt)
{
  if (evt.keyCode == 13 && evt.ctrlKey && !evt.altKey && !evt.shiftKey) // Strg+Enter
    speicherButton.click();
  else if (evt.keyCode == 13 && evt.ctrlKey && evt.altKey && !evt.shiftKey) // Strg+Alt+Enter
    vorschauButton.click();
//   else if (evt.keyCode == 66 && evt.ctrlKey && evt.altKey && !evt.shiftKey) // Strg+Shift+B
//     betreff.focus();
//   else if (evt.keyCode == 84 && evt.ctrlKey && evt.altKey && !evt.shiftKey) // Strg+Shift+B
//     text.focus();
};
  
//.user.js