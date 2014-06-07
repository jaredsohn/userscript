// ==UserScript==
// @name           UserScripts.org - Emphasis on Favorites
// @namespace      http://userscripts.org/people/774
// @description    2008/03/19 - Puts more functionality into your favoriting on USo. Adding a link in the header, and sorting your favorites by their update dates. Author: InsaneNinja
// @include        http://userscripts.org/*
// ==/UserScript==

if ($('header'))
{
    var L = $('header').getElementsByTagName('li'), A = $('header').getElementsByTagName('a');

    if (L.length == 7 && A[3].href.match('users'))
    {
        var favsL = document.createElement('li'), favsA = document.createElement('a');
        favsA.innerHTML = 'Favorites'; favsA.setAttribute('href', A[3].href + '/favorites' )
        favsL.appendChild(favsA); L[2].parentNode.insertBefore(favsL, L[2])
    }
    //else console.log('USo : Logged Out')
}
/*
if (document.location.href.match(/\/favorites$/))
{
    var table=document.getElementsByTagName('table'), rows=table[0].getElementsByTagName('tr'), Nrows=[]

    for (var i=1; (row=rows[i]); i++)
    Nrows.push('<!--'+row.innerHTML.match(/abbr class="updated" title="([^\"]+)"/)[1]+'-->'+row.innerHTML )

    Nrows = Nrows.sort().reverse();

    table[0].innerHTML = '<tr>'+rows[0].innerHTML+'</tr>\n<tr>'+Nrows.join('</tr>\n<tr>')+'</tr>';
}
*/

function $(elementId) { return document.getElementById(elementId); } // shortcut from "Prototype Javascript Framework"