// ==UserScript==
// @name           Ikariam CAT Indicator for Messages
// @namespace      BananaWorks it smells better than a Skunk
// @description    CAT Indicator for Messages
// @author         Euler (http://userscripts.org/users/Euler)
// @version        0.1
// @include        http://s*view=diplomacyAdvisor*
// @include        http://s*view=museum*
// @exclude        http://s*view=diplomacyAdvisorTreaty*
// @exclude        http://s*view=diplomacyAdvisorAlly*
// ==/UserScript==

//============================================================================
//Copyright © 2010 Euler
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


var id=document.domain +"cat";
var catlist='';
var name;
var body=document.getElementsByTagName("body")[0].id;
if (body=="museum")
    {
var q=2
while (document.getElementsByClassName("player")[q]!==undefined)
  {
    catlist+=document.getElementsByClassName("player")[q].innerHTML + ', ';
    q++;
  };
  GM_setValue(id,catlist);
 };
if (body=="diplomacyAdvisor")
{
var catlist=GM_getValue(id,0);
if (catlist == 0) 
{
alert("please check your museum to update the C.A.T. partener list");
}
else {
for (var w= 13; w <= 67; w += 1) 
{
name=document.getElementsByTagName("a")[w].innerHTML;
if (catlist.search(name) !== -1) 
{
var tex='<img src="skin/museum/icon32_culturalgood.gif" width="14" height="14" />';
document.getElementsByTagName("a")[w].innerHTML=tex+" "+document.getElementsByTagName("a")[w].innerHTML;
};
};
};
}; 