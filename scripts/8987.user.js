// ==UserScript==
// @name           Web 2.0 Google Logo
// @namespace      http://www.myspace.com/froggy26rk
// @description    Shows a web 2.0 Google Logo
// @include        http://www.google.co.jp/
// ==/UserScript==

/*
 	Script modified by Prashanth from CultofWeb.com
	Original author 'Amos' from http://userscripts.org/people/4184
	Logo by 'Pattrick Loggins'
	taken from http://www.flickr.com/photos/patters/97701731/
	All rights reserved by respective owners.
*/

var web20_google = 'http://img384.imageshack.us/img384/1632/googlejapanaz7.png';


var logo = document.evaluate("//img[@src='/intl/ja_jp/images/logo.gif']", document, null, 0, null).iterateNext();

logo.setAttribute('src', web20_google);
logo.setAttribute('height', '');
logo.setAttribute('width', '');
logo.setAttribute('alt', 'Web 2.0 Google');
logo.setAttribute('title', 'Web 2.0 Google');