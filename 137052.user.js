// ==UserScript==
// @author Chamie (vk.com/chamie)
// @name price.ru_fixsort
// @include http://price.ru/*
// @version 1.0
// @description Исправляет сортировку по умолчанию на Price.ru на сортировку по цене.
// ==/UserScript==
if (location.search.indexOf("sort=")==-1 && location.pathname.indexOf("/offers/")!=-1)
	location.search=location.search+"&sort=3";