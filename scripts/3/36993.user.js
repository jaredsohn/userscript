// WorldCat.org ISBN to OCLC
// version 0.2 2009-07-18
// Copyright 2008-2009 James Crowley (http://structuregeek.com)
// --------------------------------------------------------------------
// 2009-07-18 - version 0.2 - updated to work with Worldcat's redesign
// 2008-11-15 - version 0.1 - initial release
// --------------------------------------------------------------------
// This program is free software: you can redistribute it and/or
// modify it under the terms of the GNU General Public License as
// published by the Free Software Foundation, either version 3 of
// the License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be
// useful, but WITHOUT ANY WARRANTY; without even the implied
// warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
// PURPOSE.  See the GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public
// License along with this program.  If not, see
// <http://www.gnu.org/licenses/>.
// --------------------------------------------------------------------
// ==UserScript==
// @name WorldCat.org redirect ISBN to OCLC
// @namespace http://structuregeek.com/
// @description Redirect from a WorldCat ISBN page to the OCLC page.
// @include http://worldcat.org/isbn/*
// @include http://www.worldcat.org/isbn/*
// ==/UserScript==
var e = "input"; // element being tested
var a = "@id";   // attribute being tested
var v = "util-permalink"; // value of attribute being tested
var x = "//" + e + "[contains(" + a + ",'" + v + "')]"; // XPath expression
var result = document.evaluate(x, document, null, 0, null).iterateNext();
if (result != null)
{
  var url=result.value;
  if (url != null) window.location = url;
}
else
{
  // did not find input#util-permalink
}