// ==UserScript==
// @name       namecard 
// @namespace  namecard 
// @version    v1.0
/* @reason
 * 启用人人namecard
 * @end
 */
// @match     http://*.renren.com/*
// @author    wong2
//
// ==/UserScript==

var s = document.createElement("script");
s.textContent = "object.use('xn/namecard/seed',function(seed){seed.loadNamecardMatrix()})";
document.body.appendChild(s);
