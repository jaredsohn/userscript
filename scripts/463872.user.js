// ==UserScript==
// @name       sqlru
// @namespace  sqlru
// @version    0.1
// @description  css
// @include      http://www.sql.ru/forum*
// @copyright  2014+, YaM
// @run-at         document-start
// ==/UserScript==

(function() {
    var win = (typeof unsafeWindow == "undefined" ? window : unsafeWindow);
    var doc = win.document;
    var style = doc.createElement("style");
    style.type = "text/css";
    style.textContent = '\
\
#page-container { \
max-width: 1350px; \
margin: 0 auto; \
}\
#page-container .newmessage { color: #F88911 !important; } \
div>.msgTable, div>.msgTable>tbody, div>.msgTable>tbody>tr, div>.msgTable>tbody>tr>td, div>.msgTable>tbody>tr>.messageHeader { \
display: block; border: 0; \
}\
div>.msgTable { \
border: 1px solid #666; box-shadow: 0 2px 6px 0 #555; margin-bottom: 11px; \
}\
div>.msgTable>tbody>tr>.messageHeader { \
background: #668899; border-bottom: 1px solid #888888; color: #ffe6ad; \
}\
div>.msgTable>tbody>tr>.messageHeader[style^="background"] { \
background: #3F9662 !important;  \
}\
div>.msgTable>tbody>tr>.msgFooter { \
background: #bbbbbb; height: 16px; padding-top: 4px; \
}\
div>.msgTable>tbody { \
background: #eee;  \
}\
div>.msgTable>tbody>tr:nth-child(2)::after { \
content: " "; height: 0px !important; display: block; overflow: hidden; clear: both; \
}\
div>.msgTable>tbody>tr:nth-child(2)>td:first-child { \
float: left; padding: 9px !important; width: 156px !important; border-right: 1px solid #959595; word-wrap: break-word; \
}\
div>.msgTable>tbody>tr:nth-child(2)>td:first-child .smallInfo { \
color: #666; \
}\
div>.msgTable>tbody>tr:nth-child(2)>td:first-child>a { \
text-decoration: none; color: #0000dd; font-size: 14px; \
}\
div>.msgTable>tbody>tr:nth-child(2)>td:first-child a:hover { \
text-decoration: underline; \
}\
div>.msgTable>tbody>tr:nth-child(2)>td:nth-child(2).msgBody { \
margin: 0 0 0 174px; border-left: 1px solid #959595; \
}\
.msgBody .af-attach, .msgBody .src { \
overflow: auto; cursor: default; \
}\
\
#page-container .forumTable { \
box-shadow: 0 0 8px -1px #000; \
}\
#page-container .forumTable td.icon_cell { \
background: #d0d0d0; padding-right: 0; padding-left: 8px; border-right: 0; \
}\
#page-container .forumTable td.postslisttopic { \
padding-left: 9px; border-left: 0; \
background-image: -webkit-linear-gradient(left, #d0d0d0 0%,#eeeeee 25px,#eeeeee 92%,#dddddd 100%); \
background-image: -moz-linear-gradient(left, #d0d0d0 0%,#eeeeee 25px,#eeeeee 92%,#dddddd 100%); \
background-image: -o-linear-gradient(left, #d0d0d0 0%,#eeeeee 25px,#eeeeee 92%,#dddddd 100%); \
background-image: linear-gradient(left, #d0d0d0 0%,#eeeeee 25px,#eeeeee 92%,#dddddd 100%); \
}\
#page-container .forumTable td:first-child { border-left: 1px solid #777; }\
#page-container .forumTable td:last-child { border-right: 1px solid #777; }\
#page-container .forumTable>tbody>tr:last-child>td { border-bottom: 1px solid #777; }\
#page-container .forumTable td { \
padding: 3px 4px; border: 1px solid #bbb; \
}\
#page-container .forumTable td a { \
text-decoration: none; color: #0000c5; \
}\
#page-container .forumTable td a:hover { \
text-decoration: underline; \
}\
td.postslisttopic+td.altCol>a[href*="memberinfo"] { padding-left: 14px; background: transparent url(/forum/members/160534.png) 0 1px no-repeat; } \
#forumSelector~table[style*="font"] { display: none !important; } \
	';
    doc.getElementsByTagName("head")[0].appendChild(style);
})();