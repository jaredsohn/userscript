// ==UserScript==
// @name           LyricsDRM
// @namespace      lyricsdrm
// @include        http://www.last.fm/music/*/+lyrics
// @exclude        
// ==/UserScript==
(function(){
if (CopyProtection) {
document.stopObserving('keydown',CopyProtection.prototype.cancelKeyDown);
document.stopObserving('contextmenu',CopyProtection.prototype.cancelContextMenu);
document.stopObserving('mousedown',CopyProtection.prototype.disableSelect);
document.stopObserving('mouseup',CopyProtection.prototype.enableSelect);
}
})();