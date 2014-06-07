// ==UserScript==

// @name           Recon message window restyle

// @namespace      http://www.regularoddity.com

// @description    This script makes the message window from recon sites resizable.

// @include        http://*msg_messagecentre_inbox_messages.asp*
// @include        http://*msg_messagecentre.asp*
// @include        http://*msg_messagecentre_visits_bottom.asp*
// @include        http://*msg_messagecentre_favourites.asp*


// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle(
"table, .messages_div, .table_messages, .table_favourites, .favourites_div\n" +
"{\n" +
"position: relative !important;\n" +
"float: left !important;\n" +
"}\n" +
"\n" +
"td {width: auto !important;}\n" +
"\n" +
"table, .messages_div, .table_messages, .table_favourites, .favourites_div\n" +
"{\n" +
"height: 100% !important;\n" +
"width: 98% !important;\n" +
"border:0;\n" +
"padding-bottom:0;\n" +
"margin-bottom:0;\n" +
"}\n" +
"\n" +
"#Form2\n" +
"{\n" +
"height: 85%;\n" +
"}\n" +
"\n" +
"form\n" +
"{\n" +
"position: relative !important;\n" +
"float: left !important;\n" +
"padding-bottom: 30px !important;\n" +
"}\n" +
"\n" +
".controlbar, .message_controlbar_sel, .percentage_used, .message_controlbar_btns_go, .message_controlbar, #multi\n" +
"{\n" +
"top: auto !important;\n" +
"bottom: 0% !important;\n" +
"position: absolute !important;\n" +
"z-index: auto !important;\n" +
"}\n" +
"\n" +
".controlbar\n" +
"{\n" +
"padding-top: 5px !important;\n" +
"margin-bottom: -8px !important;\n" +
"}\n" +
"\n" +
".message_controlbar_sel\n" +
"{\n" +
"left: 30% !important;\n" +
"}\n" +
"\n" +
"td.table_messages_from\n" +
"{\n" +
"padding-right: 8px !important;\n" +
"}\n" +
"\n" +
"tbody {\n" +
"overflow:scroll-vertical;\n" +
"}\n" +
"\n" +
".views_div_outline, .views_div_scroll, .views_div\n" +
"{\n" +
"width: 100% !important ;\n" +
"}" +
"\n" +
".message_controlbar, .message_controlbar_bttns_go, .message_controlbar_sel\n" +
"{\n" +
"z-index: 102 !important;\n" +
"}\n" +
"\n" +
"#Image1\n" +
"{\n" +
"position: relative;\n" +
"z-index: 102 !important;\n" +
"}\n"
);
