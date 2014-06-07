/*
  This script is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

// ==UserScript==
// @name          zwame sidebar remover
// @description   hides the sidebar for the new zwame vBulletin layout
// @include       http://forum.zwame.pt/*
// @copyright     mFycan
// @version       1.0
// @license       gnu/gpl
// ==/UserScript==

intervalo = setInterval('if (window.addEventListener) {sidebarOff(); }',500);


function sidebarOff() {
	var elements = document.getElementById('sidebar_container');
	elements.style.display="none";

	var elements = document.getElementById('content_container');

	elements.style.width="inherit";



clearInterval(intervalo);
	
}


