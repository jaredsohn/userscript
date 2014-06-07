// ==UserScript==
// @name           Madokinator
// @namespace      *
// @description    [madoka][/madoka] tags to display the runes used in Puella Magi Madoka Magica for the entire interwebs.  Requires the MadokaRunes.ttf font.  Turns text to fixed-width font on mouseover.
// @include        *
// ==/UserScript==

var home = '<span style="font-family:MadokaRunes;font-size:200%;text-transform:uppercase;cursor:pointer;" onmouseover="this.style.fontFamily=\'Courier\';this.style.fontSize=\'160%\';" onmouseout="this.style.color=this.style.fontFamily=\'MadokaRunes\';this.style.fontSize=\'200%\'">';

var runner = '</span>';

var paragraphs = document.getElementsByTagName('p');

for (var i = 0; i < paragraphs.length; i++) {
    paragraphs[i].innerHTML = paragraphs[i].innerHTML.replace( /\[madoka\](.+?)\[\/madoka]/gi, home+"$1"+runner );
}
