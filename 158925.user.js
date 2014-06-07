// ==UserScript==
// @name        facebook-gender-neutrality
// @namespace   http://m0tei.co.uk/facebookgender
// @description Add "Other/Undisclosed" gender option to facebook.
// @include     https://m.facebook.com/editprofile.php?edit=gender&type=basic*
// @version     1.1
// ==/UserScript==
/*
Copyright (c) 2013, Alexander Wright (me@m0tei.co.uk)
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL ALEXANDER WRIGHT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

var inputElements=document.getElementsByTagName("input");
//var maleElement=inputElements[5];
var i=0;
while(inputElements[i].getAttribute("value")!=2 && i<inputElements.length)
	{i++;}
var maleElement=inputElements[i];

maleElement.parentNode.parentNode.parentNode.parentNode.innerHTML+="<tr><td><label onclick=\"\"><input name=\"new_info\" value=\"0\" onclick=\"\" type=\"radio\">Other/Undisclosed</label></td></tr>";
