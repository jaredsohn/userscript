// ==UserScript==
// @author         Andreas Jung
// @name           clear archive.org input fields
// @namespace      http://www.w3.org/1999/xhtml 
// @description    Removes http:// from the input fields on *.archive.org
// @include        http://web.archive.org/*
// @include        http://www.archive.org/*
// @include        http://archive.org/*
// ==/UserScript==

// This file is licensed under Creative Commons Attribution License
//
// http://creativecommons.org/licenses/by/3.0/
//
// Initial Developer:
// Andreas Jung (sd-daken.deviantart.com)
//
// Contributor(s):
//

inputs = document.getElementsByTagName("input");
for (i=0; i<inputs.length; i++) {
   if (inputs[i].getAttribute("value") == "http://") {
      inputs[i].setAttribute("value", "");
   }
}