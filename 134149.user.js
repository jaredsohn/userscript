// ==UserScript==
// @name           Facebook Grassifier
// @description    Replace german facebook's "Was machst du gerade?" with "Was gesagt werden muss:"
// @include        http://*facebook.com*
// @include        https://*facebook.com*
// @copyright      dsn
// @version        1.0.0
// @license        http://creativecommons.org/licenses/by/3.0/de
// ==/UserScript==

var replacer = new RegExp("Was machst du gerade\\?", "g");
                             
document.body.innerHTML= document.body.innerHTML.replace(replacer,"Was gesagt werden muss:");
