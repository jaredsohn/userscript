// ==UserScript==
// @name sertest
// @description learning testing
// @include *
// ==/UserScript==
var allDivs, thisDiv, present;
allDivs = document.evaluate(
    "//div",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
present=0;
present1=0;
for (var i = 0; i < allDivs.snapshotLength; i++) {
    thisDiv = allDivs.snapshotItem(i);
    
//    if(thisDiv.innerHTML.indexOf('&bz=')>0) alert('Present');
if(thisDiv.innerHTML.indexOf('Add funds')>0) present1=1;


bz_loc = thisDiv.innerHTML.indexOf('bz=');
bz_end = thisDiv.innerHTML.indexOf('\'',bz_loc);

if(bz_end<20+bz_loc || bz_end > 55+bz_loc) bz_end_loc = bz_loc + 35;
else
bz_end_loc = bz_end ;

link="/?u=c&s=rar&s1=bp&s2=100&";

if(bz_loc >0)
{
present=1;

if (document.location.href.indexOf('bz=')<0)
window.open(link+thisDiv.innerHTML.slice(bz_loc,bz_end_loc));
}

}

if (present==0 && document.location.href.indexOf('rar')>0 && document.location.href.indexOf('bz=')<0)
window.open("/?u=c&s=rar");

