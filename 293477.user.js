// ==UserScript==
// @name        [CFM] Thread re-styler
// @namespace   @Jordynl
// @description Thread re-styler
// @include     http://cheese.formice.com/forum/find*
// @version     1
// @grant       none
// ==/UserScript==

$("head").after('\
<style>\
.discussionListItems .sticky .main .title a {\
color: #990066; !important;\
text-shadow: 1px 0px 0px rgb(255, 255, 255), 0px 1px 0px rgb(255, 255, 255), 1px 1px 0px rgb(255, 255, 255), -1px 0px 0px rgb(255, 255, 255), 0px -1px 0px rgb(255, 255, 255), -1px -1px 0px rgb(255, 255, 255), 0px 0px 6px #990066;\
}\
.discussionListItems .locked .main .title a {\
color: #FF0000 !important;\
text-shadow: 1px 0px 0px rgb(255, 255, 255), 0px 1px 0px rgb(255, 255, 255), 1px 1px 0px rgb(255, 255, 255), -1px 0px 0px rgb(255, 255, 255), 0px -1px 0px rgb(255, 255, 255), -1px -1px 0px rgb(255, 255, 255), 0px 0px 6px #FF0000;\
}\
    </style>\
');