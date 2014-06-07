// ==UserScript==
// @name           Pardus Imagepack Enforcer
// @version        0.9.1 beta 
// @date           14-May-2009
// @author         Marcin Trybus 
// @namespace      pardus.at
// @description    Enforces the use of local imagepack for a consistent look across all Pardus pages and related websites.
// @include        http://*.pardus.at/profile.php?id=*
// @include        http://*.pardus.at/alliance_members.php
// @include        http://*.pardus.at/alliance.php?id=*
// @include        http://forum.pardus.at/*
// @include        http://*.pardus.at/myalliance.php
// @include        http://*.pardus.at/starbase.php
// @include        http://www.pardus.at/index.php?section=manual*
// @include        http://pardus.maxisoft.org/*
// @include        http://pardus.butterfat.net/pardusmapper/*
// @include        http://*.pardus.at/index_buildings.php*
// ==/UserScript==

// Copyright (C) 2009 Marcin Trybus <mtrybus@o2.pl> 
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


// ========================================================================
// DISCLAIMER 
// ========================================================================
// 
// As far as I know this script doesn't come close to breaking any rules 
// of Pardus, but you use it at your own risk. I'll write to the Devs when 
// I'll think it's worth it. 
// 
// Please note that I learned JavaScript today and the script is just 
// a simple hack to achieve a consistent look across all websites in case 
// you use a custom image pack. This does NOT prevent the download of the 
// original images. If it doesn't work for you I'm sorry but I have no will 
// or ability to enchance it. 
// 
// The Blue Sun Corporation maps don't use the standard directory structure 
// found in the image pack hence won't work. It's on the TODO list. 


// ========================================================================
// TODO (no promises or deadlines) 
// ========================================================================
// 
// * Compatibility with Blue Sun Corporation maps. 
// * Make a complete list of pages where it's necessary. 


// ========================================================================
// User Defined Variable 
// ========================================================================

// IMGPATH should be the same as the local images path set in Account 
// Settings. Failing to set it will make most of the images disappear! 
// Note the enclosing quotation marks. This is not foolproof in any way. 
// Each backslash "/" and space " " in path has to be preceded by a slash "\". 

var IMGPATH = "c:\/games\/Pardus\/images";

// ========================================================================
// Code 
// ========================================================================

var pics = document.getElementsByTagName('img');
for (var i=0; i<pics.length; i++)
{
	var pic = pics[i];
	if (pic.src.match(/http:\/\/static.pardus.at\/images/))
		{
		pic.src = pic.src.replace("http:\/\/static.pardus.at\/images","file:\/\/"+IMGPATH);
    	continue;
		}
	if (pic.src.match(/http:\/\/pardus.butterfat.net\/pardusmapper\/maps\/tiles/))
	    {
		pic.src = pic.src.replace("http:\/\/pardus.butterfat.net\/pardusmapper\/maps\/tiles","file:\/\/"+IMGPATH);
		}
}