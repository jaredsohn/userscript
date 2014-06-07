// ==UserScript==
// @name           Web 2.0 Google Logo
// @namespace      http://www.myspace.com/froggy26rk
// @description    Shows a web 2.0 Google Logo
// @include        http://www.google.co.uk/
// ==/UserScript==

/*
 	Script modified by Prashanth from CultofWeb.com
	Original author 'Amos' from http://userscripts.org/people/4184
	Logo by 'Pattrick Loggins'
	taken from http://www.flickr.com/photos/patters/97701731/
	All rights reserved by respective owners.
*/

var web20_google = 'http://img110.imageshack.us/img110/9088/indexky9on0.png';



var logo = document.evaluate("//img[@src='/intl/en_uk/images/logo.gif']", document, null, 0, null).iterateNext();

logo.setAttribute('src', web20_google);
logo.setAttribute('height', '');
logo.setAttribute('width', '');
logo.setAttribute('alt', 'Web 2.0 Google');
logo.setAttribute('title', 'Web 2.0 Google');