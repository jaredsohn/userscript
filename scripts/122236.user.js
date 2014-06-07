// ==UserScript==
// @name           ADF.LY Skipper
// @namespace      ADF.LY
// @description    Skip ADF.LY Pages.
// @include        http://adf.ly/*
// @exclude        http://adf.ly/rates.php
// @exclude        http://adf.ly/register.php
// @exclude        http://adf.ly/confirm.php
// @exclude        http://adf.ly/contact.php
// @exclude        http://adf.ly/referrals.php
// @exclude        http://adf.ly/tool.php
// @exclude        http://adf.ly/account.php
// @exclude        http://adf.ly/referrals.php
// @exclude        http://adf.ly/withdraw.php
// @exclude        http://adf.ly/logout.php
// @exclude        http://adf.ly/locked/*
// ==/UserScript==
location.href="javascript: showSkip()";