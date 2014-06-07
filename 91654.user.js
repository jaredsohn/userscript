// ==UserScript==
// @name           Ikariam CAT Indicator for Messages
// @namespace      BananaWorks it smells better than a Skunk
// @description    CAT Indicator for Messages
// @author         Euler (http://userscripts.org/users/Euler)
// @version        0.2
// @include        http://s*view=island*
// @include        http://s*view=embassy*
// @include        http://s*view=diplomacyAdvisor*
// @include        http://s*view=diplomacyAdvisorAlly*
// @include        http://s*view=museum*
// @include        http://s*/index.php
// @include        http://s*/index.php?view=highscore&showMe=1
// @exclude        http://s*view=diplomacyAdvisorTreaty*

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
//alert(body);
if (body=="museum")
    {
var q=2
while (document.getElementsByClassName("player")[q]!==undefined)
  {
    if (document.getElementsByClassName("player")[q].innerHTML == "Alliance") 
{
catlist="";
}
  else
  {
    catlist+=document.getElementsByClassName("player")[q].innerHTML + ', ';
    
  };q++;
  };
  GM_setValue(id,catlist);
 };
 
var catlist=GM_getValue(id,0);
if (catlist == 0) 
{
alert("please check your museum to update the C.A.T. partener list");
GM_setValue(id,1);
}

else {
if (body=="diplomacyAdvisor")
{
for (var w= 11; w <= 69; w += 1)
{
name=document.getElementsByTagName("a")[w].innerHTML;
if (catlist.search(name) !== -1) 
{
var tex='<img src="skin/museum/icon32_culturalgood.gif" width="14" height="14" />';
document.getElementsByTagName("a")[w].innerHTML=tex+" "+document.getElementsByTagName("a")[w].innerHTML;
};
};
};


if (body=="diplomacyAdvisorAlly" || body=="embassy")
{
//alert('hi');
w=1;
while (document.getElementById("memberList").getElementsByTagName("tr")[w]!== undefined )
{//alert('hi'+ w);
name=document.getElementById("memberList").getElementsByTagName("tr")[w].getElementsByTagName("td")[1].innerHTML;
//alert(name);
if (catlist.search(name) !== -1) 
{
var tex='<img src="skin/museum/icon32_culturalgood.gif" width="14" height="14" />';
document.getElementById("memberList").getElementsByTagName("tr")[w].getElementsByTagName("td")[1].innerHTML=tex+" "+document.getElementById("memberList").getElementsByTagName("tr")[w].getElementsByTagName("td")[1].innerHTML;
};
w++;};
};

if (body=="island")
{
for (var r= 0; r <= 15; r += 1)
{

if (document.getElementById("cityLocation"+r).getElementsByClassName("owner alt")[0]!==undefined)
{
str2=document.getElementById("cityLocation"+r).getElementsByClassName("owner alt")[0].innerHTML;
//alert(str2);
str3=str2.substr(str2.search("2")+13, str2.search("icons")-(str2.search("2")+13)-41);

str3=str3.replace(/&nbsp;/gi," ");

name=str3;

//alert(name);
if (catlist.search(name) !== -1) 
{
var tex='<img src="skin/museum/icon32_culturalgood.gif" width="16" height="16" />';

document.getElementById("cityLocation"+r).getElementsByClassName("before")[0].innerHTML=document.getElementById("cityLocation"+r).getElementsByClassName("before")[0].innerHTML+" "+tex;
};
};
};
};


if (body=="highscore")
{
w=0;
while (document.getElementsByClassName("name")[w]!==undefined)
{
name=document.getElementsByClassName("name")[w].innerHTML;
//alert(name+"qed");
//alert(name+" "+catlist);

//alert(name.search(" "));

//alert(name.length);
name=name.replace(/	/gi, "");
//alert(name.length);
//alert(name);
if (catlist.search(name) !== -1)
{//alert(name);
var tex='<img src="skin/museum/icon32_culturalgood.gif" width="16" height="16" />';
document.getElementsByClassName("name")[w].innerHTML=tex+" "+document.getElementsByClassName("name")[w].innerHTML;
};
w++;};

w=0;
while (document.getElementsByClassName("name inactive")[w]!==undefined)
{
name=document.getElementsByClassName("name inactive")[w].innerHTML;
//alert(name+"qed");
//alert(name+" "+catlist);

//alert(name.search(" "));

//alert(name.length);
name=name.replace(/	/gi, "");
//alert(name.length);
//alert(name);
if (catlist.search(name) !== -1)
{//alert(name);
var tex='<img src="skin/museum/icon32_culturalgood.gif" width="16" height="16" />';
document.getElementsByClassName("name inactive")[w].innerHTML=tex+" "+document.getElementsByClassName("name inactive")[w].innerHTML;
};
w++;};
};
};

//alert(catlist);