// ==UserScript==
// @name           Mixed Emoticons [Emoplurk Add-On]
// @namespace      http://userscripts.org/users/74432
// @description    Smilies Set for "EMOPLURK 2.0"
// @version        1
// @include        http://www.plurk.com/*
// ==/UserScript==

var smilies = '';
/* Smilies definition begins ====================== */

smilies += '<a title="Mixed" href="http://s194.photobucket.com/albums/z4/uchari/mx/">001.gif,002.gif,003.gif,004.gif,005.gif,006.gif,007.gif,008.gif,009.gif,010.gif,011.gif,012.gif,013.gif,014.gif,015.gif,016.gif,017-1.gif,018-1.gif,019-1.gif,021-1.gif,022-1.gif,023.gif,024.gif,025.gif,026.gif,027.gif,028.gif,029.gif,030.gif,031.gif,032.gif,033.gif,034.gif,035.gif,036.gif,037.gif,038.gif,039.gif,040.gif,041.gif,042.gif</a>';

/* Smilies definition ends ====================== */

/* Initialize */
var smilies_holder = document.createElement('div');
smilies_holder.id = 'smilies_holder';
smilies_holder.style.display = 'none';

if (!document.getElementById('smilies_holder')) {
  document.documentElement.appendChild(smilies_holder);
} 
smilies_holder = document.getElementById('smilies_holder');

/* Put the smilies holder */
var container = document.createElement('p')
container.innerHTML = smilies;
smilies_holder.appendChild(container);