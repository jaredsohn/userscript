// ==UserScript==
// @name          Time Machine
// @namespace     Kafke
// @description   Brings you back to visited websites
// @include       *
// ==/UserScript==

i = GM_getValue("howmany", 0);
current = GM_getValue("current", -1);

if(i == 0)
{
GM_setValue("howmany", i);
}
if(current == -1)
{
GM_setValue("current", 0);
current = 0;
}

if(location.href != "about:blank")
{
if(location.href != GM_getValue(current))
{
GM_setValue(i, location.href);
i=i+1;
GM_setValue("howmany", i);
current=i-1;
GM_setValue("current", current);
}
}

function promptb()
{
pgs=1;
pgs = prompt("How Many Pages?", pgs);
jumpb(pgs);
}
function promptf()
{
pgs=1;
pgs = prompt("How Many Pages?", pgs);
jumpf(pgs);
}



function jumpb(num)
{
current = GM_getValue("current", 0);
temp = GM_getValue("howmany", 0);
newnum=current-num;

if(newnum >= 0)
{
current = newnum;
GM_setValue("current", current);
location.href = GM_getValue(newnum);
}else{ current=0; GM_setValue("current", current); location.href = GM_getValue(0); }
}

function jumpf(num)
{
current = GM_getValue("current", 0);
temp = GM_getValue("howmany", 0);
newnum=num+current
if(newnum < temp)
{
current = newnum;
GM_setValue("current", current);
location.href = GM_getValue(newnum);
}else{ current=temp-1; GM_setValue("current", current); location.href = GM_getValue(current); }
}

GM_registerMenuCommand("Jump Back", promptb);
GM_registerMenuCommand("Jump Forward", promptf);