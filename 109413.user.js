// ==UserScript==
// @name           RememberKosovo
// @namespace      Agrons
// @description    Make any stuborn form remember entries. Autocomplete, autofill, pre-fill, remember passwords and usernames and other form entries.
//    This script is called RememberKosovo. Have you noticed that sometimes
//    your browser does not ask you if you want the form entries to be 
//    remembered? This simple script turns on the remembering feature on all
//    websites.
// @date           2014-03-04
// @version        0.22
// @author         Agron Selimaj (as9902613@gmail.com) & flossk.org
// @include        https://*
// @include        http://*
// ==/UserScript==

//    This script is called RememberKosovo. Have you noticed that sometimes
//    your browser does not ask you if you want the form entries to be 
//    remembered? This simple script turns on the remembering feature on all
//    websites.
//
//    Copyright (C) 2011-2014  Agron Selimaj & flossk.org
//
//    This program is free software: you can redistribute it and/or modify
//    it under the terms of the GNU General Public License as published by
//    the Free Software Foundation, either version 3 of the License, or
//    (at your option) any later version.
//
//    This program is distributed in the hope that it will be useful,
//    but WITHOUT ANY WARRANTY; without even the implied warranty of
//    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//    GNU General Public License for more details.
//
//    You should have received a copy of the GNU General Public License
//    along with this program.  If not, see <http://www.gnu.org/licenses/>.

setTimeout(function(){setAutoCompleteOn()},1000);

function setAutoCompleteOn()
{
  document.title = document.title + " //";
  
  for(var i=0;i<document.forms.length;i++)
  {
		  document.forms[i].autocomplete = 'on';
		  formparts = document.forms[i].elements;
		  for(j=0; j<formparts.length; ++j)
		  {
			  part = formparts[j];
			  part.attributes["autocomplete"].value = "on";
		  }
  }
}



function setAutoCompleteOff()
{ 
}