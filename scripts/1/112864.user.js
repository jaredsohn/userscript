// ==UserScript==
// @name           norate
// @namespace      http://userscripts.org/users/357725
// @include        *ncore.cc/torrents.php?action*
// ==/UserScript==

var zGbl_DOM_ChangeTimer                = '';
var bGbl_ChangeEventListenerInstalled   = false;

window.addEventListener ("load", MainAction, false);

function MainAction ()
{
    if (!bGbl_ChangeEventListenerInstalled)
    {
        bGbl_ChangeEventListenerInstalled   = true;
        document.addEventListener ("DOMSubtreeModified", HandleDOM_ChangeWithDelay, false);
    }

//lenyeg ->
	
var temp = document.getElementsByTagName('span');
for (i=0; i < temp.length; i++) {
	if (temp[i].innerHTML == '0')
		temp[i].style.display = 'none';
	if (temp[i].className == 'hsz_vote_plusz' || temp[i].className == 'hsz_vote_minusz')
		temp[i].style.display = 'none';

}

var temp = document.getElementsByTagName('div');
for (i=0; i < temp.length; i++) {
	if (temp[i].className == 'hsz_jobb_felso_thumbs')
		temp[i].style.display = 'none';
	if (temp[i].className == 'hsz_jobb_felso_date') {
		if (temp[i].childNodes.length == 11)
			temp[i].childNodes[8].nodeValue = temp[i].childNodes[8].nodeValue.substring(0,45);
		else
			temp[i].childNodes[4].nodeValue = temp[i].childNodes[4].nodeValue.substring(0,36);
		}
}



}
// <- lenyeg

function HandleDOM_ChangeWithDelay (zEvent)
{
    if (typeof zGbl_DOM_ChangeTimer == "number")
    {
        clearTimeout (zGbl_DOM_ChangeTimer);
        zGbl_DOM_ChangeTimer = '';
    }
    zGbl_DOM_ChangeTimer     = setTimeout (function() { MainAction (); }, 222);
}