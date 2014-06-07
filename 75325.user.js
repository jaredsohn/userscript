// ==UserScript==
// @name           ru.ikariam.com -> ikariam.ru
// @version        0.1
// @namespace      GrAndAG
// @description    ru.ikariam.com -> ikariam.ru
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @include        http://ikariam.ru/
// @include        http://www.ikariam.ru/
// @include        http://ru.ikariam.com/
// @include        http://www.ru.ikariam.com/
// @include        http://ikariam.ru/index.php
// @include        http://www.ikariam.ru/index.php
// @include        http://ru.ikariam.com/index.php
// @include        http://www.ru.ikariam.com/index.php

// @history        0.1 Initial release
// ==/UserScript==

//-----------------------------------------------------------------------------
  $("#universe > option").each( function() {
    $(this).attr("value", $(this).attr("value").replace(/ru\.ikariam\.com/, "ikariam.ru"));
  });
//-----------------------------------------------------------------------------

