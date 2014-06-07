// ==UserScript==
// @name           Outline Inputs Like Safari
// @namespace      Webnick.UI
// @description    Puts an outline around textboxes or any other type of <input>, textareas and select boxes like Safari does.
// @include        *
// ==/UserScript==
(function(){var o=document.createElement("style");o.innerHTML ="input:focus,select:focus,textarea:focus{outline: #E2B635 3px solid;}";document.body.appendChild(o);})();