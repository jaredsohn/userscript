// ==UserScript==
// @name           Get all daily chance
// @namespace      Get all daily chance
// @description    Automatically get all gaia daily chances with one click.
// @include        http://www.gaiaonline.com/
// @include        http://www.gaiaonline.com/dailycandy/?mode=nojs&section=*
// @include        http://www.gaiaonline.com/?login_success=1
// ==/UserScript==

loc = window.location
loc=loc+""
loc = loc.replace("http://www.gaiaonline.com/dailycandy/?mode=nojs&section=","")
if (loc>0) {
forms = document.getElementsByTagName("form");
forms[0].submit();
} else {
var navbar, newElement;
navbar=document.getElementById('lightbox_dialog_wrapper');
if (navbar) {
    newElement = document.createElement('li');
	newElement.addEventListener("click", 

function() {
end=1;
document.body.innerHTML=""
while (end<8) {
document.body.innerHTML=document.body.innerHTML+"Hit "+end+" <br>";
document.body.innerHTML=document.body.innerHTML+'<iframe src="http://www.gaiaonline.com/dailycandy/?mode=nojs&section='+end+'"></iframe><br>';
end++;
}
setTimeout("window.location.reload()",5500);
}

, true);
newElement.innerHTML="<a href='#'>Collect all daily Chance</a>";
    navbar.parentNode.insertBefore(newElement, navbar.nextSibling);
}

}


