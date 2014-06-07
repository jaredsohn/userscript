// ==UserScript==
// @name Ikariam Evo
// @namespace zkrgrlover
// @version 1.04
// @description Changes Ikariam main window behavior and adds some extra features
// @author ZiKRo (zikro.code@gmail.com)
// @license Creative Commons Attribution-NoDerivs 3.0 Unported License (http://creativecommons.org/licenses/by-nd/3.0/)
//
// @copyright Copyright (c) 2012 ZiKRo (zikro.code@gmail.com)
// @copyright jQuery, jQueryUI: Copyright (c) 2012 jQuery Foundation and other contributors (http://jquery.org/copyright/)
// @copyright TinySort: Copyright (c) 2008-2012 Ron Valstar (http://www.sjeiti.com/)
// @copyright jquery.checkbox: Copyright (c) 2008 Giulio Bai (http://giulio.hewle.com)
//
// @homepage http://userscripts.org/scripts/show/147380
// @downloadURL https://userscripts.org/scripts/source/147380.user.js
// @updateURL https://userscripts.org/scripts/source/147380.meta.js
//
// @icon http://uscdn.zikro.gr/ikariam/evo/ika-evo-icon-single-48.png
//
// @require http://uscdn.zikro.gr/js/jquery/1.7.1/jquery.min.js
// @require http://uscdn.zikro.gr/js/jquery-ui/1.8.23/jquery-ui.min.js
// @require http://uscdn.zikro.gr/js/jquery.tabbedDialog.js
// @require http://uscdn.zikro.gr/js/jquery.tinysort.min.js
// @require http://uscdn.zikro.gr/js/jquery.checkbox/jquery.checkbox.js
//
// @require http://uscdn.zikro.gr/js/gm/ScriptUpdater.js
//
// @require http://uscdn.zikro.gr/js/zikro.base.js
// @require http://uscdn.zikro.gr/js/zikro.object.js
// @require http://uscdn.zikro.gr/js/zikro.component.js
// @require http://uscdn.zikro.gr/js/zikro.images.js
// @require http://uscdn.zikro.gr/js/zikro.utils.js
// @require http://uscdn.zikro.gr/js/zikro.stringutils.js
// @require http://uscdn.zikro.gr/js/zikro.jqueryutils.js
// @require http://uscdn.zikro.gr/js/zikro.language.js
// @require http://uscdn.zikro.gr/js/zikro.config.js
// @require http://uscdn.zikro.gr/js/zikro.gm.config.js
//
// @require http://uscdn.zikro.gr/ikariam/ikariam.js
// @require http://uscdn.zikro.gr/ikariam/ikariam.version.js?v=1.01
// @require http://uscdn.zikro.gr/ikariam/ikariam.utils.js
// @require http://uscdn.zikro.gr/ikariam/ikariam.data.js
//
// @require http://uscdn.zikro.gr/ikariam/evo/ikaevo.if.js?v=1.01
// @require http://uscdn.zikro.gr/ikariam/evo/ikaevo.if.initialize.js
// @require http://uscdn.zikro.gr/ikariam/evo/ikaevo.if.config.js
// @require http://uscdn.zikro.gr/ikariam/evo/ikaevo.if.preferences.js
// @require http://uscdn.zikro.gr/ikariam/evo/ikaevo.if.images.js
// @require http://uscdn.zikro.gr/ikariam/evo/ikaevo.if.language.js
// @require http://uscdn.zikro.gr/ikariam/evo/ikaevo.if.language.dictionary.js?v=1.02
// @require http://uscdn.zikro.gr/ikariam/evo/ikaevo.if.styles.js
// @require http://uscdn.zikro.gr/ikariam/evo/ikaevo.if.cpanel.js?v=1.01
// @require http://uscdn.zikro.gr/ikariam/evo/ikaevo.if.toolbar.js
// @require http://uscdn.zikro.gr/ikariam/evo/ikaevo.if.tabbar.js
// @require http://uscdn.zikro.gr/ikariam/evo/ikaevo.if.resprod.js
// @require http://uscdn.zikro.gr/ikariam/evo/ikaevo.if.quickloads.js
// @require http://uscdn.zikro.gr/ikariam/evo/ikaevo.if.hooks.js
//
// @resource zikro_logo_sqr_png http://uscdn.zikro.gr/ikariam/evo/zikro-logo-ika-evo-sqr.png
// @resource ika_evo_icon_about_png http://uscdn.zikro.gr/ikariam/evo/ika-evo-icon-about.png
//
// @include http://*.ikariam.*/*
// @exclude http://support.ikariam.*/*
// @exclude http://board.*.ikariam.*/*
//
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_getResourceText
// @grant GM_getResourceURL
// @grant GM_addStyle
// @grant GM_xmlhttpRequest
//
// @history	1.04 Released: Dec 04, 2012
// @history	1.04 Language: German
// @history	1.04 Language: Persian
// @history	1.04 Bugfix: Bug in update procedure with Greasemonkey 1.5. Firefox won't trigger GM due to "nocache" link parameter
// @history	1.04 Bugfix: Bug at Ikariam version comparing procedure
// @history 1.04 Core: Script is checked and working smoothly with Ikariam v0.5.2
// @history 1.00 Released: Sep 21, 2012
// @history 1.00 Language: Greek
// @history 1.00 Language: English (Default)
// @history 1.00 Feature: Stick mainbox window at the bottom of the page
// @history 1.00 Feature: Hide birds and only animation
// @history 1.00 Feature: Make mainbox window shadow/glow bolder
// @history 1.00 Feature: Stick tabs bar at mainbox window title bar
// @history 1.00 Feature: Mainbox window buildings bar under the title bar
// @history 1.00 Feature: Quickload buttons at transports and colonize view for cargo ships loading
// @history 1.00 Feature: Display resource production under each resource total quantity
// @history 1.00 Feature: Control panel which allows to alter preferences, update the script and view script information
// @history 1.00 Feature: Ikariam version detection and script blocking
// @history 1.00 Core: Support for Ikariam version 0.5.1
// @history 1.00 Core: Initial Release
//
// ==/UserScript==

Zikro.JQueryUtils.setup();
Zikro.StringUtils.init();

IF.run();
