// Ynet Stop Auto Refresh
// Copyright, benleevolk, 2009
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
// ==UserScript==
// @name           Ynet Stop Auto Refresh
// @namespace      http://userscripts.org/scripts/show/35593
// @description    Stop auto-refreshing components in ynet
// @include        http://*.ynet.co.il/*
// @include        http://ynet.co.il/*
// @include        http://go.calcalist.co.il/*
// @exclude        http://time.ynet.co.il/widget_computers_small.htm
// ==/UserScript==

for(var n=1;n<=10;n++)
{
	try 
	{
		clearTimeout(n);
	}
	catch (err){}
}