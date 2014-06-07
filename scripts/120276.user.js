// ==UserScript==
// @name           VKontakte Captcha Dialog Remover
// @namespace      flux242
// @version        1.0.1
// @description    Removes 'enter code' captcha message box
// @include        *vkontakte.ru*
// @include        *vk.com*
// ==/UserScript==

unsafeWindow.showCaptchaBox = function(sid, dif, box, o) {  };
//unsafeWindow.activateMobileBox = function(opts) { alert('activatebox is called');}; 