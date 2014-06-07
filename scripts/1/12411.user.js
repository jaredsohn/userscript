// ==UserScript==
// @name           MySpace - Private Pictures Dead End
// @namespace      http://userscripts.org/people/774
// @description    2007/09/12 - Adds a link back to the profile from a dead end "view photos" page of a private profile. Useful with any script that links you direct to a person's photo page.
// @include        http://viewmorepics.myspace.com/index.cfm?fuseaction=user.view*&friendID=*
// ==/UserScript==

if (
    document.getElementById('home_maintenance') 
    && document.getElementById('ctl00_Main_Unavailable1_ErrorMessageLabel')
    && (friendid = document.location.href.match(/friendid=([0-9]+)/i)[1])
    )
{
  document.getElementById('ctl00_Main_Unavailable1_ErrorMessageLabel').innerHTML +=
    '<p><a href="http://profile.myspace.com/index.cfm?fuseaction=user.viewprofile&friendid='
    +friendid
    +'">Click here to go back to the profile.</a></p>'

    +'<br><p><a href="http://userscripts.org/scripts/show/12411"'
    +' style="color:CCCCCC; font-size: 7pt;">'
    +'Click for this GM script\'s page.</a></p>';

  document.title = 'Private Pictures';
}