// ==UserScript==
// @id             lifehackerHotkeyDisable
// @name           Gawker Sites Key Bindings Disable
// @namespace      lifehackerHotkeyDisable
// @include        http://lifehacker.com*
// @include        http://gizmodo.com*
// @include        http://gawker.com*
// @include        http://deadspin.com*
// @include        http://kotaku.com*
// @include        http://jezebel.com*
// @include        http://jalopnik.com*
// @include        http://io9.com*
// ==/UserScript==

unsafeWindow.jQuery(document).unbind('keydown');
void 0;