// ==UserScript==
// @name           gmailDropbox
// @namespace      dropbox
// @description    Adjusts Dropbox Gadget for Gmail
// @include        https://www.dropbox.com/iphone/*
// @include        http://www.dropbox.com/iphone/*
// @include        http://www.dropbox.com/m/*
// @include        https://www.dropbox.com/m/*
// ==/UserScript==

//main page improvement
document.styleSheets[document.styleSheets.length-1].insertRule('#header { display:none !important;}',document.styleSheets[document.styleSheets.length-1].cssRules.length);
document.styleSheets[document.styleSheets.length-1].insertRule('span,.textblurb,a,.blocklink { font-size:11px !important;}}',document.styleSheets[document.styleSheets.length-1].cssRules.length);
document.styleSheets[document.styleSheets.length-1].insertRule('.eventtime small { font-size:10px !important;}}',document.styleSheets[document.styleSheets.length-1].cssRules.length);


//login page improvement
document.styleSheets[document.styleSheets.length-1].insertRule('div#home-login input {max-width:120px !important;}',document.styleSheets[document.styleSheets.length-1].cssRules.length);
document.styleSheets[document.styleSheets.length-1].insertRule('div#loginsection {position:static;left:0px !important;width:95%;}',document.styleSheets[document.styleSheets.length-1].cssRules.length);
document.styleSheets[document.styleSheets.length-1].insertRule('input.logininput {float:left;font-size:12px;height:18px;margin:4px 0; padding-left:2px;width:130px;}',document.styleSheets[document.styleSheets.length-1].cssRules.length);
document.styleSheets[document.styleSheets.length-1].insertRule('#boxcontainer img {width:30px ! important;}',document.styleSheets[document.styleSheets.length-1].cssRules.length);
document.styleSheets[document.styleSheets.length-1].insertRule('#boxcontainer {position:static;}',document.styleSheets[document.styleSheets.length-1].cssRules.length);
document.styleSheets[document.styleSheets.length-1].insertRule('input.loginbutton {margin-top:6px;border:medium none;color:#0978D4;font-size:14px;font-weight:700;height:20px;left:70px;padding:0 0 5px;position:absolute;top:341px;width:70px;}',document.styleSheets[document.styleSheets.length-1].cssRules.length);
document.styleSheets[document.styleSheets.length-1].insertRule('input.remembercheck {float:left;position:static;clear:left;display:block;}',document.styleSheets[document.styleSheets.length-1].cssRules.length);
document.styleSheets[document.styleSheets.length-1].insertRule('span.remembertext {float:left;font-size:11px;position:static;padding:0 0 0 4px;}',document.styleSheets[document.styleSheets.length-1].cssRules.length);
document.styleSheets[document.styleSheets.length-1].insertRule('div#main-container {max-height:200px;overflow:hidden;width:158px !important;}',document.styleSheets[document.styleSheets.length-1].cssRules.length);
