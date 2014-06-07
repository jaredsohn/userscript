// ==UserScript==
// @name           Sport5 wap override
// @namespace      http://whatsup.org.il/sport5wap
// @description    Override the WAP redirect on sport5.co.il
// @include        http://www.sport5.co.il/*
// ==/UserScript==

if (unsafeWindow.isMobileArr) {
    unsafeWindow.isMobileArr.pop();
}

