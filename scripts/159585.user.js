// ==UserScript==
// @name        shanbay_force_use_flash_for_sound
// @namespace   http://slayercat.com
// @description 暂时性解决shanbei在firefox nightly中不能发声的问题
// @include     http://www.shanbay.com/*
// @version     1
// ==/UserScript==

soundManager.preferFlash = true;
soundManager.useHTML5Audio = false;
soundManager.reboot();