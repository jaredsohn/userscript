// WebCT go_to_file redirector
// version 0.2
// 2005-12-11
// Copyright (c) 2005, Neil Lall
// Released under the GPL license
// http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          WebCT gotofile redirector
// @author	  nulall
// @description   redirects WebCT javascript links directly to the file, for easier saving and file handling.
// @include       http*://enigma.optometry.ohio-state.edu/*
// ==/UserScript==

	
(function()
{
  for(var i=0;i<document.links.length;i++)
  {
    var elem = document.links[i];
    var myregexp=/[jJ]ava[sS]cript:go_to_file\('[-0-9a-z:\.A-Z/ %,]*', ?'([A-Za-z0-9/]*)', ?'\d', ?'\d', ?'\d', ?'([-0-9a-z:\.A-Z/ %,]*)'\)/i;
    if(elem.href.match(myregexp))
	{
	  elem.href=RegExp.$1+RegExp.$2;
	}
  }
})();