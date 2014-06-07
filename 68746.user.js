// ==UserScript==
// @name           SSW Logout Confirm
// @namespace      http://homeworlds.secretsocietywars.com/crashnburn11
// @description    Logout confirm
// @include        http://www.secretsocietywars.com/*
// ==/UserScript==

var logout = document.evaluate('//a[contains(@href, "logout")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;



if(logout) {
		logout_link = document.createElement('a');
		logout_link.innerHTML = "<b>LOGOUT</b>";
		logout_link.setAttribute("style", logout.getAttribute("style"));
		logout_link.style.cursor = "pointer";
		logout.parentNode.replaceChild(logout_link, logout);
		logout_link.addEventListener('click', sure, false);

}

function sure() {
logout_link.innerHTML = "<b>SURE?</b>";
logout_link.addEventListener('click',logout_confirmed,false);
}

function logout_confirmed() {
leaning = document.evaluate('//td[@class="pattrName"]//text()[contains(., "Leaning")]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
if(leaning.snapshotLength){
if (confirm('You are leaning out of your current society.  Do you want to continue logging out?')){
window.location.href = "http://www.secretsocietywars.com/index.php?p=account&a=logout";
} else {
return
}
}else {
window.location.href = "http://www.secretsocietywars.com/index.php?p=account&a=logout";
}
}
