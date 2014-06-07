// ==UserScript==
// @name DisableBlur
// @include *
// ==/UserScript==

function newblur() {
event.stopPropagation();
event.preventDefault();
}

unsafeWindow.onblur = null;
window.addEventListener('blur', newblur, true);

HTMLFormElement.prototype._blur = HTMLFormElement.prototype.blur;
HTMLFormElement.prototype.blur = newblur;