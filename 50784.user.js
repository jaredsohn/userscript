// ==UserScript==
// @name           Ikariam CR Converter
// @namespace      holyschmidt
// @author         holyschmidt (http://userscripts.org/users/50784)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @homepage       http://userscripts.org/scripts/show/50784
// @description    Easily Convert Combat Reports for forum viewing.
// @version        4.08
// @downloadURL    https://userscripts.org/scripts/source/50784.user.js
// @updateURL      https://userscripts.org/scripts/source/50784.meta.js
// @include        http://s*.ikariam.*/index.php*
// @include        http://m*.ikariam.*/index.php*
// @exclude        http://board.ikariam.*/*
// @exclude        http://support*.ikariam.*/*
//
// @history        4.08 Script deprecated.
// @history        4.07 Bugfix: Updated for v0.5.3 (resource parsing issue)
// @history        4.06 Bugfix: Coloring issue fixed.
// @history        4.05 Bugfix: Error viewing more than the first detailed battle report shown.
// @history        4.04 Support for "mobile" versions of Ikariam.
// @history        4.03 Bugfix: Defender's losses not shown correctly in detailed CRs
// @history        4.02 Bugfix: report not getting reset before new "convert".  Req'd for ajax implementation.
// @history        4.01 Fixed language detection bug (thanks Apollo for the heads up)
// @history        4.01 Script update mechanism updated for new meta tag functionality.
// @history        4.01 Tweaked some of the watchdog defaults to be more lenient in how long it takes to bring up an ajax view.
// @history        4.00 Updated for v0.5.x
// @history        4.00 Some re-design, to provide more common source code between the web and client-side converters.
// @history        4.00 Deprecated "PlunderUtils".
// @history        4.00 Deprecated "manual" changes, as this was only to address a defect in an old version of IKA.
// @history        4.00 Deprecated turning on/off preview (always on).
// @history        4.00 Deprecated HTML formatting for converted (HTML) combat reports (use "plaintext").
// @history        3.18 Bugfix: Wrong damage being calculated for v0.4.4
// @history        3.17 Simiplied jQuery for getting reserve units.
// @history        3.17 Initial update for 0.4.5 (still need translations for new ships).
// @history        3.16 Bugfix: Display NaN for "Damage Percent" for the reports with no damage.
// @history        3.15 Bugfix: Not working quite right on test server (v0.4.X).
// @history        3.14 Feature: Added new mechanism for report summary "metrics" with two new entries: 
// @history        3.14 Feature: Added two new report "metrics": 1. Offensive/Defensive Points 2. Damage Percent
// @history        3.14 Removed all remaining dependencies to control location on betawarriors.com
// @history        3.13 Bugfix: Ikariam v0.4.2.4 broke the summary converter.
// @history        3.12 Moved old dependencies to new (controlled) location.
// @history        3.10 Tweak: Modified default color scheme to be more conducive to the new Ikariam forum.
// @history        3.09 Feature: Added (optional) setting to automatically include "spoiler" tag in bbcode reports.
// @history        3.08 Bugfix: Problem when sending detailed reports via circular messages.
// @history        3.08 Bugfix: Problem with images in in-game messages.
// @history        3.07 Bugfix: Problem in the type of battlefield parsed in detailed view which led to "undefined" units.
// @history        3.06 Feature Removal: Removed garrison icon on island view (I think there was a bug here anyway).
// @history        3.05 Feature: Added unit names to event actions (PlayerX has joined the battle with...) (thanks hotcarbu)
// @history        3.04 Bugfix: Problem with determining land vs sea battle (thanks Martynius).
// @history        3.03 Bugfix: Gameforge changed how '&' were stored, which broke reports sent in-game with the circular option.
// @history        3.02 Feature: Added checkbox for turning on/off report preview + images.
// @history        3.02 Bugfix: Commas were not added to damage, etc.
// @history        3.02 Bugfix: Force-edit of reports added back in.
// @history        3.00 Overhaul: Code re-design.
// @history        3.00 Feature: New Settings dialog.
// @history        3.00 Feature: New "html" option for rich-text email messages.
// @history        3.00 Feature: Support for individual round reports.
// @history        3.00 Feature: Hiding zero-moral lines in detailed view.
// @history        3.00 Feature: Show garrison button added for towns with deployed troops/fleet (thanks Wiisley).

// ==/UserScript==

alert('This script is no longer supported.  Thank you for your support over the years.  -holyschmidt');