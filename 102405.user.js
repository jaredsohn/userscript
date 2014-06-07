// ==UserScript==
// @name           One.lv Photo NLarger
// @description    This script adds a link to the original-sized photo
// @version        20110507
// @namespace      onelv
// @include        http://www.one.lv/viewPhoto.do?*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// ==/UserScript==

var expr = /photoId=\d*/g;

$('.portletBody table td.smallnormal:eq(0)')
.append('<br><br><span class="smallnormalBlue"><a href="http://i11.one.lv/getImage?'+expr.exec(document.URL)+'&photoType=3">Увеличить фото</a></span>');