// ==UserScript==
// @name           GRRemoveUnnecessaryWhitespaces
// @namespace      kiirpi
// @include        https://www.google.com/reader/view/*
// ==/UserScript==

var overrideCSS = " \
#entries.list .entry .collapsed { -moz-border-bottom-colors: none; -moz-border-image: none; -moz-border-left-colors: none; -moz-border-right-colors: none; -moz-border-top-colors: none; -moz-user-select: none; background: none repeat scroll 0 0 #FFFFFF; border-color: #FFFFFF; border-style: solid; border-width: 2px 0; cursor: pointer; line-height: 3.2ex; margin: 0; overflow: hidden; padding: 1px 0; position: relative; width: auto;}\
#viewer-header { background: none repeat scroll 0 0 #FFFFFF; color: #333333; height: 45px; margin-right: 33px; overflow: hidden; position: relative;}\
#lhn-add-subscription-section { border-bottom: 1px solid #EBEBEB; height: 45px; position: relative; width: 264px;}\
#home-section { padding: 0.2em 0;}\
#lhn-selectors .selector {border-left: 3px solid white;overflow-x: hidden;overflow-y: visible;padding-left: 10px;}\
.scroll-tree li { list-style-type: none; margin: 1px 0; position: relative;}\
#nav{width:200px}\
#chrome{margin-left:200px;min-width:700px}\
.folder .icon {margin-left: 10px;}\
.folder .name.name-d-0 {padding-left: 10px;}\
#sub-tree-header {border-left: 3px solid white;cursor: pointer;font-weight: bold;padding-left: 10px;}\
.folder .folder .folder-toggle {margin-left: 10px;}\
.folder .folder > a > .icon {margin-left: 18px;}\
.folder .folder > ul .icon {margin-left: 20px;}\
.goog-menuitem, .goog-tristatemenuitem, .goog-filterobsmenuitem {color: #333333;cursor: pointer;list-style: none outside none;margin: 0;padding: 2px 2px 2px 20px;position: relative;white-space: nowrap;}\
.section-minimize {background-position: -23px -120px;left: 1px;top: 6px;}\
";
GM_addStyle(overrideCSS);