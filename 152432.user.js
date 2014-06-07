// ==UserScript==
// @name        clarín-no-rompas
// @namespace   http://localhost
// @description Evita las propagandas boludas a otras notas del diario.
// @include     http://www.clarin.com/*
// @version     1
// ==/UserScript==
/* This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.*/

headID = document.getElementsByTagName("head")[0];         
cssNode = document.createElement('style');
cssNode.type = 'text/css';
cssNode.innerHTML = '.contentCol{ display: none}';
headID.appendChild(cssNode);
