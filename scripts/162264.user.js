// ==UserScript==
// @name 			A-Redirect
// @id				A-Redirect
// @version			1.2
// @author			Alyzq
// @namespace	  	alyzq
// @description		Redirect Baidu To Google etc.
// @downloadURL		https://userscripts.org/scripts/source/162264.user.js
// @updateURL		https://userscripts.org/scripts/source/162264.meta.js
// @run-at			document-end

// @grant			GM_addStyle
// @grant			GM_xmlhttpRequest

// @include		*://*.baidu.com/*
// @include		*://*.so.com/*
// @include		*://*.hao123.com/*
// @include		*://*.360.cn/*
// @include		*://baidu.com/*
// @include		*://so.com/*
// @include		*://hao123.com/*
// @include		*://360.cn/*

// @exclude		*://www.google.com/reader/*
// ==/UserScript==
(function () {
  try {if( self.location == "http://www.baidu.com/" ){top.location.href = "http://www.google.com/";}
  else if( self.location == "http://baidu.com/" ){top.location.href = "http://www.google.com/";}
  else if( self.location == "http://so.360.cn/" ){top.location.href = "http://www.google.com/";}
  else if( self.location == "http://www.so.com/" ){top.location.href = "http://www.google.com/";}
  else if( self.location == "http://www.hao123.com/" ){top.location.href = "http://www.265.com/";}
  else if( self.location == "http://hao.360.cn/" ){top.location.href = "http://www.265.com/";}
}

catch(e) {} ;
})();