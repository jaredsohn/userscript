// ==UserScript==
// @name           Filesonic Cleaner
// @namespace      FSCleaner
// @include        http://*.filesonic.com/*
// ==/UserScript==

addGlobalStyle('body{background-image: none ! important;}');
document.getElementById('container').style.marginTop = '20px';
document.getElementsByTagName('h2')[0].style.border = '0';

function removeElement(divNum) {
	var olddiv = document.getElementById(divNum);
		if(olddiv){
		var d = olddiv.parentNode;
		d.removeChild(olddiv);
	}
}

function addGlobalStyle(css) {
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

var newhref = document.getElementById('free_download');
var premiumdiv = document.getElementById('premiumComparison');
var newcent = document.createElement('CENTER');
newcent.innerHTML = "<br><br><br>";
premiumdiv.parentNode.insertBefore(newcent, premiumdiv);
newcent.appendChild(newhref);

removeElement("buyPremium");
removeElement("shareWithFriends");
removeElement("premiumComparison");
removeElement("highSpeedDownload");
removeElement("shareLink");
removeElement("makeMoney");
removeElement("intro");
removeElement("lGeneralInformation");
removeElement("lMainUsage");
removeElement("conclusion");
removeElement("_atssh");
