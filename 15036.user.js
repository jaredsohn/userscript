// ==UserScript==
// @name        Rohitab Google Bot Glitch Fixer
// @author      _dg 
// @description Fixes issues members, but non-moderators have with google bot appearing
// @include     http://www.rohitab.com/discuss/index.php?showtopic=*
// ==/UserScript==

var cElements = document.getElementsByTagName('span');
for(var i = 0; i < cElements.length; i++)
{
    if ((cElements[i].className == 'normalname') && (cElements[i].innerHTML == 'Google Ads'))
    {
	cElements[i].parentNode.parentNode.parentNode.innerHTML = '';
        break;
    }
}
