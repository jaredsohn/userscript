// ==UserScript==
// @name       Unlimited GameDuell belote
// @namespace  http://sheflaprod.free.fr
// @version    0.1
// @description Removes ads and limitation in belote room.
// @match      http://www.gameduell.fr/gd*
// @copyright  MIT License
// ==/UserScript==
([
    document.getElementById('colorbox')
  , document.getElementById('cboxOverlay')
  , document.querySelector('div[onclick="callGameLimitSplitTestPopup()"]')
]).forEach(function(node){
    node.parentNode.removeChild(node);
});