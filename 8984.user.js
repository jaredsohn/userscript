// ==UserScript==
// @name           Web 2.0 Google Logo for China
// @namespace      http://www.myspace.com/froggy26rk
// @description    Shows a web 2.0 Google Logo on Chinese Google
// @include        http://www.google.cn/

// ==/UserScript==

/*
 	Script modified by Prashanth from CultofWeb.com
	Original author 'Amos' from http://userscripts.org/people/4184
	Logo by 'Pattrick Loggins'
	taken from http://www.flickr.com/photos/patters/97701731/
	All rights reserved by respective owners.
*/

var web20_google = 'http://img382.imageshack.us/img382/5742/googlechinasc1.png';



var logo = document.evaluate("//img[@src='/intl/zh-CN/images/logo_cn.gif']", document, null, 0, null).iterateNext();

logo.setAttribute('src', web20_google);
logo.setAttribute('height', '');
logo.setAttribute('width', '');
logo.setAttribute('alt', 'Web 2.0 Google');
logo.setAttribute('title', 'Web 2.0 Google');