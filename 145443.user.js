// ==UserScript==
// @name        LeproRenewCommentsHelper
// @namespace   http://kt.era.ee/lepra/
// @description Этот скрипт не надо устанавливать, см LeproRenewComments
// ==/UserScript==

var el = $$("div.post.ord div.dd div.p a.u + a")[0]
var curclick = el.getAttribute("onclick");
var newclick = "$$('div.new').removeClass('new');" + curclick;
el.setAttribute("onclick", newclick);
