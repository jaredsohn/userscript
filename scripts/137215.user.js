// Copyright (c) 2012, Mehdi Dogguy
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the <organization> nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
// ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
// WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
// DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
// DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
//  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
// ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
// SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          BTS extra links
// @namespace     http://dogguy.org/projects/bts_extra_links/
// @description   Puts some useful links next to "pkgreport.cgi?src=foo" ones
// @include       http://bugs.debian.org/cgi-bin/bugreport.cgi*
// ==/UserScript==

var re_url  = /^pkgreport\.cgi\?src=(.*)/;
var re_stop = /^#/;
var aElem, srcName, newSpan;

function insertAfter(referenceNode, newNode) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

var linkArray = document.getElementsByTagName('a');
for(var i=0; i<linkArray.length; i++){
  aElem = linkArray[i];
  var linkTarget = aElem.getAttribute('href');
  if (linkTarget.match(re_url)) {
    srcName = linkTarget.replace(re_url, "\$1");
    newSpan = document.createElement("span");
    newSpan.innerHTML += " (";
    newSpan.innerHTML += '<a href="http://packages.qa.debian.org/'+srcName+'">PTS</a>';
    newSpan.innerHTML += ", "
    newSpan.innerHTML += '<a href="http://buildd.debian.org/'+srcName+'">Buildd</a>';
    newSpan.innerHTML += ", "
    newSpan.innerHTML += '<a href="http://qa.debian.org/popcon.php?package='+srcName+'">Popcon</a>';
    newSpan.innerHTML += ")";
    insertAfter(aElem, newSpan);
  }
  if (linkTarget.match(re_stop)) break;
}

//
// ChangeLog
// 2012-06-30 - 0.1 - Initial release.
