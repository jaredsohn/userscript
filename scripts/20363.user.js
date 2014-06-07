/** Copyright (c) 2008, Signal-Eleven.com
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*     * Neither the name of the <organization> nor the
*       names of its contributors may be used to endorse or promote products
*       derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY Signal-Eleven.com ``AS IS'' AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL Signal-Eleven.com BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*
* I know, the license is one order of magnitude bigger than the software itself. 
* Crazy world we're living in, uh?
*
*/
// ==UserScript==
// @name           Writing Room 4 Google Documents
// @namespace      http://www.signal-eleven.com
// @description    Allows to toggle the header bar in Google documents, providing more room for working.
// @include        http*://docs.google.*/Doc*

// ==/UserScript==

var link;
link=document.createElement("div");
link.innerHTML="<a style=\"font-family:arial;border:1px solid navy; font-size: 10px;margin: 2px;padding: 1px;\" href='#' onClick=\"if(document.getElementById('navigation').style.display == 'none'){ document.getElementById('navigation').style.display=''} else {document.getElementById('navigation').style.display = 'none'}\"> Toggle header </a>";
document.body.insertBefore(link, parent.document.getElementById('editPage').firstChild);