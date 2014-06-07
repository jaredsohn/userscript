// ==UserScript==
// @name           sfDC Mac formatter
// @namespace      local
// @description    Reformats mac address
//@include		https://na3.salesforce.com/*
// ==/UserScript==

window.setTimeout(function(){mac=document.getElementById('00N50000001P1Hv_ileinner'); mac.innerHTML = mac.innerHTML.replace(/[\:\-\.\s]/gi, '');bxr=document.getElementById('00N50000001P1Hv');bxr.value = bxr.value.replace(/[\.\:\-\s]/gi, '-');}, 300);
