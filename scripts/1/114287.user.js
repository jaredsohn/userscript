// ==UserScript==
// @id             www.normteam.com-95c2b844-c61f-419e-b0b9-7d1f4fb078ab@CzBiX
// @name           NormTeam
// @version        1.0
// @namespace      CzBiX
// @author         CzBiX
// @description    禁止NormTeam弹出Taobao页面
// @include        http://*.normteam.com/*
// @run-at         document-end
// ==/UserScript==
unsafeWindow.mytaobao = function(){};