// ==UserScript==
// @id              alert-killer-test@erikvold.com
// @name            Overwrite Alert
// @description     Overwrites alert()
// @include         *
// @run-at          document-start
// ==/UserScript==

unsafeWindow.alert=function() {};
