// ==UserScript==
// @name           HaiNeiNoteSave
// @namespace      wangyuantao
// @include        http://hainei.com/notepad
// @seealse        http://www.openjs.com/scripts/events/keyboard_shortcuts/shortcut.js
// ==/UserScript==

(function(){

function DoKeyCommand(evt)
{
  var key = (evt.which || evt.charCode || evt.keyCode);
  var stringKey = String.fromCharCode(key).toLowerCase();
  var cmd = '';
	
  if (!evt || !evt.ctrlKey) return true;
  
  switch (stringKey)
  {
    case 's':
    {
      if (evt.preventDefault) {
        evt.preventDefault();
        evt.stopPropagation();
      } else {
        evt.returnValue = false;
        evt.cancelBubble = true;
      }
      try{unsafeWindow.HN.app.Notepad.asyncPad();}catch(e){}	
      return false;
    }
  };
  return true;
}
if (document.addEventListener)
{
  document.addEventListener("keypress", DoKeyCommand, true);
}
else if (document.attachEvent)
{
  document.attachEvent("onkeydown", function(evt) {DoKeyCommand(evt)});
}


})();
