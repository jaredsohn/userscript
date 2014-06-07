// ==UserScript==
// @name VK Full User Info
// @namespace vk.com/
// @description Подробная информация о пользователе Вконтакте на странице отображается сразу (не нужно нажимать "показать полную инфу")
// @author bz
// @include			*vk.com*
// @include			*vkontakte.ru*
// @exclude file://*
// ==/UserScript==

if(unsafeWindow.isVisible && unsafeWindow.switchPersonalInfo && unsafeWindow.ge('full_info') && !unsafeWindow.isVisible('full_info'))
	unsafeWindow.setTimeout(unsafeWindow.switchPersonalInfo, 500);