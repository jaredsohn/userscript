// ==UserScript==
// @name           Orzx Helper
// @namespace      mimiko.orzx
// @include        http://bt.orzx.co/Download.php
// @require        http://code.jquery.com/jquery-latest.js
// @grant          none
// @version        0.0.1
// ==/UserScript==
"use strict";
$('#DownloadID')
.removeAttr('disabled')
.text('Download!');