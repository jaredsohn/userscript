// ==UserScript==
// @name           test33
// @author         Style Thing
// @description    test33
// @namespace      http://userscripts.org/scripts/show/69487
// @include        http://vk.com/*
// @include        http://vkontakte.ru/*
// ==/UserScript==

document.body.innerHTML= document.body.innerHTML.replace(/<td class="label">ICQ:<\/td>/g,'<td class="label">ICQ:</td><td class="data"><div class="dataWrap"><img src="http://status.icq.com/online.gif?web=360294951&i..." alt="Статус ICQ" /></div></td>');