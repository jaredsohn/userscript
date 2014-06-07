// ==UserScript==
// @name NUEser Ignorator
// @author bluekirby
// @include *endoftheinter.net*
// ==/UserScript==

var limit=10088;
//Add alt accounts here, separated by commas
var alts="";

function sw() {
GM_setValue("hide",-1*GM_getValue("hide",1));
location.reload(true);
}

ETIers=document.getElementsByTagName('a');
var hider = document.createElement('a');
if(GM_getValue("hide",1)==1)
{
hider.innerHTML='<u>Show NUEsers</u>';
}
else
{
hider.innerHTML='<u>Hide NUEsers</u>';
}
hider.addEventListener('click', sw, true);

var divs=document.getElementsByClassName("userbar")[0];
divs.innerHTML+=" | ";
divs.appendChild(hider);

if(GM_getValue("hide",1)==1)
{
for(var i=0;i<ETIers.length;i++)
{
    var uid = (/profile\.php.*?user=([0-9]*)/.exec(ETIers[i].href) ||[]).pop();
if (uid > limit&&alts.search(uid)<0)
{
ETIers[i].parentNode.parentNode.parentNode.removeChild(ETIers

[i].parentNode.parentNode);
i--;
}
}
}