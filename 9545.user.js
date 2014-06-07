// ==UserScript==
// @name        Wikipedia2Answers.com
// @version     1.0
// @author      Lukas Fragodt
// @namespace   lukas.fragodt.wikipedia
// @description Changes all Wikipedia links to Answers.com searches.
// @include     http://*
// @include     https://*
// ==/UserScript==

//Author contact info: Lukas Fragodt <lukas@fragodt.com>

//Copyright (C) 2006,2007. Lukas Fragodt and contributor(s).
//This script is free software; you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation; version 2 of the License. More
//information and a copy of the license available at http://www.gnu.org/copyleft/gpl.html

//This script is distribute in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of 
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//GNU General Public License for more details.

var anchors = document.getElementsByTagName('a');

for ( var i = 0; i < anchors.length; i++ ) {
    var link = anchors[i].href.replace( /^http:\/\/(.*\.)?wikipedia\.org\/wiki\/(.*)$/, "http://answers.com/main/ntquery?s=$2" );    
    anchors[i].href = link;
}