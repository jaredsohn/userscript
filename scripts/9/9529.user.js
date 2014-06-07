// ==UserScript==
// @name             Highlight Input Area
// @include          *
// @version          1.0
// ==/UserScript==

GM_addStyle(
      'input:focus, textarea:focus, select:focus '+
      '{'+
      '  background-color: #EEEEFF;'+
      '  outline: 1px dashed #CCCCCC;'+
      '}'
);


