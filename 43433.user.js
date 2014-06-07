// ==UserScript==
// @name           andi
// @namespace      http://www.gauravtarey.com
// @description    Removes unnecessary Ads and provides space to worthy content
// @author         andi
// @include        http://ngebux.com/view.php?*
// ==/UserScript==

var tes=document.getElementsByClassName("maintopright"); 
if(tes) {
var button=document.createElement('input');
button.setAttribute('style','position:absolute; top:20px; left:20px;');
button.setAttribute('type','button');
button.setAttribute('value','klik disini');
button.setAttribute('onClick','x=0;y=0;');
tes[0].parentNode.appendChild(button);
}