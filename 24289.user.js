// ==UserScript==
// @name           Environment Canada Better Weather
// @namespace      http://userscripts.org/people/4764
// @description    improves Environment Canada's weather forecast display
//                       - automatically expands the forecast details
// @include        http://www.weatheroffice.gc.ca/city/pages/*
// ==/UserScript==

(function()
{
   location.href = "javascript:void(SwitchMenu('fdetails'))";
})();
