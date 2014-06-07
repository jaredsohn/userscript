// ==UserScript==
// @name           3zai.com fix
// @namespace      http://d.hatena.ne.jp/MillyC/
// @include        http://www.3zai.com/manage/account/*
// ==/UserScript==

var $ = unsafeWindow.jQuery;
$('#account_create_form input[name^="open_flag"]').attr('checked', '');
$('#account_create_form select[name^="municipality_code"]').val('00000');
