// ==UserScript==
// @name           Xperteleven
// @description    A script that removes unnecessary elements, such as ads from Xperteleven
// @namespace      adamjohansson.com
// @include        *xperteleven.com*
// @exclude        *xperteleven.com/makeActivity*
// @exclude        *xperteleven.com/activitySelect*
// @exclude        *xperteleven.com/x11Tip*
// ==/UserScript==

var adSidebar = document.getElementById('ctl00_pRightAdContent');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}

var topAd = document.getElementById('TopAd_inline');
if (topAd) {
    topAd.parentNode.removeChild(topAd);
}

var tds = document.getElementsByTagName('td');
 
for( var i = 0; i < tds.length; i++ )
{
    if (tds[i].className.match('MainRightAd'))
    {
        tds[i].parentNode.removeChild(tds[i]);
    }
}

var tr = document.getElementsByTagName('tr');
tr[0].parentNode.removeChild(tr[0]);

var lasttr = document.getElementsByTagName('tr');
 
for( var i = 0; i < lasttr.length; i++ )
{
    if (lasttr[i].className.match('MainFooter'))
    {
        lasttr[i].parentNode.removeChild(lasttr[i]);
    }
}

table = document.getElementsByTagName("table")[0];
table.setAttribute("style","width: 600px");