// ==UserScript==
// @name           Facebook News Feed Adhide
// @namespace      Eli Colner
// @version        1.0.0
// @copyright      Copyright 2012 Eli Colner
// @license        CC BY http://creativecommons.org/licenses/by/3.0/
// @description    Hides Facebook ads on your News Feed while retaining Suggested Friends, Suggested Pages, et al. v1.0.0 2012-08-17
// @include        http*://www.facebook.com
// @include        http*://facebook.com
// @include        http*://www.facebook.com/
// @include        http*://facebook.com/
// @include        http*://www.facebook.com/?*
// @include        http*://facebook.com/?*
// ==/UserScript==
// DISCLAIMER:     Use at your own risk. Functionality and harmlessness cannot be guaranteed.

function addNewStyle(newStyle) {
   var styleElement = document.createElement('style');
   styleElement.type = 'text/css';
   styleElement.id = 'styles_js';
   document.getElementsByTagName('head')[0].appendChild(styleElement);
   styleElement.appendChild(document.createTextNode(newStyle));
}

addNewStyle('div.ego_column {display:none;}\n' +
		    'div.ego_column.egoOrganicColumn {display:block;}');
