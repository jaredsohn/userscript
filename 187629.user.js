// ==UserScript==
// @name           NyaaTorrents Dark and Flat Minor Edits
// @version        1.0
// @author         Dynadrag
// @description    Should be used with my 'NyaaTorrents Dark and Flat' Stylish Theme to fix and clean up some small things. To get this theme install the Stylish extension then go to [http://userstyles.org/styles/96701/nyaatorrents-dark-and-flat]
// @include        *.nyaa.*/*
// ==/UserScript==

document.title = document.title.replace (
    'NyaaTorrents >>',
    ''
);

document.body.innerHTML = document.body.innerHTML.replace (
    'No user comments have been posted.',
    '&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;No user comments have been posted.&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;'
);
document.body.innerHTML = document.body.innerHTML.replace (
    'You need to be logged in to post a comment.',
    '&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;You need to be logged in to post a comment.&#160;&#160;&#160;&#160;&#160;&#160;&#160;&#160;'
);
document.body.innerHTML = document.body.innerHTML.replace (
    ', and you probably need it.',
    ''
);
document.body.innerHTML = document.body.innerHTML.replace (
    '(classic UI and Mainline DHT plugin) is the recommended client.',
    ''
);