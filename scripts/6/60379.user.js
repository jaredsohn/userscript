// ==UserScript==
// @name           beeMP3 Fixer
// @namespace      #aVg
// @include        http://beemp3.com/*
// @description    Heavily cleans up the layout, and removes captcha from downloads.
// @version        0.1.2
// ==/UserScript==
function single(A) {return document.evaluate(A, document, null, 9, null).singleNodeValue;}
function remove(A) {if(A)A.parentNode.removeChild(A);return remove;}
function $(A) {return document.getElementById(A)}
function loop(A, B, C) {
	A = document.evaluate(A, C || document, null, 6, null);
	var I = A.snapshotLength;
	while(--I>=0) B(A.snapshotItem(I));
}
var loc = location.pathname.substring(1) + location.search;
if(/[&?]q=/.test(loc)) {
document.title = "Search for (" + single("//input[@name='q']").value + ")";
remove($("small_sp"))(single("//td[@class='txt']/table/tbody/tr/td[3]"))(single("//div[@class='last_10']"));
single("//a[@alt='beemp3.com']/../../../..").align="center";
var result = single("//td[@class='txt_q']");
result.removeAttribute("width");
loop(".//table", function(A) {
	A.width="100%";
}, result);
loop(".//a[@class='link']", function(A) {
	A.textContent = A.textContent.substring(0, A.textContent.length - 4);
});
loop("(.//img[@alt='Ringtones'] | .//a[@class='tag'])/../../..", remove, result);
loop("//td[@class='txt']/p", remove);
remove(single("//td[@width='15']"));
result.parentNode.parentNode.parentNode.width="97%";
} else if(loc.indexOf("download")==0) {
var title = single("//h3");
title.textContent = title.textContent.substring(0, title.textContent.length - 4);
GM_addStyle(".bol_m .hrf {display:block} .slink {padding:0 5px;}");
document.title = document.title.substring(0, document.title.length - 19);
loop("//img[@width='18']", remove);
loop("//a[@class='hrf']", function(A) {
	A.textContent = A.textContent.replace(/mp3$/, "");
});
var dl = single("//a[@href='/conditions.html']/../../../.."), dln = document.createElement("a");
dln.setAttribute("style", "background-color:yellow;color:black;padding:5px;border:2px solid black;text-decoration:none;-moz-border-radius:10px;");
dln.href = unsafeWindow.show_url.toString().substring(199, 263);
dln.appendChild(document.createTextNode("Download mp3"));
dl.parentNode.replaceChild(dln, dl);
remove(single("//font[@class='share']/../../../../.."))(single("//h3[.='Last Searches']/../../../../../../../.."))(single("//h3[.='Last 20 Mp3 Downloads']/../../../../../../../.."));
} else {
var got=false;
var titles = {
	abo : "About",
	disc : "Disclaimer",
	tos : "Terms of Service",
	sub : "Submit MP3",
	tops : "Top 10 Songs",
	rec : "Recently Added Songs",
	top5 : "Top 50 Downloads"
};
for(var t in titles) {
	if(loc.indexOf(t)==0) {
		document.title = titles[t];
		got=true;
		break;
	}
}
if(!got) document.title = "beeMP3";
}
remove(single("//td[@class='inf']"));