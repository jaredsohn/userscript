// ==UserScript==
// @name           google_lat_long
// @namespace      BananaWorks it smells better than a Skunk
// @description    changes dd to dmd
// @include        http://maps.google.com*
// @author         Euler
// @version        0.0
// ==/UserScript==

//============================================================================
//Copyright © 2011 Euler
//
//Permission is hereby granted, free of charge, to any person obtaining a copy
//of this software and associated documentation files (the "Software"), to deal
//in the Software without restriction, including without limitation the rights
//to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
//copies of the Software, and to permit persons to whom the Software is
//furnished to do so, subject to the following conditions:
//
//The above copyright notice and this permission notice shall be included in
//all copies or substantial portions of the Software.
//
//THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//THE SOFTWARE.
//============================================================================

var ddtodmd='document.getElementsByClassName("q_d_skunk skunkworks-input")[0].value=Math.floor(parseInt(document.getElementsByClassName("q_d_skunk skunkworks-input")[0].value))+"* "+Math.round((parseFloat(document.getElementsByClassName("q_d_skunk skunkworks-input")[0].value)-Math.floor(parseInt(document.getElementsByClassName("q_d_skunk skunkworks-input")[0].value)))*60*10000)/10000+"` , "+Math.floor(parseInt(document.getElementsByClassName("q_d_skunk skunkworks-input")[0].value.slice(document.getElementsByClassName("q_d_skunk skunkworks-input")[0].value.indexOf(",")+1)))+"* "+Math.round(Math.abs(((parseFloat(document.getElementsByClassName("q_d_skunk skunkworks-input")[0].value.slice(document.getElementsByClassName("q_d_skunk skunkworks-input")[0].value.indexOf(",")+1))-Math.floor(parseInt(document.getElementsByClassName("q_d_skunk skunkworks-input")[0].value.slice(document.getElementsByClassName("q_d_skunk skunkworks-input")[0].value.indexOf(",")+1))))*60*10000)))/10000+"`";';

document.getElementsByClassName("q_d_skunk skunkworks-input")[0].setAttribute("onclick", ddtodmd+ ' return false;');