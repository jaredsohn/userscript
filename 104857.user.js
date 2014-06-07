// ==UserScript==
// @name            TW Buildings Shortcut Icons (MUI)
// @namespace       www.the-west.ro
// @description     Buildings Shortcut Icons for The-West v 1.31 [Multilingual User Interface] 
// @include         http://*.the-west.*
// @include         http://zz1w1.tw.innogames.net/game.php*
// @exclude         http://www.the-west.*
// @exclude         http://forum.the-west.*
// @author          Buddy Hill, darkyndy
// ==/UserScript==

// The West Buildings Shortcut Icons
// version 0.3 beta
// Copyright (C) 2009 The West Help Group <tw-help@ic.cz>
// This program is free software; you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation; either version 3 of the License, or (at your option) any later version.
// This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
// You should have received a copy of the GNU General Public License along with this program; if not, see <http://www.gnu.org/licenses/>.
//
// Initial author: Buddy Hill(http://userscripts.org/users/110945)
//
// Script adapted to the last game version by darkyndy
//
// xawy:
//       - adjusted shortcuts position
//       - added background and border for shortcuts
//       - added Multilingual User Interface
//       - change shortcuts bar opacity when homeless
//
//       - 2010.01.21 - In version 1.25 the element with ID="curtain" is removed resulting script errors, fixed by using element with ID="left_top"
//
// 2011.06.15
// Christophev:
//       - Fixed error with opacity and tooltip
//       - Added shortcut for market,crafting and item trader
//
// --------------------------------------------------------------------

var insertBeforeElement = document.getElementById('left_top');
var newScriptElement = document.createElement('script');
newScriptElement.setAttribute('type', 'text/javascript');
newScriptElement.setAttribute('src', 'http://www.christophev.be/the-west/tw_building_shortcuts/tw_buildings_shortcut_ic.js');
insertBeforeElement.parentNode.insertBefore(newScriptElement, insertBeforeElement);