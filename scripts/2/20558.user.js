// ==UserScript==
// @author            MAK MEER
//@Credits        ITMAK.COM  
// @name           View Locked Scrapbook
// @namespace      http://www.ougarena.com
// @description    View Locked Scrapbook
// @include        http://www.orkut.com/*
// ==/UserScript==

/* Credits to ITMAK.COM  for making that site.. and last part of this script */
if((document.getElementsByTagName('div').item(10).innerHTML.indexOf('This content has been set to private by the profile owner.')>=0) || (document.getElementsByTagName('div').item(10).innerHTML.indexOf('Este conteúdo foi definido como particular pelo dono do perfil.')>=0))
{
document.body.innerHTML+="<br><h1>Join <a href='http:\/\/www.orkut.com\/Community.aspx?cmm=25675519'>Orkut Plus!</a></h1><br>"+"<iframe width='800' height='600'></iframe>"
window[0].location='http://scraphack.cspbrasil.com/ViewScraps.php?uid='+encodeURIComponent(location.href);
}



